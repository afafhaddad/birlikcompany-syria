import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  Factory,
  Home,
  Layers,
  MessageSquare,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  X as XIcon,
} from 'lucide-react';
import { Language } from '../types';
import { ARTICLES, ArticleMeta, articleContent, readingMinutes } from '../data/articles';
import { CATEGORIES_DATA, PRODUCT_MODELS, isModelInCategory } from '../data/products';
import { categoryCard } from '../data/categoryCards';
import { INSTALLATION_GUIDES } from '../data/installationGuides';
import { useMedia } from '../context/MediaContext';
import { optimizeImage } from '../utils/optimizeImage';
import { Link } from '../router';
import { articleRoute, blogRoute, categoryRoute, installationRoute } from '../routing';
import { Breadcrumbs } from './Breadcrumbs';
import { BackgroundVideo } from './BackgroundVideo';
import { ProductCard } from './cards';
import { UI, whatsappLink } from '../site';

const TEXT = {
  ar: {
    minutes: 'دقائق قراءة',
    updated: 'آخر تحديث',
    inThis: 'في هذا الدليل',
    compare: 'مقارنة سريعة',
    aspect: 'وجه المقارنة',
    specs: 'المواصفات الفنية',
    sizes: 'المقاسات',
    thickness: 'السماكة',
    waterproof: 'مقاومة الماء',
    composition: 'الخامة',
    applications: 'الاستخدامات',
    install: 'طريقة التركيب',
    installIntro: 'خطوات التركيب الأساسية كما ينفذها فنيّونا:',
    method: 'طريقة التثبيت',
    tip: 'نصيحة المهندس',
    watch: 'شاهد فيديو التركيب والأدوات المطلوبة',
    models: (c: string) => `موديلات ${c} المتوفرة`,
    viewAll: (n: number, c: string) => `عرض كل موديلات ${c} (${n})`,
    ctaTitle: 'تريد السعر أو استشارة لمشروعك؟',
    ctaBody: 'أرسل لنا القياسات أو صورة المكان على واتساب، ونقترح عليك الموديل والكمية المناسبة مع السعر.',
    ctaBtn: 'تواصل معنا على واتساب',
    waMsg: (c: string) => `مرحباً شركة بيرليك، قرأت دليل ${c} وأريد معرفة الأسعار والموديلات المتوفرة.`,
    more: 'أدلة أخرى قد تهمك',
  },
  en: {
    minutes: 'min read',
    updated: 'Updated',
    inThis: 'In this guide',
    compare: 'Quick comparison',
    aspect: 'Aspect',
    specs: 'Technical specifications',
    sizes: 'Sizes',
    thickness: 'Thickness',
    waterproof: 'Water resistance',
    composition: 'Material',
    applications: 'Applications',
    install: 'Installation',
    installIntro: 'The essential installation steps, as our fitters carry them out:',
    method: 'Fixing method',
    tip: 'Pro tip',
    watch: 'Watch the installation video and tool list',
    models: (c: string) => `Available ${c} models`,
    viewAll: (n: number, c: string) => `View all ${c} models (${n})`,
    ctaTitle: 'Want a price or advice for your project?',
    ctaBody: 'Send your measurements or a photo of the space on WhatsApp and we will suggest the right model and quantity with a price.',
    ctaBtn: 'Message us on WhatsApp',
    waMsg: (c: string) => `Hello Birlik Company, I read your ${c} guide and would like prices and available models.`,
    more: 'More guides',
  },
  tr: {
    minutes: 'dk okuma',
    updated: 'Güncelleme',
    inThis: 'Bu rehberde',
    compare: 'Hızlı karşılaştırma',
    aspect: 'Özellik',
    specs: 'Teknik özellikler',
    sizes: 'Ölçüler',
    thickness: 'Kalınlık',
    waterproof: 'Su dayanımı',
    composition: 'Malzeme',
    applications: 'Kullanım alanları',
    install: 'Montaj',
    installIntro: 'Ustalarımızın uyguladığı temel montaj adımları:',
    method: 'Sabitleme yöntemi',
    tip: 'Usta tavsiyesi',
    watch: 'Montaj videosunu ve alet listesini görün',
    models: (c: string) => `Mevcut ${c} modelleri`,
    viewAll: (n: number, c: string) => `Tüm ${c} modellerini gör (${n})`,
    ctaTitle: 'Projeniz için fiyat veya öneri mi istiyorsunuz?',
    ctaBody: 'Ölçülerinizi veya mekânın fotoğrafını WhatsApp ile gönderin; uygun modeli, miktarı ve fiyatı bildirelim.',
    ctaBtn: "WhatsApp'tan yazın",
    waMsg: (c: string) => `Merhaba Birlik Şirketi, ${c} rehberinizi okudum; fiyat ve mevcut modelleri öğrenmek istiyorum.`,
    more: 'Diğer rehberler',
  },
};

const SECTION_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  what: Layers,
  made: Factory,
  benefits: Sparkles,
  strength: ShieldCheck,
  where: Home,
};

const formatDate = (iso: string, lang: Language) => {
  const [y, m, d] = iso.split('-');
  return lang === 'en' ? `${y}-${m}-${d}` : `${d}/${m}/${y}`;
};

export const ArticlePage: React.FC<{ meta: ArticleMeta; currentLang: Language }> = ({ meta, currentLang }) => {
  const { registry, getCategoryImageUrl } = useMedia();
  const t = TEXT[currentLang];
  const c = articleContent(meta, currentLang);
  const Arrow = currentLang === 'ar' ? ArrowLeft : ArrowRight;
  const catId = meta.categoryId;
  const info = CATEGORIES_DATA.find((x) => x.id === catId) || CATEGORIES_DATA[0];
  const card = categoryCard(catId);
  const name = card.name[currentLang];
  const guide = INSTALLATION_GUIDES.find((g) => g.categoryId === catId);
  const models = PRODUCT_MODELS.filter((m) => isModelInCategory(m, catId));

  // Real product photos of this range, used to illustrate the sections
  const photos: Array<{ src: string; alt: string }> = [];
  models.forEach((m) => {
    const rp = registry.products[m.id];
    [rp?.main, ...(rp?.gallery || [])].forEach((u) => {
      if (u && !photos.some((p) => p.src === optimizeImage(u, 1080))) {
        photos.push({ src: optimizeImage(u, 1080), alt: `${name} — ${m.name[currentLang]} (${m.code})` });
      }
    });
  });
  const photo = (i: number) => (photos.length ? photos[i % photos.length] : null);

  const toc = [
    ...c.sections.map((s) => ({ id: s.id, label: s.heading })),
    { id: 'compare', label: t.compare },
    { id: 'specs', label: t.specs },
    ...(guide ? [{ id: 'install', label: t.install }] : []),
    { id: 'models', label: t.models(name) },
  ];
  const jump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  let photoIdx = 0;

  return (
    <article className="pt-16 md:pt-[4.5rem]">
      {/* Hero */}
      <header className="relative bg-ink text-white overflow-hidden">
        <img
          src={getCategoryImageUrl(catId, info.image)}
          alt={name}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <BackgroundVideo mobileSrc={`/media/cat-${catId}-mobile.mp4`} desktopSrc={`/media/cat-${catId}-desktop.mp4`} delayMs={900} />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="absolute inset-0 scrim-bottom" />
        <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 pt-6 pb-10 md:pb-16">
          <Breadcrumbs dark currentLang={currentLang} items={[{ label: UI.blog[currentLang], to: blogRoute(currentLang) }, { label: name }]} />
          <div className="mt-20 md:mt-36 animate-fade-up">
            <p className="flex items-center gap-2 text-sm font-bold text-brass-light">
              <span className="w-6 h-0.5 bg-current" />
              {UI.blog[currentLang]}
            </p>
            <h1 className="mt-2 text-[1.7rem] leading-[1.35] sm:text-4xl sm:leading-[1.3] lg:text-[2.75rem] lg:leading-[1.25] font-black text-balance">{c.title}</h1>
            <p className="mt-4 text-sm sm:text-lg leading-relaxed text-white/85">{c.lead}</p>
            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-white/65">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {readingMinutes(c)} {t.minutes}
              </span>
              <span>
                {t.updated}: <time dateTime={meta.updated}>{formatDate(meta.updated, currentLang)}</time>
              </span>
              <span>{currentLang === 'ar' ? 'شركة بيرليك' : 'Birlik Company'}</span>
            </p>
          </div>
        </div>
      </header>

      {/* Contents */}
      <nav className="sticky top-16 md:top-[4.5rem] z-30 bg-ivory/95 backdrop-blur-md border-b border-line" aria-label={t.inThis}>
        <div className="snap-rail gap-2 max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 py-3 scroll-px-5">
          {toc.map((x) => (
            <a
              key={x.id}
              href={`#${x.id}`}
              onClick={jump(x.id)}
              style={{ scrollSnapAlign: 'start' }}
              className="px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap border bg-white text-ink/80 border-line hover:border-brass hover:text-ink transition-colors"
            >
              {x.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Sections */}
        {c.sections.map((s) => {
          const Icon = SECTION_ICON[s.id] || Layers;
          const p = s.bullets ? null : photo(photoIdx++);
          return (
            <section key={s.id} id={s.id} className="scroll-mt-32 py-10 md:py-14 border-b border-line last:border-0">
              <div data-reveal>
                <span className="w-12 h-12 rounded-2xl bg-ink text-brass-light flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </span>
                <h2 className="mt-4 text-2xl sm:text-3xl font-black leading-snug">{s.heading}</h2>
              </div>

              <div className="mt-4 space-y-4 text-base sm:text-[17px] leading-loose text-ink/85" data-reveal>
                {s.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {s.bullets && (
                <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                  {s.bullets.map((b, i) => (
                    <li
                      key={b}
                      className="flex gap-3 rounded-2xl bg-white border border-line p-4 text-sm sm:text-[15px] leading-relaxed font-semibold"
                      data-reveal
                      style={{ '--reveal-delay': `${(i % 2) * 70}ms` } as React.CSSProperties}
                    >
                      <span className="w-7 h-7 rounded-full bg-wa/15 text-wa flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {p && (
                <figure className="mt-7 rounded-3xl overflow-hidden bg-ink-soft" data-reveal>
                  <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className="w-full aspect-[16/10] object-cover" />
                  <figcaption className="px-4 py-2.5 text-xs font-semibold text-white/75 bg-ink">{p.alt}</figcaption>
                </figure>
              )}

              {/* Photo strip after the benefits */}
              {s.bullets && photos.length > 4 && (
                <div className="mt-7 snap-rail gap-3 -mx-5 px-5 sm:mx-0 sm:px-0 scroll-px-5" data-reveal>
                  {photos.slice(4, 8).map((ph) => (
                    <img
                      key={ph.src}
                      src={ph.src}
                      alt={ph.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-[70%] sm:w-[calc(50%-0.375rem)] aspect-[4/3] object-cover rounded-2xl"
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {/* Comparison */}
        <section id="compare" className="scroll-mt-32 py-10 md:py-14 border-b border-line">
          <h2 className="text-2xl sm:text-3xl font-black leading-snug" data-reveal>
            {t.compare}: {name} / {c.compare.other}
          </h2>
          <div className="mt-6 rounded-3xl overflow-hidden border border-line bg-white" data-reveal>
            <table className="w-full text-sm sm:text-[15px]">
              <thead>
                <tr className="bg-ink text-white text-start">
                  <th className="p-3 sm:p-4 text-start font-bold w-[30%]">{t.aspect}</th>
                  <th className="p-3 sm:p-4 text-start font-black text-brass-light">{name}</th>
                  <th className="p-3 sm:p-4 text-start font-bold text-white/75">{c.compare.other}</th>
                </tr>
              </thead>
              <tbody>
                {c.compare.rows.map(([aspect, ours, theirs]) => (
                  <tr key={aspect} className="border-t border-line align-top">
                    <th className="p-3 sm:p-4 text-start font-bold text-muted">{aspect}</th>
                    <td className="p-3 sm:p-4 font-bold text-ink">
                      <span className="inline-flex items-start gap-1.5">
                        <Check className="w-4 h-4 text-wa shrink-0 mt-0.5" />
                        {ours}
                      </span>
                    </td>
                    <td className="p-3 sm:p-4 text-muted">
                      <span className="inline-flex items-start gap-1.5">
                        <XIcon className="w-4 h-4 text-[#B4532A] shrink-0 mt-0.5" />
                        {theirs}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Specifications */}
        <section id="specs" className="scroll-mt-32 py-10 md:py-14 border-b border-line">
          <h2 className="text-2xl sm:text-3xl font-black leading-snug" data-reveal>
            {t.specs}: {name}
          </h2>
          <dl className="mt-6 grid sm:grid-cols-2 gap-3" data-reveal>
            {[
              [t.sizes, <bdi dir="ltr">{info.specs.dimensions}</bdi>],
              [t.thickness, <bdi dir="ltr">{info.specs.thickness}</bdi>],
              [t.waterproof, info.specs.waterproof[currentLang]],
              [t.composition, info.specs.composition[currentLang]],
            ].map(([k, v], i) => (
              <div key={i} className="rounded-2xl bg-white border border-line p-4">
                <dt className="text-xs font-bold text-muted">{k}</dt>
                <dd className="mt-1 font-extrabold text-ink leading-relaxed">{v}</dd>
              </div>
            ))}
            <div className="sm:col-span-2 rounded-2xl bg-white border border-line p-4">
              <dt className="text-xs font-bold text-muted">{t.applications}</dt>
              <dd className="mt-1 font-extrabold text-ink leading-relaxed">{info.specs.applications[currentLang]}</dd>
            </div>
          </dl>
        </section>

        {/* Installation */}
        {guide && (
          <section id="install" className="scroll-mt-32 py-10 md:py-14 border-b border-line">
            <h2 className="text-2xl sm:text-3xl font-black leading-snug" data-reveal>
              {t.install}: {name}
            </h2>
            <p className="mt-3 text-base leading-loose text-ink/85" data-reveal>
              {t.installIntro}
            </p>
            <p className="mt-4 rounded-2xl bg-white border border-line p-4 text-sm" data-reveal>
              <span className="block text-xs font-bold text-muted mb-1">{t.method}</span>
              <span className="font-extrabold">{guide.installationMethod[currentLang]}</span>
            </p>
            <ol className="mt-5 space-y-3.5">
              {guide.steps[currentLang].map((step, i) => (
                <li key={i} className="flex gap-3" data-reveal>
                  <span className="w-9 h-9 rounded-full bg-ink text-brass-light font-black flex items-center justify-center shrink-0 tabular-nums">{i + 1}</span>
                  <p className="text-base leading-relaxed text-ink/90 pt-1">{step}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 rounded-2xl bg-brass/15 border-s-4 border-brass p-4 text-[15px] leading-relaxed" data-reveal>
              <span className="block font-black text-brass-deep mb-1">{t.tip}</span>
              {guide.proTip[currentLang]}
            </p>
            <Link
              to={installationRoute(currentLang)}
              scrollTo={`install-${guide.id}`}
              className="mt-5 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-ink hover:bg-ink-soft text-white font-extrabold text-sm transition-colors"
            >
              <PlayCircle className="w-5 h-5 text-brass-light" />
              {t.watch}
            </Link>
          </section>
        )}
      </div>

      {/* Models */}
      <section id="models" className="scroll-mt-32 bg-sand/60 border-y border-line py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black leading-snug">{t.models(name)}</h2>
        </div>
        <div className="mt-6 snap-rail gap-3 sm:gap-5 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-px-5">
          {models.slice(0, 10).map((m) => (
            <div key={m.id} className="w-[44%] sm:w-[30%] lg:w-[22%]" style={{ scrollSnapAlign: 'start' }}>
              <ProductCard model={m} currentLang={currentLang} className="h-full" />
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mt-6">
          <Link
            to={categoryRoute(currentLang, catId)}
            className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-4 rounded-full bg-brass hover:bg-brass-light text-ink font-extrabold transition-colors"
          >
            {t.viewAll(models.length, name)}
            <Arrow className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 py-12">
        <div className="rounded-3xl bg-ink text-white p-6 sm:p-10" data-reveal>
          <h2 className="text-2xl sm:text-3xl font-black leading-snug">{t.ctaTitle}</h2>
          <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">{t.ctaBody}</p>
          <a
            href={whatsappLink(t.waMsg(name))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-4 rounded-full bg-wa hover:bg-wa-deep font-extrabold transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            {t.ctaBtn}
          </a>
        </div>
      </section>

      {/* More guides */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-14">
        <h2 className="text-xl sm:text-2xl font-black mb-5">{t.more}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ARTICLES.filter((a) => a.slug !== meta.slug).map((a) => (
            <ArticleCard key={a.slug} meta={a} currentLang={currentLang} />
          ))}
        </div>
      </section>
    </article>
  );
};

/** Card linking to a guide; used on the blog index, article footers and the home page. */
export const ArticleCard: React.FC<{ meta: ArticleMeta; currentLang: Language }> = ({ meta, currentLang }) => {
  const { getCategoryImageUrl } = useMedia();
  const c = articleContent(meta, currentLang);
  const card = categoryCard(meta.categoryId);
  const info = CATEGORIES_DATA.find((x) => x.id === meta.categoryId) || CATEGORIES_DATA[0];
  return (
    <Link
      to={articleRoute(currentLang, meta.slug)}
      className="group flex flex-col rounded-3xl overflow-hidden bg-white border border-line hover:border-brass hover:shadow-lg transition-all"
    >
      <span className="relative block aspect-[16/9] bg-ink-soft overflow-hidden">
        <img
          src={getCategoryImageUrl(meta.categoryId, info.image, 640)}
          alt={card.name[currentLang]}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-3 start-3 px-3 py-1 rounded-full bg-ink/80 backdrop-blur-sm text-white text-xs font-bold">{card.name[currentLang]}</span>
      </span>
      <span className="flex-1 flex flex-col p-5">
        <span className="font-black text-lg leading-snug text-ink group-hover:text-brass-deep transition-colors">{c.title}</span>
        <span className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">{c.description}</span>
        <span className="mt-4 text-sm font-bold text-brass-deep">
          {UI.readGuide[currentLang]} {currentLang === 'ar' ? '←' : '→'}
        </span>
      </span>
    </Link>
  );
};
