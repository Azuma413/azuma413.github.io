import React, { FC } from 'react';
import AnimatedDiv from './AnimatedDiv';
import ContentList from './ContentList';
import { researchEntries } from './Projects';

const Research: FC = () => {
  return (
    <section id="research" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedDiv>
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-ink font-heading">Research</h2>
            <p className="mt-2 text-ink-muted">
              Academic work — conference presentations, papers, and lab research.
            </p>
          </div>
        </AnimatedDiv>
        <AnimatedDiv delay={150}>
          <ContentList items={researchEntries} />
        </AnimatedDiv>
      </div>
    </section>
  );
};

export default Research;
