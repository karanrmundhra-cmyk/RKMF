"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";

/**
 * Number display that shows the REAL value from first paint (SSR-correct, so
 * crawlers and no-JS users always see the true figure — never 0). On a
 * motion-capable client it adds a one-time count-up the first time it scrolls
 * into view, purely as enhancement. Reliability over animation.
 * Usage: <CountUp to={2500} prefix="₹" />
 */
export default function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.2,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return; // already visible

    let started = false;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        started = true;
        animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setValue(Math.round(v)) });
        io.disconnect();
      }
    }, { threshold: 0, rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, to, duration]);

  return (
    <span ref={ref}>
      {prefix}{value.toLocaleString("en-IN")}{suffix}
    </span>
  );
}
