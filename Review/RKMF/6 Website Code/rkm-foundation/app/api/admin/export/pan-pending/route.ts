import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { csvResponse, toCsv } from "@/lib/csv";
import { dbEnabled, dbFetch } from "@/lib/db";

export const dynamic = "force-dynamic";

// Donors whose PAN/address is still pending, with their paid donation totals —
// the Stage-2 follow-up worklist.
export async function GET(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!dbEnabled()) return NextResponse.json({ error: "not configured" }, { status: 503 });
  try {
    const fy = req.nextUrl.searchParams.get("fy");
    const donors: any[] = (await dbFetch(
      "donor?compliance_state=in.(pending_pan,pending_address)" +
      "&select=donor_id,full_name,email,mobile,pan,compliance_state,donor_type&order=full_name.asc&limit=100000"
    )) ?? [];

    const ids = donors.map((d) => d.donor_id).filter(Boolean);
    let totals = new Map<string, { count: number; paise: number }>();
    if (ids.length) {
      let q = `donation?status=eq.paid&donor_id=in.(${ids.join(",")})&select=donor_id,gross_amount_paise&limit=100000`;
      if (fy) q += `&financial_year=eq.${encodeURIComponent(fy)}`;
      const donations: any[] = (await dbFetch(q)) ?? [];
      for (const d of donations) {
        const t = totals.get(d.donor_id) ?? { count: 0, paise: 0 };
        t.count += 1; t.paise += d.gross_amount_paise ?? 0;
        totals.set(d.donor_id, t);
      }
    }

    const rows = donors.map((d) => {
      const t = totals.get(d.donor_id) ?? { count: 0, paise: 0 };
      return [d.donor_id, d.full_name || "", d.email || "", d.mobile || "", d.donor_type || "",
        d.compliance_state || "", t.count, (t.paise / 100).toFixed(2)];
    });
    return csvResponse(
      `pan-pending${fy ? "-" + fy : ""}.csv`,
      toCsv(["donor_id", "full_name", "email", "mobile", "donor_type", "compliance_state", "paid_donations", "paid_total_inr"], rows)
    );
  } catch (e) {
    console.error("[export/pan-pending]", e);
    return NextResponse.json({ error: "export failed" }, { status: 500 });
  }
}
