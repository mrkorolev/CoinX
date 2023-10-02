import {I18n} from "i18n-js";
import * as Localization from "expo-localization";

// Localization setup:
const translations = {
    en: require('./locales/en.json'),
    tr: require('./locales/tr.json'),
    ru: require('./locales/ru.json'),
}
export const i18n = new I18n(translations);
// i18n.locale = Localization.locale;
i18n.locale = 'ru';
i18n.enableFallback = true;
