import { ProductCategory } from '../types';

export interface InstallationGuide {
  id: string;
  categoryId: ProductCategory;
  categoryName: {
    ar: string;
    en: string;
    tr: string;
  };
  subtitle: {
    ar: string;
    en: string;
    tr: string;
  };
  badge: {
    ar: string;
    en: string;
    tr: string;
  };
  videoTitle: {
    ar: string;
    en: string;
    tr: string;
  };
  videoEmbedUrl: string;
  youtubeId: string;
  categoryImage: string;
  dimensions: string;
  thickness: string;
  installationMethod: {
    ar: string;
    en: string;
    tr: string;
  };
  steps: {
    ar: string[];
    en: string[];
    tr: string[];
  };
  tools: {
    ar: string[];
    en: string[];
    tr: string[];
  };
  proTip: {
    ar: string;
    en: string;
    tr: string;
  };
}

export const INSTALLATION_GUIDES: InstallationGuide[] = [
  // 1. بديل الخشب (PS Wall Panels)
  {
    id: 'ps_wood',
    categoryId: 'ps_wood',
    categoryName: {
      ar: 'بديل الخشب (PS Wall Panels)',
      en: 'PS Wall Panels',
      tr: 'PS Duvar Panelleri'
    },
    subtitle: {
      ar: 'ألواح جدارية مضلعة عازلة للصوت ومقاومة للماء وسهلة التركيب بنظام التراكب المخفي',
      en: 'Acoustic fluted slats with seamless tongue-and-groove interlocking system',
      tr: 'Akustik oluklu çıta dokusu ve geçmeli gizli kilit sistemi'
    },
    badge: {
      ar: 'فيديو تطبيق بديل الخشب',
      en: 'PS Panels Application Video',
      tr: 'PS Panel Uygulama Videosu'
    },
    videoTitle: {
      ar: 'طريقة وخطوات تركيب وتثبيت ألواح بديل الخشب (PS Wall Panels)',
      en: 'Complete Installation Guide & Video: PS Wall Panels',
      tr: 'PS Ahşap Çıtalı Duvar Panelleri Montaj ve Uygulama Rehberi'
    },
    videoEmbedUrl: 'https://www.youtube.com/embed/juMn9nsURXI?si=9p5iDaPJ3avjacST',
    youtubeId: 'juMn9nsURXI',
    categoryImage: '/uploads/1790748253391_pswallpanelsbirlikcompany.jpg',
    dimensions: '12.1 cm - 16 cm × 290 cm',
    thickness: '9 mm - 14.8 mm',
    installationMethod: {
      ar: 'لصق مباشر بسيليكون إنشائي قوي + تعشيق تداخلي مخفي للأطراف',
      en: 'Direct structural adhesive bonding + concealed tongue-and-groove interlocking',
      tr: 'Güçlü silikon yapıştırıcı + gizli geçmeli kilitli birleşim'
    },
    steps: {
      ar: [
        'تنظيف الجدار المستهدف والتأكد من استوائه وخلوه التام من الأتربة والرطوبة السطحية.',
        'قياس ارتفاع الجدار بدقة وقص الألواح بالمنشار السريع مع ترك خلوص 3-5 مم عند الأرضية والسقف.',
        'توزيع السيليكون البوليميري الإنشائي على ظهر اللوح بخطوط زكزاك متقاربة مع نقاط شريط لاصق مزدوج للتثبيت اللحظي.',
        'تثبيت اللوح الأول بميزان الليزر العمودي، ثم إدخال اللوح التالي في مجرى التعشيق المخفي وضغطه بلطف لضمان تماسك كامل.'
      ],
      en: [
        'Ensure the target wall is dry, even, and free of loose dust or peeling paint.',
        'Accurately measure wall height and cut panels with a fine-tooth or miter saw, leaving a 3-5 mm expansion gap.',
        'Apply strong structural polymer adhesive in zigzag beads on the backside, supplemented with double-sided mounting tape.',
        'Align the starter panel using a laser level, then interlock subsequent panels into the tongue-and-groove profile with firm pressure.'
      ],
      tr: [
        'Uygulama yapılacak duvarın temiz, kuru ve düzgün olduğundan emin olun.',
        'Duvar yüksekliğini hassas ölçerek panelleri uygun testere ile kesin.',
        'Panel arkasına zikzak formunda güçlü montaj yapıştırıcısı ve anlık tutuş için çift taraflı bant uygulayın.',
        'İlk paneli lazer terazi ile hizalayın, ardından diğer panelleri kilit yuvalarına geçirerek sıkıca bastırın.'
      ]
    },
    tools: {
      ar: ['مسطرة أو ميزان ليزر', 'منشار قص كهربائي أو يدوي ناعم', 'فرد سيليكون مع غراء بوليميري إنشائي', 'شريط قياس ومتر متري'],
      en: ['Laser level / spirit level', 'Fine-tooth miter or circular saw', 'Structural polyurethane / silicone adhesive', 'Measuring tape & pencil'],
      tr: ['Lazer terazi', 'İnce dişli gönye testere', 'Güçlü montaj silikonu', 'Şerit metre']
    },
    proTip: {
      ar: 'نصيحة المهندس: ابدأ دائماً بالتركيب من إحدى زوايا الغرفة باتجاه الداخل، وتأكد من استقامة اللوح الأول 100% لأن جميع الألواح التالية ستعتمد على زاويته.',
      en: 'Architectural Tip: Always start from a corner working inwards, and guarantee the starter panel is 100% plumb as all subsequent panels follow its alignment.',
      tr: 'Mimarın Tavsiyesi: Montaja her zaman bir köşeden başlayın ve ilk panelin teraziye tam oturduğundan emin olun.'
    }
  },

  // 2. بديل الرخام (PVC Wall Panels)
  {
    id: 'pvc_marble',
    categoryId: 'pvc_marble',
    categoryName: {
      ar: 'بديل الرخام (PVC Wall Panels)',
      en: 'PVC Wall Panels',
      tr: 'PVC Duvar Panelleri'
    },
    subtitle: {
      ar: 'ألواح رخامية كريستالية فاخرة بلمعان فائق ومقاومة 100% للرطوبة والخدش',
      en: 'High-gloss Italian-inspired marble sheets with 100% waterproof UV crystal shield',
      tr: 'Parlak mermer dokusu, UV kristal koruma ve %100 su geçirmezlik'
    },
    badge: {
      ar: 'فيديو تطبيق بديل الرخام',
      en: 'PVC Marble Application Video',
      tr: 'PVC Mermer Uygulama Videosu'
    },
    videoTitle: {
      ar: 'طريقة وخطوات تركيب ألواح بديل الرخام (PVC Wall Panels) باحترافية',
      en: 'Step-by-Step Professional Application: PVC Marble Panels',
      tr: 'PVC Mermer Görünümlü Duvar Paneli Profesyonel Montaj Rehberi'
    },
    videoEmbedUrl: 'https://www.youtube.com/embed/6ZdIQCAViWU?si=eqo14_R2LYxJ0d4X',
    youtubeId: '6ZdIQCAViWU',
    categoryImage: '/uploads/1790748255245_pvcwallpanelbirlikcompany.jpg',
    dimensions: '122 cm × 240 cm',
    thickness: '2.5 mm',
    installationMethod: {
      ar: 'لصق مباشر بسيليكون إنشائي فائق الالتصاق + فواصل وقواطع ألمنيوم أو دمج معجون رخامي',
      en: 'Direct structural adhesive bonding + optional decorative aluminum trim profiles',
      tr: 'Yapısal montaj yapıştırıcısı + alüminyum dekoratif çıtalar'
    },
    steps: {
      ar: [
        'فحص الجدار وتسوية النتوءات لضمان التصاق متجانس للمساحة الكبيرة (122×240 سم).',
        'قص لوح بديل الرخام بمشرط حاد (Cutter) أو منشار قرصي ناعم، وفتح مخارج الأفياش والكهرباء بدقة.',
        'توزيع السيليكون الإنشائي القوي على كامل ظهر اللوح بشكل شبكي متقاطع لتوزيع الحمل بالتساوي.',
        'رفع اللوح وتثبيته على الجدار والضغط بواسطة رول ضغط مطاطي لإخراج أي هواء محبوس، مع استخدام فواصل الألمنيوم التزيينية بين الألواح إن وُجدت.',
        'إزالة فيلم الحماية الشفاف (Protective Film) بعد إتمام جميع أعمال التركيب والدهان.'
      ],
      en: [
        'Inspect and level the substrate to ensure seamless planar contact across the large 122×240 cm surface.',
        'Cut sheets with a heavy-duty scoring knife or circular saw, and route electrical outlet openings precisely.',
        'Dispense structural adhesive in an engineered cross-hatch grid pattern over the entire reverse side.',
        'Mount the panel onto the wall, roll with a firm rubber pressure roller from center outward, and seat any aluminum edge trims.',
        'Peel away the transparent surface protection film once surrounding construction/painting is fully finished.'
      ],
      tr: [
        'Geniş yüzey teması sağlamak için duvar yüzeyindeki pürüzleri temizleyin.',
        'Panelleri sert maket bıçağı veya daire testere ile kesin, priz deliklerini açın.',
        'Panel arkasına ızgara şeklinde güçlü montaj yapıştırıcısı sürün.',
        'Paneli duvara oturtarak hava boşluklarını gidermek için kauçuk rulo ile bastırın.',
        'Montaj işlemi tamamen bittikten sonra şeffaf koruyucu filmi çıkartın.'
      ]
    },
    tools: {
      ar: ['مشرط صناعي حاد أو منشار قرصي', 'رول ضغط مطاطي', 'سيليكون إنشائي فائق القوة', 'مسطرة معدنية طويلة ومتر قياس'],
      en: ['Heavy-duty cutter / circular saw', 'Rubber laminating roller', 'High-tack polymer adhesive', 'Long aluminum straightedge & tape'],
      tr: ['Ağır hizmet maket bıçağı', 'Kauçuk baskı rulosu', 'Güçlü montaj yapıştırıcısı', 'Alüminyum mastar ve metre']
    },
    proTip: {
      ar: 'نصيحة المهندس: لا تنزع فيلم الحماية البلاستيكي الشفاف عن وجه اللوح إلا بعد الانتهاء التام من تثبيت جميع الديكورات المجاورة لتفادي أي خدش سطحي أثناء العمل.',
      en: 'Architectural Tip: Do not peel off the clear surface protective film until all adjacent trades and fixtures are completed to avoid accidental scuffs.',
      tr: 'Mimarın Tavsiyesi: Yüzeyin çizilmemesi için koruyucu naylonu tüm montaj ve yan işler bittikten sonra sökün.'
    }
  },

  // 3. بديل الشيبورد الحجري (SPC Wall Panels)
  {
    id: 'spc_wall',
    categoryId: 'spc_wall',
    categoryName: {
      ar: 'بديل الشيبورد الحجري (SPC Wall Panels)',
      en: 'SPC Wall Panels',
      tr: 'SPC Duvar Panelleri'
    },
    subtitle: {
      ar: 'ألواح حجرية بوليميرية صلبة فائقة القوة ومقاومة 100% للانتفاخ والماء بديلة للخشب المضغوط',
      en: 'Heavy-duty rigid stone-polymer composite boards with zero water absorption',
      tr: 'Suda asla şişmeyen yüksek yoğunluklu sert taş kompozit duvar panelleri'
    },
    badge: {
      ar: 'فيديو تطبيق بديل الشيبورد الحجري',
      en: 'SPC Wall Panels Video',
      tr: 'SPC Duvar Paneli Videosu'
    },
    videoTitle: {
      ar: 'طريقة وخطوات تطبيق وتركيب بديل الشيبورد الحجري (SPC Wall Panels)',
      en: 'Installation Walkthrough: Heavy-Duty SPC Wall Panels',
      tr: 'SPC Taş Kompozit Duvar Panelleri Uygulama ve Montaj Kılavuzu'
    },
    videoEmbedUrl: 'https://www.youtube.com/embed/4nZ1mbiGysw?si=0A4C1cT59ov8AyF_',
    youtubeId: '4nZ1mbiGysw',
    categoryImage: '/uploads/1790748263995_spcwallpanelbirlikcompany.jpg',
    dimensions: '96 cm × 280 cm',
    thickness: '4.0 mm - 5.0 mm',
    installationMethod: {
      ar: 'تثبيت مباشر بالغراء على الجدران الخرسانية أو الهياكل الخشبية والمعدنية',
      en: 'Direct structural adhesive fixing to plastered walls or stud framing',
      tr: 'Doğrudan duvara veya karkasa montaj yapıştırıcısı ile sabitleme'
    },
    steps: {
      ar: [
        'التحقق من جفاف الجدار وصلابته أو تجهيز الهيكل المعدني/الخشبي الداعم.',
        'قص اللوح بمقاس الارتفاع المطلوب (حتى 280 سم) باستخدام منشار قرصي مخصص للبوليمير الحجري.',
        'تطبيق غراء السيليكون الإنشائي عالي المرونة على ظهر اللوح مع ترك مسافات تهوية بين الخطوط.',
        'رفع اللوح وتثبيته في موضعه وضغطه بشكل متزن، والتحقق من الاستقامة بواسطة ميزان الليزر.',
        'يمكن استخدام قواطع وأشرطة تزيينية أو ترك الفواصل ناعمة ومدمجة لمظهر عصري متجانس.'
      ],
      en: [
        'Verify wall substrate integrity and moisture dryness, or prepare wood/metal stud framing.',
        'Cut panels to length (up to 280 cm) using a carbide-tipped circular saw blade suited for dense stone composites.',
        'Apply high-elasticity structural polymer adhesive to panel back in continuous vertical beads.',
        'Position the panel, press firmly against substrate, and check squareness with a laser guide.',
        'Incorporate decorative transition extrusions or micro-bevel butt joints as desired.'
      ],
      tr: [
        'Duvarın sağlamlığını ve nem durumunu kontrol edin veya profilleri hazırlayın.',
        'Panelleri uygun elmas uçlu daire testere ile istenilen boya (280 cm’ye kadar) kesin.',
        'Panelin arka kısmına dikey şeritler halinde güçlü montaj yapıştırıcısı sıkın.',
        'Paneli hizalayarak duvara yerleştirin ve terazi kontrolü eşliğinde bastırın.'
      ]
    },
    tools: {
      ar: ['منشار كهربائي بقرص كربيدي', 'ميزان ليزر', 'غراء بوليميري مخصص للحجر والـ SPC', 'أدوات قياس وزوايا حديدية'],
      en: ['Carbide circular saw', 'Laser alignment level', 'Heavy-duty polymer SPC adhesive', 'Steel square and tape measure'],
      tr: ['Elmas uçlu daire testere', 'Lazer hizalama', 'SPC montaj yapıştırıcısı', 'Çelik gönye ve metre']
    },
    proTip: {
      ar: 'نصيحة المهندس: ألواح SPC الحجرية متينة جداً ولا تتأثر بالرطوبة مطلقاً، مما يجعلها مثالية لتجاليد الحمامات، خلفيات المغاسل، والمطابخ دون خوف من التمدد أو الانتفاخ.',
      en: 'Architectural Tip: SPC rigid core is 100% moisture-impervious, making it the supreme choice for kitchens, wet bathrooms, and high-wear corporate lobbies.',
      tr: 'Mimarın Tavsiyesi: SPC malzeme kesinlikle nemden etkilenmez, bu nedenle banyo, mutfak ve lavabo arkaları için idealdir.'
    }
  },

  // 4. بديل الباركيه (SPC Flooring)
  {
    id: 'spc_flooring',
    categoryId: 'spc_flooring',
    categoryName: {
      ar: 'بديل الباركيه (SPC Flooring)',
      en: 'SPC Flooring',
      tr: 'SPC Zemin Kaplaması'
    },
    subtitle: {
      ar: 'أرضيات حجرية متطورة بنظام كليك (Click Lock) ذكي مع طبقة IXPE عازلة للصوت وبدون صمغ',
      en: 'Rigid-core stone click parquet with integrated acoustic IXPE underlayment (no glue)',
      tr: 'Entegre IXPE ses yalıtımlı ve yapıştırıcısız geçmeli kilitli taş parke'
    },
    badge: {
      ar: 'فيديو تطبيق بديل الباركيه',
      en: 'SPC Flooring Video',
      tr: 'SPC Zemin Uygulama Videosu'
    },
    videoTitle: {
      ar: 'طريقة وخطوات تركيب أرضيات بديل الباركيه الحجري بنظام كليك (SPC Flooring)',
      en: 'Step-by-Step Installation: SPC Click-Lock Floating Floor',
      tr: 'SPC Taş Parke Kilitli Sistem Montaj ve Uygulama Rehberi'
    },
    videoEmbedUrl: 'https://www.youtube.com/embed/0gYVmiqxfPo?si=hWFS6ACHZ0gygf6x',
    youtubeId: '0gYVmiqxfPo',
    categoryImage: '/uploads/1790748266514_spcflooringbirlikcompany.jpg',
    dimensions: '30.3 cm × 60.6 cm',
    thickness: '5.0 mm - 5.5 mm (4.5 مم + 1.0 مم IXPE)',
    installationMethod: {
      ar: 'تركيب عائم بدون غراء بنظام التعشيق الذكي (Click Lock) مع طبقة IXPE العازلة المدمجة',
      en: 'Floating floor installation without adhesives via precision click-lock edge profile',
      tr: 'Tutkalsız, kilitli sistem yüzer zemin montajı (entegre IXPE şilte)'
    },
    steps: {
      ar: [
        'تنظيف الأرضية الخرسانية أو البلاط القديم والتأكد من استواء السطح التام (فروق أقل من 2 مم).',
        'تأقلم الصناديق في الغرفة لمدة 24 ساعة قبل البدء بدرجة حرارة الغرفة الطبيعية.',
        'وضع أول قطعة في زاوية الغرفة مع وضع فواصل تمدد (Expansion Spacers) بسماكة 6-8 مم على الجدران.',
        'إدخال لسان القطعة التالية بزاوية 20-30 درجة ثم ضغطها للأسفل حتى تسمع صوت التعشيق (Click)، والنقر برفق باستخدام مطرقة مطاطية وكتلة الطرق.',
        'قص القطع الأخيرة في كل صف بقلب اللوح ووضع علامة القص، واستئناف الصف التالي بالقطعة المتبقية.',
        'إزالة فواصل التمدد بعد الانتهاء وتغطية الفجوة بنعلات بي إس (PS Baseboards) الأنيقة.'
      ],
      en: [
        'Ensure the subfloor (concrete or existing tile) is clean, fully dry, and level within 2 mm tolerance.',
        'Acclimate unopened cartons inside the installation space for 24 hours at room temperature.',
        'Lay the first plank in a corner with 6-8 mm expansion spacers positioned against perimeter walls.',
        'Insert the tongue of each subsequent plank at a 20-30° angle, push down firmly until it clicks, and tap lightly with a rubber mallet and tapping block.',
        'Score and snap or cut the end piece to finish the row, then use the remainder to begin the next staggered row.',
        'Remove perimeter spacers upon completion and conceal the expansion boundary with architectural baseboards.'
      ],
      tr: [
        'Zeminin düz, kuru ve temiz olduğundan emin olun (2 mm tolerans).',
        'Kutuları montaj yapılacak odada 24 saat bekletin.',
        'İlk parkeyi duvardan 6-8 mm genleşme boşluğu bırakacak takozlarla yerleştirin.',
        'Sonraki parçaları 20-30 derece açıyla kilit yuvasına geçirip kauçuk tokmakla hafifçe oturtun.',
        'Montaj bittikten sonra takozları çıkarıp süpürgelik ile kenar boşluklarını kapatın.'
      ]
    },
    tools: {
      ar: ['مطرقة مطاطية (Rubber Mallet)', 'كتلة طرق (Tapping Block)', 'فواصل تمدد 6-8 مم', 'مشرط أو منشار قص دقيق', 'شريط قياس ومثلث زاوية'],
      en: ['Rubber mallet', 'Tapping block', 'Perimeter expansion spacers (6-8 mm)', 'Heavy utility knife or jigsaw', 'Measuring tape & speed square'],
      tr: ['Kauçuk tokmak', 'Parke takozu', 'Genleşme takozları', 'Maket bıçağı veya dekupaj testere', 'Şerit metre ve gönye']
    },
    proTip: {
      ar: 'نصيحة المهندس: لا تستخدم الغراء إطلاقاً مع بديل الباركيه SPC! الأرضية تعتمد على نظام التعشيق العائم وطبقة IXPE العازلة توفر كتم الصوت وراحة المشي تلقائياً.',
      en: 'Architectural Tip: Never apply glue to click-lock SPC! It is designed as a floating floor, and the integrated IXPE acoustic backing provides sound deadening and comfort without extra foam.',
      tr: 'Mimarın Tavsiyesi: SPC parkede kesinlikle tutkal kullanmayın. Kilitli sistem yüzer zemin mantığıyla çalışır ve entegre IXPE katmanı ses izolasyonu sağlar.'
    }
  },

  // 5. قُضبان بي إس (PS Wall Slaths)
  {
    id: 'ps_slats',
    categoryId: 'ps_slats',
    categoryName: {
      ar: 'قُضبان بي إس (PS Wall Slaths)',
      en: 'PS Wall Slaths',
      tr: 'PS Duvar Çıtaları ve Profilleri'
    },
    subtitle: {
      ar: 'بانوهات وقُضبان جدارية عالية الدقة لتصميم إطارات فرنسية كلاسيكية وتجاليد عصرية',
      en: 'Precision architectural polystyrene moldings & wainscoting frames',
      tr: 'Fransız tarzı çıtalama ve estetik duvar profilleri'
    },
    badge: {
      ar: 'فيديو تطبيق قُضبان بي إس',
      en: 'PS Slaths Application Video',
      tr: 'PS Çıta Uygulama Videosu'
    },
    videoTitle: {
      ar: 'طريقة وخطوات قص وتصميم وتركيب قُضبان بي إس الجدارية (PS Wall Slaths)',
      en: 'Design, Miter Cutting & Installation: PS Wall Slaths & Moldings',
      tr: 'PS Duvar Çıtaları ve Panoları Kesim ve Montaj Kılavuzu'
    },
    videoEmbedUrl: 'https://www.youtube.com/embed/SPZ2marfnMc?si=-qp7movQnPTWSR2l',
    youtubeId: 'SPZ2marfnMc',
    categoryImage: '/uploads/1790748269192_pswallslathsbirlikcompany.jpg',
    dimensions: '1.5 cm - 10 cm × 240 cm',
    thickness: '10 mm - 20 mm',
    installationMethod: {
      ar: 'قص زوايا 45 درجة بصندوق زوايا أو منشار مائل + لصق بغراء فوري وسيليكون إنشائي',
      en: '45-degree precision miter cuts + rapid bonding adhesive & structural silicone',
      tr: '45 derece gönye kesim + hızlı yapıştırıcı ve montaj silikonu'
    },
    steps: {
      ar: [
        'تخطيط أبعاد البانوهات والإطارات على الجدار مسبقاً باستخدام ميزان الليزر والقلم الرصاص لضمان تناظر مثالي.',
        'قص زوايا القُضبان بزاوية 45 درجة تماماً باستخدام منشار زوايا (Miter Saw) للحصول على أركان مغلقة ونظيفة.',
        'تطبيق نقاط غراء فوري (Super Glue مع المسرّع) في الزوايا، مع سيليكون إنشائي قوي على طول ظهر القضيب.',
        'تثبيت القضيب بدقة على الخط المرسوم والضغط لمدة 10-15 ثانية، ويمكن استخدام مسامير هواء رفيعة بدون رأس إن رغبت.',
        'ملء أي فواصل زاوية دقيقة بمعجون أكريليكي ومسح الزوائد بإسفنجة رطبة.'
      ],
      en: [
        'Map out frame dimensions and symmetry across the wall using a laser level and pencil guidelines.',
        'Cut profile corners at a precise 45° angle with a miter saw for seamless corner joints.',
        'Apply rapid cyanocrylate glue with activator at joint edges and structural polymer silicone along the spine.',
        'Position profile strictly along the laser guideline and hold firmly for 10-15 seconds (micro-pin nails optional).',
        'Touch up corner joints with paintable acrylic caulk and wipe flush with a damp sponge.'
      ],
      tr: [
        'Lazer terazi ile duvarda çıta çerçeve ölçülerini ve simetrisini kalemle çizin.',
        'Köşe birleşimleri için çıtaları gönye testere ile tam 45 derece açıyla kesin.',
        'Köşelere hızlı yapıştırıcı ve çıta arkasına montaj silikonu uygulayın.',
        'Çizgiye göre duvara yapıştırıp 10-15 saniye basılı tutun.',
        'Köşe birleşim yerlerine akrilik mastik uygulayarak nemli süngerle düzeltin.'
      ]
    },
    tools: {
      ar: ['منشار زوايا 45 درجة (صندوق زوايا أو كهربائي)', 'ميزان ليزر للخطوط المتقاطعة', 'غراء لاصق سريع مع بخاخ مسرّع', 'معجون فواصل أكريليكي ناعم'],
      en: ['Miter saw or miter box with fine back saw', 'Cross-line laser level', 'Instant adhesive with activator spray', 'Paintable acrylic caulk'],
      tr: ['45 derece gönye testere', 'Çapraz lazer terazi', 'Hızlı yapıştırıcı ve aktivatör sprey', 'Akrilik mastik']
    },
    proTip: {
      ar: 'نصيحة المهندس: سر جمال قُضبان بي إس هو دقة التخطيط الهندسي المسبق وتناظر المسافات بين الإطارات (يُفضل ترك 10 إلى 15 سم متساوية بين كل إطار والآخر).',
      en: 'Architectural Tip: Symmetry is key to luxurious wainscoting. Maintain consistent 10-15 cm spacing between all outer frames, baseboards, and ceiling moldings.',
      tr: 'Mimarın Tavsiyesi: Çıtalama sanatında estetiğin sırrı simetridir. Çerçeveler arasında eşit (10-15 cm) mesafeler bırakın.'
    }
  },

  // 6. نعلات بي إس (PS Baseboards)
  {
    id: 'ps_baseboards',
    categoryId: 'ps_baseboards',
    categoryName: {
      ar: 'نعلات بي إس (PS Baseboards)',
      en: 'PS Baseboards',
      tr: 'PS Süpürgelikler'
    },
    subtitle: {
      ar: 'نعلات بوليميرية متينة مقاومة للماء والضربات مع قنوات مدمجة لتمديد كابلات أو إضاءات LED',
      en: 'Impact & water-proof architectural skirtings with integrated wire and LED channels',
      tr: 'Darbe ve suya tam dayanıklı, kablo ve LED kanallı mimari süpürgelikler'
    },
    badge: {
      ar: 'فيديو تطبيق نعلات بي إس',
      en: 'PS Baseboards Application Video',
      tr: 'PS Süpürgelik Uygulama Videosu'
    },
    videoTitle: {
      ar: 'طريقة وخطوات تركيب نعلات بي إس المقاومة للماء ومجرى الليد (PS Baseboards)',
      en: 'Installation Guide & Video: PS High-Density Baseboards & LED Skirting',
      tr: 'PS Süpürgelik ve LED Kanalı Montaj ve Uygulama Rehberi'
    },
    videoEmbedUrl: 'https://www.youtube.com/embed/TmHRwLfY3VE?si=WRhI4j6qmUV3pLEC',
    youtubeId: 'TmHRwLfY3VE',
    categoryImage: '/uploads/1790748270465_psbaseboardbirlikcompany.jpg',
    dimensions: '10 cm - 11.5 cm × 240 cm',
    thickness: '12 mm - 15 mm',
    installationMethod: {
      ar: 'تثبيت بالسيليكون الإنشائي القوي أسفل الجدار مع قص زوايا الأركان 45 درجة',
      en: 'Structural silicone adhesive bonding along the floor-wall boundary with 45° corner miters',
      tr: 'Duvar eteğine güçlü montaj silikonu ile sabitleme ve 45 derece köşe birleşimleri'
    },
    steps: {
      ar: [
        'تنظيف منطقة أسفل الجدار والتأكد من جفافها واستوائها مع الأرضية المركبة (مثل بديل الباركيه).',
        'قياس أطوال الجدران وقص النعلات، وقص الزوايا الداخلية والخارجية بزاوية 45 درجة للحصول على مظهر متصل وأنيق.',
        'توزيع السيليكون البوليميري الإنشائي على ظهر النعلة بخطوط مستمرة على الحافتين العلوية والسفلية (دون سد مجرى الكابلات الداخلي).',
        'ضغط النعلة بإحكام على الجدار والأرضية لضمان تغطية فجوة التمدد تماماً وتثبيتها بشكل مستقيم.',
        'إغلاق الفاصل العلوي بين النعلة والجدار بمعجون سيليكوني أو أكريليكي بلون مناسب لمظهر احترافي فائق الإتقان.'
      ],
      en: [
        'Clean the wall base zone and verify it accommodates the perimeter floor expansion boundary (e.g. over SPC flooring).',
        'Measure perimeter wall lengths and miter all internal and external corners at 45° for seamless architectural joints.',
        'Apply continuous beads of structural polymer adhesive along upper and lower back contact ribs, avoiding wire channels.',
        'Press the skirting firmly against wall and subfloor, ensuring complete coverage of the perimeter gap.',
        'Caulk the subtle top edge seam with a color-matched paintable acrylic seal for a seamless, professional finish.'
      ],
      tr: [
        'Duvar dibini temizleyin ve zemin genleşme payının düzgün kaldığından emin olun.',
        'Duvar boylarını ölçün ve iç/dış köşeleri 45 derece gönye ile kesin.',
        'Süpürgelik arkasındaki temas yüzeylerine dikey veya yatay montaj silikonu uygulayın.',
        'Süpürgeliği duvara ve zemine doğru sıkıca bastırarak sabitleyin.',
        'Üst birleşim çizgisine ince akrilik mastik çekerek kusursuz bir bitiş elde edin.'
      ]
    },
    tools: {
      ar: ['منشار زوايا (Miter Saw)', 'فرد سيليكون مع غراء لاصق قوي', 'متر قياس دقيق', 'معجون أكريليكي للفاصل العلوي'],
      en: ['Precision miter saw', 'Caulking gun with structural polymer adhesive', 'Measuring tape and pencil', 'Paintable acrylic top-gap caulk'],
      tr: ['Gönye testere', 'Montaj tabancası ve güçlü yapıştırıcı', 'Şerit metre', 'Akrilik mastik']
    },
    proTip: {
      ar: 'نصيحة المهندس: في موديل النعلات المجهزة بمجرى إضاءة LED، قم بتمديد شريط الليد والأسلاك قبل التثبيت النهائي للوح لضمان إضاءة مخفية ساحرة دون أي أسلاك ظاهرة.',
      en: 'Architectural Tip: For LED-ready skirting models, thread the LED flex strip and low-voltage wiring through the recessed chase before final bonding for an immaculate glow.',
      tr: 'Mimarın Tavsiyesi: LED kanallı süpürgeliklerde LED şeridini ve kabloları son yapıştırmadan önce kanala yerleştirin.'
    }
  }
];
