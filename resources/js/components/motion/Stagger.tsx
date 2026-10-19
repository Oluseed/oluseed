import React from 'react';
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { EASE } from './variants';

interface StaggerProps extends HTMLMotionProps<'div'> {
  stagger?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
  children: React.ReactNode;
}

export const Stagger: React.FC<StaggerProps> = ({
  stagger = 0.09,
  delay = 0,
  once = true,
  amount = 0.15,
  children,
  ...rest
}) => {
  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps extends HTMLMotionProps<'div'> {
  y?: number;
  scale?: number;
  children: React.ReactNode;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({ y = 28, scale = 1, children, ...rest }) => {
  const variants: Variants = {
    hidden: { opacity: 0, y, scale: scale === 1 ? 1 : scale, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: EASE },
    },
  };
  return (
    <motion.div variants={variants} {...rest}>
      {children}
    </motion.div>
  );
};
