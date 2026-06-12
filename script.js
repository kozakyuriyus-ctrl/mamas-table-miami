const BUSINESS = {
  whatsappNumber: "13050000000",
  instagramUrl: "https://instagram.com/",
};

const copy = {
  ru: {
    nav: {
      menu: "Меню",
      delivery: "Доставка",
      about: "О нас",
      order: "Заказать",
    },
    actions: {
      orderAria: "Начать заказ",
      orderWhatsapp: "Заказать в WhatsApp",
      viewMenu: "Смотреть меню",
    },
    hero: {
      eyebrow: "Домашняя еда на заказ",
      lede:
        "Теплая домашняя кухня Восточной Европы, Украины, Азии, Кавказа и Средиземноморья для вашего стола в Miami и Hallandale.",
      metaOne: "Доставка и самовывоз",
      metaTwo: "Предзаказ от 24 часов",
      metaThree: "Семейные сеты и праздники",
    },
    strip: {
      area: "Miami, Hallandale и рядом",
      fresh: "Готовим к вашему времени",
      private: "Домашний формат, ресторанная подача",
    },
    menu: {
      kicker: "Кухни",
      title: "Меню, которое собирает семью за одним столом",
      subtitle:
        "Временная структура меню уже готова для запуска. Позже можно заменить позиции, цены и фотографии на ваши реальные блюда.",
      tabs: {
        family: "Семейные сеты",
        ukrainian: "Украинское",
        caucasus: "Кавказ и Средиземноморье",
        asian: "Азиатское",
      },
    },
    cuisine: {
      ukrainianLabel: "Украинская и восточноевропейская",
      ukrainianTitle: "Борщ, вареники, голубцы, домашние салаты",
      caucasusLabel: "Кавказ и Средиземноморье",
      caucasusTitle: "Хачапури, долма, гриль, овощи, соусы",
      asianLabel: "Азиатская домашняя кухня",
      asianTitle: "Дамплинги, лапша, рис, свежие закуски",
    },
    service: {
      kicker: "Формат",
      title: "Готовим как дома, оформляем как для гостей",
      copy:
        "Mama's Table подходит для семейного ужина, дня рождения, встречи друзей, небольшого офиса или спокойного воскресного обеда без готовки.",
      stepOneTitle: "Выберите стиль стола",
      stepOneCopy: "Сеты, отдельные блюда или индивидуальное меню под событие.",
      stepTwoTitle: "Оставьте заявку",
      stepTwoCopy: "Через форму, WhatsApp или Instagram. Мы уточним детали и время.",
      stepThreeTitle: "Получите свежую еду",
      stepThreeCopy: "Доставка по району или удобный самовывоз.",
    },
    delivery: {
      kicker: "Зона работы",
      title: "Miami, Hallandale и соседние районы",
      copy:
        "Доставка и самовывоз доступны по предварительному заказу. Для больших сетов и праздников лучше бронировать дату заранее.",
      cta: "Проверить доставку",
      pickup: "Хочу самовывоз",
      areas: ["Miami", "Hallandale Beach", "Sunny Isles", "Aventura", "Hollywood", "North Miami", "Bal Harbour", "Surfside"],
    },
    about: {
      kicker: "О бренде",
      title: "Еда с характером, теплом и большим столом",
      copyOne:
        "Это не массовый кейтеринг. Это домашняя кухня, где блюда готовятся небольшими партиями, с понятными продуктами и уважением к традициям.",
      copyTwo:
        "В одном меню встречаются украинский борщ, кавказские сыры и зелень, средиземноморские овощи и азиатские акценты.",
      signature: "made for generous homes",
    },
    order: {
      kicker: "Заявка",
      title: "Расскажите, какой стол нужен",
      copy:
        "Заполните короткую форму, и мы подготовим сообщение для WhatsApp. Можно заказать семейный ужин, набор блюд или стол под событие.",
    },
    form: {
      name: "Имя",
      namePlaceholder: "Ваше имя",
      phone: "Телефон или WhatsApp",
      phonePlaceholder: "+1...",
      area: "Район",
      areaPlaceholder: "Miami, Hallandale...",
      date: "Дата и время",
      datePlaceholder: "Например: Saturday, 6 PM",
      guests: "Количество гостей",
      style: "Что хочется?",
      notes: "Комментарий",
      notesPlaceholder: "Аллергии, любимые блюда, формат события...",
      submit: "Подготовить заказ",
      status: "Сообщение подготовлено. Открываем WhatsApp.",
      fallback: "Сообщение подготовлено. Если WhatsApp не открылся, нажмите кнопку WhatsApp выше.",
      styles: {
        family: "Семейный стол",
        ukrainian: "Украинское / Восточноевропейское",
        caucasus: "Кавказ / Средиземноморье",
        asian: "Азиатский стол",
        custom: "Индивидуальное событие",
      },
    },
    footer: {
      tagline: "Homemade food for Miami & Hallandale",
      top: "Наверх",
    },
    menuItems: {
      family: [
        {
          name: "Mama's Family Table",
          price: "from $89",
          text: "Большой домашний сет: горячее, салаты, закуски, соусы и хлеб для уютного вечера.",
          tags: ["4-6 guests", "pre-order", "best start"],
        },
        {
          name: "Celebration Table",
          price: "from $180",
          text: "Праздничный стол с несколькими кухнями, подачей на общих блюдах и сезонными добавками.",
          tags: ["events", "custom", "large table"],
        },
        {
          name: "Sunday Comfort Box",
          price: "from $54",
          text: "Готовый домашний ужин без лишних решений: основное, салат, гарнир и десерт.",
          tags: ["2-3 guests", "comfort", "pickup"],
        },
        {
          name: "Office Lunch Set",
          price: "from $15 pp",
          text: "Сытный ланч для небольшой команды: салаты, горячие блюда, рис или картофель, соусы.",
          tags: ["teams", "delivery", "balanced"],
        },
      ],
      ukrainian: [
        {
          name: "Borscht & Pampushky",
          price: "from $16",
          text: "Насыщенный борщ, зелень, сметана и чесночные пампушки в домашнем стиле.",
          tags: ["classic", "warm", "vegetarian option"],
        },
        {
          name: "Varenyky Platter",
          price: "from $24",
          text: "Вареники с картофелем, творогом или вишней, подаются с луком, сметаной и зеленью.",
          tags: ["handmade", "share", "comfort"],
        },
        {
          name: "Holubtsi Tray",
          price: "from $42",
          text: "Голубцы с нежной начинкой, томатным соусом и зеленью. Подходит для семейного стола.",
          tags: ["tray", "family", "slow cooked"],
        },
        {
          name: "Eastern European Salads",
          price: "from $18",
          text: "Оливье, винегрет, свекольный салат, свежие сезонные варианты для закусочного стола.",
          tags: ["salads", "party", "seasonal"],
        },
      ],
      caucasus: [
        {
          name: "Khachapuri & Greens",
          price: "from $28",
          text: "Сырная выпечка, зелень, свежие овощи, соусы и лимон для яркого общего стола.",
          tags: ["baked", "cheese", "share"],
        },
        {
          name: "Dolma Plate",
          price: "from $32",
          text: "Долма с травами, йогуртовым соусом, гранатом и свежей зеленью.",
          tags: ["herbs", "yogurt sauce", "small bites"],
        },
        {
          name: "Mediterranean Vegetable Tray",
          price: "from $38",
          text: "Запеченные овощи, табуле, оливки, соусы, зелень и теплый хлеб.",
          tags: ["vegetarian", "bright", "events"],
        },
        {
          name: "Grill & Pilaf Set",
          price: "from $76",
          text: "Гриль, ароматный рис, овощи и соусы для насыщенного ужина.",
          tags: ["dinner", "rich", "family"],
        },
      ],
      asian: [
        {
          name: "Homemade Dumplings",
          price: "from $26",
          text: "Дамплинги с сочной начинкой, соусом, кунжутом, зеленью и легкой остротой.",
          tags: ["handmade", "sauce", "share"],
        },
        {
          name: "Noodles & Vegetables",
          price: "from $19",
          text: "Лапша с овощами, травами, кунжутом и сбалансированным домашним соусом.",
          tags: ["wok style", "fresh", "comfort"],
        },
        {
          name: "Rice Bowl Set",
          price: "from $18",
          text: "Рис, овощи, белок на выбор, свежие огурцы, соус и хрустящие акценты.",
          tags: ["balanced", "lunch", "custom"],
        },
        {
          name: "Asian Party Bites",
          price: "from $48",
          text: "Мини-закуски, салаты, соусы и теплые блюда для дружеской встречи.",
          tags: ["party", "finger food", "pre-order"],
        },
      ],
    },
  },
  uk: {
    nav: {
      menu: "Меню",
      delivery: "Доставка",
      about: "Про нас",
      order: "Замовити",
    },
    actions: {
      orderAria: "Почати замовлення",
      orderWhatsapp: "Замовити у WhatsApp",
      viewMenu: "Дивитися меню",
    },
    hero: {
      eyebrow: "Домашня їжа на замовлення",
      lede:
        "Тепла домашня кухня Східної Європи, України, Азії, Кавказу та Середземномор'я для вашого столу в Miami та Hallandale.",
      metaOne: "Доставка і самовивіз",
      metaTwo: "Передзамовлення від 24 годин",
      metaThree: "Сімейні сети та свята",
    },
    strip: {
      area: "Miami, Hallandale і поруч",
      fresh: "Готуємо до вашого часу",
      private: "Домашній формат, ресторанна подача",
    },
    menu: {
      kicker: "Кухні",
      title: "Меню, яке збирає родину за одним столом",
      subtitle:
        "Тимчасова структура меню вже готова для запуску. Пізніше можна замінити позиції, ціни та фотографії на ваші реальні страви.",
      tabs: {
        family: "Сімейні сети",
        ukrainian: "Українське",
        caucasus: "Кавказ і Середземномор'я",
        asian: "Азійське",
      },
    },
    cuisine: {
      ukrainianLabel: "Українська та східноєвропейська",
      ukrainianTitle: "Борщ, вареники, голубці, домашні салати",
      caucasusLabel: "Кавказ і Середземномор'я",
      caucasusTitle: "Хачапурі, долма, гриль, овочі, соуси",
      asianLabel: "Азійська домашня кухня",
      asianTitle: "Дамплінги, локшина, рис, свіжі закуски",
    },
    service: {
      kicker: "Формат",
      title: "Готуємо як удома, подаємо як для гостей",
      copy:
        "Mama's Table підходить для сімейної вечері, дня народження, зустрічі друзів, невеликого офісу або спокійного недільного обіду без готування.",
      stepOneTitle: "Оберіть стиль столу",
      stepOneCopy: "Сети, окремі страви або індивідуальне меню під подію.",
      stepTwoTitle: "Залиште заявку",
      stepTwoCopy: "Через форму, WhatsApp або Instagram. Ми уточнимо деталі й час.",
      stepThreeTitle: "Отримайте свіжу їжу",
      stepThreeCopy: "Доставка районом або зручний самовивіз.",
    },
    delivery: {
      kicker: "Зона роботи",
      title: "Miami, Hallandale і сусідні райони",
      copy:
        "Доставка і самовивіз доступні за попереднім замовленням. Для великих сетів і свят краще бронювати дату заздалегідь.",
      cta: "Перевірити доставку",
      pickup: "Хочу самовивіз",
      areas: ["Miami", "Hallandale Beach", "Sunny Isles", "Aventura", "Hollywood", "North Miami", "Bal Harbour", "Surfside"],
    },
    about: {
      kicker: "Про бренд",
      title: "Їжа з характером, теплом і великим столом",
      copyOne:
        "Це не масовий кейтеринг. Це домашня кухня, де страви готуються невеликими партіями, з простими продуктами та повагою до традицій.",
      copyTwo:
        "В одному меню зустрічаються український борщ, кавказькі сири та зелень, середземноморські овочі й азійські акценти.",
      signature: "made for generous homes",
    },
    order: {
      kicker: "Заявка",
      title: "Розкажіть, який стіл потрібен",
      copy:
        "Заповніть коротку форму, і ми підготуємо повідомлення для WhatsApp. Можна замовити сімейну вечерю, набір страв або стіл під подію.",
    },
    form: {
      name: "Ім'я",
      namePlaceholder: "Ваше ім'я",
      phone: "Телефон або WhatsApp",
      phonePlaceholder: "+1...",
      area: "Район",
      areaPlaceholder: "Miami, Hallandale...",
      date: "Дата і час",
      datePlaceholder: "Наприклад: Saturday, 6 PM",
      guests: "Кількість гостей",
      style: "Що хочеться?",
      notes: "Коментар",
      notesPlaceholder: "Алергії, улюблені страви, формат події...",
      submit: "Підготувати замовлення",
      status: "Повідомлення підготовлено. Відкриваємо WhatsApp.",
      fallback: "Повідомлення підготовлено. Якщо WhatsApp не відкрився, натисніть кнопку WhatsApp вище.",
      styles: {
        family: "Сімейний стіл",
        ukrainian: "Українське / Східноєвропейське",
        caucasus: "Кавказ / Середземномор'я",
        asian: "Азійський стіл",
        custom: "Індивідуальна подія",
      },
    },
    footer: {
      tagline: "Homemade food for Miami & Hallandale",
      top: "Нагору",
    },
    menuItems: null,
  },
  en: {
    nav: {
      menu: "Menu",
      delivery: "Delivery",
      about: "About",
      order: "Order",
    },
    actions: {
      orderAria: "Start an order",
      orderWhatsapp: "Order on WhatsApp",
      viewMenu: "View menu",
    },
    hero: {
      eyebrow: "Homemade food to order",
      lede:
        "Warm homemade Eastern European, Ukrainian, Asian, Caucasian, and Mediterranean food for your table in Miami and Hallandale.",
      metaOne: "Delivery and pickup",
      metaTwo: "24-hour pre-order",
      metaThree: "Family sets and events",
    },
    strip: {
      area: "Miami, Hallandale and nearby",
      fresh: "Cooked for your time",
      private: "Homemade feel, polished table",
    },
    menu: {
      kicker: "Cuisines",
      title: "A menu made for gathering around one table",
      subtitle:
        "The launch menu structure is ready. Real dishes, prices, and photos can be swapped in later.",
      tabs: {
        family: "Family sets",
        ukrainian: "Ukrainian",
        caucasus: "Caucasus & Mediterranean",
        asian: "Asian",
      },
    },
    cuisine: {
      ukrainianLabel: "Ukrainian and Eastern European",
      ukrainianTitle: "Borscht, varenyky, holubtsi, homemade salads",
      caucasusLabel: "Caucasus and Mediterranean",
      caucasusTitle: "Khachapuri, dolma, grill, vegetables, sauces",
      asianLabel: "Asian homemade food",
      asianTitle: "Dumplings, noodles, rice, fresh small plates",
    },
    service: {
      kicker: "Format",
      title: "Cooked like home, styled for guests",
      copy:
        "Mama's Table works for family dinners, birthdays, friend gatherings, small offices, and slow Sunday lunches without the cooking.",
      stepOneTitle: "Choose your table style",
      stepOneCopy: "Sets, separate dishes, or a custom event menu.",
      stepTwoTitle: "Send a request",
      stepTwoCopy: "Use the form, WhatsApp, or Instagram. We will confirm details and timing.",
      stepThreeTitle: "Receive fresh food",
      stepThreeCopy: "Local delivery or convenient pickup.",
    },
    delivery: {
      kicker: "Service area",
      title: "Miami, Hallandale and nearby neighborhoods",
      copy:
        "Delivery and pickup are available by pre-order. Larger sets and events are best booked in advance.",
      cta: "Check delivery",
      pickup: "I prefer pickup",
      areas: ["Miami", "Hallandale Beach", "Sunny Isles", "Aventura", "Hollywood", "North Miami", "Bal Harbour", "Surfside"],
    },
    about: {
      kicker: "About",
      title: "Food with character, warmth, and a generous table",
      copyOne:
        "This is not mass catering. It is homemade food cooked in small batches, with familiar ingredients and respect for tradition.",
      copyTwo:
        "One menu can bring together Ukrainian borscht, Caucasian cheeses and herbs, Mediterranean vegetables, and Asian accents.",
      signature: "made for generous homes",
    },
    order: {
      kicker: "Request",
      title: "Tell us what kind of table you need",
      copy:
        "Fill out the short form and we will prepare a WhatsApp message. Order a family dinner, a set of dishes, or a table for an event.",
    },
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      phone: "Phone or WhatsApp",
      phonePlaceholder: "+1...",
      area: "Area",
      areaPlaceholder: "Miami, Hallandale...",
      date: "Date and time",
      datePlaceholder: "Example: Saturday, 6 PM",
      guests: "Guests",
      style: "What sounds good?",
      notes: "Notes",
      notesPlaceholder: "Allergies, favorite dishes, event format...",
      submit: "Prepare order",
      status: "Message prepared. Opening WhatsApp.",
      fallback: "Message prepared. If WhatsApp did not open, use the WhatsApp button above.",
      styles: {
        family: "Family Table",
        ukrainian: "Ukrainian / Eastern European",
        caucasus: "Caucasus / Mediterranean",
        asian: "Asian Table",
        custom: "Custom Event",
      },
    },
    footer: {
      tagline: "Homemade food for Miami & Hallandale",
      top: "Back to top",
    },
    menuItems: {
      family: [
        {
          name: "Mama's Family Table",
          price: "from $89",
          text: "A generous homemade set with hot dishes, salads, small plates, sauces, and bread.",
          tags: ["4-6 guests", "pre-order", "best start"],
        },
        {
          name: "Celebration Table",
          price: "from $180",
          text: "A festive table with several cuisines, family-style platters, and seasonal additions.",
          tags: ["events", "custom", "large table"],
        },
        {
          name: "Sunday Comfort Box",
          price: "from $54",
          text: "A ready homemade dinner: main dish, salad, side, and dessert.",
          tags: ["2-3 guests", "comfort", "pickup"],
        },
        {
          name: "Office Lunch Set",
          price: "from $15 pp",
          text: "A satisfying lunch for a small team: salads, mains, rice or potatoes, and sauces.",
          tags: ["teams", "delivery", "balanced"],
        },
      ],
      ukrainian: [
        {
          name: "Borscht & Pampushky",
          price: "from $16",
          text: "Rich borscht with herbs, sour cream, and garlic pampushky.",
          tags: ["classic", "warm", "vegetarian option"],
        },
        {
          name: "Varenyky Platter",
          price: "from $24",
          text: "Handmade varenyky with potato, farmer cheese, or cherry, served with onion and sour cream.",
          tags: ["handmade", "share", "comfort"],
        },
        {
          name: "Holubtsi Tray",
          price: "from $42",
          text: "Tender cabbage rolls with tomato sauce and herbs, made for the family table.",
          tags: ["tray", "family", "slow cooked"],
        },
        {
          name: "Eastern European Salads",
          price: "from $18",
          text: "Olivier, beet salad, vinaigrette, and fresh seasonal options for appetizer tables.",
          tags: ["salads", "party", "seasonal"],
        },
      ],
      caucasus: [
        {
          name: "Khachapuri & Greens",
          price: "from $28",
          text: "Cheese bread with herbs, fresh vegetables, sauces, and lemon.",
          tags: ["baked", "cheese", "share"],
        },
        {
          name: "Dolma Plate",
          price: "from $32",
          text: "Dolma with herbs, yogurt sauce, pomegranate, and fresh greens.",
          tags: ["herbs", "yogurt sauce", "small bites"],
        },
        {
          name: "Mediterranean Vegetable Tray",
          price: "from $38",
          text: "Roasted vegetables, tabbouleh, olives, sauces, greens, and warm bread.",
          tags: ["vegetarian", "bright", "events"],
        },
        {
          name: "Grill & Pilaf Set",
          price: "from $76",
          text: "Grilled dishes, fragrant rice, vegetables, and sauces for a full dinner.",
          tags: ["dinner", "rich", "family"],
        },
      ],
      asian: [
        {
          name: "Homemade Dumplings",
          price: "from $26",
          text: "Juicy dumplings with sauce, sesame, herbs, and a gentle chili note.",
          tags: ["handmade", "sauce", "share"],
        },
        {
          name: "Noodles & Vegetables",
          price: "from $19",
          text: "Noodles with vegetables, herbs, sesame, and a balanced homemade sauce.",
          tags: ["wok style", "fresh", "comfort"],
        },
        {
          name: "Rice Bowl Set",
          price: "from $18",
          text: "Rice, vegetables, your protein choice, fresh cucumber, sauce, and crunchy accents.",
          tags: ["balanced", "lunch", "custom"],
        },
        {
          name: "Asian Party Bites",
          price: "from $48",
          text: "Small bites, salads, sauces, and warm dishes for friend gatherings.",
          tags: ["party", "finger food", "pre-order"],
        },
      ],
    },
  },
};

copy.uk.menuItems = {
  family: [
    {
      name: "Mama's Family Table",
      price: "from $89",
      text: "Великий домашній сет: гаряче, салати, закуски, соуси та хліб для затишного вечора.",
      tags: ["4-6 guests", "pre-order", "best start"],
    },
    {
      name: "Celebration Table",
      price: "from $180",
      text: "Святковий стіл із кількома кухнями, подачею на спільних блюдах і сезонними додатками.",
      tags: ["events", "custom", "large table"],
    },
    {
      name: "Sunday Comfort Box",
      price: "from $54",
      text: "Готова домашня вечеря без зайвих рішень: основна страва, салат, гарнір і десерт.",
      tags: ["2-3 guests", "comfort", "pickup"],
    },
    {
      name: "Office Lunch Set",
      price: "from $15 pp",
      text: "Ситний ланч для невеликої команди: салати, гарячі страви, рис або картопля, соуси.",
      tags: ["teams", "delivery", "balanced"],
    },
  ],
  ukrainian: [
    {
      name: "Borscht & Pampushky",
      price: "from $16",
      text: "Насичений борщ, зелень, сметана та часникові пампушки в домашньому стилі.",
      tags: ["classic", "warm", "vegetarian option"],
    },
    {
      name: "Varenyky Platter",
      price: "from $24",
      text: "Вареники з картоплею, сиром або вишнею, подаються з цибулею, сметаною та зеленню.",
      tags: ["handmade", "share", "comfort"],
    },
    {
      name: "Holubtsi Tray",
      price: "from $42",
      text: "Голубці з ніжною начинкою, томатним соусом і зеленню. Добре підходить для сімейного столу.",
      tags: ["tray", "family", "slow cooked"],
    },
    {
      name: "Eastern European Salads",
      price: "from $18",
      text: "Олів'є, вінегрет, буряковий салат і свіжі сезонні варіанти для закусочного столу.",
      tags: ["salads", "party", "seasonal"],
    },
  ],
  caucasus: [
    {
      name: "Khachapuri & Greens",
      price: "from $28",
      text: "Сирна випічка, зелень, свіжі овочі, соуси та лимон для яскравого спільного столу.",
      tags: ["baked", "cheese", "share"],
    },
    {
      name: "Dolma Plate",
      price: "from $32",
      text: "Долма з травами, йогуртовим соусом, гранатом і свіжою зеленню.",
      tags: ["herbs", "yogurt sauce", "small bites"],
    },
    {
      name: "Mediterranean Vegetable Tray",
      price: "from $38",
      text: "Запечені овочі, табуле, оливки, соуси, зелень і теплий хліб.",
      tags: ["vegetarian", "bright", "events"],
    },
    {
      name: "Grill & Pilaf Set",
      price: "from $76",
      text: "Гриль, ароматний рис, овочі та соуси для насиченої вечері.",
      tags: ["dinner", "rich", "family"],
    },
  ],
  asian: [
    {
      name: "Homemade Dumplings",
      price: "from $26",
      text: "Дамплінги із соковитою начинкою, соусом, кунжутом, зеленню та легкою гостринкою.",
      tags: ["handmade", "sauce", "share"],
    },
    {
      name: "Noodles & Vegetables",
      price: "from $19",
      text: "Локшина з овочами, травами, кунжутом і збалансованим домашнім соусом.",
      tags: ["wok style", "fresh", "comfort"],
    },
    {
      name: "Rice Bowl Set",
      price: "from $18",
      text: "Рис, овочі, білок на вибір, свіжі огірки, соус і хрусткі акценти.",
      tags: ["balanced", "lunch", "custom"],
    },
    {
      name: "Asian Party Bites",
      price: "from $48",
      text: "Міні-закуски, салати, соуси та теплі страви для дружньої зустрічі.",
      tags: ["party", "finger food", "pre-order"],
    },
  ],
};

let state = {
  lang: "ru",
  menuTab: "family",
};

const getText = (path) => {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), copy[state.lang]);
};

const encodeOrder = (form) => {
  const data = new FormData(form);
  const labels = copy[state.lang].form;
  const styleLabel = labels.styles[data.get("style")] || data.get("style") || "";
  const lines = [
    "Mama's Table order",
    `${labels.name}: ${data.get("name") || ""}`,
    `${labels.phone}: ${data.get("phone") || ""}`,
    `${labels.area}: ${data.get("area") || ""}`,
    `${labels.date}: ${data.get("date") || ""}`,
    `${labels.guests}: ${data.get("guests") || ""}`,
    `${labels.style}: ${styleLabel}`,
    `${labels.notes}: ${data.get("notes") || ""}`,
  ];

  return encodeURIComponent(lines.filter(Boolean).join("\n"));
};

const whatsappUrl = (message = "Hello Mama's Table, I would like to place an order.") => {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
};

const renderMenu = () => {
  const tabs = document.querySelectorAll("[data-menu-tab]");
  tabs.forEach((button) => {
    const key = button.dataset.menuTab;
    button.textContent = copy[state.lang].menu.tabs[key];
    button.classList.toggle("is-active", key === state.menuTab);
    button.setAttribute("aria-selected", key === state.menuTab ? "true" : "false");
  });

  const list = document.querySelector("[data-menu-list]");
  const items = copy[state.lang].menuItems[state.menuTab];
  list.innerHTML = items
    .map(
      (item) => `
        <article class="menu-item">
          <header>
            <h3>${item.name}</h3>
            <span class="menu-price">${item.price}</span>
          </header>
          <p>${item.text}</p>
          <div class="menu-tags">
            ${item.tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
        </article>
      `,
    )
    .join("");
};

const renderAreas = () => {
  const list = document.querySelector("[data-area-list]");
  list.innerHTML = copy[state.lang].delivery.areas.map((area) => `<div class="area-pill">${area}</div>`).join("");
};

const renderStyleOptions = () => {
  const select = document.querySelector("[data-style-select]");
  const currentValue = select.value || "family";
  const styles = copy[state.lang].form.styles;
  select.innerHTML = Object.entries(styles)
    .map(([value, label]) => `<option value="${value}">${label}</option>`)
    .join("");
  select.value = styles[currentValue] ? currentValue : "family";
};

const applyLanguage = () => {
  document.documentElement.lang = state.lang === "uk" ? "uk" : state.lang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = getText(element.dataset.i18n);
    if (value) element.textContent = value;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const value = getText(element.dataset.i18nPlaceholder);
    if (value) element.setAttribute("placeholder", value);
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const value = getText(element.dataset.i18nAria);
    if (value) element.setAttribute("aria-label", value);
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === state.lang);
  });

  renderMenu();
  renderAreas();
  renderStyleOptions();
};

const setupLinks = () => {
  document.querySelector("[data-whatsapp-link]").href = whatsappUrl();
  document.querySelector("[data-instagram-link]").href = BUSINESS.instagramUrl;
};

const setupHeader = () => {
  const header = document.querySelector("[data-header]");
  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  update();
  window.addEventListener("scroll", update, { passive: true });
};

const setupInteractions = () => {
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      state.lang = button.dataset.lang;
      applyLanguage();
    });
  });

  document.querySelectorAll("[data-menu-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.menuTab = button.dataset.menuTab;
      renderMenu();
    });
  });

  document.querySelector("[data-order-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const message = encodeOrder(form);
    const url = `https://wa.me/${BUSINESS.whatsappNumber}?text=${message}`;
    const status = document.querySelector("[data-form-status]");
    status.textContent = copy[state.lang].form.status;
    window.open(url, "_blank", "noopener,noreferrer");

    window.setTimeout(() => {
      status.textContent = copy[state.lang].form.fallback;
    }, 900);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setupLinks();
  setupHeader();
  setupInteractions();
  applyLanguage();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
