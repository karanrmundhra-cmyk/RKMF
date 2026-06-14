"use client";
import { useEffect, useState } from "react";

/**
 * Reactive prefers-reduced-motion flag.
 * Returns `null` until mounted (SSR-safe). Treat null as "unknown -> static",
 * so content is always present in the DOM and readable with JS off.
 */
export function useReducedMotionFlag(): boolean | null {
  const [reduce, setReduce] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduce;
}

/** Coarse mobile check — disables pinning / heavy parallax below `maxWidth`. */
export function useIsMobile(maxWidth = 768): boolean | null {
  const [mobile, setMobile] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [maxWidth]);
  return mobile;
}
