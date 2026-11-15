import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown, Lightbulb, MessageSquare, Play, Wrench } from 'lucide-react';
import { Language } from '../types';
import { INSTALLATION_GUIDES, InstallationGuide } from '../data/installationGuides';
import { PRODUCT_MODELS, isModelInCategory } from '../data/products';
import { categoryCard } from '../data/categoryCards';
import { useMedia } from '../context/MediaContext';
import { Link } from '../router';
import { categoryRoute, productRoute } from '../routing';
import { Breadcrumbs } from './Breadcrumbs';
import { SectionHeading } from './cards';
import { track } from '../analytics';
import { UI, whatsappLink } from '../site';

const TEXT = {
  ar: {
    sub: 'فيديو قصير وخطوات واضحة لكل فئة — اختر المنتج لتشاهد طريقة تركيبه، ثم انتقل مباشرة إلى موديلاته.',
    watch: 'شاهد فيديو التركيب',
    method: 'طريقة التثبيت',
    steps: 'خطوات التركيب',
    more: 'الأدوات ونصيحة المهندس',
    tools: 'الأدوات المطلوبة',
    viewModels: (n: number, c: string) => `عرض موديلات ${c} (${n})`,
    models: 'موديلات من هذه الفئة',
    helpTitle: 'تحتاج معلّم تركيب أو استشارة؟',
    helpBody: 'أرسل لنا صور المكان والقياسات، ونساعدك في الكميات وطريقة التركيب المناسبة.',
    helpBtn: 'تواصل معنا على واتساب',
    waMsg: 'مرحباً شركة بيرليك، أحتاج استشارة حول تركيب منتجاتكم.',
  },
  en: {
    sub: 'A short video and clear steps for every range — pick a product to see how it is installed, then jump straight to its models.',
    watch: 'Watch the installation video',
    method: 'Fixing method',
    steps: 'Installation steps',
    more: 'Tools & pro tip',
    tools: 'Tools you need',
    viewModels: (n: number, c: string) => `View ${c} models (${n})`,
    models: 'Models in this range',
    helpTitle: 'Need an installer or some advice?',
    helpBody: 'Send us photos of the space and your measurements and we will help with quantities and the right installation method.',
    helpBtn: 'Message us on WhatsApp',
    waMsg: 'Hello Birlik Company, I need advice about installing your products.',
  },
  tr: {
    sub: 'Her ürün grubu için kısa bir video ve net adımlar — montajını görmek için ürünü seçin, ardından modellerine geçin.',
    watch: 'Montaj videosunu izleyin',
    method: 'Sabitleme yöntemi',
    steps: 'Montaj adımları',
    more: 'Aletler ve usta tavsiyesi',
    tools: 'Gerekli aletler',
    viewModels: (n: number, c: string) => `${c} modellerini gör (${n})`,
    models: 'Bu gruptaki modeller',
    helpTitle: 'Usta veya danışmanlık mı lazım?',
    helpBody: 'Mekân fotoğraflarını ve ölçüleri gönderin; miktar ve doğru montaj yöntemi konusunda yardımcı olalım.',
    helpBtn: "WhatsApp'tan yazın",
    waMsg: 'Merhaba Birlik Şirketi, ürünlerinizin montajı hakkında danışmak istiyorum.',
  },
};

/** YouTube thumbnail that only loads the heavy player after a tap (saves ~1 MB per video). */
const LiteVideo: React.FC<{ guide: InstallationGuide; title: string; label: string }> = ({ guide, title, label }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative aspect-video rounded-3xl overflow-hidden bg-ink-soft shadow-lg">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${guide.youtubeId}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            setPlaying(true);
            track('video_play', { category: guide.id });
          }}
          aria-label={`${label}: ${title}`}
          className="group absolute inset-0 w-full h-full"
        >
          <img
            src={`https://i.ytimg.com/vi/${guide.youtubeId}/hqdefault.jpg`}
            alt={title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/20" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brass text-ink flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
              <Play className="w-7 h-7 sm:w-8 sm:h-8 ms-1 fill-current" />
            </span>
          </span>
          <span className="absolute bottom-3 inset-x-4 text-start text-white text-sm font-bold">{label}</span>
        </button>
      )}
    </div>
  );
};

const GuideSection: React.FC<{ guide: InstallationGuide; index: number; currentLang: Language }> = ({ guide, index, currentLang }) => {
  const { getProductImageUrl, getCategoryImageUrl } = useMedia();
  const t = TEXT[currentLang];
  const Arrow = currentLang === 'ar' ? ArrowLeft : ArrowRight;
  const card = categoryCard(guide.categoryId);
  const name = card.name[currentLang];
  const models = PRODUCT_MODELS.filter((m) => isModelInCategory(m, guide.categoryId));
  const flip = index % 2 === 1;

  return (
    <section id={`install-${guide.id}`} className={`scroll-mt-32 ${index % 2 === 0 ? 'bg-ivory' : 'bg-sand/50'}`} aria-labelledby={`install-title-${guide.id}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
        {/* Video */}
        <div className={`min-w-0 lg:sticky lg:top-36 ${flip ? 'lg:order-2' : ''}`} data-reveal>
          <LiteVideo guide={guide} title={guide.videoTitle[currentLang]} label={t.watch} />
        </div>

        {/* Guide */}
        <div className="min-w-0" data-reveal>
          <p className="flex items-center gap-2 text-sm font-bold text-brass-deep">
            <span className="tabular-nums" dir="ltr">
              0{index + 1}
            </span>
            <span className="w-6 h-0.5 bg-current" />
            <span dir="auto">{card.tag[currentLang]}</span>
          </p>
          <h2 id={`install-title-${guide.id}`} className="mt-1 text-3xl sm:text-4xl font-black leading-tight">
            {name}
          </h2>
          <p className="mt-2 text-sm sm:text-base leading-relaxed text-muted">{guide.subtitle[currentLang]}</p>

          <p className="mt-4 rounded-2xl bg-white border border-line p-4 text-sm leading-relaxed">
            <span className="block text-[11px] font-bold text-muted mb-1">{t.method}</span>
            <span className="font-bold text-ink">{guide.installationMethod[currentLang]}</span>
          </p>

          <h3 className="mt-6 text-lg font-black">{t.steps}</h3>
          <ol className="mt-3 space-y-3">
            {guide.steps[currentLang].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-8 h-8 rounded-full bg-ink text-brass-light text-sm font-black flex items-center justify-center shrink-0 tabular-nums">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-ink/90 pt-1">{step}</p>
              </li>
            ))}
          </ol>

          <details className="group mt-5 rounded-2xl bg-white border border-line">
            <summary className="flex items-center justify-between gap-3 p-4 cursor-pointer list-none font-bold text-sm [&::-webkit-details-marker]:hidden">
              <span className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-brass-deep" />
                {t.more}
              </span>
              <ChevronDown className="w-4 h-4 text-muted transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-4 pb-4">
              <p className="text-[11px] font-bold text-muted mb-2">{t.tools}</p>
              <ul className="flex flex-wrap gap-2">
                {guide.tools[currentLang].map((tool) => (
                  <li key={tool} className="px-3 py-1.5 rounded-full bg-sand text-xs font-semibold">
                    {tool}
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex gap-3 rounded-xl bg-brass/15 p-3.5 text-sm leading-relaxed">
                <Lightbulb className="w-5 h-5 text-brass-deep shrink-0 mt-0.5" />
                {guide.proTip[currentLang]}
              </p>
            </div>
          </details>

          {/* Links to the category and its products */}
          <div className="mt-6">
            <p className="text-[11px] font-bold text-muted mb-2">{t.models}</p>
            <div className="snap-rail gap-2.5 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-px-4">
              {models.slice(0, 6).map((m) => (
                <Link
                  key={m.id}
                  to={productRoute(currentLang, m)}
                  style={{ scrollSnapAlign: 'start' }}
                  className="group w-28 sm:w-32 rounded-2xl overflow-hidden bg-white border border-line hover:border-brass transition-colors"
                >
                  <span className="block aspect-square bg-ink-soft overflow-hidden">
                    <img
                      src={getProductImageUrl(m.id, getCategoryImageUrl(guide.categoryId, guide.categoryImage, 640), 640)}
                      alt={`${m.code} ${m.name[currentLang]}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </span>
                  <span className="block p-2 text-xs font-bold text-ink truncate">{m.name[currentLang]}</span>
                </Link>
              ))}
            </div>

            <Link
              to={categoryRoute(currentLang, guide.categoryId)}
              className="group mt-4 inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 rounded-full bg-ink hover:bg-ink-soft text-white font-extrabold text-sm transition-colors"
            >
              {t.viewModels(models.length, name)}
              <Arrow className="w-4 h-4 text-brass-light" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export const InstallationResourcesPage: React.FC<{ currentLang: Language }> = ({ currentLang }) => {
  const t = TEXT[currentLang];
  const jump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(`install-${id}`)?.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState(null, '', `#install-${id}`);
  };

  return (
    <div className="pt-16 md:pt-[4.5rem]">
      <section className="bg-ink text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-6 pb-8 md:pb-12">
          <Breadcrumbs dark currentLang={currentLang} items={[{ label: UI.installationLong[currentLang] }]} />
          <div className="mt-6">
            <SectionHeading as="h1" dark eyebrow={`${INSTALLATION_GUIDES.length} ${currentLang === 'ar' ? 'فيديوهات' : currentLang === 'tr' ? 'video' : 'videos'}`} title={UI.installationLong[currentLang]} sub={t.sub} />
          </div>
        </div>
      </section>

      {/* Jump to a product range */}
      <nav className="sticky top-16 md:top-[4.5rem] z-30 bg-ivory/95 backdrop-blur-md border-b border-line" aria-label={UI.installationLong[currentLang]}>
        <div className="snap-rail gap-2 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-3 scroll-px-5">
          {INSTALLATION_GUIDES.map((g) => (
            <a
              key={g.id}
              href={`#install-${g.id}`}
              onClick={jump(g.id)}
              style={{ scrollSnapAlign: 'start' }}
              className="px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap border bg-white text-ink/80 border-line hover:border-brass hover:text-ink transition-colors"
            >
              {categoryCard(g.categoryId).name[currentLang]}
            </a>
          ))}
        </div>
      </nav>

      {INSTALLATION_GUIDES.map((g, i) => (
        <GuideSection key={g.id} guide={g} index={i} currentLang={currentLang} />
      ))}

      {/* Help */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-3xl bg-ink text-white p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6" data-reveal>
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-black leading-snug">{t.helpTitle}</h2>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-white/75">{t.helpBody}</p>
          </div>
          <a
            href={whatsappLink(t.waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-wa hover:bg-wa-deep font-extrabold transition-colors shrink-0"
          >
            <MessageSquare className="w-5 h-5" />
            {t.helpBtn}
          </a>
        </div>
      </section>
    </div>
  );
};
