import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "धन्यवाद — ऑर्डर पुष्ट हुआ", robots: { index: false, follow: false } };

const FONT_HI = '"Noto Sans Devanagari", Inter, system-ui, sans-serif';

export default function ShopThankYouHi() {
  return (
    <section className="bg-snow pb-24 pt-40 text-center" lang="hi" style={{ fontFamily: FONT_HI }}>
      <div className="container-c max-w-xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-copper/15 text-copper-dark">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h1 className="display-2 mt-6 text-balance">धन्यवाद — आपका ऑर्डर पुष्ट हो गया है।</h1>
        <p className="mt-5 leading-relaxed text-ink/70">
          हमारी टीम आपके ऑर्डर विवरण की पुष्टि करने और आपका कर चालान साझा करने के लिए ईमेल के माध्यम से संपर्क करेगी। इस बीच कोई सवाल हो, तो कृपया हमसे संपर्क करें।
        </p>
        <p className="mt-4 leading-relaxed text-ink/70">
          आपका ऑर्डर 1–3 कार्यदिवसों के भीतर संसाधित और भेज दिया जाएगा, और भेजे जाने पर हम आपको बता देंगे।
        </p>
        <div className="mt-8">
          <Link href="/hi" className="btn-dark">होम पर वापस</Link>
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
