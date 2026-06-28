import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import DonateWidget from "@/components/DonateWidget";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Accordion from "@/components/Accordion";
import { FAQS_GENERAL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Donate",
  description: "Your generosity helps turn care into meaningful action for rescued animals. 80G tax benefits, instant receipts, full transparency.",
};

export default function DonatePage() {
  return (
    <>
      <section className="bg-snow pb-20 pt-32 sm:pt-40">
        <div className="container-c grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <p className="eyebrow">Donate</p>
            <h1 className="h-display mt-4 text-4xl sm:text-5xl lg:text-6xl">
              Your generosity turns care into <span className="text-copper-dark">action.</span>
            </h1>
            <p className="mt-5 max-w-lg leading-relaxed text-ink/70">
              Right now, every rupee you give goes straight to the animals in our care — a warm meal,
              a vet&apos;s visit, a vaccination, a safe place to heal. And you won&apos;t have to wonder where
              it went: we&apos;ll send you photos and videos from the field, so you can see the exact life
              your kindness helped.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink/80">
              {[
                "Registered charitable trust — 12A · 80G · CSR",
                "Real photo & video updates from the field",
                "Family-run since 2014 — small, careful, honest",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-copper/15 text-copper-dark" aria-hidden>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m4.5 12.5 5 5 10-11" /></svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="card-static mt-7 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper-dark">What your gift does</p>
              <dl className="mt-3 space-y-2.5 text-sm">
                {[
                  { amt: 2500, does: "2 weeks of meals for a rescued animal" },
                  { amt: 5000, does: "A month of food & care for 2–3 animals" },
                  { amt: 10000, does: "Emergency medical treatment" },
                ].map((g) => (
                  <div key={g.amt} className="flex items-baseline gap-3">
                    <dt className="w-16 shrink-0 font-bold text-ink"><CountUp to={g.amt} prefix="₹" /></dt>
                    <dd className="text-ink/70">{g.does}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-ink/65">
              <span className="font-medium text-ink/80">No strings, no surprises.</span>{" "}
              Cancel a monthly gift anytime · instant receipt by email · your data is encrypted and
              never shared · 80G certificate issued against your PAN.
            </p>

            <p className="mt-5 text-sm text-ink/60">
              Prefer another way?{" "}
              <Link href="/other-ways-to-give" className="link-secondary">Give time, materials, or skills →</Link>
            </p>
          </Reveal>
          <Reveal delay={120} className="order-1 lg:order-2">
            <div id="donation" className="scroll-mt-28">
              <Suspense fallback={<div className="card h-96 animate-pulse" />}>
                <DonateWidget />
              </Suspense>

              {/* Trust strip — presentational, sits below the widget */}
              <div className="mt-4 rounded-2xl bg-white/60 px-5 py-4 ring-1 ring-ink/[0.08]">
                <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[11px] font-semibold tracking-wide text-ink/70">
                  <span className="inline-flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="text-copper-dark"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Secured by Razorpay
                  </span>
                  <span aria-hidden className="text-ink/30">·</span>
                  <span>256-bit encryption</span>
                  <span aria-hidden className="text-ink/30">·</span>
                  <span>PCI-DSS</span>
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                  {[
                    { label: "80G Tax Benefits", file: "RKM_Foundation_80G_Certificate.pdf" },
                    { label: "12A Registered", file: "RKM_Foundation_12A_Certificate.pdf" },
                    { label: "CSR Eligible", file: "RKM_Foundation_CSR_Certificate.pdf" },
                  ].map((c) => (
                    <a
                      key={c.label}
                      href={`/downloads/${c.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${c.label} — download certificate PDF`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-snow px-3 py-1.5 text-[11px] font-semibold text-ink/75 ring-1 ring-ink/10 transition-colors hover:text-copper-dark hover:ring-copper/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
                    >
                      {c.label}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="M12 4v12m0 0 4-4m-4 4-4-4M5 20h14" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  ))}
                </div>
                <p className="mt-3 text-center text-[11px] leading-relaxed text-ink/55">
                  RKM Foundation is a registered charitable trust — Reg. E-30560
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-c max-w-3xl">
          <Reveal>
            <h2 className="h-display text-center text-3xl">Common questions</h2>
            <div className="mt-8"><Accordion items={FAQS_GENERAL.slice(2, 8)} /></div>
            <p className="mt-6 text-center text-sm text-ink/60">
              More questions? <Link href="/faqs" className="link-secondary">Visit the full FAQs</Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
