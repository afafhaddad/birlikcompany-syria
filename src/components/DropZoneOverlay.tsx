import React, { useState, useEffect, DragEvent } from 'react';
import { Camera, UploadCloud, RefreshCw } from 'lucide-react';
import { useMedia, MediaTarget } from '../context/MediaContext';
import { Language } from '../types';

interface DropZoneOverlayProps {
  target: MediaTarget;
  currentLang: Language;
  className?: string;
  badgePosition?: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'center';
}

export const DropZoneOverlay: React.FC<DropZoneOverlayProps> = ({
  target,
  currentLang,
  className = '',
  badgePosition = 'top-end',
}) => {
  const { isAdmin, openMediaLibrary, uploadFiles } = useMedia();
  const [isGlobalDragging, setIsGlobalDragging] = useState(false);
  const [isDraggingOverThis, setIsDraggingOverThis] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Detect when any file is dragged from the OS into the browser
  useEffect(() => {
    if (!isAdmin) return;
    let dragCounter = 0;

    const handleWindowDragEnter = (e: globalThis.DragEvent) => {
      if (e.dataTransfer && e.dataTransfer.types && Array.from(e.dataTransfer.types).includes('Files')) {
        dragCounter++;
        setIsGlobalDragging(true);
      }
    };

    const handleWindowDragLeave = () => {
      dragCounter--;
      if (dragCounter <= 0) {
        dragCounter = 0;
        setIsGlobalDragging(false);
        setIsDraggingOverThis(false);
      }
    };

    const handleWindowDrop = () => {
      dragCounter = 0;
      setIsGlobalDragging(false);
      setIsDraggingOverThis(false);
    };

    window.addEventListener('dragenter', handleWindowDragEnter);
    window.addEventListener('dragleave', handleWindowDragLeave);
    window.addEventListener('drop', handleWindowDrop);

    return () => {
      window.removeEventListener('dragenter', handleWindowDragEnter);
      window.removeEventListener('dragleave', handleWindowDragLeave);
      window.removeEventListener('drop', handleWindowDrop);
    };
  }, [isAdmin]);

  // If not logged in as admin (or in visitor preview), render nothing!
  if (!isAdmin) return null;

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOverThis(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOverThis(false);
  };

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOverThis(false);
    setIsGlobalDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setIsUploading(true);
      try {
        await uploadFiles(e.dataTransfer.files, target);
      } catch (err) {
        console.error('Drop upload error:', err);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleBadgeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openMediaLibrary(target);
  };

  const positionClasses = {
    'top-start': 'top-3 start-3',
    'top-end': 'top-3 end-3',
    'bottom-start': 'bottom-3 start-3',
    'bottom-end': 'bottom-3 end-3',
    'center': 'top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2',
  }[badgePosition];

  const isProduct = target.type === 'product';
  const labelText = {
    ar: target.type === 'hero' 
      ? 'تعديل صورة الواجهة (Hero)' 
      : isProduct 
      ? 'إضافة / تعديل صور الموديل' 
      : 'تعديل / إفلات صورة',
    en: target.type === 'hero' 
      ? 'Edit Hero Image' 
      : isProduct 
      ? 'Add / Manage Product Images' 
      : 'Drop / Edit Image',
    tr: target.type === 'hero' 
      ? 'Hero Görselini Değiştir' 
      : isProduct 
      ? 'Model Görsellerini Yönet' 
      : 'Görseli Değiştir',
  }[currentLang];

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`absolute inset-0 z-30 transition-all ${
        isGlobalDragging
          ? 'pointer-events-auto border-2 border-dashed border-[#D4AF37]/60 bg-black/20'
          : 'pointer-events-none'
      } ${
        isDraggingOverThis
          ? '!border-4 !border-solid !border-[#D4AF37] !bg-[#9E7241]/85 backdrop-blur-xs flex items-center justify-center'
          : ''
      } ${className}`}
    >
      {/* Visual prompt when hovering directly over this dropzone while dragging */}
      {isDraggingOverThis && (
        <div className="text-white text-center p-4 animate-pulse pointer-events-none">
          <UploadCloud className="w-10 h-10 mx-auto mb-2 text-white" />
          <span className="text-sm font-bold block drop-shadow-md">
            {currentLang === 'ar' 
              ? (isProduct 
                  ? `أفلت الصور هنا لإضافتها إلى معرض: ${target.name || target.type}` 
                  : `أفلت الصورة هنا لتحديث: ${target.name || target.type}`) 
              : (isProduct 
                  ? `Drop image(s) here to add to gallery of ${target.name || target.type}` 
                  : `Drop image here to update ${target.name || target.type}`)}
          </span>
        </div>
      )}

      {/* Uploading Spinner */}
      {isUploading && (
        <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center text-white text-xs font-bold pointer-events-auto">
          <div className="text-center space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#D4AF37]" />
            <span>
              {currentLang === 'ar' 
                ? (isProduct ? 'جاري رفع الصور وإضافتها للمعرض...' : 'جاري رفع الصورة وتحديثها...') 
                : (isProduct ? 'Uploading & adding images to gallery...' : 'Uploading & updating image...')}
            </span>
          </div>
        </div>
      )}

      {/* Floating Action Badge - Always clickable by admin */}
      {!isDraggingOverThis && !isUploading && (
        <div className={`absolute ${positionClasses} pointer-events-auto`}>
          <button
            type="button"
            onClick={handleBadgeClick}
            className="group/badge px-3 py-1.5 bg-[#1C1917]/95 hover:bg-[#1C1917] text-white border border-[#9E7241] hover:border-[#D4AF37] shadow-xl flex items-center gap-1.5 text-xs font-sans transition-all duration-200 cursor-pointer transform hover:scale-105"
            title={labelText}
          >
            <Camera className="w-3.5 h-3.5 text-[#D4AF37] group-hover/badge:rotate-12 transition-transform" />
            <span className="font-semibold text-[11px] sm:text-xs text-[#FAF7F2]">{labelText}</span>
          </button>
        </div>
      )}
    </div>
  );
};
