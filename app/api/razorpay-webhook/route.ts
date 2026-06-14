import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { dbEnabled, indianFY, markDonationPaid, recordPaymentEvent, upsertDonor, insertDonation } from "@/lib/db";
import { sendDonationReceipt } from "@/lib/notify";

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const sig = req.headers.get("x-razorpay-signature") ?? "";
  if (!verifyWebhookSignature(raw, sig)) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }
  const event = JSON.parse(raw);
  if (!dbEnabled()) { console.log("[webhook] (db off)", event.event); return NextResponse.json({ ok: true }); }
  try {
    const p = event.payload?.payment?.entity;
    const { duplicate } = await recordPaymentEvent({
      provider_event_id: event.id ?? `${event.event}:${p?.id ?? Date.now()}`,
      event_type: event.event, signature_valid: true, payload: event,
    });
    if (duplicate) return NextResponse.json({ ok: true, duplicate: true });

    if (event.event === "payment.captured" && p) {
      const fee = p.fee ?? 0;
      let donationId: string | undefined;
      const updated = await markDonationPaid(p.order_id ?? p.id, {
        gateway_fee_paise: fee, payment_mode: mapMethod(p.method),
        received_date: new Date(p.created_at * 1000).toISOString().slice(0, 10),
        financial_year: indianFY(new Date(p.created_at * 1000)),
      });
      if (updated?.length) {
        donationId = updated[0].donation_id;
      } else {
        // donation row missing (e.g. subscription charge) — create from payment data
        const donorId = await upsertDonor({
          full_name: p.notes?.name || "Unknown Donor", email: p.email || p.notes?.email,
          mobile: p.contact, residency_declared: true, source: "razorpay_webhook",
        });
        const row = await insertDonation({
          donor_id: donorId, channel: p.notes?.subscription ? "online_recurring" : "online",
          gross_amount_paise: p.amount, gateway_fee_paise: fee, status: "paid",
          payment_mode: mapMethod(p.method), payment_ref: p.order_id ?? p.id,
          received_date: new Date(p.created_at * 1000).toISOString().slice(0, 10),
          financial_year: indianFY(new Date(p.created_at * 1000)),
          fund_id: process.env.DEFAULT_FUND_ID, eighty_g_eligible: true,
        });
        donationId = row?.donation_id;
      }
      // Donor acknowledgement + 80G receipt email — must never break the webhook.
      if (donationId) {
        try { await sendDonationReceipt(donationId, { paymentId: p.id }); }
        catch (e) { console.error("[webhook] donor email/receipt", e); }
      }
    }
    if (event.event === "payment.failed" && p) {
      await markDonationPaid(p.order_id ?? p.id, { status: "failed" }).catch(() => {});
    }
    // subscription lifecycle events recorded in payment_event for M3/M5 processing
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[webhook] persist error", e);
    return NextResponse.json({ ok: false }, { status: 500 }); // Razorpay will retry
  }
}

function mapMethod(m?: string) {
  return ({ upi: "upi", card: "card", netbanking: "netbanking", wallet: "wallet" } as Record<string, string>)[m ?? ""] ?? "other";
}
