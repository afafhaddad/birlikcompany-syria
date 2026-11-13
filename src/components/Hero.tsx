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
          <p className="hidden sm:inline-flex [@media(max-height:700px)]:hidden items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/12 backdrop-blur-sm border border-white/20 text-xs sm:text-sm font-semibold text-brass-light animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-brass-light" />
            {currentLang === 'ar' ? 'اللاذقية • توصيل لكل المحافظات السورية' : currentLang === 'tr' ? 'Lazkiye • Tüm Suriye’ye teslimat' : 'Lattakia • Delivery across Syria'}
          </p>

          <h1
            className="sm:mt-4 leading-[1.3] font-black text-balance animate-fade-up"
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
