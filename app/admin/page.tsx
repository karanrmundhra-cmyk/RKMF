"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { adminFetch, downloadCsv, getToken, inr, setToken } from "./adminApi";

type Stats = {
  donations: number; paid_count: number; paid_total_paise: number;
  pending_pan_donors: number; receipts_issued: number;
};

const EXPORTS = [
  { path: "/api/admin/export/tenbd", file: "10bd-support.csv", label: "10BD support", desc: "Paid, includable, non-in-kind donations with donor PAN identity." },
  { path: "/api/admin/export/register", file: "donation-register.csv", label: "Donation register", desc: "Every donation, every status, all fields plus receipt numbers." },
  { path: "/api/admin/export/pan-pending", file: "pan-pending.csv", label: "PAN pending", desc: "Donors awaiting PAN/address, with their paid totals." },
  { path: "/api/admin/export/exceptions", file: "compliance-exceptions.csv", label: "Exceptions", desc: "Paid donations excluded from 10BD, with reasons." },
];

export default function AdminPage() {
  const [tokenInput, setTokenInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [fy, setFy] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const loadStats = useCallback(async () => {
    setErr("");
    setBusy(true);
    try {
      const r = await adminFetch("/api/admin/stats");
      if (r.status === 401) { setUnlocked(false); setErr("Invalid or missing admin token."); return; }
      const j = await r.json();
      if (!r.ok) { setErr(j?.error ?? "Could not load stats."); return; }
      setStats(j);
      setUnlocked(true);
    } catch {
      setErr("Network error.");
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => { if (getToken()) void loadStats(); }, [loadStats]);

  function unlock(e: React.FormEvent) {
    e.preventDefault();
    setToken(tokenInput);
    void loadStats();
  }

  async function exportCsv(path: string, file: string) {
    setErr("");
    try {
      const q = fy.trim() ? `?fy=${encodeURIComponent(fy.trim())}` : "";
      await downloadCsv(path + q, file);
    } catch (e: any) {
      setErr(String(e?.message ?? e));
    }
  }

  return (
    <main className="container-c py-12">
      <p className="eyebrow">Admin</p>
      <h1 className="h-display text-3xl sm:text-4xl mt-2">Compliance console</h1>

      {err && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{err}</p>}

      {!unlocked ? (
        <form onSubmit={unlock} className="card mt-8 max-w-md p-6">
          <label className="label-c" htmlFor="token">Admin access token</label>
          <input
            id="token" type="password" className="input-c" value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)} placeholder="Paste ADMIN_ACCESS_TOKEN" autoComplete="off"
          />
          <button type="submit" className="btn-dark mt-4 w-full" disabled={busy || !tokenInput.trim()}>
            {busy ? "Checking…" : "Unlock"}
          </button>
        </form>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="card p-5"><p className="text-xs text-ink/60">Donations</p><p className="h-display mt-1 text-2xl">{stats?.donations ?? "—"}</p></div>
            <div className="card p-5"><p className="text-xs text-ink/60">Paid total</p><p className="h-display mt-1 text-2xl">{stats ? inr(stats.paid_total_paise) : "—"}</p><p className="text-xs text-ink/60">{stats?.paid_count ?? 0} paid</p></div>
            <div className="card p-5"><p className="text-xs text-ink/60">Pending PAN</p><p className="h-display mt-1 text-2xl">{stats?.pending_pan_donors ?? "—"}</p></div>
            <div className="card p-5"><p className="text-xs text-ink/60">Receipts issued</p><p className="h-display mt-1 text-2xl">{stats?.receipts_issued ?? "—"}</p></div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/admin/search" className="btn-dark">Donor search</Link>
            <button type="button" className="text-sm underline text-ink/60" onClick={() => void loadStats()}>Refresh stats</button>
          </div>

          <h2 className="h-display mt-10 text-xl">Exports</h2>
          <div className="mt-3 max-w-xs">
            <label className="label-c" htmlFor="fy">Financial year filter (optional)</label>
            <input id="fy" className="input-c" value={fy} onChange={(e) => setFy(e.target.value)} placeholder="e.g. 2026-27" />
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {EXPORTS.map((x) => (
              <div key={x.path} className="card flex items-start justify-between gap-4 p-5">
                <div>
                  <p className="font-medium text-sm">{x.label}</p>
                  <p className="mt-1 text-xs text-ink/60">{x.desc}</p>
                </div>
                <button type="button" className="btn-dark shrink-0 text-sm" onClick={() => void exportCsv(x.path, x.file)}>CSV</button>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
