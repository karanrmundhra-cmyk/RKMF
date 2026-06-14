"use client";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/**
 * Section 5 — WHY TRUST. Identical light bg-snow markup + copy + cert links.
 * Motion: bullet items reveal in sequence (stagger), certificate chips animate
 * in with a subtle stagger and keep their hover. Reduced-motion: static.
 */

const TRUST = [
  { title: "You See Exactly Where It Goes", desc: "Photo and video updates from the field after every campaign — proof of the meal served, the wound healed, the animal home." },
  { title: "Registered & Audited", desc: "A registered charitable trust under 12A, 80G, and CSR. We issue 10BD/10BE statements — your donation is documented and tax deductible." },
  { title: "Animals First, Always", desc: "We do one thing and pour everything into it: rescuing, feeding, healing, and sheltering animals who have no one else." },
  { title: "Come See For Yourself", desc: "Join a feeding drive, visit the shelter, meet the animals. Our doors — and our books — are open to you." },
];

const CERTS = [
  { label: "12A Registered", file: "RKM_Foundation_12A_Certificate.pdf" },
  { label: "80G Tax Benefits", file: "RKM_Foundation_80G_Certificate.pdf" },
  { label: "CSR Eligible", file: "RKM_Foundation_CSR_Certificate.pdf" },
  { label: "DARPAN Registered", file: "RKM_Foundation_Darpan_Registration.pdf" },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function WhyTrust() {
  const reduce = useReducedMotion();
  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.07 } } };
  const item: Variants = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } };
  const chip: Variants = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } };

  return (
    <section className="bg-snow py-24 sm:py-32">
      <div className="container-c">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
        >
          <p className="eyebrow text-center">Why Trust RKM Foundation</p>
          <h2 className="h-display mx-auto mt-3 max-w-2xl text-center text-3xl sm:text-4xl lg:text-5xl">
            Give with confidence. See the change you create.
          </h2>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        >
          {TRUST.map((t) => (
            <motion.div key={t.title} variants={item} className="flex gap-4">
              <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-copper" />
              <div>
                <h3 className="font-semibold">{t.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Registered & Transparent badge band */}
        <motion.div
          className="mt-16 border-t border-ink/[0.08] pt-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
        >
          <p className="eyebrow text-center">Registered &amp; Transparent</p>
          <h3 className="h-display mx-auto mt-3 max-w-xl text-center text-2xl sm:text-3xl">
            Every rupee is accounted for.
          </h3>
          <motion.div
            className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-2.5"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          >
            {CERTS.map((c) => (
              <motion.a
                key={c.label}
                variants={chip}
                href={`/downloads/${c.file}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${c.label} — download certificate PDF`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink/75 ring-1 ring-ink/10 transition-colors hover:text-copper-dark hover:ring-copper/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
              >
                {c.label}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="M12 4v12m0 0 4-4m-4 4-4-4M5 20h14" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </motion.a>
            ))}
          </motion.div>
          <p className="mt-5 text-center text-xs text-ink/55">
            A registered charitable trust — Reg. E-30560 · PAN AACTR4271L. Every certificate above is downloadable.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
