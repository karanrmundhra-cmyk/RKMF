import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import DonateWidget from "@/components/DonateWidget";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import ScrollFadeWords from "@/components/ScrollFadeWords";

export const metadata: Metadata = {
  title: "Donate",
  description: "Your generosity helps turn care into meaningful action for rescued animals. 80G tax benefits, instant receipts, full transparency.",
};

const GIFTS = [
  { amt: 2500, does: "Two weeks of meals for a rescued animal" },
  { amt: 5000, does: "A month of food & care for 2–3 animals" },
  { amt: 10000, does: "Emergency medical treatment" },
];

export default function DonatePage() {
  return (
    <>
      <section className="bg-snow pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="container-c grid items-start gap-x-16 gap-y-10 lg:grid-cols-12">
          {/* Editorial left column — below the widget on mobile so the form is reached first */}
          <Reveal className="order-2 lg:order-1 lg:col-span-6">
            <p className="eyebrow-index">Donate</p>
            <h1 className="display-2 mt-5 text-balance">
              Your generosity turns care into <span className="text-copper-dark">action.</span>
            </h1>
            <ScrollFadeWords
              as="p"
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink"
              text="Every rupee goes straight to the animals — a meal, a vet’s visit, a safe place to heal. And we’ll send you photos from the field, so you see exactly what it changed."
            />

            {/* Ruled gift list (de-carded) */}
            <dl className="mt-8 border-t border-ink/12">
              {GIFTS.map((g) => (
                <div key={g.amt} className="flex items-baseline gap-6 border-b border-ink/12 py-5">
                  <dt className="display-3 w-[5ch] shrink-0 text-[1.6rem] text-copper-dark"><CountUp to={g.amt} prefix="₹" /></dt>
                  <dd className="text-ink/70">{g.does}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 text-sm text-ink/60">
              Prefer another way?{" "}
              <Link href="/other-ways-to-give" className="link-secondary">Give time, materials, or skills →</Link>
            </p>
          </Reveal>

          {/* Donation widget — flow unchanged. First on mobile. */}
          <Reveal delay={120} className="order-1 lg:order-2 lg:col-span-6">
            <div id="donation" className="scroll-mt-28">
              <Suspense fallback={<div className="card h-96 animate-pulse" />}>
                <DonateWidget />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </section>

    </>
  );
}
