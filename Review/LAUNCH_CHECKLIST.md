# RKM Foundation — Launch Checklist
Production URL (current): **https://rkm-foundation.vercel.app**
Target domain: **rkmfoundation.com**

Everything code-side is built, tested, and deployed. The items below are the
founder-controlled steps that take the site from "ready" to "live and taking real money."

---

## 1. DNS cutover — GoDaddy → Vercel  ⏳ founder
In GoDaddy → `rkmfoundation.com` → **DNS → Records**, add:

| Type | Name | Value | TTL |
|---|---|---|---|
| **A** | `@` | `76.76.21.21` | 600 (or default) |
| **CNAME** | `www` | `cname.vercel-dns.com` | 600 (or default) |

- Remove any existing **parked/forwarding A record on `@`** and any GoDaddy domain-forwarding on the root (it conflicts with the A record).
- Leave **MX / email records untouched.**
- After saving, Vercel auto-issues SSL within minutes; `www` 301-redirects to the bare domain.
- ✅ Verify: visit `https://rkmfoundation.com` → loads the site with a valid padlock.

## 2. Razorpay — switch to production keys  ⏳ founder
Currently in **TEST mode** (`rzp_test_…`). To accept real money:
1. In the Razorpay Dashboard, generate **Live** keys (`rzp_live_…` + secret).
2. In **Vercel → Project → Settings → Environment Variables**, replace:
   - `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID`
3. Update the **webhook** in Razorpay (live mode) → URL `https://rkmfoundation.com/api/razorpay-webhook`, events `payment.captured`, `payment.failed`, `subscription.charged` — and set `RAZORPAY_WEBHOOK_SECRET` to match.
4. **Redeploy** so the new env vars take effect.

## 3. Test donation (end-to-end on production)  ⏳ founder
- In **test mode** (before switching keys): donate ₹2,500 using card `4111 1111 1111 1111`, any future expiry, any CVV.
- Confirm: payment succeeds → redirected to `/thank-you` → ledger row recorded → receipt email received.
- After switching to **live** keys: make one **small real donation** (e.g. ₹100) to confirm the live path, then refund it from the Razorpay dashboard.

## 4. Reset demo/test data  ⏳ founder approval → I run it
- ~12–15 test rows (incl. "Pipeline Test", "Launch Test Donor") are in the Supabase ledger from testing.
- **Say the word and I run the reset** so the ledger is clean before the first real donation.

## 5. Analytics verification  ⏳ founder (optional but recommended)
- No analytics is wired yet. If desired, add **Vercel Web Analytics** (one toggle in the Vercel dashboard) or a GA4 / Plausible snippet.
- ✅ Verify: a test page-view shows up in the dashboard.

## 6. Email verification  ✅ working / ⏳ confirm
- Transactional email sends from the **verified** sender `website@rkm.support` (Resend, DKIM verified).
- Form submissions deliver to `info@rkm.support`.
- ⏳ Confirm the Resend domain stays **verified** and check the inbox receives a live form/receipt after go-live.

## 7. Final content review  ⏳ founder
- Real **photography** to replace the labelled "Photograph to come" image frames (the one outstanding visual gap).
- CA sign-off on the **receipt format / 80G wording** (compliance correctness).
- Confirm the **Shop "Hope" candle** details (price ₹1,999, launch timing) are current.

---

## Already done & verified (code-side)
- ✅ All 35 routes build & prerender; TypeScript clean.
- ✅ Donation flow tested live to the Razorpay checkout (Test Mode) — widget, amount tiles, custom amount, form, order creation, gateway open.
- ✅ Donations persist to the immutable ledger via the webhook (`insertDonation` / `markDonationPaid`); success `/thank-you` and failure `/donation-failed` routes wired.
- ✅ SEO: per-page titles + meta descriptions, Open Graph + Twitter cards, canonical (`rkmfoundation.com`), `sitemap.xml`, `robots.txt` (api/admin/prototype disallowed).
- ✅ Compliance: 12A · 80G · CSR · DARPAN · PAN · Reg E-30560 consistent everywhere; all 6 legal pages present; Shop 80G non-eligibility disclosed.
- ✅ Security headers (CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy) live.
- ✅ No broken internal links, no lorem ipsum in shipped pages, all referenced images present.
- ✅ Footer, navigation, and mobile drawer functional; trust de-duplicated; hierarchy tuned for fast comprehension.

**Bottom line:** add the two DNS records, swap in live Razorpay keys, run one test donation, approve the data reset — and RKM Foundation is live and accepting real, receipted, 80G-eligible donations.
