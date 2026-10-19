import React from 'react';
import { motion } from 'framer-motion';

interface JobsFilterBarProps {
  departments: string[];
  active: string;
  onSelect: (department: string) => void;
  labelFor?: (department: string) => string;
}

const JobsFilterBar: React.FC<JobsFilterBarProps> = ({ departments, active, onSelect, labelFor = (d) => d }) => {
  return (
    <div className="scrollbar-hide -mx-5 flex gap-2 overflow-x-auto px-5 py-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
      {departments.map((d) => {
        const isActive = active === d;
        return (
          <button
            key={d}
            onClick={() => onSelect(d)}
            className={`relative shrink-0 rounded-full border px-5 py-2.5 text-[13.5px] font-medium transition-colors duration-300 ${
              isActive ? 'border-transparent text-white' : 'border-line bg-white text-ink/70 hover:border-ink/30 hover:text-ink'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="jobs-filter"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{labelFor(d)}</span>
          </button>
        );
      })}
    </div>
  );
};

export default JobsFilterBar;
