import React from 'react';
import { PageHero } from '../ui/PageHero';
import { Button } from '../Button';
import { useContent, words } from '../../content/useContent';
import { useT } from '../../i18n/useLocale';

export const HeroSection: React.FC = () => {
  const { content } = useContent();
  const t = useT();
  const hero = content.pages.internships;
  return (
    <PageHero
      eyebrow={hero.eyebrow}
      title={hero.title}
      highlight={words(hero.highlight)}
      description={hero.description}
      image={hero.image}
      crumbs={[{ label: t.internships.crumb }]}
    >
      <Button href="#internships" variant="white">
        {t.internships.seeOpenings}
      </Button>
    </PageHero>
  );
};
