import React from 'react';
import { FiCompass, FiEye } from 'react-icons/fi';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal, Stagger, StaggerItem, Counter, TiltCard } from '../motion';
import { useContent, words } from '../../content/useContent';

export const Section2: React.FC = () => {
  const { content } = useContent();
  const about = content.about;
  const stats = content.stats;

  const pillars = [
    { icon: FiCompass, title: about.missionTitle, description: about.mission },
    { icon: FiEye, title: about.visionTitle, description: about.vision },
  ];

  return (
    <section className="section-y relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-brand-100/60 blur-[150px]" />

      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading key={about.storyTitle} eyebrow={about.storyEyebrow} title={about.storyTitle} highlight={words(about.storyHighlight)} />
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <p className="text-[16px] leading-[1.8] text-muted sm:text-[17px]">{about.story}</p>
            </Reveal>

            <Stagger stagger={0.03} className="mt-8 flex flex-wrap gap-2">
              {about.capabilities.map((c, i) => (
                <StaggerItem key={`${c}-${i}`} y={10}>
                  <span className="inline-block rounded-full border border-line bg-mist/70 px-3.5 py-1.5 text-[12.5px] font-medium text-ink/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand-50 hover:text-brand">
                    {c}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        <Stagger stagger={0.15} className="mt-20 grid gap-5 md:grid-cols-2">
          {pillars.map(({ icon: Icon, title, description }, i) => (
            <StaggerItem key={title} y={40}>
              <TiltCard
                max={5}
                className={`group card-border-glow relative h-full overflow-hidden rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-1 sm:p-9 ${
                  i === 0 ? 'bg-ink text-white' : 'border border-line bg-mist/60 text-ink hover:bg-white hover:shadow-lift'
                }`}
              >
                {i === 0 && (
                  <>
                    <div className="absolute inset-0 grid-bg-dark opacity-40" />
                    <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/60 blur-3xl transition-transform duration-700 group-hover:scale-150" />
                  </>
                )}
                <div className="relative">
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl ${i === 0 ? 'bg-white/10 text-brand-200' : 'bg-white text-brand shadow-soft'}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-8 font-display text-3xl font-semibold tracking-tight">{title}</h3>
                  <p className={`mt-3 text-[15px] leading-relaxed ${i === 0 ? 'text-white/65' : 'text-muted'}`}>{description}</p>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>

        {stats.length > 0 && (
          <Reveal delay={0.1} className="mt-20">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand to-brand-700 p-8 text-white shadow-glow md:p-12">
              <div className="absolute inset-0 grid-bg-dark opacity-30" />
              <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
              <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((s, i) => (
                  <div key={`${s.label}-${i}`} className="border-l border-white/20 pl-5">
                    <p className="font-display text-5xl font-semibold tracking-[-0.04em] md:text-6xl">
                      <Counter to={s.value} suffix={s.suffix} />
                    </p>
                    <p className="mt-2 text-[14px] text-white/75">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};
