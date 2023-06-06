import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import en from './assets/en/en.json';
import ua from './assets/ua/ua.json';
import it from './assets/it/it.json';
import pl from './assets/pl/pl.json';
import LanguageDetector from 'i18next-browser-languagedetector';
import LocalStorageBackend from 'i18next-localstorage-backend';

export const resources = {
  en: {
    translation: en,
  },
  ua: {
    translation: ua,
  },
  pl: {
    translation: pl,
  },
  it: {
    translation: it,
  },
};

i18n
  .use(LanguageDetector)
  .use(LocalStorageBackend)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['localStorage'],
      cache: ['localStorage'],
    },

    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
