import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { SectionHeading } from '../ui/SectionHeading';
import { Stagger, StaggerItem, Reveal } from '../motion';
import { useContent, words } from '../../content/useContent';
import { iconFor } from '../ui/icons';
import { useT } from '../../i18n/useLocale';

const WhyOluseed: React.FC = () => {
  const { content } = useContent();
  const t = useT();
  const why = content.why;

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <section className="section-y relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[460px] w-[460px] rounded-full bg-cream blur-[120px]" />

      <div ref={ref} className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <motion.div style={{ y, rotate }} className="relative mx-auto w-[82%] max-w-[420px]">
            <Reveal direction="left" distance={60} duration={1.1}>
              <div className="relative overflow-hidden rounded-[2rem] shadow-lift">
                <img src={why.image} alt="Why choose Oluseed" className="w-full" />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand/30 to-transparent mix-blend-multiply" />
              </div>
            </Reveal>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.5 }}
            className="absolute -right-2 top-8 animate-float rounded-2xl border border-line bg-white p-4 shadow-lift sm:right-6"
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t.home.clientRating}</p>
            <p className="mt-1 font-display text-3xl font-semibold text-ink">
              {why.rating}
              <span className="text-brand">/5</span>
            </p>
            <div className="mt-1 flex gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + i * 0.08, type: 'spring', stiffness: 300 }}
                >
                  ★
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.7 }}
            className="absolute -left-2 bottom-10 animate-float-slow rounded-2xl bg-ink p-4 text-white shadow-lift sm:left-4"
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">{t.home.projectsDelivered}</p>
            <p className="mt-1 font-display text-3xl font-semibold">{why.delivered}</p>
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading key={why.title} eyebrow={why.eyebrow} title={why.title} highlight={words(why.highlight)} />

          <Stagger stagger={0.12} className="mt-10 space-y-3">
            {why.benefits.map((b, i) => {
              const Icon = iconFor(b.icon);
              return (
                <StaggerItem key={`${b.heading}-${i}`}>
                  <div className="group flex gap-5 rounded-2xl border border-transparent p-4 transition-all duration-500 hover:border-line hover:bg-mist/70">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand transition-all duration-500 group-hover:bg-brand group-hover:text-white group-hover:shadow-glow">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink">{b.heading}</h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-muted">{b.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          <Stagger stagger={0.08} delay={0.2} className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {why.checks.map((c, i) => (
              <StaggerItem key={`${c}-${i}`} y={12}>
                <div className="flex items-center gap-2 text-[14px] font-medium text-ink/80">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                    <FiCheck className="h-3 w-3" />
                  </span>
                  {c}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
};

export default WhyOluseed;
