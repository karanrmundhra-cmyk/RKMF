import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "सदस्यता की पुष्टि",
  description: "RKM फाउंडेशन समुदाय में आपका स्वागत है।",
  alternates: { canonical: "/hi/newsletter-confirmed" },
};

export default function NewsletterConfirmedHiPage() {
  return (
    <section className="bg-snow pb-24 pt-32 sm:pt-40" lang="hi" style={{ fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' }}>
      <div className="container-c max-w-xl text-center">
        <Reveal>
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-copper/15 text-copper-dark">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
              <path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="display-2 mt-6 text-balance">RKM फाउंडेशन समुदाय में आपका स्वागत है।</h1>
          <p className="mt-4 leading-relaxed text-ink/70">
            सब तैयार है। हम उम्मीद की कहानियाँ, मैदान से अपडेट, और बदलाव लाने के तरीके — सीधे आपके इनबॉक्स में साझा करेंगे।
          </p>
          <div className="mt-8">
            <Link href="/hi" className="btn-dark">होम पर वापस</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
