import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { EASE } from './variants';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
  duration?: number;
  direction?: Direction;
  distance?: number;
  blur?: boolean;
  once?: boolean;
  amount?: number;
  children: React.ReactNode;
}

const offset = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    default:
      return {};
  }
};

export const Reveal: React.FC<RevealProps> = ({
  delay = 0,
  duration = 0.9,
  direction = 'up',
  distance = 36,
  blur = true,
  once = true,
  amount = 0.2,
  children,
  ...rest
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: blur ? 'blur(8px)' : 'blur(0px)', ...offset(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
