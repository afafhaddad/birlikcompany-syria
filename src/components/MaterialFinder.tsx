import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Bath, Briefcase, CookingPot, Droplets, MessageSquare, Sofa, Sparkles } from 'lucide-react';
import { Language, ProductCategory } from '../types';
import { PRODUCT_MODELS, isModelInCategory } from '../data/products';
import { categoryCard } from '../data/categoryCards';
import { categoryRoute, productRoute } from '../routing';
import { Link } from '../router';
import { whatsappLink } from '../site';

type Room = 'bathroom' | 'kitchen' | 'living' | 'damp' | 'shop';
type Surface = 'wall' | 'floor';
type Look = 'wood' | 'marble' | 'plain';

const TEXT = {
  ar: {
    title: 'أي مادة تناسب مكانك؟',
    sub: 'ثلاث نقرات ونقترح عليك الحل والموديلات.',
    q1: 'أين؟',
    q2: 'جدار أم أرضية؟',
    q3: 'أي شكل تحب؟',
    rooms: { bathroom: 'حمّام', kitchen: 'مطبخ', living: 'صالون / غرفة', damp: 'جدار فيه رطوبة', shop: 'محل / مكتب' },
    surfaces: { wall: 'جدار', floor: 'أرضية' },
    looks: { wood: 'خشب', marble: 'رخام', plain: 'حجري / سادة' },
    result: 'نقترح لك',
    why: {
      ps_wood: 'شكل الخشب الدافئ بدون خوف من الماء أو التسوس، وتركيب سريع بدون تكسير.',
      pvc_marble: 'لمعة الرخام بوزن خفيف وتكلفة أقل، يُركّب فوق البلاط القديم مباشرة.',
      spc_wall: 'لوح حجري صلب لا ينتفخ بالماء — الأنسب للجدران الرطبة والأماكن المكشوفة للماء.',
      spc_flooring: 'أرضية حجرية بنظام كليك مقاومة للماء والخدش، تُركّب فوق البلاط بدون تكسير.',
      ps_slats: 'قُضبان ديكور خفيفة لإطارات وتقسيمات الجدران.',
      ps_baseboards: 'نعلات مقاومة للماء والضربات، بعضها بإضاءة LED.',
    } as Record<string, string>,
    see: 'شاهد كل الموديلات',
    ask: 'اسألنا على واتساب',
    wa: (r: string, room: string) => `مرحباً شركة بيرليك، أبحث عن ${r} لـ${room}. ما الموديلات والأسعار المتوفرة؟`,
    again: 'ابدأ من جديد',
  },
  en: {
    title: 'Which material suits your space?',
    sub: 'Three taps and we suggest the solution and models.',
    q1: 'Where?',
    q2: 'Wall or floor?',
    q3: 'Which look do you like?',
    rooms: { bathroom: 'Bathroom', kitchen: 'Kitchen', living: 'Living / bedroom', damp: 'Damp wall', shop: 'Shop / office' },
    surfaces: { wall: 'Wall', floor: 'Floor' },
    looks: { wood: 'Wood', marble: 'Marble', plain: 'Stone / plain' },
    result: 'We suggest',
    why: {
      ps_wood: 'The warmth of wood with no fear of water or rot, installed fast with no demolition.',
      pvc_marble: 'The gloss of marble at a fraction of the weight and cost, fitted straight over old tiles.',
      spc_wall: 'A rigid stone-polymer panel that never swells with water — best for damp walls and wet areas.',
      spc_flooring: 'Click-fit stone flooring, water- and scratch-resistant, laid over old tiles with no demolition.',
      ps_slats: 'Light decorative mouldings for wall frames and panelling.',
      ps_baseboards: 'Water- and impact-resistant baseboards, some with LED lighting.',
    } as Record<string, string>,
    see: 'See all models',
    ask: 'Ask us on WhatsApp',
    wa: (r: string, room: string) => `Hello Birlik Company, I'm looking for ${r} for my ${room.toLowerCase()}. Which models and prices are available?`,
    again: 'Start again',
  },
  tr: {
    title: 'Mekânınıza hangi malzeme uygun?',
    sub: 'Üç dokunuşla çözümü ve modelleri önerelim.',
    q1: 'Nerede?',
    q2: 'Duvar mı zemin mi?',
    q3: 'Hangi görünümü seversiniz?',
    rooms: { bathroom: 'Banyo', kitchen: 'Mutfak', living: 'Salon / oda', damp: 'Nemli duvar', shop: 'Dükkân / ofis' },
    surfaces: { wall: 'Duvar', floor: 'Zemin' },
    looks: { wood: 'Ahşap', marble: 'Mermer', plain: 'Taş / düz' },
    result: 'Önerimiz',
    why: {
      ps_wood: 'Sudan ve çürümeden korkmadan ahşabın sıcaklığı; kırmadan hızlı montaj.',
      pvc_marble: 'Mermerin parlaklığı, çok daha hafif ve ekonomik; eski fayansın üzerine uygulanır.',
      spc_wall: 'Suyla şişmeyen sert taş-polimer panel — nemli duvarlar ve ıslak alanlar için ideal.',
      spc_flooring: 'Tıklamalı taş zemin, suya ve çizilmeye dayanıklı; eski fayansın üzerine döşenir.',
      ps_slats: 'Duvar çerçeveleri için hafif dekor çıtaları.',
      ps_baseboards: 'Suya ve darbeye dayanıklı süpürgelikler, bazıları LED aydınlatmalı.',
    } as Record<string, string>,
    see: 'Tüm modelleri gör',
    ask: "WhatsApp'tan sorun",
    wa: (r: string, room: string) => `Merhaba Birlik Şirketi, ${room} için ${r} arıyorum. Hangi modeller ve fiyatlar mevcut?`,
    again: 'Baştan başla',
  },
};

const ROOM_ICON: Record<Room, React.ComponentType<{ className?: string }>> = {
  bathroom: Bath,
  kitchen: CookingPot,
  living: Sofa,
  damp: Droplets,
  shop: Briefcase,
};

const recommend = (room: Room, surface: Surface, look: Look): ProductCategory => {
  if (surface === 'floor') return 'spc_flooring';
  if (look === 'marble') return 'pvc_marble';
  if (look === 'plain' || room === 'damp') return 'spc_wall';
  return 'ps_wood';
};

/** A three-tap quiz that turns a reader into someone looking at the right products. */
export const MaterialFinder: React.FC<{ currentLang: Language }> = ({ currentLang }) => {
  const t = TEXT[currentLang];
  const Arrow = currentLang === 'ar' ? ArrowLeft : ArrowRight;
  const [room, setRoom] = useState<Room | null>(null);
  const [surface, setSurface] = useState<Surface | null>(null);
  const [look, setLook] = useState<Look | null>(null);
  const done = room && surface && (surface === 'floor' || look);
  const range = done ? recommend(room!, surface!, look || 'wood') : null;
  const picks = range ? PRODUCT_MODELS.filter((m) => isModelInCategory(m, range)).slice(0, 4) : [];

  const opt = (active: boolean) =>
    `inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold border transition-all ${
      active ? 'bg-brass text-ink border-brass scale-[1.03]' : 'bg-white/5 text-white/85 border-white/20 hover:border-brass'
    }`;

  return (
    <div className="rounded-[28px] bg-ink text-white p-5 sm:p-7 ring-1 ring-black/5 shadow-xl">
      <p className="flex items-center gap-2 text-brass-light text-xs font-extrabold">
        <Sparkles className="w-4 h-4" />
        {t.sub}
      </p>
      <h3 className="mt-1.5 text-xl sm:text-2xl font-black">{t.title}</h3>

      <p className="mt-5 text-sm font-extrabold text-white/70">{t.q1}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {(Object.keys(t.rooms) as Room[]).map((r) => {
          const Icon = ROOM_ICON[r];
          return (
            <button key={r} type="button" aria-pressed={room === r} onClick={() => setRoom(r)} className={opt(room === r)}>
              <Icon className="w-4 h-4" />
              {t.rooms[r]}
            </button>
          );
        })}
      </div>

      {room && (
        <div className="animate-fade-up">
          <p className="mt-5 text-sm font-extrabold text-white/70">{t.q2}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(Object.keys(t.surfaces) as Surface[]).map((s) => (
              <button key={s} type="button" aria-pressed={surface === s} onClick={() => setSurface(s)} className={opt(surface === s)}>
                {t.surfaces[s]}
              </button>
            ))}
          </div>
        </div>
      )}

      {surface === 'wall' && (
        <div className="animate-fade-up">
          <p className="mt-5 text-sm font-extrabold text-white/70">{t.q3}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(Object.keys(t.looks) as Look[]).map((l) => (
              <button key={l} type="button" aria-pressed={look === l} onClick={() => setLook(l)} className={opt(look === l)}>
                {t.looks[l]}
              </button>
            ))}
          </div>
        </div>
      )}

      {range && (
        <div className="mt-6 rounded-2xl bg-ivory text-ink p-4 sm:p-5 animate-fade-up" aria-live="polite">
          <p className="text-xs font-extrabold text-brass-deep">{t.result}</p>
          <p className="mt-0.5 text-xl font-black">{categoryCard(range).name[currentLang]}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink/75">{t.why[range]}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {picks.map((m) => (
              <Link
                key={m.id}
                to={productRoute(currentLang, m)}
                className="inline-flex items-center gap-2 ps-1 pe-3 py-1 rounded-full bg-white border border-line hover:border-brass text-xs font-bold"
              >
                <span className="w-6 h-6 rounded-full ring-1 ring-black/10" style={{ background: m.colorHex || '#C9A77A' }} />
                {m.name[currentLang]}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
            <Link
              to={categoryRoute(currentLang, range)}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-brass hover:bg-brass-light font-extrabold text-sm transition-colors"
            >
              {t.see}
              <Arrow className="w-4 h-4" />
            </Link>
            <a
              href={whatsappLink(t.wa(categoryCard(range).name[currentLang], t.rooms[room!]))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-wa hover:bg-wa-deep text-white font-extrabold text-sm transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              {t.ask}
            </a>
          </div>
          <button
            type="button"
            onClick={() => {
              setRoom(null);
              setSurface(null);
              setLook(null);
            }}
            className="mt-3 text-xs font-bold text-muted underline underline-offset-4"
          >
            {t.again}
          </button>
        </div>
      )}
    </div>
  );
};
