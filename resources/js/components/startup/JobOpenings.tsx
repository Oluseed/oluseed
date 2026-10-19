import React, { useState } from 'react';
import { motion } from 'framer-motion';
import JobsFilterBar from './JobsFilterBar';
import JobListings from './JobListings';
import { ApplicationModal } from './ApplicationModal';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../motion';
import { Button } from '../Button';
import { useContent, words } from '../../content/useContent';
import { useT } from '../../i18n/useLocale';
import type { JobItem } from '../../content/types';

const JobOpenings: React.FC = () => {
  const { content } = useContent();
  const t = useT();
  const jobs = content.careers.jobs.filter((j) => j.open);
  const departments = [t.careers.allDepartments, ...new Set([...content.careers.departments, ...jobs.map((j) => j.department)].filter(Boolean))];
  const [active, setActive] = useState<string>(t.careers.allDepartments);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<JobItem | null>(null);
  const isAll = active === t.careers.allDepartments || !departments.includes(active);
  const filtered = isAll ? jobs : jobs.filter((job) => job.department === active);

  const apply = (job: JobItem | null) => {
    setSelected(job);
    setModalOpen(true);
  };

  return (
    <section id="openings" className="section-y scroll-mt-24 bg-white">
      <div className="container-x">
        <SectionHeading key={t.meta.code} align="center" eyebrow={t.careers.eyebrow} title={t.careers.title} highlight={words(t.careers.highlight)} description={t.careers.description} />

        <Reveal delay={0.2} className="mx-auto mt-10 max-w-4xl">
          <JobsFilterBar departments={departments} active={isAll ? t.careers.allDepartments : active} onSelect={setActive} />
        </Reveal>

        <div className="mx-auto max-w-4xl">
          {filtered.length > 0 ? (
            <JobListings jobs={filtered} onApply={apply} />
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10 rounded-[2rem] border border-dashed border-line bg-mist/60 p-10 text-center sm:p-14">
              <p className="font-display text-2xl font-semibold text-ink">{jobs.length === 0 ? t.careers.noOpenings : t.careers.noOpeningsIn(active)}</p>
              <p className="mt-2 text-[14px] text-muted">{t.careers.stillLove}</p>
            </motion.div>
          )}

          <Reveal delay={0.2} className="mt-10 flex flex-col items-center justify-between gap-4 rounded-[1.5rem] border border-line bg-mist/60 p-6 text-center sm:flex-row sm:text-left">
            <div>
              <p className="font-display text-lg font-semibold text-ink">{t.careers.noRole}</p>
              <p className="mt-1 text-[13.5px] text-muted">{t.careers.tellUs}</p>
            </div>
            <Button onClick={() => apply(null)} variant="dark">
              {t.careers.general}
            </Button>
          </Reveal>
        </div>
      </div>

      <ApplicationModal open={modalOpen} onClose={() => setModalOpen(false)} job={selected} jobs={jobs} />
    </section>
  );
};

export default JobOpenings;
