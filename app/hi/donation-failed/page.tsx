import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "दान पूरा नहीं हुआ", robots: { index: false, follow: false } };

export default function DonationFailedHi() {
  return (
    <section className="bg-snow pb-24 pt-40 text-center" lang="hi" style={{ fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' }}>
      <div className="container-c max-w-xl">
        <h1 className="display-2 text-balance">आपका दान पूरा नहीं हो सका।</h1>
        <p className="mt-5 leading-relaxed text-ink/70">
          चिंता न करें — कोई राशि नहीं काटी गई है, या आपका बैंक इसे कुछ कार्यदिवसों में अपने-आप वापस कर देगा। आप फिर से प्रयास कर सकते हैं, या हमसे संपर्क करें और हम तुरंत मदद करेंगे।
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/hi/donate-now#donation" className="btn-copper">फिर से प्रयास करें</Link>
          <a href="https://wa.me/919920780005" target="_blank" rel="noopener noreferrer" className="btn-light">व्हाट्सऐप करें</a>
        </div>
        <p className="mt-8 text-sm text-ink/60">
          या लिखें <a className="link-secondary" href="mailto:info@rkm.support">info@rkm.support</a> पर
        </p>
      </div>
    </section>
  );
}
