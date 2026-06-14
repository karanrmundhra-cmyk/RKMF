"use client";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import { Reveal } from "./Reveal";

const TIERS = [
  { amount: 2500, outcome: "Two weeks of meals for animals in our care." },
  { amount: 5000, outcome: "A full month of food and basics for 2–3 animals." },
  { amount: 10000, outcome: "Emergency medical care for an animal in crisis." },
];

/**
 * Ch4 — What your gift does. Premium dark treatment of the three REAL fixed
 * tiers. Rupee figures count up via the existing CountUp (useInView; renders
 * final value under reduced-motion). These are fixed real amounts, not stats.
 */
export function ChapterGift() {
  return (
    <section className="bg-ink py-20 text-snow sm:py-28">
      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-3 text-copper-light">DIRECT IMPACT</p>
          <h2 className="h-display max-w-2xl text-3xl sm:text-4xl">
            What your gift does.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.amount} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl bg-white/[0.04] p-8 ring-1 ring-white/10">
                <div className="text-5xl font-semibold tracking-tight text-copper-light sm:text-6xl">
                  <CountUp to={t.amount} prefix="₹" />
                </div>
                <p className="mt-5 flex-1 text-lg leading-snug text-snow/85">
                  {t.outcome}
                </p>
                <Link
                  href="/donate-now#donation"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-copper-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-copper focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
                >
                  Give ₹{t.amount.toLocaleString("en-IN")}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
