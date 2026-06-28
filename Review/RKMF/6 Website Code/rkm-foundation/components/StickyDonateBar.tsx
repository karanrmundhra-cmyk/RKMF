"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const HIDDEN_ON = ["/donate-now", "/thank-you", "/donation-failed"];

export default function StickyDonateBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(window.scrollY > 700);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;
  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 p-3 backdrop-blur transition-transform duration-300 sm:hidden ${show ? "translate-y-0" : "translate-y-full"}`}>
      <Link href="/donate-now#donation" className="btn-copper w-full !py-3.5">Donate Now — Feed a Rescued Animal</Link>
    </div>
  );
}
