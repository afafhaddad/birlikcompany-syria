import React, { useMemo, useState } from 'react';
import { Calculator, MessageSquare } from 'lucide-react';
import { Language, ProductModel } from '../types';
import { canonicalCategory, productPath, SITE_ORIGIN } from '../routing';

type Mode = 'wall' | 'floor' | 'linear';

const modeFor = (model: ProductModel): Mode => {
  const cat = canonicalCategory(model.category);
  if (cat === 'spc_flooring') return 'floor';
  if (cat === 'ps_slats' || cat === 'ps_baseboards') return 'linear';
  return 'wall';
};

/** "12.1 cm × 290 cm" → { w: 12.1, l: 290 } (cm) */
const parseDims = (dims: string) => {
  const nums = (dims.match(/\d+(?:\.\d+)?/g) || []).map(Number);
  return nums.length >= 2 ? { w: nums[0], l: nums[1] } : null;
};

/** Accepts Arabic-Indic digits and comma / Arabic decimal separators. */
const toNumber = (raw: string): number => {
  const ascii = raw
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[٫,]/g, '.')
    .replace(/[^\d.]/g, '');
  const n = parseFloat(ascii);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

const fmt = (n: number) => (Math.round(n * 100) / 100).toString();

const TEXT = {
  ar: {
    title: 'احسب الكمية التي تحتاجها',
    wallW: 'عرض الجدار (متر)',
    wallH: 'ارتفاع الجدار (متر)',
    openings: 'مساحة الأبواب والنوافذ (م²) — اختياري',
    floorL: 'طول الغرفة (متر)',
    floorW: 'عرض الغرفة (متر)',
    length: 'الطول الإجمالي (متر)',
    lengthHint: 'للنعلات: محيط الغرفة ناقص عرض الأبواب',
    waste: 'نسبة الهدر والقص',
    area: 'المساحة',
    pieces: 'العدد التقريبي',
    piece: 'قطعة',
    m2: 'م²',
    m: 'م',
    perPiece: 'كل قطعة',
    note: 'الحساب تقريبي — نؤكد لك الكمية الدقيقة قبل الطلب.',
    send: 'أرسل الكمية واسأل عن السعر',
    empty: 'أدخل القياسات لترى النتيجة',
  },
  en: {
    title: 'Calculate how much you need',
    wallW: 'Wall width (m)',
    wallH: 'Wall height (m)',
    openings: 'Doors & windows area (m²) — optional',
    floorL: 'Room length (m)',
    floorW: 'Room width (m)',
    length: 'Total length (m)',
    lengthHint: 'For baseboards: room perimeter minus door widths',
    waste: 'Cutting & waste allowance',
    area: 'Area',
    pieces: 'Approx. quantity',
    piece: 'pieces',
    m2: 'm²',
    m: 'm',
    perPiece: 'per piece',
    note: 'Estimate only — we confirm the exact quantity before you order.',
    send: 'Send quantity & ask for the price',
    empty: 'Enter your measurements to see the result',
  },
  tr: {
    title: 'İhtiyacınız olan miktarı hesaplayın',
    wallW: 'Duvar genişliği (m)',
    wallH: 'Duvar yüksekliği (m)',
    openings: 'Kapı ve pencere alanı (m²) — isteğe bağlı',
    floorL: 'Oda uzunluğu (m)',
    floorW: 'Oda genişliği (m)',
    length: 'Toplam uzunluk (m)',
    lengthHint: 'Süpürgelik için: oda çevresi eksi kapı genişlikleri',
    waste: 'Kesim ve fire payı',
    area: 'Alan',
    pieces: 'Yaklaşık adet',
    piece: 'adet',
    m2: 'm²',
    m: 'm',
    perPiece: 'parça başı',
    note: 'Tahmini hesaptır — sipariş öncesi kesin miktarı teyit ederiz.',
    send: 'Miktarı gönder ve fiyat sor',
    empty: 'Sonucu görmek için ölçüleri girin',
  },
};

const Field: React.FC<{ label: string; value: string; onChange: (v: string) => void; hint?: string; id: string }> = ({
  label,
  value,
  onChange,
  hint,
  id,
}) => (
  <label htmlFor={id} className="block">
    <span className="block text-xs font-semibold text-[#5C554E] mb-1">{label}</span>
    <input
      id={id}
      type="text"
      inputMode="decimal"
      autoComplete="off"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      dir="ltr"
      className="w-full px-3 py-2.5 border border-[#DDD5C7] bg-white text-base text-[#1C1917] focus:outline-none focus:border-[#9E7241] focus:ring-1 focus:ring-[#9E7241]"
      placeholder="0"
    />
    {hint && <span className="block text-[11px] text-[#8C8278] mt-1">{hint}</span>}
  </label>
);

export const AreaCalculator: React.FC<{ model: ProductModel; currentLang: Language }> = ({ model, currentLang }) => {
  const t = TEXT[currentLang];
  const mode = modeFor(model);
  const dims = parseDims(model.dimensions);
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [openings, setOpenings] = useState('');
  const [waste, setWaste] = useState(10);

  const result = useMemo(() => {
    if (!dims) return null;
    const A = toNumber(a);
    const B = toNumber(b);
    const factor = 1 + waste / 100;
    if (mode === 'linear') {
      if (!A) return null;
      const pieceLen = dims.l / 100;
      return { measure: `${fmt(A)} ${t.m}`, pieces: Math.ceil((A / pieceLen) * factor), per: `${fmt(pieceLen)} ${t.m}` };
    }
    if (!A || !B) return null;
    const area = Math.max(0, A * B - (mode === 'wall' ? toNumber(openings) : 0));
    if (!area) return null;
    const pieceArea = (dims.w * dims.l) / 10000;
    return { measure: `${fmt(area)} ${t.m2}`, pieces: Math.ceil((area / pieceArea) * factor), per: `${fmt(pieceArea)} ${t.m2}` };
  }, [a, b, openings, waste, mode, dims, t]);

  if (!dims) return null;

  const whatsapp = () => {
    if (!result) return '#';
    const url = `${SITE_ORIGIN}${productPath(currentLang, model)}`;
    const inputs =
      mode === 'linear'
        ? `${t.length}: ${fmt(toNumber(a))}`
        : `${mode === 'wall' ? t.wallW : t.floorL}: ${fmt(toNumber(a))} × ${mode === 'wall' ? t.wallH : t.floorW}: ${fmt(toNumber(b))}`;
    const msg = {
      ar: `مرحباً شركة بيرليك، أريد سعر الموديل ${model.code} (${model.name.ar}).\n${inputs}\n${t.area}: ${result.measure}\n${t.pieces}: ${result.pieces} ${t.piece} (مع ${waste}% هدر)\n${url}`,
      en: `Hello Birlik Company, I'd like the price for model ${model.code} (${model.name.en}).\n${inputs}\n${t.area}: ${result.measure}\n${t.pieces}: ${result.pieces} ${t.piece} (incl. ${waste}% waste)\n${url}`,
      tr: `Merhaba Birlik Şirketi, ${model.code} (${model.name.tr}) modelinin fiyatını öğrenmek istiyorum.\n${inputs}\n${t.area}: ${result.measure}\n${t.pieces}: ${result.pieces} ${t.piece} (%${waste} fire dahil)\n${url}`,
    }[currentLang];
    return `https://wa.me/963995764573?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section className="mt-6 border border-[#DDD5C7] bg-[#FFFFFF] p-4 sm:p-5" aria-labelledby="calc-title">
      <h2 id="calc-title" className="flex items-center gap-2 text-base font-bold text-[#1C1917] mb-4">
        <Calculator className="w-5 h-5 text-[#9E7241]" />
        {t.title}
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {mode === 'linear' ? (
          <div className="col-span-2">
            <Field
              id="calc-length"
              label={t.length}
              value={a}
              onChange={setA}
              hint={canonicalCategory(model.category) === 'ps_baseboards' ? t.lengthHint : undefined}
            />
          </div>
        ) : (
          <>
            <Field id="calc-a" label={mode === 'wall' ? t.wallW : t.floorL} value={a} onChange={setA} />
            <Field id="calc-b" label={mode === 'wall' ? t.wallH : t.floorW} value={b} onChange={setB} />
            {mode === 'wall' && (
              <div className="col-span-2">
                <Field id="calc-openings" label={t.openings} value={openings} onChange={setOpenings} />
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-3">
        <span className="block text-xs font-semibold text-[#5C554E] mb-1">{t.waste}</span>
        <div className="flex gap-2" role="radiogroup" aria-label={t.waste}>
          {[5, 10, 15].map((w) => (
            <button
              key={w}
              type="button"
              role="radio"
              aria-checked={waste === w}
              onClick={() => setWaste(w)}
              className={`flex-1 py-2 text-sm border transition-colors ${
                waste === w ? 'bg-[#1C1917] text-white border-[#1C1917]' : 'bg-white text-[#5C554E] border-[#DDD5C7] hover:border-[#9E7241]'
              }`}
            >
              {w}%
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 p-3.5 bg-[#FAF7F2] border border-[#E5DFD5]" aria-live="polite">
        {result ? (
          <div className="flex items-end justify-between gap-3">
            <div className="text-xs text-[#5C554E] space-y-0.5">
              <div>
                {t.area}: <b className="text-[#1C1917]">{result.measure}</b>
              </div>
              <div>
                {t.perPiece}: <span dir="ltr">{result.per}</span>
              </div>
            </div>
            <div className="text-end">
              <div className="text-xs text-[#5C554E]">{t.pieces}</div>
              <div className="text-2xl font-black text-[#9E7241]">
                {result.pieces} <span className="text-sm font-bold">{t.piece}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-[#8C8278]">{t.empty}</p>
        )}
      </div>
      <p className="text-[11px] text-[#8C8278] mt-2">{t.note}</p>

      <a
        href={whatsapp()}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={!result}
        onClick={(e) => {
          if (!result) e.preventDefault();
        }}
        className={`mt-3 w-full py-3 px-4 font-bold text-sm flex items-center justify-center gap-2 transition-colors ${
          result ? 'bg-[#1E7E45] hover:bg-[#166034] text-white' : 'bg-[#E5DFD5] text-[#8C8278] cursor-not-allowed'
        }`}
      >
        <MessageSquare className="w-4 h-4" />
        {t.send}
      </a>
    </section>
  );
};
