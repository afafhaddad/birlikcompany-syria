import React, { useState, useEffect } from 'react';
import { 
  X, 
  Droplets, 
  MessageSquare, 
  Phone, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Layers, 
  Ruler, 
  ShieldCheck,
  Building2,
  Truck
} from 'lucide-react';
import { ProductModel, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { useMedia } from '../context/MediaContext';
import { DropZoneOverlay } from './DropZoneOverlay';

interface ProductDetailModalProps {
  model: ProductModel | null;
  currentLang: Language;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  model,
  currentLang,
  onClose
}) => {
  const { getProductGalleryUrls } = useMedia();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const rawImages = model?.images && model.images.length > 0 ? model.images : [];
  const galleryUrls = model ? getProductGalleryUrls(model.id, rawImages) : [];
  const images = galleryUrls.length > 0 ? galleryUrls : (rawImages.length > 0 ? rawImages : ['https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=85']);
  const totalImages = images.length;
  const safeActiveIdx = totalImages > 0 ? Math.min(activeImageIndex, totalImages - 1) : 0;
  const safeMainImgSrc = images[safeActiveIdx] || rawImages[0] || 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=85';

  // Reset image index whenever modal opens with a new model
  useEffect(() => {
    setActiveImageIndex(0);
  }, [model]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!model || totalImages === 0) return;
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev + 1) % totalImages);
      }
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [model, onClose, totalImages]);

  if (!model) return null;

  const t = TRANSLATIONS[currentLang];

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % totalImages);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const getWhatsAppMessageLink = () => {
    const text = currentLang === 'ar'
      ? `مرحباً شركة بيرليك، أود الاستفسار عن تفاصيل وتوفر وأسعار موديل: ${model.name.ar} (رمز الموديل: ${model.code})، وإمكانية الشحن إلى مدينتي في سوريا.`
      : currentLang === 'tr'
      ? `Merhaba Birlik Şirketi, ${model.name.tr} (Model Kodu: ${model.code}) hakkında fiyat, stok ve Suriye içi kargo bilgisi almak istiyorum.`
      : `Hello Birlik Company, I would like to inquire about pricing, stock, and shipping for model: ${model.name.en} (Code: ${model.code}).`;
    return `https://wa.me/963995764573?text=${encodeURIComponent(text)}`;
  };

  const getCategoryLabel = () => {
    if (model.category === 'walls') {
      return currentLang === 'ar' ? 'ألواح الجدران (بديل الرخام SPC)' : currentLang === 'tr' ? 'Duvar Panelleri' : 'SPC Wall Panels';
    }
    if (model.category === 'slats') {
      return currentLang === 'ar' ? 'شرائح بديل الخشب المضلعة' : currentLang === 'tr' ? 'Ahşap Çıtalar' : 'Fluted Wall Slats';
    }
    return currentLang === 'ar' ? 'النعلات الجدارية العازلة' : currentLang === 'tr' ? 'Süpürgelikler' : 'Baseboards';
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#FAF7F2] border border-[#E5DFD5] shadow-2xl text-[#1C1917] my-6 font-sans overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-[#E5DFD5] bg-[#FFFFFF]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-widest text-[#9E7241] font-semibold">
                {getCategoryLabel()}
              </span>
              <span className="text-[#C5BCB0]">•</span>
              <span className="text-[11px] font-mono px-2 py-0.5 bg-[#FAF7F2] border border-[#E5DFD5] text-[#1C1917] font-bold">
                {model.code}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-medium text-[#1C1917] mt-1">
              {model.name[currentLang]}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 border border-[#E5DFD5] bg-[#FAF7F2] hover:bg-[#FFFFFF] hover:text-[#9E7241] text-[#78716A] transition-colors cursor-pointer"
            aria-label={t.modal.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Multi-Photo Interactive Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#EFE9DF] border border-[#E5DFD5]">
              <img 
                src={safeMainImgSrc} 
                alt={`${model.name[currentLang]} - ${safeActiveIdx + 1}`}
                onError={(e) => {
                  const fallback = 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=85';
                  if (e.currentTarget.src !== fallback) {
                    e.currentTarget.src = fallback;
                  }
                }}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {/* Dropzone overlay for admin */}
              <DropZoneOverlay
                target={{ type: 'product', id: model.id, name: `${model.code} - ${model.name[currentLang]}` }}
                currentLang={currentLang}
                badgePosition="top-start"
              />
              
              {/* Photo Navigation Overlays */}
              {totalImages > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute start-3 top-1/2 -translate-y-1/2 p-2.5 bg-[#FFFFFF]/85 hover:bg-[#FFFFFF] text-[#1C1917] border border-[#E5DFD5] transition-colors cursor-pointer shadow-md z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute end-3 top-1/2 -translate-y-1/2 p-2.5 bg-[#FFFFFF]/85 hover:bg-[#FFFFFF] text-[#1C1917] border border-[#E5DFD5] transition-colors cursor-pointer shadow-md z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                  </button>
                </>
              )}

              {/* Photo Counter Badge */}
              <div className="absolute bottom-3 start-3 px-3 py-1 bg-[#FFFFFF]/90 backdrop-blur-md border border-[#E5DFD5] text-xs text-[#1C1917] font-mono flex items-center gap-1.5 shadow-xs z-10">
                <span>{t.catalog.photoIndex}</span>
                <span className="text-[#9E7241] font-bold">{safeActiveIdx + 1}</span>
                <span>{t.catalog.of}</span>
                <span>{totalImages}</span>
              </div>

              {/* 100% Waterproof Guarantee Tag */}
              <div className="absolute top-3 end-3 px-3 py-1 bg-[#FFFFFF]/90 backdrop-blur-md border border-[#1E7E45]/30 text-xs text-[#1E7E45] font-semibold flex items-center gap-1.5 shadow-xs z-10">
                <Droplets className="w-3.5 h-3.5" />
                <span>{t.modal.waterproofValue}</span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {totalImages > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 sm:gap-3 pt-1">
                {images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[16/10] overflow-hidden border transition-all cursor-pointer ${
                      safeActiveIdx === idx 
                        ? 'border-[#9E7241] ring-2 ring-[#9E7241]' 
                        : 'border-[#E5DFD5] opacity-70 hover:opacity-100 hover:border-[#B5A998]'
                    }`}
                  >
                    <img 
                      src={imgUrl || 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=400&q=80'} 
                      alt={`Thumbnail ${idx + 1}`} 
                      onError={(e) => {
                        const fallback = 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=400&q=80';
                        if (e.currentTarget.src !== fallback) {
                          e.currentTarget.src = fallback;
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 end-1 px-1.5 py-0.5 bg-[#FFFFFF]/85 text-[10px] text-[#1C1917] font-mono shadow-2xs">
                      #{idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Model Description */}
          <div className="bg-[#FFFFFF] p-4 border border-[#E5DFD5] space-y-2 shadow-xs">
            <p className="text-sm font-semibold text-[#9E7241]">
              {model.subtitle[currentLang]}
            </p>
            <p className="text-xs sm:text-sm text-[#5C554E] font-light leading-relaxed">
              {model.description[currentLang]}
            </p>
          </div>

          {/* Key Quick Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            
            <div className="p-3 border border-[#E5DFD5] bg-[#FFFFFF] space-y-1 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs text-[#78716A]">
                <Ruler className="w-3.5 h-3.5 text-[#9E7241]" />
                <span className="uppercase tracking-wider">{t.modal.dimensions}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#1C1917] font-semibold">{model.dimensions}</p>
            </div>

            <div className="p-3 border border-[#E5DFD5] bg-[#FFFFFF] space-y-1 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs text-[#78716A]">
                <Layers className="w-3.5 h-3.5 text-[#9E7241]" />
                <span className="uppercase tracking-wider">{t.modal.thickness}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#1C1917] font-semibold">{model.thickness}</p>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3 border border-[#E5DFD5] bg-[#FFFFFF] space-y-1 shadow-xs">
              <div className="flex items-center gap-1.5 text-xs text-[#78716A]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1E7E45]" />
                <span className="uppercase tracking-wider">{t.catalog.waterproofBadge}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#1E7E45] font-semibold">
                {currentLang === 'ar' ? 'مقاوم للماء 100%' : '100% Waterproof'}
              </p>
            </div>

          </div>

          {/* Detailed Specifications Table (Extensible for user additions) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-widest text-[#9E7241] font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#9E7241]" />
                <span>{t.modal.specsHeading}</span>
              </h3>
              <span className="text-[11px] text-[#78716A] font-mono font-bold">
                {model.code}
              </span>
            </div>

            <div className="border border-[#E5DFD5] divide-y divide-[#EFECE4] bg-[#FFFFFF] text-xs sm:text-sm shadow-xs">
              {model.specs.map((specItem, sIdx) => (
                <div key={sIdx} className="grid grid-cols-1 sm:grid-cols-3 p-3 gap-1 sm:gap-4 hover:bg-[#FAF7F2] transition-colors">
                  <span className="text-[#78716A] font-medium">
                    {specItem.label[currentLang]}
                  </span>
                  <span className="sm:col-span-2 text-[#1C1917] font-light">
                    {specItem.value[currentLang]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Consultation and Shipping Assurances */}
          <div className="p-3.5 border border-[#E5DFD5] bg-[#FFFFFF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#5C554E] shadow-xs">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#9E7241]" />
              <span>
                {currentLang === 'ar' 
                  ? 'المعاينة الحية للعينات متوفرة في مقر اللاذقية (تقاطع شارع بغداد مع شارع بورسعيد)' 
                  : 'Physical samples available for inspection at our Lattakia headquarters (Baghdad St)'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#1E7E45] font-semibold">
              <Truck className="w-4 h-4" />
              <span>
                {currentLang === 'ar' 
                  ? 'الشحن متاح لكافة المدن السورية' 
                  : 'Shipping available across all Syrian cities'}
              </span>
            </div>
          </div>

        </div>

        {/* Modal Footer / Direct Inquiry Buttons */}
        <div className="px-5 sm:px-8 py-4 border-t border-[#E5DFD5] bg-[#FFFFFF] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={getWhatsAppMessageLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#1E7E45] hover:bg-[#166034] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.modal.inquireViaWhatsApp}</span>
            </a>

            <a
              href="tel:+963995764573"
              className="px-5 py-3 border border-[#E5DFD5] bg-[#FAF7F2] hover:border-[#9E7241] text-[#1C1917] hover:text-[#9E7241] text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#9E7241]" />
              <span>{t.modal.callSales}</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs text-[#78716A] hover:text-[#1C1917] transition-colors cursor-pointer"
          >
            {t.modal.close}
          </button>
        </div>

      </div>
    </div>
  );
};
