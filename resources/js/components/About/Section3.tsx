import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal, Parallax, Stagger, StaggerItem } from '../motion';
import { useContent, words } from '../../content/useContent';
import { useT } from '../../i18n/useLocale';

const Photo: React.FC<{ src: string; caption: string; direction: 'left' | 'right'; offset: number }> = ({ src, caption, direction, offset }) => (
  <Parallax offset={offset}>
    <Reveal direction={direction} distance={50} duration={1.1}>
      <div className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift">
        <img
          src={src}
          alt={caption}
          className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <p className="absolute bottom-5 left-5 translate-y-3 font-display text-xl font-semibold text-white opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
          {caption}
        </p>
      </div>
    </Reveal>
  </Parallax>
);

export const Section3: React.FC = () => {
  const { content } = useContent();
  const t = useT();
  const about = content.about;

  return (
    <section className="section-y relative overflow-hidden bg-mist">
      <div className="container-x">
        <SectionHeading
          key={about.howTitle}
          align="center"
          eyebrow={about.howEyebrow}
          title={about.howTitle}
          highlight={words(about.howHighlight)}
          description={about.howDescription}
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <Photo src={about.imageOne} caption={t.about.captionOne} direction="left" offset={30} />
          <Photo src={about.imageTwo} caption={t.about.captionTwo} direction="right" offset={-30} />
        </div>

        {about.values.length > 0 && (
          <Stagger stagger={0.12} className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {about.values.map((v, i) => (
              <StaggerItem key={`${v.title}-${i}`}>
                <div className="group h-full rounded-3xl border border-line bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                  <span className="font-display text-sm font-medium text-brand">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink">{v.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{v.text}</p>
                  <span className="mt-6 block h-px w-10 bg-brand transition-all duration-500 group-hover:w-full" />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </section>
  );
};
