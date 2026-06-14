"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const AMOUNTS = [
  { v: 2500, label: "₹2,500", ctx: "Feeds a rescued animal for 2 weeks" },
  { v: 5000, label: "₹5,000", ctx: "Food & daily care for 2–3 animals for a month", popular: true },
  { v: 10000, label: "₹10,000", ctx: "Emergency medical treatment or one kennel" },
];

declare global { interface Window { Razorpay?: any } }

export default function DonateWidget() {
  const router = useRouter();
  const params = useSearchParams();
  const [freq, setFreq] = useState<"one-time" | "monthly">(params.get("monthly") ? "monthly" : "one-time");
  const [amount, setAmount] = useState<number>(5000);
  const [custom, setCustom] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [demo, setDemo] = useState(false);

  const effective = custom ? Number(custom) : amount;
  const customInvalid = custom !== "" && Number(custom) < 1000;

  async function donate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    if (!effective || effective < 1000) { setMsg("Minimum donation is ₹1,000."); return; }
    const form = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    setBusy(true);
    try {
      const r = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: effective, frequency: freq, name: form.name, email: form.email }),
      });
      const d = await r.json();
      if (d.error) { setMsg(d.error); setBusy(false); return; }
      if (d.demo) { setDemo(true); setBusy(false); return; }

      if (!window.Razorpay) {
        await new Promise<void>((res, rej) => {
          const s = document.createElement("script");
          s.src = "https://checkout.razorpay.com/v1/checkout.js";
          s.onload = () => res(); s.onerror = () => rej(new Error("load"));
          document.body.appendChild(s);
        });
      }
      const rzp = new window.Razorpay({
        key: d.keyId,
        ...(d.monthly ? { subscription_id: d.subscriptionId } : { order_id: d.orderId, amount: d.amount, currency: "INR" }),
        name: "RKM Foundation",
        description: freq === "monthly" ? "Monthly donation (cancel anytime)" : "Donation",
        image: "/logo-512.png",
        prefill: { name: form.name, email: form.email },
        notes: { pan: form.pan ?? "", address: form.address ?? "", whatsapp_optin: form.whatsapp ? "yes" : "no" },
        theme: { color: "#93502b" },
        handler: async (resp: any) => {
          // Server-side signature verification before showing success
          try {
            const v = await fetch("/api/donate/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(resp),
            }).then((x) => x.json());
            router.push(v.verified ? "/thank-you" : "/donation-failed");
          } catch { router.push("/donation-failed"); }
        },
        modal: { ondismiss: () => setBusy(false) },
      });
      rzp.on("payment.failed", () => router.push("/donation-failed"));
      rzp.open();
    } catch {
      setMsg("Could not initiate payment. Please try again.");
      setBusy(false);
    }
  }

  if (demo) {
    return (
      <div className="card p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-copper/15 text-copper-dark">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M12 8v5m0 3v.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" strokeLinecap="round"/></svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold">Online payments launch soon</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink/70">
          We're activating our secure payment gateway. Meanwhile, write to{" "}
          <a className="link-secondary" href="mailto:info@rkm.support">info@rkm.support</a> or{" "}
          <a className="link-secondary" href="https://wa.me/919920780005" target="_blank" rel="noopener noreferrer">WhatsApp us</a>{" "}
          to donate directly — we'll guide you in minutes.
        </p>
        <button onClick={() => setDemo(false)} className="btn-light mt-6">Back</button>
      </div>
    );
  }

  return (
    <form onSubmit={donate} className="card p-6 sm:p-8">
      <div className="grid grid-cols-2 gap-2 rounded-full bg-snow p-1.5 ring-1 ring-ink/10" role="radiogroup" aria-label="Donation frequency">
        {(["one-time", "monthly"] as const).map((f) => (
          <button key={f} type="button" onClick={() => setFreq(f)} role="radio" aria-checked={freq === f}
            className={`rounded-full py-2.5 text-sm font-semibold capitalize transition-colors ${freq === f ? "bg-ink text-white" : "text-ink/60 hover:text-ink"}`}>
            {f === "one-time" ? "One-Time" : "Monthly"}
          </button>
        ))}
      </div>
      {freq === "monthly" && (
        <p className="mt-2 text-center text-xs text-copper-dark">Monthly giving sustains daily feeding & care. Cancel anytime.</p>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {AMOUNTS.map((a) => (
          <button type="button" key={a.v} onClick={() => { setAmount(a.v); setCustom(""); }}
            aria-pressed={!custom && amount === a.v}
            className={`relative rounded-2xl border p-4 text-left transition-all ${!custom && amount === a.v ? "border-copper bg-copper/10 ring-1 ring-copper" : "border-ink/15 hover:border-copper/60"}`}>
            {a.popular && <span className="absolute -top-2.5 right-3 rounded-full bg-copper-dark px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">Most Chosen</span>}
            <div className="text-lg font-bold">{a.label}</div>
            <div className="mt-1 text-xs leading-snug text-ink/60">{a.ctx}</div>
          </button>
        ))}
      </div>
      <div className="mt-3">
        <label htmlFor="custom-amt" className="sr-only">Custom amount in rupees, minimum 1,000</label>
        <input id="custom-amt" inputMode="numeric" pattern="[0-9]*" placeholder="Or enter a custom amount"
          aria-describedby="custom-amt-hint" aria-invalid={customInvalid}
          value={custom} onChange={(e) => setCustom(e.target.value.replace(/\D/g, ""))}
          className={`input-c ${customInvalid ? "!border-red-400" : ""}`} />
        <p id="custom-amt-hint" className={`mt-1 text-xs ${customInvalid ? "text-red-600" : "text-ink/60"}`}>
          Minimum donation ₹1,000
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div><label className="label-c" htmlFor="d-name">Full Name <span className="text-copper-dark">*</span></label>
          <input id="d-name" name="name" required autoComplete="name" className="input-c" placeholder="Your full name" /></div>
        <div><label className="label-c" htmlFor="d-email">Email <span className="text-copper-dark">*</span></label>
          <input id="d-email" name="email" type="email" required autoComplete="email" className="input-c" placeholder="you@example.com" /></div>
        <div><label className="label-c" htmlFor="d-pan">PAN <span className="text-ink/60">(optional)</span></label>
          <input id="d-pan" name="pan" maxLength={10} pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]" className="input-c uppercase" placeholder="ABCDE1234F" aria-describedby="pan-hint" />
          <p id="pan-hint" className="mt-1 text-xs text-ink/60">Needed only for your 80G tax certificate</p></div>
        <div><label className="label-c" htmlFor="d-addr">Address <span className="text-ink/60">(optional)</span></label>
          <input id="d-addr" name="address" autoComplete="address-level2" className="input-c" placeholder="City, State" /></div>
      </div>

      <label className="mt-5 flex items-start gap-2.5 text-xs text-ink/70">
        <input type="checkbox" name="whatsapp" className="mt-0.5 accent-copper-dark" />
        <span>Send me impact updates on WhatsApp (photos & stories of the animals you help)</span>
      </label>
      <label className="mt-3 flex items-start gap-2.5 text-xs text-ink/60">
        <input type="checkbox" required className="mt-0.5 accent-copper-dark" />
        <span>I agree to the <a href="/legal/terms-and-conditions" className="underline underline-offset-2 hover:text-copper-dark">Terms & Conditions</a> and <a href="/legal/privacy-policy" className="underline underline-offset-2 hover:text-copper-dark">Privacy Policy</a>.</span>
      </label>

      <button disabled={busy} className="btn-copper mt-6 w-full !py-4 text-base">
        {busy ? "Opening secure payment…" : `Donate ${effective >= 1000 ? `₹${effective.toLocaleString("en-IN")}` : "Now"}${freq === "monthly" ? " / month" : ""}`}
      </button>
      {msg && <p className="mt-3 text-center text-sm text-red-600" aria-live="polite">{msg}</p>}

      <p className="mt-4 text-center text-[11px] font-medium tracking-wide text-ink/60">
        UPI · GPay · PhonePe · Cards · NetBanking — secured by Razorpay
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-ink/10 pt-5 text-[11px] text-ink/60 sm:grid-cols-4">
        <div className="flex items-center gap-1.5"><Check /> 80G tax benefits</div>
        <div className="flex items-center gap-1.5"><Check /> Verified payments</div>
        <div className="flex items-center gap-1.5"><Check /> Instant receipt</div>
        <div className="flex items-center gap-1.5"><Check /> Cancel anytime</div>
      </div>
    </form>
  );
}

function Check() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#93502b" strokeWidth="2.5" aria-hidden className="shrink-0"><path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
