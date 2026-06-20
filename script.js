const WHATSAPP_NUMBER = "79788358121";
const formatPhone = (n) => `+${n[0]} ${n.slice(1, 4)} ${n.slice(4, 7)}-${n.slice(7)}`;
const DISPLAY_PHONE = formatPhone(WHATSAPP_NUMBER);

const tr = (ru, en, uk) => ({ ru, en, uk });

const copy = {
  ru: {
    meta: { title: "Mama's Table | Домашняя еда с доставкой в Майами" },
    brand: { name: "Мамина кухня", tagline: "Домашняя еда • Miami" },
    nav: {
      menu: "Меню",
      catering: "Кейтеринг",
      how: "Как заказать",
      delivery: "Доставка",
      about: "О нас",
      faq: "FAQ",
      contact: "Контакты",
    },
    actions: {
      chooseDishes: "Выбрать блюда",
      howItWorks: "Как заказать",
      questionsWA: "Вопросы или индивидуальный заказ",
      viewFullMenu: "Все меню",
    },
    hero: {
      eyebrow: "Премиальная домашняя кухня",
      title: "Домашняя еда с доставкой в Майами",
      lede: "Украинские, восточноевропейские, средиземноморские, кавказские и азиатские блюда готовятся под заказ и доставляются по Miami, Hallandale, Hollywood, Aventura и ближайшим районам.",
      cardLabel: "Популярный заказ",
      cardTitle: "Семейный ужин",
      cardMeta: "На 4–6 гостей • от $95",
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
      threeTitle: "Мы готовим свежую еду",
      threeText: "Все готовится под заказ из свежих ингредиентов.",
      fourTitle: "Доставка или самовывоз",
      fourText: "Получите еду свежей и вовремя.",
    },
    categories: {
      title: "Категории меню",
      subtitle: "Выберите категорию, чтобы посмотреть полный список блюд.",
      open: "Открыть",
      viewAll: "Все меню",
    },
    catering: {
      eyebrow: "Кейтеринг",
      title: "Кейтеринг и праздничные заказы",
      subtitle: "Соберём домашний стол для дня рождения, семейного праздника, встречи с друзьями или небольшого офисного события.",
      benefit1: "Меню под количество гостей",
      benefit2: "Любимые домашние блюда и закуски",
      benefit3: "Индивидуальные пожелания и аллергии",
      benefit4: "Доставка или самовывоз по предварительному согласованию",
      cta: "Получить предложение",
      ctaWA: "Вопросы в WhatsApp",
      note: "Меню, количество порций, время приготовления и стоимость согласовываются индивидуально перед подтверждением заказа.",
    },
    menuPage: {
      title: "Меню Маминой кухни",
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
      zone1Label: "Зона 1:",
      zone1Cities: "Hallandale, Aventura, Hollywood, Sunny Isles",
      zone2Label: "Зона 2:",
      zone2Cities: "North Miami, Dania Beach",
      zone3Label: "Зона 3:",
      zone3Cities: "Miami, Fort Lauderdale и дальние районы — по согласованию",
      footer: "Стоимость доставки подтверждается до оплаты и никогда не добавляется без согласования.",
      pickup: "Самовывоз доступен по предварительному согласованию. Точная точка выдачи отправляется после подтверждения заказа.",
    },
    testimonials: {
      eyebrow: "Отзывы",
      title: "Что говорят клиенты",
      placeholder: "Первые отзывы клиентов скоро появятся здесь.",
    },
    faq: {
      title: "Частые вопросы",
      oneQ: "За сколько времени делать заказ?",
      oneA: "Лучше за 24–48 часов, особенно для семейных наборов и праздничных заказов.",
      twoQ: "Есть ли доставка?",
      twoA: "Да, доставка доступна по Miami и ближайшим районам. Стоимость рассчитывается индивидуально.",
      threeQ: "Есть ли самовывоз?",
      threeA: "Самовывоз доступен по предварительному согласованию. Точная точка выдачи отправляется после подтверждения заказа.",
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
    },
    preorder: {
      modalTitle: "Детали предзаказа",
      cartSummaryTitle: "Ваш заказ",
      deliveryCostNote: "Стоимость доставки и финальная сумма подтверждаются перед оплатой.",
      name: "Имя",
      phone: "Телефон / WhatsApp",
      fulfillment: "Способ получения",
      delivery: "Доставка",
      pickup: "Самовывоз",
      address: "Адрес доставки",
      apt: "Apartment / Unit",
      date: "Желаемая дата",
      time: "Желаемое время",
      comment: "Комментарий к заказу",
      allergies: "Аллергии / особые пожелания",
      submit: "Продолжить в WhatsApp",
      disclaimer: "После того как вы отправите сообщение в WhatsApp, мы подтвердим наличие блюд, время приготовления, стоимость доставки и итоговую сумму. Оплата производится только после подтверждения заказа.",
      required: "Заполните все обязательные поля.",
      dateInPast: "Дата не может быть в прошлом.",
      close: "Закрыть",
      stage1Text: "Мы подготовили текст заявки для WhatsApp. Проверьте данные и нажмите «Отправить», чтобы мы получили ваш заказ.",
      stage1Button: "Я отправил заявку",
      stage1Ref: "№ заявки:",
      fallbackTitle: "Если WhatsApp не открылся",
      fallbackNote: "Скопируйте текст заявки и отправьте его вручную на этот номер.",
      copyPhone: "Скопировать номер",
      copyMessage: "Скопировать текст заявки",
      copied: "Скопировано",
      stage2Text: "Спасибо. Если вы отправили сообщение в WhatsApp, мы получим вашу заявку и свяжемся с вами для подтверждения наличия блюд, времени, доставки и финальной стоимости. Заказ подтверждается только после согласования и оплаты.",
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
      submit: "Продолжить в WhatsApp",
      disclaimer: "Меню, количество порций, время приготовления и стоимость согласовываются индивидуально перед подтверждением заказа.",
      required: "Заполните все обязательные поля.",
      dateInPast: "Дата не может быть в прошлом.",
      guestsInvalid: "Укажите количество гостей (минимум 1).",
      close: "Закрыть",
      stage1Text: "Мы подготовили текст заявки для WhatsApp. Проверьте данные и нажмите «Отправить», чтобы мы получили ваш запрос на кейтеринг.",
      stage1Button: "Я отправил заявку",
      stage1Ref: "№ заявки:",
      fallbackTitle: "Если WhatsApp не открылся",
      fallbackNote: "Скопируйте текст заявки и отправьте его вручную на этот номер.",
      copyPhone: "Скопировать номер",
      copyMessage: "Скопировать текст заявки",
      copied: "Скопировано",
      stage2Text: "Спасибо. Если вы отправили сообщение в WhatsApp, мы получим вашу заявку на кейтеринг и свяжемся с вами, чтобы уточнить меню, количество порций, время, доставку и итоговую стоимость. Заказ подтверждается только после согласования и оплаты.",
    },
    order: {
      title: "Заявка на предзаказ",
      ref: "№ заявки",
      name: "Имя",
      phone: "Телефон",
      fulfillment: "Способ получения",
      deliveryLabel: "Доставка",
      pickupLabel: "Самовывоз",
      address: "Адрес",
      date: "Дата",
      time: "Время",
      items: "Состав заказа",
      subtotal: "Примерная сумма",
      comment: "Комментарий",
      allergies: "Аллергии / пожелания",
      deliveryNote: "Стоимость доставки и финальная сумма будут подтверждены отдельно.",
      help: "Здравствуйте! Хочу задать вопрос или оформить индивидуальный заказ.",
    },
  },
  en: {
    meta: { title: "Mama's Table | Homemade Meals Delivered Fresh in Miami" },
    brand: { name: "Mama's Table", tagline: "Homemade Kitchen • Miami" },
    nav: {
      menu: "Menu",
      catering: "Catering",
      how: "How It Works",
      delivery: "Delivery",
      about: "About Us",
      faq: "FAQ",
      contact: "Contact",
    },
    actions: {
      chooseDishes: "Choose dishes",
      howItWorks: "How ordering works",
      questionsWA: "Questions or custom order",
      viewFullMenu: "View full menu",
    },
    hero: {
      eyebrow: "Premium homemade kitchen",
      title: "Homemade Meals, Delivered Fresh in Miami",
      lede: "Ukrainian, Eastern European, Mediterranean, Caucasian and Asian dishes made to order and delivered across Miami, Hallandale, Hollywood, Aventura and nearby areas.",
      cardLabel: "Popular Order",
      cardTitle: "Family Dinner",
      cardMeta: "Serves 4–6 guests • from $95",
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
      threeTitle: "We cook fresh",
      threeText: "Prepared with fresh ingredients.",
      fourTitle: "Delivery or pickup",
      fourText: "Get your meals fresh and on time.",
    },
    categories: {
      title: "Menu Categories",
      subtitle: "Choose a category to view the full dish list.",
      open: "Open",
      viewAll: "View full menu",
    },
    catering: {
      eyebrow: "Catering",
      title: "Catering & Celebrations",
      subtitle: "We create a homemade menu for birthdays, family celebrations, gatherings with friends, and small office events.",
      benefit1: "Menu tailored to your guest count",
      benefit2: "Favorite homemade dishes and appetizers",
      benefit3: "Dietary preferences and allergy notes",
      benefit4: "Delivery or pickup by prior arrangement",
      cta: "Request a Quote",
      ctaWA: "Questions on WhatsApp",
      note: "Menu, portions, preparation time, and final pricing are confirmed individually before the order is approved.",
    },
    menuPage: {
      title: "Mama's Table Menu",
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
      title: "Delivery across Miami-Dade and Broward",
      zone1Label: "Zone 1:",
      zone1Cities: "Hallandale, Aventura, Hollywood, Sunny Isles",
      zone2Label: "Zone 2:",
      zone2Cities: "North Miami, Dania Beach",
      zone3Label: "Zone 3:",
      zone3Cities: "Miami, Fort Lauderdale and farther areas — by arrangement",
      footer: "Delivery cost is confirmed before payment and is never added without your agreement.",
      pickup: "Pickup is available by prior arrangement. The exact pickup location is sent after your order is confirmed.",
    },
    testimonials: {
      eyebrow: "Testimonials",
      title: "What Customers Say",
      placeholder: "First customer reviews will appear here soon.",
    },
    faq: {
      title: "FAQ",
      oneQ: "How far in advance should I order?",
      oneA: "24–48 hours is best, especially for family sets and holiday orders.",
      twoQ: "Do you deliver?",
      twoA: "Yes, delivery is available across Miami and nearby areas. The fee is calculated individually.",
      threeQ: "Is pickup available?",
      threeA: "Pickup is available by prior arrangement. The exact pickup location is sent after your order is confirmed.",
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
    },
    preorder: {
      modalTitle: "Pre-order details",
      cartSummaryTitle: "Your order",
      deliveryCostNote: "Delivery cost and the final total are confirmed before payment.",
      name: "Name",
      phone: "Phone / WhatsApp",
      fulfillment: "Receiving method",
      delivery: "Delivery",
      pickup: "Pickup",
      address: "Delivery address",
      apt: "Apartment / Unit",
      date: "Preferred date",
      time: "Preferred time",
      comment: "Order comment",
      allergies: "Allergies / special requests",
      submit: "Continue in WhatsApp",
      disclaimer: "After you send your WhatsApp message, we will confirm availability, preparation time, delivery cost, and the final total. Payment is requested only after order confirmation.",
      required: "Please fill in all required fields.",
      dateInPast: "Date cannot be in the past.",
      close: "Close",
      stage1Text: "We prepared your pre-order details for WhatsApp. Please review them and tap \"Send\" so we can receive your request.",
      stage1Button: "I sent my request",
      stage1Ref: "Request #:",
      fallbackTitle: "If WhatsApp did not open",
      fallbackNote: "Copy the request text and send it manually to this number.",
      copyPhone: "Copy number",
      copyMessage: "Copy request text",
      copied: "Copied",
      stage2Text: "Thank you. If you sent the WhatsApp message, we will receive your request and contact you to confirm availability, timing, delivery, and the final total. Your order is confirmed only after agreement and payment.",
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
      submit: "Continue in WhatsApp",
      disclaimer: "Menu, portions, preparation time, and final pricing are confirmed individually before the order is approved.",
      required: "Please fill in all required fields.",
      dateInPast: "Date cannot be in the past.",
      guestsInvalid: "Please enter number of guests (minimum 1).",
      close: "Close",
      stage1Text: "We prepared your catering request for WhatsApp. Please review them and tap \"Send\" so we can receive your request.",
      stage1Button: "I sent my request",
      stage1Ref: "Request #:",
      fallbackTitle: "If WhatsApp did not open",
      fallbackNote: "Copy the request text and send it manually to this number.",
      copyPhone: "Copy number",
      copyMessage: "Copy request text",
      copied: "Copied",
      stage2Text: "Thank you. If you sent the WhatsApp message, we will receive your catering request and contact you to confirm the menu, portions, timing, delivery, and final price. Your order is confirmed only after agreement and payment.",
    },
    order: {
      title: "Pre-order request",
      ref: "Request #",
      name: "Name",
      phone: "Phone",
      fulfillment: "Delivery method",
      deliveryLabel: "Delivery",
      pickupLabel: "Pickup",
      address: "Address",
      date: "Date",
      time: "Time",
      items: "Order contents",
      subtotal: "Estimated total",
      comment: "Comment",
      allergies: "Allergies / requests",
      deliveryNote: "Delivery cost and final total will be confirmed separately.",
      help: "Hello! I have a question or would like to place a custom order.",
    },
  },
  uk: {
    meta: { title: "Mama's Table | Домашня їжа з доставкою в Маямі" },
    brand: { name: "Мамина кухня", tagline: "Домашня їжа • Miami" },
    nav: {
      menu: "Меню",
      catering: "Кейтеринг",
      how: "Як замовити",
      delivery: "Доставка",
      about: "Про нас",
      faq: "FAQ",
      contact: "Контакти",
    },
    actions: {
      chooseDishes: "Обрати страви",
      howItWorks: "Як замовити",
      questionsWA: "Запитання або індивідуальне замовлення",
      viewFullMenu: "Все меню",
    },
    hero: {
      eyebrow: "Преміальна домашня кухня",
      title: "Домашня їжа з доставкою в Маямі",
      lede: "Українські, східноєвропейські, середземноморські, кавказькі та азійські страви готуються на замовлення і доставляються по Miami, Hallandale, Hollywood, Aventura та поруч.",
      cardLabel: "Популярне замовлення",
      cardTitle: "Сімейна вечеря",
      cardMeta: "На 4–6 гостей • від $95",
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
      threeTitle: "Ми готуємо свіжу їжу",
      threeText: "Все готується на замовлення зі свіжих інгредієнтів.",
      fourTitle: "Доставка або самовивіз",
      fourText: "Отримайте їжу свіжою і вчасно.",
    },
    categories: {
      title: "Категорії меню",
      subtitle: "Оберіть категорію, щоб переглянути повний список страв.",
      open: "Відкрити",
      viewAll: "Все меню",
    },
    catering: {
      eyebrow: "Кейтеринг",
      title: "Кейтеринг і святкові замовлення",
      subtitle: "Зберемо домашній стіл для дня народження, сімейного свята, зустрічі з друзями або невеликої офісної події.",
      benefit1: "Меню під кількість гостей",
      benefit2: "Улюблені домашні страви та закуски",
      benefit3: "Індивідуальні побажання та алергії",
      benefit4: "Доставка або самовивіз по попередньому узгодженню",
      cta: "Отримати пропозицію",
      ctaWA: "Запитання у WhatsApp",
      note: "Меню, кількість порцій, час приготування і вартість узгоджуються індивідуально перед підтвердженням замовлення.",
    },
    menuPage: {
      title: "Меню Маминої кухні",
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
      zone1Label: "Зона 1:",
      zone1Cities: "Hallandale, Aventura, Hollywood, Sunny Isles",
      zone2Label: "Зона 2:",
      zone2Cities: "North Miami, Dania Beach",
      zone3Label: "Зона 3:",
      zone3Cities: "Miami, Fort Lauderdale і дальні райони — по узгодженню",
      footer: "Вартість доставки підтверджується до оплати і ніколи не додається без узгодження.",
      pickup: "Самовивіз доступний по попередньому узгодженню. Точна точка видачі надсилається після підтвердження замовлення.",
    },
    testimonials: {
      eyebrow: "Відгуки",
      title: "Що кажуть клієнти",
      placeholder: "Перші відгуки клієнтів незабаром з'являться тут.",
    },
    faq: {
      title: "Часті питання",
      oneQ: "За скільки часу робити замовлення?",
      oneA: "Краще за 24–48 годин, особливо для сімейних наборів і святкових замовлень.",
      twoQ: "Чи є доставка?",
      twoA: "Так, доставка доступна по Miami і найближчих районах. Вартість розраховується індивідуально.",
      threeQ: "Чи є самовивіз?",
      threeA: "Самовивіз доступний по попередньому узгодженню. Точна точка видачі надсилається після підтвердження замовлення.",
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
    },
    preorder: {
      modalTitle: "Деталі передзамовлення",
      cartSummaryTitle: "Ваше замовлення",
      deliveryCostNote: "Вартість доставки та фінальна сума підтверджуються перед оплатою.",
      name: "Ім'я",
      phone: "Телефон / WhatsApp",
      fulfillment: "Спосіб отримання",
      delivery: "Доставка",
      pickup: "Самовивіз",
      address: "Адреса доставки",
      apt: "Apartment / Unit",
      date: "Бажана дата",
      time: "Бажаний час",
      comment: "Коментар до замовлення",
      allergies: "Алергії / особливі побажання",
      submit: "Продовжити у WhatsApp",
      disclaimer: "Після того як ви надішлете повідомлення у WhatsApp, ми підтвердимо наявність страв, час приготування, вартість доставки та підсумкову суму. Оплата здійснюється лише після підтвердження замовлення.",
      required: "Заповніть усі обов'язкові поля.",
      dateInPast: "Дата не може бути в минулому.",
      close: "Закрити",
      stage1Text: "Ми підготували текст заявки для WhatsApp. Перевірте дані та натисніть «Надіслати», щоб ми отримали ваше замовлення.",
      stage1Button: "Я надіслав заявку",
      stage1Ref: "№ заявки:",
      fallbackTitle: "Якщо WhatsApp не відкрився",
      fallbackNote: "Скопіюйте текст заявки та надішліть його вручну на цей номер.",
      copyPhone: "Скопіювати номер",
      copyMessage: "Скопіювати текст заявки",
      copied: "Скопійовано",
      stage2Text: "Дякуємо. Якщо ви надіслали повідомлення у WhatsApp, ми отримаємо вашу заявку та зв'яжемося з вами, щоб підтвердити наявність страв, час, доставку й остаточну вартість. Замовлення підтверджується лише після узгодження та оплати.",
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
      submit: "Продовжити у WhatsApp",
      disclaimer: "Меню, кількість порцій, час приготування і вартість узгоджуються індивідуально перед підтвердженням замовлення.",
      required: "Заповніть усі обов'язкові поля.",
      dateInPast: "Дата не може бути в минулому.",
      guestsInvalid: "Вкажіть кількість гостей (мінімум 1).",
      close: "Закрити",
      stage1Text: "Ми підготували текст заявки для WhatsApp. Перевірте дані та натисніть «Надіслати», щоб ми отримали ваш запит на кейтеринг.",
      stage1Button: "Я надіслав заявку",
      stage1Ref: "№ заявки:",
      fallbackTitle: "Якщо WhatsApp не відкрився",
      fallbackNote: "Скопіюйте текст заявки та надішліть його вручну на цей номер.",
      copyPhone: "Скопіювати номер",
      copyMessage: "Скопіювати текст заявки",
      copied: "Скопійовано",
      stage2Text: "Дякуємо. Якщо ви надіслали повідомлення у WhatsApp, ми отримаємо вашу заявку на кейтеринг та зв'яжемося з вами, щоб уточнити меню, кількість порцій, час, доставку та підсумкову вартість. Замовлення підтверджується лише після узгодження та оплати.",
    },
    order: {
      title: "Заявка на передзамовлення",
      ref: "№ заявки",
      name: "Ім'я",
      phone: "Телефон",
      fulfillment: "Спосіб отримання",
      deliveryLabel: "Доставка",
      pickupLabel: "Самовивіз",
      address: "Адреса",
      date: "Дата",
      time: "Час",
      items: "Склад замовлення",
      subtotal: "Орієнтовна сума",
      comment: "Коментар",
      allergies: "Алергії / побажання",
      deliveryNote: "Вартість доставки та фінальна сума будуть підтверджені окремо.",
      help: "Доброго дня! Маю питання або хочу оформити індивідуальне замовлення.",
    },
  },
};

let menuItems = [];

const categories = [
  {
    id: "soups",
    image: "assets/images/categories/category-pervye-blyuda-new.jpg",
    icon: "utensils",
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
    icon: "chef-hat",
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
];

const createDefaultPreorderForm = () => ({
  name: "",
  phone: "",
  fulfillmentType: "delivery",
  address: "",
  apt: "",
  date: "",
  time: "",
  comment: "",
  allergies: "",
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
  preorderForm: createDefaultPreorderForm(),
  preorderStage: 0,
  preorderDraft: null,
  preorderError: false,
  preorderErrorKey: "preorder.required",
  cateringForm: createDefaultCateringForm(),
  cateringStage: 0,
  cateringDraft: null,
  cateringError: false,
  cateringErrorKey: "cateringForm.required",
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
  salads: "salads",
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
  document.querySelectorAll("[data-category-dishes] .reveal").forEach((el) => el.classList.add("is-visible"));
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
          <div class="category-grid route-category-grid">${categories.map(createCategoryCard).join("")}</div>
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
        <div class="dish-grid menu-dish-grid">${menuItemsByCategory(category.id)
          .map((dish) => createDishCard(dish, { reveal: false }))
          .join("")}</div>
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
  document.title =
    route === "menu" ? `${t("menuPage.title")} | Mama's Table` : `${text(category.title)} | Mama's Table`;
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
  if (safeQuantity === 0) state.cart.delete(id);
  else state.cart.set(id, safeQuantity);
  if (!state.cart.size) state.cartExpanded = false;
  saveCart(state.cart);
  renderCart();
  renderDishQuantities();
};

const renderDishQuantities = () => {
  document.querySelectorAll("[data-dish-qty]").forEach((element) => {
    element.textContent = cartQuantity(element.dataset.dishQty);
  });
};

// ── Reference ID ──────────────────────────────────────────────────────────────

const generateRefId = () => {
  try {
    return crypto.randomUUID().slice(0, 8).toUpperCase();
  } catch {
    return (Date.now().toString(36) + Math.random().toString(36).slice(2, 6)).toUpperCase().slice(0, 8);
  }
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

const buildPreorderMessage = (refId) => {
  const form = state.preorderForm;
  const entries = cartEntries();
  const lines = [
    t("order.title"),
    `${t("order.ref")}: ${refId}`,
    "",
    `${t("order.name")}: ${form.name}`,
    `${t("order.phone")}: ${form.phone}`,
    `${t("order.fulfillment")}: ${form.fulfillmentType === "delivery" ? t("order.deliveryLabel") : t("order.pickupLabel")}`,
  ];
  if (form.fulfillmentType === "delivery" && form.address) {
    lines.push(`${t("order.address")}: ${form.address}${form.apt ? `, ${form.apt}` : ""}`);
  }
  lines.push(`${t("order.date")}: ${form.date}`);
  lines.push(`${t("order.time")}: ${form.time}`);
  lines.push("");
  lines.push(`${t("order.items")}:`);
  entries.forEach(({ dish, quantity }) => {
    lines.push(`- ${text(dish.name)} ×${quantity}: ${money(dish.price * quantity)}`);
  });
  lines.push(`${t("order.subtotal")}: ${money(cartTotal())}`);
  lines.push("");
  lines.push(t("order.deliveryNote"));
  if (form.allergies) lines.push(`${t("order.allergies")}: ${form.allergies}`);
  if (form.comment) lines.push(`${t("order.comment")}: ${form.comment}`);
  return lines.join("\n");
};

const buildCateringMessage = (refId) => {
  const form = state.cateringForm;
  const lines = [
    `🎉 ${t("cateringForm.modalTitle")}`,
    `${t("order.ref")}: ${refId}`,
    "",
    `${t("cateringForm.name")}: ${form.name}`,
    `${t("cateringForm.phone")}: ${form.phone}`,
    `${t("cateringForm.date")}: ${form.date}`,
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
    <div class="modal-fallback-phone">${escapeHtml(DISPLAY_PHONE)}</div>
    <div class="modal-fallback-actions">
      <button class="btn btn-secondary btn-sm" type="button" data-copy-phone="${escapeHtml(ns)}">
        ${escapeHtml(t(`${ns}.copyPhone`))}
      </button>
      <button class="btn btn-secondary btn-sm" type="button" data-copy-message="${escapeHtml(ns)}">
        ${escapeHtml(t(`${ns}.copyMessage`))}
      </button>
    </div>
  </div>
`;

// ── Preorder modal stages ─────────────────────────────────────────────────────

const createPreorderStage0 = () => {
  const form = state.preorderForm;
  const isDelivery = form.fulfillmentType === "delivery";
  const checkedDelivery = form.fulfillmentType === "delivery" ? " checked" : "";
  const checkedPickup = form.fulfillmentType === "pickup" ? " checked" : "";
  const entries = cartEntries();
  const cartRows = entries
    .map(
      ({ dish, quantity }) =>
        `<div class="modal-cart-item"><span>${escapeHtml(text(dish.name))} × ${quantity}</span><em>${money(dish.price * quantity)}</em></div>`,
    )
    .join("");
  const errorHtml = state.preorderError
    ? `<p class="form-error" role="alert">${escapeHtml(t(state.preorderErrorKey))}</p>`
    : "";

  return `
    <div class="modal-cart-summary">
      <h3>${escapeHtml(t("preorder.cartSummaryTitle"))}</h3>
      ${cartRows}
      <div class="modal-cart-total">
        <span>${escapeHtml(t("cart.total"))}:</span>
        <strong>${money(cartTotal())}</strong>
      </div>
      <p class="modal-delivery-note">${escapeHtml(t("preorder.deliveryCostNote"))}</p>
    </div>
    <form class="modal-form" data-preorder-form novalidate>
      <div class="form-grid">
        <label class="form-field">
          <span>${escapeHtml(t("preorder.name"))} *</span>
          <input name="name" type="text" value="${escapeHtml(form.name)}" autocomplete="name" required />
        </label>
        <label class="form-field">
          <span>${escapeHtml(t("preorder.phone"))} *</span>
          <input name="phone" type="tel" value="${escapeHtml(form.phone)}" autocomplete="tel" required />
        </label>
        <fieldset class="form-field form-field-wide">
          <legend>${escapeHtml(t("preorder.fulfillment"))} *</legend>
          <div class="radio-group">
            <label><input name="fulfillmentType" type="radio" value="delivery"${checkedDelivery} /><span>${escapeHtml(t("preorder.delivery"))}</span></label>
            <label><input name="fulfillmentType" type="radio" value="pickup"${checkedPickup} /><span>${escapeHtml(t("preorder.pickup"))}</span></label>
          </div>
        </fieldset>
        <label class="form-field form-field-wide${isDelivery ? "" : " is-hidden"}" id="preorder-address-field">
          <span>${escapeHtml(t("preorder.address"))}${isDelivery ? " *" : ""}</span>
          <input name="address" type="text" value="${escapeHtml(form.address)}" autocomplete="street-address"${isDelivery ? " required" : ""} />
        </label>
        <label class="form-field${isDelivery ? "" : " is-hidden"}" id="preorder-apt-field">
          <span>${escapeHtml(t("preorder.apt"))}</span>
          <input name="apt" type="text" value="${escapeHtml(form.apt)}" autocomplete="address-line2" />
        </label>
        <label class="form-field">
          <span>${escapeHtml(t("preorder.date"))} *</span>
          <input name="date" type="date" value="${escapeHtml(form.date)}" required />
        </label>
        <label class="form-field">
          <span>${escapeHtml(t("preorder.time"))} *</span>
          <input name="time" type="time" value="${escapeHtml(form.time)}" required />
        </label>
        <label class="form-field form-field-wide">
          <span>${escapeHtml(t("preorder.comment"))}</span>
          <textarea name="comment" rows="2">${escapeHtml(form.comment)}</textarea>
        </label>
        <label class="form-field form-field-wide">
          <span>${escapeHtml(t("preorder.allergies"))}</span>
          <textarea name="allergies" rows="2">${escapeHtml(form.allergies)}</textarea>
        </label>
      </div>
      ${errorHtml}
      <button class="btn btn-primary checkout-submit" type="submit">
        <span>${escapeHtml(t("preorder.submit"))}</span>
        <i data-lucide="message-circle"></i>
      </button>
      <p class="checkout-disclaimer">${escapeHtml(t("preorder.disclaimer"))}</p>
    </form>
  `;
};

const createPreorderStage1 = () => {
  const draft = state.preorderDraft;
  return `
    <div class="modal-stage">
      <p class="stage-intro">${escapeHtml(t("preorder.stage1Text"))}</p>
      <p class="stage-ref">${escapeHtml(t("preorder.stage1Ref"))} <strong>${escapeHtml(draft?.refId || "")}</strong></p>
      ${createFallbackBlock("preorder")}
      <button class="btn btn-primary" type="button" data-confirm-sent="preorder">
        <span>${escapeHtml(t("preorder.stage1Button"))}</span>
        <i data-lucide="check-circle-2"></i>
      </button>
    </div>
  `;
};

const createPreorderStage2 = () => `
  <div class="modal-stage modal-stage-final">
    <i data-lucide="check-circle-2" class="stage-icon-lg"></i>
    <p class="stage-intro">${escapeHtml(t("preorder.stage2Text"))}</p>
    <button class="btn btn-primary" type="button" data-close-modal="preorder">
      ${escapeHtml(t("preorder.close"))}
    </button>
  </div>
`;

const createPreorderModal = () => {
  let body = "";
  if (state.preorderStage === 0) body = createPreorderStage0();
  else if (state.preorderStage === 1) body = createPreorderStage1();
  else body = createPreorderStage2();

  return `
    <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="preorder-modal-title" data-modal-overlay="preorder">
      <div class="modal-panel">
        <div class="modal-header">
          <h2 id="preorder-modal-title">${escapeHtml(t("preorder.modalTitle"))}</h2>
          <button class="modal-close-btn" type="button" data-close-modal="preorder" aria-label="${escapeHtml(t("preorder.close"))}">✕</button>
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
  const checkedDelivery = form.fulfillmentType === "delivery" ? " checked" : "";
  const checkedPickup = form.fulfillmentType === "pickup" ? " checked" : "";
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
        <fieldset class="form-field form-field-wide">
          <legend>${escapeHtml(t("cateringForm.fulfillment"))} *</legend>
          <div class="radio-group">
            <label><input name="fulfillmentType" type="radio" value="delivery"${checkedDelivery} /><span>${escapeHtml(t("cateringForm.delivery"))}</span></label>
            <label><input name="fulfillmentType" type="radio" value="pickup"${checkedPickup} /><span>${escapeHtml(t("cateringForm.pickup"))}</span></label>
          </div>
        </fieldset>
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
      <p class="stage-intro">${escapeHtml(t("cateringForm.stage1Text"))}</p>
      <p class="stage-ref">${escapeHtml(t("cateringForm.stage1Ref"))} <strong>${escapeHtml(draft?.refId || "")}</strong></p>
      ${createFallbackBlock("cateringForm")}
      <button class="btn btn-primary" type="button" data-confirm-sent="catering">
        <span>${escapeHtml(t("cateringForm.stage1Button"))}</span>
        <i data-lucide="check-circle-2"></i>
      </button>
    </div>
  `;
};

const createCateringStage2 = () => `
  <div class="modal-stage modal-stage-final">
    <i data-lucide="check-circle-2" class="stage-icon-lg"></i>
    <p class="stage-intro">${escapeHtml(t("cateringForm.stage2Text"))}</p>
    <button class="btn btn-primary" type="button" data-close-modal="catering">
      ${escapeHtml(t("cateringForm.close"))}
    </button>
  </div>
`;

const createCateringModal = () => {
  let body = "";
  if (state.cateringStage === 0) body = createCateringStage0();
  else if (state.cateringStage === 1) body = createCateringStage1();
  else body = createCateringStage2();

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

let preorderTriggerEl = null;
let cateringTriggerEl = null;

const openPreorderModal = (trigger = null) => {
  preorderTriggerEl = trigger;
  let wrapper = document.getElementById("preorder-modal");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "preorder-modal";
    document.body.appendChild(wrapper);
  }
  wrapper.innerHTML = createPreorderModal();
  document.body.classList.add("modal-open");
  refreshIcons();
  wrapper.querySelector(".modal-close-btn, input, button")?.focus();
};

const closePreorderModal = () => {
  document.getElementById("preorder-modal")?.remove();
  document.body.classList.remove("modal-open");
  if (state.preorderStage !== 2) {
    // Keep form data; only reset stage if closing before completion
    state.preorderStage = 0;
    state.preorderError = false;
  } else {
    state.preorderStage = 0;
    state.preorderForm = createDefaultPreorderForm();
    state.preorderDraft = null;
  }
  preorderTriggerEl?.focus();
  preorderTriggerEl = null;
};

const renderPreorderModal = () => {
  const wrapper = document.getElementById("preorder-modal");
  if (!wrapper) return;
  wrapper.innerHTML = createPreorderModal();
  refreshIcons();
  if (state.preorderStage > 0) {
    wrapper.querySelector("button")?.focus();
  }
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
  document.body.classList.add("modal-open");
  refreshIcons();
  wrapper.querySelector(".modal-close-btn, input, button")?.focus();
};

const closeCateringModal = () => {
  document.getElementById("catering-modal")?.remove();
  document.body.classList.remove("modal-open");
  if (state.cateringStage !== 2) {
    state.cateringStage = 0;
    state.cateringError = false;
  } else {
    state.cateringStage = 0;
    state.cateringForm = createDefaultCateringForm();
    state.cateringDraft = null;
  }
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
    .map(
      ({ dish, quantity }) => `
      <div class="cart-item">
        <div class="cart-item-main">
          <div>
            <strong>${escapeHtml(text(dish.name))}</strong>
            <span>${money(dish.price)} ${escapeHtml(t("cart.unitPrice"))} · ×${quantity}</span>
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
  const mobileCount = document.querySelector("[data-mobile-count]");
  const mobileTotal = document.querySelector("[data-mobile-total]");
  if (mobileCount) mobileCount.textContent = `${count} ${cartItemLabel(count)}`;
  if (mobileTotal) mobileTotal.textContent = money(total);
  refreshIcons();
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
  document.title = t("meta.title");
};

const refreshIcons = () => {
  if (window.lucide) window.lucide.createIcons();
};

// ── Form sync helpers ─────────────────────────────────────────────────────────

const syncPreorderForm = (formEl) => {
  const data = new FormData(formEl);
  state.preorderForm = {
    name: String(data.get("name") || "").trim(),
    phone: String(data.get("phone") || "").trim(),
    fulfillmentType: String(data.get("fulfillmentType") || "delivery"),
    address: String(data.get("address") || "").trim(),
    apt: String(data.get("apt") || "").trim(),
    date: String(data.get("date") || ""),
    time: String(data.get("time") || ""),
    comment: String(data.get("comment") || "").trim(),
    allergies: String(data.get("allergies") || "").trim(),
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
  if (!f.name || !f.phone || !f.fulfillmentType || !f.date || !f.time) return "preorder.required";
  if (f.date < todayStr()) return "preorder.dateInPast";
  if (f.fulfillmentType === "delivery" && !f.address) return "preorder.required";
  return null;
};

const validateCateringForm = () => {
  const f = state.cateringForm;
  if (!f.name || !f.phone || !f.date || !f.occasion || !f.area || !f.fulfillmentType) return "cateringForm.required";
  if (f.date < todayStr()) return "cateringForm.dateInPast";
  const guests = Number(f.guests);
  if (!f.guests || !Number.isInteger(guests) || guests < 1) return "cateringForm.guestsInvalid";
  return null;
};

// ── Submit handlers ───────────────────────────────────────────────────────────

const handlePreorderSubmit = (formEl) => {
  syncPreorderForm(formEl);
  const error = validatePreorderForm();
  if (error) {
    state.preorderError = true;
    state.preorderErrorKey = error;
    renderPreorderModal();
    return;
  }

  const existingDraft = loadDraft("preorder");
  const refId = existingDraft?.refId || generateRefId();
  const message = buildPreorderMessage(refId);

  const draft = {
    refId,
    form: { ...state.preorderForm },
    cartSnapshot: cartEntries().map(({ dish, quantity }) => ({
      id: dish.id,
      name: text(dish.name),
      quantity,
      unitPrice: dish.price,
      lineTotal: dish.price * quantity,
    })),
    subtotal: cartTotal(),
    message,
    stage: 1,
    requestType: "preorder",
  };
  state.preorderDraft = draft;
  saveDraft("preorder", draft);

  state.preorderStage = 1;
  state.preorderError = false;
  renderPreorderModal();

  window.location.assign(waUrl(message));
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
  const refId = existingDraft?.refId || generateRefId();
  const message = buildCateringMessage(refId);

  const draft = {
    refId,
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

  window.location.assign(waUrl(message));
};

// ── Event handlers ────────────────────────────────────────────────────────────

const handleClick = (event) => {
  const target = event.target;

  // Language switch
  const lang = target.closest("[data-lang]");
  if (lang) {
    state.lang = lang.dataset.lang;
    localStorage.setItem("mamasTableLang", state.lang);
    applyTranslations();
    renderStaticData();
    renderRoute();
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
  if (add) { setQuantity(add.dataset.add, cartQuantity(add.dataset.add) + 1); return; }
  if (plus) { setQuantity(plus.dataset.plus, cartQuantity(plus.dataset.plus) + 1); return; }
  if (minus) { setQuantity(minus.dataset.minus, cartQuantity(minus.dataset.minus) - 1); return; }
  if (remove) { setQuantity(remove.dataset.remove, 0); return; }

  // Toggle cart expand
  const toggleCart = target.closest("[data-toggle-cart]");
  if (toggleCart) {
    event.preventDefault();
    state.cartExpanded = !state.cartExpanded;
    renderCart();
    return;
  }

  // Open preorder modal
  const openCheckout = target.closest("[data-open-checkout]");
  if (openCheckout) {
    event.preventDefault();
    if (!cartEntries().length) return;
    openPreorderModal(openCheckout);
    return;
  }

  // Close modal
  const closeModal = target.closest("[data-close-modal]");
  if (closeModal) {
    event.preventDefault();
    const type = closeModal.dataset.closeModal;
    if (type === "preorder") closePreorderModal();
    else if (type === "catering") closeCateringModal();
    return;
  }

  // Confirm sent (stage 1 → stage 2)
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
      state.preorderStage = 2;
      state.preorderDraft = null;
      renderPreorderModal();
    } else if (type === "catering") {
      clearDraft("catering");
      state.cateringStage = 2;
      state.cateringDraft = null;
      renderCateringModal();
    }
    return;
  }

  // Copy phone
  const copyPhone = target.closest("[data-copy-phone]");
  if (copyPhone) {
    event.preventDefault();
    const ns = copyPhone.dataset.copyPhone;
    navigator.clipboard?.writeText(DISPLAY_PHONE).catch(() => {});
    const orig = copyPhone.textContent;
    copyPhone.textContent = t(`${ns}.copied`);
    setTimeout(() => { copyPhone.textContent = orig; }, 2000);
    return;
  }

  // Copy message
  const copyMessage = target.closest("[data-copy-message]");
  if (copyMessage) {
    event.preventDefault();
    const ns = copyMessage.dataset.copyMessage;
    const draft = ns === "preorder" ? state.preorderDraft : state.cateringDraft;
    navigator.clipboard?.writeText(draft?.message || "").catch(() => {});
    const orig = copyMessage.textContent;
    copyMessage.textContent = t(`${ns}.copied`);
    setTimeout(() => { copyMessage.textContent = orig; }, 2000);
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
    window.open(waUrl(t("order.help")), "_blank", "noopener,noreferrer");
    return;
  }

  // Mobile order bar
  const mobileOrder = target.closest("[data-mobile-order]");
  if (mobileOrder) {
    if (routeFromHash()) {
      event.preventDefault();
      document.querySelector("[data-route-order-card]")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (cartEntries().length > 0) {
      event.preventDefault();
      openPreorderModal(mobileOrder);
    }
    return;
  }

  // Click outside modal panel (overlay backdrop)
  const overlay = target.closest("[data-modal-overlay]");
  if (overlay && !target.closest(".modal-panel")) {
    const type = overlay.dataset.modalOverlay;
    if (type === "preorder" && state.preorderStage === 0) closePreorderModal();
    else if (type === "catering" && state.cateringStage === 0) closeCateringModal();
  }
};

const handleFormInput = (event) => {
  const preorderField = event.target.closest("[data-preorder-form] [name]");
  if (preorderField) {
    state.preorderForm[preorderField.name] = preorderField.value;
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
    state.preorderForm[preorderField.name] = preorderField.value;
    if (preorderField.name === "fulfillmentType") {
      const isDelivery = preorderField.value === "delivery";
      const modal = document.getElementById("preorder-modal");
      modal?.querySelector("#preorder-address-field")?.classList.toggle("is-hidden", !isDelivery);
      modal?.querySelector("#preorder-apt-field")?.classList.toggle("is-hidden", !isDelivery);
      const addrInput = modal?.querySelector("[name='address']");
      if (addrInput) addrInput.required = isDelivery;
      const addrLabel = modal?.querySelector("#preorder-address-field span");
      if (addrLabel) addrLabel.textContent = `${t("preorder.address")}${isDelivery ? " *" : ""}`;
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
    if (document.getElementById("preorder-modal") && state.preorderStage === 0) closePreorderModal();
    else if (document.getElementById("catering-modal") && state.cateringStage === 0) closeCateringModal();
    return;
  }
  if (event.key === "Tab") {
    const modal =
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

const observeReveals = () => {
  if (revealObserver) revealObserver.disconnect();
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
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
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => revealObserver.observe(el));
};

// ── Session restore ───────────────────────────────────────────────────────────

const restoreSessionDrafts = () => {
  const preorderDraft = loadDraft("preorder");
  if (preorderDraft?.stage === 1) {
    // Restore cart from snapshot
    if (preorderDraft.cartSnapshot) {
      preorderDraft.cartSnapshot.forEach(({ id, quantity }) => {
        state.cart.set(id, quantity);
      });
      saveCart(state.cart);
    }
    state.preorderForm = preorderDraft.form || createDefaultPreorderForm();
    state.preorderDraft = preorderDraft;
    state.preorderStage = 1;
    openPreorderModal();
    return;
  }

  const cateringDraft = loadDraft("catering");
  if (cateringDraft?.stage === 1) {
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
  renderRoute();
  renderCart();
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
    if (preorderDraft?.stage === 1 && !document.getElementById("preorder-modal")) {
      state.preorderDraft = preorderDraft;
      state.preorderStage = 1;
      openPreorderModal();
    }
    const cateringDraft = loadDraft("catering");
    if (cateringDraft?.stage === 1 && !document.getElementById("catering-modal")) {
      state.cateringDraft = cateringDraft;
      state.cateringStage = 1;
      openCateringModal();
    }
  });

  refreshIcons();
});
