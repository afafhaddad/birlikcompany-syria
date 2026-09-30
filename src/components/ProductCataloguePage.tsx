import React, { useRef, useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Home,
  Droplets
} from 'lucide-react';
import { Language, ProductCategory } from '../types';
import { useMedia } from '../context/MediaContext';
import { DropZoneOverlay } from './DropZoneOverlay';
import { CATEGORIES_DATA } from '../data/products';

interface ProductCataloguePageProps {
  currentLang: Language;
  onSelectCategory: (cat: ProductCategory) => void;
  onBackToHome: () => void;
}

export const ProductCataloguePage: React.FC<ProductCataloguePageProps> = ({
  currentLang,
  onSelectCategory,
  onBackToHome
}) => {
  const { getCategoryImageUrl } = useMedia();
  const isRtl = currentLang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;
  const NextChevron = isRtl ? ChevronLeft : ChevronRight;
  const PrevChevron = isRtl ? ChevronRight : ChevronLeft;

  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  // Mouse drag support for smooth swiping on desktop as well
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  // Exact 6 categories with user-requested descriptions
  const categories = [
    {
      id: 'ps_wood' as ProductCategory,
      number: '01',
      name: {
        ar: 'بديل الخشب',
        en: 'PS Wall Panels',
        tr: 'PS Duvar Panelleri'
      },
      tag: {
        ar: 'PS Wall Panels',
        en: 'PS Wall Panels',
        tr: 'PS Duvar Paneli'
      },
      description: {
        ar: 'ألواح جدارية ديكورية متنوعة ، تتميز بمقاومتها للرطوبة وسهولة تركيبها لتجديد الجدران الداخلية بأسلوب عصري وأنيق',
        en: 'Versatile decorative wall panels with exceptional moisture resistance and effortless installation, modernizing interior walls with refined elegance.',
        tr: 'İç duvarları zarif ve modern bir şekilde yenileyen, neme dayanıklı ve kolay montajlı çok yönlü dekoratif duvar panelleri.'
      },
      image: '/uploads/1790748253391_pswallpanelsbirlikcompany.jpg',
      thickness: '9 mm - 14.8 mm',
      dimensions: '12.1 cm - 16 cm × 290 cm'
    },
    {
      id: 'pvc_marble' as ProductCategory,
      number: '02',
      name: {
        ar: 'بديل الرخام',
        en: 'PVC Wall Panels',
        tr: 'PVC Duvar Panelleri'
      },
      tag: {
        ar: 'PVC Wall Panels',
        en: 'PVC Wall Panels',
        tr: 'PVC Mermer Paneli'
      },
      description: {
        ar: 'ألواح أنيقة بتصميمات الرخام الفاخر، تضفي لمسة من الرقي والفخامة على الجدران دون عناء وصيانة الرخام الطبيعي',
        en: 'Elegant panels capturing luxurious natural marble veining, adding prestige and grandeur to your walls without the weight or maintenance of real stone.',
        tr: 'Doğal mermerin zahmeti ve bakımı olmadan, duvarlara lüks ve asil bir dokunuş katan zarif mermer görünümlü paneller.'
      },
      image: '/uploads/1790748255245_pvcwallpanelbirlikcompany.jpg',
      thickness: '2.5 mm',
      dimensions: '122 cm × 240 cm'
    },
    {
      id: 'spc_wall' as ProductCategory,
      number: '03',
      name: {
        ar: 'بديل الشيبورد الحجري',
        en: 'SPC Wall Panels',
        tr: 'SPC Duvar Panelleri'
      },
      tag: {
        ar: 'SPC Wall Panels',
        en: 'SPC Wall Panels',
        tr: 'SPC Taş Paneli'
      },
      description: {
        ar: 'ألواح مطورة مصنوعة من  بي في سي والحجر المضغوط بتشكيلة واسعة ، لتقدم مظهراً فاخرًا وملمسًا عالي الجودة مع متانة و مقاومة فائقة للماء',
        en: 'Advanced composite panels made of PVC and compressed stone in a wide range of designs, delivering a luxurious look, tactile finish, and supreme waterproof durability.',
        tr: 'Geniş model seçenekleri, lüks görünümü ve üstün su direnci ile PVC ve sıkıştırılmış taştan üretilmiş gelişmiş kompozit paneller.'
      },
      image: '/uploads/1790748263995_spcwallpanelbirlikcompany.jpg',
      thickness: '4.0 mm - 5.0 mm',
      dimensions: '96 cm × 280 cm'
    },
    {
      id: 'spc_flooring' as ProductCategory,
      number: '04',
      name: {
        ar: 'بديل الباركيه',
        en: 'SPC Flooring',
        tr: 'SPC Zemin Kaplaması'
      },
      tag: {
        ar: 'SPC Flooring',
        en: 'SPC Flooring',
        tr: 'SPC Parke'
      },
      description: {
        ar: 'أرضيات مبتكرة بتصميمات متنوعة، مجهزة بنظام النقر المبتكر لسهولة التركيب الفائقة، مع طبقة حماية ضد الخدش ومتانة تفوق الباركيه التقليدي بفضل مقاومتها الكاملة للماء',
        en: 'Innovative flooring with versatile finishes and an effortless click-lock system, featuring a heavy scratch-resistant layer and durability surpassing traditional parquet thanks to 100% waterproof performance.',
        tr: 'Kolay montaj sağlayan kilit sistemi, çizilme koruması ve %100 su geçirmezliğiyle geleneksel parkeyi aşan yenilikçi zemin kaplamaları.'
      },
      image: '/uploads/1790748266514_spcflooringbirlikcompany.jpg',
      thickness: '5.0 mm - 5.5 mm (4.5 مم + 1.0 مم IXPE)',
      dimensions: '30.3 cm × 60.6 cm'
    },
    {
      id: 'ps_slats' as ProductCategory,
      number: '05',
      name: {
        ar: 'قُضبان بي إس',
        en: 'PS Wall Slaths',
        tr: 'PS Duvar Çıtaları ve Profilleri'
      },
      tag: {
        ar: 'PS Wall Slaths',
        en: 'PS Wall Slaths',
        tr: 'PS Çıtalar'
      },
      description: {
        ar: 'قُضبان  ديكورية مرنة ومتينة تتيح تصميم إطارات على الطراز الفرنسي وتشكيل الجدران بحرية تامة لتناسب كافة الأذواق الديكورية',
        en: 'Flexible and durable decorative moldings and trims enabling French-style wainscoting and bespoke wall framing to suit every architectural taste.',
        tr: 'Fransız tarzı çıtalama ve duvar tasarımı imkanı sunan, her dekorasyon zevkine uyum sağlayan esnek ve dayanıklı dekoratif çıtalar.'
      },
      image: '/uploads/1790748269192_pswallslathsbirlikcompany.jpg',
      thickness: '10 mm - 20 mm',
      dimensions: '1.5 cm - 10 cm × 240 cm'
    },
    {
      id: 'ps_baseboards' as ProductCategory,
      number: '06',
      name: {
        ar: 'نعلات بي إس',
        en: 'PS Baseboards',
        tr: 'PS Süpürgelikler'
      },
      tag: {
        ar: 'PS Baseboards',
        en: 'PS Baseboards',
        tr: 'PS Süpürgelik'
      },
      description: {
        ar: 'نعلات أرضية عملية ومتينة تمنح التشطيبات الداخلية مظهراً متكاملاً مع حماية فعالة للحواف، وتتوفر في بعض الموديلات مع قنوات مدمجة لإضاءة الليد',
        en: 'Practical, heavy-duty floor baseboards providing seamless architectural finish and edge protection, with select models featuring integrated channels for LED lighting.',
        tr: 'İç mekanlara bütünsel bir bitiş ve kenar koruması sağlayan, belirli modellerde entegre LED aydınlatma kanalına sahip dayanıklı süpürgelikler.'
      },
      image: '/uploads/1790748270465_psbaseboardbirlikcompany.jpg',
      thickness: '12 mm - 15 mm',
      dimensions: '10 cm - 11.5 cm × 240 cm'
    }
  ];

  // Scroll carousel to specific card index
  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const cards = carouselRef.current.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
      setActiveCardIndex(index);
    }
  };

  const handlePrev = () => {
    const nextIdx = (activeCardIndex - 1 + categories.length) % categories.length;
    scrollToIndex(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeCardIndex + 1) % categories.length;
    scrollToIndex(nextIdx);
  };

  // Sync active indicator on scroll
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollCenter = container.scrollLeft + container.clientWidth / 2;
    const cards = Array.from(container.children) as HTMLElement[];

    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(scrollCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveCardIndex(closestIndex);
  };

  // Mouse drag handlers for smooth desktop swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeftState(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.3;
    if (Math.abs(walk) > 4) {
      setHasMoved(true);
    }
    carouselRef.current.scrollLeft = scrollLeftState - walk;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const translations = {
    ar: {
      breadcrumbHome: 'الرئيسية',
      breadcrumbCatalogue: 'كتالوج المنتجات',
      title: 'كتالوج المنتجات',
      subtitle: 'مرّر البطاقات يميناً ويساراً للاستعراض، واضغط على أي بطاقة للانتقال إلى صفحتها وموديلاتها.',
      swipeHint: 'اسحب يميناً ويساراً للتنقل',
      enterCategoryBtn: 'استعراض موديلات هذا القسم',
      thicknessLabel: 'السماكة',
      dimensionsLabel: 'المقاس',
      waterproofTag: 'مقاوم للماء والرطوبة 100%',
      cardCounter: `${activeCardIndex + 1} / ${categories.length}`
    },
    en: {
      breadcrumbHome: 'Home',
      breadcrumbCatalogue: 'Product Catalogue',
      title: 'Product Catalogue',
      subtitle: 'Swipe left and right to explore, and select any card to enter its page and view models.',
      swipeHint: 'Swipe left and right to navigate',
      enterCategoryBtn: 'Browse Models',
      thicknessLabel: 'Thickness',
      dimensionsLabel: 'Dimensions',
      waterproofTag: '100% Waterproof',
      cardCounter: `${activeCardIndex + 1} / ${categories.length}`
    },
    tr: {
      breadcrumbHome: 'Ana Sayfa',
      breadcrumbCatalogue: 'Ürün Kataloğu',
      title: 'Ürün Kataloğu',
      subtitle: 'Göz atmak için kartları sağa-sola kaydırın ve modelleri incelemek için kartı seçin.',
      swipeHint: 'Gezinmek için sağa sola kaydırın',
      enterCategoryBtn: 'Modelleri İncele',
      thicknessLabel: 'Kalınlık',
      dimensionsLabel: 'Ölçüler',
      waterproofTag: '%100 Su Geçirmez',
      cardCounter: `${activeCardIndex + 1} / ${categories.length}`
    }
  };

  const t = translations[currentLang];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] font-sans pb-24 select-none">
      
      {/* Top Breadcrumb Navigation */}
      <div className="border-b border-[#E5DFD5] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs text-[#78716A]">
            <button 
              onClick={onBackToHome}
              className="hover:text-[#9E7241] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{t.breadcrumbHome}</span>
            </button>
            <span className="text-[#D4AF37]">/</span>
            <span className="text-[#1C1917] font-bold">{t.breadcrumbCatalogue}</span>
          </nav>

          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5C554E] hover:text-[#9E7241] transition-colors cursor-pointer"
          >
            <BackArrow className="w-3.5 h-3.5" />
            <span>{t.breadcrumbHome}</span>
          </button>
        </div>
      </div>

      {/* Clean Header Without Any Upper Arrows */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 sm:pt-9 pb-3 text-center sm:text-start">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 mb-1.5 text-[#9E7241]">
              <Layers className="w-4 h-4" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] font-semibold">
                BIRLIK
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-[#1C1917] tracking-tight">
              {t.title}
            </h1>

            <p className="text-xs sm:text-sm text-[#6E645A] font-light max-w-2xl mt-1 leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Clean Counter Badge */}
          <div className="self-center sm:self-end">
            <span className="text-xs font-mono text-[#5C554E] px-3 py-1 bg-[#FFFFFF] border border-[#DDD5C7] shadow-2xs">
              {t.cardCounter}
            </span>
          </div>
        </div>

        {/* Swipe Hint */}
        <div className="mt-3 flex items-center justify-center sm:justify-start gap-2 text-[11px] text-[#8C8278]">
          <span className="w-2 h-2 rounded-full bg-[#D4991A] animate-pulse" />
          <span>{t.swipeHint}</span>
        </div>
      </div>

      {/* MOBILE-FIRST SWIPE CAROUSEL */}
      <div className="w-full pt-3 pb-4">
        <div 
          ref={carouselRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex gap-4 sm:gap-6 overflow-x-auto px-4 sm:px-8 lg:px-12 pb-4 pt-2 snap-x snap-mandatory scroll-smooth scrollbar-none cursor-grab active:cursor-grabbing"
          style={{ 
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {categories.map((cat, index) => {
            const isSelectedCard = index === activeCardIndex;
            const catInfo = CATEGORIES_DATA.find((c) => c.id === cat.id);
            const cardDimensions = catInfo?.specs?.dimensions || cat.dimensions;
            const cardThickness = catInfo?.specs?.thickness || cat.thickness;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  if (!hasMoved) {
                    setActiveCardIndex(index);
                    scrollToIndex(index);
                  }
                }}
                className={`snap-center shrink-0 w-[88vw] sm:w-[380px] md:w-[410px] lg:w-[430px] bg-[#FFFFFF] border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm ${
                  isSelectedCard 
                    ? 'border-[#9E7241] ring-2 ring-[#9E7241]/30 shadow-lg' 
                    : 'border-[#DDD5C7] hover:border-[#9E7241]/60'
                }`}
                id={`product-card-${cat.id}`}
              >
                {/* Picture Area - Made significantly larger on mobile for maximum image clarity */}
                <div className="relative h-80 sm:h-72 md:h-72 lg:h-80 overflow-hidden group">
                  <img 
                    src={getCategoryImageUrl(cat.id, cat.image) || cat.image || '/hero.png'} 
                    alt={`${cat.name[currentLang]} - مواد تكسية وديكور جداري في سوريا واللاذقية | Birlik Company`} 
                    onError={(e) => {
                      const fallback = catInfo?.image || cat.image || '/hero.png';
                      if (e.currentTarget.src !== fallback) {
                        e.currentTarget.src = fallback;
                      }
                    }}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                    draggable={false}
                  />

                  {/* Drop zone overlay for admin */}
                  <DropZoneOverlay
                    target={{ type: 'category', id: cat.id, name: cat.name[currentLang] }}
                    currentLang={currentLang}
                    badgePosition="bottom-end"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 pointer-events-none" />

                  {/* Badges */}
                  <div className="absolute top-3.5 start-3.5 end-3.5 flex items-center justify-between pointer-events-none">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 bg-black/80 text-white backdrop-blur-xs border border-white/20">
                      {cat.number} / 06
                    </span>
                    <span className="font-mono text-[11px] px-2.5 py-1 bg-white/90 text-[#1C1917] font-semibold backdrop-blur-xs">
                      {cat.tag[currentLang]}
                    </span>
                  </div>

                  {/* Title on Image */}
                  <div className="absolute bottom-3.5 start-3.5 end-3.5 text-white pointer-events-none">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#1E7E45]/90 text-white text-[10px] font-semibold mb-1.5 backdrop-blur-xs">
                      <Droplets className="w-2.5 h-2.5" />
                      <span>{t.waterproofTag}</span>
                    </div>

                    <h2 className="font-serif text-xl sm:text-2xl font-semibold leading-tight text-white drop-shadow-md">
                      {cat.name[currentLang]}
                    </h2>
                  </div>
                </div>

                {/* Card Body with Exact Arabic Description */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-[#FFFFFF]">
                  <div>
                    <p className="text-xs sm:text-sm text-[#4A423A] leading-relaxed font-light mb-5">
                      {cat.description[currentLang]}
                    </p>

                    {/* Specs */}
                    <div className="space-y-2 py-3 border-y border-[#EFECE4] text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#78716A]">{t.dimensionsLabel}:</span>
                        <span className="font-mono font-medium text-[#1C1917]" dir="ltr">
                          {cardDimensions}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#78716A]">{t.thicknessLabel}:</span>
                        <span className="font-mono font-medium text-[#1C1917]" dir="ltr">
                          {cardThickness}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Enter Button */}
                  <div className="mt-5 pt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCategory(cat.id);
                      }}
                      className="w-full py-3.5 px-5 bg-[#D4991A] hover:bg-[#BE8613] text-white font-['Cairo','Tajawal',sans-serif] font-bold text-sm tracking-wide transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                      id={`enter-btn-${cat.id}`}
                    >
                      <span>{t.enterCategoryBtn}</span>
                      <ArrowIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* NAVIGATION CONTROLS BELOW THE CARDS: ARROWS + DOTS */}
        <div className="flex items-center justify-center gap-3.5 mt-5 px-4">
          
          {/* Below-card Previous Arrow */}
          <button
            onClick={handlePrev}
            className="w-11 h-11 border border-[#DDD5C7] bg-[#FFFFFF] hover:border-[#9E7241] hover:text-[#9E7241] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 text-[#1C1917]"
            aria-label="Previous card"
            title="Previous"
          >
            <PrevChevron className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {categories.map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => scrollToIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeCardIndex === idx 
                    ? 'w-8 h-2.5 bg-[#D4991A]' 
                    : 'w-2.5 h-2.5 bg-[#DDD5C7] hover:bg-[#9E7241]/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Below-card Next Arrow */}
          <button
            onClick={handleNext}
            className="w-11 h-11 border border-[#DDD5C7] bg-[#FFFFFF] hover:border-[#9E7241] hover:text-[#9E7241] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 text-[#1C1917]"
            aria-label="Next card"
            title="Next"
          >
            <NextChevron className="w-5 h-5" />
          </button>

        </div>
      </div>

    </div>
  );
};
