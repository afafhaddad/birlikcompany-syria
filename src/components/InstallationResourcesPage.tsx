import React, { useState } from 'react';
import { 
  Play, 
  ArrowRight, 
  ArrowLeft, 
  Wrench, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  Layers, 
  PhoneCall, 
  MessageSquare,
  Maximize2,
  HelpCircle,
  Film
} from 'lucide-react';
import { Language, ProductCategory } from '../types';
import { INSTALLATION_GUIDES, InstallationGuide } from '../data/installationGuides';
import { useMedia } from '../context/MediaContext';

interface InstallationResourcesPageProps {
  currentLang: Language;
  onSelectCategory: (categoryId: ProductCategory) => void;
  onBackToHome: () => void;
  onBackToCatalogue: () => void;
}

export const InstallationResourcesPage: React.FC<InstallationResourcesPageProps> = ({
  currentLang,
  onSelectCategory,
  onBackToHome,
  onBackToCatalogue
}) => {
  const { getCategoryImageUrl } = useMedia();
  const isRtl = currentLang === 'ar';
  const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;
  const NextArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const scrollToSection = (id: string) => {
    setActiveCategoryFilter(id);
    if (id === 'all') {
      window.scrollTo({ top: 350, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(`install-${id}`);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const t = {
    ar: {
      breadcrumbHome: 'الرئيسية',
      breadcrumbCatalogue: 'كتالوج المنتجات',
      breadcrumbCurrent: 'فيديوهات ودليل التركيب',
      pageBadge: 'فيديوهات ودليل التركيب والتطبيق',
      pageTitle: 'دليل وفيديوهات تطبيق وتركيب المنتجات',
      pageSubtitle: 'شروحات عملية وفيديوهات مرئية توضح خطوات قص وتثبيت وتركيب كافة ألواح ومنتجات شركة بيرليك بأعلى معايير الإتقان المعماري.',
      filterAll: 'كافة الفئات (6 فيديوهات)',
      dimensionsLabel: 'المقاس الموحد',
      thicknessLabel: 'السماكة الفنية',
      methodLabel: 'طريقة التثبيت',
      stepsTitle: 'خطوات وطريقة التركيب',
      toolsTitle: 'الأدوات والمعدات الموصى بها',
      viewCategoryModels: 'استعراض موديلات هذا الصنف',
      watchOnYoutube: 'مشاهدة على يوتيوب',
      needHelpTitle: 'هل تحتاج استشارة فنية خاصة بمشروعك؟',
      needHelpSubtitle: 'فريقنا الهندسي في مكتب اللاذقية جاهز لإرشادك حول الكميات وطرق التركيب الأمثل لأي مشروع سكني أو تجاري في سورية.',
      contactWhatsApp: 'محادثة المهندس عبر واتساب',
      callDirect: 'اتصال مباشر بفريق الدعم الفني',
      tipLabel: 'نصيحة المهندس للتركيب المثالي'
    },
    en: {
      breadcrumbHome: 'Home',
      breadcrumbCatalogue: 'Product Catalogue',
      breadcrumbCurrent: 'Installation Videos & Resources',
      pageBadge: 'Installation & Application Video Guides',
      pageTitle: 'Product Installation Resources & Video Walkthroughs',
      pageSubtitle: 'Practical step-by-step videos and technical guides demonstrating the correct cutting, adhesive bonding, and installation process for each Birlik product category.',
      filterAll: 'All Categories (6 Videos)',
      dimensionsLabel: 'Standard Size',
      thicknessLabel: 'Technical Thickness',
      methodLabel: 'Installation Method',
      stepsTitle: 'Installation Steps & Procedure',
      toolsTitle: 'Recommended Tools & Equipment',
      viewCategoryModels: 'Explore Models in this Category',
      watchOnYoutube: 'Watch on YouTube',
      needHelpTitle: 'Need Technical Advice for Your Project?',
      needHelpSubtitle: 'Our engineering specialists at the Latakia headquarters are ready to assist with quantity takeoffs and proper application guidelines across Syria.',
      contactWhatsApp: 'Consult via WhatsApp',
      callDirect: 'Direct Phone Support',
      tipLabel: 'Architectural Pro Tip'
    },
    tr: {
      breadcrumbHome: 'Ana Sayfa',
      breadcrumbCatalogue: 'Ürün Kataloğu',
      breadcrumbCurrent: 'Montaj Videoları ve Rehberi',
      pageBadge: 'Montaj ve Uygulama Video Rehberi',
      pageTitle: 'Ürün Uygulama ve Montaj Videoları',
      pageSubtitle: 'Birlik Şirketi ürünlerinin doğru kesim, yapıştırma ve montaj süreçlerini adım adım gösteren görsel rehberler ve videolar.',
      filterAll: 'Tüm Kategoriler (6 Video)',
      dimensionsLabel: 'Standart Ölçü',
      thicknessLabel: 'Teknik Kalınlık',
      methodLabel: 'Uygulama Yöntemi',
      stepsTitle: 'Montaj Adımları ve Yöntemi',
      toolsTitle: 'Önerilen Araç ve Gereçler',
      viewCategoryModels: 'Bu Kategorideki Modelleri İncele',
      watchOnYoutube: "YouTube'da İzle",
      needHelpTitle: 'Projeniz İçin Teknik Danışmanlığa mı İhtiyacınız Var?',
      needHelpSubtitle: 'Lazkiye merkez ofisimizdeki mimar ve mühendislerimiz malzeme hesabı ve uygulama konusunda yardıma hazırdır.',
      contactWhatsApp: "WhatsApp'tan Danışın",
      callDirect: 'Teknik Destek Hattı',
      tipLabel: 'Mimarın Montaj Tavsiyesi'
    }
  }[currentLang];

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1C1917] pb-24">
      {/* 1. Header / Breadcrumbs & Hero Title */}
      <section className="bg-[#F3ECE0]/60 border-b border-[#E5DFD5] pt-8 pb-12 sm:pt-10 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-mono text-[#78716A] mb-6 flex-wrap">
            <button
              onClick={onBackToHome}
              className="hover:text-[#9E7241] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>{t.breadcrumbHome}</span>
            </button>
            <span>/</span>
            <button
              onClick={onBackToCatalogue}
              className="hover:text-[#9E7241] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>{t.breadcrumbCatalogue}</span>
            </button>
            <span>/</span>
            <span className="text-[#1C1917] font-semibold">{t.breadcrumbCurrent}</span>
          </nav>

          {/* Title and Subtitle */}
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#DDD5C7] text-xs font-bold font-mono tracking-widest text-[#9E7241] uppercase shadow-2xs">
              <Film className="w-3.5 h-3.5 text-[#9E7241]" />
              <span>{t.pageBadge}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight">
              {t.pageTitle}
            </h1>

            <p className="text-sm sm:text-base text-[#5C554E] leading-relaxed max-w-3xl">
              {t.pageSubtitle}
            </p>
          </div>

          {/* Quick Jump Category Filter Tabs */}
          <div className="mt-8 pt-6 border-t border-[#E0D7C8] flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => scrollToSection('all')}
              className={`px-3 py-1.5 text-xs font-medium transition-all cursor-pointer border ${
                activeCategoryFilter === 'all'
                  ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-xs'
                  : 'bg-white text-[#5C554E] border-[#DDD5C7] hover:border-[#9E7241]'
              }`}
            >
              {t.filterAll}
            </button>

            {INSTALLATION_GUIDES.map((guide) => (
              <button
                key={guide.id}
                type="button"
                onClick={() => scrollToSection(guide.id)}
                className={`px-3 py-1.5 text-xs font-medium transition-all cursor-pointer border flex items-center gap-1.5 ${
                  activeCategoryFilter === guide.id
                    ? 'bg-[#9E7241] text-white border-[#9E7241] shadow-xs font-bold'
                    : 'bg-white text-[#5C554E] border-[#DDD5C7] hover:border-[#9E7241] hover:text-[#1C1917]'
                }`}
              >
                <Play className="w-2.5 h-2.5 fill-current shrink-0" />
                <span>{guide.categoryName[currentLang]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Main Content: Each Category Card with Video Directly Below It */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 space-y-16 sm:space-y-20">
        {INSTALLATION_GUIDES.map((guide, idx) => {
          const categoryPhoto = getCategoryImageUrl(guide.categoryId, guide.categoryImage);

          return (
            <article
              key={guide.id}
              id={`install-${guide.id}`}
              className="bg-[#FFFFFF] border border-[#DDD5C7] shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              {/* Category Header Bar */}
              <div className="p-6 sm:p-8 bg-gradient-to-b from-[#FAF7F2] to-[#FFFFFF] border-b border-[#E5DFD5]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 bg-[#9E7241]/10 text-[#9E7241] text-[11px] font-bold font-mono tracking-wider uppercase border border-[#9E7241]/20">
                        0{idx + 1} • {guide.badge[currentLang]}
                      </span>
                      <span className="text-xs text-[#78716A] font-mono">
                        {guide.dimensions}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#1C1917]">
                      {guide.categoryName[currentLang]}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed">
                      {guide.subtitle[currentLang]}
                    </p>
                  </div>

                  {/* Category Fast Navigation Button */}
                  <div className="shrink-0 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectCategory(guide.categoryId)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1C1917] hover:bg-[#38332E] text-white text-xs font-semibold tracking-wider transition-colors cursor-pointer shadow-xs group"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{t.viewCategoryModels}</span>
                      <NextArrowIcon className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                    </button>
                  </div>
                </div>

                {/* Key Technical Specs Pill Strip */}
                <div className="mt-6 pt-4 border-t border-[#EFE9DF] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-2.5 bg-[#FAF7F2] border border-[#E8E2D8]">
                    <span className="text-[11px] text-[#78716A] block mb-0.5">{t.dimensionsLabel}:</span>
                    <span className="font-mono font-bold text-[#1C1917]" dir="ltr">{guide.dimensions}</span>
                  </div>
                  <div className="p-2.5 bg-[#FAF7F2] border border-[#E8E2D8]">
                    <span className="text-[11px] text-[#78716A] block mb-0.5">{t.thicknessLabel}:</span>
                    <span className="font-mono font-bold text-[#1C1917]" dir="ltr">{guide.thickness}</span>
                  </div>
                  <div className="p-2.5 bg-[#FAF7F2] border border-[#E8E2D8]">
                    <span className="text-[11px] text-[#78716A] block mb-0.5">{t.methodLabel}:</span>
                    <span className="font-medium text-[#1C1917] text-[11.5px] truncate block">{guide.installationMethod[currentLang]}</span>
                  </div>
                </div>
              </div>

              {/* VIDEO EMBED CONTAINER DIRECTLY BELOW THE CATEGORY */}
              <div className="p-5 sm:p-8 bg-[#1C1917]/3 border-b border-[#E5DFD5]">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#1C1917]">
                      <Play className="w-4 h-4 text-[#9E7241] fill-[#9E7241]" />
                      <span>{guide.videoTitle[currentLang]}</span>
                    </div>

                    <a
                      href={`https://www.youtube.com/watch?v=${guide.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#9E7241] hover:text-[#7A542A] hover:underline inline-flex items-center gap-1 font-medium transition-colors"
                      title={t.watchOnYoutube}
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span className="hidden sm:inline">{t.watchOnYoutube}</span>
                    </a>
                  </div>

                  {/* Responsive 16:9 Video Frame */}
                  <div className="relative w-full aspect-video bg-black shadow-lg overflow-hidden border border-[#DDD5C7]">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={guide.videoEmbedUrl}
                      title={guide.videoTitle[currentLang]}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Installation Steps, Tools & Professional Tips */}
              <div className="p-6 sm:p-8 bg-white grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left/Main Column: Step-by-Step Instructions */}
                <div className="lg:col-span-8 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#1C1917] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1E7E45]" />
                    <span>{t.stepsTitle}</span>
                  </h3>

                  <ol className="space-y-3">
                    {guide.steps[currentLang].map((step, sIdx) => (
                      <li 
                        key={sIdx}
                        className="flex items-start gap-3 p-3 bg-[#FAF7F2] border border-[#E8E2D8] hover:border-[#9E7241]/40 transition-colors"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#1C1917] text-white text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {sIdx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-[#3D352E] leading-relaxed font-normal">
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Right/Side Column: Tools & Pro Tip */}
                <div className="lg:col-span-4 space-y-5">
                  {/* Recommended Tools */}
                  <div className="p-4 bg-[#F5EFE6] border border-[#DDD5C7] space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917] flex items-center gap-2">
                      <Wrench className="w-3.5 h-3.5 text-[#9E7241]" />
                      <span>{t.toolsTitle}</span>
                    </h4>

                    <ul className="space-y-1.5">
                      {guide.tools[currentLang].map((tool, tIdx) => (
                        <li key={tIdx} className="text-xs text-[#5C554E] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#9E7241]" />
                          <span>{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Architectural Pro Tip */}
                  <div className="p-4 bg-[#FFFFFF] border-l-4 rtl:border-l-0 rtl:border-r-4 border-[#9E7241] border-t border-b border-r rtl:border-l border-[#DDD5C7] shadow-2xs space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#9E7241]">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{t.tipLabel}</span>
                    </div>
                    <p className="text-xs text-[#5C554E] leading-relaxed italic">
                      {guide.proTip[currentLang]}
                    </p>
                  </div>
                </div>

              </div>

            </article>
          );
        })}
      </section>

      {/* 3. Bottom Technical Consultation & Support CTA Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        <div className="bg-[#24201D] text-white p-8 sm:p-12 border border-[#9E7241]/40 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#9E7241]/20 border border-[#9E7241]/40 text-[#D4AF37] text-xs font-mono font-bold tracking-widest uppercase">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Birlik Technical Engineering Support</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              {t.needHelpTitle}
            </h2>

            <p className="text-sm sm:text-base text-[#D6CEBF] leading-relaxed">
              {t.needHelpSubtitle}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/963995764573?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D9%87%D9%86%D8%AF%D8%B3%D9%8A%D8%A9%20%D8%AD%D9%88%D9%84%20%D8%B7%D8%B1%D9%8A%D9%82%D8%A9%20%D8%AA%D8%B1%D9%83%D9%8A%D8%A8%20%D9%85%D9%88%D8%A7%D8%AF%20%D8%A7%D9%84%D8%A5%D9%83%D8%B3%D8%A7%D8%A1%20%D9%84%D8%AF%D9%8A%D9%83%D9%85."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-[#1E7E45] hover:bg-[#166536] text-white text-xs font-bold tracking-wider transition-all inline-flex items-center gap-2 shadow-md cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                <span>{t.contactWhatsApp}</span>
              </a>

              <a
                href="tel:+963995764573"
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-medium tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
                <span dir="ltr">+963 995 764 573</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
