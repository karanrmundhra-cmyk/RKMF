"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Viewport-triggered count-up for REAL statistics only.
 * Renders the final value instantly when prefers-reduced-motion is set.
 * Usage: <CountUp to={1240} suffix="+" />
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
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setValue(to); return; }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  const shown = reduce ? to : value;
  return (
    <span ref={ref}>
      {prefix}{shown.toLocaleString("en-IN")}{suffix}
    </span>
  );
}
