/** Contact details and shared UI strings in one place. */
import { Language } from './types';

export const PHONE_E164 = '+963995764573';
export const PHONE_DISPLAY = '+963 995 764 573';
export const TEL_HREF = `tel:${PHONE_E164}`;

export const whatsappLink = (message?: string) =>
  `https://wa.me/${PHONE_E164.slice(1)}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

type L = Record<Language, string>;
const l = (ar: string, en: string, tr: string): L => ({ ar, en, tr });

export const UI = {
  home: l('الرئيسية', 'Home', 'Ana Sayfa'),
  catalogue: l('الكتالوج', 'Catalogue', 'Katalog'),
  catalogueLong: l('كتالوج المنتجات', 'Product catalogue', 'Ürün kataloğu'),
  installation: l('التركيب', 'Installation', 'Montaj'),
  installationLong: l('دليل وفيديوهات التركيب', 'Installation guides & videos', 'Montaj rehberi ve videolar'),
  about: l('من نحن', 'About us', 'Hakkımızda'),
  founder: l('مؤسس الشركة', 'Our founder', 'Kurucumuz'),
  showroom: l('المعرض', 'Showroom', 'Showroom'),
  showroomLong: l('معرض اللاذقية', 'Lattakia showroom', 'Lazkiye showroom'),
  whatsapp: l('واتساب', 'WhatsApp', 'WhatsApp'),
  call: l('اتصال', 'Call', 'Ara'),
  menu: l('القائمة', 'Menu', 'Menü'),
  close: l('إغلاق', 'Close', 'Kapat'),
  askPrice: l('اسأل عن السعر', 'Ask for price', 'Fiyat sor'),
  askPriceWhatsApp: l('اسأل عن السعر عبر واتساب', 'Ask for the price on WhatsApp', "Fiyatı WhatsApp'tan sorun"),
  viewModels: l('عرض الموديلات', 'View models', 'Modelleri gör'),
  models: l('موديل', 'models', 'model'),
  waterproof: l('مقاوم للماء 100%', '100% waterproof', '%100 su geçirmez'),
  delivery: l('توصيل لكل المحافظات', 'Delivery across Syria', 'Tüm Suriye’ye teslimat'),
  size: l('المقاس', 'Size', 'Ölçü'),
  thickness: l('السماكة', 'Thickness', 'Kalınlık'),
  code: l('الكود', 'Code', 'Kod'),
  collections: l('تشكيلتنا', 'Our collections', 'Koleksiyonlarımız'),
  collectionsSub: l(
    'ست فئات تغطي الجدران والأرضيات واللمسات النهائية',
    'Six ranges covering walls, floors and finishing touches',
    'Duvar, zemin ve son dokunuşlar için altı ürün grubu'
  ),
  swipe: l('اسحب للتصفح', 'Swipe to browse', 'Kaydırarak gezin'),
  generalWhatsApp: l(
    'مرحباً شركة بيرليك، أرغب بالاستفسار عن منتجاتكم.',
    'Hello Birlik Company, I would like to ask about your products.',
    'Merhaba Birlik Şirketi, ürünleriniz hakkında bilgi almak istiyorum.'
  ),
};
