import i18n from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enTranslation from './translations/en.json';
import frTranslation from './translations/fr.json';

i18n
  .use(LngDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation },
    },
    detection: {
      order: ['navigator'],
    },
    load: 'languageOnly',
    fallbackLng: 'en',
  });

export default i18n;
