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

