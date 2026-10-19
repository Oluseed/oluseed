import React, { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import { useT } from '../../i18n/useLocale';

export const ALL_POSTS = '__all__';

interface FilterBarProps {
  setBlogCategory: (category: string) => void;
  categories: string[];
  active: string;
}

const FilterBar: React.FC<FilterBarProps> = ({ setBlogCategory, categories, active }) => {
  const t = useT();
  const [query, setQuery] = useState('');

  const apply = () => {
    if (query.trim() !== '') setBlogCategory(query.trim());
  };

  const reset = () => {
    setBlogCategory(ALL_POSTS);
    setQuery('');
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2">
        {[ALL_POSTS, ...categories].map((c) => (
          <button
            key={c}
            onClick={() => {
              setBlogCategory(c);
              setQuery('');
            }}
            className={`relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
              active.toLowerCase() === c.toLowerCase() ? 'text-white' : 'text-ink/60 hover:text-ink'
            }`}
          >
            {active.toLowerCase() === c.toLowerCase() && (
              <motion.span
                layoutId="blog-filter"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{c === ALL_POSTS ? t.blog.allPosts : c}</span>
          </button>
        ))}
      </div>

      <div className="relative w-full md:w-[320px]">
        <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && apply()}
          placeholder={t.blog.search}
          className="input-premium rounded-full py-3 pl-11 pr-11 text-[14px]"
        />
        <AnimatePresence>
          {(query || active !== ALL_POSTS) && (
            <motion.button
              key="reset"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              onClick={reset}
              aria-label={t.blog.resetFilter}
              className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-mist text-ink transition-colors hover:bg-brand hover:text-white"
            >
              <FiX className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FilterBar;
