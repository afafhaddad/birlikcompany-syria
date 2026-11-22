/**
 * Home page range chapters: a short story per range (headline + accent, paragraph, three
 * points) and the chapter's mood colour. Facts only: what is already stated about each range.
 */
import { Language, ProductCategory } from '../types';

type L = Record<Language, string>;

export interface RangeStory {
  id: ProductCategory;
  bg: string;
  light: boolean; // light background → dark text
  head: L;
  accent: L;
  story: L;
  points: Array<{ title: L; body: L }>;
}

export const STORY_INTRO = {
  eyebrow: { ar: 'حلول الإكساء الفاخرة', en: 'Premium finishing solutions', tr: 'Premium kaplama çözümleri' } as L,
  head: { ar: 'نصنع مساحات تُعاش', en: 'We craft spaces', tr: 'Yaşanmaya değer' } as L,
  accent: { ar: 'بأناقة تدوم.', en: 'worth living in.', tr: 'mekânlar tasarlıyoruz.' } as L,
  sub: {
    ar: 'ست فئات تغطي الجدار والأرضية واللمسات الأخيرة — كلها مقاومة للماء، وكلها تُركّب بدون تكسير.',
    en: 'Six ranges for walls, floors and finishing touches — all waterproof, all installed without demolition.',
    tr: 'Duvar, zemin ve son dokunuşlar için altı grup — hepsi su geçirmez, hepsi kırmadan uygulanır.',
  } as L,
};

export const RANGE_STORIES: RangeStory[] = [
  {
    id: 'ps_wood',
    bg: '#2a1d13',
    light: false,
    head: { ar: 'دفء الخشب،', en: 'The warmth of wood,', tr: 'Ahşabın sıcaklığı,' },
    accent: { ar: 'وأكثر بكثير.', en: 'and much more.', tr: 've çok daha fazlası.' },
    story: {
      ar: 'ألواح PS مضلّعة بموديلات وألوان كثيرة: درجات خشب دافئة، وموديلات بلمسات الرخام والذهب والمخمل، وأخرى سوداء فخمة. كلها خفيفة ومقاومة للماء 100%، تمنح الجدار عمقاً ثلاثي الأبعاد وتُركّب بسرعة بدون تكسير.',
      en: 'Fluted PS panels in many models and colours: warm wood tones, designs with marble, gold and velvet touches, and rich blacks. All light and 100% waterproof — they give a wall real depth and go up fast with no demolition.',
      tr: 'Birçok model ve renkte oluklu PS paneller: sıcak ahşap tonları, mermer, altın ve kadife dokunuşlu tasarımlar ve asil siyahlar. Hepsi hafif ve %100 su geçirmez; duvara derinlik katar, kırmadan hızla uygulanır.',
    },
    points: [
      {
        title: { ar: 'تشكيلة واسعة', en: 'A wide collection', tr: 'Geniş koleksiyon' },
        body: { ar: 'خشبي، رخامي، ذهبي، مخملي وأسود — لكل ذوق موديل.', en: 'Wood, marble, gold, velvet and black — a model for every taste.', tr: 'Ahşap, mermer, altın, kadife ve siyah — her zevke bir model.' },
      },
      {
        title: { ar: 'لا ينتفخ ولا يتسوّس', en: 'No swelling, no rot', tr: 'Şişmez, çürümez' },
        body: { ar: 'مقاوم للماء والرطوبة، يصلح للمطابخ والحمّامات.', en: 'Water and moisture proof — fine in kitchens and bathrooms.', tr: 'Suya ve neme dayanıklı; mutfak ve banyoya uygun.' },
      },
      {
        title: { ar: 'تركيب سريع', en: 'Quick to install', tr: 'Hızlı montaj' },
        body: { ar: 'يُثبّت على الجدار القائم بدون هدم.', en: 'Fixed straight onto the existing wall.', tr: 'Mevcut duvarın üzerine doğrudan uygulanır.' },
      },
    ],
  },
  {
    id: 'pvc_marble',
    bg: '#ece6dc',
    light: true,
    head: { ar: 'فخامة الرخام،', en: 'The prestige of marble,', tr: 'Mermerin asaleti,' },
    accent: { ar: 'بخفّة الألواح.', en: 'at a fraction of the weight.', tr: 'panelin hafifliğiyle.' },
    story: {
      ar: 'ألواح PVC بعروق الرخام الطبيعي وسطح UV لامع يقاوم الماء والخدوش. مظهر الرخام لجدار الصالون أو الحمّام بجزء من وزنه وتكلفته، وتُركّب فوق البلاط القديم.',
      en: 'PVC panels with natural marble veining and a glossy UV surface that resists water and scratches — the marble look for a living room or bathroom at a fraction of its weight and cost, fitted over old tiles.',
      tr: 'Doğal mermer damarlı, suya ve çizilmeye dayanıklı parlak UV yüzeyli PVC paneller — salon veya banyoda mermer görünümü, ağırlığının ve maliyetinin küçük bir kısmıyla; eski fayansın üzerine.',
    },
    points: [
      {
        title: { ar: 'لمعة تدوم', en: 'A lasting gloss', tr: 'Kalıcı parlaklık' },
        body: { ar: 'طبقة UV تحافظ على البريق وتسهّل التنظيف.', en: 'A UV coat keeps the shine and wipes clean.', tr: 'UV kaplama parlaklığı korur, kolay temizlenir.' },
      },
      {
        title: { ar: 'خفيفة الوزن', en: 'Lightweight', tr: 'Hafif' },
        body: { ar: 'بدون أحمال وقصّ الرخام الطبيعي الثقيل.', en: 'None of the load or heavy cutting of real stone.', tr: 'Doğal taşın yükü ve ağır kesimi yok.' },
      },
      {
        title: { ar: 'فوق البلاط القديم', en: 'Over old tiles', tr: 'Eski fayansın üzerine' },
        body: { ar: 'تجديد كامل للجدار بدون تكسير.', en: 'A complete wall makeover with no demolition.', tr: 'Kırmadan komple duvar yenileme.' },
      },
    ],
  },
  {
    id: 'spc_wall',
    bg: '#2b2925',
    light: false,
    head: { ar: 'صلابة الحجر،', en: 'The strength of stone,', tr: 'Taşın sağlamlığı,' },
    accent: { ar: 'لأصعب الجدران.', en: 'for the toughest walls.', tr: 'en zorlu duvarlar için.' },
    story: {
      ar: 'ألواح SPC من مزيج الحجر والبوليمر، صلبة ومستقرة ولا تنتفخ بالماء أبداً — الخيار الأمثل للجدران الرطبة والمساحات التي تحتاج سطحاً متيناً بمظهر أنيق.',
      en: 'SPC panels made of stone and polymer — rigid, stable and never swelling with water. The right choice for damp walls and any space that needs a tough surface that still looks refined.',
      tr: 'Taş ve polimerden SPC paneller — sert, stabil ve suyla asla şişmez. Nemli duvarlar ve dayanıklı ama şık bir yüzey isteyen her alan için doğru seçim.',
    },
    points: [
      {
        title: { ar: 'لا تنتفخ', en: 'Never swells', tr: 'Asla şişmez' },
        body: { ar: 'قلب حجري صلب لا يتأثر بالماء أو الرطوبة.', en: 'A rigid stone core unaffected by water or damp.', tr: 'Su ve nemden etkilenmeyen sert taş çekirdek.' },
      },
      {
        title: { ar: 'سطح متين', en: 'A durable surface', tr: 'Dayanıklı yüzey' },
        body: { ar: 'يتحمّل الاستخدام اليومي في البيوت والمحلات.', en: 'Takes daily wear in homes and shops.', tr: 'Ev ve dükkânlarda günlük kullanıma dayanır.' },
      },
      {
        title: { ar: 'أشكال متعددة', en: 'Many looks', tr: 'Birçok görünüm' },
        body: { ar: 'حجر وترافرتين وخشب وألوان سادة.', en: 'Stone, travertine, wood and plain tones.', tr: 'Taş, traverten, ahşap ve düz tonlar.' },
      },
    ],
  },
  {
    id: 'spc_flooring',
    bg: '#e6dccb',
    light: true,
    head: { ar: 'أناقة الحجر،', en: 'The elegance of stone,', tr: 'Taşın zarafeti,' },
    accent: { ar: 'تحت قدميك.', en: 'underfoot.', tr: 'ayaklarınızın altında.' },
    story: {
      ar: 'أرضيات SPC بنظام الكليك بمظهر الغرانيت والرخام والحجر، بقلب حجري مقاوم للماء والخدش. تُركّب فوق البلاط القديم مباشرة بدون تكسير، وتبقى هادئة ودافئة تحت القدم.',
      en: 'Click-fit SPC flooring with the look of granite, marble and stone, over a stone core that shrugs off water and scratches. Laid straight over old tiles with no demolition, and quiet and warm underfoot.',
      tr: 'Granit, mermer ve taş görünümlü, suya ve çizilmeye dayanıklı taş çekirdekli tıklamalı SPC zemin. Eski fayansın üzerine kırmadan döşenir; ayak altında sessiz ve sıcaktır.',
    },
    points: [
      {
        title: { ar: 'مظهر الغرانيت والرخام', en: 'Granite & marble looks', tr: 'Granit ve mermer görünümü' },
        body: { ar: 'غرانيت فاتح وداكن، ورخام، وحجر بلمسة عصرية.', en: 'Light and dark granite, marble and modern stone.', tr: 'Açık ve koyu granit, mermer ve modern taş.' },
      },
      {
        title: { ar: 'مقاومة للماء 100%', en: '100% waterproof', tr: '%100 su geçirmez' },
        body: { ar: 'بلا انتفاخ حتى في المطبخ.', en: 'No swelling, even in the kitchen.', tr: 'Mutfakta bile şişme yok.' },
      },
      {
        title: { ar: 'نظام كليك', en: 'Click system', tr: 'Tıklama sistemi' },
        body: { ar: 'تركيب سريع ونظيف فوق البلاط القديم.', en: 'Fast, clean fitting over old tiles.', tr: 'Eski fayansın üzerine hızlı, temiz montaj.' },
      },
    ],
  },
  {
    id: 'ps_slats',
    bg: '#1c2622',
    light: false,
    head: { ar: 'التفاصيل', en: 'The details', tr: 'Lüksü' },
    accent: { ar: 'تصنع الفخامة.', en: 'make the luxury.', tr: 'detaylar yaratır.' },
    story: {
      ar: 'قُضبان وبانوهات PS خفيفة ودقيقة لرسم الإطارات والتقسيمات على الجدار — لمسة كلاسيكية أو عصرية تحوّل الجدار السادة إلى لوحة.',
      en: 'Light, precise PS mouldings for drawing frames and panels on a wall — a classic or modern touch that turns a plain wall into a composition.',
      tr: 'Duvara çerçeve ve bölmeler çizmek için hafif, hassas PS çıtalar — düz bir duvarı bir tabloya dönüştüren klasik veya modern dokunuş.',
    },
    points: [
      {
        title: { ar: 'إطارات وبراويز', en: 'Frames & panelling', tr: 'Çerçeve ve paneller' },
        body: { ar: 'لتقسيم الجدار وإبراز اللوحات والمرايا.', en: 'Divide a wall, frame art and mirrors.', tr: 'Duvarı bölün, tablo ve aynaları çerçeveleyin.' },
      },
      {
        title: { ar: 'خفيفة ودقيقة', en: 'Light and precise', tr: 'Hafif ve hassas' },
        body: { ar: 'قصّ وتركيب سهل بحواف نظيفة.', en: 'Easy to cut and fit, with clean edges.', tr: 'Kolay kesilir ve uygulanır, temiz kenarlar.' },
      },
      {
        title: { ar: 'تكمّل باقي الفئات', en: 'Completes the look', tr: 'Görünümü tamamlar' },
        body: { ar: 'تنسجم مع ألواح الخشب والرخام.', en: 'Pairs with wood and marble panels.', tr: 'Ahşap ve mermer panellerle uyumlu.' },
      },
    ],
  },
  {
    id: 'ps_baseboards',
    bg: '#17120e',
    light: false,
    head: { ar: 'اللمسة الأخيرة،', en: 'The final touch,', tr: 'Son dokunuş,' },
    accent: { ar: 'بضوء ناعم.', en: 'in soft light.', tr: 'yumuşak bir ışıkla.' },
    story: {
      ar: 'نعلات PS مقاومة للماء والضربات تحمي أسفل الجدار من ماء المسح والصدمات، وبعض الموديلات فيها قناة لإضاءة LED تمنح الغرفة توهّجاً دافئاً عند الأرض.',
      en: 'Water- and impact-resistant PS baseboards protect the bottom of the wall from mopping water and knocks — and some models carry an LED channel for a warm glow at floor level.',
      tr: 'Suya ve darbeye dayanıklı PS süpürgelikler duvarın altını paspas suyundan ve darbelerden korur; bazı modellerde zeminde sıcak bir ışıltı için LED kanalı vardır.',
    },
    points: [
      {
        title: { ar: 'إضاءة LED', en: 'LED lighting', tr: 'LED aydınlatma' },
        body: { ar: 'قناة مدمجة لشريط إضاءة مخفي.', en: 'A built-in channel for a hidden light strip.', tr: 'Gizli ışık şeridi için entegre kanal.' },
      },
      {
        title: { ar: 'تحمي الجدار', en: 'Protects the wall', tr: 'Duvarı korur' },
        body: { ar: 'من ماء المسح والضربات اليومية.', en: 'From mopping water and everyday knocks.', tr: 'Paspas suyuna ve günlük darbelere karşı.' },
      },
      {
        title: { ar: 'مقاومة للماء', en: 'Waterproof', tr: 'Su geçirmez' },
        body: { ar: 'لا تتشقق ولا تنتفخ كالخشب.', en: "Won't crack or swell like wood.", tr: 'Ahşap gibi çatlamaz, şişmez.' },
      },
    ],
  },
];
