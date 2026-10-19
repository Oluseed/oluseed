import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { Marquee, Reveal } from '../motion';
import { useContent, words } from '../../content/useContent';
import type { TestimonialItem } from '../../content/types';

const avatar = (t: TestimonialItem) =>
  t.image || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(t.name)}&backgroundColor=0f04ff`;

const Card: React.FC<{ t: TestimonialItem }> = ({ t }) => (
  <motion.figure
    whileHover={{ y: -6 }}
    transition={{ duration: 0.4 }}
    className={`relative w-[300px] shrink-0 rounded-3xl border p-7 sm:w-[380px] ${
      t.featured
        ? 'border-brand/30 bg-gradient-to-br from-brand to-brand-700 text-white shadow-glow'
        : 'border-line bg-white text-ink shadow-soft'
    }`}
  >
    <span className={`absolute right-6 top-5 font-display text-6xl leading-none ${t.featured ? 'text-white/20' : 'text-brand/15'}`} aria-hidden>
      &rdquo;
    </span>
    <blockquote className={`text-[14.5px] leading-relaxed ${t.featured ? 'text-white/90' : 'text-ink/80'}`}>{t.review}</blockquote>
    <figcaption className="mt-6 flex items-center gap-3">
      <img src={avatar(t)} alt={t.name} className={`h-11 w-11 rounded-full object-cover p-0.5 ${t.featured ? 'bg-white/20' : 'bg-mist'}`} />
      <div>
        <p className="font-display text-[15px] font-semibold">{t.name}</p>
        <p className={`text-[12.5px] ${t.featured ? 'text-white/70' : 'text-muted'}`}>{t.role}</p>
      </div>
    </figcaption>
  </motion.figure>
);

const Testimonial: React.FC = () => {
  const { content } = useContent();
  const t = content.testimonials;
  if (t.items.length === 0) return null;

  const rowA = t.items;
  const rowB = [...t.items].reverse();

  return (
    <section className="section-y relative overflow-hidden bg-mist">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-brand-100/50 blur-[140px]" />

      <div className="container-x relative">
        <SectionHeading key={t.title} align="center" eyebrow={t.eyebrow} title={t.title} highlight={words(t.highlight)} description={t.description} />
      </div>

      <Reveal delay={0.2} className="mt-14 space-y-5">
        <Marquee speed={55} gap="1.25rem">
          {rowA.map((item, i) => (
            <Card key={`a-${i}`} t={item} />
          ))}
        </Marquee>
        {t.items.length > 2 && (
          <Marquee speed={62} gap="1.25rem" reverse>
            {rowB.map((item, i) => (
              <Card key={`b-${i}`} t={item} />
            ))}
          </Marquee>
        )}
      </Reveal>
    </section>
  );
};

export default Testimonial;
