import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { dbEnabled, dbFetch } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!requireAdmin(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!dbEnabled()) return NextResponse.json({ error: "not configured" }, { status: 503 });
  try {
    const id = encodeURIComponent(params.id);
    const donor = (await dbFetch(`donor?donor_id=eq.${id}&select=*&limit=1`))?.[0];
    if (!donor) return NextResponse.json({ error: "donor not found" }, { status: 404 });

    const donations: any[] = (await dbFetch(
      `donation?donor_id=eq.${id}&select=*&order=received_date.desc.nullslast&limit=500`
    )) ?? [];

    const donationIds = donations.map((d) => d.donation_id).filter(Boolean);
    const receipts: any[] = donationIds.length
      ? (await dbFetch(
          `receipt?donation_id=in.(${donationIds.join(",")})&select=receipt_id,receipt_no,donation_id,type,financial_year,pdf_path,sha256,issued_at`
        )) ?? []
      : [];

    let complianceEvents: any[] = [];
    try { complianceEvents = (await dbFetch(`compliance_event?donor_id=eq.${id}&limit=200`)) ?? []; } catch { /* table shape may vary */ }

    return NextResponse.json({ donor, donations, receipts, compliance_events: complianceEvents });
  } catch (e) {
    console.error("[admin/donor]", e);
    return NextResponse.json({ error: "lookup failed" }, { status: 500 });
  }
}
