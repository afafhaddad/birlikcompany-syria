import React, { useEffect } from 'react';
import { Route } from '../routing';
import { getSeo } from '../seo';

export { SITE_ORIGIN } from '../routing';

const SCHEMA_ID = 'birlik-page-schema';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Keeps <head> in sync with the current page. Pre-rendered pages already ship the
 * right <head>; re-applying it is harmless and covers legacy-URL redirects and 404s.
 */
export const SEOHead: React.FC<{ route: Route }> = ({ route }) => {
  useEffect(() => {
    const seo = getSeo(route);
    document.title = seo.title;
    setMeta('name', 'description', seo.description);
    setMeta('name', 'robots', seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    setMeta('property', 'og:title', seo.title);
    setMeta('property', 'og:description', seo.description);
    setMeta('property', 'og:url', seo.canonical);
    setMeta('property', 'og:image', seo.ogImage);
    setMeta('property', 'og:type', seo.ogType);
    setMeta('property', 'og:locale', seo.ogLocale);
    setMeta('name', 'twitter:title', seo.title);
    setMeta('name', 'twitter:description', seo.description);
    setMeta('name', 'twitter:image', seo.ogImage);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = seo.canonical;

    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((n) => n.remove());
    seo.alternates.forEach((a) => {
      const l = document.createElement('link');
      l.rel = 'alternate';
      l.hreflang = a.hreflang;
      l.href = a.href;
      document.head.appendChild(l);
    });

    document.getElementById(SCHEMA_ID)?.remove();
    if (seo.schema) {
      const s = document.createElement('script');
      s.id = SCHEMA_ID;
      s.type = 'application/ld+json';
      s.textContent = JSON.stringify(seo.schema);
      document.head.appendChild(s);
    }
  }, [route]);

  return null;
};
