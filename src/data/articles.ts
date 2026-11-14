/**
 * Material guides ("blog"): one in-depth article per product range, in three languages.
 * Text lives in articles.<lang>.ts; the page adds range specs, installation steps,
 * photos and product links from the existing product data.
 */
import { Language, ProductCategory } from '../types';
import { ARTICLE_SUMMARIES } from './articles.summary';

export interface ArticleSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface ArticleContent {
  title: string;
  /** Meta description / card summary */
  description: string;
  lead: string;
  sections: ArticleSection[];
  compare: { other: string; rows: Array<[string, string, string]> };
}

export interface ArticleMeta {
  categoryId: ProductCategory;
  slug: string;
  published: string;
  updated: string;
}

export const ARTICLES: ArticleMeta[] = [
  { categoryId: 'ps_wood', slug: 'wood-alternative-ps-wall-panels', published: '2026-11-13', updated: '2026-11-13' },
  { categoryId: 'pvc_marble', slug: 'marble-alternative-pvc-wall-panels', published: '2026-11-13', updated: '2026-11-13' },
  { categoryId: 'spc_wall', slug: 'spc-wall-panels-stone-composite', published: '2026-11-13', updated: '2026-11-13' },
  { categoryId: 'spc_flooring', slug: 'spc-flooring-parquet-alternative', published: '2026-11-13', updated: '2026-11-13' },
  { categoryId: 'ps_slats', slug: 'ps-wall-mouldings-french-panelling', published: '2026-11-13', updated: '2026-11-13' },
  { categoryId: 'ps_baseboards', slug: 'ps-baseboards-waterproof-skirting', published: '2026-11-13', updated: '2026-11-13' },
];

// Full guide text is split into one file per language and loaded on demand.
const CONTENT: Partial<Record<Language, Record<string, ArticleContent>>> = {};
const LOADERS: Record<Language, () => Promise<Record<string, ArticleContent>>> = {
  ar: () => import('./articles.ar').then((m) => m.ARTICLES_AR),
  en: () => import('./articles.en').then((m) => m.ARTICLES_EN),
  tr: () => import('./articles.tr').then((m) => m.ARTICLES_TR),
};

export const hasArticleContent = (lang: Language) => !!CONTENT[lang];
export const registerArticleContent = (lang: Language, data: Record<string, ArticleContent>) => {
  CONTENT[lang] = data;
};
export const loadArticleContent = async (lang: Language) => {
  if (!CONTENT[lang]) CONTENT[lang] = await LOADERS[lang]();
};

/** Title + description, always available (used for cards and <head>). */
export const articleSummary = (meta: ArticleMeta, lang: Language) => ARTICLE_SUMMARIES[lang][meta.categoryId];

export const articleBySlug = (slug: string | undefined) => ARTICLES.find((a) => a.slug === slug);
export const articleByCategory = (id: ProductCategory) => ARTICLES.find((a) => a.categoryId === id);
/** Full guide text; call loadArticleContent(lang) first (the router does this). */
export const articleContent = (meta: ArticleMeta, lang: Language): ArticleContent => {
  const c = CONTENT[lang]?.[meta.categoryId];
  if (!c) throw new Error(`Article content for "${lang}" is not loaded yet`);
  return c;
};

/** Rough reading time in minutes */
export const readingMinutes = (c: ArticleContent) => {
  const words = [c.lead, ...c.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets || [])])].join(' ').split(/\s+/).length;
  return Math.max(3, Math.round(words / 160) + 2);
};
