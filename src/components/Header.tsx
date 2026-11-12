import React, { useEffect, useState } from 'react';
import { Menu, X, Phone, MessageSquare, MapPin } from 'lucide-react';
import { Language } from '../types';
import { useRouter } from '../router';
import { buildPath, sectionPath } from '../routing';
import { PHONE_DISPLAY, TEL_HREF, UI, whatsappLink } from '../site';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (sectionId: string) => void;
}

const LANG_LABEL: Record<Language, string> = { ar: 'عربي', en: 'EN', tr: 'TR' };
const LANG_FULL: Record<Language, string> = { ar: 'العربية', en: 'English', tr: 'Türkçe' };

export const Header: React.FC<HeaderProps> = ({ currentLang, onLanguageChange, onNavigate }) => {
  const { route } = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overHero = route.view === 'home' && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll while the full-screen menu is open; close it on navigation
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);
  useEffect(() => setOpen(false), [route]);

  const links: Array<{ id: string; label: string }> = [
    { id: 'catalogue', label: UI.catalogueLong[currentLang] },
    { id: 'installation', label: UI.installationLong[currentLang] },
    { id: 'about', label: UI.about[currentLang] },
    { id: 'founder', label: UI.founder[currentLang] },
    { id: 'office', label: UI.showroomLong[currentLang] },
  ];

  const go = (id: string) => (e: React.MouseEvent) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    setOpen(false);
    onNavigate(id);
  };

  const langLink = (l: Language, className: string, label: string) => (
    <a
      key={l}
      href={buildPath({ ...route, lang: l })}
      hrefLang={l}
      aria-current={l === currentLang ? 'true' : undefined}
      onClick={(e) => {
        e.preventDefault();
        onLanguageChange(l);
      }}
      className={className}
    >
      {label}
    </a>
  );

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
          overHero
            ? 'bg-gradient-to-b from-ink/70 to-transparent text-white'
            : 'bg-ivory/90 backdrop-blur-md text-ink border-b border-line/70 shadow-[0_1px_12px_rgba(21,18,15,0.06)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-[4.5rem] flex items-center justify-between gap-3">
          {/* Logo */}
          <a
            href={sectionPath(currentLang, 'hero')}
            onClick={go('hero')}
            aria-label="Birlik Company"
            className="flex items-center gap-2.5 shrink-0"
          >
            <span className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-white shadow-sm ring-1 ring-black/5 flex items-center justify-center overflow-hidden">
              <img src="/logo-192.png" alt="Birlik Company" width={48} height={48} className="w-full h-full object-contain" />
            </span>
            <span className="hidden sm:block leading-tight">
              <span className="block font-extrabold text-[15px]">{currentLang === 'ar' ? 'شركة بيرليك' : 'Birlik Company'}</span>
              <span className={`block text-[11px] ${overHero ? 'text-white/75' : 'text-muted'}`}>
                {currentLang === 'ar' ? 'مواد الإكساء والديكور' : currentLang === 'tr' ? 'Kaplama ve dekor' : 'Cladding & décor'}
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold">
            {links.map((l) => (
              <a
                key={l.id}
                href={sectionPath(currentLang, l.id)}
                onClick={go(l.id)}
                className={`relative py-2 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-brass after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-center ${
                  overHero ? 'text-white/90 hover:text-white' : 'text-ink/80 hover:text-ink'
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <div
              className={`hidden md:flex items-center rounded-full p-0.5 text-xs font-bold ${
                overHero ? 'bg-white/15 backdrop-blur-sm' : 'bg-sand'
              }`}
            >
              {(['ar', 'en', 'tr'] as Language[]).map((l) =>
                langLink(
                  l,
                  `px-3 py-1.5 rounded-full transition-colors ${
                    l === currentLang ? 'bg-brass text-ink' : overHero ? 'text-white/85 hover:text-white' : 'text-muted hover:text-ink'
                  }`,
                  LANG_LABEL[l]
                )
              )}
            </div>

            <a
              href={whatsappLink(UI.generalWhatsApp[currentLang])}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-wa hover:bg-wa-deep text-white text-sm font-bold transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              {UI.whatsapp[currentLang]}
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={UI.menu[currentLang]}
              aria-expanded={open}
              className={`lg:hidden inline-flex items-center gap-2 h-11 px-3.5 rounded-full text-sm font-bold transition-colors ${
                overHero ? 'bg-white/15 backdrop-blur-sm text-white' : 'bg-ink text-white'
              }`}
            >
              <Menu className="w-5 h-5" />
              <span>{UI.menu[currentLang]}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-ink text-white flex flex-col animate-fade-in lg:hidden" role="dialog" aria-modal="true">
          <div className="h-16 px-4 flex items-center justify-between shrink-0">
            <span className="w-11 h-11 rounded-xl bg-white flex items-center justify-center overflow-hidden">
              <img src="/logo-192.png" alt="" width={44} height={44} className="w-full h-full object-contain" />
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={UI.close[currentLang]}
              className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 pt-4">
            {[{ id: 'hero', label: UI.home[currentLang] }, ...links].map((l, i) => (
              <a
                key={l.id}
                href={sectionPath(currentLang, l.id)}
                onClick={go(l.id)}
                style={{ animationDelay: `${i * 45}ms` }}
                className="flex items-baseline gap-4 py-3.5 border-b border-white/10 text-2xl font-extrabold animate-fade-up"
              >
                <span className="text-xs font-bold text-brass-light tabular-nums" dir="ltr">
                  0{i + 1}
                </span>
                {l.label}
              </a>
            ))}

            <div className="mt-6 flex gap-2">
              {(['ar', 'en', 'tr'] as Language[]).map((l) =>
                langLink(
                  l,
                  `flex-1 text-center py-2.5 rounded-full text-sm font-bold border ${
                    l === currentLang ? 'bg-brass border-brass text-ink' : 'border-white/20 text-white/85'
                  }`,
                  LANG_FULL[l]
                )
              )}
            </div>
          </nav>

          <div className="shrink-0 px-6 pt-4 pb-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <a
                href={whatsappLink(UI.generalWhatsApp[currentLang])}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 rounded-full bg-wa text-white font-bold"
              >
                <MessageSquare className="w-5 h-5" />
                {UI.whatsapp[currentLang]}
              </a>
              <a href={TEL_HREF} className="flex items-center justify-center gap-2 py-3.5 rounded-full bg-white text-ink font-bold">
                <Phone className="w-5 h-5" />
                {UI.call[currentLang]}
              </a>
            </div>
            <p className="flex flex-wrap items-center justify-center gap-x-2 text-xs text-white/60">
              <MapPin className="w-3.5 h-3.5" />
              <span>{currentLang === 'ar' ? 'اللاذقية • توصيل لكل المحافظات السورية' : 'Lattakia • Delivery across Syria'}</span>
              <span dir="ltr">{PHONE_DISPLAY}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};
