// Single source of truth for the News section on the home page.
// Imported by the app (components/News.tsx) AND the build-time SEO prerender
// (scripts/prerender-seo.js), so it must stay plain data — no JSX / React imports.
//
// To add an item, just push an object onto `newsData` (order does not matter —
// the list is sorted by date, newest first, and clipped to MAX_NEWS_ITEMS).
//
//   date  : 'YYYY-MM-DD' (or 'YYYY-MM'). Required.
//   title : one short line. Required.
//   href  : optional link. External URLs open in a new tab; internal paths
//           ('/projects/...') navigate inside the site.
//   image : optional thumbnail shown at the end of the row (public/ path).

/** Only the newest N items are rendered; older entries stay here as an archive. */
export const MAX_NEWS_ITEMS = 10;

export const newsData = [
  {
    date: '2026-07-11',
    title: '関西若手交流会 — Gave a talk on imitation learning for manipulation (ACT).',
    image: '/images/news/kansai-wakate-2026.jpg',
  },
  {
    date: '2026-02-18',
    title:
      'Panel speaker at the 20th Kyoto University ICT Innovation, hosted by the Informatics Alumni Association.',
    href: 'https://www.alumni.i.kyoto-u.ac.jp/ict-innovation-20th',
  },
];

/** Newest first, clipped to MAX_NEWS_ITEMS. */
export const latestNews = [...newsData]
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  .slice(0, MAX_NEWS_ITEMS);
