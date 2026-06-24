"use client";
import { useEffect } from "react";
import { CONSENT_EVENT, getStoredConsent } from "@/lib/analytics";

// Consent-gated, cookieless analytics loader (SOP-02 / RKMF-005).
//
// Nothing here runs — no script tag, no network request, no cookie — until the
// visitor has granted analytics consent (SOP-01). When they do, we install the
// Plausible queue stub (so funnel events buffered by track() flush in order)
// and inject the provider script once. Provider is env-driven so a self-hosted
// / proxied endpoint can be swapped in without code changes; defaults target
// Plausible Cloud for rkmfoundation.com.

const DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "rkmfoundation.com";
const SRC = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || "https://plausible.io/js/script.js";
const SCRIPT_ID = "rkmf-plausible";

function loadProvider(): void {
  if (typeof window === "undefined") return;
  if (document.getElementById(SCRIPT_ID)) return; // already loaded

  // Queue stub: calls to window.plausible(...) before the script finishes are
  // buffered on .q and replayed once the real script attaches.
  if (typeof window.plausible !== "function") {
    const q: unknown[] = [];
    const stub = (...args: unknown[]): void => {
      q.push(args);
    };
    (stub as unknown as { q: unknown[] }).q = q;
    window.plausible = stub as unknown as typeof window.plausible;
  }

  const s = document.createElement("script");
  s.id = SCRIPT_ID;
  s.defer = true;
  s.src = SRC;
  s.setAttribute("data-domain", DOMAIN);
  document.head.appendChild(s);
}

export default function Analytics() {
  useEffect(() => {
    // Returning visitor who already opted in: honour it on load.
    if (getStoredConsent() === "granted") {
      window.__rkmf_analyticsConsent = true;
      loadProvider();
    }

    // React to a live consent change (banner Accept) without a page reload.
    const onConsent = (e: Event) => {
      const granted = (e as CustomEvent<{ granted: boolean }>).detail?.granted;
      if (granted) loadProvider();
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  return null;
}
