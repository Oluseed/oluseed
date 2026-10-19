import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  reverse?: boolean;
  speed?: number; // seconds per loop
  className?: string;
  gap?: string;
  fade?: boolean;
}

/**
 * CSS-driven infinite marquee. Content is duplicated so the loop is seamless.
 */
export const Marquee: React.FC<MarqueeProps> = ({
  children,
  reverse = false,
  speed = 40,
  className = '',
  gap = '2rem',
  fade = true,
}) => {
  return (
    <div
      className={`marquee relative overflow-hidden ${className}`}
      style={
        fade
          ? {
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            }
          : undefined
      }
    >
      <div
        className={`marquee-track ${reverse ? 'reverse' : ''}`}
        style={{ gap, animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        <div className="flex shrink-0 items-center" style={{ gap }} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
};
