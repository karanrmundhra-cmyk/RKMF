import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { dbEnabled, dbFetch } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!dbEnabled()) return NextResponse.json({ error: "not configured" }, { status: 503 });
  try {
    const [donations, pendingDonors, receipts] = await Promise.all([
      dbFetch("donation?select=donation_id,status,gross_amount_paise&limit=100000"),
      dbFetch("donor?compliance_state=in.(pending_pan,pending_address)&select=donor_id&limit=100000"),
      dbFetch("receipt?select=receipt_id&limit=100000"),
    ]);
    const all: any[] = donations ?? [];
    const paid = all.filter((d) => d.status === "paid");
    return NextResponse.json({
      donations: all.length,
      paid_count: paid.length,
      paid_total_paise: paid.reduce((s, d) => s + (d.gross_amount_paise ?? 0), 0),
      pending_pan_donors: (pendingDonors ?? []).length,
      receipts_issued: (receipts ?? []).length,
    });
  } catch (e) {
    console.error("[admin/stats]", e);
    return NextResponse.json({ error: "stats failed" }, { status: 500 });
  }
}
