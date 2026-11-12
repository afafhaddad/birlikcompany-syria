import React from 'react';
import { Building2, ChevronDown } from 'lucide-react';
import { Language } from '../types';
import { FOUNDER_DATA } from '../data/founder';
import { useMedia } from '../context/MediaContext';
import { UI } from '../site';

const TEXT = {
  ar: { years: 'سنة خبرة', journey: 'المسيرة', projects: 'من أبرز المشاريع التي أشرف عليها', readMore: 'اقرأ السيرة الكاملة' },
  en: { years: 'years of experience', journey: 'The journey', projects: 'Landmark projects he led', readMore: 'Read the full story' },
  tr: { years: 'yıllık deneyim', journey: 'Yolculuk', projects: 'Yönettiği simge projeler', readMore: 'Tüm hikâyeyi okuyun' },
};

export const FounderSection: React.FC<{ currentLang: Language }> = ({ currentLang }) => {
  const { getFounderImageUrl } = useMedia();
  const t = TEXT[currentLang];
  const f = FOUNDER_DATA;

  return (
    <section id="founder" className="bg-ivory py-14 md:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Portrait */}
        <div className="lg:col-span-5 lg:sticky lg:top-28" data-reveal>
          <div className="relative rounded-3xl overflow-hidden bg-ink-soft aspect-[4/5] max-w-md mx-auto lg:max-w-none">
            <img
              src={getFounderImageUrl(f.defaultImage)}
              alt={f.name[currentLang]}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 pt-16 bg-gradient-to-t from-ink/95 to-transparent text-white">
              <p className="text-xl font-black">{f.name[currentLang]}</p>
              <p className="text-sm text-brass-light font-semibold mt-0.5">{f.title[currentLang]}</p>
            </div>
            <div className="absolute top-4 start-4 rounded-2xl bg-brass text-ink px-4 py-2.5 text-center shadow-lg">
              <p className="text-2xl font-black leading-none tabular-nums">
                <bdi dir="ltr">{f.experienceYears}</bdi>
              </p>
              <p className="text-[11px] font-bold mt-1">{t.years}</p>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="lg:col-span-7 min-w-0" data-reveal>
          <p className="flex items-center gap-2 text-sm font-bold text-brass-deep mb-2">
            <span className="w-6 h-0.5 bg-current" />
            {UI.founder[currentLang]}
          </p>
          <h2 className="text-3xl sm:text-4xl font-black leading-tight">{f.name[currentLang]}</h2>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-muted">{f.subtitle[currentLang]}</p>

          {/* Journey timeline */}
          <h3 className="mt-8 text-lg font-black">{t.journey}</h3>
          <ol className="mt-4 relative border-s-2 border-line ms-2 space-y-6">
            {f.keyHighlights[currentLang].map((h) => (
              <li key={h.label} className="relative ps-6">
                <span className="absolute -start-[9px] top-1 w-4 h-4 rounded-full bg-brass ring-4 ring-ivory" />
                <p className="font-extrabold text-ink">{h.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{h.desc}</p>
              </li>
            ))}
          </ol>

          {/* Projects */}
          <h3 className="mt-8 text-lg font-black">{t.projects}</h3>
          <ul className="mt-4 grid sm:grid-cols-2 gap-3">
            {f.projects.map((p) => (
              <li key={p.name.en} className="flex gap-3 rounded-2xl bg-white border border-line p-4">
                <span className="w-10 h-10 rounded-full bg-sand text-brass-deep flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-extrabold text-sm text-ink leading-snug">{p.name[currentLang]}</span>
                  <span className="block mt-1 text-xs leading-relaxed text-muted">{p.tag[currentLang]}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* Full biography, collapsed by default (still in the page for search engines) */}
          <details className="group mt-6 rounded-2xl bg-white border border-line">
            <summary className="flex items-center justify-between gap-3 p-4 cursor-pointer list-none font-bold text-sm [&::-webkit-details-marker]:hidden">
              {t.readMore}
              <ChevronDown className="w-4 h-4 text-muted transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-4 pb-5 space-y-4 text-sm sm:text-[15px] leading-loose text-ink/85">
              {f.paragraphs[currentLang].map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
};
