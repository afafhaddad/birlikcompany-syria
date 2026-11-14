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
  compare: {
    /** Column title for our material; defaults to the range name */
    ours?: string;
    other: string;
    rows: Array<[string, string, string]>;
  };
  /** Short label for the card badge and breadcrumb (topic articles) */
  label?: string;
}

export interface ArticleMeta {
  /** Key of the text in articles.<lang>.ts (the range id for range guides) */
  key: string;
  /** Main range: hero photo and video, specs, installation steps */
  categoryId: ProductCategory;
  slug: string;
  published: string;
  updated: string;
  /** 'guide' = one per range; 'topic' = price, comparison or problem article */
  kind: 'guide' | 'topic';
  /** Ranges whose models are shown (defaults to categoryId) */
  ranges?: ProductCategory[];
  /** Own cover photo (defaults to the main range's category photo) */
  image?: string;
  /** Show the quantity calculator (with a range picker) */
  calculator?: boolean;
}

const guide = (categoryId: ProductCategory, slug: string): ArticleMeta => ({
  key: categoryId,
  categoryId,
  slug,
  published: '2026-11-13',
  updated: '2026-11-13',
  kind: 'guide',
});

export const ARTICLES: ArticleMeta[] = [
  guide('ps_wood', 'wood-alternative-ps-wall-panels'),
  guide('pvc_marble', 'marble-alternative-pvc-wall-panels'),
  guide('spc_wall', 'spc-wall-panels-stone-composite'),
  guide('spc_flooring', 'spc-flooring-parquet-alternative'),
  guide('ps_slats', 'ps-wall-mouldings-french-panelling'),
  guide('ps_baseboards', 'ps-baseboards-waterproof-skirting'),
  {
    key: 'cost',
    image: '/uploads/products/marble-alternative-pvc-wall-panel-golden-sheet-1.webp',
    categoryId: 'pvc_marble',
    slug: 'wall-cladding-cost-syria',
    published: '2026-11-14',
    updated: '2026-11-14',
    kind: 'topic',
    ranges: ['pvc_marble', 'ps_wood', 'spc_wall', 'spc_flooring'],
    calculator: true,
  },
  {
    key: 'pvc_vs_ceramic',
    image: '/uploads/products/marble-alternative-pvc-wall-panel-fuji-grey-1.webp',
    categoryId: 'pvc_marble',
    slug: 'marble-alternative-vs-ceramic-tiles',
    published: '2026-11-14',
    updated: '2026-11-14',
    kind: 'topic',
    ranges: ['pvc_marble', 'spc_wall'],
  },
  {
    key: 'spc_vs_parquet',
    categoryId: 'spc_flooring',
    slug: 'spc-flooring-vs-wood-parquet',
    published: '2026-11-14',
    updated: '2026-11-14',
    kind: 'topic',
  },
  {
    key: 'ps_vs_wallpaper',
    categoryId: 'ps_wood',
    slug: 'wood-alternative-vs-wallpaper',
    published: '2026-11-14',
    updated: '2026-11-14',
    kind: 'topic',
    ranges: ['ps_wood', 'ps_slats'],
  },
  {
    key: 'damp_walls',
    image: '/uploads/products/marble-alternative-pvc-wall-panel-marbella-1.webp',
    categoryId: 'spc_wall',
    slug: 'damp-walls-solution',
    published: '2026-11-14',
    updated: '2026-11-14',
    kind: 'topic',
    ranges: ['spc_wall', 'pvc_marble', 'ps_baseboards'],
  },
  {
    key: 'bathroom_no_demolition',
    image: '/uploads/products/marble-alternative-pvc-wall-panel-athena-grey-2.webp',
    categoryId: 'pvc_marble',
    slug: 'bathroom-renovation-without-demolition',
    published: '2026-11-14',
    updated: '2026-11-14',
    kind: 'topic',
    ranges: ['pvc_marble', 'spc_wall', 'spc_flooring'],
  },
];

export const articleRanges = (meta: ArticleMeta): ProductCategory[] => meta.ranges || [meta.categoryId];

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
export const articleSummary = (meta: ArticleMeta, lang: Language) => ARTICLE_SUMMARIES[lang][meta.key];

export const articleBySlug = (slug: string | undefined) => ARTICLES.find((a) => a.slug === slug);
/** The range guide for a category (not the topic articles) */
export const articleByCategory = (id: ProductCategory) => ARTICLES.find((a) => a.kind === 'guide' && a.categoryId === id);
/** Topic articles that cover a range, for "related reading" links */
export const topicsForCategory = (id: ProductCategory) => ARTICLES.filter((a) => a.kind === 'topic' && articleRanges(a).includes(id));
/** Full guide text; call loadArticleContent(lang) first (the router does this). */
export const articleContent = (meta: ArticleMeta, lang: Language): ArticleContent => {
  const c = CONTENT[lang]?.[meta.key];
  if (!c) throw new Error(`Article content for "${lang}" is not loaded yet`);
  return c;
};

/** Rough reading time in minutes */
export const readingMinutes = (c: ArticleContent) => {
  const words = [c.lead, ...c.sections.flatMap((s) => [...s.paragraphs, ...(s.bullets || [])])].join(' ').split(/\s+/).length;
  return Math.max(3, Math.round(words / 160) + 2);
};
