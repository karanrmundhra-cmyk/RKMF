"use client";
import { useEffect, useState } from "react";

/**
 * Reactive prefers-reduced-motion flag.
 * Returns `null` until mounted (SSR-safe), then true/false.
 * Treat null as "unknown → render static" so content is always in the DOM.
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

/** Coarse mobile check (used to disable heavy parallax / pinning). */
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
