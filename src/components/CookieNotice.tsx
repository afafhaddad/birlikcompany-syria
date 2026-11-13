import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { consentChoice, setConsent } from '../analytics';

const TEXT = {
  ar: {
    body: 'نستخدم ملفات تعريف الارتباط لتحليل الزيارات وتحسين الموقع. لا نبيع بياناتك لأي جهة.',
    accept: 'موافق',
    decline: 'رفض',
    label: 'إشعار ملفات تعريف الارتباط',
  },
  en: {
    body: 'We use cookies to measure visits and improve the site. We never sell your data.',
    accept: 'Accept',
    decline: 'Decline',
    label: 'Cookie notice',
  },
  tr: {
    body: 'Ziyaretleri ölçmek ve siteyi geliştirmek için çerez kullanıyoruz. Verilerinizi asla satmayız.',
    accept: 'Kabul et',
    decline: 'Reddet',
    label: 'Çerez bildirimi',
  },
};

export const CookieNotice: React.FC<{ currentLang: Language }> = ({ currentLang }) => {
  // Decided after mount so the pre-rendered HTML never contains the banner
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (consentChoice() !== null) return;
    const id = window.setTimeout(() => setShow(true), 2500);
    return () => window.clearTimeout(id);
  }, []);
  if (!show) return null;

  const t = TEXT[currentLang];
  const choose = (granted: boolean) => {
    setConsent(granted);
    setShow(false);
  };

  return (
    <div
      role="region"
      aria-label={t.label}
      className="fixed z-40 bottom-[5.5rem] md:bottom-6 inset-x-3 md:inset-x-auto md:start-6 md:max-w-sm rounded-2xl bg-ink text-white shadow-2xl border border-white/10 p-4 animate-fade-up"
    >
      <p className="text-[13px] leading-relaxed text-white/85">{t.body}</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => choose(true)}
          className="flex-1 py-2.5 rounded-full bg-brass hover:bg-brass-light text-ink text-sm font-extrabold transition-colors"
        >
          {t.accept}
        </button>
        <button
          type="button"
          onClick={() => choose(false)}
          className="flex-1 py-2.5 rounded-full border border-white/25 hover:bg-white/10 text-white text-sm font-bold transition-colors"
        >
          {t.decline}
        </button>
      </div>
    </div>
  );
};
