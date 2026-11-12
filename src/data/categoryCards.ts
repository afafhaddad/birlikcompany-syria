import { Language, ProductCategory } from '../types';
import { PRODUCT_MODELS, isModelInCategory } from './products';

type L = Record<Language, string>;

export interface CategoryCard {
  id: ProductCategory;
  /** Short display name in the visitor's language */
  name: L;
  /** Technical / secondary name shown as a small tag */
  tag: L;
  description: L;
}

export const CATEGORY_CARDS: CategoryCard[] = [
  {
    id: 'ps_wood',
    name: { ar: 'بديل الخشب', en: 'PS Wall Panels', tr: 'PS Duvar Panelleri' },
    tag: { ar: 'PS Wall Panels', en: 'Wood alternative', tr: 'Ahşap alternatifi' },
    description: {
      ar: 'ألواح جدارية ديكورية متنوعة، تتميز بمقاومتها للرطوبة وسهولة تركيبها لتجديد الجدران الداخلية بأسلوب عصري وأنيق',
      en: 'Versatile decorative wall panels with exceptional moisture resistance and effortless installation, modernizing interior walls with refined elegance.',
      tr: 'İç duvarları zarif ve modern bir şekilde yenileyen, neme dayanıklı ve kolay montajlı çok yönlü dekoratif duvar panelleri.',
    },
  },
  {
    id: 'pvc_marble',
    name: { ar: 'بديل الرخام', en: 'PVC Marble Panels', tr: 'PVC Mermer Paneller' },
    tag: { ar: 'PVC Wall Panels', en: 'Marble alternative', tr: 'Mermer alternatifi' },
    description: {
      ar: 'ألواح أنيقة بتصميمات الرخام الفاخر، تضفي لمسة من الرقي والفخامة على الجدران دون عناء وصيانة الرخام الطبيعي',
      en: 'Elegant panels capturing luxurious natural marble veining, adding prestige to your walls without the weight or maintenance of real stone.',
      tr: 'Doğal mermerin zahmeti ve bakımı olmadan, duvarlara lüks ve asil bir dokunuş katan zarif mermer görünümlü paneller.',
    },
  },
  {
    id: 'spc_wall',
    name: { ar: 'بديل الشيبورد الحجري', en: 'SPC Wall Panels', tr: 'SPC Duvar Panelleri' },
    tag: { ar: 'SPC Wall Panels', en: 'Stone composite boards', tr: 'Taş kompozit paneller' },
    description: {
      ar: 'ألواح مطورة مصنوعة من بي في سي والحجر المضغوط بتشكيلة واسعة، لتقدم مظهراً فاخراً وملمساً عالي الجودة مع متانة ومقاومة فائقة للماء',
      en: 'Advanced composite panels made of PVC and compressed stone in a wide range of designs, with a luxurious look and supreme waterproof durability.',
      tr: 'Geniş model seçenekleri, lüks görünümü ve üstün su direnci ile PVC ve sıkıştırılmış taştan üretilmiş gelişmiş kompozit paneller.',
    },
  },
  {
    id: 'spc_flooring',
    name: { ar: 'بديل الباركيه', en: 'SPC Flooring', tr: 'SPC Zemin Kaplaması' },
    tag: { ar: 'SPC Flooring', en: 'Parquet alternative', tr: 'Parke alternatifi' },
    description: {
      ar: 'أرضيات مبتكرة بتصميمات متنوعة، مجهزة بنظام النقر لسهولة التركيب، مع طبقة حماية ضد الخدش ومتانة تفوق الباركيه التقليدي بفضل مقاومتها الكاملة للماء',
      en: 'Innovative flooring with an effortless click-lock system, a scratch-resistant layer and durability surpassing traditional parquet thanks to 100% waterproof performance.',
      tr: 'Kolay montaj sağlayan kilit sistemi, çizilme koruması ve %100 su geçirmezliğiyle geleneksel parkeyi aşan yenilikçi zemin kaplamaları.',
    },
  },
  {
    id: 'ps_slats',
    name: { ar: 'قُضبان بي إس', en: 'PS Wall Slats', tr: 'PS Duvar Çıtaları' },
    tag: { ar: 'PS Wall Slats', en: 'Mouldings & frames', tr: 'Çıta ve profiller' },
    description: {
      ar: 'قُضبان ديكورية مرنة ومتينة تتيح تصميم إطارات على الطراز الفرنسي وتشكيل الجدران بحرية تامة لتناسب كافة الأذواق',
      en: 'Flexible, durable decorative mouldings for French-style wainscoting and bespoke wall framing to suit every taste.',
      tr: 'Fransız tarzı çıtalama ve duvar tasarımı imkanı sunan, her dekorasyon zevkine uyum sağlayan esnek ve dayanıklı dekoratif çıtalar.',
    },
  },
  {
    id: 'ps_baseboards',
    name: { ar: 'نعلات بي إس', en: 'PS Baseboards', tr: 'PS Süpürgelikler' },
    tag: { ar: 'PS Baseboards', en: 'Skirting', tr: 'Süpürgelik' },
    description: {
      ar: 'نعلات أرضية عملية ومتينة تمنح التشطيبات مظهراً متكاملاً مع حماية فعالة للحواف، وتتوفر بعض الموديلات مع قنوات مدمجة لإضاءة الليد',
      en: 'Practical, heavy-duty baseboards for a seamless finish and edge protection, with select models featuring integrated LED channels.',
      tr: 'İç mekanlara bütünsel bir bitiş ve kenar koruması sağlayan, belirli modellerde entegre LED kanalına sahip dayanıklı süpürgelikler.',
    },
  },
];

export const categoryCard = (id: ProductCategory) => CATEGORY_CARDS.find((c) => c.id === id) || CATEGORY_CARDS[0];

export const modelCount = (id: ProductCategory) => PRODUCT_MODELS.filter((m) => isModelInCategory(m, id)).length;
