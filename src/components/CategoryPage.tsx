import React from 'react';
import { Droplets, Layers, PlayCircle, MessageSquare, Ruler } from 'lucide-react';
import { Language, ProductCategory } from '../types';
import { CATEGORIES_DATA, PRODUCT_MODELS, isModelInCategory } from '../data/products';
import { CATEGORY_CARDS, categoryCard } from '../data/categoryCards';
import { useMedia } from '../context/MediaContext';
import { Link } from '../router';
import { catalogueRoute, categoryRoute, installationRoute } from '../routing';
import { Breadcrumbs } from './Breadcrumbs';
import { ProductCard } from './cards';
import { UI, whatsappLink } from '../site';

const TEXT = {
  ar: {
    available: 'موديل متوفر',
    installVideo: 'شاهد طريقة التركيب',
    specs: 'مواصفات هذه الفئة',
    sizes: 'المقاسات',
    thickness: 'السماكات',
    waterproof: 'مقاومة الماء',
    composition: 'الخامة',
    applications: 'الاستخدامات',
    helpTitle: 'محتار أي موديل تختار؟',
    helpBody: 'أرسل لنا صورة المكان أو القياسات على واتساب ونقترح عليك الموديل والكمية المناسبة.',
    helpBtn: 'استشارة مجانية عبر واتساب',
    waMsg: (c: string) => `مرحباً شركة بيرليك، أحتاج مساعدة في اختيار موديل من ${c}.`,
    chooseModel: 'اختر الموديل',
  },
  en: {
    available: 'models available',
    installVideo: 'Watch how to install',
    specs: 'Range specifications',
    sizes: 'Sizes',
    thickness: 'Thicknesses',
    waterproof: 'Water resistance',
    composition: 'Material',
    applications: 'Applications',
    helpTitle: 'Not sure which model to choose?',
    helpBody: 'Send us a photo of the space or your measurements on WhatsApp and we will suggest the right model and quantity.',
    helpBtn: 'Free advice on WhatsApp',
    waMsg: (c: string) => `Hello Birlik Company, I need help choosing a model from ${c}.`,
    chooseModel: 'Choose a model',
  },
  tr: {
    available: 'model mevcut',
    installVideo: 'Montajı izleyin',
    specs: 'Ürün grubu özellikleri',
    sizes: 'Ölçüler',
    thickness: 'Kalınlıklar',
    waterproof: 'Su dayanımı',
    composition: 'Malzeme',
    applications: 'Kullanım alanları',
    helpTitle: 'Hangi modeli seçeceğinizden emin değil misiniz?',
    helpBody: 'Mekânın fotoğrafını veya ölçülerinizi WhatsApp ile gönderin; uygun modeli ve miktarı önerelim.',
    helpBtn: "WhatsApp'tan ücretsiz danışın",
    waMsg: (c: string) => `Merhaba Birlik Şirketi, ${c} grubundan model seçmek için yardım istiyorum.`,
    chooseModel: 'Model seçin',
  },
};

export const CategoryPage: React.FC<{ categoryId: ProductCategory; currentLang: Language }> = ({ categoryId, currentLang }) => {
  const { getCategoryImageUrl } = useMedia();
  const t = TEXT[currentLang];
  const info = CATEGORIES_DATA.find((c) => c.id === categoryId) || CATEGORIES_DATA[0];
  const card = categoryCard(categoryId);
  const models = PRODUCT_MODELS.filter((m) => isModelInCategory(m, categoryId));
  const name = card.name[currentLang];

  const specs = [
    { icon: Ruler, label: t.sizes, value: info.specs.dimensions, ltr: true },
    { icon: Layers, label: t.thickness, value: info.specs.thickness, ltr: true },
    { icon: Droplets, label: t.waterproof, value: info.specs.waterproof[currentLang] },
    { label: t.composition, value: info.specs.composition[currentLang] },
    { label: t.applications, value: info.specs.applications[currentLang] },
  ];

  return (
    <div className="pt-16 md:pt-[4.5rem]">
      {/* Banner */}
      <section className="relative bg-ink text-white overflow-hidden">
        <img
          src={getCategoryImageUrl(categoryId, info.image)}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-55"
        />
        <div className="absolute inset-0 scrim-bottom" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-6 pb-8 md:pt-8 md:pb-14">
          <Breadcrumbs
            dark
            currentLang={currentLang}
            items={[{ label: UI.catalogueLong[currentLang], to: catalogueRoute(currentLang) }, { label: name }]}
          />
          <div className="mt-16 md:mt-28 max-w-3xl animate-fade-up">
            <p className="text-sm font-bold text-brass-light" dir="auto">
              {card.tag[currentLang]}
            </p>
            <h1 className="mt-1 text-4xl sm:text-5xl font-black leading-tight">{name}</h1>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/85">{card.description[currentLang]}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-bold">
              <span className="px-3.5 py-2 rounded-full bg-white/12 backdrop-blur-sm border border-white/20">
                {models.length} {t.available}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-wa/90">
                <Droplets className="w-4 h-4" />
                {UI.waterproof[currentLang]}
              </span>
              <Link
                to={installationRoute(currentLang)}
                scrollTo={`install-${card.id}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-brass text-ink hover:bg-brass-light transition-colors"
              >
                <PlayCircle className="w-4 h-4" />
                {t.installVideo}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category switcher */}
      <nav className="sticky top-16 md:top-[4.5rem] z-30 bg-ivory/95 backdrop-blur-md border-b border-line" aria-label={UI.collections[currentLang]}>
        <div className="snap-rail gap-2 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-3 scroll-px-5">
          {CATEGORY_CARDS.map((c) => {
            const active = c.id === card.id;
            return (
              <Link
                key={c.id}
                to={categoryRoute(currentLang, c.id)}
                aria-current={active ? 'page' : undefined}
                style={{ scrollSnapAlign: 'start' }}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap border transition-colors ${
                  active ? 'bg-ink text-white border-ink' : 'bg-white text-ink/75 border-line hover:border-brass'
                }`}
              >
                {c.name[currentLang]}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Models */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h2 className="text-xl sm:text-2xl font-black mb-5 px-1">
          {t.chooseModel} <span className="text-muted font-bold text-base">({models.length})</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {models.map((m, i) => (
            <div key={m.id} data-reveal style={{ '--reveal-delay': `${(i % 4) * 60}ms` } as React.CSSProperties}>
              <ProductCard model={m} currentLang={currentLang} className="h-full" />
            </div>
          ))}
        </div>
      </section>

      {/* Specs + help */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 grid lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 rounded-3xl bg-white border border-line p-5 sm:p-7" data-reveal>
          <h2 className="text-xl font-black mb-4">{t.specs}</h2>
          <dl className="divide-y divide-line">
            {specs.map((s) => (
              <div key={s.label} className="py-3 grid grid-cols-3 gap-3 text-sm">
                <dt className="text-muted font-semibold">{s.label}</dt>
                <dd className="col-span-2 font-semibold text-ink leading-relaxed" dir={s.ltr ? 'ltr' : undefined} data-keep-start={s.ltr ? '' : undefined}>
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm leading-relaxed text-muted">{info.description[currentLang]}</p>
        </div>

        <div className="lg:col-span-2 rounded-3xl bg-ink text-white p-6 sm:p-7 flex flex-col justify-between gap-6" data-reveal>
          <div>
            <h2 className="text-2xl font-black leading-snug">{t.helpTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">{t.helpBody}</p>
          </div>
          <a
            href={whatsappLink(t.waMsg(name))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-wa hover:bg-wa-deep font-extrabold transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            {t.helpBtn}
          </a>
        </div>
      </section>
    </div>
  );
};
