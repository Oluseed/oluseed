import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUpRight, FiCalendar, FiCheck, FiClock, FiDollarSign, FiMapPin } from 'react-icons/fi';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal, Stagger, StaggerItem, TiltCard } from '../motion';
import { Button } from '../Button';
import { EASE } from '../motion/variants';
import { ApplicationModal } from '../startup/ApplicationModal';
import JobsFilterBar from '../startup/JobsFilterBar';
import { useContent, words } from '../../content/useContent';
import { useT } from '../../i18n/useLocale';
import type { InternshipItem, JobItem } from '../../content/types';

const toJob = (i: InternshipItem): JobItem => ({
  id: i.id,
  title: i.title,
  department: i.department,
  role: [i.duration, i.location].filter(Boolean).join(' · '),
  description: i.description,
  open: i.open,
});

export const InternshipList: React.FC = () => {
  const { content, locale } = useContent();
  const t = useT();
  const section = content.internships;
  const open = section.items.filter((i) => i.open);
  const ALL = '__all__';
  const departments = [ALL, ...new Set(open.map((i) => i.department).filter(Boolean))];
  const [active, setActive] = useState(ALL);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<JobItem | null>(null);

  useEffect(() => setActive(ALL), [locale]);

  const visible = active === ALL || !departments.includes(active) ? open : open.filter((i) => i.department === active);
  const jobs = open.map(toJob);

  const apply = (item: InternshipItem | null) => {
    setSelected(item ? toJob(item) : null);
    setModalOpen(true);
  };

  return (
    <>
      {/* How it works */}
      {section.steps.length > 0 && (
        <section className="section-y relative overflow-hidden bg-white">
          <div className="pointer-events-none absolute -right-40 top-0 h-[460px] w-[460px] rounded-full bg-brand-100/60 blur-[140px]" />
          <div className="container-x">
            <SectionHeading key={section.howTitle} align="center" eyebrow={section.howEyebrow} title={section.howTitle} highlight={words(section.howHighlight)} />
            <Stagger stagger={0.12} className="mt-14 grid gap-5 md:grid-cols-3">
              {section.steps.map((s, i) => (
                <StaggerItem key={`${s.title}-${i}`} y={34}>
                  <div className="group relative h-full rounded-[1.75rem] border border-line bg-mist/60 p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-lift">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white font-display text-lg font-semibold shadow-glow">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-6 font-display text-xl font-semibold text-ink">{s.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">{s.text}</p>
                    <span className="mt-6 block h-px w-10 bg-brand transition-all duration-500 group-hover:w-full" />
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Openings */}
      <section id="internships" className="section-y scroll-mt-24 bg-mist">
        <div className="container-x">
          <SectionHeading key={section.title} align="center" eyebrow={section.eyebrow} title={section.title} highlight={words(section.highlight)} description={section.description} />

          {departments.length > 2 && (
            <Reveal delay={0.2} className="mx-auto mt-10 max-w-4xl">
              <JobsFilterBar
                departments={departments}
                active={active}
                onSelect={setActive}
                labelFor={(d) => (d === ALL ? t.internships.allDepartments : d)}
              />
            </Reveal>
          )}

          {visible.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-dashed border-line bg-white/70 p-10 text-center sm:p-14">
              <p className="font-display text-2xl font-semibold text-ink">{open.length === 0 ? t.internships.noOpenings : t.internships.noOpeningsIn(active)}</p>
              <p className="mt-2 text-[14px] text-muted">{t.internships.stillLove}</p>
            </motion.div>
          ) : (
            <motion.ul layout className="mt-12 grid gap-5 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {visible.map((item, i) => (
                  <motion.li
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.97 }}
                    transition={{ duration: 0.55, ease: EASE, delay: i * 0.05 }}
                  >
                    <TiltCard max={4} className="group card-border-glow flex h-full flex-col rounded-[1.75rem] border border-line bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:p-7">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand">{item.department}</span>
                        {item.stipend && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-600">
                            <FiDollarSign className="h-3 w-3" /> {item.stipend}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-brand">{item.title}</h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-muted">{item.description}</p>

                      <dl className="mt-5 grid grid-cols-2 gap-3 text-[13px] sm:grid-cols-3">
                        {item.duration && (
                          <div className="rounded-xl bg-mist px-3 py-2.5">
                            <dt className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted">
                              <FiClock /> {t.internships.duration}
                            </dt>
                            <dd className="mt-0.5 font-medium text-ink">{item.duration}</dd>
                          </div>
                        )}
                        {item.location && (
                          <div className="rounded-xl bg-mist px-3 py-2.5">
                            <dt className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted">
                              <FiMapPin /> {t.internships.location}
                            </dt>
                            <dd className="mt-0.5 font-medium text-ink">{item.location}</dd>
                          </div>
                        )}
                        {item.deadline && (
                          <div className="rounded-xl bg-mist px-3 py-2.5">
                            <dt className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted">
                              <FiCalendar /> {t.internships.deadline}
                            </dt>
                            <dd className="mt-0.5 font-medium text-ink">{item.deadline}</dd>
                          </div>
                        )}
                      </dl>

                      {item.requirements.length > 0 && (
                        <div className="mt-5">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/60">{t.internships.requirements}</p>
                          <ul className="mt-2 space-y-1.5">
                            {item.requirements.map((r, j) => (
                              <li key={`${r}-${j}`} className="flex items-start gap-2 text-[13.5px] text-ink/80">
                                <span className="mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-brand text-white">
                                  <FiCheck className="h-2.5 w-2.5" />
                                </span>
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="mt-auto pt-6">
                        <button
                          type="button"
                          onClick={() => apply(item)}
                          className="shine inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[14px] font-semibold text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-brand sm:w-auto"
                        >
                          {t.internships.apply}
                          <FiArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      </div>
                    </TiltCard>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}

          <Reveal delay={0.2} className="mx-auto mt-10 flex max-w-4xl flex-col items-center justify-between gap-4 rounded-[1.5rem] border border-line bg-white p-6 text-center sm:flex-row sm:text-left">
            <div>
              <p className="font-display text-lg font-semibold text-ink">{t.internships.noTrack}</p>
              <p className="mt-1 text-[13.5px] text-muted">{t.internships.tellUs}</p>
            </div>
            <Button onClick={() => apply(null)} variant="dark">
              {t.internships.general}
            </Button>
          </Reveal>
        </div>

        <ApplicationModal open={modalOpen} onClose={() => setModalOpen(false)} job={selected} jobs={jobs} kind="internship" />
      </section>
    </>
  );
};
