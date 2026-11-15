import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import { Language } from '../types';
import { SOCIAL_PROFILES } from '../site';
import { track } from '../analytics';

const LINKS = [
  { id: 'facebook', name: 'Facebook', href: SOCIAL_PROFILES[0], Icon: Facebook },
  { id: 'instagram', name: 'Instagram', href: SOCIAL_PROFILES[1], Icon: Instagram },
] as const;

const FOLLOW: Record<Language, string> = { ar: 'تابعونا', en: 'Follow us', tr: 'Bizi takip edin' };

/** Facebook and Instagram buttons (footer and phone menu). */
export const SocialLinks: React.FC<{ currentLang: Language; variant?: 'footer' | 'menu' }> = ({ currentLang, variant = 'footer' }) => (
  <div className={variant === 'menu' ? 'flex items-center justify-center gap-3' : 'flex flex-wrap items-center gap-2.5'}>
    {variant === 'footer' && <span className="text-[11px] text-[#FAF7F2] font-semibold me-1">{FOLLOW[currentLang]}</span>}
    {LINKS.map(({ id, name, href, Icon }) => (
      <a
        key={id}
        href={href}
        target="_blank"
        rel="noopener noreferrer me"
        aria-label={`${FOLLOW[currentLang]} — ${name}`}
        onClick={() => track('social_click', { network: id })}
        className={
          variant === 'menu'
            ? 'inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white/85 text-sm font-bold hover:bg-white/10'
            : 'inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#292420] border border-[#3D352F] text-[#DFC08A] text-xs font-bold hover:border-[#9E7241] hover:text-white transition-colors'
        }
      >
        <Icon className="w-4 h-4" />
        {name}
      </a>
    ))}
  </div>
);
