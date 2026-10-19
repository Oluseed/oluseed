import React from 'react';
import { ProjectsCard } from '../ProjectsCard';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../Button';
import { Reveal, Stagger, StaggerItem } from '../motion';
import { useContent, words } from '../../content/useContent';
import { useT } from '../../i18n/useLocale';

const Projects: React.FC = () => {
  const { content } = useContent();
  const t = useT();
  const section = content.projectsSection;
  const featured = content.projects.filter((p) => p.featured).slice(0, 3);
  const list = featured.length > 0 ? featured : content.projects.slice(0, 3);

  if (list.length === 0) return null;

  return (
    <section className="section-y relative bg-mist">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            key={section.title}
            eyebrow={section.eyebrow}
            title={section.title}
            highlight={words(section.highlight)}
            description={section.description}
          />
          <Reveal delay={0.4} className="flex shrink-0 flex-wrap gap-3">
            <Button to="/contact" variant="secondary" icon={false}>
              {t.home.startNewProject}
            </Button>
            <Button to="/works">{t.home.viewAllWork}</Button>
          </Reveal>
        </div>

        <Stagger stagger={0.12} className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <StaggerItem key={p.id} y={40} className={i === 1 ? 'lg:translate-y-10' : ''}>
              <ProjectsCard {...p} index={i} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default Projects;
