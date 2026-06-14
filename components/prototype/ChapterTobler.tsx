"use client";
import { useEffect, useRef } from "react";
import { DemoCaption } from "./DemoCaption";
import { useReducedMotionFlag, useIsMobile } from "./useReducedMotionFlag";

type Beat = {
  kind: "text" | "quote";
  body: string;
  sub?: string;
  sign?: string;
  img: string;
  alt: string;
};

const BEATS: Beat[] = [
  {
    kind: "text",
    body: "It began with a pug named Tobler.",
    img: "/prototype/tobler-1.jpg",
    alt: "A pug rests on a blanket, looking up — demo placeholder photo",
  },
  {
    kind: "text",
    body:
      "Late nights at the vet clinic, we kept meeting strangers — arms full of street animals they couldn't afford to treat.",
    img: "/prototype/tobler-2.jpg",
    alt: "A waiting room at night with people and animals — demo placeholder photo",
  },
  {
    kind: "quote",
    body: "So many wanted to help. So few had the means.",
    img: "/prototype/tobler-3.jpg",
    alt: "Hands gently holding an animal — demo placeholder photo",
  },
  {
    kind: "text",
    body: "So we opened our doors.",
    sign: "— The Mundhra family, founders",
    img: "/prototype/tobler-3.jpg",
    alt: "An open shelter doorway in warm light — demo placeholder photo",
  },
];

/**
 * Ch2 — The Tobler story. The emotional centerpiece.
 * Motion path: a ScrollTrigger-pinned ~300vh section where background images
 * cross-fade tobler-1→2→3 and narrative beats fade in/out tied to scroll.
 * Reduced-motion / mobile path: a normal stacked sequence (no pin), each
 * image with caption and its beat text — fully readable, no JS required.
 */
export function ChapterTobler() {
  const reduce = useReducedMotionFlag();
  const mobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Decide once both media queries resolve. Until then, treat as static.
  const animate = reduce === false && mobile === false;

  useEffect(() => {
    if (!animate) return;
    let cleanup = () => {};
    let cancelled = false;
    (async () => {
      const [gsapMod, stMod] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !sectionRef.current || !pinRef.current) return;
      const gsap = gsapMod.default ?? gsapMod;
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      const imgs = imgRefs.current.filter(Boolean) as HTMLDivElement[];
      const beats = beatRefs.current.filter(Boolean) as HTMLDivElement[];

      const ctx = gsap.context(() => {
        // Start state: first beat + first image visible, rest hidden.
        gsap.set(imgs, { autoAlpha: 0 });
        gsap.set(beats, { autoAlpha: 0, y: 30 });
        gsap.set([imgs[0]], { autoAlpha: 1 });
        gsap.set([beats[0]], { autoAlpha: 1, y: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=300%",
            pin: pinRef.current,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Cross-fade through each subsequent beat/image.
        for (let i = 1; i < BEATS.length; i++) {
          tl.to(beats[i - 1], { autoAlpha: 0, y: -30, duration: 0.4 }, ">");
          // image cross-fade (skip if same image as previous)
          if (BEATS[i].img !== BEATS[i - 1].img) {
            tl.to(imgs[i - 1], { autoAlpha: 0, duration: 0.5 }, "<");
            tl.to(imgs[i], { autoAlpha: 1, duration: 0.5 }, "<");
          }
          tl.to(beats[i], { autoAlpha: 1, y: 0, duration: 0.5 }, "<0.1");
          tl.to({}, { duration: 0.6 }); // dwell
        }
      }, sectionRef);

      cleanup = () => ctx.revert();
    })();
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [animate]);

  // ---- Reduced-motion / mobile / pre-hydration: stacked static sequence ----
  if (!animate) {
    return (
      <section
        aria-label="The Tobler story"
        className="bg-ink py-20 text-snow sm:py-28"
      >
        <div className="mx-auto w-full max-w-content px-5 sm:px-8">
          <p className="eyebrow mb-10 text-copper-light">OUR ORIGIN</p>
          <div className="space-y-16">
            {BEATS.map((b, i) => (
              <article key={i} className="grid items-center gap-6 sm:grid-cols-2">
                <div className="img-hover relative aspect-[4/3] bg-white/5">
                  <img
                    src={b.img}
                    alt={b.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <DemoCaption className="absolute bottom-2 left-2" />
                </div>
                <div>
                  {b.kind === "quote" ? (
                    <blockquote className="text-2xl font-semibold leading-snug text-copper-light sm:text-3xl">
                      “{b.body}”
                    </blockquote>
                  ) : (
                    <p className="text-2xl font-medium leading-snug sm:text-3xl">
                      {b.body}
                    </p>
                  )}
                  {b.sign && (
                    <p className="mt-4 text-sm text-snow/60">{b.sign}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ---- Animated pinned path ----
  return (
    <section
      ref={sectionRef}
      aria-label="The Tobler story"
      className="relative bg-ink text-snow"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] w-full items-center overflow-hidden"
      >
        {/* Stacked cross-fading images */}
        <div className="absolute inset-0">
          {BEATS.map((b, i) => (
            <div
              key={i}
              ref={(el) => {
                imgRefs.current[i] = el;
              }}
              className="absolute inset-0 will-change-[opacity]"
              aria-hidden="true"
            >
              <img
                src={b.img}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/30" />
            </div>
          ))}
        </div>

        {/* Beats (each absolutely stacked, cross-faded) */}
        <div className="relative z-10 mx-auto w-full max-w-content px-5 sm:px-8">
          <p className="eyebrow mb-8 text-copper-light">OUR ORIGIN</p>
          <div className="relative min-h-[40vh] max-w-2xl">
            {BEATS.map((b, i) => (
              <div
                key={i}
                ref={(el) => {
                  beatRefs.current[i] = el;
                }}
                className="absolute inset-x-0 top-0 will-change-transform"
              >
                {b.kind === "quote" ? (
                  <blockquote className="text-3xl font-semibold leading-snug text-copper-light sm:text-5xl">
                    “{b.body}”
                  </blockquote>
                ) : (
                  <p className="text-3xl font-medium leading-snug sm:text-5xl">
                    {b.body}
                  </p>
                )}
                {b.sign && (
                  <p className="mt-5 text-base text-snow/70">{b.sign}</p>
                )}
              </div>
            ))}
          </div>
          <DemoCaption className="mt-10" />
        </div>
      </div>
    </section>
  );
}
