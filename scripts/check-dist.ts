/**
 * Last build step: checks the finished site in dist/ before Vercel publishes it.
 * Every sitemap page must exist as a pre-rendered file with real content and <head> tags.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const fail: string[] = [];

const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>https:\/\/www\.birlik-insaat\.com([^<]*)<\/loc>/g)].map((m) => m[1]);
if (urls.length < 150) fail.push(`sitemap has only ${urls.length} URLs`);

for (const u of urls) {
  const file = path.join(dist, ...u.split('/').filter(Boolean), 'index.html');
  if (!fs.existsSync(file)) {
    fail.push(`missing page ${u}`);
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] || '';
  if (title.length < 10 || /undefined|NaN/.test(title)) fail.push(`bad title on ${u}: "${title}"`);
  if (!html.includes(`<link rel="canonical" href="https://www.birlik-insaat.com${u}"`)) fail.push(`wrong canonical on ${u}`);
  if (!html.includes(`data-path="${u}"`)) fail.push(`not pre-rendered: ${u}`);
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) fail.push(`expected exactly one <h1> on ${u}`);
  if (/<img(?![^>]*\salt=)[^>]*>/.test(html)) fail.push(`image without alt text on ${u}`);
}

for (const f of ['404.html', 'robots.txt', 'manifest.webmanifest', 'fonts/cairo-arabic.woff2', 'catalogue/birlik-catalogue-ar.pdf']) {
  if (!fs.existsSync(path.join(dist, f))) fail.push(`missing ${f}`);
}

// The guide text must not be inside the main script
const assets = fs.readdirSync(path.join(dist, 'assets'));
const main = assets.find((f) => /^index-.*\.js$/.test(f));
if (main && fs.readFileSync(path.join(dist, 'assets', main), 'utf8').includes('كيف يُصنع بديل الخشب')) {
  fail.push('guide text leaked into the main script');
}

if (fail.length) {
  console.error(`\nSite check FAILED (${fail.length}):\n - ` + fail.slice(0, 40).join('\n - '));
  process.exit(1);
}
console.log(`Site check passed: ${urls.length} pages verified.`);
