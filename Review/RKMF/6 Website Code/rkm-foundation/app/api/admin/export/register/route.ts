import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { csvResponse, toCsv } from "@/lib/csv";
import { dbEnabled, dbFetch } from "@/lib/db";

export const dynamic = "force-dynamic";

// Full donation register: every status, every field, plus donor identity and receipt number.
export async function GET(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!dbEnabled()) return NextResponse.json({ error: "not configured" }, { status: 503 });
  try {
    const fy = req.nextUrl.searchParams.get("fy");
    let q = "donation?select=*&order=received_date.asc.nullslast&limit=100000";
    if (fy) q += `&financial_year=eq.${encodeURIComponent(fy)}`;
    const donations: any[] = (await dbFetch(q)) ?? [];

    const donorIds = Array.from(new Set(donations.map((d) => d.donor_id).filter(Boolean)));
    const donors: any[] = donorIds.length
      ? (await dbFetch(`donor?donor_id=in.(${donorIds.join(",")})&select=donor_id,full_name,email,pan`)) ?? []
      : [];
    const donorById = new Map(donors.map((d) => [d.donor_id, d]));

    const receiptIds = Array.from(new Set(donations.map((d) => d.receipt_id).filter(Boolean)));
    const receipts: any[] = receiptIds.length
      ? (await dbFetch(`receipt?receipt_id=in.(${receiptIds.join(",")})&select=receipt_id,receipt_no`)) ?? []
      : [];
    const receiptById = new Map(receipts.map((r) => [r.receipt_id, r]));

    const rows = donations.map((d) => {
      const o = donorById.get(d.donor_id) ?? {};
      return [
        d.donation_id, o.full_name || "", o.email || "", o.pan || "",
        d.status || "", d.channel || "", d.payment_mode || "", d.payment_ref || "",
        ((d.gross_amount_paise ?? 0) / 100).toFixed(2),
        ((d.gateway_fee_paise ?? 0) / 100).toFixed(2),
        ((d.net_amount_paise ?? 0) / 100).toFixed(2),
        d.received_date || "", d.financial_year || "", d.fund_id || "",
        d.eighty_g_eligible ?? "", d.tenbd_includable ?? "", d.compliance_state || "",
        receiptById.get(d.receipt_id)?.receipt_no || "",
      ];
    });
    return csvResponse(
      `donation-register${fy ? "-" + fy : ""}.csv`,
      toCsv(
        ["donation_id", "donor_name", "donor_email", "donor_pan", "status", "channel", "payment_mode", "payment_ref",
         "gross_inr", "gateway_fee_inr", "net_inr", "received_date", "financial_year", "fund_id",
         "eighty_g_eligible", "tenbd_includable", "compliance_state", "receipt_no"],
        rows
      )
    );
  } catch (e) {
    console.error("[export/register]", e);
    return NextResponse.json({ error: "export failed" }, { status: 500 });
  }
}
