import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCheckCircle, FiSend } from 'react-icons/fi';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal, Parallax } from '../motion';
import { EASE } from '../motion/variants';
import { useContent, words } from '../../content/useContent';
import { api } from '../../content/api';
import { useT } from '../../i18n/useLocale';

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <label className="block">
    <span className="mb-2 block text-[12px] font-semibold uppercase tracking-[0.16em] text-ink/60">{label}</span>
    {children}
  </label>
);

const Section2: React.FC = () => {
  const { content } = useContent();
  const t = useT();
  const c = content.contact;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus('sending');
    setError('');
    try {
      await api.submitMessage({ name, email, message });
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : t.contact.error);
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section className="section-y relative overflow-hidden bg-mist">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[460px] w-[460px] rounded-full bg-brand-100/60 blur-[140px]" />

      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading key={c.formTitle} eyebrow={c.formEyebrow} title={c.formTitle} highlight={words(c.formHighlight)} description={c.formDescription} />
          {c.formImage && (
            <Parallax offset={30} className="mt-10 hidden lg:block">
              <Reveal direction="left" distance={50} duration={1.1}>
                <div className="group relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-lift">
                  <img src={c.formImage} alt="" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand/30 to-transparent mix-blend-multiply" />
                </div>
              </Reveal>
            </Parallax>
          )}
        </div>

        <Reveal direction="right" distance={50} duration={1} delay={0.15}>
          <form onSubmit={handleSubmit} className="relative rounded-[2rem] border border-line bg-white p-6 shadow-lift sm:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t.contact.name}>
                <input type="text" required placeholder={t.contact.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)} className="input-premium" />
              </Field>
              <Field label={t.contact.email}>
                <input type="email" required placeholder={t.contact.emailPlaceholder} value={email} onChange={(e) => setEmail(e.target.value)} className="input-premium" />
              </Field>
            </div>
            <div className="mt-5">
              <Field label={t.contact.message}>
                <textarea required placeholder={t.contact.messagePlaceholder} value={message} onChange={(e) => setMessage(e.target.value)} className="input-premium h-40 resize-none" />
              </Field>
            </div>

            <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[12.5px] text-muted">{error || t.contact.privacyNote}</p>
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileTap={{ scale: 0.97 }}
                className="shine relative inline-flex w-full min-w-[180px] items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-brand px-7 py-4 text-[14px] font-semibold text-white shadow-[0_14px_34px_-12px_rgba(15,4,255,0.7)] transition-all duration-500 hover:-translate-y-0.5 disabled:opacity-80 sm:w-auto"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {status === 'idle' && (
                    <motion.span key="idle" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25, ease: EASE }} className="inline-flex items-center gap-2">
                      {t.contact.send} <FiSend />
                    </motion.span>
                  )}
                  {status === 'sending' && (
                    <motion.span key="sending" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      {t.common.sending}
                    </motion.span>
                  )}
                  {status === 'sent' && (
                    <motion.span key="sent" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -8 }} className="inline-flex items-center gap-2">
                      <FiCheckCircle /> {t.contact.sent}
                    </motion.span>
                  )}
                  {status === 'error' && (
                    <motion.span key="error" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -8 }} className="inline-flex items-center gap-2">
                      {t.common.tryAgain}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Section2;
