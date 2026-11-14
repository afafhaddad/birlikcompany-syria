import type { ArticleContent } from './articles';

/** Price, comparison and problem articles (Turkish). Keys match ARTICLES[].key */
export const TOPICS_TR: Record<string, ArticleContent> = {
  cost: {
    label: 'Kaplama maliyeti',
    title: 'Suriye’de Duvar Kaplama Maliyeti Ne Kadar? Fiyatı Belirleyen Her Şey',
    description:
      'Suriye’de duvar ve zemin kaplama maliyeti için pratik rehber: PVC mermer panel, PS ahşap görünümlü panel ve SPC zemin fiyatını neler belirler, miktarı nasıl hesaplarsınız ve WhatsApp’tan kesin fiyatı nasıl alırsınız.',
    lead: 'Tadilat düşünen herkesin ilk sorusu: “Ne kadar tutar?”. Cevap birkaç net etkene bağlıdır; bunları bildiğinizde kimseyi aramadan projenizi tahmin edebilirsiniz. Bu rehberde fiyatı neyin belirlediğini, miktarın nasıl hesaplandığını ve hazır kaplamanın neden çoğu zaman geleneksel yöntemlerden daha ekonomik olduğunu anlatıyoruz.',
    sections: [
      {
        id: 'price',
        heading: 'Neden sitede fiyat yazmıyoruz?',
        paragraphs: [
          'Suriye’de yapı ve dekorasyon malzemesi fiyatları döviz kuruna ve fabrikadan nakliye maliyetine göre değişir, bazen birkaç hafta içinde. Sayfada sizi yanıltabilecek eski bir rakam bırakmak yerine kendi miktarınız için gerçek ve güncel fiyat vermeyi tercih ediyoruz.',
          'İyi haber şu: miktarı hesaplamak çok kolay. Kaç panele ihtiyacınız olduğunu öğrendiğinizde fiyat tek bir WhatsApp mesajı uzağınızdadır. Büyük miktarlarda metrekare fiyatı genellikle daha iyidir.',
        ],
      },
      {
        id: 'what',
        heading: 'Maliyeti neler belirler?',
        paragraphs: ['Son faturada farkı yaratan etkenler, en etkiliden en aza doğru:'],
        bullets: [
          'Gerçek alan: kapı ve pencereler düşülmüş duvar ya da zemin alanı, artı kesim firesi için yaklaşık %10.',
          'Malzeme: PVC mermer panel, PS ahşap panel, SPC duvar paneli veya SPC zemin; her birinin m² fiyatı farklıdır.',
          'Model ve yüzey: bazı parlak, altın damarlı veya daha kalın paneller temel desenlerden daha pahalıdır.',
          'Aksesuarlar: silikon veya yapıştırıcı, köşe ve bitiş profilleri, çıta ve süpürgelik, istenirse LED aydınlatma.',
          'Duvarın durumu: düz duvar hiçbir şey istemez; çok eğri duvar hafif düzeltme veya basit bir karkas gerektirebilir.',
          'Montaj: usta ücreti genellikle alana ve zorluğa göre hesaplanır ve fayans ya da mermer işçiliğinden çok daha düşüktür.',
          'Teslimat: tüm illere gönderiyoruz; ücret şehre ve sipariş büyüklüğüne göre değişir.',
        ],
      },
      {
        id: 'calc',
        heading: 'Miktarı kendiniz nasıl hesaplarsınız?',
        paragraphs: [
          'Duvar için: genişliği yükseklikle (metre) çarpın, kapı ve pencereleri çıkarın, sonucu bir panelin alanına bölün. PVC mermer panel 122 × 240 cm (yaklaşık 2,93 m²), SPC duvar paneli 96 × 280 cm’dir (yaklaşık 2,69 m²).',
          'Zemin için: uzunluğu genişlikle çarpın ve bir SPC karonun alanına bölün (30,3 × 60,6 cm, yaklaşık 0,18 m²). Her iki durumda da fire ve köşe kesimleri için %10 ekleyin. Aşağıdaki hesaplayıcı bunların hepsini sizin için yapar.',
        ],
      },
      {
        id: 'versus',
        heading: 'Hazır kaplama seramik ve mermerden ucuz mu?',
        paragraphs: [
          'Yalnızca metrekare fiyatını karşılaştırmayın. Seramik ve doğal taşta eski fayansın kırılması, molozun taşınması, çimento ve derz, uzun iş günleri ve sonrasında temizlik vardır. Hazır paneller ise çoğu zaman mevcut yüzeyin üzerine bir iki günde uygulanır.',
          'Bu yüzden metrekare fiyatı yakın olsa bile çoğu projede toplam maliyet daha düşüktür; üstelik tadilat sırasında evinizde toz ve dağınıklık olmadan yaşayabilirsiniz.',
        ],
      },
      {
        id: 'tips',
        heading: 'Tasarruf ipuçları',
        paragraphs: [
          'Dikkatli ölçün ve bize duvarın fotoğrafını gönderin; doğru ölçü fazla panel almanızı önler. Tüm miktarı tek seferde sipariş edin ki paneller aynı üretim partisinden ve aynı renk tonunda olsun. Malzemeleri akıllıca birleştirin: ana duvarda veya banyoda mermer panel, az görünen duvarlarda boya.',
          'Projeniz büyükse, örneğin bütün bir daire veya dükkânsa, mesajınızda belirtin; büyük siparişler genellikle daha iyi fiyat alır.',
        ],
      },
    ],
    compare: {
      ours: 'Hazır paneller (PVC / SPC / PS)',
      other: 'Geleneksel seramik ve mermer',
      rows: [
        ['Kırma ve moloz taşıma', 'Genellikle gerekmez', 'Gerekli ve masraflı'],
        ['Bir oda için süre', 'Bir iki gün', 'Bir hafta veya fazlası'],
        ['Ek malzeme', 'Sadece silikon ve yapıştırıcı', 'Çimento, derz, fayans yapıştırıcısı'],
        ['İşçilik', 'Daha düşük', 'Daha yüksek'],
        ['Sonraki bakım', 'Nemli bezle silme', 'Derz temizliği, kırık fayans değişimi'],
        ['Tadilat sırasında evde yaşamak', 'Mümkün, dağınıklık yok', 'Toz yüzünden zor'],
      ],
    },
  },

  pvc_vs_ceramic: {
    label: 'Mermer panel mi seramik mi?',
    title: 'PVC Mermer Panel mi Seramik mi? Banyo, Mutfak ve Salon İçin Dürüst Karşılaştırma',
    description:
      'Suriye’de PVC mermer duvar paneli ile seramiğin karşılaştırması: görünüm, su dayanımı, montaj hızı, toplam maliyet, dayanıklılık ve bakım; hangisi ne zaman daha iyi.',
    lead: 'Seramik on yıllardır Suriye’de standart tercih, ancak PVC mermer paneller özellikle tadilatta güçlü bir rakip oldu. Hangisi size uygun? İşte seramiği önerdiğimiz durumlar dahil dürüst bir karşılaştırma.',
    sections: [
      {
        id: 'what',
        heading: 'Temel fark',
        paragraphs: [
          'Seramik, çimento veya yapıştırıcıyla sabitlenen ve aralarına derz dolgusu yapılan küçük pişmiş kil karolardır. PVC mermer panel ise 122 × 240 cm ölçüsünde, UV katmanıyla korunan parlak baskılı mermer yüzeyli büyük bir levhadır ve doğrudan duvara yapıştırılır.',
          'Boyut ve sabitleme yöntemindeki bu fark diğer farkların çoğunu belirler: derz sayısı, montaj hızı ve kırma gerekip gerekmediği.',
        ],
      },
      {
        id: 'benefits',
        heading: 'Mermer panelin üstün olduğu durumlar',
        paragraphs: ['PVC mermer panel şu durumlarda daha akıllıca bir seçimdir:'],
        bullets: [
          'Banyo veya mutfakta eski fayansın üzerine kırmadan yenileme.',
          'Her 30 cm’de bir derz yerine kesintisiz damarlı lüks mermer görünümü istediğinizde.',
          'Zaman önemliyse: bütün bir oda bir iki günde.',
          'Yüzey nemi olan duvarlarda, çünkü panel su emmez.',
          'Hızlı ve düşük maliyetli yenileme gereken kiralık daire ve dükkânlar.',
          'Zamanla kararan ve küflenen derzden kaçınmak istediğinizde.',
        ],
      },
      {
        id: 'strength',
        heading: 'Seramiğin hâlâ daha iyi olduğu durumlar',
        paragraphs: [
          'Çok yoğun trafikli veya metal mobilyanın sürüklendiği zeminlerde sert karo, duvar panellerinden daha dayanıklıdır. Fırın veya ocağın hemen arkasındaki duvar yüksek ısıya dayanıklı malzeme ister; orada seramik veya cam öneriyoruz.',
          'Duvar bir sızıntı nedeniyle içeriden ıslaksa, su kaynağı onarılmadan ne seramik ne panel çözümdür. Normal daire zeminleri için ise suya dayanıklı SPC zemin, seramikten daha sıcak hissettiren mükemmel bir alternatiftir.',
        ],
      },
      {
        id: 'where',
        heading: 'Projeniz için nasıl seçersiniz?',
        paragraphs: [
          'Banyo: duvarlarda mermer veya SPC taş panel; zemin fayansı sağlamsa kalabilir ya da görece kuru alanlarda SPC ile kaplanabilir. Mutfak: duvarlarda mermer panel, fırının hemen arkasında ısıya dayanıklı malzeme.',
          'Salon ve yatak odası: vurgu duvarında veya TV arkasında mermer panel, modern bir görünüm için ahşap panellerle birlikte. Mekânın fotoğrafını gönderin, en uygun düzeni önerelim.',
        ],
      },
    ],
    compare: {
      ours: 'PVC mermer panel',
      other: 'Seramik',
      rows: [
        ['Eski fayans üzerine uygulama', 'Doğrudan mümkün', 'Genellikle kırma gerekir'],
        ['Derzler', 'Çok az (122 × 240 cm levha)', 'Her 30–60 cm’de bir'],
        ['Derz ve küf', 'Derz yok', 'Kararır, temizlik ister'],
        ['Montaj süresi', 'Bir iki gün', 'Yaklaşık bir hafta'],
        ['Yüksek ısı dayanımı', 'Ocaktan uzak tutulmalı', 'Mükemmel'],
        ['Lüks mermer görünümü', 'Kesintisiz damar, yüksek parlaklık', 'Karo boyutuyla sınırlı'],
      ],
    },
  },

  spc_vs_parquet: {
    label: 'SPC mi ahşap parke mi?',
    title: 'SPC Zemin mi Ahşap Parke (Laminat) mi? Suriye’deki Evler İçin Hangisi?',
    description:
      'Suriye’de SPC zemin ile ahşap parke ve laminatın karşılaştırması: su ve nem dayanımı, dayanıklılık, ses yalıtımı, fayans üzerine montaj, bakım ve hangisinin ne zaman seçileceği.',
    lead: 'Parke eve fayansın veremeyeceği bir sıcaklık katar, ama pek çok kişi ahşap veya laminatın ilk su dökülmesinde kabardığını gördü. SPC zemin tam bu sorunu çözmek için üretildi. İşte ayrıntılı fark.',
    sections: [
      {
        id: 'what',
        heading: 'SPC, laminat ve masif ahşap: fark ne?',
        paragraphs: [
          'Masif parke gerçek ahşaptır: güzel ama pahalı ve suya, neme duyarlı. Laminat, yani yaygın “parke”, sıkıştırılmış ahşap lif (HDF) gövde üzerine baskılı ahşap katmandır ve su ulaştığında kabaran bu ahşap gövdedir.',
          'SPC’nin gövdesi kireçtaşı tozu ve polimerden oluşur; serttir ve hiç su emmez, üzerinde dekor ve çizilmeye dayanıklı aşınma katmanı bulunur. SPC karolarımız 30,3 × 60,6 cm ölçüsünde ve 5–5,5 mm kalınlığındadır; bazı modellerde yapışık IXPE ses yalıtım altlığı vardır.',
        ],
      },
      {
        id: 'benefits',
        heading: 'İnsanlar neden SPC seçiyor?',
        paragraphs: ['SPC’yi Suriye’deki evler için uygun kılan özellikler:'],
        bullets: [
          '%100 su geçirmez: mutfak, koridor ve görece kuru banyolar için uygun.',
          'Sahil nemiyle veya günlük silmeyle kabarmaz, eğilmez.',
          'Düz mevcut fayans üzerine kırmadan ve yapıştırıcısız klik montaj.',
          'IXPE katmanı adım sesini azaltır ve fayanstan daha sıcak hissettirir.',
          'Çizilmeye ve lekeye dayanıklı, normal paspasla temizlenir.',
          'Aynı malzemede ahşap, taş ve mermer desenleri.',
        ],
      },
      {
        id: 'strength',
        heading: 'Dayanıklılık ve bakım',
        paragraphs: [
          'Taş gövde, SPC’yi ağır mobilya altında ve yaz–kış sıcaklık farklarında laminattan daha kararlı kılar. Yine de sandalye ve masa ayaklarına keçe koymanızı ve metal mobilyayı sürüklememenizi öneririz.',
          'Masif ahşap yıllar sonra zımparalanıp yenilenebilir; bu gerçek bir avantajdır. SPC ve laminat zımparalanamaz, ancak SPC sudan etkilenmediği için şeklini çok daha uzun korur.',
        ],
      },
      {
        id: 'where',
        heading: 'Hangisini seçmelisiniz?',
        paragraphs: [
          'Çocuğunuz veya evcil hayvanınız varsa, nemli bir sahil şehrinde yaşıyorsanız, salondan mutfağa ve koridora kesintisiz bir zemin istiyorsanız ya da fayansın üzerine inşaat işi olmadan uygulamak istiyorsanız SPC seçin.',
          'Bütçe geniş, oda her zaman kuru ve gerçek ahşap hissi istiyorsanız masif ahşap seçin. Laminat ise mutfak ve banyodan uzak, yalnızca kuru yatak odaları için ekonomik bir seçenektir.',
        ],
      },
    ],
    compare: {
      ours: 'SPC zemin',
      other: 'Laminat / masif ahşap',
      rows: [
        ['Su dayanımı', '%100 su geçirmez', 'Sızıntıda kabarır'],
        ['Mutfak ve koridor', 'Uygun', 'Önerilmez'],
        ['Fayans üzerine montaj', 'Doğrudan klik', 'Altlıkla mümkün; ahşap hazırlık ister'],
        ['Nemde boyut kararlılığı', 'Kararlı', 'Genleşir ve büzülür'],
        ['Zımparayla yenileme', 'Mümkün değil', 'Yalnızca masif ahşapta'],
        ['Maliyet', 'Orta', 'Laminat daha düşük, masif çok daha yüksek'],
      ],
    },
  },

  ps_vs_wallpaper: {
    label: 'Ahşap panel mi duvar kâğıdı mı?',
    title: 'PS Ahşap Görünümlü Panel mi Duvar Kâğıdı mı? Hangisi Daha Uzun Ömürlü ve Şık',
    description:
      'Suriye’de PS ahşap görünümlü duvar paneli ile duvar kâğıdının karşılaştırması: 3D görünüm, nem dayanımı, kullanım ömrü, duvar kusurlarını gizleme, montaj ve uzun vadeli maliyet.',
    lead: 'Duvar kâğıdı bir odayı değiştirmenin hızlı ve ucuz yoludur, ama nemli evlerde bir iki mevsimde kalkmaya başlar. PS ahşap paneller yıllarca dayanan bir vurgu duvarı oluşturur. Gerçek fark nedir ve duvar kâğıdı ne zaman yeterlidir?',
    sections: [
      {
        id: 'what',
        heading: 'Tamamen farklı iki malzeme',
        paragraphs: [
          'Duvar kâğıdı, tamamen düz bir duvara yapıştırılan ince baskılı kâğıt veya vinil katmandır. PS ahşap paneller ise 9–15 mm kalınlığında, 12–16 cm genişliğinde ve 290 cm uzunluğunda, ahşabı taklit eden oluklu 3D yüzeyli polistiren levhalardır; silikon ve gizli geçme sistemiyle sabitlenir.',
          'Yani duvar kâğıdı duvardaki bir resimdir; ahşap panel ise görebildiğiniz ve dokunabildiğiniz, ışıkla gölgeleri değişen gerçek bir derinliktir.',
        ],
      },
      {
        id: 'benefits',
        heading: 'Ahşap panelin üstün olduğu noktalar',
        paragraphs: ['İnsanların fiyat farkını ödediği avantajlar:'],
        bullets: [
          'Neme, suya ve küfe dayanıklıdır; kalkmaz, lekelenmez.',
          'Çatlakları ve eğri duvarları gizler; duvar kâğıdı altındaki her kusuru gösterir.',
          'Gizli LED aydınlatmayla birleştirilebilen lüks 3D görünüm.',
          'Darbeye ve nemli bezle silmeye dayanır; duvar kâğıdı yırtılır ve lekelenir.',
          'Yıllarca değişmeden kalır, uzun vadede daha ekonomiktir.',
          'Odaya biraz akustik konfor katar.',
        ],
      },
      {
        id: 'strength',
        heading: 'Duvar kâğıdı ne zaman yeterli?',
        paragraphs: [
          'Oda kuru, duvar düz ve sağlamsa ve küçük bir bütçeyle geçici bir değişiklik istiyorsanız ya da dekoru bir iki yılda bir değiştirmeyi seviyorsanız duvar kâğıdı makul bir seçimdir. Büyüdükçe değişecek çocuk odaları için de öyle.',
          'Ancak Lazkiye ve Tartus gibi sahil şehirlerinde, ya da banyoya bitişik veya soğuk dış duvarlarda kâğıdın kalkması ve arkasında küf oluşması sık görülür; burada ahşap panel daha iyi bir yatırımdır.',
        ],
      },
      {
        id: 'where',
        heading: 'Ahşap panel için en iyi yerler',
        paragraphs: [
          'TV duvarı, salonun ana duvarı, yatak arkası, girişler ve koridorlar, ofisler ve mağazalar. Klasik bir görünüm için PS çıtalarla, duvar kâğıdı yerine boyalı duvarda Fransız tarzı çerçeveler yapılabilir.',
          'Tek bir vurgu duvarını kaplayıp gerisini boyamayı deneyin: sınırlı bütçeyle büyük etki.',
        ],
      },
    ],
    compare: {
      ours: 'PS ahşap panel',
      other: 'Duvar kâğıdı',
      rows: [
        ['Nem dayanımı', '%100 dayanıklı', 'Kalkar, arkasında küf oluşur'],
        ['Duvar kusurlarını gizleme', 'Gizler', 'Gösterir'],
        ['Görünüm', 'Gerçek dokulu 3D', 'Düz baskı'],
        ['Temizlik', 'Nemli bez', 'Lekelenir ve yırtılır'],
        ['Kullanım ömrü', 'Uzun yıllar', 'Bir ila birkaç yıl'],
        ['İlk maliyet', 'Daha yüksek', 'Daha düşük'],
      ],
    },
  },

  damp_walls: {
    label: 'Duvar nemine çözüm',
    title: 'Duvarda Nem ve Küf: Gerçekten İşe Yarayan ve Yaramayan Çözümler',
    description:
      'Suriye’de ve sahilde nemli duvarlar için pratik rehber: nemin nedenleri, önce kaynağın ne zaman onarılması gerektiği ve suya dayanıklı SPC ve PVC panellerin dökülen boya, küf ve her yıl yeniden boyamayı nasıl bitirdiği.',
    lead: 'Her kış dökülen boya, köşelerde siyah lekeler ve hiç geçmeyen rutubet kokusu. Bunlar Suriye’deki evlerde, özellikle sahilde en sık görülen sorunlardandır. Herkese uyan tek bir çözüm yoktur; ilk adım, sizdeki nemin türünü bilmektir.',
    sections: [
      {
        id: 'damp',
        heading: 'Nem nereden geliyor?',
        paragraphs: [
          'Üç ana kaynak vardır. Yoğuşma: yemek, duş ve nefesten çıkan buhar soğuk duvara değer, küf köşelerde ve dolap arkalarında belirir. Zemin katlarda topraktan yükselen nem, duvarın altında ıslak bir şerit olarak görünür. Ve tesisat, çatı veya çatlak dış duvardan gelen sızıntılar.',
          'Bu ayrım önemlidir: yoğuşma havalandırma ve su emmeyen bir yüzeyle çözülür; sızıntı ve yükselen nem ise önce kaynağın onarılmasını gerektirir.',
        ],
      },
      {
        id: 'strength',
        heading: 'Altın kural: kaplamadan önce kaynağı onarın',
        paragraphs: [
          'Dünyada hiçbir kaplama malzemesi su sızıntısını onarmaz. Duvar bir boru veya çatı yüzünden içeriden ıslaksa, onu herhangi bir şeyle kapatmak sorunu yalnızca gizler ve büyütebilir. Sızıntıyı onarın, duvarın kurumasını bekleyin ve küfü mantar önleyici bir ürünle temizleyin.',
          'Bunu açıkça söylüyoruz, çünkü işe yaramayacağı bir yer için size panel satmak istemeyiz. Duvarın fotoğrafını gönderdiğinizde, kaplamadan önce onarım gerekip gerekmediğini söyleriz.',
        ],
      },
      {
        id: 'benefits',
        heading: 'Suya dayanıklı paneller sorunu nerede çözer?',
        paragraphs: ['Kaynak onarıldıktan sonra, ya da sorun yoğuşma ve yüzey nemi olduğunda, SPC ve PVC paneller şunları sağlar:'],
        bullets: [
          'Su emmeyen kapalı yüzey: boya ve alçı gibi dökülme ve kabarma yok.',
          'Yüzeyde küfün tutunacağı yer yok, nemli bezle silinir.',
          'Her yıl yeniden boyama biter; bu, birikerek artan bir maliyettir.',
          'Temizlenip kurutulduktan sonra eski duvarın üzerine kırmadan uygulanır.',
          'Suya dayanıklı PS süpürgelikler duvarın altını silme suyundan korur.',
          'Yorgun bir duvar yerine lüks mermer veya taş görünümü.',
        ],
      },
      {
        id: 'tips',
        heading: 'Nemin geri gelmemesi için ipuçları',
        paragraphs: [
          'Evi her gün, birkaç dakika da olsa havalandırın; özellikle duş ve yemekten sonra. Mümkünse banyo ve mutfağa aspiratör takın. Dolapları dış duvarlardan birkaç santimetre uzak tutun ki arkalarında hava dolaşsın.',
          'Montajda ustalarımızın yaptığı gibi zemin ve tavanda küçük bir genleşme payı bırakın ve özellikle banyoda köşe ve kenarlarda küfe dayanıklı silikon kullanın.',
        ],
      },
    ],
    compare: {
      ours: 'Suya dayanıklı SPC / PVC panel',
      other: 'Normal boya ve alçı',
      rows: [
        ['Su emme', 'Yok', 'Emer ve kabarır'],
        ['Dökülme', 'Dökülmez', 'Çoğu zaman her kış dökülür'],
        ['Yüzeyde küf', 'Zor tutunur, kolay silinir', 'Yaygın'],
        ['Tekrarlanan maliyet', 'Yeniden boya yok', 'Bir iki yılda bir boya'],
        ['Sızıntının kendisini onarma', 'Hayır (önce onarın)', 'Hayır'],
      ],
    },
  },

  bathroom_no_demolition: {
    label: 'Kırmadan banyo yenileme',
    title: 'Kırmadan Banyo Yenileme: Adımlar, Malzemeler ve Süre',
    description:
      'Suriye’de banyonuzu fayans kırmadan nasıl yenilersiniz: eski fayans üzerine PVC mermer veya SPC panel, zemini kaplama, süre, adımlar ve kaçınılması gereken hatalar.',
    lead: 'Banyo fayansını kırmak bir hafta veya daha fazla toz, moloz ve kullanılamayan bir banyo demektir. Bugün banyonun görünümünü eski fayansın üzerine bir iki günde tamamen değiştirebilirsiniz. İşte nasıl yapıldığı ve başlamadan önce neleri kontrol etmeniz gerektiği.',
    sections: [
      {
        id: 'bathroom',
        heading: 'Eski fayansın üzerine gerçekten kaplama yapılabilir mi?',
        paragraphs: [
          'Evet; yeter ki fayanslar sağlam sabitlenmiş olsun ve duvar arkasında sızıntı olmadan kuru olsun. Fayanslar yağ ve sabun kalıntısından temizlenir, ardından PVC mermer veya SPC taş paneller uygun silikon ya da yapıştırıcıyla doğrudan üzerine yapıştırılır.',
          'Kırık veya boşluklu fayanslar tek tek yeniden sabitlenir veya sökülür; bütün banyoyu kırmaya gerek yoktur.',
        ],
      },
      {
        id: 'what',
        heading: 'Banyonun her bölümü için hangi malzeme?',
        paragraphs: [
          'Duvarlar: büyük 122 × 240 cm levhalı PVC mermer paneller az derzle kesintisiz mermer görünümü verir; duş bölgesinde daha fazla sağlamlık için SPC taş duvar panelleri (96 × 280 cm, 4–5 mm) kullanılabilir.',
          'Zemin: fayans sağlamsa bırakıp yalnızca duvarları değiştirebilirsiniz; bu bile büyük fark yaratır. Görece kuru banyolarda veya misafir tuvaletinde zemin, suya dayanıklı klik SPC karolarla kaplanabilir. Duş zemini ise gidere doğru doğru eğimle fayans olarak kalır.',
        ],
      },
      {
        id: 'benefits',
        heading: 'Kırmadan yenilemenin kazançları',
        paragraphs: ['Geleneksel tadilata göre başlıca kazançlar:'],
        bullets: [
          'Süre: bir hafta veya fazlası yerine bir iki gün.',
          'Toz yok, moloz yok, taşınacak enkaz yok.',
          'Duvara gömülü eski tesisat için risk yok.',
          'Zamanla kararan derz yok, temizlik çok daha kolay.',
          'Kırma, çimento ve iş günlerinden tasarruf ettiğiniz için genellikle daha düşük toplam maliyet.',
          'Parlak mermer veya doğal taş görünümünde modern, otel tarzı bir banyo.',
        ],
      },
      {
        id: 'tips',
        heading: 'Kaçınılması gereken hatalar',
        paragraphs: [
          'Sızıntısı olan duvarı kaplamayın: önce tesisatı kontrol edin, çünkü kaplama sorunu çözmez, gizler. Küvet, köşe ve açıklıklar çevresindeki silikondan kısmayın; suya karşı savunma hattınızdır, küfe dayanıklı tür seçin.',
          'Batarya, aksesuar ve aynaların yerini montajdan önce planlayın ki açıklıklar tam kesilsin; panelleri doğrudan güçlü ısıdan uzak tutun. Duvarın durumundan emin değilseniz, satın almadan önce fotoğrafını WhatsApp’tan gönderin.',
        ],
      },
    ],
    compare: {
      ours: 'Kırmadan yenileme',
      other: 'Geleneksel (kırma ve yeni fayans)',
      rows: [
        ['Süre', 'Bir iki gün', 'Bir iki hafta'],
        ['Toz ve moloz', 'Neredeyse yok', 'Çok'],
        ['Eski tesisat', 'Dokunulmaz', 'Zarar görebilir'],
        ['Derz', 'Az / derz yok', 'Her karonun arasında'],
        ['Banyo kullanımı', 'Hızla kullanıma döner', 'Tadilat boyunca kullanılamaz'],
        ['Duş zemini', 'Fayans kalır', 'Yeni fayans'],
      ],
    },
  },
};
