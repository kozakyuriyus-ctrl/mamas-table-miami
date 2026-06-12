const BUSINESS = {
  whatsappNumber: "13050000000",
};

const tr = (ru, en, uk) => ({ ru, en, uk });

const copy = {
  ru: {
    meta: {
      title: "Mama's Table | Домашняя еда с доставкой в Miami",
      description:
        "Премиальная домашняя кухня: украинские, восточноевропейские, азиатские, кавказские и средиземноморские блюда на заказ в Miami, Hallandale, Hollywood и рядом.",
    },
    brand: { small: "Домашняя кухня • Miami" },
    nav: { how: "Как заказать", menu: "Меню", delivery: "Доставка", faq: "FAQ" },
    actions: { orderNow: "Заказать", viewMenu: "Смотреть меню" },
    badges: { fresh: "Готовим свежим", preorder: "Предзаказ 24–48ч", local: "Локальная доставка", family: "Семейная кухня" },
    hero: {
      eyebrow: "Премиальная домашняя кухня",
      title: "Домашняя еда с доставкой в Miami",
      lede:
        "Украинские, восточноевропейские, азиатские, кавказские и средиземноморские блюда готовятся под заказ и доставляются по Miami, Hallandale, Hollywood и ближайшим районам.",
      cardLabel: "Популярный выбор",
      cardTitle: "Семейный ужин",
      cardMeta: "На 4-6 гостей • от $95",
    },
    how: {
      eyebrow: "Простой предзаказ",
      title: "Как это работает",
      stepOneTitle: "Выберите кухню",
      stepOneCopy: "Украинская, восточноевропейская, азиатская, кавказская или средиземноморская.",
      stepTwoTitle: "Выберите тип блюда",
      stepTwoCopy: "Первые блюда, вторые блюда, салаты, выпечка, сеты или индивидуальный заказ.",
      stepThreeTitle: "Мы готовим свежим",
      stepThreeCopy: "Блюда готовятся небольшими партиями к вашему времени, а не заранее с полки.",
      stepFourTitle: "Доставка или самовывоз",
      stepFourCopy: "Miami, Hallandale, Hollywood, Aventura, Sunny Isles, North Miami и рядом.",
    },
    menu: {
      eyebrow: "Структура меню",
      title: "Сначала кухня, потом тип блюда, потом ассортимент",
      subtitle:
        "Выберите кухню, затем уровень блюда: первые блюда, вторые блюда, салаты, выпечка, семейные сеты или custom order. После этого откроются карточки с фото, описанием и ценой.",
      stepCuisineEyebrow: "Выбор кухни",
      stepCuisineTitle: "Какая кухня нужна?",
      stepCourseEyebrow: "Уровень блюда",
      stepCourseTitle: "Первые, вторые или другое",
      assortmentEyebrow: "Ассортимент",
      selectedAll: "Показаны все позиции выбранной кухни.",
      selectedCourse: "Показаны блюда выбранного типа.",
      dishCount: "позиций",
      noResults: "Для этой комбинации пока нет карточек. Выберите другой тип блюда или отправьте custom order.",
    },
    cart: {
      eyebrow: "Ваш заказ",
      title: "Корзина",
      empty: "Добавьте блюда, чтобы собрать предзаказ.",
      total: "Примерная сумма",
      note: "Наличие, доставка и время самовывоза подтверждаются в сообщении.",
      whatsapp: "Заказать в WhatsApp",
      addFirst: "Сначала добавьте блюда",
      remove: "Убрать",
      items: "блюд",
      add: "Добавить",
    },
    why: {
      eyebrow: "Почему выбирают нас",
      title: "Домашний вкус с премиальной подачей заказа",
      copy:
        "Mama's Table подходит для семейных ужинов, гостей, небольших событий и тех дней, когда хочется настоящей домашней еды без закупки продуктов и готовки.",
      cardOneTitle: "Домашний вкус",
      cardOneCopy: "Теплая еда с украинским, восточноевропейским и семейным характером.",
      cardTwoTitle: "Свежие ингредиенты",
      cardTwoCopy: "Готовим ближе к вашему времени доставки или самовывоза.",
      cardThreeTitle: "Гибкое меню",
      cardThreeCopy: "Можно собрать заказ из разных кухонь или попросить индивидуальный стол.",
      cardFourTitle: "Для семьи и событий",
      cardFourCopy: "Ужины, гости, офисные ланчи, дни рождения и праздничные столы.",
    },
    delivery: {
      eyebrow: "Зона доставки",
      title: "Локальная доставка по Miami и рядом",
      copy: "Доставка и самовывоз доступны по предзаказу. Для семейных сетов и индивидуальных столов лучше писать за 24–48 часов.",
    },
    testimonials: {
      eyebrow: "Отзывы",
      title: "Что говорят клиенты",
      one: '"Борщ и вареники были как настоящий семейный ужин, но подача выглядела очень аккуратно."',
      two: '"Заказывали сеты для гостей. Все приехало свежим, подписанным и удобным для подачи."',
      three: '"Понятный заказ, большие порции и очень домашний вкус."',
    },
    faq: {
      eyebrow: "FAQ",
      title: "Перед заказом",
      oneQ: "За сколько времени нужно заказать?",
      oneA: "Большинство блюд лучше заказывать за 24–48 часов. Большие сеты и custom orders лучше обсуждать заранее.",
      twoQ: "Оплата онлайн уже подключена?",
      twoA: "Пока нет. Вы отправляете заявку, а наличие, итоговая сумма и способ оплаты подтверждаются в сообщении.",
      threeQ: "Можно ли изменить блюдо?",
      threeA: "Да. Укажите аллергии, пожелания, количество гостей или любимые блюда в форме заказа.",
      fourQ: "Можно выбрать блюда из разных кухонь?",
      fourA: "Да. Корзина сохраняет блюда из разных кухонь, поэтому можно собрать один общий заказ.",
    },
    contact: {
      eyebrow: "Форма заказа",
      title: "Напишите, куда и когда нужен заказ",
      copy: "Форма подготовит WhatsApp-сообщение с контактами, выбранными блюдами и комментариями.",
    },
    form: {
      name: "Имя",
      namePlaceholder: "Ваше имя",
      phone: "Телефон / WhatsApp",
      area: "Район доставки",
      areaPlaceholder: "Miami, Hallandale, Hollywood...",
      fulfillment: "Доставка или самовывоз",
      delivery: "Доставка",
      pickup: "Самовывоз",
      unsure: "Пока не уверен(а)",
      date: "Желаемая дата",
      datePlaceholder: "Например: суббота, 18:00",
      notes: "Комментарий / custom order",
      notesPlaceholder: "Аллергии, количество гостей, доставка или самовывоз, любимые блюда...",
      submit: "Подготовить WhatsApp-заказ",
      statusOpen: "Заказ подготовлен. Открываю WhatsApp.",
      statusFallback: "Если WhatsApp не открылся, используйте кнопку заказа в корзине.",
    },
    footer: { copy: "Домашняя еда, приготовленная свежей в Miami.", top: "Наверх" },
    orderMessage: {
      title: "Заявка Mama's Table",
      name: "Имя",
      phone: "Телефон",
      area: "Район",
      fulfillment: "Доставка/самовывоз",
      date: "Дата/время",
      list: "Список блюд",
      total: "Примерная сумма",
      notes: "Комментарий",
      help: "Нужна помощь с выбором блюд",
      confirm: "Пожалуйста, подтвердите наличие, delivery fee и ближайшее время доставки/самовывоза.",
    },
  },
  en: {
    meta: {
      title: "Mama's Table | Homemade Meals Delivered Fresh in Miami",
      description:
        "Premium homemade Ukrainian, Eastern European, Asian, Caucasian and Mediterranean meals prepared by request across Miami, Hallandale, Hollywood and nearby areas.",
    },
    brand: { small: "Home kitchen • Miami" },
    nav: { how: "How it works", menu: "Menu", delivery: "Delivery", faq: "FAQ" },
    actions: { orderNow: "Order Now", viewMenu: "View Menu" },
    badges: { fresh: "Freshly Made", preorder: "24–48h Preorder", local: "Local Delivery", family: "Family Kitchen" },
    hero: {
      eyebrow: "Premium home meal delivery",
      title: "Homemade Meals, Delivered Fresh in Miami",
      lede:
        "Fresh Ukrainian, Eastern European, Asian, Caucasian and Mediterranean meals prepared by request and delivered across Miami, Hallandale, Hollywood and nearby areas.",
      cardLabel: "Popular choice",
      cardTitle: "Family Dinner Tray",
      cardMeta: "Serves 4-6 • from $95",
    },
    how: {
      eyebrow: "Simple preorder flow",
      title: "How it works",
      stepOneTitle: "Choose a cuisine",
      stepOneCopy: "Ukrainian, Eastern European, Asian, Caucasian or Mediterranean.",
      stepTwoTitle: "Choose dish type",
      stepTwoCopy: "First courses, main dishes, salads, bakery, family trays or custom orders.",
      stepThreeTitle: "We cook fresh",
      stepThreeCopy: "Meals are prepared in small batches close to your pickup or delivery time.",
      stepFourTitle: "Delivery or pickup",
      stepFourCopy: "Miami, Hallandale, Hollywood, Aventura, Sunny Isles, North Miami and nearby areas.",
    },
    menu: {
      eyebrow: "Menu structure",
      title: "Choose cuisine first, then dish type, then the assortment",
      subtitle:
        "Pick a cuisine, then choose first courses, main dishes, salads, bakery, family trays or custom orders. Meal cards with photos, descriptions and prices will appear below.",
      stepCuisineEyebrow: "Cuisine",
      stepCuisineTitle: "Which cuisine do you want?",
      stepCourseEyebrow: "Dish type",
      stepCourseTitle: "First courses, mains or more",
      assortmentEyebrow: "Assortment",
      selectedAll: "Showing all items in the selected cuisine.",
      selectedCourse: "Showing dishes from the selected type.",
      dishCount: "items",
      noResults: "No cards yet for this combination. Choose another type or send a custom order.",
    },
    cart: {
      eyebrow: "Your order",
      title: "Order list",
      empty: "Add meals to build your preorder.",
      total: "Estimated total",
      note: "Final availability, delivery fee and pickup time are confirmed by message.",
      whatsapp: "Order on WhatsApp",
      addFirst: "Add meals first",
      remove: "Remove",
      items: "items",
      add: "Add to Order",
    },
    why: {
      eyebrow: "Why customers love us",
      title: "Home-cooked comfort with a premium ordering experience",
      copy:
        "Mama's Table is designed for busy families, guests, small events and anyone who wants generous homemade food without shopping or cooking.",
      cardOneTitle: "Homemade taste",
      cardOneCopy: "Warm familiar meals with Ukrainian, Eastern European and family soul.",
      cardTwoTitle: "Fresh ingredients",
      cardTwoCopy: "Cooked close to your pickup or delivery time.",
      cardThreeTitle: "Flexible menu",
      cardThreeCopy: "Mix cuisines in one cart or request a custom table.",
      cardFourTitle: "Family dinners and events",
      cardFourCopy: "Weeknights, guests, office lunches, birthdays and holiday tables.",
    },
    delivery: {
      eyebrow: "Delivery area",
      title: "Local delivery across Miami and nearby areas",
      copy: "Delivery and pickup are available by preorder. Family trays and custom tables are best requested 24–48 hours in advance.",
    },
    testimonials: {
      eyebrow: "Testimonials",
      title: "What customers say",
      one: '"The borscht and varenyky tasted like a real family dinner, but the presentation felt restaurant-level."',
      two: '"We ordered trays for friends visiting from out of town. Everything arrived fresh, labeled and easy to serve."',
      three: '"Simple ordering, generous portions and the food felt homemade in the best way."',
    },
    faq: {
      eyebrow: "FAQ",
      title: "Before you order",
      oneQ: "How far in advance should I order?",
      oneA: "Most meals are best ordered 24–48 hours in advance. Larger trays and custom orders should be discussed earlier.",
      twoQ: "Is online payment connected?",
      twoA: "Not yet. Send the request and final availability, total and payment method are confirmed by message.",
      threeQ: "Can I customize a dish?",
      threeA: "Yes. Add allergies, preferences, guest count or favorite dishes in the order form.",
      fourQ: "Can I choose meals from different cuisines?",
      fourA: "Yes. The cart can hold meals from different cuisines in one order.",
    },
    contact: {
      eyebrow: "Order form",
      title: "Tell us where and when you want your meals",
      copy: "The form prepares a WhatsApp message with your contact details, selected meals and notes.",
    },
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      phone: "Phone / WhatsApp",
      area: "Delivery area",
      areaPlaceholder: "Miami, Hallandale, Hollywood...",
      fulfillment: "Delivery or pickup",
      delivery: "Delivery",
      pickup: "Pickup",
      unsure: "Not sure yet",
      date: "Preferred date",
      datePlaceholder: "Example: Saturday, 6 PM",
      notes: "Notes / custom order",
      notesPlaceholder: "Allergies, guests, pickup vs delivery, favorite dishes...",
      submit: "Prepare WhatsApp Order",
      statusOpen: "Order message prepared. Opening WhatsApp.",
      statusFallback: "If WhatsApp did not open, use the order button in the cart.",
    },
    footer: { copy: "Homemade meals delivered fresh in Miami.", top: "Back to top" },
    orderMessage: {
      title: "Mama's Table order request",
      name: "Name",
      phone: "Phone",
      area: "Area",
      fulfillment: "Delivery/pickup",
      date: "Date/time",
      list: "Order list",
      total: "Estimated total",
      notes: "Notes",
      help: "I would like help choosing meals",
      confirm: "Please confirm availability, delivery fee and next pickup/delivery time.",
    },
  },
  uk: {
    meta: {
      title: "Mama's Table | Домашня їжа з доставкою в Miami",
      description:
        "Преміальна домашня кухня: українські, східноєвропейські, азійські, кавказькі та середземноморські страви на замовлення в Miami, Hallandale, Hollywood і поруч.",
    },
    brand: { small: "Домашня кухня • Miami" },
    nav: { how: "Як замовити", menu: "Меню", delivery: "Доставка", faq: "FAQ" },
    actions: { orderNow: "Замовити", viewMenu: "Дивитися меню" },
    badges: { fresh: "Готуємо свіжим", preorder: "Передзамовлення 24–48г", local: "Локальна доставка", family: "Сімейна кухня" },
    hero: {
      eyebrow: "Преміальна домашня кухня",
      title: "Домашня їжа з доставкою в Miami",
      lede:
        "Українські, східноєвропейські, азійські, кавказькі та середземноморські страви готуються на замовлення і доставляються по Miami, Hallandale, Hollywood та найближчих районах.",
      cardLabel: "Популярний вибір",
      cardTitle: "Сімейна вечеря",
      cardMeta: "На 4-6 гостей • від $95",
    },
    how: {
      eyebrow: "Просте передзамовлення",
      title: "Як це працює",
      stepOneTitle: "Оберіть кухню",
      stepOneCopy: "Українська, східноєвропейська, азійська, кавказька або середземноморська.",
      stepTwoTitle: "Оберіть тип страви",
      stepTwoCopy: "Перші страви, другі страви, салати, випічка, сети або індивідуальне замовлення.",
      stepThreeTitle: "Ми готуємо свіжим",
      stepThreeCopy: "Страви готуються невеликими партіями ближче до вашого часу доставки або самовивозу.",
      stepFourTitle: "Доставка або самовивіз",
      stepFourCopy: "Miami, Hallandale, Hollywood, Aventura, Sunny Isles, North Miami і поруч.",
    },
    menu: {
      eyebrow: "Структура меню",
      title: "Спочатку кухня, потім тип страви, потім асортимент",
      subtitle:
        "Оберіть кухню, потім рівень страви: перші страви, другі страви, салати, випічка, сімейні сети або custom order. Після цього відкриються картки з фото, описом і ціною.",
      stepCuisineEyebrow: "Вибір кухні",
      stepCuisineTitle: "Яка кухня потрібна?",
      stepCourseEyebrow: "Рівень страви",
      stepCourseTitle: "Перші, другі або інше",
      assortmentEyebrow: "Асортимент",
      selectedAll: "Показані всі позиції обраної кухні.",
      selectedCourse: "Показані страви обраного типу.",
      dishCount: "позицій",
      noResults: "Для цієї комбінації поки немає карток. Оберіть інший тип або надішліть custom order.",
    },
    cart: {
      eyebrow: "Ваше замовлення",
      title: "Кошик",
      empty: "Додайте страви, щоб зібрати передзамовлення.",
      total: "Орієнтовна сума",
      note: "Наявність, доставка і час самовивозу підтверджуються в повідомленні.",
      whatsapp: "Замовити у WhatsApp",
      addFirst: "Спочатку додайте страви",
      remove: "Прибрати",
      items: "страв",
      add: "Додати",
    },
    why: {
      eyebrow: "Чому нас обирають",
      title: "Домашній смак з преміальним замовленням",
      copy:
        "Mama's Table підходить для сімейних вечерь, гостей, невеликих подій і днів, коли хочеться справжньої домашньої їжі без закупів і готування.",
      cardOneTitle: "Домашній смак",
      cardOneCopy: "Тепла їжа з українським, східноєвропейським і сімейним характером.",
      cardTwoTitle: "Свіжі інгредієнти",
      cardTwoCopy: "Готуємо ближче до вашого часу доставки або самовивозу.",
      cardThreeTitle: "Гнучке меню",
      cardThreeCopy: "Можна зібрати замовлення з різних кухонь або попросити індивідуальний стіл.",
      cardFourTitle: "Для сім'ї та подій",
      cardFourCopy: "Вечері, гості, офісні ланчі, дні народження та святкові столи.",
    },
    delivery: {
      eyebrow: "Зона доставки",
      title: "Локальна доставка по Miami і поруч",
      copy: "Доставка і самовивіз доступні за передзамовленням. Сімейні сети та індивідуальні столи краще замовляти за 24–48 годин.",
    },
    testimonials: {
      eyebrow: "Відгуки",
      title: "Що кажуть клієнти",
      one: '"Борщ і вареники були як справжня сімейна вечеря, але подача виглядала дуже акуратно."',
      two: '"Замовляли сети для гостей. Все приїхало свіжим, підписаним і зручним для подачі."',
      three: '"Зрозуміле замовлення, великі порції і дуже домашній смак."',
    },
    faq: {
      eyebrow: "FAQ",
      title: "Перед замовленням",
      oneQ: "За скільки часу потрібно замовити?",
      oneA: "Більшість страв краще замовляти за 24–48 годин. Великі сети та custom orders краще обговорювати раніше.",
      twoQ: "Онлайн-оплата вже підключена?",
      twoA: "Поки ні. Ви надсилаєте заявку, а наявність, підсумкова сума і спосіб оплати підтверджуються в повідомленні.",
      threeQ: "Чи можна змінити страву?",
      threeA: "Так. Вкажіть алергії, побажання, кількість гостей або улюблені страви у формі замовлення.",
      fourQ: "Можна вибрати страви з різних кухонь?",
      fourA: "Так. Кошик зберігає страви з різних кухонь, тому можна зібрати одне спільне замовлення.",
    },
    contact: {
      eyebrow: "Форма замовлення",
      title: "Напишіть, куди і коли потрібне замовлення",
      copy: "Форма підготує WhatsApp-повідомлення з контактами, обраними стравами і коментарями.",
    },
    form: {
      name: "Ім'я",
      namePlaceholder: "Ваше ім'я",
      phone: "Телефон / WhatsApp",
      area: "Район доставки",
      areaPlaceholder: "Miami, Hallandale, Hollywood...",
      fulfillment: "Доставка або самовивіз",
      delivery: "Доставка",
      pickup: "Самовивіз",
      unsure: "Поки не впевнений(а)",
      date: "Бажана дата",
      datePlaceholder: "Наприклад: субота, 18:00",
      notes: "Коментар / custom order",
      notesPlaceholder: "Алергії, кількість гостей, доставка або самовивіз, улюблені страви...",
      submit: "Підготувати WhatsApp-замовлення",
      statusOpen: "Замовлення підготовлено. Відкриваю WhatsApp.",
      statusFallback: "Якщо WhatsApp не відкрився, використайте кнопку замовлення в кошику.",
    },
    footer: { copy: "Домашня їжа, приготована свіжою в Miami.", top: "Вгору" },
    orderMessage: {
      title: "Заявка Mama's Table",
      name: "Ім'я",
      phone: "Телефон",
      area: "Район",
      fulfillment: "Доставка/самовивіз",
      date: "Дата/час",
      list: "Список страв",
      total: "Орієнтовна сума",
      notes: "Коментар",
      help: "Потрібна допомога з вибором страв",
      confirm: "Будь ласка, підтвердіть наявність, delivery fee і найближчий час доставки/самовивозу.",
    },
  },
};

const cuisines = [
  {
    id: "ukrainian",
    image: "assets/images/ukrainian-table.jpg",
    title: tr("Украинская", "Ukrainian", "Українська"),
    subtitle: tr("Борщ, вареники, голубцы, блины и семейные сеты.", "Borscht, varenyky, holubtsi, blini and family trays.", "Борщ, вареники, голубці, млинці та сімейні сети."),
  },
  {
    id: "eastern",
    image: "assets/images/blini-crepes.jpg",
    title: tr("Восточноевропейская", "Eastern European", "Східноєвропейська"),
    subtitle: tr("Супы, домашние котлеты, пельмени, сырники и салаты.", "Soups, comfort mains, dumplings, syrniki and salads.", "Супи, домашні котлети, пельмені, сирники та салати."),
  },
  {
    id: "asian",
    image: "assets/images/asian-table.jpg",
    title: tr("Азиатская", "Asian", "Азійська"),
    subtitle: tr("Домашние дамплинги, лапша, рис, супы и свежие закуски.", "Homemade dumplings, noodles, rice, soups and fresh bites.", "Домашні дамплінги, локшина, рис, супи та свіжі закуски."),
  },
  {
    id: "caucasian",
    image: "assets/images/caucasus-mediterranean.jpg",
    title: tr("Кавказская", "Caucasian", "Кавказька"),
    subtitle: tr("Харчо, хачапури, долма, хинкали, зелень и соусы.", "Kharcho, khachapuri, dolma, khinkali, herbs and sauces.", "Харчо, хачапурі, долма, хінкалі, зелень і соуси."),
  },
  {
    id: "mediterranean",
    image: "assets/images/caucasus-mediterranean.jpg",
    title: tr("Средиземноморская", "Mediterranean", "Середземноморська"),
    subtitle: tr("Мезе, салаты, чечевичный суп, овощи, рыба и теплый хлеб.", "Mezze, salads, lentil soup, vegetables, fish and warm bread.", "Мезе, салати, сочевичний суп, овочі, риба і теплий хліб."),
  },
];

const courses = [
  { id: "all", title: tr("Все", "All", "Все") },
  { id: "first", title: tr("Первые блюда", "First courses", "Перші страви") },
  { id: "second", title: tr("Вторые блюда", "Main dishes", "Другі страви") },
  { id: "salads", title: tr("Салаты / закуски", "Salads / starters", "Салати / закуски") },
  { id: "bakery", title: tr("Блины / выпечка", "Crepes / bakery", "Млинці / випічка") },
  { id: "trays", title: tr("Семейные сеты", "Family trays", "Сімейні сети") },
  { id: "custom", title: tr("Custom order", "Custom order", "Custom order") },
];

const meals = [
  {
    id: "ua-borscht",
    cuisine: "ukrainian",
    course: "first",
    price: 18,
    image: "assets/images/ukrainian-table.jpg",
    name: tr("Борщ с пампушками", "Borscht & Pampushky", "Борщ з пампушками"),
    description: tr("Красный борщ со сметаной, зеленью и мягкими чесночными пампушками.", "Deep red borscht with sour cream, herbs and soft garlic pampushky.", "Червоний борщ зі сметаною, зеленню та м'якими часниковими пампушками."),
    tags: [tr("первое", "first course", "перша страва"), tr("украинская классика", "Ukrainian classic", "українська класика")],
  },
  {
    id: "ua-green-borscht",
    cuisine: "ukrainian",
    course: "first",
    price: 17,
    image: "assets/images/ukrainian-table.jpg",
    name: tr("Зеленый борщ", "Green Borscht", "Зелений борщ"),
    description: tr("Щавель, картофель, яйцо, зелень и легкий домашний бульон.", "Sorrel, potato, egg, herbs and a light homemade broth.", "Щавель, картопля, яйце, зелень і легкий домашній бульйон."),
    tags: [tr("легкий", "light", "легкий"), tr("сезонный", "seasonal", "сезонний")],
  },
  {
    id: "ua-chicken-kyiv",
    cuisine: "ukrainian",
    course: "second",
    price: 26,
    image: "assets/images/chicken-comfort.jpg",
    name: tr("Котлета по-киевски", "Chicken Kyiv Plate", "Котлета по-київськи"),
    description: tr("Хрустящая куриная котлета с картофельным пюре, овощами и салатом.", "Crisp chicken cutlet with mashed potatoes, vegetables and salad.", "Хрустка куряча котлета з картопляним пюре, овочами та салатом."),
    tags: [tr("второе", "main", "друга страва"), tr("хит", "best seller", "хіт")],
  },
  {
    id: "ua-varenyky",
    cuisine: "ukrainian",
    course: "second",
    price: 25,
    image: "assets/images/ukrainian-table.jpg",
    name: tr("Домашние вареники", "Handmade Varenyky", "Домашні вареники"),
    description: tr("Картофель, творог или вишня. Подаются со сметаной и луком по желанию.", "Potato, farmer cheese or cherry filling with sour cream and optional onions.", "Картопля, сир або вишня. Подаються зі сметаною та цибулею за бажанням."),
    tags: [tr("ручная лепка", "handmade", "ручна ліпка"), tr("семейное", "family", "сімейне")],
  },
  {
    id: "ua-holubtsi",
    cuisine: "ukrainian",
    course: "second",
    price: 48,
    image: "assets/images/ukrainian-table.jpg",
    name: tr("Голубцы в томатном соусе", "Holubtsi Tray", "Голубці в томатному соусі"),
    description: tr("Нежные голубцы с рисом и мясом или овощной начинкой, в домашнем соусе.", "Tender cabbage rolls with rice and meat or vegetable filling in homemade sauce.", "Ніжні голубці з рисом і м'ясом або овочевою начинкою в домашньому соусі."),
    tags: [tr("сет", "tray", "сет"), tr("медленно тушится", "slow cooked", "повільно тушкується")],
  },
  {
    id: "ua-olivier",
    cuisine: "ukrainian",
    course: "salads",
    price: 20,
    image: "assets/images/ukrainian-table.jpg",
    name: tr("Салат Оливье", "Olivier Salad", "Салат Олів'є"),
    description: tr("Классический праздничный салат, приготовленный свежим к заказу.", "Classic holiday-style salad prepared fresh for your order.", "Класичний святковий салат, приготований свіжим до замовлення."),
    tags: [tr("салат", "salad", "салат"), tr("праздничный", "party", "святковий")],
  },
  {
    id: "ua-blini",
    cuisine: "ukrainian",
    course: "bakery",
    price: 22,
    image: "assets/images/blini-crepes.jpg",
    name: tr("Блины с творогом", "Blini with Farmer Cheese", "Млинці з сиром"),
    description: tr("Тонкие блины с творожной начинкой, ягодным соусом и сметаной.", "Thin golden blini with farmer cheese, berry compote and sour cream.", "Тонкі млинці з сирною начинкою, ягідним соусом і сметаною."),
    tags: [tr("сладкое", "sweet", "солодке"), tr("бранч", "brunch", "бранч")],
  },
  {
    id: "ua-family",
    cuisine: "ukrainian",
    course: "trays",
    price: 95,
    image: "assets/images/hero-table.jpg",
    name: tr("Украинский семейный сет", "Ukrainian Family Tray", "Український сімейний сет"),
    description: tr("Борщ, вареники, голубцы, салат, соусы и хлеб для общего стола.", "Borscht, varenyky, holubtsi, salad, sauces and bread for the table.", "Борщ, вареники, голубці, салат, соуси та хліб для спільного столу."),
    tags: [tr("4-6 гостей", "serves 4-6", "4-6 гостей"), tr("предзаказ", "preorder", "передзамовлення")],
  },
  {
    id: "ua-custom",
    cuisine: "ukrainian",
    course: "custom",
    price: 160,
    image: "assets/images/hero-table.jpg",
    name: tr("Индивидуальный украинский стол", "Custom Ukrainian Table", "Індивідуальний український стіл"),
    description: tr("Меню под гостей, праздник или семейный ужин с вашими любимыми блюдами.", "A custom menu for guests, celebrations or family dinner.", "Меню під гостей, свято або сімейну вечерю з вашими улюбленими стравами."),
    tags: [tr("custom", "custom", "custom"), tr("событие", "event", "подія")],
  },
  {
    id: "ee-mushroom-soup",
    cuisine: "eastern",
    course: "first",
    price: 16,
    image: "assets/images/caucasus-mediterranean.jpg",
    name: tr("Грибной суп с перловкой", "Mushroom Barley Soup", "Грибний суп з перловкою"),
    description: tr("Грибы, перловка, овощи и свежий укроп в уютном домашнем бульоне.", "Mushrooms, pearl barley, vegetables and fresh dill in a cozy broth.", "Гриби, перловка, овочі та свіжий кріп у затишному домашньому бульйоні."),
    tags: [tr("первое", "first course", "перша страва"), tr("уютное", "cozy", "затишне")],
  },
  {
    id: "ee-solyanka",
    cuisine: "eastern",
    course: "first",
    price: 18,
    image: "assets/images/ukrainian-table.jpg",
    name: tr("Солянка", "Solyanka Soup", "Солянка"),
    description: tr("Насыщенный кисло-пряный суп с мясом, солеными огурцами, лимоном и зеленью.", "Rich tangy soup with meats, pickles, lemon and herbs.", "Насичений кисло-пряний суп з м'ясом, солоними огірками, лимоном і зеленню."),
    tags: [tr("насыщенно", "rich", "насичено"), tr("домашнее", "homestyle", "домашнє")],
  },
  {
    id: "ee-stroganoff",
    cuisine: "eastern",
    course: "second",
    price: 28,
    image: "assets/images/chicken-comfort.jpg",
    name: tr("Бефстроганов с пюре", "Beef Stroganoff & Mash", "Бефстроганов з пюре"),
    description: tr("Нежная говядина в сливочном соусе с картофельным пюре и зеленью.", "Tender beef in creamy sauce with mashed potatoes and herbs.", "Ніжна яловичина у вершковому соусі з картопляним пюре та зеленню."),
    tags: [tr("второе", "main", "друга страва"), tr("comfort", "comfort", "comfort")],
  },
  {
    id: "ee-pelmeni",
    cuisine: "eastern",
    course: "second",
    price: 24,
    image: "assets/images/ukrainian-table.jpg",
    name: tr("Домашние пельмени", "Homemade Pelmeni", "Домашні пельмені"),
    description: tr("Пельмени ручной лепки с мясной начинкой, сметаной и зеленью.", "Handmade dumplings with meat filling, sour cream and herbs.", "Пельмені ручної ліпки з м'ясною начинкою, сметаною та зеленню."),
    tags: [tr("ручная лепка", "handmade", "ручна ліпка"), tr("семейное", "family", "сімейне")],
  },
  {
    id: "ee-schnitzel",
    cuisine: "eastern",
    course: "second",
    price: 26,
    image: "assets/images/chicken-comfort.jpg",
    name: tr("Домашний шницель", "Homestyle Schnitzel", "Домашній шніцель"),
    description: tr("Хрустящий шницель с гарниром, овощами и легким салатом.", "Crisp schnitzel with a side, vegetables and light salad.", "Хрусткий шніцель з гарніром, овочами та легким салатом."),
    tags: [tr("второе", "main", "друга страва"), tr("хрустящее", "crisp", "хрустке")],
  },
  {
    id: "ee-mimosa",
    cuisine: "eastern",
    course: "salads",
    price: 20,
    image: "assets/images/ukrainian-table.jpg",
    name: tr("Салат Мимоза", "Mimosa Salad", "Салат Мімоза"),
    description: tr("Слоеный домашний салат для праздничного или семейного стола.", "Layered homestyle salad for a holiday or family table.", "Шаровий домашній салат для святкового або сімейного столу."),
    tags: [tr("салат", "salad", "салат"), tr("классика", "classic", "класика")],
  },
  {
    id: "ee-syrniki",
    cuisine: "eastern",
    course: "bakery",
    price: 24,
    image: "assets/images/blini-crepes.jpg",
    name: tr("Сырники с ягодами", "Syrniki Breakfast Box", "Сирники з ягодами"),
    description: tr("Сырники из творога с ягодами, сметаной и сезонным джемом.", "Farmer cheese pancakes with berries, sour cream and seasonal jam.", "Сирники з домашнього сиру з ягодами, сметаною та сезонним джемом."),
    tags: [tr("бранч", "brunch", "бранч"), tr("сладкое", "sweet", "солодке")],
  },
  {
    id: "ee-tray",
    cuisine: "eastern",
    course: "trays",
    price: 110,
    image: "assets/images/hero-table.jpg",
    name: tr("Восточноевропейский comfort set", "Eastern European Comfort Tray", "Східноєвропейський comfort set"),
    description: tr("Суп, второе, салаты, выпечка и соусы для семейного ужина.", "Soup, mains, salads, bakery and sauces for a family dinner.", "Суп, друге, салати, випічка та соуси для сімейної вечері."),
    tags: [tr("сет", "tray", "сет"), tr("4-6 гостей", "serves 4-6", "4-6 гостей")],
  },
  {
    id: "asian-miso",
    cuisine: "asian",
    course: "first",
    price: 16,
    image: "assets/images/asian-table.jpg",
    name: tr("Мисо-суп с тофу", "Miso Soup with Tofu", "Місо-суп з тофу"),
    description: tr("Легкий бульон мисо с тофу, зеленью, водорослями и грибами.", "Light miso broth with tofu, greens, seaweed and mushrooms.", "Легкий бульйон місо з тофу, зеленню, водоростями та грибами."),
    tags: [tr("первое", "first course", "перша страва"), tr("легкое", "light", "легке")],
  },
  {
    id: "asian-dumpling-soup",
    cuisine: "asian",
    course: "first",
    price: 18,
    image: "assets/images/asian-table.jpg",
    name: tr("Суп с дамплингами", "Dumpling Soup", "Суп з дамплінгами"),
    description: tr("Домашние дамплинги в ароматном бульоне с зеленью и овощами.", "Homemade dumplings in fragrant broth with greens and vegetables.", "Домашні дамплінги в ароматному бульйоні із зеленню та овочами."),
    tags: [tr("дамплинги", "dumplings", "дамплінги"), tr("comfort", "comfort", "comfort")],
  },
  {
    id: "asian-teriyaki",
    cuisine: "asian",
    course: "second",
    price: 24,
    image: "assets/images/asian-table.jpg",
    name: tr("Курица терияки с рисом", "Teriyaki Chicken Rice Bowl", "Курка теріякі з рисом"),
    description: tr("Курица в соусе терияки, жасминовый рис, овощи и кунжут.", "Teriyaki chicken with jasmine rice, vegetables and sesame.", "Курка в соусі теріякі, жасминовий рис, овочі та кунжут."),
    tags: [tr("второе", "main", "друга страва"), tr("рис", "rice", "рис")],
  },
  {
    id: "asian-noodles",
    cuisine: "asian",
    course: "second",
    price: 26,
    image: "assets/images/asian-table.jpg",
    name: tr("Лапша с говядиной", "Beef Noodles", "Локшина з яловичиною"),
    description: tr("Жареная лапша с говядиной, овощами, зеленью и домашним соусом.", "Stir-fried noodles with beef, vegetables, herbs and house sauce.", "Смажена локшина з яловичиною, овочами, зеленню та домашнім соусом."),
    tags: [tr("второе", "main", "друга страва"), tr("азиатская домашняя", "homestyle Asian", "азійська домашня")],
  },
  {
    id: "asian-gyoza",
    cuisine: "asian",
    course: "second",
    price: 22,
    image: "assets/images/asian-table.jpg",
    name: tr("Гёдза / дамплинги", "Gyoza / Dumplings", "Гьодза / дамплінги"),
    description: tr("Обжаренные дамплинги с мясной или овощной начинкой и соусом.", "Pan-seared dumplings with meat or vegetable filling and sauce.", "Обсмажені дамплінги з м'ясною або овочевою начинкою та соусом."),
    tags: [tr("ручная лепка", "handmade", "ручна ліпка"), tr("соус", "sauce", "соус")],
  },
  {
    id: "asian-cucumber",
    cuisine: "asian",
    course: "salads",
    price: 16,
    image: "assets/images/asian-table.jpg",
    name: tr("Огуречный салат с кунжутом", "Sesame Cucumber Salad", "Огірковий салат з кунжутом"),
    description: tr("Хрустящие огурцы, кунжут, зелень, легкая заправка и немного чили.", "Crisp cucumbers, sesame, herbs, light dressing and a little chili.", "Хрусткі огірки, кунжут, зелень, легка заправка і трохи чилі."),
    tags: [tr("свежо", "fresh", "свіжо"), tr("закуска", "starter", "закуска")],
  },
  {
    id: "asian-tray",
    cuisine: "asian",
    course: "trays",
    price: 98,
    image: "assets/images/asian-table.jpg",
    name: tr("Азиатский dinner set", "Asian Dinner Set", "Азійський dinner set"),
    description: tr("Дамплинги, лапша, рис, салат, соусы и закуски для общего стола.", "Dumplings, noodles, rice, salad, sauces and starters for sharing.", "Дамплінги, локшина, рис, салат, соуси та закуски для спільного столу."),
    tags: [tr("сет", "tray", "сет"), tr("sharing", "sharing", "sharing")],
  },
  {
    id: "cau-kharcho",
    cuisine: "caucasian",
    course: "first",
    price: 18,
    image: "assets/images/caucasus-mediterranean.jpg",
    name: tr("Суп харчо", "Kharcho Soup", "Суп харчо"),
    description: tr("Насыщенный суп с рисом, томатами, специями, зеленью и ореховой нотой.", "Rich soup with rice, tomatoes, spices, herbs and a nutty note.", "Насичений суп з рисом, томатами, спеціями, зеленню та горіховою нотою."),
    tags: [tr("первое", "first course", "перша страва"), tr("кавказская классика", "Caucasian classic", "кавказька класика")],
  },
  {
    id: "cau-chikhirtma",
    cuisine: "caucasian",
    course: "first",
    price: 18,
    image: "assets/images/caucasus-mediterranean.jpg",
    name: tr("Чихиртма", "Chikhirtma Soup", "Чихіртма"),
    description: tr("Нежный куриный суп с яйцом, зеленью и мягкой кислинкой.", "Tender chicken soup with egg, herbs and a soft tang.", "Ніжний курячий суп з яйцем, зеленню та м'якою кислинкою."),
    tags: [tr("нежно", "gentle", "ніжно"), tr("куриный", "chicken", "курячий")],
  },
  {
    id: "cau-khachapuri",
    cuisine: "caucasian",
    course: "second",
    price: 24,
    image: "assets/images/caucasus-mediterranean.jpg",
    name: tr("Хачапури", "Khachapuri", "Хачапурі"),
    description: tr("Теплая сырная выпечка в домашнем стиле, идеально для общего стола.", "Warm cheese bread in a homestyle format, perfect for sharing.", "Тепла сирна випічка в домашньому стилі, ідеально для спільного столу."),
    tags: [tr("сыр", "cheese", "сир"), tr("выпечка", "bakery", "випічка")],
  },
  {
    id: "cau-dolma",
    cuisine: "caucasian",
    course: "second",
    price: 30,
    image: "assets/images/caucasus-mediterranean.jpg",
    name: tr("Долма", "Dolma", "Долма"),
    description: tr("Виноградные листья с начинкой, зеленью, соусом и лимоном.", "Stuffed grape leaves with herbs, sauce and lemon.", "Виноградне листя з начинкою, зеленню, соусом і лимоном."),
    tags: [tr("второе", "main", "друга страва"), tr("зелень", "herbs", "зелень")],
  },
  {
    id: "cau-khinkali",
    cuisine: "caucasian",
    course: "second",
    price: 28,
    image: "assets/images/caucasus-mediterranean.jpg",
    name: tr("Хинкали", "Khinkali", "Хінкалі"),
    description: tr("Сочные хинкали с мясной начинкой, перцем и зеленью.", "Juicy khinkali with meat filling, pepper and herbs.", "Соковиті хінкалі з м'ясною начинкою, перцем і зеленню."),
    tags: [tr("ручная лепка", "handmade", "ручна ліпка"), tr("сочные", "juicy", "соковиті")],
  },
  {
    id: "cau-salad",
    cuisine: "caucasian",
    course: "salads",
    price: 18,
    image: "assets/images/caucasus-mediterranean.jpg",
    name: tr("Кавказский салат с зеленью", "Caucasian Herb Salad", "Кавказький салат із зеленню"),
    description: tr("Помидоры, огурцы, зелень, лук, специи и яркая домашняя заправка.", "Tomatoes, cucumbers, herbs, onion, spices and bright house dressing.", "Помідори, огірки, зелень, цибуля, спеції та яскрава домашня заправка."),
    tags: [tr("салат", "salad", "салат"), tr("свежо", "fresh", "свіжо")],
  },
  {
    id: "cau-tray",
    cuisine: "caucasian",
    course: "trays",
    price: 120,
    image: "assets/images/caucasus-mediterranean.jpg",
    name: tr("Кавказский сет", "Caucasian Family Tray", "Кавказький сет"),
    description: tr("Хачапури, долма, хинкали, салат, соусы, зелень и хлеб.", "Khachapuri, dolma, khinkali, salad, sauces, herbs and bread.", "Хачапурі, долма, хінкалі, салат, соуси, зелень і хліб."),
    tags: [tr("4-6 гостей", "serves 4-6", "4-6 гостей"), tr("сет", "tray", "сет")],
  },
  {
    id: "med-lentil",
    cuisine: "mediterranean",
    course: "first",
    price: 16,
    image: "assets/images/caucasus-mediterranean.jpg",
    name: tr("Чечевичный суп", "Mediterranean Lentil Soup", "Сочевичний суп"),
    description: tr("Золотая чечевица, овощи, лимон, оливковое масло и теплые специи.", "Golden lentils with vegetables, lemon, olive oil and warm spices.", "Золота сочевиця, овочі, лимон, оливкова олія і теплі спеції."),
    tags: [tr("первое", "first course", "перша страва"), tr("vegetarian", "vegetarian", "vegetarian")],
  },
  {
    id: "med-chicken-soup",
    cuisine: "mediterranean",
    course: "first",
    price: 17,
    image: "assets/images/caucasus-mediterranean.jpg",
    name: tr("Лимонный куриный суп", "Lemon Chicken Soup", "Лимонний курячий суп"),
    description: tr("Легкий куриный суп с лимоном, рисом, зеленью и оливковым маслом.", "Light chicken soup with lemon, rice, herbs and olive oil.", "Легкий курячий суп з лимоном, рисом, зеленню та оливковою олією."),
    tags: [tr("легко", "light", "легко"), tr("первое", "first course", "перша страва")],
  },
  {
    id: "med-shawarma",
    cuisine: "mediterranean",
    course: "second",
    price: 24,
    image: "assets/images/caucasus-mediterranean.jpg",
    name: tr("Chicken shawarma plate", "Chicken Shawarma Plate", "Chicken shawarma plate"),
    description: tr("Курица, рис или картофель, салат, соусы, травы и теплый хлеб.", "Chicken, rice or potatoes, salad, sauces, herbs and warm bread.", "Курка, рис або картопля, салат, соуси, трави і теплий хліб."),
    tags: [tr("второе", "main", "друга страва"), tr("соусы", "sauces", "соуси")],
  },
  {
    id: "med-salmon",
    cuisine: "mediterranean",
    course: "second",
    price: 32,
    image: "assets/images/hero-table.jpg",
    name: tr("Рыба с травами и овощами", "Herb Fish & Vegetables", "Риба з травами та овочами"),
    description: tr("Запеченная рыба, сезонные овощи, лимон, зелень и легкий гарнир.", "Baked fish with seasonal vegetables, lemon, herbs and a light side.", "Запечена риба, сезонні овочі, лимон, зелень і легкий гарнір."),
    tags: [tr("второе", "main", "друга страва"), tr("легкое", "light", "легке")],
  },
  {
    id: "med-mezze",
    cuisine: "mediterranean",
    course: "salads",
    price: 36,
    image: "assets/images/caucasus-mediterranean.jpg",
    name: tr("Мезе", "Mediterranean Mezze Tray", "Мезе"),
    description: tr("Хумус, табуле, овощи, оливки, зелень, соусы и теплый хлеб.", "Hummus, tabbouleh, vegetables, olives, herbs, sauces and warm bread.", "Хумус, табуле, овочі, оливки, зелень, соуси і теплий хліб."),
    tags: [tr("закуски", "starters", "закуски"), tr("sharing", "sharing", "sharing")],
  },
  {
    id: "med-greek-salad",
    cuisine: "mediterranean",
    course: "salads",
    price: 18,
    image: "assets/images/caucasus-mediterranean.jpg",
    name: tr("Греческий салат", "Greek Salad", "Грецький салат"),
    description: tr("Огурцы, томаты, сыр, оливки, зелень и оливковое масло.", "Cucumbers, tomatoes, cheese, olives, herbs and olive oil.", "Огірки, томати, сир, оливки, зелень та оливкова олія."),
    tags: [tr("салат", "salad", "салат"), tr("свежо", "fresh", "свіжо")],
  },
  {
    id: "med-tray",
    cuisine: "mediterranean",
    course: "trays",
    price: 115,
    image: "assets/images/hero-table.jpg",
    name: tr("Средиземноморский семейный сет", "Mediterranean Family Tray", "Середземноморський сімейний сет"),
    description: tr("Мезе, салаты, горячее, овощи, соусы и теплый хлеб для общего стола.", "Mezze, salads, hot dishes, vegetables, sauces and warm bread for sharing.", "Мезе, салати, гаряче, овочі, соуси і теплий хліб для спільного столу."),
    tags: [tr("сет", "tray", "сет"), tr("4-6 гостей", "serves 4-6", "4-6 гостей")],
  },
  {
    id: "med-custom",
    cuisine: "mediterranean",
    course: "custom",
    price: 170,
    image: "assets/images/hero-table.jpg",
    name: tr("Индивидуальный Mediterranean table", "Custom Mediterranean Table", "Індивідуальний Mediterranean table"),
    description: tr("Меню под гостей, офисный ланч или домашнее событие.", "A custom menu for guests, office lunch or a home event.", "Меню під гостей, офісний ланч або домашню подію."),
    tags: [tr("custom", "custom", "custom"), tr("событие", "event", "подія")],
  },
];

const state = {
  lang: localStorage.getItem("mamasTableLang") || "ru",
  cuisine: "ukrainian",
  course: "all",
  cart: new Map(),
};

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);

const text = (value) => value?.[state.lang] || value?.en || value?.ru || "";

const t = (path) => {
  const value = path.split(".").reduce((current, key) => current?.[key], copy[state.lang]);
  return value || path;
};

const money = (value) => `$${value}`;

const getCuisine = (id) => cuisines.find((cuisine) => cuisine.id === id);

const getCourse = (id) => courses.find((course) => course.id === id);

const mealById = (id) => meals.find((meal) => meal.id === id);

const mealsForCuisine = (cuisineId) => meals.filter((meal) => meal.cuisine === cuisineId);

const filteredMeals = () =>
  mealsForCuisine(state.cuisine).filter((meal) => state.course === "all" || meal.course === state.course);

const cartQuantity = (id) => state.cart.get(id) || 0;

const cartEntries = () =>
  Array.from(state.cart.entries())
    .map(([id, quantity]) => ({ meal: mealById(id), quantity }))
    .filter((entry) => entry.meal && entry.quantity > 0);

const cartTotal = () => cartEntries().reduce((sum, entry) => sum + entry.meal.price * entry.quantity, 0);

const cartCount = () => cartEntries().reduce((sum, entry) => sum + entry.quantity, 0);

const refreshIcons = () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

const applyTranslations = () => {
  document.documentElement.lang = state.lang;
  document.title = t("meta.title");
  document.querySelector('meta[name="description"]')?.setAttribute("content", t("meta.description"));

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === state.lang);
  });
};

const formatMobileCount = (count) => `${count} ${t("cart.items")}`;

const fulfillmentLabel = (value) => {
  if (value === "pickup") return t("form.pickup");
  if (value === "unsure") return t("form.unsure");
  return t("form.delivery");
};

const buildCartMessage = () => {
  const entries = cartEntries();
  const orderLines = entries.length
    ? entries.map(({ meal, quantity }) => `- ${text(meal.name)} x${quantity}: ${money(meal.price * quantity)}`).join("\n")
    : `- ${t("orderMessage.help")}`;

  return [
    t("orderMessage.title"),
    "",
    `${t("orderMessage.list")}:`,
    orderLines,
    `${t("orderMessage.total")}: ${money(cartTotal())}`,
    "",
    t("orderMessage.confirm"),
  ].join("\n");
};

const whatsappUrl = (message) => `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;

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
  const cuisine = getCuisine(meal.cuisine);
  const course = getCourse(meal.course);
  const mealName = text(meal.name);

  return `
    <article class="meal-card reveal" data-meal-card="${escapeHtml(meal.id)}">
      <img src="${escapeHtml(meal.image)}" alt="${escapeHtml(mealName)}" loading="lazy" />
      <div class="meal-body">
        <div class="meal-top">
          <div>
            <h3>${escapeHtml(mealName)}</h3>
          </div>
          <span class="price">${money(meal.price)}</span>
        </div>
        <p>${escapeHtml(text(meal.description))}</p>
        <div class="meal-meta">
          <span>${escapeHtml(text(cuisine.title))}</span>
          <span>${escapeHtml(text(course.title))}</span>
          ${meal.tags.map((tag) => `<span>${escapeHtml(text(tag))}</span>`).join("")}
        </div>
        <div class="add-row">
          <div class="qty-control" aria-label="${escapeHtml(mealName)} quantity">
            <button type="button" data-qty-minus="${escapeHtml(meal.id)}" aria-label="Decrease ${escapeHtml(mealName)}">-</button>
            <strong data-meal-qty="${escapeHtml(meal.id)}">${quantity}</strong>
            <button type="button" data-qty-plus="${escapeHtml(meal.id)}" aria-label="Increase ${escapeHtml(mealName)}">+</button>
          </div>
          <button class="add-btn" type="button" data-add-meal="${escapeHtml(meal.id)}">${escapeHtml(t("cart.add"))}</button>
        </div>
      </div>
    </article>
  `;
};

const renderCuisines = () => {
  const container = document.querySelector("[data-cuisine-grid]");
  container.innerHTML = cuisines
    .map((cuisine) => {
      const count = mealsForCuisine(cuisine.id).length;
      return `
        <button class="cuisine-option ${cuisine.id === state.cuisine ? "is-active" : ""}" type="button" data-cuisine="${escapeHtml(cuisine.id)}">
          <img src="${escapeHtml(cuisine.image)}" alt="${escapeHtml(text(cuisine.title))}" loading="lazy" />
          <span class="cuisine-option-body">
            <strong>${escapeHtml(text(cuisine.title))}</strong>
            <small>${escapeHtml(text(cuisine.subtitle))}</small>
            <em>${count} ${escapeHtml(t("menu.dishCount"))}</em>
          </span>
        </button>
      `;
    })
    .join("");
};

const renderCourses = () => {
  const container = document.querySelector("[data-course-chips]");
  container.innerHTML = courses
    .map((course) => {
      const count = course.id === "all" ? mealsForCuisine(state.cuisine).length : mealsForCuisine(state.cuisine).filter((meal) => meal.course === course.id).length;
      return `
        <button class="course-chip ${course.id === state.course ? "is-active" : ""}" type="button" data-course="${escapeHtml(course.id)}">
          <span>${escapeHtml(text(course.title))}</span>
          <small>${count}</small>
        </button>
      `;
    })
    .join("");
};

const renderCatalog = () => {
  const catalogGrid = document.querySelector("[data-catalog-grid]");
  const selectedTitle = document.querySelector("[data-selected-title]");
  const selectedSummary = document.querySelector("[data-selected-summary]");
  const cuisine = getCuisine(state.cuisine);
  const course = getCourse(state.course);
  const shownMeals = filteredMeals();

  selectedTitle.textContent = state.course === "all" ? text(cuisine.title) : `${text(cuisine.title)} • ${text(course.title)}`;
  selectedSummary.textContent = `${state.course === "all" ? t("menu.selectedAll") : t("menu.selectedCourse")} ${shownMeals.length} ${t("menu.dishCount")}.`;

  catalogGrid.innerHTML = shownMeals.length
    ? shownMeals.map(createMealCard).join("")
    : `<div class="menu-empty">${escapeHtml(t("menu.noResults"))}</div>`;

  renderMealQuantities();
  observeReveals();
};

const renderMenu = () => {
  renderCuisines();
  renderCourses();
  renderCatalog();
  refreshIcons();
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
    .map(({ meal, quantity }) => {
      const mealName = text(meal.name);
      return `
        <div class="cart-item">
          <div class="cart-item-top">
            <strong>${escapeHtml(mealName)}</strong>
            <span>${money(meal.price * quantity)}</span>
          </div>
          <div class="cart-item-meta">${escapeHtml(text(getCuisine(meal.cuisine).title))} • ${escapeHtml(text(getCourse(meal.course).title))}</div>
          <div class="add-row">
            <div class="qty-control">
              <button type="button" data-qty-minus="${escapeHtml(meal.id)}" aria-label="Decrease ${escapeHtml(mealName)}">-</button>
              <strong>${quantity}</strong>
              <button type="button" data-qty-plus="${escapeHtml(meal.id)}" aria-label="Increase ${escapeHtml(mealName)}">+</button>
            </div>
            <button class="remove-item" type="button" data-remove-meal="${escapeHtml(meal.id)}">${escapeHtml(t("cart.remove"))}</button>
          </div>
        </div>
      `;
    })
    .join("");

  empty.hidden = entries.length > 0;
  document.querySelector("[data-cart-count]").textContent = count;
  document.querySelector("[data-cart-total]").textContent = money(total);
  document.querySelector("[data-mobile-count]").textContent = formatMobileCount(count);
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
  checkoutLabel.textContent = entries.length ? t("cart.whatsapp") : t("cart.addFirst");
};

const buildOrderMessage = (form) => {
  const data = new FormData(form);
  const entries = cartEntries();
  const orderLines = entries.length
    ? entries.map(({ meal, quantity }) => `- ${text(meal.name)} x${quantity}: ${money(meal.price * quantity)}`).join("\n")
    : `- ${t("orderMessage.help")}`;

  return [
    t("orderMessage.title"),
    "",
    `${t("orderMessage.name")}: ${data.get("name") || ""}`,
    `${t("orderMessage.phone")}: ${data.get("phone") || ""}`,
    `${t("orderMessage.area")}: ${data.get("area") || ""}`,
    `${t("orderMessage.fulfillment")}: ${fulfillmentLabel(data.get("fulfillment"))}`,
    `${t("orderMessage.date")}: ${data.get("date") || ""}`,
    "",
    `${t("orderMessage.list")}:`,
    orderLines,
    `${t("orderMessage.total")}: ${money(cartTotal())}`,
    "",
    `${t("orderMessage.notes")}: ${data.get("notes") || ""}`,
  ].join("\n");
};

const handleDocumentClick = (event) => {
  const langButton = event.target.closest("[data-lang]");
  const cuisineButton = event.target.closest("[data-cuisine]");
  const courseButton = event.target.closest("[data-course]");
  const addButton = event.target.closest("[data-add-meal]");
  const plusButton = event.target.closest("[data-qty-plus]");
  const minusButton = event.target.closest("[data-qty-minus]");
  const removeButton = event.target.closest("[data-remove-meal]");

  if (langButton) {
    state.lang = langButton.dataset.lang;
    localStorage.setItem("mamasTableLang", state.lang);
    applyTranslations();
    renderMenu();
    renderCart();
  }

  if (cuisineButton) {
    state.cuisine = cuisineButton.dataset.cuisine;
    state.course = "all";
    renderMenu();
    document.querySelector("[data-course-chips]").scrollIntoView({ behavior: "smooth", block: "center" });
  }

  if (courseButton) {
    state.course = courseButton.dataset.course;
    renderCourses();
    renderCatalog();
    document.querySelector("[data-catalog-grid]").scrollIntoView({ behavior: "smooth", block: "start" });
  }

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
    status.textContent = t("form.statusOpen");
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");

    window.setTimeout(() => {
      status.textContent = t("form.statusFallback");
    }, 900);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setupHeader();
  applyTranslations();
  renderMenu();
  renderCart();
  setupForm();
  document.addEventListener("click", handleDocumentClick);
  observeReveals();
  refreshIcons();
});
