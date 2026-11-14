/**
 * Automated checks that run before every build (npm run build → vitest run).
 * If any of these fail, Vercel stops the deploy and the live site stays as it was.
 */
import { describe, expect, it, beforeAll } from 'vitest';
import { LANGS, MAIN_CATEGORIES, SITE_ORIGIN, allRoutes, buildPath, parseLocation, productRoute } from '../src/routing';
import { getSeo } from '../src/seo';
import { PRODUCT_MODELS, isModelInCategory } from '../src/data/products';
import { ARTICLES, articleContent, articleSummary, registerArticleContent } from '../src/data/articles';
import { ARTICLES_AR } from '../src/data/articles.ar';
import { ARTICLES_EN } from '../src/data/articles.en';
import { ARTICLES_TR } from '../src/data/articles.tr';
import { richDescription } from '../src/data/productCopy';
import { INSTALLATION_GUIDES } from '../src/data/installationGuides';
import { toNumber } from '../src/components/AreaCalculator';
import registry from '../src/data/mediaRegistry.json';

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

  it('every product has a photo in the media registry', () => {
    const products = (registry as { products: Record<string, { main?: string }> }).products;
    for (const m of PRODUCT_MODELS) expect(products[m.id]?.main, m.id).toMatch(/^https:\/\//);
  });

  it('every product has three description paragraphs in every language', () => {
    for (const m of PRODUCT_MODELS) {
      for (const lang of LANGS) {
        const paras = richDescription(m, lang);
        expect(paras, `${m.id} ${lang}`).toHaveLength(3);
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
      expect(ARTICLES.some((a) => a.categoryId === c), c).toBe(true);
      expect(INSTALLATION_GUIDES.some((g) => g.categoryId === c), c).toBe(true);
    }
  });

  it('every guide is complete in every language and matches its summary', () => {
    for (const a of ARTICLES) {
      for (const lang of LANGS) {
        const c = articleContent(a, lang);
        expect(c.sections.length, `${a.slug} ${lang}`).toBeGreaterThanOrEqual(5);
        expect(c.compare.rows.length, `${a.slug} ${lang}`).toBeGreaterThanOrEqual(4);
        expect(articleSummary(a, lang).title, `${a.slug} ${lang}`).toBe(c.title);
      }
    }
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
});
