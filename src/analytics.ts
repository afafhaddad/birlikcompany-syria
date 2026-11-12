/**
 * Analytics: Microsoft Clarity (recordings, heatmaps) + Google Analytics 4
 * (audience, traffic sources, conversions).
 *
 * - Runs only on the live domain (never on localhost or Vercel preview URLs),
 *   so test visits don't pollute the reports. To test locally, run
 *   localStorage.setItem('birlik_analytics_debug', '1') in the console and reload.
 * - Both scripts are loaded a few seconds AFTER the page has finished loading, so
 *   they never slow down the first screen on slow connections. Events fired before
 *   the scripts arrive are queued and sent once they load.
 * - Page views on in-app navigation are picked up by GA4's built-in
 *   "page changes based on browser history events" (Enhanced measurement, on by default).
 */
const CLARITY_ID = 'zcq7ry8cor';
const GA4_ID = 'G-QYYM96DYXJ';
const LOAD_DELAY_MS = 2500;

type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

let enabled = false;

function isLiveSite(): boolean {
  const h = window.location.hostname;
  if (h === 'birlik-insaat.com' || h.endsWith('.birlik-insaat.com')) return true;
  try {
    return window.localStorage.getItem('birlik_analytics_debug') === '1';
  } catch {
    return false;
  }
}

function loadScript(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/** Send a named event to both tools. Safe to call anywhere; no-op when disabled. */
export function track(name: string, params: Params = {}) {
  if (!enabled) return;
  const clean: Params = {};
  Object.keys(params).forEach((k) => {
    if (params[k] !== undefined && params[k] !== '') clean[k] = params[k];
  });
  window.gtag?.('event', name, clean);
  window.clarity?.('event', name);
  Object.keys(clean).forEach((k) => window.clarity?.('set', k, String(clean[k])));
}

/** Page context taken from the URL: /<lang>/<category>/<product>/ */
function pageContext(): Params {
  const parts = window.location.pathname.split('/').filter(Boolean);
  const ctx: Params = { language: parts[0] };
  const section = parts[1];
  if (section && section !== 'catalogue' && section !== 'installation') {
    ctx.category = section;
    if (parts[2]) ctx.product_id = parts[2];
  }
  return ctx;
}

function onClick(e: MouseEvent) {
  const target = e.target as Element | null;
  const a = target?.closest?.('a');
  if (!a) return;
  const href = a.getAttribute('href') || '';
  const ctx = pageContext();

  if (href.includes('wa.me/')) {
    const fromCalculator = !!a.closest('[aria-labelledby="calc-title"]');
    const placement = fromCalculator
      ? 'calculator'
      : a.id === 'whatsapp-floating-btn'
        ? 'bottom_bar'
        : a.id === 'whatsapp-product-inquiry-btn'
          ? 'product_page'
          : a.closest('header, [role="dialog"]')
            ? 'header_menu'
            : href.includes('wa.me/?')
              ? 'share_catalogue'
              : 'page';
    // GA4 recommended event name for an enquiry; counts as the site's main conversion
    track(ctx.product_id ? 'price_request' : 'whatsapp_click', { ...ctx, placement });
    if (ctx.product_id) track('generate_lead', { ...ctx, placement, method: 'whatsapp' });
  } else if (href.startsWith('tel:')) {
    track('phone_click', ctx);
  } else if (href.endsWith('.pdf')) {
    track('catalogue_download', { ...ctx, file: href.split('/').pop() });
  } else if (a.hasAttribute('hreflang')) {
    track('language_switch', { from_language: ctx.language, to_language: a.getAttribute('hreflang') || '' });
  } else if (href.includes('maps.google') || href.includes('google.com/maps')) {
    track('map_click', ctx);
  }
}

let calculatorTrackedFor = '';
function onInput(e: Event) {
  const el = e.target as HTMLElement | null;
  if (!el?.id?.startsWith('calc-')) return;
  if (calculatorTrackedFor === window.location.pathname) return; // once per product page
  calculatorTrackedFor = window.location.pathname;
  track('calculator_used', pageContext());
}

export function initAnalytics() {
  if (typeof window === 'undefined' || enabled || !isLiveSite()) return;
  enabled = true;

  // Queues: calls made before the real scripts load are replayed by them.
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA4_ID);

  if (!window.clarity) {
    const c = function (...args: unknown[]) {
      (c.q = c.q || []).push(args);
    } as NonNullable<Window['clarity']>;
    window.clarity = c;
  }

  document.addEventListener('click', onClick, { capture: true });
  document.addEventListener('input', onInput, { capture: true });

  const load = () =>
    window.setTimeout(() => {
      loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`);
      loadScript(`https://www.clarity.ms/tag/${CLARITY_ID}`);
    }, LOAD_DELAY_MS);
  if (document.readyState === 'complete') load();
  else window.addEventListener('load', load, { once: true });
}
