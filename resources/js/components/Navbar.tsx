import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { Button } from './Button';
import { Logo } from './ui/Logo';
import { LanguageSwitch } from './ui/LanguageSwitch';
import { Magnetic } from './motion';
import { EASE } from './motion/variants';
import { useT } from '../i18n/useLocale';
import { useContent } from '../content/useContent';

export const Navbar: React.FC = () => {
  const t = useT();
  const { content } = useContent();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const location = useLocation();

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/works', label: t.nav.work },
    { to: '/startup', label: t.nav.careers },
    { to: '/internships', label: t.nav.internships },
    { to: '/shop', label: t.nav.shop },
    { to: '/blogs', label: t.nav.blog },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
        className="fixed inset-x-0 top-0 z-[70] px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div
          className={`container-x flex items-center justify-between rounded-full border border-white/70 backdrop-blur-xl transition-all duration-500 ${
            scrolled ? 'bg-white/90 py-2.5 shadow-[0_10px_40px_-18px_rgba(10,10,20,0.35)]' : 'bg-white/80 py-3.5 shadow-[0_10px_40px_-24px_rgba(10,10,20,0.3)]'
          }`}
        >
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setHovered(null)}>
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onMouseEnter={() => setHovered(l.to)}
                className={({ isActive }) =>
                  `relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300 ${isActive ? 'text-ink' : 'text-ink/60 hover:text-ink'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {hovered === l.to && (
                      <motion.span layoutId="nav-hover" className="absolute inset-0 -z-10 rounded-full bg-ink/[0.06]" transition={{ type: 'spring', stiffness: 350, damping: 30 }} />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    {l.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitch layoutId="lang-desktop" />
            <Magnetic strength={0.25}>
              <Button to="/contact" size="md">
                {t.nav.contact}
              </Button>
            </Magnetic>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitch layoutId="lang-mobile" />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={open}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-line bg-white/80"
            >
              <span className="relative block h-3.5 w-5">
                <motion.span animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="absolute left-0 top-0 h-[2px] w-full rounded bg-ink" />
                <motion.span animate={open ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="absolute left-0 top-[6px] h-[2px] w-full rounded bg-ink" />
                <motion.span animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="absolute left-0 top-[12px] h-[2px] w-full rounded bg-ink" />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-[65] flex flex-col bg-ink text-white lg:hidden"
          >
            <div className="absolute inset-0 grid-bg-dark opacity-50" />
            <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-brand/40 blur-[120px]" />

            <div className="container-x relative flex flex-1 flex-col justify-center pt-24">
              <ul className="space-y-1">
                {links.map((l, i) => (
                  <li key={l.to} className="overflow-hidden">
                    <motion.div
                      initial={{ y: '110%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: '110%', opacity: 0 }}
                      transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: EASE }}
                    >
                      <NavLink
                        to={l.to}
                        className={({ isActive }) =>
                          `group flex items-center justify-between py-3 font-display text-[2.4rem] font-medium leading-none tracking-tight transition-colors ${
                            isActive ? 'text-brand-200' : 'text-white hover:text-brand-200'
                          }`
                        }
                      >
                        <span>{l.label}</span>
                        <FiArrowUpRight className="h-7 w-7 -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                      </NavLink>
                    </motion.div>
                  </li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
                className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[12px] uppercase tracking-[0.2em] text-white/50">{t.nav.language}</span>
                  <LanguageSwitch tone="light" size="md" layoutId="lang-menu" />
                </div>
                <Button to="/contact" size="lg" className="w-full">
                  {t.nav.startProject}
                </Button>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/50">
                  <a href={`mailto:${content.brand.email}`} className="hover:text-white">
                    {content.brand.email}
                  </a>
                  {content.brand.phones[0] && (
                    <a href={`tel:${content.brand.phones[0].replace(/\s+/g, '')}`} className="hover:text-white">
                      {content.brand.phones[0]}
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
