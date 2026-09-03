/**
 * Delivery zone regression tests — Lana's Kitchen Miami
 *
 * Reads DELIVERY_ZONES, ZIP_DELIVERY_ZONES, and CITY_ACCEPTABLE_ZONES
 * directly from script.js and worker/index.js using regex extraction,
 * so the test always reflects the actual production config.
 *
 * Run: node tests/delivery-zones.test.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SCRIPT   = fs.readFileSync(path.join(ROOT, "script.js"),        "utf8");
const WORKER   = fs.readFileSync(path.join(ROOT, "worker", "index.js"), "utf8");

// ── Config extraction helpers ─────────────────────────────────────────────────

function extractJSObject(src, varName) {
  // Match `const NAME = { ... };` — handles nested braces
  const start = src.indexOf(`const ${varName}`);
  if (start === -1) throw new Error(`${varName} not found`);
  let depth = 0, i = src.indexOf("{", start);
  const begin = i;
  while (i < src.length) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") { depth--; if (depth === 0) break; }
    i++;
  }
  // Wrap in parens so eval works; strip line comments to avoid parse issues
  const body = src.slice(begin, i + 1)
    .replace(/\/\/[^\n]*/g, "")   // strip // comments
    .replace(/,\s*}/g, "}");      // strip trailing commas
  return eval("(" + body + ")");  // safe: only runs on local source files
}

// Extract from script.js
const FE_DELIVERY_ZONES     = extractJSObject(SCRIPT, "DELIVERY_ZONES");
const FE_ZIP_DELIVERY_ZONES = extractJSObject(SCRIPT, "ZIP_DELIVERY_ZONES");
const CITY_ACCEPTABLE_ZONES = extractJSObject(SCRIPT, "CITY_ACCEPTABLE_ZONES");

// Extract from worker/index.js
const WK_DELIVERY_ZONES     = extractJSObject(WORKER, "DELIVERY_ZONES");
const WK_ZIP_DELIVERY_ZONES = extractJSObject(WORKER, "ZIP_DELIVERY_ZONES");

// ── Replicate frontend logic ───────────────────────────────────────────────────

function zipToZoneKey(zip) {
  const z = String(zip || "").trim();
  if (!/^\d{5}$/.test(z)) return "";
  if (FE_ZIP_DELIVERY_ZONES.A.includes(z)) return "1";
  if (FE_ZIP_DELIVERY_ZONES.B.includes(z)) return "2";
  if (FE_ZIP_DELIVERY_ZONES.C.includes(z)) return "3";
  return "remote";
}

function normalizeCity(v) { return String(v || "").trim().toLowerCase(); }

function detectCityZipMismatch(zipZone, city) {
  const acceptable = CITY_ACCEPTABLE_ZONES[normalizeCity(city)];
  if (!acceptable || !zipZone || !city) return null;
  return acceptable.includes(zipZone) ? null : { zipZone, city };
}

function computeFee(zip, subtotal) {
  const key = zipToZoneKey(zip);
  const cfg = FE_DELIVERY_ZONES[key];
  if (!cfg || cfg.requiresManualConfirmation) return null;
  return subtotal >= cfg.freeAt ? 0 : cfg.fee;
}

function checkMinOrder(zip, subtotal) {
  const key = zipToZoneKey(zip);
  const cfg = FE_DELIVERY_ZONES[key];
  if (!cfg) return "no_zone";
  return subtotal < cfg.minOrder ? "blocked" : "ok";
}

// ── Test harness ──────────────────────────────────────────────────────────────

let passed = 0, failed = 0;
const failures = [];

function assert(label, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (ok) { passed++; } else { failed++; failures.push({ label, actual, expected }); }
  return ok;
}

function section(title) {
  console.log(`\n${"═".repeat(70)}`);
  console.log(`  ${title}`);
  console.log("═".repeat(70));
}

// ── Suite 1: ZIP → Zone key ───────────────────────────────────────────────────
section("SUITE 1 — ZIP → Zone key (from script.js ZIP_DELIVERY_ZONES)");

const ZIP_MATRIX = [
  ["33009",  "1",      "Hallandale Beach → A"],
  ["33019",  "1",      "Hollywood 33019 → A"],
  ["33020",  "1",      "Hollywood 33020 → A"],
  ["33021",  "1",      "Hollywood/PP 33021 → A"],
  ["33023",  "1",      "Hollywood 33023 → A"],
  ["33004",  "1",      "Dania Beach → A"],
  ["33024",  "2",      "Hollywood/PP 33024 → B"],
  ["33025",  "2",      "Pembroke Pines 33025 → B"],
  ["33160",  "2",      "NMB/Sunny Isles/Golden Beach 33160 → B"],
  ["33180",  "2",      "Aventura 33180 → B"],
  ["33305",  "2",      "Fort Lauderdale 33305 → B"],
  ["33306",  "2",      "Fort Lauderdale 33306 → B"],
  ["33154",  "2",      "Bal Harbour 33154 → B"],
  ["33334",  "3",      "Fort Lauderdale/Oakland Park 33334 → C"],
  ["33139",  "remote", "Miami Beach 33139 → Remote"],
  ["90210",  "remote", "Unknown ZIP → Remote"],
  ["00000",  "remote", "All-zero → Remote"],
  ["",       "",       "Empty string → empty string"],
  ["ABCDE",  "",       "Non-numeric → empty string"],
];

for (const [zip, expectedKey, label] of ZIP_MATRIX) {
  const actual = zipToZoneKey(zip);
  const ok = assert(`ZIP ${label}`, actual, expectedKey);
  console.log(`  ${ok ? "✓" : "✗"} ${label}`);
}

// ── Suite 2: Zone config (fee / minOrder / freeAt) ────────────────────────────
section("SUITE 2 — Zone config from script.js DELIVERY_ZONES");

const ZONE_CONFIG_TESTS = [
  ["1",      10,   60,  110, false, "Zone A"],
  ["2",      15,   80,  145, false, "Zone B"],
  ["3",      20,  120,  200, true,  "Zone C"],
  ["remote", null, 120, undefined, true, "Remote"],
];

for (const [key, fee, minOrder, freeAt, manual, label] of ZONE_CONFIG_TESTS) {
  const cfg = FE_DELIVERY_ZONES[key];
  const t1 = assert(`${label} fee`,      cfg.fee,      fee);
  const t2 = assert(`${label} minOrder`, cfg.minOrder, minOrder);
  const t3 = freeAt !== undefined ? assert(`${label} freeAt`, cfg.freeAt, freeAt) : true;
  const t4 = assert(`${label} manual`,   !!cfg.requiresManualConfirmation, manual);
  const allOk = t1 && t2 && t3 && t4;
  console.log(`  ${allOk ? "✓" : "✗"} ${label}: fee=$${fee} min=$${minOrder} free=${freeAt !== undefined ? "$"+freeAt : "n/a"} manual=${manual}`);
}

// ── Suite 3: Free delivery threshold ─────────────────────────────────────────
section("SUITE 3 — Free delivery threshold (freeAt - $0.01 → paid; freeAt → free)");

const THRESHOLD_TESTS = [
  ["33009", 109.99, 10,  "Zone A: $109.99 → paid"],
  ["33009", 110.00, 0,   "Zone A: $110.00 → free"],
  ["33009", 110.01, 0,   "Zone A: $110.01 → free"],
  ["33160", 144.99, 15,  "Zone B: $144.99 → paid"],
  ["33160", 145.00, 0,   "Zone B: $145.00 → free"],
  ["33334", 200.00, null,"Zone C: $200 → null (manual)"],
  ["33139", 500.00, null,"Remote: any → null (manual)"],
];

for (const [zip, subtotal, expectedFee, label] of THRESHOLD_TESTS) {
  const actual = computeFee(zip, subtotal);
  const ok = assert(`Threshold ${label}`, actual, expectedFee);
  console.log(`  ${ok ? "✓" : "✗"} ${label} → fee=${actual === null ? "null" : "$"+actual}`);
}

// ── Suite 4: Min order enforcement ───────────────────────────────────────────
section("SUITE 4 — Min order: below blocks, at/above passes");

const MIN_ORDER_TESTS = [
  ["33009", 59.99, "blocked", "Zone A: $59.99 < $60 → blocked"],
  ["33009", 60.00, "ok",      "Zone A: $60.00 = $60 → ok"],
  ["33009", 60.01, "ok",      "Zone A: $60.01 > $60 → ok"],
  ["33160", 79.99, "blocked", "Zone B: $79.99 < $80 → blocked"],
  ["33160", 80.00, "ok",      "Zone B: $80.00 = $80 → ok"],
  ["33334", 119.99,"blocked", "Zone C: $119.99 < $120 → blocked"],
  ["33334", 120.00,"ok",      "Zone C: $120.00 = $120 → ok"],
  ["33139", 119.99,"blocked", "Remote: $119.99 < $120 → blocked"],
  ["33139", 120.00,"ok",      "Remote: $120.00 = $120 → ok"],
];

for (const [zip, subtotal, expected, label] of MIN_ORDER_TESTS) {
  const actual = checkMinOrder(zip, subtotal);
  const ok = assert(`MinOrder ${label}`, actual, expected);
  console.log(`  ${ok ? "✓" : "✗"} ${label}`);
}

// ── Suite 5: City + ZIP mismatch — 8 previously broken combinations ───────────
section("SUITE 5 — City+ZIP: 8 previously broken combinations → no mismatch");

const CITY_ZIP_MISMATCH_TESTS = [
  ["aventura",          "33180", false, "Aventura + 33180 → no mismatch"],
  ["golden beach",      "33160", false, "Golden Beach + 33160 → no mismatch"],
  ["sunny isles beach", "33160", false, "Sunny Isles Beach + 33160 → no mismatch"],
  ["north miami beach", "33160", false, "North Miami Beach + 33160 → no mismatch"],
  ["dania beach",       "33004", false, "Dania Beach + 33004 → no mismatch"],
  ["pembroke pines",    "33021", false, "Pembroke Pines + 33021 → no mismatch"],
  ["fort lauderdale",   "33305", false, "Fort Lauderdale + 33305 → no mismatch"],
  ["fort lauderdale",   "33306", false, "Fort Lauderdale + 33306 → no mismatch"],
  // Intentional mismatches — should still fire
  ["hallandale beach",  "33160", true,  "Hallandale Beach + 33160 → mismatch (correct)"],
  ["aventura",          "33009", true,  "Aventura + 33009 (Zone A) → mismatch (correct)"],
  ["miami beach",       "33160", true,  "Miami Beach + 33160 → mismatch (correct)"],
];

for (const [city, zip, shouldMismatch, label] of CITY_ZIP_MISMATCH_TESTS) {
  const zone = zipToZoneKey(zip);
  const result = detectCityZipMismatch(zone, city);
  const ok = assert(`Mismatch ${label}`, result !== null, shouldMismatch);
  console.log(`  ${ok ? "✓" : "✗"} ${label}`);
}

// ── Suite 6: Golden Beach + 33160 full scenario ───────────────────────────────
section("SUITE 6 — Golden Beach + 33160: Zone B / $15 / min $80 / free $145 / no mismatch");

{
  const zip = "33160", city = "Golden Beach";
  const zone = zipToZoneKey(zip);
  const cfg  = FE_DELIVERY_ZONES[zone];
  const mismatch = detectCityZipMismatch(zone, city);
  const t1 = assert("GB zone key",    zone,         "2");
  const t2 = assert("GB fee",         cfg.fee,      15);
  const t3 = assert("GB minOrder",    cfg.minOrder, 80);
  const t4 = assert("GB freeAt",      cfg.freeAt,   145);
  const t5 = assert("GB no mismatch", mismatch,     null);
  console.log(`  ${t1?"✓":"✗"} ZIP 33160 → Zone key "2" (B)`);
  console.log(`  ${t2?"✓":"✗"} fee = $${cfg.fee}     (expected $15)`);
  console.log(`  ${t3?"✓":"✗"} minOrder = $${cfg.minOrder}  (expected $80)`);
  console.log(`  ${t4?"✓":"✗"} freeAt = $${cfg.freeAt}  (expected $145)`);
  console.log(`  ${t5?"✓":"✗"} mismatch = ${mismatch === null ? "null — no warning" : "FIRES ✗"}`);
}

// ── Suite 7: Remote zone ──────────────────────────────────────────────────────
section("SUITE 7 — Remote: no false city-zip mismatch, null fee");

{
  const zip = "33139", city = "Miami Beach";
  const zone = zipToZoneKey(zip);
  const t1 = assert("Remote zone",       zone,                       "remote");
  const t2 = assert("Remote no mismatch",detectCityZipMismatch(zone, city), null);
  const t3 = assert("Remote fee null",   computeFee(zip, 500),       null);
  console.log(`  ${t1?"✓":"✗"} ZIP 33139 → remote`);
  console.log(`  ${t2?"✓":"✗"} Miami Beach + 33139 → no mismatch`);
  console.log(`  ${t3?"✓":"✗"} fee = null (TBD by arrangement)`);
}

// ── Suite 8: Frontend ZIP_DELIVERY_ZONES == Worker ZIP_DELIVERY_ZONES ─────────
section("SUITE 8 — Frontend ZIP_DELIVERY_ZONES == Worker ZIP_DELIVERY_ZONES");

for (const letter of ["A", "B", "C"]) {
  const fe = [...FE_ZIP_DELIVERY_ZONES[letter]].sort().join(",");
  const wk = [...WK_ZIP_DELIVERY_ZONES[letter]].sort().join(",");
  const ok = assert(`Zone ${letter} FE==WK`, fe, wk);
  console.log(`  ${ok?"✓":"✗"} Zone ${letter}: ${fe}`);
}

const allZips = [...FE_ZIP_DELIVERY_ZONES.A, ...FE_ZIP_DELIVERY_ZONES.B, ...FE_ZIP_DELIVERY_ZONES.C];
const noDups = assert("No duplicate ZIPs", allZips.length, new Set(allZips).size);
console.log(`  ${noDups?"✓":"✗"} No duplicate ZIPs (${allZips.length} total, ${new Set(allZips).size} unique)`);

// ── Suite 9: Frontend DELIVERY_ZONES == Worker DELIVERY_ZONES ────────────────
section("SUITE 9 — Frontend DELIVERY_ZONES fees == Worker DELIVERY_ZONES fees");

for (const key of ["1", "2", "3", "remote"]) {
  const fe = FE_DELIVERY_ZONES[key];
  const wk = WK_DELIVERY_ZONES[key];
  const fields = ["fee", "minOrder", "freeAt"];
  let allOk = true;
  for (const f of fields) {
    if (fe[f] !== wk[f]) {
      assert(`Zone ${key} ${f} FE==WK`, fe[f], wk[f]);
      allOk = false;
    }
  }
  if (allOk) {
    passed++;
    const label = { "1":"A","2":"B","3":"C","remote":"Remote" }[key];
    console.log(`  ✓ Zone ${label}: fee=${fe.fee} minOrder=${fe.minOrder} freeAt=${fe.freeAt ?? "n/a"}`);
  }
}

// ── Suite 10: CITY_ACCEPTABLE_ZONES only valid keys ───────────────────────────
section("SUITE 10 — CITY_ACCEPTABLE_ZONES contains only valid zone keys");

const VALID_KEYS = new Set(["1", "2", "3", "remote"]);
let cazOk = true;
for (const [city, zones] of Object.entries(CITY_ACCEPTABLE_ZONES)) {
  if (!Array.isArray(zones)) { cazOk = false; failed++; failures.push({ label: `CAZ ${city} not array`, actual: zones, expected: "array" }); continue; }
  for (const z of zones) {
    if (!VALID_KEYS.has(z)) {
      cazOk = false; failed++;
      failures.push({ label: `CAZ "${city}" invalid key "${z}"`, actual: z, expected: [...VALID_KEYS] });
    }
  }
}
if (cazOk) { passed++; console.log("  ✓ All entries use valid zone keys"); }

// ── Suite 11: RU/EN/UA twoA fee consistency ───────────────────────────────────
section("SUITE 11 — RU/EN/UA FAQ twoA: same fee/min/threshold numbers");

// Extract twoA strings directly from script.js
function extractTwoA(lang) {
  // Match `twoA: "..."` inside the lang block — single-line
  const re = /twoA:\s*"([^"]+)"/g;
  const matches = [...SCRIPT.matchAll(re)];
  const idx = { ru: 0, en: 1, uk: 2 }[lang];
  return matches[idx]?.[1] ?? "";
}

function extractNumbers(str) {
  return str.match(/\$(\d+)/g)?.map(s => parseInt(s.slice(1))).sort((a,b)=>a-b) || [];
}

const EXPECTED_NUMS = [10, 15, 20, 60, 80, 110, 120, 145];

for (const lang of ["ru", "en", "uk"]) {
  const text = extractTwoA(lang);
  const nums = extractNumbers(text);
  const ok = assert(`twoA ${lang} values`, nums, EXPECTED_NUMS);
  console.log(`  ${ok?"✓":"✗"} ${lang.toUpperCase()} twoA: [${nums.join(", ")}]`);
}

// ── Final report ──────────────────────────────────────────────────────────────

console.log(`\n${"═".repeat(70)}`);
console.log(`  RESULTS: ${passed} passed, ${failed} failed`);
console.log("═".repeat(70));

if (failures.length > 0) {
  console.log("\nFAILURES:");
  for (const f of failures) {
    console.log(`  ✗ ${f.label}`);
    console.log(`      expected: ${JSON.stringify(f.expected)}`);
    console.log(`      actual:   ${JSON.stringify(f.actual)}`);
  }
}

console.log(`\n${failed === 0 ? "✅ ALL TESTS PASSED" : "❌ SOME TESTS FAILED"}`);
process.exit(failed > 0 ? 1 : 0);
