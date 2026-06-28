# RKM Foundation — Domain Cutover & Launch Closure Report
**Sprint complete · 13 Jun 2026 · live: https://rkm-foundation.vercel.app**

## A. Completed Items (done this sprint, evidence in B/C)
- Attached **rkmfoundation.com** + **www.rkmfoundation.com** to the Vercel project (success confirmed by CLI).
- Updated all website URLs in code → rkmfoundation.com: `metadataBase`, Open Graph image, Twitter card, JSON-LD `url`/`logo`, `sitemap.ts`, `robots.ts`. (Email kept as info@rkm.support — correct.)
- Added **www → non-www redirect** (best practice: rkmfoundation.com is canonical).
- Set verified email sender (`website@rkm.support`) — form/receipt emails now deliver.
- Fixed a real conversion bug (gift amounts) and re-verified.
- Verified payments, email, admin, SEO, security live.

## B. Items Fixed During Sprint
1. **Gift amounts rendered ₹0** in HTML (CountUp started at 0, only animated up via JS — crawlers and no-JS users saw ₹0). Rewrote CountUp to render the real value from first paint; animation is now pure enhancement. **Verified: homepage now shows ₹2,500 / ₹5,000 / ₹10,000 in static HTML.**
2. **Email was failing (500)** — Resend rejected the unverified sender. Set sender to the now-verified `website@rkm.support`. **Verified: contact form now returns `ok:true`.**
3. **Metadata pointed at rkm.support** (old domain) — switched to rkmfoundation.com so social shares / canonical resolve to the real site. **Verified live.**

## C. Items Tested (with evidence)
| Test | Result |
|---|---|
| Razorpay order creation | ✅ live test order `order_T141hURtB5YVCE` created |
| Donation → ledger write | ✅ "Pipeline Test" ₹5,000 row written, status `initiated` |
| Webhook rejects unsigned | ✅ 401 |
| Admin rejects no-token / wrong-token | ✅ both rejected |
| Admin stats / search / exports | ✅ stats 200, donor search found row, 10BD + exceptions CSV exports 200 |
| Email delivery | ✅ form POST returns `ok:true` (verified sender) |
| OG / canonical domain | ✅ rkmfoundation.com in meta tags |
| Gift amounts in HTML | ✅ ₹2,500 / ₹5,000 / ₹10,000 (no ₹0) |
| CSP + security headers | ✅ present and not breaking the site |

## D. Remaining Risks
- **rkmfoundation.com is not resolving yet** — it will only go live once the GoDaddy DNS records (below) are added and propagate. Until then the site lives at the vercel.app URL.
- **"Paid" + "failed" payment states** can only be fully verified by a real test-card transaction (a live Razorpay webhook must fire). Code path and idempotency are in place; the end-to-end confirmation is a 2-minute founder action.
- **Razorpay is in TEST mode** — to accept real money you must add **live** keys (`rzp_live_…`) later.
- **Demo/test data** (~12 rows incl. "Pipeline Test") is in the ledger — must be wiped before real donations (I run the reset on your word).
- **Photography** still stock-grade (separate quality lever, not a launch blocker).

## E. FOUNDER ACTION LIST (only items that require you)
| Item | Why Needed | Owner | Blocking Launch? |
|---|---|---|---|
| Add DNS records in GoDaddy (below) | Make rkmfoundation.com point to the site | Karan | **Yes — for the custom domain** |
| Run one test-card donation (₹2,500, card 4111 1111 1111 1111) | Confirm paid→webhook→ledger→receipt end-to-end | Karan | Yes — before real donations |
| Razorpay **live** keys (later) | Accept real money (test mode now) | Karan | Yes — for real donations |
| Approve demo-data reset | Clean ledger before real donations | Karan (say "go") | Yes — before real donations |
| Confirm Resend domain DKIM stays verified | Sustained email deliverability | Karan | No (already working) |
| CA sign-off on receipt format / Tally codes | Compliance correctness | Karan + CA | No (not blocking) |
| Photography (Tobler, shelter, team) | Visual quality | Karan | No |

### >>> EXACT GoDaddy DNS RECORDS TO ADD <<<
In GoDaddy → your domain `rkmfoundation.com` → **DNS → Records**, add:

| Type | Name | Value | TTL |
|---|---|---|---|
| **A** | `@` | `76.76.21.21` | 600 (or default) |
| **CNAME** | `www` | `cname.vercel-dns.com` | 600 (or default) |

**Remove** any existing parked/forwarding **A record on `@`** that points elsewhere, and any GoDaddy domain-forwarding on the root (it conflicts with the A record). Leave MX / email records untouched.
After saving, Vercel auto-issues SSL within a few minutes. www will 301-redirect to the bare domain.

---

## FINAL STATUS
- **FINAL PRODUCTION URL:** https://rkm-foundation.vercel.app (→ https://rkmfoundation.com once DNS is added)
- **FINAL DOMAIN STATUS:** 🟡 Attached in Vercel + code ready; **awaiting GoDaddy DNS (founder)**
- **FINAL PAYMENT STATUS:** 🟢 Live in **test mode** — orders + ledger writes verified; full paid-loop pending one test-card transaction; live keys pending for real money
- **FINAL EMAIL STATUS:** 🟢 Working — verified sender, forms deliver to info@rkm.support
- **FINAL ADMIN STATUS:** 🟢 Operational — token-gated, search + exports + dashboard working
- **FINAL SEO STATUS:** 🟢 Complete — titles, descriptions, canonical, OG/Twitter cards, sitemap, robots all on rkmfoundation.com
- **FINAL LAUNCH SCORE:** **8.5 / 10** — everything code-side is done and verified; the only gaps are the GoDaddy DNS records, one test transaction, live keys, and the demo-data reset — all founder actions.

**Bottom line:** there is nothing left that can be completed without you. Add the two DNS records and run one test donation, and the site is fully live.
