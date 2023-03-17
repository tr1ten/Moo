import { getLocales,locale } from 'expo-localization';
import en from './translations/en';
import hi from './translations/hi';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
export const LANGUAGES = [
    {
        label: 'English',
        value: 'en',
    },
    {
    label: 'हिंदी',
    value: 'hi',   
    }
]
const translations = {
 en,
 hi,
};

i18next.use(initReactI18next).init({
  lng: getLocales()[0].languageCode, // if you're using a language detector, do not define the lng option
  resources: translations,
  compatibilityJSON: 'v3', //Add this line

});

export function getLanguage() {
    return i18next.language;
}
export function setLanguage(language: string) {
    i18next.changeLanguage(language);
}

export function translate(key: string) {
    return i18next.t(key);
}