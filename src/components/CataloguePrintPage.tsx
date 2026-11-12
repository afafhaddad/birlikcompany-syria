import React from 'react';
import { Language } from '../types';
import { CATEGORIES_DATA, PRODUCT_MODELS, isModelInCategory } from '../data/products';
import { MAIN_CATEGORIES } from '../routing';
import { useMedia } from '../context/MediaContext';
import { liveOptimizedImage } from '../utils/optimizeImage';

/**
 * Print layout of the full catalogue (A4). Source for the downloadable PDF:
 * scripts/build-catalogue-pdf.ps1 prints /<lang>/catalogue/print/ with headless Edge.
 * Images always come from the live site's image optimizer (640px) to keep the PDF small.
 */
const TEXT = {
  ar: {
    title: 'كتالوج المنتجات',
    subtitle: 'مواد الإكساء والديكور الداخلي المقاومة للماء 100%',
    size: 'المقاس',
    thickness: 'السماكة',
    models: 'موديل',
    contactTitle: 'للاستفسار عن الأسعار والطلب',
    address: 'تقاطع شارع بغداد مع شارع بورسعيد (مقابل بوظة جَعارة) — اللاذقية — سورية',
    hours: 'الأحد إلى الخميس 10:00 – 5:00 | السبت 10:00 – 3:00 | الجمعة عطلة',
    delivery: 'توصيل لكافة المحافظات السورية',
    ask: 'أرسل رمز الموديل على واتساب لمعرفة السعر',
  },
  en: {
    title: 'Product Catalogue',
    subtitle: '100% waterproof wall & floor finishing materials',
    size: 'Size',
    thickness: 'Thickness',
    models: 'models',
    contactTitle: 'Prices & orders',
    address: 'Baghdad St & Port Said St intersection (opposite Jaara Ice Cream) — Lattakia — Syria',
    hours: 'Sun–Thu 10:00–17:00 | Sat 10:00–15:00 | Fri closed',
    delivery: 'Delivery to all Syrian governorates',
    ask: 'Send the model code on WhatsApp to get the price',
  },
  tr: {
    title: 'Ürün Kataloğu',
    subtitle: '%100 su geçirmez duvar ve zemin kaplama malzemeleri',
    size: 'Ölçü',
    thickness: 'Kalınlık',
    models: 'model',
    contactTitle: 'Fiyat ve sipariş',
    address: 'Bağdat Cad. ile Port Said Cad. kesişimi (Caara Dondurma karşısı) — Lazkiye — Suriye',
    hours: 'Paz–Per 10:00–17:00 | Cmt 10:00–15:00 | Cuma kapalı',
    delivery: 'Tüm Suriye illerine teslimat',
    ask: 'Fiyat için model kodunu WhatsApp ile gönderin',
  },
};

const PRINT_CSS = `
@page { size: A4; margin: 12mm; }
html, body { background: #fff !important; }
.print-root { color: #1C1917; font-family: 'Cairo', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.print-cover { height: 270mm; display: flex; flex-direction: column; justify-content: space-between; break-after: page; }
.print-cat { break-before: page; }
.print-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; }
.print-card { break-inside: avoid; border: 1px solid #DDD5C7; }
.print-card img { width: 100%; height: 58mm; object-fit: cover; display: block; background: #1C1917; }
`;

export const CataloguePrintPage: React.FC<{ currentLang: Language }> = ({ currentLang }) => {
  const { registry } = useMedia();
  const t = TEXT[currentLang];
  const dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  const img = (u?: string) => (u ? liveOptimizedImage(u, 640) : '');

  return (
    <div className="print-root bg-white" dir={dir}>
      <style>{PRINT_CSS}</style>

      {/* Cover */}
      <section className="print-cover p-6">
        <div className="text-center pt-10">
          <img src="/logo-512.png" alt="Birlik Company" className="w-44 h-44 mx-auto object-contain" />
          <h1 className="text-4xl font-black mt-6">{t.title}</h1>
          <p className="text-lg text-[#5C554E] mt-2">{t.subtitle}</p>
        </div>
        <img src={img(registry.hero)} alt="" className="w-full h-[95mm] object-cover" />
        <div className="border-t-4 border-[#D4991A] pt-4 text-sm leading-7">
          <p className="font-bold text-base">{t.contactTitle}</p>
          <p dir="ltr" className="font-bold text-lg text-[#1E7E45]" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>
            WhatsApp / Tel: +963 995 764 573
          </p>
          <p>{t.address}</p>
          <p>{t.hours}</p>
          <p>{t.delivery} • www.birlik-insaat.com</p>
        </div>
      </section>

      {MAIN_CATEGORIES.map((catId) => {
        const cat = CATEGORIES_DATA.find((c) => c.id === catId);
        if (!cat) return null;
        const models = PRODUCT_MODELS.filter((m) => isModelInCategory(m, catId));
        return (
          <section key={catId} className="print-cat p-2">
            <div className="flex items-end justify-between border-b-2 border-[#1C1917] pb-2 mb-4">
              <h2 className="text-2xl font-black">{cat.name[currentLang]}</h2>
              <span className="text-sm text-[#78716A]">
                {models.length} {t.models}
              </span>
            </div>
            <p className="text-sm text-[#5C554E] mb-4">{cat.subtitle[currentLang]}</p>
            <div className="print-grid">
              {models.map((m) => {
                const rp = registry.products[m.id];
                const src = img(rp?.main || rp?.gallery?.[0] || registry.categories[catId]);
                return (
                  <div key={m.id} className="print-card">
                    {src && <img src={src} alt={m.name[currentLang]} />}
                    <div className="p-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-base">{m.name[currentLang]}</span>
                        <span dir="ltr" className="font-mono text-xs font-bold bg-[#1C1917] text-white px-2 py-0.5">
                          {m.code}
                        </span>
                      </div>
                      <div className="text-xs text-[#5C554E] mt-1.5 flex gap-4">
                        <span>
                          {t.size}: <span dir="ltr">{m.dimensions}</span>
                        </span>
                        <span>
                          {t.thickness}: <span dir="ltr">{m.thickness}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-[#1E7E45] font-bold mt-4">
              {t.ask}: +963 995 764 573
            </p>
          </section>
        );
      })}
    </div>
  );
};
