/** Server entry used only at build time to pre-render every page to static HTML. */
import { renderToString } from 'react-dom/server';
import App from './App';
import { Route, allRoutes, buildPath, canonicalCategory, findProduct, LANGS, MAIN_CATEGORIES, SITE_ORIGIN } from './routing';
import { getSeo } from './seo';
import { PRODUCT_MODELS, isModelInCategory } from './data/products';
import { articleBySlug, articleRanges, registerArticleContent } from './data/articles';
import mediaRegistry from './data/mediaRegistry.json';
import type { ProductCategory } from './types';
import { ARTICLES_AR } from './data/articles.ar';
import { ARTICLES_EN } from './data/articles.en';
import { ARTICLES_TR } from './data/articles.tr';

// Pre-rendering needs every guide in full
registerArticleContent('ar', ARTICLES_AR);
registerArticleContent('en', ARTICLES_EN);
registerArticleContent('tr', ARTICLES_TR);

export function render(route: Route): string {
  return renderToString(<App initialRoute={route} />);
}

const registry = mediaRegistry as { hero?: string; categories?: Record<string, string> };
const absUrl = (u: string) => (/^https?:\/\//.test(u) ? u : `${SITE_ORIGIN}${u.startsWith('/') ? '' : '/'}${u}`);

/** Photos shown on a page, for the image sitemap (Google Images). */
export function sitemapImages(route: Route): string[] {
  const list: Array<string | undefined> = [];
  const cat = (c: ProductCategory) => registry.categories?.[canonicalCategory(c)];
  const rangePhotos = (c: ProductCategory, perModel = 1) =>
    PRODUCT_MODELS.filter((m) => isModelInCategory(m, c)).forEach((m) => list.push(...m.images.slice(0, perModel)));

  if (route.view === 'product') {
    list.push(...(findProduct(route.productId)?.images || []));
  } else if (route.view === 'category') {
    list.push(cat(route.category));
    rangePhotos(route.category);
  } else if (route.view === 'article') {
    const meta = articleBySlug(route.slug);
    if (meta) {
      list.push(meta.image, cat(meta.categoryId));
      for (const c of articleRanges(meta)) rangePhotos(c);
    }
  } else if (route.view === 'home' || route.view === 'catalogue') {
    list.push(registry.hero, ...MAIN_CATEGORIES.map(cat));
  }
  return [...new Set(list.filter((u): u is string => !!u && u.trim() !== ''))].slice(0, 1000).map(absUrl);
}

export { allRoutes, buildPath, getSeo, LANGS, MAIN_CATEGORIES, SITE_ORIGIN, PRODUCT_MODELS };
