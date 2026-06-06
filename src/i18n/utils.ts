import { en } from './en';
import { sr } from './sr';
import { de } from './de';

export type Lang = 'en' | 'sr' | 'de';

const translations = { en, sr, de };

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  if (first === 'sr' || first === 'de') return first as Lang;
  return 'en';
}

export function useTranslations(lang: Lang) {
  return translations[lang];
}
