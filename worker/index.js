/**
 * Lana's Kitchen Miami — Preorder API
 * Cloudflare Worker: lanas-kitchen-preorder-api
 *
 * Endpoint: POST https://api.lanaskitchenmiami.com/preorder
 *
 * Secrets required (set via Cloudflare dashboard or `wrangler secret put`):
 *   TELEGRAM_BOT_TOKEN
 *   TELEGRAM_CHAT_ID
 *   TELEGRAM_SECONDARY_CHAT_ID (optional)
 *   TELEGRAM_WEBHOOK_SECRET
 *   TEST_TOKEN          ← secret for test mode (wrangler secret put TEST_TOKEN)
 *   GOOGLE_PLACES_KEY   ← Google Places API key (restricted to this Worker IP or HTTP referrer)
 *
 * Var (set in wrangler.toml or dashboard):
 *   ALLOWED_ORIGIN = "https://lanaskitchenmiami.com"
 *
 * Menu catalog is fetched from https://lanaskitchenmiami.com/dishes.json
 * (single source of truth — cached 5 min at CDN level).
 *
 * Delivery zones MUST stay in sync with DELIVERY_ZONES in ../script.js
 *
 * TEST MODE: POST with { testMode: true, testToken: "<TEST_TOKEN>" }
 * Runs all real server checks but does NOT send to Telegram/WhatsApp.
 * Returns { ok: true, testMode: true, orderId: "TEST-...", zone, pricing... }
 * Activate via: https://lanaskitchenmiami.com/?test=1&token=<TEST_TOKEN>
 */

import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

// ── Delivery zone config (mirrors DELIVERY_ZONES in script.js) ───────────────
const DELIVERY_ZONES = {
  "1": { letter: "A", fee: 10, minOrder: 60,  freeAt: 110 },
  "2": { letter: "B", fee: 15, minOrder: 80,  freeAt: 145 },
  "3": { letter: "C", fee: 20, minOrder: 120, freeAt: 200, requiresManualConfirmation: true },
  remote: { letter: "Remote", fee: null, minOrder: 120, requiresManualConfirmation: true },
};

// ZIP → zone map (mirrors ZIP_DELIVERY_ZONES in script.js)
const ZIP_DELIVERY_ZONES = {
  A: ["33009", "33160", "33180", "33019", "33020", "33023"],
  B: ["33004", "33021", "33024", "33025", "33154"],
  C: ["33305", "33306", "33334"],
};

function zipToZoneKey(zip) {
  const z = String(zip || "").trim();
  if (!/^\d{5}$/.test(z)) return "remote";
  if (ZIP_DELIVERY_ZONES.A.includes(z)) return "1";
  if (ZIP_DELIVERY_ZONES.B.includes(z)) return "2";
  if (ZIP_DELIVERY_ZONES.C.includes(z)) return "3";
  return "remote";
}

const MAX_BODY_SIZE = 32_000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
// Places autocomplete: separate rate limit — higher volume, shorter window
const PLACES_RATE_WINDOW_MS = 60 * 1000;      // 1 minute
const PLACES_RATE_MAX       = 60;             // 60 autocomplete calls per minute per IP
const PLACES_INPUT_MAX      = 120;            // max chars in address search
const PLACES_ID_MAX         = 500;            // placeId max length
const MENU_CACHE_TTL_S = 300; // 5 minutes
// NotoSans Regular from jsDelivr (Google Fonts repo) — full Cyrillic support, cached at CF edge
const NOTO_SANS_TTF_URL = "https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts/hinted/ttf/NotoSans/NotoSans-Regular.ttf";

const ORDER_STATUSES = {
  confirmed: "✅ Подтверждено",
  awaiting_payment: "💳 Ожидает оплату",
  paid: "💰 Оплачено",
};

const STATUS_KEYBOARD = [
  [
    { text: "✅ Подтвердить", status: "confirmed" },
    { text: "💳 Ожидает оплату", status: "awaiting_payment" },
  ],
  [
    { text: "💰 Оплачено", status: "paid" },
  ],
];

// In-memory rate limits (reset on Worker cold start — acceptable for simple protection)
const rateLimitMap = new Map();
const placesRateLimitMap = new Map();

function checkPlacesRateLimit(ip) {
  const now = Date.now();
  const key = String(ip || "unknown");
  let entry = placesRateLimitMap.get(key) ?? { count: 0, resetAt: now + PLACES_RATE_WINDOW_MS };
  if (now > entry.resetAt) {
    entry = { count: 0, resetAt: now + PLACES_RATE_WINDOW_MS };
  }
  entry.count += 1;
  placesRateLimitMap.set(key, entry);
  return entry.count <= PLACES_RATE_MAX;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getMiamiDateStr() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const p = Object.fromEntries(parts.map((x) => [x.type, x.value]));
  return `${p.year}${p.month}${p.day}`; // YYYYMMDD
}

function generateOrderId() {
  const date = getMiamiDateStr();
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  const code = 1000 + (buf[0] % 9000); // 1000–9999
  return `LK-${date}-${code}`;
}

function generateCustomOrderId() {
  const date = getMiamiDateStr();
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  const code = 1000 + (buf[0] % 9000); // 1000–9999
  return `CO-${date}-${code}`;
}

function generateContactId() {
  const date = getMiamiDateStr();
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  const code = 1000 + (buf[0] % 9000); // 1000–9999
  return `CR-${date}-${code}`;
}

/** Escape HTML entities for Telegram HTML parse_mode */
function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getReadableDate(dateValue) {
  const date = new Date(`${dateValue}T00:00:00-05:00`);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function getMiamiTimeLabel() {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());
}

function buildStatusKeyboard(orderId) {
  const shortId = String(orderId).split("-").at(-1) || "order";
  return {
    inline_keyboard: STATUS_KEYBOARD.map((row) =>
      row.map((button) => ({
        text: button.text,
        callback_data: `st:${button.status}:${orderId}:${shortId}`,
      }))
    ),
  };
}

function getInitialStatusText(deliveryZone) {
  return deliveryZone === "3" || deliveryZone === "remote"
    ? "Статус: Ожидает ручного подтверждения"
    : "Статус: Новая заявка";
}

function replaceStatusBlock(text, statusLabel) {
  const body = String(text || "").replace(/\n\nСтатус:[\s\S]*$/u, "");
  return `${body}\n\nСтатус: ${statusLabel}\nОбновлено: ${getMiamiTimeLabel()}`;
}

function checkRateLimit(ip) {
  const now = Date.now();
  const key = String(ip || "unknown");
  let entry = rateLimitMap.get(key) ?? { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
  if (now > entry.resetAt) {
    entry = { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
  }
  entry.count += 1;
  rateLimitMap.set(key, entry);
  return entry.count <= RATE_LIMIT_MAX;
}

async function fetchMenuWithCache() {
  const resp = await fetch("https://lanaskitchenmiami.com/dishes.json", {
    cf: { cacheTtl: MENU_CACHE_TTL_S, cacheEverything: true },
  });
  if (!resp.ok) throw new Error(`Menu fetch ${resp.status}`);
  return resp.json();
}

async function callTelegram(env, method, payload) {
  return fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

async function sendTelegramToRecipients(env, messagePayload) {
  if (!env.TELEGRAM_CHAT_ID) {
    console.error("Telegram primary recipient is not configured.");
    return { ok: false };
  }

  const recipients = [
    { label: "primary", chatId: env.TELEGRAM_CHAT_ID },
    { label: "secondary", chatId: env.TELEGRAM_SECONDARY_CHAT_ID },
  ].filter((recipient) => recipient.chatId);

  const results = await Promise.allSettled(
    recipients.map(async (recipient) => {
      const resp = await callTelegram(env, "sendMessage", {
        ...messagePayload,
        chat_id: recipient.chatId,
      });

      if (!resp.ok) {
        const errText = await resp.text().catch(() => "");
        throw new Error(errText || `Telegram API ${resp.status}`);
      }

      return { recipient: recipient.label };
    }),
  );

  let primaryOk = false;

  results.forEach((result, index) => {
    const recipient = recipients[index]?.label || "unknown";

    if (result.status === "fulfilled" && recipient === "primary") {
      primaryOk = true;
      return;
    }

    if (result.status === "rejected") {
      const message = result.reason?.message || result.reason;
      if (recipient === "secondary") {
        console.error("Telegram secondary recipient error:", message);
      } else {
        console.error("Telegram primary recipient error:", message);
      }
    }
  });

  return { ok: primaryOk, results };
}

// ── Order unit label (Russian, for Telegram) ──────────────────────────────────

function getOrderUnitRu(it) {
  if (it.orderUnitRu) return it.orderUnitRu;
  if (it.category === "soups") return "1 qt";

  const sr = String(it.sizeRu ?? "");
  const u  = it.unit ?? "";

  if (u === "lb") {
    const m = sr.match(/(\d+(?:\.\d+)?)\s*lb/i);
    return m ? `${m[1]} lb` : "1 lb";
  }
  if (u === "qt") {
    const m = sr.match(/(\d+(?:\.\d+)?)\s*qt/i);
    return m ? `${m[1]} qt` : "1 qt";
  }
  if (u === "шт.") {
    const m = sr.match(/^(\d+)\s*шт/i);
    return m ? `${m[1]} шт.` : "1 шт.";
  }
  if (u === "pcs") {
    const mOz = sr.match(/^(\d+(?:\.\d+)?)\s*oz\s*\(примерно\s+\d+(?:\.\d+)?\s*г\)/i);
    if (mOz) return mOz[0];
    const mSht = sr.match(/^(\d+)\s*(?:штук[аи]?|шт\.?)/i);
    if (mSht) return `${mSht[1]} шт.`;
    return "1 шт.";
  }
  return "1 шт.";
}

// ── Telegram message builder ──────────────────────────────────────────────────

function buildTelegramMessage({ orderId, customer, delivery, schedule, orderItems, pricing, notes, zoneMismatch }) {
  const zone = DELIVERY_ZONES[delivery.zone] ?? DELIVERY_ZONES.remote;
  const contactLabel = { sms: "SMS", whatsapp: "WhatsApp", telegram: "Telegram", callMe: "Phone call" }[customer.contactMethod]
    ?? esc(customer.contactMethod);
  const readableDate = getReadableDate(schedule.date);
  const timeWindowLabel = schedule.timeWindowLabel || schedule.timeWindow || "";
  const fullAddress = [
    [delivery.address, delivery.apt].filter(Boolean).join(" "),
    [delivery.city, "FL", delivery.zip].filter(Boolean).join(" "),
  ].filter(Boolean);

  const itemsLines = orderItems.map((it) => {
    const unitLabel = getOrderUnitRu(it);
    const qtyPart = it.quantity !== 1 ? ` × ${it.quantity}` : "";
    return `• ${esc(it.name)} ${esc(unitLabel)}${qtyPart} — $${it.lineTotal.toFixed(2)}`;
  }).join("\n");

  const zoneMismatchLine = zoneMismatch
    ? `\n⚠️ Zone check: frontend sent Zone ${esc(zoneMismatch.frontendZoneLabel)}, server computed Zone ${esc(zoneMismatch.serverZoneLabel)} from ZIP. Using server zone.`
    : "";

  let deliveryLine = "";
  let totalLine = "";
  let statusLine = "";
  if (delivery.zone === "3") {
    deliveryLine = `Предварительная доставка: $20`;
    totalLine = `<b>Предварительный итог: $${pricing.preliminaryOrderTotal.toFixed(2)}</b>`;
    statusLine = "\n⚠️ Ручное подтверждение требуется.";
  } else if (delivery.zone === "remote") {
    deliveryLine = `Доставка: По согласованию`;
    totalLine = `<b>Итог: Будет подтверждён после проверки адреса</b>`;
    statusLine = "\n⚠️ Ручное подтверждение требуется.";
  } else {
    deliveryLine = pricing.freeDelivery
      ? `Доставка: $0.00 (бесплатно)`
      : `Доставка: $${pricing.deliveryFee.toFixed(2)}`;
    totalLine = `<b>ИТОГО: $${pricing.orderTotal.toFixed(2)}</b>`;
  }

  return `🆕 <b>НОВАЯ ЗАЯВКА № ${esc(orderId)}</b>

Клиент: ${esc(customer.name)}
Телефон: ${esc(customer.phone)}
Предпочтительная связь: ${contactLabel}
${customer.contactMethod === "whatsapp" ? `WhatsApp на этом номере: ${customer.whatsappSamePhone ? "Да" : "Нет"}\n` : ""}${customer.telegramUsername ? `Telegram: ${esc(customer.telegramUsername)}\n` : ""}

<b>ДОСТАВКА</b>
Zone: Zone ${esc(zone.letter)}
${fullAddress.map((line) => esc(line)).join("\n")}

Дата: ${esc(readableDate)}
Временное окно: ${esc(timeWindowLabel)}
City: ${esc(delivery.city)}
ZIP: ${esc(delivery.zip)}

<b>ЗАКАЗ</b>
${itemsLines}

Еда: $${pricing.foodSubtotal.toFixed(2)}
${deliveryLine}
${totalLine}

<b>Аллергии / особые пожелания:</b>
${esc(notes.allergies?.trim() || "Нет")}

<b>Комментарий к заказу:</b>
${esc(notes.orderNotes?.trim() || "Нет")}${zoneMismatchLine}${statusLine}

${getInitialStatusText(delivery.zone)}`;
}

// ── Kitchen PDF helpers ───────────────────────────────────────────────────────

// Parses start of delivery window and subtracts 30 min.
// Handles: "4:00–5:00 PM", "10:00 AM – 2:00 PM", "10:00-14:00"
// Returns formatted time string (12h) or null if unparseable.
function computeReadyByTime(schedule) {
  const label = String(schedule.timeWindowLabel || schedule.timeWindow || "");
  if (!label) return null;
  const m = label.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?\s*[–—-]/i);
  if (!m) return null;
  let h = parseInt(m[1]);
  const min = parseInt(m[2]);
  const startPeriod = m[3]?.toUpperCase() ?? null;
  if (startPeriod === null) {
    // No explicit period on start: "4:00-5:00 PM" → start inherits PM from end
    if (/PM\s*$/i.test(label) && h < 12) h += 12;
  } else {
    if (startPeriod === "PM" && h !== 12) h += 12;
    if (startPeriod === "AM" && h === 12) h = 0;
  }
  let totalMins = h * 60 + min - 30;
  if (totalMins < 0) totalMins += 1440;
  const nh = Math.floor(totalMins / 60) % 24;
  const nm = totalMins % 60;
  const period = nh >= 12 ? "PM" : "AM";
  const h12 = nh % 12 || 12;
  return `${h12}:${String(nm).padStart(2, "0")} ${period}`;
}

// ── Kitchen quantity system ───────────────────────────────────────────────────

// Canonical units for internal calculations. Display labels are added at format time.
const UNITS = Object.freeze({ LB: "lb", QT: "qt", OZ: "oz", PCS: "pcs" });

// Maps any unit string variant to a canonical unit.
// Returns null for unrecognised strings so callers can log a diagnostic.
function normalizeOrderUnit(raw) {
  const s = String(raw ?? "").trim().toLowerCase();
  if (s === "lb" || s === "lbs" || s === "pound" || s === "pounds") return UNITS.LB;
  if (s === "qt" || s === "quart" || s === "quarts")                return UNITS.QT;
  if (s === "oz" || s === "ounce" || s === "ounces")                return UNITS.OZ;
  if (s === "pcs" || s === "pc" || s === "piece" || s === "pieces" ||
      s === "шт" || s === "шт." || s === "штук" || s === "штуки")  return UNITS.PCS;
  return null;
}

// Formats a numeric quantity without trailing zeros.
//   fmtNum(2)   → "2"
//   fmtNum(2.5) → "2.5"
//   fmtNum(2.0) → "2"
function fmtNum(n) {
  if (!isFinite(n) || isNaN(n)) return "?";
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 1000) / 1000).replace(/\.?0+$/, "");
}

// Converts oz to grams, rounded to nearest 10 g for kitchen readability.
function ozToGrams(oz) { return Math.round(oz * 28.3495 / 10) * 10; }

// Converts qt to litres, rounded to nearest 0.5 L.
function qtToLitres(qt) { return Math.round(qt * 0.946353 * 2) / 2; }

// Extracts a structured {value, unit} from a dish's legacy text fields.
// Returns null when size cannot be determined (triggers fallback warning).
function parseSizeFromLegacy(it) {
  const u  = normalizeOrderUnit(it.unit ?? "");
  const sr = String(it.sizeRu ?? "");

  if (u === UNITS.LB) {
    const m = sr.match(/(\d+(?:\.\d+)?)\s*lb/i);
    if (m) return { value: parseFloat(m[1]), unit: UNITS.LB };
    return { value: 1, unit: UNITS.LB }; // safe fallback for lb items
  }
  if (u === UNITS.QT) {
    const m = sr.match(/(\d+(?:\.\d+)?)\s*qt/i);
    if (m) return { value: parseFloat(m[1]), unit: UNITS.QT };
    return { value: 1, unit: UNITS.QT };
  }
  if (u === UNITS.OZ) {
    const m = sr.match(/(\d+(?:\.\d+)?)\s*oz/i);
    if (m) return { value: parseFloat(m[1]), unit: UNITS.OZ };
    return null;
  }
  if (u === UNITS.PCS || u === null) {
    // oz-labelled add-ons with unit=pcs (e.g. "3.5 oz (примерно 100 г)")
    const mOz = sr.match(/^(\d+(?:\.\d+)?)\s*oz/i);
    if (mOz) return { value: parseFloat(mOz[1]), unit: UNITS.OZ };
    // штуки: "4 шт.", "2 штуки", "5–6 шт." (use lower bound of range)
    const mSht = sr.match(/^(\d+)/);
    if (mSht && /шт|pcs|pс/i.test(sr)) return { value: parseInt(mSht[1], 10), unit: UNITS.PCS };
    // generic шт. unit
    if (it.unit === "шт." || it.unit === "шт") return { value: 1, unit: UNITS.PCS };
    return null;
  }
  return null;
}

// Determines {value, unit} of one sellable unit from the item snapshot.
// Priority: orderSize (structured) → sizeRu/unit fallback (legacy).
// Returns { size: {value, unit}, source: "structured"|"fallback" }.
function resolveSingleUnitSize(it) {
  // Priority 1: structured orderSize
  if (it.orderSize && it.orderSize.unit && it.orderSize.value != null) {
    const u = normalizeOrderUnit(it.orderSize.unit);
    const v = Number(it.orderSize.value);
    if (u && isFinite(v) && v > 0) {
      return { size: { value: v, unit: u }, source: "structured" };
    }
  }
  // Priority 2: legacy sizeRu/unit text (with diagnostic warning)
  const parsed = parseSizeFromLegacy(it);
  if (parsed) {
    console.warn(`[Kitchen PDF] fallback: dish "${it.id ?? it.name}" uses parsed sizeRu instead of orderSize`);
    return { size: parsed, source: "fallback" };
  }
  // Priority 3: last-resort (should not normally reach here)
  console.warn(`[Kitchen PDF] unknown size: dish "${it.id ?? it.name}" — defaulting to 1 pcs`);
  return { size: { value: 1, unit: UNITS.PCS }, source: "fallback" };
}

// Calculates kitchen quantity for an ordered item.
// Returns { value, unit, approximate } where approximate may be null.
// Formula: single-unit size × quantity.
function calculateKitchenQuantity(it) {
  const qty = Number(it.quantity ?? 1);

  // Composite: pcs + approximateWeight lb (e.g. liver cake: 1 pcs / ~3 lb)
  const os = it.orderSize;
  if (os && normalizeOrderUnit(os.unit) === UNITS.PCS) {
    const aw = it.approximateWeight;
    if (aw && normalizeOrderUnit(aw.unit) === UNITS.LB) {
      const pieces = os.value * qty;
      const lbs    = aw.value * qty;
      return { value: pieces, unit: UNITS.PCS, approximate: { value: lbs, unit: UNITS.LB } };
    }
  }

  const { size } = resolveSingleUnitSize(it);
  return { value: size.value * qty, unit: size.unit, approximate: null };
}

// Formats a calculateKitchenQuantity result for the kitchen PDF label.
// Returns an UPPERCASE string ready for the PDF.
function formatKitchenQuantity(calc) {
  const { value, unit, approximate } = calc;
  const v = fmtNum(value);

  if (unit === UNITS.PCS) {
    if (approximate && approximate.unit === UNITS.LB) {
      return `${v} шт. / примерно ${fmtNum(approximate.value)} lb`;
    }
    return `${v} шт.`;
  }
  if (unit === UNITS.LB) return `${v} lb`;
  if (unit === UNITS.QT) {
    const litres = fmtNum(qtToLitres(value));
    return `${v} qt / примерно ${litres} л`;
  }
  if (unit === UNITS.OZ) {
    const grams = ozToGrams(value);
    return `${v} oz (примерно ${grams} г)`;
  }
  return `${v} шт.`; // safe fallback
}

// Convenience wrapper: item → formatted kitchen quantity string.
function formatPdfItemQty(it) {
  return formatKitchenQuantity(calculateKitchenQuantity(it));
}

// ── Kitchen order PDF ─────────────────────────────────────────────────────────

async function buildKitchenOrderPdf({ orderId, customer, schedule, orderItems, notes }) {
  const fontResp = await fetch(NOTO_SANS_TTF_URL, {
    cf: { cacheTtl: 86400, cacheEverything: true },
  });
  if (!fontResp.ok) throw new Error(`Font fetch failed: ${fontResp.status}`);
  const fontBytes = new Uint8Array(await fontResp.arrayBuffer());

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  const font = await pdfDoc.embedFont(fontBytes);

  const PAGE_W = 595.28;
  const PAGE_H = 841.89;
  const ML = 50;
  const MR = 50;
  const MT = 50;
  const MB = 60; // bottom margin — page numbers sit at y=28, content must stay above MB
  const contentW = PAGE_W - ML - MR;

  // Merge duplicate dish IDs before measuring
  const merged = new Map();
  for (const it of orderItems) {
    const prev = merged.get(it.id);
    if (prev) { prev.quantity += it.quantity; }
    else { merged.set(it.id, { ...it }); }
  }
  const items = Array.from(merged.values());
  const totalItems = items.length;

  // Adaptive font size: 20pt ≤10 items, 18pt 11–18, 16pt ≥19
  const itemSz = totalItems <= 10 ? 20 : totalItems <= 18 ? 18 : 16;

  const pages = [];
  let curPage;
  let y;

  function put(text, x, sz, color = rgb(0, 0, 0)) {
    curPage.drawText(String(text), { x, y, size: sz, font, color });
  }
  function putBold(text, x, sz, color = rgb(0, 0, 0)) {
    curPage.drawText(String(text), { x, y, size: sz, font, color });
  }
  function nl(sz, gap = 5) { y -= sz + gap; }
  function hr(gray = 0.5, wt = 0.5) {
    curPage.drawLine({
      start: { x: ML, y }, end: { x: PAGE_W - MR, y },
      thickness: wt, color: rgb(gray, gray, gray),
    });
    y -= 16;
  }
  function wrapText(text, sz) {
    const words = text.split(" ");
    const lines = [];
    let cur = "";
    for (const w of words) {
      const test = cur ? `${cur} ${w}` : w;
      if (font.widthOfTextAtSize(test, sz) <= contentW) { cur = test; }
      else { if (cur) lines.push(cur); cur = w; }
    }
    if (cur) lines.push(cur);
    return lines.length ? lines : [text];
  }
  // Pre-measure full height of one dish item (all wrapped lines + spacing)
  function calcItemH(label, sz) {
    return wrapText(label, sz).length * (sz + 8) + 4;
  }
  // Returns true when content of `needed` height won't fit above bottom margin
  function needsNewPage(needed) {
    return y - needed < MB;
  }

  function newPage() {
    const pg = pdfDoc.addPage([PAGE_W, PAGE_H]);
    pages.push(pg);
    curPage = pg;
    y = PAGE_H - MT;
  }

  // Compact header for page 2+: order ID, client, item range or comment note
  function addContinuationHeader(firstItemIdx, isCommentCont = false) {
    const sz = 11;
    const h1 = `ЗАКАЗ-НАРЯД № ${orderId} — ПРОДОЛЖЕНИЕ`;
    curPage.drawText(h1, { x: (PAGE_W - font.widthOfTextAtSize(h1, sz)) / 2, y, size: sz, font, color: rgb(0.2, 0.2, 0.2) });
    y -= sz + 4;
    curPage.drawText(`КЛИЕНТ: ${(customer?.name ?? "").trim()}`, { x: ML, y, size: sz, font, color: rgb(0.2, 0.2, 0.2) });
    y -= sz + 4;
    const h3 = isCommentCont
      ? "ОСОБЕННОСТИ ЗАКАЗА (ПРОДОЛЖЕНИЕ)"
      : `ПОЗИЦИИ ${firstItemIdx}–${totalItems} ИЗ ${totalItems}`;
    curPage.drawText(h3, { x: ML, y, size: sz, font, color: rgb(0.3, 0.3, 0.3) });
    y -= sz + 4;
    curPage.drawLine({ start: { x: ML, y }, end: { x: PAGE_W - MR, y }, thickness: 0.5, color: rgb(0.5, 0.5, 0.5) });
    y -= 14;
  }

  // ── First page ────────────────────────────────────────────────────────────
  newPage();

  // Title
  const titleSz = 16;
  const titleText = `ЗАКАЗ-НАРЯД № ${orderId}`;
  put(titleText, (PAGE_W - font.widthOfTextAtSize(titleText, titleSz)) / 2, titleSz, rgb(0.05, 0.05, 0.05));
  nl(titleSz, 10);
  hr(0.25, 1.5);

  // Client name
  y -= 2;
  putBold(`КЛИЕНТ: ${(customer?.name ?? "").trim()}`, ML, 17);
  nl(17, 4);

  // Total items count on first page
  put(`ВСЕГО ПОЗИЦИЙ: ${totalItems}`, ML, 13, rgb(0.2, 0.2, 0.2));
  nl(13, 4);
  hr(0.4);

  // Date: large, uppercase
  y -= 6;
  const readableDateRu = (() => {
    try {
      return new Intl.DateTimeFormat("ru-RU", {
        timeZone: "America/New_York",
        weekday: "long", year: "numeric", month: "long", day: "numeric",
      }).format(new Date(`${schedule.date}T00:00:00-05:00`));
    } catch {
      return schedule.date ?? "";
    }
  })();
  const dateSz = 24;
  const dateStr = readableDateRu.toUpperCase();
  put(dateStr, Math.max(ML, (PAGE_W - font.widthOfTextAtSize(dateStr, dateSz)) / 2), dateSz, rgb(0.07, 0.07, 0.07));
  nl(dateSz, 10);

  // Ready-by: maximum prominence, dark red
  const readyBy = computeReadyByTime(schedule);
  let readyByLabel;
  if (readyBy) {
    readyByLabel = readyBy;
  } else {
    console.warn("[PDF] Cannot parse time window:", schedule.timeWindowLabel, "/", schedule.timeWindow);
    readyByLabel = String(schedule.timeWindowLabel || schedule.timeWindow || "").split(/[–—-]/)[0].trim() || "—";
  }
  const readyBySz = 26;
  const readyByStr = `ГОТОВО К: ${readyByLabel}`;
  put(readyByStr, Math.max(ML, (PAGE_W - font.widthOfTextAtSize(readyByStr, readyBySz)) / 2), readyBySz, rgb(0.65, 0.05, 0.05));
  nl(readyBySz, 14);
  hr();

  // ── Items: numbered, uppercase, word-wrapped, multi-page ─────────────────
  let renderedCount = 0;

  for (let idx = 0; idx < items.length; idx++) {
    const it = items[idx];
    const itemNum = idx + 1;
    const label = `${itemNum}. □ ${it.name} — ${formatPdfItemQty(it)}`.toUpperCase();
    const needed = calcItemH(label, itemSz);

    // If the full item doesn't fit, start a new page before drawing it
    if (needsNewPage(needed)) {
      newPage();
      addContinuationHeader(itemNum);
    }

    const lines = wrapText(label, itemSz);
    for (let li = 0; li < lines.length; li++) {
      put(lines[li], li === 0 ? ML : ML + 26, itemSz);
      nl(itemSz, 8);
    }
    y -= 4;
    renderedCount++;
  }

  // ── Internal validation: detect any item loss before saving ───────────────
  if (renderedCount !== totalItems) {
    console.error(`[PDF] item count mismatch: expected ${totalItems}, rendered ${renderedCount}`);
    console.error(`[PDF] numbering mismatch: expected 1–${totalItems}, rendered 1–${renderedCount}`);
    throw new Error(`PDF item count mismatch: expected ${totalItems}, rendered ${renderedCount}`);
  }

  // ── Comment section ───────────────────────────────────────────────────────
  // "Нет" values are meaningful in the Telegram message but noise in the kitchen PDF.
  const fullComment = [(notes?.allergies ?? "").trim(), (notes?.orderNotes ?? "").trim()]
    .filter(line => line && line.toLowerCase() !== "нет")
    .join("\n");
  if (fullComment) {
    // Minimum space to start section: hr(16) + title(13+10) + one line(12+5) ≈ 56
    if (needsNewPage(56)) {
      newPage();
      addContinuationHeader(0, true);
    }
    y -= 4;
    hr();
    put("ОСОБЕННОСТИ ЗАКАЗА:", ML, 13, rgb(0.1, 0.1, 0.1));
    nl(13, 10);
    const commentSz = 12;
    for (const line of fullComment.split("\n")) {
      if (!line.trim()) continue;
      const wrapped = wrapText(`• ${line.trim()}`, commentSz);
      for (let li = 0; li < wrapped.length; li++) {
        if (needsNewPage(commentSz + 5)) {
          newPage();
          addContinuationHeader(0, true);
        }
        put(wrapped[li], li === 0 ? ML : ML + 16, commentSz);
        nl(commentSz, 5);
      }
      y -= 3;
    }
  }

  // ── Page numbers: added last so total page count is known ─────────────────
  const totalPages = pages.length;
  const pageNumSz = 9;
  for (let i = 0; i < pages.length; i++) {
    const pageNumText = `СТРАНИЦА ${i + 1} ИЗ ${totalPages}`;
    const tw = font.widthOfTextAtSize(pageNumText, pageNumSz);
    pages[i].drawText(pageNumText, {
      x: (PAGE_W - tw) / 2,
      y: 28,
      size: pageNumSz,
      font,
      color: rgb(0.5, 0.5, 0.5),
    });
  }

  return pdfDoc.save();
}

async function sendKitchenOrderPdf(env, orderId, pdfBytes) {
  const recipients = [env.TELEGRAM_CHAT_ID, env.TELEGRAM_SECONDARY_CHAT_ID].filter(Boolean);
  for (const chatId of recipients) {
    const form = new FormData();
    form.append("chat_id", String(chatId));
    form.append("caption", `📋 Заказ-наряд ${orderId}`);
    form.append("document", new Blob([pdfBytes], { type: "application/pdf" }), `zakaznaryad-${orderId}.pdf`);
    const resp = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendDocument`, {
      method: "POST",
      body: form,
    });
    if (!resp.ok) {
      const errText = await resp.text().catch(() => "");
      console.error(`[PDF] sendDocument failed (${chatId}):`, errText.slice(0, 200));
    }
  }
}

// ── Core preorder handler ─────────────────────────────────────────────────────

async function handlePreorder(request, env, json) {
  const ip = request.headers.get("CF-Connecting-IP") || "";
  if (!checkRateLimit(ip)) {
    return json({ ok: false, error: "rate_limited", message: "Too many requests. Please try again in 15 minutes." }, 429);
  }

  // Content-Type guard
  if (!(request.headers.get("Content-Type") || "").includes("application/json")) {
    return json({ ok: false, error: "invalid_content_type", message: "Expected JSON body." }, 400);
  }

  // Body size guard
  const bodyText = await request.text();
  if (bodyText.length > MAX_BODY_SIZE) {
    return json({ ok: false, error: "body_too_large", message: "Request too large." }, 413);
  }

  let body;
  try {
    body = JSON.parse(bodyText);
  } catch {
    return json({ ok: false, error: "invalid_json", message: "Could not parse JSON." }, 400);
  }

  // ── Test mode guard ─────────────────────────────────────────────────────────
  // If testMode flag is set, validate the token before doing anything else.
  // Invalid token → safe 403, nothing is sent externally.
  // Valid token → continue through ALL real checks, skip Telegram at the end.
  const isTestMode = body.testMode === true;
  if (isTestMode) {
    const testToken = String(body.testToken || "");
    const envToken = String(env.TEST_TOKEN || "");
    if (!envToken || testToken !== envToken) {
      return json({ ok: false, error: "test_auth_failed", message: "Test mode requires a valid token." }, 403);
    }
  }

  // Honeypot: bots fill hidden fields, humans don't
  if (body._hp) {
    return json({ ok: true, orderId: generateOrderId() });
  }

  const { items, customer, delivery, schedule, notes = {} } = body;

  // ── Required field validation ──────────────────────────────────────────────
  if (!Array.isArray(items) || items.length === 0)
    return json({ ok: false, error: "empty_cart",       message: "Cart cannot be empty."                }, 400);
  if (!customer?.name?.trim())
    return json({ ok: false, error: "missing_name",     message: "Full name is required."               }, 400);
  if (!customer?.phone?.trim())
    return json({ ok: false, error: "missing_phone",    message: "Phone number is required."            }, 400);
  if (!customer?.contactMethod)
    return json({ ok: false, error: "missing_contact",  message: "Contact method is required."          }, 400);
  if (!delivery?.zone)
    return json({ ok: false, error: "missing_zone",     message: "Delivery zone is required."           }, 400);
  if (!delivery?.address?.trim())
    return json({ ok: false, error: "missing_address",  message: "Delivery address is required."        }, 400);
  if (!delivery?.city?.trim())
    return json({ ok: false, error: "missing_city",     message: "City is required."                    }, 400);
  if (!delivery?.zip?.trim())
    return json({ ok: false, error: "missing_zip",      message: "ZIP is required."                     }, 400);
  if (!schedule?.date)
    return json({ ok: false, error: "missing_date",     message: "Delivery date is required."           }, 400);
  if (!schedule?.timeWindowLabel)
    return json({ ok: false, error: "missing_time",     message: "Delivery time window is required."    }, 400);
  if (!schedule?.timeWindow)
    return json({ ok: false, error: "missing_time",     message: "Delivery time window is required."    }, 400);

  // ── Field length guards ────────────────────────────────────────────────────
  if ((customer.name   || "").length > 100) return json({ ok: false, error: "field_too_long", message: "Name too long."    }, 400);
  if ((customer.phone  || "").length >  30) return json({ ok: false, error: "field_too_long", message: "Phone too long."   }, 400);
  if ((delivery.address|| "").length > 500) return json({ ok: false, error: "field_too_long", message: "Address too long." }, 400);

  // ── Zone: derived server-side from ZIP (frontend zone is not trusted) ────────
  const serverZone = zipToZoneKey(delivery.zip);
  const zoneConfig = DELIVERY_ZONES[serverZone];
  const frontendZone = delivery.zone;
  const zoneMismatch = frontendZone && frontendZone !== serverZone
    ? {
        frontendZone,
        frontendZoneLabel: DELIVERY_ZONES[frontendZone]?.letter ?? frontendZone,
        serverZone,
        serverZoneLabel: zoneConfig.letter,
      }
    : null;

  // Build delivery object with server-computed zone (frontend zone not trusted)
  const serverDelivery = { ...delivery, zone: serverZone };

  // ── Date validation (must be tomorrow or later, Miami time) ───────────────
  const todayStr = getMiamiDateStr();
  const todayISO = `${todayStr.slice(0, 4)}-${todayStr.slice(4, 6)}-${todayStr.slice(6)}`;
  if (!schedule.date || schedule.date <= todayISO)
    return json({ ok: false, error: "date_too_soon", message: "Delivery date must be tomorrow or later." }, 400);

  // ── Load menu catalog (cached at CDN) ─────────────────────────────────────
  let dishes;
  try {
    dishes = await fetchMenuWithCache();
  } catch {
    return json({ ok: false, error: "catalog_unavailable", message: "Menu temporarily unavailable. Please try again." }, 500);
  }
  const dishMap = new Map(dishes.map((d) => [d.id, d]));

  // ── Validate items and compute server-side subtotal ───────────────────────
  const orderItems = [];
  let foodSubtotal = 0;

  for (const item of items) {
    if (typeof item.id !== "string" || !item.id)
      return json({ ok: false, error: "invalid_item", message: "Invalid item ID." }, 400);
    if (typeof item.quantity !== "number" || !isFinite(item.quantity) || item.quantity <= 0 || item.quantity > 200)
      return json({ ok: false, error: "invalid_quantity", message: `Invalid quantity for item: ${item.id}` }, 400);

    const dish = dishMap.get(item.id);
    if (!dish)
      return json({ ok: false, error: "unknown_item", message: `Item not found: ${item.id}` }, 400);

    const lineTotal = dish.price * item.quantity;
    foodSubtotal += lineTotal;

    const dishName = typeof dish.name === "object"
      ? (dish.name.ru ?? dish.name.en ?? String(dish.name))
      : String(dish.name);

    orderItems.push({ id: dish.id, name: dishName, quantity: item.quantity, unit: dish.unit ?? null, category: dish.category ?? null, orderUnitRu: dish.orderUnitRu ?? null, sizeRu: dish.sizeRu ?? null, orderSize: dish.orderSize ?? null, approximateWeight: dish.approximateWeight ?? null, unitPrice: dish.price, lineTotal });
  }

  // ── Minimum order check (food subtotal only, delivery excluded) ───────────
  if (foodSubtotal < zoneConfig.minOrder) {
    return json({
      ok: false, error: "below_minimum",
      message: `Minimum food subtotal for this area is $${zoneConfig.minOrder}. Current: $${foodSubtotal.toFixed(2)}.`,
    }, 400);
  }

  // ── Compute server-side delivery pricing ──────────────────────────────────
  const isZoneC = serverZone === "3";
  const isRemote = serverZone === "remote";
  const isFree  = foodSubtotal >= zoneConfig.freeAt;
  const deliveryFee   = isZoneC || isRemote ? null : (isFree ? 0 : zoneConfig.fee);
  const orderTotal    = isZoneC || isRemote ? null : foodSubtotal + deliveryFee;
  const pricing = {
    foodSubtotal,
    deliveryFee,
    orderTotal,
    preliminaryDeliveryFee: isZoneC ? zoneConfig.fee : null,
    preliminaryOrderTotal: isZoneC ? foodSubtotal + zoneConfig.fee : null,
    freeDelivery:         !isZoneC && !isRemote && isFree,
    freeDeliveryPossible:  isZoneC && isFree,
    requiresManualConfirmation: isZoneC || isRemote,
  };

  // ── Generate server-side order ID ─────────────────────────────────────────
  const orderId = generateOrderId();

  // ── Test mode: return detailed result without sending to Telegram ─────────
  if (isTestMode) {
    const testBuf = new Uint32Array(1);
    crypto.getRandomValues(testBuf);
    const testId = `TEST-${getMiamiDateStr()}-${1000 + (testBuf[0] % 9000)}`;
    console.log(`[TEST ORDER] ${testId} zone=${serverZone}(${zoneConfig.letter}) fee=${pricing.deliveryFee ?? "TBD"} subtotal=${pricing.foodSubtotal} total=${pricing.orderTotal ?? "TBD"}`);
    // Include formatted order lines so test-mode callers can verify the Telegram message format.
    const orderItemsFormatted = orderItems.map((it) => {
      const unitLabel = getOrderUnitRu(it);
      const qtyPart = it.quantity !== 1 ? ` × ${it.quantity}` : "";
      return `• ${it.name} ${unitLabel}${qtyPart} — $${it.lineTotal.toFixed(2)}`;
    });
    return json({
      ok: true,
      testMode: true,
      orderId: testId,
      zone: serverZone,
      zoneLetter: zoneConfig.letter,
      // Zone A/B: confirmed fee. Zone C/Remote: null (requires manual confirmation).
      deliveryFee: pricing.deliveryFee,
      // Zone C only: preliminary $20 (not final). null for all other zones.
      preliminaryDeliveryFee: pricing.preliminaryDeliveryFee,
      requiresManualConfirmation: pricing.requiresManualConfirmation,
      minimumOrder: zoneConfig.minOrder,
      freeDeliveryApplied: pricing.freeDelivery ?? false,
      subtotal: pricing.foodSubtotal,
      total: pricing.orderTotal,
      pricing,
      orderItemsFormatted,
    });
  }

  // ── Send Telegram notification ────────────────────────────────────────────
  const tgMessage = buildTelegramMessage({ orderId, customer, delivery: serverDelivery, schedule, orderItems, pricing, notes, zoneMismatch });
  const tgResult = await sendTelegramToRecipients(env, {
    text: tgMessage,
    parse_mode: "HTML",
    reply_markup: buildStatusKeyboard(orderId),
  });

  if (!tgResult.ok) {
    return json({ ok: false, error: "delivery_failed", message: "Failed to send your order. Please try again or contact us directly." }, 500);
  }

  // ── Kitchen order PDF (fire-and-forget — never fails the main request) ────
  try {
    const pdfBytes = await buildKitchenOrderPdf({ orderId, customer, schedule, orderItems, notes });
    await sendKitchenOrderPdf(env, orderId, pdfBytes);
  } catch (pdfErr) {
    console.error("[PDF] Kitchen order PDF failed:", pdfErr?.message ?? String(pdfErr));
  }

  return json({ ok: true, orderId, pricing });
}

async function answerCallback(env, callbackQueryId, text = "OK") {
  if (!callbackQueryId) return;
  await callTelegram(env, "answerCallbackQuery", {
    callback_query_id: callbackQueryId,
    text,
    show_alert: false,
  }).catch(() => {});
}

async function handleTelegramWebhook(request, env) {
  if (request.method !== "POST") {
    return new Response("OK", { status: 200 });
  }

  const secretHeader = request.headers.get("X-Telegram-Bot-Api-Secret-Token") || "";
  if (!env.TELEGRAM_WEBHOOK_SECRET || secretHeader !== env.TELEGRAM_WEBHOOK_SECRET) {
    return new Response("OK", { status: 200 });
  }

  let update;
  try {
    update = await request.json();
  } catch {
    return new Response("OK", { status: 200 });
  }

  const callback = update?.callback_query;
  if (!callback) {
    return new Response("OK", { status: 200 });
  }

  const chatId = String(callback.message?.chat?.id ?? "");
  if (chatId !== String(env.TELEGRAM_CHAT_ID)) {
    await answerCallback(env, callback.id);
    return new Response("OK", { status: 200 });
  }

  const [prefix, status, orderId] = String(callback.data || "").split(":");
  if (prefix !== "st" || !ORDER_STATUSES[status] || !orderId?.startsWith("LK-")) {
    await answerCallback(env, callback.id);
    return new Response("OK", { status: 200 });
  }

  await answerCallback(env, callback.id, ORDER_STATUSES[status]);

  const message = callback.message;
  const updatedText = replaceStatusBlock(message.text || message.caption || "", ORDER_STATUSES[status]);
  const editPayload = {
    chat_id: message.chat.id,
    message_id: message.message_id,
    text: updatedText,
    reply_markup: buildStatusKeyboard(orderId),
  };
  if (message.entities?.length) editPayload.entities = message.entities;

  await callTelegram(env, "editMessageText", editPayload).catch(() => {});
  return new Response("OK", { status: 200 });
}

// ── Custom Order handler ──────────────────────────────────────────────────────

async function handleCustomOrder(request, env, json) {
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return json({ ok: false, error: "rate_limited", message: "Too many requests. Try again in 15 minutes." }, 429);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Honeypot: hidden field must be empty
  if (body._hp) {
    return json({ ok: true }); // silently accept
  }

  // Test mode validation — mirrors handlePreorder pattern:
  // testMode:true with any token (including empty) → must validate against secret.
  // If TOKEN env var is absent or tokens don't match → always 403, never reach Telegram.
  const isTestMode = body.testMode === true;
  if (isTestMode) {
    const testToken = String(body.testToken || "");
    const envToken  = String(env.TEST_TOKEN || "");
    if (!envToken || testToken !== envToken) {
      return json({ ok: false, error: "invalid_test_token" }, 403);
    }
  }

  // Required field validation (server-side)
  const required = { name: body.name, phone: body.phone, orderType: body.orderType, guests: body.guests, date: body.date, description: body.description };
  for (const [key, val] of Object.entries(required)) {
    if (!val || !String(val).trim()) {
      return json({ ok: false, error: "validation_error", field: key, message: `Missing required field: ${key}` }, 400);
    }
  }

  // Sanitise
  const s = (v) => String(v ?? "").trim().slice(0, 500);
  const name        = s(body.name);
  const phone       = s(body.phone);
  const orderType   = s(body.orderType);
  const guests      = s(body.guests);
  const date        = s(body.date);
  const time        = s(body.time);
  const description = s(body.description);
  const city        = s(body.city);
  const zip         = s(body.zip);
  const address     = s(body.address);
  const comment     = s(body.comment);
  const lang        = ["ru", "en", "uk"].includes(body.lang) ? body.lang : "ru";

  const orderId = generateCustomOrderId();

  const orderTypeLabels = {
    birthday: "День рождения / Birthday",
    family:   "Семейный ужин / Family dinner",
    catering: "Кейтеринг / Catering",
    custom:   "Блюда по договорённости / Custom dishes",
    other:    "Другое / Other",
  };

  const dateLabel = (() => {
    try { return getReadableDate(date); } catch { return date; }
  })();

  const locationLines = [city, zip, address].filter(Boolean).join(", ");

  const tgMessage = `🟡 <b>CUSTOM ORDER REQUEST</b>
${esc(orderId)}

Имя: ${esc(name)}
Телефон: ${esc(phone)}
Язык: ${esc(lang)}

<b>ЗАКАЗ</b>
Тип: ${esc(orderTypeLabels[orderType] ?? orderType)}
Гостей / порций: ${esc(guests)}
Дата: ${esc(dateLabel)}${time ? `\nВремя: ${esc(time)}` : ""}

<b>Описание:</b>
${esc(description)}
${locationLines ? `\n<b>Адрес:</b>\n${esc(locationLines)}` : ""}${comment ? `\n<b>Комментарий:</b>\n${esc(comment)}` : ""}

Подано: ${getMiamiTimeLabel()} ET`;

  if (!isTestMode) {
    const tgRes = await sendTelegramToRecipients(env, {
      text:       tgMessage,
      parse_mode: "HTML",
    });
    if (!tgRes.ok) {
      return json({ ok: false, error: "telegram_error", message: "Failed to deliver request." }, 502);
    }
  }

  return json({ ok: true, orderId, testMode: isTestMode || undefined });
}

// ── Contact request handler ───────────────────────────────────────────────────

async function handleContactRequest(request, env, json) {
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return json({ ok: false, error: "rate_limited", message: "Too many requests. Try again in 15 minutes." }, 429);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Honeypot: hidden field must be empty
  if (body._hp) {
    return json({ ok: true }); // silently accept
  }

  // Test mode validation
  const isTestMode = body.testMode === true;
  if (isTestMode) {
    const testToken = String(body.testToken || "");
    const envToken  = String(env.TEST_TOKEN || "");
    if (!envToken || testToken !== envToken) {
      return json({ ok: false, error: "invalid_test_token" }, 403);
    }
  }

  // Required field validation
  const required = { name: body.name, phone: body.phone, topic: body.topic, message: body.message };
  for (const [key, val] of Object.entries(required)) {
    if (!val || !String(val).trim()) {
      return json({ ok: false, error: "validation_error", field: key, message: `Missing required field: ${key}` }, 400);
    }
  }

  // Sanitise
  const s = (v) => String(v ?? "").trim().slice(0, 500);
  const name        = s(body.name);
  const phone       = s(body.phone);
  const topic       = s(body.topic);
  const message     = s(body.message);
  const date        = s(body.date);
  const guests      = s(body.guests);
  const area        = s(body.area);
  const contactPref = s(body.contactPref);
  const comment     = s(body.comment);
  const lang        = ["ru", "en", "uk"].includes(body.lang) ? body.lang : "ru";

  const contactId = generateContactId();

  const topicLabels = {
    menu:        "Menu question / Вопрос по меню",
    custom:      "Custom order / Индивидуальный заказ",
    celebration: "Celebration / Праздник",
    catering:    "Catering / Кейтеринг",
    other:       "Other / Другое",
  };

  const dateLabel = date
    ? (() => { try { return getReadableDate(date); } catch { return date; } })()
    : "";

  const optionalLines = [
    dateLabel    ? `Preferred date: ${esc(dateLabel)}` : "",
    guests       ? `Guests/portions: ${esc(guests)}`   : "",
    area         ? `Area / ZIP: ${esc(area)}`           : "",
    contactPref  ? `Preferred contact: ${esc(contactPref)}` : "",
  ].filter(Boolean).join("\n");

  const tgMessage = `📩 <b>NEW CONTACT REQUEST</b>
ID: ${esc(contactId)}

Name: ${esc(name)}
Phone: ${esc(phone)}
Topic: ${esc(topicLabels[topic] ?? topic)}
${optionalLines ? optionalLines + "\n" : ""}
<b>Message:</b>
${esc(message)}
${comment ? `\n<b>Comment:</b>\n${esc(comment)}` : ""}
Lang: ${esc(lang)}
Sent: ${getMiamiTimeLabel()} ET`;

  if (!isTestMode) {
    const tgRes = await sendTelegramToRecipients(env, {
      text:       tgMessage,
      parse_mode: "HTML",
    });
    if (!tgRes.ok) {
      return json({ ok: false, error: "telegram_error", message: "Failed to deliver message." }, 502);
    }
  }

  return json({ ok: true, contactId, testMode: isTestMode || undefined });
}

// ── Entry point ───────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    const url    = new URL(request.url);
    const origin = request.headers.get("Origin") ?? "";
    const allowed = env.ALLOWED_ORIGIN ?? "https://lanaskitchenmiami.com";

    if (url.pathname === "/telegram-webhook") {
      return handleTelegramWebhook(request, env);
    }

    // Allowed origins: production (with and without www) + localhost/LAN for dev
    const allowedOrigins = new Set([
      allowed,                                // https://lanaskitchenmiami.com
      allowed.replace("://", "://www."),      // https://www.lanaskitchenmiami.com
    ]);
    // Dev origins: loopback + exact LAN origin for iPhone testing.
    const isLocalhost = origin.startsWith("http://localhost")
      || origin.startsWith("http://127.0.0.1")
      || origin === "http://192.168.1.85:4321";
    const isAllowedOrigin = allowedOrigins.has(origin) || isLocalhost;

    const corsHeaders = {
      "Access-Control-Allow-Origin":  isAllowedOrigin ? origin : "",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age":       "86400",
    };

    // json() helper: includes CORS headers on every response
    const json = (data, status = 200) =>
      new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // ── Google Places Autocomplete proxy ────────────────────────────────────────
    if (url.pathname === "/places") {
      if (request.method !== "GET") {
        return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, OPTIONS" } });
      }
      if (!isAllowedOrigin) {
        return json({ ok: false, error: "forbidden_origin" }, 403);
      }
      const placesIp = request.headers.get("CF-Connecting-IP") || "";
      if (!checkPlacesRateLimit(placesIp)) {
        return json({ ok: false, error: "rate_limited", suggestions: [] }, 429);
      }
      if (!env.GOOGLE_PLACES_KEY) {
        return json({ ok: false, error: "not_configured", suggestions: [] }, 200);
      }
      const rawInput = url.searchParams.get("input") || "";
      const sessionToken = (url.searchParams.get("sessiontoken") || "").slice(0, 128);
      // Validate input: 3–120 printable chars, no control characters
      if (!rawInput || rawInput.length < 3) {
        return json({ ok: true, suggestions: [] });
      }
      if (rawInput.length > PLACES_INPUT_MAX || /[\x00-\x1F]/.test(rawInput)) {
        return json({ ok: false, error: "invalid_input", suggestions: [] }, 400);
      }
      const input = rawInput.trim();
      try {
        const placesResp = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": env.GOOGLE_PLACES_KEY,
            "X-Goog-FieldMask": "suggestions.placePrediction.placeId,suggestions.placePrediction.text,suggestions.placePrediction.structuredFormat",
          },
          body: JSON.stringify({
            input,
            sessionToken: sessionToken || undefined,
            locationRestriction: {
              rectangle: {
                low:  { latitude: 25.46, longitude: -80.93 },
                high: { latitude: 26.37, longitude: -80.06 },
              },
            },
            includedRegionCodes: ["us"],
            languageCode: "en",
          }),
        });
        if (!placesResp.ok) {
          return json({ ok: false, error: "google_api_error", suggestions: [] }, 200);
        }
        const data = await placesResp.json();
        const suggestions = (data.suggestions || [])
          .filter((s) => s.placePrediction?.placeId)
          .slice(0, 5) // cap at 5 results
          .map((s) => ({
            placeId: s.placePrediction.placeId,
            text:    s.placePrediction.text?.text || "",
            main:    s.placePrediction.structuredFormat?.mainText?.text || "",
            secondary: s.placePrediction.structuredFormat?.secondaryText?.text || "",
          }));
        return json({ ok: true, suggestions });
      } catch (err) {
        console.error("Places autocomplete error:", err);
        return json({ ok: false, error: "internal_error", suggestions: [] }, 200);
      }
    }

    // ── Google Places Details proxy ─────────────────────────────────────────────
    if (url.pathname === "/places/details") {
      if (request.method !== "GET") {
        return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, OPTIONS" } });
      }
      if (!isAllowedOrigin) {
        return json({ ok: false, error: "forbidden_origin" }, 403);
      }
      const detailsIp = request.headers.get("CF-Connecting-IP") || "";
      if (!checkPlacesRateLimit(detailsIp)) {
        return json({ ok: false, error: "rate_limited" }, 429);
      }
      if (!env.GOOGLE_PLACES_KEY) {
        return json({ ok: false, error: "not_configured" }, 200);
      }
      const rawPlaceId = url.searchParams.get("placeId") || "";
      const sessionToken = (url.searchParams.get("sessiontoken") || "").slice(0, 128);
      // placeId: alphanumeric + underscores/hyphens, 10–500 chars
      if (!rawPlaceId || rawPlaceId.length < 10 || rawPlaceId.length > PLACES_ID_MAX || !/^[\w\-]+$/.test(rawPlaceId)) {
        return json({ ok: false, error: "invalid_place_id" }, 400);
      }
      try {
        const detailsResp = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(rawPlaceId)}`, {
          method: "GET",
          headers: {
            "X-Goog-Api-Key": env.GOOGLE_PLACES_KEY,
            "X-Goog-FieldMask": "addressComponents,formattedAddress",
            ...(sessionToken ? { "X-Goog-SessionToken": sessionToken } : {}),
          },
        });
        if (!detailsResp.ok) {
          return json({ ok: false, error: "google_api_error" }, 200);
        }
        const data = await detailsResp.json();
        const components = data.addressComponents || [];
        const get = (...types) => {
          const c = components.find((c) => types.every((t) => c.types?.includes(t)));
          return c?.longText || c?.shortText || "";
        };
        return json({
          ok: true,
          streetNumber: get("street_number"),
          route: get("route"),
          city: get("locality") || get("sublocality_level_1") || get("administrative_area_level_3"),
          state: get("administrative_area_level_1"),
          zip: get("postal_code"),
          formatted: data.formattedAddress || "",
        });
      } catch (err) {
        console.error("Places details error:", err);
        return json({ ok: false, error: "internal_error" }, 200);
      }
    }

    if (url.pathname === "/contact") {
      if (request.method !== "POST") {
        return new Response("Method not allowed", { status: 405, headers: { Allow: "POST, OPTIONS" } });
      }
      if (origin !== allowed) {
        return json({ ok: false, error: "forbidden_origin" }, 403);
      }
      try {
        return await handleContactRequest(request, env, json);
      } catch (err) {
        console.error("Unhandled contact error:", err);
        return json({ ok: false, error: "internal_error" }, 500);
      }
    }

    if (url.pathname === "/custom-order") {
      if (request.method !== "POST") {
        return new Response("Method not allowed", { status: 405, headers: { Allow: "POST, OPTIONS" } });
      }
      if (origin !== allowed) {
        return json({ ok: false, error: "forbidden_origin" }, 403);
      }
      try {
        return await handleCustomOrder(request, env, json);
      } catch (err) {
        console.error("Unhandled custom-order error:", err);
        return json({ ok: false, error: "internal_error" }, 500);
      }
    }

    if (url.pathname !== "/preorder") {
      return new Response("Not found", { status: 404 });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: { Allow: "POST, OPTIONS" } });
    }

    if (origin !== allowed) {
      return json({ ok: false, error: "forbidden_origin" }, 403);
    }

    try {
      return await handlePreorder(request, env, json);
    } catch (err) {
      console.error("Unhandled Worker error:", err);
      return json({ ok: false, error: "internal_error", message: "An unexpected error occurred." }, 500);
    }
  },
};
