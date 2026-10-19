import { useContext } from 'react';
import { ContentContext } from './context';

export const useContent = () => useContext(ContentContext);

/** Splits a space-separated highlight string into the word list SplitText expects. */
export const words = (s: string | undefined) => (s ? s.split(/\s+/).filter(Boolean) : []);
