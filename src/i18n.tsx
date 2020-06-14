import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import common_es from "./translations/es/common.json";
import common_en from "./translations/en/common.json";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: common_en,
  },
  es: {
    translation: common_es,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
  });

export default i18n;
