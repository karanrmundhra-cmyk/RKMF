import Reveal from "./Reveal";

export default function PageHero({ eyebrow, title, lead, children }: { eyebrow?: string; title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <section className="bg-snow pb-14 pt-32 sm:pb-20 sm:pt-40">
      <div className="container-c max-w-3xl text-center">
        <Reveal>
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
          {lead && <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg">{lead}</p>}
          {children && <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
