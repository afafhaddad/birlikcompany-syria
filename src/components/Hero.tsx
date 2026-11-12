import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, MessageSquare, Droplets, Truck, Layers, ChevronDown } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PRODUCT_MODELS } from '../data/products';
import { catalogueRoute } from '../routing';
import { Link } from '../router';
import { UI, whatsappLink } from '../site';

interface HeroProps {
  currentLang: Language;
  onNavigate: (sectionId: string) => void;
}

/**
 * Full-screen hero. The poster image (21–41 KB) paints immediately; the short muted
 * video loop (0.5 MB on phones, 1 MB on desktop) is only fetched after the page has
 * loaded, and never on Data Saver, 2G-class connections or reduced-motion devices.
 */
function shouldLoadVideo(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (conn?.saveData) return false;
  if (conn?.effectiveType && /2g/.test(conn.effectiveType)) return false;
  return true;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onNavigate }) => {
  const t = TRANSLATIONS[currentLang];
  const Arrow = currentLang === 'ar' ? ArrowLeft : ArrowRight;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (!shouldLoadVideo()) return;
    const start = () => {
      const mobile = window.matchMedia('(max-width: 767px)').matches;
      setVideoSrc(mobile ? '/media/hero-mobile.mp4' : '/media/hero-desktop.mp4');
    };
    if (document.readyState === 'complete') {
      const id = window.setTimeout(start, 600);
      return () => window.clearTimeout(id);
    }
    window.addEventListener('load', start, { once: true });
    return () => window.removeEventListener('load', start);
  }, []);

  useEffect(() => {
    if (videoSrc) videoRef.current?.play().catch(() => {});
  }, [videoSrc]);

  const stats = [
    { icon: Layers, value: `${PRODUCT_MODELS.length}+`, label: UI.models[currentLang] },
    { icon: Droplets, value: '100%', label: currentLang === 'ar' ? 'مقاوم للماء' : currentLang === 'tr' ? 'su geçirmez' : 'waterproof' },
    { icon: Truck, value: '14', label: currentLang === 'ar' ? 'محافظة نوصل إليها' : currentLang === 'tr' ? 'ile teslimat' : 'governorates served' },
  ];

  return (
    <section id="hero" className="relative h-[100svh] min-h-[620px] max-h-[980px] flex flex-col justify-end bg-ink text-white overflow-hidden">
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

      {/* Video loop (good connections only) */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          aria-hidden="true"
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      <div className="absolute inset-0 scrim-bottom" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-24 pb-24 md:pb-14">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/12 backdrop-blur-sm border border-white/20 text-xs sm:text-sm font-semibold text-brass-light animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-brass-light" />
            {currentLang === 'ar' ? 'اللاذقية • توصيل لكل المحافظات السورية' : currentLang === 'tr' ? 'Lazkiye • Tüm Suriye’ye teslimat' : 'Lattakia • Delivery across Syria'}
          </p>

          <h1
            className="mt-4 text-[2rem] leading-[1.25] sm:text-5xl sm:leading-[1.2] lg:text-6xl lg:leading-[1.15] font-black text-balance animate-fade-up"
            style={{ animationDelay: '90ms' }}
          >
            {t.hero.title}
          </h1>

          <p
            className="mt-4 text-sm sm:text-lg leading-relaxed text-white/85 max-w-2xl line-clamp-3 sm:line-clamp-none animate-fade-up"
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
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/12 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-base transition-colors"
            >
              <MessageSquare className="w-5 h-5 text-[#7CE0A3]" />
              {UI.askPriceWhatsApp[currentLang]}
            </a>
          </div>
        </div>

        {/* Stats */}
        <dl
          className="mt-8 grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl border-t border-white/15 pt-5 animate-fade-up"
          style={{ animationDelay: '360ms' }}
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <Icon className="hidden sm:block w-6 h-6 text-brass-light shrink-0" />
              <div>
                <dd className="text-2xl sm:text-3xl font-black text-white tabular-nums" dir="ltr" data-keep-start="">
                  {value}
                </dd>
                <dt className="text-[11px] sm:text-sm text-white/70">{label}</dt>
              </div>
            </div>
          ))}
        </dl>

        <button
          type="button"
          onClick={() => onNavigate('categories')}
          aria-label={UI.collections[currentLang]}
          className="hidden md:flex absolute end-8 bottom-14 w-12 h-12 rounded-full border border-white/30 items-center justify-center text-white/80 hover:text-white hover:border-white motion-safe:animate-bounce"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
