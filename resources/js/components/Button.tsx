import React from 'react';
import { Link } from 'react-router';
import { FiArrowUpRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

type Variant = 'primary' | 'secondary' | 'ghost' | 'white' | 'dark';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children?: React.ReactNode;
  /** @deprecated use children */
  text?: string;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  variant?: Variant;
  size?: Size;
  icon?: boolean;
  className?: string;
  external?: boolean;
}

const base =
  'group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform select-none shine disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-white shadow-[0_10px_30px_-10px_rgba(15,4,255,0.6)] hover:shadow-[0_18px_40px_-12px_rgba(15,4,255,0.7)] hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'bg-white text-ink border border-line hover:border-ink/30 hover:-translate-y-0.5 shadow-soft',
  ghost: 'bg-transparent text-ink hover:bg-ink/5',
  white: 'bg-white text-ink hover:-translate-y-0.5 shadow-lift',
  dark: 'bg-ink text-white hover:bg-ink-800 hover:-translate-y-0.5 shadow-lift',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-[13px]',
  md: 'px-6 py-3.5 text-[14px]',
  lg: 'px-8 py-4 text-[15px]',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  text,
  to,
  href,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'md',
  icon = true,
  className = '',
  external = false,
}) => {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      <span className="relative z-10">{children ?? text}</span>
      {icon && (
        <span className="relative z-10 grid h-5 w-5 place-items-center overflow-hidden">
          <FiArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-4 group-hover/btn:-translate-y-4" />
          <FiArrowUpRight className="absolute h-4 w-4 -translate-x-4 translate-y-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </motion.button>
  );
};
