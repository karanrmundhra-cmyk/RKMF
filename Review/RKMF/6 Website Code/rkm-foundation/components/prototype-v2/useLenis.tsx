"use client";
import { useEffect } from "react";

/**
 * Boots Lenis smooth-scroll and wires it to GSAP ScrollTrigger per the project
 * animation standards:
 *   lenis.on('scroll', ScrollTrigger.update)
 *   gsap.ticker.add((t) => lenis.raf(t * 1000))
 * Fully disabled (native scroll) when `enabled` is false — i.e. reduced-motion
 * or mobile. Cleans up the ticker + Lenis instance on unmount.
 */
export function useLenisScrollTrigger(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ default: Lenis }, gsapMod, stMod] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      const gsap = gsapMod.default ?? gsapMod;
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      const ticker = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(ticker);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [enabled]);
}
