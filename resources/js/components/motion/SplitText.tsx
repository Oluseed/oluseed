import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { EASE } from './variants';

interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
  /** Animate immediately on mount rather than when scrolled into view. */
  immediate?: boolean;
  highlight?: string[];
  highlightClassName?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

/**
 * Word-by-word masked reveal. Each word slides up from behind a clip mask.
 */
export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  stagger = 0.045,
  duration = 0.9,
  once = true,
  immediate = false,
  highlight = [],
  highlightClassName = 'text-brand',
  as = 'span',
}) => {
  const words = text.split(' ');

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const word: Variants = {
    hidden: { y: '110%', rotate: 3, opacity: 0 },
    visible: {
      y: '0%',
      rotate: 0,
      opacity: 1,
      transition: { duration, ease: EASE },
    },
  };

  const Tag = motion[as] as typeof motion.span;

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      {...(immediate ? { animate: 'visible' } : { whileInView: 'visible', viewport: { once, amount: 0.4 } })}
      aria-label={text}
    >
      {words.map((w, i) => {
        const clean = w.replace(/[^\w]/g, '').toLowerCase();
        const isHighlight = highlight.some((h) => h.toLowerCase() === clean);
        return (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-top">
            <motion.span
              variants={word}
              className={`inline-block will-change-transform ${wordClassName} ${isHighlight ? highlightClassName : ''}`}
              aria-hidden
            >
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
};
