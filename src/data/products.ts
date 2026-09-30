import { ProductModel, CategoryInfo, ProductCategory } from '../types';
import { ALL_PRODUCT_MODELS } from './productModels';

export const CATEGORIES_CONFIG = [
  { 
    id: 'all', 
    nameAr: 'كافة الموديلات', 
    nameEn: 'All Models', 
    nameTr: 'Tüm Modeller' 
  },
  { 
    id: 'ps_wood', 
    nameAr: 'بديل الخشب (PS)', 
    nameEn: 'PS Wall Panels', 
    nameTr: 'PS Duvar Panelleri' 
  },
  { 
    id: 'pvc_marble', 
    nameAr: 'بديل الرخام (PVC)', 
    nameEn: 'PVC Wall Panels', 
    nameTr: 'PVC Duvar Panelleri' 
  },
  { 
    id: 'spc_wall', 
    nameAr: 'بديل الشيبورد الحجري (SPC)', 
    nameEn: 'SPC Wall Panels', 
    nameTr: 'SPC Duvar Panelleri' 
  },
  { 
    id: 'spc_flooring', 
    nameAr: 'بديل الباركيه (SPC)', 
    nameEn: 'SPC Flooring', 
    nameTr: 'SPC Zemin Kaplaması' 
  },
  { 
    id: 'ps_slats', 
    nameAr: 'قُضبان بي إس', 
    nameEn: 'PS Wall Slaths', 
    nameTr: 'PS Duvar Çıtaları ve Profilleri' 
  },
  { 
    id: 'ps_baseboards', 
    nameAr: 'نعلات بي إس', 
    nameEn: 'PS Baseboards', 
    nameTr: 'PS Süpürgelikler' 
  }
];

export const CATEGORIES_DATA: CategoryInfo[] = [
  // 1. PS Wall Panels ➔ بديل الخشب
  {
    id: 'ps_wood',
    name: {
      ar: 'بديل الخشب (PS Wall Panels)',
      en: 'PS Wall Panels',
      tr: 'PS Duvar Panelleri'
    },
    subtitle: {
      ar: 'دفء الخشب الطبيعي بتضليع ثلاثي الأبعاد وعزل صوتي وتناغم مع إضاءات LED',
      en: 'Warm timber texture with acoustic 3D fluting and recessed LED channel integration',
      tr: 'Doğal ahşap sıcaklığı, 3D akustik çıta dokusu ve LED uyumu'
    },
    description: {
      ar: 'ألواح جدارية ديكورية متنوعة ، تتميز بمقاومتها للرطوبة وسهولة تركيبها لتجديد الجدران الداخلية بأسلوب عصري وأنيق.',
      en: 'Versatile decorative wall panels with exceptional moisture resistance and effortless installation, modernizing interior walls with refined elegance.',
      tr: 'İç duvarları zarif ve modern bir şekilde yenileyen, neme dayanıklı ve kolay montajlı çok yönlü dekoratif duvar panelleri.'
    },
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=2400&q=85',
    specs: {
      dimensions: '12.1 cm - 16 cm × 290 cm',
      thickness: '9 mm - 14.8 mm',
      waterproof: {
        ar: 'مقاوم للماء والعفن وعثة الخشب 100%',
        en: '100% Moisture, Rot & Termite Resistant',
        tr: '%100 Su, Nem ve Güveye Dayanıklı'
      },
      composition: {
        ar: 'بوليمير PS هندسي عالي الكثافة مع فيلم خشبي حراري حريري',
        en: 'High-density engineered PS polymer with thermal textured foil',
        tr: 'Yüksek yoğunluklu PS polimer ve dokulu ahşap film'
      },
      applications: {
        ar: 'خلفيات الأسرة، جدران الصالونات، قواطع الغرف، المكاتب الإدارية',
        en: 'Master bedroom headboards, living rooms, decorative room dividers, executive offices',
        tr: 'Yatak başlıkları, TV arkaları ve ofis duvarları'
      }
    }
  },
  {
    id: 'ps',
    name: {
      ar: 'بديل الخشب (PS Wall Panels)',
      en: 'PS Wall Panels',
      tr: 'PS Duvar Panelleri'
    },
    subtitle: {
      ar: 'دفء الخشب الطبيعي بتضليع ثلاثي الأبعاد وعزل صوتي وتناغم مع إضاءات LED',
      en: 'Warm timber texture with acoustic 3D fluting and recessed LED channel integration',
      tr: 'Doğal ahşap sıcaklığı, 3D akustik çıta dokusu ve LED uyumu'
    },
    description: {
      ar: 'شرائح مضلعة تمنح الجدار عمقاً معمارياً فاخراً وملمساً خشبياً حقيقياً دون القلق من التشقق أو التسوس أو التقوس بفعل الرطوبة.',
      en: 'Architectural fluted slats creating striking linear depth and tactile warmth.',
      tr: 'Nemden etkilenmeyen, bükülmeyen ve akustik konfor sağlayan 3D oluklu çıta paneller.'
    },
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=2400&q=85',
    specs: {
      dimensions: '12.1 cm - 16 cm × 290 cm',
      thickness: '9 mm - 14.8 mm',
      waterproof: {
        ar: 'مقاوم للماء 100%',
        en: '100% Waterproof',
        tr: '%100 Su Geçirmez'
      },
      composition: {
        ar: 'بوليمير PS هندسي عالي الكثافة',
        en: 'High-density engineered PS polymer',
        tr: 'Yüksek yoğunluklu PS polimer'
      },
      applications: {
        ar: 'خلفيات الأسرة، جدران الصالونات، قواطع الغرف',
        en: 'Living rooms, bed headboards, partitions',
        tr: 'Yatak başlıkları, salonlar'
      }
    }
  },
  // 2. PVC Wall Panels ➔ بديل الرخام
  {
    id: 'pvc_marble',
    name: {
      ar: 'بديل الرخام (PVC Wall Panels)',
      en: 'PVC Wall Panels',
      tr: 'PVC Duvar Panelleri'
    },
    subtitle: {
      ar: 'فخامة الرخام الطبيعي بسطح كريستالي 100% مقاوم للماء والخدوش',
      en: 'Natural Italian marble luxury with high-gloss crystalline 100% waterproof shield',
      tr: 'Lüks mermer dokusu, kristal parlaklık ve %100 su geçirmezlik'
    },
    description: {
      ar: 'ألواح أنيقة بتصميمات الرخام الفاخر، تضفي لمسة من الرقي والفخامة على الجدران دون عناء وصيانة الرخام الطبيعي.',
      en: 'Elegant panels capturing luxurious natural marble veining, adding prestige and grandeur to your walls without the weight or maintenance of real stone.',
      tr: 'Doğal mermerin zahmeti ve bakımı olmadan, duvarlara lüks ve asil bir dokunuş katan zarif mermer görünümlü paneller.'
    },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
    specs: {
      dimensions: '122 cm × 240 cm',
      thickness: '2.5 mm',
      waterproof: {
        ar: 'مقاومة تامة للماء والرطوبة بنسبة 100%',
        en: '100% Waterproof & Moisture Impervious',
        tr: '%100 Su ve Neme Dayanıklı'
      },
      composition: {
        ar: 'مركب PVC مقوى مع مسحوق الكالسيوم وطبقة كريستال UV',
        en: 'Reinforced PVC matrix with calcium powder and crystal UV layer',
        tr: 'Güçlendirilmiş PVC ve kalsiyum tozu kompoziti, UV kaplamalı'
      },
      applications: {
        ar: 'خلفيات الشاشات، صالات الاستقبال، المغاسل، الممرات، مداخل الفلل',
        en: 'Living room feature walls, TV consoles, vanity walls, hallways, and hotel lobbies',
        tr: 'TV üniteleri, salonlar, banyolar ve lüks girişler'
      }
    }
  },
  {
    id: 'pvc',
    name: {
      ar: 'بديل الرخام (PVC Wall Panels)',
      en: 'PVC Wall Panels',
      tr: 'PVC Duvar Panelleri'
    },
    subtitle: {
      ar: 'فخامة الرخام الطبيعي بسطح كريستالي 100% مقاوم للماء',
      en: 'Natural Italian marble luxury with high-gloss crystalline 100% waterproof shield',
      tr: 'Lüks mermer dokusu, kristal parlaklık ve %100 su geçirmezlik'
    },
    description: {
      ar: 'ألواح جدارية عصرية متطورة تعكس روعة الحجر الطبيعي وعروق الرخام الإيطالي.',
      en: 'Premium wall panels mirroring Italian marble veining with a high-gloss UV layer.',
      tr: 'Çizilmeye ve lekelere dayanıklı UV korumalı lüks mermer paneller.'
    },
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
    specs: {
      dimensions: '122 cm × 240 cm',
      thickness: '2.5 mm',
      waterproof: {
        ar: '100% مقاوم للماء',
        en: '100% Waterproof',
        tr: '%100 Su Geçirmez'
      },
      composition: {
        ar: 'مركب PVC مقوى مع طبقة UV',
        en: 'Reinforced PVC matrix with UV layer',
        tr: 'Güçlendirilmiş PVC, UV kaplamalı'
      },
      applications: {
        ar: 'خلفيات الشاشات، صالات الاستقبال، المغاسل',
        en: 'Living room feature walls, TV consoles',
        tr: 'TV üniteleri, salonlar, banyolar'
      }
    }
  },
  // 3. SPC Wall Panels ➔ بديل الشيبورد الحجري
  {
    id: 'spc_wall',
    name: {
      ar: 'بديل الشيبورد الحجري (SPC Wall Panels)',
      en: 'SPC Wall Panels',
      tr: 'SPC Duvar Panelleri'
    },
    subtitle: {
      ar: 'البديل المتين ذو الصلابة الحجرية الذي لا ينتفخ بالماء أو الرطوبة إطلاقاً',
      en: 'The rigid stone-composite evolution replacing conventional chipboard & MDF (zero swelling)',
      tr: 'Sunta ve MDF yerine geçen, suda asla şişmeyen sert taş kompozit'
    },
    description: {
      ar: 'ألواح مطورة مصنوعة من  بي في سي والحجر المضغوط بتشكيلة واسعة ، لتقدم مظهراً فاخرًا وملمسًا عالي الجودة مع متانة و مقاومة فائقة للماء.',
      en: 'Advanced composite panels made of PVC and compressed stone in a wide range of designs, delivering a luxurious look, tactile finish, and supreme waterproof durability.',
      tr: 'Geniş model seçenekleri, lüks görünümü ve üstün su direnci ile PVC ve sıkıştırılmış taştan üretilmiş gelişmiş kompozit paneller.'
    },
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2400&q=85',
    specs: {
      dimensions: '96 cm × 280 cm',
      thickness: '4.0 mm - 5.0 mm',
      waterproof: {
        ar: 'صفر انتفاخ بالماء (مقاومة مائية مطلقة 100%)',
        en: 'Zero Swelling When Soaked (100% Waterproof)',
        tr: 'Suda Kesinlikle Şişmez (%100 Su Geçirmez)'
      },
      composition: {
        ar: 'حجر بوليميري صلب (Stone Plastic Composite) عالي الكثافة ونظام كليك',
        en: 'Ultra-dense rigid stone plastic composite (SPC) core matrix with click lock',
        tr: 'Yüksek yoğunluklu rijit taş polimer kompozit kilitli sistem'
      },
      applications: {
        ar: 'تجاليد الجدران، خزائن المغاسل والمطابخ، القواطع المعمارية، الأماكن الرطبة',
        en: 'Wall paneling, moisture-prone cabinetry, vanity backing, architectural partitions',
        tr: 'Duvar giydirme, banyo/mutfak panelleri ve bölme duvarlar'
      }
    }
  },
  {
    id: 'spc',
    name: {
      ar: 'بديل الشيبورد الحجري (SPC)',
      en: 'SPC Wall Panels',
      tr: 'SPC Duvar Panelleri'
    },
    subtitle: {
      ar: 'البديل المتين ذو الصلابة الحجرية الذي لا ينتفخ بالماء أو الرطوبة إطلاقاً',
      en: 'The rigid stone-composite evolution replacing conventional chipboard & MDF (zero swelling)',
      tr: 'Sunta ve MDF yerine geçen, suda asla şişmeyen sert taş kompozit'
    },
    description: {
      ar: 'ألواح حجرية بوليميرية فائقة الكثافة والصلابة تم ابتكارها لتكون البديل النهائي لألواح الشيبورد والميلامين والخشب المضغوط.',
      en: 'Heavy-duty rigid stone-polymer composite sheets engineered to eliminate traditional chipboard water swelling.',
      tr: 'Geleneksel suntanın su çekme ve kabarma sorununu çözen, yangına dayanıklı SPC levha.'
    },
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2400&q=85',
    specs: {
      dimensions: '96 cm × 280 cm',
      thickness: '4.0 mm - 5.0 mm',
      waterproof: {
        ar: '100% مقاوم للماء',
        en: '100% Waterproof',
        tr: '%100 Su Geçirmez'
      },
      composition: {
        ar: 'حجر بوليميري صلب (SPC)',
        en: 'Rigid stone plastic composite (SPC)',
        tr: 'Rijit taş polimer kompozit'
      },
      applications: {
        ar: 'تجاليد الجدران، خزائن المغاسل والمطابخ',
        en: 'Wall paneling, moisture-prone cabinetry',
        tr: 'Duvar giydirme, banyo panelleri'
      }
    }
  },
  // 4. SPC Flooring ➔ بديل الباركيه
  {
    id: 'spc_flooring',
    name: {
      ar: 'بديل الباركيه (SPC Flooring)',
      en: 'SPC Flooring',
      tr: 'SPC Zemin Kaplaması'
    },
    subtitle: {
      ar: 'أرضيات حجرية متطورة بنظام كليك (Click Lock) عازلة للصوت ومقاومة 100% للماء',
      en: 'Advanced rigid core stone-polymer click parquet with IXPE acoustic backing and 100% waterproof shield',
      tr: 'Geçmeli kilitli, ses yalıtımlı ve %100 su geçirmez SPC taş kompozit parke'
    },
    description: {
      ar: 'أرضيات مبتكرة بتصميمات متنوعة، مجهزة بنظام النقر المبتكر لسهولة التركيب الفائقة، مع طبقة حماية ضد الخدش ومتانة تفوق الباركيه التقليدي بفضل مقاومتها الكاملة للماء.',
      en: 'Innovative flooring with versatile finishes and an effortless click-lock system, featuring a heavy scratch-resistant layer and durability surpassing traditional parquet thanks to 100% waterproof performance.',
      tr: 'Kolay montaj sağlayan kilit sistemi, çizilme koruması ve %100 su geçirmezliğiyle geleneksel parkeyi aşan yenilikçi zemin kaplamaları.'
    },
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=2400&q=85',
    specs: {
      dimensions: '30.3 cm × 60.6 cm',
      thickness: '5.0 mm - 5.5 mm (4.5 مم + 1.0 مم IXPE)',
      waterproof: {
        ar: 'مقاومة مائية مطلقة 100% (صفر امتصاص سوائل)',
        en: '100% Waterproof Rigid Core (Zero Absorption)',
        tr: '%100 Su Geçirmez Rijit Gövde (Sıfır Emme)'
      },
      composition: {
        ar: 'حجر جيري طبيعي مقوى مع بوليمير صلب وطبقة حماية من الخدش 0.5 مم وطبقة IXPE عازلة',
        en: 'Natural limestone & PVC polymer core with 0.5mm heavy-duty commercial wear layer and IXPE',
        tr: 'Doğal kireçtaşı ve polimer kompozit, 0.5mm aşınma tabakası ve IXPE'
      },
      applications: {
        ar: 'الصالات، غرف النوم، المطابخ، الممرات، المحلات التجارية، المكاتب والفنادق',
        en: 'Living rooms, bedrooms, kitchens, high-traffic commercial zones, boutiques, offices',
        tr: 'Salonlar, yatak odaları, mutfaklar, oteller ve ticari alanlar'
      }
    }
  },
  // 5. PS Wall Slaths ➔ قُضبان بي إس
  {
    id: 'ps_slats',
    name: {
      ar: 'قُضبان بي إس (PS Wall Slaths)',
      en: 'PS Wall Slaths',
      tr: 'PS Duvar Çıtaları ve Profilleri'
    },
    subtitle: {
      ar: 'قُضبان وبانوهات بي إس جدارية خفيفة وعالية الدقة للبراويز والتجاليد الديكورية',
      en: 'Precision architectural polystyrene wall molds, decorative frames & linear moldings',
      tr: 'Hafif, estetik ve kolay monte edilen polistiren duvar çıtaları ve profilleri'
    },
    description: {
      ar: 'قُضبان  ديكورية مرنة ومتينة تتيح تصميم إطارات على الطراز الفرنسي وتشكيل الجدران بحرية تامة لتناسب كافة الأذواق الديكورية.',
      en: 'Flexible and durable decorative moldings and trims enabling French-style wainscoting and bespoke wall framing to suit every architectural taste.',
      tr: 'Fransız tarzı çıtalama ve duvar tasarımı imkanı sunan, her dekorasyon zevkine uyum sağlayan esnek ve dayanıklı dekoratif çıtalar.'
    },
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2400&q=85',
    specs: {
      dimensions: '1.5 cm - 10 cm × 240 cm',
      thickness: '10 mm - 20 mm',
      waterproof: {
        ar: 'مقاومة تامة للماء والرطوبة والبكتيريا 100%',
        en: '100% Moisture, Rot & Termite Resistant',
        tr: '%100 Neme, Suya ve Bakterilere Dayanıklı'
      },
      composition: {
        ar: 'بوليسترين عالي الكثافة (HDPS) هندسي صديق للبيئة',
        en: 'High-density extruded polystyrene (HDPS) eco-formulated',
        tr: 'Yüksek yoğunluklu ekstrüde polistiren (HDPS)'
      },
      applications: {
        ar: 'بانوهات الجدران، إطارات المرايا واللوحات، الممرات، خلفيات الصالونات والمكاتب',
        en: 'Wall picture frames, wainscoting, mirror framing, luxury hallways and salons',
        tr: 'Duvar panoları, ayna çerçeveleri, koridorlar ve salonlar'
      }
    }
  },
  {
    id: 'polystyrene_slats',
    name: {
      ar: 'قُضبان بي إس (PS Wall Slaths)',
      en: 'PS Wall Slaths',
      tr: 'PS Duvar Çıtaları ve Profilleri'
    },
    subtitle: {
      ar: 'قُضبان وبانوهات بي إس جدارية خفيفة وعالية الدقة للبراويز والتجاليد الديكورية',
      en: 'Precision architectural polystyrene wall molds, decorative frames & linear moldings',
      tr: 'Hafif, estetik ve kolay monte edilen polistiren duvar çıtaları ve profilleri'
    },
    description: {
      ar: 'شرائح جدارية مصنعة من البوليسترين عالي الكثافة (HDPS)، تتميز بخفة الوزن الفائقة وسهولة التركيب المباشر على كافة الأسطح.',
      en: 'Manufactured from high-density polystyrene (HDPS), combining minimal structural load with effortless adhesive installation.',
      tr: 'Yüksek yoğunluklu polistirenden (HDPS) üretilen hafif, kolay monte edilen ve yankıyı kesen modern duvar çıtaları.'
    },
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2400&q=85',
    specs: {
      dimensions: '1.5 cm - 10 cm × 240 cm',
      thickness: '10 mm - 20 mm',
      waterproof: {
        ar: 'مقاومة تامة للماء 100%',
        en: '100% Waterproof',
        tr: '%100 Su Geçirmez'
      },
      composition: {
        ar: 'بوليسترين عالي الكثافة (HDPS)',
        en: 'High-density extruded polystyrene (HDPS)',
        tr: 'Yüksek yoğunluklu ekstrüde polistiren'
      },
      applications: {
        ar: 'بانوهات الجدران، الممرات السكنية، المكاتب',
        en: 'Wall picture frames, corridors, study rooms',
        tr: 'Duvar panoları, koridorlar, çalışma odaları'
      }
    }
  },
  // 6. PS Baseboards ➔ نعلات بي إس
  {
    id: 'ps_baseboards',
    name: {
      ar: 'نعلات بي إس (PS Baseboards)',
      en: 'PS Baseboards',
      tr: 'PS Süpürgelikler'
    },
    subtitle: {
      ar: 'نعلات معمارية بوليميرية مقاومة للماء والضربات ووسائل التنظيف اليومية',
      en: 'Durable architectural polymer baseboards resistant to water, vacuum impacts & detergents',
      tr: 'Suya, darbelere ve deterjanlara tam dayanıklı mimari polistiren süpürgelikler'
    },
    description: {
      ar: 'نعلات أرضية عملية ومتينة تمنح التشطيبات الداخلية مظهراً متكاملاً مع حماية فعالة للحواف، وتتوفر في بعض الموديلات مع قنوات مدمجة لإضاءة الليد.',
      en: 'Practical, heavy-duty floor baseboards providing seamless architectural finish and edge protection, with select models featuring integrated channels for LED lighting.',
      tr: 'İç mekanlara bütünsel bir bitiş ve kenar koruması sağlayan, belirli modellerde entegre LED aydınlatma kanalına sahip dayanıklı süpürgelikler.'
    },
    image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=2400&q=85',
    specs: {
      dimensions: '10 cm - 11.5 cm × 240 cm',
      thickness: '12 mm - 15 mm',
      waterproof: {
        ar: 'مقاومة تامة للماء والغسيل 100%',
        en: '100% Water, Mopping & Detergent Proof',
        tr: '%100 Suya ve Yıkamaya Dayanıklı'
      },
      composition: {
        ar: 'بوليسترين صلب مضاد للصدمات مع تشطيب ناعم قابل للتنظيف',
        en: 'High-impact dense polystyrene with wipe-clean surface finish',
        tr: 'Darbe emici sert polistiren, kolay temizlenir yüzey'
      },
      applications: {
        ar: 'كافة الغرف السكنية والتجارية، الممرات، المستشفيات، الفنادق والمكاتب',
        en: 'Residential homes, commercial offices, hotels, clinical spaces, corridors',
        tr: 'Evler, oteller, hastaneler ve ticari alanlar'
      }
    }
  },
  {
    id: 'polystyrene_baseboards',
    name: {
      ar: 'نعلات بي إس (PS Baseboards)',
      en: 'PS Baseboards',
      tr: 'PS Süpürgelikler'
    },
    subtitle: {
      ar: 'نعلات معمارية بوليميرية مقاومة للماء والضربات ووسائل التنظيف اليومية',
      en: 'Durable architectural polymer baseboards resistant to water, vacuum impacts & detergents',
      tr: 'Suya, darbelere ve deterjanlara tam dayanıklı mimari polistiren süpürgelikler'
    },
    description: {
      ar: 'نعلات أسفل الجدران مصنعة من البوليسترين الكثيف المقاوم للماء بنسبة 100%.',
      en: 'Precision architectural skirting boards crafted from water-impervious high-density polystyrene.',
      tr: 'Zemin ve duvar birleşimini kusursuz şekilde kapatan suya dayanıklı süpürgelikler.'
    },
    image: '/uploads/1790748270465_psbaseboardbirlikcompany.jpg',
    specs: {
      dimensions: '10 cm - 11.5 cm × 240 cm',
      thickness: '12 mm - 15 mm',
      waterproof: {
        ar: '100% مقاوم للماء',
        en: '100% Waterproof',
        tr: '%100 Su Geçirmez'
      },
      composition: {
        ar: 'بوليسترين صلب مضاد للصدمات',
        en: 'High-impact dense polystyrene',
        tr: 'Darbe emici sert polistiren'
      },
      applications: {
        ar: 'الغرف السكنية والتجارية، الممرات',
        en: 'Residential homes, commercial offices',
        tr: 'Evler, ticari alanlar'
      }
    }
  }
];

export const isModelInCategory = (model: ProductModel, cat: ProductCategory): boolean => {
  if (cat === 'all') return true;
  // 1. PS Wall Panels ➔ بديل الخشب
  if (cat === 'ps_wood' || cat === 'ps' || cat === 'slats') {
    return model.category === 'ps_wood' || model.category === 'ps' || model.category === 'slats';
  }
  // 2. PVC Wall Panels ➔ بديل الرخام
  if (cat === 'pvc_marble' || cat === 'pvc' || cat === 'walls') {
    return model.category === 'pvc_marble' || model.category === 'pvc' || model.category === 'walls';
  }
  // 3. SPC Wall Panels ➔ بديل الشيبورد الحجري
  if (cat === 'spc_wall' || cat === 'spc') {
    return model.category === 'spc_wall' || model.category === 'spc';
  }
  // 4. SPC Flooring ➔ بديل الباركيه
  if (cat === 'spc_flooring') {
    return model.category === 'spc_flooring';
  }
  // 5. PS Wall Slaths ➔ قُضبان بي إس
  if (cat === 'ps_slats' || cat === 'polystyrene_slats') {
    return model.category === 'ps_slats' || model.category === 'polystyrene_slats';
  }
  // 6. PS Baseboards ➔ نعلات بي إس
  if (cat === 'ps_baseboards' || cat === 'polystyrene_baseboards' || cat === 'baseboards') {
    return model.category === 'ps_baseboards' || model.category === 'polystyrene_baseboards' || model.category === 'baseboards';
  }
  return model.category === cat;
};

export const PRODUCT_MODELS: ProductModel[] = ALL_PRODUCT_MODELS;
