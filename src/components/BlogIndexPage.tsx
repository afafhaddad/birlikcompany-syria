import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { ARTICLES } from '../data/articles';
import { Breadcrumbs } from './Breadcrumbs';
import { SectionHeading } from './cards';
import { ArticleCard } from './ArticlePage';
import { Link } from '../router';
import { blogRoute } from '../routing';
import { UI } from '../site';

const TEXT = {
  ar: {
    sub: 'أدلة مفصّلة عن كل مادة نوفّرها: مم تُصنع، مميزاتها، متانتها، أين تُستخدم وكيف تُركَّب — لتختار عن معرفة.',
    homeTitle: 'تعرّف على المواد قبل أن تختار',
    homeSub: 'دليل لكل مادة: التصنيع، المميزات، الاستخدام والتركيب.',
    all: 'كل الأدلة',
  },
  en: {
    sub: 'In-depth guides to every material we supply: what it is made of, its benefits and durability, where to use it and how it is installed.',
    homeTitle: 'Know the materials before you choose',
    homeSub: 'A guide for every material: manufacture, benefits, uses and installation.',
    all: 'All guides',
  },
  tr: {
    sub: 'Sunduğumuz her malzeme için ayrıntılı rehberler: neyden üretilir, avantajları, dayanıklılığı, kullanım alanları ve montajı.',
    homeTitle: 'Seçmeden önce malzemeleri tanıyın',
    homeSub: 'Her malzeme için bir rehber: üretim, avantajlar, kullanım ve montaj.',
    all: 'Tüm rehberler',
  },
};

export const BlogIndexPage: React.FC<{ currentLang: Language }> = ({ currentLang }) => (
  <div className="pt-16 md:pt-[4.5rem]">
    <section className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-6 pb-10 md:pb-14">
        <Breadcrumbs dark currentLang={currentLang} items={[{ label: UI.blog[currentLang] }]} />
        <div className="mt-6">
          <SectionHeading as="h1" dark eyebrow="Birlik" title={UI.blog[currentLang]} sub={TEXT[currentLang].sub} />
        </div>
      </div>
    </section>
    <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 md:py-14">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ARTICLES.map((a, i) => (
          <div key={a.slug} data-reveal style={{ '--reveal-delay': `${(i % 3) * 80}ms` } as React.CSSProperties}>
            <ArticleCard meta={a} currentLang={currentLang} />
          </div>
        ))}
      </div>
    </section>
  </div>
);

/** Home-page teaser: three guides and a link to all of them. */
export const GuidesTeaser: React.FC<{ currentLang: Language }> = ({ currentLang }) => {
  const t = TEXT[currentLang];
  const Arrow = currentLang === 'ar' ? ArrowLeft : ArrowRight;
  return (
    <section id="guides" className="bg-sand/50 py-14 md:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeading eyebrow={UI.blog[currentLang]} title={t.homeTitle} sub={t.homeSub} />
          <Link
            to={blogRoute(currentLang)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-ink hover:bg-ink-soft text-white font-extrabold text-sm transition-colors shrink-0"
          >
            {t.all}
            <Arrow className="w-4 h-4 text-brass-light" />
          </Link>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ARTICLES.slice(0, 3).map((a, i) => (
            <div key={a.slug} data-reveal style={{ '--reveal-delay': `${i * 80}ms` } as React.CSSProperties}>
              <ArticleCard meta={a} currentLang={currentLang} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
