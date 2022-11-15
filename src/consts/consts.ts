interface IConstPageData {
  name: string;
  path: string;
  isLoggin: boolean;
}

const pages = [
  { name: 'BOARDS', path: '/boards', isLoggin: true },
  { name: 'NEW BOARD', path: '/board', isLoggin: true },
  { name: 'PROFILE', path: '/profile', isLoggin: true },
  { name: 'LOGIN', path: '/authorization', isLoggin: false },
  { name: 'SIGN UP', path: '/registration', isLoggin: false },
  { name: 'LOG OUT', path: '/', isLoggin: true },
];
const langs = ['EN', 'RU'];

export { pages, langs };
export type { IConstPageData };
