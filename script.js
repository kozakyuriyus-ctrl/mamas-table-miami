const WHATSAPP_NUMBER = "79788358120";
const TELEGRAM_USERNAME = "Lanaskitchenmiami";
const formatPhone = (n) => `+${n[0]} ${n.slice(1, 4)} ${n.slice(4, 7)}-${n.slice(7)}`;
const DISPLAY_PHONE = formatPhone(WHATSAPP_NUMBER);

// ── Delivery zone config ─────────────────────────────────────────────────────
// Mirrors DELIVERY_ZONES in worker/index.js — keep in sync when changing prices
const DELIVERY_ZONES = {
  "1": { label: "A", fee: 10, minOrder: 60, freeAt: 110 },
  "2": { label: "B", fee: 15, minOrder: 80, freeAt: 145 },
  "3": { label: "C", fee: 20, minOrder: 120, freeAt: 200, requiresManualConfirmation: true },
  remote: { label: "Remote", fee: null, minOrder: 120, requiresManualConfirmation: true },
};

// ZIP → zone map — single source of truth, mirrors ZIP_DELIVERY_ZONES in worker/index.js
const ZIP_DELIVERY_ZONES = {
  A: ["33009", "33160", "33180", "33019", "33020", "33023"],
  B: ["33004", "33021", "33024", "33025", "33154"],
  C: ["33305", "33306", "33334"],
};

const zipToZoneKey = (zip) => {
  const z = String(zip || "").trim();
  if (!/^\d{5}$/.test(z)) return "";
  if (ZIP_DELIVERY_ZONES.A.includes(z)) return "1";
  if (ZIP_DELIVERY_ZONES.B.includes(z)) return "2";
  if (ZIP_DELIVERY_ZONES.C.includes(z)) return "3";
  return "remote";
};

// City → acceptable zone(s) for mismatch warning only (not for pricing).
// A city may span multiple zones — warning fires only when ZIP zone is outside this list.
const CITY_ACCEPTABLE_ZONES = {
  "hallandale beach":   ["1"],
  "aventura":           ["1"],
  "golden beach":       ["1"],
  "sunny isles beach":  ["1"],
  "north miami beach":  ["1", "remote"],
  "west park":          ["1"],
  "pembroke park":      ["1"],
  "hollywood":          ["1", "2"],         // 33019/33020 = A, 33021/33024 = B
  "dania beach":        ["2"],
  "north miami":        ["2", "remote"],
  "miami shores":       ["2", "remote"],
  "bal harbour":        ["2"],
  "bay harbor islands": ["2"],
  "surfside":           ["2"],
  "miramar":            ["2", "remote"],
  "pembroke pines":     ["2", "remote"],
  "miami gardens":      ["2", "remote"],
  "fort lauderdale":    ["3", "remote"],
  "oakland park":       ["3", "remote"],
  "wilton manors":      ["3", "remote"],
  "lauderdale lakes":   ["3", "remote"],
  "davie":              ["3", "remote"],
  "cooper city":        ["3", "remote"],
  "miami beach":        ["remote"],
  // "Other" → no key → warning never fires
};

// City list for address select (values are English city names)
const DELIVERY_CITIES = [
  "Hallandale Beach", "Aventura", "Golden Beach", "Sunny Isles Beach",
  "North Miami Beach", "Hollywood", "West Park", "Pembroke Park",
  "Dania Beach", "North Miami", "Miami Shores", "Bal Harbour",
  "Bay Harbor Islands", "Surfside", "Miramar", "Pembroke Pines",
  "Miami Gardens", "Fort Lauderdale", "Oakland Park", "Wilton Manors",
  "Lauderdale Lakes", "Davie", "Cooper City", "Miami Beach",
];

const API_ENABLED = true;
const PREORDER_API_URL = "https://api.lanaskitchenmiami.com/preorder";
const PLACES_API_URL   = "https://api.lanaskitchenmiami.com/places";

// Test mode — activated only when URL contains ?test=1&token=<secret>
// The token is never stored here; it's read from the URL and passed to the Worker,
// which validates it against the TEST_TOKEN Cloudflare secret.
const _qs = typeof location !== "undefined" ? new URLSearchParams(location.search) : new URLSearchParams();
const TEST_MODE  = _qs.get("test")  === "1";
const TEST_TOKEN = _qs.get("token") || "";

const tr = (ru, en, uk) => ({ ru, en, uk });

const copy = {
  ru: {
    meta: { title: "Lana's Kitchen Miami | Свежая домашняя еда" },
    brand: { name: "Lana's Kitchen", tagline: "MIAMI" },
    nav: {
      menu: "Меню",
      catering: "Кейтеринг",
      how: "Как заказать",
      delivery: "Доставка",
      about: "О нас",
      faq: "FAQ",
      contact: "Контакты",
      openMenu: "Открыть меню",
      closeMenu: "Закрыть меню",
    },
    actions: {
      chooseDishes: "Выбрать блюда",
      openCart: "Открыть корзину",
      howItWorks: "Как заказать",
      questionsWA: "Вопросы или индивидуальный заказ",
      viewFullMenu: "Все меню",
    },
    size: {
      soups: "Объём: 1 qt (32 fl oz / 946 мл) · 3–4 порции",
      salads: "Вес: 1 lb (454 г) · 3–4 порции",
      mainDishes: "Вес: 1 lb (454 г) · 2–3 порции",
      chickenTabaka: "1 шт · примерно 1.2–1.3 lb (545–595 г) · 2 порции",
      dumplingsAndCrepes: "Вес: 1 lb (454 г) · 2 порции",
      mashedPotatoes: "Вес: 1 lb (454 г) · 3 порции",
      liverCake: "1 шт. примерно 3 lb (1 кг 362 г) · 6–8 порций",
      mimosaSalad: "Вес: 2 lb (908 г) · 6–8 порций",
      herringUnderFurCoat: "Вес: 2 lb (908 г) · 6–8 порций",
    },
    orderUnit: {
      piece: "1 шт.",
      pcs: "(2 шт.)",
    },
    hero: {
      eyebrow: "Настоящая домашняя кухня",
      title: "Свежая домашняя еда в Майами",
      lede: "Борщ, вареники, пельмени, домашние салаты, горячие блюда, семейные ужины и кейтеринг.",
      ledeSub: "Готовим свежим к вашему столу",
      cardLabel: "Популярный заказ",
      cardTitle: "Семейный ужин от $95",
      cardDesc: "Соберём домашний стол для семьи или гостей — с учётом количества человек и ваших любимых блюд.",
      cardMeta: "На 4–6 гостей · доставка по согласованию",
    },
    badges: {
      fresh: "Свежая еда",
      freshSub: "Готовим к заказу",
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
      threeTitle: "Подтверждаем заказ",
      threeText: "Подтверждаем состав заказа, дату, время и стоимость доставки. Способ оплаты согласовываем индивидуально. Заказ подтверждается после оплаты.",
      fourTitle: "Мы готовим свежую еду",
      fourText: "Все готовится под заказ из свежих ингредиентов.",
      fiveTitle: "Доставка",
      fiveText: "Получите еду свежей и вовремя.",
    },
    categories: {
      title: "Категории меню",
      subtitle: "Выберите категорию, чтобы посмотреть полный список блюд.",
      open: "Открыть",
      viewAll: "Все меню",
      from: "от",
    },
    catering: {
      eyebrow: "Кейтеринг",
      title: "Кейтеринг и праздничные заказы",
      subtitle: "Соберём домашний стол для дня рождения, семейного праздника, встречи с друзьями или небольшого офисного события.",
      benefit1: "Меню под количество гостей",
      benefit2: "Любимые домашние блюда и закуски",
      benefit3: "Индивидуальные пожелания и аллергии",
      benefit4: "Доставка по Miami-Dade и Broward",
      cta: "Получить предложение",
      ctaCustom: "Согласовать спецзаказ",
      ctaCustomOrder: "Индивидуальный заказ",
      ctaCustomOrderNote: "Праздники, семейные ужины, кейтеринг и блюда по договорённости.",
      note: "Меню, количество порций, время приготовления и стоимость согласовываются индивидуально перед подтверждением заказа.",
    },
    menuPage: {
      title: "Меню Lana's Kitchen",
      subtitle: "Выберите категорию, чтобы посмотреть блюда и оформить заказ.",
      categoriesTitle: "Выберите категорию",
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
      subtitle: "Точная стоимость и возможность доставки определяются по ZIP-коду.",
      zone1Label: "Зона A — $10",
      zone1Cities: "Hallandale Beach, Aventura, Sunny Isles Beach, Golden Beach, часть Hollywood и ближайшие районы.",
      zone2Label: "Зона B — $15",
      zone2Cities: "Dania Beach, часть Hollywood, часть Pembroke Pines и Miramar, Bal Harbour, North Miami.",
      zone3Label: "Зона C — $20",
      zone3Cities: "Fort Lauderdale, Wilton Manors, Oakland Park и ближайшие районы.",
      zone4Label: "Удалённые районы — по подтверждению адреса",
      zone4Cities: "Включая Miami Beach. Мы свяжемся с вами для уточнения возможности и стоимости доставки.",
      footer: "Точная стоимость и возможность доставки определяются по ZIP-коду.",
    },
    testimonials: {
      eyebrow: "Отзывы",
      title: "Что говорят клиенты",
      placeholder: "Первые отзывы клиентов скоро появятся здесь.",
    },
    about: {
      eyebrow: "О нас",
      title: "О Lana's Kitchen",
      text: "Мы готовим домашние восточноевропейские блюда в Майами по предварительному заказу. Каждое блюдо готовится свежим, небольшими партиями, с вниманием к вкусу, качеству ингредиентов и семейным традициям.",
    },
    faq: {
      title: "Частые вопросы",
      oneQ: "За сколько времени делать заказ?",
      oneA: "Лучше за 24–48 часов, особенно для семейных наборов и праздничных заказов.",
      twoQ: "Доставляете ли вы?",
      twoA: "Да. Доставка работает по зонам: Зона A — $10, минимальный заказ $60, бесплатно от $110; Зона B — $15, минимальный заказ $80, бесплатно от $145; Зона C — $20, минимальный заказ $120. Удалённые районы, включая Miami Beach, обслуживаются только после подтверждения доступности и стоимости доставки.",
      fourQ: "Можно ли заказать на праздник?",
      fourA: "Да, можно собрать праздничный стол или семейный набор под количество гостей.",
      fiveQ: "Можно ли собрать индивидуальное меню?",
      fiveA: "Да, напишите пожелания, кухни, аллергии и количество гостей.",
      sixQ: "Как происходит оплата?",
      sixA: "Сначала мы подтверждаем состав заказа, дату, время и стоимость доставки. Способ оплаты согласовывается индивидуально на этом этапе. Заказ считается подтверждённым после оплаты.",
      sevenQ: "Можно ли отменить заказ?",
      sevenA: "Отмена и изменения возможны до начала закупки и приготовления. Для праздничных и крупных заказов действуют отдельные условия предоплаты.",
      eightQ: "Есть ли аллергены?",
      eightA: "Пожалуйста, сообщите об аллергиях при оформлении. Мы учитываем пожелания, но не можем гарантировать полное отсутствие следов аллергенов.",
      nineQ: "Можно ли заказать день в день?",
      nineA: "Основной формат — предзаказ за 24–48 часов. Заказы день в день возможны только при наличии свободного времени и ингредиентов.",
    },
    final: {
      eyebrow: "Финальный шаг",
      title: "Готовы заказать домашний ужин?",
      text: "Выберите блюда из меню — мы готовим под заказ и подтверждаем детали перед оплатой.",
      buttonPrimary: "Выбрать блюда",
      buttonSecondary: "Вопросы или индивидуальный заказ",
    },
    contact: {
      title: "Связаться с нами",
      text: "Есть вопрос, нужен заказ на праздник или хотите обсудить особые пожелания? Напишите нам — мы свяжемся с вами.",
      btn: "Написать нам",
      note: "Вопросы, праздники, кейтеринг и индивидуальные пожелания.",
    },
    social: {
      title: "Мы в социальных сетях",
      instagram: "Instagram Lana's Kitchen Miami",
      facebook: "Facebook Lana's Kitchen Miami",
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
      checkout: "Перейти к деталям заказа",
      mobileCTA: "Ваш заказ",
      addFirst: "Сначала добавьте блюда",
      remove: "Убрать",
      itemWord: "позиций",
      unitPrice: "за ед.",
      unitLb: "за фунт",
      unitPcs: "2 шт.",
      addOnsOnly: "Добавки можно заказать только вместе с блюдами из основного меню.",
    },
    cartReview: {
      title: "Ваш заказ",
      subtotal: "Блюда",
      delivery: "Доставка",
      deliveryNote: "Стоимость будет рассчитана после ввода адреса",
      deliveryConfirming: "Доставка подтверждается после проверки адреса",
      proceed: "Перейти к оформлению заказа",
      backToMenu: "Продолжить покупки",
    },
    popular: {
      title: "Популярные блюда",
    },
    toast: {
      added: "Добавлено в заказ",
    },
    addOnModal: {
      title: "Рекомендуем к этому блюду",
      continueShopping: "Продолжить покупки",
      goToCart: "Перейти в корзину",
      added: "✓ Добавлено в корзину",
      addBtn: "+ Добавить",
    },
    preorder: {
      modalTitle: "Детали предзаказа",
      cartSummaryTitle: "Ваш заказ в Lana's Kitchen",
      name: "Имя",
      phone: "Телефон",
      phoneOtherCode: "Другой код страны",
      phoneBackToUs: "← США (+1)",
      phoneCountryCodeLabel: "Код страны",
      phoneNumberLabel: "Номер телефона",
      intlMessengerQ: "Этот номер доступен в WhatsApp или Telegram для подтверждения заказа?",
      intlMessengerWhatsapp: "WhatsApp",
      intlMessengerTelegram: "Telegram",
      intlMessengerCall: "Обычный звонок",
      intlMessengerOther: "Другой номер для связи",
      altContact: "Контакт для связи (необязательно)",
      placesManual: "Не нашли адрес? Введите вручную",
      address: "Адрес доставки",
      apt: "Квартира / Unit (необязательно)",
      city: "Город",
      zip: "ZIP-код",
      addressPlaceholder: "100 NW 1st Ave, Miami, FL",
      cityPlaceholder: "Выберите город",
      cityOther: "Другой район — по согласованию",
      date: "Дата доставки",
      allergies: "Аллергии / особые пожелания",
      backToMenu: "← Вернуться в меню",
      submit: "Отправить заявку",
      submitting: "Отправляем заявку…",
      testModeBanner: "⚠ Тестовый режим: заказ не будет отправлен как реальный.",
      apiError: "Ошибка при отправке заявки. Пожалуйста, попробуйте ещё раз.",
      required: "Заполните все обязательные поля.",
      completeRequired: "Заполните обязательные поля, чтобы продолжить.",
      phoneInvalid: "Укажите корректный номер телефона.",
      dateNotFuture: "Выберите дату: завтра или позже.",
      zoneRequired: "Выберите зону доставки.",
      close: "Закрыть",
      zoneTitle: "Район доставки",
      zone1: "Зона A — $10 · Hallandale Beach, Aventura, Sunny Isles Beach, North Miami Beach",
      zone2: "Зона B — $15 · Hollywood, Dania Beach, North Miami",
      zone3: "Зона C — $20 · Fort Lauderdale, Miami Beach, Miami Shores",
      zoneRemote: "Другие удалённые районы — по согласованию",
      foodSubtotal: "Сумма блюд",
      deliveryFee: "Доставка",
      freeDelivery: "Бесплатно",
      freeDeliveryDiscount: "Скидка (бесплатная доставка)",
      freeDeliveryUnlocked: "Бесплатная доставка применена",
      orderTotal: "Итого к оплате",
      orderTotalNoDelivery: "Итог без учёта доставки",
      zoneCFeeLabel: "от $20",
      zoneCNote: "Доставка от $20. Точная стоимость подтверждается после проверки адреса.",
      zoneCFreeNote: "Бесплатная доставка возможна после подтверждения адреса.",
      remoteDeliveryLabel: "по согласованию",
      remoteNote: "Возможность и стоимость доставки будут подтверждены вручную.",
      remoteDisabledNote: "Для удалённых районов стоимость и возможность доставки подтверждаются индивидуально.",
      contactTitle: "Контактные данные",
      contactMethod: "Способ связи",
      contactSms: "SMS",
      contactWhatsapp: "WhatsApp",
      contactTelegram: "Telegram",
      contactCallMe: "Звонок",
      telegramUsername: "Telegram username (необязательно)",
      whatsappSamePhone: "Этот номер доступен в WhatsApp",
      deliveryTitle: "Детали доставки",
      gateCode: "Код ворот (необязательно)",
      deliveryInstructions: "Инструкции для доставки (необязательно)",
      scheduleTitle: "Дата и время",
      timeWindow: "Временное окно",
      timeWindowPlaceholder: "Выберите время",
      timeA: "10:00 AM – 11:00 AM",
      timeB: "11:00 AM – 12:00 PM",
      timeC: "12:00 PM – 1:00 PM",
      timeD: "1:00 PM – 2:00 PM",
      timeE: "2:00 PM – 3:00 PM",
      timeF: "3:00 PM – 4:00 PM",
      timeG: "4:00 PM – 5:00 PM",
      timeH: "5:00 PM – 6:00 PM",
      timeI: "6:00 PM – 7:00 PM",
      timeJ: "7:00 PM – 8:00 PM",
      orderNotes: "Комментарий к заказу (необязательно)",
      preorderAdvanceNote: "Готовим свежую еду по предзаказу. Пожалуйста, оформляйте заказ минимум за 24–48 часов.",
      successTitle: "Ваша заявка получена.",
      successText: "Мы проверим адрес, детали доставки и возможность приготовления, затем свяжемся с вами выбранным способом. Заказ будет поставлен в приготовление только после подтверждения и оплаты.",
      successRef: "№ заявки:",
      fieldRequired: "Заполните это поле",
      validationBanner: "Пожалуйста, заполните все обязательные поля.",
      err: {
        name: "Введите ваше имя",
        phone: "Введите номер телефона",
        phoneInvalid: "Неверный формат телефона",
        address: "Введите адрес доставки",
        city: "Выберите город",
        zip: "Введите ZIP-код (5 цифр)",
        date: "Выберите дату (минимум завтра)",
        timeWindow: "Выберите временной интервал",
      },
      zoneMismatch: "Указанный ZIP-код относится к другой зоне доставки. Условия доставки рассчитаны по ZIP-коду.",
      zipUnknown: "Этот ZIP-код требует ручного подтверждения доставки. Стоимость доставки будет подтверждена после проверки адреса.",
      otherDelivery: "по согласованию",
      otherTotal: "будет подтверждён после проверки адреса",
      otherNote: "Возможность и стоимость доставки будут подтверждены вручную.",
      prelimDelivery: "Предварительная доставка",
      prelimTotal: "Предварительный итог",
      confirmationNote: "Точная стоимость доставки будет подтверждена после проверки адреса.",
    },
    cateringForm: {
      modalTitle: "Заявка на кейтеринг",
      name: "Имя",
      phone: "Телефон / WhatsApp",
      date: "Дата мероприятия",
      occasion: "Повод",
      occasionPlaceholder: "Выберите повод",
      occasionBirthday: "День рождения",
      occasionFamily: "Семейный праздник",
      occasionFriends: "Встреча с друзьями",
      occasionOffice: "Офисный заказ",
      occasionOther: "Другой повод",
      guests: "Количество гостей",
      area: "Район / город проведения",
      fulfillment: "Доставка или самовывоз",
      delivery: "Доставка",
      pickup: "Самовывоз",
      dishes: "Пожелания по блюдам",
      allergies: "Аллергии / особенности питания",
      comment: "Комментарий",
      submit: "Оформить заявку",
      disclaimer: "Меню, количество порций, время и стоимость согласовываются индивидуально перед подтверждением.",
      required: "Заполните все обязательные поля.",
      phoneInvalid: "Укажите корректный номер телефона.",
      dateInPast: "Дата не может быть в прошлом.",
      guestsInvalid: "Укажите количество гостей (минимум 1).",
      close: "Закрыть",
      messengerTitle: "Выберите мессенджер",
      messengerSubtitle: "Напишите нам — мы получим заявку и свяжемся для подтверждения.",
      viaWhatsApp: "Написать в WhatsApp",
      viaTelegram: "Написать в Telegram",
      stage1Ref: "№ заявки:",
      stage2Title: "Завершите отправку",
      stage2Text: "Убедитесь, что ваше сообщение доставлено. Если мессенджер не открылся — воспользуйтесь способами ниже.",
      stage2Button: "Я отправил сообщение",
      stage3Title: "Подтвердите отправку",
      stage3Text: "После подтверждения мы примем вашу заявку на кейтеринг.",
      stage3Confirm: "Да, сообщение отправлено — завершить",
      stage3Back: "Назад",
      fallbackTitle: "Если мессенджер не открылся",
      fallbackNote: "Воспользуйтесь одним из способов ниже.",
      copyPhone: "Скопировать номер WA",
      copyMessage: "Скопировать текст заявки",
      openWA: "Открыть WhatsApp",
      openTG: "Открыть Telegram",
      copied: "Скопировано",
      stage4Title: "Спасибо!",
      stage4Text: "Мы получим вашу заявку на кейтеринг и свяжемся для подтверждения деталей.",
      stage4WA: "Открыть WhatsApp",
      stage4TG: "Открыть Telegram",
    },
    order: {
      titlePreorder: "Новая заявка на предзаказ",
      titleCatering: "Новая заявка на кейтеринг",
      ref: "Номер заявки",
      createdAt: "Создано",
      miamiTime: "Miami time",
      name: "Клиент",
      phone: "Телефон / WhatsApp",
      address: "Адрес",
      date: "Желаемая дата",
      time: "Желаемое время",
      zone: "Зона доставки",
      items: "Состав заказа",
      subtotal: "Предварительная сумма",
      comment: "Комментарий",
      allergies: "Аллергии / пожелания",
      deliveryNote: "Стоимость доставки и итоговая сумма подтверждаются отдельно.",
      help: "Здравствуйте! Хочу задать вопрос или оформить индивидуальный заказ.",
    },
    orders: {
      btnLabel: "Мои недавние заказы",
      btnSub: "Посмотреть заказы, отправленные с этого устройства.",
      title: "Мои недавние заказы",
      subtitle: "Заказы хранятся только на этом устройстве 30 дней.",
      status: "Заявка отправлена — ждём подтверждения",
      empty: "Недавних заказов пока нет.",
      emptySub: "После оформления заказа он появится здесь.",
      deleteBtn: "Удалить историю заказов с этого устройства",
      deleteConfirm: "Удалить все сохранённые заказы с этого устройства? Это действие нельзя отменить.",
      deleteCancel: "Отмена",
      deleteOk: "Удалить",
      subtotal: "Сумма блюд",
      delivery: "Доставка",
      deliveryTbd: "уточняется",
      total: "Итого",
      address: "Адрес доставки",
      date: "Дата доставки",
      time: "Время",
      comment: "Комментарий",
      allergies: "Аллергии / пожелания",
      contactMethod: "Способ связи",
      backLink: "Назад",
      orderNum: "Заказ",
      contactSms: "SMS",
      contactWhatsapp: "WhatsApp",
      contactTelegram: "Telegram",
      contactCallMe: "Позвоните мне",
    },
  },
  en: {
    meta: { title: "Lana's Kitchen Miami | Fresh Homemade Meals" },
    brand: { name: "Lana's Kitchen", tagline: "MIAMI" },
    nav: {
      menu: "Menu",
      catering: "Catering",
      how: "How It Works",
      delivery: "Delivery",
      about: "About Us",
      faq: "FAQ",
      contact: "Contact",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    actions: {
      chooseDishes: "Choose dishes",
      openCart: "Open cart",
      howItWorks: "How ordering works",
      questionsWA: "Questions or custom order",
      viewFullMenu: "View full menu",
    },
    size: {
      soups: "Size: 1 qt (32 fl oz / 946 ml) · Serves 3–4",
      salads: "Size: 1 lb (454 g) · Serves 3–4",
      mainDishes: "Size: 1 lb (454 g) · Serves 2–3",
      chickenTabaka: "1 pc · approx. 1.2–1.3 lb (545–595 g) · 2 servings",
      dumplingsAndCrepes: "Size: 1 lb (454 g) · Serves 2",
      mashedPotatoes: "Size: 1 lb (454 g) · Serves 3",
      liverCake: "1 piece, approximately 3 lb (1.36 kg) · 6–8 servings",
      mimosaSalad: "Weight: 2 lb (908 g) · 6–8 servings",
      herringUnderFurCoat: "Weight: 2 lb (908 g) · 6–8 servings",
    },
    orderUnit: {
      piece: "1 piece",
      pcs: "(2 pcs.)",
    },
    hero: {
      eyebrow: "Real Home Cooking",
      title: "Fresh Homemade Meals in Miami",
      lede: "Borscht, varenyky, pelmeni, homestyle salads, hot dishes, family dinners and catering.",
      ledeSub: "Made fresh for your table.",
      cardLabel: "Popular Order",
      cardTitle: "Family Dinner from $95",
      cardDesc: "We'll put together a home-cooked spread for your family or guests — tailored to your group size and favourite dishes.",
      cardMeta: "Serves 4–6 guests · delivery by arrangement",
    },
    badges: {
      fresh: "Fresh Food",
      freshSub: "Made to order",
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
      threeTitle: "We confirm your order",
      threeText: "We confirm the order details, delivery date, time, and cost. Payment method is arranged individually. Your order is confirmed after payment.",
      fourTitle: "We cook fresh",
      fourText: "Prepared with fresh ingredients.",
      fiveTitle: "Delivery",
      fiveText: "Get your meals fresh and on time.",
    },
    categories: {
      title: "Menu Categories",
      subtitle: "Choose a category to view the full dish list.",
      open: "Open",
      viewAll: "View full menu",
      from: "from",
    },
    catering: {
      eyebrow: "Catering",
      title: "Catering & Celebrations",
      subtitle: "We create a homemade menu for birthdays, family celebrations, gatherings with friends, and small office events.",
      benefit1: "Menu tailored to your guest count",
      benefit2: "Favorite homemade dishes and appetizers",
      benefit3: "Dietary preferences and allergy notes",
      benefit4: "Delivery across Miami-Dade and Broward",
      cta: "Request a Quote",
      ctaCustom: "Request a Custom Order",
      ctaCustomOrder: "Custom order",
      ctaCustomOrderNote: "For celebrations, family dinners, catering and dishes by request.",
      note: "Menu, portions, preparation time, and final pricing are confirmed individually before the order is approved.",
    },
    menuPage: {
      title: "Lana's Kitchen Menu",
      subtitle: "Choose a category to browse dishes and place your order.",
      categoriesTitle: "Choose a category",
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
      title: "Delivery across Miami-Dade & Broward",
      subtitle: "Final delivery availability and cost are determined by ZIP code.",
      zone1Label: "Zone A — $10",
      zone1Cities: "Hallandale Beach, Aventura, Sunny Isles Beach, Golden Beach, part of Hollywood, and nearby areas.",
      zone2Label: "Zone B — $15",
      zone2Cities: "Dania Beach, part of Hollywood, parts of Pembroke Pines and Miramar, Bal Harbour, North Miami.",
      zone3Label: "Zone C — $20",
      zone3Cities: "Fort Lauderdale, Wilton Manors, Oakland Park, and nearby areas.",
      zone4Label: "Remote areas — address confirmation required",
      zone4Cities: "Including Miami Beach. We'll contact you to confirm delivery availability and cost.",
      footer: "Final delivery availability and cost are determined by ZIP code.",
    },
    testimonials: {
      eyebrow: "Testimonials",
      title: "What Customers Say",
      placeholder: "First customer reviews will appear here soon.",
    },
    about: {
      eyebrow: "About",
      title: "About Lana's Kitchen",
      text: "We prepare homemade Eastern European food in Miami by preorder. Every dish is cooked fresh in small batches, with care for flavor, quality ingredients, and family traditions.",
    },
    faq: {
      title: "FAQ",
      oneQ: "How far in advance should I order?",
      oneA: "24–48 hours is best, especially for family sets and holiday orders.",
      twoQ: "Do you deliver?",
      twoA: "Yes. Delivery is organized by zones: Zone A is $10 with a $60 order minimum and free delivery from $110; Zone B is $15 with an $80 order minimum and free delivery from $145; Zone C is $20 with a $120 order minimum. Remote areas, including Miami Beach, are served only after confirming delivery availability and cost.",
      fourQ: "Can I order for a holiday?",
      fourA: "Yes, we can prepare family trays and holiday tables for your guest count.",
      fiveQ: "Can I create a custom menu?",
      fiveA: "Yes, send your cuisine preferences, allergies and guest count.",
      sixQ: "How does payment work?",
      sixA: "First we confirm the order details, date, time, and delivery cost. The payment method is arranged individually at this step. The order is confirmed once payment is received.",
      sevenQ: "Can I cancel my order?",
      sevenA: "Cancellations and changes are possible before we start purchasing ingredients and cooking. Holiday and large orders have separate prepayment terms.",
      eightQ: "Do you account for allergens?",
      eightA: "Please let us know about allergies when ordering. We take preferences into account but cannot guarantee the complete absence of allergen traces.",
      nineQ: "Can I order for the same day?",
      nineA: "Our main format is pre-order 24–48 hours in advance. Same-day orders are possible only if we have free time and ingredients available.",
    },
    final: {
      eyebrow: "Final step",
      title: "Ready to Enjoy Homemade Goodness?",
      text: "Choose dishes from the menu — we cook to order and confirm all details before payment.",
      buttonPrimary: "Choose dishes",
      buttonSecondary: "Questions or custom order",
    },
    contact: {
      title: "Contact Us",
      text: "Have a question, planning a celebration, or need a custom request? Send us a message and we will get back to you.",
      btn: "Send us a message",
      note: "Questions, celebrations, catering and custom requests.",
    },
    social: {
      title: "Follow us",
      instagram: "Instagram Lana's Kitchen Miami",
      facebook: "Facebook Lana's Kitchen Miami",
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
      add: "Add",
      checkout: "Review order details",
      mobileCTA: "Your order",
      addFirst: "Add dishes first",
      remove: "Remove",
      itemWord: "items",
      unitPrice: "each",
      unitLb: "per lb",
      unitPcs: "2 pcs.",
      addOnsOnly: "Add-ons can only be ordered together with items from the main menu.",
    },
    cartReview: {
      title: "Your Order",
      subtotal: "Dishes",
      delivery: "Delivery",
      deliveryNote: "Cost calculated after entering your address",
      deliveryConfirming: "Delivery will be confirmed after address review",
      proceed: "Proceed to checkout",
      backToMenu: "Continue shopping",
    },
    popular: {
      title: "Popular Dishes",
    },
    toast: {
      added: "Added to order",
    },
    addOnModal: {
      title: "Recommended with this dish",
      continueShopping: "Continue shopping",
      goToCart: "Go to cart",
      added: "✓ Added to cart",
      addBtn: "+ Add",
    },
    preorder: {
      modalTitle: "Pre-order details",
      cartSummaryTitle: "Your Order at Lana's Kitchen",
      name: "Name",
      phone: "Phone",
      phoneOtherCode: "Other country code",
      phoneBackToUs: "← USA (+1)",
      phoneCountryCodeLabel: "Country code",
      phoneNumberLabel: "Phone number",
      intlMessengerQ: "Is this number available on WhatsApp or Telegram for order confirmation?",
      intlMessengerWhatsapp: "WhatsApp",
      intlMessengerTelegram: "Telegram",
      intlMessengerCall: "Phone call",
      intlMessengerOther: "Different contact number",
      altContact: "Contact for confirmation (optional)",
      placesManual: "Can't find your address? Enter it manually",
      address: "Delivery address",
      apt: "Apartment / Unit (optional)",
      city: "City",
      zip: "ZIP code",
      addressPlaceholder: "100 NW 1st Ave, Miami, FL",
      cityPlaceholder: "Select city",
      cityOther: "Other area — by arrangement",
      date: "Delivery date",
      allergies: "Allergies / special requests",
      backToMenu: "← Back to menu",
      submit: "Send preorder request",
      submitting: "Sending request…",
      testModeBanner: "⚠ Test mode: this order will not be sent as a real order.",
      apiError: "Failed to send request. Please try again.",
      required: "Please fill in all required fields.",
      completeRequired: "Complete the required fields to continue.",
      phoneInvalid: "Please enter a valid phone number.",
      dateNotFuture: "Please select a future date (tomorrow or later).",
      zoneRequired: "Please select a delivery zone.",
      close: "Close",
      zoneTitle: "Delivery area",
      zone1: "Zone A — $10 · Hallandale Beach, Aventura, Sunny Isles Beach, North Miami Beach",
      zone2: "Zone B — $15 · Hollywood, Dania Beach, North Miami",
      zone3: "Zone C — $20 · Fort Lauderdale, Miami Beach, Miami Shores",
      zoneRemote: "Other distant areas — by arrangement",
      foodSubtotal: "Food subtotal",
      deliveryFee: "Delivery",
      freeDelivery: "Free",
      freeDeliveryDiscount: "Free delivery discount",
      freeDeliveryUnlocked: "Free delivery applied",
      orderTotal: "Total to pay",
      orderTotalNoDelivery: "Total (excl. delivery)",
      zoneCFeeLabel: "from $20",
      zoneCNote: "Delivery starts at $20. Final cost will be confirmed after the address is reviewed.",
      zoneCFreeNote: "Free delivery may be available after the address is confirmed.",
      remoteDeliveryLabel: "by arrangement",
      remoteNote: "Delivery availability and cost will be confirmed manually.",
      remoteDisabledNote: "For distant areas, delivery cost and availability are confirmed individually.",
      contactTitle: "Your details",
      contactMethod: "Preferred contact method",
      contactSms: "SMS",
      contactWhatsapp: "WhatsApp",
      contactTelegram: "Telegram",
      contactCallMe: "Phone call",
      telegramUsername: "Telegram username (optional)",
      whatsappSamePhone: "This phone number is available on WhatsApp",
      deliveryTitle: "Delivery details",
      gateCode: "Gate code (optional)",
      deliveryInstructions: "Delivery instructions (optional)",
      scheduleTitle: "Date & time",
      timeWindow: "Delivery time window",
      timeWindowPlaceholder: "Select a time window",
      timeA: "10:00 AM – 11:00 AM",
      timeB: "11:00 AM – 12:00 PM",
      timeC: "12:00 PM – 1:00 PM",
      timeD: "1:00 PM – 2:00 PM",
      timeE: "2:00 PM – 3:00 PM",
      timeF: "3:00 PM – 4:00 PM",
      timeG: "4:00 PM – 5:00 PM",
      timeH: "5:00 PM – 6:00 PM",
      timeI: "6:00 PM – 7:00 PM",
      timeJ: "7:00 PM – 8:00 PM",
      orderNotes: "Order notes (optional)",
      preorderAdvanceNote: "Orders are prepared fresh by preorder. Please order at least 24–48 hours in advance.",
      successTitle: "Your preorder request has been received.",
      successText: "We will review the address, delivery details, and availability, then contact you using your preferred method. Your order will be placed in preparation only after confirmation and payment.",
      successRef: "Request #:",
      fieldRequired: "Please fill out this field",
      validationBanner: "Please fill in all required fields.",
      err: {
        name: "Enter your name",
        phone: "Enter your phone number",
        phoneInvalid: "Invalid phone number format",
        address: "Enter your delivery address",
        city: "Select a city",
        zip: "Enter ZIP code (5 digits)",
        date: "Select a date (tomorrow or later)",
        timeWindow: "Select a delivery time window",
      },
      zoneMismatch: "This ZIP code belongs to a different delivery zone. Delivery terms were calculated based on the ZIP code.",
      zipUnknown: "This ZIP code requires manual delivery confirmation. The delivery fee will be confirmed after the address is reviewed.",
      otherDelivery: "by arrangement",
      otherTotal: "to be confirmed after address review",
      otherNote: "Delivery availability and cost will be confirmed manually.",
      prelimDelivery: "Preliminary delivery",
      prelimTotal: "Preliminary total",
      confirmationNote: "Exact delivery cost will be confirmed after the address is reviewed.",
    },
    cateringForm: {
      modalTitle: "Catering request",
      name: "Name",
      phone: "Phone / WhatsApp",
      date: "Event date",
      occasion: "Occasion",
      occasionPlaceholder: "Select occasion",
      occasionBirthday: "Birthday",
      occasionFamily: "Family celebration",
      occasionFriends: "Gathering with friends",
      occasionOffice: "Office order",
      occasionOther: "Other",
      guests: "Number of guests",
      area: "Area / city",
      fulfillment: "Delivery or pickup",
      delivery: "Delivery",
      pickup: "Pickup",
      dishes: "Dish preferences",
      allergies: "Allergies / dietary notes",
      comment: "Comment",
      submit: "Submit request",
      disclaimer: "Menu, portions, preparation time, and final pricing are confirmed individually before the order is approved.",
      required: "Please fill in all required fields.",
      phoneInvalid: "Please enter a valid phone number.",
      dateInPast: "Date cannot be in the past.",
      guestsInvalid: "Please enter number of guests (minimum 1).",
      close: "Close",
      messengerTitle: "Choose a messenger",
      messengerSubtitle: "Write to us — we'll receive your request and follow up to confirm.",
      viaWhatsApp: "Message via WhatsApp",
      viaTelegram: "Message via Telegram",
      stage1Ref: "Request #:",
      stage2Title: "Complete your submission",
      stage2Text: "Make sure your message was delivered. If the messenger didn't open, use the options below.",
      stage2Button: "I sent the message",
      stage3Title: "Confirm submission",
      stage3Text: "Once confirmed, we will receive your catering request.",
      stage3Confirm: "Yes, message sent — complete",
      stage3Back: "Back",
      fallbackTitle: "If the messenger didn't open",
      fallbackNote: "Use one of the options below to send your request manually.",
      copyPhone: "Copy WA number",
      copyMessage: "Copy request text",
      openWA: "Open WhatsApp",
      openTG: "Open Telegram",
      copied: "Copied",
      stage4Title: "Thank you!",
      stage4Text: "We'll receive your catering request and contact you to confirm the details.",
      stage4WA: "Open WhatsApp",
      stage4TG: "Open Telegram",
    },
    order: {
      titlePreorder: "New pre-order request",
      titleCatering: "New catering request",
      ref: "Request ID",
      createdAt: "Created",
      miamiTime: "Miami time",
      name: "Customer",
      phone: "Phone / WhatsApp",
      address: "Address",
      date: "Preferred date",
      time: "Preferred time",
      zone: "Delivery zone",
      items: "Order contents",
      subtotal: "Estimated total",
      comment: "Comment",
      allergies: "Allergies / requests",
      deliveryNote: "Delivery cost and final total will be confirmed separately.",
      help: "Hello! I have a question or would like to place a custom order.",
    },
    orders: {
      btnLabel: "My recent orders",
      btnSub: "View orders sent from this device.",
      title: "My recent orders",
      subtitle: "Orders are stored on this device for 30 days.",
      status: "Order submitted — awaiting confirmation",
      empty: "No recent orders yet.",
      emptySub: "Your completed order will appear here.",
      deleteBtn: "Delete order history from this device",
      deleteConfirm: "Delete all saved orders from this device? This cannot be undone.",
      deleteCancel: "Cancel",
      deleteOk: "Delete",
      subtotal: "Food subtotal",
      delivery: "Delivery",
      deliveryTbd: "to be confirmed",
      total: "Total",
      address: "Delivery address",
      date: "Delivery date",
      time: "Time",
      comment: "Comment",
      allergies: "Allergies / requests",
      contactMethod: "Contact method",
      backLink: "Back",
      orderNum: "Order",
      contactSms: "SMS",
      contactWhatsapp: "WhatsApp",
      contactTelegram: "Telegram",
      contactCallMe: "Call me",
    },
  },
  uk: {
    meta: { title: "Lana's Kitchen Miami | Свіжа домашня їжа" },
    brand: { name: "Lana's Kitchen", tagline: "MIAMI" },
    nav: {
      menu: "Меню",
      catering: "Кейтеринг",
      how: "Як замовити",
      delivery: "Доставка",
      about: "Про нас",
      faq: "FAQ",
      contact: "Контакти",
      openMenu: "Відкрити меню",
      closeMenu: "Закрити меню",
    },
    actions: {
      chooseDishes: "Обрати страви",
      openCart: "Відкрити кошик",
      howItWorks: "Як замовити",
      questionsWA: "Запитання або індивідуальне замовлення",
      viewFullMenu: "Все меню",
    },
    size: {
      soups: "Об'єм: 1 qt (32 fl oz / 946 мл) · 3–4 порції",
      salads: "Вага: 1 lb (454 г) · 3–4 порції",
      mainDishes: "Вага: 1 lb (454 г) · 2–3 порції",
      chickenTabaka: "1 шт · приблизно 1.2–1.3 lb (545–595 г) · 2 порції",
      dumplingsAndCrepes: "Вага: 1 lb (454 г) · 2 порції",
      mashedPotatoes: "Вага: 1 lb (454 г) · 3 порції",
      liverCake: "1 шт., приблизно 3 lb (1,36 кг) · 6–8 порцій",
      mimosaSalad: "Вага: 2 lb (908 г) · 6–8 порцій",
      herringUnderFurCoat: "Вага: 2 lb (908 г) · 6–8 порцій",
    },
    orderUnit: {
      piece: "1 шт.",
      pcs: "(2 шт.)",
    },
    hero: {
      eyebrow: "Справжня домашня кухня",
      title: "Свіжа домашня їжа в Маямі",
      lede: "Борщ, вареники, пельмені, домашні салати, гарячі страви, сімейні вечері та кейтеринг.",
      ledeSub: "Готуємо свіжим до вашого столу",
      cardLabel: "Популярне замовлення",
      cardTitle: "Сімейна вечеря від $95",
      cardDesc: "Зберемо домашній стіл для сім'ї або гостей — з урахуванням кількості людей та ваших улюблених страв.",
      cardMeta: "На 4–6 гостей · доставка за узгодженням",
    },
    badges: {
      fresh: "Свіжа їжа",
      freshSub: "Готуємо до замовлення",
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
      threeTitle: "Підтверджуємо замовлення",
      threeText: "Підтверджуємо склад замовлення, дату, час і вартість доставки. Спосіб оплати узгоджується індивідуально. Замовлення підтверджується після оплати.",
      fourTitle: "Ми готуємо свіжу їжу",
      fourText: "Все готується на замовлення зі свіжих інгредієнтів.",
      fiveTitle: "Доставка",
      fiveText: "Отримайте їжу свіжою і вчасно.",
    },
    categories: {
      title: "Категорії меню",
      subtitle: "Оберіть категорію, щоб переглянути повний список страв.",
      open: "Відкрити",
      viewAll: "Все меню",
      from: "від",
    },
    catering: {
      eyebrow: "Кейтеринг",
      title: "Кейтеринг і святкові замовлення",
      subtitle: "Зберемо домашній стіл для дня народження, сімейного свята, зустрічі з друзями або невеликої офісної події.",
      benefit1: "Меню під кількість гостей",
      benefit2: "Улюблені домашні страви та закуски",
      benefit3: "Індивідуальні побажання та алергії",
      benefit4: "Доставка по Miami-Dade та Broward",
      cta: "Отримати пропозицію",
      ctaCustom: "Узгодити спецзамовлення",
      ctaCustomOrder: "Індивідуальне замовлення",
      ctaCustomOrderNote: "Для свят, сімейних вечерь, кейтерингу та страв за домовленістю.",
      note: "Меню, кількість порцій, час приготування і вартість узгоджуються індивідуально перед підтвердженням замовлення.",
    },
    menuPage: {
      title: "Меню Lana's Kitchen",
      subtitle: "Оберіть категорію, щоб переглянути страви та оформити замовлення.",
      categoriesTitle: "Оберіть категорію",
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
      subtitle: "Точна вартість і можливість доставки визначаються за ZIP-кодом.",
      zone1Label: "Зона A — $10",
      zone1Cities: "Hallandale Beach, Aventura, Sunny Isles Beach, Golden Beach, частина Hollywood та найближчі райони.",
      zone2Label: "Зона B — $15",
      zone2Cities: "Dania Beach, частина Hollywood, частина Pembroke Pines і Miramar, Bal Harbour, North Miami.",
      zone3Label: "Зона C — $20",
      zone3Cities: "Fort Lauderdale, Wilton Manors, Oakland Park та найближчі райони.",
      zone4Label: "Віддалені райони — після підтвердження адреси",
      zone4Cities: "Включаючи Miami Beach. Ми зв'яжемося з вами, щоб уточнити можливість і вартість доставки.",
      footer: "Точна вартість і можливість доставки визначаються за ZIP-кодом.",
    },
    testimonials: {
      eyebrow: "Відгуки",
      title: "Що кажуть клієнти",
      placeholder: "Перші відгуки клієнтів незабаром з'являться тут.",
    },
    about: {
      eyebrow: "Про нас",
      title: "Про Lana's Kitchen",
      text: "Ми готуємо домашні східноєвропейські страви в Маямі за попереднім замовленням. Кожна страва готується свіжою, невеликими партіями, з увагою до смаку, якості інгредієнтів і сімейних традицій.",
    },
    faq: {
      title: "Часті питання",
      oneQ: "За скільки часу робити замовлення?",
      oneA: "Краще за 24–48 годин, особливо для сімейних наборів і святкових замовлень.",
      twoQ: "Чи доставляєте ви?",
      twoA: "Так. Доставка працює за зонами: Зона A — $10, мінімальне замовлення $60, безкоштовно від $110; Зона B — $15, мінімальне замовлення $80, безкоштовно від $145; Зона C — $20, мінімальне замовлення $120. Віддалені райони, включаючи Miami Beach, обслуговуються лише після підтвердження можливості та вартості доставки.",
      fourQ: "Чи можна замовити на свято?",
      fourA: "Так, можна зібрати святковий стіл або сімейний набір під кількість гостей.",
      fiveQ: "Чи можна зібрати індивідуальне меню?",
      fiveA: "Так, напишіть побажання, кухні, алергії та кількість гостей.",
      sixQ: "Як відбувається оплата?",
      sixA: "Спочатку ми підтверджуємо склад замовлення, дату, час і вартість доставки. Спосіб оплати узгоджується індивідуально на цьому етапі. Замовлення вважається підтвердженим після оплати.",
      sevenQ: "Чи можна скасувати замовлення?",
      sevenA: "Скасування і зміни можливі до початку закупівлі і приготування. Для святкових і великих замовлень діють окремі умови передоплати.",
      eightQ: "Чи є алергени?",
      eightA: "Будь ласка, повідомте про алергії при оформленні. Ми враховуємо побажання, але не можемо гарантувати повну відсутність слідів алергенів.",
      nineQ: "Чи можна замовити в той самий день?",
      nineA: "Основний формат — передзамовлення за 24–48 годин. Замовлення в той самий день можливі лише за наявності вільного часу та інгредієнтів.",
    },
    final: {
      eyebrow: "Фінальний крок",
      title: "Готові замовити домашню вечерю?",
      text: "Оберіть страви з меню — ми готуємо на замовлення і підтверджуємо деталі перед оплатою.",
      buttonPrimary: "Обрати страви",
      buttonSecondary: "Запитання або індивідуальне замовлення",
    },
    contact: {
      title: "Зв'язатися з нами",
      text: "Маєте запитання, плануєте свято або хочете обговорити особливе замовлення? Напишіть нам — ми зв'яжемося з вами.",
      btn: "Написати нам",
      note: "Запитання, свята, кейтеринг та індивідуальні побажання.",
    },
    social: {
      title: "Ми в соціальних мережах",
      instagram: "Instagram Lana's Kitchen Miami",
      facebook: "Facebook Lana's Kitchen Miami",
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
      checkout: "Перейти до деталей замовлення",
      mobileCTA: "Ваше замовлення",
      addFirst: "Спочатку додайте страви",
      remove: "Прибрати",
      itemWord: "позицій",
      unitPrice: "за од.",
      unitLb: "за фунт",
      unitPcs: "2 шт.",
      addOnsOnly: "Додатки можна замовити лише разом зі стравами з основного меню.",
    },
    cartReview: {
      title: "Ваше замовлення",
      subtotal: "Страви",
      delivery: "Доставка",
      deliveryNote: "Вартість буде розрахована після введення адреси",
      deliveryConfirming: "Доставка буде підтверджена після перевірки адреси",
      proceed: "Перейти до оформлення замовлення",
      backToMenu: "Продовжити вибір",
    },
    popular: {
      title: "Популярні страви",
    },
    toast: {
      added: "Додано до замовлення",
    },
    addOnModal: {
      title: "Рекомендуємо до цієї страви",
      continueShopping: "Продовжити покупки",
      goToCart: "Перейти до кошика",
      added: "✓ Додано до кошика",
      addBtn: "+ Додати",
    },
    preorder: {
      modalTitle: "Деталі передзамовлення",
      cartSummaryTitle: "Ваше замовлення в Lana's Kitchen",
      name: "Ім'я",
      phone: "Телефон",
      phoneOtherCode: "Інший код країни",
      phoneBackToUs: "← США (+1)",
      phoneCountryCodeLabel: "Код країни",
      phoneNumberLabel: "Номер телефону",
      intlMessengerQ: "Цей номер доступний у WhatsApp або Telegram для підтвердження замовлення?",
      intlMessengerWhatsapp: "WhatsApp",
      intlMessengerTelegram: "Telegram",
      intlMessengerCall: "Телефонний дзвінок",
      intlMessengerOther: "Інший номер для зв'язку",
      altContact: "Контакт для підтвердження (необов'язково)",
      placesManual: "Не знайшли адресу? Введіть вручну",
      address: "Адреса доставки",
      apt: "Квартира / Unit (необов'язково)",
      city: "Місто",
      zip: "ZIP-код",
      addressPlaceholder: "100 NW 1st Ave, Miami, FL",
      cityPlaceholder: "Оберіть місто",
      cityOther: "Інший район — за погодженням",
      date: "Дата доставки",
      allergies: "Алергії / особливі побажання",
      backToMenu: "← Повернутися до меню",
      submit: "Надіслати заявку",
      submitting: "Надсилаємо заявку…",
      testModeBanner: "⚠ Тестовий режим: це замовлення не буде надіслано як реальне.",
      apiError: "Помилка при відправці заявки. Будь ласка, спробуйте ще раз.",
      required: "Заповніть усі обов'язкові поля.",
      completeRequired: "Заповніть обов’язкові поля, щоб продовжити.",
      phoneInvalid: "Вкажіть коректний номер телефону.",
      dateNotFuture: "Оберіть дату: завтра або пізніше.",
      zoneRequired: "Оберіть зону доставки.",
      close: "Закрити",
      zoneTitle: "Район доставки",
      zone1: "Зона A — $10 · Hallandale Beach, Aventura, Sunny Isles Beach, North Miami Beach",
      zone2: "Зона B — $15 · Hollywood, Dania Beach, North Miami",
      zone3: "Зона C — $20 · Fort Lauderdale, Miami Beach, Miami Shores",
      zoneRemote: "Інші віддалені райони — за узгодженням",
      foodSubtotal: "Сума страв",
      deliveryFee: "Доставка",
      freeDelivery: "Безкоштовно",
      freeDeliveryDiscount: "Знижка (безкоштовна доставка)",
      freeDeliveryUnlocked: "Безкоштовну доставку застосовано",
      orderTotal: "Разом до оплати",
      orderTotalNoDelivery: "Разом без урахування доставки",
      zoneCFeeLabel: "від $20",
      zoneCNote: "Доставка від $20. Точна вартість підтверджується після перевірки адреси.",
      zoneCFreeNote: "Безкоштовна доставка можлива після підтвердження адреси.",
      remoteDeliveryLabel: "за узгодженням",
      remoteNote: "Можливість і вартість доставки будуть підтверджені вручну.",
      remoteDisabledNote: "Для віддалених районів вартість і можливість доставки підтверджуються індивідуально.",
      contactTitle: "Ваші контакти",
      contactMethod: "Бажаний спосіб зв'язку",
      contactSms: "SMS",
      contactWhatsapp: "WhatsApp",
      contactTelegram: "Telegram",
      contactCallMe: "Дзвінок",
      telegramUsername: "Telegram username (необов'язково)",
      whatsappSamePhone: "Цей номер доступний у WhatsApp",
      deliveryTitle: "Деталі доставки",
      gateCode: "Код воріт (необов'язково)",
      deliveryInstructions: "Інструкції для доставки (необов'язково)",
      scheduleTitle: "Дата та час",
      timeWindow: "Часове вікно",
      timeWindowPlaceholder: "Оберіть час",
      timeA: "10:00 AM – 11:00 AM",
      timeB: "11:00 AM – 12:00 PM",
      timeC: "12:00 PM – 1:00 PM",
      timeD: "1:00 PM – 2:00 PM",
      timeE: "2:00 PM – 3:00 PM",
      timeF: "3:00 PM – 4:00 PM",
      timeG: "4:00 PM – 5:00 PM",
      timeH: "5:00 PM – 6:00 PM",
      timeI: "6:00 PM – 7:00 PM",
      timeJ: "7:00 PM – 8:00 PM",
      orderNotes: "Коментар до замовлення (необов'язково)",
      preorderAdvanceNote: "Ми готуємо свіжу їжу за попереднім замовленням. Будь ласка, оформлюйте замовлення щонайменше за 24–48 годин.",
      successTitle: "Вашу заявку отримано.",
      successText: "Ми перевіримо адресу, деталі доставки та можливість приготування, після чого зв'яжемося з вами обраним способом. Замовлення буде передано в приготування лише після підтвердження та оплаті.",
      successRef: "№ заявки:",
      fieldRequired: "Заповніть це поле",
      validationBanner: "Будь ласка, заповніть усі обов'язкові поля.",
      err: {
        name: "Введіть ваше ім'я",
        phone: "Введіть номер телефону",
        phoneInvalid: "Невірний формат телефону",
        address: "Введіть адресу доставки",
        city: "Оберіть місто",
        zip: "Введіть ZIP-код (5 цифр)",
        date: "Оберіть дату (мінімум завтра)",
        timeWindow: "Оберіть часовий інтервал",
      },
      zoneMismatch: "Цей ZIP-код належить до іншої зони доставки. Умови доставки розраховані за ZIP-кодом.",
      zipUnknown: "Цей ZIP-код потребує ручного підтвердження доставки. Вартість доставки буде підтверджена після перевірки адреси.",
      otherDelivery: "за погодженням",
      otherTotal: "буде підтверджений після перевірки адреси",
      otherNote: "Можливість і вартість доставки будуть підтверджені вручну.",
      prelimDelivery: "Попередня доставка",
      prelimTotal: "Попередній підсумок",
      confirmationNote: "Точна вартість доставки буде підтверджена після перевірки адреси.",
    },
    cateringForm: {
      modalTitle: "Заявка на кейтеринг",
      name: "Ім'я",
      phone: "Телефон / WhatsApp",
      date: "Дата заходу",
      occasion: "Привід",
      occasionPlaceholder: "Оберіть привід",
      occasionBirthday: "День народження",
      occasionFamily: "Сімейне свято",
      occasionFriends: "Зустріч з друзями",
      occasionOffice: "Офісне замовлення",
      occasionOther: "Інший привід",
      guests: "Кількість гостей",
      area: "Район / місто проведення",
      fulfillment: "Доставка або самовивіз",
      delivery: "Доставка",
      pickup: "Самовивіз",
      dishes: "Побажання щодо страв",
      allergies: "Алергії / особливості харчування",
      comment: "Коментар",
      submit: "Оформити заявку",
      disclaimer: "Меню, кількість порцій, час і вартість узгоджуються індивідуально перед підтвердженням.",
      required: "Заповніть усі обов'язкові поля.",
      phoneInvalid: "Вкажіть коректний номер телефону.",
      dateInPast: "Дата не може бути в минулому.",
      guestsInvalid: "Вкажіть кількість гостей (мінімум 1).",
      close: "Закрити",
      messengerTitle: "Оберіть месенджер",
      messengerSubtitle: "Напишіть нам — ми отримаємо заявку і зв'яжемося для підтвердження.",
      viaWhatsApp: "Написати у WhatsApp",
      viaTelegram: "Написати у Telegram",
      stage1Ref: "№ заявки:",
      stage2Title: "Завершіть відправку",
      stage2Text: "Переконайтесь, що ваше повідомлення доставлено. Якщо месенджер не відкрився — скористайтесь способами нижче.",
      stage2Button: "Я надіслав повідомлення",
      stage3Title: "Підтвердіть відправку",
      stage3Text: "Після підтвердження ми прийдемо вашу заявку на кейтеринг.",
      stage3Confirm: "Так, повідомлення надіслано — завершити",
      stage3Back: "Назад",
      fallbackTitle: "Якщо месенджер не відкрився",
      fallbackNote: "Скористайтесь одним зі способів нижче.",
      copyPhone: "Скопіювати номер WA",
      copyMessage: "Скопіювати текст заявки",
      openWA: "Відкрити WhatsApp",
      openTG: "Відкрити Telegram",
      copied: "Скопійовано",
      stage4Title: "Дякуємо!",
      stage4Text: "Ми отримаємо вашу заявку на кейтеринг і зв'яжемося для підтвердження деталей.",
      stage4WA: "Відкрити WhatsApp",
      stage4TG: "Відкрити Telegram",
    },
    order: {
      titlePreorder: "Нова заявка на передзамовлення",
      titleCatering: "Нова заявка на кейтеринг",
      ref: "Номер заявки",
      createdAt: "Створено",
      miamiTime: "Miami time",
      name: "Клієнт",
      phone: "Телефон / WhatsApp",
      address: "Адреса",
      date: "Бажана дата",
      zone: "Зона доставки",
      time: "Бажаний час",
      items: "Склад замовлення",
      subtotal: "Орієнтовна сума",
      comment: "Коментар",
      allergies: "Алергії / побажання",
      deliveryNote: "Вартість доставки та фінальна сума будуть підтверджені окремо.",
      help: "Доброго дня! Маю питання або хочу оформити індивідуальне замовлення.",
    },
    orders: {
      btnLabel: "Мої нещодавні замовлення",
      btnSub: "Переглянути замовлення, надіслані з цього пристрою.",
      title: "Мої нещодавні замовлення",
      subtitle: "Замовлення зберігаються лише на цьому пристрої протягом 30 днів.",
      status: "Заявку відправлено — очікуємо підтвердження",
      empty: "Нещодавніх замовлень поки немає.",
      emptySub: "Після оформлення замовлення воно з'явиться тут.",
      deleteBtn: "Видалити історію замовлень з цього пристрою",
      deleteConfirm: "Видалити всі збережені замовлення з цього пристрою? Цю дію не можна скасувати.",
      deleteCancel: "Скасувати",
      deleteOk: "Видалити",
      subtotal: "Сума страв",
      delivery: "Доставка",
      deliveryTbd: "уточнюється",
      total: "Разом",
      address: "Адреса доставки",
      date: "Дата доставки",
      time: "Час",
      comment: "Коментар",
      allergies: "Алергії / побажання",
      contactMethod: "Спосіб зв'язку",
      backLink: "Назад",
      orderNum: "Замовлення",
      contactSms: "SMS",
      contactWhatsapp: "WhatsApp",
      contactTelegram: "Telegram",
      contactCallMe: "Зателефонуйте мені",
    },
  },
};

// ── Google Analytics 4 ───────────────────────────────────────────────────────

const ga4DebugMode = new URLSearchParams(location.search).get("debug_mode") === "1";
const ga4 = (eventName, params) => {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, ga4DebugMode ? { ...params, debug_mode: true } : params);
};

// Build a safe GA4 item object — only non-PII dish/product fields.
const ga4Item = (dish, quantity = 1) => ({
  item_id: dish.id,
  item_name: dish.name.en || dish.name.ru,
  item_category: dish.category,
  price: dish.price,
  quantity,
  currency: "USD",
});

// Build items array from current cart entries.
const ga4CartItems = () =>
  cartEntries().map(({ dish, quantity }) => ga4Item(dish, quantity));

// ── Meta Pixel helpers ────────────────────────────────────────────────────────
// Safe wrappers — no-op if fbq not loaded. All Meta events route through here.
const metaTrack = (eventName, params = {}) => {
  if (typeof window.fbq !== "function") return;
  window.fbq("track", eventName, params);
};
const metaTrackCustom = (eventName, params = {}) => {
  if (typeof window.fbq !== "function") return;
  window.fbq("trackCustom", eventName, params);
};

// ── Order history (localStorage only) ────────────────────────────────────────
const ORDER_HISTORY_KEY = "lk_order_history";
const ORDER_HISTORY_MAX = 5;
const ORDER_HISTORY_TTL = 30 * 24 * 60 * 60 * 1000;

const computeHistoryDeliveryFee = (form, subtotal) => {
  const zoneKey = zipToZoneKey(form.zip);
  const cfg = zoneKey ? DELIVERY_ZONES[zoneKey] : null;
  if (!cfg || cfg.requiresManualConfirmation) return null;
  return (!cfg.freeAt || subtotal < cfg.freeAt) ? cfg.fee : 0;
};

const loadOrderHistory = () => {
  let list = [];
  try { list = JSON.parse(localStorage.getItem(ORDER_HISTORY_KEY) || "[]"); } catch {}
  const cutoff = Date.now() - ORDER_HISTORY_TTL;
  const fresh = list.filter(o => { try { return new Date(o.createdAt).getTime() > cutoff; } catch { return false; } });
  if (fresh.length !== list.length) try { localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(fresh)); } catch {}
  return fresh;
};

const saveOrderToHistory = (record) => {
  let list = loadOrderHistory();
  list.unshift(record);
  list = list.slice(0, ORDER_HISTORY_MAX);
  try { localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(list)); } catch {}
};

const renderOrderHistoryBtn = () => {
  const wrap = document.getElementById("order-history-btn-wrap");
  if (!wrap) return;
  if (TEST_MODE || loadOrderHistory().length === 0) { wrap.hidden = true; return; }
  wrap.hidden = false;
  wrap.innerHTML = `<a href="/orders.html?lang=${encodeURIComponent(state.lang)}" class="order-history-footer-btn">
    <span class="ohfb-label">${escapeHtml(t("orders.btnLabel"))}</span>
    <span class="ohfb-sub">${escapeHtml(t("orders.btnSub"))}</span>
  </a>`;
};

// ─────────────────────────────────────────────────────────────────────────────

let menuItems = [];
// Tracks the last category for which view_item_list was sent in the current page session.
// Prevents double-firing when the [data-category-route] click handler calls renderRoute()
// directly AND the resulting hashchange also triggers renderRoute().
let lastViewedCategoryId = null;

const categories = [
  {
    id: "soups",
    image: "assets/images/categories/category-pervye-blyuda-new.jpg",
    icon: "soup",
    title: tr("Первые блюда", "Soups", "Перші страви"),
    description: tr(
      "Домашние супы, которые готовятся свежими под предзаказ.",
      "Homemade soups prepared fresh for preorder.",
      "Домашні супи, які готуються свіжими під передзамовлення.",
    ),
  },
  {
    id: "main-dishes",
    image: "assets/images/categories/category-vtorye-blyuda-new.jpg",
    icon: "utensils",
    title: tr("Вторые блюда", "Main Dishes", "Другі страви"),
    description: tr(
      "Сытные украинские, восточноевропейские и кавказские блюда для обеда или ужина.",
      "Comforting Ukrainian, Eastern European and Caucasian mains for lunch or dinner.",
      "Ситні українські, східноєвропейські та кавказькі страви для обіду або вечері.",
    ),
  },
  {
    id: "salads",
    image: "assets/images/categories/category-salaty-new.jpg",
    icon: "leaf",
    title: tr("Салаты", "Salads", "Салати"),
    description: tr(
      "Классические домашние и свежие средиземноморские салаты.",
      "Classic homemade and fresh Mediterranean salads.",
      "Класичні домашні та свіжі середземноморські салати.",
    ),
  },
  {
    id: "add-ons",
    image: "assets/images/categories/category-add-ons.webp",
    icon: "bowl-food",
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9h20"/><path d="M4 9c0 7 3.5 12 8 12s8-5 8-12"/><path d="M8 21h8"/></svg>`,
    title: tr("Добавки к блюдам", "Add-ons", "Додатки до страв"),
    description: tr(
      "Соусы, добавки и гарниры к домашним блюдам.",
      "Sauces, condiments, and extras to complement your order.",
      "Соуси, добавки та гарніри до домашніх страв.",
    ),
  },
  {
    id: "frozen",
    image: "assets/images/categories/category-frozen.jpg",
    icon: "snowflake",
    title: tr("Домашняя заморозка", "Homemade Frozen", "Домашня заморозка"),
    description: tr(
      "Полуготовые замороженные блюда для приготовления дома.",
      "Frozen semi-prepared homemade dishes to cook at home.",
      "Заморожені напівготові домашні страви для приготування вдома.",
    ),
  },
  {
    id: "desserts",
    image: "assets/images/blini-crepes.jpg",
    icon: "cake-slice",
    title: tr("Десерты", "Desserts", "Десерти"),
    description: tr("Скоро в меню", "Coming soon", "Скоро в меню"),
    comingSoon: true,
    hidden: true,
    comingSoonBody: tr(
      "Мы сейчас работаем над ассортиментом десертов.",
      "We are currently working on the dessert selection.",
      "Ми зараз працюємо над асортиментом десертів.",
    ),
  },
  {
    id: "drinks",
    image: "assets/images/categories/category-drinks.jpg",
    icon: "glass-water",
    title: tr("Напитки", "Drinks", "Напої"),
    description: tr("Скоро в меню", "Coming soon", "Скоро в меню"),
    comingSoon: true,
    hidden: true,
    comingSoonBody: tr(
      "Мы сейчас работаем над ассортиментом напитков.",
      "We are currently working on the drink selection.",
      "Ми зараз працюємо над асортиментом напоїв.",
    ),
  },
];

const createDefaultPreorderForm = () => ({
  name: "",
  phone: "",
  phoneMode: "us",
  phoneCountryCode: "",
  intlMessenger: "",
  altContact: "",
  fulfillmentType: "delivery",
  zone: "",
  city: "",
  zip: "",
  contactMethod: "",
  telegramUsername: "",
  whatsappSamePhone: false,
  address: "",
  apt: "",
  gateCode: "",
  deliveryInstructions: "",
  date: "",
  timeWindow: "",
  allergies: "",
  orderNotes: "",
});

const createDefaultCateringForm = () => ({
  name: "",
  phone: "",
  date: "",
  occasion: "",
  guests: "",
  area: "",
  fulfillmentType: "delivery",
  dishes: "",
  allergies: "",
  comment: "",
});

// ── Google Places Autocomplete state ──────────────────────────────────────────
const placesState = {
  debounceTimer: null,
  sessionToken: null,
  suggestions: [],
  loading: false,
  open: false,
  manualMode: false,
};

const newPlacesSession = () => {
  placesState.sessionToken = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
};

const closePlacesDropdown = () => {
  placesState.open = false;
  placesState.suggestions = [];
  document.getElementById("address-suggestions")?.remove();
};

const renderPlaceSuggestions = (inputEl) => {
  document.getElementById("address-suggestions")?.remove();
  if (!placesState.open || !placesState.suggestions.length) return;

  const wrap = inputEl.closest(".form-field");
  if (!wrap) return;

  const list = document.createElement("ul");
  list.id = "address-suggestions";
  list.className = "places-dropdown";
  list.setAttribute("role", "listbox");

  placesState.suggestions.forEach((s, i) => {
    const li = document.createElement("li");
    li.className = "places-option";
    li.setAttribute("role", "option");
    li.setAttribute("data-place-idx", i);
    li.innerHTML = `<span class="places-main">${escapeHtml(s.main)}</span><span class="places-secondary">${escapeHtml(s.secondary)}</span>`;
    list.appendChild(li);
  });

  // "Enter manually" link at the bottom
  const manual = document.createElement("li");
  manual.className = "places-manual";
  manual.setAttribute("data-places-manual", "");
  manual.textContent = t("preorder.placesManual");
  list.appendChild(manual);

  wrap.style.position = "relative";
  wrap.appendChild(list);
};

const fetchPlaceSuggestions = async (inputEl, value) => {
  if (placesState.manualMode || value.length < 3) {
    closePlacesDropdown();
    return;
  }
  if (!placesState.sessionToken) newPlacesSession();
  try {
    const url = `${PLACES_API_URL}?input=${encodeURIComponent(value)}&sessiontoken=${encodeURIComponent(placesState.sessionToken)}`;
    const resp = await fetch(url);
    if (!resp.ok) { closePlacesDropdown(); return; }
    const data = await resp.json();
    if (!data.ok || !data.suggestions?.length) { closePlacesDropdown(); return; }
    placesState.suggestions = data.suggestions;
    placesState.open = true;
    renderPlaceSuggestions(inputEl);
  } catch {
    closePlacesDropdown();
  }
};

const selectPlaceOption = async (idx, inputEl) => {
  const s = placesState.suggestions[idx];
  if (!s) return;
  closePlacesDropdown();
  inputEl.value = s.main;
  state.preorderForm.address = s.main;

  try {
    const url = `${PLACES_API_URL}/details?placeId=${encodeURIComponent(s.placeId)}&sessiontoken=${encodeURIComponent(placesState.sessionToken || "")}`;
    newPlacesSession(); // start new session after selection (billing boundary)
    const resp = await fetch(url);
    if (!resp.ok) return;
    const detail = await resp.json();
    if (!detail.ok) return;

    const form = state.preorderForm;
    // Fill address from structured components
    if (detail.streetNumber && detail.route) {
      form.address = `${detail.streetNumber} ${detail.route}`;
      inputEl.value = form.address;
    }
    // Atomic update — Google is single source of truth after selection.
    // Always replace city/zip/zone; never let a previous address's values persist.
    const matchedCity = detail.city
      ? DELIVERY_CITIES.find((c) => c.toLowerCase() === detail.city.toLowerCase())
      : null;
    form.city = detail.city ? (matchedCity || "Other") : "";
    form.zip = (detail.zip && /^\d{5}$/.test(detail.zip)) ? detail.zip : "";
    form.zone = zipToZoneKey(form.zip);
    // Re-render to show city/zip and zone pricing
    renderPreorderModal();
  } catch { /* keep manual values on network error */ }
};

const CART_KEY = "lanasKitchenCart";
const CART_KEY_OLD = "mamasTableCart";
const CART_MIGRATED_TS_KEY = "lanasKitchenCartMigratedAt";
const CART_MIGRATION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

const loadCart = () => {
  try {
    const newSaved = localStorage.getItem(CART_KEY);
    if (newSaved) {
      // Clean up old key only after 30 days from confirmed migration
      const migratedAt = localStorage.getItem(CART_MIGRATED_TS_KEY);
      if (migratedAt && Date.now() - Number(migratedAt) > CART_MIGRATION_TTL_MS) {
        localStorage.removeItem(CART_KEY_OLD);
        localStorage.removeItem(CART_MIGRATED_TS_KEY);
      }
      return new Map(JSON.parse(newSaved));
    }
    const oldSaved = localStorage.getItem(CART_KEY_OLD);
    if (oldSaved) {
      const cart = new Map(JSON.parse(oldSaved));
      const serialized = JSON.stringify(Array.from(cart.entries()));
      localStorage.setItem(CART_KEY, serialized);
      // Verify write succeeded before recording migration — keep old key as backup
      const verified = localStorage.getItem(CART_KEY);
      if (verified === serialized) {
        localStorage.setItem(CART_MIGRATED_TS_KEY, String(Date.now()));
      }
      // Old key intentionally NOT removed here — deleted after 30-day TTL on future loads
      return cart;
    }
    return new Map();
  } catch {
    return new Map();
  }
};

const saveCart = (cart) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(Array.from(cart.entries())));
  } catch {}
};

const state = {
  lang: localStorage.getItem("mamasTableLang") || "ru",
  cart: loadCart(),
  cartExpanded: false,
  preorderForm: createDefaultPreorderForm(),
  preorderStage: 0,
  preorderDraft: null,
  preorderError: false,
  preorderErrorKey: "preorder.required",
  preorderErrorMsg: null,
  preorderSubmitAttempted: false,
  preorderSubmitting: false,
  preorderZoneMismatch: null,
  cateringForm: createDefaultCateringForm(),
  cateringStage: 0,
  cateringDraft: null,
  cateringError: false,
  cateringErrorKey: "cateringForm.required",
  cateringSelectedMessenger: null,
};

const badgeLabels = {
  bestseller: tr("🔥 Бестселлер", "🔥 Bestseller", "🔥 Бестселер"),
  vegetarian: tr("🌿 Вегетарианское", "🌿 Vegetarian", "🌿 Вегетаріанське"),
  new: tr("✨ Новинка", "✨ New", "✨ Новинка"),
};

const money = (value) => `$${value.toFixed(2).replace(/\.00$/, "")}`;
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
  "add-ons": "add-ons",
  salads: "salads",
  frozen: "frozen",
  drinks: "drinks",
  desserts: "desserts",
};

const normalizeRoute = (route) => categoryRouteAliases[route] || route;
const isMobileViewport = () => window.matchMedia("(max-width: 760px)").matches;

const categoryScrollOffset = () => {
  const header = document.querySelector("[data-header]");
  const headerHeight =
    header?.getBoundingClientRect().height ||
    Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) ||
    0;
  return headerHeight + 18;
};

const scrollToCategoryDishes = (behavior = "smooth") => {
  const dishPanel = document.querySelector("[data-category-dishes]");
  if (!dishPanel) return;
  const top = Math.max(0, dishPanel.getBoundingClientRect().top + window.scrollY - categoryScrollOffset());
  window.scrollTo({ top, behavior });
};

const revealCategoryDishes = () => {
  // Make the panel itself visible first (it has class "reveal" → opacity:0 by default).
  // Without this, browsers skip loading lazy images inside an invisible element.
  document.querySelectorAll("[data-category-dishes]").forEach((el) => el.classList.add("is-visible"));
  document.querySelectorAll("[data-category-dishes] .reveal").forEach((el) => el.classList.add("is-visible"));
};

const scheduleCategoryDishesScroll = () => {
  revealCategoryDishes();
  const dishPanel = document.querySelector("[data-category-dishes]");
  if (!dishPanel) return;
  // .route-hero-image > img has CSS min-height:340px, so layout is stable
  // even before the image finishes loading — no need to wait for the load event.
  // The previous "wait for hero load + correction scroll" caused a jarring
  // second jump on real devices when the hero image loaded over a slow connection.
  requestAnimationFrame(() =>
    dishPanel.scrollIntoView({ behavior: "instant", block: "start" })
  );
};

const cartEntries = () =>
  Array.from(state.cart.entries())
    .map(([id, quantity]) => ({ dish: dishById(id), quantity }))
    .filter((entry) => entry.dish && entry.quantity > 0);

const cartCount = () => cartEntries().reduce((sum, entry) => sum + entry.quantity, 0);
const cartTotal = () => cartEntries().reduce((sum, entry) => sum + entry.dish.price * entry.quantity, 0);
const cartQuantity = (id) => state.cart.get(id) || 0;

const categoryUnits = {};
const unitLabels = {};

const DUMPLINGS_AND_CREPES = new Set([
  "varenyky", "pork-pelmeni", "chicken-pelmeni",
  "meat-filled-blini", "cottage-cheese-blini", "plain-blini",
]);

const buildDishSizeStr = (dish) => {
  if (state.lang === "ru" && dish.sizeRu) return dish.sizeRu;
  if (state.lang === "en" && dish.sizeEn) return dish.sizeEn;
  if (state.lang === "uk" && dish.sizeUa) return dish.sizeUa;
  if (dish.category === "soups") return t("size.soups");
  if (dish.category === "salads") {
    if (dish.id === "mimosa-salad") return t("size.mimosaSalad");
    if (dish.id === "herring-under-fur-coat") return t("size.herringUnderFurCoat");
    return t("size.salads");
  }
  if (dish.category === "main-dishes") {
    if (dish.id === "liver-cake") return t("size.liverCake");
    if (dish.id === "mashed-potatoes") return t("size.mashedPotatoes");
    if (dish.id === "chicken-tabaka") return t("size.chickenTabaka");
    if (DUMPLINGS_AND_CREPES.has(dish.id)) return t("size.dumplingsAndCrepes");
    return t("size.mainDishes");
  }
  return "";
};

const buildOrderUnitStr = (dish) => {
  if (dish.category === "soups") return "1 qt";
  if (dish.id === "liver-cake") return t("size.liverCake");
  if (dish.id === "mimosa-salad") return t("size.mimosaSalad");
  if (dish.id === "herring-under-fur-coat") return t("size.herringUnderFurCoat");
  if (dish.unit === "pcs") return dish.pcsLabel ? text(dish.pcsLabel) : t("orderUnit.pcs");
  if (dish.unit === "lb") return "1 lb";
  return t("orderUnit.piece");
};

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);

const createDishBadge = (badge) => {
  const label = badgeLabels[badge];
  if (!label) return "";
  return `<span class="dish-badge dish-badge-${escapeHtml(badge)}">${escapeHtml(text(label))}</span>`;
};

const createDishCard = (dish, options = {}) => {
  const rawUnit = dish.unit ? unitLabels[dish.unit] : categoryUnits[dish.category];
  const unitHtml = rawUnit ? `<span class="dish-unit">${escapeHtml(text(rawUnit))}</span>` : "";
  const sizeStr = buildDishSizeStr(dish);
  const sizeHtml = sizeStr ? `<small class="dish-size">${escapeHtml(sizeStr)}</small>` : "";
  const quantity = cartQuantity(dish.id);
  return `
  <article class="dish-card${options.reveal === false ? "" : " reveal"}">
    <div class="dish-media">
      ${createDishBadge(dish.badge)}
      <img src="${escapeHtml(dish.image)}" alt="${escapeHtml(text(dish.name))}" loading="${options.loading ?? "lazy"}" />
    </div>
    <div class="dish-card-body">
      <h3>${escapeHtml(text(dish.name))}</h3>
      <p>${escapeHtml(text(dish.description))}</p>
      <strong>${money(dish.price)}${unitHtml}</strong>
      ${sizeHtml}
      <div class="dish-actions">
        <button class="add-btn${quantity > 0 ? " is-hidden" : ""}" type="button" data-add="${escapeHtml(dish.id)}"${quantity > 0 ? " hidden" : ""}>
          <span>${escapeHtml(t("cart.add"))}</span>
          <i data-lucide="plus-circle"></i>
        </button>
        <div class="qty-control${quantity > 0 ? "" : " is-hidden"}" aria-label="${escapeHtml(text(dish.name))} quantity"${quantity > 0 ? "" : " hidden"}>
          <button type="button" data-minus="${escapeHtml(dish.id)}">−</button>
          <span data-dish-qty="${escapeHtml(dish.id)}">${quantity}</span>
          <button type="button" data-plus="${escapeHtml(dish.id)}">+</button>
        </div>
      </div>
    </div>
  </article>
`;
};

const dishCountLabel = (n) => {
  if (state.lang === "en") return `${n} ${n === 1 ? "dish" : "dishes"}`;
  if (state.lang === "uk") {
    const rem = n % 100;
    const last = n % 10;
    if (rem >= 11 && rem <= 19) return `${n} страв`;
    if (last === 1) return `${n} страва`;
    if (last >= 2 && last <= 4) return `${n} страви`;
    return `${n} страв`;
  }
  const rem = n % 100;
  const last = n % 10;
  if (rem >= 11 && rem <= 19) return `${n} блюд`;
  if (last === 1) return `${n} блюдо`;
  if (last >= 2 && last <= 4) return `${n} блюда`;
  return `${n} блюд`;
};

const createCategoryCard = (category) => {
  const dishes = menuItemsByCategory(category.id);
  const count = dishes.length;
  const minPrice = count ? Math.min(...dishes.map((d) => d.price)) : 0;
  const countStr = category.id === "add-ons"
    ? `${count} ${t("cart.itemWord")}`
    : dishCountLabel(count);
  const meta = count
    ? `${countStr} · ${t("categories.from")} ${money(minPrice)}`
    : escapeHtml(t("categories.open"));
  return `
  <a class="category-card reveal" href="#/${escapeHtml(category.id)}" data-category-route="${escapeHtml(category.id)}">
    <img src="${escapeHtml(category.image)}" alt="${escapeHtml(text(category.title))}" loading="lazy" />
    <span>
      ${category.iconSvg || `<i data-lucide="${escapeHtml(category.icon)}"></i>`}
      <strong>${escapeHtml(text(category.title))}</strong>
      <small>${escapeHtml(meta)}</small>
    </span>
  </a>
`;
};

const renderStaticData = () => {
  document.querySelector("[data-category-grid]").innerHTML = categories.filter(c => !c.hidden).map(createCategoryCard).join("");
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
    <div class="checkout-panel" data-checkout-panel hidden></div>
    <div class="cart-thankyou" data-cart-thankyou hidden></div>
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
          <div class="category-grid route-category-grid">${categories.filter(c => !c.hidden).map(createCategoryCard).join("")}</div>
        </section>
      </div>
      ${createRouteOrderCard()}
    </div>
  </div>
`;

const createComingSoonPage = (category) => `
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
        <div class="coming-soon-placeholder">
          <p class="coming-soon-headline">${escapeHtml(text(category.description))}</p>
          <p class="coming-soon-body">${escapeHtml(text(category.comingSoonBody))}</p>
        </div>
      </section>
      ${createRouteOrderCard()}
    </div>
  </div>
`;

const createCategoryPage = (category) => {
  if (category.comingSoon) return createComingSoonPage(category);
  return `
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
        <div class="dish-grid menu-dish-grid">${menuItemsByCategory(category.id)
          .map((dish, i) => createDishCard(dish, { reveal: false, loading: i < 8 ? "eager" : "lazy" }))
          .join("")}</div>
      </section>
      ${createRouteOrderCard()}
    </div>
  </div>
`;
};


const renderRoute = () => {
  const route = routeFromHash();
  const homeView = document.querySelector("[data-home-view]");
  const routeView = document.querySelector("[data-route-view]");
  const category = route ? categoryById(route) : null;
  const isRoute = route === "menu" || Boolean(category);

  if (!isRoute) {
    lastViewedCategoryId = null;
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
  document.title =
    route === "menu" ? `${t("menuPage.title")} | Lana's Kitchen` : `${text(category.title)} | Lana's Kitchen`;
  renderCart();
  renderDishQuantities();
  refreshIcons();
  observeReveals();
  if (category) {
    if (category.id !== lastViewedCategoryId) {
      lastViewedCategoryId = category.id;
      ga4("view_item_list", {
        item_list_id: category.id,
        item_list_name: category.title.en || category.title.ru,
        items: menuItemsByCategory(category.id).map((dish) => ga4Item(dish)),
      });
      metaTrack("ViewContent", {
        content_type: "product_group",
        content_category: category.id,
        content_name: category.title.en || category.title.ru,
        currency: "USD",
      });
    }
    // Scroll to dishes on ALL viewports — not just mobile.
    // On iPad/desktop, isMobileViewport() was false and scrolled to top instead,
    // leaving dishes below fold and making it look like nothing happened.
    document.querySelectorAll("[data-route-view] .reveal").forEach((el) => el.classList.add("is-visible"));
    scheduleCategoryDishesScroll();
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

const setQuantity = (id, quantity) => {
  const safeQuantity = Math.max(0, Math.min(quantity, 99));
  if (safeQuantity === 0) state.cart.delete(id);
  else state.cart.set(id, safeQuantity);
  if (!state.cart.size) state.cartExpanded = false;
  saveCart(state.cart);
  renderCart();
  renderDishQuantities();
};

const renderDishQuantities = () => {
  document.querySelectorAll("[data-dish-qty]").forEach((element) => {
    const quantity = cartQuantity(element.dataset.dishQty);
    element.textContent = quantity;
    const actions = element.closest(".dish-actions");
    const addButton = actions?.querySelector("[data-add]");
    const quantityControl = actions?.querySelector(".qty-control");
    addButton?.toggleAttribute("hidden", quantity > 0);
    addButton?.classList.toggle("is-hidden", quantity > 0);
    quantityControl?.toggleAttribute("hidden", quantity === 0);
    quantityControl?.classList.toggle("is-hidden", quantity === 0);
  });
};

// ── Telegram URL ──────────────────────────────────────────────────────────────

const tgUrl = () => `https://t.me/${TELEGRAM_USERNAME}`;

// ── Phone validation ──────────────────────────────────────────────────────────

const normalizePhoneDigits = (raw) => raw.replace(/[\s()\-.]/g, "").replace(/^\+/, "");
const allSameDigit = (s) => /^(\d)\1+$/.test(s);

// Format 10 raw digits as US display: (XXX) XXX-XXXX
const formatUSPhoneDisplay = (raw) => {
  const digits = (raw || "").replace(/\D/g, "").slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

// Returns E.164 string for payload. Pass form to handle intl mode.
const phoneToE164 = (form) => {
  if (form.phoneMode === "intl") {
    const cc = (form.phoneCountryCode || "").trim();
    const digits = (form.phone || "").replace(/\D/g, "");
    return cc + digits;
  }
  const digits = normalizePhoneDigits(form.phone || "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return `+1${digits}`;
};

const validatePhone = (raw, form) => {
  if (form && form.phoneMode === "intl") {
    const cc = (form.phoneCountryCode || "").trim();
    const trimmed = (raw || "").trim();
    if (!cc && !trimmed) return "required";
    if (!cc || !trimmed) return "invalid";
    if (!cc.startsWith("+")) return "invalid";
    const ccDigits = cc.slice(1).replace(/\D/g, "");
    if (!ccDigits || ccDigits.length > 4) return "invalid";
    const phoneDigits = trimmed.replace(/\D/g, "");
    if (phoneDigits.length < 4 || phoneDigits.length > 14) return "invalid";
    return null;
  }
  // US mode
  const trimmed = (raw || "").trim();
  if (!trimmed) return "required";
  if (/[a-zA-Z]/.test(trimmed)) return "invalid";
  const hasPlus = trimmed.startsWith("+");
  const digits = normalizePhoneDigits(trimmed);
  if (!digits || !/^\d+$/.test(digits)) return "invalid";
  if (!hasPlus && digits.length === 10) return allSameDigit(digits) ? "invalid" : null;
  if (!hasPlus && digits.length === 11 && digits.startsWith("1")) return allSameDigit(digits) ? "invalid" : null;
  if (hasPlus && digits.length >= 7 && digits.length <= 15) return allSameDigit(digits) ? "invalid" : null;
  return "invalid";
};

const formatPhoneForMessage = (raw, form) => {
  if (form && form.phoneMode === "intl") {
    const cc = (form.phoneCountryCode || "").trim();
    const digits = (raw || "").replace(/\D/g, "");
    return `${cc}${digits}`;
  }
  const trimmed = (raw || "").trim();
  const hasPlus = trimmed.startsWith("+");
  const digits = normalizePhoneDigits(trimmed);
  if (!hasPlus && digits.length === 10)
    return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  if (!hasPlus && digits.length === 11 && digits.startsWith("1"))
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  return hasPlus ? `+${digits}` : trimmed;
};

// ── Date helpers ──────────────────────────────────────────────────────────────

const parseDateLocal = (dateStr) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
};

const formatDateLocalized = (dateStr, lang) => {
  if (!dateStr) return dateStr;
  try {
    const d = parseDateLocal(dateStr);
    const localeMap = { ru: "ru-RU", en: "en-US", uk: "uk-UA" };
    return new Intl.DateTimeFormat(localeMap[lang] || "ru-RU", {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    }).format(d);
  } catch {
    return dateStr;
  }
};

const formatTimeLocalized = (timeStr, lang) => {
  if (!timeStr || lang !== "en") return timeStr;
  try {
    const [h, m] = timeStr.split(":").map(Number);
    const suffix = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
  } catch {
    return timeStr;
  }
};

// ── Miami date / timestamp ────────────────────────────────────────────────────

const getMiamiDateCode = () => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "2-digit", month: "2-digit", day: "2-digit",
  }).formatToParts(new Date());
  const p = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${p.year}${p.month}${p.day}`;
};

const getMiamiTimestamp = () => {
  const localeMap = { ru: "ru-RU", en: "en-US", uk: "uk-UA" };
  return new Intl.DateTimeFormat(localeMap[state.lang] || "ru-RU", {
    timeZone: "America/New_York",
    year: "numeric", month: "long", day: "numeric",
    hour: "numeric", minute: "2-digit",
  }).format(new Date());
};

// ── Order ID ──────────────────────────────────────────────────────────────────

const generateToken = () => {
  try {
    return crypto.randomUUID().slice(0, 8).toUpperCase();
  } catch {
    return (Date.now().toString(36) + Math.random().toString(36).slice(2, 6)).toUpperCase().slice(0, 8);
  }
};

const generateOrderId = (type) =>
  `${type === "catering" ? "MT-C" : "MT-P"}-${getMiamiDateCode()}-${generateToken()}`;

const generatePreorderId = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  const token = String(arr[0]).slice(-3).padStart(3, "0");
  return `LK-${y}${m}${d}-${token}`;
};


// ── Delivery helpers ──────────────────────────────────────────────────────────

const buildMinOrderMsg = (minOrder, remaining) => {
  const m = money(minOrder), r = money(remaining);
  if (state.lang === "en")
    return `The minimum food subtotal for the selected area is ${m}. Delivery is not included in the minimum. Add ${r} more in dishes.`;
  if (state.lang === "uk")
    return `Мінімальна сума страв для вибраного району — ${m}. Доставка не входить до мінімальної суми. Додайте страв ще на ${r}.`;
  return `Минимальная сумма блюд для выбранного района — ${m}. Доставка не входит в минимальную сумму. Добавьте блюда ещё на ${r}.`;
};

const buildFreeDeliveryHint = (remaining) => {
  if (state.lang === "en") return `Spend ${money(remaining)} more on dishes to get free delivery.`;
  if (state.lang === "uk") return `До безкоштовної доставки залишилося ${money(remaining)} за сумою страв.`;
  return `До бесплатной доставки осталось ${money(remaining)} по сумме блюд.`;
};

const hasMissingPreorderRequiredFields = (form) =>
  !form.name || !form.phone || !form.contactMethod || !form.zone ||
  !form.address || !form.city || !form.zip || !form.date || !form.timeWindow;

// ── Clipboard ─────────────────────────────────────────────────────────────────

const copyOrderText = async (message) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(message);
    return;
  }
  const ta = document.createElement("textarea");
  ta.value = message;
  ta.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); } finally { ta.remove(); }
};

// ── sessionStorage helpers ────────────────────────────────────────────────────

const DRAFT_KEYS = {
  preorder: "mamas-table:preorder-draft",
  catering: "mamas-table:catering-draft",
};

const saveDraft = (type, data) => {
  try {
    sessionStorage.setItem(DRAFT_KEYS[type], JSON.stringify(data));
  } catch {}
};

const loadDraft = (type) => {
  try {
    const s = sessionStorage.getItem(DRAFT_KEYS[type]);
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
};

const clearDraft = (type) => {
  try {
    sessionStorage.removeItem(DRAFT_KEYS[type]);
  } catch {}
};

// ── WhatsApp URL ──────────────────────────────────────────────────────────────

const waUrl = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// ── Message builders ──────────────────────────────────────────────────────────

const buildPreorderMessage = (orderId) => {
  const form = state.preorderForm;
  const entries = cartEntries();
  const lines = [
    t("order.titlePreorder"),
    `${t("order.ref")}: ${orderId}`,
    `${t("order.createdAt")}: ${getMiamiTimestamp()} — ${t("order.miamiTime")}`,
    "",
    `${t("order.name")}: ${form.name}`,
    `${t("order.phone")}: ${formatPhoneForMessage(form.phone, form)}`,
  ];
  if (form.zone) lines.push(`${t("order.zone") || "Zone"}: ${t(`preorder.zone${form.zone}`)}`);
  if (form.address) lines.push(`${t("order.address")}: ${form.address}${form.apt ? `, ${form.apt}` : ""}`);
  lines.push(`${t("order.date")}: ${formatDateLocalized(form.date, state.lang)}`);
  lines.push(`${t("order.time")}: ${formatTimeLocalized(form.time, state.lang)}`);
  lines.push("");
  lines.push(`${t("order.items")}:`);
  entries.forEach(({ dish, quantity }) => {
    const unitLabel = buildOrderUnitStr(dish);
    const qtyPart = quantity !== 1 ? ` × ${quantity}` : "";
    lines.push(`• ${text(dish.name)} ${unitLabel}${qtyPart} — ${money(dish.price * quantity)}`);
  });
  lines.push("");
  lines.push(`${t("order.subtotal")}: ${money(cartTotal())}`);
  lines.push(t("order.deliveryNote"));
  if (form.allergies) lines.push(`\n${t("order.allergies")}: ${form.allergies}`);
  if (form.comment) lines.push(`${t("order.comment")}: ${form.comment}`);
  return lines.join("\n");
};

const buildCateringMessage = (orderId) => {
  const form = state.cateringForm;
  const lines = [
    t("order.titleCatering"),
    `${t("order.ref")}: ${orderId}`,
    `${t("order.createdAt")}: ${getMiamiTimestamp()} — ${t("order.miamiTime")}`,
    "",
    `${t("cateringForm.name")}: ${form.name}`,
    `${t("order.phone")}: ${formatPhoneForMessage(form.phone, form)}`,
    `${t("cateringForm.date")}: ${formatDateLocalized(form.date, state.lang)}`,
    `${t("cateringForm.occasion")}: ${form.occasion}`,
    `${t("cateringForm.guests")}: ${form.guests}`,
    `${t("cateringForm.area")}: ${form.area}`,
    `${t("cateringForm.fulfillment")}: ${form.fulfillmentType === "delivery" ? t("cateringForm.delivery") : t("cateringForm.pickup")}`,
  ];
  if (form.dishes) lines.push(`${t("cateringForm.dishes")}: ${form.dishes}`);
  if (form.allergies) lines.push(`${t("cateringForm.allergies")}: ${form.allergies}`);
  if (form.comment) lines.push(`${t("cateringForm.comment")}: ${form.comment}`);
  return lines.join("\n");
};

// ── Modal shared blocks ───────────────────────────────────────────────────────

const createFallbackBlock = (ns) => `
  <div class="modal-fallback-block">
    <h4>${escapeHtml(t(`${ns}.fallbackTitle`))}</h4>
    <p class="modal-fallback-note">${escapeHtml(t(`${ns}.fallbackNote`))}</p>
    <div class="modal-fallback-actions">
      <button class="btn btn-secondary btn-sm" type="button" data-copy-message="${escapeHtml(ns)}">
        ${escapeHtml(t(`${ns}.copyMessage`))}
      </button>
      <button class="btn btn-secondary btn-sm" type="button" data-copy-phone="${escapeHtml(ns)}">
        ${escapeHtml(t(`${ns}.copyPhone`))}
      </button>
      <button class="btn btn-secondary btn-sm" type="button" data-open-generic-tg>
        <i data-lucide="send"></i>
        ${escapeHtml(t(`${ns}.openTG`))}
      </button>
      <button class="btn btn-secondary btn-sm" type="button" data-open-wa-message="${escapeHtml(ns)}">
        <i data-lucide="message-circle"></i>
        ${escapeHtml(t(`${ns}.openWA`))}
      </button>
    </div>
  </div>
`;

// ── Preorder modal stages ─────────────────────────────────────────────────────

const createPreorderStage0 = () => {
  const form = state.preorderForm;
  const entries = cartEntries();
  const foodSubtotal = cartTotal();
  const zone = zipToZoneKey(form.zip); // always fresh — never reads stale state.preorderForm.zone
  const zoneConfig = zone ? DELIVERY_ZONES[zone] : null;
  const isRemote = zone === "remote";
  const cityZipMismatch = detectCityZipMismatch(zone, form.city);
  const isZipUnknown = isRemote && !!form.zip;
  state.preorderZoneMismatch = cityZipMismatch;

  const ddTomorrow = new Date();
  ddTomorrow.setDate(ddTomorrow.getDate() + 1);
  const tomorrowStr = ddTomorrow.toISOString().slice(0, 10);

  const fieldErrKey = (fieldName) => {
    if (!state.preorderSubmitAttempted) return null;
    const f = form;
    switch (fieldName) {
      case "name": return !f.name ? "preorder.err.name" : null;
      case "phone":
        if (!f.phone) return "preorder.err.phone";
        return validatePhone(f.phone, f) !== null ? "preorder.err.phoneInvalid" : null;
      case "contactMethod": return !f.contactMethod ? "preorder.fieldRequired" : null;
      case "address": return !f.address ? "preorder.err.address" : null;
      case "city": return !f.city ? "preorder.err.city" : null;
      case "zip": return !f.zip ? "preorder.err.zip" : null;
      case "date": return (!f.date || f.date < tomorrowStr) ? "preorder.err.date" : null;
      case "timeWindow": return !f.timeWindow ? "preorder.err.timeWindow" : null;
      default: return null;
    }
  };
  const fieldErr = (fn) => !!fieldErrKey(fn);
  const errSpan = (fn) => {
    const key = fieldErrKey(fn);
    return key ? `<span class="field-error">${escapeHtml(t(key))}</span>` : "";
  };
  const invCls = (fn) => fieldErr(fn) ? " is-invalid" : "";

  const cartRows = entries.map(({ dish, quantity }) => {
    const unitLabel = buildOrderUnitStr(dish);
    const qtyPart = quantity !== 1 ? ` × ${quantity}` : "";
    const itemStr = `${text(dish.name)} ${unitLabel}${qtyPart}`;
    return `<div class="modal-cart-item"><span>${escapeHtml(itemStr)}</span><em>${money(dish.price * quantity)}</em></div>`;
  }).join("");

  const isZoneC = zone === "3";
  const isFree = !isRemote && !isZoneC && !!zoneConfig?.freeAt && foodSubtotal >= zoneConfig.freeAt;
  const belowMin = !!zoneConfig?.minOrder && foodSubtotal < zoneConfig.minOrder;
  const freeRemaining = !isRemote && !isZoneC && !!zoneConfig?.freeAt ? Math.max(0, zoneConfig.freeAt - foodSubtotal) : 0;

  let pricingHtml = "";
  if (zoneConfig) {
    if (isRemote) {
      const belowMsg = belowMin
        ? `<p class="zone-min-warning">${escapeHtml(buildMinOrderMsg(zoneConfig.minOrder, zoneConfig.minOrder - foodSubtotal))}</p>`
        : "";
      pricingHtml = `
        <div class="checkout-pricing">
          <div class="pricing-row"><span>${escapeHtml(t("preorder.foodSubtotal"))}</span><em>${money(foodSubtotal)}</em></div>
          <div class="pricing-row"><span>${escapeHtml(t("preorder.deliveryFee"))}</span><em class="muted-text">${escapeHtml(t("preorder.otherDelivery"))}</em></div>
          <div class="pricing-row pricing-row-total"><span>${escapeHtml(t("preorder.orderTotal"))}</span><em class="muted-text">${escapeHtml(t("preorder.otherTotal"))}</em></div>
          ${belowMsg}
          <p class="zone-c-note">${escapeHtml(t("preorder.otherNote"))}</p>
        </div>`;
    } else if (isZoneC) {
      const prelimTotal = foodSubtotal + zoneConfig.fee;
      const zoneNote = foodSubtotal >= (zoneConfig.freeAt ?? Infinity)
        ? escapeHtml(t("preorder.zoneCFreeNote"))
        : escapeHtml(t("preorder.confirmationNote"));
      const minMsg = belowMin
        ? `<p class="zone-min-warning">${escapeHtml(buildMinOrderMsg(zoneConfig.minOrder, zoneConfig.minOrder - foodSubtotal))}</p>`
        : "";
      pricingHtml = `
        <div class="checkout-pricing">
          <div class="pricing-row"><span>${escapeHtml(t("preorder.foodSubtotal"))}</span><em>${money(foodSubtotal)}</em></div>
          <div class="pricing-row"><span>${escapeHtml(t("preorder.prelimDelivery"))}</span><em class="muted-text">${money(zoneConfig.fee)}</em></div>
          <div class="pricing-row pricing-row-total"><span>${escapeHtml(t("preorder.prelimTotal"))}</span><strong class="muted-text">${money(prelimTotal)}</strong></div>
          ${minMsg}
          <p class="zone-c-note">${zoneNote}</p>
        </div>`;
    } else {
      const deliveryFee = isFree ? 0 : zoneConfig.fee;
      const orderTotal = foodSubtotal + deliveryFee;
      const minMsg = belowMin
        ? `<p class="zone-min-warning">${escapeHtml(buildMinOrderMsg(zoneConfig.minOrder, zoneConfig.minOrder - foodSubtotal))}</p>`
        : "";
      const freeHint = !isFree && freeRemaining > 0
        ? `<p class="zone-free-hint">${escapeHtml(buildFreeDeliveryHint(freeRemaining))}</p>`
        : "";
      const freeUnlocked = isFree
        ? `<p class="zone-free-unlocked">${escapeHtml(t("preorder.freeDeliveryUnlocked"))}</p>`
        : "";
      pricingHtml = `
        <div class="checkout-pricing">
          <div class="pricing-row"><span>${escapeHtml(t("preorder.foodSubtotal"))}</span><em>${money(foodSubtotal)}</em></div>
          <div class="pricing-row"><span>${escapeHtml(t("preorder.deliveryFee"))}</span><em${isFree ? ' class="zone-free-label"' : ""}>${isFree ? escapeHtml(t("preorder.freeDelivery")) : money(deliveryFee)}</em></div>
          <div class="pricing-row pricing-row-total"><span>${escapeHtml(t("preorder.orderTotal"))}</span><strong>${money(orderTotal)}</strong></div>
          ${minMsg}${freeHint}${freeUnlocked}
        </div>`;
    }
  }

  const zipInfoHtml = `
    ${cityZipMismatch ? `<p class="zone-mismatch-warning">${escapeHtml(t("preorder.zoneMismatch"))}</p>` : ""}
    ${isZipUnknown ? `<p class="zone-mismatch-warning">${escapeHtml(t("preorder.zipUnknown"))}</p>` : ""}
    ${pricingHtml}`;

  const contactOptions = [["sms", "contactSms"], ["whatsapp", "contactWhatsapp"], ["telegram", "contactTelegram"], ["callMe", "contactCallMe"]]
    .map(([val, key]) => {
      const checked = form.contactMethod === val ? " checked" : "";
      const sel = form.contactMethod === val ? " is-selected" : "";
      return `<label class="choice-btn${sel}"><input type="radio" name="contactMethod" value="${val}"${checked} /><span>${escapeHtml(t(`preorder.${key}`))}</span></label>`;
    }).join("");

  const phoneBlockHtml = (() => {
    if (form.phoneMode === "intl") {
      const messengerOptions = ["whatsapp", "telegram", "call", "other"]
        .map((opt) => {
          const sel = form.intlMessenger === opt ? " checked" : "";
          const selCls = form.intlMessenger === opt ? " is-selected" : "";
          const key = `intlMessenger${opt.charAt(0).toUpperCase() + opt.slice(1)}`;
          return `<label class="choice-btn${selCls}"><input type="radio" name="intlMessenger" value="${opt}"${sel} /><span>${escapeHtml(t(`preorder.${key}`))}</span></label>`;
        }).join("");
      const altContactField = form.intlMessenger === "other"
        ? `<label class="form-field form-field-wide"><span>${escapeHtml(t("preorder.altContact"))}</span><input name="altContact" type="text" value="${escapeHtml(form.altContact)}" autocomplete="tel" /></label>`
        : "";
      return `
        <div class="form-field form-field-wide phone-field-wrap${invCls("phone")}">
          <span>${escapeHtml(t("preorder.phone"))} *</span>
          <div class="phone-intl-wrap">
            <input name="phoneCountryCode" type="tel" class="phone-cc-input"
                   value="${escapeHtml(form.phoneCountryCode)}"
                   placeholder="+44" maxlength="6" inputmode="tel"
                   aria-label="${escapeHtml(t("preorder.phoneCountryCodeLabel"))}" />
            <input name="phone" type="tel" class="phone-intl-input"
                   value="${escapeHtml(form.phone)}"
                   placeholder="555 123 4567"
                   autocomplete="tel" required inputmode="tel"
                   aria-label="${escapeHtml(t("preorder.phoneNumberLabel"))}" />
          </div>
          <button type="button" class="phone-mode-link" data-phone-mode="us">
            ${escapeHtml(t("preorder.phoneBackToUs"))}
          </button>
          <div class="intl-messenger-block">
            <p class="intl-messenger-q">${escapeHtml(t("preorder.intlMessengerQ"))}</p>
            <div class="choice-btn-group intl-messenger-options">
              ${messengerOptions}
            </div>
          </div>
          ${altContactField}
          ${errSpan("phone")}
        </div>`;
    }
    const displayVal = formatUSPhoneDisplay(form.phone);
    return `
      <div class="form-field phone-field-wrap${invCls("phone")}">
        <span>${escapeHtml(t("preorder.phone"))} *</span>
        <div class="phone-us-wrap">
          <span class="phone-prefix" aria-hidden="true">+1</span>
          <input name="phone" type="tel" class="phone-us-input"
                 value="${escapeHtml(displayVal)}"
                 placeholder="(786) 123-4567"
                 autocomplete="tel" required
                 inputmode="numeric" maxlength="14" />
        </div>
        <button type="button" class="phone-mode-link" data-phone-mode="intl">
          ${escapeHtml(t("preorder.phoneOtherCode"))}
        </button>
        ${errSpan("phone")}
      </div>`;
  })();

  const tgField = form.contactMethod === "telegram"
    ? `<label class="form-field form-field-wide"><span>${escapeHtml(t("preorder.telegramUsername"))}</span><input name="telegramUsername" type="text" value="${escapeHtml(form.telegramUsername)}" placeholder="@username" autocomplete="off" /></label>`
    : "";
  const waCheckbox = form.contactMethod === "whatsapp"
    ? `<label class="form-field form-field-wide form-checkbox-label"><input type="checkbox" name="whatsappSamePhone" value="1"${form.whatsappSamePhone ? " checked" : ""} /><span>${escapeHtml(t("preorder.whatsappSamePhone"))}</span></label>`
    : "";

  const cityOptions = DELIVERY_CITIES.map((c) => {
    const sel = form.city === c ? " selected" : "";
    return `<option value="${escapeHtml(c)}"${sel}>${escapeHtml(c)}</option>`;
  }).join("");

  const addressHtml = `
    <h4 class="checkout-section-label">${escapeHtml(t("preorder.deliveryTitle"))}</h4>
    <div class="form-grid">
      <label class="form-field form-field-wide${invCls("address")}">
        <span>${escapeHtml(t("preorder.address"))} *</span>
        <input name="address" type="text" value="${escapeHtml(form.address)}" placeholder="${escapeHtml(t("preorder.addressPlaceholder"))}" autocomplete="street-address" required />
        ${errSpan("address")}
      </label>
      <label class="form-field${invCls("city")}">
        <span>${escapeHtml(t("preorder.city"))} *</span>
        <select name="city" autocomplete="address-level2" required>
          <option value="">${escapeHtml(t("preorder.cityPlaceholder"))}</option>
          ${cityOptions}
          <option value="Other"${form.city === "Other" ? " selected" : ""}>${escapeHtml(t("preorder.cityOther"))}</option>
        </select>
        ${errSpan("city")}
      </label>
      <label class="form-field${invCls("zip")}">
        <span>${escapeHtml(t("preorder.zip"))} *</span>
        <input name="zip" type="text" value="${escapeHtml(form.zip)}" autocomplete="postal-code" inputmode="numeric" maxlength="5" required />
        ${errSpan("zip")}
      </label>
      <label class="form-field">
        <span>${escapeHtml(t("preorder.apt"))}</span>
        <input name="apt" type="text" value="${escapeHtml(form.apt)}" autocomplete="address-line2" />
      </label>
      <label class="form-field">
        <span>${escapeHtml(t("preorder.gateCode"))}</span>
        <input name="gateCode" type="text" value="${escapeHtml(form.gateCode)}" />
      </label>
      <label class="form-field form-field-wide">
        <span>${escapeHtml(t("preorder.deliveryInstructions"))}</span>
        <textarea name="deliveryInstructions" rows="2">${escapeHtml(form.deliveryInstructions)}</textarea>
      </label>
    </div>
    ${zipInfoHtml}`;

  const TIME_SLOTS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const timeOptions = TIME_SLOTS.map((s) => {
    const selected = form.timeWindow === s ? " selected" : "";
    return `<option value="${s}"${selected}>${escapeHtml(t(`preorder.time${s}`))}</option>`;
  }).join("");

  const anyFieldErr = state.preorderSubmitAttempted &&
    ["name","phone","contactMethod","address","city","zip","date","timeWindow"].some(fn => fieldErr(fn));
  const validationBanner = anyFieldErr
    ? `<div class="validation-banner" role="alert">${escapeHtml(t("preorder.validationBanner"))}</div>`
    : "";
  const submitHelper = belowMin && zoneConfig?.minOrder
    ? buildMinOrderMsg(zoneConfig.minOrder, zoneConfig.minOrder - foodSubtotal)
    : "";
  return `
    <div class="modal-cart-summary">
      <h3>${escapeHtml(t("preorder.cartSummaryTitle"))}</h3>
      ${cartRows}
    </div>
    ${validationBanner}
    <form class="modal-form checkout-form" data-preorder-form novalidate>
      <input type="hidden" name="fulfillmentType" value="delivery" />
      <h4 class="checkout-section-label">${escapeHtml(t("preorder.contactTitle"))}</h4>
      <div class="form-grid">
        <label class="form-field${invCls("name")}">
          <span>${escapeHtml(t("preorder.name"))} *</span>
          <input name="name" type="text" value="${escapeHtml(form.name)}" autocomplete="name" required />
          ${errSpan("name")}
        </label>
        ${phoneBlockHtml}
        <div class="form-option-group form-field-wide${invCls("contactMethod")}">
          <span class="form-option-label">${escapeHtml(t("preorder.contactMethod"))} *</span>
          <div class="choice-btn-group">
            ${contactOptions}
          </div>
          ${errSpan("contactMethod")}
        </div>
        ${tgField}${waCheckbox}
      </div>
      ${addressHtml}
      <h4 class="checkout-section-label">${escapeHtml(t("preorder.scheduleTitle"))}</h4>
      <div class="form-grid">
        <label class="form-field${invCls("date")}">
          <span>${escapeHtml(t("preorder.date"))} *</span>
          <input name="date" type="date" value="${escapeHtml(form.date)}" min="${tomorrowStr}" required />
          ${form.date ? `<small class="date-localized">${escapeHtml(formatDateLocalized(form.date, state.lang))}</small>` : ""}
          ${errSpan("date")}
        </label>
        <label class="form-field${invCls("timeWindow")}">
          <span>${escapeHtml(t("preorder.timeWindow"))} *</span>
          <select name="timeWindow" required>
            <option value="">${escapeHtml(t("preorder.timeWindowPlaceholder"))}</option>
            ${timeOptions}
          </select>
          ${errSpan("timeWindow")}
        </label>
        <p class="checkout-advance-note form-field-wide">${escapeHtml(t("preorder.preorderAdvanceNote"))}</p>
        <label class="form-field form-field-wide">
          <span>${escapeHtml(t("preorder.allergies"))}</span>
          <textarea name="allergies" rows="2">${escapeHtml(form.allergies)}</textarea>
        </label>
        <label class="form-field form-field-wide">
          <span>${escapeHtml(t("preorder.orderNotes"))}</span>
          <textarea name="orderNotes" rows="2">${escapeHtml(form.orderNotes)}</textarea>
        </label>
      </div>
      <input type="text" name="_hp" value="" style="display:none" tabindex="-1" autocomplete="off" aria-hidden="true" />
      ${TEST_MODE ? `<p class="checkout-test-mode-banner" role="alert">${escapeHtml(t("preorder.testModeBanner"))}</p>` : ""}
      ${state.preorderError && state.preorderErrorMsg
        ? `<p class="preorder-api-error">${escapeHtml(state.preorderErrorMsg)}</p>`
        : ""}
      <button class="btn btn-primary checkout-submit" type="submit"${state.preorderSubmitting ? " disabled" : ""}>
        <span>${escapeHtml(state.preorderSubmitting ? t("preorder.submitting") : t("preorder.submit"))}</span>
        ${state.preorderSubmitting ? "" : '<i data-lucide="send"></i>'}
      </button>
      ${submitHelper ? `<p class="checkout-submit-helper">${escapeHtml(submitHelper)}</p>` : ""}
    </form>
  `;
};

const createPreorderSuccess = () => {
  const draft = state.preorderDraft;
  return `
    <div class="modal-stage modal-stage-final preorder-success">
      <i data-lucide="check-circle-2" class="stage-icon-lg"></i>
      <h3 class="stage-title">${escapeHtml(t("preorder.successTitle"))}</h3>
      <p class="stage-intro">${escapeHtml(t("preorder.successText"))}</p>
      <p class="success-ref">${escapeHtml(t("preorder.successRef"))} <strong>${escapeHtml(draft?.orderId || "")}</strong></p>
      <button class="btn btn-primary" type="button" data-close-modal="preorder">
        ${escapeHtml(t("preorder.close"))}
      </button>
    </div>
  `;
};

const createPreorderModal = () => {
  const body = state.preorderStage === 0 ? createPreorderStage0() : createPreorderSuccess();
  const backBtn = state.preorderStage === 0
    ? `<button class="btn-back-to-menu" type="button" data-close-modal="preorder">${escapeHtml(t("preorder.backToMenu"))}</button>`
    : "";
  return `
    <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="preorder-modal-title" data-modal-overlay="preorder">
      <div class="modal-panel">
        <div class="modal-header">
          <div class="modal-header-top">
            <h2 id="preorder-modal-title">${escapeHtml(t("preorder.modalTitle"))}</h2>
            <button class="modal-close-btn" type="button" data-close-modal="preorder" aria-label="${escapeHtml(t("preorder.close"))}">✕</button>
          </div>
          ${backBtn}
        </div>
        <div class="modal-body">
          ${body}
        </div>
      </div>
    </div>
  `;
};

// ── Catering modal stages ─────────────────────────────────────────────────────

const createCateringStage0 = () => {
  const form = state.cateringForm;
  const occasionOptions = ["Birthday", "Family", "Friends", "Office", "Other"]
    .map((key) => {
      const val = t(`cateringForm.occasion${key}`);
      const sel = form.occasion === val ? " selected" : "";
      return `<option value="${escapeHtml(val)}"${sel}>${escapeHtml(val)}</option>`;
    })
    .join("");
  const errorHtml = state.cateringError
    ? `<p class="form-error" role="alert">${escapeHtml(t(state.cateringErrorKey))}</p>`
    : "";

  return `
    <form class="modal-form" data-catering-form novalidate>
      <div class="form-grid">
        <label class="form-field">
          <span>${escapeHtml(t("cateringForm.name"))} *</span>
          <input name="name" type="text" value="${escapeHtml(form.name)}" autocomplete="name" required />
        </label>
        <label class="form-field">
          <span>${escapeHtml(t("cateringForm.phone"))} *</span>
          <input name="phone" type="tel" value="${escapeHtml(form.phone)}" autocomplete="tel" required />
        </label>
        <label class="form-field">
          <span>${escapeHtml(t("cateringForm.date"))} *</span>
          <input name="date" type="date" value="${escapeHtml(form.date)}" required />
        </label>
        <label class="form-field">
          <span>${escapeHtml(t("cateringForm.occasion"))} *</span>
          <select name="occasion" required>
            <option value="">${escapeHtml(t("cateringForm.occasionPlaceholder"))}</option>
            ${occasionOptions}
          </select>
        </label>
        <label class="form-field">
          <span>${escapeHtml(t("cateringForm.guests"))} *</span>
          <input name="guests" type="number" min="1" step="1" value="${escapeHtml(form.guests)}" required />
        </label>
        <label class="form-field">
          <span>${escapeHtml(t("cateringForm.area"))} *</span>
          <input name="area" type="text" value="${escapeHtml(form.area)}" required />
        </label>
        <input type="hidden" name="fulfillmentType" value="delivery" />
        <label class="form-field form-field-wide">
          <span>${escapeHtml(t("cateringForm.dishes"))}</span>
          <textarea name="dishes" rows="2">${escapeHtml(form.dishes)}</textarea>
        </label>
        <label class="form-field form-field-wide">
          <span>${escapeHtml(t("cateringForm.allergies"))}</span>
          <textarea name="allergies" rows="2">${escapeHtml(form.allergies)}</textarea>
        </label>
        <label class="form-field form-field-wide">
          <span>${escapeHtml(t("cateringForm.comment"))}</span>
          <textarea name="comment" rows="2">${escapeHtml(form.comment)}</textarea>
        </label>
      </div>
      ${errorHtml}
      <button class="btn btn-primary checkout-submit" type="submit">
        <span>${escapeHtml(t("cateringForm.submit"))}</span>
        <i data-lucide="message-circle"></i>
      </button>
      <p class="checkout-disclaimer">${escapeHtml(t("cateringForm.disclaimer"))}</p>
    </form>
  `;
};

const createCateringStage1 = () => {
  const draft = state.cateringDraft;
  return `
    <div class="modal-stage">
      <h3 class="stage-title">${escapeHtml(t("cateringForm.messengerTitle"))}</h3>
      <p class="stage-intro">${escapeHtml(t("cateringForm.messengerSubtitle"))}</p>
      <p class="stage-ref">${escapeHtml(t("cateringForm.stage1Ref"))} <strong>${escapeHtml(draft?.orderId || "")}</strong></p>
      <div class="messenger-choice">
        <button class="btn btn-primary messenger-btn" type="button" data-send-messenger="catering" data-messenger="whatsapp">
          <i data-lucide="message-circle"></i>
          <span>${escapeHtml(t("cateringForm.viaWhatsApp"))}</span>
        </button>
        <button class="btn btn-secondary messenger-btn" type="button" data-send-messenger="catering" data-messenger="telegram">
          <i data-lucide="send"></i>
          <span>${escapeHtml(t("cateringForm.viaTelegram"))}</span>
        </button>
      </div>
    </div>
  `;
};

const createCateringStage2 = () => `
  <div class="modal-stage">
    <h3 class="stage-title">${escapeHtml(t("cateringForm.stage2Title"))}</h3>
    <p class="stage-intro">${escapeHtml(t("cateringForm.stage2Text"))}</p>
    ${createFallbackBlock("cateringForm")}
    <button class="btn btn-primary" type="button" data-advance-stage="catering">
      <span>${escapeHtml(t("cateringForm.stage2Button"))}</span>
      <i data-lucide="check"></i>
    </button>
  </div>
`;

const createCateringStage3 = () => `
  <div class="modal-stage">
    <h3 class="stage-title">${escapeHtml(t("cateringForm.stage3Title"))}</h3>
    <p class="stage-intro">${escapeHtml(t("cateringForm.stage3Text"))}</p>
    <div class="stage-confirm-actions">
      <button class="btn btn-primary" type="button" data-confirm-sent="catering">
        <span>${escapeHtml(t("cateringForm.stage3Confirm"))}</span>
        <i data-lucide="check-circle-2"></i>
      </button>
      <button class="btn btn-secondary" type="button" data-go-stage="catering" data-stage="2">
        ${escapeHtml(t("cateringForm.stage3Back"))}
      </button>
    </div>
  </div>
`;

const createCateringStage4 = () => `
  <div class="modal-stage modal-stage-final">
    <i data-lucide="check-circle-2" class="stage-icon-lg"></i>
    <h3 class="stage-title">${escapeHtml(t("cateringForm.stage4Title"))}</h3>
    <p class="stage-intro">${escapeHtml(t("cateringForm.stage4Text"))}</p>
    <div class="stage-final-actions">
      <button class="btn btn-secondary btn-sm" type="button" data-open-generic-wa>
        <i data-lucide="message-circle"></i>
        <span>${escapeHtml(t("cateringForm.stage4WA"))}</span>
      </button>
      <button class="btn btn-secondary btn-sm" type="button" data-open-generic-tg>
        <i data-lucide="send"></i>
        <span>${escapeHtml(t("cateringForm.stage4TG"))}</span>
      </button>
    </div>
    <button class="btn btn-primary" type="button" data-close-modal="catering">
      ${escapeHtml(t("cateringForm.close"))}
    </button>
  </div>
`;

const createCateringModal = () => {
  let body = "";
  if (state.cateringStage === 0) body = createCateringStage0();
  else if (state.cateringStage === 1) body = createCateringStage1();
  else if (state.cateringStage === 2) body = createCateringStage2();
  else if (state.cateringStage === 3) body = createCateringStage3();
  else body = createCateringStage4();

  return `
    <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="catering-modal-title" data-modal-overlay="catering">
      <div class="modal-panel">
        <div class="modal-header">
          <h2 id="catering-modal-title">${escapeHtml(t("cateringForm.modalTitle"))}</h2>
          <button class="modal-close-btn" type="button" data-close-modal="catering" aria-label="${escapeHtml(t("cateringForm.close"))}">✕</button>
        </div>
        <div class="modal-body">
          ${body}
        </div>
      </div>
    </div>
  `;
};

// ── Modal open/close/render ───────────────────────────────────────────────────

// iOS Safari requires position:fixed + saved scrollY to truly lock background scroll.
// overflow:hidden alone does not prevent rubber-band scrolling on iOS.
const lockBodyScroll = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  const y = window.scrollY;
  document.body.dataset.scrollLock = String(y);
  document.body.style.top = `-${y}px`;
  if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
  document.body.classList.add("modal-open");
};

const unlockBodyScroll = () => {
  const y = parseInt(document.body.dataset.scrollLock || "0", 10);
  document.body.style.top = "";
  document.body.style.paddingRight = "";
  delete document.body.dataset.scrollLock;
  document.body.classList.remove("modal-open");
  window.scrollTo(0, y);
};

// ── Add-on recommendations ────────────────────────────────────────────────────

const ADD_ON_RECS = {
  "borscht":                   ["sour-cream", "garlic-pampushky", "adjika-sauce"],
  "solyanka":                  ["sour-cream", "pickled-hot-peppers"],
  "pea-soup":                  ["garlic-pampushky"],
  "rassolnik":                 ["sour-cream"],
  "ukrainian-kapustnyak":      ["sour-cream", "garlic-pampushky"],
  "green-borscht":             ["sour-cream", "garlic-pampushky"],
  "cabbage-rolls":             ["sour-cream", "adjika-sauce"],
  "stuffed-bell-peppers":      ["sour-cream", "adjika-sauce"],
  "pork-pelmeni":              ["sour-cream", "adjika-sauce"],
  "pork-beef-dumplings":       ["sour-cream", "adjika-sauce"],
  "chicken-pelmeni":           ["sour-cream", "adjika-sauce"],
  "varenyky":                  ["sour-cream"],
  "pork-mince-cutlets":        ["garlic-sauce"],
  "chicken-mince-cutlets":     ["garlic-sauce"],
  "fish-cutlets":              ["tzatziki"],
  "potato-zrazy-meat":         ["sour-cream", "garlic-sauce"],
  "pork-chops":                ["garlic-sauce"],
  "bbq-ribs":                  ["pickled-hot-peppers"],
  "buffalo-wings":             ["garlic-sauce", "pickled-hot-peppers"],
  "chicken-tabaka":            ["garlic-sauce", "adjika-sauce"],
  "chicken-chops":             ["garlic-sauce", "tzatziki"],
  "grilled-salmon-broccoli":   ["tzatziki"],
  "meat-filled-blini":         ["sour-cream"],
  "cottage-cheese-blini":      ["sour-cream", "strawberry-jam", "sweetened-condensed-milk"],
  "plain-blini":               ["sour-cream", "strawberry-jam", "sweetened-condensed-milk"],
  "chicken-benderiki":         ["sour-cream", "garlic-sauce"],
  "pork-beef-kholodets":       ["homemade-mustard"],
  "chicken-kholodets":         ["homemade-mustard"],
};

const createAddOnModal = (dishId) => {
  const recIds = ADD_ON_RECS[dishId] || [];
  const rows = recIds.map((addonId) => {
    const addon = dishById(addonId);
    if (!addon) return "";
    return `
      <li class="addon-rec-row" data-rec-row="${escapeHtml(addonId)}">
        <span class="addon-rec-info">${escapeHtml(text(addon.name))} &middot; ${money(addon.price)}</span>
        <button class="btn btn-primary addon-rec-btn" type="button" data-rec-add="${escapeHtml(addonId)}">${escapeHtml(t("addOnModal.addBtn"))}</button>
      </li>`;
  }).join("");
  return `
    <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="addon-modal-title" data-modal-overlay="add-on">
      <div class="modal-panel addon-modal-panel">
        <div class="modal-header">
          <div class="modal-header-top">
            <h2 id="addon-modal-title">${escapeHtml(t("addOnModal.title"))}</h2>
            <button class="modal-close-btn" type="button" data-close-modal="add-on" aria-label="✕">✕</button>
          </div>
        </div>
        <div class="modal-body addon-modal-body">
          <ul class="addon-rec-list">${rows}</ul>
        </div>
        <div class="addon-modal-footer">
          <button class="btn btn-secondary" type="button" data-close-modal="add-on">${escapeHtml(t("addOnModal.continueShopping"))}</button>
          <button class="btn btn-primary" type="button" data-add-on-go-cart>${escapeHtml(t("addOnModal.goToCart"))}</button>
        </div>
      </div>
    </div>`;
};

let addOnModalTriggerEl = null;

const openAddOnModal = (dishId) => {
  const recs = ADD_ON_RECS[dishId];
  if (!recs || recs.length === 0) return;
  // Don't stack on top of preorder / catering / cart-review
  if (document.getElementById("preorder-modal") || document.getElementById("catering-modal") || document.getElementById("cart-review-modal")) return;
  if (document.getElementById("addon-modal")) closeAddOnModal();
  let wrapper = document.createElement("div");
  wrapper.id = "addon-modal";
  document.body.appendChild(wrapper);
  wrapper.innerHTML = createAddOnModal(dishId);
  lockBodyScroll();
  wrapper.querySelector(".modal-close-btn")?.focus();
};

const closeAddOnModal = () => {
  document.getElementById("addon-modal")?.remove();
  unlockBodyScroll();
  addOnModalTriggerEl?.focus({ preventScroll: true });
  addOnModalTriggerEl = null;
};

let preorderTriggerEl = null;
let cateringTriggerEl = null;

const openPreorderModal = (trigger = null) => {
  preorderTriggerEl = trigger;
  placesState.manualMode = false;
  closePlacesDropdown();
  if (state.preorderStage === 0 && !document.getElementById("preorder-modal")) {
    ga4("begin_checkout", {
      currency: "USD",
      value: cartTotal(),
      items: ga4CartItems(),
    });
    metaTrack("InitiateCheckout", {
      content_ids: cartEntries().map(({ dish }) => dish.id),
      content_type: "product",
      num_items: cartEntries().reduce((s, { quantity }) => s + quantity, 0),
      value: cartTotal(),
      currency: "USD",
    });
  }
  let wrapper = document.getElementById("preorder-modal");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "preorder-modal";
    document.body.appendChild(wrapper);
  }
  wrapper.innerHTML = createPreorderModal();
  const modalBody = wrapper.querySelector(".modal-body");
  if (modalBody) modalBody.scrollTop = 0;
  lockBodyScroll();
  refreshIcons();
  wrapper.querySelector(".modal-close-btn, input, button")?.focus();
};

const closePreorderModal = () => {
  document.getElementById("preorder-modal")?.remove();
  unlockBodyScroll();
  if (state.preorderStage === 1) {
    state.preorderForm = createDefaultPreorderForm();
    state.preorderDraft = null;
  }
  state.preorderStage = 0;
  state.preorderError = false;
  state.preorderErrorMsg = null;
  state.preorderSubmitAttempted = false;
  preorderTriggerEl?.focus();
  preorderTriggerEl = null;
};

const renderPreorderModal = () => {
  const wrapper = document.getElementById("preorder-modal");
  if (!wrapper) return;
  const prevBody = wrapper.querySelector(".modal-body");
  const savedScroll = prevBody ? prevBody.scrollTop : 0;
  wrapper.innerHTML = createPreorderModal();
  refreshIcons();
  const newBody = wrapper.querySelector(".modal-body");
  if (newBody && savedScroll > 0) newBody.scrollTop = savedScroll;
  if (state.preorderStage > 0) {
    wrapper.querySelector("button")?.focus();
  }
};

// ── A4: Cart review screen ────────────────────────────────────────────────────

let cartReviewTriggerEl = null;

const createCartReviewModal = () => {
  const entries = cartEntries();
  const hasOnlyAddOns = entries.length > 0 && entries.every((e) => e.dish.category === "add-ons");
  const subtotal = cartTotal();

  // ── Delivery calculation (mirrors preorder form — same zone constants, same ZIP) ──
  const zip = state.preorderForm.zip || "";
  const zoneKey = zip ? zipToZoneKey(zip) : "";
  const zoneConfig = zoneKey ? DELIVERY_ZONES[zoneKey] : null;
  const isRemote = zoneKey === "remote";
  const isZoneC = zoneKey === "3";
  const isFree = !isRemote && !isZoneC && !!zoneConfig?.freeAt && subtotal >= zoneConfig.freeAt;

  let deliveryCell, totalRowHtml = "", zoneNoteHtml = "";
  if (!zoneKey) {
    deliveryCell = `<span class="cr-delivery-note">${escapeHtml(t("cartReview.deliveryNote"))}</span>`;
  } else if (isRemote) {
    deliveryCell = `<span class="cr-delivery-note">${escapeHtml(t("cartReview.deliveryConfirming"))}</span>`;
  } else if (isZoneC) {
    const fee = zoneConfig.fee;
    deliveryCell = `<em>${money(fee)}</em>`;
    totalRowHtml = `
      <div class="cr-row cr-total-row">
        <span>${escapeHtml(t("preorder.orderTotal"))}</span>
        <strong>${money(subtotal + fee)}</strong>
      </div>`;
  } else {
    const fee = isFree ? 0 : zoneConfig.fee;
    deliveryCell = isFree
      ? `<em class="zone-free-label">${escapeHtml(t("preorder.freeDelivery"))}</em>`
      : `<em>${money(fee)}</em>`;
    totalRowHtml = `
      <div class="cr-row cr-total-row">
        <span>${escapeHtml(t("preorder.orderTotal"))}</span>
        <strong>${money(subtotal + fee)}</strong>
      </div>`;
  }

  const items = entries
    .map(({ dish, quantity }) => {
      const unitLabel = dish.unit === "lb" ? t("cart.unitLb") : dish.unit === "pcs" ? null : t("cart.unitPrice");
      const priceSpan = unitLabel === null
        ? `<span>${escapeHtml(dish.pcsLabel ? text(dish.pcsLabel) : t("cart.unitPcs"))}</span><span>${money(dish.price)}</span>`
        : `<span>${money(dish.price)} ${escapeHtml(unitLabel)}</span>`;
      return `
      <div class="cart-item cr-item">
        <div class="cart-item-main">
          <div>
            <strong>${escapeHtml(text(dish.name))}</strong>
            ${priceSpan}
          </div>
          <em>${money(dish.price * quantity)}</em>
        </div>
        <div class="cart-row">
          <button type="button" class="cr-qty-btn" data-minus="${escapeHtml(dish.id)}" aria-label="−1">−</button>
          <span class="cr-qty">${quantity}</span>
          <button type="button" class="cr-qty-btn" data-plus="${escapeHtml(dish.id)}" aria-label="+1">+</button>
          <button type="button" class="cr-remove" data-remove="${escapeHtml(dish.id)}">${escapeHtml(t("cart.remove"))}</button>
        </div>
      </div>`;
    })
    .join("");

  return `
    <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="cart-review-title" data-modal-overlay="cart-review">
      <div class="modal-panel cr-panel">
        <div class="modal-header">
          <div class="modal-header-top">
            <h2 id="cart-review-title">${escapeHtml(t("cartReview.title"))}</h2>
            <button class="modal-close-btn" type="button" data-close-modal="cart-review" aria-label="✕">✕</button>
          </div>
        </div>
        <div class="modal-body cr-body">
          <div class="cr-items">${items}</div>
          <div class="cr-totals">
            <div class="cr-row cr-subtotal-row">
              <span>${escapeHtml(t("cartReview.subtotal"))}</span>
              <strong>${money(subtotal)}</strong>
            </div>
            <div class="cr-row cr-delivery-row">
              <span>${escapeHtml(t("cartReview.delivery"))}</span>
              ${deliveryCell}
            </div>
            ${totalRowHtml}
            ${zoneNoteHtml}
          </div>
          <div class="cr-footer">
            ${hasOnlyAddOns ? `<p class="zone-min-warning">${escapeHtml(t("cart.addOnsOnly"))}</p>` : ""}
            <button class="btn btn-primary" type="button" data-review-proceed${hasOnlyAddOns ? " disabled" : ""}>
              ${escapeHtml(t("cartReview.proceed"))}
            </button>
            <button class="btn btn-secondary" type="button" data-cart-review-back>
              ${escapeHtml(t("cartReview.backToMenu"))}
            </button>
          </div>
        </div>
      </div>
    </div>`;
};

const openCartReview = (trigger = null) => {
  cartReviewTriggerEl = trigger;
  let wrapper = document.getElementById("cart-review-modal");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "cart-review-modal";
    document.body.appendChild(wrapper);
  }
  wrapper.innerHTML = createCartReviewModal();
  lockBodyScroll();
  refreshIcons();
  wrapper.querySelector("[data-review-proceed]")?.focus();
};

const closeCartReview = () => {
  document.getElementById("cart-review-modal")?.remove();
  unlockBodyScroll();
  cartReviewTriggerEl?.focus();
  cartReviewTriggerEl = null;
};

const renderCartReviewModal = () => {
  const wrapper = document.getElementById("cart-review-modal");
  if (!wrapper) return;
  if (!cartEntries().length) { closeCartReview(); return; }
  wrapper.innerHTML = createCartReviewModal();
  refreshIcons();
};

const openCateringModal = (trigger = null) => {
  cateringTriggerEl = trigger;
  let wrapper = document.getElementById("catering-modal");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "catering-modal";
    document.body.appendChild(wrapper);
  }
  wrapper.innerHTML = createCateringModal();
  lockBodyScroll();
  refreshIcons();
  wrapper.querySelector(".modal-close-btn, input, button")?.focus();
};

const closeCateringModal = () => {
  document.getElementById("catering-modal")?.remove();
  unlockBodyScroll();
  if (state.cateringStage === 4) {
    state.cateringForm = createDefaultCateringForm();
    state.cateringDraft = null;
  }
  state.cateringStage = 0;
  state.cateringError = false;
  state.cateringSelectedMessenger = null;
  cateringTriggerEl?.focus();
  cateringTriggerEl = null;
};

const renderCateringModal = () => {
  const wrapper = document.getElementById("catering-modal");
  if (!wrapper) return;
  wrapper.innerHTML = createCateringModal();
  refreshIcons();
  if (state.cateringStage > 0) {
    wrapper.querySelector("button")?.focus();
  }
};

// ── Cart rendering ────────────────────────────────────────────────────────────

const createCartEmptyState = () => `
  <div class="cart-empty-state">
    <i data-lucide="shopping-basket"></i>
    <h4>${escapeHtml(t("cart.emptyTitle"))}</h4>
    <p>${escapeHtml(t("cart.emptyText"))}</p>
    <a href="#/menu">${escapeHtml(t("cart.emptyAction"))}</a>
  </div>
`;

const createCartSummary = (count, total) =>
  `<p>${count} ${escapeHtml(cartItemLabel(count))} · <strong>${money(total)}</strong></p>`;

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
    .map(({ dish, quantity }) => {
      const unitLabel = dish.unit === "lb" ? t("cart.unitLb") : dish.unit === "pcs" ? null : t("cart.unitPrice");
      const qtyStr = dish.unit === "pcs" ? `×${quantity}` : `×${quantity} ${dish.unit ?? "шт."}`;
      const priceSpan = unitLabel === null
        ? `<span>${escapeHtml(dish.pcsLabel ? text(dish.pcsLabel) : t("cart.unitPcs"))} · ${qtyStr}</span>`
        : `<span>${money(dish.price)} ${escapeHtml(unitLabel)} · ${qtyStr}</span>`;
      return `
      <div class="cart-item">
        <div class="cart-item-main">
          <div>
            <strong>${escapeHtml(text(dish.name))}</strong>
            ${priceSpan}
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
    `;
    })
    .join("");

const renderCart = () => {
  const entries = cartEntries();
  const total = cartTotal();
  const count = cartCount();
  const hasEntries = entries.length > 0;

  document.querySelectorAll(".order-card").forEach((card) => {
    card.classList.toggle("is-empty", !hasEntries);
    card.classList.toggle("is-expanded", state.cartExpanded && hasEntries);
  });
  document.querySelectorAll("[data-cart-summary]").forEach((el) => {
    el.innerHTML = hasEntries ? createCartSummary(count, total) : "";
    el.hidden = !hasEntries;
  });
  document.querySelectorAll("[data-cart-actions]").forEach((el) => {
    el.innerHTML = hasEntries ? createCartActions() : "";
    el.hidden = !hasEntries;
  });
  document.querySelectorAll("[data-cart-list]").forEach((el) => {
    el.innerHTML = hasEntries ? createCartDetails(entries) : "";
  });
  document.querySelectorAll("[data-cart-details]").forEach((el) => {
    el.hidden = !hasEntries || !state.cartExpanded;
  });
  document.querySelectorAll("[data-cart-empty]").forEach((el) => {
    el.innerHTML = createCartEmptyState();
    el.hidden = hasEntries;
  });
  document.querySelectorAll("[data-checkout-panel]").forEach((el) => {
    el.hidden = true;
    el.innerHTML = "";
  });
  document.querySelectorAll("[data-cart-thankyou]").forEach((el) => {
    el.hidden = true;
    el.innerHTML = "";
  });
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    el.textContent = count;
  });
  const headerBadge = document.querySelector("[data-header-cart-badge]");
  if (headerBadge) {
    headerBadge.textContent = count > 99 ? "99+" : count;
    headerBadge.hidden = !hasEntries;
  }
  const headerCta = document.querySelector("[data-header-cta]");
  if (headerCta) {
    headerCta.setAttribute("aria-label", hasEntries ? t("actions.openCart") : t("actions.chooseDishes"));
  }
  const mobileCount = document.querySelector("[data-mobile-count]");
  const mobileTotal = document.querySelector("[data-mobile-total]");
  if (mobileCount) mobileCount.textContent = `${count} ${cartItemLabel(count)}`;
  if (mobileTotal) mobileTotal.textContent = money(total);
  // Drive mobile-order-bar visibility via CSS — show as soon as cart has items
  document.body.classList.toggle("has-cart", hasEntries);
  const mobileBar = document.querySelector(".mobile-order-bar");
  if (mobileBar) {
    mobileBar.setAttribute("aria-hidden", String(!hasEntries));
    if (hasEntries) {
      mobileBar.removeAttribute("tabindex");
    } else {
      mobileBar.setAttribute("tabindex", "-1");
    }
  }
  refreshIcons();
  renderCartReviewModal();
};

// ── Translations ──────────────────────────────────────────────────────────────

const applyTranslations = () => {
  document.documentElement.lang = state.lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === state.lang);
  });
  // aria-label on WhatsApp float
  const waFloat = document.querySelector("[data-whatsapp-float]");
  if (waFloat) waFloat.setAttribute("aria-label", t("actions.questionsWA") + " WhatsApp");
  // aria-label on social links
  const igLink = document.querySelector("[data-social-instagram]");
  if (igLink) igLink.setAttribute("aria-label", t("social.instagram"));
  const fbLink = document.querySelector("[data-social-facebook]");
  if (fbLink) fbLink.setAttribute("aria-label", t("social.facebook"));
  document.title = t("meta.title");
};

const refreshIcons = () => {
  if (window.lucide) window.lucide.createIcons();
};

// ── Form sync helpers ─────────────────────────────────────────────────────────

const syncPreorderForm = (formEl) => {
  const data = new FormData(formEl);
  const rawZip = String(data.get("zip") || "").trim();
  state.preorderForm = {
    name: String(data.get("name") || "").trim(),
    phone: String(data.get("phone") || "").trim(),
    phoneMode: state.preorderForm.phoneMode || "us",
    phoneCountryCode: String(data.get("phoneCountryCode") || state.preorderForm.phoneCountryCode || "").trim(),
    intlMessenger: String(data.get("intlMessenger") || ""),
    altContact: String(data.get("altContact") || "").trim(),
    fulfillmentType: String(data.get("fulfillmentType") || "delivery"),
    city: String(data.get("city") || "").trim(),
    zip: rawZip,
    zone: zipToZoneKey(rawZip),
    contactMethod: String(data.get("contactMethod") || ""),
    telegramUsername: String(data.get("telegramUsername") || "").trim(),
    whatsappSamePhone: data.get("whatsappSamePhone") === "1",
    address: String(data.get("address") || "").trim(),
    apt: String(data.get("apt") || "").trim(),
    gateCode: String(data.get("gateCode") || "").trim(),
    deliveryInstructions: String(data.get("deliveryInstructions") || "").trim(),
    date: String(data.get("date") || ""),
    timeWindow: String(data.get("timeWindow") || ""),
    allergies: String(data.get("allergies") || "").trim(),
    orderNotes: String(data.get("orderNotes") || "").trim(),
  };
};

const syncCateringForm = (formEl) => {
  const data = new FormData(formEl);
  state.cateringForm = {
    name: String(data.get("name") || "").trim(),
    phone: String(data.get("phone") || "").trim(),
    date: String(data.get("date") || ""),
    occasion: String(data.get("occasion") || ""),
    guests: String(data.get("guests") || "").trim(),
    area: String(data.get("area") || "").trim(),
    fulfillmentType: String(data.get("fulfillmentType") || "delivery"),
    dishes: String(data.get("dishes") || "").trim(),
    allergies: String(data.get("allergies") || "").trim(),
    comment: String(data.get("comment") || "").trim(),
  };
};

// ── Validation ────────────────────────────────────────────────────────────────

const todayStr = () => new Date().toISOString().slice(0, 10);

const validatePreorderForm = () => {
  const f = state.preorderForm;
  if (!f.name || !f.phone || !f.contactMethod || !f.date || !f.timeWindow) return "preorder.required";
  if (!f.address || !f.city || !f.zip) return "preorder.required";
  if (!/^\d{5}$/.test(f.zip)) return "preorder.required";
  if (validatePhone(f.phone, f) !== null) return "preorder.phoneInvalid";
  const dd = new Date();
  dd.setDate(dd.getDate() + 1);
  if (f.date < dd.toISOString().slice(0, 10)) return "preorder.dateNotFuture";
  const zoneConfig = DELIVERY_ZONES[zipToZoneKey(f.zip)];
  if (zoneConfig?.minOrder && cartTotal() < zoneConfig.minOrder) return "preorder.zoneRequired";
  return null;
};

const validateCateringForm = () => {
  const f = state.cateringForm;
  if (!f.name || !f.phone || !f.date || !f.occasion || !f.area || !f.fulfillmentType) return "cateringForm.required";
  if (validatePhone(f.phone) !== null) return "cateringForm.phoneInvalid";
  if (f.date < todayStr()) return "cateringForm.dateInPast";
  const guests = Number(f.guests);
  if (!f.guests || !Number.isInteger(guests) || guests < 1) return "cateringForm.guestsInvalid";
  return null;
};

const normalizeCity = (value) => String(value || "").trim().toLowerCase();

const detectCityZipMismatch = (zipZone, city) => {
  const acceptable = CITY_ACCEPTABLE_ZONES[normalizeCity(city)];
  if (!acceptable || !zipZone || !city) return null;
  if (acceptable.includes(zipZone)) return null;
  return { zipZone, city };
};

// ── Submit handlers ───────────────────────────────────────────────────────────

const handlePreorderSubmit = async (formEl) => {
  // Guard against double-submit (rapid double-click or re-entry during async fetch)
  if (state.preorderSubmitting) return;

  syncPreorderForm(formEl);
  const errorKey = validatePreorderForm();
  if (errorKey) {
    state.preorderSubmitAttempted = true;
    state.preorderError = false;
    renderPreorderModal();
    const modal = document.getElementById("preorder-modal");
    const banner = modal?.querySelector(".validation-banner");
    const firstInvalid = modal?.querySelector(".is-invalid input, .is-invalid select, .is-invalid [type='radio']");
    (banner || firstInvalid)?.scrollIntoView({ block: "start" });
    firstInvalid?.focus();
    return;
  }

  const form = state.preorderForm;
  const honeypot = formEl.querySelector("[name='_hp']")?.value || "";
  const timeWindowLabel = t(`preorder.time${form.timeWindow}`) || form.timeWindow;
  const zoneMismatch = detectCityZipMismatch(form.zone, form.city);

  const payload = {
    _hp: honeypot,
    ...(TEST_MODE ? { testMode: true, testToken: TEST_TOKEN } : {}),
    items: cartEntries().map(({ dish, quantity }) => ({ id: dish.id, quantity })),
    customer: {
      name: form.name,
      phone: phoneToE164(form),
      contactMethod: form.contactMethod,
      telegramUsername: form.telegramUsername || null,
      whatsappSamePhone: form.whatsappSamePhone || false,
      ...(form.phoneMode === "intl" && form.intlMessenger ? { intlMessenger: form.intlMessenger } : {}),
      ...(form.phoneMode === "intl" && form.altContact ? { altContact: form.altContact } : {}),
    },
    delivery: {
      zone: form.zone,
      address: form.address,
      city: form.city,
      zip: form.zip,
      apt: form.apt || null,
      gateCode: form.gateCode || null,
      instructions: form.deliveryInstructions || null,
    },
    schedule: {
      date: form.date,
      timeWindow: form.timeWindow,
      timeWindowLabel,
    },
    zoneMismatch,
    notes: {
      allergies: form.allergies || null,
      orderNotes: form.orderNotes || null,
    },
  };

  state.preorderSubmitting = true;
  state.preorderError = false;
  state.preorderErrorMsg = null;
  state.preorderZoneMismatch = zoneMismatch;
  renderPreorderModal();

  if (!API_ENABLED) {
    const orderId = generateOrderId();
    state.preorderDraft = { orderId, form: { ...form }, stage: 1, requestType: "preorder" };
    ga4("preorder_submitted", {
      currency: "USD",
      value: cartTotal(),
      transaction_id: orderId,
      items: ga4CartItems(),
    });
    metaTrack("Lead", {
      content_ids: cartEntries().map(({ dish }) => dish.id),
      content_type: "product",
      num_items: cartEntries().reduce((s, { quantity }) => s + quantity, 0),
      value: cartTotal(),
      currency: "USD",
    });
    state.cart.clear();
    saveCart(state.cart);
    clearDraft("preorder");
    state.preorderStage = 1;
    state.preorderSubmitting = false;
    state.preorderError = false;
    state.preorderErrorMsg = null;
    state.preorderZoneMismatch = null;
    renderPreorderModal();
    renderCart();
    return;
  }

  try {
    const resp = await fetch(PREORDER_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let result;
    try { result = await resp.json(); } catch { result = { ok: false }; }

    if (!result.ok) {
      throw new Error(result.message || `HTTP ${resp.status}`);
    }

    const orderId = result.orderId;
    state.preorderDraft = { orderId, form: { ...form }, stage: 1, requestType: "preorder" };
    ga4("preorder_submitted", {
      currency: "USD",
      value: cartTotal(),
      transaction_id: orderId,
      items: ga4CartItems(),
    });
    metaTrack("Lead", {
      content_ids: cartEntries().map(({ dish }) => dish.id),
      content_type: "product",
      num_items: cartEntries().reduce((s, { quantity }) => s + quantity, 0),
      value: cartTotal(),
      currency: "USD",
    });
    if (!TEST_MODE) {
      const subtotal = cartTotal();
      const deliveryFee = computeHistoryDeliveryFee(form, subtotal);
      saveOrderToHistory({
        orderId,
        createdAt: new Date().toISOString(),
        deliveryDate: form.date,
        timeWindow: form.timeWindow,
        items: cartEntries().map(({ dish, quantity }) => ({
          id: dish.id,
          name: dish.name,
          category: dish.category,
          quantity,
          unit: dish.unit || null,
          price: dish.price,
        })),
        subtotal,
        deliveryFee,
        total: subtotal + (deliveryFee ?? 0),
        address: form.address,
        apt: form.apt || null,
        city: form.city,
        zip: form.zip,
        contactMethod: form.contactMethod,
        comment: form.orderNotes || null,
        allergies: form.allergies || null,
      });
      renderOrderHistoryBtn();
    }
    state.cart.clear();
    saveCart(state.cart);
    clearDraft("preorder");
    state.preorderStage = 1;
    state.preorderSubmitting = false;
    state.preorderError = false;
    state.preorderErrorMsg = null;
    state.preorderZoneMismatch = null;
    renderPreorderModal();
    renderCart();

  } catch {
    state.preorderSubmitting = false;
    state.preorderError = true;
    state.preorderErrorMsg = t("preorder.apiError");
    state.preorderZoneMismatch = zoneMismatch;
    renderPreorderModal();
  }
};

const handleCateringSubmit = (formEl) => {
  syncCateringForm(formEl);
  const error = validateCateringForm();
  if (error) {
    state.cateringError = true;
    state.cateringErrorKey = error;
    renderCateringModal();
    return;
  }

  const existingDraft = loadDraft("catering");
  const orderId = existingDraft?.orderId || generateOrderId("catering");
  const message = buildCateringMessage(orderId);

  const draft = {
    orderId,
    form: { ...state.cateringForm },
    message,
    stage: 1,
    requestType: "catering",
  };
  state.cateringDraft = draft;
  saveDraft("catering", draft);

  state.cateringStage = 1;
  state.cateringError = false;
  renderCateringModal();
};

// ── Event handlers ────────────────────────────────────────────────────────────

const handleClick = (event) => {
  const target = event.target;

  // Language switch
  // A1: Hamburger toggle
  const navToggle = target.closest("[data-nav-toggle]");
  if (navToggle) {
    isNavDrawerOpen() ? closeNavDrawer() : openNavDrawer();
    return;
  }

  // A1: Close drawer via × button or overlay click
  const navClose = target.closest("[data-nav-close]");
  if (navClose) { closeNavDrawer(); return; }

  const navOverlay = target.closest("[data-nav-overlay]");
  if (navOverlay) { closeNavDrawer(); return; }

  // A1: Nav drawer links — close drawer then let href navigate naturally
  const navLink = target.closest("[data-nav-link]");
  if (navLink && isNavDrawerOpen()) { closeNavDrawer(); }

  const lang = target.closest("[data-lang]");
  if (lang) {
    state.lang = lang.dataset.lang;
    localStorage.setItem("mamasTableLang", state.lang);
    applyTranslations();
    renderStaticData();
    renderPopularDishes();
    renderRoute();
    renderOrderHistoryBtn();
    if (document.getElementById("preorder-modal")) renderPreorderModal();
    return;
  }

  // SPA category route
  const categoryRoute = target.closest("[data-category-route]");
  if (categoryRoute) {
    event.preventDefault();
    const nextHash = `#/${categoryRoute.dataset.categoryRoute}`;
    if (window.location.hash !== nextHash) window.location.hash = nextHash;
    renderRoute();
    return;
  }

  // Dish quantity controls
  const add = target.closest("[data-add]");
  const plus = target.closest("[data-plus]");
  const minus = target.closest("[data-minus]");
  const remove = target.closest("[data-remove]");
  if (add) {
    const id = add.dataset.add;
    const dish = dishById(id);
    setQuantity(id, cartQuantity(id) + 1);
    if (dish) {
      showToast(text(dish.name));
      ga4("add_to_cart", { currency: "USD", value: dish.price, items: [ga4Item(dish, 1)] });
      metaTrack("AddToCart", {
        content_ids: [dish.id],
        content_name: dish.name.en || dish.name.ru,
        content_type: "product",
        content_category: dish.category,
        value: dish.price,
        currency: "USD",
        num_items: 1,
      });
    }
    openAddOnModal(id);
    return;
  }
  if (plus) {
    const id = plus.dataset.plus;
    const dish = dishById(id);
    setQuantity(id, cartQuantity(id) + 1);
    if (dish) {
      ga4("add_to_cart", { currency: "USD", value: dish.price, items: [ga4Item(dish, 1)] });
      metaTrack("AddToCart", {
        content_ids: [dish.id],
        content_name: dish.name.en || dish.name.ru,
        content_type: "product",
        content_category: dish.category,
        value: dish.price,
        currency: "USD",
        num_items: 1,
      });
    }
    return;
  }
  if (minus) {
    const id = minus.dataset.minus;
    const dish = dishById(id);
    const prevQty = cartQuantity(id);
    setQuantity(id, prevQty - 1);
    if (dish && prevQty > 0) {
      ga4("remove_from_cart", { currency: "USD", value: dish.price, items: [ga4Item(dish, 1)] });
      metaTrackCustom("RemoveFromCart", {
        content_ids: [dish.id],
        content_name: dish.name.en || dish.name.ru,
        content_type: "product",
        content_category: dish.category,
        value: dish.price,
        currency: "USD",
        num_items: 1,
      });
    }
    return;
  }
  if (remove) {
    const id = remove.dataset.remove;
    const dish = dishById(id);
    const qty = cartQuantity(id);
    setQuantity(id, 0);
    if (dish && qty > 0) {
      ga4("remove_from_cart", { currency: "USD", value: dish.price * qty, items: [ga4Item(dish, qty)] });
      metaTrackCustom("RemoveFromCart", {
        content_ids: [dish.id],
        content_name: dish.name.en || dish.name.ru,
        content_type: "product",
        content_category: dish.category,
        value: dish.price * qty,
        currency: "USD",
        num_items: qty,
      });
    }
    return;
  }

  // Toggle cart expand
  const toggleCart = target.closest("[data-toggle-cart]");
  if (toggleCart) {
    event.preventDefault();
    state.cartExpanded = !state.cartExpanded;
    renderCart();
    return;
  }

  // Header CTA: open cart review if cart has items, else navigate to menu (#/menu)
  const headerCta = target.closest("[data-header-cta]");
  if (headerCta) {
    if (cartEntries().length) {
      event.preventDefault();
      openCartReview(headerCta);
    }
    // cart empty → let default href="#/menu" navigate normally
    return;
  }

  // Open cart review (A4 — intermediate step before checkout form)
  const openCheckout = target.closest("[data-open-checkout]");
  if (openCheckout) {
    event.preventDefault();
    if (!cartEntries().length) return;
    openCartReview(openCheckout);
    return;
  }

  // A4: Proceed from cart review to preorder form
  const reviewProceed = target.closest("[data-review-proceed]");
  if (reviewProceed) {
    event.preventDefault();
    if (cartEntries().every((e) => e.dish.category === "add-ons")) return;
    const trigger = cartReviewTriggerEl;
    closeCartReview();
    openPreorderModal(trigger);
    return;
  }

  // Places autocomplete dropdown: option click
  const placeOption = target.closest("[data-place-idx]");
  if (placeOption) {
    event.preventDefault();
    const idx = Number(placeOption.dataset.placeIdx);
    const inputEl = placeOption.closest(".form-field")?.querySelector("[name='address']");
    if (inputEl) selectPlaceOption(idx, inputEl);
    return;
  }
  // Places "Enter manually" link
  const placesManualLink = target.closest("[data-places-manual]");
  if (placesManualLink) {
    event.preventDefault();
    placesState.manualMode = true;
    closePlacesDropdown();
    return;
  }

  // Phone mode toggle (US ↔ international)
  const phoneModeBtn = target.closest("[data-phone-mode]");
  if (phoneModeBtn) {
    event.preventDefault();
    const formEl = phoneModeBtn.closest("[data-preorder-form]");
    if (formEl) syncPreorderForm(formEl);
    state.preorderForm.phoneMode = phoneModeBtn.dataset.phoneMode;
    state.preorderForm.phone = "";
    state.preorderForm.phoneCountryCode = state.preorderForm.phoneMode === "intl" ? "+" : "";
    state.preorderForm.intlMessenger = "";
    state.preorderForm.altContact = "";
    renderPreorderModal();
    // Focus the first phone input after render
    setTimeout(() => {
      const modal = document.getElementById("preorder-modal");
      modal?.querySelector(".phone-us-input, .phone-cc-input")?.focus();
    }, 50);
    return;
  }

  // "Continue shopping" — close cart review then scroll to categories
  const cartReviewBack = target.closest("[data-cart-review-back]");
  if (cartReviewBack) {
    event.preventDefault();
    closeCartReview();
    // Wait for unlockBodyScroll's window.scrollTo to settle before smooth-scrolling
    setTimeout(() => {
      document.querySelector("[data-category-grid]")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return;
  }

  // Add-on modal: add add-on to cart
  const recAdd = target.closest("[data-rec-add]");
  if (recAdd) {
    const addonId = recAdd.dataset.recAdd;
    const addon = dishById(addonId);
    if (!addon) return;
    setQuantity(addonId, cartQuantity(addonId) + 1);
    const row = recAdd.closest("[data-rec-row]");
    if (row) {
      let feedback = row.querySelector(".addon-rec-added");
      if (!feedback) {
        feedback = document.createElement("span");
        feedback.className = "addon-rec-added";
        feedback.setAttribute("aria-live", "polite");
        row.appendChild(feedback);
      }
      feedback.textContent = t("addOnModal.added");
      feedback.hidden = false;
      clearTimeout(feedback._timer);
      feedback._timer = setTimeout(() => { feedback.hidden = true; }, 1800);
    }
    return;
  }

  // Add-on modal: "Go to cart"
  const goCart = target.closest("[data-add-on-go-cart]");
  if (goCart) {
    closeAddOnModal();
    openCartReview(goCart);
    return;
  }

  // Close modal
  const closeModal = target.closest("[data-close-modal]");
  if (closeModal) {
    event.preventDefault();
    const type = closeModal.dataset.closeModal;
    if (type === "preorder") closePreorderModal();
    else if (type === "catering") closeCateringModal();
    else if (type === "cart-review") closeCartReview();
    else if (type === "add-on") closeAddOnModal();
    return;
  }

  // Messenger choice (stage 1 → stage 2)
  const sendMessenger = target.closest("[data-send-messenger]");
  if (sendMessenger) {
    event.preventDefault();
    const type = sendMessenger.dataset.sendMessenger;
    const messenger = sendMessenger.dataset.messenger;
    const draft = type === "preorder" ? state.preorderDraft : state.cateringDraft;
    if (messenger === "whatsapp") {
      ga4("click_whatsapp", { source: type });
      window.open(waUrl(draft?.message || ""), "_blank", "noopener,noreferrer");
    } else if (messenger === "telegram") {
      ga4("click_telegram", { source: type });
      window.open(tgUrl(), "_blank", "noopener,noreferrer");
      if (draft?.message) copyOrderText(draft.message).catch(() => {});
    }
    if (type === "preorder") {
      state.preorderSelectedMessenger = messenger;
      state.preorderStage = 2;
      renderPreorderModal();
    } else {
      state.cateringSelectedMessenger = messenger;
      state.cateringStage = 2;
      renderCateringModal();
    }
    return;
  }

  // Stage 2 → Stage 3
  const advanceStage = target.closest("[data-advance-stage]");
  if (advanceStage) {
    event.preventDefault();
    const type = advanceStage.dataset.advanceStage;
    if (type === "preorder") { state.preorderStage = 3; renderPreorderModal(); }
    else { state.cateringStage = 3; renderCateringModal(); }
    return;
  }

  // Go back to specific stage
  const goStage = target.closest("[data-go-stage]");
  if (goStage) {
    event.preventDefault();
    const type = goStage.dataset.goStage;
    const stage = Number(goStage.dataset.stage);
    if (type === "preorder") { state.preorderStage = stage; renderPreorderModal(); }
    else { state.cateringStage = stage; renderCateringModal(); }
    return;
  }

  // Confirm sent (stage 3 → stage 4): clear cart here
  const confirmSent = target.closest("[data-confirm-sent]");
  if (confirmSent) {
    event.preventDefault();
    const type = confirmSent.dataset.confirmSent;
    if (type === "preorder") {
      state.cart.clear();
      saveCart(state.cart);
      renderCart();
      renderDishQuantities();
      clearDraft("preorder");
      state.preorderStage = 4;
      state.preorderDraft = null;
      renderPreorderModal();
    } else if (type === "catering") {
      clearDraft("catering");
      state.cateringStage = 4;
      state.cateringDraft = null;
      renderCateringModal();
    }
    return;
  }

  // Open generic WA chat (no draft message)
  const openGenericWA = target.closest("[data-open-generic-wa]");
  if (openGenericWA) {
    event.preventDefault();
    metaTrack("Contact", { content_name: "WhatsApp" });
    metaTrackCustom("click_whatsapp");
    window.open(waUrl(t("order.help")), "_blank", "noopener,noreferrer");
    return;
  }

  // Open generic TG chat
  const openGenericTG = target.closest("[data-open-generic-tg]");
  if (openGenericTG) {
    event.preventDefault();
    metaTrack("Contact", { content_name: "Telegram" });
    metaTrackCustom("click_telegram");
    window.open(tgUrl(), "_blank", "noopener,noreferrer");
    return;
  }

  // Reopen WA with draft message (fallback block button)
  const openWAMessage = target.closest("[data-open-wa-message]");
  if (openWAMessage) {
    event.preventDefault();
    const type = openWAMessage.dataset.openWaMessage;
    const draft = type === "preorder" ? state.preorderDraft : state.cateringDraft;
    if (draft?.message) window.open(waUrl(draft.message), "_blank", "noopener,noreferrer");
    return;
  }

  // Copy phone
  const copyPhone = target.closest("[data-copy-phone]");
  if (copyPhone) {
    event.preventDefault();
    const ns = copyPhone.dataset.copyPhone;
    const btn = copyPhone;
    const orig = btn.textContent.trim();
    copyOrderText(DISPLAY_PHONE).catch(() => {});
    btn.textContent = t(`${ns}.copied`);
    setTimeout(() => { btn.textContent = orig; }, 2000);
    return;
  }

  // Copy message
  const copyMessage = target.closest("[data-copy-message]");
  if (copyMessage) {
    event.preventDefault();
    const ns = copyMessage.dataset.copyMessage;
    const draft = ns === "preorder" ? state.preorderDraft : state.cateringDraft;
    const btn = copyMessage;
    const orig = btn.textContent.trim();
    copyOrderText(draft?.message || "").catch(() => {});
    btn.textContent = t(`${ns}.copied`);
    setTimeout(() => { btn.textContent = orig; }, 2000);
    return;
  }

  // Open catering modal
  const openCatering = target.closest("[data-open-catering]");
  if (openCatering) {
    event.preventDefault();
    openCateringModal(openCatering);
    return;
  }

  // WhatsApp secondary CTA (generic help message)
  const quick = target.closest("[data-whatsapp-quick]");
  if (quick) {
    event.preventDefault();
    ga4("click_whatsapp", { source: "quick_cta" });
    window.open(waUrl(t("order.help")), "_blank", "noopener,noreferrer");
    return;
  }

  const mobileOrder = target.closest("[data-mobile-order]");
  if (mobileOrder) {
    event.preventDefault();
    if (cartEntries().length > 0) {
      // Always open checkout when cart has items — even on category/route pages.
      // Previously this only worked on the home page; on route pages it scrolled
      // to the order card instead, which required an extra tap to reach checkout.
      openPreorderModal(mobileOrder);
    } else if (routeFromHash()) {
      document.querySelector("[data-route-order-card]")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return;
  }

  // Close Places dropdown on click outside
  if (!target.closest("#address-suggestions") && !target.closest("[name='address']")) {
    closePlacesDropdown();
  }

  // Click outside modal panel (overlay backdrop)
  const overlay = target.closest("[data-modal-overlay]");
  if (overlay && !target.closest(".modal-panel")) {
    const type = overlay.dataset.modalOverlay;
    if (type === "preorder" && (state.preorderStage === 0 || state.preorderStage === 1)) closePreorderModal();
    else if (type === "catering" && (state.cateringStage === 0 || state.cateringStage === 4)) closeCateringModal();
    else if (type === "cart-review") closeCartReview();
    else if (type === "add-on") closeAddOnModal();
  }
};

const handleFormInput = (event) => {
  const preorderField = event.target.closest("[data-preorder-form] [name]");
  if (preorderField) {
    state.preorderForm[preorderField.name] = preorderField.value;
    // US phone: live format as (XXX) XXX-XXXX while typing
    if (preorderField.name === "phone" && state.preorderForm.phoneMode !== "intl") {
      const rawValue = preorderField.value;
      // Non-US autofill (e.g. "+380...") — switch to intl mode automatically
      if (rawValue.trimStart().startsWith("+") && !rawValue.trimStart().startsWith("+1")) {
        const ccMatch = rawValue.match(/^\s*\+(\d{1,3})/);
        const cc = ccMatch ? `+${ccMatch[1]}` : "+";
        const allDigits = rawValue.replace(/\D/g, "");
        const restDigits = ccMatch ? allDigits.slice(ccMatch[1].length) : allDigits;
        const formEl = preorderField.closest("[data-preorder-form]");
        if (formEl) syncPreorderForm(formEl);
        state.preorderForm.phoneMode = "intl";
        state.preorderForm.phoneCountryCode = cc;
        state.preorderForm.phone = restDigits;
        state.preorderForm.intlMessenger = "";
        state.preorderForm.altContact = "";
        renderPreorderModal();
        setTimeout(() => document.getElementById("preorder-modal")?.querySelector(".phone-cc-input")?.focus(), 50);
        return;
      }
      // US autofill may include leading "+1" or just "1" — strip the country code
      const digits = rawValue.replace(/\D/g, "");
      const raw = (digits.length === 11 && digits[0] === "1") ? digits.slice(1) : digits.slice(0, 10);
      const formatted = formatUSPhoneDisplay(raw);
      if (preorderField.value !== formatted) {
        preorderField.value = formatted;
        state.preorderForm.phone = formatted;
      }
    }
    // Enforce country code format: must start with +
    if (preorderField.name === "phoneCountryCode") {
      let cc = preorderField.value;
      if (cc && !cc.startsWith("+")) {
        cc = "+" + cc.replace(/\D/g, "");
        preorderField.value = cc;
        state.preorderForm.phoneCountryCode = cc;
      }
    }
    // Date: update localized date text in-place without full re-render
    if (preorderField.name === "date") {
      const formField = preorderField.closest(".form-field");
      if (formField) {
        let locEl = formField.querySelector(".date-localized");
        if (preorderField.value) {
          if (!locEl) {
            locEl = document.createElement("small");
            locEl.className = "date-localized";
            preorderField.insertAdjacentElement("afterend", locEl);
          }
          locEl.textContent = formatDateLocalized(preorderField.value, state.lang);
        } else if (locEl) {
          locEl.remove();
        }
      }
    }
    if (preorderField.name === "zip") {
      const trimmed = preorderField.value.trim();
      // Keep zone always in sync with zip so no re-render can use a stale zone
      state.preorderForm.zone = zipToZoneKey(trimmed);
      // Re-render immediately when ZIP becomes a valid 5-digit code or is fully cleared
      if (trimmed.length === 5 || trimmed.length === 0) {
        const formEl = preorderField.closest("[data-preorder-form]");
        if (formEl) syncPreorderForm(formEl);
        renderPreorderModal();
        return;
      }
    }
    // Address: trigger Places autocomplete with debounce
    if (preorderField.name === "address" && !placesState.manualMode) {
      clearTimeout(placesState.debounceTimer);
      placesState.debounceTimer = setTimeout(() => {
        fetchPlaceSuggestions(preorderField, preorderField.value.trim());
      }, 280);
    }
    if (state.preorderSubmitAttempted) {
      const label = preorderField.closest(".form-field");
      if (label) {
        label.classList.remove("is-invalid");
        label.querySelector(".field-error")?.remove();
      }
    }
    return;
  }
  const cateringField = event.target.closest("[data-catering-form] [name]");
  if (cateringField) {
    state.cateringForm[cateringField.name] = cateringField.value;
  }
};

const handleFormChange = (event) => {
  const preorderField = event.target.closest("[data-preorder-form] [name]");
  if (preorderField) {
    if (preorderField.type === "checkbox") {
      state.preorderForm[preorderField.name] = preorderField.checked;
    } else {
      state.preorderForm[preorderField.name] = preorderField.value;
    }
    // Only re-render when the field structurally changes the form:
    // contactMethod → shows/hides telegram field, updates is-selected class
    // fulfillmentType → toggles delivery/pickup display
    // All other fields (name, phone, address, city, zip, date, timeWindow) only
    // need state sync — zip re-render is already handled in handleFormInput at 5 digits.
    // Re-rendering on every field change resets modal scrollTop on iOS Safari,
    // causing the form to jump to top on every tap.
    // intlMessenger → shows/hides altContact field
    const reRenderFields = ["contactMethod", "fulfillmentType", "intlMessenger"];
    if (reRenderFields.includes(preorderField.name)) {
      const formEl = preorderField.closest("[data-preorder-form]");
      if (formEl) syncPreorderForm(formEl);
      renderPreorderModal();
    }
    return;
  }
  const cateringField = event.target.closest("[data-catering-form] [name]");
  if (cateringField) {
    state.cateringForm[cateringField.name] = cateringField.value;
  }
};

const handleSubmit = (event) => {
  const preorderForm = event.target.closest("[data-preorder-form]");
  if (preorderForm) {
    event.preventDefault();
    handlePreorderSubmit(preorderForm);
    return;
  }
  const cateringForm = event.target.closest("[data-catering-form]");
  if (cateringForm) {
    event.preventDefault();
    handleCateringSubmit(cateringForm);
  }
};

// ── Keyboard (ESC / focus trap) ───────────────────────────────────────────────

const handleKeydown = (event) => {
  if (event.key === "Escape") {
    // A1: Close nav drawer first if open
    if (isNavDrawerOpen()) { closeNavDrawer(); return; }
    if (document.getElementById("addon-modal")) { closeAddOnModal(); return; }
    const preorderOpen = !!document.getElementById("preorder-modal");
    const cateringOpen = !!document.getElementById("catering-modal");
    const reviewOpen = !!document.getElementById("cart-review-modal");
    if (reviewOpen) { closeCartReview(); return; }
    if (preorderOpen && (state.preorderStage === 0 || state.preorderStage === 1)) closePreorderModal();
    else if (cateringOpen && (state.cateringStage === 0 || state.cateringStage === 4)) closeCateringModal();
    return;
  }
  if (event.key === "Tab") {
    // A1: Focus trap for nav drawer when open
    if (isNavDrawerOpen()) {
      const drawer = document.querySelector("[data-nav-drawer] .nav-drawer-panel");
      if (drawer) {
        const focusable = Array.from(
          drawer.querySelectorAll('button:not([disabled]), a[href]'),
        ).filter((el) => el.offsetParent !== null);
        if (focusable.length >= 2) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
        return;
      }
    }
    const modal =
      document.getElementById("addon-modal")?.querySelector(".modal-overlay") ||
      document.getElementById("preorder-modal")?.querySelector(".modal-overlay") ||
      document.getElementById("catering-modal")?.querySelector(".modal-overlay");
    if (!modal) return;
    const focusable = Array.from(
      modal.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]'),
    ).filter((el) => el.offsetParent !== null && !el.closest(".is-hidden"));
    if (focusable.length < 2) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
};

// ── Header scroll ─────────────────────────────────────────────────────────────

const setupHeader = () => {
  const header = document.querySelector("[data-header]");
  const update = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
    document.body.classList.toggle("has-scrolled", window.scrollY > 420);
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
};

// ── FAQ accordion ─────────────────────────────────────────────────────────────

const setupFaqAccordion = () => {
  const items = document.querySelectorAll(".faq-list details");
  items.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      items.forEach((other) => { if (other !== item) other.open = false; });
    });
  });
};

// ── Reveal on scroll ──────────────────────────────────────────────────────────

let revealObserver;

const revealAll = () =>
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => el.classList.add("is-visible"));

const observeReveals = () => {
  if (revealObserver) revealObserver.disconnect();
  // Immediately reveal if user prefers reduced motion or IO unavailable
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { revealAll(); return; }
  if (!("IntersectionObserver" in window)) { revealAll(); return; }
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
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => revealObserver.observe(el));
  // Safety net: force-reveal any stuck elements after 800ms
  setTimeout(revealAll, 800);
};

// ── A2: Popular dishes ────────────────────────────────────────────────────────

const renderPopularDishes = () => {
  const grid = document.querySelector("[data-popular-grid]");
  if (!grid) return;
  const visibleCategoryIds = new Set(categories.map((c) => c.id));
  const popular = menuItems.filter((d) => d.popular && visibleCategoryIds.has(d.category));
  if (!popular.length) {
    const section = document.querySelector("[data-popular-section]");
    if (section) section.hidden = true;
    return;
  }
  grid.innerHTML = popular.map((d) => createDishCard(d, { reveal: true })).join("");
  refreshIcons();
  observeReveals();
};

// ── A1: Nav drawer ────────────────────────────────────────────────────────────

let _navPrevFocus = null;

const openNavDrawer = () => {
  const drawer = document.querySelector("[data-nav-drawer]");
  const toggle = document.querySelector("[data-nav-toggle]");
  if (!drawer) return;
  _navPrevFocus = document.activeElement;
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("nav-open");
  if (toggle) toggle.setAttribute("aria-expanded", "true");
  const firstFocusable = drawer.querySelector("button, a[href]");
  firstFocusable?.focus();
};

const closeNavDrawer = () => {
  const drawer = document.querySelector("[data-nav-drawer]");
  const toggle = document.querySelector("[data-nav-toggle]");
  if (!drawer) return;
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("nav-open");
  if (toggle) toggle.setAttribute("aria-expanded", "false");
  (_navPrevFocus || toggle)?.focus();
  _navPrevFocus = null;
};

const isNavDrawerOpen = () =>
  document.querySelector("[data-nav-drawer]")?.classList.contains("is-open") ?? false;

// ── A3: Toast ─────────────────────────────────────────────────────────────────

const showToast = (dishName) => {
  const root = document.getElementById("toast-root");
  if (!root) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg><span>${escapeHtml(t("toast.added"))}: <strong>${escapeHtml(dishName)}</strong></span>`;
  root.appendChild(toast);
  const DURATION = 2500;
  const FADE = 300;
  setTimeout(() => {
    toast.classList.add("toast-out");
    setTimeout(() => toast.remove(), FADE);
  }, DURATION);
};

// ── Session restore ───────────────────────────────────────────────────────────

const restoreSessionDrafts = () => {
  const cateringDraft = loadDraft("catering");
  if (cateringDraft?.stage >= 1) {
    state.cateringForm = cateringDraft.form || createDefaultCateringForm();
    state.cateringDraft = cateringDraft;
    state.cateringStage = 1;
    openCateringModal();
  }
};

// ── Bootstrap ─────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const r = await fetch("dishes.json");
    if (r.ok) menuItems = await r.json();
  } catch {}

  setupHeader();
  setupFaqAccordion();
  applyTranslations();
  renderStaticData();
  renderPopularDishes();
  renderRoute();
  renderCart();
  renderOrderHistoryBtn();
  restoreSessionDrafts();

  document.addEventListener("click", handleClick);
  document.addEventListener("input", handleFormInput);
  document.addEventListener("change", handleFormChange);
  document.addEventListener("submit", handleSubmit);
  document.addEventListener("keydown", handleKeydown);
  window.addEventListener("hashchange", renderRoute);
  window.addEventListener("load", scrollToAnchorHash);

  // Restore stage on bfcache (Safari back-forward cache)
  window.addEventListener("pageshow", (e) => {
    if (!e.persisted) return;
    const preorderDraft = loadDraft("preorder");
    if (preorderDraft?.stage >= 1 && !document.getElementById("preorder-modal")) {
      state.preorderDraft = preorderDraft;
      state.preorderStage = 1;
      openPreorderModal();
    }
    const cateringDraft = loadDraft("catering");
    if (cateringDraft?.stage >= 1 && !document.getElementById("catering-modal")) {
      state.cateringDraft = cateringDraft;
      state.cateringStage = 1;
      openCateringModal();
    }
  });

  refreshIcons();
});
