import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Thank You — Order Confirmed" };

export default function ShopThankYou() {
  return (
    <section className="bg-snow pb-24 pt-40 text-center">
      <div className="container-c max-w-xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-copper/15 text-copper-dark">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h1 className="h-display mt-6 text-3xl sm:text-4xl lg:text-5xl">Thank you — your order has been confirmed.</h1>
        <p className="mt-5 leading-relaxed text-ink/70">
          A confirmation email with your order details and tax invoice has been sent to your email
          address. If you don&apos;t see it, please check your spam folder or contact us.
        </p>
        <p className="mt-4 leading-relaxed text-ink/70">
          Your order will be processed and dispatched within 1–3 working days. You will receive an
          update once your order has been shipped.
        </p>
        <div className="mt-8">
          <Link href="/" className="btn-dark">Return to Home</Link>
        </div>
        <p className="mt-10 text-sm text-ink/60">
          Have questions?{" "}
          <a href="mailto:info@rkm.support" className="link-secondary">info@rkm.support</a>
          {" · "}
          <a href="https://wa.me/919920780005" target="_blank" rel="noopener noreferrer" className="link-secondary">WhatsApp</a>
        </p>
      </div>
    </section>
  );
}
