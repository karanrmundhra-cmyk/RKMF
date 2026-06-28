# Razorpay Payment Incident — 28 June 2026

## Status: BLOCKED on Razorpay support (not a website/code issue, per evidence below)

## Customer-facing symptom
- Donor sees on the Razorpay-hosted Payment Page: "Payment could not be completed — Terminal not found."

## Evidence (Razorpay Dashboard -> Payments -> Today, 28 Jun 2026)
- Failed today: 4 payments. Dashboard attribution: "100% Others related / 0% Customer related" (i.e. gateway-side, not the donor).
- Failed transactions captured:
  - pay_T6yNpMu3k1pvAZ — Rs 1,000 — Netbanking — ~1:13 PM IST — status "Razorpay – Server Error"
  - pay_T6yI9LMhju1ITY — Rs 1,020 — ~1:07 PM IST — status "Razorpay – Server Error"
- Reproduced on BOTH surfaces:
  - Razorpay-hosted Payment Page: https://pages.razorpay.com/animal-welfare
  - Custom website checkout: https://rkmfoundation.com (Razorpay Checkout)
- Because it fails on Razorpay's OWN hosted page (no RKMF code involved), the integration is ruled out.

## Interpretation (bounded by available evidence — NOT a certainty)
- The combination of (a) "Others related" attribution, (b) "Razorpay – Server Error" status, and (c) failure on Razorpay's own hosted page points to a Razorpay-side terminal/gateway problem.
- Exact root cause must be confirmed by Razorpay support; do not assert beyond this.

## Action taken
- Support email sent from karanrmundhra@gmail.com to support@razorpay.com (cc self) with the above details and payment IDs. (Verify in Gmail -> Sent.)
- Recommended additional step: raise an in-dashboard Help & Support ticket (account-linked, usually faster).

## Open / next
- Await Razorpay response + terminal/method re-activation; then re-test the Payment Page.
- Unrelated but still pending: 80G receipt webhook (RAZORPAY_WEBHOOK_SECRET) not yet configured.
- Screenshots: dashboard Payments view + donor error to be added to ops/evidence/.
