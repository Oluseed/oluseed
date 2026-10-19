import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUpRight, FiMapPin } from 'react-icons/fi';
import { EASE } from '../motion/variants';
import type { JobItem } from '../../content/types';
import { useT } from '../../i18n/useLocale';

interface JobsProps {
  jobs: JobItem[];
  onApply: (job: JobItem) => void;
}

const JobListings: React.FC<JobsProps> = ({ jobs, onApply }) => {
  const t = useT();
  return (
    <motion.ul layout className="mt-10 space-y-3">
      <AnimatePresence mode="popLayout">
        {jobs.map((job, i) => (
          <motion.li
            layout
            key={job.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
          >
            <button
              type="button"
              onClick={() => onApply(job)}
              className="group relative flex w-full flex-col gap-4 overflow-hidden rounded-[1.5rem] border border-line bg-white p-5 text-left shadow-soft transition-all duration-500 hover:-translate-y-0.5 hover:border-transparent hover:shadow-lift sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6"
            >
              <span className="absolute inset-y-0 left-0 w-1 origin-bottom scale-y-0 bg-brand transition-transform duration-500 group-hover:scale-y-100" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-brand">{job.title}</h3>
                  <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">{job.department}</span>
                </div>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-[13.5px] text-muted">
                  <FiMapPin className="h-3.5 w-3.5" /> {job.role}
                </p>
                {job.description && <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{job.description}</p>}
              </div>
              <span className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-[13px] font-semibold text-white transition-all duration-500 group-hover:bg-brand">
                {t.careers.apply}
                <FiArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
};

export default JobListings;
