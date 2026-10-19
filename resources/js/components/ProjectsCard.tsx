import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { EASE } from './motion/variants';
import { useT } from '../i18n/useLocale';

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  link: string;
  tag?: string;
  index?: number;
}

/**
 * Work card: the screenshot sits in a framed "device" that lifts on hover,
 * while the copy lives in its own dark panel so it never fights the image.
 */
export const ProjectsCard: React.FC<ProjectProps> = ({ title, description, image, link, tag, index }) => {
  const t = useT();
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-mist shadow-soft transition-shadow duration-500 hover:shadow-lift"
    >
      {/* Frame */}
      <div className="relative overflow-hidden px-5 pt-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(15,4,255,0.14),transparent)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <motion.div
          variants={{ rest: { y: 0, rotateX: 0 }, hover: { y: -10, rotateX: 2 } }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative aspect-[4/3] overflow-hidden rounded-t-2xl border border-b-0 border-ink/10 bg-white shadow-[0_24px_50px_-24px_rgba(10,10,20,0.45)]"
          style={{ transformPerspective: 900 }}
        >
          {/* Browser chrome */}
          <div className="flex h-7 items-center gap-1.5 border-b border-ink/5 bg-mist px-3">
            <span className="h-2 w-2 rounded-full bg-ink/15" />
            <span className="h-2 w-2 rounded-full bg-ink/15" />
            <span className="h-2 w-2 rounded-full bg-ink/15" />
            <span className="ml-2 h-3 flex-1 rounded-full bg-ink/5" />
          </div>
          <motion.img
            src={image}
            alt={title}
            variants={{ rest: { objectPosition: '50% 0%' }, hover: { objectPosition: '50% 100%' } }}
            transition={{ duration: 3, ease: EASE }}
            className="h-[calc(100%-1.75rem)] w-full object-cover"
          />
        </motion.div>
      </div>

      {/* Copy panel */}
      <div className="relative flex flex-1 flex-col bg-ink p-6 text-white">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand/50 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <div className="relative flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/70">
                {tag || t.work.defaultTag}
              </span>
              {typeof index === 'number' && (
                <span className="font-display text-[12px] font-medium text-white/40">{String(index + 1).padStart(2, '0')}</span>
              )}
            </div>
            <h3 className="mt-3 font-display text-[1.45rem] font-semibold leading-tight tracking-tight">{title}</h3>
            <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-white/60">{description}</p>
          </div>
          <motion.span
            variants={{ rest: { rotate: 0, backgroundColor: 'rgba(255,255,255,0.08)' }, hover: { rotate: 45, backgroundColor: 'rgba(15,4,255,1)' } }}
            transition={{ duration: 0.6, ease: EASE }}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white"
          >
            <FiArrowUpRight className="h-5 w-5" />
          </motion.span>
        </div>
      </div>
    </motion.a>
  );
};
