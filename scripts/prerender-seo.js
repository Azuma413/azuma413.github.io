// Post-build SEO prerender for the SPA.
//
// The app is client-rendered, so every route otherwise ships the SAME <title>,
// description and (empty) body in its HTML — bad for ranking individual pages.
// This script runs AFTER `vite build` and, for each route, writes a static
// dist/<route>/index.html whose <head> carries a per-page title / description /
// canonical / Open Graph / JSON-LD, and whose #root already contains crawlable
// fallback text (React replaces it on load). It also emits sitemap.xml + robots.txt.

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projectsData } from '../data/projects.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const SITE = 'https://azuma413.github.io';
const AUTHOR = 'Kaneyoshi Hiratsuka';
const DEFAULT_OG_IMAGE = `${SITE}/images/saihouji.jpg`;

const indexPath = join(DIST, 'index.html');
if (!existsSync(indexPath)) {
  console.error('[seo] dist/index.html not found — run after vite build.');
  process.exit(1);
}
const template = readFileSync(indexPath, 'utf-8');

// ---------- helpers ----------

const escHtml = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Markdown/HTML → plain text (for descriptions and crawlable fallback body).
function toPlainText(md) {
  return String(md)
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_`>#-]/g, ' ')
    .replace(/\$\$?[^$]*\$\$?/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const clip = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s);

function parseFrontMatter(markdown) {
  const m = markdown.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!m) return { data: {}, content: markdown };
  const data = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
  return { data, content: m[2] };
}

// Build one HTML page from the template.
function buildPage({ path, title, description, image, jsonld, fallbackHtml }) {
  const url = SITE + path;
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escHtml(title)}</title>`);
  html = html.replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${escHtml(description)}" />`
  );

  const head = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${path.startsWith('/blog/') || path.startsWith('/projects/') ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="${escHtml(AUTHOR)}" />`,
    `<meta property="og:title" content="${escHtml(title)}" />`,
    `<meta property="og:description" content="${escHtml(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escHtml(title)}" />`,
    `<meta name="twitter:description" content="${escHtml(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>`,
  ].join('\n  ');
  html = html.replace('</head>', `  ${head}\n</head>`);

  // Crawlable fallback inside #root (React replaces it on hydration/mount).
  html = html.replace('<div id="root"></div>', `<div id="root">${fallbackHtml}</div>`);
  return html;
}

function writePage(routePath, html) {
  const dir = routePath === '/' ? DIST : join(DIST, routePath);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html);
}

const sitemap = [];
function addSitemap(path, lastmod) {
  sitemap.push({ loc: SITE + path, lastmod });
}

// ---------- routes ----------

// Home
{
  const description =
    'Kaneyoshi Hiratsuka — AI Researcher at Kyoto University working on robotics, reinforcement learning, multimodal perception, and world models. Research, projects, and writing.';
  const fallback =
    `<main style="max-width:48rem;margin:0 auto;padding:6rem 1.5rem;font-family:sans-serif">` +
    `<h1>${escHtml(AUTHOR)} (平塚 謙良)</h1><p>AI Researcher, Kyoto University.</p>` +
    `<p>${escHtml(description)}</p></main>`;
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR,
    alternateName: '平塚 謙良',
    url: SITE + '/',
    jobTitle: 'AI Researcher',
    affiliation: { '@type': 'CollegeOrUniversity', name: 'Kyoto University' },
    knowsAbout: ['Robotics', 'Reinforcement Learning', 'Multimodal Learning', 'World Models', 'Vision-Language-Action Models'],
    sameAs: [
      'https://github.com/Azuma413',
      'https://x.com/hirekatsu0523',
      'https://www.linkedin.com/in/kaneyoshi-hiratsuka/',
    ],
  };
  writePage('/', buildPage({
    path: '/',
    title: '平塚謙良 (Kaneyoshi Hiratsuka) | AI Researcher',
    description, image: DEFAULT_OG_IMAGE, jsonld, fallbackHtml: fallback,
  }));
  addSitemap('/');
}

// Research + Project detail pages
let projectCount = 0;
for (const p of projectsData) {
  const path = `/projects/${p.slug}/`;
  const body = toPlainText(p.longDescription);
  const description = clip(p.description || body, 300);
  const isResearch = p.category === 'research';
  const title = `${p.title} | ${AUTHOR}`;
  const image = p.imageUrl && !p.imageUrl.includes('noimage') ? SITE + p.imageUrl : DEFAULT_OG_IMAGE;

  const fallback =
    `<main style="max-width:48rem;margin:0 auto;padding:6rem 1.5rem;font-family:sans-serif">` +
    `<p>${isResearch ? 'Research' : 'Project'}${p.venue ? ' · ' + escHtml(p.venue) : ''} · ${escHtml(p.date)}</p>` +
    `<h1>${escHtml(p.title)}</h1>` +
    `<p>${escHtml(p.description)}</p>` +
    `<div>${escHtml(clip(body, 1600))}</div>` +
    `<p>${p.tags.map((t) => '#' + escHtml(t)).join(' ')}</p>` +
    `<p><a href="/">${escHtml(AUTHOR)}</a></p></main>`;

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': isResearch ? 'ScholarlyArticle' : 'CreativeWork',
    headline: p.title,
    name: p.title,
    description: p.description,
    keywords: p.tags.join(', '),
    author: { '@type': 'Person', name: AUTHOR },
    datePublished: p.date,
    url: SITE + path,
    ...(p.venue ? { publisher: { '@type': 'Organization', name: p.venue } } : {}),
  };

  writePage(path, buildPage({ path, title, description, image, jsonld, fallbackHtml: fallback }));
  addSitemap(path, /^\d{4}-\d{2}/.test(p.date) ? p.date : `${p.date.slice(0, 4)}-01-01`);
  projectCount++;
}

// Blog posts (docs/*.md + Notion)
const bySlug = new Map();
const docsDir = join(ROOT, 'docs');
if (existsSync(docsDir)) {
  for (const file of readdirSync(docsDir)) {
    if (!file.endsWith('.md')) continue;
    const slug = file.replace(/\.md$/, '');
    const raw = readFileSync(join(docsDir, file), 'utf-8');
    const { data, content } = parseFrontMatter(raw);
    const date = data.date ? new Date(data.date).toISOString().split('T')[0] : '';
    bySlug.set(slug, { slug, title: data.title || 'Untitled', date, excerpt: data.excerpt || '', content });
  }
}
const notionFile = join(ROOT, 'data', 'notion-posts.json');
if (existsSync(notionFile)) {
  for (const post of JSON.parse(readFileSync(notionFile, 'utf-8'))) bySlug.set(post.slug, post);
}
const posts = Array.from(bySlug.values()).sort((a, b) => (a.date < b.date ? 1 : -1));

// Blog index
{
  const description = "Notes on research, robotics, and things I'm building — by Kaneyoshi Hiratsuka.";
  const listHtml = posts
    .map((p) => `<li><a href="/blog/${encodeURIComponent(p.slug)}/">${escHtml(p.title)}</a> — ${escHtml(p.date)}</li>`)
    .join('');
  const fallback =
    `<main style="max-width:48rem;margin:0 auto;padding:6rem 1.5rem;font-family:sans-serif">` +
    `<h1>Blog</h1><p>${escHtml(description)}</p><ul>${listHtml}</ul></main>`;
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${AUTHOR} — Blog`,
    url: SITE + '/blog/',
    author: { '@type': 'Person', name: AUTHOR },
  };
  writePage('/blog/', buildPage({
    path: '/blog/', title: `Blog | ${AUTHOR}`, description, image: DEFAULT_OG_IMAGE, jsonld, fallbackHtml: fallback,
  }));
  addSitemap('/blog/');
}

// Blog post pages
for (const p of posts) {
  const path = `/blog/${encodeURIComponent(p.slug)}/`;
  const body = toPlainText(p.content);
  const description = clip(p.excerpt || body, 300);
  const fallback =
    `<main style="max-width:48rem;margin:0 auto;padding:6rem 1.5rem;font-family:sans-serif">` +
    `<p>${escHtml(p.date)}</p><h1>${escHtml(p.title)}</h1>` +
    `<div>${escHtml(clip(body, 1600))}</div>` +
    `<p><a href="/blog/">Blog</a> · <a href="/">${escHtml(AUTHOR)}</a></p></main>`;
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description,
    datePublished: p.date,
    author: { '@type': 'Person', name: AUTHOR },
    url: SITE + path,
    mainEntityOfPage: SITE + path,
  };
  writePage(path, buildPage({ path, title: `${p.title} | ${AUTHOR}`, description, image: DEFAULT_OG_IMAGE, jsonld, fallbackHtml: fallback }));
  addSitemap(path, /^\d{4}-\d{2}-\d{2}/.test(p.date) ? p.date : undefined);
}

// ---------- sitemap.xml + robots.txt ----------

const sitemapXml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  sitemap
    .map((e) => `  <url>\n    <loc>${e.loc}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ''}\n  </url>`)
    .join('\n') +
  `\n</urlset>\n`;
writeFileSync(join(DIST, 'sitemap.xml'), sitemapXml);

writeFileSync(
  join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`
);

// Disable GitHub Pages' Jekyll processing (which would drop files/dirs starting with "_").
writeFileSync(join(DIST, '.nojekyll'), '');

console.log(`[seo] prerendered ${projectCount} project + ${posts.length} blog page(s); sitemap has ${sitemap.length} URLs.`);
