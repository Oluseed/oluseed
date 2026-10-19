import { createContext } from 'react';
import type { SiteContent } from './types';
import defaultsEn from './default-content.json';
import defaultsFr from './default-content.fr.json';
import type { Locale } from '../i18n/context';

export const defaultContent = defaultsEn as SiteContent;

export const defaultContentFor = (locale: Locale): SiteContent => (locale === 'fr' ? (defaultsFr as SiteContent) : defaultContent);

export interface ContentContextValue {
  content: SiteContent;
  locale: Locale;
  loading: boolean;
  /** True when the API could not be reached and bundled defaults are shown. */
  offline: boolean;
  refresh: () => Promise<void>;
  setContent: (next: SiteContent) => void;
}

export const ContentContext = createContext<ContentContextValue>({
  content: defaultContent,
  locale: 'en',
  loading: false,
  offline: false,
  refresh: async () => {},
  setContent: () => {},
});
