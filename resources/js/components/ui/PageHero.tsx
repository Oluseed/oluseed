import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router';
import { FiChevronRight } from 'react-icons/fi';
import { SplitText } from '../motion';
import { EASE } from '../motion/variants';
import { useT } from '../../i18n/useLocale';

interface Crumb {
  label: string;
  to?: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  highlight?: string[];
  description?: string;
  image?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}

/**
 * Shared dark hero for inner pages: parallax image, gradient orbs,
 * masked headline reveal and animated breadcrumb.
 */
export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  highlight = [],
  description,
  image,
  crumbs = [],
  children,
}) => {
  const t = useT();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink text-white">
      {/* Backdrop */}
      {image && (
        <motion.div style={{ y: imgY }} className="absolute inset-0 -z-20">
          <motion.img
            src={image}
            alt=""
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
            className="h-[120%] w-full object-cover"
          />
        </motion.div>
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-ink/85 to-ink" />
      <div className="absolute inset-0 -z-10 grid-bg-dark opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <motion.div
        aria-hidden
        className="absolute -left-32 top-10 -z-10 h-[420px] w-[420px] rounded-full bg-brand/50 blur-[130px]"
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-20 bottom-0 -z-10 h-[360px] w-[360px] rounded-full bg-brand-300/30 blur-[120px]"
        animate={{ x: [0, -30, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div style={{ y: contentY, opacity }} className="container-x relative pb-20 pt-32 md:pb-28 md:pt-40 lg:pt-44">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="mb-8 flex items-center gap-2 text-[13px] text-white/55"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="transition-colors hover:text-white">
            {t.common.home}
          </Link>
          {crumbs.map((c, i) => (
            <React.Fragment key={i}>
              <FiChevronRight className="h-3.5 w-3.5 opacity-60" />
              {c.to ? (
                <Link to={c.to} className="transition-colors hover:text-white">
                  {c.label}
                </Link>
              ) : (
                <span className="text-white/85">{c.label}</span>
              )}
            </React.Fragment>
          ))}
        </motion.nav>

        <motion.span
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="eyebrow text-brand-200"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-200" />
          {eyebrow}
        </motion.span>

        <SplitText
          key={title}
          as="h1"
          immediate
          text={title}
          highlight={highlight}
          highlightClassName="text-gradient-light"
          delay={0.3}
          className="mt-5 max-w-4xl font-display text-[2.8rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl"
        />

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
            className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/65 sm:text-lg"
          >
            {description}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
            className="mt-10"
          >
            {children}
          </motion.div>
        )}
      </motion.div>

      {/* bottom fade into page */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
};
