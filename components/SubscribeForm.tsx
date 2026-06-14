"use client";
import { useState } from "react";

export default function SubscribeForm() {
  const [state, setState] = useState<"idle" | "loading" | "ok" | "dup" | "err">("idle");
  const [email, setEmail] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const r = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "newsletter", email }),
      });
      const d = await r.json();
      setState(d.duplicate ? "dup" : r.ok ? "ok" : "err");
    } catch { setState("err"); }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold">See who you helped this month.</h3>
      <p className="mt-1 text-sm text-ink/60">Real photos and short stories from the field — the rescues, the recoveries, the homecomings. No spam, ever.</p>
      <form onSubmit={submit} className="mt-4 flex max-w-md gap-2">
        <label className="sr-only" htmlFor="footer-email">Email Address</label>
        <input id="footer-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address" className="input-c" />
        <button className="btn-dark shrink-0" disabled={state === "loading"}>
          {state === "loading" ? "…" : "Subscribe"}
        </button>
      </form>
      <p aria-live="polite" className="mt-2 min-h-5 text-sm">
        {state === "ok" && <span className="text-copper-dark">Welcome to the RKM Foundation community.</span>}
        {state === "dup" && <span className="text-ink/70">You're already part of the community.</span>}
        {state === "err" && <span className="text-red-600">Something went wrong. Please try again.</span>}
      </p>
    </div>
  );
}
