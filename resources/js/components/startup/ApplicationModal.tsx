import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCheckCircle, FiPaperclip, FiSend, FiX } from 'react-icons/fi';
import { EASE } from '../motion/variants';
import { api } from '../../content/api';
import type { ApplicationType, JobItem } from '../../content/types';
import { useT } from '../../i18n/useLocale';

interface ApplicationModalProps {
  open: boolean;
  onClose: () => void;
  job: JobItem | null;
  jobs: JobItem[];
  kind?: ApplicationType;
}

const Field: React.FC<{ label: string; children: React.ReactNode; hint?: string }> = ({ label, children, hint }) => (
  <label className="block">
    <span className="mb-2 flex items-baseline justify-between text-[12px] font-semibold uppercase tracking-[0.16em] text-ink/60">
      {label}
      {hint && <span className="font-normal normal-case tracking-normal text-muted">{hint}</span>}
    </span>
    {children}
  </label>
);

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ open, onClose, job, jobs, kind = 'job' }) => {
  const t = useT();
  const generalLabel = kind === 'internship' ? t.application.generalInternship : t.application.general;
  const [jobId, setJobId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [cv, setCv] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setJobId(job?.id ?? '');
      setStatus('idle');
      setError('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, job]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const reset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPortfolio('');
    setCoverLetter('');
    setCv(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim()) {
      setError(t.application.needNameEmail);
      return;
    }
    setStatus('sending');
    try {
      let cvUrl = '';
      if (cv) {
        const res = await api.uploadCv(cv);
        cvUrl = res.url;
      }
      const selected = jobs.find((j) => j.id === jobId);
      await api.submitApplication({
        type: kind,
        jobId: selected?.id ?? '',
        jobTitle: selected?.title ?? generalLabel,
        name,
        email,
        phone,
        portfolio,
        coverLetter,
        cvUrl,
      });
      setStatus('sent');
      reset();
    } catch (err) {
      setStatus('idle');
      setError(err instanceof Error ? err.message : t.application.failed);
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div key="application-modal" className="fixed inset-0 z-[85] flex items-end justify-center sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="application-title"
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-lift sm:rounded-[2rem]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 sm:px-8">
              <div>
                <span className="eyebrow">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {kind === 'internship' ? t.application.internshipEyebrow : t.application.eyebrow}
                </span>
                <h2 id="application-title" className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {job ? job.title : generalLabel}
                </h2>
              </div>
              <button onClick={onClose} aria-label={t.common.close} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-ink transition-colors hover:bg-mist">
                <FiX />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6 sm:px-8">
              {status === 'sent' ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-500">
                    <FiCheckCircle className="h-8 w-8" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-ink">{t.application.received}</h3>
                  <p className="mx-auto mt-2 max-w-sm text-[14.5px] text-muted">{t.application.thanks}</p>
                  <button onClick={onClose} className="mt-8 rounded-full bg-ink px-7 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-brand">
                    {t.common.done}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <Field label={t.application.role}>
                    <select value={jobId} onChange={(e) => setJobId(e.target.value)} className="input-premium appearance-none">
                      <option value="">{generalLabel}</option>
                      {jobs.map((j) => (
                        <option key={j.id} value={j.id}>
                          {j.title} · {j.department}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={t.application.fullName}>
                      <input required value={name} onChange={(e) => setName(e.target.value)} placeholder={t.application.namePlaceholder} className="input-premium" />
                    </Field>
                    <Field label={t.application.email}>
                      <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.application.emailPlaceholder} className="input-premium" />
                    </Field>
                    <Field label={t.application.phone} hint={t.common.optional}>
                      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234 ..." className="input-premium" />
                    </Field>
                    <Field label={t.application.portfolio} hint={t.common.optional}>
                      <input value={portfolio} onChange={(e) => setPortfolio(e.target.value)} placeholder="https://" className="input-premium" />
                    </Field>
                  </div>
                  <Field label={t.application.coverLetter} hint={t.common.optional}>
                    <textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} placeholder={t.application.coverPlaceholder} className="input-premium h-32 resize-none" />
                  </Field>
                  <Field label={t.application.cv} hint={t.application.cvHint}>
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="hidden"
                      onChange={(e) => setCv(e.target.files?.[0] ?? null)}
                    />
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-line bg-mist/60 px-5 py-4 text-left text-[14px] transition-colors hover:border-brand hover:bg-brand-50"
                    >
                      <FiPaperclip className="shrink-0 text-brand" />
                      <span className="truncate text-ink/80">{cv ? cv.name : t.application.attach}</span>
                      {cv && (
                        <span
                          role="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCv(null);
                            if (fileRef.current) fileRef.current.value = '';
                          }}
                          className="ml-auto text-muted hover:text-ink"
                        >
                          <FiX />
                        </span>
                      )}
                    </button>
                  </Field>

                  {error && <p className="text-[13px] text-red-500">{error}</p>}

                  <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-[12.5px] text-muted">{t.application.privacy}</p>
                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileTap={{ scale: 0.97 }}
                      className="shine inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-4 text-[14px] font-semibold text-white shadow-[0_14px_34px_-12px_rgba(15,4,255,0.7)] transition-all duration-500 hover:-translate-y-0.5 disabled:opacity-70"
                    >
                      {status === 'sending' ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> {t.application.submitting}
                        </>
                      ) : (
                        <>
                          {t.application.submit} <FiSend />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
