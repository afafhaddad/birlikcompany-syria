import React from 'react';
import { Check } from 'lucide-react';
import { Language } from '../types';
import { Breadcrumbs } from './Breadcrumbs';
import { QuantityCalculator } from './QuantityCalculator';

const TEXT = {
  ar: {
    crumb: 'حاسبة الكمية',
    title: 'كم لوح تحتاج لجدارك أو أرضيتك؟',
    lead: 'اختر المادة والموديل، أدخل القياسات، وشاهد جدارك مغطّى بالموديل الذي اخترته — ثم أرسل النتيجة على واتساب لنعطيك السعر الدقيق.',
    points: ['النتيجة خلال ثوانٍ', 'تشمل نسبة القص والهدر', 'نؤكد لك الكمية قبل الطلب'],
  },
  en: {
    crumb: 'Quantity calculator',
    title: 'How many pieces does your wall or floor need?',
    lead: 'Pick the material and model, enter your measurements and see your wall covered in it — then send the result on WhatsApp for an exact price.',
    points: ['Result in seconds', 'Includes cutting allowance', 'We confirm the quantity before you order'],
  },
  tr: {
    crumb: 'Miktar hesaplayıcı',
    title: 'Duvarınız veya zemininiz için kaç adet gerekir?',
    lead: 'Malzemeyi ve modeli seçin, ölçüleri girin, duvarınızı o modelle görün — sonra kesin fiyat için sonucu WhatsApp ile gönderin.',
    points: ['Saniyeler içinde sonuç', 'Kesim payı dahil', 'Sipariş öncesi miktarı teyit ederiz'],
  },
};

export const CalculatorPage: React.FC<{ currentLang: Language }> = ({ currentLang }) => {
  const t = TEXT[currentLang];
  return (
    <div className="pt-16 md:pt-[4.5rem] bg-ink text-white">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 pt-6 pb-14">
        <Breadcrumbs dark currentLang={currentLang} items={[{ label: t.crumb }]} />
        <h1 className="mt-6 text-3xl sm:text-4xl font-black leading-tight text-balance">{t.title}</h1>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/75">{t.lead}</p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm font-bold text-brass-light">
          {t.points.map((p) => (
            <li key={p} className="inline-flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-7">
          <QuantityCalculator currentLang={currentLang} dark />
        </div>
      </div>
    </div>
  );
};
