"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function CookieBanner() {
  const hi = usePathname().startsWith("/hi");
  const [show, setShow] = useState(false);
  useEffect(() => {
    try { if (!localStorage.getItem("rkm-cookies-ok")) setShow(true); } catch {}
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-24 left-4 z-50 flex max-w-[330px] flex-col gap-2.5 rounded-2xl bg-ink p-4 text-white shadow-2xl sm:bottom-4" role="dialog" aria-label={hi ? "कुकी सूचना" : "Cookie notice"} style={hi ? { fontFamily: '"Noto Sans Devanagari", Inter, system-ui, sans-serif' } : undefined}>
      <p className="text-[13px] leading-snug">{hi ? "हम आपके ब्राउज़िंग अनुभव को बेहतर बनाने के लिए कुकीज़ का उपयोग करते हैं।" : "We use cookies to improve your browsing experience."}</p>
      <div className="flex items-center gap-2">
        <button onClick={() => { try { localStorage.setItem("rkm-cookies-ok", "1"); } catch {}; setShow(false); }}
          className="rounded-full bg-copper-dark px-4 py-1.5 text-[13px] font-semibold hover:bg-ink">{hi ? "स्वीकार करें" : "Accept"}</button>
        <Link href={hi ? "/hi/legal/website-disclaimer-cookie-policy" : "/legal/website-disclaimer-cookie-policy"} className="px-2 py-1.5 text-[13px] underline underline-offset-4 hover:text-copper-light">{hi ? "और जानें" : "Learn More"}</Link>
      </div>
    </div>
  );
}
