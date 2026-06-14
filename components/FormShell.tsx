"use client";
import { useState } from "react";

type Field = {
  name: string; label: string; type?: string; required?: boolean; placeholder?: string;
  options?: string[]; textarea?: boolean; half?: boolean; hint?: string;
};

export default function FormShell({
  formType, fields, submitLabel, successMessage, note,
}: {
  formType: string; fields: Field[]; submitLabel: string; successMessage: string; note?: string;
}) {
  const [state, setState] = useState<"idle" | "loading" | "ok" | "dup" | "err">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const r = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType, ...data }),
      });
      const d = await r.json().catch(() => ({}));
      setState(d.duplicate ? "dup" : r.ok ? "ok" : "err");
    } catch { setState("err"); }
  }

  if (state === "ok") {
    return (
      <div className="rounded-[1.25rem] bg-snow p-10 text-center ring-1 ring-ink/[0.08]">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-copper/15 text-copper-dark">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="m4.5 12.5 5 5 10-11" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <p className="mt-4 text-lg font-medium">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <input type="hidden" name="_ts" value={String(Date.now())} />
      {fields.map((f) => (
        <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
          <label htmlFor={`${formType}-${f.name}`} className="label-c">
            {f.label}{f.required && <span className="text-copper-dark"> *</span>}
          </label>
          {f.textarea ? (
            <textarea id={`${formType}-${f.name}`} name={f.name} required={f.required} placeholder={f.placeholder} rows={4} className="input-c" />
          ) : f.options ? (
            <select id={`${formType}-${f.name}`} name={f.name} required={f.required} className="input-c" defaultValue="">
              <option value="" disabled>{f.placeholder ?? "Select…"}</option>
              {f.options.map((o) => <option key={o}>{o}</option>)}
            </select>
          ) : (
            <input id={`${formType}-${f.name}`} name={f.name} type={f.type ?? "text"} required={f.required} placeholder={f.placeholder} className="input-c" />
          )}
          {f.hint && <p className="mt-1 text-xs text-ink/60">{f.hint}</p>}
        </div>
      ))}
      <div className="sm:col-span-2">
        <button className="btn-dark w-full sm:w-auto" disabled={state === "loading"}>
          {state === "loading" ? "Submitting…" : submitLabel}
        </button>
        {note && <p className="mt-3 text-xs text-ink/60">{note}</p>}
        <p aria-live="polite" className="mt-2 min-h-5 text-sm">
          {state === "dup" && <span className="text-ink/70">You have already submitted this request. Our team will be in touch shortly.</span>}
          {state === "err" && <span className="text-red-600">Something went wrong. Please try again or contact us at info@rkm.support.</span>}
        </p>
      </div>
    </form>
  );
}
