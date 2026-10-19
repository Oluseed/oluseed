import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiAlertCircle, FiCheckCircle, FiImage, FiUploadCloud, FiX } from 'react-icons/fi';
import { api } from '../content/api';
import { EASE } from '../components/motion/variants';

/* ---------------------------------------------------------------- inputs */

export const inputClass =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-[14px] text-ink placeholder:text-muted/60 transition-all duration-200 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/10 disabled:bg-mist';

export const Label: React.FC<{ label: string; hint?: string; children: React.ReactNode; className?: string }> = ({ label, hint, children, className = '' }) => (
  <label className={`block ${className}`}>
    <span className="mb-1.5 flex items-baseline justify-between gap-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/60">
      <span>{label}</span>
      {hint && <span className="truncate font-normal normal-case tracking-normal text-muted">{hint}</span>}
    </span>
    {children}
  </label>
);

export const TextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className = '', ...rest }) => (
  <input {...rest} className={`${inputClass} ${className}`} />
);

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className = '', ...rest }) => (
  <textarea {...rest} className={`${inputClass} min-h-[110px] resize-y ${className}`} />
);

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className = '', children, ...rest }) => (
  <select {...rest} className={`${inputClass} appearance-none ${className}`}>
    {children}
  </select>
);

export const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void; label?: string }> = ({ checked, onChange, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="inline-flex items-center gap-3 text-[14px] text-ink"
  >
    <span className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${checked ? 'bg-brand' : 'bg-ink/15'}`}>
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow ${checked ? 'left-[22px]' : 'left-0.5'}`}
      />
    </span>
    {label && <span>{label}</span>}
  </button>
);

/* ------------------------------------------------------------ image field */

export const ImageField: React.FC<{ value: string; onChange: (v: string) => void; label?: string; hint?: string }> = ({
  value,
  onChange,
  label = 'Image',
  hint = 'Paste a URL or upload',
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const upload = async (file: File) => {
    setBusy(true);
    setErr('');
    try {
      const res = await api.uploadImage(file);
      onChange(res.url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <Label label={label} hint={hint}>
      <div className="flex gap-3">
        <div className="grid h-[52px] w-[52px] shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-mist">
          {value ? <img src={value} alt="" className="h-full w-full object-cover" /> : <FiImage className="text-muted" />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex gap-2">
            <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="/images/example.png or https://..." className={`${inputClass} min-w-0`} />
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
            <button
              type="button"
              disabled={busy}
              onClick={() => fileRef.current?.click()}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-line bg-white px-3 text-[13px] font-semibold text-ink transition-colors hover:border-brand hover:text-brand disabled:opacity-60"
            >
              {busy ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand/30 border-t-brand" /> : <FiUploadCloud />}
              <span className="hidden sm:inline">Upload</span>
            </button>
          </div>
          {err && <p className="mt-1 text-[12px] text-red-500">{err}</p>}
        </div>
      </div>
    </Label>
  );
};

/* ---------------------------------------------------------------- layout */

export const Card: React.FC<{ title?: string; description?: string; children: React.ReactNode; className?: string; actions?: React.ReactNode }> = ({
  title,
  description,
  children,
  className = '',
  actions,
}) => (
  <section className={`rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-6 ${className}`}>
    {(title || actions) && (
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          {title && <h2 className="font-display text-lg font-semibold tracking-tight text-ink">{title}</h2>}
          {description && <p className="mt-1 text-[13px] text-muted">{description}</p>}
        </div>
        {actions}
      </div>
    )}
    {children}
  </section>
);

export const PageHeader: React.FC<{ title: string; description?: string; actions?: React.ReactNode }> = ({ title, description, actions }) => (
  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h1>
      {description && <p className="mt-1 max-w-2xl text-[14px] text-muted">{description}</p>}
    </div>
    {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
  </div>
);

export const Btn: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; size?: 'sm' | 'md' }
> = ({ variant = 'primary', size = 'md', className = '', children, ...rest }) => {
  const v = {
    primary: 'bg-brand text-white hover:bg-brand-600 shadow-[0_8px_20px_-10px_rgba(15,4,255,0.7)]',
    secondary: 'bg-white text-ink border border-line hover:border-ink/40',
    danger: 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100',
    ghost: 'bg-transparent text-ink hover:bg-ink/5',
  }[variant];
  const s = size === 'sm' ? 'px-3 py-1.5 text-[12.5px]' : 'px-4 py-2.5 text-[13.5px]';
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 ${v} ${s} ${className}`}
    >
      {children}
    </button>
  );
};

export const Badge: React.FC<{ tone?: 'blue' | 'green' | 'amber' | 'red' | 'gray'; children: React.ReactNode }> = ({ tone = 'gray', children }) => {
  const t = {
    blue: 'bg-brand-50 text-brand',
    green: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
    gray: 'bg-mist text-ink/60',
  }[tone];
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] ${t}`}>{children}</span>;
};

export const Empty: React.FC<{ title: string; text?: string; children?: React.ReactNode }> = ({ title, text, children }) => (
  <div className="rounded-2xl border border-dashed border-line bg-mist/50 p-10 text-center">
    <p className="font-display text-lg font-semibold text-ink">{title}</p>
    {text && <p className="mt-1 text-[13.5px] text-muted">{text}</p>}
    {children && <div className="mt-4">{children}</div>}
  </div>
);

/* ---------------------------------------------------------------- toasts */

export type Flash = { kind: 'ok' | 'err'; text: string } | null;

export const Toast: React.FC<{ flash: Flash; onClose?: () => void }> = ({ flash, onClose }) => (
  <AnimatePresence>
    {flash && (
      <motion.div
        key={flash.text}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.35, ease: EASE }}
        className={`fixed bottom-5 left-1/2 z-[95] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-medium text-white shadow-lift ${
          flash.kind === 'ok' ? 'bg-ink' : 'bg-red-600'
        }`}
      >
        {flash.kind === 'ok' ? <FiCheckCircle className="shrink-0 text-emerald-400" /> : <FiAlertCircle className="shrink-0" />}
        <span className="flex-1">{flash.text}</span>
        {onClose && (
          <button onClick={onClose} aria-label="Dismiss" className="opacity-70 hover:opacity-100">
            <FiX />
          </button>
        )}
      </motion.div>
    )}
  </AnimatePresence>
);

