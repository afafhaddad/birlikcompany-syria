import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Droplets, 
  ShieldCheck, 
  Maximize2, 
  MessageSquare, 
  Phone, 
  Building2, 
  Check, 
  X,
  Layers,
  Home,
  CheckCircle2,
  Plus,
  Star,
  Trash2,
  UploadCloud,
  FolderOpen,
  RefreshCw
} from 'lucide-react';
import { Language, ProductCategory, ProductModel } from '../types';
import { CATEGORIES_DATA, PRODUCT_MODELS, isModelInCategory } from '../data/products';
import { useMedia } from '../context/MediaContext';
import { DropZoneOverlay } from './DropZoneOverlay';

interface ProductDetailPageProps {
  model: ProductModel;
  currentLang: Language;
  onBackToCategory: () => void;
  onBackToCatalogue: () => void;
  onBackToHome: () => void;
  onSelectAnotherModel: (model: ProductModel) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  model,
  currentLang,
  onBackToCategory,
  onBackToCatalogue,
  onBackToHome,
  onSelectAnotherModel
}) => {
  const { 
    getProductGalleryUrls, 
    isAdmin, 
    uploadFiles, 
    removeProductImage, 
    setProductMainImage, 
    openMediaLibrary,
    resetProductToDefaults,
    registry
  } = useMedia();
  const isRtl = currentLang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;
  const NextChevron = isRtl ? ChevronLeft : ChevronRight;
  const PrevChevron = isRtl ? ChevronRight : ChevronLeft;

  // Find parent category info
  const categoryInfo = CATEGORIES_DATA.find((c) => isModelInCategory(model, c.id)) || CATEGORIES_DATA[0];

  // Sibling models in the same category for previous/next browsing
  const siblingModels = PRODUCT_MODELS.filter((m) => isModelInCategory(m, categoryInfo.id));
  const currentModelIndex = siblingModels.findIndex((m) => m.id === model.id);
  const prevModel = currentModelIndex > 0 ? siblingModels[currentModelIndex - 1] : siblingModels[siblingModels.length - 1];
  const nextModel = currentModelIndex < siblingModels.length - 1 ? siblingModels[currentModelIndex + 1] : siblingModels[0];

  // Image gallery state
  const rawImages = model.images && model.images.length > 0 
    ? model.images 
    : ['https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=85'];
  const galleryUrls = getProductGalleryUrls(model.id, rawImages);
  const images = galleryUrls.length > 0 ? galleryUrls : rawImages;

  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [confirmRemoveImg, setConfirmRemoveImg] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState<boolean>(false);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  const safeActiveIdx = Math.min(activeImageIdx, Math.max(0, images.length - 1));
  const activeProductImgSrc = images[safeActiveIdx] || rawImages[0];

  const handlePrevImg = () => {
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImg = () => {
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const handleUploadGalleryFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploadingGallery(true);
      try {
        const urls = await uploadFiles(e.target.files, {
          type: 'product',
          id: model.id,
          name: `${model.code} - ${model.name[currentLang]}`,
          mode: 'add',
        });
        if (urls && urls.length > 0) {
          setActiveImageIdx(images.length);
        }
      } catch (err) {
        console.error('Gallery upload error:', err);
      } finally {
        setIsUploadingGallery(false);
        if (galleryFileInputRef.current) galleryFileInputRef.current.value = '';
      }
    }
  };

  // WhatsApp order text with model code and name
  const getWhatsAppOrderLink = () => {
    const text = currentLang === 'ar'
      ? `مرحباً شركة بيرليك، أود الاستفسار عن تفاصيل وتوفر وسعر موديل: ${model.name.ar} (كود: ${model.code}) لقسم (${categoryInfo.name.ar}) والشحن إلى مدينتي في سوريا.`
      : currentLang === 'tr'
      ? `Merhaba Birlik Şirketi, ${categoryInfo.name.tr} kategorisindeki ${model.name.tr} (Kod: ${model.code}) modelinin fiyatı, stoğu ve teslimat detayları hakkında bilgi almak istiyorum.`
      : `Hello Birlik Company, I would like to inquire about availability, pricing, and Syrian shipping for model: ${model.name.en} (Code: ${model.code}) in category (${categoryInfo.name.en}).`;
    return `https://wa.me/963995764573?text=${encodeURIComponent(text)}`;
  };

  const translations = {
    ar: {
      breadcrumbHome: 'الرئيسية',
      breadcrumbCatalogue: 'كتالوج المنتجات',
      breadcrumbCategory: categoryInfo.name.ar,
      backToCategoryBtn: `العودة إلى ${categoryInfo.name.ar}`,
      specificationsTitle: 'المواصفات الفنية المعتمدة للموديل',
      photoGalleryTitle: 'معرض الصور الحية وتفاصيل الملمس',
      codeLabel: 'كود الموديل',
      dimensionsLabel: 'المقاس والأبعاد',
      thicknessLabel: 'السماكة',
      waterproofLabel: 'مقاومة الرطوبة والماء',
      waterproofValue: 'مقاوم للماء والرطوبة بنسبة 100%',
      orderViaWhatsApp: 'طلب واستفسار عبر واتساب',
      callSales: 'اتصال مباشر بفريق المبيعات',
      sampleNotice: 'المعاينة الحية لعينات هذا الموديل متوفرة في مقرنا باللاذقية',
      prevProduct: 'الموديل السابق',
      nextProduct: 'الموديل التالي',
      clickToEnlarge: 'انقر للتكبير والشاشة الكاملة',
      inStock: 'متوفر للطلب والتوريد المباشر'
    },
    en: {
      breadcrumbHome: 'Home',
      breadcrumbCatalogue: 'Product Catalogue',
      breadcrumbCategory: categoryInfo.name.en,
      backToCategoryBtn: `Back to ${categoryInfo.name.en}`,
      specificationsTitle: 'Certified Technical Specifications',
      photoGalleryTitle: 'High-Resolution Gallery & Texture Views',
      codeLabel: 'Model Code',
      dimensionsLabel: 'Dimensions',
      thicknessLabel: 'Thickness',
      waterproofLabel: 'Waterproof Rating',
      waterproofValue: '100% Water & Moisture Impervious',
      orderViaWhatsApp: 'Inquire & Order via WhatsApp',
      callSales: 'Call Sales Team',
      sampleNotice: 'Physical sample swatches for this model available at our Lattakia headquarters',
      prevProduct: 'Previous Model',
      nextProduct: 'Next Model',
      clickToEnlarge: 'Click to enlarge full screen',
      inStock: 'In Stock for Immediate Supply'
    },
    tr: {
      breadcrumbHome: 'Ana Sayfa',
      breadcrumbCatalogue: 'Ürün Kataloğu',
      breadcrumbCategory: categoryInfo.name.tr,
      backToCategoryBtn: `${categoryInfo.name.tr} Bölümüne Dön`,
      specificationsTitle: 'Onaylı Teknik Özellikler',
      photoGalleryTitle: 'Yüksek Çözünürlüklü Fotoğraflar ve Doku',
      codeLabel: 'Model Kodu',
      dimensionsLabel: 'Ölçüler',
      thicknessLabel: 'Kalınlık',
      waterproofLabel: 'Su Geçirmezlik',
      waterproofValue: '%100 Su ve Nem Geçirmez',
      orderViaWhatsApp: 'WhatsApp ile Bilgi ve Sipariş',
      callSales: 'Satış Ekibini Ara',
      sampleNotice: 'Bu modelin gerçek numuneleri Lazkiye merkezimizde incelenebilir',
      prevProduct: 'Önceki Model',
      nextProduct: 'Sonraki Model',
      clickToEnlarge: 'Tam ekran büyütmek için tıklayın',
      inStock: 'Doğrudan Sevkiyata Hazır'
    }
  };

  const t = translations[currentLang];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] font-sans pb-24">
      
      {/* Top Breadcrumbs Bar */}
      <div className="border-b border-[#E5DFD5] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          
          <nav className="flex items-center flex-wrap gap-2 text-xs text-[#78716A]">
            <button 
              onClick={onBackToHome}
              className="hover:text-[#9E7241] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{t.breadcrumbHome}</span>
            </button>
            <span className="text-[#D4AF37]">/</span>
            <button 
              onClick={onBackToCatalogue}
              className="hover:text-[#9E7241] transition-colors cursor-pointer"
            >
              {t.breadcrumbCatalogue}
            </button>
            <span className="text-[#D4AF37]">/</span>
            <button 
              onClick={onBackToCategory}
              className="hover:text-[#9E7241] transition-colors cursor-pointer"
            >
              {t.breadcrumbCategory}
            </button>
            <span className="text-[#D4AF37]">/</span>
            <span className="text-[#1C1917] font-bold">{model.name[currentLang]}</span>
          </nav>

          {/* Quick Back to Category Button */}
          <button
            onClick={onBackToCategory}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9E7241] hover:text-[#7A562D] transition-colors cursor-pointer"
          >
            <BackArrow className="w-4 h-4" />
            <span>{t.backToCategoryBtn}</span>
          </button>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        
        {/* Sibling Model Fast Navigation & Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E5DFD5]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 bg-[#9E7241] text-white">
                {model.code}
              </span>
              <span className="text-xs text-[#78716A] font-medium">
                {categoryInfo.name[currentLang]}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-[#1E7E45] font-semibold">
                <CheckCircle2 className="w-3 h-3" />
                <span>{t.inStock}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-[#1C1917]">
              {model.name[currentLang]}
            </h1>
            <p className="text-xs sm:text-sm text-[#6E645A] font-light mt-1">
              {model.subtitle[currentLang]}
            </p>
          </div>

          {/* Previous / Next Model Steppers in this Category */}
          {siblingModels.length > 1 && (
            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                onClick={() => onSelectAnotherModel(prevModel)}
                className="px-3 py-1.5 border border-[#DDD5C7] bg-[#FFFFFF] hover:border-[#9E7241] text-xs text-[#5C554E] hover:text-[#9E7241] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                title={prevModel.name[currentLang]}
              >
                <PrevChevron className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.prevProduct}</span>
              </button>
              <button
                onClick={() => onSelectAnotherModel(nextModel)}
                className="px-3 py-1.5 border border-[#DDD5C7] bg-[#FFFFFF] hover:border-[#9E7241] text-xs text-[#5C554E] hover:text-[#9E7241] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                title={nextModel.name[currentLang]}
              >
                <span className="hidden sm:inline">{t.nextProduct}</span>
                <NextChevron className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Product Details Layout: Gallery on Left / Specs & Order on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* SECTION 1: Designated Pictures & Gallery (7 cols) */}
          <div className="lg:col-span-7">
            
            {/* Primary Large Picture Frame */}
            <div className="relative bg-[#FFFFFF] border border-[#DDD5C7] shadow-sm overflow-hidden group">
              <div 
                className="relative h-80 sm:h-96 md:h-[480px] cursor-zoom-in"
                onClick={() => setLightboxOpen(true)}
              >
                <img 
                  src={activeProductImgSrc} 
                  alt={`${model.code} - ${model.name[currentLang]} | ${categoryInfo.name[currentLang]} - شركة بيرليك لديكور وتكسية الجدران في اللاذقية وسوريا`} 
                  onError={(e) => {
                    const fallback = categoryInfo.image || 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=85';
                    if (e.currentTarget.src !== fallback) {
                      e.currentTarget.src = fallback;
                    }
                  }}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-102"
                />

                {/* Dropzone overlay for admin */}
                <DropZoneOverlay
                  target={{ type: 'product', id: model.id, name: `${model.code} - ${model.name[currentLang]}` }}
                  currentLang={currentLang}
                  badgePosition="top-start"
                />

                {/* Picture Index Pill */}
                <div className="absolute top-4 start-4 bg-black/75 text-white font-mono text-xs px-2.5 py-1 backdrop-blur-xs">
                  {safeActiveIdx + 1} / {images.length}
                </div>

                {/* Zoom indicator */}
                <div className="absolute top-4 end-4 bg-white/90 text-[#1C1917] p-2 border border-[#DDD5C7] shadow-xs opacity-80 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4 text-[#9E7241]" />
                </div>

                {/* Light gradient overlay on bottom */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-between text-white text-xs">
                  <span className="font-light">{t.clickToEnlarge}</span>
                  <span className="font-mono text-[#D4AF37]">{model.code}</span>
                </div>
              </div>

              {/* Prev / Next Image Overlay Controls */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImg();
                    }}
                    className="absolute start-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#1C1917] flex items-center justify-center shadow-md transition-all cursor-pointer"
                    aria-label="Previous image"
                  >
                    <PrevChevron className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImg();
                    }}
                    className="absolute end-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#1C1917] flex items-center justify-center shadow-md transition-all cursor-pointer"
                    aria-label="Next image"
                  >
                    <NextChevron className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip / Carousel & Admin Multi-Image Controls */}
            {(images.length > 1 || isAdmin) && (
              <div className="mt-4 space-y-2">
                
                {/* Admin Multi-Photo Helper notice */}
                {isAdmin && (
                  <div className="flex flex-wrap items-center justify-between text-[11px] text-[#78716A] px-1 gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="flex items-center gap-1 font-medium">
                        <span className="text-[#9E7241] font-bold">{images.length}</span> {currentLang === 'ar' ? 'صور في معرض الموديل' : 'photos in model gallery'}
                        {images.length > 1 && (currentLang === 'ar' ? ' • انقر على النجمة لجعل أي صورة هي الرئيسية' : ' • Click star to set any photo as main')}
                      </span>
                      {registry.products?.[model.id] && (
                        <button
                          type="button"
                          onClick={async () => {
                            await resetProductToDefaults(model.id);
                            setActiveImageIdx(0);
                          }}
                          className="text-[#9E7241] hover:text-red-600 underline font-medium cursor-pointer text-[10.5px]"
                          title={currentLang === 'ar' ? 'إعادة تعيين صور الموديل إلى صور المصنع الافتراضية' : 'Restore original factory photos'}
                        >
                          {currentLang === 'ar' ? '↺ استعادة الصور الأصلية' : '↺ Restore Defaults'}
                        </button>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => openMediaLibrary({ type: 'product', id: model.id, name: `${model.code} - ${model.name[currentLang]}`, mode: 'add' })}
                      className="text-[#9E7241] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <FolderOpen className="w-3 h-3" />
                      <span>{currentLang === 'ar' ? 'فتح المكتبة' : 'Media Library'}</span>
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative group shrink-0"
                    >
                      <button
                        onClick={() => setActiveImageIdx(idx)}
                        className={`relative w-20 h-20 sm:w-24 sm:h-24 block border-2 overflow-hidden transition-all cursor-pointer ${
                          safeActiveIdx === idx 
                            ? 'border-[#9E7241] ring-2 ring-[#9E7241]/30 scale-102' 
                            : 'border-[#DDD5C7] opacity-75 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={img || categoryInfo.image || 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=400&q=80'} 
                          alt={`${model.code} - ${model.name[currentLang]} صورة #${idx + 1} | Birlik Company Lattakia Syria`} 
                          onError={(e) => {
                            const fallback = categoryInfo.image || 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=400&q=80';
                            if (e.currentTarget.src !== fallback) {
                              e.currentTarget.src = fallback;
                            }
                          }}
                          className="w-full h-full object-cover object-center"
                        />

                        {/* Main Cover Badge */}
                        {idx === 0 && (
                          <span className="absolute top-1 start-1 px-1.5 py-0.5 bg-[#9E7241] text-white text-[9px] font-bold shadow-xs">
                            {currentLang === 'ar' ? 'الرئيسية' : 'Main'}
                          </span>
                        )}
                      </button>

                      {/* Admin Quick Action Controls over Thumbnail */}
                      {isAdmin && (
                        confirmRemoveImg === img ? (
                          <div 
                            onClick={(e) => e.stopPropagation()}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xs flex flex-col items-center justify-center p-1.5 text-center text-white z-20 animate-fadeIn"
                          >
                            <p className="text-[10px] font-bold text-white mb-1.5 leading-tight">
                              {currentLang === 'ar' ? 'إزالة الصورة؟' : 'Remove photo?'}
                            </p>
                            <div className="flex items-center gap-1 w-full">
                              <button
                                type="button"
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  setConfirmRemoveImg(null);
                                  await removeProductImage(model.id, img);
                                  setActiveImageIdx(0);
                                }}
                                className="flex-1 py-1 bg-red-600 hover:bg-red-700 text-white text-[9.5px] font-bold transition-colors cursor-pointer rounded-xs"
                              >
                                {currentLang === 'ar' ? 'إزالة' : 'Remove'}
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setConfirmRemoveImg(null);
                                }}
                                className="flex-1 py-1 bg-[#44403C] hover:bg-[#57534E] text-white text-[9.5px] font-medium transition-colors cursor-pointer rounded-xs"
                              >
                                {currentLang === 'ar' ? 'إلغاء' : 'Cancel'}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="absolute top-1 end-1 flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            {idx !== 0 && (
                              <button
                                type="button"
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  await setProductMainImage(model.id, img);
                                  setActiveImageIdx(0);
                                }}
                                className="p-1 bg-black/80 hover:bg-[#D4AF37] text-white hover:text-black rounded-xs transition-colors cursor-pointer shadow-xs"
                                title={currentLang === 'ar' ? 'تعيين هذه الصورة كرئيسية للموديل' : 'Make this the main image'}
                              >
                                <Star className="w-3 h-3" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setConfirmRemoveImg(img);
                              }}
                              className="p-1 bg-black/80 hover:bg-red-600 text-white rounded-xs transition-colors cursor-pointer shadow-xs"
                              title={currentLang === 'ar' ? 'إزالة الصورة من هذا الموديل' : 'Remove from product'}
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  ))}

                  {/* Admin "Add Another Image" Tile */}
                  {isAdmin && (
                    <>
                      <input 
                        type="file"
                        ref={galleryFileInputRef}
                        multiple
                        accept="image/*"
                        onChange={handleUploadGalleryFiles}
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => galleryFileInputRef.current?.click()}
                        disabled={isUploadingGallery}
                        className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 border-2 border-dashed border-[#9E7241]/60 hover:border-[#9E7241] bg-[#FAF7F2] hover:bg-[#F3ECE0] flex flex-col items-center justify-center gap-1 text-[#9E7241] transition-all cursor-pointer shadow-2xs group"
                        title={currentLang === 'ar' ? 'إضافة صورة أو صور جديدة لمعرض هذا الموديل' : 'Add image(s) to this product gallery'}
                      >
                        {isUploadingGallery ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            <span className="text-[10px] font-medium">{currentLang === 'ar' ? 'جاري الرفع...' : 'Uploading...'}</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-5 h-5 group-hover:scale-125 transition-transform" />
                            <span className="text-[10.5px] font-bold text-center leading-tight">
                              {currentLang === 'ar' ? '+ إضافة صورة' : '+ Add Image'}
                            </span>
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Description Paragraph */}
            <div className="mt-6 p-5 bg-[#FFFFFF] border border-[#DDD5C7] text-xs sm:text-sm text-[#4A423A] leading-relaxed font-light">
              <p>{model.description[currentLang]}</p>
            </div>

          </div>

          {/* SECTION 2: Specific Specs & Order Actions (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            
            <div className="bg-[#FFFFFF] border border-[#DDD5C7] p-6 sm:p-7 shadow-xs">
              
              <div className="flex items-center gap-2 pb-3 mb-5 border-b border-[#EFECE4]">
                <ShieldCheck className="w-5 h-5 text-[#9E7241]" />
                <h2 className="font-serif text-lg font-semibold text-[#1C1917]">
                  {t.specificationsTitle}
                </h2>
              </div>

              {/* Specs Table List */}
              <div className="space-y-3.5 text-xs sm:text-[13px]">
                
                {/* 1. Code */}
                <div className="flex items-center justify-between py-2 border-b border-[#F2ECE4]">
                  <span className="text-[#78716A] font-medium">{t.codeLabel}:</span>
                  <span className="font-mono font-bold text-[#1C1917] bg-[#F7F4EE] px-2.5 py-0.5 border border-[#E8E2D8]">
                    {model.code}
                  </span>
                </div>

                {/* 2. Dimensions */}
                <div className="flex items-center justify-between py-2 border-b border-[#F2ECE4]">
                  <span className="text-[#78716A] font-medium">{t.dimensionsLabel}:</span>
                  <span className="font-mono font-semibold text-[#1C1917]" dir="ltr">
                    {model.dimensions}
                  </span>
                </div>

                {/* 3. Thickness */}
                <div className="flex items-center justify-between py-2 border-b border-[#F2ECE4]">
                  <span className="text-[#78716A] font-medium">{t.thicknessLabel}:</span>
                  <span className="font-mono font-semibold text-[#1C1917]" dir="ltr">
                    {model.thickness}
                  </span>
                </div>

                {/* 4. Waterproof */}
                <div className="flex items-center justify-between py-2 border-b border-[#F2ECE4]">
                  <span className="text-[#78716A] font-medium">{t.waterproofLabel}:</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[#1E7E45]">
                    <Droplets className="w-3.5 h-3.5" />
                    <span>{t.waterproofValue}</span>
                  </span>
                </div>

                {/* 5. Dynamic Extensible Specs (if model has custom spec items) */}
                {model.specs && model.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-center justify-between py-2 border-b border-[#F2ECE4]">
                    <span className="text-[#78716A] font-medium">{spec.label[currentLang]}:</span>
                    <span className="font-medium text-[#1C1917] text-end max-w-[60%]">
                      {spec.value[currentLang]}
                    </span>
                  </div>
                ))}

                {/* 6. Parent Category Base Specs */}
                {categoryInfo.specs.composition && (
                  <div className="py-2 border-b border-[#F2ECE4]">
                    <span className="text-[#78716A] font-medium block mb-1">
                      {currentLang === 'ar' ? 'التركيبة والخامة' : 'Composition'}:
                    </span>
                    <span className="text-[#2B2723] font-light leading-relaxed block">
                      {categoryInfo.specs.composition[currentLang]}
                    </span>
                  </div>
                )}

                {categoryInfo.specs.applications && (
                  <div className="py-2">
                    <span className="text-[#78716A] font-medium block mb-1">
                      {currentLang === 'ar' ? 'أبرز الاستخدامات' : 'Applications'}:
                    </span>
                    <span className="text-[#2B2723] font-light leading-relaxed block">
                      {categoryInfo.specs.applications[currentLang]}
                    </span>
                  </div>
                )}

              </div>

              {/* Sample Notice Box */}
              <div className="mt-6 p-3.5 bg-[#FAF7F2] border border-[#DDD5C7] flex items-center gap-2.5 text-xs text-[#5C554E]">
                <Building2 className="w-4 h-4 text-[#9E7241] shrink-0" />
                <span>{t.sampleNotice}</span>
              </div>

            </div>

            {/* Direct Action Buttons */}
            <div className="mt-6 space-y-3">
              
              {/* WhatsApp Order Button */}
              <a
                href={getWhatsAppOrderLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 bg-[#1E7E45] hover:bg-[#166034] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-sm"
                id="whatsapp-product-inquiry-btn"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.orderViaWhatsApp}</span>
              </a>

              {/* Direct Phone Call Button */}
              <a
                href="tel:+963995764573"
                className="w-full py-3.5 px-6 border border-[#DDD5C7] bg-[#FFFFFF] hover:border-[#9E7241] text-[#1C1917] hover:text-[#9E7241] font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-2xs"
                id="call-product-inquiry-btn"
              >
                <Phone className="w-4 h-4 text-[#9E7241]" />
                <span>{t.callSales}: +963 995 764 573</span>
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* Lightbox / Fullscreen Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="absolute top-4 end-4 flex items-center gap-3">
            <span className="font-mono text-white text-xs">
              {safeActiveIdx + 1} / {images.length}
            </span>
            <button
              onClick={() => setLightboxOpen(false)}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div 
            className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={activeProductImgSrc} 
              alt={`${model.code} - ${model.name[currentLang]} | ${categoryInfo.name[currentLang]} - خامات وتكسية جدران فاخرة في سوريا واللاذقية`} 
              onError={(e) => {
                const fallback = categoryInfo.image || 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=85';
                if (e.currentTarget.src !== fallback) {
                  e.currentTarget.src = fallback;
                }
              }}
              className="max-h-[80vh] max-w-full object-contain rounded-xs shadow-2xl"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImg}
                  className="absolute start-2 sm:start-4 w-11 h-11 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <PrevChevron className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextImg}
                  className="absolute end-2 sm:end-4 w-11 h-11 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <NextChevron className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
