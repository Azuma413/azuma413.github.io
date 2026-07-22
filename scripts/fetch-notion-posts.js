// Fetches published blog posts from a Notion database, converts them to Markdown,
// and writes them to data/notion-posts.json (consumed by components/BlogPage.tsx).
//
// Required env vars (set as GitHub Actions secrets for CI, or in .env.local for
// local runs — see README):
//   NOTION_TOKEN        Notion integration token (ntn_... ; older tokens: secret_...)
//   NOTION_DATABASE_ID  ID of the blog database shared with the integration
//
// If the env vars are missing the script is a no-op, so builds work without Notion.

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_FILE = join(ROOT, 'data', 'notion-posts.json');
const ASSET_DIR = join(ROOT, 'public', 'notion-assets');
const ASSET_URL_PREFIX = '/notion-assets';

// Minimal .env loader so local runs pick up .env.local / .env without extra deps.
// (In CI the vars come from the workflow's `env:`, so these files are absent.)
function loadEnvFile(file) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, 'utf-8').split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 0) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}
loadEnvFile(join(ROOT, '.env.local'));
loadEnvFile(join(ROOT, '.env'));

const token = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID;

if (!token || !databaseId) {
  console.log('[notion] NOTION_TOKEN / NOTION_DATABASE_ID not set — skipping (blog will use docs/*.md only).');
  process.exit(0);
}

const { Client } = await import('@notionhq/client');
const { NotionToMarkdown } = await import('notion-to-md');

const notion = new Client({ auth: token });
const n2m = new NotionToMarkdown({ notionClient: notion });

/** Read a Notion property as plain text / value, tolerant of type. */
function readProp(prop) {
  if (!prop) return '';
  switch (prop.type) {
    case 'title': return prop.title.map((t) => t.plain_text).join('');
    case 'rich_text': return prop.rich_text.map((t) => t.plain_text).join('');
    case 'date': return prop.date?.start || '';
    case 'checkbox': return prop.checkbox;
    case 'select': return prop.select?.name || '';
    default: return '';
  }
}

/** Find a property by any of the given names (case-insensitive). */
function findProp(props, names) {
  const lower = {};
  for (const [k, v] of Object.entries(props)) lower[k.toLowerCase()] = v;
  for (const name of names) {
    if (lower[name.toLowerCase()]) return lower[name.toLowerCase()];
  }
  return undefined;
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/[^\w぀-ヿ一-鿿]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Download remote (expiring) images into public/notion-assets and rewrite links. */
async function localizeImages(markdown) {
  const imgRegex = /!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g;
  const jobs = [];
  const seen = new Map();

  let match;
  while ((match = imgRegex.exec(markdown)) !== null) {
    const url = match[2];
    // Only localize expiring Notion/S3 URLs; leave permanent external links alone.
    if (!/(amazonaws\.com|notion\.so|notion-static\.com)/.test(url)) continue;
    if (seen.has(url)) continue;

    const cleanPath = url.split('?')[0];
    let ext = extname(cleanPath).toLowerCase();
    if (!/^\.(png|jpe?g|gif|webp|svg)$/.test(ext)) ext = '.png';
    const name = createHash('sha1').update(url).digest('hex').slice(0, 16) + ext;
    seen.set(url, `${ASSET_URL_PREFIX}/${name}`);

    jobs.push(
      (async () => {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`image download ${res.status} for ${url}`);
        const buf = Buffer.from(await res.arrayBuffer());
        mkdirSync(ASSET_DIR, { recursive: true });
        writeFileSync(join(ASSET_DIR, name), buf);
      })()
    );
  }

  await Promise.all(jobs);

  let out = markdown;
  for (const [url, localPath] of seen) {
    out = out.split(url).join(localPath);
  }
  return out;
}

async function main() {
  // Page through the database.
  const pages = [];
  let cursor;
  do {
    const res = await notion.databases.query({ database_id: databaseId, start_cursor: cursor });
    pages.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);

  const posts = [];
  for (const page of pages) {
    const props = page.properties || {};

    // Skip drafts if a Published checkbox exists and is false.
    const publishedProp = findProp(props, ['Published', 'Public', '公開']);
    if (publishedProp && publishedProp.type === 'checkbox' && publishedProp.checkbox === false) {
      continue;
    }

    const titleProp = Object.values(props).find((p) => p.type === 'title');
    const title = readProp(titleProp) || 'Untitled';

    const dateProp = findProp(props, ['Date', 'PublishedAt', 'Published Date', '日付']);
    let date = readProp(dateProp);
    date = date ? String(date).split('T')[0] : (page.created_time || '').split('T')[0];

    const slugProp = findProp(props, ['Slug', 'スラッグ']);
    const slug = readProp(slugProp) || slugify(title) || page.id.replace(/-/g, '');

    const excerptProp = findProp(props, ['Excerpt', 'Description', 'Summary', '概要']);
    const excerpt = readProp(excerptProp);

    const mdblocks = await n2m.pageToMarkdown(page.id);
    let content = n2m.toMarkdownString(mdblocks).parent || '';
    content = await localizeImages(content);

    posts.push({ slug, title, date, excerpt, content });
  }

  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  mkdirSync(dirname(OUT_FILE), { recursive: true });
  writeFileSync(OUT_FILE, JSON.stringify(posts, null, 2) + '\n');
  console.log(`[notion] wrote ${posts.length} post(s) to data/notion-posts.json`);
}

main().catch((err) => {
  console.error('[notion] fetch failed:', err.message);
  // Fail the build so a broken fetch never deploys an empty blog over a good one.
  process.exit(1);
});
