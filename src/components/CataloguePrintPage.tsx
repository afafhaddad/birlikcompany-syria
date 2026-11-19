import React from 'react';
import { Language, ProductCategory, ProductModel } from '../types';
import { CATEGORIES_DATA, PRODUCT_MODELS, isModelInCategory } from '../data/products';
import { CATEGORY_CARDS } from '../data/categoryCards';
import { INSTALLATION_GUIDES } from '../data/installationGuides';
import { FOUNDER_DATA } from '../data/founder';
import { TRANSLATIONS } from '../data/translations';
import { MAIN_CATEGORIES, SITE_ORIGIN, categoryPath, productPath } from '../routing';
import { useMedia } from '../context/MediaContext';
import { liveOptimizedImage } from '../utils/optimizeImage';
import { PHONE_DISPLAY } from '../site';

/**
 * Print edition of the catalogue (A4, full-bleed). Source of the downloadable PDF:
 * scripts/build-catalogue-pdf.ps1 prints /<lang>/catalogue/print/ with headless Edge.
 *
 * Structure: cover → contents → for each range: opener (story + range specs),
 * one page per model (photos + specifications), installation page → back cover.
 */
const TEXT = {
  ar: {
    catalogue: 'كتالوج المنتجات',
    edition: 'إصدار',
    tagline: 'مواد الإكساء والديكور الداخلي المقاومة للماء 100%',
    contents: 'المحتويات',
    models: 'موديل',
    range: 'الفئة',
    rangeSpecs: 'مواصفات الفئة',
    sizes: 'المقاسات',
    thickness: 'السماكة',
    waterproof: 'مقاومة الماء',
    composition: 'الخامة',
    applications: 'الاستخدامات',
    code: 'كود الموديل',
    size: 'المقاس',
    waterproofValue: 'مقاوم للماء والرطوبة 100%',
    specs: 'المواصفات الفنية',
    about: 'عن الموديل',
    askPrice: 'للسعر والطلب عبر واتساب',
    viewOnline: 'صفحة الموديل',
    install: 'طريقة التركيب',
    method: 'طريقة التثبيت',
    steps: 'خطوات التركيب',
    tools: 'الأدوات المطلوبة',
    tip: 'نصيحة المهندس',
    video: 'شاهد فيديو التركيب',
    whoWeAre: 'من نحن',
    contactTitle: 'تواصل معنا',
    address: 'تقاطع شارع بغداد مع شارع بورسعيد (مقابل بوظة جَعارة) — اللاذقية — سورية',
    hours: 'الأحد إلى الخميس 10:00 – 5:00  •  السبت 10:00 – 3:00  •  الجمعة عطلة',
    delivery: 'توصيل لكافة المحافظات السورية',
    sample: 'عينات جميع الموديلات متوفرة للمعاينة في معرضنا باللاذقية',
    page: 'صفحة',
  },
  en: {
    catalogue: 'Product Catalogue',
    edition: 'Edition',
    tagline: '100% waterproof wall & floor finishing materials',
    contents: 'Contents',
    models: 'models',
    range: 'Range',
    rangeSpecs: 'Range specifications',
    sizes: 'Sizes',
    thickness: 'Thickness',
    waterproof: 'Water resistance',
    composition: 'Material',
    applications: 'Applications',
    code: 'Model code',
    size: 'Size',
    waterproofValue: '100% water & moisture proof',
    specs: 'Technical specifications',
    about: 'About this model',
    askPrice: 'Price & orders on WhatsApp',
    viewOnline: 'Model page',
    install: 'Installation',
    method: 'Fixing method',
    steps: 'Installation steps',
    tools: 'Tools you need',
    tip: 'Pro tip',
    video: 'Watch the installation video',
    whoWeAre: 'About us',
    contactTitle: 'Contact us',
    address: 'Baghdad St & Port Said St intersection (opposite Jaara Ice Cream) — Lattakia — Syria',
    hours: 'Sun–Thu 10:00–17:00  •  Sat 10:00–15:00  •  Fri closed',
    delivery: 'Delivery to all Syrian governorates',
    sample: 'Samples of every model can be inspected in our Lattakia showroom',
    page: 'Page',
  },
  tr: {
    catalogue: 'Ürün Kataloğu',
    edition: 'Baskı',
    tagline: '%100 su geçirmez duvar ve zemin kaplama malzemeleri',
    contents: 'İçindekiler',
    models: 'model',
    range: 'Ürün grubu',
    rangeSpecs: 'Ürün grubu özellikleri',
    sizes: 'Ölçüler',
    thickness: 'Kalınlık',
    waterproof: 'Su dayanımı',
    composition: 'Malzeme',
    applications: 'Kullanım alanları',
    code: 'Model kodu',
    size: 'Ölçü',
    waterproofValue: '%100 su ve neme dayanıklı',
    specs: 'Teknik özellikler',
    about: 'Model hakkında',
    askPrice: 'Fiyat ve sipariş için WhatsApp',
    viewOnline: 'Model sayfası',
    install: 'Montaj',
    method: 'Sabitleme yöntemi',
    steps: 'Montaj adımları',
    tools: 'Gerekli aletler',
    tip: 'Usta tavsiyesi',
    video: 'Montaj videosunu izleyin',
    whoWeAre: 'Hakkımızda',
    contactTitle: 'İletişim',
    address: 'Bağdat Cad. ile Port Said Cad. kesişimi (Caara Dondurma karşısı) — Lazkiye — Suriye',
    hours: 'Paz–Per 10:00–17:00  •  Cmt 10:00–15:00  •  Cuma kapalı',
    delivery: 'Tüm Suriye illerine teslimat',
    sample: 'Tüm modellerin numuneleri Lazkiye showroomumuzda incelenebilir',
    page: 'Sayfa',
  },
};

const PRINT_CSS = `
@page { size: A4; margin: 0; }
html, body { background: #2a2520 !important; margin: 0; }
.pc { font-family: 'Cairo', sans-serif; color: #15120f; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.pc * { box-sizing: border-box; }
.pc-page { position: relative; width: 210mm; height: 296.8mm; overflow: hidden; margin: 0 auto 6mm; break-after: page; page-break-after: always; background: #f7f3ec; }
.pc-dark { background: #15120f; color: #fff; }
.pc-pad { padding: 16mm 15mm 14mm; }
.pc-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
.pc-frame { position: relative; overflow: hidden; background: #221d19; border-radius: 4mm; }
.pc-scrim { position: absolute; inset: 0; background: linear-gradient(to top, rgba(21,18,15,.96) 0%, rgba(21,18,15,.6) 42%, rgba(21,18,15,.15) 75%, rgba(21,18,15,.4) 100%); }
.pc-eyebrow { display: flex; align-items: center; gap: 2.5mm; font-size: 9pt; font-weight: 800; color: #8e6a33; }
.pc-eyebrow::before { content: ''; width: 9mm; height: .6mm; background: currentColor; }
.pc-dark .pc-eyebrow { color: #dfc08a; }
.pc-h1 { font-size: 34pt; font-weight: 900; line-height: 1.2; margin: 0; }
.pc-h2 { font-size: 24pt; font-weight: 900; line-height: 1.2; margin: 0; }
.pc-h3 { font-size: 11.5pt; font-weight: 900; margin: 0 0 2.5mm; }
.pc-body { font-size: 9.5pt; line-height: 1.85; color: #4d463f; margin: 0; }
.pc-dark .pc-body { color: rgba(255,255,255,.78); }
.pc-run { position: absolute; top: 7mm; inset-inline: 15mm; display: flex; justify-content: space-between; align-items: center; font-size: 7.5pt; font-weight: 700; color: #8a8178; }
.pc-foot { position: absolute; bottom: 6.5mm; inset-inline: 15mm; display: flex; justify-content: space-between; align-items: center; font-size: 7.5pt; font-weight: 700; color: #8a8178; border-top: .3mm solid #e0d6c6; padding-top: 2.5mm; }
.pc-dark .pc-run, .pc-dark .pc-foot { color: rgba(255,255,255,.55); border-color: rgba(255,255,255,.15); }
.pc-chip { display: inline-block; padding: 1.2mm 3.5mm; border-radius: 99mm; background: #15120f; color: #fff; font-size: 9pt; font-weight: 800; }
.pc-table { width: 100%; border-collapse: collapse; font-size: 9pt; }
.pc-table th, .pc-table td { padding: 2.1mm 0; border-bottom: .3mm solid #e0d6c6; text-align: start; vertical-align: top; line-height: 1.6; }
.pc-table th { width: 34%; color: #6e665d; font-weight: 700; }
.pc-table td { font-weight: 700; color: #15120f; }
.pc-dark .pc-table th { color: rgba(255,255,255,.6); }
.pc-dark .pc-table td { color: #fff; }
.pc-dark .pc-table th, .pc-dark .pc-table td { border-color: rgba(255,255,255,.14); }
.pc-stat { border: .3mm solid #e0d6c6; background: #fff; border-radius: 3mm; padding: 3mm 3.5mm; }
.pc-stat small { display: block; font-size: 7.5pt; font-weight: 700; color: #6e665d; }
.pc-stat b { display: block; font-size: 10pt; font-weight: 900; margin-top: .6mm; }
.pc-cta { display: flex; align-items: center; justify-content: space-between; gap: 4mm; background: #15120f; color: #fff; border-radius: 3.5mm; padding: 3.5mm 5mm; font-size: 9pt; font-weight: 800; }
.pc-cta a { color: #dfc08a; text-decoration: none; }
.pc-num { width: 8mm; height: 8mm; border-radius: 50%; background: #15120f; color: #dfc08a; font-weight: 900; font-size: 10pt; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.pc a { color: inherit; text-decoration: none; }
@media print { html, body { background: #fff !important; } .pc-page { margin: 0; } }
`;

const ltr = (s: string) => <bdi dir="ltr">{s}</bdi>;

/** The full catalogue, or with `range` a short catalogue of one range (cover, models, installation, back cover). */
export const CataloguePrintPage: React.FC<{ currentLang: Language; range?: ProductCategory }> = ({ currentLang, range }) => {
  const { registry } = useMedia();
  const t = TEXT[currentLang];
  const dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  const about = TRANSLATIONS[currentLang].about;
  const brand = currentLang === 'ar' ? 'شركة بيرليك' : 'Birlik Company';
  const year = '2026';
  const img = (u: string | undefined, w: 640 | 1080 = 640) => (u ? liveOptimizedImage(u, w) : '');

  // Build the page list first so the contents page and page numbers are exact.
  const sections = (range ? [range] : MAIN_CATEGORIES).map((catId) => {
    const info = CATEGORIES_DATA.find((c) => c.id === catId)!;
    const card = CATEGORY_CARDS.find((c) => c.id === catId)!;
    const guide = INSTALLATION_GUIDES.find((g) => g.categoryId === catId);
    const models = PRODUCT_MODELS.filter((m) => isModelInCategory(m, catId));
    return { catId, info, card, guide, models };
  });
  const single = range ? sections[0] : null;
  let pageNo = single ? 2 : 3; // cover = 1, contents = 2 (the full catalogue only)
  const numbered = sections.map((s) => {
    const opener = pageNo++;
    const modelPages = s.models.map(() => pageNo++);
    const install = s.guide ? pageNo++ : 0;
    return { ...s, opener, modelPages, install };
  });

  const Run: React.FC<{ label: string }> = ({ label }) => (
    <div className="pc-run">
      <span>{brand} — {t.catalogue} {year}</span>
      <span>{label}</span>
    </div>
  );
  const Foot: React.FC<{ n: number }> = ({ n }) => (
    <div className="pc-foot">
      <span>www.birlik-insaat.com</span>
      <span>WhatsApp {ltr(PHONE_DISPLAY)}</span>
      <span>{n}</span>
    </div>
  );

  const ProductPage: React.FC<{ m: ProductModel; n: number; catName: string; info: (typeof sections)[number]['info'] }> = ({ m, n, catName, info }) => {
    const photos = m.images.slice(0, 3);
    if (!photos.length && registry.categories[info.id]) photos.push(registry.categories[info.id]);
    const rows: Array<[string, React.ReactNode]> = [
      [t.code, ltr(m.code)],
      [t.size, ltr(m.dimensions)],
      [t.thickness, ltr(m.thickness)],
      [t.waterproof, t.waterproofValue],
      ...m.specs
        .filter((s) => !['dimensions_standard', 'thickness'].includes(s.key))
        .map((s): [string, React.ReactNode] => [s.label[currentLang], s.value[currentLang]]),
      [t.composition, info.specs.composition[currentLang]],
      [t.applications, info.specs.applications[currentLang]],
    ];
    const url = `${SITE_ORIGIN}${productPath(currentLang, m)}`;
    return (
      <section className="pc-page">
        <Run label={catName} />
        <div className="pc-pad" style={{ paddingTop: '15mm' }}>
          {/* Photos */}
          <div style={{ display: 'flex', gap: '3mm', height: '128mm' }}>
            <div className="pc-frame" style={{ flex: photos.length > 1 ? '1.65' : '1' }}>
              <img className="pc-img" src={img(photos[0], 1080)} alt={m.name[currentLang]} />
            </div>
            {photos.length > 1 && (
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '3mm' }}>
                {photos.slice(1).map((p) => (
                  <div key={p} className="pc-frame" style={{ flex: '1' }}>
                    <img className="pc-img" src={img(p, 640)} alt="" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Title */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '6mm', marginTop: '7mm' }}>
            <div>
              <p className="pc-eyebrow">{catName}</p>
              <h2 className="pc-h2" style={{ marginTop: '1mm' }}>{m.name[currentLang]}</h2>
            </div>
            <span className="pc-chip">{ltr(m.code)}</span>
          </div>
          <p className="pc-body" style={{ marginTop: '2mm', fontSize: '10.5pt' }}>{m.subtitle[currentLang]}</p>

          {/* Details */}
          <div style={{ display: 'flex', gap: '9mm', marginTop: '6mm' }}>
            <div style={{ flex: '1' }}>
              <h3 className="pc-h3">{t.about}</h3>
              <p className="pc-body">{m.description[currentLang]}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5mm', marginTop: '5mm' }}>
                <div className="pc-stat"><small>{t.size}</small><b>{ltr(m.dimensions)}</b></div>
                <div className="pc-stat"><small>{t.thickness}</small><b>{ltr(m.thickness)}</b></div>
              </div>
            </div>
            <div style={{ flex: '1.25' }}>
              <h3 className="pc-h3">{t.specs}</h3>
              <table className="pc-table">
                <tbody>
                  {rows.map(([k, v], i) => (
                    <tr key={i}><th>{k}</th><td>{v}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '17mm', insetInline: '15mm' }}>
          <div className="pc-cta">
            <span>{t.askPrice}: {ltr(PHONE_DISPLAY)}</span>
            <a href={url}>{t.viewOnline} ↗</a>
          </div>
        </div>
        <Foot n={n} />
      </section>
    );
  };

  return (
    <div className="pc" dir={dir}>
      <style>{PRINT_CSS}</style>

      {/* ── Cover of a one-range catalogue ── */}
      {single && (
        <section className="pc-page pc-dark">
          <img className="pc-img" src={img(registry.categories[single.catId] || single.models[0]?.images[0], 1080)} alt="" />
          <div className="pc-scrim" />
          <div style={{ position: 'absolute', top: '16mm', insetInlineStart: '15mm', background: '#fff', borderRadius: '4mm', padding: '2mm', width: '30mm', height: '30mm' }}>
            <img src="/logo-512.png" alt="Birlik Company" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{ position: 'absolute', bottom: '24mm', insetInline: '15mm' }}>
            <p className="pc-eyebrow">{t.catalogue} {year}</p>
            <h1 className="pc-h1" style={{ fontSize: '46pt', marginTop: '2mm' }}>{single.card.name[currentLang]}</h1>
            <p style={{ fontSize: '13pt', fontWeight: 600, color: 'rgba(255,255,255,.85)', margin: '3mm 0 0' }}>
              <bdi>{single.card.tag[currentLang]}</bdi>
            </p>
            <div style={{ display: 'flex', gap: '8mm', marginTop: '10mm', paddingTop: '6mm', borderTop: '.3mm solid rgba(255,255,255,.25)', fontSize: '10pt', fontWeight: 700 }}>
              <span>{single.models.length} {t.models}</span>
              {single.guide && <span>{t.install}</span>}
              <span>{t.delivery}</span>
            </div>
          </div>
        </section>
      )}

      {/* ── Cover ── */}
      {!single && (
      <section className="pc-page pc-dark">
        <img className="pc-img" src={img(registry.hero, 1080)} alt="" />
        <div className="pc-scrim" />
        <div style={{ position: 'absolute', top: '16mm', insetInlineStart: '15mm', background: '#fff', borderRadius: '4mm', padding: '2mm', width: '30mm', height: '30mm' }}>
          <img src="/logo-512.png" alt="Birlik Company" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <div style={{ position: 'absolute', bottom: '24mm', insetInline: '15mm' }}>
          <p className="pc-eyebrow">{t.edition} {year}</p>
          <h1 className="pc-h1" style={{ fontSize: '50pt', marginTop: '2mm' }}>{t.catalogue}</h1>
          <p style={{ fontSize: '14pt', fontWeight: 600, color: 'rgba(255,255,255,.85)', margin: '3mm 0 0' }}>{t.tagline}</p>
          <div style={{ display: 'flex', gap: '8mm', marginTop: '10mm', paddingTop: '6mm', borderTop: '.3mm solid rgba(255,255,255,.25)', fontSize: '10pt', fontWeight: 700 }}>
            <span>{PRODUCT_MODELS.length} {t.models}</span>
            <span>{MAIN_CATEGORIES.length} {t.range}</span>
            <span>{t.delivery}</span>
          </div>
        </div>
      </section>
      )}

      {/* ── Contents + about (full catalogue only) ── */}
      {!single && (
      <section className="pc-page">
        <div className="pc-pad">
          <p className="pc-eyebrow">{brand}</p>
          <h2 className="pc-h1" style={{ marginTop: '1mm' }}>{t.contents}</h2>
          <div style={{ marginTop: '9mm' }}>
            {numbered.map((s, i) => (
              <a key={s.catId} href={`#pc-${s.catId}`} style={{ display: 'flex', alignItems: 'center', gap: '5mm', padding: '4.2mm 0', borderBottom: '.3mm solid #e0d6c6' }}>
                <span style={{ fontSize: '11pt', fontWeight: 900, color: '#b98a45', width: '8mm' }}>{ltr(`0${i + 1}`)}</span>
                <span style={{ flex: '1' }}>
                  <span style={{ display: 'block', fontSize: '14pt', fontWeight: 900 }}>{s.card.name[currentLang]}</span>
                  <span style={{ display: 'block', fontSize: '8.5pt', color: '#6e665d', fontWeight: 600 }}>
                    {s.models.length} {t.models}{s.guide ? ` • ${t.install}` : ''}
                  </span>
                </span>
                <span style={{ fontSize: '11pt', fontWeight: 800 }}>{s.opener}</span>
              </a>
            ))}
          </div>

          <div style={{ marginTop: '11mm', display: 'flex', gap: '8mm' }}>
            <div style={{ flex: '1.5' }}>
              <h3 className="pc-h3">{t.whoWeAre}</h3>
              <p className="pc-body">{about.p1}</p>
            </div>
            <div style={{ flex: '1', display: 'grid', gap: '2.5mm', alignContent: 'start' }}>
              <div className="pc-stat"><b style={{ fontSize: '16pt', color: '#8e6a33' }}>{about.stats.established}</b><small>{about.stats.establishedLabel}</small></div>
              <div className="pc-stat"><b style={{ fontSize: '16pt', color: '#8e6a33' }}>{about.stats.syriaBranch}</b><small>{about.stats.syriaBranchLabel}</small></div>
              <div className="pc-stat"><b style={{ fontSize: '16pt', color: '#8e6a33' }}>{about.stats.coverage}</b><small>{about.stats.coverageLabel}</small></div>
            </div>
          </div>
        </div>
        <Foot n={2} />
      </section>
      )}

      {numbered.map((s, si) => {
        const name = s.card.name[currentLang];
        return (
          <React.Fragment key={s.catId}>
            {/* ── Range opener ── */}
            <section className="pc-page pc-dark" id={`pc-${s.catId}`}>
              <div style={{ position: 'absolute', top: 0, insetInline: 0, height: '150mm' }}>
                <img className="pc-img" src={img(registry.categories[s.catId], 1080)} alt={name} />
                <div className="pc-scrim" />
              </div>
              <div style={{ position: 'absolute', top: '108mm', insetInline: '15mm' }}>
                <p style={{ fontSize: '54pt', fontWeight: 900, color: '#dfc08a', lineHeight: 1, margin: 0 }}>{ltr(`0${si + 1}`)}</p>
                <h2 className="pc-h1" style={{ fontSize: '40pt', marginTop: '2mm' }}>{name}</h2>
                <p style={{ fontSize: '10pt', fontWeight: 700, color: '#dfc08a', margin: '1mm 0 0' }}><bdi>{s.card.tag[currentLang]}</bdi></p>
              </div>
              <div style={{ position: 'absolute', top: '166mm', insetInline: '15mm', display: 'flex', gap: '9mm' }}>
                <div style={{ flex: '1' }}>
                  <p className="pc-body" style={{ fontSize: '10.5pt' }}>{s.card.description[currentLang]}</p>
                  <p className="pc-body" style={{ marginTop: '4mm' }}>{s.info.description[currentLang]}</p>
                  <p style={{ marginTop: '6mm' }}>
                    <span className="pc-chip" style={{ background: '#b98a45', color: '#15120f' }}>{s.models.length} {t.models}</span>
                  </p>
                </div>
                <div style={{ flex: '1.1' }}>
                  <h3 className="pc-h3" style={{ color: '#dfc08a' }}>{t.rangeSpecs}</h3>
                  <table className="pc-table">
                    <tbody>
                      <tr><th>{t.sizes}</th><td>{ltr(s.info.specs.dimensions)}</td></tr>
                      <tr><th>{t.thickness}</th><td>{ltr(s.info.specs.thickness)}</td></tr>
                      <tr><th>{t.waterproof}</th><td>{s.info.specs.waterproof[currentLang]}</td></tr>
                      <tr><th>{t.composition}</th><td>{s.info.specs.composition[currentLang]}</td></tr>
                      <tr><th>{t.applications}</th><td>{s.info.specs.applications[currentLang]}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <Foot n={s.opener} />
            </section>

            {/* ── One page per model ── */}
            {s.models.map((m, mi) => (
              <ProductPage key={m.id} m={m} n={s.modelPages[mi]} catName={name} info={s.info} />
            ))}

            {/* ── Installation ── */}
            {s.guide && (
              <section className="pc-page" id={`pc-install-${s.catId}`}>
                <Run label={`${t.install} — ${name}`} />
                <div className="pc-pad" style={{ paddingTop: '17mm' }}>
                  <p className="pc-eyebrow">{t.install}</p>
                  <h2 className="pc-h1" style={{ fontSize: '28pt', marginTop: '1mm' }}>{name}</h2>
                  <p className="pc-body" style={{ marginTop: '2mm', fontSize: '10.5pt' }}>{s.guide.subtitle[currentLang]}</p>

                  <div className="pc-stat" style={{ marginTop: '6mm', padding: '4mm 5mm' }}>
                    <small>{t.method}</small>
                    <b style={{ fontSize: '11pt' }}>{s.guide.installationMethod[currentLang]}</b>
                  </div>

                  <h3 className="pc-h3" style={{ marginTop: '8mm' }}>{t.steps}</h3>
                  <div style={{ display: 'grid', gap: '4.5mm' }}>
                    {s.guide.steps[currentLang].map((step, i) => (
                      <div key={i} style={{ display: 'flex', gap: '4mm', alignItems: 'flex-start' }}>
                        <span className="pc-num">{i + 1}</span>
                        <p className="pc-body" style={{ fontSize: '10.5pt', color: '#2b2622', paddingTop: '.6mm' }}>{step}</p>
                      </div>
                    ))}
                  </div>

                  <h3 className="pc-h3" style={{ marginTop: '9mm' }}>{t.tools}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2mm' }}>
                    {s.guide.tools[currentLang].map((tool) => (
                      <span key={tool} style={{ padding: '1.6mm 4mm', borderRadius: '99mm', background: '#ece4d7', fontSize: '9pt', fontWeight: 700 }}>{tool}</span>
                    ))}
                  </div>

                  <div style={{ marginTop: '9mm', background: 'rgba(185,138,69,.16)', borderInlineStart: '1.2mm solid #b98a45', borderRadius: '2.5mm', padding: '5mm 6mm' }}>
                    <h3 className="pc-h3" style={{ color: '#8e6a33', marginBottom: '1.5mm' }}>{t.tip}</h3>
                    <p className="pc-body" style={{ fontSize: '10.5pt', color: '#2b2622' }}>{s.guide.proTip[currentLang]}</p>
                  </div>
                </div>
                <div style={{ position: 'absolute', bottom: '17mm', insetInline: '15mm' }}>
                  <div className="pc-cta">
                    <span>▶ {t.video}</span>
                    <a href={`https://youtu.be/${s.guide.youtubeId}`}>{ltr(`youtu.be/${s.guide.youtubeId}`)}</a>
                  </div>
                  <p style={{ margin: '2.5mm 0 0', fontSize: '8pt', fontWeight: 700, color: '#6e665d', textAlign: 'center' }}>
                    <a href={`${SITE_ORIGIN}${categoryPath(currentLang, s.catId)}`}>{ltr(`www.birlik-insaat.com${categoryPath(currentLang, s.catId)}`)}</a>
                  </p>
                </div>
                <Foot n={s.install} />
              </section>
            )}
          </React.Fragment>
        );
      })}

      {/* ── Back cover ── */}
      <section className="pc-page pc-dark">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 30%, rgba(185,138,69,.28), transparent 62%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20mm' }}>
          <div style={{ background: '#fff', borderRadius: '5mm', padding: '3mm', width: '42mm', height: '42mm' }}>
            <img src="/logo-512.png" alt="Birlik Company" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <p className="pc-eyebrow" style={{ marginTop: '12mm' }}>{t.contactTitle}</p>
          <p style={{ fontSize: '30pt', fontWeight: 900, margin: '2mm 0 0', color: '#dfc08a' }}>{ltr(PHONE_DISPLAY)}</p>
          <p style={{ fontSize: '11pt', fontWeight: 700, margin: '1mm 0 0', color: 'rgba(255,255,255,.7)' }}>WhatsApp • {currentLang === 'ar' ? 'اتصال' : currentLang === 'tr' ? 'Telefon' : 'Phone'}</p>
          <p style={{ fontSize: '11.5pt', fontWeight: 700, lineHeight: 1.9, margin: '10mm 0 0', maxWidth: '140mm' }}>{t.address}</p>
          <p className="pc-body" style={{ marginTop: '2mm' }}>{t.hours}</p>
          <p className="pc-body" style={{ marginTop: '6mm', color: '#dfc08a', fontWeight: 700 }}>{t.sample}</p>
          <p className="pc-body">{t.delivery}</p>
          <p style={{ fontSize: '13pt', fontWeight: 900, margin: '12mm 0 0' }}>
            <a href={SITE_ORIGIN}>www.birlik-insaat.com</a>
          </p>
          <p className="pc-body" style={{ marginTop: '1mm' }}>info@birlik-insaat.com</p>
          <p className="pc-body" style={{ marginTop: '12mm', fontSize: '8pt' }}>{FOUNDER_DATA.name[currentLang]} — {FOUNDER_DATA.title[currentLang]}</p>
        </div>
      </section>
    </div>
  );
};
