"use client";
import Link from "next/link";
import { Reveal } from "./Reveal";

/**
 * Ch7 — Final CTA. Full-screen ink, emotional but no guilt/pressure.
 * Two actions: Donate Now (copper) and Start a Fundraiser (ghost).
 * Plus a small footer line clarifying this is a prototype.
 */
export function ChapterFinalCta() {
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-ink px-5 py-24 text-center text-snow sm:px-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper/50 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <Reveal>
          <h2 className="h-display text-4xl sm:text-6xl">
            Somewhere out there, an animal is{" "}
            <span className="text-copper-light">waiting</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-snow/75">
            A meal, a safe night, a chance to heal. Whatever you can give, it
            reaches them directly.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/donate-now#donation"
              className="inline-flex items-center justify-center rounded-full bg-copper-dark px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-copper focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
            >
              Donate Now
            </Link>
            <Link
              href="/fundraiser"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-snow ring-1 ring-white/25 transition-colors hover:ring-copper hover:text-copper-light focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
            >
              Start a Fundraiser
            </Link>
          </div>
        </Reveal>
      </div>

      <p className="absolute inset-x-0 bottom-6 z-10 px-5 text-center text-xs text-snow/60">
        This is a design prototype. The live site is at{" "}
        <Link href="/" className="underline underline-offset-4 hover:text-copper-light">
          /
        </Link>
        .
      </p>
    </section>
  );
}
