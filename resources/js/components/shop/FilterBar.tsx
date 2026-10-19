import React from 'react';
import { motion } from 'framer-motion';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  labelFor?: (category: string) => string;
}

export const FilterBar: React.FC<FilterBarProps> = ({ categories, selectedCategory, setSelectedCategory, labelFor = (c) => c }) => {
  return (
    <div className="scrollbar-hide -mx-5 flex gap-2 overflow-x-auto px-5 py-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
      {categories.map((category) => {
        const active = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`relative shrink-0 rounded-full border px-5 py-2.5 text-[13.5px] font-medium transition-colors duration-300 ${
              active ? 'border-transparent text-white' : 'border-line bg-white text-ink/70 hover:border-ink/30 hover:text-ink'
            }`}
          >
            {active && (
              <motion.span
                layoutId="shop-filter"
                className="absolute inset-0 rounded-full bg-brand shadow-glow"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{labelFor(category)}</span>
          </button>
        );
      })}
    </div>
  );
};
