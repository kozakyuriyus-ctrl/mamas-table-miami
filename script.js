const BUSINESS = {
  whatsappNumber: "19788358120",
};

const tr = (ru, en, uk) => ({ ru, en, uk });

const copy = {
  ru: {
    meta: { title: "Mama's Table | Домашняя еда с доставкой в Miami" },
    nav: { how: "Как заказать", menu: "Меню", delivery: "Доставка", about: "О нас", faq: "FAQ", contact: "Контакты" },
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
      fresh: "Готовим свежую еду",
      freshSub: "К каждому заказу",
      preorder: "Предзаказ 24–48ч",
      preorderSub: "Чтобы было свежо",
      delivery: "Локальная доставка",
      deliverySub: "По Miami и рядом",
      family: "Семейная кухня",
      familySub: "С любовью",
    },
    how: {
      title: "Как это работает",
      oneTitle: "Выберите блюда",
      oneText: "Соберите заказ из популярных домашних блюд.",
      twoTitle: "Отправьте предзаказ",
      twoText: "Лучше за 24–48 часов до нужного времени.",
      threeTitle: "Мы готовим свежую еду",
      threeText: "Все готовится под заказ из свежих ингредиентов.",
      fourTitle: "Доставка или самовывоз",
      fourText: "Получите еду свежей и вовремя.",
    },
    popular: { title: "Популярные блюда", viewAll: "Все меню" },
    categories: { title: "Категории меню", subtitle: "Выберите категорию, чтобы посмотреть полный список блюд.", open: "Открыть меню" },
    menuPage: {
      title: "Меню Mama's Table",
      subtitle: "Выберите категорию или добавьте популярные блюда в заказ.",
      categoriesTitle: "Выберите категорию",
      featuredTitle: "Популярные блюда",
      backHome: "На главную",
      backMenu: "Назад к меню",
    },
    why: {
      title: "Почему клиенты любят нас",
      oneTitle: "Домашний вкус",
      oneText: "Как дома, только удобнее.",
      twoTitle: "Свежие ингредиенты",
      twoText: "Готовим из качественных продуктов.",
      threeTitle: "Гибкое меню",
      threeText: "Новые блюда и индивидуальные пожелания.",
      fourTitle: "Семейные порции",
      fourText: "Идеально для семьи и гостей.",
      fiveTitle: "Заказы на праздники",
      fiveText: "Для особых случаев.",
      sixTitle: "Локальная доставка",
      sixText: "Miami и ближайшие районы.",
    },
    delivery: {
      eyebrow: "Зона доставки",
      title: "Доставка по Miami-Dade и Broward",
      note: "Стоимость доставки рассчитывается индивидуально в зависимости от района и объема заказа.",
    },
    testimonials: { eyebrow: "Отзывы", title: "Что говорят клиенты", note: "Отзывы первых клиентов скоро появятся здесь." },
    faq: {
      title: "Частые вопросы",
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
      emptyTitle: "Корзина пуста",
      emptyText: "Добавьте блюда из меню, чтобы оформить заказ.",
      emptyAction: "Смотреть меню",
      viewOrder: "Посмотреть заказ",
      hideOrder: "Скрыть заказ",
      total: "Примерная сумма",
      add: "Добавить",
      checkout: "Оформить заказ",
      addFirst: "Сначала добавьте блюда",
      remove: "Убрать",
      itemWord: "позиций",
      unitPrice: "за ед.",
    },
    checkout: {
      title: "Оформление заказа",
      intro: "Заполните данные, и мы свяжемся с вами для подтверждения.",
      name: "Имя",
      phone: "Телефон",
      fulfillment: "Способ получения",
      delivery: "Доставка",
      pickup: "Самовывоз",
      address: "Адрес доставки",
      date: "Дата заказа",
      time: "Время заказа",
      payment: "Способ оплаты",
      cash: "Cash",
      zelle: "Zelle",
      card: "Card",
      other: "Other",
      comment: "Комментарий к заказу",
      submit: "Отправить заказ",
      required: "Заполните обязательные поля",
      thankYou: "Спасибо, заказ получен. Мы скоро свяжемся с вами.",
      close: "Закрыть",
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
    nav: { how: "How It Works", menu: "Menu", delivery: "Delivery", about: "About Us", faq: "FAQ", contact: "Contact" },
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
      familySub: "Made with care",
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
    categories: { title: "Menu Categories", subtitle: "Choose a category to view the full dish list.", open: "Open menu" },
    menuPage: {
      title: "Mama's Table Menu",
      subtitle: "Choose a category or add popular dishes to your order.",
      categoriesTitle: "Choose a category",
      featuredTitle: "Popular dishes",
      backHome: "Back home",
      backMenu: "Back to menu",
    },
    why: {
      title: "Why Customers Love Us",
      oneTitle: "Homemade Taste",
      oneText: "Like home, only better.",
      twoTitle: "Fresh Ingredients",
      twoText: "Quality ingredients in every order.",
      threeTitle: "Flexible Menu",
      threeText: "New dishes and special requests.",
      fourTitle: "Family Portions",
      fourText: "Perfect for family meals.",
      fiveTitle: "Holiday Orders",
      fiveText: "For any special occasion.",
      sixTitle: "Local Delivery",
      sixText: "Across Miami and nearby areas.",
    },
    delivery: {
      eyebrow: "Delivery Areas",
      title: "Delivery across Miami-Dade and Broward",
      note: "Delivery fee is calculated individually based on your location and order size.",
    },
    testimonials: { eyebrow: "Testimonials", title: "What Customers Say", note: "First customer reviews will appear here soon." },
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
      emptyTitle: "Your cart is empty",
      emptyText: "Add dishes from the menu to place an order.",
      emptyAction: "View menu",
      viewOrder: "View order",
      hideOrder: "Hide order",
      total: "Estimated Total",
      add: "Add to Order",
      checkout: "Checkout",
      addFirst: "Add dishes first",
      remove: "Remove",
      itemWord: "items",
      unitPrice: "each",
    },
    checkout: {
      title: "Checkout",
      intro: "Fill in your details and we will contact you to confirm.",
      name: "Name",
      phone: "Phone",
      fulfillment: "Receiving method",
      delivery: "Delivery",
      pickup: "Pickup",
      address: "Delivery address",
      date: "Order date",
      time: "Order time",
      payment: "Payment method",
      cash: "Cash",
      zelle: "Zelle",
      card: "Card",
      other: "Other",
      comment: "Order comment",
      submit: "Submit order",
      required: "Please fill in the required fields",
      thankYou: "Thank you, your order has been received. We will contact you soon.",
      close: "Close",
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
    nav: { how: "Як замовити", menu: "Меню", delivery: "Доставка", about: "Про нас", faq: "FAQ", contact: "Контакти" },
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
      fresh: "Готуємо свіжу їжу",
      freshSub: "До кожного замовлення",
      preorder: "Передзамовлення 24–48г",
      preorderSub: "Щоб було свіжо",
      delivery: "Локальна доставка",
      deliverySub: "Miami і поруч",
      family: "Сімейна кухня",
      familySub: "З любов'ю",
    },
    how: {
      title: "Як це працює",
      oneTitle: "Оберіть страви",
      oneText: "Зберіть замовлення з популярних домашніх страв.",
      twoTitle: "Надішліть передзамовлення",
      twoText: "Краще за 24–48 годин до потрібного часу.",
      threeTitle: "Ми готуємо свіжу їжу",
      threeText: "Все готується на замовлення зі свіжих інгредієнтів.",
      fourTitle: "Доставка або самовивіз",
      fourText: "Отримайте їжу свіжою і вчасно.",
    },
    popular: { title: "Популярні страви", viewAll: "Все меню" },
    categories: { title: "Категорії меню", subtitle: "Оберіть категорію, щоб переглянути повний список страв.", open: "Відкрити меню" },
    menuPage: {
      title: "Меню Mama's Table",
      subtitle: "Оберіть категорію або додайте популярні страви до замовлення.",
      categoriesTitle: "Оберіть категорію",
      featuredTitle: "Популярні страви",
      backHome: "На головну",
      backMenu: "Назад до меню",
    },
    why: {
      title: "Чому клієнти люблять нас",
      oneTitle: "Домашній смак",
      oneText: "Як вдома, тільки зручніше.",
      twoTitle: "Свіжі інгредієнти",
      twoText: "Готуємо з якісних продуктів.",
      threeTitle: "Гнучке меню",
      threeText: "Нові страви та індивідуальні побажання.",
      fourTitle: "Сімейні порції",
      fourText: "Ідеально для сім'ї та гостей.",
      fiveTitle: "Святкові замовлення",
      fiveText: "Для особливих подій.",
      sixTitle: "Локальна доставка",
      sixText: "Miami і найближчі райони.",
    },
    delivery: {
      eyebrow: "Зона доставки",
      title: "Доставка по Miami-Dade та Broward",
      note: "Вартість доставки розраховується індивідуально залежно від району і розміру замовлення.",
    },
    testimonials: { eyebrow: "Відгуки", title: "Що кажуть клієнти", note: "Відгуки перших клієнтів скоро з'являться тут." },
    faq: {
      title: "Часті питання",
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
      emptyTitle: "Кошик порожній",
      emptyText: "Додайте страви з меню, щоб оформити замовлення.",
      emptyAction: "Дивитися меню",
      viewOrder: "Переглянути замовлення",
      hideOrder: "Сховати замовлення",
      total: "Орієнтовна сума",
      add: "Додати",
      checkout: "Оформити замовлення",
      addFirst: "Спочатку додайте страви",
      remove: "Прибрати",
      itemWord: "позицій",
      unitPrice: "за од.",
    },
    checkout: {
      title: "Оформлення замовлення",
      intro: "Заповніть дані, і ми зв'яжемося з вами для підтвердження.",
      name: "Ім'я",
      phone: "Телефон",
      fulfillment: "Спосіб отримання",
      delivery: "Доставка",
      pickup: "Самовивіз",
      address: "Адреса доставки",
      date: "Дата замовлення",
      time: "Час замовлення",
      payment: "Спосіб оплати",
      cash: "Cash",
      zelle: "Zelle",
      card: "Card",
      other: "Other",
      comment: "Коментар до замовлення",
      submit: "Надіслати замовлення",
      required: "Заповніть обов'язкові поля",
      thankYou: "Дякуємо, замовлення отримано. Ми скоро з вами зв'яжемося.",
      close: "Закрити",
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

let menuItems = [];

const categories = [
  {
    id: "soups",
    image: "assets/images/mamas-table-hero-family.jpg",
    icon: "utensils",
    title: tr("Первые блюда", "Soups", "Перші страви"),
    description: tr("Домашние супы, которые готовятся свежими под предзаказ.", "Homemade soups prepared fresh for preorder.", "Домашні супи, які готуються свіжими під передзамовлення."),
  },
  {
    id: "main-dishes",
    image: "assets/images/chicken-comfort.jpg",
    icon: "chef-hat",
    title: tr("Вторые блюда", "Main Dishes", "Другі страви"),
    description: tr("Сытные украинские, восточноевропейские и кавказские блюда для обеда или ужина.", "Comforting Ukrainian, Eastern European and Caucasian mains for lunch or dinner.", "Ситні українські, східноєвропейські та кавказькі страви для обіду або вечері."),
  },
  {
    id: "salads",
    image: "assets/images/ukrainian-table.jpg",
    icon: "leaf",
    title: tr("Салаты", "Salads", "Салати"),
    description: tr("Классические домашние и свежие средиземноморские салаты.", "Classic homemade and fresh Mediterranean salads.", "Класичні домашні та свіжі середземноморські салати."),
  },
];

const popularDishes = menuItems.filter((dish) => dish.popular);

const createDefaultCheckoutForm = () => ({
  name: "",
  phone: "",
  fulfillmentType: "delivery",
  address: "",
  date: "",
  time: "",
  paymentMethod: "cash",
  comment: "",
});

const loadCart = () => {
  try {
    const saved = localStorage.getItem("mamasTableCart");
    return saved ? new Map(JSON.parse(saved)) : new Map();
  } catch {
    return new Map();
  }
};

const saveCart = (cart) => {
  try {
    localStorage.setItem("mamasTableCart", JSON.stringify(Array.from(cart.entries())));
  } catch {}
};

const state = {
  lang: localStorage.getItem("mamasTableLang") || "ru",
  cart: loadCart(),
  cartExpanded: false,
  checkoutOpen: false,
  checkoutError: false,
  checkoutForm: createDefaultCheckoutForm(),
  submittedOrder: null,
};

const badgeLabels = {
  bestseller: tr("🔥 Бестселлер", "🔥 Bestseller", "🔥 Бестселер"),
  vegetarian: tr("🌿 Вегетарианское", "🌿 Vegetarian", "🌿 Вегетаріанське"),
  new: tr("✨ Новинка", "✨ New", "✨ Новинка"),
};

const money = (value) => `$${value.toFixed(2).replace(/\\.00$/, "")}`;

const text = (value) => value[state.lang] || value.ru || value.en || "";

const t = (path) => path.split(".").reduce((obj, key) => obj?.[key], copy[state.lang]) || path;

const slavicPlural = (count, one, few, many) => {
  const value = Math.abs(count);
  const mod10 = value % 10;
  const mod100 = value % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
};

const cartItemLabel = (count) => {
  if (state.lang === "ru") return slavicPlural(count, "позиция", "позиции", "позиций");
  if (state.lang === "uk") return slavicPlural(count, "позиція", "позиції", "позицій");
  return count === 1 ? "item" : "items";
};

const dishById = (id) => menuItems.find((dish) => dish.id === id);

const categoryById = (id) => categories.find((category) => category.id === id);

const menuItemsByCategory = (id) => menuItems.filter((dish) => dish.category === id);

const categoryRouteAliases = {
  "first-dishes": "soups",
  soups: "soups",
  "main-dishes": "main-dishes",
  salads: "salads",
};

const normalizeRoute = (route) => categoryRouteAliases[route] || route;

const isMobileViewport = () => window.matchMedia("(max-width: 760px)").matches;

const categoryScrollOffset = () => {
  const header = document.querySelector("[data-header]");
  const headerHeight = header?.getBoundingClientRect().height || Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 0;
  return headerHeight + 18;
};

const scrollToCategoryDishes = (behavior = "smooth") => {
  const dishPanel = document.querySelector("[data-category-dishes]");
  if (!dishPanel) return;
  const top = Math.max(0, dishPanel.getBoundingClientRect().top + window.scrollY - categoryScrollOffset());
  window.scrollTo({ top, behavior });
};

const revealCategoryDishes = () => {
  document.querySelectorAll("[data-category-dishes] .reveal").forEach((element) => {
    element.classList.add("is-visible");
  });
};

const scheduleCategoryDishesScroll = () => {
  window.scrollTo({ top: 0, behavior: "auto" });
  const syncScroll = () => {
    scrollToCategoryDishes("auto");
    revealCategoryDishes();
  };
  const heroImage = document.querySelector(".route-hero-image > img");

  if (heroImage && !heroImage.complete) {
    heroImage.addEventListener("load", syncScroll, { once: true });
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      syncScroll();
      [140, 420, 900, 1600].forEach((delay) => window.setTimeout(syncScroll, delay));
    });
  });
};

const cartEntries = () =>
  Array.from(state.cart.entries())
    .map(([id, quantity]) => ({ dish: dishById(id), quantity }))
    .filter((entry) => entry.dish && entry.quantity > 0);

const cartCount = () => cartEntries().reduce((sum, entry) => sum + entry.quantity, 0);

const cartTotal = () => cartEntries().reduce((sum, entry) => sum + entry.dish.price * entry.quantity, 0);

const cartQuantity = (id) => state.cart.get(id) || 0;

const categoryUnits = {
  soups: tr("за 1 литр", "per liter", "за 1 літр"),
  "main-dishes": tr("за 1 кг", "per kg", "за 1 кг"),
  salads: tr("за 1 кг", "per kg", "за 1 кг"),
};

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);

const createDishBadge = (badge) => {
  const label = badgeLabels[badge];
  if (!label) return "";
  return `<span class="dish-badge dish-badge-${escapeHtml(badge)}">${escapeHtml(text(label))}</span>`;
};

const createDishCard = (dish, options = {}) => `
  <article class="dish-card${options.reveal === false ? "" : " reveal"}">
    <div class="dish-media">
      ${createDishBadge(dish.badge)}
      <img src="${escapeHtml(dish.image)}" alt="${escapeHtml(text(dish.name))}" loading="lazy" />
    </div>
    <div class="dish-card-body">
      <h3>${escapeHtml(text(dish.name))}</h3>
      <p>${escapeHtml(text(dish.description))}</p>
      <strong>${money(dish.price)}${categoryUnits[dish.category] ? `<span class="dish-unit">${escapeHtml(text(categoryUnits[dish.category]))}</span>` : ""}</strong>
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
  <a class="category-card reveal" href="#/${escapeHtml(category.id)}" data-category-route="${escapeHtml(category.id)}">
    <img src="${escapeHtml(category.image)}" alt="${escapeHtml(text(category.title))}" loading="lazy" />
    <span>
      <i data-lucide="${escapeHtml(category.icon)}"></i>
      <strong>${escapeHtml(text(category.title))}</strong>
      <small>${escapeHtml(t("categories.open"))}</small>
    </span>
  </a>
`;

const renderStaticData = () => {
  document.querySelector("[data-dish-grid]").innerHTML = popularDishes.map(createDishCard).join("");
  document.querySelector("[data-category-grid]").innerHTML = categories.map(createCategoryCard).join("");
  refreshIcons();
  observeReveals();
};

const routeFromHash = () => {
  const hash = window.location.hash.trim();
  if (!hash) return null;
  if (hash.startsWith("#/")) return normalizeRoute(hash.slice(2) || "menu");
  return categoryRouteAliases[hash.slice(1)] || null;
};

const scrollToAnchorHash = () => {
  const hash = window.location.hash.trim();
  if (!hash || hash.startsWith("#/")) return;
  try {
    document.querySelector(hash)?.scrollIntoView({ block: "start" });
  } catch {
    return;
  }
};

const createRouteOrderCard = () => `
  <aside class="order-card route-order-card reveal" id="route-order-card" data-route-order-card>
    <div class="order-head">
      <h3>${escapeHtml(t("cart.title"))}</h3>
      <span data-cart-count>0</span>
    </div>
    <div class="cart-summary" data-cart-summary></div>
    <div class="cart-actions" data-cart-actions></div>
    <div class="cart-details" data-cart-details>
      <div class="cart-list" data-cart-list></div>
    </div>
    <div class="cart-empty" data-cart-empty>${escapeHtml(t("cart.empty"))}</div>
    <div class="checkout-panel" data-checkout-panel></div>
    <div class="cart-thankyou" data-cart-thankyou></div>
  </aside>
`;

const createMenuOverviewPage = () => `
  <div class="menu-page">
    <header class="route-hero reveal">
      <a class="back-link" href="#top">
        <i data-lucide="arrow-left"></i>
        <span>${escapeHtml(t("menuPage.backHome"))}</span>
      </a>
      <p class="eyebrow">${escapeHtml(t("nav.menu"))}</p>
      <h1>${escapeHtml(t("menuPage.title"))}</h1>
      <p>${escapeHtml(t("menuPage.subtitle"))}</p>
    </header>

    <div class="menu-page-layout">
      <div class="menu-content">
        <section class="menu-panel reveal">
          <div class="section-title">
            <h2>${escapeHtml(t("menuPage.categoriesTitle"))}</h2>
          </div>
          <div class="category-grid route-category-grid">${categories.map(createCategoryCard).join("")}</div>
        </section>

        <section class="menu-panel reveal">
          <div class="section-title">
            <h2>${escapeHtml(t("menuPage.featuredTitle"))}</h2>
          </div>
          <div class="dish-grid menu-dish-grid">${popularDishes.map(createDishCard).join("")}</div>
        </section>
      </div>
      ${createRouteOrderCard()}
    </div>
  </div>
`;

const createCategoryPage = (category) => `
  <div class="menu-page">
    <header class="route-hero route-hero-image reveal">
      <a class="back-link route-back-link" href="#/menu">
        <i data-lucide="arrow-left"></i>
        <span>${escapeHtml(t("menuPage.backMenu"))}</span>
      </a>
      <img src="${escapeHtml(category.image)}" alt="${escapeHtml(text(category.title))}" />
      <div class="route-hero-copy">
        <p class="eyebrow">${escapeHtml(t("nav.menu"))}</p>
        <h1>${escapeHtml(text(category.title))}</h1>
        <p>${escapeHtml(text(category.description))}</p>
      </div>
    </header>

    <div class="menu-page-layout">
      <section class="menu-panel menu-content category-dishes-panel reveal" id="${escapeHtml(category.id)}-dishes" data-category-dishes>
        <div class="dish-grid menu-dish-grid">${menuItemsByCategory(category.id).map((dish) => createDishCard(dish, { reveal: false })).join("")}</div>
      </section>
      ${createRouteOrderCard()}
    </div>
  </div>
`;

const renderRoute = () => {
  const route = routeFromHash();
  const homeView = document.querySelector("[data-home-view]");
  const routeView = document.querySelector("[data-route-view]");
  const category = route ? categoryById(route) : null;
  const isRoute = route === "menu" || Boolean(category);

  if (!isRoute) {
    homeView.hidden = false;
    routeView.hidden = true;
    routeView.innerHTML = "";
    document.body.classList.remove("is-route-view");
    document.title = t("meta.title");
    renderCart();
    renderDishQuantities();
    refreshIcons();
    observeReveals();

    requestAnimationFrame(scrollToAnchorHash);
    return;
  }

  homeView.hidden = true;
  routeView.hidden = false;
  routeView.innerHTML = route === "menu" ? createMenuOverviewPage() : createCategoryPage(category);
  document.body.classList.add("is-route-view");
  document.title = route === "menu" ? `${t("menuPage.title")} | Mama's Table` : `${text(category.title)} | Mama's Table`;
  renderCart();
  renderDishQuantities();
  refreshIcons();
  observeReveals();

  if (category && isMobileViewport()) {
    document.querySelectorAll("[data-route-view] .reveal").forEach((el) => el.classList.add("is-visible"));
    revealCategoryDishes();
    scheduleCategoryDishesScroll();
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const setQuantity = (id, quantity) => {
  const safeQuantity = Math.max(0, Math.min(quantity, 99));
  if (safeQuantity > 0) state.submittedOrder = null;
  if (safeQuantity === 0) state.cart.delete(id);
  else state.cart.set(id, safeQuantity);
  if (!state.cart.size) {
    state.cartExpanded = false;
    state.checkoutOpen = false;
    state.checkoutError = false;
  }
  saveCart(state.cart);
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

const createCartEmptyState = () => `
  <div class="cart-empty-state">
    <i data-lucide="shopping-basket"></i>
    <h4>${escapeHtml(t("cart.emptyTitle"))}</h4>
    <p>${escapeHtml(t("cart.emptyText"))}</p>
    <a href="#menu">${escapeHtml(t("cart.emptyAction"))}</a>
  </div>
`;

const createCartSummary = (count, total) => `
  <p>${count} ${escapeHtml(cartItemLabel(count))} · <strong>${money(total)}</strong></p>
`;

const createCartActions = () => `
  <button class="cart-secondary-action" type="button" data-toggle-cart>
    ${escapeHtml(state.cartExpanded ? t("cart.hideOrder") : t("cart.viewOrder"))}
  </button>
  <button class="btn btn-primary cart-checkout" type="button" data-open-checkout>
    ${escapeHtml(t("cart.checkout"))}
  </button>
`;

const createCartDetails = (entries) =>
  entries
    .map(
      ({ dish, quantity }) => `
        <div class="cart-item">
          <div class="cart-item-main">
            <div>
              <strong>${escapeHtml(text(dish.name))}</strong>
              <span>${money(dish.price)} ${escapeHtml(t("cart.unitPrice"))} · x${quantity}</span>
            </div>
            <em>${money(dish.price * quantity)}</em>
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

const createCheckoutForm = () => {
  const form = state.checkoutForm;
  const isDelivery = form.fulfillmentType === "delivery";
  const checked = (field, value) => (form[field] === value ? " checked" : "");
  const selected = (field, value) => (form[field] === value ? " selected" : "");

  return `
    <form class="checkout-form" data-checkout-form novalidate>
      <div class="checkout-head">
        <div>
          <h4>${escapeHtml(t("checkout.title"))}</h4>
          <p>${escapeHtml(t("checkout.intro"))}</p>
        </div>
        <button type="button" data-close-checkout>${escapeHtml(t("checkout.close"))}</button>
      </div>
      <div class="form-grid">
        <label class="form-field">
          <span>${escapeHtml(t("checkout.name"))} *</span>
          <input data-checkout-field name="name" type="text" value="${escapeHtml(form.name)}" autocomplete="name" required />
        </label>
        <label class="form-field">
          <span>${escapeHtml(t("checkout.phone"))} *</span>
          <input data-checkout-field name="phone" type="tel" value="${escapeHtml(form.phone)}" autocomplete="tel" required />
        </label>
        <fieldset class="form-field form-field-wide">
          <legend>${escapeHtml(t("checkout.fulfillment"))} *</legend>
          <div class="radio-group">
            <label>
              <input data-checkout-field name="fulfillmentType" type="radio" value="delivery"${checked("fulfillmentType", "delivery")} />
              <span>${escapeHtml(t("checkout.delivery"))}</span>
            </label>
            <label>
              <input data-checkout-field name="fulfillmentType" type="radio" value="pickup"${checked("fulfillmentType", "pickup")} />
              <span>${escapeHtml(t("checkout.pickup"))}</span>
            </label>
          </div>
        </fieldset>
        <label class="form-field form-field-wide${isDelivery ? "" : " is-hidden"}">
          <span>${escapeHtml(t("checkout.address"))}${isDelivery ? " *" : ""}</span>
          <input data-checkout-field name="address" type="text" value="${escapeHtml(form.address)}" autocomplete="street-address" ${isDelivery ? "required" : ""} />
        </label>
        <label class="form-field">
          <span>${escapeHtml(t("checkout.date"))} *</span>
          <input data-checkout-field name="date" type="date" value="${escapeHtml(form.date)}" required />
        </label>
        <label class="form-field">
          <span>${escapeHtml(t("checkout.time"))} *</span>
          <input data-checkout-field name="time" type="time" value="${escapeHtml(form.time)}" required />
        </label>
        <label class="form-field form-field-wide">
          <span>${escapeHtml(t("checkout.payment"))} *</span>
          <select data-checkout-field name="paymentMethod" required>
            <option value="cash"${selected("paymentMethod", "cash")}>${escapeHtml(t("checkout.cash"))}</option>
            <option value="zelle"${selected("paymentMethod", "zelle")}>${escapeHtml(t("checkout.zelle"))}</option>
            <option value="card"${selected("paymentMethod", "card")}>${escapeHtml(t("checkout.card"))}</option>
            <option value="other"${selected("paymentMethod", "other")}>${escapeHtml(t("checkout.other"))}</option>
          </select>
        </label>
        <label class="form-field form-field-wide">
          <span>${escapeHtml(t("checkout.comment"))}</span>
          <textarea data-checkout-field name="comment" rows="3">${escapeHtml(form.comment)}</textarea>
        </label>
      </div>
      <p class="form-error" ${state.checkoutError ? "" : "hidden"}>${escapeHtml(t("checkout.required"))}</p>
      <button class="btn btn-primary checkout-submit" type="submit">${escapeHtml(t("checkout.submit"))}</button>
    </form>
  `;
};

const createCartThankYouState = () => `
  <div class="cart-thankyou-state">
    <i data-lucide="check-circle-2"></i>
    <p>${escapeHtml(t("checkout.thankYou"))}</p>
  </div>
`;

const syncCheckoutFormFromElement = (form) => {
  const data = new FormData(form);
  state.checkoutForm = {
    name: String(data.get("name") || "").trim(),
    phone: String(data.get("phone") || "").trim(),
    fulfillmentType: String(data.get("fulfillmentType") || "delivery"),
    address: String(data.get("address") || "").trim(),
    date: String(data.get("date") || ""),
    time: String(data.get("time") || ""),
    paymentMethod: String(data.get("paymentMethod") || "cash"),
    comment: String(data.get("comment") || "").trim(),
  };
};

const buildOrderData = () => {
  const entries = cartEntries();
  const fulfillmentType = state.checkoutForm.fulfillmentType === "pickup" ? "pickup" : "delivery";
  return {
    customer: {
      name: state.checkoutForm.name,
      phone: state.checkoutForm.phone,
    },
    fulfillment: {
      type: fulfillmentType,
      ...(fulfillmentType === "delivery" ? { address: state.checkoutForm.address } : {}),
      date: state.checkoutForm.date,
      time: state.checkoutForm.time,
    },
    paymentMethod: state.checkoutForm.paymentMethod,
    ...(state.checkoutForm.comment ? { comment: state.checkoutForm.comment } : {}),
    items: entries.map(({ dish, quantity }) => ({
      id: dish.id,
      name: text(dish.name),
      quantity,
      unitPrice: dish.price,
      lineTotal: dish.price * quantity,
    })),
    total: cartTotal(),
    language: state.lang === "uk" ? "ua" : state.lang,
    createdAt: new Date().toISOString(),
  };
};

const isOrderDataValid = (orderData) =>
  Boolean(
    orderData.items.length &&
      orderData.customer.name &&
      orderData.customer.phone &&
      orderData.fulfillment.type &&
      orderData.fulfillment.date &&
      orderData.fulfillment.time &&
      orderData.paymentMethod &&
      (orderData.fulfillment.type !== "delivery" || orderData.fulfillment.address),
  );

const renderCart = () => {
  const entries = cartEntries();
  const total = cartTotal();
  const count = cartCount();
  const hasEntries = entries.length > 0;
  const hasSubmittedOrder = Boolean(state.submittedOrder) && !hasEntries;

  document.querySelectorAll(".order-card").forEach((card) => {
    card.classList.toggle("is-empty", !hasEntries && !hasSubmittedOrder);
    card.classList.toggle("is-submitted", hasSubmittedOrder);
    card.classList.toggle("is-expanded", state.cartExpanded && hasEntries);
    card.classList.toggle("is-checkout-open", state.checkoutOpen && hasEntries);
  });
  document.querySelectorAll("[data-cart-summary]").forEach((summary) => {
    summary.innerHTML = hasEntries ? createCartSummary(count, total) : "";
    summary.hidden = !hasEntries;
  });
  document.querySelectorAll("[data-cart-actions]").forEach((actions) => {
    actions.innerHTML = hasEntries ? createCartActions() : "";
    actions.hidden = !hasEntries;
  });
  document.querySelectorAll("[data-cart-list]").forEach((list) => {
    list.innerHTML = hasEntries ? createCartDetails(entries) : "";
  });
  document.querySelectorAll("[data-cart-details]").forEach((details) => {
    details.hidden = !hasEntries || !state.cartExpanded;
  });
  document.querySelectorAll("[data-cart-empty]").forEach((empty) => {
    empty.innerHTML = createCartEmptyState();
    empty.hidden = hasEntries || hasSubmittedOrder;
  });
  document.querySelectorAll("[data-checkout-panel]").forEach((panel) => {
    panel.innerHTML = hasEntries && state.checkoutOpen ? createCheckoutForm() : "";
    panel.hidden = !hasEntries || !state.checkoutOpen;
  });
  document.querySelectorAll("[data-cart-thankyou]").forEach((thankYou) => {
    thankYou.innerHTML = hasSubmittedOrder ? createCartThankYouState() : "";
    thankYou.hidden = !hasSubmittedOrder;
  });
  document.querySelectorAll("[data-cart-count]").forEach((element) => {
    element.textContent = count;
  });
  document.querySelector("[data-mobile-count]").textContent = `${count} ${cartItemLabel(count)}`;
  document.querySelector("[data-mobile-total]").textContent = money(total);
  refreshIcons();
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
  const categoryRoute = event.target.closest("[data-category-route]");
  const add = event.target.closest("[data-add]");
  const plus = event.target.closest("[data-plus]");
  const minus = event.target.closest("[data-minus]");
  const remove = event.target.closest("[data-remove]");
  const quick = event.target.closest("[data-whatsapp-quick]");
  const mobileOrder = event.target.closest("[data-mobile-order]");
  const toggleCart = event.target.closest("[data-toggle-cart]");
  const openCheckout = event.target.closest("[data-open-checkout]");
  const closeCheckout = event.target.closest("[data-close-checkout]");

  if (lang) {
    state.lang = lang.dataset.lang;
    localStorage.setItem("mamasTableLang", state.lang);
    applyTranslations();
    renderStaticData();
    renderRoute();
  }

  if (categoryRoute) {
    event.preventDefault();
    const nextHash = `#/${categoryRoute.dataset.categoryRoute}`;
    if (window.location.hash !== nextHash) window.location.hash = nextHash;
    renderRoute();
    return;
  }

  if (add) setQuantity(add.dataset.add, cartQuantity(add.dataset.add) + 1);
  if (plus) setQuantity(plus.dataset.plus, cartQuantity(plus.dataset.plus) + 1);
  if (minus) setQuantity(minus.dataset.minus, cartQuantity(minus.dataset.minus) - 1);
  if (remove) setQuantity(remove.dataset.remove, 0);

  if (toggleCart) {
    event.preventDefault();
    state.cartExpanded = !state.cartExpanded;
    state.checkoutOpen = false;
    state.checkoutError = false;
    renderCart();
  }

  if (openCheckout) {
    event.preventDefault();
    if (!cartEntries().length) return;
    state.checkoutOpen = true;
    state.cartExpanded = false;
    state.checkoutError = false;
    renderCart();
  }

  if (closeCheckout) {
    event.preventDefault();
    state.checkoutOpen = false;
    state.checkoutError = false;
    renderCart();
  }

  if (quick) {
    event.preventDefault();
    window.open(whatsappUrl(buildOrderMessage()), "_blank", "noopener,noreferrer");
  }

  if (mobileOrder && routeFromHash()) {
    event.preventDefault();
    document.querySelector("[data-route-order-card]")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const handleFormInput = (event) => {
  const field = event.target.closest("[data-checkout-field]");
  if (!field) return;
  state.checkoutForm[field.name] = field.value;
};

const handleFormChange = (event) => {
  const field = event.target.closest("[data-checkout-field]");
  if (!field) return;
  state.checkoutForm[field.name] = field.value;
  if (field.name === "fulfillmentType") {
    state.checkoutError = false;
    renderCart();
  }
};

const handleSubmit = (event) => {
  const form = event.target.closest("[data-checkout-form]");
  if (!form) return;
  event.preventDefault();
  syncCheckoutFormFromElement(form);
  const orderData = buildOrderData();

  if (!isOrderDataValid(orderData)) {
    state.checkoutError = true;
    renderCart();
    return;
  }

  state.submittedOrder = orderData;
  state.cart.clear();
  saveCart(state.cart);
  state.cartExpanded = false;
  state.checkoutOpen = false;
  state.checkoutError = false;
  state.checkoutForm = createDefaultCheckoutForm();
  renderCart();
  renderDishQuantities();
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

const setupFaqAccordion = () => {
  const items = document.querySelectorAll(".faq-list details");
  items.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      items.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
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

document.addEventListener("DOMContentLoaded", async () => {
  try { const _r = await fetch("dishes.json"); if (_r.ok) menuItems = await _r.json(); } catch {}
  setupHeader();
  setupFaqAccordion();
  applyTranslations();
  renderStaticData();
  renderRoute();
  renderCart();
  document.addEventListener("click", handleClick);
  document.addEventListener("input", handleFormInput);
  document.addEventListener("change", handleFormChange);
  document.addEventListener("submit", handleSubmit);
  window.addEventListener("hashchange", renderRoute);
  window.addEventListener("load", scrollToAnchorHash);
  refreshIcons();
});
