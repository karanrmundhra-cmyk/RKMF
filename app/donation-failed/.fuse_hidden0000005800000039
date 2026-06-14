import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Donation Not Completed" };

export default function DonationFailed() {
  return (
    <section className="bg-snow pb-24 pt-40 text-center">
      <div className="container-c max-w-xl">
        <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl">Your donation could not be completed.</h1>
        <p className="mt-5 leading-relaxed text-ink/70">
          Don't worry — no amount has been deducted, or it will be automatically refunded by your
          bank within a few business days. You can try again, or reach us and we'll help right away.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/donate-now#donation" className="btn-copper">Try Again</Link>
          <a href="https://wa.me/919920780005" target="_blank" rel="noopener noreferrer" className="btn-light">WhatsApp Us</a>
        </div>
        <p className="mt-8 text-sm text-ink/60">
          Or write to <a className="link-secondary" href="mailto:info@rkm.support">info@rkm.support</a>
        </p>
      </div>
    </section>
  );
}
