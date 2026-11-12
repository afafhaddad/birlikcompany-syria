import React from 'react';
import { Language } from '../types';
import { Link } from '../router';
import { homeRoute, catalogueRoute } from '../routing';

const TEXT = {
  ar: { title: 'الصفحة غير موجودة', body: 'ربما تغيّر رابط هذه الصفحة. يمكنك العودة إلى الرئيسية أو تصفح الكتالوج.', home: 'الرئيسية', catalogue: 'كتالوج المنتجات' },
  en: { title: 'Page not found', body: 'This page may have moved. Go back to the homepage or browse the catalogue.', home: 'Homepage', catalogue: 'Product catalogue' },
  tr: { title: 'Sayfa bulunamadı', body: 'Bu sayfa taşınmış olabilir. Ana sayfaya dönün veya kataloğa göz atın.', home: 'Ana sayfa', catalogue: 'Ürün kataloğu' },
};

export const NotFoundPage: React.FC<{ currentLang: Language }> = ({ currentLang }) => {
  const t = TEXT[currentLang];
  return (
    <section className="max-w-2xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl font-black text-[#9E7241] mb-4">404</p>
      <h1 className="text-2xl font-bold text-[#1C1917] mb-3">{t.title}</h1>
      <p className="text-[#5C554E] mb-8">{t.body}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link to={homeRoute(currentLang)} className="px-6 py-3 bg-[#1C1917] text-white font-semibold rounded-xl">
          {t.home}
        </Link>
        <Link to={catalogueRoute(currentLang)} className="px-6 py-3 bg-[#B98A45] text-[#15120F] font-semibold rounded-xl">
          {t.catalogue}
        </Link>
      </div>
    </section>
  );
};
