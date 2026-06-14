import Link from "next/link";
import Reveal from "./Reveal";

export default function CTABanner({
  title = "Somewhere out there, an animal is waiting.",
  lead = "It doesn't know your name. It just needs someone to show up. Today, that can be you.",
}: { title?: string; lead?: string }) {
  return (
    <section className="bg-ink section-y text-white">
      <div className="container-c max-w-4xl text-center">
        <Reveal>
          <h2 className="display-2 mx-auto max-w-[20ch] text-balance">{title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">{lead}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/donate-now#donation" className="btn-copper">Donate Now</Link>
            <Link href="/fundraiser" className="btn bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/20">Start a Fundraiser</Link>
            <Link href="/other-ways-to-give" className="btn bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/20">Become a Volunteer</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
