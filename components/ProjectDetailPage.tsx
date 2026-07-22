import React, { useEffect, FC } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { projectsData } from './Projects';
import AnimatedDiv from './AnimatedDiv';
import MarkdownRenderer from './MarkdownRenderer';
import { useDocumentMeta } from './useDocumentMeta';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formatDate = (date: string): string => {
  const m = date.match(/^(\d{4})(?:-(\d{2}))?/);
  if (!m) return date;
  if (m[2]) {
    const idx = parseInt(m[2], 10) - 1;
    if (idx >= 0 && idx < 12) return `${MONTHS[idx]} ${m[1]}`;
  }
  return m[1];
};

const ProjectDetailPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projectsData.find(p => p.slug === slug);

  useDocumentMeta(
    project ? `${project.title} | Kaneyoshi Hiratsuka` : 'Not found | Kaneyoshi Hiratsuka',
    project?.description
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36 text-center">
        <h1 className="text-3xl font-bold text-ink mb-4 font-heading">Not found</h1>
        <button onClick={() => navigate('/')} className="text-accent hover:text-accent-hover">
          &larr; Back to Home
        </button>
      </div>
    );
  }

  const backLabel = project.category === 'research' ? 'Research' : 'Projects';
  const backHash = project.category === 'research' ? '/#research' : '/#projects';
  const hasImage = project.imageUrl && !project.imageUrl.includes('noimage');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-32 lg:pb-28">
      <AnimatedDiv>
        <article className="max-w-3xl mx-auto">
          <Link to={backHash} className="text-sm text-accent hover:text-accent-hover mb-8 inline-block">
            &larr; Back to {backLabel}
          </Link>

          <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
            <span className="font-semibold text-accent uppercase tracking-wide">
              {project.category === 'research' ? 'Research' : 'Project'}
            </span>
            <span aria-hidden className="text-ink-faint">·</span>
            <span className="tabular-nums">{formatDate(project.date)}</span>
            {project.venue && (
              <>
                <span aria-hidden className="text-ink-faint">·</span>
                <span>{project.venue}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-ink mb-5 font-heading leading-tight">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map(tag => (
              <span key={tag} className="rounded-full border border-hair bg-white px-2.5 py-1 text-xs font-medium text-ink-muted">
                {tag}
              </span>
            ))}
          </div>

          {hasImage && (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-auto object-cover rounded-xl border border-hair shadow-sm mb-8"
            />
          )}

          <div className="text-ink-light">
            <MarkdownRenderer>{project.longDescription}</MarkdownRenderer>
          </div>
        </article>
      </AnimatedDiv>
    </div>
  );
};

export default ProjectDetailPage;
