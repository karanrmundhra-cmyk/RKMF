import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "धन्यवाद — फंडरेज़र दान", robots: { index: false, follow: false } };

const FONT_HI = '"Noto Sans Devanagari", Inter, system-ui, sans-serif';

export default function FundraiserThankYouHi() {
  return (
    <section className="bg-snow pb-24 pt-40 text-center" lang="hi" style={{ fontFamily: FONT_HI }}>
      <div className="container-c max-w-xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-copper/15 text-copper-dark">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h1 className="display-2 mt-6 text-balance">धन्यवाद — आपका दान सफल रहा।</h1>
        <p className="mt-5 leading-relaxed text-ink/70">
          आपका योगदान कृतज्ञता के साथ प्राप्त हुआ है। यदि आपका दान हमारे दान पृष्ठ के माध्यम से किया गया था, तो आपकी 80G रसीद जल्द ही ईमेल पर आ जाएगी। कोई सवाल हो? बस हमसे संपर्क करें।
        </p>
        <p className="mt-4 leading-relaxed text-ink/70">
          आपका दान RKM फाउंडेशन के आश्रय में बचाए गए जानवरों की मदद करेगा — और हम आपको उन जानवरों की तस्वीरें भेजेंगे जिन्हें आपका फंडरेज़र खिला और स्वस्थ कर रहा है।
        </p>
        <p className="mt-6 text-sm font-medium text-ink/80">
          बात फैलाने में मदद करें और दूसरों को बचाए गए जानवरों का समर्थन करने के लिए प्रेरित करें।
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <a href="https://wa.me/?text=I%20just%20supported%20a%20fundraiser%20helping%20rescued%20animals%20at%20RKM%20Foundation.%20Every%20contribution%20helps%20provide%20food%2C%20treatment%2C%20and%20safe%20shelter." target="_blank" rel="noopener noreferrer" className="btn-light">व्हाट्सऐप पर साझा करें</a>
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
