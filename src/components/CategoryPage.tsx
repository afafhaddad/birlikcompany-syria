import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Droplets, 
  Layers, 
  Maximize2, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare, 
  Info, 
  Phone,
  Home,
  Building2,
  ExternalLink,
  SlidersHorizontal,
  Play
} from 'lucide-react';
import { Language, ProductCategory, ProductModel, CategoryInfo } from '../types';
import { CATEGORIES_DATA, PRODUCT_MODELS, isModelInCategory } from '../data/products';
import { useMedia } from '../context/MediaContext';
import { DropZoneOverlay } from './DropZoneOverlay';

interface CategoryPageProps {
  categoryId: ProductCategory;
  currentLang: Language;
  onBack: () => void;
  onBackToCatalogue?: () => void;
  onSelectCategory: (categoryId: ProductCategory) => void;
  onSelectProduct: (model: ProductModel) => void;
  onOpenInstallation?: (categoryId?: ProductCategory) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryId,
  currentLang,
  onBack,
  onBackToCatalogue,
  onSelectCategory,
  onSelectProduct,
  onOpenInstallation
}) => {
  const { getCategoryImageUrl, getProductImageUrl } = useMedia();
  const isRtl = currentLang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;
  const NextChevron = isRtl ? ChevronLeft : ChevronRight;
  const PrevChevron = isRtl ? ChevronRight : ChevronLeft;

  // Selected category information
  const category = CATEGORIES_DATA.find((c) => c.id === categoryId) || CATEGORIES_DATA[0];

  // Canonical 6 categories for top switcher navigation
  const primaryCategories = [
    CATEGORIES_DATA.find((c) => c.id === 'ps_wood'),
    CATEGORIES_DATA.find((c) => c.id === 'pvc_marble'),
    CATEGORIES_DATA.find((c) => c.id === 'spc_wall'),
    CATEGORIES_DATA.find((c) => c.id === 'spc_flooring'),
    CATEGORIES_DATA.find((c) => c.id === 'ps_slats'),
    CATEGORIES_DATA.find((c) => c.id === 'ps_baseboards')
  ].filter(Boolean) as CategoryInfo[];

  // Models belonging to this category
  const models = PRODUCT_MODELS.filter((m) => isModelInCategory(m, category.id));

  // Carousel container ref for horizontal scrolling
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const [carouselScrollPosition, setCarouselScrollPosition] = useState<number>(0);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  // Mouse drag support for smooth swiping on desktop as well
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  // Scroll to top when category changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (carouselContainerRef.current) {
      carouselContainerRef.current.scrollLeft = 0;
    }
  }, [categoryId]);

  // Check scroll bounds
  const updateScrollBounds = () => {
    if (!carouselContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselContainerRef.current;
    setCarouselScrollPosition(scrollLeft);
    // In RTL, scrollLeft can be negative or positive depending on browser implementation
    const maxScroll = scrollWidth - clientWidth;
    const absScroll = Math.abs(scrollLeft);
    setCanScrollLeft(absScroll > 10);
    setCanScrollRight(absScroll < maxScroll - 10);
  };

  const handleScrollCarousel = (direction: 'next' | 'prev') => {
    if (!carouselContainerRef.current) return;
    const scrollAmount = 340;
    const isNext = direction === 'next';
    
    // Account for RTL and LTR
    const delta = isRtl 
      ? (isNext ? -scrollAmount : scrollAmount)
      : (isNext ? scrollAmount : -scrollAmount);

    carouselContainerRef.current.scrollBy({
      left: delta,
      behavior: 'smooth'
    });
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselContainerRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - carouselContainerRef.current.offsetLeft);
    setScrollLeftState(carouselContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.3;
    if (Math.abs(walk) > 4) {
      setHasMoved(true);
    }
    carouselContainerRef.current.scrollLeft = scrollLeftState - walk;
  };

  const translations = {
    ar: {
      breadcrumbHome: 'الرئيسية',
      breadcrumbCatalogue: 'كتالوج المنتجات',
      backToCatalogue: 'العودة إلى كتالوج المنتجات',
      categoryOverview: 'المواصفات الفنية للقسم ككل',
      availableProductsTitle: 'المنتجات المتوفرة',
      swipeHint: 'مرّر البطاقات يميناً ويساراً للتنقل بين المنتجات',
      dimensions: 'المقاس والأبعاد',
      thickness: 'السماكة المعتمدة',
      waterproofRating: 'مقاومة الرطوبة والماء',
      composition: 'التركيبة والخامة',
      applications: 'أبرز الاستخدامات',
      modelsCount: 'منتجات متوفرة',
      modelCode: 'الكود',
      specifications: 'المواصفات والصور المخصصة',
      clickToOpenModel: 'عرض صفحة الموديل ومواصفاته',
      waterproofBadge: 'مقاوم للماء 100%',
      allCategories: 'التنقل السريع بين الأقسام',
      sampleNotice: 'المعاينة الحية لعينات جميع الموديلات متوفرة بمقرنا في اللاذقية',
      viewDesignatedPage: 'انقر لفتح الصفحة المخصصة'
    },
    en: {
      breadcrumbHome: 'Home',
      breadcrumbCatalogue: 'Product Catalogue',
      backToCatalogue: 'Back to Product Catalogue',
      categoryOverview: 'Category Technical Profile',
      availableProductsTitle: 'Available Products',
      swipeHint: 'Swipe left and right to browse products',
      dimensions: 'Dimensions',
      thickness: 'Standard Thickness',
      waterproofRating: 'Water & Moisture Resistance',
      composition: 'Material Composition',
      applications: 'Recommended Applications',
      modelsCount: 'available products',
      modelCode: 'Code',
      specifications: 'Photos & Specific Specs',
      clickToOpenModel: 'View Dedicated Product Page',
      waterproofBadge: '100% Waterproof',
      allCategories: 'Quick Switch Categories',
      sampleNotice: 'Live sample swatches for all models available at our Lattakia headquarters',
      viewDesignatedPage: 'Click to open designated page'
    },
    tr: {
      breadcrumbHome: 'Ana Sayfa',
      breadcrumbCatalogue: 'Ürün Kataloğu',
      backToCatalogue: 'Ürün Kataloğuna Dön',
      categoryOverview: 'Kategori Teknik Özellikleri',
      availableProductsTitle: 'Mevcut Ürünler',
      swipeHint: 'Ürünleri incelemek için sağa-sola kaydırın',
      dimensions: 'Ölçüler',
      thickness: 'Standart Kalınlık',
      waterproofRating: 'Su ve Nem Dayanımı',
      composition: 'Malzeme Bileşimi',
      applications: 'Önerilen Kullanım Alanları',
      modelsCount: 'mevcut ürün',
      modelCode: 'Kod',
      specifications: 'Özellikler ve Fotoğraflar',
      clickToOpenModel: 'Özel Ürün Sayfasını Aç',
      waterproofBadge: '%100 Su Geçirmez',
      allCategories: 'Kategoriler Arası Geçiş',
      sampleNotice: 'Tüm modellerin fiziksel numuneleri Lazkiye merkezimizde görülebilir',
      viewDesignatedPage: 'Özel sayfayı açmak için tıklayın'
    }
  };

  const t = translations[currentLang];

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans pb-24 text-[#1C1917]">
      
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="bg-[#FFFFFF] border-b border-[#E5DFD5] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          
          <nav className="flex items-center gap-2 text-xs text-[#78716A]">
            <button 
              onClick={onBack}
              className="hover:text-[#9E7241] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{t.breadcrumbHome}</span>
            </button>
            <span className="text-[#D4AF37]">/</span>
            <button 
              onClick={onBackToCatalogue || onBack}
              className="hover:text-[#9E7241] transition-colors cursor-pointer"
            >
              {t.breadcrumbCatalogue}
            </button>
            <span className="text-[#D4AF37]">/</span>
            <span className="text-[#1C1917] font-bold">{category.name[currentLang]}</span>
          </nav>

          {/* Quick Category Switcher Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full scrollbar-none">
            {primaryCategories.map((c) => {
              const isCurrent = c.id === category.id || (
                (c.id === 'ps_wood' && (category.id === 'ps' || category.id === 'slats')) ||
                (c.id === 'pvc_marble' && (category.id === 'pvc' || category.id === 'walls')) ||
                (c.id === 'spc_wall' && category.id === 'spc') ||
                (c.id === 'ps_slats' && category.id === 'polystyrene_slats') ||
                (c.id === 'ps_baseboards' && (category.id === 'polystyrene_baseboards' || category.id === 'baseboards'))
              );
              return (
                <button
                  key={c.id}
                  onClick={() => onSelectCategory(c.id)}
                  className={`px-3 py-1 text-xs whitespace-nowrap transition-all cursor-pointer border ${
                    isCurrent
                      ? 'bg-[#1C1917] text-white border-[#1C1917] font-semibold'
                      : 'bg-[#FAF7F2] text-[#5C554E] border-[#DDD5C7] hover:border-[#9E7241] hover:text-[#1C1917]'
                  }`}
                >
                  {c.name[currentLang]}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Category Hero Banner with Descriptions on the Category as a Whole */}
      <div className="relative bg-[#141210] text-white overflow-hidden border-b border-[#E5DFD5]">
        <div className="absolute inset-0">
          <img
            src={getCategoryImageUrl(category.id, category.image) || category.image || '/hero.png'}
            alt={category.name[currentLang]}
            onError={(e) => {
              if (e.currentTarget.src !== category.image) {
                e.currentTarget.src = category.image;
              }
            }}
            className="w-full h-full object-cover object-center opacity-35 scale-105"
          />
          <DropZoneOverlay
            target={{ type: 'category', id: category.id, name: category.name[currentLang] }}
            currentLang={currentLang}
            badgePosition="top-end"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/75 to-[#141210]/40 pointer-events-none" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 bg-[#D4991A] text-white text-[11px] font-mono uppercase tracking-wider font-bold">
                {category.id.toUpperCase()}
              </span>
              <span className="text-xs text-white/70 font-light">
                {models.length} {t.modelsCount}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-light tracking-tight text-white mb-3">
              {category.name[currentLang]}
            </h1>

            <p className="text-sm sm:text-base text-[#E5DFD5] font-light leading-relaxed mb-4">
              {category.subtitle[currentLang]}
            </p>

            {/* FULL OFFICIAL DESCRIPTION OF THE CATEGORY AS A WHOLE */}
            <p className="text-xs sm:text-sm text-[#C9BFB5] leading-relaxed max-w-2xl bg-black/40 p-3.5 border-s-2 border-[#D4991A]">
              {category.description[currentLang]}
            </p>
          </div>
        </div>
      </div>

      {/* Category Technical Details Card (Overall Specifications) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-[#FFFFFF] border border-[#DDD5C7] p-6 sm:p-7 shadow-sm">
          
          <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#EFECE4]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#9E7241]" />
                <h2 className="text-xs sm:text-sm font-semibold text-[#1C1917] uppercase tracking-wider">
                  {t.categoryOverview}
                </h2>
              </div>

              {onOpenInstallation && (
                <button
                  type="button"
                  onClick={() => onOpenInstallation(category.id)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F5EFE6] hover:bg-[#EAE2D5] border border-[#DDD5C7] text-xs font-semibold text-[#9E7241] transition-colors cursor-pointer shadow-2xs"
                  title={currentLang === 'ar' ? 'مشاهدة فيديو طريقة وخطوات التركيب' : 'Watch Installation Video'}
                >
                  <Play className="w-3 h-3 fill-[#9E7241] text-[#9E7241]" />
                  <span>{currentLang === 'ar' ? 'فيديو طريقة التركيب' : currentLang === 'en' ? 'Installation Video' : 'Montaj Videosu'}</span>
                </button>
              )}
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#5C554E]">
              <Building2 className="w-3.5 h-3.5 text-[#9E7241]" />
              <span>{t.sampleNotice}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Dimensions */}
            <div className="p-3 bg-[#FAF7F2] border border-[#E8E2D8]">
              <span className="text-[10px] text-[#78716A] uppercase tracking-wider block mb-1">
                {t.dimensions}
              </span>
              <p className="text-xs sm:text-sm font-mono font-medium text-[#1C1917]" dir="ltr">
                {category.specs.dimensions}
              </p>
            </div>

            {/* Thickness */}
            <div className="p-3 bg-[#FAF7F2] border border-[#E8E2D8]">
              <span className="text-[10px] text-[#78716A] uppercase tracking-wider block mb-1">
                {t.thickness}
              </span>
              <p className="text-xs sm:text-sm font-mono font-medium text-[#1C1917]" dir="ltr">
                {category.specs.thickness}
              </p>
            </div>

            {/* Waterproof */}
            <div className="p-3 bg-[#FAF7F2] border border-[#E8E2D8]">
              <span className="text-[10px] text-[#78716A] uppercase tracking-wider block mb-1">
                {t.waterproofRating}
              </span>
              <p className="text-xs sm:text-sm font-medium text-[#1E7E45] flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 shrink-0" />
                <span>{category.specs.waterproof[currentLang]}</span>
              </p>
            </div>

            {/* Composition */}
            <div className="p-3 bg-[#FAF7F2] border border-[#E8E2D8] sm:col-span-2 lg:col-span-1">
              <span className="text-[10px] text-[#78716A] uppercase tracking-wider block mb-1">
                {t.composition}
              </span>
              <p className="text-xs text-[#3D3731] leading-snug">
                {category.specs.composition[currentLang]}
              </p>
            </div>

            {/* Applications */}
            <div className="p-3 bg-[#FAF7F2] border border-[#E8E2D8] sm:col-span-2 lg:col-span-1">
              <span className="text-[10px] text-[#78716A] uppercase tracking-wider block mb-1">
                {t.applications}
              </span>
              <p className="text-xs text-[#3D3731] leading-snug">
                {category.specs.applications[currentLang]}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* CORE FEATURE: CAROUSEL OF ALL THE PRODUCTS INSIDE THAT CATEGORY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14">
        
        {/* Clean Header: Just "Available Products" without excess naming or upper arrows */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E5DFD5]">
          <h2 className="text-xl sm:text-2xl font-serif font-light text-[#1C1917]">
            {t.availableProductsTitle}
          </h2>

          <span className="text-xs font-mono text-[#78716A]">
            {models.length} {t.modelsCount}
          </span>
        </div>

        {/* Carousel Track Container - Swipeable Left/Right with Touch & Mouse Drag */}
        <div 
          ref={carouselContainerRef}
          onScroll={updateScrollBounds}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex gap-4 sm:gap-6 overflow-x-auto px-1 sm:px-0 pb-4 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-none cursor-grab active:cursor-grabbing select-none"
          style={{ 
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {models.map((model) => {
            const firstImg = model.images[0] || category.image || 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80';
            const cardImgSrc = getProductImageUrl(model.id, firstImg) || firstImg;
            return (
              <div
                key={model.id}
                onClick={() => {
                  if (!hasMoved) {
                    onSelectProduct(model);
                  }
                }}
                className="w-[85vw] sm:w-80 md:w-84 shrink-0 snap-center sm:snap-start bg-[#FFFFFF] border border-[#DDD5C7] hover:border-[#9E7241] hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden group shadow-sm"
                id={`carousel-product-${model.id}`}
              >
                {/* Product Photo - Enlarged on mobile for prominent clarity */}
                <div className="relative h-72 sm:h-60 md:h-64 bg-[#1C1917] overflow-hidden">
                  <img 
                    src={cardImgSrc}
                    alt={model.name[currentLang]}
                    onError={(e) => {
                      if (firstImg && e.currentTarget.src !== firstImg) {
                        e.currentTarget.src = firstImg;
                      }
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                    draggable={false}
                  />

                  {/* Drop zone overlay for admin */}
                  <DropZoneOverlay
                    target={{ type: 'product', id: model.id, name: `${model.code} - ${model.name[currentLang]}` }}
                    currentLang={currentLang}
                    badgePosition="bottom-end"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 start-3 end-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2 py-0.5 bg-[#1C1917]/90 text-white font-mono text-xs font-bold border border-white/20">
                      {model.code}
                    </span>
                    <span className="px-2 py-0.5 bg-[#1E7E45]/90 text-white text-[10px] font-semibold flex items-center gap-1">
                      <Droplets className="w-2.5 h-2.5" />
                      {t.waterproofBadge}
                    </span>
                  </div>

                  {/* Photo count if multiple */}
                  {model.images.length > 1 && (
                    <div className="absolute bottom-3 start-3 text-[10px] font-mono text-white/90 bg-black/60 px-2 py-0.5 pointer-events-none">
                      {model.images.length} {currentLang === 'ar' ? 'صور حية' : 'Photos'}
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between bg-[#FFFFFF]">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-medium text-[#1C1917] mb-1 group-hover:text-[#9E7241] transition-colors">
                      {model.name[currentLang]}
                    </h3>
                    <p className="text-xs text-[#78716A] line-clamp-1 mb-3 font-light">
                      {model.subtitle[currentLang]}
                    </p>

                    <div className="space-y-1.5 py-2.5 border-t border-[#EFECE4] text-[11px] text-[#5C554E]">
                      <div className="flex items-center justify-between">
                        <span className="text-[#8C8278]">{t.dimensions}:</span>
                        <span className="font-mono text-[#1C1917]" dir="ltr">{model.dimensions}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#8C8278]">{t.thickness}:</span>
                        <span className="font-mono text-[#1C1917]" dir="ltr">{model.thickness}</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA: Click to Designated Page */}
                  <div className="mt-4 pt-3 border-t border-[#EFECE4]">
                    <button
                      className="w-full py-2.5 px-3 bg-[#FAF7F2] group-hover:bg-[#D4991A] group-hover:text-white border border-[#DDD5C7] group-hover:border-[#D4991A] text-xs font-semibold text-[#1C1917] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{t.clickToOpenModel}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Navigation Controls BELOW the cards: [ Prev Arrow ] [ Counter ] [ Next Arrow ] */}
        <div className="flex items-center justify-center gap-3.5 mt-5">
          <button
            onClick={() => handleScrollCarousel('prev')}
            className="w-11 h-11 border border-[#DDD5C7] bg-[#FFFFFF] hover:border-[#9E7241] hover:text-[#9E7241] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 text-[#1C1917]"
            aria-label="Previous Products"
            title="Previous"
          >
            <PrevChevron className="w-5 h-5" />
          </button>

          <span className="text-xs font-mono text-[#5C554E] px-3.5 py-1.5 bg-[#FFFFFF] border border-[#DDD5C7] shadow-2xs">
            {models.length} {t.modelsCount}
          </span>

          <button
            onClick={() => handleScrollCarousel('next')}
            className="w-11 h-11 border border-[#DDD5C7] bg-[#FFFFFF] hover:border-[#9E7241] hover:text-[#9E7241] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95 text-[#1C1917]"
            aria-label="Next Products"
            title="Next"
          >
            <NextChevron className="w-5 h-5" />
          </button>
        </div>

      </div>

    </div>
  );
};
