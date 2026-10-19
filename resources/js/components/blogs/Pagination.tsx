import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useT } from '../../i18n/useLocale';

interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPosts, postsPerPage, currentPage, setCurrentPage }) => {
  const t = useT();
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  if (totalPages <= 1) return null;

  const go = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setCurrentPage(p);
    window.scrollTo({ top: 420, behavior: 'smooth' });
  };

  const btn =
    'grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink transition-all duration-300 hover:border-ink disabled:opacity-30 disabled:hover:border-line';

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <button onClick={() => go(currentPage - 1)} disabled={currentPage === 1} className={btn} aria-label={t.blog.prev}>
        <FiChevronLeft />
      </button>
      <div className="flex items-center gap-1 rounded-full border border-line bg-white p-1">
        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          const active = p === currentPage;
          return (
            <button
              key={p}
              onClick={() => go(p)}
              className={`relative h-9 w-9 rounded-full text-[13.5px] font-semibold transition-colors ${
                active ? 'text-white' : 'text-ink/60 hover:text-ink'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="pagination-pill"
                  className="absolute inset-0 rounded-full bg-brand"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{p}</span>
            </button>
          );
        })}
      </div>
      <button
        onClick={() => go(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={btn}
        aria-label={t.blog.next}
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
