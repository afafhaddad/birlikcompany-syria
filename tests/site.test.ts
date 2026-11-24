/**
 * Automated checks that run before every build (npm run build → vitest run).
 * If any of these fail, Vercel stops the deploy and the live site stays as it was.
 */
import { describe, expect, it, beforeAll } from 'vitest';
import { LANGS, MAIN_CATEGORIES, SITE_ORIGIN, allRoutes, canonicalCategory, buildPath, parseLocation, productRoute } from '../src/routing';
import { getSeo } from '../src/seo';
import { PRODUCT_MODELS, isModelInCategory } from '../src/data/products';
import { ARTICLES, articleContent, articleSummary, registerArticleContent } from '../src/data/articles';
import { ARTICLES_AR } from '../src/data/articles.ar';
import { ARTICLES_EN } from '../src/data/articles.en';
import { ARTICLES_TR } from '../src/data/articles.tr';
import { richDescription } from '../src/data/productCopy';
import { INSTALLATION_GUIDES, VIDEO_META } from '../src/data/installationGuides';
import { measureLabel, modeFor, toNumber } from '../src/components/AreaCalculator';
import registry from '../src/data/mediaRegistry.json';
import { existsSync } from 'node:fs';
import { cataloguePdfPath } from '../src/components/CatalogueDownload';

beforeAll(() => {
  registerArticleContent('ar', ARTICLES_AR);
  registerArticleContent('en', ARTICLES_EN);
  registerArticleContent('tr', ARTICLES_TR);
});

describe('routing', () => {
  it('every page address round-trips (build → parse → build)', () => {
    for (const r of allRoutes()) {
      const path = buildPath(r);
      const parsed = parseLocation(path);
      expect(parsed.view, path).toBe(r.view);
      expect(buildPath(parsed), path).toBe(path);
    }
  });

  it('page addresses are unique', () => {
    const paths = allRoutes().map(buildPath);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('old ?category=&product= links still resolve', () => {
    const r = parseLocation('/', '?category=pvc_marble&product=pvc-athena-grey');
    expect(r.view).toBe('product');
    expect(buildPath(r)).toBe('/ar/pvc-marble/pvc-athena-grey/');
  });

  it('unknown addresses are 404s', () => {
    expect(parseLocation('/ar/no-such-page/').view).toBe('notfound');
    expect(parseLocation('/xx/').view).toBe('notfound');
    expect(parseLocation('/ar/blog/no-such-guide/').view).toBe('notfound');
  });
});

describe('SEO', () => {
  const routes = allRoutes();

  it('every page has a title, description, canonical and language links', () => {
    for (const r of routes) {
      const seo = getSeo(r);
      const path = buildPath(r);
      expect(seo.title.length, path).toBeGreaterThan(10);
      expect(seo.title, path).not.toMatch(/undefined|NaN/);
      expect(seo.description.length, path).toBeGreaterThan(40);
      expect(seo.canonical, path).toBe(`${SITE_ORIGIN}${path}`);
      expect(seo.alternates.map((a) => a.hreflang).sort(), path).toEqual(['ar', 'en', 'tr', 'x-default']);
      expect(seo.ogImage, path).toMatch(/^https:\/\//);
    }
  });

  it('no Product markup (Google requires a price for it; the site has none)', () => {
    for (const r of routes) expect(JSON.stringify(getSeo(r).schema || {}), buildPath(r)).not.toContain('"@type":"Product"');
  });

  it('only the print catalogue is noindex', () => {
    for (const r of routes) expect(getSeo(r).noindex, buildPath(r)).toBe(r.view === 'print');
  });

  it('titles are unique within each language (apart from the print copy)', () => {
    for (const lang of LANGS) {
      const titles = routes.filter((r) => r.lang === lang && r.view !== 'print').map((r) => getSeo(r).title);
      expect(new Set(titles).size, lang).toBe(titles.length);
    }
  });
});

describe('products', () => {
  it('every product belongs to one of the six ranges', () => {
    for (const m of PRODUCT_MODELS) {
      expect(MAIN_CATEGORIES.some((c) => isModelInCategory(m, c)), m.id).toBe(true);
    }
  });

  it('every product has a photo', () => {
    for (const m of PRODUCT_MODELS) expect(m.images[0], m.id).toMatch(/^(https:\/\/|\/uploads\/)/);
  });

  it('product files from the editor are complete', () => {
    const ids = new Set<string>();
    for (const m of PRODUCT_MODELS) {
      expect(m.id, m.id).toMatch(/^[a-z0-9-]+$/);
      expect(ids.has(m.id), `duplicate ${m.id}`).toBe(false);
      ids.add(m.id);
      for (const lang of LANGS) {
        expect(m.name?.[lang]?.trim(), `${m.id} name.${lang}`).toBeTruthy();
        expect(m.subtitle?.[lang]?.trim(), `${m.id} subtitle.${lang}`).toBeTruthy();
      }
      expect(m.code?.trim(), `${m.id} code`).toBeTruthy();
      expect(m.dimensions?.trim(), `${m.id} dimensions`).toBeTruthy();
      expect(m.thickness?.trim(), `${m.id} thickness`).toBeTruthy();
    }
  });

  it('marble-alternative product pages have unique text (Google skipped them as near-duplicates)', () => {
    for (const lang of LANGS) {
      const seen = new Map<string, string>();
      for (const m of PRODUCT_MODELS.filter((x) => isModelInCategory(x, 'pvc_marble'))) {
        expect(m.style?.[lang]?.trim(), `${m.id} style.${lang}`).toBeTruthy();
        const text = richDescription(m, lang).join(' ');
        for (const [other, t] of seen) expect(text, `${m.id} vs ${other} (${lang})`).not.toBe(t);
        seen.set(m.id, text);
      }
    }
  });

  it('category photos are set in the media registry', () => {
    const cats = (registry as { categories: Record<string, string> }).categories;
    for (const c of MAIN_CATEGORIES) expect(cats[c], c).toMatch(/^(https:\/\/|\/uploads\/)/);
  });

  it('every product has its description paragraphs in every language (plus the style text when written)', () => {
    for (const m of PRODUCT_MODELS) {
      for (const lang of LANGS) {
        const paras = richDescription(m, lang);
        expect(paras, `${m.id} ${lang}`).toHaveLength(m.style?.[lang]?.trim() ? 4 : 3);
        paras.forEach((p) => expect(p.length, `${m.id} ${lang}`).toBeGreaterThan(40));
        expect(paras[0], `${m.id} ${lang}`).toContain(m.code);
      }
    }
  });

  it('product pages have their own address', () => {
    expect(buildPath(productRoute('ar', PRODUCT_MODELS[0]))).toMatch(/^\/ar\/[a-z-]+\/[a-z0-9-]+\/$/);
  });
});

describe('guides', () => {
  it('every range has a guide and an installation guide', () => {
    for (const c of MAIN_CATEGORIES) {
      expect(ARTICLES.some((a) => a.kind === 'guide' && a.categoryId === c), c).toBe(true);
      expect(INSTALLATION_GUIDES.some((g) => g.categoryId === c), c).toBe(true);
    }
  });

  it('every guide is complete in every language and matches its summary', () => {
    for (const a of ARTICLES) {
      for (const lang of LANGS) {
        const c = articleContent(a, lang);
        expect(c.sections.length, `${a.slug} ${lang}`).toBeGreaterThanOrEqual(a.kind === 'guide' ? 5 : 4);
        expect(c.compare.rows.length, `${a.slug} ${lang}`).toBeGreaterThanOrEqual(4);
        expect(articleSummary(a, lang).title, `${a.slug} ${lang}`).toBe(c.title);
        // the same section layout in every language
        expect(c.sections.map((s) => s.id), `${a.slug} ${lang}`).toEqual(articleContent(a, 'ar').sections.map((s) => s.id));
      }
    }
  });

  it('price, comparison and problem articles have a label and cover real ranges', () => {
    expect(new Set(ARTICLES.map((a) => a.key)).size).toBe(ARTICLES.length);
    for (const a of ARTICLES.filter((x) => x.kind === 'topic')) {
      for (const r of a.ranges || [a.categoryId]) expect(MAIN_CATEGORIES, a.slug).toContain(r);
      for (const lang of LANGS) {
        const c = articleContent(a, lang);
        expect(c.label?.trim(), `${a.slug} ${lang} label`).toBeTruthy();
        expect(c.compare.ours?.trim(), `${a.slug} ${lang} compare.ours`).toBeTruthy();
        expect(articleSummary(a, lang).label, `${a.slug} ${lang}`).toBe(c.label);
      }
    }
  });

  it('every category page has its PDF catalogue (and the full one exists) in every language', () => {
    for (const lang of LANGS) {
      expect(existsSync(`public${cataloguePdfPath(lang)}`), lang).toBe(true);
      for (const c of MAIN_CATEGORIES) expect(existsSync(`public${cataloguePdfPath(lang, c)}`), `${c} ${lang}`).toBe(true);
    }
  });

  it('installation videos have markup data', () => {
    for (const g of INSTALLATION_GUIDES) expect(VIDEO_META[g.youtubeId], g.id).toBeTruthy();
  });
});

describe('calculator input', () => {
  it('reads Arabic digits and decimal separators', () => {
    expect(toNumber('٣٫٥')).toBe(3.5);
    expect(toNumber('2,8')).toBe(2.8);
    expect(toNumber('۴')).toBe(4);
    expect(toNumber('')).toBe(0);
    expect(toNumber('abc')).toBe(0);
  });

  it('labels slats and baseboards with length, walls and floors with area', () => {
    const modelIn = (cat: string) => PRODUCT_MODELS.find((m) => canonicalCategory(m.category) === cat);
    for (const cat of ['ps_slats', 'ps_baseboards']) {
      const m = modelIn(cat);
      expect(m, cat).toBeTruthy();
      expect(modeFor(m!), cat).toBe('linear');
    }
    expect(modeFor(modelIn('spc_flooring')!)).toBe('floor');
    expect(measureLabel('linear', 'ar')).toBe('الطول');
    expect(measureLabel('linear', 'en')).toBe('Length');
    expect(measureLabel('linear', 'tr')).toBe('Uzunluk');
    expect(measureLabel('wall', 'ar')).toBe('المساحة');
    expect(measureLabel('floor', 'en')).toBe('Area');
  });
});
