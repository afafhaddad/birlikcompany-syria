import React, { useState } from 'react';
import { Calculator, Check, ChevronDown, Loader2, Mail, MessageSquare, Send } from 'lucide-react';
import { Language } from '../types';
import { CATEGORY_CARDS } from '../data/categoryCards';
import { Link } from '../router';
import { calculatorRoute } from '../routing';
import { whatsappLink } from '../site';
import { track } from '../analytics';

type QA = { q: string; a: string; calc?: boolean };

const FAQ: Record<Language, QA[]> = {
  ar: [
    { q: 'هل المواد مقاومة للماء فعلاً؟', a: 'نعم، كل الفئات مقاومة للماء والرطوبة 100%، ولذلك تُستخدم في الحمّامات والمطابخ والجدران المعرّضة للرطوبة. إذا كان في الجدار تسريب ماء فيجب إصلاح مصدره أولاً.' },
    { q: 'هل يمكن التركيب فوق البلاط القديم بدون تكسير؟', a: 'في أغلب الحالات نعم: ألواح بديل الرخام وألواح SPC وأرضيات SPC تُركّب فوق البلاط القديم بعد التأكد من أن السطح مستوٍ ونظيف وجاف. أرسل لنا صورة المكان ونؤكد لك.' },
    { q: 'كيف أعرف السعر؟', a: 'السعر يعتمد على الموديل والكمية. احسب الكمية بحاسبة الموقع وأرسل النتيجة على واتساب، أو أرسل لنا القياسات مباشرة، ونرد عليك بالسعر.', calc: true },
    { q: 'هل توصلون خارج اللاذقية؟', a: 'نعم، نوصل إلى كل المحافظات السورية.' },
    { q: 'هل يمكنني رؤية المواد قبل الشراء؟', a: 'نعم، العينات متوفرة في معرضنا في اللاذقية (تقاطع شارع بغداد مع شارع بورسعيد). الدوام من الأحد إلى الخميس 10:00–17:00 والسبت 10:00–15:00.' },
    { q: 'ماذا عن التركيب؟', a: 'لكل فئة دليل تركيب وفيديو على الموقع، والتركيب سريع ولا يحتاج تكسيراً. اسألنا على واتساب عن التركيب في منطقتك.' },
  ],
  en: [
    { q: 'Are the materials really waterproof?', a: 'Yes — every range is 100% water and moisture resistant, which is why they are used in bathrooms, kitchens and damp-prone walls. If a wall has an active leak, fix the source first.' },
    { q: 'Can they go over old tiles without demolition?', a: 'In most cases, yes: PVC marble panels, SPC wall panels and SPC flooring are fitted over old tiles once the surface is flat, clean and dry. Send us a photo and we will confirm.' },
    { q: 'How do I get a price?', a: 'The price depends on the model and quantity. Work out your quantity with the calculator and send it on WhatsApp, or send us your measurements, and we reply with a price.', calc: true },
    { q: 'Do you deliver outside Lattakia?', a: 'Yes, we deliver to every Syrian governorate.' },
    { q: 'Can I see the materials before buying?', a: 'Yes, samples are in our Lattakia showroom (Baghdad St. and Port Said St. junction). Open Sunday–Thursday 10:00–17:00 and Saturday 10:00–15:00.' },
    { q: 'What about installation?', a: 'Every range has an installation guide and video on the site, and fitting is fast with no demolition. Ask us on WhatsApp about installation in your area.' },
  ],
  tr: [
    { q: 'Malzemeler gerçekten su geçirmez mi?', a: 'Evet — tüm gruplar %100 suya ve neme dayanıklıdır; bu yüzden banyo, mutfak ve nemli duvarlarda kullanılır. Duvarda aktif sızıntı varsa önce kaynağı giderilmelidir.' },
    { q: 'Eski fayansın üzerine kırmadan uygulanabilir mi?', a: 'Çoğu durumda evet: PVC mermer, SPC duvar panelleri ve SPC zemin, yüzey düz, temiz ve kuru ise eski fayansın üzerine uygulanır. Bir fotoğraf gönderin, teyit edelim.' },
    { q: 'Fiyatı nasıl öğrenirim?', a: 'Fiyat modele ve miktara bağlıdır. Hesaplayıcıyla miktarı bulup WhatsApp ile gönderin ya da ölçülerinizi iletin; fiyatı bildirelim.', calc: true },
    { q: 'Lazkiye dışına teslimat var mı?', a: 'Evet, Suriye’nin tüm illerine teslimat yapıyoruz.' },
    { q: 'Satın almadan önce malzemeleri görebilir miyim?', a: 'Evet, numuneler Lazkiye showroomumuzda (Bağdat Cd. ile Port Said Cd. kavşağı). Pazar–Perşembe 10:00–17:00, Cumartesi 10:00–15:00.' },
    { q: 'Montaj nasıl oluyor?', a: 'Her grubun sitede montaj rehberi ve videosu var; montaj hızlıdır ve kırım gerektirmez. Bölgenizde montaj için WhatsApp’tan sorun.' },
  ],
};

const TEXT = {
  ar: {
    faqEyebrow: 'أسئلة شائعة',
    faqTitle: 'كل ما تريد معرفته قبل أن تبدأ',
    calc: 'افتح حاسبة الكمية',
    formEyebrow: 'راسلنا',
    formTitle: 'أرسل استفسارك',
    formSub: 'اترك بياناتك وسؤالك ونرد عليك في أقرب وقت خلال ساعات الدوام.',
    name: 'الاسم',
    phone: 'رقم الهاتف / واتساب',
    email: 'الإيميل (اختياري)',
    city: 'المدينة',
    interest: 'مهتم بـ',
    any: 'لم أقرر بعد',
    message: 'رسالتك',
    messagePh: 'مثلاً: أريد تكسية جدار صالون بعرض 4 م وارتفاع 2.8 م ببديل الخشب…',
    send: 'إرسال الاستفسار',
    sending: 'جارٍ الإرسال…',
    need: 'اكتب اسمك ورقم هاتفك أو إيميلك ورسالتك.',
    sent: 'وصلنا استفسارك، شكراً لك! سنتواصل معك قريباً.',
    fallback: 'تعذّر الإرسال من هنا الآن. أرسل نفس الرسالة على واتساب بضغطة واحدة:',
    viaWa: 'إرسال عبر واتساب',
    or: 'أو',
    waIntro: 'استفسار من الموقع',
  },
  en: {
    faqEyebrow: 'FAQ',
    faqTitle: 'What to know before you start',
    calc: 'Open the quantity calculator',
    formEyebrow: 'Write to us',
    formTitle: 'Send an enquiry',
    formSub: 'Leave your details and question and we will get back to you during working hours.',
    name: 'Name',
    phone: 'Phone / WhatsApp',
    email: 'Email (optional)',
    city: 'City',
    interest: 'Interested in',
    any: 'Not sure yet',
    message: 'Your message',
    messagePh: 'e.g. I want to clad a 4 m × 2.8 m living-room wall with wood-alternative panels…',
    send: 'Send enquiry',
    sending: 'Sending…',
    need: 'Please add your name, a phone number or email, and a message.',
    sent: 'Thank you — we have your enquiry and will be in touch soon.',
    fallback: 'We could not send it from here right now. Send the same message on WhatsApp in one tap:',
    viaWa: 'Send via WhatsApp',
    or: 'or',
    waIntro: 'Website enquiry',
  },
  tr: {
    faqEyebrow: 'Sık sorulanlar',
    faqTitle: 'Başlamadan önce bilmeniz gerekenler',
    calc: 'Miktar hesaplayıcıyı aç',
    formEyebrow: 'Bize yazın',
    formTitle: 'Soru gönderin',
    formSub: 'Bilgilerinizi ve sorunuzu bırakın, mesai saatlerinde size dönelim.',
    name: 'Ad',
    phone: 'Telefon / WhatsApp',
    email: 'E-posta (isteğe bağlı)',
    city: 'Şehir',
    interest: 'İlgilendiğiniz',
    any: 'Henüz karar vermedim',
    message: 'Mesajınız',
    messagePh: 'örn. 4 m × 2,8 m salon duvarını ahşap alternatifi panelle kaplamak istiyorum…',
    send: 'Gönder',
    sending: 'Gönderiliyor…',
    need: 'Lütfen adınızı, telefon veya e-postanızı ve mesajınızı yazın.',
    sent: 'Teşekkürler — sorunuz bize ulaştı, en kısa sürede dönüş yapacağız.',
    fallback: 'Şu anda buradan gönderilemedi. Aynı mesajı tek dokunuşla WhatsApp ile gönderin:',
    viaWa: 'WhatsApp ile gönder',
    or: 'veya',
    waIntro: 'Web sitesi sorusu',
  },
};

const field =
  'w-full px-4 py-3 rounded-xl border border-white/15 bg-white/[.06] text-white placeholder:text-white/35 text-base focus:outline-none focus:border-brass focus:ring-1 focus:ring-brass transition-colors';

export const FaqInquiry: React.FC<{ currentLang: Language }> = ({ currentLang }) => {
  const t = TEXT[currentLang];
  const [open, setOpen] = useState(0);
  const [f, setF] = useState({ name: '', phone: '', email: '', city: '', interest: '', message: '', website: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'fallback' | 'invalid'>('idle');
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF({ ...f, [k]: e.target.value });

  const waText = [
    `${t.waIntro} — ${f.name}`,
    f.city && `${t.city}: ${f.city}`,
    f.interest && `${t.interest}: ${f.interest}`,
    f.email && `${t.email}: ${f.email}`,
    '',
    f.message,
  ]
    .filter((x) => x !== false && x !== undefined)
    .join('\n');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (f.name.trim().length < 2 || (!f.phone.trim() && !f.email.trim()) || f.message.trim().length < 5) return setState('invalid');
    setState('sending');
    try {
      const r = await fetch('/api/inquiry/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, lang: currentLang }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setState('sent');
      track('generate_lead', { method: 'email_form', placement: 'home_form' });
    } catch {
      setState('fallback');
    }
  };

  return (
    <section id="faq" className="bg-ink text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* FAQ */}
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-sm font-bold text-brass-light" data-reveal>
            <span className="w-6 h-0.5 bg-current" />
            {t.faqEyebrow}
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black leading-tight" data-reveal>
            {t.faqTitle}
          </h2>
          <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {FAQ[currentLang].map((x, i) => {
              const on = open === i;
              return (
                <li key={x.q}>
                  <button
                    type="button"
                    aria-expanded={on}
                    onClick={() => setOpen(on ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-start"
                  >
                    <span className={`text-base sm:text-lg font-extrabold transition-colors ${on ? 'text-brass-light' : 'text-white'}`}>{x.q}</span>
                    <span className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-all ${on ? 'bg-brass border-brass text-ink rotate-180' : 'border-white/20'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  {/* Answers stay in the page (grid-rows trick animates the height) */}
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <p className="pb-5 text-sm sm:text-base leading-loose text-white/75">{x.a}</p>
                      {x.calc && (
                        <Link
                          to={calculatorRoute(currentLang)}
                          className="mb-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brass hover:bg-brass-light text-ink font-extrabold text-sm transition-colors"
                        >
                          <Calculator className="w-4 h-4" />
                          {t.calc}
                        </Link>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Enquiry form */}
        <div id="inquiry" className="min-w-0 scroll-mt-24 rounded-[32px] bg-gradient-to-b from-white/[.08] to-white/[.03] ring-1 ring-white/10 p-5 sm:p-8" data-reveal>
          <p className="flex items-center gap-2 text-sm font-bold text-brass-light">
            <Mail className="w-4 h-4" />
            {t.formEyebrow}
          </p>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-black">{t.formTitle}</h2>
          <p className="mt-2 text-sm text-white/65">{t.formSub}</p>

          {state === 'sent' ? (
            <div className="mt-8 rounded-2xl bg-wa/20 ring-1 ring-wa/40 p-6 flex items-start gap-3 animate-fade-up" role="status">
              <span className="w-9 h-9 rounded-full bg-wa flex items-center justify-center shrink-0">
                <Check className="w-5 h-5" />
              </span>
              <p className="font-bold leading-relaxed">{t.sent}</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="mt-6 grid sm:grid-cols-2 gap-3">
              <label className="block">
                <span className="block text-xs font-bold text-white/70 mb-1">{t.name}</span>
                <input className={field} value={f.name} onChange={set('name')} autoComplete="name" maxLength={80} />
              </label>
              <label className="block">
                <span className="block text-xs font-bold text-white/70 mb-1">{t.phone}</span>
                <input className={field} value={f.phone} onChange={set('phone')} type="tel" inputMode="tel" autoComplete="tel" dir="ltr" maxLength={40} />
              </label>
              <label className="block">
                <span className="block text-xs font-bold text-white/70 mb-1">{t.email}</span>
                <input className={field} value={f.email} onChange={set('email')} type="email" autoComplete="email" dir="ltr" maxLength={120} />
              </label>
              <label className="block">
                <span className="block text-xs font-bold text-white/70 mb-1">{t.city}</span>
                <input className={field} value={f.city} onChange={set('city')} autoComplete="address-level2" maxLength={60} />
              </label>
              <label className="block sm:col-span-2">
                <span className="block text-xs font-bold text-white/70 mb-1">{t.interest}</span>
                <select className={`${field} [&>option]:text-ink`} value={f.interest} onChange={set('interest')}>
                  <option value="">{t.any}</option>
                  {CATEGORY_CARDS.map((c) => (
                    <option key={c.id} value={c.name[currentLang]}>
                      {c.name[currentLang]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="block text-xs font-bold text-white/70 mb-1">{t.message}</span>
                <textarea className={`${field} min-h-[120px] resize-y`} value={f.message} onChange={set('message')} placeholder={t.messagePh} maxLength={2000} />
              </label>
              {/* Hidden from people; bots fill it */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} className="hidden" aria-hidden="true" />

              {state === 'invalid' && <p className="sm:col-span-2 text-sm font-bold text-[#F2B28C]">{t.need}</p>}

              {state === 'fallback' ? (
                <div className="sm:col-span-2 rounded-2xl bg-white/5 p-4 animate-fade-up">
                  <p className="text-sm text-white/80">{t.fallback}</p>
                  <a
                    href={whatsappLink(waText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full bg-wa hover:bg-wa-deep font-extrabold text-sm transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {t.viaWa}
                  </a>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="sm:col-span-2 mt-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-brass hover:bg-brass-light disabled:opacity-70 text-ink font-extrabold transition-colors"
                >
                  {state === 'sending' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 rtl:-scale-x-100" />}
                  {state === 'sending' ? t.sending : t.send}
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
