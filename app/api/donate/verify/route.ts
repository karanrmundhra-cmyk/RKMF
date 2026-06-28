import { NextRequest, NextResponse } from "next/server";
import { verifyPaymentSignature } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  try {
    const b = await req.json();
    const ok = verifyPaymentSignature({
      order_id: b.razorpay_order_id,
      subscription_id: b.razorpay_subscription_id,
      payment_id: b.razorpay_payment_id,
      signature: b.razorpay_signature,
    });
    if (!ok) return NextResponse.json({ verified: false }, { status: 400 });
    // Persistence is handled server-side by the Razorpay webhook (/api/razorpay-webhook): it inserts the donation, issues the numbered 80G receipt, and emails the donor idempotently. This route only confirms the payment signature to the browser.
    console.log("[donate] verified payment", b.razorpay_payment_id);
    return NextResponse.json({ verified: true });
  } catch {
    return NextResponse.json({ verified: false }, { status: 400 });
  }
}
