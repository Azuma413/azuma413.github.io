import React, { FC } from 'react';
import AnimatedDiv from './AnimatedDiv';
import ContentList from './ContentList';
import { projectEntries } from '../data/projects';

// Data lives in data/projects.js (shared with the build-time SEO prerender).
// Re-exported here so existing imports (`./Projects`) keep working.
export { projectsData, researchEntries, projectEntries } from '../data/projects';

const Projects: FC = () => {
  return (
    <section id="projects" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedDiv>
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-ink font-heading">
              Projects &amp; Activities
            </h2>
            <p className="mt-2 text-ink-muted">
              Contests, product development, entrepreneurship, and community work.
            </p>
          </div>
        </AnimatedDiv>
        <AnimatedDiv delay={150}>
          <ContentList items={projectEntries} />
        </AnimatedDiv>
      </div>
    </section>
  );
};

export default Projects;
