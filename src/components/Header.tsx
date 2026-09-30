import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  Globe, 
  MessageSquare,
  ChevronDown,
  MapPin,
  Clock,
  Film
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { EMBEDDED_LOGO_IMAGE } from '../data/embeddedAssets';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar';

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E5DFD5] transition-all">
      {/* Top Utility Bar - Hidden on mobile for maximum clean screen space, shown on sm+ */}
      <div className="hidden sm:block bg-[#F3EFE8] border-b border-[#E8E2D8] text-[11px] sm:text-xs py-1.5 px-4 font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-[#78716A]">
          <span className="truncate">
            {currentLang === 'ar' && 'شركة بيرليك • حلول مبتكرة للتشطيبات الداخلية • شحن وتوريد لكافة المحافظات السورية'}
            {currentLang === 'en' && 'Birlik Company • Architectural Wall Surfaces • Delivery Across All Syrian Cities'}
            {currentLang === 'tr' && 'Birlik Şirketi • Mimari Duvar Kaplama Malzemeleri • Tüm Suriye İllerine Sevkiyat'}
          </span>

          <div className="flex items-center gap-4 text-xs font-mono shrink-0">
            <a 
              href="tel:+963995764573" 
              className="hover:text-[#9E7241] transition-colors flex items-center gap-1.5 text-[#5C554E]"
              dir="ltr"
            >
              <Phone className="w-3 h-3 text-[#9E7241]" />
              <span>+963 995 764 573</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 md:h-22">
          
          {/* Brand Logo */}
          <button 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center text-start group cursor-pointer focus:outline-none"
            id="brand-logo-btn"
            aria-label="Birlik Company Logo"
          >
            <img 
              src={EMBEDDED_LOGO_IMAGE || '/logo.png'} 
              alt="Birlik Company" 
              className="h-10 sm:h-13 md:h-16 w-auto max-w-[170px] sm:max-w-[240px] md:max-w-[280px] object-contain transition-transform duration-200 group-hover:scale-102 filter drop-shadow-2xs"
            />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-xs uppercase tracking-widest font-sans text-[#5C554E]">
            {/* 1. About Us */}
            <button
              onClick={() => handleNavClick('about')}
              className="hover:text-[#9E7241] transition-colors py-2 cursor-pointer font-medium text-[#5C554E]"
            >
              {t.nav.about || (currentLang === 'ar' ? 'من نحن' : 'About Us')}
            </button>

            {/* 2. Product Catalogue */}
            <button
              onClick={() => handleNavClick('catalogue')}
              className="hover:text-[#9E7241] transition-colors py-2 cursor-pointer font-bold text-[#1C1917]"
            >
              {currentLang === 'ar' ? 'كتالوج المنتجات' : currentLang === 'en' ? 'Product Catalogue' : 'Ürün Kataloğu'}
            </button>

            {/* 3. Montaj guide and videos */}
            <button
              onClick={() => handleNavClick('installation')}
              className="hover:text-[#9E7241] transition-colors py-2 cursor-pointer font-semibold text-[#9E7241] flex items-center gap-1.5"
            >
              <Film className="w-3.5 h-3.5 text-[#9E7241]" />
              <span>{currentLang === 'ar' ? 'دليل وفيديوهات التركيب' : currentLang === 'en' ? 'Installation Guides' : 'Montaj Rehberi'}</span>
            </button>

            {/* 4. Lattakia Office */}
            <button
              onClick={() => handleNavClick('office')}
              className="hover:text-[#9E7241] transition-colors py-2 cursor-pointer font-medium text-[#5C554E]"
            >
              {t.nav.office}
            </button>

            {/* 5. The Founder */}
            <button
              onClick={() => handleNavClick('founder')}
              className="hover:text-[#9E7241] transition-colors py-2 cursor-pointer font-medium text-[#5C554E]"
            >
              {currentLang === 'ar' ? 'مؤسس الشركة' : currentLang === 'en' ? 'Our Founder' : 'Kurucumuz'}
            </button>
          </nav>

          {/* Right Actions: Clean, Balanced and Mobile-Optimized */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Quick WhatsApp Action (Icon only on mobile, with text on desktop) */}
            <a
              href="https://wa.me/963995764573"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex items-center justify-center p-2 sm:px-3 sm:py-2 border border-[#1E7E45]/30 bg-[#F4FAF6] text-[#1E7E45] hover:bg-[#1E7E45] hover:text-white transition-all text-xs font-semibold tracking-wide shadow-2xs cursor-pointer rounded-xs"
              title="WhatsApp: +963 995 764 573"
            >
              <MessageSquare className="w-3.5 h-3.5 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="hidden sm:inline ms-1.5">{t.nav.whatsapp}</span>
            </a>

            {/* Quick Call Action (Icon only on mobile, with text on desktop) */}
            <a
              href="tel:+963995764573"
              aria-label="Direct Phone Call"
              className="inline-flex items-center justify-center p-2 sm:px-3 sm:py-2 bg-[#24201D] hover:bg-[#3D3732] text-white transition-all text-xs font-medium tracking-wider shadow-2xs cursor-pointer rounded-xs"
              title="Call: +963 995 764 573"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="hidden sm:inline ms-1.5">{t.nav.call}</span>
            </a>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 p-2 sm:px-2.5 sm:py-1.5 border border-[#E5DFD5] bg-[#FFFFFF] hover:border-[#9E7241] text-xs text-[#5C554E] hover:text-[#1C1917] transition-colors cursor-pointer shadow-2xs rounded-xs"
                id="language-dropdown-btn"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#9E7241]" />
                <span className="uppercase font-mono text-[10.5px] sm:text-[11px] font-semibold">{currentLang}</span>
                <ChevronDown className="w-2.5 h-2.5 text-[#78716A]" />
              </button>

              {langDropdownOpen && (
                <div 
                  className="absolute end-0 mt-1 w-32 bg-[#FFFFFF] border border-[#E5DFD5] shadow-lg py-1 z-50 animate-fadeIn"
                  onClick={() => setLangDropdownOpen(false)}
                >
                  <button
                    onClick={() => onLanguageChange('ar')}
                    className={`w-full px-3 py-2 text-start text-xs flex items-center justify-between hover:bg-[#FAF7F2] transition-colors cursor-pointer ${
                      currentLang === 'ar' ? 'text-[#9E7241] font-bold bg-[#FAF7F2]' : 'text-[#5C554E]'
                    }`}
                  >
                    <span>العربية</span>
                    {currentLang === 'ar' && <span className="w-1.5 h-1.5 rounded-full bg-[#9E7241]" />}
                  </button>

                  <button
                    onClick={() => onLanguageChange('en')}
                    className={`w-full px-3 py-2 text-start text-xs flex items-center justify-between hover:bg-[#FAF7F2] transition-colors cursor-pointer ${
                      currentLang === 'en' ? 'text-[#9E7241] font-bold bg-[#FAF7F2]' : 'text-[#5C554E]'
                    }`}
                  >
                    <span>English</span>
                    {currentLang === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-[#9E7241]" />}
                  </button>

                  <button
                    onClick={() => onLanguageChange('tr')}
                    className={`w-full px-3 py-2 text-start text-xs flex items-center justify-between hover:bg-[#FAF7F2] transition-colors cursor-pointer ${
                      currentLang === 'tr' ? 'text-[#9E7241] font-bold bg-[#FAF7F2]' : 'text-[#5C554E]'
                    }`}
                  >
                    <span>Türkçe</span>
                    {currentLang === 'tr' && <span className="w-1.5 h-1.5 rounded-full bg-[#9E7241]" />}
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden border border-[#E5DFD5] bg-[#FFFFFF] text-[#1C1917] hover:text-[#9E7241] hover:border-[#9E7241] transition-colors cursor-pointer rounded-xs"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-[#1C1917]" /> : <Menu className="w-4 h-4 text-[#1C1917]" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu - Clean, Organized, Intuitive */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E5DFD5] bg-[#FAF7F2] px-4 pt-3 pb-6 animate-fadeIn shadow-xl">
          {/* Main Navigation Links */}
          <div className="space-y-1.5">
            {/* 1. About Us */}
            <button
              onClick={() => handleNavClick('about')}
              className="w-full text-start py-3 px-4 bg-[#FFFFFF] border border-[#E8E2D8] hover:border-[#9E7241] text-xs uppercase tracking-wider text-[#1C1917] font-medium flex items-center justify-between transition-colors shadow-2xs rounded-xs"
            >
              <span>{t.nav.about || (currentLang === 'ar' ? 'من نحن' : 'About Us')}</span>
            </button>

            {/* 2. Product Catalogue */}
            <button
              onClick={() => handleNavClick('catalogue')}
              className="w-full text-start py-3 px-4 bg-[#FFFFFF] border border-[#E8E2D8] hover:border-[#9E7241] text-xs uppercase tracking-wider text-[#1C1917] font-bold flex items-center justify-between transition-colors shadow-2xs rounded-xs"
            >
              <span>{currentLang === 'ar' ? 'كتالوج المنتجات' : currentLang === 'en' ? 'Product Catalogue' : 'Ürün Kataloğu'}</span>
              <span className="text-[10px] text-[#9E7241] font-bold font-mono">41 Models</span>
            </button>

            {/* 3. Montaj guide and videos */}
            <button
              onClick={() => handleNavClick('installation')}
              className="w-full text-start py-3 px-4 bg-[#FFFFFF] border border-[#DDD5C7] hover:border-[#9E7241] text-xs uppercase tracking-wider text-[#9E7241] font-bold flex items-center justify-between transition-colors shadow-2xs rounded-xs"
            >
              <span className="flex items-center gap-2">
                <Film className="w-4 h-4 text-[#9E7241]" />
                <span>{currentLang === 'ar' ? 'دليل وفيديوهات التركيب' : currentLang === 'en' ? 'Installation Videos & Resources' : 'Montaj ve Uygulama Rehberi'}</span>
              </span>
              <span className="text-[10px] bg-[#9E7241]/10 text-[#9E7241] px-2 py-0.5 font-bold font-mono">6 Videos</span>
            </button>

            {/* 4. Lattakia Office */}
            <button
              onClick={() => handleNavClick('office')}
              className="w-full text-start py-3 px-4 bg-[#FFFFFF] border border-[#E8E2D8] hover:border-[#9E7241] text-xs uppercase tracking-wider text-[#1C1917] font-medium flex items-center justify-between transition-colors shadow-2xs rounded-xs"
            >
              <span>{t.nav.office}</span>
            </button>

            {/* 5. The Founder */}
            <button
              onClick={() => handleNavClick('founder')}
              className="w-full text-start py-3 px-4 bg-[#FFFFFF] border border-[#E8E2D8] hover:border-[#9E7241] text-xs uppercase tracking-wider text-[#1C1917] font-medium flex items-center justify-between transition-colors shadow-2xs rounded-xs"
            >
              <span>{currentLang === 'ar' ? 'مؤسس الشركة (المهندس يوسف حداد)' : currentLang === 'en' ? 'Our Founder' : 'Kurucumuz'}</span>
            </button>
          </div>

          {/* Quick Action Contact Cards */}
          <div className="pt-3 grid grid-cols-2 gap-2">
            <a
              href="https://wa.me/963995764573"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-[#1E7E45] hover:bg-[#186638] text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 shadow-xs transition-colors rounded-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t.nav.whatsapp}</span>
            </a>

            <a
              href="tel:+963995764573"
              className="py-2.5 px-3 bg-[#24201D] hover:bg-[#3D3732] text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 shadow-xs transition-colors rounded-xs"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.nav.call}</span>
            </a>
          </div>

          {/* Language Selector Bar inside Drawer */}
          <div className="mt-3 pt-3 border-t border-[#E8E2D8]">
            <span className="text-[10px] text-[#78716A] block mb-1.5 font-medium">
              {currentLang === 'ar' ? 'اللغة / Language:' : 'Language / Dil:'}
            </span>
            <div className="grid grid-cols-3 gap-1.5 text-center">
              <button
                onClick={() => onLanguageChange('ar')}
                className={`py-1.5 text-xs rounded-xs font-medium transition-colors cursor-pointer border ${
                  currentLang === 'ar' 
                    ? 'border-[#9E7241] bg-[#9E7241] text-white font-bold' 
                    : 'border-[#E0D7C9] bg-white text-[#5C554E] hover:border-[#9E7241]'
                }`}
              >
                العربية
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`py-1.5 text-xs rounded-xs font-medium transition-colors cursor-pointer border ${
                  currentLang === 'en' 
                    ? 'border-[#9E7241] bg-[#9E7241] text-white font-bold' 
                    : 'border-[#E0D7C9] bg-white text-[#5C554E] hover:border-[#9E7241]'
                }`}
              >
                English
              </button>
              <button
                onClick={() => onLanguageChange('tr')}
                className={`py-1.5 text-xs rounded-xs font-medium transition-colors cursor-pointer border ${
                  currentLang === 'tr' 
                    ? 'border-[#9E7241] bg-[#9E7241] text-white font-bold' 
                    : 'border-[#E0D7C9] bg-white text-[#5C554E] hover:border-[#9E7241]'
                }`}
              >
                Türkçe
              </button>
            </div>
          </div>

          {/* Quick Location & Shipping Hint */}
          <div className="mt-3 p-2.5 bg-[#FFFFFF] border border-[#E8E2D8] rounded-xs text-[11px] text-[#78716A] flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#9E7241] shrink-0" />
            <span className="leading-tight">
              {currentLang === 'ar' 
                ? 'اللاذقية • شحن وتوريد لكافة المحافظات السورية' 
                : 'Lattakia • Delivery across all Syrian cities'}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
