import type { ArticleContent } from './articles';
import { TOPICS_TR } from './articles.topics.tr';

export const ARTICLES_TR: Record<string, ArticleContent> = {
  ...TOPICS_TR,
  ps_wood: {
    title: 'PS Duvar Panelleri (Ahşap Alternatifi): Nedir, Nasıl Üretilir, Avantajları ve Montajı',
    description:
      'Suriye’de PS ahşap alternatifi duvar panelleri rehberi: hangi malzemeden üretilir, avantajları, suya dayanımı, kullanım alanları ve adım adım montajı.',
    lead: 'Ahşap alternatifi paneller bugün Suriye ve Arap dünyasında en çok talep edilen duvar kaplamasıdır: nem, çatlama ve bakım derdi olmadan ahşabın sıcak, çıtalı görünümü. Satın almadan önce bilmeniz gerekenler bu rehberde.',
    sections: [
      {
        id: 'what',
        heading: 'PS duvar paneli nedir?',
        paragraphs: [
          'PS duvar panelleri, yüksek yoğunluklu sıkıştırılmış polistirenden üretilen ve yüzeyi doğal ahşap damarını ve rengini yansıtan duvar kaplama levhalarıdır. 12–16 cm genişliğinde, 290 cm uzunluğunda çıtalar hâlinde gelir ve birbirine geçerek kesintisiz bir duvar oluşturur.',
          'Ahşabı seven ama maliyetinden ve nem ile böcek sorunlarından kaçınanlar için geliştirilmiştir; bu yüzden TV duvarları, salonlar, yatak odaları ve mağazalarda ilk tercihtir.',
        ],
      },
      {
        id: 'made',
        heading: 'Nasıl üretilir?',
        paragraphs: [
          'Polistiren (PS) granülleri eritilir ve ekstrüzyon adı verilen işlemle çelik bir kalıptan geçirilir; panel, üç boyutlu çıtalı profiliyle tek parça olarak çıkar. Soğutulduktan sonra boyuna kesilir.',
          'Son aşamada yüzey, ahşap desenini taşıyan dekoratif filmle ısı ve basınç altında kaplanır. Sonuç, çok hafif, kapalı gözenekli ve su emmeyen bir levhadır.',
        ],
      },
      {
        id: 'benefits',
        heading: 'Avantajları',
        paragraphs: ['Görünümü günlük kullanım pratikliğiyle birleştirir:'],
        bullets: [
          '%100 suya, neme ve küfe dayanıklı; şişmez, çürümez.',
          'Hafiftir; taşıması ve montajı kolaydır.',
          'Boya ve cila istemez; nemli bezle silinir.',
          'Duvar kusurlarını, çatlakları ve kabloları gizler.',
          'Ek ses ve ısı yalıtımı sağlar.',
          'Gizli LED aydınlatma ile çok uyumludur.',
          'Ceviz, meşe, siyah, gri ve altın gibi birçok renk.',
        ],
      },
      {
        id: 'strength',
        heading: 'Dayanıklılık ve ömür',
        paragraphs: [
          'Panel tek parça ve kapalı gözenekli olduğu için mevsim değişimlerinden etkilenmez; doğal ahşap ve MDF gibi eğilmez, çatlamaz, termit ve tahta kurdu çekmez.',
          'Yüzeyi günlük kullanıma ve sık temizliğe dayanır, iç mekânda rengini yıllarca korur. Her plastik malzemede olduğu gibi doğrudan yüksek ısı kaynaklarından uzak tutulmalıdır.',
        ],
      },
      {
        id: 'where',
        heading: 'Nerelerde kullanılır?',
        paragraphs: [
          'En yaygın kullanım TV duvarı ve salonun ana duvarı, yatak başı, koridor ve girişlerdir. Ticari projelerde mağaza iç cepheleri, restoran ve kafeler, ofisler, klinikler ve kuaförlerde tercih edilir.',
          'Duvarın tamamına veya bir bölümüne, mermer görünümlü panel ya da boya ile birlikte uygulanabilir. Neme dayanıklılığı sayesinde Lazkiye ve Tartus gibi sahil şehirleri için idealdir.',
        ],
      },
    ],
    compare: {
      other: 'Doğal ahşap / MDF',
      rows: [
        ['Su ve nem', '%100 dayanıklı', 'Şişer ve çürür'],
        ['Ağırlık', 'Çok hafif', 'Ağır'],
        ['Bakım', 'Gerekmez', 'Düzenli boya ve cila'],
        ['Montaj', 'Saatler içinde', 'Günlerce marangozluk'],
        ['Böcekler', 'Etkilenmez', 'Zarar görür'],
        ['Maliyet', 'Ekonomik', 'Yüksek'],
      ],
    },
  },

  pvc_marble: {
    title: 'PVC Mermer Duvar Panelleri (Mermer Alternatifi): Avantajlar, Üretim ve Montaj Rehberi',
    description:
      'Suriye’de UV kaplamalı PVC mermer paneller hakkında her şey: nasıl üretilir, suya dayanımı, banyo ve mutfakta kullanımı, doğal mermerle karşılaştırma ve montajı.',
    lead: 'Mermer alternatifi paneller, doğal mermerin parlaklığını ve damarlarını daha hafif, daha ekonomik ve çok daha hızlı montajla sunar. Bu rehber malzemeyi üretimden duvara kadar anlatıyor.',
    sections: [
      {
        id: 'what',
        heading: 'PVC mermer panel nedir?',
        paragraphs: [
          'UV mermer levha olarak da bilinen PVC mermer paneller, 122 × 240 cm ölçüsünde ve yaklaşık 2,5 mm kalınlığında ince, sert levhalardır. Yüzeyi doğal mermer damarlarını yüksek çözünürlüklü baskı ve kristal parlaklıkla yansıtır.',
          'Doğrudan duvara veya eski seramiğin üzerine yapıştırılır; tek parçada geniş alan kaplar ve çok az derz bırakır. Bu yüzden banyo ve mutfakların kırmadan yenilenmesinde sıkça kullanılır.',
        ],
      },
      {
        id: 'made',
        heading: 'Nasıl üretilir?',
        paragraphs: [
          'Levha, PVC reçinesi ile kalsiyum karbonat (taş tozu) ve stabilizatörlerin karışımından eritilerek ekstrüzyonla düz ve eşit kalınlıkta üretilir.',
          'Ardından mermer desenli dekoratif film preslenir ve ultraviyole ışıkla kürlenen şeffaf koruyucu katman (UV kaplama) uygulanır. Yüksek parlaklığı ve çizilme, leke ve sararmaya karşı direnci bu katman sağlar.',
        ],
      },
      {
        id: 'benefits',
        heading: 'Avantajları',
        paragraphs: ['Akıllı bir seçim olmasının başlıca nedenleri:'],
        bullets: [
          '%100 suya ve neme dayanıklı; banyo ve mutfağa uygun.',
          'Kristal parlaklık ve lüks mermer desenleri.',
          'Tek levha yaklaşık 2,9 m² kaplar; derz azdır.',
          'Eski seramiğin üzerine kırmadan uygulanır.',
          'Kolay temizlenir; yağ ve leke emmez.',
          'Hafiftir; duvara yük bindirmez.',
          'Doğal mermerden çok daha ekonomik ve hızlıdır.',
        ],
      },
      {
        id: 'strength',
        heading: 'Dayanıklılık ve ömür',
        paragraphs: [
          'UV katman yüzeyi günlük çiziklerden ve renk değişiminden korur; levha su ve buhardan etkilenmez, doğru uygulandığında şişmez ve arkasında küf oluşmaz.',
          'Doğal mermerin aksine periyodik cila gerektirmez ve leke tutmaz. Islak alanlarda derzlerin silikon veya alüminyum profille kapatılması yeterlidir.',
        ],
      },
      {
        id: 'where',
        heading: 'Nerelerde kullanılır?',
        paragraphs: [
          'Evlerde: banyo ve mutfak duvarları, TV duvarı, giriş duvarı, lavabo çevresi ve kolonlar. Projelerde: otel lobileri, mağazalar, klinikler, restoranlar ve showroomlar.',
          'Aynı duvarda ahşap alternatifi panellerle çok iyi uyum sağlar; levhalar arasındaki altın veya gümüş profiller şıklığı artırır.',
        ],
      },
    ],
    compare: {
      other: 'Doğal mermer / seramik',
      rows: [
        ['Ağırlık', 'Çok hafif', 'Çok ağır'],
        ['Montaj', 'Bir günde yapıştırma', 'Günlerce kesim ve harç'],
        ['Derz', 'Çok az', 'Çok'],
        ['Bakım', 'Silmek yeterli', 'Periyodik cila'],
        ['Kırmadan yenileme', 'Evet', 'Eski kaplama sökülür'],
        ['Maliyet', 'Ekonomik', 'Yüksek'],
      ],
    },
  },

  spc_wall: {
    title: 'SPC Duvar Panelleri (Taş Kompozit Levhalar): Avantajlar, Üretim ve Kullanım',
    description:
      'Suriye’de SPC taş kompozit duvar panelleri rehberi: nedir, taş tozundan nasıl üretilir, neden suda şişmez, nerelerde kullanılır ve nasıl uygulanır.',
    lead: 'SPC duvar panelleri, sunta ve MDF’nin en eski sorununu, yani suda şişmeyi çözmek için tasarlanmış sert taş-polimer levhalardır. Bu rehber yapısını, avantajlarını ve kullanım alanlarını anlatıyor.',
    sections: [
      {
        id: 'what',
        heading: 'SPC duvar paneli nedir?',
        paragraphs: [
          'SPC, Stone Plastic Composite yani taş-plastik kompozit demektir. SPC duvar panelleri 96 × 280 cm ölçüsünde, 4–5 mm kalınlığında sert levhalardır; çekirdeği sıkıştırılmış kireçtaşı tozu ve polimerden, yüzeyi taş, ahşap, kumaş ve metal görünümlüdür.',
          'Suntanın kullanıldığı yerlerde, yani duvar, kolon ve resepsiyon arkalarında kullanılır; ancak daha sert, daha ince ve neme karşı tamamen duyarsızdır.',
        ],
      },
      {
        id: 'made',
        heading: 'Nasıl üretilir?',
        paragraphs: [
          'Kalsiyum karbonat tozu (karışımın yaklaşık üçte ikisi) PVC reçinesi ve stabilizatörlerle karıştırılır, yüksek ısı ve basınç altında eritilerek yoğun ve dümdüz bir çekirdek hâlinde ekstrüde edilir.',
          'Üzerine dekoratif film ve aşınmaya dayanıklı şeffaf katman preslenir, UV kaplama ile tamamlanır. Tüm katmanlar yapıştırıcısız, ısıyla birleştirilir.',
        ],
      },
      {
        id: 'benefits',
        heading: 'Avantajları',
        paragraphs: ['Ahşap esaslı levhalardan farkı:'],
        bullets: [
          'Suda asla şişmez, eğilmez.',
          'Yüksek sertlik; darbe ve çizilmeye dayanıklı.',
          'Yüksek taş oranı sayesinde alev geciktirici.',
          'Termit ve küften etkilenmez.',
          '280 cm levhalar zeminden tavana uzanır.',
          'Taş, traverten, ahşap, kumaş, metal desenleri.',
          'Boya ve periyodik bakım istemez.',
        ],
      },
      {
        id: 'strength',
        heading: 'Dayanıklılık ve ömür',
        paragraphs: [
          'Yoğun taş çekirdek mükemmel boyutsal kararlılık sağlar; sıcaklık değişimlerinde belirgin genleşme olmaz ve koridorlardaki günlük darbelere dayanır.',
          'Yüzey katmanı çizilmeye ve solmaya dirençlidir; otel, ofis ve mağaza gibi yoğun ticari projelerde güvenle kullanılır.',
        ],
      },
      {
        id: 'where',
        heading: 'Nerelerde kullanılır?',
        paragraphs: [
          'Salonlar, koridorlar ve girişler, ofisler ve toplantı odaları, otel lobileri, mağaza ve restoranlar ile mutfaklar ve nemli alanlar.',
          'Doğrudan yapıştırılır; levhalar arasında alüminyum profil veya ince derz kullanılır. Ahşap alternatifi paneller ve süpürgeliklerle birlikte bütüncül bir oda kaplaması oluşturur.',
        ],
      },
    ],
    compare: {
      other: 'Sunta / MDF',
      rows: [
        ['Suyun etkisi', 'Yok', 'Şişer ve bozulur'],
        ['Sertlik', 'Çok yüksek', 'Orta'],
        ['Kalınlık', '4–5 mm', '16–18 mm'],
        ['Böcek ve küf', 'Etkilenmez', 'Zarar görür'],
        ['Yüzey', 'Hazır, boyasız', 'Kaplama veya boya ister'],
        ['Montaj', 'Doğrudan yapıştırma', 'Marangozluk'],
      ],
    },
  },

  spc_flooring: {
    title: 'SPC Zemin Kaplaması (Parke Alternatifi): Avantajlar, Üretim ve Montaj',
    description:
      'Suriye’de kilitli SPC zemin rehberi: nedir, ahşap parke ve laminattan farkı, su geçirmezliği, nerelere döşenir ve mevcut karoların üzerine nasıl uygulanır.',
    lead: 'SPC zemin, yeni nesil zemin kaplamasıdır: ahşabın görünümü ve sıcaklığı, sudan korkmayan taş çekirdekle. Karoları kırmadan zemin yenilemek istiyorsanız bu rehber sizin için.',
    sections: [
      {
        id: 'what',
        heading: 'SPC zemin nedir?',
        paragraphs: [
          'SPC zemin, taş-polimer çekirdekli ve ahşap ya da taş görünümlü sert bir plakadır. Plakalar yapıştırıcısız kilit sistemiyle birbirine geçer ve karo ya da beton üzerinde yüzer bir zemin oluşturur.',
          '4,5–5,5 mm kalınlığında üretilir; bazı modellerin altında IXPE ses yalıtım katmanı bulunur. Bugün ahşap parke ve laminatın en yaygın alternatifidir.',
        ],
      },
      {
        id: 'made',
        heading: 'Nasıl üretilir?',
        paragraphs: [
          'Çekirdek, kireçtaşı tozu ve PVC reçinesinden yüksek ısı ve basınçla ekstrüde edilir. Üzerine ahşap desenli dekor katmanı, şeffaf aşınma katmanı ve UV kaplama preslenir.',
          'Soğutulduktan sonra kenarlara kilit profili hassas şekilde açılır; akustik modellerde alta IXPE katmanı eklenir.',
        ],
      },
      {
        id: 'benefits',
        heading: 'Avantajları',
        paragraphs: ['Ev ve ofislerde neden tercih edilir:'],
        bullets: [
          '%100 su geçirmez; dökülen suda şişmez.',
          'Yapıştırıcısız kilit montaj; karolar sökülmez.',
          'Aşınma katmanı çizilmeye ve mobilyaya dayanır.',
          'Boyutsal olarak kararlı; laminat gibi genleşmez.',
          'Sessiz, konforlu ve sıcak bir yürüyüş.',
          'Normal silme ile kolay temizlik.',
          'Taşınırken sökülüp yeniden döşenebilir.',
        ],
      },
      {
        id: 'strength',
        heading: 'Dayanıklılık',
        paragraphs: [
          'Taş çekirdek plakayı son derece sert yapar; ağır mobilya ayakları kalıcı iz bırakmaz. Yüzeyin çizilmeye ve trafiğe dayanımını aşınma katmanı belirler.',
          'Su emmediği için mutfak, giriş, mağaza ve kliniklere uygundur. Duvar kenarlarında küçük bir genleşme boşluğu bırakılmalı ve süpürgelikle kapatılmalıdır.',
        ],
      },
      {
        id: 'where',
        heading: 'Nerelere döşenir?',
        paragraphs: [
          'Yatak odaları, salonlar, çocuk odaları, ofisler, mağazalar, showroomlar, klinikler ve mutfaklar. Zemin düz ve kuru olduğu sürece eski karo veya mermerin üzerine doğrudan uygulanabilir.',
          'Genleşme boşluğunu kapatan ve duvar dibini koruyan su geçirmez PS süpürgeliklerle tamamlanır.',
        ],
      },
    ],
    compare: {
      other: 'Ahşap parke / laminat',
      rows: [
        ['Su dayanımı', '%100 su geçirmez', 'Şişer ve kalkar'],
        ['Montaj', 'Yapıştırıcısız kilit', 'Yapıştırma veya çivi'],
        ['Eski karo üzerine', 'Evet, doğrudan', 'Hazırlık ister'],
        ['Boyutsal kararlılık', 'Kararlı', 'Genleşir, büzülür'],
        ['Çizilme dayanımı', 'Yüksek', 'Orta'],
        ['Bakım', 'Sadece silme', 'Cila ve özel bakım'],
      ],
    },
  },

  ps_slats: {
    title: 'PS Duvar Çıtaları ve Panelleme: Fransız Tarzı Duvar Çerçeveleri Rehberi',
    description:
      'Suriye’de PS dekoratif duvar çıtaları rehberi: nedir, nasıl üretilir, Fransız tarzı duvar panelleme nasıl yapılır, alçı ve ahşaba göre avantajları ve montajı.',
    lead: 'PS çıtalarla sade bir duvar, düşük maliyetle ve tek günde klasik Fransız tarzı panellemeye dönüşür. Bilmeniz gereken her şey burada.',
    sections: [
      {
        id: 'what',
        heading: 'PS duvar çıtası nedir?',
        paragraphs: [
          'PS duvar çıtaları, yüksek yoğunluklu polistirenden üretilen, 240 cm uzunluğunda ve 1,5–10 cm genişliğinde dekoratif şerit ve çerçevelerdir; duvarlarda, ayna ve kapı çevrelerinde çerçeve ve pano oluşturmak için kullanılır.',
          'Hazır renkli veya boyanabilir, düz ya da desenli olarak sunulur.',
        ],
      },
      {
        id: 'made',
        heading: 'Nasıl üretilir?',
        paragraphs: [
          'Eritilmiş polistiren, profile şeklini veren kalıplardan ekstrüde edilir, soğutulur ve standart boylarda kesilir. Yüksek yoğunluk, işlenmiş ahşap gibi keskin ve temiz kenarlar sağlar.',
          'Yüzey renk katı veya ısıyla uygulanan dekoratif filmle tamamlanır; macun ve zımpara gerektirmez.',
        ],
      },
      {
        id: 'benefits',
        heading: 'Avantajları',
        paragraphs: ['Alçı ve ahşaba kıyasla:'],
        bullets: [
          'Çok hafif; görünür vida olmadan yapıştırılır.',
          'Suya ve neme dayanıklı; alçı gibi çatlamaz.',
          'Düzgün köşeler için 45° kolayca kesilir.',
          'İstenen renge boyanabilir.',
          'Tozsuz, hızlı ve temiz uygulama.',
          'Odayı dönüştürmenin ekonomik yolu.',
        ],
      },
      {
        id: 'strength',
        heading: 'Dayanıklılık',
        paragraphs: [
          'Çıtalar nem emmez; doğru yapıştırıldığında eğilmez ve duvardan ayrılmaz, kenarları koridorlardaki günlük temasa dayanır.',
          'Çok hafif oldukları için duvara yük bindirmez ve alçıpan üzerine bile uygulanabilir.',
        ],
      },
      {
        id: 'where',
        heading: 'Nerelerde kullanılır?',
        paragraphs: [
          'Salon, yemek odası ve yatak odalarında Fransız panelleme, koridor ve girişler, yatak ve TV arkaları, ayna, tablo ve kapı çerçeveleri.',
          'Duvar dibindeki PS süpürgeliklerle birlikte bütüncül bir klasik dekor oluşturur.',
        ],
      },
    ],
    compare: {
      other: 'Alçı kartonpiyer / ahşap',
      rows: [
        ['Ağırlık', 'Çok hafif', 'Ağır'],
        ['Çatlama', 'Çatlamaz', 'Alçı çatlar'],
        ['Nem', 'Etkilenmez', 'Etkilenir'],
        ['Montaj', 'Saatler içinde', 'Günlerce iş ve kuruma'],
        ['Temizlik', 'Tozsuz', 'Toz ve macun'],
        ['Maliyet', 'Ekonomik', 'Daha yüksek'],
      ],
    },
  },

  ps_baseboards: {
    title: 'Su Geçirmez PS Süpürgelikler: Çeşitleri, Avantajları ve Montajı',
    description:
      'Suriye’de PS süpürgelik rehberi: MDF ve ahşap süpürgeliğe göre üstünlükleri, LED’li modeller, ölçüler ve parke ile seramik zeminlerde uygulama.',
    lead: 'Süpürgelik, odanın görünümünde büyük fark yaratan küçük bir detaydır. PS süpürgelikler zemin ile duvar arasında temiz bir bitiş sağlar ve silme suyundan etkilenmez.',
    sections: [
      {
        id: 'what',
        heading: 'PS süpürgelik nedir?',
        paragraphs: [
          'Süpürgelik, duvarın zeminle birleştiği yere uygulanan şerittir. PS süpürgelikler yüksek yoğunluklu polistirenden, 240 cm uzunluğunda ve 10–11,5 cm yüksekliğinde üretilir.',
          'Duvar dibini süpürge ve mobilya darbelerinden, silme suyundan korur; parke çevresindeki genleşme boşluğunu kapatır.',
        ],
      },
      {
        id: 'made',
        heading: 'Nasıl üretilir?',
        paragraphs: [
          'Süpürgelik, eritilmiş polistirenin kalıptan ekstrüde edilmesiyle üretilir; bazı modeller LED şerit için kanallı olarak şekillendirilir.',
          'Yüzey, renk katı veya çizilmeye dayanıklı dekoratif filmle tamamlanır; boya gerektirmez.',
        ],
      },
      {
        id: 'benefits',
        heading: 'Avantajları',
        paragraphs: ['MDF ve ahşaptan farkı:'],
        bullets: [
          '%100 su geçirmez; zemin silinirken şişmez.',
          'Günlük darbelere dayanır, soyulmaz.',
          'Yumuşak zemin aydınlatması için LED kanallı modeller.',
          'Görünür vida olmadan hızlı yapıştırma.',
          'Parke, SPC ve seramikle uyumlu.',
          'Boya ve bakım istemez.',
        ],
      },
      {
        id: 'strength',
        heading: 'Dayanıklılık',
        paragraphs: [
          'MDF süpürgeliklerin bilinen sorunu, aylarca silmeden sonra şişip soyulmasıdır. PS hiç su emmez; düz ve duvara yapışık kalır.',
          'Yoğunluğu tekrarlayan hafif darbelere dayanır, yüzeyi kolay temizlenir.',
        ],
      },
      {
        id: 'where',
        heading: 'Nerelerde kullanılır?',
        paragraphs: [
          'Tüm oda ve koridorlarda; SPC zeminde genleşme boşluğunu kapatmak için, seramik ve mermerde ise şık bir alternatif olarak.',
          'LED’li modeller koridor, yatak odası, salon ve mağazalarda dolaylı aydınlatma için uygundur.',
        ],
      },
    ],
    compare: {
      other: 'MDF / ahşap süpürgelik',
      rows: [
        ['Zemin silinirken', 'Etkilenmez', 'Şişer ve soyulur'],
        ['Bakım', 'Gerekmez', 'Boya ve onarım'],
        ['Entegre LED', 'Mevcut', 'Genellikle yok'],
        ['Montaj', 'Hızlı yapıştırma', 'Çivi ve macun'],
        ['Böcekler', 'Etkilenmez', 'Zarar görür'],
      ],
    },
  },
};
