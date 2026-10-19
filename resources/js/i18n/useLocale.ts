import { useContext } from 'react';
import { LocaleContext } from './context';

export const useLocale = () => useContext(LocaleContext);

/** The active translation dictionary. Usage: `const t = useT(); t.nav.home` */
export const useT = () => useContext(LocaleContext).t;
