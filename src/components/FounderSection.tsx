import React, { useRef } from 'react';
import { reduced, useCountUp, useInView, useScrollProgress } from '../hooks/scroll';
import { optimizeImage } from '../utils/optimizeImage';
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
  const { getFounderImageUrl, registry } = useMedia();
  const t = TEXT[currentLang];
  const f = FOUNDER_DATA;
  const ref = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLOListElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(ref);
  const tl = useScrollProgress(timelineRef);
  const years = useCountUp(f.experienceYears, useInView(badgeRef));
  // The timeline line fills while the list passes the middle of the screen
  const fill = reduced() ? 1 : Math.min(1, Math.max(0, (tl - 0.25) / 0.45));
  const items = f.keyHighlights[currentLang];

  return (
    <section id="founder" ref={ref} className="bg-ivory py-16 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Portrait with a slow parallax */}
        <div className="lg:col-span-5 lg:sticky lg:top-28" data-reveal>
          <div className="relative rounded-[32px] overflow-hidden bg-ink-soft aspect-[4/5] max-w-md mx-auto lg:max-w-none shadow-2xl">
            <img
              src={getFounderImageUrl(f.defaultImage)}
              srcSet={`${optimizeImage(registry.founder || f.defaultImage, 640, 65)} 640w, ${optimizeImage(registry.founder || f.defaultImage, 1080, 65)} 1080w`}
              sizes="(min-width: 1024px) 570px, 92vw"
              alt={f.name[currentLang]}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-[118%] object-cover will-change-transform"
              style={{ transform: `translateY(${-p * 15}%)` }}
            />
            <div className="absolute inset-x-0 bottom-0 p-5 pt-16 bg-gradient-to-t from-ink/95 to-transparent text-white">
              <p className="text-xl font-black">{f.name[currentLang]}</p>
              <p className="text-sm text-brass-light font-semibold mt-0.5">{f.title[currentLang]}</p>
            </div>
            <div ref={badgeRef} className="absolute top-4 start-4 rounded-2xl bg-brass text-ink px-4 py-2.5 text-center shadow-lg">
              <p className="text-3xl font-black leading-none tabular-nums">
                <bdi dir="ltr">{years}</bdi>
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
          {/* Journey: the line fills and each step lights up as you scroll past it */}
          <ol ref={timelineRef} className="mt-5 relative ms-2 space-y-7">
            <span className="absolute -start-px top-1 bottom-1 w-0.5 bg-line" aria-hidden />
            <span
              className="absolute -start-px top-1 w-0.5 bg-brass origin-top transition-[height] duration-150"
              style={{ height: `calc(${fill * 100}% - 0.5rem)` }}
              aria-hidden
            />
            {items.map((h, i) => {
              const lit = fill >= (i + 0.2) / items.length;
              return (
                <li key={h.label} className={`relative ps-7 transition-all duration-500 ${lit ? 'opacity-100 translate-x-0' : 'opacity-50 rtl:translate-x-1 ltr:-translate-x-1'}`}>
                  <span
                    className={`absolute -start-[9px] top-1 w-4 h-4 rounded-full ring-4 ring-ivory transition-all duration-500 ${
                      lit ? 'bg-brass scale-110 shadow-[0_0_0_6px_rgba(185,138,69,.18)]' : 'bg-line'
                    }`}
                  />
                  <p className="font-extrabold text-ink text-[17px]">{h.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{h.desc}</p>
                </li>
              );
            })}
          </ol>

          {/* Projects: a swipeable rail */}
          <h3 className="mt-10 text-lg font-black">{t.projects}</h3>
          <ul className="mt-4 snap-rail gap-3 -mx-5 px-5 sm:mx-0 sm:px-0 pb-2 scroll-px-5">
            {f.projects.map((pr, i) => (
              <li
                key={pr.name.en}
                style={{ scrollSnapAlign: 'start' }}
                className="group shrink-0 w-[72%] sm:w-[46%] rounded-3xl bg-white border border-line hover:border-brass p-5 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="flex items-center justify-between">
                  <span className="w-11 h-11 rounded-2xl bg-ink text-brass-light flex items-center justify-center transition-transform group-hover:rotate-6">
                    <Building2 className="w-5 h-5" />
                  </span>
                  <span className="text-3xl font-black text-ink/[.07] tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                </span>
                <span className="mt-4 block font-extrabold text-[15px] text-ink leading-snug">{pr.name[currentLang]}</span>
                <span className="block mt-1.5 text-xs leading-relaxed text-muted">{pr.tag[currentLang]}</span>
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
