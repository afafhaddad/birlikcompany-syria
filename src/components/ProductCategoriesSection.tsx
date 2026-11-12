import React from 'react';
import { Droplets, Truck, Store, Wrench } from 'lucide-react';
import { Language } from '../types';
import { CATEGORY_CARDS } from '../data/categoryCards';
import { CategoryTile, SectionHeading } from './cards';
import { UI } from '../site';

const PERKS = [
  { icon: Droplets, ar: 'مقاومة للماء والرطوبة 100%', en: '100% water & moisture proof', tr: '%100 su ve neme dayanıklı' },
  { icon: Truck, ar: 'توصيل لكل المحافظات السورية', en: 'Delivery to all Syrian governorates', tr: 'Tüm Suriye illerine teslimat' },
  { icon: Store, ar: 'عينات للمعاينة في معرض اللاذقية', en: 'Samples to inspect in our Lattakia showroom', tr: 'Lazkiye showroomunda numuneler' },
  { icon: Wrench, ar: 'تركيب سهل مع فيديوهات شرح', en: 'Easy to install, with video guides', tr: 'Kolay montaj, videolu anlatım' },
];

export const ProductCategoriesSection: React.FC<{ currentLang: Language }> = ({ currentLang }) => (
  <>
    {/* Perks strip */}
    <section className="bg-ink text-white border-t border-white/10">
      <ul className="snap-rail md:grid md:grid-cols-4 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-5 gap-3 md:gap-6">
        {PERKS.map(({ icon: Icon, ...txt }) => (
          <li
            key={txt.en}
            className="flex items-center gap-3 w-[78%] sm:w-[46%] md:w-auto px-4 py-3 md:p-0 rounded-2xl bg-white/5 md:bg-transparent"
            style={{ scrollSnapAlign: 'start' }}
          >
            <span className="w-10 h-10 rounded-full bg-brass/20 text-brass-light flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </span>
            <span className="text-sm font-semibold leading-snug">{txt[currentLang]}</span>
          </li>
        ))}
      </ul>
    </section>

    {/* Collections */}
    <section id="categories" className="bg-ink text-white pt-10 pb-16 md:pt-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex items-end justify-between gap-4">
        <SectionHeading dark eyebrow={UI.catalogue[currentLang]} title={UI.collections[currentLang]} sub={UI.collectionsSub[currentLang]} />
        <span className="md:hidden shrink-0 text-xs text-white/50 pb-1">{UI.swipe[currentLang]} ←</span>
      </div>

      {/* Mobile: swipe rail. Desktop: 3-column grid. */}
      <div className="mt-7 snap-rail gap-4 px-5 sm:px-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:max-w-7xl md:mx-auto lg:px-8 md:overflow-visible scroll-px-5">
        {CATEGORY_CARDS.map((card, i) => (
          <div key={card.id} className="w-[80%] sm:w-[48%] md:w-auto" data-reveal style={{ '--reveal-delay': `${(i % 3) * 80}ms` } as React.CSSProperties}>
            <CategoryTile card={card} index={i} currentLang={currentLang} />
          </div>
        ))}
      </div>
    </section>
  </>
);
