import React, { useState } from 'react';
import { 
  Droplets, 
  MessageSquare, 
  Eye, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Ruler, 
  Images,
  Sparkles
} from 'lucide-react';
import { ProductModel, ProductCategory, Language } from '../types';
import { PRODUCT_MODELS, CATEGORIES_CONFIG, isModelInCategory } from '../data/products';
import { TRANSLATIONS } from '../data/translations';
import { ProductDetailModal } from './ProductDetailModal';
import { useMedia } from '../context/MediaContext';
import { DropZoneOverlay } from './DropZoneOverlay';

interface ProductCatalogProps {
  currentLang: Language;
  activeCategory?: ProductCategory;
  onCategoryChange?: (cat: ProductCategory) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  currentLang,
  activeCategory,
  onCategoryChange
}) => {
  const { getProductGalleryUrls } = useMedia();
  const [internalCategory, setInternalCategory] = useState<ProductCategory>('all');
  const [activeModalModel, setActiveModalModel] = useState<ProductModel | null>(null);
  
  // Track the active image index for each individual model card
  const [cardImageIndices, setCardImageIndices] = useState<{ [modelId: string]: number }>({});

  const selectedCategory = activeCategory || internalCategory;

  const handleSelectCategory = (cat: ProductCategory) => {
    if (onCategoryChange) {
      onCategoryChange(cat);
    } else {
      setInternalCategory(cat);
    }
  };

  const t = TRANSLATIONS[currentLang];

  const filteredModels = PRODUCT_MODELS.filter((model) => isModelInCategory(model, selectedCategory));

  const getModelCount = (catId: string) => {
    if (catId === 'all') return PRODUCT_MODELS.length;
    return PRODUCT_MODELS.filter((m) => isModelInCategory(m, catId as ProductCategory)).length;
  };

  const handlePrevPhoto = (e: React.MouseEvent, modelId: string, total: number) => {
    e.stopPropagation();
    const currentIdx = cardImageIndices[modelId] || 0;
    const nextIdx = (currentIdx - 1 + total) % total;
    setCardImageIndices((prev) => ({ ...prev, [modelId]: nextIdx }));
  };

  const handleNextPhoto = (e: React.MouseEvent, modelId: string, total: number) => {
    e.stopPropagation();
    const currentIdx = cardImageIndices[modelId] || 0;
    const nextIdx = (currentIdx + 1) % total;
    setCardImageIndices((prev) => ({ ...prev, [modelId]: nextIdx }));
  };

  const handleDotClick = (e: React.MouseEvent, modelId: string, idx: number) => {
    e.stopPropagation();
    setCardImageIndices((prev) => ({ ...prev, [modelId]: idx }));
  };

  const getWhatsAppModelLink = (model: ProductModel) => {
    const text = currentLang === 'ar'
      ? `مرحباً شركة بيرليك، أود الاستفسار عن تفاصيل وسعر موديل: ${model.name.ar} (كود: ${model.code}) وتكلفة الشحن في سوريا.`
      : currentLang === 'tr'
      ? `Merhaba Birlik Şirketi, ${model.name.tr} (Kod: ${model.code}) modelinin fiyatı ve Suriye içi teslimat detayları hakkında bilgi rica ediyorum.`
      : `Hello Birlik Company, I would like to inquire about price, stock, and Syrian shipping for model: ${model.name.en} (Code: ${model.code}).`;
    return `https://wa.me/963995764573?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="products" className="py-16 md:py-24 bg-[#F5F0E8] border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[1px] w-6 bg-[#9E7241]" />
            <span className="text-[#9E7241] text-xs uppercase tracking-[0.25em] font-sans font-semibold">
              {currentLang === 'ar' ? 'تشكيلة المواد المعتمدة' : 'Curated Architectural Catalog'}
            </span>
            <div className="h-[1px] w-6 bg-[#9E7241]" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-light text-[#1C1917] tracking-tight">
            {t.catalog.title}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#5C554E] font-sans font-light leading-relaxed">
            {t.catalog.subtitle}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES_CONFIG.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = getModelCount(cat.id);
            const label = currentLang === 'ar' ? cat.nameAr : currentLang === 'tr' ? cat.nameTr : cat.nameEn;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id as ProductCategory)}
                className={`px-4 py-2.5 text-xs uppercase tracking-wider font-medium transition-all cursor-pointer flex items-center gap-2.5 border ${
                  isActive
                    ? 'border-[#24201D] bg-[#24201D] text-white shadow-sm'
                    : 'border-[#E0D7C9] bg-[#FFFFFF] text-[#5C554E] hover:border-[#9E7241] hover:text-[#1C1917] shadow-xs'
                }`}
              >
                <span>{label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isActive 
                    ? 'bg-[#9E7241] text-white font-bold' 
                    : 'bg-[#F4EFE6] text-[#78716A]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Model Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredModels.map((model) => {
            const rawImages = model.images && model.images.length > 0 ? model.images : [];
            const modelImages = getProductGalleryUrls(model.id, rawImages);
            const totalImages = modelImages.length;
            const activeImgIdx = (cardImageIndices[model.id] || 0) % (totalImages || 1);
            const fallbackImg = rawImages[0] || 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80';
            const currentImg = (modelImages[activeImgIdx] && modelImages[activeImgIdx].trim() !== '') ? modelImages[activeImgIdx] : fallbackImg;
            const primarySpec = model.specs[0];

            return (
              <div 
                key={model.id}
                className="group border border-[#E0D7C9] bg-[#FFFFFF] hover:border-[#9E7241] transition-all flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md"
              >
                {/* Top Image Multi-Photo Viewer on the Card */}
                <div className="relative aspect-[16/11] bg-[#EFE9DF] overflow-hidden">
                  <img 
                    src={currentImg} 
                    alt={`${model.name[currentLang]} - View ${activeImgIdx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* DropZone overlay for quick admin drop & assign to this product */}
                  <DropZoneOverlay
                    target={{ type: 'product', id: model.id, name: `${model.code} - ${model.name[currentLang]}` }}
                    currentLang={currentLang}
                    badgePosition="top-start"
                  />

                  {/* Top Badges (Model Code & 100% Waterproof) */}
                  <div className="absolute top-3 start-3 flex items-center gap-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E0D7C9] text-[#1C1917] font-bold shadow-xs">
                      {model.code}
                    </span>
                  </div>

                  <div className="absolute top-3 end-3">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E0D7C9] text-[10px] text-[#1E7E45] shadow-xs">
                      <Droplets className="w-3 h-3" />
                      <span className="font-semibold">{t.catalog.waterproofBadge}</span>
                    </div>
                  </div>

                  {/* Multi-Photo Next/Prev Controls on Card */}
                  {totalImages > 1 && (
                    <>
                      <button
                        onClick={(e) => handlePrevPhoto(e, model.id, totalImages)}
                        className="absolute start-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#FFFFFF]/85 hover:bg-[#FFFFFF] text-[#1C1917] border border-[#E0D7C9] transition-all cursor-pointer shadow-xs z-10"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
                      </button>

                      <button
                        onClick={(e) => handleNextPhoto(e, model.id, totalImages)}
                        className="absolute end-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#FFFFFF]/85 hover:bg-[#FFFFFF] text-[#1C1917] border border-[#E0D7C9] transition-all cursor-pointer shadow-xs z-10"
                        aria-label="Next photo"
                      >
                        <ChevronRight className="w-4 h-4 rtl:rotate-180" />
                      </button>
                    </>
                  )}

                  {/* Bottom Multi-Photo Indicators */}
                  <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between pointer-events-none z-10">
                    {/* Photos Count Badge */}
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E0D7C9] text-[10px] text-[#1C1917] font-mono pointer-events-auto shadow-xs">
                      <Images className="w-3 h-3 text-[#9E7241]" />
                      <span>{activeImgIdx + 1}/{totalImages} {currentLang === 'ar' ? 'صور' : 'Photos'}</span>
                    </div>

                    {/* Dot Indicators */}
                    <div className="flex items-center gap-1 bg-[#FFFFFF]/90 backdrop-blur-sm px-2 py-1 border border-[#E0D7C9] pointer-events-auto shadow-xs">
                      {modelImages.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={(e) => handleDotClick(e, model.id, dotIdx)}
                          className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                            activeImgIdx === dotIdx ? 'bg-[#9E7241] scale-125' : 'bg-[#C5BCB0]'
                          }`}
                          aria-label={`Go to photo ${dotIdx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-widest text-[#78716A] font-medium">
                        {model.category === 'walls' && (currentLang === 'ar' ? 'ألواح بديل الرخام' : 'Wall Panel')}
                        {model.category === 'slats' && (currentLang === 'ar' ? 'شرائح بديل الخشب' : 'Wall Slat')}
                        {model.category === 'baseboards' && (currentLang === 'ar' ? 'نعلة جدارية' : 'Baseboard')}
                      </span>
                      {model.colorHex && (
                        <div 
                          className="w-3.5 h-3.5 rounded-full border border-[#D8D0C3]" 
                          style={{ backgroundColor: model.colorHex }}
                          title="Color Swatch"
                        />
                      )}
                    </div>

                    <h3 className="text-lg font-serif font-medium text-[#1C1917] group-hover:text-[#9E7241] transition-colors leading-snug">
                      {model.name[currentLang]}
                    </h3>

                    <p className="text-xs text-[#5C554E] font-light line-clamp-2 leading-relaxed">
                      {model.subtitle[currentLang]}
                    </p>
                  </div>

                  {/* Specs Highlights */}
                  <div className="space-y-2 pt-2 border-t border-[#EFE9DF]">
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1.5 text-[#5C554E] bg-[#FAF7F2] p-2 border border-[#E5DFD5]">
                        <Ruler className="w-3.5 h-3.5 text-[#9E7241] shrink-0" />
                        <span className="truncate">{model.dimensions}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-[#5C554E] bg-[#FAF7F2] p-2 border border-[#E5DFD5]">
                        <Layers className="w-3.5 h-3.5 text-[#9E7241] shrink-0" />
                        <span className="truncate">{model.thickness}</span>
                      </div>
                    </div>

                    {/* Primary Highlight Spec */}
                    {primarySpec && (
                      <div className="text-[11px] px-2.5 py-1.5 bg-[#FAF7F2] border border-[#E5DFD5] text-[#5C554E] flex items-center justify-between">
                        <span className="text-[#78716A]">{primarySpec.label[currentLang]}:</span>
                        <span className="text-[#1C1917] font-medium truncate max-w-[60%]">
                          {primarySpec.value[currentLang]}
                        </span>
                      </div>
                    )}

                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    
                    {/* Open Full Gallery & Specs Modal */}
                    <button
                      onClick={() => setActiveModalModel(model)}
                      className="flex-1 px-3 py-2.5 bg-[#FAF7F2] hover:bg-[#FFFFFF] border border-[#E0D7C9] hover:border-[#9E7241] text-xs text-[#1C1917] hover:text-[#9E7241] font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t.catalog.viewGalleryAndSpecs}</span>
                    </button>

                    {/* Quick WhatsApp Inquiry for this exact model */}
                    <a
                      href={getWhatsAppModelLink(model)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-[#F4FAF6] hover:bg-[#1E7E45] text-[#1E7E45] hover:text-white border border-[#1E7E45]/30 transition-all flex items-center justify-center shadow-2xs"
                      title={t.catalog.inquireModelWhatsApp}
                      aria-label={t.catalog.inquireModelWhatsApp}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {filteredModels.length === 0 && (
          <div className="text-center py-16 border border-[#E0D7C9] bg-[#FFFFFF] text-[#78716A]">
            <p className="text-sm">{t.catalog.noModelsFound}</p>
          </div>
        )}

      </div>

      {/* Model Detail & Gallery Lightbox Modal */}
      <ProductDetailModal
        model={activeModalModel}
        currentLang={currentLang}
        onClose={() => setActiveModalModel(null)}
      />

    </section>
  );
};
