interface IConstPageData {
  name: string;
  path: string;
  isLoggin: boolean;
}

const pagesTotal = [
  { name: 'Boards', path: '/boards', isLoggin: true },
  { name: 'NEW BOARD', path: '/boards', isLoggin: true },
  { name: 'PROFILE', path: '/profile', isLoggin: true },
];

const pagesAuth = [
  { name: 'LOGIN', path: '/authorization', isLoggin: false },
  { name: 'SIGN UP', path: '/registration', isLoggin: false },
  { name: 'LOG OUT', path: '/', isLoggin: true },
];
const langs = ['en', 'ru'];
const BASE_URL = 'https://final-task-backend-production-08b7.up.railway.app/';

interface IDeveloper {
  name: string;
  path: string;
}

const developers = [
  { name: 'Tatsiana', path: 'https://github.com/Rarity110' },
  { name: 'Max', path: 'https://github.com/maxomeleneckii' },
  { name: 'Vasili', path: 'https://github.com/kiselmen' },
];

export { developers, pagesTotal, pagesAuth, langs, BASE_URL };
export type { IConstPageData, IDeveloper };
