import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../types';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Formats "YYYY" or "YYYY-MM" for display. Falls back to the raw string. */
const formatDate = (date: string): string => {
  const m = date.match(/^(\d{4})(?:-(\d{2}))?/);
  if (!m) return date;
  const year = m[1];
  if (m[2]) {
    const idx = parseInt(m[2], 10) - 1;
    if (idx >= 0 && idx < 12) return `${MONTHS[idx]} ${year}`;
  }
  return year;
};

/** Descending by date string (YYYY / YYYY-MM sort lexically as intended). */
const byDateDesc = (a: Project, b: Project) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0);

interface ContentListProps {
  items: Project[];
}

const ContentList: FC<ContentListProps> = ({ items }) => {
  const sorted = [...items].sort(byDateDesc);

  return (
    <ul className="border-y border-hair divide-y divide-hair">
      {sorted.map((item) => (
        <li key={item.slug}>
          <Link
            to={`/projects/${item.slug}`}
            className="group grid grid-cols-[4rem_minmax(0,1fr)] sm:grid-cols-[8rem_minmax(0,1fr)] gap-x-4 sm:gap-x-8 px-2 sm:px-4 py-5 transition-colors hover:bg-accent-soft/70"
          >
            <div className="pt-1">
              <div className="text-sm font-semibold text-ink-muted tabular-nums">
                {formatDate(item.date)}
              </div>
              {item.venue && (
                <div className="mt-0.5 text-xs text-ink-faint leading-snug">{item.venue}</div>
              )}
            </div>

            <div className="min-w-0">
              <h3 className="flex items-start gap-1.5 font-heading text-lg sm:text-xl font-semibold text-ink transition-colors group-hover:text-accent">
                <span className="min-w-0">{item.title}</span>
                <svg
                  className="mt-1.5 h-3.5 w-3.5 flex-shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </h3>
              <p className="mt-1 text-sm sm:text-base text-ink-light leading-relaxed line-clamp-2">
                {item.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
                {item.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="text-xs font-medium text-ink-faint">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ContentList;
