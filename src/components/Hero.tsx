import React from 'react';
import { ArrowLeft, ArrowRight, MessageSquare } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { catalogueRoute } from '../routing';
import { Link } from '../router';
import { UI, whatsappLink } from '../site';
import { BackgroundVideo } from './BackgroundVideo';

interface HeroProps {
  currentLang: Language;
  onNavigate: (sectionId: string) => void;
}

/** Full-screen hero: a light poster paints first, the video loop follows on good connections. */
export const Hero: React.FC<HeroProps> = ({ currentLang, onNavigate }) => {
  const t = TRANSLATIONS[currentLang];
  const Arrow = currentLang === 'ar' ? ArrowLeft : ArrowRight;
  return (
    <section id="hero" className="relative h-[100svh] min-h-[520px] max-h-[980px] flex flex-col justify-end bg-ink text-white overflow-hidden">
      {/* Poster (always) */}
      <picture>
        <source media="(max-width: 767px)" srcSet="/media/hero-mobile.webp" />
        <img
          src="/media/hero-desktop.webp"
          alt={currentLang === 'ar' ? 'ديكور داخلي بألواح بديل الخشب من شركة بيرليك' : 'Interior finished with Birlik wall panels'}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover motion-safe:animate-slow-zoom"
        />
      </picture>

      <BackgroundVideo mobileSrc="/media/hero-mobile.mp4" desktopSrc="/media/hero-desktop.mp4" />

      <div className="absolute inset-0 scrim-bottom" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-24 pb-28 md:pb-16">
        <div className="max-w-4xl">
          {/* Brand lockup: the logo the header hides while you're at the top of the page */}
          <div className="flex items-center gap-3.5 sm:gap-5 [@media(max-height:560px)]:hidden">
            <span className="shrink-0 w-[76px] h-[76px] sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-[22px] sm:rounded-[26px] bg-white p-1.5 ring-2 ring-brass/70 motion-safe:animate-logo-in">
              <span className="block w-full h-full rounded-[18px] sm:rounded-[22px] motion-safe:animate-halo">
                <img
                  src="/logo-192.png"
                  srcSet="/logo-192.png 192w, /logo-320.webp 320w"
                  sizes="(min-width: 1024px) 112px, (min-width: 640px) 96px, 76px"
                  alt="Birlik Company — شركة بيرليك"
                  width={112}
                  height={112}
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              </span>
            </span>
            <span className="min-w-0 animate-fade-up" style={{ animationDelay: '120ms' }}>
              <span className="block text-[1.65rem] sm:text-4xl lg:text-5xl font-black leading-none tracking-tight">
                {currentLang === 'ar' ? 'شركة بيرليك' : currentLang === 'tr' ? 'Birlik Şirketi' : 'Birlik Company'}
              </span>
              <span className="mt-1.5 sm:mt-2 block text-[11px] sm:text-sm font-bold text-brass-light">
                {currentLang === 'ar'
                  ? 'مواد الإكساء والديكور • منذ 2022'
                  : currentLang === 'tr'
                    ? 'Kaplama ve dekor malzemeleri • 2022’den beri'
                    : 'Wall & floor finishes • Since 2022'}
              </span>
              <span className="mt-0.5 block text-[11px] sm:text-xs font-semibold text-white/70">
                {currentLang === 'ar' ? 'اللاذقية • توصيل لكل المحافظات السورية' : currentLang === 'tr' ? 'Lazkiye • Tüm Suriye’ye teslimat' : 'Lattakia • Delivery across Syria'}
              </span>
            </span>
          </div>

          <h1
            className="mt-5 sm:mt-7 leading-[1.3] font-black text-balance animate-fade-up"
            style={{ animationDelay: '90ms', fontSize: 'clamp(1.6rem, min(5vw, 6.2vh), 3.5rem)' }}
          >
            {t.hero.title}
          </h1>

          <p
            className="mt-3 text-sm sm:text-base lg:text-lg leading-relaxed text-white/80 max-w-2xl line-clamp-2 sm:line-clamp-none [@media(max-height:600px)]:hidden animate-fade-up"
            style={{ animationDelay: '180ms' }}
          >
            {t.hero.subtitle}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 animate-fade-up" style={{ animationDelay: '270ms' }}>
            <Link
              to={catalogueRoute(currentLang)}
              id="hero-explore-products-btn"
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-brass hover:bg-brass-light text-ink font-extrabold text-base transition-colors"
            >
              {t.hero.exploreBtn}
              <Arrow className="w-5 h-5 transition-transform group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
            </Link>
            <a
              href={whatsappLink(UI.generalWhatsApp[currentLang])}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/12 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-base transition-colors"
            >
              <MessageSquare className="w-5 h-5 text-[#7CE0A3]" />
              {UI.askPriceWhatsApp[currentLang]}
            </a>
          </div>
        </div>


      </div>
    </section>
  );
};
