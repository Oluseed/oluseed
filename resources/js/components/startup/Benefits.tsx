import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Stagger, StaggerItem, TiltCard } from '../motion';
import { useContent, words } from '../../content/useContent';

const Benefits: React.FC = () => {
  const { content } = useContent();
  const c = content.careers;
  if (c.perks.length === 0) return null;

  return (
    <section className="section-y relative overflow-hidden bg-mist">
      <div className="pointer-events-none absolute -left-40 top-0 h-[460px] w-[460px] rounded-full bg-brand-100/60 blur-[140px]" />
      <div className="container-x">
        <SectionHeading key={c.perksTitle} align="center" eyebrow={c.perksEyebrow} title={c.perksTitle} highlight={words(c.perksHighlight)} description={c.perksDescription} />

        <Stagger stagger={0.1} className="mt-14 grid gap-5 sm:grid-cols-2">
          {c.perks.map((b, i) => (
            <StaggerItem key={`${b.title}-${i}`} y={34}>
              <TiltCard
                max={5}
                className="group card-border-glow flex h-full gap-5 rounded-[1.75rem] border border-line bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:p-7"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 transition-all duration-500 group-hover:rotate-6 group-hover:bg-brand-100 sm:h-16 sm:w-16">
                  {b.image ? <img src={b.image} alt="" className="h-8 w-8 object-contain sm:h-9 sm:w-9" /> : <span className="h-3 w-3 rounded-full bg-brand" />}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink">{b.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{b.description}</p>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default Benefits;
