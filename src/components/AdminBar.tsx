import React from 'react';
import { ShieldCheck, Image, Eye, EyeOff, LogOut, UploadCloud } from 'lucide-react';
import { useMedia } from '../context/MediaContext';
import { Language } from '../types';

interface AdminBarProps {
  currentLang: Language;
}

export const AdminBar: React.FC<AdminBarProps> = ({ currentLang }) => {
  const { 
    isAdmin, 
    adminPreviewAsVisitor, 
    toggleVisitorPreview, 
    logoutAdmin, 
    openMediaLibrary 
  } = useMedia();

  // If user is not logged in as admin, never render this bar
  const isLocalStorageAdmin = typeof window !== 'undefined' && localStorage.getItem('birlik_admin_auth_v1') === 'true';
  if (!isLocalStorageAdmin) return null;

  const t = {
    ar: {
      adminMode: 'وضع إدارة الصور مفعّل',
      visitorMode: 'معاينة كزائر (العناصر التفاعلية مخفية)',
      mediaLibrary: 'مكتبة الوسائط والسحب والإفلات',
      previewAsVisitor: 'معاينة الموقع كزائر',
      returnToEditing: 'العودة لوضع التعديل',
      logout: 'تسجيل خروج الإدارة',
      dropHint: 'يمكنك الآن سحب وإفلات الصور مباشرة فوق أي بطاقة منتج أو قسم لتغييرها فوراً',
    },
    en: {
      adminMode: 'Image Admin Mode Active',
      visitorMode: 'Previewing as Visitor (Drop zones hidden)',
      mediaLibrary: 'Media Library & Dropzone',
      previewAsVisitor: 'Preview as Visitor',
      returnToEditing: 'Return to Edit Mode',
      logout: 'Exit Admin',
      dropHint: 'You can now drag & drop images directly over any product card to replace it instantly',
    },
    tr: {
      adminMode: 'Görsel Yönetim Modu Açık',
      visitorMode: 'Ziyaretçi Önizlemesi (Yükleme alanları gizli)',
      mediaLibrary: 'Medya Kütüphanesi',
      previewAsVisitor: 'Ziyaretçi Olarak Gör',
      returnToEditing: 'Düzenlemeye Dön',
      logout: 'Çıkış',
      dropHint: 'Görselleri doğrudan ürün kartlarının üzerine sürükleyip bırakabilirsiniz',
    }
  }[currentLang];

  return (
    <aside 
      aria-label={adminPreviewAsVisitor ? t.visitorMode : t.adminMode}
      className={`fixed top-0 inset-x-0 z-50 text-white text-xs font-sans transition-colors shadow-lg ${
        adminPreviewAsVisitor 
          ? 'bg-[#1E7E45] border-b border-white/20' 
          : 'bg-[#1C1917] border-b border-[#9E7241]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 sm:py-2.5 flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Status indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-none bg-white/10 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-semibold">
              {adminPreviewAsVisitor ? t.visitorMode : t.adminMode}
            </span>
          </div>
          {!adminPreviewAsVisitor && (
            <span className="hidden lg:inline text-[11px] text-[#C9BFB5]">
              {t.dropHint}
            </span>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 ms-auto">
          
          {/* Open Full Media Library */}
          <button
            onClick={() => openMediaLibrary()}
            className="px-3 py-1 bg-[#9E7241] hover:bg-[#835D33] text-white flex items-center gap-1.5 font-medium transition-colors cursor-pointer shadow-xs"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>{t.mediaLibrary}</span>
          </button>

          {/* Toggle Visitor Preview */}
          <button
            onClick={toggleVisitorPreview}
            className={`px-2.5 py-1 border flex items-center gap-1.5 font-medium transition-colors cursor-pointer ${
              adminPreviewAsVisitor
                ? 'bg-white text-[#1C1917] border-white'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
            }`}
            title={adminPreviewAsVisitor ? t.returnToEditing : t.previewAsVisitor}
          >
            {adminPreviewAsVisitor ? (
              <>
                <EyeOff className="w-3.5 h-3.5 text-[#1C1917]" />
                <span>{t.returnToEditing}</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>{t.previewAsVisitor}</span>
              </>
            )}
          </button>

          {/* Exit Admin */}
          <button
            onClick={logoutAdmin}
            className="p-1 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            title={t.logout}
            aria-label={t.logout}
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
};
