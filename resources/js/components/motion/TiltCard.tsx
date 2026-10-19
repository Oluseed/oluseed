import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  max?: number;
  glare?: boolean;
  glareColor?: string;
  className?: string;
}

/**
 * 3D tilt on hover with a cursor-following spotlight. Also exposes
 * --mx / --my CSS variables so the `card-border-glow` utility can
 * light the border near the pointer.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  max = 8,
  glare = true,
  glareColor = 'rgba(15, 4, 255, 0.14)',
  className = '',
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const smx = useSpring(mx, { stiffness: 300, damping: 30 });
  const smy = useSpring(my, { stiffness: 300, damping: 30 });

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${smx}% ${smy}%, ${glareColor}, transparent 55%)`;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    rx.set((0.5 - py) * max * 2);
    ry.set((px - 0.5) * max * 2);
    mx.set(px * 100);
    my.set(py * 100);
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    mx.set(50);
    my.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`relative ${className}`}
      {...(rest as object)}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
      )}
    </motion.div>
  );
};
