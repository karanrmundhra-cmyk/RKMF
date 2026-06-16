import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "आपका फंडरेज़र तैयार है", robots: { index: false, follow: false } };

const FONT_HI = '"Noto Sans Devanagari", Inter, system-ui, sans-serif';

export default function FundraiserReadyHi() {
  return (
    <section className="bg-snow pb-24 pt-40 text-center" lang="hi" style={{ fontFamily: FONT_HI }}>
      <div className="container-c max-w-xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-copper/15 text-copper-dark">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h1 className="display-2 mt-6 text-balance">आपका फंडरेज़र तैयार है।</h1>
        <p className="mt-5 leading-relaxed text-ink/70">
          आपका फंडरेज़र पेज सफलतापूर्वक बना दिया गया है। बचाए गए जानवरों के लिए सहयोग मिलना शुरू करने हेतु अपना पेज दोस्तों और परिवार के साथ साझा करें।
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="btn-copper">व्हाट्सऐप पर साझा करें</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="btn-light">लिंक्डइन</a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="btn-light">फ़ेसबुक</a>
        </div>
        <p className="mt-8 leading-relaxed text-ink/70">
          आपके फंडरेज़र के माध्यम से किए गए दान सीधे RKM फाउंडेशन को जाते हैं और बचाए गए जानवरों को भोजन, इलाज, और सुरक्षित आश्रय दिलाने में मदद करते हैं। दानदाताओं को तुरंत रसीद मिलती है, और आप अपने फंडरेज़र की प्रगति पर नज़र रख सकेंगे।
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
