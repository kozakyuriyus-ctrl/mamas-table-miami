/**
 * Lana's Kitchen Miami — Preorder API
 * Cloudflare Worker: lanas-kitchen-preorder-api
 *
 * Endpoint: POST https://api.lanaskitchenmiami.com/preorder
 *
 * Secrets required (set via Cloudflare dashboard or `wrangler secret put`):
 *   TELEGRAM_BOT_TOKEN
 *   TELEGRAM_CHAT_ID
 *
 * Var (set in wrangler.toml or dashboard):
 *   ALLOWED_ORIGIN = "https://lanaskitchenmiami.com"
 *
 * Menu catalog is fetched from https://lanaskitchenmiami.com/dishes.json
 * (single source of truth — cached 5 min at CDN level).
 *
 * Delivery zones MUST stay in sync with DELIVERY_ZONES in ../script.js
 */

// ── Delivery zone config (mirrors DELIVERY_ZONES in script.js) ───────────────
const DELIVERY_ZONES = {
  "1": {
    letter: "A",
    fee: 8,
    minOrder: 60,
    freeAt: 110,
    cities: "Hallandale Beach, Aventura, Sunny Isles Beach, North Miami Beach",
  },
  "2": {
    letter: "B",
    fee: 12,
    minOrder: 80,
    freeAt: 145,
    cities: "Hollywood, Dania Beach, North Miami",
  },
  "3": {
    letter: "C",
    fee: 20,
    minOrder: 120,
    freeAt: 200,
    requiresManualConfirmation: true,
    cities: "Fort Lauderdale, Miami Beach, Miami Shores",
  },
};

const MAX_BODY_SIZE = 32_000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MENU_CACHE_TTL_S = 300; // 5 minutes

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

/** Escape HTML entities for Telegram HTML parse_mode */
function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
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

// ── Telegram message builder ──────────────────────────────────────────────────

function buildTelegramMessage({ orderId, customer, delivery, schedule, orderItems, pricing, notes }) {
  const zone = DELIVERY_ZONES[delivery.zone];
  const zoneLine = `Zone ${esc(zone.letter)} — ${esc(zone.cities)}`;

  const contactLabel = { sms: "SMS", whatsapp: "WhatsApp", telegram: "Telegram", callMe: "Позвонить" }[customer.contactMethod]
    ?? esc(customer.contactMethod);

  const waLine  = customer.contactMethod === "whatsapp"
    ? `\nWhatsApp на этом номере: ${customer.whatsappSamePhone ? "Да" : "Нет"}`
    : "";
  const tgLine  = customer.telegramUsername ? `\nTelegram: ${esc(customer.telegramUsername)}` : "";
  const aptLine  = delivery.apt          ? `\nКвартира / Unit: ${esc(delivery.apt)}`          : "";
  const gateLine = delivery.gateCode     ? `\nКод ворот: ${esc(delivery.gateCode)}`            : "";
  const instrLine = delivery.instructions ? `\nИнструкции: ${esc(delivery.instructions)}`     : "";

  const itemsLines = orderItems.map((it) => {
    const qty = it.unit === "lb" ? `${it.quantity} lb` : `× ${it.quantity}`;
    return `• ${esc(it.name)} ${qty} — $${it.lineTotal.toFixed(2)}`;
  }).join("\n");

  let deliveryLine;
  let totalLine;
  let confirmNote = "";

  if (zone.requiresManualConfirmation) {
    deliveryLine = pricing.freeDeliveryPossible
      ? `Доставка: от $${zone.fee} — возможна бесплатно (требует подтверждения)`
      : `Доставка: от $${zone.fee} (подтверждается после проверки адреса)`;
    totalLine = `<b>ИТОГО без доставки: $${pricing.foodSubtotal.toFixed(2)}</b>`;
    confirmNote = "\n\n⚠️ Доставка и бесплатная доставка требуют подтверждения после проверки адреса.";
  } else {
    deliveryLine = pricing.freeDelivery
      ? `Доставка: $0.00 (бесплатная)`
      : `Доставка: $${pricing.deliveryFee.toFixed(2)}`;
    totalLine = `<b>ИТОГО: $${pricing.orderTotal.toFixed(2)}</b>`;
  }

  const statusLine = zone.requiresManualConfirmation
    ? "\n<b>Статус:</b> Ожидает ручного подтверждения (Зона C)"
    : "";

  return `🆕 <b>НОВАЯ ЗАЯВКА № ${esc(orderId)}</b>

Клиент: ${esc(customer.name)}
Телефон: ${esc(customer.phone)}
Предпочтительная связь: ${contactLabel}${waLine}${tgLine}

<b>ДОСТАВКА</b>
Зона: ${zoneLine}
Адрес: ${esc(delivery.address)}${aptLine}${gateLine}${instrLine}

Дата: ${esc(schedule.date)}
Окно доставки: ${esc(schedule.timeWindow)}

<b>ЗАКАЗ</b>
${itemsLines}

Еда: $${pricing.foodSubtotal.toFixed(2)}
${deliveryLine}
${totalLine}

<b>Аллергии / особые пожелания:</b>
${esc(notes.allergies?.trim() || "Нет")}

<b>Комментарий к заказу:</b>
${esc(notes.orderNotes?.trim() || "Нет")}${confirmNote}${statusLine}`;
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
  if (!schedule?.date)
    return json({ ok: false, error: "missing_date",     message: "Delivery date is required."           }, 400);
  if (!schedule?.timeWindow)
    return json({ ok: false, error: "missing_time",     message: "Delivery time window is required."    }, 400);

  // ── Field length guards ────────────────────────────────────────────────────
  if ((customer.name   || "").length > 100) return json({ ok: false, error: "field_too_long", message: "Name too long."    }, 400);
  if ((customer.phone  || "").length >  30) return json({ ok: false, error: "field_too_long", message: "Phone too long."   }, 400);
  if ((delivery.address|| "").length > 500) return json({ ok: false, error: "field_too_long", message: "Address too long." }, 400);

  // ── Zone validation ────────────────────────────────────────────────────────
  const zoneConfig = DELIVERY_ZONES[delivery.zone];
  if (!zoneConfig)
    return json({ ok: false, error: "invalid_zone", message: "Invalid delivery zone." }, 400);

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
  const isZoneC = zoneConfig.requiresManualConfirmation === true;
  const isFree  = foodSubtotal >= zoneConfig.freeAt;
  const deliveryFee   = isZoneC ? null : (isFree ? 0 : zoneConfig.fee);
  const orderTotal    = isZoneC ? null : foodSubtotal + deliveryFee;
  const pricing = {
    foodSubtotal,
    deliveryFee,
    orderTotal,
    freeDelivery:         !isZoneC && isFree,
    freeDeliveryPossible:  isZoneC && isFree,
    requiresManualConfirmation: isZoneC,
  };

  // ── Generate server-side order ID ─────────────────────────────────────────
  const orderId = generateOrderId();

  // ── Send Telegram notification ────────────────────────────────────────────
  const tgMessage = buildTelegramMessage({ orderId, customer, delivery, schedule, orderItems, pricing, notes });
  const tgResp = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: tgMessage, parse_mode: "HTML" }),
  });

  if (!tgResp.ok) {
    const err = await tgResp.json().catch(() => ({}));
    console.error("Telegram API error:", err.description ?? err);
    return json({ ok: false, error: "delivery_failed", message: "Failed to send your order. Please try again or contact us directly." }, 500);
  }

  return json({ ok: true, orderId, pricing });
}

// ── Entry point ───────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    const url    = new URL(request.url);
    const origin = request.headers.get("Origin") ?? "";
    const allowed = env.ALLOWED_ORIGIN ?? "https://lanaskitchenmiami.com";

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
