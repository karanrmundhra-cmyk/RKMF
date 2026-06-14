import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { csvResponse, toCsv } from "@/lib/csv";
import { dbEnabled, dbFetch } from "@/lib/db";

export const dynamic = "force-dynamic";

// Form 10BD support export: paid, 10BD-includable, non-in-kind donations
// with donor PAN identity. Amounts in rupees (not paise).
export async function GET(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!dbEnabled()) return NextResponse.json({ error: "not configured" }, { status: 503 });
  try {
    const fy = req.nextUrl.searchParams.get("fy");
    let q = "donation?status=eq.paid&tenbd_includable=is.true&channel=neq.in_kind" +
      "&select=donor_id,gross_amount_paise,received_date,financial_year,payment_mode&order=received_date.asc&limit=100000";
    if (fy) q += `&financial_year=eq.${encodeURIComponent(fy)}`;
    const donations: any[] = (await dbFetch(q)) ?? [];

    const donorIds = Array.from(new Set(donations.map((d) => d.donor_id).filter(Boolean)));
    const donors: any[] = donorIds.length
      ? (await dbFetch(
          `donor?donor_id=in.(${donorIds.join(",")})&select=donor_id,full_name,name_as_per_pan,pan,address_line,city,state,pincode,donor_type`
        )) ?? []
      : [];
    const byId = new Map(donors.map((d) => [d.donor_id, d]));

    const rows = donations.map((d) => {
      const o = byId.get(d.donor_id) ?? {};
      return [
        o.name_as_per_pan || o.full_name || "",
        o.pan || "",
        [o.address_line, o.city, o.state, o.pincode].filter(Boolean).join(", "),
        o.donor_type || "",
        d.payment_mode || "",
        ((d.gross_amount_paise ?? 0) / 100).toFixed(2),
        d.received_date || "",
        d.financial_year || "",
      ];
    });
    return csvResponse(
      `10bd-support${fy ? "-" + fy : ""}.csv`,
      toCsv(["donor_name", "pan", "address", "donor_type", "payment_mode", "amount_inr", "received_date", "financial_year"], rows)
    );
  } catch (e) {
    console.error("[export/tenbd]", e);
    return NextResponse.json({ error: "export failed" }, { status: 500 });
  }
}
