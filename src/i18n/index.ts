import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
import en from './locales/en/translation.json';
import ptBR from './locales/pt-BR/translation.json';

const resources = {
  en: {
    translation: en,
  },
  'pt-BR': {
    translation: ptBR,
  },
};

i18n
  // TODO: fetch translation files from server (static json files)
  // .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    // debug: true,
  });

export default i18n;
