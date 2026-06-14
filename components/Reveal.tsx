"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Reveal — content is ALWAYS visible from first paint (reliability over
 * animation, per the punch list). On capable, motion-allowed clients it adds a
 * gentle one-time fade-up as a pure enhancement — but it NEVER starts hidden,
 * so no section can ever disappear during a rapid scroll or a hydration hiccup.
 */
export default function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // Enhancement flag only. Default = false meaning "no enhancement applied yet",
  // but the base render is fully visible regardless of this value.
  const [enhance, setEnhance] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) return; // already visible — no animation needed

    el.style.opacity = "0";
    el.style.transform = "translateY(12px)";
    el.style.transition = `opacity 500ms ease-out ${Math.min(delay, 160)}ms, transform 500ms ease-out ${Math.min(delay, 160)}ms`;

    const reveal = () => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { reveal(); io.disconnect(); } },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    // Hard fail-safe — content is fully shown within 600ms no matter what.
    const t = window.setTimeout(() => { reveal(); io.disconnect(); }, 600);
    setEnhance(true);
    return () => { io.disconnect(); window.clearTimeout(t); };
  }, [delay]);

  // Base markup renders fully visible (opacity 1). The effect above only ever
  // *adds* a fade-up for below-the-fold elements and always resolves to visible.
  return (
    <div ref={ref} className={className} data-enhanced={enhance ? "1" : undefined}>
      {children}
    </div>
  );
}
