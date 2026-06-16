import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "फंडरेज़र लक्ष्य पूरा हुआ", robots: { index: false, follow: false } };

const FONT_HI = '"Noto Sans Devanagari", Inter, system-ui, sans-serif';

export default function FundraiserSuccessHi() {
  return (
    <section className="bg-snow pb-24 pt-40 text-center" lang="hi" style={{ fontFamily: FONT_HI }}>
      <div className="container-c max-w-xl">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-copper/15 text-copper-dark">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z" strokeLinejoin="round"/></svg>
        </div>
        <h1 className="display-2 mt-6 text-balance">यह फंडरेज़र अपने लक्ष्य तक पहुँच गया है।</h1>
        <p className="mt-5 leading-relaxed text-ink/70">
          आपके और इस अभियान का समर्थन करने वाले हर व्यक्ति के कारण, बचाए गए जानवरों को भोजन, इलाज, और सुरक्षित आश्रय मिलेगा। इस पल का हिस्सा बनने के लिए धन्यवाद।
        </p>
        <p className="mt-4 leading-relaxed text-ink/70">
          जुटाए गए सभी दान सीधे RKM फाउंडेशन को जाते हैं और हमारे कार्यक्रमों के माध्यम से बचाए गए जानवरों की देखभाल में सहयोग करते हैं। समर्थकों को यह दिखाते हुए अपडेट मिल सकते हैं कि ये योगदान ज़रूरतमंद जानवरों की कैसे मदद कर रहे हैं।
        </p>
        <p className="mt-6 text-sm font-medium text-ink/80">उम्मीद फैलाते रहें।</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <a href="https://wa.me/?text=Our%20fundraiser%20has%20successfully%20reached%20its%20goal!%20Because%20of%20the%20support%20from%20friends%20and%20family%2C%20rescued%20animals%20will%20receive%20food%2C%20treatment%2C%20and%20safe%20shelter%20through%20RKM%20Foundation." target="_blank" rel="noopener noreferrer" className="btn-copper">यह फंडरेज़र साझा करें</a>
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
