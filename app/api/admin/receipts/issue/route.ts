import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { dbEnabled } from "@/lib/db";
import { issueReceipt } from "@/lib/receipt";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!dbEnabled()) return NextResponse.json({ error: "not configured" }, { status: 503 });
  try {
    const body = await req.json().catch(() => ({}));
    const donationId = String(body?.donation_id ?? "").trim();
    if (!donationId) return NextResponse.json({ error: "donation_id required" }, { status: 400 });
    const result = await issueReceipt(donationId);
    return NextResponse.json({ ok: true, ...result });
  } catch (e: any) {
    const msg = String(e?.message ?? e);
    if (msg === "donation-not-found") return NextResponse.json({ error: "donation not found" }, { status: 404 });
    if (msg === "donation-not-paid") return NextResponse.json({ error: "receipt can only be issued for paid donations" }, { status: 400 });
    if (msg === "donor-not-found") return NextResponse.json({ error: "donor not found" }, { status: 404 });
    console.error("[admin/receipts/issue]", e);
    return NextResponse.json({ error: "receipt issuance failed" }, { status: 500 });
  }
}
