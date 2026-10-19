import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { SplitText } from '../components/motion';
import { EASE } from '../components/motion/variants';
import { useT } from '../i18n/useLocale';

export const NotFound: React.FC = () => {
  const t = useT();
  return (
    <section className="relative isolate flex min-h-[90vh] items-center overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 -z-10 grid-bg-dark opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/40 blur-[150px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="container-x pt-24 text-center">
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE }}
          className="font-display text-[8rem] font-bold leading-none tracking-[-0.06em] text-gradient-light sm:text-[12rem]"
        >
          404
        </motion.p>
        <SplitText key={t.notFound.title} as="h1" immediate text={t.notFound.title} delay={0.3} className="mt-4 font-display text-3xl font-semibold sm:text-5xl" />
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease: EASE }} className="mx-auto mt-5 max-w-md text-white/60">
          {t.notFound.text}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9, ease: EASE }} className="mt-10 flex flex-wrap justify-center gap-3">
          <Button to="/" variant="white" size="lg">
            {t.notFound.home}
          </Button>
          <Button to="/contact" variant="ghost" size="lg" className="text-white hover:bg-white/10">
            {t.notFound.contact}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
