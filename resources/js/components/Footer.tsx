import React, { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiArrowRight, FiArrowUpRight, FiCheck } from 'react-icons/fi';
import { Logo } from './ui/Logo';
import { Reveal, SplitText, Stagger, StaggerItem, Magnetic } from './motion';
import { EASE } from './motion/variants';
import { useContent, words } from '../content/useContent';
import { api } from '../content/api';
import { useT } from '../i18n/useLocale';

const Footer: React.FC = () => {
  const { content } = useContent();
  const t = useT();
  const { brand, footer } = content;
  const quickLinks = [
    { label: t.nav.home, to: '/' },
    { label: t.footer.aboutUs, to: '/about' },
    { label: t.footer.ourWork, to: '/works' },
    { label: t.nav.careers, to: '/startup' },
    { label: t.footer.internships, to: '/internships' },
    { label: t.nav.shop, to: '/shop' },
    { label: t.nav.blog, to: '/blogs' },
    { label: t.footer.contact, to: '/contact' },
  ];
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const socials = [
    { icon: FaInstagram, href: brand.socials.instagram, label: 'Instagram' },
    { icon: FaXTwitter, href: brand.socials.x, label: 'X' },
    { icon: FaLinkedinIn, href: brand.socials.linkedin, label: 'LinkedIn' },
    { icon: FaFacebookF, href: brand.socials.facebook, label: 'Facebook' },
  ].filter((s) => s.href);

  const [subError, setSubError] = useState('');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubError('');
    try {
      await api.subscribe(email.trim());
      setSent(true);
      setEmail('');
      setTimeout(() => setSent(false), 3500);
    } catch (err) {
      setSubError(err instanceof Error ? err.message : t.footer.subscribeError);
      setTimeout(() => setSubError(''), 4000);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 grid-bg-dark opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-10 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/40 blur-[160px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="container-x section-y text-center">
          <Reveal distance={14}>
            <span className="eyebrow justify-center text-brand-200">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-200" /> {footer.ctaEyebrow}
            </span>
          </Reveal>
          <SplitText
            key={footer.ctaTitle}
            as="h2"
            text={footer.ctaTitle}
            highlight={words(footer.ctaHighlight)}
            highlightClassName="text-gradient-light"
            className="mx-auto mt-5 max-w-4xl font-display text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.35}>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/60 sm:text-lg">{footer.ctaDescription}</p>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Magnetic strength={0.3}>
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-[15px] font-semibold text-ink shadow-lift transition-transform duration-500 hover:-translate-y-0.5"
                >
                  {t.footer.startProject}
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-white transition-transform duration-500 group-hover:rotate-45">
                    <FiArrowUpRight />
                  </span>
                </Link>
              </Magnetic>
              <a href={`mailto:${brand.email}`} className="link-underline text-[15px] font-medium text-white/80 hover:text-white">
                {brand.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container-x relative border-t border-white/10 pb-10 pt-16">
        <Stagger className="grid gap-12 lg:grid-cols-12" stagger={0.08}>
          <StaggerItem className="lg:col-span-5">
            <Logo light />
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-white/55">{footer.blurb}</p>

            <form onSubmit={subscribe} className="relative mt-8 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.footer.emailPlaceholder}
                className="w-full rounded-full border border-white/10 bg-white/5 py-4 pl-5 pr-36 text-[14px] text-white placeholder:text-white/35 transition-all duration-300 focus:border-brand-300/60 focus:bg-white/[0.07] focus:outline-none focus:ring-4 focus:ring-brand/20"
              />
              <motion.button
                type="submit"
                whileTap={{ scale: 0.96 }}
                className="absolute bottom-1.5 right-1.5 top-1.5 inline-flex items-center gap-2 rounded-full bg-brand px-5 text-[13px] font-semibold text-white transition-colors hover:bg-brand-400"
              >
                {sent ? (
                  <motion.span key="done" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-1.5">
                    <FiCheck /> {t.footer.subscribed}
                  </motion.span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    {t.footer.subscribe} <FiArrowRight />
                  </span>
                )}
              </motion.button>
              {subError && <p className="mt-2 text-[12.5px] text-red-400">{subError}</p>}
            </form>

            <div className="mt-8 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -4, backgroundColor: 'rgba(15,4,255,1)', borderColor: 'rgba(15,4,255,1)' }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/5 text-white/80"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </StaggerItem>

          <StaggerItem className="lg:col-span-2">
            <h4 className="font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-white/80">{t.footer.explore}</h4>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="group inline-flex items-center gap-2 text-[14px] text-white/55 transition-colors hover:text-white">
                    <span className="h-px w-0 bg-brand-300 transition-all duration-500 group-hover:w-4" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem className="lg:col-span-2">
            <h4 className="font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-white/80">{t.footer.legal}</h4>
            <ul className="mt-5 space-y-3 text-[14px] text-white/55">
              <li>
                <Link to="/privacy" className="group inline-flex items-center gap-2 transition-colors hover:text-white">
                  <span className="h-px w-0 bg-brand-300 transition-all duration-500 group-hover:w-4" />
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="group inline-flex items-center gap-2 transition-colors hover:text-white">
                  <span className="h-px w-0 bg-brand-300 transition-all duration-500 group-hover:w-4" />
                  {t.footer.terms}
                </Link>
              </li>
              {brand.rc && <li className="transition-colors hover:text-white">{brand.rc}</li>}
            </ul>
          </StaggerItem>

          <StaggerItem className="lg:col-span-3">
            <h4 className="font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-white/80">{t.footer.contact}</h4>
            <ul className="mt-5 space-y-3 text-[14px] text-white/55">
              <li className="leading-relaxed">{brand.address}</li>
              {brand.phones.map((p) => (
                <li key={p}>
                  <a href={`tel:${p.replace(/\s+/g, '')}`} className="transition-colors hover:text-white">
                    {p}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${brand.email}`} className="transition-colors hover:text-white">
                  {brand.email}
                </a>
              </li>
            </ul>
          </StaggerItem>
        </Stagger>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-[12.5px] text-white/40 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {brand.name} {t.footer.company}. {t.footer.rights}
          </p>
          <p className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t.footer.available}
          </p>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <motion.p
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
          className="-mb-6 text-center font-display text-[22vw] font-bold leading-none tracking-[-0.06em] text-white/[0.035] sm:-mb-10"
        >
          {brand.name}
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
