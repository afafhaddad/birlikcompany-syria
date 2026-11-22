import React from 'react';
import { Calculator, Home, LayoutGrid, MessageSquare, PlayCircle } from 'lucide-react';
import { Language } from '../types';
import { Link, useRouter } from '../router';
import { calculatorRoute, catalogueRoute, homeRoute, installationRoute } from '../routing';
import { UI } from '../site';

export const CALC_LABEL: Record<Language, string> = { ar: 'احسب كميتك', en: 'Calculator', tr: 'Hesapla' };

/**
 * App-style bottom navigation for phones. The centre button is always WhatsApp;
 * on a product page it carries that product's price question.
 */
export const MobileTabBar: React.FC<{ currentLang: Language; whatsappHref: string; whatsappLabel: string }> = ({
  currentLang,
  whatsappHref,
  whatsappLabel,
}) => {
  const { route } = useRouter();
  const inCatalogue = route.view === 'catalogue' || route.view === 'category' || route.view === 'product';
  const item = (active: boolean) =>
    `flex flex-col items-center justify-center gap-0.5 h-full text-[10.5px] font-bold transition-colors ${
      active ? 'text-brass-deep' : 'text-muted'
    }`;

  return (
    <nav
      aria-label={UI.menu[currentLang]}
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-line shadow-[0_-4px_20px_rgba(21,18,15,0.08)] pb-safe"
    >
      <div className="grid grid-cols-5 h-16 items-stretch">
        <Link to={homeRoute(currentLang)} className={item(route.view === 'home')}>
          <Home className="w-5 h-5" />
          {UI.home[currentLang]}
        </Link>
        <Link to={catalogueRoute(currentLang)} className={item(inCatalogue)}>
          <LayoutGrid className="w-5 h-5" />
          {UI.catalogue[currentLang]}
        </Link>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          id="whatsapp-floating-btn"
          className="relative flex flex-col items-center justify-end pb-1.5 text-[10.5px] font-extrabold text-wa"
        >
          <span className="absolute -top-5 w-14 h-14 rounded-full bg-wa text-white flex items-center justify-center shadow-lg ring-4 ring-white">
            <MessageSquare className="w-6 h-6" />
          </span>
          {whatsappLabel}
        </a>
        <Link to={installationRoute(currentLang)} className={item(route.view === 'installation')}>
          <PlayCircle className="w-5 h-5" />
          {UI.installation[currentLang]}
        </Link>
        {/* Calculator users are the ones who end up messaging, so it gets a permanent tab */}
        <Link to={calculatorRoute(currentLang)} className={item(route.view === 'calculator')}>
          <Calculator className="w-5 h-5" />
          {CALC_LABEL[currentLang]}
        </Link>
      </div>
    </nav>
  );
};

/** Desktop-only floating WhatsApp button (phones use the tab bar). */
export const DesktopWhatsApp: React.FC<{ href: string; label: string }> = ({ href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="hidden md:inline-flex fixed bottom-6 end-6 z-40 items-center gap-2.5 ps-4 pe-5 py-3.5 rounded-full bg-wa hover:bg-wa-deep text-white font-bold shadow-xl transition-colors"
  >
    <MessageSquare className="w-5 h-5" />
    {label}
  </a>
);
