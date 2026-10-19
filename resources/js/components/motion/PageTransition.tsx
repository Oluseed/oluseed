import React from 'react';
import { motion } from 'framer-motion';
import { EASE } from './variants';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: EASE } }}
      exit={{ opacity: 0, y: -14, filter: 'blur(6px)', transition: { duration: 0.3, ease: EASE } }}
    >
      {children}
    </motion.div>
  );
};
