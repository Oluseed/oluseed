import React from 'react';
import { Link } from 'react-router';
import logo from '../../assets/images/1000302584.png';

interface LogoProps {
  light?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ light = false, className = '' }) => {
  return (
    <Link to="/" className={`group inline-flex items-center gap-3 ${className}`} aria-label="Oluseed home">
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full ring-1 ring-brand/15 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[360deg]">
        <img src={logo} alt="" className="h-full w-full scale-[2.8] object-cover" />
      </span>
      <span className={`font-display text-[22px] font-semibold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>
        Oluseed<span className="text-brand">.</span>
      </span>
    </Link>
  );
};
