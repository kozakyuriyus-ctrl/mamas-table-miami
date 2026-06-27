/**
 * Lana's Kitchen Miami — Preorder API
 * Cloudflare Worker: lanas-kitchen-preorder-api
 *
 * Endpoint: POST https://api.lanaskitchenmiami.com/preorder
 *
 * Secrets required (set via Cloudflare dashboard or `wrangler secret put`):
 *   TELEGRAM_BOT_TOKEN
 *   TELEGRAM_CHAT_ID
 *   TELEGRAM_WEBHOOK_SECRET
 *   TEST_TOKEN          ← secret for test mode (wrangler secret put TEST_TOKEN)
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
const MENU_CACHE_TTL_S = 300; // 5 minutes

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

// In-memory rate limit (resets on Worker cold start — acceptable for simple protection)
const rateLimitMap = new Map();

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
    const qty = it.unit === "lb" ? `${it.quantity} lb` : `× ${it.quantity}`;
    return `• ${esc(it.name)} ${qty} — $${it.lineTotal.toFixed(2)}`;
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
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 200)
      return json({ ok: false, error: "invalid_quantity", message: `Invalid quantity for item: ${item.id}` }, 400);

    const dish = dishMap.get(item.id);
    if (!dish)
      return json({ ok: false, error: "unknown_item", message: `Item not found: ${item.id}` }, 400);

    const lineTotal = dish.price * item.quantity;
    foodSubtotal += lineTotal;

    const dishName = typeof dish.name === "object"
      ? (dish.name.ru ?? dish.name.en ?? String(dish.name))
      : String(dish.name);

    orderItems.push({ id: dish.id, name: dishName, quantity: item.quantity, unit: dish.unit ?? null, unitPrice: dish.price, lineTotal });
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
    });
  }

  // ── Send Telegram notification ────────────────────────────────────────────
  const tgMessage = buildTelegramMessage({ orderId, customer, delivery: serverDelivery, schedule, orderItems, pricing, notes, zoneMismatch });
  const tgResp = await callTelegram(env, "sendMessage", {
    chat_id: env.TELEGRAM_CHAT_ID,
    text: tgMessage,
    parse_mode: "HTML",
    reply_markup: buildStatusKeyboard(orderId),
  });

  if (!tgResp.ok) {
    const err = await tgResp.json().catch(() => ({}));
    console.error("Telegram API error:", err.description ?? err);
    return json({ ok: false, error: "delivery_failed", message: "Failed to send your order. Please try again or contact us directly." }, 500);
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

  // Test mode validation
  const isTestMode = body.testMode === true && body.testToken;
  if (isTestMode && body.testToken !== env.TEST_TOKEN) {
    return json({ ok: false, error: "invalid_test_token" }, 403);
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
    const tgRes = await callTelegram(env, "sendMessage", {
      chat_id:    env.TELEGRAM_CHAT_ID,
      text:       tgMessage,
      parse_mode: "HTML",
    });
    if (!tgRes.ok) {
      const errText = await tgRes.text();
      console.error("Telegram error (custom-order):", tgRes.status, errText);
      return json({ ok: false, error: "telegram_error", message: "Failed to deliver request." }, 502);
    }
  }

  return json({ ok: true, orderId, testMode: isTestMode || undefined });
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

    const corsHeaders = {
      "Access-Control-Allow-Origin":  origin === allowed ? allowed : "",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
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
