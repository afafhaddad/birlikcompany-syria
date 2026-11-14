import React, { useEffect, useRef, useState } from 'react';

/**
 * Muted background video loop that sits on top of a poster image.
 * - Fetched only after the page has loaded (never blocks the first screen).
 * - Phones/tablets: Wi-Fi or wired only (still image on mobile data). Desktops: unless cellular.
 * - Skipped on Data Saver, slow connections and reduced-motion devices.
 * - Phones get the portrait file, larger screens the landscape one.
 * - Pauses while off-screen to save battery and data.
 */
function allowed(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string; type?: string } }).connection;
  if (conn?.saveData) return false;
  if (conn?.effectiveType && /2g/.test(conn.effectiveType)) return false;
  // Phones and tablets: only on Wi-Fi or a wired connection. If the browser does not say
  // (e.g. iPhone Safari), assume mobile data and keep the still image.
  const handheld = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (handheld) return conn?.type === 'wifi' || conn?.type === 'ethernet';
  // Desktops and laptops: on unless the connection is reported as cellular
  return conn?.type !== 'cellular';
}

export const BackgroundVideo: React.FC<{ mobileSrc: string; desktopSrc: string; className?: string; delayMs?: number }> = ({
  mobileSrc,
  desktopSrc,
  className = '',
  delayMs = 600,
}) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSrc(null);
    setReady(false);
    if (!allowed()) return;
    let timer = 0;
    const start = () => {
      timer = window.setTimeout(() => {
        setSrc(window.matchMedia('(max-width: 767px)').matches ? mobileSrc : desktopSrc);
      }, delayMs);
    };
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('load', start);
    };
  }, [mobileSrc, desktopSrc, delayMs]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    v.play().catch(() => {});
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  if (!src) return null;
  return (
    <video
      ref={ref}
      key={src}
      src={src}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      aria-hidden="true"
      onCanPlay={() => setReady(true)}
      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  );
};
