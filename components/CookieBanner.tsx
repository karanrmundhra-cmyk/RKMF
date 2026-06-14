"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try { if (!localStorage.getItem("rkm-cookies-ok")) setShow(true); } catch {}
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-24 left-4 z-50 flex max-w-[330px] flex-col gap-2.5 rounded-2xl bg-ink p-4 text-white shadow-2xl sm:bottom-4" role="dialog" aria-label="Cookie notice">
      <p className="text-[13px] leading-snug">We use cookies to improve your browsing experience.</p>
      <div className="flex items-center gap-2">
        <button onClick={() => { try { localStorage.setItem("rkm-cookies-ok", "1"); } catch {}; setShow(false); }}
          className="rounded-full bg-copper-dark px-4 py-1.5 text-[13px] font-semibold hover:bg-ink">Accept</button>
        <Link href="/legal/website-disclaimer-cookie-policy" className="px-2 py-1.5 text-[13px] underline underline-offset-4 hover:text-copper-light">Learn More</Link>
      </div>
    </div>
  );
}
