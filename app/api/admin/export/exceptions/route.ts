import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { csvResponse, toCsv } from "@/lib/csv";
import { dbEnabled, dbFetch } from "@/lib/db";

export const dynamic = "force-dynamic";

// Missing-compliance report: paid donations excluded from 10BD, with the reason.
export async function GET(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!dbEnabled()) return NextResponse.json({ error: "not configured" }, { status: 503 });
  try {
    const fy = req.nextUrl.searchParams.get("fy");
    let q = "donation?status=eq.paid&tenbd_includable=not.is.true" +
      "&select=donation_id,donor_id,gross_amount_paise,received_date,financial_year,channel,payment_mode,compliance_state" +
      "&order=received_date.asc.nullslast&limit=100000";
    if (fy) q += `&financial_year=eq.${encodeURIComponent(fy)}`;
    const donations: any[] = (await dbFetch(q)) ?? [];

    const donorIds = Array.from(new Set(donations.map((d) => d.donor_id).filter(Boolean)));
    const donors: any[] = donorIds.length
      ? (await dbFetch(`donor?donor_id=in.(${donorIds.join(",")})&select=donor_id,full_name,email,pan,compliance_state`)) ?? []
      : [];
    const byId = new Map(donors.map((d) => [d.donor_id, d]));

    const rows = donations.map((d) => {
      const o = byId.get(d.donor_id) ?? {};
      const reasons: string[] = [];
      if (d.channel === "in_kind") reasons.push("in-kind donation (excluded from 10BD)");
      if (d.payment_mode === "cash" && (d.gross_amount_paise ?? 0) > 200000) reasons.push("cash above Rs 2,000 (80G ineligible)");
      const cs = d.compliance_state || o.compliance_state;
      if (cs === "pending_pan") reasons.push("donor PAN pending");
      if (cs === "pending_address") reasons.push("donor address pending");
      if (!o.pan && !reasons.some((r) => r.includes("PAN"))) reasons.push("no PAN on file");
      if (!reasons.length) reasons.push(`compliance_state=${cs ?? "unknown"}`);
      return [
        d.donation_id, o.full_name || "", o.email || "",
        ((d.gross_amount_paise ?? 0) / 100).toFixed(2),
        d.received_date || "", d.financial_year || "", d.channel || "", d.payment_mode || "",
        cs || "", reasons.join("; "),
      ];
    });
    return csvResponse(
      `compliance-exceptions${fy ? "-" + fy : ""}.csv`,
      toCsv(["donation_id", "donor_name", "donor_email", "gross_inr", "received_date", "financial_year", "channel", "payment_mode", "compliance_state", "reason"], rows)
    );
  } catch (e) {
    console.error("[export/exceptions]", e);
    return NextResponse.json({ error: "export failed" }, { status: 500 });
  }
}
