import { ProductModel } from '../types';

export const ALL_PRODUCT_MODELS: ProductModel[] = [
  // ==========================================
  // 1. PVC Wall Panels (بديل الرخام)
  // Standardized Dimension: 122 cm × 240 cm | Thickness: 2.5 mm
  // ==========================================
  {
    id: 'pvc-athena-grey',
    code: 'A9021-3',
    category: 'pvc_marble',
    name: {
      ar: 'Athena Grey',
      en: 'Athena Grey',
      tr: 'Athena Gri'
    },
    subtitle: {
      ar: 'رخام رمادي أثيني فاخر مع تموجات بيضاء ناعمة ولمعان كريستالي',
      en: 'Refined Athena grey marble with delicate mist veining and crystal luster',
      tr: 'Zarif beyaz damarlı lüks gri mermer desenli panel'
    },
    description: {
      ar: 'لوح بديل الرخام (PVC Wall Panel) عالي اللمعان والجودة بمقاس موحد 122 سم × 240 سم وسماكة 2.5 مم، مقاوم 100% للرطوبة والماء.',
      en: 'High-gloss PVC marble panel in standardized 122 cm × 240 cm format with 2.5 mm thickness. 100% moisture and water impervious.',
      tr: '122 cm × 240 cm standart ölçüde, 2.5 mm kalınlığında %100 su geçirmez PVC mermer panel.'
    },
    images: [],
    dimensions: '122 cm × 240 cm',
    thickness: '2.5 mm',
    waterproof: true,
    colorHex: '#C5C7C9',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (سم)', en: 'Unified Size (cm)', tr: 'Standart Ölçü (cm)' },
        value: { ar: '122 سم × 240 سم', en: '122 cm × 240 cm', tr: '122 cm × 240 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '2.5 مم', en: '2.5 mm', tr: '2.5 mm' }
      }
    ]
  },
  {
    id: 'pvc-fuji-grey',
    code: '8015',
    category: 'pvc_marble',
    name: {
      ar: 'Fuji Grey',
      en: 'Fuji Grey',
      tr: 'Fuji Gri'
    },
    subtitle: {
      ar: 'رمادي حجري هادئ مستوحى من قمم الجبال اليابانية بطبقة UV لامعة',
      en: 'Subtle misty Fuji grey stone texture with protective UV gloss',
      tr: 'Fuji dağı tonlarında dingin gri taş dokusu'
    },
    description: {
      ar: 'لوح بديل رخام PVC بتصميم Fuji Grey العصري مقاس 122 سم × 240 سم وسماكة 2.5 مم.',
      en: 'Modern Fuji Grey PVC wall panel. Standardized 122 cm × 240 cm, 2.5 mm thickness.',
      tr: '122 cm × 240 cm standart ölçüde, 2.5 mm kalınlıkta Fuji Gri PVC panel.'
    },
    images: [],
    dimensions: '122 cm × 240 cm',
    thickness: '2.5 mm',
    waterproof: true,
    colorHex: '#9E9FA3',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (سم)', en: 'Unified Size (cm)', tr: 'Standart Ölçü (cm)' },
        value: { ar: '122 سم × 240 سم', en: '122 cm × 240 cm', tr: '122 cm × 240 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '2.5 مم', en: '2.5 mm', tr: '2.5 mm' }
      }
    ]
  },
  {
    id: 'pvc-marbella',
    code: '9010(1)',
    category: 'pvc_marble',
    name: {
      ar: 'Marbella',
      en: 'Marbella',
      tr: 'Marbella'
    },
    subtitle: {
      ar: 'عروق رخامية كلاسيكية بنقاء أندلسي فائق ولمسات دافئة',
      en: 'Classic Andalusian marble aesthetic with bright ambient sheen',
      tr: 'Klasik Endülüs mermer dokusu ve sıcak çizgiler'
    },
    description: {
      ar: 'لوح بديل الرخام Marbella بمقاس 122 سم × 240 سم وسماكة 2.5 مم.',
      en: 'Marbella PVC Wall Panel. Standardized 122 cm × 240 cm, 2.5 mm thickness.',
      tr: '122 cm × 240 cm, 2.5 mm Marbella PVC panel.'
    },
    images: [],
    dimensions: '122 cm × 240 cm',
    thickness: '2.5 mm',
    waterproof: true,
    colorHex: '#ECE7DE',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (سم)', en: 'Unified Size (cm)', tr: 'Standart Ölçü (cm)' },
        value: { ar: '122 سم × 240 سم', en: '122 cm × 240 cm', tr: '122 cm × 240 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '2.5 مم', en: '2.5 mm', tr: '2.5 mm' }
      }
    ]
  },
  {
    id: 'pvc-inky-gold',
    code: '9010',
    category: 'pvc_marble',
    name: {
      ar: 'Inky Gold',
      en: 'Inky Gold',
      tr: 'Mürekkep Altın'
    },
    subtitle: {
      ar: 'عروق حبرية متداخلة مع خيوط الذهب الفاخر على أرضية رخامية ناصعة',
      en: 'Dynamic inky streaks infused with metallic golden veins',
      tr: 'Mürekkep akıntılı ve altın damarlı lüks mermer görünümü'
    },
    description: {
      ar: 'لوح بديل الرخام Inky Gold بمقاس 122 سم × 240 سم وسماكة 2.5 مم.',
      en: 'Inky Gold PVC Wall Panel. Standardized 122 cm × 240 cm, 2.5 mm thickness.',
      tr: '122 cm × 240 cm, 2.5 mm Inky Gold PVC panel.'
    },
    images: [],
    dimensions: '122 cm × 240 cm',
    thickness: '2.5 mm',
    waterproof: true,
    colorHex: '#EAE5D9',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (سم)', en: 'Unified Size (cm)', tr: 'Standart Ölçü (cm)' },
        value: { ar: '122 سم × 240 سم', en: '122 cm × 240 cm', tr: '122 cm × 240 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '2.5 مم', en: '2.5 mm', tr: '2.5 mm' }
      }
    ]
  },
  {
    id: 'pvc-golden-sheet',
    code: '9023',
    category: 'pvc_marble',
    name: {
      ar: 'Golden Sheet',
      en: 'Golden Sheet',
      tr: 'Altın Levha'
    },
    subtitle: {
      ar: 'سطح رخامي مذهب متوهج بلمسات فندقية راقية ومقاومة تامة للبخار والماء',
      en: 'Radiant gold-tinted stone sheet with hotel-grade luxury presence',
      tr: 'Işıltılı altın tonlarında prestijli PVC levha'
    },
    description: {
      ar: 'لوح بديل الرخام Golden Sheet بمقاس 122 سم × 240 سم وسماكة 2.5 مم.',
      en: 'Golden Sheet PVC Wall Panel. Standardized 122 cm × 240 cm, 2.5 mm thickness.',
      tr: '122 cm × 240 cm, 2.5 mm Golden Sheet PVC panel.'
    },
    images: [],
    dimensions: '122 cm × 240 cm',
    thickness: '2.5 mm',
    waterproof: true,
    colorHex: '#D6BE93',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (سم)', en: 'Unified Size (cm)', tr: 'Standart Ölçü (cm)' },
        value: { ar: '122 سم × 240 سم', en: '122 cm × 240 cm', tr: '122 cm × 240 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '2.5 مم', en: '2.5 mm', tr: '2.5 mm' }
      }
    ]
  },
  {
    id: 'pvc-golden-noir',
    code: 'MT89058-G',
    category: 'pvc_marble',
    name: {
      ar: 'Golden Noir',
      en: 'Golden Noir',
      tr: 'Altın Siyah Noir'
    },
    subtitle: {
      ar: 'أسود ملكي فاخر مطعم بعروق الذهب الكريستالية لتباين معماري ساحر',
      en: 'Deep royal black backdrop crowned with glistening golden veins',
      tr: 'Derin siyah üzerinde altın damarlı kontrast mimari panel'
    },
    description: {
      ar: 'لوح بديل الرخام Golden Noir الأسود المذهب بمقاس 122 سم × 240 سم وسماكة 2.5 مم.',
      en: 'Golden Noir PVC Wall Panel. Standardized 122 cm × 240 cm, 2.5 mm thickness.',
      tr: '122 cm × 240 cm, 2.5 mm Golden Noir PVC panel.'
    },
    images: [],
    dimensions: '122 cm × 240 cm',
    thickness: '2.5 mm',
    waterproof: true,
    colorHex: '#1E1E22',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (سم)', en: 'Unified Size (cm)', tr: 'Standart Ölçü (cm)' },
        value: { ar: '122 سم × 240 سم', en: '122 cm × 240 cm', tr: '122 cm × 240 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '2.5 مم', en: '2.5 mm', tr: '2.5 mm' }
      }
    ]
  },
  {
    id: 'pvc-golden-grey',
    code: 'MT9019-G',
    category: 'pvc_marble',
    name: {
      ar: 'Golden Grey',
      en: 'Golden Grey',
      tr: 'Altın Gri'
    },
    subtitle: {
      ar: 'رمادي عصري أنيق تتخلله خيوط ذهبية دقيقة لدفء بصري متوازن',
      en: 'Contemporary grey stone woven with delicate warm golden threads',
      tr: 'Modern gri tonlarında ince altın çizgili panel'
    },
    description: {
      ar: 'لوح بديل الرخام Golden Grey بمقاس 122 سم × 240 سم وسماكة 2.5 مم.',
      en: 'Golden Grey PVC Wall Panel. Standardized 122 cm × 240 cm, 2.5 mm thickness.',
      tr: '122 cm × 240 cm, 2.5 mm Golden Grey PVC panel.'
    },
    images: [],
    dimensions: '122 cm × 240 cm',
    thickness: '2.5 mm',
    waterproof: true,
    colorHex: '#8C8E91',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (سم)', en: 'Unified Size (cm)', tr: 'Standart Ölçü (cm)' },
        value: { ar: '122 سم × 240 سم', en: '122 cm × 240 cm', tr: '122 cm × 240 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '2.5 مم', en: '2.5 mm', tr: '2.5 mm' }
      }
    ]
  },
  {
    id: 'pvc-brazillian-granit',
    code: '9011',
    category: 'pvc_marble',
    name: {
      ar: 'Brazillian Granit',
      en: 'Brazillian Granit',
      tr: 'Brezilya Graniti'
    },
    subtitle: {
      ar: 'صلابة وهيبة الغرانيت البرازيلي بتفاصيل حبيبية فاخرة وعالية اللمعان',
      en: 'Prestige Brazilian granite aesthetic with deep crystalline mineral flecks',
      tr: 'Doğal Brezilya graniti dokulu parlak mermer görünümlü panel'
    },
    description: {
      ar: 'لوح بديل الرخام Brazillian Granit بمقاس 122 سم × 240 سم وسماكة 2.5 مم.',
      en: 'Brazillian Granit PVC Wall Panel. Standardized 122 cm × 240 cm, 2.5 mm thickness.',
      tr: '122 cm × 240 cm, 2.5 mm Brezilya Graniti PVC panel.'
    },
    images: [],
    dimensions: '122 cm × 240 cm',
    thickness: '2.5 mm',
    waterproof: true,
    colorHex: '#4A4C50',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (سم)', en: 'Unified Size (cm)', tr: 'Standart Ölçü (cm)' },
        value: { ar: '122 سم × 240 سم', en: '122 cm × 240 cm', tr: '122 cm × 240 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '2.5 مم', en: '2.5 mm', tr: '2.5 mm' }
      }
    ]
  },

  // ==========================================
  // 2. PS Wall Panels (بديل الخشب)
  // Standardized Length: 290 cm | Widths: 12.1 cm, 13 cm, 14 cm, 15 cm, 16 cm | Thickness: mm
  // ==========================================
  {
    id: 'ps-vangoh',
    code: 'D02-Q22016-6',
    category: 'ps_wood',
    name: {
      ar: 'Vangoh',
      en: 'Vangoh',
      tr: 'Vangoh'
    },
    subtitle: {
      ar: 'تموجات فنية عميقة مستوحاة من لوحات فان غوخ مع تضليع ثلاثي الأبعاد',
      en: 'Artistic linear fluting with rich organic wood grain texture',
      tr: 'Sanatsal derin ahşap dokulu 3D akustik panel'
    },
    description: {
      ar: 'شريحة بديل الخشب (PS Wall Panel) موديل Vangoh بمقاس موحد 12.1 سم × 290 سم وسماكة 11.8 مم، مقاومة 100% للرطوبة والعفن.',
      en: 'PS Wall Panel Vangoh model. Unified 12.1 cm × 290 cm, 11.8 mm thickness.',
      tr: '12.1 cm × 290 cm standart boyutta, 11.8 mm kalınlıkta Vangoh PS duvar paneli.'
    },
    images: [],
    dimensions: '12.1 cm × 290 cm',
    thickness: '11.8 mm',
    waterproof: true,
    colorHex: '#8C6747',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '12.1 سم × 290 سم', en: '12.1 cm × 290 cm', tr: '12.1 cm × 290 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '11.8 مم', en: '11.8 mm', tr: '11.8 mm' }
      }
    ]
  },
  {
    id: 'ps-beige-timber',
    code: 'D02-MM20141',
    category: 'ps_wood',
    name: {
      ar: 'Beige Timber',
      en: 'Beige Timber',
      tr: 'Bej Ahşap'
    },
    subtitle: {
      ar: 'خشب بيج طبيعي دافئ يمنح الفراغات شعوراً بالراحة والاتساع',
      en: 'Warm natural beige oak tone with soft Scandinavian elegance',
      tr: 'Ferah ve sıcak doğal bej ahşap tonlu çıtalı panel'
    },
    description: {
      ar: 'شريحة بديل الخشب Beige Timber بمقاس موحد 12.1 سم × 290 سم وسماكة 11.8 مم.',
      en: 'Beige Timber PS Wall Panel. Unified 12.1 cm × 290 cm, 11.8 mm thickness.',
      tr: '12.1 cm × 290 cm, 11.8 mm Bej Ahşap PS panel.'
    },
    images: [],
    dimensions: '12.1 cm × 290 cm',
    thickness: '11.8 mm',
    waterproof: true,
    colorHex: '#CBB496',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '12.1 سم × 290 سم', en: '12.1 cm × 290 cm', tr: '12.1 cm × 290 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '11.8 مم', en: '11.8 mm', tr: '11.8 mm' }
      }
    ]
  },
  {
    id: 'ps-office-grey',
    code: 'D02-22032',
    category: 'ps_wood',
    name: {
      ar: 'Office Grey',
      en: 'Office Grey',
      tr: 'Ofis Grisi'
    },
    subtitle: {
      ar: 'رمادي احترافي أنيق للمكاتب الحديثة والمساحات المعاصرة',
      en: 'Sleek executive grey finish ideal for modern workspaces and homes',
      tr: 'Modern ofisler ve çağdaş evler için şık gri ahşap dokusu'
    },
    description: {
      ar: 'شريحة بديل الخشب Office Grey بمقاس 12.1 سم × 290 سم وسماكة 11.8 مم.',
      en: 'Office Grey PS Wall Panel. Unified 12.1 cm × 290 cm, 11.8 mm thickness.',
      tr: '12.1 cm × 290 cm, 11.8 mm Ofis Grisi PS panel.'
    },
    images: [],
    dimensions: '12.1 cm × 290 cm',
    thickness: '11.8 mm',
    waterproof: true,
    colorHex: '#7D7E82',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '12.1 سم × 290 سم', en: '12.1 cm × 290 cm', tr: '12.1 cm × 290 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '11.8 مم', en: '11.8 mm', tr: '11.8 mm' }
      }
    ]
  },
  {
    id: 'ps-marble-gold-noir',
    code: 'D10-1',
    category: 'ps_wood',
    name: {
      ar: 'Marble Gold Noir',
      en: 'Marble Gold Noir',
      tr: 'Mermer Altın Siyah'
    },
    subtitle: {
      ar: 'عرض 15 سم بسطح أسود رخامي داكن ولمسات ذهبية باهرة',
      en: '15 cm wide fluted profile with dark marble texture and golden nuances',
      tr: '15 cm genişliğinde altın damarlı siyah mermer dokulu çıtalı panel'
    },
    description: {
      ar: 'شريحة بديل الخشب العريضة 15 سم × 290 سم بسماكة 10 مم مع تعشيق متقن.',
      en: 'Wide 15 cm × 290 cm fluted panel with 10 mm thickness.',
      tr: '15 cm × 290 cm, 10 mm kalınlığında geniş PS panel.'
    },
    images: [],
    dimensions: '15 cm × 290 cm',
    thickness: '10 mm',
    waterproof: true,
    colorHex: '#252528',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '15 سم × 290 سم', en: '15 cm × 290 cm', tr: '15 cm × 290 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '10 مم', en: '10 mm', tr: '10 mm' }
      }
    ]
  },
  {
    id: 'ps-crocodile',
    code: 'D10-2 Crocodile',
    category: 'ps_wood',
    name: {
      ar: 'Crocodile',
      en: 'Crocodile',
      tr: 'Timsah Dokulu'
    },
    subtitle: {
      ar: 'ملمس جلدي بارز مستوحى من جلد التمساح بعرض 15 سم وسماكة 9 مم',
      en: 'Tactile crocodile leather texture offering distinct exotic depth',
      tr: 'Özel timsah deri dokulu 15 cm genişliğinde dekoratif panel'
    },
    description: {
      ar: 'شريحة بديل الخشب Crocodile بمقاس 15 سم × 290 سم وسماكة 9 مم.',
      en: 'Crocodile textured PS Wall Panel. 15 cm × 290 cm, 9 mm thickness.',
      tr: '15 cm × 290 cm, 9 mm timsah dokulu PS panel.'
    },
    images: [],
    dimensions: '15 cm × 290 cm',
    thickness: '9 mm',
    waterproof: true,
    colorHex: '#3A332C',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '15 سم × 290 سم', en: '15 cm × 290 cm', tr: '15 cm × 290 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '9 مم', en: '9 mm', tr: '9 mm' }
      }
    ]
  },
  {
    id: 'ps-velvet-gold',
    code: 'D10-2 (2) Velvet Gold',
    category: 'ps_wood',
    name: {
      ar: 'Velvet Gold',
      en: 'Velvet Gold',
      tr: 'Kadife Altın'
    },
    subtitle: {
      ar: 'ملمس مخملي ناعم مع لمعة ذهبية دافئة بعرض 15 سم وسماكة 9 مم',
      en: 'Silk velvet tactile feel highlighted by ambient gold sheen',
      tr: 'Kadife mat dokusu ve altın ışıltısıyla 15 cm geniş panel'
    },
    description: {
      ar: 'شريحة بديل الخشب Velvet Gold بمقاس 15 سم × 290 سم وسماكة 9 مم.',
      en: 'Velvet Gold PS Wall Panel. 15 cm × 290 cm, 9 mm thickness.',
      tr: '15 cm × 290 cm, 9 mm Velvet Gold PS panel.'
    },
    images: [],
    dimensions: '15 cm × 290 cm',
    thickness: '9 mm',
    waterproof: true,
    colorHex: '#BFA06B',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '15 سم × 290 سم', en: '15 cm × 290 cm', tr: '15 cm × 290 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '9 مم', en: '9 mm', tr: '9 mm' }
      }
    ]
  },
  {
    id: 'ps-timber-gold',
    code: 'D25 Timber Gold',
    category: 'ps_wood',
    name: {
      ar: 'Timber Gold',
      en: 'Timber Gold',
      tr: 'Altın Ahşap Timber'
    },
    subtitle: {
      ar: 'عرض معماري 16 سم بتضليع بارز وسماكة 12 مم مع لمسات خشبية ذهبية',
      en: 'Generous 16 cm width fluted slat with rich timber-gold character',
      tr: '16 cm genişlik ve 12 mm et kalınlığında altın ahşap çıtalı panel'
    },
    description: {
      ar: 'شريحة بديل الخشب Timber Gold بمقاس 16 سم × 290 سم وسماكة 12 مم.',
      en: 'Timber Gold PS Wall Panel. 16 cm × 290 cm, 12 mm thickness.',
      tr: '16 cm × 290 cm, 12 mm Timber Gold PS panel.'
    },
    images: [],
    dimensions: '16 cm × 290 cm',
    thickness: '12 mm',
    waterproof: true,
    colorHex: '#A37943',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '16 سم × 290 سم', en: '16 cm × 290 cm', tr: '16 cm × 290 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '12 مم', en: '12 mm', tr: '12 mm' }
      }
    ]
  },
  {
    id: 'ps-velvet',
    code: 'D25 (2) Velvet',
    category: 'ps_wood',
    name: {
      ar: 'Velvet',
      en: 'Velvet',
      tr: 'Kadife Velvet'
    },
    subtitle: {
      ar: 'ملمس ناعم غير لامع بعرض 16 سم وسماكة 12 مم',
      en: 'Velvety matte feel on expansive 16 cm acoustic fluted slats',
      tr: '16 cm genişliğinde mat kadifemsi dokuda PS panel'
    },
    description: {
      ar: 'شريحة بديل الخشب Velvet بمقاس 16 سم × 290 سم وسماكة 12 مم.',
      en: 'Velvet PS Wall Panel. 16 cm × 290 cm, 12 mm thickness.',
      tr: '16 cm × 290 cm, 12 mm Velvet PS panel.'
    },
    images: [],
    dimensions: '16 cm × 290 cm',
    thickness: '12 mm',
    waterproof: true,
    colorHex: '#9B8B79',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '16 سم × 290 سم', en: '16 cm × 290 cm', tr: '16 cm × 290 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '12 مم', en: '12 mm', tr: '12 mm' }
      }
    ]
  },
  {
    id: 'ps-harp',
    code: 'D33',
    category: 'ps_wood',
    name: {
      ar: 'Harp',
      en: 'Harp',
      tr: 'Harp Arp Deseni'
    },
    subtitle: {
      ar: 'تضليع أنيق متكرر يحاكي أوتار القيثارة بعرض 16 سم وسماكة 14 مم',
      en: 'Harmonic linear fluting mirroring harp strings with 14 mm profile depth',
      tr: 'Arp tellerini andıran 16 cm genişlik ve 14 mm kalınlıkta çıtalı panel'
    },
    description: {
      ar: 'شريحة بديل الخشب Harp بمقاس 16 سم × 290 سم وسماكة 14 مم.',
      en: 'Harp PS Wall Panel. 16 cm × 290 cm, 14 mm thickness.',
      tr: '16 cm × 290 cm, 14 mm Harp PS panel.'
    },
    images: [],
    dimensions: '16 cm × 290 cm',
    thickness: '14 mm',
    waterproof: true,
    colorHex: '#695543',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '16 سم × 290 سم', en: '16 cm × 290 cm', tr: '16 cm × 290 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '14 مم', en: '14 mm', tr: '14 mm' }
      }
    ]
  },
  {
    id: 'ps-grey-gold',
    code: 'D75 Grey',
    category: 'ps_wood',
    name: {
      ar: 'Grey Gold',
      en: 'Grey Gold',
      tr: 'Gri Altın'
    },
    subtitle: {
      ar: 'سماكة قوية 14.8 مم وعرض 16 سم بلمسة رمادية مذهبة فاخرة',
      en: 'Substantial 14.8 mm depth on 16 cm slat combining sleek grey with gold',
      tr: '14.8 mm kalınlık ve 16 cm genişlikte lüks gri-altın panel'
    },
    description: {
      ar: 'شريحة بديل الخشب Grey Gold بمقاس 16 سم × 290 سم وسماكة 14.8 مم.',
      en: 'Grey Gold PS Wall Panel. 16 cm × 290 cm, 14.8 mm thickness.',
      tr: '16 cm × 290 cm, 14.8 mm Grey Gold PS panel.'
    },
    images: [],
    dimensions: '16 cm × 290 cm',
    thickness: '14.8 mm',
    waterproof: true,
    colorHex: '#808285',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '16 سم × 290 سم', en: '16 cm × 290 cm', tr: '16 cm × 290 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '14.8 مم', en: '14.8 mm', tr: '14.8 mm' }
      }
    ]
  },
  {
    id: 'ps-wood-gold',
    code: 'D75 (2) Wood',
    category: 'ps_wood',
    name: {
      ar: 'Wood Gold',
      en: 'Wood Gold',
      tr: 'Ahşap Altın'
    },
    subtitle: {
      ar: 'تضليع عميق بسماكة 14.8 مم يجمع دفء الخشب الكلاسيكي مع خيوط الذهب',
      en: 'Deep 14.8 mm profile depth uniting classic natural wood warmth with gold',
      tr: '14.8 mm kalınlıkta klasik ahşap ve altın uyumu'
    },
    description: {
      ar: 'شريحة بديل الخشب Wood Gold بمقاس 16 سم × 290 سم وسماكة 14.8 مم.',
      en: 'Wood Gold PS Wall Panel. 16 cm × 290 cm, 14.8 mm thickness.',
      tr: '16 cm × 290 cm, 14.8 mm Wood Gold PS panel.'
    },
    images: [],
    dimensions: '16 cm × 290 cm',
    thickness: '14.8 mm',
    waterproof: true,
    colorHex: '#99734A',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '16 سم × 290 سم', en: '16 cm × 290 cm', tr: '16 cm × 290 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '14.8 مم', en: '14.8 mm', tr: '14.8 mm' }
      }
    ]
  },
  {
    id: 'ps-pine',
    code: 'D45',
    category: 'ps_wood',
    name: {
      ar: 'Pine',
      en: 'Pine',
      tr: 'Çam Ahşabı'
    },
    subtitle: {
      ar: 'نقشة خشب الصنوبر الطبيعي بعرض 13 سم وسماكة 10.8 مم',
      en: 'Authentic pine grain pattern with 13 cm width and 10.8 mm profile',
      tr: '13 cm genişlikte doğal çam desenli 10.8 mm PS panel'
    },
    description: {
      ar: 'شريحة بديل الخشب Pine بمقاس 13 سم × 290 سم وسماكة 10.8 مم.',
      en: 'Pine PS Wall Panel. 13 cm × 290 cm, 10.8 mm thickness.',
      tr: '13 cm × 290 cm, 10.8 mm Çam PS panel.'
    },
    images: [],
    dimensions: '13 cm × 290 cm',
    thickness: '10.8 mm',
    waterproof: true,
    colorHex: '#B28E63',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '13 سم × 290 سم', en: '13 cm × 290 cm', tr: '13 cm × 290 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '10.8 مم', en: '10.8 mm', tr: '10.8 mm' }
      }
    ]
  },
  {
    id: 'ps-rustic',
    code: 'PNL-20120-R',
    category: 'ps_wood',
    name: {
      ar: 'Rustic',
      en: 'Rustic',
      tr: 'Rustik Ahşap'
    },
    subtitle: {
      ar: 'مظهر الخشب الريفي المعتق بعرض 12 سم × طول 290 سم وسماكة 12 مم',
      en: 'Weathered rustic timber character in 12 cm × 290 cm format',
      tr: '12 cm × 290 cm rustik ahşap dokulu 12 mm panel'
    },
    description: {
      ar: 'شريحة بديل الخشب Rustic بمقاس 12 سم × 290 سم وسماكة 12 مم.',
      en: 'Rustic PS Wall Panel. 12 cm × 290 cm, 12 mm thickness.',
      tr: '12 cm × 290 cm, 12 mm Rustik PS panel.'
    },
    images: [],
    dimensions: '12 cm × 290 cm',
    thickness: '12 mm',
    waterproof: true,
    colorHex: '#80593B',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '12 سم × 290 سم', en: '12 cm × 290 cm', tr: '12 cm × 290 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '12 مم', en: '12 mm', tr: '12 mm' }
      }
    ]
  },
  {
    id: 'ps-balsam',
    code: 'PNL-20120-B',
    category: 'ps_wood',
    name: {
      ar: 'Balsam',
      en: 'Balsam',
      tr: 'Balsam Doğal Ahşap'
    },
    subtitle: {
      ar: 'درجة بلسمية هادئة من خشب البلوط بعرض 12 سم × طول 290 سم وسماكة 12 مم',
      en: 'Soothing natural balsam oak tone with 12 cm width and 12 mm thickness',
      tr: '12 cm × 290 cm, 12 mm Balsam açık meşe tonlu panel'
    },
    description: {
      ar: 'شريحة بديل الخشب Balsam بمقاس 12 سم × 290 سم وسماكة 12 مم.',
      en: 'Balsam PS Wall Panel. 12 cm × 290 cm, 12 mm thickness.',
      tr: '12 cm × 290 cm, 12 mm Balsam PS panel.'
    },
    images: [],
    dimensions: '12 cm × 290 cm',
    thickness: '12 mm',
    waterproof: true,
    colorHex: '#BA9C78',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '12 سم × 290 سم', en: '12 cm × 290 cm', tr: '12 cm × 290 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '12 مم', en: '12 mm', tr: '12 mm' }
      }
    ]
  },
  {
    id: 'ps-balsam-black',
    code: 'PNL-20120-BB',
    category: 'ps_wood',
    name: {
      ar: 'Balsam Black',
      en: 'Balsam Black',
      tr: 'Balsam Siyah'
    },
    subtitle: {
      ar: 'أسود فحمي مات مطفي بعرض 14 سم × طول 290 سم وسماكة 12 مم',
      en: 'Monochrome charcoal black finish with 14 cm width and 12 mm thickness',
      tr: '14 cm × 290 cm, 12 mm mat siyah Balsam PS panel'
    },
    description: {
      ar: 'شريحة بديل الخشب Balsam Black بمقاس 14 سم × 290 سم وسماكة 12 مم.',
      en: 'Balsam Black PS Wall Panel. 14 cm × 290 cm, 12 mm thickness.',
      tr: '14 cm × 290 cm, 12 mm Balsam Siyah PS panel.'
    },
    images: [],
    dimensions: '14 cm × 290 cm',
    thickness: '12 mm',
    waterproof: true,
    colorHex: '#1D1D20',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '14 سم × 290 سم', en: '14 cm × 290 cm', tr: '14 cm × 290 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '12 مم', en: '12 mm', tr: '12 مم' }
      }
    ]
  },
  {
    id: 'ps-crown-teak-black',
    code: 'PNL-20120-CTB',
    category: 'ps_wood',
    name: {
      ar: 'Crown Teak Black',
      en: 'Crown Teak Black',
      tr: 'Crown Tik Siyah'
    },
    subtitle: {
      ar: 'خشب التيك الملكي بلون داكن فخم بعرض 15 سم × طول 290 سم وسماكة 12 مم',
      en: 'Regal Crown Teak in dark dramatic black finish with 15 cm fluted profile',
      tr: '15 cm × 290 cm, 12 mm Crown Tik siyah lüks panel'
    },
    description: {
      ar: 'شريحة بديل الخشب Crown Teak Black بمقاس 15 سم × 290 سم وسماكة 12 مم.',
      en: 'Crown Teak Black PS Wall Panel. 15 cm × 290 cm, 12 mm thickness.',
      tr: '15 cm × 290 cm, 12 mm Crown Tik Siyah PS panel.'
    },
    images: [],
    dimensions: '15 cm × 290 cm',
    thickness: '12 mm',
    waterproof: true,
    colorHex: '#222326',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '15 سم × 290 سم', en: '15 cm × 290 cm', tr: '15 cm × 290 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '12 مم', en: '12 mm', tr: '12 mm' }
      }
    ]
  },

  // ==========================================
  // 3. SPC Wall Panels (Click) (بديل الشيبورد الحجري)
  // Standardized Dimension: 96 cm × 280 cm | Thickness: 4.0 mm / 5.0 mm
  // ==========================================
  {
    id: 'spc-woody-forest',
    code: 'HM-251029-01',
    category: 'spc_wall',
    name: {
      ar: 'Woody Forest',
      en: 'Woody Forest',
      tr: 'Orman Ahşabı'
    },
    subtitle: {
      ar: 'بديل الشيبورد الحجري بنظام تعشيق كليك ومظهر خشب الغابات وسماكة 5 مم',
      en: 'Rigid stone composite click wall panel in deep organic forest wood',
      tr: 'Geçmeli kilitli, 5.0 mm kalınlıkta orman ahşap dokulu SPC sunta alternatifi'
    },
    description: {
      ar: 'لوح بديل الشيبورد الحجري بنظام كليك بمقاس موحد 96 سم × 280 سم وسماكة 5.0 مم، صلب لا ينتفخ بالماء.',
      en: 'SPC Click Wall Panel Woody Forest. Unified 96 cm × 280 cm, 5.0 mm thickness.',
      tr: '96 cm × 280 cm, 5.0 mm Woody Forest SPC taş duvar paneli.'
    },
    images: [],
    dimensions: '96 cm × 280 cm',
    thickness: '5.0 mm',
    waterproof: true,
    colorHex: '#6D5038',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '96 سم × 280 سم', en: '96 cm × 280 cm', tr: '96 cm × 280 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '5.0 مم', en: '5.0 mm', tr: '5.0 mm' }
      }
    ]
  },
  {
    id: 'spc-nardo-grey',
    code: 'HM-251029-02',
    category: 'spc_wall',
    name: {
      ar: 'Nardo Grey',
      en: 'Nardo Grey',
      tr: 'Nardo Grisi'
    },
    subtitle: {
      ar: 'رمادي إسمنتي عصري فائق الحداثة بنظام كليك وسماكة 5 مم',
      en: 'Contemporary architectural Nardo grey concrete tone with click joint',
      tr: 'Modern beton dokulu Nardo grisi 5.0 mm kilitli SPC panel'
    },
    description: {
      ar: 'لوح بديل الشيبورد الحجري Nardo Grey بمقاس 96 سم × 280 سم وسماكة 5.0 مم.',
      en: 'Nardo Grey SPC Wall Panel. 96 cm × 280 cm, 5.0 mm thickness.',
      tr: '96 cm × 280 cm, 5.0 mm Nardo Grey SPC panel.'
    },
    images: [],
    dimensions: '96 cm × 280 cm',
    thickness: '5.0 mm',
    waterproof: true,
    colorHex: '#8C9094',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '96 سم × 280 سم', en: '96 cm × 280 cm', tr: '96 cm × 280 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '5.0 مم', en: '5.0 mm', tr: '5.0 mm' }
      }
    ]
  },
  {
    id: 'spc-travertine',
    code: 'HM-251029-03',
    category: 'spc_wall',
    name: {
      ar: 'Travertine',
      en: 'Travertine',
      tr: 'Doğal Traverten'
    },
    subtitle: {
      ar: 'حجر الTravertine الروماني بطبقات ترابية دافئة وسماكة 5 مم بنظام كليك',
      en: 'Warm earthy layered Roman travertine stone composite panel',
      tr: 'Doğal traverten katmanlı sıcak taş görünümlü 5.0 mm panel'
    },
    description: {
      ar: 'لوح بديل الشيبورد الحجري Travertine بمقاس 96 سم × 280 سم وسماكة 5.0 مم.',
      en: 'Travertine SPC Wall Panel. 96 cm × 280 cm, 5.0 mm thickness.',
      tr: '96 cm × 280 cm, 5.0 mm Traverten SPC panel.'
    },
    images: [],
    dimensions: '96 cm × 280 cm',
    thickness: '5.0 mm',
    waterproof: true,
    colorHex: '#CEBEA5',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '96 سم × 280 سم', en: '96 cm × 280 cm', tr: '96 cm × 280 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '5.0 مم', en: '5.0 mm', tr: '5.0 mm' }
      }
    ]
  },
  {
    id: 'spc-mercan',
    code: 'HM-251029-04',
    category: 'spc_wall',
    name: {
      ar: 'Mercan',
      en: 'Mercan',
      tr: 'Mercan Kireçtaşı'
    },
    subtitle: {
      ar: 'خامة حجرية متوسطية ناعمة تعكس هدوء الطبيعة بسماكة 5 مم ونظام كليك',
      en: 'Soft Mediterranean stone aesthetic with subtle natural grain',
      tr: 'Yumuşak Akdeniz kireçtaşı dokulu 5.0 mm kilitli panel'
    },
    description: {
      ar: 'لوح بديل الشيبورد الحجري Mercan بمقاس 96 سم × 280 سم وسماكة 5.0 مم.',
      en: 'Mercan SPC Wall Panel. 96 cm × 280 cm, 5.0 mm thickness.',
      tr: '96 cm × 280 cm, 5.0 mm Mercan SPC panel.'
    },
    images: [],
    dimensions: '96 cm × 280 cm',
    thickness: '5.0 mm',
    waterproof: true,
    colorHex: '#D8CFC4',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '96 سم × 280 سم', en: '96 cm × 280 cm', tr: '96 cm × 280 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '5.0 مم', en: '5.0 mm', tr: '5.0 mm' }
      }
    ]
  },
  {
    id: 'spc-cupper',
    code: 'HM-251029-05',
    category: 'spc_wall',
    name: {
      ar: 'Cupper',
      en: 'Cupper',
      tr: 'Bakır Cupper'
    },
    subtitle: {
      ar: 'تأثيرات المعدن النحاسي المؤكسد مع صلابة الحجر وسماكة 5 مم',
      en: 'Industrial oxidized copper aesthetic merged with rigid stone durability',
      tr: 'Endüstriyel bakır pası efektli 5.0 mm SPC kilitli panel'
    },
    description: {
      ar: 'لوح بديل الشيبورد الحجري Cupper بمقاس 96 سم × 280 سم وسماكة 5.0 مم.',
      en: 'Cupper SPC Wall Panel. 96 cm × 280 cm, 5.0 mm thickness.',
      tr: '96 cm × 280 cm, 5.0 mm Bakır Cupper SPC panel.'
    },
    images: [],
    dimensions: '96 cm × 280 cm',
    thickness: '5.0 mm',
    waterproof: true,
    colorHex: '#8C5B3E',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '96 سم × 280 سم', en: '96 cm × 280 cm', tr: '96 cm × 280 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '5.0 مم', en: '5.0 mm', tr: '5.0 mm' }
      }
    ]
  },
  {
    id: 'spc-calcatta',
    code: 'HM-251029-06',
    category: 'spc_wall',
    name: {
      ar: 'Calcatta',
      en: 'Calcatta',
      tr: 'Calacatta Mermer'
    },
    subtitle: {
      ar: 'رخام Calcatta الإيطالي الأبيض بعروق رمادية ورمادية دافئة بسماكة 4 مم',
      en: 'Italian Calacatta marble design on 4.0 mm rigid click stone panel',
      tr: 'Klasik İtalyan Calacatta desenli 4.0 mm geçmeli SPC panel'
    },
    description: {
      ar: 'لوح بديل الشيبورد الحجري Calcatta بمقاس 96 سم × 280 سم وسماكة 4.0 مم.',
      en: 'Calcatta SPC Wall Panel. 96 cm × 280 cm, 4.0 mm thickness.',
      tr: '96 cm × 280 cm, 4.0 mm Calcatta SPC panel.'
    },
    images: [],
    dimensions: '96 cm × 280 cm',
    thickness: '4.0 mm',
    waterproof: true,
    colorHex: '#F0ECE6',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '96 سم × 280 سم', en: '96 cm × 280 cm', tr: '96 cm × 280 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '4.0 مم', en: '4.0 mm', tr: '4.0 mm' }
      }
    ]
  },
  {
    id: 'spc-charcoal',
    code: 'HM-251029-07',
    category: 'spc_wall',
    name: {
      ar: 'Charcoal',
      en: 'Charcoal',
      tr: 'Kömür Karası Charcoal'
    },
    subtitle: {
      ar: 'فحمي عميق داكن بملمس حجري خشن مانع للبصمات بسماكة 4 مم',
      en: 'Deep charcoal matte stone finish with anti-fingerprint surface and click joint',
      tr: 'Derin kömür siyahı mat yüzeyli 4.0 mm kilitli SPC panel'
    },
    description: {
      ar: 'لوح بديل الشيبورد الحجري Charcoal بمقاس 96 سم × 280 سم وسماكة 4.0 مم.',
      en: 'Charcoal SPC Wall Panel. 96 cm × 280 cm, 4.0 mm thickness.',
      tr: '96 cm × 280 cm, 4.0 mm Charcoal SPC panel.'
    },
    images: [],
    dimensions: '96 cm × 280 cm',
    thickness: '4.0 mm',
    waterproof: true,
    colorHex: '#26272B',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '96 سم × 280 سم', en: '96 cm × 280 cm', tr: '96 cm × 280 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '4.0 مم', en: '4.0 mm', tr: '4.0 mm' }
      }
    ]
  },

  // ==========================================
  // 4. SPC Flooring (بديل الباركيه الحجري)
  // Standardized Dimension: 30.3 cm × 60.6 cm | Thickness: 5.0 mm / 5.5 mm (4.5 + 1.0 mm IXPE)
  // ==========================================
  {
    id: 'flr-concrete',
    code: 'HM 23',
    category: 'spc_flooring',
    name: {
      ar: 'Concrete',
      en: 'Concrete',
      tr: 'Beton Görünümlü SPC'
    },
    subtitle: {
      ar: 'أرضية حجرية بمظهر الإسمنت العصري بنظام كليك ومقاس 30.3 × 60.6 سم بسماكة 5 مم',
      en: 'Architectural concrete tile format with click lock and 5.0 mm stone core',
      tr: 'Modern brüt beton desenli 30.3 × 60.6 cm, 5.0 mm SPC kilitli parke'
    },
    description: {
      ar: 'بلاطة بديل الباركيه الحجري Concrete بمقاس موحد 30.3 سم × 60.6 سم وسماكة 5.0 مم، مقاومة 100% للماء والأوزان الثقيلة.',
      en: 'Concrete SPC Flooring tile. Unified 30.3 cm × 60.6 cm, 5.0 mm thickness.',
      tr: '30.3 cm × 60.6 cm, 5.0 mm Beton SPC zemin kaplaması.'
    },
    images: [],
    dimensions: '30.3 cm × 60.6 cm',
    thickness: '5.0 mm',
    waterproof: true,
    colorHex: '#9E9E9E',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '30.3 سم × 60.6 سم', en: '30.3 cm × 60.6 cm', tr: '30.3 cm × 60.6 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '5.0 مم', en: '5.0 mm', tr: '5.0 mm' }
      }
    ]
  },
  {
    id: 'flr-blanche',
    code: 'HM 21',
    category: 'spc_flooring',
    name: {
      ar: 'Blanche',
      en: 'Blanche',
      tr: 'Blanche Beyaz Taş'
    },
    subtitle: {
      ar: 'حجر أبيض لؤلؤي بسماكة 4.5 مم + 1.0 مم طبقة IXPE عازلة للصوت (إجمالي 5.5 مم)',
      en: 'Pearl white stone finish with 4.5mm core + 1.0mm IXPE acoustic underlay',
      tr: 'İnci beyazı taş desenli, 4.5mm + 1.0mm IXPE ses yalıtımlı SPC zemin'
    },
    description: {
      ar: 'بلاطة بديل الباركيه Blanche بمقاس 30.3 سم × 60.6 سم وسماكة إجمالية 5.5 مم (4.5 مم قلب صلب + 1.0 مم IXPE).',
      en: 'Blanche SPC Flooring tile. Unified 30.3 cm × 60.6 cm, 4.5 mm + 1.0 mm IXPE underlay.',
      tr: '30.3 cm × 60.6 cm, 4.5mm + 1.0mm IXPE Blanche SPC parke.'
    },
    images: [],
    dimensions: '30.3 cm × 60.6 cm',
    thickness: '4.5 mm + 1.0 mm IXPE (5.5 mm)',
    waterproof: true,
    colorHex: '#ECE7DF',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '30.3 سم × 60.6 سم', en: '30.3 cm × 60.6 cm', tr: '30.3 cm × 60.6 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '4.5 مم + 1.0 مم IXPE عازل للصوت', en: '4.5 mm + 1.0 mm IXPE acoustic backing', tr: '4.5 mm + 1.0 mm IXPE akustik taban' }
      }
    ]
  },
  {
    id: 'flr-kara',
    code: 'HM 24',
    category: 'spc_flooring',
    name: {
      ar: 'Kara',
      en: 'Kara',
      tr: 'Kara Koyu Taş'
    },
    subtitle: {
      ar: 'حجر داكن أنيق بسماكة 4.5 مم + 1.0 مم عازل صوتي IXPE بنظام كليك متطور',
      en: 'Sophisticated dark graphite stone tile with integrated acoustic foam',
      tr: 'Koyu füme taş desenli ses yalıtımlı lüks SPC zemin kaplaması'
    },
    description: {
      ar: 'بلاطة بديل الباركيه Kara بمقاس 30.3 سم × 60.6 سم وسماكة 4.5 مم + 1.0 مم IXPE.',
      en: 'Kara SPC Flooring tile. Unified 30.3 cm × 60.6 cm, 4.5 mm + 1.0 mm IXPE.',
      tr: '30.3 cm × 60.6 cm, 4.5mm + 1.0mm IXPE Kara SPC parke.'
    },
    images: [],
    dimensions: '30.3 cm × 60.6 cm',
    thickness: '4.5 mm + 1.0 mm IXPE (5.5 mm)',
    waterproof: true,
    colorHex: '#3A3A3D',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '30.3 سم × 60.6 سم', en: '30.3 cm × 60.6 cm', tr: '30.3 cm × 60.6 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '4.5 مم + 1.0 مم IXPE عازل للصوت', en: '4.5 mm + 1.0 mm IXPE acoustic backing', tr: '4.5 mm + 1.0 mm IXPE akustik taban' }
      }
    ]
  },

  // ==========================================
  // 5. PS Baseboards (نعلات بي إس)
  // Standardized Length: 240 cm | Heights: 10 cm, 11.5 cm | Thickness: 12 mm, 15 mm
  // ==========================================
  {
    id: 'base-led-115',
    code: 'PS-SPR-115-1',
    category: 'ps_baseboards',
    name: {
      ar: 'LED Baseboard',
      en: 'LED Baseboard',
      tr: 'LED Süpürgelik'
    },
    subtitle: {
      ar: 'نعلة بوليميرية مجهزة بمجرى إضاءة ليد مخفية بارتفاع 11.5 سم × طول 240 سم',
      en: 'Architectural polymer baseboard with integrated recessed LED channel',
      tr: 'Entegre gizli LED kanallı 11.5 cm yükseklik ve 240 cm uzunlukta süpürgelik'
    },
    description: {
      ar: 'نعلة بي إس ليد بمقاس موحد ارتفاع 11.5 سم × طول 240 سم وسماكة 15 مم، مقاومة للماء والصدمات.',
      en: 'LED Baseboard. Unified 11.5 cm × 240 cm, 15 mm thickness.',
      tr: '11.5 cm × 240 cm, 15 mm LED kanallı PS süpürgelik.'
    },
    images: [],
    dimensions: '11.5 cm × 240 cm',
    thickness: '15 mm',
    waterproof: true,
    colorHex: '#FFFFFF',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (الارتفاع × الطول)', en: 'Unified Dimensions (H × L)', tr: 'Standart Ölçü (Yükseklik × Boy)' },
        value: { ar: '11.5 سم × 240 سم', en: '11.5 cm × 240 cm', tr: '11.5 cm × 240 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '15 مم', en: '15 mm', tr: '15 mm' }
      }
    ]
  },
  {
    id: 'base-classic-100',
    code: 'PS-SPR-100-3',
    category: 'ps_baseboards',
    name: {
      ar: 'Classic Baseboard',
      en: 'Classic Baseboard',
      tr: 'Klasik Süpürgelik'
    },
    subtitle: {
      ar: 'تصميم كلاسيكي ناصع مقاوم للصدمات والماء بارتفاع 10 سم × طول 240 سم',
      en: 'Timeless crisp baseboard profile with 10 cm height and 240 cm length',
      tr: 'Klasik zarif hatlara sahip 10 cm × 240 cm suya dayanıklı süpürgelik'
    },
    description: {
      ar: 'نعلة بي إس كلاسيك بمقاس موحد ارتفاع 10 سم × طول 240 سم وسماكة 12 مم.',
      en: 'Classic Baseboard. Unified 10 cm × 240 cm, 12 mm thickness.',
      tr: '10 cm × 240 cm, 12 mm Klasik PS süpürgelik.'
    },
    images: [],
    dimensions: '10 cm × 240 cm',
    thickness: '12 mm',
    waterproof: true,
    colorHex: '#F5F5F7',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (الارتفاع × الطول)', en: 'Unified Dimensions (H × L)', tr: 'Standart Ölçü (Yükseklik × Boy)' },
        value: { ar: '10 سم × 240 سم', en: '10 cm × 240 cm', tr: '10 cm × 240 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '12 مم', en: '12 mm', tr: '12 mm' }
      }
    ]
  },

  // ==========================================
  // 6. PS Slaths & Cornice (قُضبان وكورنيش بي إس)
  // Standardized Length: 240 cm | Widths: 1.5 cm, 2.5 cm, 4 cm, 4.8 cm, 10 cm | Thickness: mm
  // ==========================================
  {
    id: 'slat-led-cornice',
    code: 'PS-LED-4',
    category: 'ps_slats',
    name: {
      ar: 'LED Cornice',
      en: 'LED Cornice',
      tr: 'LED Tavan Kornişi'
    },
    subtitle: {
      ar: 'كورنيش سقفي مزود بمجرى إضاءة ليد مخفية بعرض 10 سم × طول 240 سم',
      en: 'Ceiling architectural cornice with integrated recessed LED channel',
      tr: 'Gizli LED aydınlatmalı 10 cm × 240 cm tavan kornişi'
    },
    description: {
      ar: 'كورنيش بي إس ليد بمقاس موحد 10 سم × 240 سم وسماكة 20 مم.',
      en: 'LED Cornice. Unified 10 cm × 240 cm, 20 mm thickness.',
      tr: '10 cm × 240 cm, 20 mm LED PS korniş profili.'
    },
    images: [],
    dimensions: '10 cm × 240 cm',
    thickness: '20 mm',
    waterproof: true,
    colorHex: '#FFFFFF',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '10 سم × 240 سم', en: '10 cm × 240 cm', tr: '10 cm × 240 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '20 مم', en: '20 mm', tr: '20 mm' }
      }
    ]
  },
  {
    id: 'slat-4cm-classic',
    code: 'PS-C-105',
    category: 'ps_slats',
    name: {
      ar: '4 cm Classic',
      en: '4 cm Classic',
      tr: '4 cm Klasik Çıta'
    },
    subtitle: {
      ar: 'قضيب وبانو جداري كلاسيكي للإطارات بعرض 4 سم × طول 240 سم وسماكة 15 مم',
      en: 'Classic architectural wall molding trim for wainscoting and wall frames',
      tr: 'Duvar çıtalama ve çerçeve için 4 cm × 240 cm klasik profil'
    },
    description: {
      ar: 'قضيب بي إس 4 سم كلاسيك بمقاس موحد 4 سم × 240 سم وسماكة 15 مم.',
      en: '4 cm Classic PS Slath. Unified 4 cm × 240 cm, 15 mm thickness.',
      tr: '4 cm × 240 cm, 15 mm Klasik PS çıta.'
    },
    images: [],
    dimensions: '4 cm × 240 cm',
    thickness: '15 mm',
    waterproof: true,
    colorHex: '#F7F6F3',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '4 سم × 240 سم', en: '4 cm × 240 cm', tr: '4 cm × 240 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '15 مم', en: '15 mm', tr: '15 مم' }
      }
    ]
  },
  {
    id: 'slat-48-border',
    code: 'PS-C-010',
    category: 'ps_slats',
    name: {
      ar: '4.8 cm Border',
      en: '4.8 cm Border',
      tr: '4.8 cm Bordür Çıtası'
    },
    subtitle: {
      ar: 'قضيب بوردر بارز لتأطير الجدران والمرايا بعرض 4.8 سم × طول 240 سم',
      en: 'Prominent decorative border molding trim for mirrors and architectural framing',
      tr: 'Ayna ve duvar çerçeveleme için 4.8 cm × 240 cm bordür çıtası'
    },
    description: {
      ar: 'قضيب بي إس 4.8 سم بوردر بمقاس موحد 4.8 سم × 240 سم وسماكة 15 مم.',
      en: '4.8 cm Border PS Slath. Unified 4.8 cm × 240 cm, 15 mm thickness.',
      tr: '4.8 cm × 240 cm, 15 mm Bordür PS çıta.'
    },
    images: [],
    dimensions: '4.8 cm × 240 cm',
    thickness: '15 mm',
    waterproof: true,
    colorHex: '#F2EFE9',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '4.8 سم × 240 سم', en: '4.8 cm × 240 cm', tr: '4.8 cm × 240 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '15 مم', en: '15 mm', tr: '15 مم' }
      }
    ]
  },
  {
    id: 'slat-25-classic',
    code: 'PS-C-103',
    category: 'ps_slats',
    name: {
      ar: '2.5 cm Classic',
      en: '2.5 cm Classic',
      tr: '2.5 cm İnce Çıta'
    },
    subtitle: {
      ar: 'قضيب رفيع دقيق للإطارات المزدوجة الفرنسية بعرض 2.5 سم × طول 240 سم',
      en: 'Slender delicate molding trim designed for French double-framing wainscot',
      tr: 'Fransız çıtalama için 2.5 cm × 240 cm ince zarif çıta'
    },
    description: {
      ar: 'قضيب بي إس 2.5 سم كلاسيك بمقاس موحد 2.5 سم × 240 سم وسماكة 12 مم.',
      en: '2.5 cm Classic PS Slath. Unified 2.5 cm × 240 cm, 12 mm thickness.',
      tr: '2.5 cm × 240 cm, 12 mm İnce Klasik PS çıta.'
    },
    images: [],
    dimensions: '2.5 cm × 240 cm',
    thickness: '12 mm',
    waterproof: true,
    colorHex: '#FFFFFF',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '2.5 سم × 240 سم', en: '2.5 cm × 240 cm', tr: '2.5 cm × 240 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '12 مم', en: '12 mm', tr: '12 mm' }
      }
    ]
  },
  {
    id: 'slat-15-round',
    code: 'PS-C-101',
    category: 'ps_slats',
    name: {
      ar: '1.5 cm Round',
      en: '1.5 cm Round',
      tr: '1.5 cm Yuvarlak Çıta'
    },
    subtitle: {
      ar: 'قضيب نصف دائري رفيع للتشطيبات المتقنة بعرض 1.5 سم × طول 240 سم',
      en: 'Half-round slim profile trim for precision borders and finish lines',
      tr: 'Hassas kenar bitişleri için 1.5 cm × 240 cm yarım yuvarlak çıta'
    },
    description: {
      ar: 'قضيب بي إس 1.5 سم دائري بمقاس موحد 1.5 سم × 240 سم وسماكة 10 مم.',
      en: '1.5 cm Round PS Slath. Unified 1.5 cm × 240 cm, 10 mm thickness.',
      tr: '1.5 cm × 240 cm, 10 mm Yuvarlak PS çıta.'
    },
    images: [],
    dimensions: '1.5 cm × 240 cm',
    thickness: '10 mm',
    waterproof: true,
    colorHex: '#FFFFFF',
    specs: [
      {
        key: 'dimensions_standard',
        label: { ar: 'المقاس الموحد (العرض × الطول)', en: 'Unified Dimensions (W × L)', tr: 'Standart Ölçü (En × Boy)' },
        value: { ar: '1.5 سم × 240 سم', en: '1.5 cm × 240 cm', tr: '1.5 cm × 240 cm' }
      },
      {
        key: 'thickness',
        label: { ar: 'السماكة الفنية', en: 'Thickness', tr: 'Kalınlık' },
        value: { ar: '10 مم', en: '10 mm', tr: '10 mm' }
      }
    ]
  }
];
