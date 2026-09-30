import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Globe,
  Mail,
  Clock,
  ExternalLink,
  Lock
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (sectionId: string) => void;
  onOpenAdminLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onLanguageChange,
  onNavigate,
  onOpenAdminLogin
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <footer className="bg-[#1F1B18] text-[#A69C91] border-t border-[#2F2925] pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#2F2925]">
          
          {/* Brand Info with Banner Starting from Top of Footer */}
          <div className="md:col-span-5 flex flex-col items-start space-y-4">
            {/* White Banner Plaque starting flush from top, snugly framing the logo */}
            <div className="w-fit bg-[#FFFFFF] px-2.5 sm:px-3.5 pt-3.5 sm:pt-4 pb-3 rounded-b-md shadow-xl border-b-3 border-[#D4991A] border-x border-[#DDD5C7] inline-flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Birlik Logo" 
                className="h-16 sm:h-20 md:h-22 w-auto object-contain max-w-[220px] sm:max-w-[260px]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              <Building2 className="w-6 h-6 text-[#9E7241] hidden" />
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-[#A69C91] max-w-sm font-light pt-1">
              {t.footer.tagline}
            </p>

            {/* Language Selector */}
            <div className="flex items-center gap-2 text-xs pt-1">
              <Globe className="w-3.5 h-3.5 text-[#9E7241]" />
              <button 
                onClick={() => onLanguageChange('ar')} 
                className={`px-2.5 py-1 border transition-colors cursor-pointer ${currentLang === 'ar' ? 'border-[#9E7241] text-[#9E7241] bg-[#292420]' : 'border-[#3D352F] text-[#8C8278] hover:text-white'}`}
              >
                عربي
              </button>
              <button 
                onClick={() => onLanguageChange('en')} 
                className={`px-2.5 py-1 border transition-colors cursor-pointer ${currentLang === 'en' ? 'border-[#9E7241] text-[#9E7241] bg-[#292420]' : 'border-[#3D352F] text-[#8C8278] hover:text-white'}`}
              >
                EN
              </button>
              <button 
                onClick={() => onLanguageChange('tr')} 
                className={`px-2.5 py-1 border transition-colors cursor-pointer ${currentLang === 'tr' ? 'border-[#9E7241] text-[#9E7241] bg-[#292420]' : 'border-[#3D352F] text-[#8C8278] hover:text-white'}`}
              >
                TR
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3 text-xs pt-4 sm:pt-6 md:pt-10">
            <span className="text-[11px] uppercase tracking-widest text-[#FAF7F2] font-semibold block">
              {currentLang === 'ar' ? 'أقسام الموقع' : 'Navigation'}
            </span>
            <ul className="space-y-2 text-[#A69C91]">
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-[#9E7241] transition-colors cursor-pointer"
                >
                  {t.nav.about || (currentLang === 'ar' ? 'من نحن' : 'About Us')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('catalogue')} 
                  className="hover:text-[#9E7241] transition-colors cursor-pointer"
                >
                  {currentLang === 'ar' ? 'كتالوج المنتجات' : currentLang === 'en' ? 'Product Catalogue' : 'Ürün Kataloğu'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('installation')} 
                  className="hover:text-[#9E7241] transition-colors cursor-pointer text-[#D4AF37]"
                >
                  {currentLang === 'ar' ? 'دليل وفيديوهات التركيب' : currentLang === 'en' ? 'Installation Video Guides' : 'Montaj ve Uygulama Rehberi'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('office')} 
                  className="hover:text-[#9E7241] transition-colors cursor-pointer"
                >
                  {t.nav.office}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('founder')} 
                  className="hover:text-[#9E7241] transition-colors cursor-pointer"
                >
                  {currentLang === 'ar' ? 'مؤسس الشركة' : currentLang === 'en' ? 'Our Founder' : 'Kurucumuz'}
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contacts */}
          <div className="md:col-span-4 space-y-3 text-xs pt-4 sm:pt-6 md:pt-10">
            <span className="text-[11px] uppercase tracking-widest text-[#FAF7F2] font-semibold block">
              {currentLang === 'ar' ? 'المقر الرئيسي والتواصل' : 'Headquarters & Contacts'}
            </span>
            <div className="space-y-2 text-[#A69C91]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#9E7241] shrink-0 mt-0.5" />
                <div>
                  <span className="block leading-relaxed">{t.office.addressValue}</span>
                  <a
                    href="https://maps.google.com/?q=35.510707,35.774618"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#D4AF37] hover:underline mt-1 font-mono"
                  >
                    <span>GQ6F+7VJ, Latakia (Google Maps)</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#9E7241] shrink-0" />
                <span className="text-[11px]">{t.office.hoursValue}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <a 
                  href="https://wa.me/963995764573" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] font-mono"
                  dir="ltr"
                >
                  +963 995 764 573 (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#9E7241] shrink-0" />
                <a 
                  href="tel:+963995764573" 
                  className="hover:text-[#9E7241] font-mono"
                  dir="ltr"
                >
                  +963 995 764 573 (Direct)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#9E7241] shrink-0" />
                <a 
                  href="mailto:info@birlik-insaat.com" 
                  className="hover:text-[#9E7241] font-mono"
                >
                  info@birlik-insaat.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7A7167]">
          <p>{t.footer.copyright}</p>
          
          <div className="mt-2 sm:mt-0 flex items-center gap-3 text-[#8C8278]">
            <span>{currentLang === 'ar' ? 'اللاذقية • الجمهورية العربية السورية' : 'Lattakia • Syrian Arab Republic'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
