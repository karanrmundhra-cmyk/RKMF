import Reveal from "./Reveal";

export default function PageHero({ eyebrow, title, lead, children }: { eyebrow?: string; title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <section className="bg-snow pb-16 pt-36 sm:pb-24 sm:pt-44">
      <div className="container-c max-w-4xl text-center">
        <Reveal>
          {eyebrow && <p className="eyebrow-index mb-5 justify-center">{eyebrow}</p>}
          <h1 className="display-1 text-balance">{title}</h1>
          {lead && <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink/65">{lead}</p>}
          {children && <div className="mt-9 flex flex-wrap items-center justify-center gap-3">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
