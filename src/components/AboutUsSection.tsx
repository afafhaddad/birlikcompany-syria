import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, Compass, MessageSquare, Sprout, Truck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Link } from '../router';
import { catalogueRoute } from '../routing';
import { whatsappLink } from '../site';
import { useCountUp, useInView, useScrollProgress } from '../hooks/scroll';

const TEXT = {
  ar: {
    serve: 'نخدم',
    visitMsg: 'مرحباً شركة بيرليك، أود حجز موعد لزيارة مقركم في اللاذقية لمعاينة الخامات واستلام عينات مجانية لمشروعي.',
  },
  en: {
    serve: 'We serve',
    visitMsg: 'Hello Birlik Company, I would like to book a visit to your Lattakia showroom to view materials and collect free samples.',
  },
  tr: {
    serve: 'Hizmet verdiklerimiz',
    visitMsg: 'Merhaba Birlik Şirketi, Lazkiye showroomunuzu ziyaret edip malzemeleri incelemek ve ücretsiz numune almak istiyorum.',
  },
};

const Stat: React.FC<{ value: string; label: string; run: boolean; delay: number }> = ({ value, label, run, delay }) => {
  const shown = useCountUp(value, run, 1300 + delay);
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-3 sm:p-5 text-center backdrop-blur-sm">
      <dd className="text-2xl sm:text-5xl font-black text-brass-light tabular-nums">{shown}</dd>
      <dt className="mt-1 text-[11px] sm:text-xs leading-snug text-white/70">{label}</dt>
    </div>
  );
};

export const AboutUsSection: React.FC<{ currentLang: Language }> = ({ currentLang }) => {
  const a = TRANSLATIONS[currentLang].about;
  const t = TEXT[currentLang];
  const Arrow = currentLang === 'ar' ? ArrowLeft : ArrowRight;
  const ref = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDListElement>(null);
  const p = useScrollProgress(ref);
  const statsSeen = useInView(statsRef);

  const stats = [
    { value: a.stats.established, label: a.stats.establishedLabel },
    { value: a.stats.syriaBranch, label: a.stats.syriaBranchLabel },
    { value: a.stats.coverage, label: a.stats.coverageLabel },
  ];
  const pillars = [
    { icon: Sprout, title: a.p1Title, body: a.p1 },
    { icon: Compass, title: a.p2Title, body: a.p2 },
    { icon: Truck, title: a.p3Title, body: a.p3 },
  ];

  return (
    <section id="about" ref={ref} className="relative bg-ink text-white py-16 md:py-28 overflow-hidden">
      {/* Giant brand word drifting sideways as you scroll */}
      <p
        aria-hidden="true"
        dir="ltr"
        className="pointer-events-none select-none absolute top-6 md:top-10 left-0 whitespace-nowrap text-[22vw] md:text-[15vw] font-black leading-none text-transparent [-webkit-text-stroke:1px_rgba(223,192,138,.14)] will-change-transform"
        style={{ transform: `translateX(${(0.5 - p) * 40}%)` }}
      >
        BIRLIK · BİRLİK · بيرليك
      </p>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end">
          <div className="lg:col-span-7" data-reveal>
            <p className="flex items-center gap-2 text-sm font-bold text-brass-light mb-2">
              <span className="w-6 h-0.5 bg-current" />
              {a.badge}
            </p>
            <h2 className="text-3xl sm:text-5xl font-black leading-tight text-balance">{a.title}</h2>
          </div>

          <dl ref={statsRef} className="lg:col-span-5 grid grid-cols-3 gap-3">
            {stats.map((s, i) => (
              <Stat key={s.label} value={s.value} label={s.label} run={statsSeen} delay={i * 200} />
            ))}
          </dl>
        </div>

        {/* Pillars: each rises at its own pace while scrolling */}
        <div className="mt-12 grid md:grid-cols-3 gap-4 md:gap-5">
          {pillars.map(({ icon: Icon, title, body }, i) => (
            <article
              key={title}
              className="group relative rounded-3xl bg-gradient-to-b from-white/[.07] to-white/[.02] border border-white/10 hover:border-brass/50 p-6 sm:p-7 transition-colors will-change-transform"
              style={{ transform: `translateY(${(0.5 - p) * (i + 1) * 28}px)` }}
            >
              <span className="absolute top-5 end-6 text-5xl font-black text-white/[.06] tabular-nums">0{i + 1}</span>
              <span className="w-12 h-12 rounded-2xl bg-brass/20 text-brass-light flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6">
                <Icon className="w-6 h-6" />
              </span>
              <h3 className="mt-5 text-xl font-black">{title}</h3>
              <p className="mt-2 text-sm leading-loose text-white/75">{body}</p>
            </article>
          ))}
        </div>
      </div>

      {/* Audiences as a slow, endless ribbon */}
      <div className="relative mt-14 border-y border-white/10 py-4 overflow-hidden" aria-label={t.serve}>
        <div dir="ltr" className="flex w-max motion-safe:animate-marquee">
          {[0, 1].map((k) => (
            <div key={k} className="flex items-center shrink-0" aria-hidden={k === 1}>
              {[...a.audiences, ...a.audiences].map((x, i) => (
                <span key={`${k}-${i}`} className="flex items-center gap-6 px-6 text-lg sm:text-2xl font-black text-white/85 whitespace-nowrap">
                  {x}
                  <span className="w-2 h-2 rotate-45 bg-brass" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mt-10 flex flex-col sm:flex-row gap-3 justify-center" data-reveal>
        <Link
          to={catalogueRoute(currentLang)}
          className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-brass hover:bg-brass-light text-ink font-extrabold text-sm transition-colors"
        >
          {a.exploreCatalogBtn}
          <Arrow className="w-4 h-4" />
        </Link>
        <a
          href={whatsappLink(t.visitMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-wa hover:bg-wa-deep text-white font-bold text-sm transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          {a.freeSamplesBtn}
        </a>
      </div>
    </section>
  );
};
