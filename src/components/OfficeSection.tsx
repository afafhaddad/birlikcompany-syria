import React, { useState } from 'react';
import { MapPin, Clock, MessageSquare, Phone, Mail, ExternalLink, Navigation, Store, Map as MapIcon } from 'lucide-react';
import { Language } from '../types';

interface OfficeSectionProps {
  currentLang: Language;
}

export const OfficeSection: React.FC<OfficeSectionProps> = ({
  currentLang
}) => {
  const content = {
    ar: {
      tag: 'المقر الرئيسي والاستشارات',
      title: 'زيارة المقر الرئيسي ومعاينة عينات المواد',
      description: 'نرحب بالمعماريين، مهندسي الديكور، الحرفيين، وأصحاب المنازل والمشاريع في مقرنا الرئيسي بمدينة اللاذقية للاطلاع على العينات الملموسة الحية لألواح بديل الرخام، بديل الخشب، بديل الشيبورد الحجري، بديل الباركيه، ونعلات وقُضبان بي إس.',
      addressTitle: 'العنوان والموقع',
      addressValue: 'تقاطع شارع بغداد مع شارع بورسعيد (مقابل بوظة جَعارة) — اللاذقية — سورية',
      plusCode: 'GQ6F+7VJ, Baghdad, Latakia, Syria',
      hoursTitle: 'أوقات العمل الرسمية',
      hours: [
        { days: 'من الأحد إلى الخميس', time: '10:00 صباحاً – 5:00 عصراً' },
        { days: 'السبت', time: '10:00 صباحاً – 3:00 عصراً' },
        { days: 'الجمعة', time: 'عطلة أسبوعية' }
      ],
      contactTitle: 'التواصل المباشر',
      phoneLabel: 'الهاتف والواتساب',
      phoneValue: '+963 995 764 573',
      emailLabel: 'البريد الإلكتروني',
      emailValue: 'info@birlik-insaat.com',
      mapBadgeTitle: 'شركة بيرليك (Birlik Company)',
      mapBadgeSubtitle: 'تقاطع شارع بغداد مع شارع بورسعيد (مقابل بوظة جَعارة)',
      openInMapsBtn: 'فتح في خرائط Google',
      getDirectionsBtn: 'عرض الاتجاهات في Google Maps',
      whatsappAction: 'حجز موعد استشارة عبر واتساب',
      callAction: 'اتصال هاتفي مباشر',
      sampleNotice: 'المعاينة الحية للعينات مجاناً عند زيارة مقرنا شخصياً'
    },
    en: {
      tag: 'Headquarters & Consultation',
      title: 'Visit Headquarters & Sample Displays',
      description: 'We welcome architects, interior designers, contractors, and property owners to our Lattakia headquarters to examine tactile material samples and full displays of our marble panels, timber slats, stone SPC boards, flooring, and baseboards.',
      addressTitle: 'Location & Address',
      addressValue: 'Intersection of Baghdad St & Port Said St (Opposite Jaara Ice Cream) — Lattakia — Syria',
      plusCode: 'GQ6F+7VJ, Baghdad, Latakia, Syria',
      hoursTitle: 'Working Hours',
      hours: [
        { days: 'Sunday to Thursday', time: '10:00 AM – 5:00 PM' },
        { days: 'Saturday', time: '10:00 AM – 3:00 PM' },
        { days: 'Friday', time: 'Closed' }
      ],
      contactTitle: 'Direct Contact',
      phoneLabel: 'Mobile & WhatsApp',
      phoneValue: '+963 995 764 573',
      emailLabel: 'Email',
      emailValue: 'info@birlik-insaat.com',
      mapBadgeTitle: 'Birlik Company (شركة بيرليك)',
      mapBadgeSubtitle: 'Baghdad St & Port Said St Intersection (Opposite Jaara Ice Cream)',
      openInMapsBtn: 'Open in Google Maps',
      getDirectionsBtn: 'Get Directions on Google Maps',
      whatsappAction: 'Book Consultation via WhatsApp',
      callAction: 'Direct Call',
      sampleNotice: 'Free live material inspection available with in-person visit to our headquarters'
    },
    tr: {
      tag: 'Merkez ve Danışmanlık',
      title: 'Merkez Ofis ve Numune İnceleme',
      description: 'Mimarları, iç mimarları, ustaları ve müşterilerimizi Lazkiye merkezimizde mermer alternatifleri, ahşap çıtalar, taş SPC levhalar ve süpürgeliklerin gerçek malzeme numunelerini incelemeye davet ediyoruz.',
      addressTitle: 'Konum ve Adres',
      addressValue: 'Bağdat Caddesi ile Port Said Caddesi Kesişimi (Caara Dondurma Karşısı) — Lazkiye — Suriye',
      plusCode: 'GQ6F+7VJ, Baghdad, Latakia, Syria',
      hoursTitle: 'Çalışma Saatleri',
      hours: [
        { days: 'Pazar - Perşembe', time: '10:00 – 17:00' },
        { days: 'Cumartesi', time: '10:00 – 15:00' },
        { days: 'Cuma', time: 'Kapalı' }
      ],
      contactTitle: 'Doğrudan İletişim',
      phoneLabel: 'Mobil ve WhatsApp',
      phoneValue: '+963 995 764 573',
      emailLabel: 'E-posta',
      emailValue: 'info@birlik-insaat.com',
      mapBadgeTitle: 'Birlik Şirketi (شركة بيرليك)',
      mapBadgeSubtitle: 'Bağdat Caddesi ile Port Said Caddesi Kesişimi (Caara Dondurma Karşısı)',
      openInMapsBtn: 'Google Haritalar\'da Aç',
      getDirectionsBtn: 'Yol Tarifi Al',
      whatsappAction: 'WhatsApp ile Randevu Al',
      callAction: 'Doğrudan Arama',
      sampleNotice: 'Merkezimizi şahsen ziyaret ettiğinizde ücretsiz numune incelemesi'
    }
  };

  const text = content[currentLang];
  const [showMap, setShowMap] = useState(false);
  const showMapLabel = currentLang === 'ar' ? 'عرض الخريطة هنا' : currentLang === 'tr' ? 'Haritayı burada göster' : 'Show the map here';
  const googleMapsUrl = 'https://maps.google.com/?q=35.510707,35.774618';
  const embedMapsUrl = 'https://maps.google.com/maps?q=35.510707,35.774618+(%D8%B4%D8%B1%D9%83%D8%A9%20%D8%A8%D9%8A%D8%B1%D9%84%D9%8A%D9%83%20-%20Birlik%20Company)&t=&z=18&ie=UTF8&iwloc=B&output=embed';

  const getWhatsAppAppointmentLink = () => {
    const message = currentLang === 'ar'
      ? 'مرحباً شركة بيرليك، أود حجز موعد لزيارة مقركم في اللاذقية (تقاطع شارع بغداد مع شارع بورسعيد) للاطلاع على عينات المواد ونماذج العرض.'
      : currentLang === 'tr'
      ? 'Merhaba Birlik Şirketi, Lazkiye merkez ofisinizde malzeme numunelerini incelemek için randevu almak istiyorum.'
      : 'Hello Birlik Company, I would like to book an appointment to visit your Lattakia headquarters (Baghdad St & Port Said St) to inspect material samples.';
    return `https://wa.me/963995764573?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="office" className="bg-ivory py-14 md:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Details */}
        <div className="min-w-0" data-reveal>
          <p className="flex items-center gap-2 text-sm font-bold text-brass-deep mb-2">
            <span className="w-6 h-0.5 bg-current" />
            {text.tag}
          </p>
          <h2 className="text-3xl sm:text-4xl font-black leading-tight text-balance">{text.title}</h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted">{text.description}</p>

          <p className="mt-5 flex items-center gap-3 rounded-2xl bg-wa/10 text-wa-deep p-4 text-sm font-bold">
            <Store className="w-5 h-5 shrink-0" />
            {text.sampleNotice}
          </p>

          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            {/* Address */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:col-span-2 flex gap-3 rounded-2xl bg-white border border-line hover:border-brass p-4 transition-colors"
            >
              <span className="w-10 h-10 rounded-full bg-sand text-brass-deep flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[11px] font-bold text-muted">{text.addressTitle}</span>
                <span className="block mt-0.5 text-sm font-bold text-ink leading-relaxed">{text.addressValue}</span>
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-brass-deep">
                  {text.openInMapsBtn}
                  <ExternalLink className="w-3 h-3" />
                </span>
              </span>
            </a>

            {/* Hours */}
            <div className="flex gap-3 rounded-2xl bg-white border border-line p-4">
              <span className="w-10 h-10 rounded-full bg-sand text-brass-deep flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold text-muted">{text.hoursTitle}</p>
                <dl className="mt-1 space-y-1.5 text-sm">
                  {text.hours.map((h) => (
                    <div key={h.days}>
                      <dt className="font-bold text-ink">{h.days}</dt>
                      <dd className="text-muted text-xs">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* Contact */}
            <div className="flex gap-3 rounded-2xl bg-white border border-line p-4">
              <span className="w-10 h-10 rounded-full bg-sand text-brass-deep flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-muted">{text.contactTitle}</p>
                <a href="tel:+963995764573" className="block py-2 text-sm font-extrabold text-ink hover:text-brass-deep">
                  <bdi dir="ltr">{text.phoneValue}</bdi>
                </a>
                <p className="text-xs text-muted">{text.phoneLabel}</p>
                <a href={`mailto:${text.emailValue}`} className="flex items-center gap-1.5 py-2.5 text-xs font-bold text-ink hover:text-brass-deep break-all">
                  <Mail className="w-3.5 h-3.5 shrink-0 text-brass-deep" />
                  {text.emailValue}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            <a
              href={getWhatsAppAppointmentLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-wa hover:bg-wa-deep text-white font-extrabold text-sm transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              {text.whatsappAction}
            </a>
            <a
              href="tel:+963995764573"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-ink hover:bg-ink-soft text-white font-bold text-sm transition-colors"
            >
              <Phone className="w-4 h-4 text-brass-light" />
              {text.callAction}
            </a>
          </div>
        </div>

        {/* Map: a light placeholder first; Google's map loads only when asked for */}
        <div className="min-w-0 lg:sticky lg:top-28" data-reveal>
          <div className="relative rounded-3xl overflow-hidden bg-ink text-white aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]">
            {showMap ? (
              <iframe
                title={text.mapBadgeTitle}
                src={embedMapsUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-[radial-gradient(circle_at_50%_40%,rgba(185,138,69,0.28),transparent_60%)]">
                <span className="relative flex items-center justify-center w-20 h-20">
                  <span className="absolute inset-0 rounded-full bg-brass/30 motion-safe:animate-ping" />
                  <span className="relative w-16 h-16 rounded-full bg-brass text-ink flex items-center justify-center shadow-xl">
                    <MapPin className="w-7 h-7" />
                  </span>
                </span>
                <p className="mt-5 text-xl font-black">{text.mapBadgeTitle}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/75 max-w-xs">{text.mapBadgeSubtitle}</p>
                <p className="mt-1 text-xs text-white/50">
                  <bdi dir="ltr">{text.plusCode}</bdi>
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                  <button
                    type="button"
                    onClick={() => setShowMap(true)}
                    id="show-map-btn"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white text-ink font-extrabold text-sm hover:bg-sand transition-colors"
                  >
                    <MapIcon className="w-4 h-4" />
                    {showMapLabel}
                  </button>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="open-google-maps-btn"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-brass text-ink font-extrabold text-sm hover:bg-brass-light transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    {text.getDirectionsBtn}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
