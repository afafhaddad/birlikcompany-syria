import React, { useState, useRef, DragEvent } from 'react';
import { 
  X, 
  UploadCloud, 
  Check, 
  Trash2, 
  Sparkles, 
  RefreshCw, 
  Image as ImageIcon, 
  Search, 
  CheckCircle2, 
  AlertCircle,
  AlertTriangle,
  User,
  LayoutGrid,
  Layers
} from 'lucide-react';
import { useMedia } from '../context/MediaContext';
import { ALL_PRODUCT_MODELS } from '../data/productModels';
import { CATEGORIES_CONFIG } from '../data/products';
import { Language } from '../types';

interface MediaLibraryModalProps {
  currentLang: Language;
}

export const MediaLibraryModal: React.FC<MediaLibraryModalProps> = ({ currentLang }) => {
  const { 
    isMediaLibraryOpen, 
    closeMediaLibrary, 
    activeTarget, 
    registry, 
    uploadFiles, 
    assignImage, 
    resetTargetImage, 
    deleteUploadedImage,
    clearEntireLibrary,
    resolveMediaUrl
  } = useMedia();

  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [deletingImageId, setDeletingImageId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [manualTargetProduct, setManualTargetProduct] = useState('');
  const [assignSearch, setAssignSearch] = useState('');
  const [showAssignDropdown, setShowAssignDropdown] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isMediaLibraryOpen) return null;

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFiles(e.target.files);
    }
  };

  const processFiles = async (files: FileList) => {
    setIsUploading(true);
    try {
      const urls = await uploadFiles(files, activeTarget || undefined);
      if (urls.length > 0) {
        setSelectedImage(urls[0]);
        if (activeTarget) {
          const isProduct = activeTarget.type === 'product';
          showToast(
            currentLang === 'ar' 
              ? (isProduct
                  ? `تم رفع وإضافة ${urls.length} صورة إلى معرض: ${activeTarget.name || activeTarget.type}`
                  : `تم رفع وتعيين الصورة بنجاح إلى: ${activeTarget.name || activeTarget.type}`)
              : (isProduct
                  ? `Uploaded and added ${urls.length} images to ${activeTarget.name || activeTarget.type}`
                  : `Image uploaded and assigned to ${activeTarget.name || activeTarget.type}!`)
          );
        } else {
          showToast(
            currentLang === 'ar'
              ? `تم رفع ${urls.length} صورة إلى المكتبة بنجاح`
              : `Uploaded ${urls.length} images to library successfully`
          );
        }
      }
    } catch {
      showToast(
        currentLang === 'ar' ? 'حدث خطأ أثناء رفع الصورة' : 'Error uploading image',
        'info'
      );
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleApplyToActiveTarget = async (imgUrl: string, mode: 'add' | 'replace' = 'add') => {
    if (activeTarget) {
      await assignImage(activeTarget, imgUrl, mode);
      const isProduct = activeTarget.type === 'product';
      showToast(
        currentLang === 'ar'
          ? (isProduct && mode === 'add'
              ? `تمت إضافة الصورة إلى معرض: ${activeTarget.name || activeTarget.type}`
              : `تم تحديث صورة: ${activeTarget.name || activeTarget.type}`)
          : (isProduct && mode === 'add'
              ? `Added image to gallery of ${activeTarget.name || activeTarget.type}`
              : `Assigned image to ${activeTarget.name || activeTarget.type}`)
      );
    }
  };

  const handleResetActiveTarget = async () => {
    if (activeTarget) {
      await resetTargetImage(activeTarget);
      showToast(
        currentLang === 'ar'
          ? `تمت استعادة الصورة الافتراضية لـ: ${activeTarget.name || activeTarget.type}`
          : `Reset to default image for ${activeTarget.name || activeTarget.type}`
      );
    }
  };

  // Filtered categories for manual assign
  const validCategories = CATEGORIES_CONFIG.filter((c) => c.id !== 'all');

  // Filtered products for manual assign
  const filteredProducts = ALL_PRODUCT_MODELS.filter((p) => {
    if (!assignSearch.trim()) return true;
    const q = assignSearch.toLowerCase();
    return (
      p.id.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.name.en.toLowerCase().includes(q) ||
      p.name.ar.includes(q)
    );
  }).slice(0, 15);

  const t = {
    ar: {
      title: 'مكتبة الوسائط ورفع الصور (خاص بالإدارة)',
      dropTitle: 'اسحب وأفلت الصور هنا، أو اضغط للاختيار من جهازك',
      dropSubtitle: 'يدعم صور JPG, PNG, WEBP عالية الدقة • ستُحفظ وتظهر فوراً لكافة الزوار',
      browseBtn: 'اختيار ملفات من الجهاز',
      activeTargetBanner: 'أنت تقوم بتعديل صورة:',
      assignCurrentBtn: 'تعيين هذه الصورة المحددة له',
      resetDefaultBtn: 'استعادة الصورة الافتراضية',
      allUploadedTitle: 'الصور المحفوظة في المكتبة',
      noImages: 'لا توجد صور مرفوعة بعد في المكتبة. قم بسحب وإفلات صورك هنا للبدء.',
      assignToHero: 'تعيين كصورة الواجهة الرئيسية (Hero)',
      assignToFounder: 'تعيين كصورة المؤسس',
      assignToCategory: 'تعيين لصنف:',
      assignToProduct: 'تعيين لموديل منتج:',
      deleteImage: 'حذف من المكتبة',
      close: 'إغلاق',
      searchProductPlaceholder: 'ابحث عن اسم أو كود الموديل...',
    },
    en: {
      title: 'Media Library & Image Dropzone (Admin)',
      dropTitle: 'Drag & drop images here, or click to browse',
      dropSubtitle: 'Supports high-res JPG, PNG, WEBP • Persisted & visible to all visitors',
      browseBtn: 'Choose Files from Device',
      activeTargetBanner: 'Currently editing image for:',
      assignCurrentBtn: 'Assign Selected Image to This',
      resetDefaultBtn: 'Restore Original Default',
      allUploadedTitle: 'Uploaded Images in Library',
      noImages: 'No uploaded images in the library yet. Drag & drop files above to start.',
      assignToHero: 'Set as Main Hero Background',
      assignToFounder: 'Set as Founder Portrait',
      assignToCategory: 'Set as Category:',
      assignToProduct: 'Set as Product Model:',
      deleteImage: 'Delete Image',
      close: 'Close',
      searchProductPlaceholder: 'Search product by name or code...',
    },
    tr: {
      title: 'Medya Kütüphanesi ve Görsel Yükleme (Yönetici)',
      dropTitle: 'Görselleri buraya sürükleyip bırakın veya seçin',
      dropSubtitle: 'Yüksek çözünürlüklü JPG, PNG, WEBP desteklenir • Tüm ziyaretçilere görünür',
      browseBtn: 'Cihazdan Dosya Seç',
      activeTargetBanner: 'Şu an düzenlenen alan:',
      assignCurrentBtn: 'Seçili Görseli Ata',
      resetDefaultBtn: 'Varsayılana Sıfırla',
      allUploadedTitle: 'Kütüphanedeki Yüklü Görseller',
      noImages: 'Henüz kütüphanede görsel yok. Başlamak için yukarıya sürükleyin.',
      assignToHero: 'Ana Hero Görseli Yap',
      assignToFounder: 'Kurucu Portresi Yap',
      assignToCategory: 'Kategoriye Ata:',
      assignToProduct: 'Ürün Modeline Ata:',
      deleteImage: 'Görseli Sil',
      close: 'Kapat',
      searchProductPlaceholder: 'Ürün veya kod ara...',
    }
  }[currentLang];

  const imagesList = registry.uploadedImages || [];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
      onClick={closeMediaLibrary}
    >
      <div 
        className="bg-[#FFFFFF] border border-[#DDD5C7] max-w-5xl w-full my-auto shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-start"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E5DFD5] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#1C1917] text-[#D4AF37]">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917]">
                {t.title}
              </h2>
              <p className="text-xs text-[#78716A]">
                {imagesList.length} {currentLang === 'ar' ? 'صورة في المكتبة' : 'images in library'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="px-2.5 py-1.5 text-xs text-[#DC2626] hover:bg-[#FEF2F2] border border-[#FCA5A5] flex items-center gap-1.5 font-medium transition-colors cursor-pointer"
              title={currentLang === 'ar' ? 'إفراغ المكتبة والبدء بسجل نظيف جديد' : 'Empty Library (Clean Slate)'}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {currentLang === 'ar' ? 'إفراغ المكتبة (سجل جديد)' : 'Empty Library (Clean Slate)'}
              </span>
            </button>

            <button
              onClick={closeMediaLibrary}
              className="p-1.5 text-[#78716A] hover:text-[#1C1917] hover:bg-black/5 transition-colors cursor-pointer"
              aria-label={t.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Clear Library Confirmation Dialog */}
        {showClearConfirm && (
          <div className="p-4 bg-[#FEF2F2] border-b border-[#FCA5A5] text-[#991B1B] flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs">
              <AlertTriangle className="w-4 h-4 text-[#DC2626] shrink-0" />
              <span className="font-semibold">
                {currentLang === 'ar'
                  ? 'هل أنت متأكد من رغبتك في إفراغ المكتبة والبدء بسجل نظيف؟ سيتم حذف كافة الصور المرفوعة والذاكرة المحلية.'
                  : 'Are you sure you want to empty the library and start fresh? All uploaded images and local cache will be cleared.'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1 bg-white border border-[#DDD5C7] text-xs font-semibold text-[#1C1917] hover:bg-[#FAF7F2] cursor-pointer"
              >
                {currentLang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={async () => {
                  setShowClearConfirm(false);
                  await clearEntireLibrary();
                  setSelectedImage(null);
                  showToast(
                    currentLang === 'ar'
                      ? 'تم إفراغ المكتبة بنجاح! تم تجهيز سجل نظيف تماماً.'
                      : 'Library emptied successfully! Clean slate ready.'
                  );
                }}
                className="px-3 py-1 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-semibold shadow-xs cursor-pointer"
              >
                {currentLang === 'ar' ? 'نعم، إفراغ الكل الآن' : 'Yes, Empty All Now'}
              </button>
            </div>
          </div>
        )}

        {/* Toast alert */}
        {notification && (
          <div className="px-5 py-2.5 bg-[#1C1917] text-white text-xs flex items-center gap-2 border-b border-[#9E7241] animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span className="font-medium">{notification.message}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-[#FAF7F2]/40">
          
          {/* Active Target Banner if set */}
          {activeTarget && (
            <div className="p-4 bg-[#FFFFFF] border-2 border-[#9E7241] shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#FAF7F2] text-[#9E7241]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#9E7241] font-mono font-bold block">
                    {t.activeTargetBanner}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#1C1917]">
                    {activeTarget.name || `${activeTarget.type} (${activeTarget.id || ''})`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {selectedImage && (
                  activeTarget.type === 'product' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleApplyToActiveTarget(selectedImage, 'add')}
                        className="px-3 py-1.5 bg-[#9E7241] hover:bg-[#835D33] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>{currentLang === 'ar' ? '+ إضافة لمعرض الموديل' : '+ Add to Gallery'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplyToActiveTarget(selectedImage, 'replace')}
                        className="px-3 py-1.5 bg-[#1C1917] hover:bg-[#332D27] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{currentLang === 'ar' ? 'تعيين كصورة رئيسية' : 'Set as Main'}</span>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleApplyToActiveTarget(selectedImage, 'replace')}
                      className="px-4 py-2 bg-[#9E7241] hover:bg-[#835D33] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      <span>{t.assignCurrentBtn}</span>
                    </button>
                  )
                )}

                <button
                  type="button"
                  onClick={handleResetActiveTarget}
                  className="px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#EAE4D9] text-[#78716A] hover:text-[#1C1917] border border-[#DDD5C7] text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{t.resetDefaultBtn}</span>
                </button>
              </div>
            </div>
          )}

          {/* DRAG AND DROP ZONE */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed p-8 sm:p-10 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
              isDragging
                ? 'border-[#9E7241] bg-[#9E7241]/10 scale-[1.01]'
                : 'border-[#DDD5C7] hover:border-[#9E7241] bg-[#FFFFFF] hover:bg-[#FAF7F2]'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/*"
              className="hidden"
            />

            <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#E5DFD5] flex items-center justify-center text-[#9E7241] mb-3 shadow-xs">
              <UploadCloud className="w-7 h-7" />
            </div>

            <h3 className="text-base sm:text-lg font-serif font-bold text-[#1C1917] mb-1">
              {isUploading ? (
                <span className="flex items-center gap-2 text-[#9E7241]">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  {currentLang === 'ar' ? 'جاري رفع الصور ومعالجتها...' : 'Uploading & processing images...'}
                </span>
              ) : (
                t.dropTitle
              )}
            </h3>

            <p className="text-xs text-[#78716A] max-w-md mb-4 font-light">
              {t.dropSubtitle}
            </p>

            <button
              type="button"
              className="px-5 py-2.5 bg-[#1C1917] hover:bg-[#332D27] text-white text-xs font-semibold tracking-wide shadow-xs transition-colors pointer-events-none"
            >
              {t.browseBtn}
            </button>
          </div>

          {/* UPLOADED IMAGES GALLERY */}
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-[#E5DFD5] pb-2">
              <h3 className="font-serif text-base font-bold text-[#1C1917] flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#9E7241]" />
                <span>{t.allUploadedTitle}</span>
              </h3>
              <span className="text-xs text-[#78716A] font-mono">
                {imagesList.length} items
              </span>
            </div>

            {imagesList.length === 0 ? (
              <div className="p-8 text-center bg-[#FFFFFF] border border-[#E5DFD5] text-[#78716A] text-xs">
                {t.noImages}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
                {imagesList.map((img) => {
                  const isSelected = selectedImage === img.url;
                  return (
                    <div
                      key={img.id}
                      onClick={() => setSelectedImage(img.url)}
                      className={`group relative bg-[#FFFFFF] border transition-all cursor-pointer flex flex-col justify-between overflow-hidden shadow-2xs ${
                        isSelected
                          ? 'border-[#9E7241] ring-2 ring-[#9E7241]/40'
                          : 'border-[#DDD5C7] hover:border-[#9E7241]'
                      }`}
                    >
                      {/* Image Thumbnail */}
                      <div className="relative aspect-square w-full bg-[#EAE4D9] overflow-hidden">
                        {(() => {
                          const resolvedSrc = resolveMediaUrl(img.url);
                          const isMissing = failedImages.has(img.id) || !resolvedSrc || resolvedSrc.trim() === '';

                          if (isMissing) {
                            return (
                              <div className="w-full h-full flex flex-col items-center justify-center bg-[#F4EFEA] p-2 text-center text-[#78716A]">
                                <ImageIcon className="w-7 h-7 text-[#A89F91] mb-1 opacity-70" />
                                <span className="text-[10px] font-medium leading-tight text-[#574E45]">
                                  {currentLang === 'ar' ? 'الملف غير موجود بالسيرفر' : 'File missing from server'}
                                </span>
                                <span className="text-[9px] text-[#8C8275] mt-1">
                                  {currentLang === 'ar' ? 'انقر سلة المهملات للحذف' : 'Click trash to remove'}
                                </span>
                              </div>
                            );
                          }

                          return (
                            <img
                              src={resolvedSrc}
                              alt={img.name}
                              onError={() => {
                                setFailedImages((prev) => new Set(prev).add(img.id));
                              }}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                            />
                          );
                        })()}

                        {isSelected && (
                          <div className="absolute top-2 start-2 w-5 h-5 bg-[#9E7241] text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}

                        {/* Delete button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeletingImageId(img.id);
                          }}
                          className="absolute top-2 end-2 p-1.5 bg-black/75 hover:bg-red-600 text-white rounded-xs opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-xs z-10"
                          title={t.deleteImage}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Custom Confirmation Overlay (No window.confirm!) */}
                        {deletingImageId === img.id && (
                          <div 
                            onClick={(e) => e.stopPropagation()}
                            className="absolute inset-0 bg-black/90 backdrop-blur-xs flex flex-col items-center justify-center p-2 text-center text-white z-20 animate-fadeIn"
                          >
                            <AlertCircle className="w-5 h-5 text-red-400 mb-1" />
                            <p className="text-[11px] font-bold text-white mb-2 leading-tight">
                              {currentLang === 'ar' ? 'حذف هذه الصورة نهائياً؟' : 'Delete photo permanently?'}
                            </p>
                            <div className="flex items-center gap-1.5 w-full">
                              <button
                                type="button"
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  setDeletingImageId(null);
                                  await deleteUploadedImage(img.id);
                                  if (selectedImage === img.url) {
                                    setSelectedImage(null);
                                  }
                                  showToast(
                                    currentLang === 'ar' ? 'تم حذف الصورة بنجاح' : 'Image deleted successfully'
                                  );
                                }}
                                className="flex-1 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold transition-colors cursor-pointer rounded-xs"
                              >
                                {currentLang === 'ar' ? 'نعم، حذف' : 'Delete'}
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeletingImageId(null);
                                }}
                                className="flex-1 py-1.5 bg-[#44403C] hover:bg-[#57534E] text-white text-[10px] font-medium transition-colors cursor-pointer rounded-xs"
                              >
                                {currentLang === 'ar' ? 'إلغاء' : 'Cancel'}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Info / Quick Action */}
                      <div className="p-2 bg-[#FFFFFF] text-[11px] border-t border-[#EFECE4]">
                        <p className="truncate text-[#1C1917] font-medium" title={img.name}>
                          {img.name}
                        </p>

                        {/* Quick Assign Buttons */}
                        <div className="mt-1.5 flex flex-col gap-1">
                          {activeTarget ? (
                            activeTarget.type === 'product' ? (
                              <div className="grid grid-cols-2 gap-1">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleApplyToActiveTarget(img.url, 'add');
                                  }}
                                  className="py-1 px-1 bg-[#9E7241] hover:bg-[#835D33] text-white text-[9.5px] font-bold transition-colors cursor-pointer text-center truncate shadow-2xs"
                                  title={currentLang === 'ar' ? 'إضافة إلى معرض هذا الموديل' : 'Add to model gallery'}
                                >
                                  {currentLang === 'ar' ? '+ إضافة للمعرض' : '+ Add to Gallery'}
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleApplyToActiveTarget(img.url, 'replace');
                                  }}
                                  className="py-1 px-1 bg-[#1C1917] hover:bg-[#38332E] text-white text-[9.5px] font-bold transition-colors cursor-pointer text-center truncate shadow-2xs"
                                  title={currentLang === 'ar' ? 'تعيين كصورة رئيسية للموديل' : 'Set as main product photo'}
                                >
                                  {currentLang === 'ar' ? 'تعيين كرئيسية' : 'Set as Main'}
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleApplyToActiveTarget(img.url, 'replace');
                                }}
                                className="w-full py-1 bg-[#9E7241] hover:bg-[#835D33] text-white text-[10px] font-semibold transition-colors cursor-pointer text-center"
                              >
                                {currentLang === 'ar' ? 'استخدام لهذا العنصر' : 'Use for Target'}
                              </button>
                            )
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(img.url);
                                setShowAssignDropdown(true);
                              }}
                              className="w-full py-1 bg-[#FAF7F2] hover:bg-[#EAE4D9] text-[#1C1917] border border-[#DDD5C7] text-[10px] font-medium transition-colors cursor-pointer text-center"
                            >
                              {currentLang === 'ar' ? 'تعيين إلى...' : 'Assign to...'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* MANUAL ASSIGNMENT PANEL (When an image is selected) */}
          {selectedImage && (
            <div className="p-4 bg-[#FFFFFF] border-2 border-[#9E7241]/40 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-2">
                <span className="text-xs font-bold text-[#1C1917] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>
                    {currentLang === 'ar' ? 'تعيين الصورة كصورة افتراضية للموقع:' : 'Set Selected Image as Default:'}
                  </span>
                </span>
                <span className="text-[11px] text-[#78716A] font-mono truncate max-w-xs">
                  {selectedImage.slice(0, 40)}...
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                
                {/* 1. Set as Hero Background */}
                <button
                  onClick={async () => {
                    await assignImage({ type: 'hero' }, selectedImage);
                    showToast(
                      currentLang === 'ar' ? 'تم تعيين الصورة كصورة افتراضية للواجهة الرئيسية (Hero) بنجاح!' : 'Set as Default Hero Background successfully!'
                    );
                  }}
                  className="p-3 bg-[#FAF7F2] hover:bg-[#F3ECE0] border border-[#DDD5C7] hover:border-[#9E7241] text-start transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1C1917] group-hover:text-[#9E7241]">
                    <Sparkles className="w-3.5 h-3.5 text-[#9E7241]" />
                    <span>{currentLang === 'ar' ? '⭐ تعيين كافتراضي للواجهة' : '⭐ Set as Default Hero'}</span>
                  </div>
                  <span className="text-[11px] text-[#78716A] block mt-1">
                    {currentLang === 'ar' ? 'الواجهة الرئيسية للموقع' : 'Website Hero Header'}
                  </span>
                </button>

                {/* 2. Set as Founder */}
                <button
                  onClick={async () => {
                    await assignImage({ type: 'founder' }, selectedImage);
                    showToast(
                      currentLang === 'ar' ? 'تم تعيين الصورة كصورة افتراضية للمؤسس بنجاح!' : 'Set as Default Founder Portrait successfully!'
                    );
                  }}
                  className="p-3 bg-[#FAF7F2] hover:bg-[#F3ECE0] border border-[#DDD5C7] hover:border-[#9E7241] text-start transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1C1917] group-hover:text-[#9E7241]">
                    <User className="w-3.5 h-3.5 text-[#9E7241]" />
                    <span>{currentLang === 'ar' ? '⭐ تعيين كافتراضي للمؤسس' : '⭐ Set as Default Founder'}</span>
                  </div>
                  <span className="text-[11px] text-[#78716A] block mt-1">
                    المهندس يوسف حداد
                  </span>
                </button>

                {/* 3. Set to Categories */}
                <div className="relative">
                  <label className="text-[11px] font-semibold text-[#78716A] block mb-1">
                    {t.assignToCategory}
                  </label>
                  <select
                    onChange={async (e) => {
                      if (e.target.value) {
                        await assignImage({ type: 'category', id: e.target.value }, selectedImage);
                        showToast(
                          currentLang === 'ar' ? `تم تعيين الصورة لصنف: ${e.target.value}` : `Assigned to category: ${e.target.value}`
                        );
                        e.target.value = '';
                      }
                    }}
                    defaultValue=""
                    className="w-full p-2 bg-[#FAF7F2] border border-[#DDD5C7] text-xs text-[#1C1917] focus:outline-none focus:border-[#9E7241] cursor-pointer"
                  >
                    <option value="" disabled>
                      {currentLang === 'ar' ? '-- اختر صنفاً --' : '-- Choose Category --'}
                    </option>
                    {validCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nameAr} ({cat.id})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Set to Product Models */}
                <div className="relative space-y-1.5">
                  <label className="text-[11px] font-semibold text-[#78716A] block">
                    {t.assignToProduct}
                  </label>
                  <select
                    value={manualTargetProduct}
                    onChange={(e) => setManualTargetProduct(e.target.value)}
                    className="w-full p-2 bg-[#FAF7F2] border border-[#DDD5C7] text-xs text-[#1C1917] focus:outline-none focus:border-[#9E7241] cursor-pointer"
                  >
                    <option value="" disabled>
                      {currentLang === 'ar' ? '-- اختر موديلاً (41 موديل) --' : '-- Choose Product (41 models) --'}
                    </option>
                    {ALL_PRODUCT_MODELS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.code} — {p.name.en} ({p.category})
                      </option>
                    ))}
                  </select>

                  {manualTargetProduct && (
                    <div className="grid grid-cols-2 gap-1.5 pt-1 animate-fadeIn">
                      <button
                        type="button"
                        onClick={async () => {
                          await assignImage({ type: 'product', id: manualTargetProduct }, selectedImage, 'add');
                          showToast(
                            currentLang === 'ar'
                              ? `تمت إضافة الصورة إلى معرض الموديل: ${manualTargetProduct}`
                              : `Added image to gallery for: ${manualTargetProduct}`
                          );
                          setManualTargetProduct('');
                        }}
                        className="py-1 px-2 bg-[#9E7241] hover:bg-[#835D33] text-white text-[11px] font-semibold transition-colors cursor-pointer text-center shadow-xs"
                      >
                        {currentLang === 'ar' ? '+ إضافة للمعرض' : '+ Add to Gallery'}
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          await assignImage({ type: 'product', id: manualTargetProduct }, selectedImage, 'replace');
                          showToast(
                            currentLang === 'ar'
                              ? `تم تعيين الصورة كصورة رئيسية للموديل: ${manualTargetProduct}`
                              : `Set as main image for: ${manualTargetProduct}`
                          );
                          setManualTargetProduct('');
                        }}
                        className="py-1 px-2 bg-[#1C1917] hover:bg-[#38332E] text-white text-[11px] font-semibold transition-colors cursor-pointer text-center shadow-xs"
                      >
                        {currentLang === 'ar' ? '⭐ تعيين كافتراضي رئيسي' : '⭐ Set as Default Main'}
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E5DFD5] bg-[#FAF7F2] flex items-center justify-between">
          <p className="text-xs text-[#78716A]">
            {currentLang === 'ar'
              ? 'ملاحظة: كافة التعديلات تظهر فوراً لجميع الزوار ويتم حفظها على السيرفر.'
              : 'Note: All uploaded images are visible to visitors & saved on the server.'}
          </p>

          <button
            onClick={closeMediaLibrary}
            className="px-5 py-2 bg-[#1C1917] hover:bg-[#332D27] text-white text-xs font-semibold cursor-pointer shadow-xs transition-colors"
          >
            {t.close}
          </button>
        </div>

      </div>
    </div>
  );
};
