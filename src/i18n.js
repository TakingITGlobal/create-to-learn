import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import En from './assets/locales/en/translation.json';
import Fr from './assets/locales/fr/translation.json';

i18n
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    lng: "en",
    resources: {
      en: { translation: En },
      fr: { translation: Fr }
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === "development",
    react: {
      bindI18n: 'languageChanged',
      bindI18nStore: '',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;