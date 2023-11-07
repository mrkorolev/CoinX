import {I18n} from "i18n-js";

const translations = {
    en: require('./locales/en.json'),
    tr: require('./locales/tr.json'),
    ru: require('./locales/ru.json'),
}
export const i18n = new I18n(translations);

i18n.locale = 'tr';
i18n.enableFallback = true;
