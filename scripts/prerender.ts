/**
 * Build step 3 of 3 (see package.json "build"):
 *   1. vite build                       → dist/ (client bundle + index.html template)
 *   2. vite build --ssr                 → dist-ssr/entry-server.js
 *   3. tsx scripts/prerender.ts         → dist/<lang>/<page>/index.html for every page,
 *                                         dist/404.html and dist/sitemap.xml
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');

type Route = { lang: 'ar' | 'en' | 'tr'; view: string; category: string; productId?: string; slug?: string };
type Seo = {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogType: string;
  ogLocale: string;
  noindex: boolean;
  alternates: Array<{ hreflang: string; href: string }>;
  schema: object | null;
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function setMeta(html: string, attr: 'name' | 'property', key: string, content: string): string {
  const re = new RegExp(`<meta ${attr}="${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}" content="[^"]*"\\s*/?>`);
  const tag = `<meta ${attr}="${key}" content="${esc(content)}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
}

function renderPage(template: string, route: Route, appHtml: string, seo: Seo, pathName: string): string {
  let html = template;
  const dir = route.lang === 'ar' ? 'rtl' : 'ltr';
  html = html.replace(/<html[^>]*>/, `<html lang="${route.lang}" dir="${dir}">`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`);
  html = html.replace(/\s*<meta name="keywords"[^>]*>/, '');
  html = setMeta(html, 'name', 'description', seo.description);
  html = setMeta(html, 'name', 'robots', seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1');
  html = setMeta(html, 'property', 'og:title', seo.title);
  html = setMeta(html, 'property', 'og:description', seo.description);
  html = setMeta(html, 'property', 'og:url', seo.canonical);
  html = setMeta(html, 'property', 'og:image', seo.ogImage);
  html = setMeta(html, 'property', 'og:type', seo.ogType);
  html = setMeta(html, 'property', 'og:locale', seo.ogLocale);
  html = setMeta(html, 'name', 'twitter:title', seo.title);
  html = setMeta(html, 'name', 'twitter:description', seo.description);
  html = setMeta(html, 'name', 'twitter:image', seo.ogImage);
  html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${esc(seo.canonical)}" />`);

  const extraHead = [
    ...seo.alternates.map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${esc(a.href)}" />`),
    seo.schema
      ? `<script type="application/ld+json" id="birlik-page-schema">${JSON.stringify(seo.schema).replace(/</g, '\\u003c')}</script>`
      : '',
  ]
    .filter(Boolean)
    .map((l) => `    ${l}`)
    .join('\n');
  html = html.replace('</head>', `${extraHead}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root" data-path="${pathName}">${appHtml}</div>`);
  return html;
}

async function main() {
  const ssr = await import(pathToFileURL(ssrEntry).href);
  const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
  const routes: Route[] = ssr.allRoutes();

  let count = 0;
  for (const route of routes) {
    const pathName: string = ssr.buildPath(route);
    const html = renderPage(template, route, ssr.render(route), ssr.getSeo(route), pathName);
    const outDir = path.join(dist, ...pathName.split('/').filter(Boolean));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
    count++;
  }

  // 404 page (Arabic, noindex)
  const nf: Route = { lang: 'ar', view: 'notfound', category: 'ps_wood' };
  fs.writeFileSync(path.join(dist, '404.html'), renderPage(template, nf, ssr.render(nf), ssr.getSeo(nf), '/404'), 'utf8');

  // Root index.html = Arabic home (the "/" URL itself redirects to /ar/ in vercel.json)
  fs.copyFileSync(path.join(dist, 'ar', 'index.html'), path.join(dist, 'index.html'));

  // Sitemap with hreflang alternates (indexable pages only)
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .filter((r) => r.view !== 'print')
    .map((r) => {
      const seo: Seo = ssr.getSeo(r);
      const alts = seo.alternates
        .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${esc(a.href)}" />`)
        .join('\n');
      const priority = r.view === 'home' ? '1.0' : r.view === 'catalogue' ? '0.9' : r.view === 'category' || r.view === 'article' ? '0.8' : r.view === 'blog' ? '0.7' : r.view === 'installation' ? '0.7' : '0.6';
      return `  <url>\n    <loc>${esc(seo.canonical)}</loc>\n${alts}\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
    });
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
  fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap, 'utf8');

  fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
  console.log(`Pre-rendered ${count} pages + 404.html; sitemap.xml has ${urls.length} URLs.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
