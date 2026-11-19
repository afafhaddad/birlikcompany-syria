import React, { useEffect, useRef, useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';
import { Language } from '../types';
import { track } from '../analytics';

const EMAIL = 'info@birlik-insaat.com';

const TEXT: Record<Language, { copy: string; copied: string; gmail: string; outlook: string; app: string }> = {
  ar: { copy: 'نسخ الإيميل', copied: 'تم النسخ ✓', gmail: 'إرسال عبر Gmail', outlook: 'إرسال عبر Outlook', app: 'تطبيق البريد' },
  en: { copy: 'Copy address', copied: 'Copied ✓', gmail: 'Write in Gmail', outlook: 'Write in Outlook', app: 'Mail app' },
  tr: { copy: 'Adresi kopyala', copied: 'Kopyalandı ✓', gmail: "Gmail'de yaz", outlook: "Outlook'ta yaz", app: 'Posta uygulaması' },
};

/**
 * Footer email. A bare mailto: link does nothing on phones and computers without a mail
 * app set up (Clarity showed it as a dead click), so a tap opens a small menu instead.
 */
export const EmailLink: React.FC<{ currentLang: Language; className?: string }> = ({ currentLang, className = '' }) => {
  const t = TEXT[currentLang];
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const box = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const r = document.createRange();
      const el = box.current?.querySelector('[data-email]');
      if (el) {
        r.selectNodeContents(el);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(r);
        document.execCommand('copy');
      }
    }
    setCopied(true);
    track('email_click', { method: 'copy' });
    setTimeout(() => setCopied(false), 1800);
  };

  const item = 'flex items-center gap-2 w-full px-3.5 py-2.5 rounded-xl text-start text-[13px] font-bold text-ink hover:bg-sand transition-colors';
  const subject = encodeURIComponent(currentLang === 'ar' ? 'استفسار — شركة بيرليك' : 'Enquiry — Birlik Company');

  return (
    <span ref={box} className="relative inline-block">
      <a
        href={`mailto:${EMAIL}`}
        onClick={(e) => {
          e.preventDefault();
          setOpen((o) => !o);
        }}
        aria-haspopup="menu"
        aria-expanded={open}
        className={className}
      >
        <span data-email dir="ltr">{EMAIL}</span>
      </a>
      {open && (
        <span role="menu" className="absolute bottom-full mb-2 start-0 z-20 w-56 p-1.5 rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 animate-fade-in">
          <button type="button" role="menuitem" onClick={copy} className={item}>
            {copied ? <Check className="w-4 h-4 text-wa" /> : <Copy className="w-4 h-4 text-brass-deep" />}
            {copied ? t.copied : t.copy}
          </button>
          <a
            role="menuitem"
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${subject}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('email_click', { method: 'gmail' })}
            className={item}
          >
            <Mail className="w-4 h-4 text-[#EA4335]" />
            {t.gmail}
          </a>
          <a
            role="menuitem"
            href={`https://outlook.live.com/mail/0/deeplink/compose?to=${EMAIL}&subject=${subject}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('email_click', { method: 'outlook' })}
            className={item}
          >
            <Mail className="w-4 h-4 text-[#0F6CBD]" />
            {t.outlook}
          </a>
          <a role="menuitem" href={`mailto:${EMAIL}?subject=${subject}`} onClick={() => track('email_click', { method: 'app' })} className={item}>
            <Mail className="w-4 h-4 text-muted" />
            {t.app}
          </a>
        </span>
      )}
    </span>
  );
};
