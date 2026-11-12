/**
 * Serves large remote images (Vercel Blob, Unsplash) at a sensible width instead of
 * the 3000px+ originals, which matters a lot on slow Syrian mobile connections.
 *
 * - Vercel Blob images go through Vercel Image Optimization (/_vercel/image), configured
 *   in vercel.json ("images"). It converts to WebP/AVIF and resizes on the fly.
 * - Unsplash images use Unsplash's own resizing parameters.
 * - Anything else (local /public files, data:/blob: URLs) is returned unchanged.
 *
 * If /_vercel/image is ever unavailable, installImageFallback() swaps the
 * image back to its original URL, so nothing breaks.
 */

// Must match the "sizes" list in vercel.json
export const IMAGE_WIDTHS = [640, 1080, 1600] as const;
export type ImageWidth = (typeof IMAGE_WIDTHS)[number];

const BLOB_HOST_RE = /^https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\//i;
const OPTIMIZER_PATH = '/_vercel/image';

// Decided at build time (not from window.location) so pre-rendered HTML and the
// hydrated page produce identical image URLs. Set VITE_IMAGE_OPT=off for local builds
// that run without Vercel's image optimizer (the error fallback also covers that case).
const OPTIMIZER_ENABLED = import.meta.env.PROD && import.meta.env.VITE_IMAGE_OPT !== 'off';

/** Absolute optimizer URL on the live site (used by the print/PDF catalogue). */
export function liveOptimizedImage(url: string, width: ImageWidth = 640, quality = 70): string {
  if (!BLOB_HOST_RE.test(url)) return url;
  return `https://www.birlik-insaat.com${OPTIMIZER_PATH}?url=${encodeURIComponent(url)}&w=${width}&q=${quality}`;
}

export function optimizeImage(url: string | undefined, width: ImageWidth = 1080, quality = 75): string {
  if (!url) return '';

  if (url.startsWith('https://images.unsplash.com/')) {
    try {
      const u = new URL(url);
      u.searchParams.set('w', String(width));
      u.searchParams.set('q', String(quality));
      u.searchParams.set('auto', 'format');
      return u.toString();
    } catch {
      return url;
    }
  }

  if (BLOB_HOST_RE.test(url) && OPTIMIZER_ENABLED) {
    return `${OPTIMIZER_PATH}?url=${encodeURIComponent(url)}&w=${width}&q=${quality}`;
  }

  return url;
}

/** If an optimized image fails to load, fall back to the original URL once. */
export function installImageFallback(): void {
  if (typeof document === 'undefined') return;
  document.addEventListener(
    'error',
    (event) => {
      const img = event.target;
      if (!(img instanceof HTMLImageElement)) return;
      const src = img.getAttribute('src') || '';
      if (!src.startsWith(`${OPTIMIZER_PATH}?`)) return;
      const original = new URLSearchParams(src.slice(src.indexOf('?') + 1)).get('url');
      if (original) {
        img.removeAttribute('srcset');
        img.src = original;
      }
    },
    true // capture: image error events don't bubble
  );
}
