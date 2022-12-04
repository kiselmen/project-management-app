import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: localStorage.getItem('I18N_LANGUAGE') || 'en',
    resources: {
      en: {
        translations: require('./locales/en/translations.json'),
      },
      ru: {
        translations: require('./locales/ru/translations.json'),
      },
    },
    ns: ['translations'],
    defaultNS: 'translations',
  });

i18n.languages = ['en', 'ru'];

export default i18n;
