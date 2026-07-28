import React, { FC } from 'react';
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

const Row: FC<{ item: NewsItem }> = ({ item }) => (
  <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] sm:grid-cols-[7rem_minmax(0,1fr)] gap-x-4 sm:gap-x-8 items-start">
    <time dateTime={item.date} className="pt-0.5 text-sm font-semibold text-ink-muted tabular-nums">
      {formatDate(item.date)}
    </time>
    <div className="flex min-w-0 items-start gap-3">
      <p className="min-w-0 flex-1 text-sm sm:text-base text-ink-light leading-relaxed">
        {item.title}
      </p>
      {item.image && (
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className="hidden sm:block h-14 w-20 flex-shrink-0 rounded-md border border-hair object-cover"
        />
      )}
    </div>
  </div>
);

const News: FC = () => {
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
              const isExternal = !!item.href && /^https?:\/\//.test(item.href);
              return (
                <li key={`${item.date}-${item.title}`}>
                  {item.href ? (
                    isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-2 sm:px-4 py-4 transition-colors hover:bg-accent-soft/70"
                      >
                        <Row item={item} />
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className="block px-2 sm:px-4 py-4 transition-colors hover:bg-accent-soft/70"
                      >
                        <Row item={item} />
                      </Link>
                    )
                  ) : (
                    <div className="px-2 sm:px-4 py-4">
                      <Row item={item} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </AnimatedDiv>
      </div>
    </section>
  );
};

export default News;
