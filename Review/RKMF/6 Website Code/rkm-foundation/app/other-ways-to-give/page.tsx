import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import FormShell from "@/components/FormShell";
import Accordion from "@/components/Accordion";
import { FAQS_GENERAL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Other Ways to Give",
  description:
    "Volunteer, donate materials, share your skills, or amplify the cause — support RKM Foundation in the way that feels right to you.",
};

export default function OtherWaysToGivePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-snow pb-14 pt-32 sm:pt-40">
        <div className="container-c max-w-3xl">
          <Reveal>
            <p className="eyebrow">Other Ways to Give</p>
            <h1 className="h-display mt-4 text-4xl sm:text-5xl lg:text-6xl">
              Not everyone can give money. Almost everyone can give something.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/70">
              Some of our best support comes from people who never donated a rupee — they showed
              up at a feeding drive, dropped off sacks of kibble, designed a poster for free, or
              told their friends about a dog who needed a home. Every one of those helps an animal
              in our care.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form */}
      <section className="bg-white py-24">
        <div className="container-c max-w-3xl">
          <Reveal>
            <p className="eyebrow">Lend a Hand</p>
            <h2 className="h-display mt-4 text-3xl sm:text-4xl lg:text-5xl">Which kind of helper are you?</h2>
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <FormShell
              formType="volunteer"
              fields={[
                { name: "name", label: "Full Name", required: true, half: true, placeholder: "Enter your full name" },
                { name: "email", label: "Email Address", type: "email", required: true, half: true, placeholder: "Enter your email address" },
                {
                  name: "way",
                  label: "How would you like to help?",
                  required: true,
                  options: [
                    "Giver of Time — Volunteer",
                    "Giver of Treasure — Donor",
                    "The Provider — Material Donor",
                    "The Mentor — Skills & Guidance",
                    "Voice of the Cause — Advocate",
                  ],
                },
                { name: "story", label: "Your Story", textarea: true, placeholder: "Tell us a little about yourself and how you'd like to help" },
              ]}
              submitLabel="Join Us"
              successMessage="Welcome aboard! We typically respond within 1–2 business days."
            />
          </Reveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-snow py-24">
        <div className="container-c max-w-3xl">
          <Reveal>
            <p className="eyebrow">Have Questions?</p>
            <h2 className="h-display mt-4 text-3xl">Frequently asked questions.</h2>
          </Reveal>
          <Reveal delay={120} className="mt-8">
            <Accordion items={FAQS_GENERAL} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
