"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Reveal from "./Reveal";

export default function CTABanner({
  title,
  lead,
}: { title?: string; lead?: string }) {
  const hi = usePathname().startsWith("/hi");
  const t = title ?? (hi ? "कहीं दूर, एक जानवर इंतज़ार कर रहा है।" : "Somewhere out there, an animal is waiting.");
  const l = lead ?? (hi
    ? "वह आपका नाम नहीं जानता। उसे बस किसी के साथ खड़े होने की ज़रूरत है। आज, वह आप हो सकते हैं।"
    : "It doesn't know your name. It just needs someone to show up. Today, that can be you.");
  const base = hi ? "/hi" : "";
  return (
    <section className="bg-ink section-y text-white" style={hi ? { fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' } : undefined}>
      <div className="container-c max-w-4xl text-center">
        <Reveal>
          <h2 className="display-2 mx-auto max-w-[20ch] text-balance">{t}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">{l}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href={`${base}/donate-now#donation`} className="btn-copper">{hi ? "अभी दान करें" : "Donate Now"}</Link>
            <Link href={`${base}/fundraiser`} className="btn bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/20">{hi ? "फंडरेज़र शुरू करें" : "Start a Fundraiser"}</Link>
            <Link href={`${base}/other-ways-to-give`} className="btn bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/20">{hi ? "स्वयंसेवक बनें" : "Become a Volunteer"}</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
