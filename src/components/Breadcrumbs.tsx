import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { Link } from '../router';
import { Route, homeRoute } from '../routing';
import { UI } from '../site';

export const Breadcrumbs: React.FC<{
  currentLang: Language;
  items: Array<{ label: string; to?: Route }>;
  dark?: boolean;
}> = ({ currentLang, items, dark }) => {
  const Sep = currentLang === 'ar' ? ChevronLeft : ChevronRight;
  const link = dark ? 'text-white/65 hover:text-white' : 'text-muted hover:text-ink';
  return (
    <nav aria-label="Breadcrumb" className="text-xs sm:text-sm font-semibold overflow-x-auto whitespace-nowrap" style={{ scrollbarWidth: 'none' }}>
      <ol className="flex items-center gap-1.5">
        <li>
          <Link to={homeRoute(currentLang)} className={link}>
            {UI.home[currentLang]}
          </Link>
        </li>
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <Sep className={`w-3.5 h-3.5 ${dark ? 'text-white/35' : 'text-line'}`} />
            {it.to ? (
              <Link to={it.to} className={link}>
                {it.label}
              </Link>
            ) : (
              <span className={dark ? 'text-brass-light' : 'text-ink'} aria-current="page">
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
