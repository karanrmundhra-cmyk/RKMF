"use client";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 600);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-ink text-white shadow-lg transition-all hover:bg-copper-dark ${show ? "opacity-100" : "pointer-events-none opacity-0"}`}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M7 13V1m0 0L1.5 6.5M7 1l5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </button>
  );
}
