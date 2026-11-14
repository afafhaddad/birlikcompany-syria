import React from 'react';
import { Language } from '../types';
import { CATEGORY_CARDS } from '../data/categoryCards';
import { PRODUCT_MODELS } from '../data/products';
import { CategoryTile, SectionHeading } from './cards';
import { Breadcrumbs } from './Breadcrumbs';
import { CatalogueDownload } from './CatalogueDownload';
import { UI } from '../site';

const TEXT = {
  ar: { sub: `${PRODUCT_MODELS.length} موديلاً في ست فئات — اختر الفئة لتشاهد الموديلات والمقاسات، واسأل عن السعر مباشرة عبر واتساب.` },
  en: { sub: `${PRODUCT_MODELS.length} models in six ranges — pick a range to see models and sizes, and ask for prices directly on WhatsApp.` },
  tr: { sub: `Altı grupta ${PRODUCT_MODELS.length} model — modelleri ve ölçüleri görmek için bir grup seçin, fiyatı WhatsApp'tan sorun.` },
};

export const ProductCataloguePage: React.FC<{ currentLang: Language }> = ({ currentLang }) => (
  <div className="pt-16 md:pt-[4.5rem]">
    <section className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-6 pb-10 md:pb-14">
        <Breadcrumbs dark currentLang={currentLang} items={[{ label: UI.catalogueLong[currentLang] }]} />
        <div className="mt-6">
          <SectionHeading as="h1" dark eyebrow="Birlik" title={UI.catalogueLong[currentLang]} sub={TEXT[currentLang].sub} />
        </div>
      </div>
    </section>

    <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 -mt-4 md:-mt-6 pb-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {CATEGORY_CARDS.map((card, i) => (
          <div key={card.id} data-reveal style={{ '--reveal-delay': `${(i % 3) * 80}ms` } as React.CSSProperties}>
            <CategoryTile card={card} index={i} currentLang={currentLang} eager={i < 2} />
          </div>
        ))}
      </div>
    </section>

    <CatalogueDownload currentLang={currentLang} />
  </div>
);
