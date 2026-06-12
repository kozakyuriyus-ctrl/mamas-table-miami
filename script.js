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
        "Выберите кухню: откроются первые блюда, вторые, закуски, выпечка и сеты. Позиции временные, но собраны как полноценный стартовый ассортимент.",
      tabs: {
        all: "Топ блюд",
        ukrainian: "Украинская еда",
        caucasus: "Кавказская еда",
        mediterranean: "Средиземноморская",
        asian: "Азиатская еда",
      },
    },
    cuisine: {
      ukrainianLabel: "Украинская и восточноевропейская",
      ukrainianTitle: "Борщ, вареники, голубцы, домашние салаты",
      ukrainianAria: "Открыть меню украинской кухни",
      caucasusLabel: "Кавказская кухня",
      caucasusTitle: "Хачапури, долма, хинкали, гриль, зелень",
      caucasusAria: "Открыть меню кавказской кухни",
      mediterraneanLabel: "Средиземноморская кухня",
      mediterraneanTitle: "Мезе, салаты, овощи, хумус, теплый хлеб",
      mediterraneanAria: "Открыть меню средиземноморской кухни",
      asianLabel: "Азиатская домашняя кухня",
      asianTitle: "Дамплинги, лапша, рис, свежие закуски",
      asianAria: "Открыть меню азиатской кухни",
      openMenu: "Открыть меню",
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
        caucasus: "Кавказская кухня",
        mediterranean: "Средиземноморская кухня",
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
        "Оберіть кухню: відкриються перші страви, другі, закуски, випічка та сети. Позиції тимчасові, але зібрані як повноцінний стартовий асортимент.",
      tabs: {
        all: "Топ страв",
        ukrainian: "Українська їжа",
        caucasus: "Кавказька їжа",
        mediterranean: "Середземноморська",
        asian: "Азійська їжа",
      },
    },
    cuisine: {
      ukrainianLabel: "Українська та східноєвропейська",
      ukrainianTitle: "Борщ, вареники, голубці, домашні салати",
      ukrainianAria: "Відкрити меню української кухні",
      caucasusLabel: "Кавказька кухня",
      caucasusTitle: "Хачапурі, долма, хінкалі, гриль, зелень",
      caucasusAria: "Відкрити меню кавказької кухні",
      mediterraneanLabel: "Середземноморська кухня",
      mediterraneanTitle: "Мезе, салати, овочі, хумус, теплий хліб",
      mediterraneanAria: "Відкрити меню середземноморської кухні",
      asianLabel: "Азійська домашня кухня",
      asianTitle: "Дамплінги, локшина, рис, свіжі закуски",
      asianAria: "Відкрити меню азійської кухні",
      openMenu: "Відкрити меню",
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
        caucasus: "Кавказька кухня",
        mediterranean: "Середземноморська кухня",
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
        "Choose a cuisine to open first courses, mains, appetizers, baked dishes, and family sets. These are launch-ready sample items.",
      tabs: {
        all: "Top dishes",
        ukrainian: "Ukrainian food",
        caucasus: "Caucasian food",
        mediterranean: "Mediterranean",
        asian: "Asian food",
      },
    },
    cuisine: {
      ukrainianLabel: "Ukrainian and Eastern European",
      ukrainianTitle: "Borscht, varenyky, holubtsi, homemade salads",
      ukrainianAria: "Open Ukrainian food menu",
      caucasusLabel: "Caucasian food",
      caucasusTitle: "Khachapuri, dolma, khinkali, grill, herbs",
      caucasusAria: "Open Caucasian food menu",
      mediterraneanLabel: "Mediterranean food",
      mediterraneanTitle: "Mezze, salads, vegetables, hummus, warm bread",
      mediterraneanAria: "Open Mediterranean food menu",
      asianLabel: "Asian homemade food",
      asianTitle: "Dumplings, noodles, rice, fresh small plates",
      asianAria: "Open Asian food menu",
      openMenu: "Open menu",
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
        caucasus: "Caucasian food",
        mediterranean: "Mediterranean food",
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

copy.ru.menuItems = {
  all: [
    {
      kind: "Первое",
      name: "Борщ с пампушками",
      price: "от $16",
      text: "Глубокий украинский борщ со сметаной, зеленью и чесночными пампушками.",
      tags: ["украинская", "горячее", "топ"],
    },
    {
      kind: "Второе",
      name: "Вареники ассорти",
      price: "от $24",
      text: "Картофель, творог, вишня или сезонная начинка, подача с луком, маслом и сметаной.",
      tags: ["ручная лепка", "семейное", "comfort"],
    },
    {
      kind: "Выпечка",
      name: "Хачапури по-аджарски",
      price: "от $28",
      text: "Теплая сырная лодочка с мягким тестом, зеленью и насыщенной домашней подачей.",
      tags: ["кавказ", "сыр", "share"],
    },
    {
      kind: "Второе",
      name: "Долма с йогуртовым соусом",
      price: "от $32",
      text: "Виноградные листья с нежной начинкой, зеленью, гранатом и прохладным соусом.",
      tags: ["кавказ", "закуска", "herbs"],
    },
    {
      kind: "Закуски",
      name: "Средиземноморский мезе-сет",
      price: "от $42",
      text: "Хумус, табуле, оливки, овощи, соусы и теплый хлеб для легкого общего стола.",
      tags: ["мезе", "vegetarian", "party"],
    },
    {
      kind: "Второе",
      name: "Дамплинги и лапша",
      price: "от $34",
      text: "Домашние дамплинги, овощная лапша, огуречный салат и соусы в азиатском стиле.",
      tags: ["азиатская", "share", "sauce"],
    },
    {
      kind: "Сет",
      name: "Mama's Family Table",
      price: "от $89",
      text: "Готовый семейный стол из первых, вторых, закусок и соусов под ваш вечер.",
      tags: ["4-6 гостей", "предзаказ", "best start"],
    },
    {
      kind: "Второе",
      name: "Гриль, плов и овощи",
      price: "от $76",
      text: "Ароматный рис, домашний гриль, запеченные овощи, зелень и несколько соусов.",
      tags: ["сытно", "семья", "ужин"],
    },
  ],
  ukrainian: [
    {
      kind: "Первое",
      name: "Красный борщ",
      price: "от $16",
      text: "Классический борщ с насыщенным бульоном, свеклой, капустой, зеленью и сметаной.",
      tags: ["первое", "classic", "warm"],
    },
    {
      kind: "Первое",
      name: "Домашний куриный суп",
      price: "от $14",
      text: "Легкий бульон с курицей, овощами, зеленью и лапшой или картофелем.",
      tags: ["легко", "детям", "comfort"],
    },
    {
      kind: "Второе",
      name: "Вареники с картофелем",
      price: "от $22",
      text: "Мягкое тесто, картофельная начинка, жареный лук, масло и сметана.",
      tags: ["ручная лепка", "семейное", "подача"],
    },
    {
      kind: "Второе",
      name: "Голубцы в томатном соусе",
      price: "от $42",
      text: "Нежные голубцы с рисом и мясом, медленно томленные в домашнем соусе.",
      tags: ["tray", "slow cooked", "family"],
    },
    {
      kind: "Второе",
      name: "Котлета по-киевски",
      price: "от $24",
      text: "Хрустящая корочка, сочная курица, ароматное масло внутри и картофельный гарнир.",
      tags: ["premium", "main", "crispy"],
    },
    {
      kind: "Закуски",
      name: "Салатный стол",
      price: "от $18",
      text: "Оливье, винегрет, свекольный салат, соленья и свежие сезонные добавки.",
      tags: ["праздник", "закуски", "seasonal"],
    },
  ],
  caucasus: [
    {
      kind: "Первое",
      name: "Харчо",
      price: "от $18",
      text: "Пряный суп с рисом, томатом, зеленью, чесноком и глубоким домашним вкусом.",
      tags: ["первое", "spiced", "warm"],
    },
    {
      kind: "Второе",
      name: "Хинкали",
      price: "от $28",
      text: "Сочные хинкали с мясной или сырной начинкой, зеленью и перцем.",
      tags: ["ручная лепка", "juicy", "share"],
    },
    {
      kind: "Выпечка",
      name: "Хачапури",
      price: "от $28",
      text: "Домашняя сырная выпечка с золотистой корочкой, мягкой серединой и зеленью.",
      tags: ["сыр", "baked", "favorite"],
    },
    {
      kind: "Второе",
      name: "Чахохбили",
      price: "от $36",
      text: "Курица в томатах, зелени, чесноке и специях, подается с рисом или хлебом.",
      tags: ["main", "sauce", "herbs"],
    },
    {
      kind: "Закуски",
      name: "Долма",
      price: "от $32",
      text: "Виноградные листья с начинкой, йогуртовый соус, гранат и свежая зелень.",
      tags: ["small bites", "yogurt", "greens"],
    },
    {
      kind: "Второе",
      name: "Гриль-сет",
      price: "от $76",
      text: "Мясо или курица на гриле, овощи, рис, лаваш, зелень и домашние соусы.",
      tags: ["family", "dinner", "grill"],
    },
  ],
  mediterranean: [
    {
      kind: "Первое",
      name: "Чечевичный суп",
      price: "от $15",
      text: "Теплый суп с чечевицей, овощами, лимоном, оливковым маслом и зеленью.",
      tags: ["первое", "light", "vegetarian"],
    },
    {
      kind: "Закуски",
      name: "Хумус и мезе",
      price: "от $24",
      text: "Хумус, овощи, оливки, соусы, свежие травы и теплый хлеб для подачи в центр стола.",
      tags: ["мезе", "share", "fresh"],
    },
    {
      kind: "Салат",
      name: "Греческий салат",
      price: "от $18",
      text: "Огурцы, томаты, фета, оливки, зелень и оливковое масло.",
      tags: ["fresh", "salad", "classic"],
    },
    {
      kind: "Второе",
      name: "Мусака",
      price: "от $38",
      text: "Запеченные баклажаны, мясной или овощной слой, нежный соус и сырная корочка.",
      tags: ["baked", "main", "rich"],
    },
    {
      kind: "Второе",
      name: "Сувлаки с овощами",
      price: "от $34",
      text: "Курица или овощи, теплый хлеб, салат, лимон и йогуртовый соус.",
      tags: ["main", "grill", "bright"],
    },
    {
      kind: "Второе",
      name: "Запеченные овощи и табуле",
      price: "от $32",
      text: "Баклажан, перец, цукини, табуле, зелень и цитрусовая заправка.",
      tags: ["vegetarian", "tray", "events"],
    },
  ],
  asian: [
    {
      kind: "Первое",
      name: "Том-ям в домашнем стиле",
      price: "от $19",
      text: "Ароматный кисло-острый суп с грибами, овощами, травами и белком на выбор.",
      tags: ["первое", "spicy", "bright"],
    },
    {
      kind: "Первое",
      name: "Рамен-бульон",
      price: "от $18",
      text: "Теплый бульон с лапшой, яйцом, зеленью и овощами.",
      tags: ["noodles", "warm", "comfort"],
    },
    {
      kind: "Второе",
      name: "Домашние дамплинги",
      price: "от $26",
      text: "Сочные дамплинги с соусом, кунжутом, зеленым луком и легким чили.",
      tags: ["ручная лепка", "sauce", "share"],
    },
    {
      kind: "Второе",
      name: "Лапша с овощами",
      price: "от $19",
      text: "Лапша с овощами, зеленью, кунжутом и сбалансированным домашним соусом.",
      tags: ["wok style", "fresh", "main"],
    },
    {
      kind: "Второе",
      name: "Жареный рис",
      price: "от $18",
      text: "Рис с овощами, яйцом или белком на выбор, зеленью и соусом.",
      tags: ["rice", "lunch", "custom"],
    },
    {
      kind: "Закуски",
      name: "Азиатские закуски",
      price: "от $42",
      text: "Огуречный салат, спринг-роллы, соусы, зелень и небольшие теплые блюда.",
      tags: ["party", "small bites", "fresh"],
    },
  ],
};

copy.uk.menuItems = {
  all: [
    {
      kind: "Перша страва",
      name: "Борщ із пампушками",
      price: "від $16",
      text: "Глибокий український борщ зі сметаною, зеленню та часниковими пампушками.",
      tags: ["українська", "гаряче", "топ"],
    },
    {
      kind: "Друга страва",
      name: "Вареники асорті",
      price: "від $24",
      text: "Картопля, сир, вишня або сезонна начинка, подача з цибулею, маслом і сметаною.",
      tags: ["ручна ліпка", "сімейне", "comfort"],
    },
    {
      kind: "Випічка",
      name: "Хачапурі по-аджарськи",
      price: "від $28",
      text: "Теплий сирний човник із м'яким тістом, зеленню та щедрою домашньою подачею.",
      tags: ["кавказ", "сир", "share"],
    },
    {
      kind: "Друга страва",
      name: "Долма з йогуртовим соусом",
      price: "від $32",
      text: "Виноградне листя з ніжною начинкою, зеленню, гранатом і прохолодним соусом.",
      tags: ["кавказ", "закуска", "herbs"],
    },
    {
      kind: "Закуски",
      name: "Середземноморський мезе-сет",
      price: "від $42",
      text: "Хумус, табуле, оливки, овочі, соуси та теплий хліб для легкого спільного столу.",
      tags: ["мезе", "vegetarian", "party"],
    },
    {
      kind: "Друга страва",
      name: "Дамплінги і локшина",
      price: "від $34",
      text: "Домашні дамплінги, овочева локшина, огірковий салат і соуси в азійському стилі.",
      tags: ["азійська", "share", "sauce"],
    },
    {
      kind: "Сет",
      name: "Mama's Family Table",
      price: "від $89",
      text: "Готовий сімейний стіл із перших, других, закусок і соусів під ваш вечір.",
      tags: ["4-6 гостей", "передзамовлення", "best start"],
    },
    {
      kind: "Друга страва",
      name: "Гриль, плов і овочі",
      price: "від $76",
      text: "Ароматний рис, домашній гриль, запечені овочі, зелень і кілька соусів.",
      tags: ["ситно", "родина", "вечеря"],
    },
  ],
  ukrainian: [
    {
      kind: "Перша страва",
      name: "Червоний борщ",
      price: "від $16",
      text: "Класичний борщ із насиченим бульйоном, буряком, капустою, зеленню та сметаною.",
      tags: ["перше", "classic", "warm"],
    },
    {
      kind: "Перша страва",
      name: "Домашній курячий суп",
      price: "від $14",
      text: "Легкий бульйон із куркою, овочами, зеленню та локшиною або картоплею.",
      tags: ["легко", "дітям", "comfort"],
    },
    {
      kind: "Друга страва",
      name: "Вареники з картоплею",
      price: "від $22",
      text: "М'яке тісто, картопляна начинка, смажена цибуля, масло та сметана.",
      tags: ["ручна ліпка", "сімейне", "подача"],
    },
    {
      kind: "Друга страва",
      name: "Голубці в томатному соусі",
      price: "від $42",
      text: "Ніжні голубці з рисом і м'ясом, повільно томлені в домашньому соусі.",
      tags: ["tray", "slow cooked", "family"],
    },
    {
      kind: "Друга страва",
      name: "Котлета по-київськи",
      price: "від $24",
      text: "Хрустка скоринка, соковита курка, ароматне масло всередині та картопляний гарнір.",
      tags: ["premium", "main", "crispy"],
    },
    {
      kind: "Закуски",
      name: "Салатний стіл",
      price: "від $18",
      text: "Олів'є, вінегрет, буряковий салат, соління та свіжі сезонні додатки.",
      tags: ["свято", "закуски", "seasonal"],
    },
  ],
  caucasus: [
    {
      kind: "Перша страва",
      name: "Харчо",
      price: "від $18",
      text: "Пряний суп із рисом, томатом, зеленню, часником і глибоким домашнім смаком.",
      tags: ["перше", "spiced", "warm"],
    },
    {
      kind: "Друга страва",
      name: "Хінкалі",
      price: "від $28",
      text: "Соковиті хінкалі з м'ясною або сирною начинкою, зеленню та перцем.",
      tags: ["ручна ліпка", "juicy", "share"],
    },
    {
      kind: "Випічка",
      name: "Хачапурі",
      price: "від $28",
      text: "Домашня сирна випічка із золотистою скоринкою, м'якою серединою та зеленню.",
      tags: ["сир", "baked", "favorite"],
    },
    {
      kind: "Друга страва",
      name: "Чахохбілі",
      price: "від $36",
      text: "Курка в томатах, зелені, часнику та спеціях, подається з рисом або хлібом.",
      tags: ["main", "sauce", "herbs"],
    },
    {
      kind: "Закуски",
      name: "Долма",
      price: "від $32",
      text: "Виноградне листя з начинкою, йогуртовий соус, гранат і свіжа зелень.",
      tags: ["small bites", "yogurt", "greens"],
    },
    {
      kind: "Друга страва",
      name: "Гриль-сет",
      price: "від $76",
      text: "М'ясо або курка на грилі, овочі, рис, лаваш, зелень і домашні соуси.",
      tags: ["family", "dinner", "grill"],
    },
  ],
  mediterranean: [
    {
      kind: "Перша страва",
      name: "Сочевичний суп",
      price: "від $15",
      text: "Теплий суп із сочевицею, овочами, лимоном, оливковою олією та зеленню.",
      tags: ["перше", "light", "vegetarian"],
    },
    {
      kind: "Закуски",
      name: "Хумус і мезе",
      price: "від $24",
      text: "Хумус, овочі, оливки, соуси, свіжі трави та теплий хліб для центру столу.",
      tags: ["мезе", "share", "fresh"],
    },
    {
      kind: "Салат",
      name: "Грецький салат",
      price: "від $18",
      text: "Огірки, томати, фета, оливки, зелень та оливкова олія.",
      tags: ["fresh", "salad", "classic"],
    },
    {
      kind: "Друга страва",
      name: "Мусака",
      price: "від $38",
      text: "Запечені баклажани, м'ясний або овочевий шар, ніжний соус і сирна скоринка.",
      tags: ["baked", "main", "rich"],
    },
    {
      kind: "Друга страва",
      name: "Сувлакі з овочами",
      price: "від $34",
      text: "Курка або овочі, теплий хліб, салат, лимон і йогуртовий соус.",
      tags: ["main", "grill", "bright"],
    },
    {
      kind: "Друга страва",
      name: "Запечені овочі і табуле",
      price: "від $32",
      text: "Баклажан, перець, цукині, табуле, зелень і цитрусова заправка.",
      tags: ["vegetarian", "tray", "events"],
    },
  ],
  asian: [
    {
      kind: "Перша страва",
      name: "Том-ям у домашньому стилі",
      price: "від $19",
      text: "Ароматний кисло-гострий суп із грибами, овочами, травами та білком на вибір.",
      tags: ["перше", "spicy", "bright"],
    },
    {
      kind: "Перша страва",
      name: "Рамен-бульйон",
      price: "від $18",
      text: "Теплий бульйон із локшиною, яйцем, зеленню та овочами.",
      tags: ["noodles", "warm", "comfort"],
    },
    {
      kind: "Друга страва",
      name: "Домашні дамплінги",
      price: "від $26",
      text: "Соковиті дамплінги з соусом, кунжутом, зеленою цибулею та легким чилі.",
      tags: ["ручна ліпка", "sauce", "share"],
    },
    {
      kind: "Друга страва",
      name: "Локшина з овочами",
      price: "від $19",
      text: "Локшина з овочами, зеленню, кунжутом і збалансованим домашнім соусом.",
      tags: ["wok style", "fresh", "main"],
    },
    {
      kind: "Друга страва",
      name: "Смажений рис",
      price: "від $18",
      text: "Рис з овочами, яйцем або білком на вибір, зеленню та соусом.",
      tags: ["rice", "lunch", "custom"],
    },
    {
      kind: "Закуски",
      name: "Азійські закуски",
      price: "від $42",
      text: "Огірковий салат, спринг-роли, соуси, зелень і невеликі теплі страви.",
      tags: ["party", "small bites", "fresh"],
    },
  ],
};

copy.en.menuItems = {
  all: [
    {
      kind: "First course",
      name: "Borscht with Pampushky",
      price: "from $16",
      text: "Deep Ukrainian borscht with sour cream, herbs, and garlic pampushky.",
      tags: ["ukrainian", "warm", "top"],
    },
    {
      kind: "Main",
      name: "Assorted Varenyky",
      price: "from $24",
      text: "Potato, farmer cheese, cherry, or seasonal filling with onion, butter, and sour cream.",
      tags: ["handmade", "family", "comfort"],
    },
    {
      kind: "Baked",
      name: "Adjarian Khachapuri",
      price: "from $28",
      text: "Warm cheese-filled bread with soft dough, herbs, and generous homemade styling.",
      tags: ["caucasian", "cheese", "share"],
    },
    {
      kind: "Main",
      name: "Dolma with Yogurt Sauce",
      price: "from $32",
      text: "Grape leaves with a tender filling, herbs, pomegranate, and cool sauce.",
      tags: ["caucasian", "small bites", "herbs"],
    },
    {
      kind: "Appetizers",
      name: "Mediterranean Mezze Set",
      price: "from $42",
      text: "Hummus, tabbouleh, olives, vegetables, sauces, and warm bread for sharing.",
      tags: ["mezze", "vegetarian", "party"],
    },
    {
      kind: "Main",
      name: "Dumplings & Noodles",
      price: "from $34",
      text: "Homemade dumplings, vegetable noodles, cucumber salad, and Asian-style sauces.",
      tags: ["asian", "share", "sauce"],
    },
    {
      kind: "Set",
      name: "Mama's Family Table",
      price: "from $89",
      text: "A ready family table with soups, mains, appetizers, and sauces for your evening.",
      tags: ["4-6 guests", "pre-order", "best start"],
    },
    {
      kind: "Main",
      name: "Grill, Pilaf & Vegetables",
      price: "from $76",
      text: "Fragrant rice, homemade grill, roasted vegetables, herbs, and several sauces.",
      tags: ["hearty", "family", "dinner"],
    },
  ],
  ukrainian: [
    {
      kind: "First course",
      name: "Red Borscht",
      price: "from $16",
      text: "Classic borscht with rich broth, beet, cabbage, herbs, and sour cream.",
      tags: ["soup", "classic", "warm"],
    },
    {
      kind: "First course",
      name: "Homemade Chicken Soup",
      price: "from $14",
      text: "Light broth with chicken, vegetables, herbs, and noodles or potatoes.",
      tags: ["light", "kids", "comfort"],
    },
    {
      kind: "Main",
      name: "Potato Varenyky",
      price: "from $22",
      text: "Soft dough, potato filling, fried onion, butter, and sour cream.",
      tags: ["handmade", "family", "serve"],
    },
    {
      kind: "Main",
      name: "Holubtsi in Tomato Sauce",
      price: "from $42",
      text: "Tender cabbage rolls with rice and meat, slowly cooked in homemade sauce.",
      tags: ["tray", "slow cooked", "family"],
    },
    {
      kind: "Main",
      name: "Chicken Kyiv",
      price: "from $24",
      text: "Crisp crust, juicy chicken, aromatic butter inside, and a potato side.",
      tags: ["premium", "main", "crispy"],
    },
    {
      kind: "Appetizers",
      name: "Salad Table",
      price: "from $18",
      text: "Olivier, vinaigrette, beet salad, pickles, and fresh seasonal additions.",
      tags: ["holiday", "appetizers", "seasonal"],
    },
  ],
  caucasus: [
    {
      kind: "First course",
      name: "Kharcho",
      price: "from $18",
      text: "Spiced soup with rice, tomato, herbs, garlic, and deep homemade flavor.",
      tags: ["soup", "spiced", "warm"],
    },
    {
      kind: "Main",
      name: "Khinkali",
      price: "from $28",
      text: "Juicy khinkali with meat or cheese filling, herbs, and pepper.",
      tags: ["handmade", "juicy", "share"],
    },
    {
      kind: "Baked",
      name: "Khachapuri",
      price: "from $28",
      text: "Homemade cheese bread with a golden crust, soft center, and herbs.",
      tags: ["cheese", "baked", "favorite"],
    },
    {
      kind: "Main",
      name: "Chakhokhbili",
      price: "from $36",
      text: "Chicken in tomato, herbs, garlic, and spices, served with rice or bread.",
      tags: ["main", "sauce", "herbs"],
    },
    {
      kind: "Appetizers",
      name: "Dolma",
      price: "from $32",
      text: "Grape leaves with filling, yogurt sauce, pomegranate, and fresh herbs.",
      tags: ["small bites", "yogurt", "greens"],
    },
    {
      kind: "Main",
      name: "Grill Set",
      price: "from $76",
      text: "Grilled meat or chicken, vegetables, rice, lavash, herbs, and homemade sauces.",
      tags: ["family", "dinner", "grill"],
    },
  ],
  mediterranean: [
    {
      kind: "First course",
      name: "Lentil Soup",
      price: "from $15",
      text: "Warm lentil soup with vegetables, lemon, olive oil, and herbs.",
      tags: ["soup", "light", "vegetarian"],
    },
    {
      kind: "Appetizers",
      name: "Hummus & Mezze",
      price: "from $24",
      text: "Hummus, vegetables, olives, sauces, fresh herbs, and warm bread for the table.",
      tags: ["mezze", "share", "fresh"],
    },
    {
      kind: "Salad",
      name: "Greek Salad",
      price: "from $18",
      text: "Cucumbers, tomatoes, feta, olives, herbs, and olive oil.",
      tags: ["fresh", "salad", "classic"],
    },
    {
      kind: "Main",
      name: "Moussaka",
      price: "from $38",
      text: "Baked eggplant, meat or vegetable layer, soft sauce, and cheese crust.",
      tags: ["baked", "main", "rich"],
    },
    {
      kind: "Main",
      name: "Souvlaki with Vegetables",
      price: "from $34",
      text: "Chicken or vegetables, warm bread, salad, lemon, and yogurt sauce.",
      tags: ["main", "grill", "bright"],
    },
    {
      kind: "Main",
      name: "Roasted Vegetables & Tabbouleh",
      price: "from $32",
      text: "Eggplant, pepper, zucchini, tabbouleh, herbs, and citrus dressing.",
      tags: ["vegetarian", "tray", "events"],
    },
  ],
  asian: [
    {
      kind: "First course",
      name: "Homestyle Tom Yum",
      price: "from $19",
      text: "Aromatic sour-spicy soup with mushrooms, vegetables, herbs, and protein choice.",
      tags: ["soup", "spicy", "bright"],
    },
    {
      kind: "First course",
      name: "Ramen Broth",
      price: "from $18",
      text: "Warm broth with noodles, egg, herbs, and vegetables.",
      tags: ["noodles", "warm", "comfort"],
    },
    {
      kind: "Main",
      name: "Homemade Dumplings",
      price: "from $26",
      text: "Juicy dumplings with sauce, sesame, scallions, and a gentle chili note.",
      tags: ["handmade", "sauce", "share"],
    },
    {
      kind: "Main",
      name: "Noodles with Vegetables",
      price: "from $19",
      text: "Noodles with vegetables, herbs, sesame, and balanced homemade sauce.",
      tags: ["wok style", "fresh", "main"],
    },
    {
      kind: "Main",
      name: "Fried Rice",
      price: "from $18",
      text: "Rice with vegetables, egg or protein choice, herbs, and sauce.",
      tags: ["rice", "lunch", "custom"],
    },
    {
      kind: "Appetizers",
      name: "Asian Small Plates",
      price: "from $42",
      text: "Cucumber salad, spring rolls, sauces, herbs, and small warm dishes.",
      tags: ["party", "small bites", "fresh"],
    },
  ],
};

let state = {
  lang: "ru",
  menuTab: "all",
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

  document.querySelectorAll("[data-cuisine-card]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.cuisineCard === state.menuTab);
  });

  const list = document.querySelector("[data-menu-list]");
  const items = copy[state.lang].menuItems[state.menuTab];
  list.innerHTML = items
    .map(
      (item) => `
        <article class="menu-item">
          <header>
            <div class="menu-title-group">
              <span class="menu-kind">${item.kind}</span>
              <h3>${item.name}</h3>
            </div>
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

  document.querySelectorAll("[data-cuisine-card]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      state.menuTab = button.dataset.cuisineCard;
      renderMenu();
      document.querySelector("#assortment").scrollIntoView({ behavior: "smooth", block: "start" });
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
