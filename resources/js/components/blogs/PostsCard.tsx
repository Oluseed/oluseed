import React from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUpRight, FiMessageSquare, FiUser } from 'react-icons/fi';
import { EASE } from '../motion/variants';
import type { BlogPost } from '../../content/types';
import { useT } from '../../i18n/useLocale';

interface PostsCardProps {
  blog: BlogPost[];
}

export const PostsCard: React.FC<PostsCardProps> = ({ blog }) => {
  const t = useT();
  return (
    <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {blog.map((item, i) => (
          <motion.article
            layout
            key={item.id}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
            className="group"
          >
            <Link
              to={`/blogs/${item.id}`}
              className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand backdrop-blur">
                  {item.category}
                </span>
                <div className="absolute bottom-4 right-4 grid h-14 w-14 place-items-center rounded-2xl bg-brand text-center text-white shadow-glow">
                  <div className="leading-none">
                    <p className="font-display text-lg font-semibold">{item.day}</p>
                    <p className="text-[10px] uppercase tracking-wider text-white/80">{item.month}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <FiUser className="h-3.5 w-3.5" /> {item.author}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FiMessageSquare className="h-3.5 w-3.5" /> {item.comments.length} {item.comments.length === 1 ? t.blog.comment : t.blog.comments}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-[1.35rem] font-semibold leading-tight tracking-tight text-ink transition-colors duration-300 group-hover:text-brand">
                  {item.title}
                </h3>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[13px] font-semibold text-ink/70">
                  {t.blog.readArticle}
                  <FiArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
