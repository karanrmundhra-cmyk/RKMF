"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { adminFetch, inr } from "../../adminApi";

type Detail = {
  donor: Record<string, any>;
  donations: Record<string, any>[];
  receipts: Record<string, any>[];
  compliance_events: Record<string, any>[];
};

export default function DonorDetailPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Detail | null>(null);
  const [err, setErr] = useState("");
  const [issuing, setIssuing] = useState<string | null>(null);

  const load = useCallback(async () => {
    setErr("");
    try {
      const r = await adminFetch(`/api/admin/donor/${encodeURIComponent(params.id)}`);
      const j = await r.json();
      if (!r.ok) { setErr(j?.error ?? `Load failed (${r.status})`); return; }
      setData(j);
    } catch {
      setErr("Network error.");
    }
  }, [params.id]);

  useEffect(() => { void load(); }, [load]);

  async function issue(donationId: string) {
    setIssuing(donationId);
    setErr("");
    try {
      const r = await adminFetch("/api/admin/receipts/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ donation_id: donationId }),
      });
      const j = await r.json();
      if (!r.ok) { setErr(j?.error ?? "Receipt issuance failed."); return; }
      await load();
    } catch {
      setErr("Network error.");
    } finally {
      setIssuing(null);
    }
  }

  const receiptByDonation = new Map((data?.receipts ?? []).map((x) => [x.donation_id, x]));
  const d = data?.donor;

  return (
    <main className="container-c py-12">
      <p className="eyebrow">Admin</p>
      <h1 className="h-display text-3xl mt-2">{d?.full_name ?? "Donor"}</h1>
      <p className="mt-2 text-sm"><Link href="/admin/search" className="underline text-ink/60">← Search</Link></p>

      {err && <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{err}</p>}

      {d && (
        <div className="card mt-6 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">Donor</h2>
          <dl className="mt-3 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
            <div><dt className="text-ink/60">Name (PAN)</dt><dd>{d.name_as_per_pan || "—"}</dd></div>
            <div><dt className="text-ink/60">Email</dt><dd>{d.email || "—"}</dd></div>
            <div><dt className="text-ink/60">Mobile</dt><dd>{d.mobile || "—"}</dd></div>
            <div><dt className="text-ink/60">PAN</dt><dd>{d.pan || "—"}</dd></div>
            <div><dt className="text-ink/60">Type</dt><dd>{d.donor_type || "—"}</dd></div>
            <div><dt className="text-ink/60">Compliance state</dt><dd className="font-medium">{d.compliance_state || "—"}</dd></div>
            <div className="sm:col-span-2"><dt className="text-ink/60">Address</dt>
              <dd>{[d.address_line, d.city, d.state, d.pincode].filter(Boolean).join(", ") || "—"}</dd></div>
          </dl>
        </div>
      )}

      <h2 className="h-display mt-8 text-xl">Donations</h2>
      <div className="card mt-3 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-ink/60">
              <th className="px-4 py-3">Date</th><th className="px-4 py-3">Amount</th><th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Mode / Ref</th><th className="px-4 py-3">Compliance</th><th className="px-4 py-3">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {(data?.donations ?? []).length === 0 && (
              <tr><td colSpan={6} className="px-4 py-6 text-center text-ink/60">No donations.</td></tr>
            )}
            {(data?.donations ?? []).map((x) => {
              const rc = receiptByDonation.get(x.donation_id);
              return (
                <tr key={x.donation_id} className="border-b border-ink/5 align-top">
                  <td className="px-4 py-2.5">{x.received_date || "—"}</td>
                  <td className="px-4 py-2.5 font-medium">{inr(x.gross_amount_paise)}</td>
                  <td className="px-4 py-2.5">{x.status || "—"}</td>
                  <td className="px-4 py-2.5">{x.payment_mode || "—"}{x.payment_ref ? ` / ${x.payment_ref}` : ""}</td>
                  <td className="px-4 py-2.5">{x.compliance_state || "—"}</td>
                  <td className="px-4 py-2.5">
                    {rc ? rc.receipt_no : x.status === "paid" ? (
                      <button type="button" className="underline disabled:opacity-50" disabled={issuing === x.donation_id}
                        onClick={() => void issue(x.donation_id)}>
                        {issuing === x.donation_id ? "Issuing…" : "Issue receipt"}
                      </button>
                    ) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 className="h-display mt-8 text-xl">Receipts</h2>
      <div className="card mt-3 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-ink/60">
              <th className="px-4 py-3">Receipt no</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">FY</th>
              <th className="px-4 py-3">Issued</th><th className="px-4 py-3">Storage path</th>
            </tr>
          </thead>
          <tbody>
            {(data?.receipts ?? []).length === 0 && (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-ink/60">No receipts issued.</td></tr>
            )}
            {(data?.receipts ?? []).map((x) => (
              <tr key={x.receipt_id} className="border-b border-ink/5">
                <td className="px-4 py-2.5 font-medium">{x.receipt_no}</td>
                <td className="px-4 py-2.5">{x.type}</td>
                <td className="px-4 py-2.5">{x.financial_year}</td>
                <td className="px-4 py-2.5">{x.issued_at ? new Date(x.issued_at).toLocaleString("en-IN") : "—"}</td>
                <td className="px-4 py-2.5 text-xs text-ink/60">{x.pdf_path}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="h-display mt-8 text-xl">Compliance events</h2>
      <div className="card mt-3 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-ink/60">
              <th className="px-4 py-3">Field</th><th className="px-4 py-3">Old</th><th className="px-4 py-3">New</th><th className="px-4 py-3">Via</th>
            </tr>
          </thead>
          <tbody>
            {(data?.compliance_events ?? []).length === 0 && (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-ink/60">No compliance events.</td></tr>
            )}
            {(data?.compliance_events ?? []).map((x, i) => (
              <tr key={x.event_id ?? i} className="border-b border-ink/5">
                <td className="px-4 py-2.5">{x.field || "—"}</td>
                <td className="px-4 py-2.5">{x.old_value ?? "—"}</td>
                <td className="px-4 py-2.5">{x.new_value ?? "—"}</td>
                <td className="px-4 py-2.5">{x.via || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
