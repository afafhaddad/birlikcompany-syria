/**
 * Search-friendly product descriptions.
 *
 * Every product page gets three short paragraphs built from the model's own data
 * (name, code, look, size, thickness, coverage per piece) plus wording that matches
 * what people actually search for in Syria ("بديل الخشب", "ألواح PVC", "باركيه SPC"…).
 * Variants rotate by the model's position in its range so neighbouring pages read differently.
 */
import { Language, ProductCategory, ProductModel } from '../types';
import { PRODUCT_MODELS, isModelInCategory } from './products';
import { canonicalCategory } from '../routing';

type Copy = { what: string[]; why: string[]; where: string[] };

const COPY: Record<string, Record<Language, Copy>> = {
  ps_wood: {
    ar: {
      what: ['ألواح بديل الخشب (PS Wall Panels)', 'شرائح بديل الخشب المضلعة لتكسية الجدران', 'ألواح تكسية جدران بديلة للخشب الطبيعي'],
      why: [
        'يمنح الجدار دفء الخشب الطبيعي ومظهره المضلّع ثلاثي الأبعاد دون مشاكل الخشب: لا يتشقق، لا يتأثر بالرطوبة، ولا يحتاج دهاناً أو صيانة.',
        'خامة البوليسترين المضغوط خفيفة الوزن ومقاومة للماء والعفن 100%، وتُركَّب مباشرة على الجدار بالسيليكون ونظام التعشيق المخفي خلال ساعات قليلة.',
        'يخفي عيوب الجدران القديمة والتشققات ويعطي عزلاً صوتياً إضافياً، مع إمكانية دمج إضاءة LED خلف الشرائح لمظهر فندقي فاخر.',
      ],
      where: [
        'مناسب لخلفيات التلفزيون، جدران الصالونات وغرف النوم، المكاتب، المحلات والمطاعم.',
        'يُستخدم في ديكور الصالات وغرف الجلوس وخلف الأسرّة وفي واجهات المحلات والمكاتب الإدارية.',
        'خيار عملي لتجديد الجدران في المنازل والفنادق والمقاهي والعيادات دون أعمال هدم أو دهان.',
      ],
    },
    en: {
      what: ['PS wall panels (wood alternative)', 'fluted wood-look wall cladding panels', 'wood-alternative wall panels'],
      why: [
        'It gives a wall the warmth and fluted 3D texture of real timber without its problems: no cracking, no swelling in humidity, and no painting or upkeep.',
        'The compressed polystyrene core is lightweight and 100% water and mould proof, and fixes straight to the wall with adhesive and a concealed tongue-and-groove joint in a few hours.',
        'It hides old plaster and hairline cracks, adds a little acoustic comfort, and can be backlit with LED strips for a hotel-style finish.',
      ],
      where: [
        'Ideal for TV walls, living rooms and bedrooms, offices, shops and restaurants.',
        'Used behind beds and sofas, in reception areas, shopfronts and executive offices.',
        'A practical way to renew walls in homes, hotels, cafés and clinics with no demolition or painting.',
      ],
    },
    tr: {
      what: ['PS duvar panelleri (ahşap alternatifi)', 'ahşap görünümlü çıtalı duvar kaplama panelleri', 'ahşap alternatifi duvar panelleri'],
      why: [
        'Duvara doğal ahşabın sıcaklığını ve üç boyutlu çıtalı dokusunu verir; çatlamaz, nemden etkilenmez, boya ve bakım istemez.',
        'Sıkıştırılmış polistiren gövde hafiftir, %100 suya ve küfe dayanıklıdır; yapıştırıcı ve gizli geçme sistemiyle birkaç saatte uygulanır.',
        'Eski duvar kusurlarını gizler, akustik konfor sağlar ve LED aydınlatma ile otel havasında bir görünüm sunar.',
      ],
      where: [
        'TV duvarları, salonlar, yatak odaları, ofisler, mağazalar ve restoranlar için idealdir.',
        'Yatak ve koltuk arkalarında, resepsiyonlarda, vitrinlerde ve yönetici ofislerinde kullanılır.',
        'Ev, otel, kafe ve kliniklerde kırma dökme olmadan duvar yenilemenin pratik yoludur.',
      ],
    },
  },
  pvc_marble: {
    ar: {
      what: ['ألواح بديل الرخام (PVC Wall Panels)', 'ألواح رخام PVC بطبقة UV لامعة', 'ألواح تكسية جدران بديلة للرخام الطبيعي'],
      why: [
        'يعطي مظهر الرخام الطبيعي بعروقه ولمعانه الكريستالي بوزن أخف وسعر أقل بكثير، دون فواصل كثيرة ودون حاجة لقص حجر أو أعمال إسمنت.',
        'مقاوم للماء والرطوبة والبقع 100%، وطبقة UV تحميه من الخدوش والاصفرار وتجعل تنظيفه بقطعة قماش مبللة فقط.',
        'اللوح الكبير بمقاس 122×240 سم يغطي الجدار بسرعة ويُلصق مباشرة على السيراميك القديم أو الجدار، فيتجدد الحمام أو المطبخ في يوم واحد.',
      ],
      where: [
        'مثالي لجدران الحمامات والمطابخ، خلفيات التلفزيون، المداخل والممرات وردهات الفنادق.',
        'يُستخدم لتكسية جدران الصالونات، المغاسل، الكاونترات، والمحلات التجارية والعيادات.',
        'حل سريع لتجديد الحمامات والمطابخ والجدران الرئيسية دون تكسير السيراميك القديم.',
      ],
    },
    en: {
      what: ['PVC marble wall panels', 'UV-coated PVC marble sheets', 'marble-alternative wall panels'],
      why: [
        'It delivers the veining and crystal gloss of natural marble at a fraction of the weight and cost, with few joints and no stone cutting or cement work.',
        'It is 100% water, moisture and stain proof, and the UV top coat resists scratches and yellowing, so a damp cloth is all the cleaning it needs.',
        'The large 122 × 240 cm sheet covers a wall quickly and bonds straight over old tiles, so a bathroom or kitchen can be renewed in a day.',
      ],
      where: [
        'Ideal for bathroom and kitchen walls, TV feature walls, entrances, corridors and hotel lobbies.',
        'Used on living-room walls, vanity areas, counters, shops and clinics.',
        'A fast way to refresh bathrooms, kitchens and feature walls without breaking out old tiles.',
      ],
    },
    tr: {
      what: ['PVC mermer duvar panelleri', 'UV kaplamalı PVC mermer levhalar', 'mermer alternatifi duvar panelleri'],
      why: [
        'Doğal mermerin damarlarını ve parlaklığını çok daha hafif ve ekonomik şekilde sunar; taş kesimi ve harç işi gerektirmez.',
        '%100 suya, neme ve lekeye dayanıklıdır; UV kaplama çizilmeyi ve sararmayı önler, nemli bezle temizlenir.',
        '122 × 240 cm büyük levha duvarı hızla kaplar ve eski seramiğin üzerine doğrudan yapıştırılır.',
      ],
      where: [
        'Banyo ve mutfak duvarları, TV duvarları, girişler, koridorlar ve otel lobileri için idealdir.',
        'Salon duvarlarında, lavabo alanlarında, tezgâhlarda, mağaza ve kliniklerde kullanılır.',
        'Eski seramikleri kırmadan banyo, mutfak ve ana duvarları yenilemenin hızlı yoludur.',
      ],
    },
  },
  spc_wall: {
    ar: {
      what: ['ألواح بديل الشيبورد الحجري (SPC Wall Panels)', 'ألواح SPC الحجرية لتكسية الجدران', 'ألواح جدارية من مركّب الحجر والبوليمر'],
      why: [
        'لوح صلب من مسحوق الحجر والـ PVC لا ينتفخ ولا يتقوّس بالماء إطلاقاً، بعكس الشيبورد والـ MDF، ويتحمل الصدمات والاستخدام اليومي.',
        'سطحه بملمس الحجر أو الخشب أو القماش يعطي مظهراً فاخراً، وهو مقاوم للحريق والرطوبة والنمل الأبيض ولا يحتاج دهاناً.',
        'اللوح بمقاس 96×280 سم يغطي الجدار من الأرض إلى السقف بقطعة واحدة تقريباً، فيقل عدد الفواصل ويظهر الجدار كقطعة متصلة.',
      ],
      where: [
        'مناسب لجدران الصالونات والممرات، المكاتب، الفنادق، المطابخ والأماكن الرطبة.',
        'يُستخدم بديلاً عن الشيبورد والخشب في تكسية الجدران والأعمدة وخلفيات الاستقبال.',
        'خيار متين لتكسية جدران المشاريع التجارية والسكنية التي تحتاج مقاومة عالية للرطوبة والخدش.',
      ],
    },
    en: {
      what: ['SPC wall panels', 'stone-polymer composite wall boards', 'rigid SPC wall cladding boards'],
      why: [
        'A rigid board of stone powder and PVC that never swells or warps in water, unlike chipboard or MDF, and stands up to knocks and daily use.',
        'Stone, wood or fabric-look surfaces give a premium finish that is fire-retardant, moisture proof, termite proof and needs no painting.',
        'The 96 × 280 cm board runs almost floor to ceiling in one piece, so there are fewer joints and the wall reads as one surface.',
      ],
      where: [
        'Suitable for living rooms, corridors, offices, hotels, kitchens and damp areas.',
        'Used instead of chipboard and timber for walls, columns and reception backdrops.',
        'A durable choice for commercial and residential walls that need high moisture and scratch resistance.',
      ],
    },
    tr: {
      what: ['SPC duvar panelleri', 'taş-polimer kompozit duvar levhaları', 'sert SPC duvar kaplama levhaları'],
      why: [
        'Taş tozu ve PVC’den üretilen sert levha, sunta ve MDF’nin aksine suda şişmez, eğilmez; darbelere dayanıklıdır.',
        'Taş, ahşap veya kumaş dokulu yüzeyler lüks bir görünüm sunar; neme, yangına ve böceklere dayanıklıdır, boya istemez.',
        '96 × 280 cm levha duvarı neredeyse tek parça kaplar; derz sayısı azalır.',
      ],
      where: [
        'Salonlar, koridorlar, ofisler, oteller, mutfaklar ve nemli alanlar için uygundur.',
        'Duvar, kolon ve resepsiyon arkalarında sunta ve ahşap yerine kullanılır.',
        'Yüksek nem ve çizilme dayanımı gereken ticari ve konut projeleri için dayanıklı bir seçimdir.',
      ],
    },
  },
  spc_flooring: {
    ar: {
      what: ['أرضيات بديل الباركيه (SPC Flooring)', 'باركيه SPC بنظام الكليك', 'أرضيات SPC الحجرية المقاومة للماء'],
      why: [
        'باركيه حجري مقاوم للماء 100% لا ينتفخ ولا يتفكك عند انسكاب الماء، بعكس الباركيه الخشبي واللامينيت، ويصلح حتى للمطابخ.',
        'يُركَّب بنظام الكليك العائم دون غراء ودون تكسير البلاط القديم، وطبقة الحماية العلوية تقاوم الخدوش وحركة الأثاث والاستخدام الكثيف.',
        'طبقة IXPE السفلية تعزل الصوت وتمنح المشي راحة ودفئاً، مع ثبات كامل في الأبعاد صيفاً وشتاءً.',
      ],
      where: [
        'مناسب لغرف النوم والصالونات، المكاتب، المحلات، العيادات والمطابخ.',
        'يُستخدم لتجديد أرضيات المنازل والمكاتب فوق البلاط القديم مباشرة دون أعمال هدم.',
        'خيار عملي للأماكن ذات الحركة الكثيفة كالمحلات والمعارض والمكاتب.',
      ],
    },
    en: {
      what: ['SPC flooring (parquet alternative)', 'SPC click flooring', 'waterproof stone-core flooring'],
      why: [
        'A stone-core plank that is 100% waterproof and will not swell or lift when water is spilled, unlike timber parquet or laminate, so it even suits kitchens.',
        'It installs as a floating click floor with no glue and no need to break out old tiles, and the wear layer resists scratches, furniture and heavy traffic.',
        'The IXPE backing deadens sound and makes the floor warmer and softer underfoot, with full dimensional stability in summer and winter.',
      ],
      where: [
        'Suitable for bedrooms, living rooms, offices, shops, clinics and kitchens.',
        'Used to renew home and office floors straight over existing tiles with no demolition.',
        'A practical choice for busy areas such as shops, showrooms and offices.',
      ],
    },
    tr: {
      what: ['SPC zemin kaplaması (parke alternatifi)', 'kilitli SPC parke', 'su geçirmez taş çekirdekli zemin'],
      why: [
        '%100 su geçirmez taş çekirdekli parke; ahşap ve laminatın aksine su döküldüğünde şişmez, mutfaklarda bile kullanılır.',
        'Yapıştırıcı kullanmadan kilit sistemiyle, eski karoları kırmadan döşenir; üst katman çizilmeye ve yoğun kullanıma dayanır.',
        'IXPE alt katman ses yalıtımı sağlar ve yürüyüş konforunu artırır.',
      ],
      where: [
        'Yatak odaları, salonlar, ofisler, mağazalar, klinikler ve mutfaklar için uygundur.',
        'Ev ve ofis zeminlerini mevcut karoların üzerine doğrudan yenilemek için kullanılır.',
        'Mağaza, showroom ve ofis gibi yoğun kullanılan alanlar için pratik bir seçimdir.',
      ],
    },
  },
  ps_slats: {
    ar: {
      what: ['قُضبان بي إس الديكورية (PS Wall Slats)', 'بانوهات وإطارات جدارية من البوليسترين', 'قُضبان ديكور لتشكيل إطارات الجدران'],
      why: [
        'تُشكَّل بها إطارات وبانوهات على الطراز الفرنسي والكلاسيكي بسهولة، وتُقص بزوايا 45 درجة وتُلصق على الجدار دون مسامير ظاهرة.',
        'خفيفة ومقاومة للماء والرطوبة ولا تتشقق كالجبس، وتُدهن بأي لون ليتطابق مع الجدار أو تبقى بلونها الجاهز.',
        'تحوّل الجدار العادي إلى جدار بتقسيمات أنيقة بتكلفة بسيطة، وتُستخدم أيضاً كإطارات للمرايا واللوحات والأبواب.',
      ],
      where: [
        'مناسبة لجدران الصالونات وغرف النوم، الممرات، المداخل وغرف الطعام.',
        'تُستخدم لعمل البانوهات الفرنسية، إطارات الجدران، وتحديد خلفيات الأسرّة والتلفزيون.',
        'خيار اقتصادي لإضافة لمسة كلاسيكية فاخرة إلى أي جدار في المنزل أو المحل.',
      ],
    },
    en: {
      what: ['PS decorative wall slats', 'polystyrene wall mouldings and frames', 'decorative mouldings for wall panelling'],
      why: [
        'They form French-style and classic wall frames with ease: mitre-cut at 45°, then bonded to the wall with no visible fixings.',
        'Lightweight, water and moisture proof and free from the cracking of plaster, they can be painted any colour or left in their finished shade.',
        'They turn a plain wall into elegant panelling at low cost, and also frame mirrors, artwork and doors.',
      ],
      where: [
        'Suitable for living rooms, bedrooms, corridors, entrances and dining rooms.',
        'Used for French wainscoting, wall frames and to outline bed and TV walls.',
        'An economical way to add a classic, upmarket touch to any wall at home or in a shop.',
      ],
    },
    tr: {
      what: ['PS dekoratif duvar çıtaları', 'polistiren duvar çıtaları ve çerçeveleri', 'duvar panelleme için dekoratif çıtalar'],
      why: [
        'Fransız tarzı ve klasik duvar çerçeveleri kolayca oluşturulur; 45° kesilir, görünür vida olmadan yapıştırılır.',
        'Hafiftir, suya ve neme dayanıklıdır, alçı gibi çatlamaz; istenen renge boyanabilir.',
        'Sade bir duvarı düşük maliyetle şık bir panellemeye dönüştürür; ayna, tablo ve kapı çerçevesi olarak da kullanılır.',
      ],
      where: [
        'Salonlar, yatak odaları, koridorlar, girişler ve yemek odaları için uygundur.',
        'Fransız çıtalama, duvar çerçeveleri ve yatak/TV duvarlarını belirlemek için kullanılır.',
        'Ev veya mağazada her duvara klasik ve lüks bir dokunuş katmanın ekonomik yoludur.',
      ],
    },
  },
  ps_baseboards: {
    ar: {
      what: ['نعلات بي إس (PS Baseboards)', 'نعلات أرضية مقاومة للماء', 'وزرات جدارية من البوليسترين'],
      why: [
        'نعلة مقاومة للماء 100% لا تنتفخ عند مسح الأرض ولا تتأثر بالرطوبة، بعكس نعلات الـ MDF والخشب.',
        'تحمي أسفل الجدار من ضربات المكنسة والأثاث وتغطي الفاصل بين الأرضية والجدار بخط نظيف، وتُركَّب باللصق في دقائق.',
        'بعض الموديلات مزوّدة بقناة لإضاءة LED تعطي الأرضية توهجاً ناعماً ومظهراً عصرياً فاخراً.',
      ],
      where: [
        'مناسبة مع أرضيات الباركيه والـ SPC والسيراميك في كل الغرف والممرات.',
        'تُستخدم في المنازل والمكاتب والفنادق والمحلات لإنهاء أنيق بين الأرضية والجدار.',
        'اللمسة الأخيرة لأي تجديد: تُركَّب مع بديل الباركيه أو فوق البلاط القديم.',
      ],
    },
    en: {
      what: ['PS baseboards', 'waterproof skirting boards', 'polystyrene skirting'],
      why: [
        'A 100% waterproof skirting that will not swell when floors are mopped or in damp rooms, unlike MDF or timber skirting.',
        'It protects the foot of the wall from vacuum and furniture knocks, covers the floor-to-wall gap with a clean line and bonds in place in minutes.',
        'Selected models include an LED channel for a soft floor-level glow and a modern, premium look.',
      ],
      where: [
        'Works with parquet, SPC and ceramic floors in every room and corridor.',
        'Used in homes, offices, hotels and shops for a neat finish between floor and wall.',
        'The finishing touch to any renovation: fit it with SPC flooring or over existing tiles.',
      ],
    },
    tr: {
      what: ['PS süpürgelikler', 'su geçirmez süpürgelikler', 'polistiren süpürgelik'],
      why: [
        '%100 su geçirmez süpürgelik; MDF ve ahşabın aksine zemin silinirken şişmez, nemden etkilenmez.',
        'Duvar dibini darbelerden korur, zemin-duvar boşluğunu temiz bir çizgiyle kapatır ve dakikalar içinde yapıştırılır.',
        'Bazı modellerde LED kanalı bulunur; zemine yumuşak bir ışık ve modern bir görünüm verir.',
      ],
      where: [
        'Parke, SPC ve seramik zeminlerle tüm oda ve koridorlarda uyumludur.',
        'Ev, ofis, otel ve mağazalarda zemin ile duvar arasında temiz bir bitiş için kullanılır.',
        'Her yenilemenin son dokunuşu: SPC zeminle veya mevcut karoların üzerine uygulanır.',
      ],
    },
  },
};

const DELIVERY: Record<Language, string[]> = {
  ar: [
    'متوفر لدى شركة بيرليك في اللاذقية مع التوصيل إلى دمشق، حلب، حمص، حماة، طرطوس وكل المحافظات السورية.',
    'يمكن معاينة العينة في معرض شركة بيرليك باللاذقية، ونشحن إلى دمشق وريفها، حلب، حمص، طرطوس وباقي المحافظات.',
    'للسعر والكميات تواصل معنا عبر واتساب؛ الشحن متاح إلى جميع المحافظات السورية من مقرنا في اللاذقية.',
  ],
  en: [
    'Available from Birlik Company in Lattakia, with delivery to Damascus, Aleppo, Homs, Hama, Tartus and every Syrian governorate.',
    'See the sample at the Birlik showroom in Lattakia; we ship to Damascus, Aleppo, Homs, Tartus and the rest of Syria.',
    'Message us on WhatsApp for prices and quantities; delivery is available across Syria from our Lattakia base.',
  ],
  tr: [
    'Lazkiye’deki Birlik Şirketi’nde mevcuttur; Şam, Halep, Humus, Hama, Tartus ve tüm Suriye illerine teslim edilir.',
    'Numuneyi Lazkiye showroomumuzda inceleyebilirsiniz; Şam, Halep, Humus, Tartus ve tüm Suriye’ye sevkiyat yapıyoruz.',
    'Fiyat ve miktar için WhatsApp’tan yazın; Lazkiye merkezimizden tüm Suriye’ye teslimat yapılır.',
  ],
};

const round2 = (n: number) => (Math.round(n * 100) / 100).toString();

function coverage(model: ProductModel, cat: ProductCategory, lang: Language): string {
  const nums = (model.dimensions.match(/\d+(?:\.\d+)?/g) || []).map(Number);
  if (nums.length < 2) return '';
  const [w, l] = nums;
  if (cat === 'ps_slats' || cat === 'ps_baseboards') {
    const m = round2(l / 100);
    return { ar: `طول القطعة ${m} متر`, en: `each piece is ${m} m long`, tr: `her parça ${m} m uzunluğundadır` }[lang];
  }
  const a = round2((w * l) / 10000);
  return { ar: `اللوح الواحد يغطي نحو ${a} م²`, en: `one piece covers about ${a} m²`, tr: `bir parça yaklaşık ${a} m² kaplar` }[lang];
}

/** Three keyword-rich paragraphs for a product page. */
export function richDescription(model: ProductModel, lang: Language): string[] {
  const cat = canonicalCategory(model.category);
  const copy = (COPY[cat] || COPY.ps_wood)[lang];
  const idx = Math.max(0, PRODUCT_MODELS.filter((m) => isModelInCategory(m, cat)).findIndex((m) => m.id === model.id));
  const pick = <T,>(arr: T[], shift = 0) => arr[(idx + shift) % arr.length];
  const name = model.name[lang];
  const look = model.subtitle[lang].replace(/[.。]\s*$/, '');
  const cov = coverage(model, cat, lang);

  const intro = {
    ar: `${name} (كود ${model.code}) من ${pick(copy.what)}: ${look}. المقاس ${model.dimensions} والسماكة ${model.thickness}${cov ? `، و${cov}` : ''}.`,
    en: `${name} (code ${model.code}) is one of our ${pick(copy.what)}: ${look.charAt(0).toLowerCase()}${look.slice(1)}. Size ${model.dimensions}, thickness ${model.thickness}${cov ? `; ${cov}` : ''}.`,
    tr: `${name} (kod ${model.code}), ${pick(copy.what)} serimizdendir: ${look}. Ölçü ${model.dimensions}, kalınlık ${model.thickness}${cov ? `; ${cov}` : ''}.`,
  }[lang];

  // The model's own style text (when written) comes right after the intro, so every page
  // has wording no other page shares.
  const style = model.style?.[lang]?.trim();
  return [intro, ...(style ? [style] : []), `${pick(copy.why)} ${pick(copy.why, 1)}`, `${pick(copy.where)} ${pick(DELIVERY[lang])}`];
}

const hexToRgb = (hex?: string): [number, number, number] | null => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

/** Up to three models from other ranges whose main colour is closest: "Pairs well with". */
export function pairings(model: ProductModel, count = 3): ProductModel[] {
  const own = canonicalCategory(model.category);
  const c = hexToRgb(model.colorHex);
  if (!c) return [];
  const best = new Map<string, { m: ProductModel; d: number }>();
  for (const m of PRODUCT_MODELS) {
    const cat = canonicalCategory(m.category);
    const rgb = hexToRgb(m.colorHex);
    if (cat === own || !rgb) continue;
    const d = Math.hypot(rgb[0] - c[0], rgb[1] - c[1], rgb[2] - c[2]);
    const cur = best.get(cat);
    if (!cur || d < cur.d) best.set(cat, { m, d });
  }
  return [...best.values()].sort((a, b) => a.d - b.d).slice(0, count).map((x) => x.m);
}
