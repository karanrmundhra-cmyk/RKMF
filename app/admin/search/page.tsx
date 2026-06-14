"use client";
import { useState } from "react";
import Link from "next/link";
import { adminFetch } from "../adminApi";

type DonorRow = {
  donor_id: string; full_name?: string; email?: string; mobile?: string;
  pan?: string; compliance_state?: string; donor_type?: string;
};

export default function DonorSearchPage() {
  const [q, setQ] = useState("");
  const [rows, setRows] = useState<DonorRow[] | null>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function search(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const r = await adminFetch(`/api/admin/donors?q=${encodeURIComponent(q.trim())}`);
      const j = await r.json();
      if (!r.ok) { setErr(j?.error ?? `Search failed (${r.status})`); setRows(null); return; }
      setRows(j.donors ?? []);
    } catch {
      setErr("Network error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="container-c py-12">
      <p className="eyebrow">Admin</p>
      <h1 className="h-display text-3xl mt-2">Donor search</h1>
      <p className="mt-2 text-sm"><Link href="/admin" className="underline text-ink/60">← Dashboard</Link></p>

      <form onSubmit={search} className="mt-6 flex max-w-xl gap-3">
        <input className="input-c" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, email or PAN" />
        <button type="submit" className="btn-dark shrink-0" disabled={busy || !q.trim()}>{busy ? "Searching…" : "Search"}</button>
      </form>

      {err && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{err}</p>}

      {rows && (
        <div className="card mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-ink/60">
                <th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Mobile</th>
                <th className="px-4 py-3">PAN</th><th className="px-4 py-3">Compliance</th><th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-6 text-center text-ink/60">No donors found.</td></tr>
              )}
              {rows.map((d) => (
                <tr key={d.donor_id} className="border-b border-ink/5">
                  <td className="px-4 py-2.5 font-medium">{d.full_name || "—"}</td>
                  <td className="px-4 py-2.5">{d.email || "—"}</td>
                  <td className="px-4 py-2.5">{d.mobile || "—"}</td>
                  <td className="px-4 py-2.5">{d.pan || "—"}</td>
                  <td className="px-4 py-2.5">{d.compliance_state || "—"}</td>
                  <td className="px-4 py-2.5"><Link href={`/admin/donor/${d.donor_id}`} className="underline">Open</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
