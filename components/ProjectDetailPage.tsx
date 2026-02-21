import React, { useEffect, FC } from 'react';
// Fix: Corrected import for react-router-dom.
import { useParams, useNavigate } from "react-router-dom";
import { projectsData } from './Projects';
import AnimatedDiv from './AnimatedDiv';
import MarkdownRenderer from './MarkdownRenderer';

const ProjectDetailPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projectsData.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
        <h1 className="text-4xl font-bold text-white mb-4 font-heading">Project not found</h1>
        <button onClick={() => navigate('/')} className="text-slate-400 hover:text-slate-300">
          &larr; Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
      <AnimatedDiv>
        <div className="max-w-4xl mx-auto">
          <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-slate-300 mb-8 inline-block">
            &larr; Back to Projects
          </button>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-heading">{project.title}</h1>

          <div className="flex flex-wrap gap-2 my-6">
            {project.tags.map(tag => (
              <span key={tag} className="bg-slate-700 text-slate-300 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
            ))}
          </div>

          <img src={project.imageUrl} alt={project.title} className="w-full h-auto object-cover rounded-lg shadow-lg mb-8" />

          <div className="text-slate-300">
            <MarkdownRenderer>{project.longDescription}</MarkdownRenderer>
          </div>
        </div>
      </AnimatedDiv>
    </div>
  );
};

export default ProjectDetailPage;
