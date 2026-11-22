import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Droplets, Truck, Store, Wrench } from 'lucide-react';
import { Language, ProductCategory } from '../types';
import { categoryCard } from '../data/categoryCards';
import { CATEGORIES_DATA, PRODUCT_MODELS, isModelInCategory } from '../data/products';
import { RANGE_STORIES, RangeStory, STORY_INTRO } from '../data/rangeStories';
import { useMedia } from '../context/MediaContext';
import { optimizeImage } from '../utils/optimizeImage';
import { useScrollProgress } from '../hooks/scroll';
import { Link } from '../router';
import { categoryRoute } from '../routing';

const PERKS = [
  { icon: Droplets, ar: 'مقاومة للماء والرطوبة 100%', en: '100% water & moisture proof', tr: '%100 su ve neme dayanıklı' },
  { icon: Truck, ar: 'توصيل لكل المحافظات السورية', en: 'Delivery to all Syrian governorates', tr: 'Tüm Suriye illerine teslimat' },
  { icon: Store, ar: 'عينات للمعاينة في معرض اللاذقية', en: 'Samples to inspect in our Lattakia showroom', tr: 'Lazkiye showroomunda numuneler' },
  { icon: Wrench, ar: 'تركيب سهل مع فيديوهات شرح', en: 'Easy to install, with video guides', tr: 'Kolay montaj, videolu anlatım' },
];

const SEE: Record<Language, (n: number) => string> = {
  ar: (n) => `شاهد الموديلات (${n})`,
  en: (n) => `See the models (${n})`,
  tr: (n) => `Modelleri gör (${n})`,
};

/** Three photos per range: the range photo and two of its models. */
const Collage: React.FC<{ id: ProductCategory; alt: string; flip: boolean }> = ({ id, alt, flip }) => {
  const { registry, getStoryPhotos } = useMedia();
  const ref = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(ref);
  const info = CATEGORIES_DATA.find((c) => c.id === id) || CATEGORIES_DATA[0];
  const models = PRODUCT_MODELS.filter((m) => isModelInCategory(m, id));
  // Chosen in the editor (Site photos → Home page range story photos); otherwise picked automatically
  const chosen = getStoryPhotos(id);
  // Quality 65: indistinguishable from 75 side by side, ~30% lighter (matters on Syrian mobile data)
  const mainSrc = (w: 640 | 1080 | 1600) => optimizeImage(chosen.main || registry.categories[id] || info.image, w, 65);
  const main = mainSrc(1080);
  // The photos are wide (range photos ~2.4:1) but sit in near-square frames, so only their
  // middle shows: "sizes" is the photo's rendered width after the crop, not the frame's width,
  // or the browser picks a version that looks soft.
  const mainSet = `${mainSrc(640)} 640w, ${main} 1080w, ${mainSrc(1600)} 1600w`;
  const smallSet = (u: string) => `${optimizeImage(u, 384, 65)} 384w, ${optimizeImage(u, 640, 65)} 640w, ${optimizeImage(u, 1080, 65)} 1080w`;
  const SMALL_SIZES = '(min-width: 1024px) 380px, (min-width: 640px) 340px, 64vw';
  const a = chosen.top || models[0]?.images[0];
  const b = chosen.bottom || models.find((m, i) => i > 0 && m.images[0])?.images[0] || models[0]?.images[1];
  // Parallax: the three photos drift at different speeds (and the large one slowly settles from a
  // slight zoom) while the chapter crosses the screen — strong enough to notice on a phone.
  const shift = (k: number) => ({ transform: `translateY(${(0.5 - p) * k}px)` });
  const mainMotion = { transform: `translateY(${(0.5 - p) * -36}px) scale(${1 + Math.abs(0.5 - p) * 0.12})` };
  const side = flip ? 'start-0' : 'end-0';
  const otherSide = flip ? 'end-0' : 'start-0';
  return (
    <div ref={ref} className="relative h-[340px] sm:h-[480px] lg:h-[540px]">
      <img
        src={main}
        srcSet={mainSet}
        sizes="(min-width: 1024px) 820px, (min-width: 640px) 730px, 140vw"
        alt={alt}
        loading="lazy"
        decoding="async"
        style={mainMotion}
        className={`absolute top-[12%] ${otherSide} w-[68%] h-[64%] object-cover rounded-2xl shadow-2xl will-change-transform`}
      />
      {a && (
        <img
          src={optimizeImage(a, 640)}
          srcSet={smallSet(a)}
          sizes={SMALL_SIZES}
          alt=""
          loading="lazy"
          decoding="async"
          style={shift(110)}
          className={`absolute top-0 ${side} w-[38%] h-[44%] object-cover rounded-2xl shadow-2xl will-change-transform`}
        />
      )}
      {b && (
        <img
          src={optimizeImage(b, 640)}
          srcSet={smallSet(b)}
          sizes={SMALL_SIZES}
          alt=""
          loading="lazy"
          decoding="async"
          style={shift(-90)}
          className={`absolute bottom-0 ${flip ? 'start-[8%]' : 'end-[8%]'} w-[44%] h-[42%] object-cover rounded-2xl shadow-2xl will-change-transform`}
        />
      )}
    </div>
  );
};

const Chapter: React.FC<{ s: RangeStory; i: number; currentLang: Language; light: boolean; register: (el: HTMLElement | null) => void }> = ({
  s,
  i,
  currentLang,
  light,
  register,
}) => {
  const Arrow = currentLang === 'ar' ? ArrowLeft : ArrowRight;
  const name = categoryCard(s.id).name[currentLang];
  const count = PRODUCT_MODELS.filter((m) => isModelInCategory(m, s.id)).length;
  const flip = i % 2 === 1;
  const line = light ? 'border-ink/15' : 'border-white/12';
  return (
    <article ref={register} data-idx={i} className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-28 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div className={`min-w-0 ${flip ? 'lg:order-2' : ''}`} data-reveal>
        <p className={`text-xs sm:text-sm font-bold tracking-[0.2em] uppercase ${light ? 'text-brass-deep' : 'text-brass-light'}`}>
          <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span> — {name}
        </p>
        <h3 className="mt-4 text-3xl sm:text-5xl font-light leading-[1.2] text-balance">
          {s.head[currentLang]} <span className={`accent-word ${light ? 'on-light' : ''}`}>{s.accent[currentLang]}</span>
        </h3>
        <p className={`mt-5 text-base sm:text-lg leading-loose ${light ? 'text-ink/70' : 'text-white/70'}`}>{s.story[currentLang]}</p>
        <dl className={`mt-8 border-t ${line}`}>
          {s.points.map((pt) => (
            <div key={pt.title.en} className={`grid grid-cols-5 gap-4 py-4 border-b ${line}`}>
              <dt className="col-span-2 text-base sm:text-lg font-bold">{pt.title[currentLang]}</dt>
              <dd className={`col-span-3 text-sm sm:text-[15px] leading-relaxed ${light ? 'text-ink/65' : 'text-white/65'}`}>{pt.body[currentLang]}</dd>
            </div>
          ))}
        </dl>
        <Link
          to={categoryRoute(currentLang, s.id)}
          className={`group mt-8 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-extrabold text-sm transition-colors ${
            light ? 'bg-ink text-white hover:bg-ink-soft' : 'bg-brass text-ink hover:bg-brass-light'
          }`}
        >
          {SEE[currentLang](count)}
          <Arrow className="w-4 h-4 transition-transform group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
        </Link>
      </div>
      <div className={`min-w-0 ${flip ? 'lg:order-1' : ''}`}>
        <Collage id={s.id} alt={name} flip={flip} />
      </div>
    </article>
  );
};

/**
 * The home page's ranges as editorial chapters. The whole section's background fades to
 * each range's mood colour (dark walnut, warm marble, stone…) as its chapter reaches the middle.
 */
export const CategoryStory: React.FC<{ currentLang: Language }> = ({ currentLang }) => {
  const [active, setActive] = useState(-1);
  const els = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx));
        }),
      { rootMargin: '-50% 0px -50% 0px' }
    );
    els.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const cur = active >= 0 ? RANGE_STORIES[active] : null;
  const light = !!cur?.light;

  return (
    <section
      id="categories"
      className={`transition-colors duration-700 ease-out ${light ? 'text-ink' : 'text-white'}`}
      style={{ backgroundColor: cur?.bg || '#15120f' }}
    >
      {/* Perks */}
      <ul className="grid grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 gap-2.5 sm:gap-4 lg:gap-6">
        {PERKS.map(({ icon: Icon, ...txt }) => (
          <li key={txt.en} className={`flex items-center gap-2.5 sm:gap-3 p-3 lg:p-0 rounded-2xl lg:bg-transparent ${light ? 'bg-ink/5' : 'bg-white/5'}`}>
            <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brass/20 text-brass flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </span>
            <span className="text-xs sm:text-sm font-semibold leading-snug">{txt[currentLang]}</span>
          </li>
        ))}
      </ul>

      {/* Intro */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 md:pt-24" data-reveal>
        <p className={`text-xs sm:text-sm font-bold tracking-[0.2em] uppercase ${light ? 'text-brass-deep' : 'text-brass-light'}`}>
          {STORY_INTRO.eyebrow[currentLang]}
        </p>
        <h2 className="mt-4 text-4xl sm:text-6xl font-light leading-[1.15] max-w-4xl text-balance">
          {STORY_INTRO.head[currentLang]} <span className={`accent-word ${light ? 'on-light' : ''}`}>{STORY_INTRO.accent[currentLang]}</span>
        </h2>
        <p className={`mt-5 text-base sm:text-lg max-w-2xl ${light ? 'text-ink/65' : 'text-white/65'}`}>{STORY_INTRO.sub[currentLang]}</p>
      </div>

      {RANGE_STORIES.map((s, i) => (
        <Chapter
          key={s.id}
          s={s}
          i={i}
          currentLang={currentLang}
          light={light}
          register={(el) => {
            els.current[i] = el;
          }}
        />
      ))}
    </section>
  );
};
