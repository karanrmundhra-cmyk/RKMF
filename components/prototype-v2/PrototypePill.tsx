"use client";
import Link from "next/link";
import { useState } from "react";

/**
 * Tasteful prototype marker. Fixed top-right, sits BELOW the production header
 * so it never overlaps nav. Copper-dark on white, dismissible. Purely additive —
 * does not alter the page design.
 */
export function PrototypePill() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="fixed right-4 top-20 z-40 sm:right-6">
      <div className="flex items-center gap-1.5 rounded-full bg-white/95 py-1.5 pl-3.5 pr-1.5 text-xs font-semibold text-copper-dark shadow-sm ring-1 ring-copper/30 backdrop-blur">
        <Link
          href="/"
          className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
          title="Back to the live site"
        >
          Prototype v2 · motion demo
        </Link>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Dismiss prototype notice"
          className="grid h-5 w-5 place-items-center rounded-full text-copper-dark/70 transition-colors hover:bg-copper/10 hover:text-copper-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden>
            <path d="M5 5l14 14M19 5 5 19" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
