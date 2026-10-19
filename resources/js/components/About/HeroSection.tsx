import React from 'react';
import { PageHero } from '../ui/PageHero';
import { Button } from '../Button';
import { useContent, words } from '../../content/useContent';
import { useT } from '../../i18n/useLocale';

export const HeroSection: React.FC = () => {
  const { content } = useContent();
  const t = useT();
  const hero = content.pages.about;
  return (
    <PageHero
      eyebrow={hero.eyebrow}
      title={hero.title}
      highlight={words(hero.highlight)}
      description={hero.description}
      image={hero.image}
      crumbs={[{ label: t.about.crumb }]}
    >
      <div className="flex flex-wrap gap-3">
        <Button to="/works" variant="white">
          {t.common.seeOurWork}
        </Button>
        <Button to="/contact" variant="ghost" className="text-white hover:bg-white/10">
          {t.common.talkToUs}
        </Button>
      </div>
    </PageHero>
  );
};
