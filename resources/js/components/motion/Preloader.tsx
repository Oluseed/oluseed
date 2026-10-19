import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from './variants';
import logo from '../../assets/images/1000302584.png';

/**
 * One-time intro: logo mark rises, wordmark reveals, curtain lifts.
 */
export const Preloader: React.FC = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = '';
    }, 1500);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink text-white"
          initial={{ clipPath: 'inset(0 0 0 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.9, ease: EASE } }}
        >
          <div className="absolute inset-0 grid-bg-dark opacity-60" />
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-brand/40 blur-[140px]" />

          <div className="relative flex flex-col items-center gap-5">
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative h-20 w-20 overflow-hidden rounded-full"
            >
              <img src={logo} alt="Oluseed" className="h-full w-full scale-[2.8] object-cover" />
            </motion.div>
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                className="font-display text-3xl font-semibold tracking-tight"
              >
                Oluseed<span className="text-brand-300">.</span>
              </motion.p>
            </div>
            <motion.div
              className="h-px w-40 origin-left bg-gradient-to-r from-brand-300 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.4, ease: EASE }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
