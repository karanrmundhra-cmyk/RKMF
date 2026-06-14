"use client";
import Reveal from "@/components/Reveal";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import { PrototypePill } from "./PrototypePill";
import { HeroMotion } from "./HeroMotion";
import { ToblerStory } from "./ToblerStory";
import { WhatWeDo } from "./WhatWeDo";
import { GiftSection } from "./GiftSection";
import { WhyTrust } from "./WhyTrust";
import { useReducedMotionFlag, useIsMobile } from "./useMotionGates";
import { useLenisScrollTrigger } from "./useLenis";

/**
 * Prototype v2 — the EXISTING light homepage, same copy / theme / structure,
 * with a world-class motion layer. Production Header & Footer come from the
 * root layout (this IS the real site). Lenis smooth-scroll boots only when
 * motion is allowed and we're not on mobile, and is synced to ScrollTrigger
 * inside the hook. All motion is reduced-motion + mobile gated per section.
 */
export function Experience() {
  const reduce = useReducedMotionFlag();
  const isMobile = useIsMobile();
  const smoothEnabled = reduce === false && isMobile === false;
  useLenisScrollTrigger(smoothEnabled);

  return (
    <>
      {/* Scroll-cue keyframe — scoped, motion-safe (paused under reduced motion) */}
      <style>{`@keyframes scrollcue{0%{transform:translateY(0);opacity:.9}50%{transform:translateY(6px);opacity:.3}100%{transform:translateY(0);opacity:.9}}`}</style>

      <PrototypePill />

      {/* 1. HERO */}
      <HeroMotion />

      {/* 2. THE STORY — pinned showcase (static fallback when gated) */}
      <ToblerStory />

      {/* 3. WHAT WE DO */}
      <WhatWeDo />

      {/* 4. WHAT YOUR GIFT DOES */}
      <GiftSection />

      {/* 5. WHY TRUST US */}
      <WhyTrust />

      {/* 6. TESTIMONIALS — real component, wrapped for entrance only */}
      <Reveal>
        <Testimonials />
      </Reveal>

      {/* 7. CTA — real component, wrapped for entrance only */}
      <Reveal>
        <CTABanner />
      </Reveal>
    </>
  );
}
