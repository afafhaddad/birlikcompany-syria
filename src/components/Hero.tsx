import React, { useState, useEffect } from 'react';
import { 
  ArrowRight,
  ArrowLeft,
  PhoneCall
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import heroImage from '../assets/images/hero.png';
import { useMedia } from '../context/MediaContext';
import { DropZoneOverlay } from './DropZoneOverlay';

interface HeroProps {
  currentLang: Language;
  onNavigate: (sectionId: string) => void;
  onSelectCategory?: (category: any) => void;
  onOpenCatalogue?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onNavigate,
  onOpenCatalogue
}) => {
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const { getHeroImageUrl } = useMedia();
  const heroImageFromRegistry = getHeroImageUrl(heroImage);

  const [currentHeroSrc, setCurrentHeroSrc] = useState<string>(heroImageFromRegistry);

  useEffect(() => {
    setCurrentHeroSrc(heroImageFromRegistry);
  }, [heroImageFromRegistry]);

  const handleHeroImageError = () => {
    if (currentHeroSrc !== '/hero.png' && currentHeroSrc !== heroImage) {
      setCurrentHeroSrc(heroImage);
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[640px] md:min-h-[720px] lg:min-h-[800px] flex items-center justify-center overflow-hidden border-b border-[#E5DFD5]"
    >
      {/* Interior Decor Background Image with Admin Drop Zone */}
      <div className="absolute inset-0 z-0">
        <img 
          src={currentHeroSrc || heroImage || '/hero.png'} 
          alt="شركة بيرليك - الوجهة الأولى للتشطيبات الداخلية الفاخرة في سوريا" 
          onError={handleHeroImageError}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-subtle-zoom"
        />
        {/* Balanced Luxury Architectural Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#141210]/80 via-[#141210]/55 to-[#141210]/85 pointer-events-none" />

        {/* DropZone Overlay for Hero Image */}
        <DropZoneOverlay
          target={{
            type: 'hero',
            name: currentLang === 'ar' ? 'صورة الواجهة الرئيسية (Hero)' : 'Main Hero Image',
          }}
          currentLang={currentLang}
          badgePosition="top-start"
        />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* Right-aligned Hero Stack */}
        <div className="w-full max-w-3xl text-start flex flex-col items-start">
          
          {/* Floating Brand Logo with Dropping White Banner Backdrop - Raised upwards */}
          <div 
            id="hero-floating-logo-container"
            className="group/logo relative -mt-7 sm:-mt-9 md:-mt-11 mb-5 sm:mb-6 transition-transform duration-300 hover:scale-102 inline-flex flex-col items-center"
          >
            {/* Dropping White Banner Backdrop: Shorter, tightly framed backdrop ending right at the logo bottom */}
            <div 
              className="absolute -top-[600px] bottom-0 inset-x-3 sm:inset-x-4 md:inset-x-5 bg-[#FFFFFF]/98 backdrop-blur-xs shadow-[0_10px_24px_rgba(0,0,0,0.28)] border-x border-b-2 border-[#D4991A]/60 rounded-b-xs pointer-events-none z-0"
              aria-hidden="true"
            >
              {/* Refined Gold Accent Trim at the bottom edge */}
              <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-[#D4991A]/50 via-[#D4991A] to-[#D4991A]/50" />
            </div>

            <img 
              src="/logo.png" 
              alt={t.brandName}
              className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.12)]"
            />
          </div>

          {/* Main Headline - Bold condensed architectural style matching reference */}
          <h1 className="font-['Cairo','Changa','Tajawal',sans-serif] font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-white leading-[1.18] tracking-normal mb-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            {currentLang === 'ar' ? (
              <>
                <span className="block">شركة بيرليك .. الوجهة</span>
                <span className="block">الأولى لمواد التجديد</span>
                <span className="block">والإكساء الداخلية</span>
                <span className="block">المبتكرة في سورية</span>
              </>
            ) : (
              t.hero.mainHeadline || t.hero.title
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-[#F2ECE4] text-sm sm:text-base md:text-lg font-['Cairo','Tajawal',sans-serif] font-medium leading-relaxed max-w-2xl mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            {t.hero.subtitle}
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Button 1: Explore Catalog - Styled with the warm gold/amber from the reference image */}
            <button
              onClick={() => {
                if (onOpenCatalogue) {
                  onOpenCatalogue();
                } else {
                  onNavigate('categories');
                }
              }}
              id="hero-explore-products-btn"
              className="px-8 py-3.5 bg-[#D4991A] hover:bg-[#BE8613] text-white font-['Cairo','Tajawal',sans-serif] font-bold text-base sm:text-lg tracking-wide transition-all shadow-xl hover:shadow-2xl cursor-pointer flex items-center gap-2.5 rounded-xs"
            >
              <span>{t.hero.exploreBtn}</span>
              <ArrowIcon className="w-5 h-5" />
            </button>

            {/* Button 2: Contact Us */}
            <button
              onClick={() => onNavigate('office')}
              id="hero-contact-us-btn"
              className="px-6 py-3.5 bg-black/45 hover:bg-black/65 text-white backdrop-blur-md border border-white/30 hover:border-white font-['Cairo','Tajawal',sans-serif] font-medium text-sm sm:text-base tracking-wide transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center gap-2.5 rounded-xs"
            >
              <PhoneCall className="w-4 h-4 text-[#D4991A]" />
              <span>{t.hero.contactBtn}</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
