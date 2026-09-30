import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Language, ProductCategory } from '../types';
import { useMedia } from '../context/MediaContext';
import { DropZoneOverlay } from './DropZoneOverlay';

interface ProductCategoriesSectionProps {
  currentLang: Language;
  onSelectCategory: (category: ProductCategory) => void;
}

export const ProductCategoriesSection: React.FC<ProductCategoriesSectionProps> = ({
  currentLang,
  onSelectCategory,
}) => {
  const { getCategoryImageUrl } = useMedia();
  const isRtl = currentLang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const categories = [
    {
      id: 'ps_wood' as ProductCategory,
      name: {
        ar: 'بديل الخشب',
        en: 'PS Wall Panels',
        tr: 'PS Duvar Panelleri'
      },
      tag: {
        ar: 'PS Wall Panels',
        en: 'بديل الخشب',
        tr: 'PS Duvar Panelleri'
      },
      description: {
        ar: 'ألواح جدارية ديكورية متنوعة ، تتميز بمقاومتها للرطوبة وسهولة تركيبها لتجديد الجدران الداخلية بأسلوب عصري وأنيق',
        en: 'Versatile decorative wall panels with exceptional moisture resistance and effortless installation, modernizing interior walls with refined elegance.',
        tr: 'İç duvarları zarif ve modern bir şekilde yenileyen, neme dayanıklı ve kolay montajlı çok yönlü dekoratif duvar panelleri.'
      },
      image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=2400&q=85',
      code: 'PS Wood Panels'
    },
    {
      id: 'pvc_marble' as ProductCategory,
      name: {
        ar: 'بديل الرخام',
        en: 'PVC Wall Panels',
        tr: 'PVC Duvar Panelleri'
      },
      tag: {
        ar: 'PVC Wall Panels',
        en: 'بديل الرخام',
        tr: 'PVC Duvar Panelleri'
      },
      description: {
        ar: 'ألواح أنيقة بتصميمات الرخام الفاخر، تضفي لمسة من الرقي والفخامة على الجدران دون عناء وصيانة الرخام الطبيعي',
        en: 'Elegant panels capturing luxurious natural marble veining, adding prestige and grandeur to your walls without the weight or maintenance of real stone.',
        tr: 'Doğal mermerin zahmeti ve bakımı olmadan, duvarlara lüks ve asil bir dokunuş katan zarif mermer görünümlü paneller.'
      },
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
      code: 'PVC Marble Panels'
    },
    {
      id: 'spc_wall' as ProductCategory,
      name: {
        ar: 'بديل الشيبورد الحجري',
        en: 'SPC Wall Panels',
        tr: 'SPC Duvar Panelleri'
      },
      tag: {
        ar: 'SPC Wall Panels',
        en: 'بديل الشيبورد الحجري',
        tr: 'SPC Duvar Panelleri'
      },
      description: {
        ar: 'ألواح مطورة مصنوعة من  بي في سي والحجر المضغوط بتشكيلة واسعة ، لتقدم مظهراً فاخرًا وملمسًا عالي الجودة مع متانة و مقاومة فائقة للماء',
        en: 'Advanced composite panels made of PVC and compressed stone in a wide range of designs, delivering a luxurious look, tactile finish, and supreme waterproof durability.',
        tr: 'Geniş model seçenekleri, lüks görünümü ve üstün su direnci ile PVC ve sıkıştırılmış taştan üretilmiş gelişmiş kompozit paneller.'
      },
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2400&q=85',
      code: 'SPC Wall Boards'
    },
    {
      id: 'spc_flooring' as ProductCategory,
      name: {
        ar: 'بديل الباركيه',
        en: 'SPC Flooring',
        tr: 'SPC Zemin Kaplaması'
      },
      tag: {
        ar: 'SPC Flooring',
        en: 'بديل الباركيه',
        tr: 'SPC Zemin Kaplaması'
      },
      description: {
        ar: 'أرضيات مبتكرة بتصميمات متنوعة، مجهزة بنظام النقر المبتكر لسهولة التركيب الفائقة، مع طبقة حماية ضد الخدش ومتانة تفوق الباركيه التقليدي بفضل مقاومتها الكاملة للماء',
        en: 'Innovative flooring with versatile finishes and an effortless click-lock system, featuring a heavy scratch-resistant layer and durability surpassing traditional parquet thanks to 100% waterproof performance.',
        tr: 'Kolay montaj sağlayan kilit sistemi, çizilme koruması ve %100 su geçirmezliğiyle geleneksel parkeyi aşan yenilikçi zemin kaplamaları.'
      },
      image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=2400&q=85',
      code: 'SPC Flooring'
    },
    {
      id: 'ps_slats' as ProductCategory,
      name: {
        ar: 'قُضبان بي إس',
        en: 'PS Wall Slaths',
        tr: 'PS Duvar Çıtaları ve Profilleri'
      },
      tag: {
        ar: 'PS Wall Slaths',
        en: 'قُضبان بي إس',
        tr: 'PS Duvar Çıtaları'
      },
      description: {
        ar: 'قُضبان  ديكورية مرنة ومتينة تتيح تصميم إطارات على الطراز الفرنسي وتشكيل الجدران بحرية تامة لتناسب كافة الأذواق الديكورية',
        en: 'Flexible and durable decorative moldings and trims enabling French-style wainscoting and bespoke wall framing to suit every architectural taste.',
        tr: 'Fransız tarzı çıtalama ve duvar tasarımı imkanı sunan, her dekorasyon zevkine uyum sağlayan esnek ve dayanıklı dekoratif çıtalar.'
      },
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2400&q=85',
      code: 'PS Wall Slaths'
    },
    {
      id: 'ps_baseboards' as ProductCategory,
      name: {
        ar: 'نعلات بي إس',
        en: 'PS Baseboards',
        tr: 'PS Süpürgelikler'
      },
      tag: {
        ar: 'PS Baseboards',
        en: 'نعلات بي إس',
        tr: 'PS Süpürgelikler'
      },
      description: {
        ar: 'نعلات أرضية عملية ومتينة تمنح التشطيبات الداخلية مظهراً متكاملاً مع حماية فعالة للحواف، وتتوفر في بعض الموديلات مع قنوات مدمجة لإضاءة الليد',
        en: 'Practical, heavy-duty floor baseboards providing seamless architectural finish and edge protection, with select models featuring integrated channels for LED lighting.',
        tr: 'İç mekanlara bütünsel bir bitiş ve kenar koruması sağlayan, belirli modellerde entegre LED aydınlatma kanalına sahip dayanıklı süpürgelikler.'
      },
      image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2400&q=85',
      code: 'PS Baseboards'
    }
  ];

  return (
    <section 
      id="categories" 
      className="w-full bg-[#1C1917] border-b border-[#E6DFD5] relative font-sans"
    >
      {/* Full-width Horizontal Rectangular Category Cards Stacked On Top Of Each Other (Edge-to-Edge) */}
      <div className="w-full flex flex-col divide-y divide-white/15">
        {categories.map((cat, idx) => (
          <div
            key={cat.id}
            id={`category-row-${cat.id}`}
            role="button"
            tabIndex={0}
            onClick={() => onSelectCategory(cat.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectCategory(cat.id);
              }
            }}
            className="group relative w-full min-h-[220px] sm:min-h-[220px] md:h-64 lg:h-72 overflow-hidden cursor-pointer flex items-center bg-[#141210] transition-all duration-300"
          >
            {/* Full Width Edge-to-Edge Background Image */}
            <img
              src={getCategoryImageUrl(cat.id, cat.image) || cat.image || '/hero.png'}
              alt={cat.name[currentLang]}
              onError={(e) => {
                if (e.currentTarget.src !== cat.image) {
                  e.currentTarget.src = cat.image;
                }
              }}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-90"
            />

            {/* In-place Drag & Drop overlay for admin */}
            <DropZoneOverlay
              target={{ type: 'category', id: cat.id, name: cat.name[currentLang] }}
              currentLang={currentLang}
              badgePosition="top-end"
            />

            {/* Architectural Contrast Scrim to preserve image visibility while making text crystal clear */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#141210]/95 via-[#141210]/65 to-[#141210]/30 rtl:bg-gradient-to-l rtl:from-[#141210]/95 rtl:via-[#141210]/65 rtl:to-[#141210]/30 group-hover:via-[#141210]/50 transition-colors duration-500" />

            {/* Accent Gold Indicator Stripe on Hover */}
            <div className="absolute top-0 bottom-0 start-0 w-2 sm:w-2.5 bg-[#9E7241] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Edge-to-Edge Container Content with Generous Responsive Padding */}
            <div className="relative z-10 w-full px-6 sm:px-10 md:px-14 lg:px-20 py-6 sm:py-7 flex items-center justify-between gap-4 sm:gap-8">
              
              {/* Left/Right Category Branding */}
              <div className="flex items-start sm:items-center gap-4 sm:gap-6 md:gap-8 max-w-4xl">
                {/* Minimalist Sequence Marker */}
                <span className="text-sm sm:text-base md:text-lg font-mono text-[#D4AF37] font-semibold tracking-wider opacity-90 shrink-0 mt-1 sm:mt-0">
                  0{idx + 1}
                </span>

                {/* Prominent Category Name, Tag & Description */}
                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-serif font-light text-white tracking-wide group-hover:text-[#F3E7D3] transition-colors drop-shadow-md">
                      {cat.name[currentLang]}
                    </h3>
                    <span className="text-xs sm:text-sm text-[#D5CCC0]/85 font-sans tracking-wide">
                      ({cat.tag[currentLang]})
                    </span>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm md:text-[13.5px] text-[#EDE7DC] font-light leading-relaxed max-w-2xl lg:max-w-3xl font-['Cairo','Tajawal',sans-serif] group-hover:text-white transition-colors">
                    {cat.description[currentLang]}
                  </p>
                </div>
              </div>

              {/* Action Prompt with Dynamic Arrow */}
              <div className="flex items-center gap-3 sm:gap-4 text-white shrink-0">
                <span className="text-xs sm:text-sm uppercase tracking-widest hidden sm:inline-block font-sans text-[#E5DFD5] group-hover:text-white transition-colors font-medium">
                  {currentLang === 'ar' ? 'عرض الموديلات' : currentLang === 'en' ? 'View Models' : 'Modelleri Gör'}
                </span>
                
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 group-hover:bg-[#9E7241] rounded-full flex items-center justify-center transition-all duration-300 border border-white/30 group-hover:border-[#9E7241] shadow-lg">
                  <ArrowIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white transform group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 transition-transform duration-300" />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
