/**
 * URL scheme (every page is pre-rendered to static HTML at build time):
 *
 *   /ar/                              home (also /en/, /tr/)
 *   /ar/catalogue/                    product catalogue
 *   /ar/installation/                 installation guides & videos
 *   /ar/catalogue/print/              printable catalogue (source of the PDF, noindex)
 *   /ar/ps-wood/                      category page
 *   /ar/ps-wood/ps-vangoh/            product page
 *
 * Legacy query URLs (?page=, ?category=, ?product=) are still understood and are
 * redirected client-side to the new paths so old shared links keep working.
 */
import { AppView, Language, ProductCategory, ProductModel } from './types';
import { PRODUCT_MODELS } from './data/products';
import { ARTICLES, articleBySlug } from './data/articles';

export const SITE_ORIGIN = 'https://www.birlik-insaat.com';
export const LANGS: Language[] = ['ar', 'en', 'tr'];
export const DEFAULT_LANG: Language = 'ar';

export const MAIN_CATEGORIES: ProductCategory[] = [
  'ps_wood',
  'pvc_marble',
  'spc_wall',
  'spc_flooring',
  'ps_slats',
  'ps_baseboards',
];

const CATEGORY_ALIASES: Partial<Record<ProductCategory, ProductCategory>> = {
  ps: 'ps_wood',
  slats: 'ps_wood',
  pvc: 'pvc_marble',
  walls: 'pvc_marble',
  spc: 'spc_wall',
  polystyrene_slats: 'ps_slats',
  polystyrene_baseboards: 'ps_baseboards',
  baseboards: 'ps_baseboards',
};

export type RouteView = AppView | 'print' | 'notfound' | 'blog' | 'article';

export interface Route {
  lang: Language;
  view: RouteView;
  category: ProductCategory;
  productId?: string;
  /** Article slug for view === 'article' */
  slug?: string;
  /** view === 'print' only: print one range instead of the whole catalogue */
  range?: ProductCategory;
}

export const canonicalCategory = (cat: ProductCategory): ProductCategory =>
  CATEGORY_ALIASES[cat] || (MAIN_CATEGORIES.includes(cat) ? cat : 'ps_wood');

export const categorySlug = (cat: ProductCategory) => canonicalCategory(cat).replace(/_/g, '-');

const slugToCategory = (slug: string): ProductCategory | null => {
  const id = slug.replace(/-/g, '_') as ProductCategory;
  return MAIN_CATEGORIES.includes(id) ? id : null;
};

export const findProduct = (id: string | undefined): ProductModel | undefined =>
  id ? PRODUCT_MODELS.find((m) => m.id === id || m.code.toLowerCase() === id.toLowerCase()) : undefined;

export function buildPath(route: Route): string {
  const base = `/${route.lang}/`;
  switch (route.view) {
    case 'home':
      return base;
    case 'catalogue':
      return `${base}catalogue/`;
    case 'print':
      return route.range ? `${base}catalogue/print/${categorySlug(route.range)}/` : `${base}catalogue/print/`;
    case 'installation':
      return `${base}installation/`;
    case 'calculator':
      return `${base}calculator/`;
    case 'blog':
      return `${base}blog/`;
    case 'article':
      return articleBySlug(route.slug) ? `${base}blog/${route.slug}/` : `${base}blog/`;
    case 'category':
      return `${base}${categorySlug(route.category)}/`;
    case 'product': {
      const p = findProduct(route.productId);
      return p ? `${base}${categorySlug(p.category)}/${p.id}/` : `${base}${categorySlug(route.category)}/`;
    }
    default:
      return base;
  }
}

export const homeRoute = (lang: Language): Route => ({ lang, view: 'home', category: 'ps_wood' });
export const catalogueRoute = (lang: Language): Route => ({ lang, view: 'catalogue', category: 'ps_wood' });
export const installationRoute = (lang: Language): Route => ({ lang, view: 'installation', category: 'ps_wood' });
export const blogRoute = (lang: Language): Route => ({ lang, view: 'blog', category: 'ps_wood' });
export const calculatorRoute = (lang: Language): Route => ({ lang, view: 'calculator', category: 'ps_wood' });
export const articleRoute = (lang: Language, slug: string): Route => {
  const meta = articleBySlug(slug);
  return { lang, view: 'article', category: meta ? meta.categoryId : 'ps_wood', slug };
};
export const categoryRoute = (lang: Language, cat: ProductCategory): Route => ({
  lang,
  view: 'category',
  category: canonicalCategory(cat),
});
export const productRoute = (lang: Language, model: ProductModel): Route => ({
  lang,
  view: 'product',
  category: canonicalCategory(model.category),
  productId: model.id,
});

/** href for header/footer items that point at a page or a home-page section. */
export const sectionPath = (lang: Language, sectionId: string): string => {
  if (sectionId === 'catalogue' || sectionId === 'categories-page') return buildPath(catalogueRoute(lang));
  if (sectionId === 'installation' || sectionId === 'resources' || sectionId === 'installation-videos') {
    return buildPath(installationRoute(lang));
  }
  if (sectionId === 'blog') return buildPath(blogRoute(lang));
  if (sectionId === 'calculator') return buildPath(calculatorRoute(lang));
  if (sectionId === 'hero') return buildPath(homeRoute(lang));
  return `${buildPath(homeRoute(lang))}#${sectionId}`;
};

export const categoryPath = (lang: Language, cat: ProductCategory) => buildPath(categoryRoute(lang, cat));
export const productPath = (lang: Language, model: ProductModel) => buildPath(productRoute(lang, model));

/** Parse a pathname (+ optional legacy query string) into a Route. */
export function parseLocation(pathname: string, search = ''): Route {
  const parts = pathname.split('/').filter(Boolean);
  let lang: Language = DEFAULT_LANG;
  if (parts.length && (LANGS as string[]).includes(parts[0])) {
    lang = parts.shift() as Language;
  } else if (parts.length) {
    return { lang, view: 'notfound', category: 'ps_wood' };
  }

  // Legacy query-string links: /?category=ps_wood&product=ps-vangoh
  if (parts.length === 0 && search) {
    const q = new URLSearchParams(search);
    const product = findProduct(q.get('product') || undefined);
    if (product) return productRoute(lang, product);
    const cat = q.get('category') as ProductCategory | null;
    if (cat && (MAIN_CATEGORIES.includes(cat) || cat in CATEGORY_ALIASES)) return categoryRoute(lang, cat);
    if (q.get('page') === 'catalogue') return catalogueRoute(lang);
    if (q.get('page') === 'installation') return installationRoute(lang);
  }

  if (parts.length === 0) return homeRoute(lang);
  if (parts[0] === 'catalogue' && parts.length === 1) return catalogueRoute(lang);
  if (parts[0] === 'catalogue' && parts[1] === 'print' && parts.length === 2) {
    return { lang, view: 'print', category: 'ps_wood' };
  }
  if (parts[0] === 'catalogue' && parts[1] === 'print' && parts.length === 3) {
    const range = slugToCategory(parts[2]);
    if (range) return { lang, view: 'print', category: range, range };
  }
  if (parts[0] === 'installation' && parts.length === 1) return installationRoute(lang);
  if (parts[0] === 'blog' && parts.length === 1) return blogRoute(lang);
  if (parts[0] === 'calculator' && parts.length === 1) return calculatorRoute(lang);
  if (parts[0] === 'blog' && parts.length === 2 && articleBySlug(parts[1])) return articleRoute(lang, parts[1]);

  const cat = slugToCategory(parts[0]);
  if (cat && parts.length === 1) return categoryRoute(lang, cat);
  if (cat && parts.length === 2) {
    const product = findProduct(parts[1]);
    if (product && canonicalCategory(product.category) === cat) return productRoute(lang, product);
  }
  return { lang, view: 'notfound', category: 'ps_wood' };
}

/** Every indexable page, for pre-rendering and the sitemap. */
export function allRoutes(): Route[] {
  const routes: Route[] = [];
  for (const lang of LANGS) {
    routes.push(homeRoute(lang), catalogueRoute(lang), installationRoute(lang), calculatorRoute(lang));
    routes.push({ lang, view: 'print', category: 'ps_wood' });
    for (const range of MAIN_CATEGORIES) routes.push({ lang, view: 'print', category: range, range });
    routes.push(blogRoute(lang));
    for (const a of ARTICLES) routes.push(articleRoute(lang, a.slug));
    for (const cat of MAIN_CATEGORIES) routes.push(categoryRoute(lang, cat));
    for (const model of PRODUCT_MODELS) routes.push(productRoute(lang, model));
  }
  return routes;
}

export const sameRoute = (a: Route, b: Route) => buildPath(a) === buildPath(b) && a.view === b.view;
