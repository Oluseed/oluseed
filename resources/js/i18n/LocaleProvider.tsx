import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LOCALE, LOCALE_KEY, LocaleContext, dictionaries, readStoredLocale, type Locale } from './context';

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() => (typeof window === 'undefined' ? DEFAULT_LOCALE : readStoredLocale()));

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(LOCALE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = dictionaries[locale].meta.htmlLang;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, t: dictionaries[locale] }), [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};
