import React from 'react';
import { Link } from 'react-router';
import { FiArrowUpRight } from 'react-icons/fi';
import { SectionHeading } from '../ui/SectionHeading';
import { Stagger, StaggerItem, TiltCard, Reveal } from '../motion';
import { Button } from '../Button';
import { useContent, words } from '../../content/useContent';
import { iconFor } from '../ui/icons';
import { useT } from '../../i18n/useLocale';

const OurService: React.FC = () => {
  const { content } = useContent();
  const t = useT();
  const s = content.services;

  return (
    <section className="section-y relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-brand-100/60 blur-[140px]" />

      <div className="container-x relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading key={s.title} eyebrow={s.eyebrow} title={s.title} highlight={words(s.highlight)} description={s.description} />
          <Reveal delay={0.4} className="shrink-0">
            <Button to="/contact" variant="secondary">
              {t.home.discussProject}
            </Button>
          </Reveal>
        </div>

        <Stagger stagger={0.06} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {s.items.map((item, i) => {
            const Icon = iconFor(item.icon);
            return (
              <StaggerItem key={`${item.title}-${i}`} className={item.wide ? 'lg:col-span-2' : ''}>
                <TiltCard
                  max={6}
                  className="group card-border-glow h-full rounded-3xl border border-line bg-mist/60 p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-lift"
                >
                  <div className="flex h-full flex-col">
                    <div className="flex items-start justify-between">
                      <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-white text-brand shadow-soft transition-all duration-500 group-hover:bg-brand group-hover:text-white group-hover:shadow-glow">
                        <Icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
                      </span>
                      <span className="font-display text-[12px] font-medium text-muted/60">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="mt-7 font-display text-[1.35rem] font-semibold leading-tight tracking-tight text-ink">{item.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted">{item.desc}</p>
                    <Link
                      to="/contact"
                      className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[13px] font-semibold text-ink/70 transition-colors group-hover:text-brand"
                    >
                      {t.common.contactUs}
                      <FiArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}

          <StaggerItem className="lg:col-span-2">
            <Link
              to="/contact"
              className="group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl bg-ink p-7 text-white transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-brand/60 blur-3xl transition-transform duration-700 group-hover:scale-150" />
              <div className="absolute inset-0 grid-bg-dark opacity-40" />
              <span className="relative eyebrow text-brand-200">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-200" /> {t.home.somethingElse}
              </span>
              <div className="relative">
                <h3 className="font-display text-2xl font-semibold leading-tight">{t.home.tellIdea}</h3>
                <span className="mt-4 inline-grid h-11 w-11 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45">
                  <FiArrowUpRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
};

export default OurService;
