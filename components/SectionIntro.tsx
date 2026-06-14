import Reveal from "./Reveal";

/**
 * SectionIntro — editorial section header. Indexed eyebrow + oversized display
 * headline + optional lead. Left-aligned by default (editorial), centreable.
 * Content renders visible (Reveal only adds a below-fold fade-up enhancement).
 */
export default function SectionIntro({
  eyebrow,
  title,
  lead,
  align = "left",
  size = "display-2",
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  size?: "display-2" | "display-3";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <Reveal className={className}>
      <p className={`eyebrow-index ${centered ? "justify-center" : ""}`}>{eyebrow}</p>
      <h2 className={`${size} mt-5 text-balance ${centered ? "mx-auto max-w-4xl text-center" : "max-w-[18ch]"}`}>{title}</h2>
      {lead && (
        <p className={`mt-6 text-lg leading-relaxed text-ink/65 ${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>{lead}</p>
      )}
    </Reveal>
  );
}
