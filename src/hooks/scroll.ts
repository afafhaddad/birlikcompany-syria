import { RefObject, useEffect, useState } from 'react';

export const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * 0 when the element's top reaches the bottom of the screen, 1 when its bottom leaves the top.
 * Starts (and, with reduced motion, stays) at 0.5: the neutral, un-shifted position.
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>): number {
  const [p, setP] = useState(0.5);
  useEffect(() => {
    if (reduced()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height + window.innerHeight;
      setP(Math.min(1, Math.max(0, (window.innerHeight - r.top) / total)));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    // Only listen while the element is on (or near) the screen: no work for sections far away
    let listening = false;
    const listen = (yes: boolean) => {
      if (yes === listening) return;
      listening = yes;
      if (yes) {
        window.addEventListener('scroll', on, { passive: true });
        window.addEventListener('resize', on);
        on();
      } else {
        window.removeEventListener('scroll', on);
        window.removeEventListener('resize', on);
      }
    };
    const io = 'IntersectionObserver' in window ? new IntersectionObserver(([e]) => listen(e.isIntersecting), { rootMargin: '200px 0px' }) : null;
    if (io && ref.current) io.observe(ref.current);
    else listen(true);
    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      listen(false);
    };
  }, [ref]);
  return p;
}

/** True once the element has come into view (stays true). */
export function useInView(ref: RefObject<HTMLElement | null>, margin = '0px 0px -15% 0px'): boolean {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return setSeen(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);
  return seen;
}

/** Counts from 0 to the number at the start of `value` ("2022", "14", "+500") once `run` is true. */
export function useCountUp(value: string, run: boolean, ms = 1400): string {
  const m = value.match(/^(\D*)(\d+)(.*)$/);
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    if (!m || !run || reduced()) return;
    const target = Number(m[2]);
    // Years count up only the last stretch (2010 → 2022), small numbers from zero
    const from = target > 1900 ? target - 12 : 0;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / ms);
      setN(Math.round(from + (target - from) * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, run]);
  if (!m || n === null) return value;
  return `${m[1]}${n}${m[3]}`;
}
