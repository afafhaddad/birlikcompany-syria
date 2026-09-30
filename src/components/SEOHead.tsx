import React, { useEffect } from 'react';
import { AppView, Language, ProductCategory, ProductModel } from '../types';
import { CATEGORIES_DATA } from '../data/products';

interface SEOHeadProps {
  currentView: AppView;
  currentLang: Language;
  activeCategory: ProductCategory;
  activeProduct: ProductModel | null;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  currentView,
  currentLang,
  activeCategory,
  activeProduct,
}) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const origin = window.location.origin;
    const catInfo = CATEGORIES_DATA.find((c) => c.id === activeCategory) || CATEGORIES_DATA[0];

    // Helper to make absolute image URL
    const toAbsoluteUrl = (url: string | undefined): string => {
      if (!url) return `${origin}/hero.png`;
      if (url.startsWith('http://') || url.startsWith('https://')) return url;
      return `${origin}${url.startsWith('/') ? '' : '/'}${url}`;
    };

    let title = '';
    let description = '';
    let keywords = '';
    let ogImage = `${origin}/hero.png`;
    let ogUrl = `${origin}/`;
    let schemaData: object | null = null;

    // Common high-ranking keywords for Syria & Lattakia interior decor
    const baseKeywordsAr = 'شركة بيرليك, بيرليك للديكور, مواد تكسية الجدران سوريا, ديكور داخلي اللاذقية, تشطيبات معمارية دمشق, ترميم منازل سوريا, بديل الخشب اللاذقية, بديل الرخام سوريا, بديل الشيبورد الحجري, بديل الباركيه, قُضبان بي إس, نعلات معمارية فوم, تكسية جدران ضد الماء 100%, مهندس يوسف حداد';
    const baseKeywordsEn = 'Birlik Company, Birlik Insaat, luxury architectural wall cladding Syria, interior decor Lattakia, home renovation Damascus, interior design Syria, waterproof wall panels, PS wall panels, PVC marble sheets, SPC wall panels, rigid stone parquet, PS moldings, architectural baseboards, Turkish finishing materials Syria';

    if (currentView === 'product' && activeProduct) {
      const prodName = activeProduct.name[currentLang] || activeProduct.name.ar;
      const catName = catInfo.name[currentLang] || catInfo.name.ar;
      const firstImg = activeProduct.images?.[0] || catInfo.image;
      ogImage = toAbsoluteUrl(firstImg);
      ogUrl = `${origin}/?category=${activeCategory}&product=${activeProduct.id}`;

      if (currentLang === 'ar') {
        title = `${activeProduct.code} - ${prodName} | ${catName} — شركة بيرليك سوريا`;
        description = `اكتشف مواصفات ${activeProduct.code} (${prodName}) ضمن فئة ${catName} من شركة بيرليك في اللاذقية وسوريا. مقاوم للماء بنسبة 100% مع تشطيب معماري فائق وشحن لكافة المحافظات.`;
        keywords = `${activeProduct.code}, ${prodName}, ${catName}, بديل الخشب, بديل الرخام, ديكور جداري اللاذقية, ديكور داخلي سوريا, مواد تكسية, ${baseKeywordsAr}`;
      } else {
        title = `${activeProduct.code} - ${prodName} | ${catName} — Birlik Company Syria`;
        description = `Explore technical specifications for ${activeProduct.code} (${prodName}) under ${catName} from Birlik Company in Lattakia, Syria. 100% waterproof architectural wall materials with Syria-wide delivery.`;
        keywords = `${activeProduct.code}, ${prodName}, ${catName}, architectural wall panels Syria, Lattakia interior decor, ${baseKeywordsEn}`;
      }

      // Schema.org Product
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: prodName,
        image: activeProduct.images?.map(toAbsoluteUrl) || [ogImage],
        description: description,
        sku: activeProduct.code,
        mpn: activeProduct.id,
        category: catName,
        brand: {
          '@type': 'Brand',
          name: 'Birlik Company',
        },
        manufacturer: {
          '@type': 'Organization',
          name: 'شركة بيرليك لمواد التكسية والديكور الجداري',
          url: origin,
        },
        offers: {
          '@type': 'Offer',
          url: ogUrl,
          priceCurrency: 'USD',
          price: '0.00',
          priceValidUntil: '2027-12-31',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@type': 'Organization',
            name: 'Birlik Company Syria',
            telephone: '+963995764573',
          },
        },
      };

    } else if (currentView === 'category') {
      const catName = catInfo.name[currentLang] || catInfo.name.ar;
      const catSubtitle = catInfo.subtitle[currentLang] || catInfo.subtitle.ar;
      ogImage = toAbsoluteUrl(catInfo.image);
      ogUrl = `${origin}/?category=${activeCategory}`;

      if (currentLang === 'ar') {
        title = `${catName} | مواد تكسية وديكور جداري في سوريا واللاذقية — شركة بيرليك`;
        description = `${catSubtitle}. تشكيلة واسعة بمواصفات عالمية ومقاومة للماء والرطوبة 100% من شركة بيرليك باللاذقية. متوفرة مع خدمة التوصيل والاستشارة لجميع المدن السورية.`;
        keywords = `${catName}, ${catInfo.id}, بديل الخشب سوريا, بديل الرخام اللاذقية, ألواح جدارية, ديكور داخلي سوريا, تشطيبات فندقية وسكنية, ${baseKeywordsAr}`;
      } else {
        title = `${catName} | Architectural Wall Cladding Syria & Lattakia — Birlik Company`;
        description = `${catSubtitle}. Explore our premium 100% waterproof interior wall cladding collections from Birlik Company in Lattakia, Syria. Nationwide delivery and project consultations.`;
        keywords = `${catName}, ${catInfo.id}, architectural wall panels Syria, Lattakia interior decor, ${baseKeywordsEn}`;
      }

      // Schema.org CollectionPage & Breadcrumbs
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: catName,
        description: description,
        url: ogUrl,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: currentLang === 'ar' ? 'الرئيسية' : 'Home',
              item: origin,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: currentLang === 'ar' ? 'الكتالوج' : 'Catalogue',
              item: `${origin}/?page=catalogue`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: catName,
              item: ogUrl,
            },
          ],
        },
      };

    } else if (currentView === 'catalogue') {
      ogImage = toAbsoluteUrl(catInfo.image);
      ogUrl = `${origin}/?page=catalogue`;

      if (currentLang === 'ar') {
        title = 'كتالوج مواد التكسية والديكور الداخلي المعماري | شركة بيرليك سوريا';
        description = 'تصفح الكتالوج الشامل لشركة بيرليك في اللاذقية وسوريا: بديل الخشب (PS)، بديل الرخام (PVC)، بديل الشيبورد الحجري (SPC)، بديل الباركيه، والقُضبان والنعلات المعمارية المقاومة للماء 100%.';
        keywords = `كتالوج مواد الديكور, كتالوج تكسية الجدران, بديل الخشب, بديل الرخام, بديل الشيبورد, بديل الباركيه, قُضبان جدارية, نعلات فوم, ديكورات سوريا, اللاذقية, دمشق, ${baseKeywordsAr}`;
      } else {
        title = 'Architectural Wall Cladding Product Catalogue | Birlik Company Syria';
        description = 'Browse the comprehensive architectural materials catalogue from Birlik Company in Lattakia, Syria: PS fluted wood panels, PVC marble sheets, SPC wall boards, SPC click parquet, and baseboards.';
        keywords = `wall cladding catalogue Syria, interior materials Lattakia, PS wood panels, PVC marble, SPC flooring, ${baseKeywordsEn}`;
      }

    } else if (currentView === 'installation') {
      ogUrl = `${origin}/?page=installation`;

      if (currentLang === 'ar') {
        title = 'دليل ومقاطع فيديو التركيب لمواد التكسية | شركة بيرليك سوريا';
        description = 'شاهد مقاطع الفيديو التوضيحية وإرشادات التركيب الصحيحة لألواح بديل الخشب، بديل الرخام، بديل الشيبورد، وبديل الباركيه من شركة بيرليك في اللاذقية وسوريا.';
        keywords = `تركيب بديل الخشب, طريقة تركيب بديل الرخام, تركيب ألواح SPC, تركيب باركيه كليك, تركيب نعلات فوم, شركة بيرليك, ديكورات سوريا, اللاذقية`;
      } else {
        title = 'Installation Guide & Videos | Birlik Company Syria';
        description = 'Watch step-by-step installation guides and videos for PS wood panels, PVC marble, SPC wall boards, and SPC flooring from Birlik Company Syria.';
        keywords = `wall panel installation Syria, how to install PVC marble, SPC flooring installation, Birlik Company Lattakia`;
      }

    } else {
      // Home page
      ogUrl = `${origin}/`;
      if (currentLang === 'ar') {
        title = 'شركة بيرليك لمواد التكسية والديكور الداخلي | اللاذقية، سوريا';
        description = 'شركة بيرليك — خامات ومواد تكسية الجدران الفاخرة المقاومة للماء 100% في سوريا واللاذقية. ألواح بديل الخشب PS، بديل الرخام PVC، بديل الشيبورد SPC، بديل الباركيه، والنعلات مع شحن لكافة المحافظات السورية.';
        keywords = `${baseKeywordsAr}, ${baseKeywordsEn}`;
      } else {
        title = 'Birlik Company | Luxury Architectural Wall Cladding & Interior Decor — Syria';
        description = 'Birlik Company — Premium 100% waterproof architectural wall cladding materials in Lattakia, Syria. PS wood panels, PVC marble sheets, SPC stone boards, and baseboards with nationwide shipping.';
        keywords = `${baseKeywordsEn}, ${baseKeywordsAr}`;
      }
    }

    // 1. Update Document Title
    document.title = title;

    // 2. Helper to set or create meta tag
    const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);

    // OpenGraph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:url', ogUrl);
    setMetaTag('property', 'og:type', currentView === 'product' ? 'product' : 'website');

    // Twitter Tags
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // Canonical Link Tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', ogUrl);

    // 3. Dynamic JSON-LD Structured Data Injection
    const SCRIPT_ID = 'birlik-dynamic-seo-schema';
    let scriptTag = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (schemaData) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = SCRIPT_ID;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schemaData);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    // 4. Update browser URL history seamlessly without reloading
    const currentParams = new URLSearchParams(window.location.search);
    const hadAdmin = currentParams.has('admin');

    const newParams = new URLSearchParams();
    if (hadAdmin) newParams.set('admin', 'true');

    if (currentView === 'product' && activeProduct) {
      newParams.set('category', activeCategory);
      newParams.set('product', activeProduct.id);
    } else if (currentView === 'category') {
      newParams.set('category', activeCategory);
    } else if (currentView === 'catalogue') {
      newParams.set('page', 'catalogue');
    } else if (currentView === 'installation') {
      newParams.set('page', 'installation');
    }

    const newQuery = newParams.toString();
    const newRelativeUrl = newQuery ? `?${newQuery}` : window.location.pathname;
    
    // Only update history if query changed to avoid cluttering history stack
    if (window.location.search !== (newQuery ? `?${newQuery}` : '')) {
      window.history.replaceState(
        { view: currentView, category: activeCategory, product: activeProduct?.id },
        title,
        newRelativeUrl
      );
    }
  }, [currentView, currentLang, activeCategory, activeProduct]);

  return null;
};
