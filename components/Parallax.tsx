"use client";
import { useEffect, useRef } from "react";

/**
 * Parallax — scroll-linked vertical drift as a PURE enhancement.
 *
 * Reliability first: children render fully visible from first paint (no opacity
 * change, no starting offset that could strand content). On a motion-capable,
 * non-touch client it adds a small translateY tied to scroll position via rAF.
 * Reduced-motion, coarse pointers (touch), and SSR all get the static element.
 * It can never create a blank zone — the only thing it animates is a few px of Y.
 *
 * `speed` > 0 drifts up as you scroll past; a typical subtle value is 0.06–0.14.
 */
export default function Parallax({
  children,
  speed = 0.1,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqCoarse = window.matchMedia("(pointer: coarse)");
    if (mqReduce.matches || mqCoarse.matches || window.innerWidth < 1024) return;

    let raf = 0;
    let running = true;
    const maxShift = 60; // px — hard clamp so nothing ever travels far

    const update = () => {
      raf = 0;
      if (!running || !el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: -1 (below viewport) → 0 (centred) → 1 (above)
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / (vh / 2 + rect.height / 2);
      const shift = Math.max(-maxShift, Math.min(maxShift, -progress * speed * 100));
      el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    el.style.willChange = "transform";
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (el) el.style.transform = "";
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
