import React, { useState } from 'react';
import { Lock, KeyRound, AlertCircle, CheckCircle } from 'lucide-react';
import { useMedia, ADMIN_PASSCODE } from '../context/MediaContext';
import { Language } from '../types';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const { loginAsAdmin } = useMedia();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const t = {
    ar: {
      title: 'بوابة إدارة الصور والوسائط',
      subtitle: 'أدخل رمز المرور السري للدخول إلى وضع التعديل ورفع الصور وسحبها وإفلاتها.',
      placeholder: 'أدخل رمز الإدارة (الافتراضي: birlik2026)',
      loginBtn: 'دخول لوحة الإدارة',
      cancelBtn: 'إلغاء',
      errorMsg: 'رمز المرور غير صحيح. يرجى التأكد وإعادة المحاولة.',
      successMsg: 'تم التحقق بنجاح! جاري تفعيل وضع الإدارة...',
    },
    en: {
      title: 'Admin Media Portal',
      subtitle: 'Enter the admin passcode to enable image drag-and-drop & media library management.',
      placeholder: 'Enter passcode (default: birlik2026)',
      loginBtn: 'Access Admin Mode',
      cancelBtn: 'Cancel',
      errorMsg: 'Invalid passcode. Please try again.',
      successMsg: 'Verified successfully! Enabling admin mode...',
    },
    tr: {
      title: 'Görsel Yönetim Girişi',
      subtitle: 'Görsel sürükle-bırak ve kütüphane yönetimini etkinleştirmek için şifreyi girin.',
      placeholder: 'Yönetici şifresi (varsayılan: birlik2026)',
      loginBtn: 'Giriş Yap',
      cancelBtn: 'İptal',
      errorMsg: 'Hatalı şifre. Lütfen tekrar deneyin.',
      successMsg: 'Doğrulandı! Yönetim modu açılıyor...',
    }
  }[currentLang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAsAdmin(passcode)) {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
        setPasscode('');
        onClose();
      }, 700);
    } else {
      setError(true);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#FFFFFF] border border-[#DDD5C7] max-w-md w-full p-6 sm:p-7 shadow-2xl relative text-start"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-[#E5DFD5] pb-4 mb-4">
          <div className="p-2.5 bg-[#FAF7F2] border border-[#DDD5C7] text-[#9E7241]">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1C1917]">
              {t.title}
            </h3>
            <p className="text-xs text-[#78716A]">
              Birlik Luxury Surfaces • Admin
            </p>
          </div>
        </div>

        <p className="text-xs text-[#5C554E] leading-relaxed mb-4">
          {t.subtitle}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError(false);
                }}
                placeholder={t.placeholder}
                autoFocus
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#DDD5C7] text-sm text-[#1C1917] focus:outline-none focus:border-[#9E7241] focus:ring-1 focus:ring-[#9E7241]"
              />
              <KeyRound className="w-4 h-4 text-[#9E7241] absolute end-3 top-3 opacity-60 pointer-events-none" />
            </div>

            {error && (
              <p className="mt-2 text-xs text-red-600 flex items-center gap-1.5 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{t.errorMsg}</span>
              </p>
            )}

            {success && (
              <p className="mt-2 text-xs text-emerald-600 flex items-center gap-1.5 font-medium">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{t.successMsg}</span>
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EFECE4]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-[#78716A] hover:text-[#1C1917] transition-colors cursor-pointer"
            >
              {t.cancelBtn}
            </button>
            <button
              type="submit"
              disabled={!passcode.trim() || success}
              className="px-5 py-2 bg-[#1C1917] hover:bg-[#332D27] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {t.loginBtn}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
