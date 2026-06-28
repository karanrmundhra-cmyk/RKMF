import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import FormShell from "@/components/FormShell";
import { CSR_PILLARS, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "CSR Partnerships",
  description:
    "Partner with RKM Foundation — a CSR-1 registered implementation partner (80G | 12A) delivering audit-ready animal-welfare programmes you can visit and verify.",
};

const WHY = [
  { title: "Fully Compliant", desc: "Schedule VII aligned, utilisation certificates" },
  { title: "Transparent", desc: "Documented reporting & field updates" },
  { title: "Customised", desc: "Aligned to your CSR policy & geography" },
  { title: "Engaging", desc: "Employee volunteering opportunities" },
];

const PROCESS = [
  { step: "1", title: "Connect", desc: "Share your CSR goals and we schedule a consultation." },
  { step: "2", title: "Customise", desc: "Programme designed to align with your CSR policy and budget." },
  { step: "3", title: "Deliver", desc: "We implement, report, and document measurable outcomes." },
];

const DELIVERABLES = [
  "Utilisation certificate",
  "Impact summary",
  "Audit support documentation",
  "Site visit (if required)",
];

export default function CSRPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-snow pb-14 pt-32 sm:pt-40">
        <div className="container-c max-w-3xl">
          <Reveal>
            <p className="eyebrow">CSR Partnerships</p>
            <h1 className="h-display mt-4 text-4xl sm:text-5xl lg:text-6xl">CSR funds that end up where you can see them.</h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">
              A CSR-1 registered implementation partner (80G | 12A). We run animal-welfare
              programmes your team can visit, audit, and report on with confidence.
            </p>
            <div className="mt-8">
              <Link href="#consultation" className="btn-copper">Request Partnership Consultation</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why Corporates Choose RKM */}
      <section className="bg-white py-24">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow">Why Corporates Choose RKM</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl lg:text-5xl">Compliant on paper. Visible on the ground.</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 80}>
                <div className="card h-full p-6">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-copper/15 text-sm font-bold text-copper-dark">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-4 font-semibold">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship opportunity */}
      <section className="bg-snow py-24">
        <div className="container-c grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Ongoing Opportunity</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl lg:text-5xl">Animal Welfare (Schedule VII)</h2>
            <p className="mt-5 leading-relaxed text-ink/70">
              A permanent shelter for 30 rescued dogs and cats currently in our care — a real place
              your team can walk through, with ongoing animal welfare and community awareness work.
            </p>
            <p className="mt-4 leading-relaxed text-ink/70">
              The detailed project requirement is shared during consultation; partners may
              contribute fully or partially depending on CSR goals and budget.
            </p>
            <div className="mt-8">
              <Link href="#consultation" className="btn-dark">Discuss This Opportunity</Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card p-7">
              <h3 className="font-semibold">Additional CSR Opportunities</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                We design and implement programmes — directly or through vetted partner NGOs —
                aligned to Schedule VII and your CSR policy.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-ink/70">
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />A tangible, visitable flagship project</li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />Employee volunteering & engagement built in</li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />Programmes across all seven pillars below</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Seven pillars */}
      <section className="bg-white py-24">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow">Design a Programme Across Any Pillar</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl lg:text-5xl">Seven Pillars of Hope.</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink/70">
              Each pillar maps to Schedule VII of the Companies Act, 2013 — so your CSR
              contribution stays fully compliant while putting your money where it matters to you.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CSR_PILLARS.map((p, i) => (
              <Reveal key={p.name} delay={(i % 3) * 80}>
                <div className="card h-full p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold">{p.name}</h3>
                    <span className="shrink-0 rounded-full bg-copper/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-copper-dark">
                      {p.schedule}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{p.desc}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={80}>
              <div className="flex h-full flex-col justify-center rounded-2xl bg-ink p-6 text-white">
                <h3 className="font-semibold">Multi-pillar programmes</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Many partners combine pillars — for example animal welfare with environment, or
                  community support with health. We design around your policy.
                </p>
                <Link href="#consultation" className="link-secondary mt-4 text-sm text-copper-light">Start a conversation →</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process + timeline */}
      <section className="bg-snow py-24">
        <div className="container-c grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Simple Partnership Process</p>
            <h2 className="h-display mt-4 text-3xl">From first call to a project you can visit.</h2>
            <div className="mt-8 space-y-5">
              {PROCESS.map((p) => (
                <div key={p.step} className="flex gap-5">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-copper/15 font-bold text-copper-dark">{p.step}</div>
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/70">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Timeline &amp; Deliverables</p>
            <h2 className="h-display mt-4 text-3xl">Paperwork your finance team will thank you for.</h2>
            <div className="card mt-8 p-7">
              <p className="text-sm font-medium uppercase tracking-wide text-ink/60">Typical project planning timeline</p>
              <p className="h-display mt-1 text-2xl">2–6 weeks</p>
              <p className="mt-5 text-sm font-medium uppercase tracking-wide text-ink/60">Deliverables may include</p>
              <ul className="mt-3 space-y-2.5 text-sm text-ink/70">
                {DELIVERABLES.map((d) => (
                  <li key={d} className="flex gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="mt-0.5 shrink-0 text-copper-dark" aria-hidden>
                      <path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Downloads */}
      <section className="bg-white py-24">
        <div className="container-c">
          <Reveal>
            <p className="eyebrow">Downloads</p>
            <h2 className="h-display mt-4 text-3xl">Partnership information.</h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Reveal>
              <a href="/downloads/RKM_Foundation_CSR_Partnership_Overview.pdf" className="card block p-6 transition hover:-translate-y-0.5">
                <p className="text-xs font-medium uppercase tracking-wide text-copper-dark">PDF</p>
                <h3 className="mt-2 font-semibold">Partnership Overview</h3>
                <p className="mt-2 text-sm text-ink/70">Programme design, compliance, and reporting at a glance.</p>
                <span className="link-secondary mt-3 inline-block text-sm">Download →</span>
              </a>
            </Reveal>
            <Reveal delay={80}>
              <a href="/downloads/RKM_Foundation_Registration_Certificates.zip" className="card block p-6 transition hover:-translate-y-0.5">
                <p className="text-xs font-medium uppercase tracking-wide text-copper-dark">ZIP</p>
                <h3 className="mt-2 font-semibold">Registration Certificates</h3>
                <p className="mt-2 text-sm text-ink/70">80G, 12A, and CSR-1 certificates in one bundle.</p>
                <span className="link-secondary mt-3 inline-block text-sm">Download →</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Consultation form */}
      <section id="consultation" className="bg-snow py-24">
        <div className="container-c max-w-3xl">
          <Reveal>
            <p className="eyebrow">Request a Consultation</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl lg:text-5xl">Tell us your CSR goals. We&apos;ll build the programme.</h2>
            <p className="mt-4 leading-relaxed text-ink/70">
              Kindly share your details below, and our team will reach out to take the discussion forward.
            </p>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <FormShell
              formType="csr"
              fields={[
                { name: "name", label: "Full Name", required: true, half: true, placeholder: "Enter your full name" },
                { name: "phone", label: "Contact Number", type: "tel", required: true, half: true, placeholder: "Enter your mobile number" },
                { name: "email", label: "Email ID", type: "email", required: true, half: true, placeholder: "Enter your email address" },
                { name: "company", label: "Company Name", required: true, half: true, placeholder: "Enter your company name" },
                { name: "pillar", label: "Pillar of Interest", options: [...CSR_PILLARS.map((p) => p.name), "Multi-pillar"] },
                { name: "budget", label: "Indicative CSR Budget", options: ["Under ₹5 Lakh", "₹5–25 Lakh", "₹25 Lakh–1 Crore", "Above ₹1 Crore", "Prefer to discuss"] },
                { name: "message", label: "Message", textarea: true, placeholder: "Tell us about your CSR goals" },
              ]}
              submitLabel="Submit Enquiry"
              successMessage="Thank you for reaching out. Our team will review your request and contact you shortly."
              note="Your information is confidential. See our Privacy Policy."
            />
          </Reveal>
          <Reveal delay={160} className="mt-8">
            <p className="text-sm text-ink/60">
              Have questions? Email{" "}
              <a href={`mailto:${SITE.email}`} className="link-secondary">{SITE.email}</a>{" "}
              or message us on{" "}
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="link-secondary">WhatsApp</a>.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
