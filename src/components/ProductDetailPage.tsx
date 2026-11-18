import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Droplets, Layers, MessageSquare, Phone, Ruler, Store, X, Maximize2 } from 'lucide-react';
import { Language, ProductModel } from '../types';
import { CATEGORIES_DATA, PRODUCT_MODELS, isModelInCategory } from '../data/products';
import { categoryCard } from '../data/categoryCards';
import { useMedia } from '../context/MediaContext';
import { Link } from '../router';
import { canonicalCategory, catalogueRoute, categoryRoute, productPath, productRoute, SITE_ORIGIN } from '../routing';
import { Breadcrumbs } from './Breadcrumbs';
import { ProductCard } from './cards';
import { AreaCalculator } from './AreaCalculator';
import { pairings, richDescription } from '../data/productCopy';
import { articleByCategory, articleSummary, topicsForCategory } from '../data/articles';
import { articleRoute } from '../routing';
import { PHONE_DISPLAY, TEL_HREF, UI, whatsappLink } from '../site';

const TEXT = {
  ar: {
    inStock: 'متوفر للطلب',
    callSales: 'اتصل بالمبيعات',
    specs: 'المواصفات',
    waterproofValue: 'مقاوم للماء والرطوبة 100%',
    waterproofLabel: 'مقاومة الماء',
    composition: 'الخامة',
    applications: 'الاستخدامات',
    sample: 'يمكنك معاينة هذا الموديل ولمس العينة في معرضنا باللاذقية قبل الطلب.',
    more: 'موديلات أخرى من نفس الفئة',
    prev: 'السابق',
    next: 'التالي',
    photo: 'صورة',
    zoom: 'تكبير الصورة',
  },
  en: {
    inStock: 'Available to order',
    callSales: 'Call sales',
    specs: 'Specifications',
    waterproofValue: '100% water & moisture proof',
    waterproofLabel: 'Water resistance',
    composition: 'Material',
    applications: 'Applications',
    sample: 'You can see and touch a sample of this model in our Lattakia showroom before ordering.',
    more: 'More models in this range',
    prev: 'Previous',
    next: 'Next',
    photo: 'Photo',
    zoom: 'Enlarge photo',
  },
  tr: {
    inStock: 'Siparişe uygun',
    callSales: 'Satışı arayın',
    specs: 'Özellikler',
    waterproofValue: '%100 su ve neme dayanıklı',
    waterproofLabel: 'Su dayanımı',
    composition: 'Malzeme',
    applications: 'Kullanım alanları',
    sample: 'Sipariş öncesi bu modelin numunesini Lazkiye showroomumuzda inceleyebilirsiniz.',
    more: 'Bu gruptan diğer modeller',
    prev: 'Önceki',
    next: 'Sonraki',
    photo: 'Fotoğraf',
    zoom: 'Fotoğrafı büyüt',
  },
};

export const productPriceMessage = (model: ProductModel, lang: Language): string => {
  const cat = categoryCard(canonicalCategory(model.category)).name[lang];
  const url = `${SITE_ORIGIN}${productPath(lang, model)}`;
  return {
    ar: `مرحباً شركة بيرليك، أريد معرفة سعر الموديل ${model.code} (${model.name.ar}) من ${cat}، والتوصيل إلى مدينتي.\n${url}`,
    en: `Hello Birlik Company, I'd like the price of model ${model.code} (${model.name.en}) from ${cat}, and delivery to my city.\n${url}`,
    tr: `Merhaba Birlik Şirketi, ${cat} grubundaki ${model.code} (${model.name.tr}) modelinin fiyatını ve teslimatını öğrenmek istiyorum.\n${url}`,
  }[lang];
};

export const ProductDetailPage: React.FC<{ model: ProductModel; currentLang: Language }> = ({ model, currentLang }) => {
  const { getProductGalleryUrls, getCategoryImageUrl } = useMedia();
  const t = TEXT[currentLang];
  const isRtl = currentLang === 'ar';
  const Prev = isRtl ? ChevronRight : ChevronLeft;
  const Next = isRtl ? ChevronLeft : ChevronRight;

  const catId = canonicalCategory(model.category);
  const info = CATEGORIES_DATA.find((c) => c.id === catId) || CATEGORIES_DATA[0];
  const card = categoryCard(catId);
  const siblings = PRODUCT_MODELS.filter((m) => isModelInCategory(m, catId));
  const idx = siblings.findIndex((m) => m.id === model.id);
  const prevModel = siblings[(idx - 1 + siblings.length) % siblings.length];
  const nextModel = siblings[(idx + 1) % siblings.length];
  const others = siblings.filter((m) => m.id !== model.id).slice(0, 8);

  const images = getProductGalleryUrls(model.id, model.images.length ? model.images : [getCategoryImageUrl(catId, info.image)]);
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  // Reset gallery when switching model
  useEffect(() => {
    setActive(0);
    railRef.current?.scrollTo({ left: 0 });
  }, [model.id]);

  const onRailScroll = () => {
    const el = railRef.current;
    if (!el) return;
    const i = Math.round(Math.abs(el.scrollLeft) / el.clientWidth);
    if (i !== active) setActive(Math.min(images.length - 1, Math.max(0, i)));
  };
  const goTo = (i: number) => {
    const el = railRef.current;
    if (!el) return;
    // Scroll the rail itself (never the page). In RTL the scroll offset runs negative.
    const sign = getComputedStyle(el).direction === 'rtl' ? -1 : 1;
    const left = sign * i * el.clientWidth;
    setActive(i);
    el.scrollTo({ left, behavior: 'smooth' });
    // Some browsers drop smooth scrolling on snap containers: make sure we arrive.
    window.setTimeout(() => {
      if (Math.abs(el.scrollLeft - left) > 4) el.scrollTo({ left, behavior: 'instant' as ScrollBehavior });
    }, 450);
  };

  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!lightbox) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const step = (d: number) => setActive((i) => (i + d + images.length) % images.length);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false);
      else if (e.key === 'Tab') {
        // The close button is the only control: keep focus on it
        e.preventDefault();
        closeRef.current?.focus();
      } else if (e.key === 'ArrowLeft') step(isRtl ? 1 : -1);
      else if (e.key === 'ArrowRight') step(isRtl ? -1 : 1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      opener?.focus?.();
    };
  }, [lightbox, images.length, isRtl]);

  const waHref = whatsappLink(productPriceMessage(model, currentLang));

  const specRows: Array<{ label: string; value: string; ltr?: boolean }> = [
    { label: UI.code[currentLang], value: model.code, ltr: true },
    { label: UI.size[currentLang], value: model.dimensions, ltr: true },
    { label: UI.thickness[currentLang], value: model.thickness, ltr: true },
    { label: t.waterproofLabel, value: t.waterproofValue },
    ...model.specs
      .filter((s) => !['dimensions_standard', 'thickness'].includes(s.key))
      .map((s) => ({ label: s.label[currentLang], value: s.value[currentLang] })),
    { label: t.composition, value: info.specs.composition[currentLang] },
    { label: t.applications, value: info.specs.applications[currentLang] },
  ];

  return (
    <div className="pt-16 md:pt-[4.5rem]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-3">
        <Breadcrumbs
          currentLang={currentLang}
          items={[
            { label: UI.catalogue[currentLang], to: catalogueRoute(currentLang) },
            { label: card.name[currentLang], to: categoryRoute(currentLang, catId) },
            { label: model.name[currentLang] },
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto md:px-6 lg:px-8 grid md:grid-cols-2 gap-6 lg:gap-12 pb-12">
        {/* Gallery */}
        <div className="md:sticky md:top-24 md:self-start">
          <div className="relative">
            <div
              ref={railRef}
              onScroll={onRailScroll}
              className="snap-rail overflow-y-hidden md:rounded-3xl bg-ink-soft"
              aria-roledescription="carousel"
            >
              {images.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setLightbox(true)}
                  aria-label={t.zoom}
                  className="relative w-full aspect-[4/5] sm:aspect-[4/3] md:aspect-auto md:h-[min(calc(100vh-17rem),44rem)] md:min-h-[20rem] cursor-zoom-in"
                >
                  <img
                    src={src}
                    alt={`${model.code} ${model.name[currentLang]} — ${card.name[currentLang]} (${t.photo} ${i + 1})`}
                    fetchPriority={i === 0 ? 'high' : undefined}
                    loading={i === 0 ? undefined : 'lazy'}
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <span className="absolute top-3 start-3 px-3 py-1.5 rounded-full bg-ink/80 backdrop-blur-sm text-white text-xs font-extrabold">
              <bdi dir="ltr">{model.code}</bdi>
            </span>
            <span className="absolute top-3 end-3 w-9 h-9 rounded-full bg-ink/60 backdrop-blur-sm text-white flex items-center justify-center pointer-events-none">
              <Maximize2 className="w-4 h-4" />
            </span>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => goTo((active - 1 + images.length) % images.length)}
                  aria-label={t.prev}
                  className="hidden md:flex absolute top-1/2 -translate-y-1/2 start-3 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-ink shadow-lg items-center justify-center transition-colors"
                >
                  <Prev className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo((active + 1) % images.length)}
                  aria-label={t.next}
                  className="hidden md:flex absolute top-1/2 -translate-y-1/2 end-3 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-ink shadow-lg items-center justify-center transition-colors"
                >
                  <Next className="w-5 h-5" />
                </button>
              </>
            )}

            {images.length > 1 && (
              <div className="absolute bottom-0 inset-x-0 flex items-center justify-center">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`${t.photo} ${i + 1}`}
                    className="px-1.5 py-4"
                  >
                    <span className={`block h-1.5 rounded-full transition-all ${i === active ? 'w-7 bg-white' : 'w-1.5 bg-white/55'}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="hidden md:flex gap-3 mt-3">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${i === active ? 'border-brass' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="px-4 sm:px-6 md:px-0">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <Link to={categoryRoute(currentLang, catId)} className="px-3 py-1.5 rounded-full bg-sand text-ink hover:bg-line transition-colors">
              {card.name[currentLang]}
            </Link>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-wa/10 text-wa">
              <span className="w-1.5 h-1.5 rounded-full bg-wa" />
              {t.inStock}
            </span>
          </div>

          <h1 className="mt-3 text-4xl sm:text-5xl font-black leading-tight">{model.name[currentLang]}</h1>
          <p className="mt-2 text-base leading-relaxed text-muted">{model.subtitle[currentLang]}</p>

          <ul className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { icon: Ruler, label: UI.size[currentLang], value: model.dimensions },
              { icon: Layers, label: UI.thickness[currentLang], value: model.thickness },
              { icon: Droplets, label: t.waterproofLabel, value: '100%' },
            ].map(({ icon: Icon, label, value }) => (
              <li key={label} className="rounded-2xl bg-white border border-line p-3 sm:p-4">
                <Icon className="w-5 h-5 text-brass-deep mb-2" />
                <p className="text-[11px] text-muted font-semibold">{label}</p>
                <p className="text-[13px] sm:text-sm font-extrabold text-ink mt-0.5 leading-snug" dir="ltr" data-keep-start="">
                  {value}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-5 space-y-2.5">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              id="whatsapp-product-inquiry-btn"
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-wa hover:bg-wa-deep text-white font-extrabold text-base transition-colors shadow-sm"
            >
              <MessageSquare className="w-5 h-5" />
              {UI.askPriceWhatsApp[currentLang]}
            </a>
            <a
              href={TEL_HREF}
              id="call-product-inquiry-btn"
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white border border-line hover:border-brass text-ink font-bold text-sm transition-colors"
            >
              <Phone className="w-4 h-4 text-brass-deep" />
              {t.callSales}: <span dir="ltr">{PHONE_DISPLAY}</span>
            </a>
          </div>

          <section className="mt-6" aria-labelledby="about-model">
            <h2 id="about-model" className="text-lg font-black mb-2">
              {currentLang === 'ar' ? `عن موديل ${model.name.ar}` : currentLang === 'tr' ? `${model.name.tr} hakkında` : `About ${model.name.en}`}
            </h2>
            <div className="space-y-3 text-[15px] leading-loose text-ink/85">
              {richDescription(model, currentLang).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            {articleByCategory(catId) && (
              <Link
                to={articleRoute(currentLang, articleByCategory(catId)!.slug)}
                className="mt-3 inline-block text-sm font-extrabold text-brass-deep hover:text-ink underline underline-offset-4"
              >
                {UI.readGuide[currentLang]}: {card.name[currentLang]}
              </Link>
            )}
            {topicsForCategory(catId).slice(0, 2).map((a) => (
              <Link
                key={a.slug}
                to={articleRoute(currentLang, a.slug)}
                className="mt-2 block text-sm font-bold text-brass-deep hover:text-ink underline underline-offset-4"
              >
                {articleSummary(a, currentLang).title}
              </Link>
            ))}
          </section>

          {/* Pairs well with: closest colours from the other ranges (unique per model, and internal links) */}
          {pairings(model).length > 0 && (
            <section className="mt-6" aria-labelledby="pairs-with">
              <h2 id="pairs-with" className="text-lg font-black mb-3">
                {currentLang === 'ar' ? `يتناسق مع ${model.name.ar}` : currentLang === 'tr' ? `${model.name.tr} ile uyumlu` : `Pairs well with ${model.name.en}`}
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {pairings(model).map((m) => (
                  <li key={m.id}>
                    <Link
                      to={productRoute(currentLang, m)}
                      className="flex items-center gap-3 rounded-2xl bg-white border border-line hover:border-brass p-3 transition-colors"
                    >
                      <span className="w-8 h-8 rounded-full ring-1 ring-black/10 shrink-0" style={{ background: m.colorHex }} aria-hidden />
                      <span className="min-w-0">
                        <span className="block text-sm font-extrabold text-ink truncate">{m.name[currentLang]}</span>
                        <span className="block text-xs text-muted truncate">{categoryCard(canonicalCategory(m.category)).name[currentLang]}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <AreaCalculator model={model} currentLang={currentLang} />

          <section className="mt-6 rounded-3xl bg-white border border-line p-5 sm:p-6">
            <h2 className="text-lg font-black mb-2">{t.specs}</h2>
            <dl className="divide-y divide-line">
              {specRows.map((s) => (
                <div key={s.label} className="py-2.5 grid grid-cols-5 gap-3 text-sm">
                  <dt className="col-span-2 text-muted font-semibold">{s.label}</dt>
                  <dd className="col-span-3 font-semibold text-ink leading-relaxed" dir={s.ltr ? 'ltr' : undefined} data-keep-start={s.ltr ? '' : undefined}>
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <p className="mt-4 flex items-start gap-3 rounded-2xl bg-sand p-4 text-sm leading-relaxed text-ink/85">
            <Store className="w-5 h-5 text-brass-deep shrink-0 mt-0.5" />
            {t.sample}
          </p>

          {siblings.length > 1 && (
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm font-bold">
              <Link to={productRoute(currentLang, prevModel)} className="flex items-center gap-2 p-3 rounded-2xl border border-line bg-white hover:border-brass transition-colors min-w-0">
                <Prev className="w-4 h-4 shrink-0 text-brass-deep" />
                <span className="min-w-0">
                  <span className="block text-[11px] text-muted">{t.prev}</span>
                  <span className="block truncate">{prevModel.name[currentLang]}</span>
                </span>
              </Link>
              <Link to={productRoute(currentLang, nextModel)} className="flex items-center justify-end gap-2 p-3 rounded-2xl border border-line bg-white hover:border-brass transition-colors text-end min-w-0">
                <span className="min-w-0">
                  <span className="block text-[11px] text-muted">{t.next}</span>
                  <span className="block truncate">{nextModel.name[currentLang]}</span>
                </span>
                <Next className="w-4 h-4 shrink-0 text-brass-deep" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* More models */}
      {others.length > 0 && (
        <section className="bg-sand/60 border-t border-line py-10">
          <h2 className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-xl sm:text-2xl font-black mb-5">{t.more}</h2>
          <div className="snap-rail gap-3 sm:gap-5 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-px-5">
            {others.map((m) => (
              <div key={m.id} className="w-[44%] sm:w-[30%] lg:w-[22%]" style={{ scrollSnapAlign: 'start' }}>
                <ProductCard model={m} currentLang={currentLang} className="h-full" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center animate-fade-in" role="dialog" aria-modal="true" onClick={() => setLightbox(false)}>
          <img src={images[active]} alt={model.name[currentLang]} className="max-w-full max-h-full object-contain" />
          <button
            ref={closeRef}
            type="button"
            aria-label={UI.close[currentLang]}
            className="absolute top-4 end-4 w-12 h-12 rounded-full bg-white/15 text-white flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};
