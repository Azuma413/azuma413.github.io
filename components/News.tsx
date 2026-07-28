import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedDiv from './AnimatedDiv';
import { latestNews } from '../data/news';
import type { NewsItem } from '../types';

// Data lives in data/news.js (shared with the build-time SEO prerender).
export { newsData, latestNews, MAX_NEWS_ITEMS } from '../data/news';

/** "YYYY-MM-DD" / "YYYY-MM" → "2026.07.11" / "2026.07". Falls back to the raw string. */
const formatDate = (date: string): string => {
  const m = date.match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/);
  if (!m) return date;
  return [m[1], m[2], m[3]].filter(Boolean).join('.');
};

const isExternal = (href: string) => /^https?:\/\//.test(href);

const ArrowIcon: FC = () => (
  <svg
    className="mt-1 h-3.5 w-3.5 flex-shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const PhotoIcon: FC = () => (
  <svg
    className="mt-1 h-3.5 w-3.5 flex-shrink-0 opacity-40 transition-opacity duration-200 group-hover:opacity-100"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

/** Full-screen viewer, so a photo attached to a news item is actually legible. */
const Lightbox: FC<{ src: string; alt: string; onClose: () => void }> = ({ src, alt, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-ink shadow-sm transition-colors hover:bg-white"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <figure onClick={(e) => e.stopPropagation()} className="max-h-full max-w-5xl">
        <img
          src={src}
          alt={alt}
          className="max-h-[80vh] w-auto rounded-lg border border-white/20 object-contain shadow-2xl"
        />
        <figcaption className="mt-3 text-center text-sm text-white/80">{alt}</figcaption>
      </figure>
    </div>
  );
};

const ROW = 'group grid grid-cols-[5.5rem_minmax(0,1fr)] sm:grid-cols-[7rem_minmax(0,1fr)] gap-x-4 sm:gap-x-8 px-2 sm:px-4 py-4';
const TITLE = 'flex items-start gap-1.5 text-sm sm:text-base leading-relaxed';

const Body: FC<{ item: NewsItem; interactive: boolean; icon?: React.ReactNode }> = ({
  item,
  interactive,
  icon,
}) => (
  <>
    <time dateTime={item.date} className="pt-0.5 text-sm font-semibold text-ink-muted tabular-nums">
      {formatDate(item.date)}
    </time>
    <p
      className={`${TITLE} ${
        interactive ? 'text-ink transition-colors group-hover:text-accent' : 'text-ink-light'
      }`}
    >
      <span className="min-w-0">{item.title}</span>
      {icon}
    </p>
  </>
);

const News: FC = () => {
  const [lightbox, setLightbox] = useState<NewsItem | null>(null);

  if (latestNews.length === 0) return null;

  return (
    <section id="news" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedDiv>
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-ink font-heading">News</h2>
            <p className="mt-2 text-ink-muted">Talks, awards, and other recent updates.</p>
          </div>
        </AnimatedDiv>
        <AnimatedDiv delay={150}>
          <ul className="border-y border-hair divide-y divide-hair">
            {latestNews.map((item) => {
              const hover = 'transition-colors hover:bg-accent-soft/70';
              return (
                <li key={`${item.date}-${item.title}`}>
                  {/* A link wins over an image; an image-only item opens a lightbox. */}
                  {item.href ? (
                    isExternal(item.href) ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${ROW} ${hover}`}
                      >
                        <Body item={item} interactive icon={<ArrowIcon />} />
                      </a>
                    ) : (
                      <Link to={item.href} className={`${ROW} ${hover}`}>
                        <Body item={item} interactive icon={<ArrowIcon />} />
                      </Link>
                    )
                  ) : item.image ? (
                    <button
                      type="button"
                      onClick={() => setLightbox(item)}
                      className={`${ROW} w-full text-left ${hover}`}
                    >
                      <Body item={item} interactive icon={<PhotoIcon />} />
                    </button>
                  ) : (
                    <div className={ROW}>
                      <Body item={item} interactive={false} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </AnimatedDiv>
      </div>

      {lightbox?.image && (
        <Lightbox src={lightbox.image} alt={lightbox.title} onClose={() => setLightbox(null)} />
      )}
    </section>
  );
};

export default News;
