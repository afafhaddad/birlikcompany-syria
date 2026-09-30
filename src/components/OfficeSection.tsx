import React from 'react';
import { MapPin, Clock, MessageSquare, Phone, Mail, ExternalLink, Navigation, Building2 } from 'lucide-react';
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
    <section 
      id="office" 
      className="py-16 sm:py-20 md:py-24 bg-[#F2EDE4] border-b border-[#E0D7C9] text-[#24201D] font-sans"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Building2 className="w-4 h-4 text-[#9E7241]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#9E7241] font-semibold">
              {text.tag}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-[#24201D] tracking-tight mb-4">
            {text.title}
          </h2>

          <p className="text-sm sm:text-base text-[#6E645A] font-light leading-relaxed">
            {text.description}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-[#E8E1D5] border border-[#DDD5C7] text-xs text-[#5C554E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9E7241]" />
            <span>{text.sampleNotice}</span>
          </div>
        </div>

        {/* 3 Information Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          
          {/* 1. Address & Location */}
          <div className="p-6 bg-[#FFFFFF] border border-[#DDD5C7] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#9E7241] mb-3">
                <MapPin className="w-5 h-5 shrink-0" />
                <h3 className="font-serif text-base font-semibold text-[#1C1917]">
                  {text.addressTitle}
                </h3>
              </div>
              <p className="text-sm text-[#423C36] leading-relaxed font-medium mb-3">
                {text.addressValue}
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-[#6E645A] bg-[#F7F4EE] px-2.5 py-1 border border-[#E8E2D8]">
                <span className="font-mono text-[#9E7241] font-semibold">Plus Code:</span>
                <span className="font-mono">{text.plusCode}</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#EFECE4]">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#9E7241] hover:text-[#7A562D] transition-colors"
              >
                <span>{text.openInMapsBtn}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 2. Official Working Hours */}
          <div className="p-6 bg-[#FFFFFF] border border-[#DDD5C7] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#9E7241] mb-3">
                <Clock className="w-5 h-5 shrink-0" />
                <h3 className="font-serif text-base font-semibold text-[#1C1917]">
                  {text.hoursTitle}
                </h3>
              </div>
              
              <ul className="space-y-2.5 text-xs sm:text-[13px]">
                {text.hours.map((item, i) => (
                  <li key={i} className="flex items-center justify-between py-1 border-b border-[#F0EBE3] last:border-0">
                    <span className="text-[#6E645A] font-medium">{item.days}:</span>
                    <span className={`font-semibold ${item.time === 'عطلة أسبوعية' || item.time === 'Closed' || item.time === 'Kapalı' ? 'text-[#C62828]' : 'text-[#1C1917]'}`}>
                      {item.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 pt-4 border-t border-[#EFECE4] text-[11px] text-[#8C8278]">
              {currentLang === 'ar' ? 'الاستقبال متاح خلال أوقات العمل الرسمية' : 'Walk-ins welcomed during open hours'}
            </div>
          </div>

          {/* 3. Direct Contact Channels */}
          <div className="p-6 bg-[#FFFFFF] border border-[#DDD5C7] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#9E7241] mb-3">
                <Phone className="w-5 h-5 shrink-0" />
                <h3 className="font-serif text-base font-semibold text-[#1C1917]">
                  {text.contactTitle}
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-[13px]">
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[#8C8278] mb-0.5">
                    {text.phoneLabel}
                  </span>
                  <a
                    href="tel:+963995764573"
                    className="font-mono text-sm font-bold text-[#1C1917] hover:text-[#9E7241] transition-colors"
                    dir="ltr"
                  >
                    +963 995 764 573
                  </a>
                </div>

                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[#8C8278] mb-0.5">
                    {text.emailLabel}
                  </span>
                  <a
                    href="mailto:info@birlik-insaat.com"
                    className="font-mono text-xs sm:text-sm font-medium text-[#1C1917] hover:text-[#9E7241] transition-colors break-all"
                  >
                    info@birlik-insaat.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#EFECE4]">
              <a
                href={getWhatsAppAppointmentLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#1E7E45] hover:text-[#166034] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{currentLang === 'ar' ? 'محادثة واتساب مباشرة' : 'Direct WhatsApp Chat'}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Interactive Google Map with Branded Birlik Company Pin */}
        <div className="bg-[#FFFFFF] border border-[#DDD5C7] shadow-sm overflow-hidden mb-10">
          
          {/* Map Top Bar with Pin & External Navigation Link */}
          <div className="p-4 sm:p-5 bg-[#FAF7F2] border-b border-[#DDD5C7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#9E7241]/15 text-[#9E7241] flex items-center justify-center shrink-0 border border-[#9E7241]/30">
                <MapPin className="w-5 h-5 fill-[#9E7241] text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif font-bold text-base sm:text-lg text-[#1C1917]">
                    {text.mapBadgeTitle}
                  </h4>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-[#9E7241] text-white font-semibold tracking-wider">
                    HQ
                  </span>
                </div>
                <p className="text-xs text-[#6E645A] mt-0.5">
                  {text.mapBadgeSubtitle} • <span className="font-mono text-[#9E7241] font-semibold">{text.plusCode}</span>
                </p>
              </div>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1C1917] hover:bg-[#3D3732] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-xs shrink-0"
              id="open-google-maps-btn"
            >
              <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{text.openInMapsBtn}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

          </div>

          {/* Embedded Map iFrame */}
          <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] bg-[#EFECE4]">
            <iframe
              title="موقع شركة بيرليك على خرائط Google"
              src={embedMapsUrl}
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

        {/* Bottom CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-lg mx-auto">
          <a
            href={getWhatsAppAppointmentLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-6 bg-[#1E7E45] hover:bg-[#166034] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
            id="office-whatsapp-cta"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{text.whatsappAction}</span>
          </a>

          <a
            href="tel:+963995764573"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 py-3.5 px-6 border border-[#DDD5C7] bg-[#FFFFFF] hover:border-[#9E7241] text-[#24201D] hover:text-[#9E7241] text-xs font-medium uppercase tracking-wider transition-all shadow-2xs"
            id="office-call-cta"
          >
            <Phone className="w-4 h-4 text-[#9E7241]" />
            <span>{text.callAction}: +963 995 764 573</span>
          </a>
        </div>

      </div>
    </section>
  );
};
