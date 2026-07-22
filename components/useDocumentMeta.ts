import { useEffect } from 'react';

/**
 * Imperatively updates <title> and <meta name="description"> on the client so
 * SPA navigation keeps per-page metadata in sync with the prerendered HTML
 * (scripts/prerender-seo.js sets the initial values for crawlers / first paint).
 */
export function useDocumentMeta(title?: string, description?: string) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let el = document.querySelector('meta[name="description"]');
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', 'description');
        document.head.appendChild(el);
      }
      el.setAttribute('content', description);
    }
  }, [title, description]);
}
