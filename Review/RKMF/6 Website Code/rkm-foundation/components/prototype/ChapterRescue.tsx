"use client";
import { DemoCaption } from "./DemoCaption";
import { Reveal } from "./Reveal";

const STAGES = [
  {
    img: "/prototype/rescue-before.jpg",
    label: "Before",
    alt: "A frightened street animal at intake — demo placeholder photo",
  },
  {
    img: "/prototype/rescue-care.jpg",
    label: "In our care",
    alt: "An animal receiving treatment from a carer — demo placeholder photo",
  },
  {
    img: "/prototype/rescue-recovery.jpg",
    label: "Recovered",
    alt: "A healthy, recovered animal — demo placeholder photo",
  },
];

/**
 * Ch3 — Rescue → Care → Recovery arc.
 * Motion: staggered vertical reveal (Framer, transform+opacity, ≤80ms stagger).
 * Reduced-motion: Reveal renders children statically. All content in DOM.
 */
export function ChapterRescue() {
  return (
    <section className="bg-ink py-20 text-snow sm:py-28">
      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-3 text-copper-light">A STORY ARC</p>
          <h2 className="h-display max-w-2xl text-3xl sm:text-4xl">
            Rescue. Care. Recovery.
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-6 sm:grid-cols-3">
          {STAGES.map((s, i) => (
            <Reveal as="li" key={s.label} delay={i * 0.08} className="group">
              <div className="img-hover relative aspect-[4/5] bg-white/5">
                <img
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-copper-light ring-1 ring-copper/30">
                  {s.label}
                </span>
                <DemoCaption className="absolute right-3 top-3 text-right" />
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-base text-snow/70">
            This is how we&rsquo;ll tell real rescue stories — with real photos
            and updates, soon. The images above are clearly-labelled demo
            placeholders.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
