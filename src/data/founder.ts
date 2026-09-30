export interface FounderProject {
  name: {
    ar: string;
    en: string;
    tr: string;
  };
  location: string;
  tag: {
    ar: string;
    en: string;
    tr: string;
  };
}

export interface FounderData {
  name: {
    ar: string;
    en: string;
    tr: string;
  };
  title: {
    ar: string;
    en: string;
    tr: string;
  };
  subtitle: {
    ar: string;
    en: string;
    tr: string;
  };
  formerRole: {
    ar: string;
    en: string;
    tr: string;
  };
  defaultImage: string;
  experienceYears: string;
  paragraphs: {
    ar: string[];
    en: string[];
    tr: string[];
  };
  projects: FounderProject[];
  keyHighlights: {
    ar: { label: string; desc: string }[];
    en: { label: string; desc: string }[];
    tr: { label: string; desc: string }[];
  };
}

export const FOUNDER_DATA: FounderData = {
  name: {
    ar: 'المهندس يوسف حداد',
    en: 'Eng. Youssef Haddad',
    tr: 'Müh. Youssef Haddad'
  },
  title: {
    ar: 'مؤسس ورئيس مجلس إدارة شركة بيرليك',
    en: 'Founder & Chief Executive Officer',
    tr: 'Kurucu ve İcra Kurulu Başkanı (CEO)'
  },
  subtitle: {
    ar: 'رائد أعمال وخبير هندسي في الإنشاءات الفاخرة وتوريد مواد الإكساء المعماري',
    en: 'Visionary Entrepreneur & Specialist in Luxury Architecture & Finishing Logistics',
    tr: 'Lüks Mimarlık, İnşaat ve Yüzey Kaplama Tedariğinde Öncü Girişimci'
  },
  formerRole: {
    ar: 'المؤسس والرئيس التنفيذي لشركة "سما تشييد للمقاولات" — جدة، المملكة العربية السعودية',
    en: 'Founder & CEO of "Sama Tasheed Contracting" — Jeddah, Kingdom of Saudi Arabia',
    tr: '"Sama Tasheed Contracting" Kurucu & CEO — Cidde, Suudi Arabistan'
  },
  // Founder executive portrait
  defaultImage: '/founder.jpg',
  experienceYears: '+20',
  paragraphs: {
    ar: [
      'تأسست شركتنا على يد المهندس يوسف حداد، وهو رائد أعمال يمتلك رؤية سديدة وخبرة تمتد لأكثر من عقدين في قطاع الإنشاءات الفاخرة في الشرق الأوسط. قبل توجهه إلى قطاع توريد مواد الإكساء، شغل السيد يوسف منصب المؤسس والرئيس التنفيذي لشركة "سما تشييد للمقاولات" في مدينة جدة بالمملكة العربية السعودية؛ حيث قاد هناك تنفيذ الأعمال الإنشائية المعقدة، والواجهات الزجاجية المتطورة، والتشطيبات الفاخرة لعدد من أبرز المعالم الأيقونية في الخليج، ومنها: فندق شانغريلا جدة، وفندق أصيلة، والبنك السعودي الفرنسي، بالإضافة إلى تجهيز وتطوير الفروع والمرافق التجارية لسلسلة مطاعم كودو الشهيرة.',
      'من خلال إشرافه المباشر على هذه المشاريع العالمية الضخمة، تولّد لديه شغف واهتمام متزايد بتطوير مواد الديكور والتصميم الداخلي والبحث عن أفضل حلول الإكساء المعماري. وإدراكاً منه للحاجة المتنامية في السوق لحلول تشطيب راقية وموثوقة، انتقل من مرحلة البناء إلى مرحلة التوريد اللوجستي، حيث قام بتأسيس شركة بيرليك في تركيا عام 2019. وتحت قيادته، نجحت الشركة سريعاً في إثبات مكانتها كمورد إقليمي موثوق، يدعم المصممين والمعماريين بأحدث مواد الترميم والتجديد الداخلي في المنطقة.',
      'وفي عام 2026، واسترشاداً برغبته الصادقة في ترك أثر إيجابي حقيقي، قام بتأسيس فرع شركة بيرليك الرسمي في سوريا، ليكون شريكاً فعالاً ومساهماً أساسياً في مرحلة إعادة الإعمار. يضع السيد يوسف حداد اليوم حصيلة عقود من الخبرة الهندسية الخليجية وشبكة التوريد التركية القوية في خدمة السوق السوري، لتمكين المطورين، المهندسين، وأصحاب المشاريع من الحصول على مواد إكساء ذات معايير عالمية تساهم في بناء مستقبل سوري حديث ومزدهر'
    ],
    en: [
      'Our company was founded by Engineer Youssef Haddad, a visionary entrepreneur with over two decades of distinguished experience in the luxury construction and architectural sector across the Middle East. Prior to transitioning into the architectural finishing and material supply sector, Mr. Youssef served as the Founder and CEO of "Sama Tasheed Contracting" in Jeddah, Kingdom of Saudi Arabia. There, he spearheaded the execution of complex structural works, advanced architectural glass facades, and ultra-luxury interior finishes for several of the Gulf\'s most iconic landmarks, including: Shangri-La Hotel Jeddah, Assila Hotel, Banque Saudi Fransi, as well as outfitting and developing commercial branches and facilities for the renowned Kudu restaurant chain.',
      'Through his direct leadership on these prestigious mega-projects, he developed a deep passion for innovative interior decorative materials and the pursuit of optimal architectural claddings. Recognizing the growing regional demand for reliable, premium interior solutions, he transitioned from construction execution to supply chain and manufacturing logistics, establishing Birlik Company in Turkey in 2019. Under his leadership, the company rapidly solidified its reputation as a trusted regional supplier, empowering architects and interior designers with cutting-edge materials for modern renovation and interior design.',
      'In 2026, guided by a heartfelt dedication to making a tangible positive impact, he established the official branch of Birlik Company in Syria to serve as an active partner and vital contributor to the nation\'s reconstruction era. Today, Eng. Youssef Haddad places decades of Gulf engineering excellence and a robust Turkish supply network at the service of the Syrian market, enabling developers, architects, and project owners to access world-class architectural surfaces that contribute to building a modern and prosperous Syrian future.'
    ],
    tr: [
      'Şirketimiz, Orta Doğu\'daki lüks inşaat ve mimarlık sektöründe yirmi yılı aşkın köklü bir tecrübeye ve vizyona sahip olan Mühendis Youssef Haddad tarafından kurulmuştur. Yapı kaplama ve dekorasyon malzemeleri tedarik sektörüne adım atmadan önce, Suudi Arabistan\'ın Cidde kentinde "Sama Tasheed Contracting" şirketinin Kurucu ve İcra Kurulu Başkanı (CEO) olarak görev yapmıştır. Burada aralarında Shangri-La Hotel Cidde, Assila Hotel, Banque Saudi Fransi\'nin yanı sıra ünlü Kudu restoran zincirinin ticari şube ve tesislerinin geliştirilmesi ve donatılması gibi Körfez\'in en seçkin simge projelerinin karmaşık yapı işlerini, ileri teknoloji cam cephelerini ve üst düzey lüks ince yapı uygulamalarını başarıyla yönetmiştir.',
      'Bu uluslararası devasa projeleri bizzat yönetmesi sonucunda, iç mekan tasarımı, dekoratif yüzeyler ve en yenilikçi mimari kaplama çözümlerine yönelik derin bir ilgi ve tutku geliştirdi. Pazarda yüksek kaliteli, güvenilir kaplama çözümlerine duyulan artan ihtiyacı görerek inşaat uygulamasından lojistik tedarik aşamasına geçti ve 2019 yılında Türkiye\'de Birlik Şirketi\'ni kurdu. Liderliğinde şirket, bölgedeki mimar ve tasarımcılara en yeni renovasyon ve dekorasyon malzemelerini sağlayan güvenilir bölgesel bir tedarikçi olarak hızla konumunu güçlendirdi.',
      '2026 yılında, samimi bir pozitif değer üretme arzusuyla hareket ederek, ülkenin yeniden inşa sürecine etkin bir ortak ve temel katkı sağlayıcı olmak amacıyla Birlik Şirketi\'nin Suriye\'deki resmi şubesini açtı. Mühendis Youssef Haddad bugün, Körfez\'deki onlarca yıllık mühendislik tecrübesini ve Türkiye\'deki güçlü tedarik zincirini Suriye pazarına sunarak; geliştiricilerin, mimarların ve proje sahiplerinin modern ve müreffeh bir geleceğin inşasına katkı sağlayacak dünya standartlarında kaplama malzemelerine ulaşmasını sağlamaktadır.'
    ]
  },
  projects: [
    {
      name: {
        ar: 'فندق شانغريلا جدة (برج أصيلة)',
        en: 'Shangri-La Hotel Jeddah (Assila Tower)',
        tr: 'Shangri-La Hotel Cidde (Assila Kulesi)'
      },
      location: 'Jeddah, Saudi Arabia',
      tag: {
        ar: 'واجهات زجاجية وأعمال معمارية فائقة الفخامة',
        en: 'Advanced Facades & Luxury Finishes',
        tr: 'İleri Cam Cephe & Lüks İnce Yapı'
      }
    },
    {
      name: {
        ar: 'فندق أصيلة — جدة',
        en: 'Assila Hotel Jeddah',
        tr: 'Assila Hotel Cidde'
      },
      location: 'Jeddah, Saudi Arabia',
      tag: {
        ar: 'أعمال إنشائية وتشطيبات داخلية راقية',
        en: 'Structural Works & Ultra-Luxury Interiors',
        tr: 'Yapısal İnşaat & Lüks İç Mekan'
      }
    },
    {
      name: {
        ar: 'البنك السعودي الفرنسي',
        en: 'Banque Saudi Fransi',
        tr: 'Banque Saudi Fransi'
      },
      location: 'Kingdom of Saudi Arabia',
      tag: {
        ar: 'مشاريع مؤسسية ومعالم مصرفية مرموقة',
        en: 'Major Institutional & Banking Headquarters',
        tr: 'Kurumsal Bankacılık ve Merkez Binaları'
      }
    },
    {
      name: {
        ar: 'سما تشييد للمقاولات (جدة)',
        en: 'Sama Tasheed Contracting (Jeddah)',
        tr: 'Sama Tasheed Contracting (Cidde)'
      },
      location: 'Jeddah, Saudi Arabia',
      tag: {
        ar: 'المؤسس والرئيس التنفيذي للشركة',
        en: 'Founder & Chief Executive Officer',
        tr: 'Kurucu ve İcra Kurulu Başkanı'
      }
    }
  ],
  keyHighlights: {
    ar: [
      { label: 'عقدان من الخبرة الخليجية', desc: 'إشراف مباشر وتنفيذ معالم أيقونية كبرى في المملكة العربية السعودية' },
      { label: 'من البناء إلى التوريد (2019)', desc: 'تأسيس شركة بيرليك في تركيا وتطوير سلاسل إمداد مواد الإكساء المتطورة' },
      { label: 'شريك إعادة الإعمار (2026)', desc: 'تأسيس الفرع الرسمي في سوريا لتمكين المطورين من خامات عالمية المستوى' }
    ],
    en: [
      { label: '2+ Decades of Gulf Leadership', desc: 'Direct execution of landmark architectural icons in Saudi Arabia' },
      { label: 'Evolution to Supply Logistics (2019)', desc: 'Establishing Birlik in Turkey to provide high-performance architectural materials' },
      { label: 'Partner in Syria’s Reconstruction (2026)', desc: 'Founding the official Syria branch to equip architects with world-class surfaces' }
    ],
    tr: [
      { label: 'Körfezde 20+ Yıl Liderlik', desc: 'Suudi Arabistan\'daki simge yapıların doğrudan yönetimi ve inşası' },
      { label: 'İnşaattan Tedariğe Geçiş (2019)', desc: 'Türkiye\'de Birlik Şirketi\'nin kuruluşu ve yüksek kaliteli malzeme ağı' },
      { label: 'Yeniden İnşanın Öncü Ortağı (2026)', desc: 'Suriye resmi şubesinin açılarak uluslararası standartların ülkeye kazandırılması' }
    ]
  }
};
