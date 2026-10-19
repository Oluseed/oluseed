import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiArrowDown, FiPlay } from 'react-icons/fi';
import avatars from '../../assets/images/Frame 34130.svg';
import { Button } from '../Button';
import { Magnetic, SplitText, Marquee } from '../motion';
import { EASE } from '../motion/variants';
import { useContent } from '../../content/useContent';
import { useT } from '../../i18n/useLocale';

const Hero_Section: React.FC = () => {
  const { content } = useContent();
  const t = useT();
  const hero = content.home.hero;
  const clients = content.home.clients;

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const imgRotate = useTransform(scrollYProgress, [0, 1], [-4, 2]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 -z-20 grid-bg-dark opacity-70 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <motion.div
        aria-hidden
        className="absolute -left-40 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-brand/50 blur-[160px]"
        animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-40 top-40 -z-10 h-[520px] w-[520px] rounded-full bg-brand-300/30 blur-[150px]"
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="noise absolute inset-0 -z-10" />

      <div className="container-x relative grid items-center gap-14 pb-16 pt-32 md:pt-40 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-44">
        <motion.div style={{ y: textY, opacity: fade }} className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: EASE }}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-4 backdrop-blur"
          >
            <img src={avatars} alt="" className="h-7 w-auto" />
            <span className="text-[12.5px] font-medium text-white/80">{hero.badge}</span>
          </motion.div>

          <h1 className="mt-7 font-display text-[2.9rem] font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[4.4rem] xl:text-[5rem]">
            <SplitText key={hero.line1} immediate text={hero.line1} delay={1.6} className="block" />
            <SplitText key={hero.line2} immediate text={hero.line2} delay={1.75} className="block" />
            <SplitText
              key={hero.line3}
              immediate
              text={hero.line3}
              delay={1.9}
              className="block"
              highlight={hero.line3.split(/\s+/)}
              highlightClassName="text-gradient-light"
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.2, ease: EASE }}
            className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/65 sm:text-lg"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.4, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic strength={0.3}>
              <Button to="/contact" size="lg">
                {hero.primaryCta}
              </Button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Button to="/works" variant="ghost" size="lg" icon={false} className="text-white hover:bg-white/10">
                <span className="inline-flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/5 transition-colors duration-500 group-hover/btn:bg-white group-hover/btn:text-ink">
                    <FiPlay className="h-3.5 w-3.5 translate-x-px" />
                  </span>
                  {hero.secondaryCta}
                </span>
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.8 }}
            className="mt-14 hidden items-center gap-3 text-[12px] uppercase tracking-[0.22em] text-white/40 lg:flex"
          >
            <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
              <FiArrowDown />
            </motion.span>
            {t.common.scroll}
          </motion.div>
        </motion.div>

        <div className="relative lg:col-span-5">
          <motion.div
            style={{ y: imgY, rotate: imgRotate }}
            initial={{ opacity: 0, scale: 0.85, y: 60, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: -4 }}
            transition={{ duration: 1.4, delay: 1.7, ease: EASE }}
            className="relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_40px_120px_-30px_rgba(15,4,255,0.6)]"
          >
            <motion.img
              src={hero.image}
              alt="The Oluseed team collaborating"
              className="h-full w-full object-cover"
              initial={{ scale: 1.25 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.2, delay: 1.7, ease: EASE }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/60">{hero.imageEyebrow}</p>
                <p className="mt-1 font-display text-xl font-semibold">{hero.imageCaption}</p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 2.4, ease: EASE }}
            className="absolute -left-4 top-10 animate-float sm:-left-10"
          >
            <div className="glass-dark rounded-2xl px-5 py-4 shadow-lift">
              <p className="font-display text-3xl font-semibold leading-none">{hero.cardOneValue}</p>
              <p className="mt-1 text-[12px] text-white/60">{hero.cardOneLabel}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 2.6, ease: EASE }}
            className="absolute -right-2 bottom-16 animate-float-slow sm:-right-8"
          >
            <div className="glass-dark flex items-center gap-3 rounded-2xl px-5 py-4 shadow-lift">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand text-white">
                <span className="font-display text-sm font-bold">{hero.cardTwoValue}</span>
              </span>
              <div>
                <p className="font-display text-base font-semibold leading-none">{hero.cardTwoTitle}</p>
                <p className="mt-1 text-[12px] text-white/60">{hero.cardTwoLabel}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {clients.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          className="relative border-t border-white/10 py-6"
        >
          <Marquee speed={45} gap="4rem">
            {clients.map((c) => (
              <span
                key={c}
                className="whitespace-nowrap font-display text-xl font-medium text-white/35 transition-colors duration-300 hover:text-white"
              >
                {c}
              </span>
            ))}
          </Marquee>
        </motion.div>
      )}
    </section>
  );
};

export default Hero_Section;
