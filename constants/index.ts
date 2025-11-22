export const navigationLinks = [
  {
    href: "/library",
    label: "Library",
  },

  {
    img: "/icons/user.svg",
    selectedImg: "/icons/user-fill.svg",
    href: "/my-profile",
    label: "My Profile",
  },
];

export const adminSideBarLinks = [
  {
    img: "/icons/admin/home.svg",
    route: "/admin",
    text: "Главная",
  },
  {
    img: "/icons/admin/users.svg",
    route: "/admin/users",
    text: "Пользователи",
  },
  {
    img: "/icons/admin/book.svg",
    route: "/admin/books",
    text: "Книги",
  },
  {
    img: "/icons/admin/bookmark.svg",
    route: "/admin/book-requests",
    text: "Заявки по книгам",
  },
  {
    img: "/icons/admin/user.svg",
    route: "/admin/account-requests",
    text: "Заявки по профилям",
  },
];

export const FIELD_NAMES = {
  fullName: "ФИО (полностью)",
  email: "Email",
  universityId: "Университетский ID студента",
  password: "Пароль",
  universityCard: "Студенческий билет",
};

export const FIELD_TYPES = {
  fullName: "text",
  email: "email",
  universityId: "number",
  password: "password",
};

export const sampleBooks = [
  {
    id: 1,
    title: "Библиотека полуночи",
    author: "Мэтт Хейг",
    genre: "Современная проза / Магический реализм",
    rating: 4.6,
    total_copies: 20,
    available_copies: 10,
    description:
      "После неудачной попытки покончить с собой Нора Сид попадает в «полночную библиотеку» — мистическое место между жизнью и смертью, где каждая книга — это альтернативная версия её жизни. Она получает шанс прожить то, что могло бы быть.",
    color: "#1c1f40",
    cover: "https://m.media-amazon.com/images/I/81J6APjwxlL.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "Роман о сожалениях, выборе и ценности той жизни, которая дана — и о том, как найти внутри себя желание жить.",
    isLoanedBook: true,
  },
  {
    id: 2,
    title: "Атомные привычки",
    author: "Джеймс Клир",
    genre: "Саморазвитие / Практическая психология",
    rating: 4.9,
    total_copies: 99,
    available_copies: 50,
    description:
      "Джеймс Клир показывает, что большие перемены не требуют гигантских усилий — достаточно фокусироваться на маленьких, «атомных» привычках, которые каждый день приводят к значимым результатам. :contentReference[oaicite:1]{index=1}",
    color: "#fffdf6",
    cover: "https://m.media-amazon.com/images/I/81F90H7hnML.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "Практическое руководство: как вырабатываются привычки, почему систематический рост важнее мгновенных рывков и как сделать хорошие привычки неслучайными.",
  },
  {
    id: 3,
    title: "Вы не знаете JS: Область видимости и замыкания",
    author: "Кайл Симпсон",
    genre: "Компьютерные науки / JavaScript",
    rating: 4.7,
    total_copies: 9,
    available_copies: 5,
    description:
      "Глубокое погружение в одну из самых фундаментальных тем JavaScript — области видимости и замыкания. Автор разбирает, как они работают «под капотом», и как это влияет на архитектуру кода.",
    color: "#f8e036",
    cover: "https://m.media-amazon.com/images/I/7186YfjgHHL._AC_UF1000,1000_QL80_.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "Для всех, кто хочет не только писать на JS, но понимать, почему код ведёт себя так — вместо «работает просто».",
  },
  {
    id: 4,
    title: "Алхимик",
    author: "Пауло Коэльо",
    genre: "Философская проза / Приключения",
    rating: 4.5,
    total_copies: 78,
    available_copies: 50,
    description:
      "Пастух Сантьяго отправляется в путь, чтобы найти сокровище, и обнаруживает, что истинное богатство — не только в золоте, а в слышании своей души и следовании знакам судьбы.",
    color: "#ed6322",
    cover: "https://m.media-amazon.com/images/I/61HAE8zahLL._AC_UF1000,1000_QL80_.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "Легендарная притча о мечте, слушании сердца и путешествии, которое становится самим смыслом жизни.",
  },
  {
    id: 5,
    title: "Глубокая работа",
    author: "Кэл Ньюпорт",
    genre: "Саморазвитие / Продуктивность",
    rating: 4.7,
    total_copies: 23,
    available_copies: 23,
    description:
      "В мире отвлекающих факторов автор предлагает метод: как сосредоточиться, работать глубоко и создать результаты, которые имеют значение, избегая поверхностных задач.",
    color: "#ffffff",
    cover: "https://m.media-amazon.com/images/I/81JJ7fyyKyS.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "Книга о том, как продуктивность снова становится искусством — когда мы выбираем работу, которая требует внимания и навыка, и отказываемся от шумных поверхностей.",
  },
  {
    id: 6,
    title: "Чистый код",
    author: "Роберт Мартин",
    genre: "Компьютерные науки / Программирование",
    rating: 4.8,
    total_copies: 56,
    available_copies: 56,
    description:
      "Настольное руководство для программиста: как писать код, который легко читать, сопровождать и развивать, а не просто «работает». :contentReference[oaicite:2]{index=2}",
    color: "#080c0d",
    cover: "https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "Рассматривает анатомию плохого и хорошего кода, множество примеров и правила, которые позволяют поднять уровень мастерства разработки.",
  },
  {
    id: 7,
    title: "Прагматичный программист",
    author: "Эндрю Хант, Дэвид Томас",
    genre: "Компьютерные науки / Программирование",
    rating: 4.8,
    total_copies: 25,
    available_copies: 3,
    description:
      "Книга-классика для разработчиков: советы, практики и философия, помогающие превратить кодерство из работы в ремесло мастера. :contentReference[oaicite:3]{index=3}",
    color: "#100f15",
    cover: "https://m.media-amazon.com/images/I/71VStSjZmpL._AC_UF1000,1000_QL80_.jpg",
    video: "/sample-video/mp4?updatedAt=1722593504152",
    summary:
      "Уроки о гибкости, любознательности, критическом мышлении и постоянном улучшении — для программистов, которые хотят больше, чем «только сделать задачу».",
  },
  {
    id: 8,
    title: "Психология денег",
    author: "Морган Хаузел",
    genre: "Финансы / Научно-популярная литература",
    rating: 4.8,
    total_copies: 10,
    available_copies: 5,
    description:
      "Автор рассказывает 19 увлекательных историй о том, как отношение к деньгам, эмоции и личная история влияют на финансовые решения — гораздо больше, чем числа и формулы. :contentReference[oaicite:4]{index=4}",
    color: "#ffffff",
    cover: "https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "Книга о том, что богатство и счастье — не всегда о доходе и инвестициях, а о понимании себя и своих отношений с деньгами и риском.",
  },
];
