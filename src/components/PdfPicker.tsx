import React, { useState } from 'react';
import { Download, MessageSquare, RotateCcw } from 'lucide-react';
import { Language, ProductCategory } from '../types';
import { CATEGORY_CARDS } from '../data/categoryCards';
import { CATEGORIES_DATA, PRODUCT_MODELS, isModelInCategory } from '../data/products';
import { useMedia } from '../context/MediaContext';
import { SITE_ORIGIN } from '../routing';
import { cataloguePdfPath } from './CatalogueDownload';
import { optimizeImage } from '../utils/optimizeImage';

const TEXT = {
  ar: {
    eyebrow: 'الكتالوج الإلكتروني 2026',
    head: 'كل الفئات،',
    accent: 'في جيبك.',
    sub: 'كل موديلاتنا بالصور والمقاسات وخطوات التركيب في ملف واحد — جاهز للمشاركة مع العائلة أو المهندس أو المعلّم.',
    full: 'تحميل الكتالوج الكامل',
    one: (n: string) => `تحميل كتالوج ${n}`,
    hint: 'أو اضغط على أي غلاف لتحميل كتالوج تلك الفئة فقط.',
    reset: 'العودة للكتالوج الكامل',
    share: 'مشاركة على واتساب',
    shareMsg: (n: string) => `كتالوج ${n} — شركة بيرليك، اللاذقية:`,
    fullName: 'شركة بيرليك',
    models: (n: number) => `${n} موديل`,
    label: 'كتالوج',
  },
  en: {
    eyebrow: 'E-catalogue 2026',
    head: 'Every range,',
    accent: 'in your pocket.',
    sub: 'Every model with photos, sizes and installation steps in one file — ready to share with family, your engineer or installer.',
    full: 'Download the full catalogue',
    one: (n: string) => `Download the ${n} catalogue`,
    hint: 'Or tap any cover to download just that range.',
    reset: 'Back to the full catalogue',
    share: 'Share on WhatsApp',
    shareMsg: (n: string) => `${n} catalogue — Birlik Company, Lattakia:`,
    fullName: 'Birlik Company',
    models: (n: number) => `${n} models`,
    label: 'Catalogue',
  },
  tr: {
    eyebrow: 'E-katalog 2026',
    head: 'Tüm gruplar,',
    accent: 'cebinizde.',
    sub: 'Tüm modeller fotoğraf, ölçü ve montaj adımlarıyla tek dosyada — aileniz, mimarınız veya ustanızla paylaşmaya hazır.',
    full: 'Tüm kataloğu indir',
    one: (n: string) => `${n} kataloğunu indir`,
    hint: 'Ya da yalnızca o grubu indirmek için bir kapağa dokunun.',
    reset: 'Tüm kataloğa dön',
    share: "WhatsApp'ta paylaş",
    shareMsg: (n: string) => `${n} kataloğu — Birlik Şirketi, Lazkiye:`,
    fullName: 'Birlik Şirketi',
    models: (n: number) => `${n} model`,
    label: 'Katalog',
  },
};

/** A printed-catalogue cover: photo, range name down the side, brass label, logo. */
const Cover: React.FC<{ id: ProductCategory; currentLang: Language; label: string; count: string }> = ({ id, currentLang, label, count }) => {
  const { registry, getStoryPhotos } = useMedia();
  const info = CATEGORIES_DATA.find((c) => c.id === id) || CATEGORIES_DATA[0];
  // The range chapter's large photo: same file, sizes and quality, so it comes from the cache
  const main = getStoryPhotos(id).main || registry.categories[id] || info.image;
  const name = CATEGORY_CARDS.find((c) => c.id === id)!.name[currentLang];
  return (
    <span className="flex flex-col h-full rounded-xl bg-white p-2.5 sm:p-3 shadow-[0_25px_50px_-12px_rgba(0,0,0,.6)]">
      <span className="relative flex-1 flex gap-2 min-h-0">
        <span className="relative flex-1 rounded-md overflow-hidden bg-ink-soft">
          {/* Same files and sizes as the range chapters above, so phones reuse what is already loaded */}
          <img
            src={optimizeImage(main, 1080, 65)}
            srcSet={([640, 1080, 1600] as const).map((w) => `${optimizeImage(main, w, 65)} ${w}w`).join(', ')}
            sizes="(min-width: 1024px) 600px, (min-width: 640px) 520px, 90vw"
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <span className="absolute bottom-2 start-0 px-2.5 py-1 bg-brass text-ink text-[10px] sm:text-xs font-black">{name}</span>
        </span>
        <span className="hidden sm:block [writing-mode:vertical-rl] text-[11px] font-black text-ink/80 tracking-wide whitespace-nowrap">
          {label} · {name}
        </span>
      </span>
      <span className="mt-2 flex items-center justify-between gap-2">
        <img src="/logo-192.png" alt="" loading="lazy" className="h-6 sm:h-7 w-auto" />
        <span className="text-[9px] sm:text-[10px] font-bold text-ink/50" dir="ltr">
          {count} · birlik-insaat.com
        </span>
      </span>
    </span>
  );
};

/** Home page: one sentence, one button, and a fan of covers to pick a single range instead. */
export const PdfPicker: React.FC<{ currentLang: Language }> = ({ currentLang }) => {
  const t = TEXT[currentLang];
  const [pick, setPick] = useState<ProductCategory | null>(null);
  const rtl = currentLang === 'ar';
  const count = (id: ProductCategory) => PRODUCT_MODELS.filter((m) => isModelInCategory(m, id)).length;
  const name = pick ? CATEGORY_CARDS.find((c) => c.id === pick)!.name[currentLang] : t.fullName;
  const href = pick ? cataloguePdfPath(currentLang, pick) : cataloguePdfPath(currentLang);
  const share = `https://wa.me/?text=${encodeURIComponent(`${t.shareMsg(name)} ${SITE_ORIGIN}${href}`)}`;
  const n = CATEGORY_CARDS.length;

  return (
    <section id="catalogue-pdf" className="bg-[#120f0c] text-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 min-w-0" data-reveal>
          <p className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-brass-light">{t.eyebrow}</p>
          <h2 className="mt-4 text-4xl sm:text-6xl font-light leading-[1.15]">
            {t.head} <span className="accent-word">{t.accent}</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg leading-relaxed text-white/65">{t.sub}</p>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <a
              href={href}
              download
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-brass-deep via-brass to-brass-light text-ink font-extrabold shadow-[0_10px_40px_-10px_rgba(185,138,69,.7)] hover:brightness-110 transition"
            >
              {pick ? t.one(name) : t.full}
              <Download className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a href={share} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-sm font-bold text-white/70 hover:text-white">
              <MessageSquare className="w-4 h-4 text-[#7CE0A3]" />
              {t.share}
            </a>
          </div>
          <p className="mt-5 text-xs sm:text-sm text-white/45">
            {pick ? (
              <button type="button" onClick={() => setPick(null)} className="inline-flex items-center gap-1.5 font-bold text-brass-light hover:underline">
                <RotateCcw className="w-3.5 h-3.5" />
                {t.reset}
              </button>
            ) : (
              t.hint
            )}
          </p>
        </div>

        {/* The fan of covers */}
        <div className="lg:col-span-7 relative h-[300px] sm:h-[440px] lg:h-[480px] [--fan:17%] sm:[--fan:26%]" role="radiogroup" aria-label={t.eyebrow}>
          {CATEGORY_CARDS.map((c, i) => {
            const on = pick === c.id;
            const off = i - (n - 1) / 2; // −2.5 … 2.5
            const dir = rtl ? -1 : 1;
            const transform = on
              ? `translate(-50%, -54%) translateX(${off * 15 * dir}%) rotate(0deg) scale(1.08)`
              : `translate(-50%, -50%) translateX(calc(${off * dir} * var(--fan))) translateY(${Math.abs(off) * 4}%) rotate(${off * 7 * dir}deg)`;
            return (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={on}
                aria-label={c.name[currentLang]}
                onClick={() => setPick(on ? null : c.id)}
                className="absolute top-1/2 left-1/2 w-[42%] sm:w-[36%] lg:w-[34%] aspect-[3/4] transition-transform duration-500 ease-out hover:!z-40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brass rounded-xl"
                style={{ transform, zIndex: on ? 50 : 10 + i, opacity: pick && !on ? 0.75 : 1 }}
              >
                <Cover id={c.id} currentLang={currentLang} label={t.label} count={t.models(count(c.id))} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
