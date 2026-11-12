import React from 'react';
import { ArrowLeft, ArrowRight, Droplets } from 'lucide-react';
import { Language, ProductModel } from '../types';
import { CategoryCard, modelCount } from '../data/categoryCards';
import { CATEGORIES_DATA } from '../data/products';
import { useMedia } from '../context/MediaContext';
import { Link } from '../router';
import { categoryRoute, productRoute } from '../routing';
import { UI } from '../site';

const FALLBACK = '/media/hero-desktop.webp';

/** Tall photo tile for a product category. */
export const CategoryTile: React.FC<{ card: CategoryCard; index: number; currentLang: Language; className?: string }> = ({
  card,
  index,
  currentLang,
  className = '',
}) => {
  const { getCategoryImageUrl } = useMedia();
  const Arrow = currentLang === 'ar' ? ArrowLeft : ArrowRight;
  const base = CATEGORIES_DATA.find((c) => c.id === card.id)?.image || FALLBACK;
  return (
    <Link
      to={categoryRoute(currentLang, card.id)}
      id={`category-row-${card.id}`}
      className={`group relative block overflow-hidden rounded-3xl bg-ink-soft aspect-[3/4] sm:aspect-[4/5] ${className}`}
    >
      <img
        src={getCategoryImageUrl(card.id, base)}
        alt={card.name[currentLang]}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 scrim-bottom" />
      <div className="absolute top-4 inset-x-4 flex items-center justify-between text-xs font-bold">
        <span className="text-brass-light tabular-nums" dir="ltr">
          0{index + 1}
        </span>
        <span className="px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-sm text-white/90">
          {modelCount(card.id)} {UI.models[currentLang]}
        </span>
      </div>
      <div className="absolute bottom-0 inset-x-0 p-5 text-white">
        <p className="text-xs text-brass-light font-semibold mb-1" dir="auto">
          {card.tag[currentLang]}
        </p>
        <h3 className="text-2xl font-black leading-snug">{card.name[currentLang]}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-white/80 line-clamp-2">{card.description[currentLang]}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-ink bg-brass group-hover:bg-brass-light px-4 py-2 rounded-full transition-colors">
          {UI.viewModels[currentLang]}
          <Arrow className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
};

/** Product card used in category grids and "more models" rails. */
export const ProductCard: React.FC<{ model: ProductModel; currentLang: Language; className?: string }> = ({
  model,
  currentLang,
  className = '',
}) => {
  const { getProductImageUrl, getCategoryImageUrl } = useMedia();
  const src = getProductImageUrl(model.id, getCategoryImageUrl(model.category, FALLBACK));
  return (
    <Link
      to={productRoute(currentLang, model)}
      id={`carousel-product-${model.id}`}
      className={`group flex flex-col overflow-hidden rounded-2xl bg-white border border-line hover:border-brass hover:shadow-lg transition-all ${className}`}
    >
      <div className="relative aspect-[4/5] bg-ink-soft overflow-hidden">
        <img
          src={src}
          alt={`${model.code} ${model.name[currentLang]}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-2 start-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-wa/90 text-white text-[10px] font-bold">
          <Droplets className="w-3 h-3" />
          100%
        </span>
      </div>
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <h3 className="font-extrabold text-sm sm:text-base text-ink leading-snug">{model.name[currentLang]}</h3>
        <p className="mt-0.5 text-[11px] sm:text-xs text-muted font-semibold" dir="ltr" data-keep-start="">
          {model.code}
        </p>
        <p className="mt-2 text-[11px] sm:text-xs text-muted" dir="ltr" data-keep-start="">
          {model.dimensions} · {model.thickness}
        </p>
        <span className="mt-3 pt-3 border-t border-line text-xs sm:text-sm font-bold text-brass-deep group-hover:text-ink">
          {UI.askPrice[currentLang]} {currentLang === 'ar' ? '←' : '→'}
        </span>
      </div>
    </Link>
  );
};

/** Small heading block used at the top of sections. */
export const SectionHeading: React.FC<{ eyebrow?: string; title: string; sub?: string; dark?: boolean; as?: 'h1' | 'h2' }> = ({
  eyebrow,
  title,
  sub,
  dark,
  as: Tag = 'h2',
}) => (
  <div data-reveal>
    {eyebrow && (
      <p className={`flex items-center gap-2 text-sm font-bold mb-2 ${dark ? 'text-brass-light' : 'text-brass-deep'}`}>
        <span className="w-6 h-0.5 bg-current" />
        {eyebrow}
      </p>
    )}
    <Tag className={`text-3xl sm:text-4xl font-black leading-tight text-balance ${dark ? 'text-white' : 'text-ink'}`}>{title}</Tag>
    {sub && <p className={`mt-3 text-sm sm:text-base leading-relaxed max-w-2xl ${dark ? 'text-white/70' : 'text-muted'}`}>{sub}</p>}
  </div>
);
