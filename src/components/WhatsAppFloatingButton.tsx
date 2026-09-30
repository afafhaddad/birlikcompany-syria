import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { Language } from '../types';

interface WhatsAppFloatingButtonProps {
  currentLang: Language;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({ currentLang }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const defaultMsg = currentLang === 'ar'
    ? 'مرحباً شركة بيرليك في اللاذقية، أود الاستفسار عن مواد تكسية الجدران والأسعار والشحن في سوريا.'
    : currentLang === 'en'
    ? 'Hello Birlik Company in Lattakia, I would like to inquire about interior wall materials, prices, and shipping in Syria.'
    : 'Merhaba Birlik Şirketi Lazkiye, duvar kaplama malzemeleri, fiyatlar ve Suriye içi sevkiyat hakkında bilgi almak istiyorum.';

  const whatsappUrl = `https://wa.me/963995764573?text=${encodeURIComponent(defaultMsg)}`;

  return (
    <div className={`fixed bottom-6 z-40 flex flex-col items-end gap-2 ${currentLang === 'ar' ? 'left-6' : 'right-6'}`}>
      
      {/* Quick Tooltip Popover */}
      {tooltipOpen && (
        <div className="w-72 p-4 bg-[#FFFFFF] border border-[#E0D7C9] shadow-xl text-xs space-y-2.5 animate-fadeIn text-[#1C1917] font-sans">
          <div className="flex items-center justify-between border-b border-[#EFECE4] pb-2">
            <span className="font-serif font-medium text-[#1C1917] flex items-center gap-1.5 text-sm">
              <span className="w-2 h-2 bg-[#1E7E45] rounded-full animate-pulse" />
              <span>{currentLang === 'ar' ? 'فريق مبيعات شركة بيرليك' : 'Birlik Sales Desk Online'}</span>
            </span>
            <button 
              onClick={() => setTooltipOpen(false)}
              className="text-[#78716A] hover:text-[#1C1917] p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-[#5C554E] leading-relaxed font-light">
            {currentLang === 'ar'
              ? 'هل تحتاج للاستفسار عن الأسعار، تفاصيل الشحن لمحافظتك، أو حجز موعد في مكتب اللاذقية للاطلاع على العينات؟ تواصل معنا مباشرة.'
              : 'Need pricing, shipping details to your city, or an appointment at our Lattakia office to see samples? Chat with us directly.'}
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-[#1E7E45] hover:bg-[#166034] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
          >
            <span>{currentLang === 'ar' ? 'فتح محادثة واتساب فورية' : 'Start WhatsApp Chat'}</span>
            <Send className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Floating Button */}
      <div className="flex items-center gap-2">
        {!tooltipOpen && (
          <button
            onClick={() => setTooltipOpen(true)}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFFFFF]/95 backdrop-blur-md border border-[#E0D7C9] text-xs font-sans tracking-wide text-[#1C1917] shadow-md hover:border-[#9E7241] transition-colors cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E7E45]" />
            <span className="font-medium">{currentLang === 'ar' ? 'واتساب مبيعات شركة بيرليك' : 'WhatsApp Support'}</span>
          </button>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#1E7E45] hover:bg-[#166034] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer ring-2 ring-[#FFFFFF]"
          aria-label="Contact Birlik on WhatsApp"
          id="floating-whatsapp-btn"
        >
          <MessageSquare className="w-5 h-5 fill-current" />
        </a>
      </div>

    </div>
  );
};
