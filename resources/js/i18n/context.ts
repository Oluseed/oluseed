import { createContext } from 'react';
import { en, type Dictionary } from './en';
import { fr } from './fr';

export type Locale = 'en' | 'fr';

export const LOCALES: Locale[] = ['en', 'fr'];
export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_KEY = 'oluseed_locale';

export const dictionaries: Record<Locale, Dictionary> = { en, fr };

export const isLocale = (v: unknown): v is Locale => typeof v === 'string' && (LOCALES as string[]).includes(v);

export const readStoredLocale = (): Locale => {
  try {
    const stored = localStorage.getItem(LOCALE_KEY);
    if (isLocale(stored)) return stored;
    const browser = navigator.language?.slice(0, 2).toLowerCase();
    if (isLocale(browser)) return browser;
  } catch {
    /* ignore */
  }
  return DEFAULT_LOCALE;
};

export interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dictionary;
}

export const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: en,
});
