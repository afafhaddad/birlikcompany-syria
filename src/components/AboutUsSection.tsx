import React from 'react';
import { ArrowLeft, ArrowRight, Compass, MessageSquare, Sprout, Truck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { Link } from '../router';
import { catalogueRoute } from '../routing';
import { whatsappLink } from '../site';

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

export const AboutUsSection: React.FC<{ currentLang: Language }> = ({ currentLang }) => {
  const a = TRANSLATIONS[currentLang].about;
  const t = TEXT[currentLang];
  const Arrow = currentLang === 'ar' ? ArrowLeft : ArrowRight;

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
    <section id="about" className="bg-ink text-white py-14 md:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-end">
          <div className="lg:col-span-7" data-reveal>
            <p className="flex items-center gap-2 text-sm font-bold text-brass-light mb-2">
              <span className="w-6 h-0.5 bg-current" />
              {a.badge}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight text-balance">{a.title}</h2>
          </div>

          {/* Stats */}
          <dl className="lg:col-span-5 grid grid-cols-3 gap-3" data-reveal>
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/5 border border-white/10 p-3 sm:p-4 text-center">
                <dd className="text-2xl sm:text-4xl font-black text-brass-light tabular-nums">{s.value}</dd>
                <dt className="mt-1 text-[11px] sm:text-xs leading-snug text-white/70">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Three pillars */}
        <div className="mt-10 grid md:grid-cols-3 gap-4 md:gap-5">
          {pillars.map(({ icon: Icon, title, body }, i) => (
            <article
              key={title}
              className="rounded-3xl bg-white/5 border border-white/10 p-5 sm:p-6"
              data-reveal
              style={{ '--reveal-delay': `${i * 80}ms` } as React.CSSProperties}
            >
              <span className="w-11 h-11 rounded-full bg-brass/20 text-brass-light flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </span>
              <h3 className="mt-4 text-lg font-black">{title}</h3>
              <p className="mt-2 text-sm leading-loose text-white/75">{body}</p>
            </article>
          ))}
        </div>

        {/* Audiences + actions */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6" data-reveal>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-white/60 me-1">{t.serve}:</span>
            {a.audiences.map((x) => (
              <span key={x} className="px-3.5 py-1.5 rounded-full border border-white/20 text-sm font-semibold text-white/90">
                {x}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to={catalogueRoute(currentLang)}
              className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-brass hover:bg-brass-light text-ink font-extrabold text-sm transition-colors"
            >
              {a.exploreCatalogBtn}
              <Arrow className="w-4 h-4" />
            </Link>
            <a
              href={whatsappLink(t.visitMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-wa hover:bg-wa-deep text-white font-bold text-sm transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              {a.freeSamplesBtn}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
