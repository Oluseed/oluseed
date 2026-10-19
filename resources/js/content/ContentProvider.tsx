import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ContentContext, defaultContentFor } from './context';
import type { SiteContent } from './types';
import { api } from './api';
import { useLocale } from '../i18n/useLocale';

/**
 * Deep-merges server content over bundled defaults so new fields added in
 * code still render even if the saved JSON predates them.
 */
const merge = <T,>(base: T, over: unknown): T => {
  if (Array.isArray(base)) return (Array.isArray(over) ? over : base) as T;
  if (base && typeof base === 'object' && over && typeof over === 'object') {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [k, v] of Object.entries(over as Record<string, unknown>)) {
      out[k] = k in (base as object) ? merge((base as Record<string, unknown>)[k], v) : v;
    }
    return out as T;
  }
  return (over === undefined || over === null ? base : over) as T;
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { locale } = useLocale();
  const [content, setContentState] = useState<SiteContent>(() => defaultContentFor(locale));
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);
  const requestId = useRef(0);

  const refresh = useCallback(async () => {
    const id = ++requestId.current;
    setLoading(true);
    try {
      const data = await api.getContent(locale);
      if (id !== requestId.current) return; // a newer request (language switch) won
      setContentState(merge(defaultContentFor(locale), data));
      setOffline(false);
    } catch {
      if (id !== requestId.current) return;
      setContentState(defaultContentFor(locale));
      setOffline(true);
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      content,
      locale,
      loading,
      offline,
      refresh,
      setContent: (next: SiteContent) => setContentState(merge(defaultContentFor(locale), next)),
    }),
    [content, locale, loading, offline, refresh],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};
