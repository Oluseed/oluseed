import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { FiBriefcase, FiExternalLink, FiGrid, FiInbox, FiLayers, FiLogOut, FiMail, FiMenu, FiX } from 'react-icons/fi';
import { api, getToken, setToken } from '../content/api';
import { contentNav } from './schemas';
import { Logo } from '../components/ui/Logo';
import { EASE } from '../components/motion/variants';
import { LanguageSwitch } from '../components/ui/LanguageSwitch';
import { useLocale } from '../i18n/useLocale';

const primary = [
  { to: '/admin', label: 'Overview', icon: FiGrid, end: true },
  { to: '/admin/projects', label: 'Projects', icon: FiLayers },
  { to: '/admin/applications', label: 'Applications', icon: FiInbox },
  { to: '/admin/messages', label: 'Messages', icon: FiMail },
];

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useLocale();

  useEffect(() => {
    if (!getToken()) {
      navigate('/admin/login', { replace: true, state: { from: location.pathname } });
      return;
    }
    api
      .me()
      .then(() => setChecked(true))
      .catch(() => navigate('/admin/login', { replace: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const logout = () => {
    api.logout().catch(() => undefined);
    setToken('');
    navigate('/admin/login', { replace: true });
  };

  if (!checked) {
    return (
      <div className="grid min-h-screen place-items-center bg-mist">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-brand/20 border-t-brand" />
      </div>
    );
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition-colors ${
      isActive ? 'bg-brand text-white shadow-[0_8px_20px_-10px_rgba(15,4,255,0.8)]' : 'text-white/70 hover:bg-white/5 hover:text-white'
    }`;

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 py-5">
        <Logo light />
        <button onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full text-white/70 hover:bg-white/10 lg:hidden" aria-label="Close menu">
          <FiX />
        </button>
      </div>
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-6">
        <div className="space-y-1">
          {primary.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              <Icon className="h-4 w-4" /> {label}
            </NavLink>
          ))}
        </div>
        <div>
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">Site content</p>
          <div className="space-y-0.5">
            {contentNav.map((c) => (
              <NavLink
                key={c.slug}
                to={`/admin/content/${c.slug}`}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-[13.5px] transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`
                }
              >
                {c.title}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
      <div className="space-y-1 border-t border-white/10 p-3">
        <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] text-white/70 hover:bg-white/5 hover:text-white">
          <FiExternalLink className="h-4 w-4" /> View site
        </a>
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[14px] text-white/70 hover:bg-white/5 hover:text-white">
          <FiLogOut className="h-4 w-4" /> Log out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-mist text-ink">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] bg-ink lg:block">{sidebar}</aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div key="drawer" className="fixed inset-0 z-[70] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="absolute inset-y-0 left-0 w-[280px] max-w-[85vw] bg-ink shadow-lift"
            >
              {sidebar}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white/85 px-4 backdrop-blur lg:hidden">
        <button onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-xl border border-line" aria-label="Open menu">
          <FiMenu />
        </button>
        <span className="font-display text-lg font-semibold">
          Admin<span className="text-brand">.</span>
        </span>
        <a href="/" target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1.5 text-[13px] font-medium text-muted">
          <FiExternalLink /> Site
        </a>
      </header>

      <main className="lg:pl-[264px]">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-line bg-white px-4 py-3 shadow-soft sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-semibold text-ink">{t.admin.editing}</span>
              <LanguageSwitch size="md" layoutId="lang-admin" />
            </div>
            <p className="text-[12.5px] text-muted">{t.admin.languageHint}</p>
          </div>
          <motion.div key={location.pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }}>
            <Outlet />
          </motion.div>
        </div>
      </main>

      <span className="sr-only">
        <FiBriefcase />
      </span>
    </div>
  );
};
