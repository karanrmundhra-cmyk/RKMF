"use client";
import { useState } from "react";

export default function ComplianceForm() {
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const [err, setErr] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("busy");
    const d = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const r = await fetch("/api/compliance", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) });
      const j = await r.json();
      if (r.ok) setState("ok"); else { setErr(j.error || "Please try again."); setState("err"); }
    } catch { setErr("Network error — please try again."); setState("err"); }
  }
  if (state === "ok") return (
    <div className="card mx-auto max-w-md p-6 text-center">
      <p className="font-semibold text-copper-dark">Details saved — your 80G certificate is on its way.</p>
      <p className="mt-2 text-sm text-ink/70">Your statutory Form 10BE certificate will be issued after the financial year closes (by 31 May), as required by income-tax rules.</p>
    </div>
  );
  return (
    <form onSubmit={submit} className="card mx-auto max-w-md p-6 text-left">
      <p className="text-sm font-bold uppercase tracking-wider text-copper-dark">Claim your 80G tax benefit</p>
      <p className="mt-1.5 text-sm text-ink/70">30 seconds — we need these details to issue your tax certificate.</p>
      <div className="mt-4 grid gap-3">
        <div><label htmlFor="c-email" className="label-c">Email used for donation *</label>
          <input id="c-email" name="email" type="email" required className="input-c" /></div>
        <div><label htmlFor="c-pan" className="label-c">PAN *</label>
          <input id="c-pan" name="pan" required maxLength={10} className="input-c uppercase" placeholder="ABCDE1234F" /></div>
        <div><label htmlFor="c-name" className="label-c">Name exactly as per PAN *</label>
          <input id="c-name" name="name_as_per_pan" required className="input-c" /></div>
        <div><label htmlFor="c-addr" className="label-c">Address *</label>
          <input id="c-addr" name="address_line" required className="input-c" placeholder="Flat / street" /></div>
        <div className="grid grid-cols-3 gap-2">
          <input name="city" required aria-label="City" className="input-c" placeholder="City" />
          <input name="state" required aria-label="State" className="input-c" placeholder="State" />
          <input name="pincode" required aria-label="PIN code" maxLength={6} className="input-c" placeholder="PIN" />
        </div>
      </div>
      <button disabled={state === "busy"} className="btn-copper mt-4 w-full">{state === "busy" ? "Saving…" : "Save & Get My 80G Certificate"}</button>
      {state === "err" && <p className="mt-2 text-sm text-red-600" aria-live="polite">{err}</p>}
      <p className="mt-3 text-[11px] text-ink/60">Used only for your tax documentation. Encrypted and never shared.</p>
    </form>
  );
}
