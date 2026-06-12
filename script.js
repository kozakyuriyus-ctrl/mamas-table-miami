const BUSINESS = {
  whatsappNumber: "13050000000",
};

const categories = [
  "All",
  "Soups",
  "Main dishes",
  "Salads",
  "Crepes / Blini",
  "Family trays",
  "Custom orders",
];

const meals = [
  {
    id: "borscht",
    name: "Ukrainian Borscht & Pampushky",
    category: "Soups",
    price: 18,
    image: "assets/images/ukrainian-table.jpg",
    description: "Deep red borscht with herbs, sour cream and soft garlic pampushky.",
    tags: ["Freshly made", "Comfort"],
    featured: true,
  },
  {
    id: "chicken-kyiv",
    name: "Chicken Kyiv Comfort Plate",
    category: "Main dishes",
    price: 26,
    image: "assets/images/chicken-comfort.jpg",
    description: "Crisp chicken cutlet with mashed potatoes, roasted carrots and salad.",
    tags: ["Best seller", "Dinner"],
    featured: true,
  },
  {
    id: "varenyky",
    name: "Handmade Varenyky Trio",
    category: "Main dishes",
    price: 25,
    image: "assets/images/ukrainian-table.jpg",
    description: "Handmade dumplings with potato, farmer cheese or cherry filling.",
    tags: ["Handmade", "Family"],
    featured: true,
  },
  {
    id: "blini",
    name: "Blini with Farmer Cheese",
    category: "Crepes / Blini",
    price: 22,
    image: "assets/images/blini-crepes.jpg",
    description: "Thin golden blini with cottage cheese, berry compote and sour cream.",
    tags: ["Sweet option", "Brunch"],
    featured: true,
  },
  {
    id: "med-salad",
    name: "Mediterranean Mezze Tray",
    category: "Salads",
    price: 36,
    image: "assets/images/caucasus-mediterranean.jpg",
    description: "Hummus, tabbouleh, roasted vegetables, olives and warm bread.",
    tags: ["Shareable", "Fresh"],
    featured: true,
  },
  {
    id: "family-tray",
    name: "Family Dinner Tray",
    category: "Family trays",
    price: 95,
    image: "assets/images/hero-table.jpg",
    description: "A generous table with soup, mains, sides, salads, sauces and bread.",
    tags: ["Serves 4-6", "Preorder"],
    featured: true,
  },
  {
    id: "mushroom-barley",
    name: "Mushroom Barley Soup",
    category: "Soups",
    price: 16,
    image: "assets/images/caucasus-mediterranean.jpg",
    description: "Earthy mushrooms, pearl barley, vegetables and fresh dill.",
    tags: ["Cozy", "Vegetarian"],
    featured: false,
  },
  {
    id: "lentil-soup",
    name: "Mediterranean Lentil Soup",
    category: "Soups",
    price: 16,
    image: "assets/images/caucasus-mediterranean.jpg",
    description: "Golden lentils with vegetables, lemon, olive oil and warm spices.",
    tags: ["Vegetarian", "Bright"],
    featured: false,
  },
  {
    id: "holubtsi",
    name: "Holubtsi Tray",
    category: "Main dishes",
    price: 48,
    image: "assets/images/ukrainian-table.jpg",
    description: "Tender cabbage rolls in tomato sauce, perfect for sharing.",
    tags: ["Slow cooked", "Tray"],
    featured: false,
  },
  {
    id: "stuffed-peppers",
    name: "Stuffed Peppers",
    category: "Main dishes",
    price: 42,
    image: "assets/images/chicken-comfort.jpg",
    description: "Sweet peppers filled with rice, herbs and savory meat or vegetable filling.",
    tags: ["Comfort", "Family"],
    featured: false,
  },
  {
    id: "garden-salad",
    name: "Cucumber Tomato Herb Salad",
    category: "Salads",
    price: 17,
    image: "assets/images/caucasus-mediterranean.jpg",
    description: "Crisp cucumbers, tomatoes, onions, herbs and sunflower or olive oil.",
    tags: ["Fresh", "Simple"],
    featured: false,
  },
  {
    id: "olivier",
    name: "Olivier Salad",
    category: "Salads",
    price: 20,
    image: "assets/images/ukrainian-table.jpg",
    description: "Classic Eastern European salad made fresh for holiday-style tables.",
    tags: ["Classic", "Party"],
    featured: false,
  },
  {
    id: "syrniki",
    name: "Syrniki Breakfast Box",
    category: "Crepes / Blini",
    price: 24,
    image: "assets/images/blini-crepes.jpg",
    description: "Farmer cheese pancakes with berries, sour cream and seasonal jam.",
    tags: ["Brunch", "Sweet"],
    featured: false,
  },
  {
    id: "event-table",
    name: "Custom Event Table",
    category: "Custom orders",
    price: 180,
    image: "assets/images/hero-table.jpg",
    description: "A custom menu for birthdays, office lunches, guests or celebrations.",
    tags: ["Custom", "Events"],
    featured: false,
  },
  {
    id: "weekly-box",
    name: "Weekly Comfort Box",
    category: "Family trays",
    price: 125,
    image: "assets/images/chicken-comfort.jpg",
    description: "Mix of ready meals for the week: mains, sides, salads and soups.",
    tags: ["Meal prep", "Flexible"],
    featured: false,
  },
];

const state = {
  category: "All",
  cart: new Map(),
};

const money = (value) => `$${value}`;

const mealById = (id) => meals.find((meal) => meal.id === id);

const cartQuantity = (id) => state.cart.get(id) || 0;

const cartEntries = () => {
  return Array.from(state.cart.entries())
    .map(([id, quantity]) => ({ meal: mealById(id), quantity }))
    .filter((entry) => entry.meal && entry.quantity > 0);
};

const cartTotal = () => cartEntries().reduce((sum, entry) => sum + entry.meal.price * entry.quantity, 0);

const cartCount = () => cartEntries().reduce((sum, entry) => sum + entry.quantity, 0);

const buildCartMessage = () => {
  const entries = cartEntries();
  const orderLines = entries.length
    ? entries.map(({ meal, quantity }) => `- ${meal.name} x${quantity}: ${money(meal.price * quantity)}`).join("\n")
    : "- I would like help choosing meals";

  return [
    "Mama's Table order request",
    "",
    "Order list:",
    orderLines,
    `Estimated total: ${money(cartTotal())}`,
    "",
    "Please confirm availability, delivery fee and next pickup/delivery time.",
  ].join("\n");
};

const setQuantity = (id, quantity) => {
  const safeQuantity = Math.max(0, Math.min(quantity, 99));
  if (safeQuantity === 0) {
    state.cart.delete(id);
  } else {
    state.cart.set(id, safeQuantity);
  }
  renderCart();
  renderMealQuantities();
};

const createMealCard = (meal) => {
  const quantity = cartQuantity(meal.id);
  return `
    <article class="meal-card reveal" data-meal-card="${meal.id}">
      <img src="${meal.image}" alt="${meal.name}" loading="lazy" />
      <div class="meal-body">
        <div class="meal-top">
          <div>
            <h3>${meal.name}</h3>
          </div>
          <span class="price">${money(meal.price)}</span>
        </div>
        <p>${meal.description}</p>
        <div class="meal-meta">
          <span>${meal.category}</span>
          ${meal.tags.map((tag) => `<span>${tag}</span>`).join("")}
        </div>
        <div class="add-row">
          <div class="qty-control" aria-label="${meal.name} quantity">
            <button type="button" data-qty-minus="${meal.id}" aria-label="Decrease ${meal.name}">-</button>
            <strong data-meal-qty="${meal.id}">${quantity}</strong>
            <button type="button" data-qty-plus="${meal.id}" aria-label="Increase ${meal.name}">+</button>
          </div>
          <button class="add-btn" type="button" data-add-meal="${meal.id}">Add to Order</button>
        </div>
      </div>
    </article>
  `;
};

const renderMeals = () => {
  const featuredGrid = document.querySelector("[data-featured-grid]");
  const catalogGrid = document.querySelector("[data-catalog-grid]");

  featuredGrid.innerHTML = meals.filter((meal) => meal.featured).map(createMealCard).join("");

  const filteredMeals = state.category === "All" ? meals : meals.filter((meal) => meal.category === state.category);
  catalogGrid.innerHTML = filteredMeals.map(createMealCard).join("");

  renderMealQuantities();
  observeReveals();
};

const renderCategories = () => {
  const container = document.querySelector("[data-category-chips]");
  container.innerHTML = categories
    .map(
      (category) => `
        <button class="category-chip ${category === state.category ? "is-active" : ""}" type="button" data-category="${category}">
          ${category}
        </button>
      `,
    )
    .join("");
};

const renderMealQuantities = () => {
  document.querySelectorAll("[data-meal-qty]").forEach((element) => {
    element.textContent = cartQuantity(element.dataset.mealQty);
  });
};

const renderCart = () => {
  const entries = cartEntries();
  const list = document.querySelector("[data-cart-list]");
  const empty = document.querySelector("[data-cart-empty]");
  const count = cartCount();
  const total = cartTotal();

  list.innerHTML = entries
    .map(
      ({ meal, quantity }) => `
        <div class="cart-item">
          <div class="cart-item-top">
            <strong>${meal.name}</strong>
            <span>${money(meal.price * quantity)}</span>
          </div>
          <div class="add-row">
            <div class="qty-control">
              <button type="button" data-qty-minus="${meal.id}" aria-label="Decrease ${meal.name}">-</button>
              <strong>${quantity}</strong>
              <button type="button" data-qty-plus="${meal.id}" aria-label="Increase ${meal.name}">+</button>
            </div>
            <button class="remove-item" type="button" data-remove-meal="${meal.id}">Remove</button>
          </div>
        </div>
      `,
    )
    .join("");

  empty.hidden = entries.length > 0;
  document.querySelector("[data-cart-count]").textContent = count;
  document.querySelector("[data-cart-total]").textContent = money(total);
  document.querySelector("[data-mobile-count]").textContent = count === 1 ? "1 item" : `${count} items`;
  document.querySelector("[data-mobile-total]").textContent = money(total);

  const checkoutLink = document.querySelector("[data-checkout-link]");
  const checkoutLabel = document.querySelector("[data-checkout-label]");
  checkoutLink.href = entries.length ? whatsappUrl(buildCartMessage()) : "#menu";
  checkoutLink.target = entries.length ? "_blank" : "";
  checkoutLink.rel = entries.length ? "noopener noreferrer" : "";
  if (entries.length) {
    checkoutLink.removeAttribute("aria-disabled");
  } else {
    checkoutLink.setAttribute("aria-disabled", "true");
  }
  checkoutLabel.textContent = entries.length ? "Order on WhatsApp" : "Add meals first";
};

const buildOrderMessage = (form) => {
  const data = new FormData(form);
  const entries = cartEntries();
  const orderLines = entries.length
    ? entries.map(({ meal, quantity }) => `- ${meal.name} x${quantity}: ${money(meal.price * quantity)}`).join("\n")
    : "- I would like help choosing meals";

  return [
    "Mama's Table order request",
    "",
    `Name: ${data.get("name") || ""}`,
    `Phone: ${data.get("phone") || ""}`,
    `Area: ${data.get("area") || ""}`,
    `Delivery or pickup: ${data.get("fulfillment") || ""}`,
    `Preferred date/time: ${data.get("date") || ""}`,
    "",
    "Order list:",
    orderLines,
    `Estimated total: ${money(cartTotal())}`,
    "",
    `Notes: ${data.get("notes") || ""}`,
  ].join("\n");
};

const whatsappUrl = (message) => {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

const handleDocumentClick = (event) => {
  const addButton = event.target.closest("[data-add-meal]");
  const plusButton = event.target.closest("[data-qty-plus]");
  const minusButton = event.target.closest("[data-qty-minus]");
  const removeButton = event.target.closest("[data-remove-meal]");
  const categoryButton = event.target.closest("[data-category]");

  if (addButton) {
    const id = addButton.dataset.addMeal;
    setQuantity(id, cartQuantity(id) + 1);
  }

  if (plusButton) {
    const id = plusButton.dataset.qtyPlus;
    setQuantity(id, cartQuantity(id) + 1);
  }

  if (minusButton) {
    const id = minusButton.dataset.qtyMinus;
    setQuantity(id, cartQuantity(id) - 1);
  }

  if (removeButton) {
    setQuantity(removeButton.dataset.removeMeal, 0);
  }

  if (categoryButton) {
    state.category = categoryButton.dataset.category;
    renderCategories();
    renderMeals();
    document.querySelector("[data-catalog-grid]").scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const setupHeader = () => {
  const header = document.querySelector("[data-header]");
  const update = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 30);
    document.body.classList.toggle("has-scrolled", window.scrollY > 220);
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
};

let revealObserver;

const observeReveals = () => {
  if (revealObserver) revealObserver.disconnect();

  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => revealObserver.observe(element));
};

const setupForm = () => {
  const form = document.querySelector("[data-order-form]");
  const status = document.querySelector("[data-form-status]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = buildOrderMessage(form);
    status.textContent = "Order message prepared. Opening WhatsApp.";
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");

    window.setTimeout(() => {
      status.textContent = "If WhatsApp did not open, use the Order on WhatsApp button above.";
    }, 900);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setupHeader();
  renderCategories();
  renderMeals();
  renderCart();
  setupForm();
  document.addEventListener("click", handleDocumentClick);
  observeReveals();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
