"use client";
import { useState } from "react";

export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-ink/10 rounded-2xl bg-white ring-1 ring-ink/10">
      {items.map((it, i) => (
        <div key={i}>
          <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-medium hover:text-copper-dark sm:px-6">
            {it.q}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden
              className={`shrink-0 transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}>
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
            <div className="overflow-hidden">
              <p className="px-5 pb-5 text-sm leading-relaxed text-ink/70 sm:px-6">{it.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
