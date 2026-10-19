import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { FiArrowRight, FiLock, FiMail } from 'react-icons/fi';
import { api, setToken } from '../content/api';
import { Logo } from '../components/ui/Logo';
import { EASE } from '../components/motion/variants';
import { inputClass } from './ui';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { token } = await api.login(email.trim(), password);
      setToken(token);
      const from = (location.state as { from?: string } | null)?.from;
      navigate(from && from.startsWith('/admin') ? from : '/admin', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-ink px-4 py-10 text-white">
      <div className="absolute inset-0 grid-bg-dark opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-brand/40 blur-[150px]"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative w-full max-w-sm rounded-[2rem] border border-white/10 bg-white p-7 text-ink shadow-lift sm:p-9"
      >
        <Logo />
        <h1 className="mt-7 font-display text-2xl font-semibold tracking-tight">Admin sign in</h1>
        <p className="mt-1 text-[14px] text-muted">Manage content, projects, applications and messages.</p>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/60">Email</span>
            <div className="relative">
              <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="email"
                autoFocus
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${inputClass} pl-11`}
                placeholder="admin@admin.com"
              />
            </div>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/60">Password</span>
            <div className="relative">
              <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} pl-11`}
                placeholder="••••••••"
              />
            </div>
          </label>
          {error && <p className="text-[13px] text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={busy || !password || !email}
            className="shine inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3.5 text-[14px] font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60"
          >
            {busy ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> : <FiArrowRight />} Sign in
          </button>
        </form>
        <p className="mt-6 text-[12px] text-muted">Credentials are set with ADMIN_EMAIL and ADMIN_PASSWORD in the .env file.</p>
      </motion.div>
    </div>
  );
};
