import React from 'react';
import { Reveal, SplitText } from '../motion';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string[];
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  highlight = [],
  description,
  align = 'left',
  light = false,
  className = '',
  children,
}) => {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && (
        <Reveal direction="up" distance={16} duration={0.7}>
          <span className={`eyebrow ${light ? 'text-brand-200' : ''} ${centered ? 'justify-center' : ''}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${light ? 'bg-brand-200' : 'bg-brand'}`} />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <SplitText
        as="h2"
        text={title}
        highlight={highlight}
        highlightClassName={light ? 'text-gradient-light' : 'text-brand'}
        className={`mt-4 font-display text-[2.2rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-[3.6rem] ${
          light ? 'text-white' : 'text-ink'
        }`}
        delay={0.1}
      />
      {description && (
        <Reveal delay={0.3} distance={20}>
          <p className={`mt-5 text-[15px] leading-relaxed sm:text-[17px] ${light ? 'text-white/65' : 'text-muted'}`}>
            {description}
          </p>
        </Reveal>
      )}
      {children}
    </div>
  );
};
