import React from 'react';
import { Counter, Stagger, StaggerItem } from '../motion';
import { useContent } from '../../content/useContent';

const Stats: React.FC = () => {
  const { content } = useContent();
  const stats = content.stats;
  if (stats.length === 0) return null;

  return (
    <section className="relative bg-white">
      <div className="container-x">
        <Stagger
          stagger={0.1}
          className="-mt-12 grid overflow-hidden rounded-[2rem] border border-line bg-white shadow-lift sm:grid-cols-2 lg:-mt-16 lg:grid-cols-4"
        >
          {stats.map((s, i) => (
            <StaggerItem
              key={`${s.label}-${i}`}
              className="group relative border-b border-line p-8 transition-colors duration-500 last:border-b-0 hover:bg-brand sm:odd:border-r sm:[&:nth-child(n+3)]:border-b-0 lg:border-b-0 lg:not-last:border-r"
            >
              <p className="font-display text-5xl font-semibold tracking-[-0.04em] text-ink transition-colors duration-500 group-hover:text-white">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-[15px] font-semibold text-ink transition-colors duration-500 group-hover:text-white">
                {s.label}
              </p>
              <p className="mt-1 text-[13px] text-muted transition-colors duration-500 group-hover:text-white/70">
                {s.note}
              </p>
              <span className="absolute right-6 top-6 h-2 w-2 rounded-full bg-brand transition-all duration-500 group-hover:scale-[2.4] group-hover:bg-white/80" />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default Stats;
