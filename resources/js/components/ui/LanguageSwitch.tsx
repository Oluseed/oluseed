import React from 'react';
import { motion } from 'framer-motion';
import { LOCALES, dictionaries } from '../../i18n/context';
import { useLocale } from '../../i18n/useLocale';

interface LanguageSwitchProps {
  /** `light` for dark backgrounds. */
  tone?: 'light' | 'dark';
  size?: 'sm' | 'md';
  className?: string;
  layoutId?: string;
}

/**
 * EN / FR pill. The active option slides between languages.
 */
export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ tone = 'dark', size = 'sm', className = '', layoutId = 'lang-pill' }) => {
  const { locale, setLocale, t } = useLocale();
  const pad = size === 'sm' ? 'px-2.5 py-1 text-[11.5px]' : 'px-3.5 py-1.5 text-[13px]';
  const shell = tone === 'light' ? 'border-white/15 bg-white/5' : 'border-line bg-white/70';
  const active = tone === 'light' ? 'text-ink' : 'text-white';
  const idle = tone === 'light' ? 'text-white/60 hover:text-white' : 'text-ink/55 hover:text-ink';
  const pill = tone === 'light' ? 'bg-white' : 'bg-ink';

  return (
    <div role="group" aria-label={t.nav.language} className={`inline-flex items-center rounded-full border p-0.5 ${shell} ${className}`}>
      {LOCALES.map((l) => {
        const isActive = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={isActive}
            lang={dictionaries[l].meta.htmlLang}
            className={`relative rounded-full font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${pad} ${isActive ? active : idle}`}
          >
            {isActive && (
              <motion.span layoutId={layoutId} className={`absolute inset-0 rounded-full ${pill}`} transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
            )}
            <span className="relative">{dictionaries[l].meta.short}</span>
          </button>
        );
      })}
    </div>
  );
};
