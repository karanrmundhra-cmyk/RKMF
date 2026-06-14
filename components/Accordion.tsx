"use client";
import { useState } from "react";

/**
 * Accordion — editorial ruled rows (V3). No box: hairline top/bottom rules,
 * generous padding, larger question type. Content is always in the DOM; only the
 * height/opacity of the answer animates open. Reduced-motion users still get the
 * full toggle (no reliance on motion to read).
 */
export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="border-t border-ink/12">
      {items.map((it, i) => (
        <div key={i} className="border-b border-ink/12">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-copper-dark focus:outline-none focus-visible:text-copper-dark"
          >
            <span className="text-lg font-medium tracking-tight sm:text-xl">{it.q}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
              className={`shrink-0 text-copper-dark transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
            >
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <div className={`grid transition-all duration-300 ease-out motion-reduce:transition-none ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
            <div className="overflow-hidden">
              <p className="max-w-2xl pb-6 leading-relaxed text-ink/65">{it.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
