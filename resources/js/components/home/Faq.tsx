import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { SectionHeading } from '../ui/SectionHeading';
import { Stagger, StaggerItem, Reveal } from '../motion';
import { EASE } from '../motion/variants';
import { Button } from '../Button';
import { useContent, words } from '../../content/useContent';
import { useT } from '../../i18n/useLocale';

const Faq: React.FC = () => {
  const { content } = useContent();
  const t = useT();
  const faq = content.faq;
  const [open, setOpen] = useState<number | null>(0);

  if (faq.items.length === 0) return null;

  return (
    <section className="section-y relative bg-white">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading key={faq.title} eyebrow={faq.eyebrow} title={faq.title} highlight={words(faq.highlight)} description={faq.description} />
          <Reveal delay={0.4} className="mt-8">
            <Button to="/contact" variant="dark">
              {t.home.askSomethingElse}
            </Button>
          </Reveal>
        </div>

        <Stagger stagger={0.08} className="lg:col-span-7">
          {faq.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <StaggerItem key={`${f.q}-${i}`} y={20}>
                <div className={`group rounded-2xl border-b border-line transition-colors duration-500 ${isOpen ? 'bg-mist/60' : 'hover:bg-mist/40'}`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left sm:gap-6 sm:px-5 sm:py-6"
                  >
                    <span className="flex items-center gap-3 sm:gap-5">
                      <span className="hidden font-display text-[12px] font-medium text-muted/70 sm:block">{String(i + 1).padStart(2, '0')}</span>
                      <span className={`font-display text-[16px] font-semibold tracking-tight transition-colors sm:text-[19px] ${isOpen ? 'text-brand' : 'text-ink'}`}>
                        {f.q}
                      </span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? '#0f04ff' : '#ffffff' }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line ${isOpen ? 'text-white' : 'text-ink'}`}
                    >
                      <FiPlus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-6 text-[14.5px] leading-relaxed text-muted sm:pl-[4.1rem] sm:pr-5">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
};

export default Faq;
