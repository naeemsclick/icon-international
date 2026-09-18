import 'server-only';

export type Locale = 'en' | 'bn' | 'ar';

export const defaultLocale: Locale = 'en';
export const locales: Locale[] = ['en', 'bn', 'ar'];

const dictionaries = {
  en: () => import('../../../public/locales/en.json').then((module) => module.default),
  bn: () => import('../../../public/locales/bn.json').then((module) => module.default),
  ar: () => import('../../../public/locales/ar.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  if (!locales.includes(locale)) {
    return dictionaries[defaultLocale]();
  }
  return dictionaries[locale]();
};
