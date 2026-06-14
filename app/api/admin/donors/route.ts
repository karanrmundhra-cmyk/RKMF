import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/adminAuth";
import { dbEnabled, dbFetch } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!dbEnabled()) return NextResponse.json({ error: "not configured" }, { status: 503 });
  try {
    const q = (req.nextUrl.searchParams.get("q") ?? "").trim();
    if (!q) return NextResponse.json({ donors: [] });
    // strip characters that would break PostgREST or=() syntax
    const safe = q.replace(/[,()\\]/g, " ").trim();
    if (!safe) return NextResponse.json({ donors: [] });
    const pat = encodeURIComponent(`*${safe}*`);
    const donors = await dbFetch(
      `donor?or=(full_name.ilike.${pat},email.ilike.${pat},pan.ilike.${pat})` +
      `&select=donor_id,full_name,email,mobile,pan,compliance_state,donor_type&order=full_name.asc&limit=50`
    );
    return NextResponse.json({ donors: donors ?? [] });
  } catch (e) {
    console.error("[admin/donors]", e);
    return NextResponse.json({ error: "search failed" }, { status: 500 });
  }
}
