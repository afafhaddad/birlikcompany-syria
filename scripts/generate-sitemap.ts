/**
 * Generates public/sitemap.xml from the product data before each build.
 * Run automatically by `npm run build` (see package.json).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CATEGORIES_CONFIG, PRODUCT_MODELS } from '../src/data/products';

const SITE_ORIGIN = 'https://www.birlik-insaat.com';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outFile = path.resolve(__dirname, '..', 'public', 'sitemap.xml');
const today = new Date().toISOString().slice(0, 10);

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const entries: Array<{ loc: string; priority: string; changefreq: string }> = [
  { loc: `${SITE_ORIGIN}/`, priority: '1.0', changefreq: 'weekly' },
  { loc: `${SITE_ORIGIN}/?page=catalogue`, priority: '0.9', changefreq: 'weekly' },
  { loc: `${SITE_ORIGIN}/?page=installation`, priority: '0.7', changefreq: 'monthly' },
];

for (const cat of CATEGORIES_CONFIG) {
  if (cat.id === 'all') continue;
  entries.push({ loc: `${SITE_ORIGIN}/?category=${cat.id}`, priority: '0.8', changefreq: 'weekly' });
}

const seen = new Set<string>();
for (const model of PRODUCT_MODELS) {
  if (seen.has(model.id)) continue;
  seen.add(model.id);
  entries.push({
    loc: `${SITE_ORIGIN}/?category=${encodeURIComponent(model.category)}&product=${encodeURIComponent(model.id)}`,
    priority: '0.6',
    changefreq: 'monthly',
  });
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${escapeXml(e.loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(outFile, xml, 'utf8');
console.log(`sitemap.xml written with ${entries.length} URLs -> ${outFile}`);
