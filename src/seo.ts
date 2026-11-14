/**
 * Per-page SEO data. Pure function: used at build time (pre-rendering every page's
 * <head>) and in the browser (SEOHead updates the <head> on in-app navigation).
 */
import { Language } from './types';
import { CATEGORIES_DATA } from './data/products';
import mediaRegistry from './data/mediaRegistry.json';
import { ARTICLES, articleBySlug, articleSummary } from './data/articles';
import { Route, SITE_ORIGIN, LANGS, DEFAULT_LANG, buildPath, findProduct, canonicalCategory } from './routing';

export interface SeoData {
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  ogType: 'website' | 'product' | 'article';
  ogLocale: string;
  noindex: boolean;
  alternates: Array<{ hreflang: string; href: string }>;
  schema: object | null;
}

const registry = mediaRegistry as {
  hero?: string;
  founder?: string;
  categories?: Record<string, string>;
  products?: Record<string, { main?: string; gallery?: string[] }>;
};

const OG_LOCALE: Record<Language, string> = { ar: 'ar_SY', en: 'en_US', tr: 'tr_TR' };
const BRAND: Record<Language, string> = {
  ar: 'شركة بيرليك سوريا',
  en: 'Birlik Company Syria',
  tr: 'Birlik Şirketi Suriye',
};

const abs = (url: string | undefined): string => {
  const fallback = registry.hero || `${SITE_ORIGIN}/hero.jpg`;
  if (!url) return fallback;
  if (/^https?:\/\//.test(url)) return url;
  return `${SITE_ORIGIN}${url.startsWith('/') ? '' : '/'}${url}`;
};

const pick = (o: { ar: string; en: string; tr: string }, lang: Language) => o[lang] || o.en || o.ar;

function breadcrumb(items: Array<{ name: string; url: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  };
}

const HOME_NAME: Record<Language, string> = { ar: 'الرئيسية', en: 'Home', tr: 'Ana Sayfa' };
const BLOG_NAME: Record<Language, string> = { ar: 'دليل المواد', en: 'Material guides', tr: 'Malzeme rehberi' };
const CATALOGUE_NAME: Record<Language, string> = { ar: 'كتالوج المنتجات', en: 'Product Catalogue', tr: 'Ürün Kataloğu' };

export function getSeo(route: Route): SeoData {
  const lang = route.lang;
  const canonical = `${SITE_ORIGIN}${buildPath(route)}`;
  const alternates = [
    ...LANGS.map((l) => ({ hreflang: l, href: `${SITE_ORIGIN}${buildPath({ ...route, lang: l })}` })),
    { hreflang: 'x-default', href: `${SITE_ORIGIN}${buildPath({ ...route, lang: DEFAULT_LANG })}` },
  ];
  const base = { canonical, alternates, ogLocale: OG_LOCALE[lang], noindex: false, ogType: 'website' as const };
  const catInfo = CATEGORIES_DATA.find((c) => c.id === canonicalCategory(route.category)) || CATEGORIES_DATA[0];
  const catName = pick(catInfo.name, lang);
  const homeUrl = `${SITE_ORIGIN}/${lang}/`;
  const catalogueUrl = `${SITE_ORIGIN}/${lang}/catalogue/`;

  if (route.view === 'product') {
    const p = findProduct(route.productId);
    if (p) {
      const name = pick(p.name, lang);
      const rp = registry.products?.[p.id];
      const img = abs(rp?.main || rp?.gallery?.[0] || p.images?.[0] || registry.categories?.[canonicalCategory(p.category)] || catInfo.image);
      const desc = {
        ar: `${p.code} ${name} من ${catName} — المقاس ${p.dimensions}، السماكة ${p.thickness}، مقاوم للماء 100%. متوفر لدى شركة بيرليك في اللاذقية مع التوصيل لكل المحافظات السورية. اسأل عن السعر عبر واتساب.`,
        en: `${p.code} ${name} — ${catName}. Size ${p.dimensions}, thickness ${p.thickness}, 100% waterproof. Available from Birlik Company in Lattakia with delivery across Syria. Ask for the price on WhatsApp.`,
        tr: `${p.code} ${name} — ${catName}. Ölçü ${p.dimensions}, kalınlık ${p.thickness}, %100 su geçirmez. Birlik Şirketi, Lazkiye — Suriye geneline teslimat. Fiyat için WhatsApp'tan yazın.`,
      }[lang];
      const gallery = [rp?.main, ...(rp?.gallery || [])].filter((u): u is string => !!u).map(abs);
      return {
        ...base,
        ogType: 'product',
        title: `${p.code} ${name} | ${catName} — ${BRAND[lang]}`,
        description: desc,
        ogImage: img,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Product',
              name: `${p.code} ${name}`,
              sku: p.code,
              category: catName,
              description: desc,
              image: gallery.length ? gallery : [img],
              brand: { '@type': 'Brand', name: 'Birlik Company' },
              additionalProperty: [
                { '@type': 'PropertyValue', name: lang === 'ar' ? 'المقاس' : 'Size', value: p.dimensions },
                { '@type': 'PropertyValue', name: lang === 'ar' ? 'السماكة' : 'Thickness', value: p.thickness },
              ],
            },
            breadcrumb([
              { name: HOME_NAME[lang], url: homeUrl },
              { name: CATALOGUE_NAME[lang], url: catalogueUrl },
              { name: catName, url: `${SITE_ORIGIN}${buildPath({ lang, view: 'category', category: catInfo.id })}` },
              { name: `${p.code} ${name}`, url: canonical },
            ]),
          ],
        },
      };
    }
  }

  if (route.view === 'category') {
    const subtitle = pick(catInfo.subtitle, lang);
    const desc = {
      ar: `${catName}: ${subtitle}. تشكيلة موديلات مقاومة للماء 100% من شركة بيرليك في اللاذقية، مع التوصيل والاستشارة لكل المدن السورية.`,
      en: `${catName}: ${subtitle}. 100% waterproof models from Birlik Company in Lattakia, with delivery and consultation across Syria.`,
      tr: `${catName}: ${subtitle}. Birlik Şirketi'nden %100 su geçirmez modeller — Lazkiye, Suriye geneline teslimat.`,
    }[lang];
    return {
      ...base,
      title: `${catName} | ${lang === 'ar' ? 'مواد تكسية وديكور في سوريا واللاذقية' : lang === 'tr' ? 'Suriye Duvar Kaplama' : 'Wall & Floor Finishes in Syria'} — ${BRAND[lang]}`,
      description: desc,
      ogImage: abs(registry.categories?.[catInfo.id] || catInfo.image),
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'CollectionPage', name: catName, description: desc, url: canonical },
          breadcrumb([
            { name: HOME_NAME[lang], url: homeUrl },
            { name: CATALOGUE_NAME[lang], url: catalogueUrl },
            { name: catName, url: canonical },
          ]),
        ],
      },
    };
  }

  if (route.view === 'catalogue' || route.view === 'print') {
    return {
      ...base,
      noindex: route.view === 'print',
      title: {
        ar: 'كتالوج مواد التكسية والديكور الداخلي | شركة بيرليك سوريا',
        en: 'Wall Cladding & Flooring Catalogue | Birlik Company Syria',
        tr: 'Duvar Kaplama ve Zemin Kataloğu | Birlik Şirketi Suriye',
      }[lang],
      description: {
        ar: 'كتالوج شركة بيرليك في اللاذقية: بديل الخشب (PS)، بديل الرخام (PVC)، بديل الشيبورد الحجري (SPC)، بديل الباركيه، القُضبان والنعلات — مقاومة للماء 100% مع التوصيل لكل سوريا. حمّل الكتالوج PDF.',
        en: 'Birlik Company catalogue, Lattakia: PS wall panels, PVC marble panels, SPC wall panels, SPC flooring, PS slats and baseboards — 100% waterproof, delivered across Syria. Download the PDF catalogue.',
        tr: 'Birlik Şirketi kataloğu, Lazkiye: PS duvar panelleri, PVC mermer, SPC duvar panelleri, SPC zemin, PS çıta ve süpürgelik — %100 su geçirmez. PDF kataloğu indirin.',
      }[lang],
      ogImage: abs(registry.categories?.ps_wood),
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          { '@type': 'CollectionPage', name: CATALOGUE_NAME[lang], url: canonical },
          breadcrumb([
            { name: HOME_NAME[lang], url: homeUrl },
            { name: CATALOGUE_NAME[lang], url: canonical },
          ]),
        ],
      },
    };
  }

  if (route.view === 'article') {
    const meta = articleBySlug(route.slug);
    if (meta) {
      const c = articleSummary(meta, lang);
      const img = abs(registry.categories?.[meta.categoryId] || catInfo.image);
      const blogUrl = `${SITE_ORIGIN}/${lang}/blog/`;
      return {
        ...base,
        ogType: 'article',
        title: `${c.title} | ${BRAND[lang]}`,
        description: c.description,
        ogImage: img,
        schema: {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: c.title,
              description: c.description,
              image: [img],
              inLanguage: lang,
              datePublished: meta.published,
              dateModified: meta.updated,
              mainEntityOfPage: canonical,
              articleSection: catName,
              author: { '@type': 'Organization', name: 'Birlik Company', url: SITE_ORIGIN },
              publisher: {
                '@type': 'Organization',
                name: 'Birlik Company',
                logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/logo-512.png` },
              },
            },
            breadcrumb([
              { name: HOME_NAME[lang], url: homeUrl },
              { name: BLOG_NAME[lang], url: blogUrl },
              { name: c.title, url: canonical },
            ]),
          ],
        },
      };
    }
  }

  if (route.view === 'blog') {
    return {
      ...base,
      title: {
        ar: 'دليل مواد الإكساء: بديل الخشب، بديل الرخام، SPC والنعلات | شركة بيرليك سوريا',
        en: 'Material Guides: PS, PVC Marble, SPC Panels & Flooring | Birlik Company Syria',
        tr: 'Malzeme Rehberi: PS, PVC Mermer, SPC Panel ve Zemin | Birlik Şirketi Suriye',
      }[lang],
      description: {
        ar: 'أدلة شاملة عن مواد تكسية الجدران والأرضيات في سوريا: بديل الخشب، بديل الرخام، بديل الشيبورد الحجري، بديل الباركيه، القُضبان والنعلات — التصنيع، المميزات، الاستخدام والتركيب.',
        en: 'In-depth guides to wall and floor finishing materials in Syria: PS wood-alternative panels, PVC marble, SPC wall panels, SPC flooring, mouldings and baseboards — how they are made, benefits, uses and installation.',
        tr: 'Suriye’de duvar ve zemin kaplama malzemeleri rehberleri: PS ahşap alternatifi, PVC mermer, SPC duvar panelleri, SPC zemin, çıta ve süpürgelikler — üretim, avantajlar, kullanım ve montaj.',
      }[lang],
      ogImage: abs(registry.hero),
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            name: BLOG_NAME[lang],
            url: canonical,
            hasPart: ARTICLES.map((a) => ({
              '@type': 'Article',
              headline: articleSummary(a, lang).title,
              url: `${SITE_ORIGIN}/${lang}/blog/${a.slug}/`,
            })),
          },
          breadcrumb([
            { name: HOME_NAME[lang], url: homeUrl },
            { name: BLOG_NAME[lang], url: canonical },
          ]),
        ],
      },
    };
  }

  if (route.view === 'installation') {
    return {
      ...base,
      title: {
        ar: 'طريقة تركيب بديل الخشب والرخام والباركيه — فيديوهات ودليل | شركة بيرليك',
        en: 'How to Install PS, PVC & SPC Panels — Videos & Guide | Birlik Company Syria',
        tr: 'PS, PVC ve SPC Panel Montajı — Videolar ve Rehber | Birlik Şirketi',
      }[lang],
      description: {
        ar: 'فيديوهات وخطوات تركيب ألواح بديل الخشب، بديل الرخام، بديل الشيبورد الحجري، بديل الباركيه، القُضبان والنعلات من شركة بيرليك في اللاذقية.',
        en: 'Step-by-step videos and guides for installing PS wall panels, PVC marble, SPC wall panels, SPC flooring, slats and baseboards from Birlik Company Syria.',
        tr: 'Birlik Şirketi PS, PVC, SPC panel, zemin, çıta ve süpürgelik montaj videoları ve adım adım rehber.',
      }[lang],
      ogImage: abs(registry.hero),
      schema: {
        '@context': 'https://schema.org',
        ...breadcrumb([
          { name: HOME_NAME[lang], url: homeUrl },
          { name: lang === 'ar' ? 'دليل التركيب' : lang === 'tr' ? 'Montaj Rehberi' : 'Installation Guide', url: canonical },
        ]),
      },
    };
  }

  if (route.view === 'notfound') {
    return {
      ...base,
      noindex: true,
      canonical: homeUrl,
      alternates: [],
      title: { ar: 'الصفحة غير موجودة | شركة بيرليك', en: 'Page not found | Birlik Company', tr: 'Sayfa bulunamadı | Birlik Şirketi' }[lang],
      description: '',
      ogImage: abs(registry.hero),
      schema: null,
    };
  }

  // Home
  return {
    ...base,
    title: {
      ar: 'شركة بيرليك | بديل الخشب والرخام والباركيه ومواد الإكساء في اللاذقية وسوريا',
      en: 'Birlik Company | PS, PVC & SPC Wall Panels and Flooring in Lattakia, Syria',
      tr: 'Birlik Şirketi | Lazkiye, Suriye — PS, PVC ve SPC Duvar Panelleri ve Zemin',
    }[lang],
    description: {
      ar: 'شركة بيرليك في اللاذقية — مواد تكسية الجدران والأرضيات المقاومة للماء 100%: بديل الخشب PS، بديل الرخام PVC، بديل الشيبورد الحجري SPC، بديل الباركيه، القُضبان والنعلات، مع التوصيل لكل المحافظات السورية.',
      en: 'Birlik Company, Lattakia — 100% waterproof wall and floor finishes: PS wall panels, PVC marble panels, SPC wall panels, SPC flooring, slats and baseboards, delivered across Syria.',
      tr: 'Birlik Şirketi, Lazkiye — %100 su geçirmez duvar ve zemin kaplamaları: PS paneller, PVC mermer, SPC paneller, SPC zemin, çıta ve süpürgelik; Suriye geneline teslimat.',
    }[lang],
    ogImage: abs(registry.hero),
    schema: null, // LocalBusiness schema lives statically in index.html
  };
}
