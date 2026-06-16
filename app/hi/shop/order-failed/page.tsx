import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "ऑर्डर पूरा नहीं हो सका", robots: { index: false, follow: false } };

const FONT_HI = '"Noto Sans Devanagari", Inter, system-ui, sans-serif';

export default function ShopOrderFailedHi() {
  return (
    <section className="bg-snow pb-24 pt-40 text-center" lang="hi" style={{ fontFamily: FONT_HI }}>
      <div className="container-c max-w-xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-copper/15 text-copper-dark">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="M12 8v5m0 3.5v.5" strokeLinecap="round"/><circle cx="12" cy="12" r="9.25"/></svg>
        </div>
        <h1 className="display-2 mt-6 text-balance">आपका ऑर्डर पूरा नहीं हो सका।</h1>
        <p className="mt-5 leading-relaxed text-ink/70">
          आपका ऑर्डर संसाधित नहीं हो सका। कोई राशि नहीं काटी गई है — कृपया फिर से प्रयास करें।
        </p>
        <p className="mt-4 leading-relaxed text-ink/70">
          कभी-कभी नेटवर्क में रुकावट या बैंक प्राधिकरण संबंधी समस्याओं के कारण भुगतान विफल हो सकते हैं। आप उसी या किसी अन्य भुगतान विधि से दोबारा चेकआउट का प्रयास कर सकते हैं।
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/hi/shop" className="btn-dark">फिर से प्रयास करें</Link>
          <Link href="/hi" className="btn-light">होम पर वापस</Link>
        </div>
        <p className="mt-10 text-sm text-ink/60">
          कोई सवाल है?{" "}
          <a href="mailto:info@rkm.support" className="link-secondary">info@rkm.support</a>
          {" · "}
          <a href="https://wa.me/919920780005" target="_blank" rel="noopener noreferrer" className="link-secondary">व्हाट्सऐप</a>
        </p>
      </div>
    </section>
  );
}
