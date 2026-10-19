import React from 'react';
import { PageHero } from '../components/ui/PageHero';
import { Reveal } from '../components/motion';
import { Button } from '../components/Button';
import { useContent, words } from '../content/useContent';
import { useT } from '../i18n/useLocale';

const LegalPage: React.FC<{ kind: 'privacy' | 'terms' }> = ({ kind }) => {
  const { content } = useContent();
  const t = useT();
  const { brand, pages } = content;
  const info = { name: brand.name, email: brand.email, address: brand.address, rc: brand.rc };

  const sections = kind === 'privacy' ? t.legal.privacy(info) : t.legal.terms(info);
  const title = kind === 'privacy' ? t.legal.privacyTitle : t.legal.termsTitle;
  const highlight = kind === 'privacy' ? t.legal.privacyHighlight : t.legal.termsHighlight;
  const description = kind === 'privacy' ? t.legal.privacyDescription : t.legal.termsDescription;

  return (
    <>
      <PageHero eyebrow={t.legal.eyebrow} title={title} highlight={words(highlight)} description={description} image={pages.about.image} crumbs={[{ label: title }]} />
      <section className="section-y bg-white">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="text-[13px] uppercase tracking-[0.18em] text-muted">
                {t.legal.updated} {t.legal.updatedDate}
              </p>
            </Reveal>
            <div className="mt-8 divide-y divide-line">
              {sections.map((s, i) => (
                <Reveal key={s.title} delay={0.05 * i} className="py-8 first:pt-0">
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">{s.title}</h2>
                  {s.body.map((p, j) => (
                    <p key={j} className="mt-3 text-[15.5px] leading-[1.8] text-muted">
                      {p}
                    </p>
                  ))}
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
              <Button to="/contact">{t.legal.ask}</Button>
              <Button to={kind === 'privacy' ? '/terms' : '/privacy'} variant="secondary">
                {kind === 'privacy' ? t.legal.readTerms : t.legal.readPrivacy}
              </Button>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
};

export const Privacy: React.FC = () => <LegalPage kind="privacy" />;
export const Terms: React.FC = () => <LegalPage kind="terms" />;
