import crypto from "crypto";

const BASE = "https://api.razorpay.com/v1";

export function keys() {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  return keyId && secret ? { keyId, secret } : null;
}

async function rzp(path: string, body?: unknown) {
  const k = keys();
  if (!k) throw new Error("razorpay-not-configured");
  const auth = Buffer.from(`${k.keyId}:${k.secret}`).toString("base64");
  const r = await fetch(`${BASE}${path}`, {
    method: body ? "POST" : "GET",
    headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok) throw new Error(`razorpay ${path} ${r.status}: ${await r.text()}`);
  return r.json();
}

/** One-time order */
export function createOrder(amountPaise: number, notes: Record<string, string>) {
  return rzp("/orders", { amount: amountPaise, currency: "INR", notes });
}

/** Monthly subscription — creates a plan for this amount on the fly, then a subscription. */
export async function createMonthlySubscription(amountPaise: number, notes: Record<string, string>) {
  const plan = await rzp("/plans", {
    period: "monthly", interval: 1,
    item: { name: `RKM Foundation Monthly ₹${amountPaise / 100}`, amount: amountPaise, currency: "INR" },
  });
  return rzp("/subscriptions", {
    plan_id: plan.id, total_count: 120, customer_notify: 1, notes,
  });
}

export function verifyPaymentSignature(p: { order_id?: string; subscription_id?: string; payment_id: string; signature: string }) {
  const k = keys();
  if (!k) return false;
  const payload = p.subscription_id ? `${p.payment_id}|${p.subscription_id}` : `${p.order_id}|${p.payment_id}`;
  const expected = crypto.createHmac("sha256", k.secret).update(payload).digest("hex");
  try { return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(p.signature)); } catch { return false; }
}

export function verifyWebhookSignature(rawBody: string, signature: string) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  try { return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature)); } catch { return false; }
}
