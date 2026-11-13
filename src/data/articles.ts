/**
 * Material guides ("blog"): one in-depth article per product range, in three languages.
 * Text lives in articles.<lang>.ts; the page adds range specs, installation steps,
 * photos and product links from the existing product data.
 */
import { Language, ProductCategory } from '../types';
import { ARTICLES_AR } from './articles.ar';
import { ARTICLES_EN } from './articles.en';
import { ARTICLES_TR } from './articles.tr';

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

const CONTENT: Record<Language, Record<string, ArticleContent>> = { ar: ARTICLES_AR, en: ARTICLES_EN, tr: ARTICLES_TR };

export const articleBySlug = (slug: string | undefined) => ARTICLES.find((a) => a.slug === slug);
export const articleByCategory = (id: ProductCategory) => ARTICLES.find((a) => a.categoryId === id);
export const articleContent = (meta: ArticleMeta, lang: Language): ArticleContent => CONTENT[lang][meta.categoryId];

/** Rough reading time in minutes */
export const readingMinutes = (c: ArticleContent) => {
  const words = [c.lead, ...c.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets || [])])].join(' ').split(/\s+/).length;
  return Math.max(3, Math.round(words / 160) + 2);
};
