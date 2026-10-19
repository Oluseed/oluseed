import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ProjectsCard } from '../ProjectsCard';
import { EASE } from '../motion/variants';
import { Reveal } from '../motion';
import { useContent } from '../../content/useContent';
import { useT } from '../../i18n/useLocale';

export const ProjectLists: React.FC = () => {
  const { content, locale } = useContent();
  const t = useT();
  const projects = content.projects;
  const ALL = '__all__';
  const categories = [ALL, ...new Set(projects.map((p) => p.category).filter(Boolean))];
  const [active, setActive] = useState(ALL);
  const visible = active === ALL || !categories.includes(active) ? projects : projects.filter((p) => p.category === active);
  React.useEffect(() => setActive(ALL), [locale]);

  return (
    <section className="section-y bg-white">
      <div className="container-x">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[14px] text-muted">
            {t.work.showing} <span className="font-semibold text-ink">{visible.length}</span> {t.work.of} {projects.length} {t.work.projects}
          </p>
          <div className="scrollbar-hide -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
            {categories.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`relative shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                  active === f ? 'text-white' : 'text-ink/60 hover:text-ink'
                }`}
              >
                {active === f && (
                  <motion.span layoutId="work-filter" className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                )}
                <span className="relative">{f === ALL ? t.work.all : f}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {projects.length === 0 ? (
          <div className="mt-16 rounded-[2rem] border border-dashed border-line bg-mist/60 p-14 text-center">
            <p className="font-display text-2xl font-semibold text-ink">{t.work.comingSoon}</p>
          </div>
        ) : (
          <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((p, i) => (
                <motion.li
                  layout
                  key={p.id}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.04 }}
                >
                  <ProjectsCard {...p} index={i} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </div>
    </section>
  );
};
