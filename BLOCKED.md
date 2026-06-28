# BLOCKED — items waiting on the Founder Content Pack or external dependencies

_Last updated: 28 June 2026. Everything below is OUTSIDE autonomous engineering — each needs a specific input from the founder or an external provider. The exact input to unblock is listed per item._

## P0 — LIVE outage (blocking all donations right now)

1. **Razorpay payments failing ("Terminal not found" / Server Error).**
   - Unblock: Razorpay re-enables the account's payment terminal. Track via Razorpay Dashboard → Help & Support (an email was also sent to support@razorpay.com). Evidence + payment IDs in `ops/RAZORPAY-INCIDENT-2026-06-28.md`.
   - Until fixed, NO donations process on the website OR the Razorpay-hosted Payment Page. This is the single highest priority.

## P1 — Credentials / external config (no code work left; founder/owner action only)

2. **80G receipt webhook** — receipts don't send even when a payment succeeds.
   - Unblock: Razorpay Dashboard → Settings → Webhooks → add `https://rkmfoundation.com/api/razorpay-webhook` (events: payment.captured, payment.failed, subscription.charged) with a secret; set `RAZORPAY_WEBHOOK_SECRET` in Vercel (Production); confirm `SUPABASE_SERVICE_KEY`, `RESEND_API_KEY`, `DEFAULT_FUND_ID` are set.
3. **Recurring net-banking (eMandate / e-NACH)** for monthly donations.
   - Unblock: enable eMandate supported banks in Razorpay → Account & Settings → Payment Methods. (Plain net-banking does not support recurring.)
4. **Analytics 28-day baseline (SOP-02).**
   - Unblock: create a Plausible account; set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` / `NEXT_PUBLIC_PLAUSIBLE_SRC` (or accept the Plausible Cloud default); then 28 days of real-user data to record the baseline.
5. **Secret rotation (RKMF-030).**
   - Unblock: founder rotates the previously-exposed Supabase service key, Resend API key, admin token, and webhook secret; update Vercel env.
6. **Email lifecycle — live sending** (skeleton built in `lib/email-lifecycle.ts`).
   - Unblock: (a) set `RESEND_API_KEY`; (b) fill every `[NEEDS DATA]` from the Content Pack; (c) add a scheduler/cron to fire the monthly impact update + nudges.

## P1 — Founder Content Pack (unblocks the signature + conversion layer) — SOP-09

Provide in this order (each maps to specific build work that is otherwise blocked):

7. **Real named animals + outcomes + documentary photos** → unblocks the Tobler's-Ledger signature concept.
8. **3–5 rescue stories** (named animal, before/after, outcome).
9. **Impact numbers + dates** (rescued / treated / sterilised / vaccinated / fed / rehomed).
10. **Cost-per-outcome math** (Rs X = one meal / one treatment / one month) → unblocks the donation amount-ladder outcomes, the impact strips, and every `[NEEDS DATA]` in the lifecycle emails.
11. **Fund-allocation % + audited financials** (SOP-10) → unblocks the "where your money goes" transparency block.
12. **Board / founder names + consent + photos.**
13. **Mission one-liner** (confirm canonical wording).
14. **CSR case studies.**
15. **Wishlist / supply list.**
16. **FCRA status** + confirmation of any **active matching campaign** (the only sanctioned urgency mechanic).

## Anti-fabrication rule

No impact metric, beneficiary name, photo, testimonial, or financial figure is invented anywhere in the build. All such fields remain explicit `[NEEDS DATA]` placeholders until supplied above.
