#!/usr/bin/env node
// Static dish landing pages generator — reads dishes.json (single source of truth)
// and emits crawlable, no-JS-required HTML pages under /menu/<slug>/index.html.
// Run: node tools/generate-dish-pages.js

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const dishes = JSON.parse(fs.readFileSync(path.join(ROOT, "dishes.json"), "utf8"));
const byId = (id) => dishes.find((d) => d.id === id);

const CATEGORY_ROUTE = { soups: "soups", "main-dishes": "main-dishes" };

// slug -> { title, dishIds: [...] } — one or more real dish variants per page
const PAGES = {
  borscht: { dishIds: ["borscht"] },
  pelmeni: { dishIds: ["pork-pelmeni", "pork-beef-dumplings", "chicken-pelmeni"] },
  varenyky: { dishIds: ["varenyky"] },
  "cabbage-rolls": { dishIds: ["cabbage-rolls"] },
  syrniki: { dishIds: ["homestyle-syrniki"] },
};

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[c]));

function cardHtml(dish) {
  const route = CATEGORY_ROUTE[dish.category] || "main-dishes";
  return `
        <article class="dish-page-card">
          <img src="/${dish.image}" alt="${esc(dish.name.en)}" width="800" height="999" loading="lazy" decoding="async" />
          <div class="dish-page-card-body">
            <h2>${esc(dish.name.en)}</h2>
            <p>${esc(dish.description.en)}</p>
            <p class="dish-page-price"><strong>$${dish.price}</strong> / ${esc(dish.unit)}</p>
            <p class="dish-page-size">${esc(dish.sizeEn || "")}</p>
            <a class="btn btn-primary" href="/#/${route}">Order on the menu</a>
          </div>
        </article>`;
}

function pageHtml(slug, dishList) {
  const primary = dishList[0];
  const nameEn = dishList.length > 1 ? primary.name.en.replace(/\s*\(.*?\)\s*/, "") : primary.name.en;
  const title = `${nameEn} | Homemade in Miami | Lana's Kitchen Miami`;
  const description = `${primary.description.en} Order homemade ${nameEn.toLowerCase()} for delivery in Miami, Hollywood FL, Hallandale Beach and Aventura. From $${Math.min(...dishList.map((d) => d.price))}.`;
  const canonical = `https://lanaskitchenmiami.com/menu/${slug}/`;
  const image = `https://lanaskitchenmiami.com/${primary.image}`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="${canonical}" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:image" content="${image}" />
    <link rel="stylesheet" href="/styles.css" />
    <style>
      .dish-page-main { max-width: 900px; margin: 0 auto; padding: 32px 20px 64px; }
      .dish-page-crumb { font-size: 13px; color: var(--muted); margin-bottom: 16px; }
      .dish-page-crumb a { color: inherit; }
      .dish-page-card { display: flex; gap: 24px; flex-wrap: wrap; align-items: flex-start; border: 1px solid var(--line); border-radius: 16px; padding: 20px; margin-bottom: 20px; }
      .dish-page-card img { width: 220px; max-width: 100%; height: auto; border-radius: 12px; object-fit: cover; aspect-ratio: 1.16; }
      .dish-page-card-body { flex: 1; min-width: 220px; }
      .dish-page-price { font-size: 20px; margin: 10px 0 2px; }
      .dish-page-size { color: var(--muted); font-size: 14px; margin-bottom: 14px; }
    </style>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "MenuItem",
      "name": ${JSON.stringify(nameEn)},
      "description": ${JSON.stringify(primary.description.en)},
      "image": ${JSON.stringify(image)},
      "offers": ${JSON.stringify(
        dishList.map((d) => ({
          "@type": "Offer",
          price: d.price,
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: canonical,
        }))
      )}
    }
    </script>
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="/" aria-label="Lana's Kitchen">
        <span class="brand-mark" aria-hidden="true"><img src="/assets/images/brand-plate.png" alt="" /></span>
        <span class="brand-text"><strong>Lana's Kitchen</strong><small>MIAMI</small></span>
      </a>
      <nav class="main-nav" aria-label="Primary navigation">
        <a href="/#/menu">Full Menu</a>
        <a href="/#delivery">Delivery</a>
        <a href="/contact.html">Contact</a>
      </nav>
    </header>

    <main class="dish-page-main">
      <p class="dish-page-crumb"><a href="/">Home</a> &rsaquo; <a href="/#/menu">Menu</a> &rsaquo; ${esc(nameEn)}</p>
      <h1>${esc(nameEn)} — Homemade, Delivered in Miami</h1>
      <p>Homemade ${esc(nameEn.toLowerCase())}, made fresh by preorder and delivered across Miami, Hollywood FL, Hallandale Beach and Aventura.</p>
${dishList.map(cardHtml).join("\n")}
      <p><a href="/">&larr; Back to Lana's Kitchen Miami homepage</a></p>
    </main>

    <footer class="site-footer">
      <div class="footer-brand">
        <img src="/assets/images/brand-plate.png" alt="" class="footer-bowl" aria-hidden="true" />
        <strong>Lana's Kitchen</strong>
        <span>MIAMI</span>
        <small class="footer-copy">© 2026 Lana's Kitchen Miami</small>
      </div>
    </footer>
  </body>
</html>
`;
}

let hadError = false;
for (const [slug, cfg] of Object.entries(PAGES)) {
  const dishList = cfg.dishIds.map(byId).filter(Boolean);
  if (dishList.length !== cfg.dishIds.length) {
    console.error(`ERROR ${slug}: missing dish id(s) in dishes.json`);
    hadError = true;
    continue;
  }
  const dir = path.join(ROOT, "menu", slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), pageHtml(slug, dishList));
  console.log(`wrote menu/${slug}/index.html (${dishList.length} variant(s))`);
}
if (hadError) {
  console.error("generate-dish-pages.js: aborting with non-zero exit — stale pages left untouched, nothing will be committed as current.");
  process.exit(1);
}
