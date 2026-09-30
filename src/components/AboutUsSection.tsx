import React from 'react';
import { 
  Building2, 
  Sparkles, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  MessageSquare, 
  PackageCheck,
  Calendar,
  Layers,
  Compass,
  Users
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface AboutUsSectionProps {
  currentLang: 'ar' | 'en' | 'tr';
  onNavigate: (sectionId: string) => void;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({
  currentLang,
  onNavigate
}) => {
  const t = TRANSLATIONS[currentLang];
  const isRtl = currentLang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const whatsappSampleUrl = `https://wa.me/963995764573?text=${encodeURIComponent(
    currentLang === 'ar' 
      ? 'مرحباً شركة بيرليك، أود حجز موعد لزيارة مقركم في اللاذقية لمعاينة الخامات واستلام عينات مجانية لمشروعي.' 
      : 'Hello Birlik Company, I would like to book a visit to your Lattakia headquarters to view materials and collect free samples in person.'
  )}`;

  return (
    <section 
      id="about" 
      className="py-16 sm:py-20 md:py-24 bg-[#FAF7F2] border-b border-[#E6DFD5] relative overflow-hidden"
    >
      {/* Subtle Background Architectural Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#9E7241_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl text-start mb-12 sm:mb-16">
          
          {/* Prominent Eyebrow Badge - Made much bigger as requested with clean 'من نحن' */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#FFFFFF] border border-[#9E7241]/40 rounded-full text-base sm:text-lg md:text-xl font-black text-[#9E7241] shadow-xs mb-5">
            <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#9E7241] shrink-0" />
            <span className="font-['Cairo','Changa','Tajawal',sans-serif] tracking-wide leading-none">{t.about.badge}</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-black text-[#1C1917] leading-tight tracking-tight mb-4 font-['Cairo','Tajawal',sans-serif]">
            {t.about.title}
          </h2>

          <div className="w-20 h-1 bg-[#D4991A] rounded-full" />
        </div>

        {/* Pillar 1: Founding in Turkey (2019) & Syrian Opening (2026) */}
        <div className="bg-[#FFFFFF] border border-[#E5DFD5] p-6 sm:p-8 md:p-10 shadow-sm rounded-sm mb-8 transition-all hover:border-[#9E7241]/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Story & Narrative */}
            <div className="lg:col-span-8 space-y-5 text-start">
              <div className="flex items-center gap-3">
                <span className="p-2.5 bg-[#FAF7F2] border border-[#E5DFD5] rounded-lg text-[#9E7241]">
                  <Calendar className="w-5 h-5 text-[#9E7241]" />
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1C1917]">
                    {t.about.p1Title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-[#9E7241] font-semibold">
                    <span>2019 (Türkiye)</span>
                    <span>•</span>
                    <span>2026 (Syria)</span>
                  </div>
                </div>
              </div>

              {/* Exact user paragraph 1 */}
              <p className="text-sm sm:text-base md:text-[1.05rem] text-[#4A423B] leading-relaxed font-normal">
                {t.about.p1}
              </p>

              {/* Target Audiences Chips */}
              <div className="pt-2">
                <span className="block text-xs uppercase tracking-wider text-[#78716A] font-semibold mb-2.5">
                  {currentLang === 'ar' ? 'شركاؤنا في النجاح والتطوير المعماري:' : 'Collaborating with:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {t.about.audiences.map((audience, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF7F2] border border-[#DDD5C7] text-xs font-semibold text-[#2B2621] rounded-xs shadow-2xs"
                    >
                      <Users className="w-3.5 h-3.5 text-[#9E7241]" />
                      <span>{audience}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Milestones Stat Block */}
            <div className="lg:col-span-4 bg-[#FAF7F2] border border-[#E2DBD0] p-5 sm:p-6 rounded-xs space-y-4">
              <div className="border-b border-[#E2DBD0] pb-4">
                <div className="text-3xl sm:text-4xl font-black text-[#D4991A] leading-none mb-1">
                  {t.about.stats.established}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#1C1917]">
                  {t.about.stats.establishedLabel}
                </div>
                <p className="text-[11px] text-[#78716A] mt-0.5">
                  {currentLang === 'ar' ? 'انطلاقة خبراتنا وتطوير خامات الإكساء' : 'Foundation & quality engineering'}
                </p>
              </div>

              <div className="border-b border-[#E2DBD0] pb-4">
                <div className="text-3xl sm:text-4xl font-black text-[#9E7241] leading-none mb-1">
                  {t.about.stats.syriaBranch}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#1C1917]">
                  {t.about.stats.syriaBranchLabel}
                </div>
                <p className="text-[11px] text-[#78716A] mt-0.5">
                  {currentLang === 'ar' ? 'المساهمة في مرحلة إعادة الإعمار' : 'Syrian branch & reconstruction support'}
                </p>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-black text-[#1E7E45] leading-none mb-1">
                  {t.about.stats.coverage}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#1C1917]">
                  {t.about.stats.coverageLabel}
                </div>
                <p className="text-[11px] text-[#78716A] mt-0.5">
                  {currentLang === 'ar' ? 'شحن مؤمّن ومباشر لموقع المشروع' : 'Expedited Syria-wide logistics'}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Dual Cards: Pillar 2 (Vision & Syrian Taste) + Pillar 3 (Services & Coverage) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          
          {/* Card 1: الرؤية والذوق السوري */}
          <div className="bg-[#FFFFFF] border border-[#E5DFD5] p-6 sm:p-8 rounded-sm shadow-sm flex flex-col justify-between transition-all hover:border-[#9E7241]/40 hover:shadow-md">
            <div className="space-y-4 text-start">
              <div className="w-12 h-12 rounded-lg bg-[#FAF7F2] border border-[#9E7241]/30 flex items-center justify-center text-[#9E7241]">
                <Sparkles className="w-6 h-6 text-[#9E7241]" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#1C1917]">
                {t.about.p2Title}
              </h3>

              {/* Exact user paragraph 2 */}
              <p className="text-sm sm:text-base text-[#4A423B] leading-relaxed font-normal">
                {t.about.p2}
              </p>

              {/* Vision Elements Checklist */}
              <div className="space-y-2.5 pt-3 border-t border-[#F0EBE1]">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2B2621]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4991A] shrink-0 mt-0.5" />
                  <span>{currentLang === 'ar' ? 'حلول ذكية بديلة للرخام والخشب الطبيعي بمرونة عالية' : 'Smart, lightweight alternatives to natural timber and heavy stone'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2B2621]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4991A] shrink-0 mt-0.5" />
                  <span>{currentLang === 'ar' ? 'تحويل المساحات المتضررة إلى بيئات فاخرة بوقت قياسي' : 'Fast, clean revitalization of damaged or worn spaces'}</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2B2621]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4991A] shrink-0 mt-0.5" />
                  <span>{currentLang === 'ar' ? 'مقاومة 100% للماء والرطوبة لتلائم مختلف البيئات السورية' : '100% waterproof and moisture resistant for long-term endurance'}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F0EBE1] text-start">
              <button 
                onClick={() => onNavigate('categories')}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#9E7241] hover:text-[#7A552D] transition-colors cursor-pointer"
              >
                <span>{t.about.exploreCatalogBtn}</span>
                <ArrowIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: الخدمات والانتشار */}
          <div className="bg-[#FFFFFF] border border-[#E5DFD5] p-6 sm:p-8 rounded-sm shadow-sm flex flex-col justify-between transition-all hover:border-[#9E7241]/40 hover:shadow-md">
            <div className="space-y-4 text-start">
              <div className="w-12 h-12 rounded-lg bg-[#FAF7F2] border border-[#1E7E45]/30 flex items-center justify-center text-[#1E7E45]">
                <Truck className="w-6 h-6 text-[#1E7E45]" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#1C1917]">
                {t.about.p3Title}
              </h3>

              {/* Exact user paragraph 3 */}
              <p className="text-sm sm:text-base text-[#4A423B] leading-relaxed font-normal">
                {t.about.p3}
              </p>

              {/* Service Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-[#F0EBE1]">
                <div className="p-2.5 bg-[#FAF7F2] border border-[#EAE3D6] rounded-xs flex items-center gap-2 text-xs font-semibold text-[#1C1917]">
                  <MapPin className="w-4 h-4 text-[#9E7241] shrink-0" />
                  <span>{currentLang === 'ar' ? 'المقر الرئيسي في اللاذقية' : 'Lattakia Headquarters'}</span>
                </div>
                <div className="p-2.5 bg-[#FAF7F2] border border-[#EAE3D6] rounded-xs flex items-center gap-2 text-xs font-semibold text-[#1C1917]">
                  <Compass className="w-4 h-4 text-[#9E7241] shrink-0" />
                  <span>{currentLang === 'ar' ? 'استشارات تخصصية مجانية' : 'Architectural Consultations'}</span>
                </div>
                <div className="p-2.5 bg-[#F4FAF6] border border-[#1E7E45]/30 rounded-xs flex items-center gap-2 text-xs font-semibold text-[#1E7E45]">
                  <PackageCheck className="w-4 h-4 text-[#1E7E45] shrink-0" />
                  <span>{currentLang === 'ar' ? 'عينات مجانية عند زيارة المقر' : 'Free Samples (In-Person Visit)'}</span>
                </div>
                <div className="p-2.5 bg-[#FAF7F2] border border-[#EAE3D6] rounded-xs flex items-center gap-2 text-xs font-semibold text-[#1C1917]">
                  <Truck className="w-4 h-4 text-[#9E7241] shrink-0" />
                  <span>{currentLang === 'ar' ? 'شحن البضائع لكافة المحافظات' : 'Goods Shipping: All Governorates'}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F0EBE1] flex flex-wrap items-center gap-3 text-start">
              <button
                onClick={() => onNavigate('office')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1E7E45] hover:bg-[#166034] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors shadow-2xs cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{t.about.freeSamplesBtn}</span>
              </button>

              <a 
                href={whatsappSampleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs text-[#2B2621] hover:text-[#1E7E45] font-semibold transition-colors border border-[#DDD5C7] rounded-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#1E7E45]" />
                <span>{currentLang === 'ar' ? 'حجز موعد عبر واتساب' : 'Book Visit via WhatsApp'}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Direct Trust Bar Banner */}
        <div className="p-5 sm:p-6 bg-[#24201D] text-[#FAF7F2] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-start">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#D4991A]/20 border border-[#D4991A]/40 flex items-center justify-center shrink-0">
              <PackageCheck className="w-5 h-5 text-[#D4991A]" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-white font-['Cairo','Tajawal',sans-serif]">
                {currentLang === 'ar' 
                  ? 'هل ترغب في لمس خاماتنا ومعاينة جودتها قبل بدء مشروعك؟' 
                  : 'Want to experience our material texture and quality firsthand?'}
              </div>
              <div className="text-xs sm:text-sm text-[#D8C6B1] mt-0.5">
                {currentLang === 'ar'
                  ? 'يسعدنا استقبالكم شخصياً في مقرنا الرئيسي باللاذقية لمعاينة النماذج الحية، حيث نقدّم عينات مجانية لزوار مقرنا الكرام مع استشارة فنية شاملة لمشروعكم.'
                  : 'We welcome you in person at our Lattakia headquarters to inspect live displays and receive complimentary material samples with technical guidance.'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
            <button
              onClick={() => onNavigate('office')}
              className="flex-1 sm:flex-none px-5 py-3 bg-[#D4991A] hover:bg-[#BE8613] text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 rounded-xs cursor-pointer font-['Cairo','Tajawal',sans-serif]"
            >
              <MapPin className="w-4 h-4" />
              <span>{currentLang === 'ar' ? 'زيارة مقرنا باللاذقية' : 'Visit Lattakia HQ'}</span>
            </button>

            <a
              href={whatsappSampleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm tracking-wide border border-white/20 transition-all flex items-center justify-center gap-1.5 rounded-xs"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>{currentLang === 'ar' ? 'حجز موعد' : 'Book Visit'}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
