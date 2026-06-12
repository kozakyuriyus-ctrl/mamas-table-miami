const BUSINESS = {
  whatsappNumber: "13050000000",
};

const tr = (ru, en, uk) => ({ ru, en, uk });

const copy = {
  ru: {
    meta: { title: "Mama's Table | Домашняя еда с доставкой в Miami" },
    nav: { how: "Как заказать", menu: "Меню", delivery: "Доставка", faq: "FAQ", contact: "Контакты" },
    actions: { orderNow: "Заказать", viewMenu: "Смотреть меню" },
    hero: {
      eyebrow: "Премиальная домашняя кухня",
      title: "Домашняя еда с доставкой в Miami",
      lede:
        "Украинские, восточноевропейские, средиземноморские, кавказские и азиатские блюда готовятся под заказ и доставляются по Miami, Hallandale, Hollywood, Aventura и ближайшим районам.",
      cardLabel: "Популярный выбор",
      cardTitle: "Семейный ужин",
      cardMeta: "На 4–6 гостей • от $95",
    },
    badges: {
      fresh: "Готовим свежими",
      freshSub: "К каждому заказу",
      preorder: "Предзаказ 24–48ч",
      preorderSub: "Чтобы было свежо",
      delivery: "Локальная доставка",
      deliverySub: "По Miami и рядом",
      family: "Семейная кухня",
      familySub: "Made with love",
    },
    how: {
      title: "Как это работает",
      oneTitle: "Выберите блюда",
      oneText: "Соберите заказ из популярных домашних блюд.",
      twoTitle: "Отправьте предзаказ",
      twoText: "Лучше за 24–48 часов до нужного времени.",
      threeTitle: "Мы готовим свежими",
      threeText: "Все готовится под заказ из свежих ингредиентов.",
      fourTitle: "Доставка или самовывоз",
      fourText: "Получите еду свежей и вовремя.",
    },
    popular: { title: "Популярные блюда", viewAll: "Все меню" },
    categories: { title: "Категории меню" },
    why: {
      title: "Почему клиенты любят нас",
      oneTitle: "Домашний вкус",
      oneText: "Как дома, только удобнее.",
      twoTitle: "Свежие ингредиенты",
      twoText: "Готовим из качественных продуктов.",
      threeTitle: "Гибкое меню",
      threeText: "Новые блюда и custom requests.",
      fourTitle: "Семейные порции",
      fourText: "Идеально для семьи и гостей.",
      fiveTitle: "Заказы на праздники",
      fiveText: "Для особых случаев.",
      sixTitle: "Локальная доставка",
      sixText: "Miami и ближайшие районы.",
    },
    delivery: {
      eyebrow: "Зона доставки",
      title: "Доставка по South Florida",
      note: "Стоимость доставки рассчитывается индивидуально в зависимости от района и объема заказа.",
    },
    testimonials: { eyebrow: "Отзывы", title: "Что говорят клиенты" },
    faq: {
      title: "FAQ",
      oneQ: "За сколько времени делать заказ?",
      oneA: "Лучше за 24–48 часов, особенно для семейных наборов и праздничных заказов.",
      twoQ: "Есть ли доставка?",
      twoA: "Да, доставка доступна по Miami и ближайшим районам. Стоимость рассчитывается индивидуально.",
      threeQ: "Есть ли самовывоз?",
      threeA: "Да, самовывоз можно согласовать в WhatsApp при подтверждении заказа.",
      fourQ: "Можно ли заказать на праздник?",
      fourA: "Да, можно собрать праздничный стол или семейный набор под количество гостей.",
      fiveQ: "Можно ли собрать индивидуальное меню?",
      fiveA: "Да, напишите пожелания, кухни, аллергии и количество гостей.",
      sixQ: "Как происходит оплата?",
      sixA: "Онлайн-оплаты на сайте пока нет. Детали оплаты подтверждаются после согласования заказа.",
    },
    final: {
      eyebrow: "Финальный шаг",
      title: "Готовы заказать домашний ужин?",
      text: "Напишите нам в WhatsApp — подберем блюда, рассчитаем стоимость и подтвердим время приготовления.",
      button: "Заказать в WhatsApp",
    },
    cart: {
      title: "Ваш заказ",
      empty: "Добавьте блюда из меню.",
      total: "Примерная сумма",
      add: "Добавить",
      checkout: "Отправить заказ в WhatsApp",
      addFirst: "Сначала добавьте блюда",
      remove: "Убрать",
      itemWord: "блюд",
    },
    order: {
      title: "Заявка Mama's Table",
      list: "Список блюд",
      total: "Примерная сумма",
      help: "Хочу сделать заказ и подобрать блюда",
      confirm: "Пожалуйста, подтвердите наличие, delivery fee и ближайшее время приготовления.",
    },
  },
  en: {
    meta: { title: "Mama's Table | Homemade Meals Delivered Fresh in Miami" },
    nav: { how: "How It Works", menu: "Menu", delivery: "Delivery", faq: "FAQ", contact: "Contact" },
    actions: { orderNow: "Order Now", viewMenu: "View Menu" },
    hero: {
      eyebrow: "Premium homemade kitchen",
      title: "Homemade Meals, Delivered Fresh in Miami",
      lede:
        "Ukrainian, Eastern European, Mediterranean, Caucasian and Asian dishes made to order and delivered across Miami, Hallandale, Hollywood, Aventura and nearby areas.",
      cardLabel: "Popular Choice",
      cardTitle: "Family Dinner",
      cardMeta: "Serves 4–6 guests • from $95",
    },
    badges: {
      fresh: "Freshly Made",
      freshSub: "To order",
      preorder: "24–48h Preorder",
      preorderSub: "Always fresh",
      delivery: "Local Delivery",
      deliverySub: "On time",
      family: "Family Kitchen",
      familySub: "Made with love",
    },
    how: {
      title: "How It Works",
      oneTitle: "Choose your meals",
      oneText: "Browse the menu and pick favorites.",
      twoTitle: "Place your preorder",
      twoText: "Order 24–48 hours in advance.",
      threeTitle: "We cook fresh",
      threeText: "Prepared with fresh ingredients.",
      fourTitle: "Delivery or pickup",
      fourText: "Get your meals fresh and on time.",
    },
    popular: { title: "Popular Dishes", viewAll: "View Full Menu" },
    categories: { title: "Menu Categories" },
    why: {
      title: "Why Customers Love Us",
      oneTitle: "Homemade Taste",
      oneText: "Like home, only better.",
      twoTitle: "Fresh Ingredients",
      twoText: "Quality ingredients in every order.",
      threeTitle: "Flexible Menu",
      threeText: "New dishes and custom requests.",
      fourTitle: "Family Portions",
      fourText: "Perfect for family meals.",
      fiveTitle: "Holiday Orders",
      fiveText: "For any special occasion.",
      sixTitle: "Local Delivery",
      sixText: "Across Miami and nearby areas.",
    },
    delivery: {
      eyebrow: "Delivery Areas",
      title: "Delivery across South Florida",
      note: "Delivery fee is calculated individually based on your location and order size.",
    },
    testimonials: { eyebrow: "Testimonials", title: "What Our Customers Say" },
    faq: {
      title: "FAQ",
      oneQ: "How far in advance should I order?",
      oneA: "24–48 hours is best, especially for family sets and holiday orders.",
      twoQ: "Do you deliver?",
      twoA: "Yes, delivery is available across Miami and nearby areas. The fee is calculated individually.",
      threeQ: "Is pickup available?",
      threeA: "Yes, pickup can be arranged through WhatsApp when confirming the order.",
      fourQ: "Can I order for a holiday?",
      fourA: "Yes, we can prepare family trays and holiday tables for your guest count.",
      fiveQ: "Can I create a custom menu?",
      fiveA: "Yes, send your cuisine preferences, allergies and guest count.",
      sixQ: "How does payment work?",
      sixA: "There is no online payment yet. Payment details are confirmed after the order is agreed.",
    },
    final: {
      eyebrow: "Final step",
      title: "Ready to Enjoy Homemade Goodness?",
      text: "Message us on WhatsApp — we will help you choose the perfect meals and confirm your order.",
      button: "Order on WhatsApp",
    },
    cart: {
      title: "Your Order",
      empty: "Add dishes from the menu.",
      total: "Estimated Total",
      add: "Add to Order",
      checkout: "Send Order on WhatsApp",
      addFirst: "Add dishes first",
      remove: "Remove",
      itemWord: "items",
    },
    order: {
      title: "Mama's Table order request",
      list: "Order list",
      total: "Estimated total",
      help: "I would like to place an order and choose meals",
      confirm: "Please confirm availability, delivery fee and next cooking time.",
    },
  },
  uk: {
    meta: { title: "Mama's Table | Домашня їжа з доставкою в Miami" },
    nav: { how: "Як замовити", menu: "Меню", delivery: "Доставка", faq: "FAQ", contact: "Контакти" },
    actions: { orderNow: "Замовити", viewMenu: "Дивитися меню" },
    hero: {
      eyebrow: "Преміальна домашня кухня",
      title: "Домашня їжа з доставкою в Miami",
      lede:
        "Українські, східноєвропейські, середземноморські, кавказькі та азійські страви готуються на замовлення і доставляються по Miami, Hallandale, Hollywood, Aventura та поруч.",
      cardLabel: "Популярний вибір",
      cardTitle: "Сімейна вечеря",
      cardMeta: "На 4–6 гостей • від $95",
    },
    badges: {
      fresh: "Готуємо свіжими",
      freshSub: "До кожного замовлення",
      preorder: "Передзамовлення 24–48г",
      preorderSub: "Щоб було свіжо",
      delivery: "Локальна доставка",
      deliverySub: "Miami і поруч",
      family: "Сімейна кухня",
      familySub: "Made with love",
    },
    how: {
      title: "Як це працює",
      oneTitle: "Оберіть страви",
      oneText: "Зберіть замовлення з популярних домашніх страв.",
      twoTitle: "Надішліть передзамовлення",
      twoText: "Краще за 24–48 годин до потрібного часу.",
      threeTitle: "Ми готуємо свіжими",
      threeText: "Все готується на замовлення зі свіжих інгредієнтів.",
      fourTitle: "Доставка або самовивіз",
      fourText: "Отримайте їжу свіжою і вчасно.",
    },
    popular: { title: "Популярні страви", viewAll: "Все меню" },
    categories: { title: "Категорії меню" },
    why: {
      title: "Чому клієнти люблять нас",
      oneTitle: "Домашній смак",
      oneText: "Як вдома, тільки зручніше.",
      twoTitle: "Свіжі інгредієнти",
      twoText: "Готуємо з якісних продуктів.",
      threeTitle: "Гнучке меню",
      threeText: "Нові страви та custom requests.",
      fourTitle: "Сімейні порції",
      fourText: "Ідеально для сім'ї та гостей.",
      fiveTitle: "Святкові замовлення",
      fiveText: "Для особливих подій.",
      sixTitle: "Локальна доставка",
      sixText: "Miami і найближчі райони.",
    },
    delivery: {
      eyebrow: "Зона доставки",
      title: "Доставка по South Florida",
      note: "Вартість доставки розраховується індивідуально залежно від району і розміру замовлення.",
    },
    testimonials: { eyebrow: "Відгуки", title: "Що кажуть клієнти" },
    faq: {
      title: "FAQ",
      oneQ: "За скільки часу робити замовлення?",
      oneA: "Краще за 24–48 годин, особливо для сімейних наборів і святкових замовлень.",
      twoQ: "Чи є доставка?",
      twoA: "Так, доставка доступна по Miami і найближчих районах. Вартість розраховується індивідуально.",
      threeQ: "Чи є самовивіз?",
      threeA: "Так, самовивіз можна узгодити в WhatsApp під час підтвердження замовлення.",
      fourQ: "Чи можна замовити на свято?",
      fourA: "Так, можна зібрати святковий стіл або сімейний набір під кількість гостей.",
      fiveQ: "Чи можна зібрати індивідуальне меню?",
      fiveA: "Так, напишіть побажання, кухні, алергії та кількість гостей.",
      sixQ: "Як відбувається оплата?",
      sixA: "Онлайн-оплати на сайті поки немає. Деталі оплати підтверджуються після погодження замовлення.",
    },
    final: {
      eyebrow: "Фінальний крок",
      title: "Готові замовити домашню вечерю?",
      text: "Напишіть нам у WhatsApp — підберемо страви, розрахуємо вартість і підтвердимо час приготування.",
      button: "Замовити у WhatsApp",
    },
    cart: {
      title: "Ваше замовлення",
      empty: "Додайте страви з меню.",
      total: "Орієнтовна сума",
      add: "Додати",
      checkout: "Надіслати замовлення у WhatsApp",
      addFirst: "Спочатку додайте страви",
      remove: "Прибрати",
      itemWord: "страв",
    },
    order: {
      title: "Заявка Mama's Table",
      list: "Список страв",
      total: "Орієнтовна сума",
      help: "Хочу зробити замовлення і підібрати страви",
      confirm: "Будь ласка, підтвердіть наявність, delivery fee і найближчий час приготування.",
    },
  },
};

const dishes = [
  {
    id: "borscht",
    price: 9.5,
    image: "assets/images/mamas-table-hero-family.jpg",
    name: tr("Борщ", "Borscht", "Борщ"),
    description: tr("Традиционный украинский борщ со сметаной и зеленью.", "Traditional Ukrainian beet soup with sour cream and herbs.", "Традиційний український борщ зі сметаною та зеленню."),
  },
  {
    id: "varenyky",
    price: 12.5,
    image: "assets/images/mamas-table-hero-family.jpg",
    name: tr("Вареники", "Vareniki", "Вареники"),
    description: tr("Домашние вареники с картофелем и жареным луком.", "Dumplings with potatoes and fried onions.", "Домашні вареники з картоплею та смаженою цибулею."),
  },
  {
    id: "cabbage-rolls",
    price: 14.5,
    image: "assets/images/mamas-table-hero-family.jpg",
    name: tr("Голубцы", "Cabbage Rolls", "Голубці"),
    description: tr("Голубцы с мясом и рисом в томатном соусе.", "Stuffed cabbage with meat and rice in tomato sauce.", "Голубці з м'ясом і рисом у томатному соусі."),
  },
  {
    id: "chicken-kyiv",
    price: 14.5,
    image: "assets/images/chicken-comfort.jpg",
    name: tr("Котлеты с пюре", "Chicken Kyiv", "Котлети з пюре"),
    description: tr("Сочная куриная котлета с маслом и картофельным пюре.", "Juicy chicken breast stuffed with garlic butter, served with mashed potatoes.", "Соковита куряча котлета з маслом і картопляним пюре."),
  },
  {
    id: "olivier",
    price: 8.5,
    image: "assets/images/ukrainian-table.jpg",
    name: tr("Оливье", "Olivier Salad", "Олів'є"),
    description: tr("Классический домашний салат с овощами, яйцом, курицей и майонезом.", "Classic homemade salad with vegetables, eggs, chicken and mayonnaise.", "Класичний домашній салат з овочами, яйцем, куркою та майонезом."),
  },
  {
    id: "blini",
    price: 10.5,
    image: "assets/images/blini-crepes.jpg",
    name: tr("Блины / Налистники", "Crepes / Blini", "Млинці / Налисники"),
    description: tr("Тонкие блины с разными начинками.", "Thin crepes with various fillings.", "Тонкі млинці з різними начинками."),
  },
];

const categories = [
  { id: "soups", image: "assets/images/mamas-table-hero-family.jpg", icon: "utensils", title: tr("Первые блюда", "Soups", "Перші страви") },
  { id: "mains", image: "assets/images/chicken-comfort.jpg", icon: "chef-hat", title: tr("Основные блюда", "Main Dishes", "Основні страви") },
  { id: "salads", image: "assets/images/ukrainian-table.jpg", icon: "leaf", title: tr("Салаты", "Salads", "Салати") },
  { id: "crepes", image: "assets/images/blini-crepes.jpg", icon: "layers", title: tr("Блины и налистники", "Crepes & Blini", "Млинці та налисники") },
  { id: "family", image: "assets/images/hero-table.jpg", icon: "users", title: tr("Семейные наборы", "Family Sets", "Сімейні набори") },
  { id: "holiday", image: "assets/images/caucasus-mediterranean.jpg", icon: "gift", title: tr("Праздничные заказы", "Holiday Orders", "Святкові замовлення") },
];

const state = {
  lang: localStorage.getItem("mamasTableLang") || "ru",
  cart: new Map(),
};

const money = (value) => `$${value.toFixed(2).replace(/\\.00$/, "")}`;

const text = (value) => value[state.lang] || value.ru || value.en || "";

const t = (path) => path.split(".").reduce((obj, key) => obj?.[key], copy[state.lang]) || path;

const dishById = (id) => dishes.find((dish) => dish.id === id);

const cartEntries = () =>
  Array.from(state.cart.entries())
    .map(([id, quantity]) => ({ dish: dishById(id), quantity }))
    .filter((entry) => entry.dish && entry.quantity > 0);

const cartCount = () => cartEntries().reduce((sum, entry) => sum + entry.quantity, 0);

const cartTotal = () => cartEntries().reduce((sum, entry) => sum + entry.dish.price * entry.quantity, 0);

const cartQuantity = (id) => state.cart.get(id) || 0;

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);

const createDishCard = (dish) => `
  <article class="dish-card reveal">
    <img src="${escapeHtml(dish.image)}" alt="${escapeHtml(text(dish.name))}" loading="lazy" />
    <div class="dish-card-body">
      <h3>${escapeHtml(text(dish.name))}</h3>
      <p>${escapeHtml(text(dish.description))}</p>
      <strong>${money(dish.price)}</strong>
      <div class="dish-actions">
        <button class="add-btn" type="button" data-add="${escapeHtml(dish.id)}">
          <span>${escapeHtml(t("cart.add"))}</span>
          <i data-lucide="plus-circle"></i>
        </button>
        <div class="qty-control" aria-label="${escapeHtml(text(dish.name))} quantity">
          <button type="button" data-minus="${escapeHtml(dish.id)}">−</button>
          <span data-dish-qty="${escapeHtml(dish.id)}">${cartQuantity(dish.id)}</span>
          <button type="button" data-plus="${escapeHtml(dish.id)}">+</button>
        </div>
      </div>
    </div>
  </article>
`;

const createCategoryCard = (category) => `
  <a class="category-card reveal" href="#menu">
    <img src="${escapeHtml(category.image)}" alt="${escapeHtml(text(category.title))}" loading="lazy" />
    <span>
      <i data-lucide="${escapeHtml(category.icon)}"></i>
      <strong>${escapeHtml(text(category.title))}</strong>
    </span>
  </a>
`;

const renderStaticData = () => {
  document.querySelector("[data-dish-grid]").innerHTML = dishes.map(createDishCard).join("");
  document.querySelector("[data-category-grid]").innerHTML = categories.map(createCategoryCard).join("");
  refreshIcons();
  observeReveals();
};

const setQuantity = (id, quantity) => {
  const safeQuantity = Math.max(0, Math.min(quantity, 99));
  if (safeQuantity === 0) state.cart.delete(id);
  else state.cart.set(id, safeQuantity);
  renderCart();
  renderDishQuantities();
};

const renderDishQuantities = () => {
  document.querySelectorAll("[data-dish-qty]").forEach((element) => {
    element.textContent = cartQuantity(element.dataset.dishQty);
  });
};

const buildOrderMessage = () => {
  const entries = cartEntries();
  const lines = entries.length
    ? entries.map(({ dish, quantity }) => `- ${text(dish.name)} x${quantity}: ${money(dish.price * quantity)}`).join("\n")
    : `- ${t("order.help")}`;

  return [t("order.title"), "", `${t("order.list")}:`, lines, `${t("order.total")}: ${money(cartTotal())}`, "", t("order.confirm")].join("\n");
};

const whatsappUrl = (message) => `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;

const renderCart = () => {
  const entries = cartEntries();
  const list = document.querySelector("[data-cart-list]");
  const empty = document.querySelector("[data-cart-empty]");
  const checkoutLink = document.querySelector("[data-checkout-link]");
  const checkoutLabel = document.querySelector("[data-checkout-label]");
  const total = cartTotal();
  const count = cartCount();

  list.innerHTML = entries
    .map(
      ({ dish, quantity }) => `
        <div class="cart-item">
          <div>
            <strong>${escapeHtml(text(dish.name))}</strong>
            <span>${money(dish.price * quantity)}</span>
          </div>
          <div class="cart-row">
            <button type="button" data-minus="${escapeHtml(dish.id)}">−</button>
            <span>${quantity}</span>
            <button type="button" data-plus="${escapeHtml(dish.id)}">+</button>
            <button type="button" data-remove="${escapeHtml(dish.id)}">${escapeHtml(t("cart.remove"))}</button>
          </div>
        </div>
      `,
    )
    .join("");

  empty.hidden = entries.length > 0;
  document.querySelector("[data-cart-count]").textContent = count;
  document.querySelector("[data-cart-total]").textContent = money(total);
  document.querySelector("[data-mobile-count]").textContent = `${count} ${t("cart.itemWord")}`;
  document.querySelector("[data-mobile-total]").textContent = money(total);

  if (entries.length) {
    checkoutLink.href = whatsappUrl(buildOrderMessage());
    checkoutLink.target = "_blank";
    checkoutLink.rel = "noopener noreferrer";
    checkoutLink.removeAttribute("aria-disabled");
    checkoutLabel.textContent = t("cart.checkout");
  } else {
    checkoutLink.href = "#menu";
    checkoutLink.removeAttribute("target");
    checkoutLink.removeAttribute("rel");
    checkoutLink.setAttribute("aria-disabled", "true");
    checkoutLabel.textContent = t("cart.addFirst");
  }
};

const applyTranslations = () => {
  document.documentElement.lang = state.lang;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === state.lang);
  });
  document.title = t("meta.title");
};

const refreshIcons = () => {
  if (window.lucide) window.lucide.createIcons();
};

const handleClick = (event) => {
  const lang = event.target.closest("[data-lang]");
  const add = event.target.closest("[data-add]");
  const plus = event.target.closest("[data-plus]");
  const minus = event.target.closest("[data-minus]");
  const remove = event.target.closest("[data-remove]");
  const quick = event.target.closest("[data-whatsapp-quick]");

  if (lang) {
    state.lang = lang.dataset.lang;
    localStorage.setItem("mamasTableLang", state.lang);
    applyTranslations();
    renderStaticData();
    renderCart();
  }

  if (add) setQuantity(add.dataset.add, cartQuantity(add.dataset.add) + 1);
  if (plus) setQuantity(plus.dataset.plus, cartQuantity(plus.dataset.plus) + 1);
  if (minus) setQuantity(minus.dataset.minus, cartQuantity(minus.dataset.minus) - 1);
  if (remove) setQuantity(remove.dataset.remove, 0);

  if (quick) {
    event.preventDefault();
    window.open(whatsappUrl(buildOrderMessage()), "_blank", "noopener,noreferrer");
  }
};

const setupHeader = () => {
  const header = document.querySelector("[data-header]");
  const update = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
    document.body.classList.toggle("has-scrolled", window.scrollY > 420);
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

document.addEventListener("DOMContentLoaded", () => {
  setupHeader();
  applyTranslations();
  renderStaticData();
  renderCart();
  document.addEventListener("click", handleClick);
  refreshIcons();
});
