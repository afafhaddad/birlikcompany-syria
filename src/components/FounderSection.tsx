import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { FOUNDER_DATA } from '../data/founder';
import { useMedia } from '../context/MediaContext';
import { DropZoneOverlay } from './DropZoneOverlay';

interface FounderSectionProps {
  currentLang: Language;
  onNavigate?: (sectionId: string) => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ 
  currentLang,
}) => {
  const { getFounderImageUrl } = useMedia();
  const [imageError, setImageError] = useState(false);

  const founderImage = getFounderImageUrl(FOUNDER_DATA.defaultImage);

  useEffect(() => {
    setImageError(false);
  }, [founderImage]);

  const labels = {
    ar: {
      badge: 'مؤسس الشركة',
    },
    en: {
      badge: 'Our Founder',
    },
    tr: {
      badge: 'Kurucumuz',
    }
  }[currentLang];

  return (
    <section 
      id="founder" 
      className="py-16 sm:py-20 md:py-24 bg-[#FAF7F2] border-b border-[#E5DFD5] relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top: Narrative Text About the Founder */}
        <div className="text-start space-y-5">
          
          {/* Header: Minimal Badge + Founder Name */}
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#9E7241] font-bold block mb-2">
              {labels.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1C1917] leading-tight">
              {FOUNDER_DATA.name[currentLang]}
            </h2>
            <div className="w-16 h-0.5 bg-[#9E7241] mt-3" />
          </div>

          {/* Exactly the requested 3 narrative paragraphs */}
          <div className="space-y-4 text-sm sm:text-[15px] md:text-base text-[#3D352E] leading-relaxed font-normal">
            <p>
              {FOUNDER_DATA.paragraphs[currentLang][0]}
            </p>
            <p>
              {FOUNDER_DATA.paragraphs[currentLang][1]}
            </p>
            <p>
              {FOUNDER_DATA.paragraphs[currentLang][2]}
            </p>
          </div>

        </div>

        {/* Underneath: Founder Image */}
        <div className="mt-10 sm:mt-12 flex flex-col items-center">
          <div className="relative w-full max-w-sm sm:max-w-md mx-auto group">
            
            {/* Photo Frame */}
            <div className="relative aspect-[3/4] w-full bg-[#E8E2D8] border border-[#DDD5C7] shadow-sm overflow-hidden">
              <img
                src={(imageError ? FOUNDER_DATA.defaultImage : founderImage) || FOUNDER_DATA.defaultImage}
                alt={FOUNDER_DATA.name[currentLang]}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover object-top filter contrast-[1.02] brightness-[0.98] transition-transform duration-500 group-hover:scale-102"
              />

              {/* Subtle gradient at the bottom for name placement */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

              {/* Name & Title inside photo */}
              <div className="absolute bottom-5 start-5 end-5 text-white pointer-events-none text-start">
                <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white drop-shadow-sm">
                  {FOUNDER_DATA.name[currentLang]}
                </h3>
                <p className="text-xs sm:text-sm text-[#E5DFD5] font-light mt-0.5">
                  {FOUNDER_DATA.title[currentLang]}
                </p>
              </div>

              {/* In-place Drag and Drop Overlay for Admin (only visible when logged in as admin) */}
              <DropZoneOverlay
                target={{ type: 'founder', name: FOUNDER_DATA.name[currentLang] }}
                currentLang={currentLang}
                badgePosition="top-end"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
