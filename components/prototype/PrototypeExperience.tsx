"use client";
import { useEffect } from "react";
import { TopBar } from "./TopBar";
import { ChapterHero } from "./ChapterHero";
import { ChapterTobler } from "./ChapterTobler";
import { ChapterRescue } from "./ChapterRescue";
import { ChapterGift } from "./ChapterGift";
import { ChapterTrust } from "./ChapterTrust";
import { ChapterCommunity } from "./ChapterCommunity";
import { ChapterFinalCta } from "./ChapterFinalCta";
import { useLenisScrollTrigger } from "./useLenisScrollTrigger";
import { useReducedMotionFlag, useIsMobile } from "./useReducedMotionFlag";

/**
 * Top-level client wrapper for the cinematic prototype. Boots Lenis smooth
 * scroll (synced to ScrollTrigger) only when motion is allowed and we're not
 * on mobile. All chapter content renders regardless, so the page is fully
 * readable with JS off or reduced-motion on.
 */
export function PrototypeExperience() {
  const reduce = useReducedMotionFlag();
  const mobile = useIsMobile();
  // Enable Lenis only once both queries resolve to "false".
  useLenisScrollTrigger(reduce === false && mobile === false);

  // Hide the production header/footer/sticky chrome while the cinematic
  // prototype is mounted; restore on unmount. No production files modified.
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent =
      "body > header, body > footer, [data-sticky-donate], [role='dialog'][aria-label='Cookie notice'] { display: none !important; }";
    document.head.appendChild(style);
    return () => { style.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-ink text-snow">
      <TopBar />
      {/* spacer so fixed top bar never overlaps hero content focus ring */}
      <ChapterHero />
      <ChapterTobler />
      <ChapterRescue />
      <ChapterGift />
      <ChapterTrust />
      <ChapterCommunity />
      <ChapterFinalCta />
    </div>
  );
}
