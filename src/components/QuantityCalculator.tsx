import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Calculator } from 'lucide-react';
import { Language, ProductCategory } from '../types';
import { PRODUCT_MODELS, isModelInCategory } from '../data/products';
import { categoryCard } from '../data/categoryCards';
import { MAIN_CATEGORIES, productRoute } from '../routing';
import { optimizeImage } from '../utils/optimizeImage';
import { Link } from '../router';
import { AreaCalculator } from './AreaCalculator';

const TEXT = {
  ar: {
    step1: 'اختر المادة',
    step2: 'اختر الموديل',
    step3: 'أدخل القياسات',
    view: 'صفحة الموديل',
  },
  en: {
    step1: 'Pick the material',
    step2: 'Pick the model',
    step3: 'Enter your measurements',
    view: 'Model page',
  },
  tr: {
    step1: 'Malzemeyi seçin',
    step2: 'Modeli seçin',
    step3: 'Ölçüleri girin',
    view: 'Model sayfası',
  },
};

const Step: React.FC<{ n: number; label: string; dark?: boolean }> = ({ n, label, dark }) => (
  <p className={`flex items-center gap-2 text-sm font-extrabold mb-2.5 ${dark ? 'text-white' : 'text-ink'}`}>
    <span className="w-6 h-6 rounded-full bg-brass text-ink text-xs font-black flex items-center justify-center tabular-nums">{n}</span>
    {label}
  </p>
);

/**
 * The site's lead engine: material → model (colour swatches, no image downloads) → measurements
 * → result drawn on the visitor's own wall → "send on WhatsApp" with everything filled in.
 * Visitors who use the calculator are the ones who end up messaging, so it appears on the
 * home page, every range page, every article and its own page.
 */
export const QuantityCalculator: React.FC<{
  currentLang: Language;
  ranges?: ProductCategory[];
  dark?: boolean;
  initialModelId?: string;
}> = ({ currentLang, ranges = MAIN_CATEGORIES, dark, initialModelId }) => {
  const t = TEXT[currentLang];
  const Arrow = currentLang === 'ar' ? ArrowLeft : ArrowRight;
  const options = ranges.filter((r) => PRODUCT_MODELS.some((m) => isModelInCategory(m, r)));
  const initial = PRODUCT_MODELS.find((m) => m.id === initialModelId);
  const [range, setRange] = useState<ProductCategory>(
    initial ? options.find((r) => isModelInCategory(initial, r)) || options[0] : options[0]
  );
  const models = PRODUCT_MODELS.filter((m) => isModelInCategory(m, range));
  const [modelId, setModelId] = useState(initial?.id || models[0]?.id);
  const model = models.find((m) => m.id === modelId) || models[0];
  if (!model) return null;

  const chip = (active: boolean) =>
    `px-4 py-2.5 rounded-full text-sm font-bold border whitespace-nowrap transition-colors ${
      active
        ? dark
          ? 'bg-brass text-ink border-brass'
          : 'bg-ink text-white border-ink'
        : dark
          ? 'bg-white/5 text-white/80 border-white/20 hover:border-brass'
          : 'bg-white text-ink/80 border-line hover:border-brass'
    }`;

  return (
    <div className={`min-w-0 rounded-[28px] p-4 sm:p-6 ${dark ? 'bg-white/[.06] ring-1 ring-white/15' : 'bg-white border border-line'}`}>
      {options.length > 1 && (
        <div className="mb-5">
          <Step n={1} label={t.step1} dark={dark} />
          <div className="snap-rail gap-2 -mx-1 px-1" role="tablist">
            {options.map((r) => (
              <button
                key={r}
                type="button"
                role="tab"
                aria-selected={r === range}
                onClick={() => {
                  setRange(r);
                  setModelId(PRODUCT_MODELS.find((m) => isModelInCategory(m, r))?.id);
                }}
                className={chip(r === range)}
              >
                {categoryCard(r).name[currentLang]}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-5">
        <Step n={options.length > 1 ? 2 : 1} label={t.step2} dark={dark} />
        {/* Product photos (small 384px versions, loaded lazily) so people pick what they actually see */}
        <div className="snap-rail gap-2.5 -mx-1 px-1 pt-1 pb-2" role="radiogroup" aria-label={t.step2}>
          {models.map((m) => (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={m.id === model.id}
              onClick={() => setModelId(m.id)}
              style={{ scrollSnapAlign: 'start' }}
              className="shrink-0 w-[84px] text-center group"
            >
              <img
                src={optimizeImage(m.images[0], 384)}
                alt=""
                loading="lazy"
                decoding="async"
                className={`w-[84px] h-[84px] rounded-2xl object-cover bg-ink-soft transition-all ${
                  m.id === model.id ? 'ring-[3px] ring-brass' : `ring-1 ${dark ? 'ring-white/15' : 'ring-black/10'} opacity-80 group-hover:opacity-100`
                }`}
              />
              <span
                className={`mt-1.5 block text-[11px] leading-tight font-bold line-clamp-2 ${
                  m.id === model.id ? (dark ? 'text-brass-light' : 'text-brass-deep') : dark ? 'text-white/70' : 'text-muted'
                }`}
              >
                {m.name[currentLang]}
              </span>
            </button>
          ))}
        </div>
        {/* The chosen model: name, code, size and a link to its page */}
        <div className={`mt-2 flex items-center gap-3 rounded-2xl px-4 py-3 ${dark ? 'bg-black/25' : 'bg-sand'}`}>
          <div className="min-w-0 flex-1">
            <p className={`font-black text-sm truncate ${dark ? 'text-white' : 'text-ink'}`}>{model.name[currentLang]}</p>
            <p className={`text-xs font-semibold ${dark ? 'text-white/60' : 'text-muted'}`} dir="ltr">
              {model.code} · {model.dimensions}
            </p>
          </div>
          <Link
            to={productRoute(currentLang, model)}
            className={`shrink-0 inline-flex items-center gap-1 text-xs font-extrabold ${dark ? 'text-brass-light' : 'text-brass-deep'} hover:underline`}
          >
            {t.view}
            <Arrow className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <Step n={options.length > 1 ? 3 : 2} label={t.step3} dark={dark} />
      <div className={`rounded-2xl ${dark ? 'bg-ivory p-4 sm:p-5' : ''}`}>
        {/* No key: switching models keeps the measurements already typed */}
        <AreaCalculator model={model} currentLang={currentLang} embedded />
      </div>
    </div>
  );
};

/** Heading block used above the calculator on the home and range pages. */
export const CalculatorIntro: React.FC<{ title: string; body: string; dark?: boolean }> = ({ title, body, dark }) => (
  <div className="max-w-2xl">
    <span className={`w-12 h-12 rounded-2xl flex items-center justify-center ${dark ? 'bg-brass text-ink' : 'bg-ink text-brass-light'}`}>
      <Calculator className="w-6 h-6" />
    </span>
    <h2 className={`mt-4 text-2xl sm:text-3xl font-black leading-snug ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2>
    <p className={`mt-2 text-sm sm:text-base leading-relaxed ${dark ? 'text-white/70' : 'text-ink/75'}`}>{body}</p>
  </div>
);
