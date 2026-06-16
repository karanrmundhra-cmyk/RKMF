# RKM Foundation — Launch Closure Report
**Date:** 15 Jun 2026 · **Live:** https://rkmfoundation.com · **Base commit:** `83c7f05`
**Verification:** `tsc --noEmit` → exit 0. 8 files changed (this closure pass + the prior email-honesty pass), all in the working tree, ready to push.

> Deploy note: production is **live taking real money**. I made every safe fix in the repo and verified it, but I deliberately did **not** do an out-of-band deploy to a live donation site (and this environment has no GitHub push credentials regardless). Ship via the normal GitHub → Vercel pipeline — command in §"Remaining P0".

---

## PHASE 1 — MASTER GAP LIST (current, de-duplicated)

| # | Gap | Type | Status now |
|---|-----|------|-----------|
| 1 | Shop is non-transactional (no cart/checkout/payment/order email/invoice/refund) | Unfinished feature | Kept as honest "Coming Soon"; orphan pages noindexed |
| 2 | `/shop/thank-you`, `/shop/order-failed` | Orphan pages | **Hidden (noindex)** |
| 3 | `/fundraiser/ready`, `/fundraiser/success`, `/fundraiser/thank-you` | Orphan pages (imply P2P platform) | **Hidden (noindex)** |
| 4 | Self-serve fundraiser (per-fundraiser pages, donation routing, dashboard, statuses) | Missing workflow | Does not exist; manual "request" model is the real flow |
| 5 | Volunteer submitter acknowledgement email | Missing email | **Fixed (template added)** |
| 6 | False "email/invoice has been sent" copy on shop & fundraiser thank-you | Trust risk | **Fixed (last pass)** |
| 7 | Hindi ("EN \| हिंदी soon") advertised but not built | Incomplete feature | **Removed all references** |
| 8 | Donation email/receipt loop never verified in production | Unverified automation | Founder ₹1,000 test required (P0) |
| 9 | No impact counters / live numbers | Missing UX / trust | Buildable now (needs real figures) |
| 10 | No testimonials / social proof on home | Missing UX / trust | Buildable now (quotes already exist on /shop) |
| 11 | ₹1,000 donation minimum | Donation blocker | Founder decision (one-line change) |
| 12 | Monthly giving not the default | Donation blocker | Quick fix |
| 13 | No financial-transparency / annual report | Missing download / trust | Founder asset |
| 14 | Single blog post (no Stories hub) | Thin content | Content task |
| 15 | No admin dashboards for fundraiser/volunteer pipelines | Missing admin tool | Manual via email today |
| 16 | Structured data limited to NGO schema (no FAQPage/Breadcrumb/DonateAction) | SEO | Quick add |
| 17 | No per-page OG images | SEO/social | Asset + quick add |
| 18 | FCRA / foreign-donation stance not stated | Legal clarity / trust | Founder/legal |
| 19 | Color-contrast & reduced-motion not audited | Accessibility | Dev task |
| 20 | Production email-send evidence not accessible (Resend not connected) | Missing analytics/monitoring | Founder verifies in Resend |

Items confirmed **fine** (not gaps): `/prototype` & `/prototype-v2` already `redirect("/")`; the 404 page renders an on-brand custom page; security headers, RLS, receipts, registrations all in place.

---

## PHASE 2 — SHOP · EXACT STATUS

**Decision implemented: C — Keep as "Coming Soon"** (safest: it's honest, captures interest via "Notify Me," and breaks no links). Orphan transactional pages hardened with `noindex`.

| Element | Status |
|---|---|
| Products | 1 display-only ("Hope" Candle), no inventory system |
| Cart | **None** |
| Checkout | **None** |
| Order flow | **None** |
| Payment flow | **None** |
| Order/confirmation email | **None** (false claim removed; page noindexed) |
| Invoice automation | **None** |
| Refund flow | **None** |

**Verdict:** Shop is **not a store** — it is a correctly-labelled "Launching Soon" teaser. Safe to keep live as-is.

---

## PHASE 3 — FUNDRAISER · REAL vs FAKE

- **Real:** `/fundraiser` (landing) + `/fundraiser/create` (form → `/api/forms`, `formType: fundraiser-create` → admin notification to info@rkm.support **+** submitter acknowledgement). This is a working **"request a fundraiser, we set it up manually"** flow.
- **Fake / placeholder:** `/fundraiser/ready`, `/fundraiser/success`, `/fundraiser/thank-you` — UI for a self-serve peer-to-peer donation platform that **does not exist** (no per-fundraiser pages, no fundraiser donation routing, no progress tracking, no admin dashboard). Nothing links to them.
- **Hidden:** all three orphans now `noindex`.
- **Fixed:** the false "confirmation email and receipt have been sent" copy (prior pass).
- **Admin workflow:** fundraiser requests arrive by email; founder sets up + sends the link manually. No dashboard (acceptable for a manual model).

---

## PHASE 4 — EMAIL AUTOMATION · PASS / FAIL / UNVERIFIED

| Form | Admin notif | Submitter ack | Status |
|---|---|---|---|
| Contact | coded | coded | UNVERIFIED |
| Volunteer | coded | **coded (fixed this cycle)** | UNVERIFIED |
| CSR | coded | coded | UNVERIFIED |
| Partner | coded | coded | UNVERIFIED |
| Newsletter | coded | welcome coded | UNVERIFIED |
| Careers | coded | coded | UNVERIFIED |
| Fundraiser (request) | coded | coded | UNVERIFIED |
| Donation (receipt + ack) | n/a | coded (webhook) | UNVERIFIED |

**No FAIL remains** (the only prior FAIL — volunteer ack — is fixed). Everything is implemented; nothing is **PASS** because there is no accessible production send evidence (Resend dashboard not connected; Vercel logs show no `/api/forms` or webhook calls). **Conversion to PASS requires the founder to submit one of each form + run the ₹1,000 live donation and confirm in Resend → Logs.** Fixed everything fixable in code; the rest is verification only.

---

## PHASE 5 — ANIMAL EXPERIENCE (implementable now, with existing assets)

Existing assets in `public/images/`: site photos (dog, feed, heal, rest, street, care, about, girl, old-man, pollution), full team photos, 7 CSR pillar images, and 3 shop reviewer photos. Enough to build immediately:
- **From-the-field gallery** on Home / About using existing site images + lightbox.
- **Testimonials block** — three real quotes already exist on `/shop` (Gouri, Amit, Sheetal); surface them on Home near the donate CTA.
- **Impact counters** — the `CountUp` component already exists; wire real numbers (needs founder figures).
- **Before/after** — needs paired rescue photos (founder asset).
These are the highest emotional ROI and use assets already on the server (except real impact numbers and before/after pairs).

---

## PHASE 6 — DONATION CONVERSION BLOCKERS (ranked)

| Blocker | Impact | Effort |
|---|---|---|
| ₹1,000 minimum (excludes small/first-time donors) | High | Low (1 line; founder decision) |
| No donate widget above the fold on Home | High | Medium |
| Monthly giving not the default option | High | Low |
| No impact counters / social proof of scale | High | Medium |
| No testimonials near the ask | Med-High | Low (content exists) |
| Weak recurring-donation visibility / no donor portal | Medium | Medium |
| No campaign goal meter / urgency | Medium | Medium |
| No "see the animal you helped" follow-up | Medium | Medium |

---

## PHASE 7 — HINDI

**Can Hindi launch now? NO.** (No i18n, no translations, label only.)
**Action taken:** all Hindi references removed from Header and Footer (the "EN | हिंदी soon" toggle is gone).

---

## PHASE 9 — FINAL REPORT

### 1. Everything Fixed (this + prior closure pass; type-checked, in working tree)
- Added the **Volunteer acknowledgement email** template (`lib/email.ts`).
- Removed false **"email has been sent"** claims on `/shop/thank-you` and `/fundraiser/thank-you`.
- Added **`noindex`** to 5 orphan placeholder pages (shop thank-you/order-failed; fundraiser ready/success/thank-you).
- Removed **all Hindi references** (Header + Footer).

### 2. Everything Hidden
- 5 orphan placeholder pages → `noindex` (won't appear in search; still reachable only by direct URL, and nothing links to them).
- Hindi language toggle → removed from UI.

### 3. Everything Removed
- Hindi "soon" labels (Header + Footer).
- False email-sent assertions (shop + fundraiser thank-you).

### 4. Remaining P0 — Must fix before *active promotion* (founder-only)
1. **Push & deploy the closure fixes** (from your authenticated Mac):
   ```bash
   git add lib/email.ts components/Header.tsx components/Footer.tsx \
     app/shop/thank-you/page.tsx app/shop/order-failed/page.tsx \
     app/fundraiser/ready/page.tsx app/fundraiser/success/page.tsx app/fundraiser/thank-you/page.tsx
   git commit -m "Launch closure: volunteer ack, remove false email claims, noindex orphan pages, hide Hindi labels"
   git push origin main
   ```
2. **Run the ₹1,000 live donation test** and confirm webhook 200 → receipt `RKM/2026-27/00006` → donor receives ack + 80G PDF (this is the one thing proving the money→receipt→email loop).
3. **Rotate the exposed secrets** (service key, webhook secret, Resend, admin token) + redeploy.
4. **Confirm the live Razorpay webhook** (endpoint/events/secret match).
5. **Decide the seed/demo-data reset** (incl. the `AUDIT PROBE` row) so numbering starts clean.

### 5. Remaining P1 — This week
- Decide & (if yes) implement **lower donation minimum** + **make monthly default**.
- Add **impact counters**, **testimonials**, and a **field gallery** to Home (assets exist).
- Put the **donate widget above the fold** on Home.
- Add **FAQPage / Breadcrumb / DonateAction** structured data.

### 6. Remaining P2 — Can wait
- Stories/blog hub, named animal profiles, financial-transparency page, CSR case studies/logos, per-page OG images, PWA manifest, contrast/reduced-motion audit, FCRA stance, donor portal, goal meters.

---

## The most important answer — 20 highest-impact actions before you actively promote

*(Ordered by impact; most are doable today, the rest are quick founder actions.)*

1. **Push & deploy** the closure fixes (command above) — get the honesty/SEO fixes live.
2. **Run the ₹1,000 live donation** and verify the full webhook → receipt → email loop end-to-end.
3. **Rotate the exposed secrets** and redeploy.
4. **Confirm the live Razorpay webhook** returns 200 (not 401).
5. **Reset the seed/demo data** so the donor register & receipt numbering start clean.
6. **Lower the donation minimum** to ₹100–₹500 (biggest funnel widener) — or consciously decide to keep ₹1,000.
7. **Make monthly giving the default** in the donate widget with "Most donors choose ₹2,500/month."
8. **Embed the donate widget above the fold on Home** (don't make donors click through).
9. **Add live impact counters** (meals, rescues, surgeries, sheltered) with real numbers via the existing `CountUp`.
10. **Add 3 testimonials** to Home near the CTA (reuse the real quotes already on `/shop`).
11. **Add a "From the field" photo gallery** using the images already on the server.
12. **Add a "Where your money goes"** simple breakdown (food / medical / shelter / ops).
13. **Verify all 8 form emails actually deliver** (submit each; check Resend → Logs).
14. **Confirm the donor receipt PDF renders correctly** from the first real receipt.
15. **Add a trust line at the pay button** ("256-bit secure · instant 80G receipt").
16. **State the FCRA / foreign-donation stance** (e.g., "domestic donations only for now").
17. **Add FAQPage + DonateAction structured data** for richer search results.
18. **Add per-page OG images** for Home / Donate / CSR so shares look premium.
19. **Add one CSR proof element** (a case study or, with permission, a partner logo) to lift CSR conversion.
20. **Final mobile pass** on the donation flow (one-tap UPI, tap targets, no layout shift).

Do 1–5 and you are safe to promote. Do 6–12 and donations will measurably climb. Do 13–20 and the site reads as a polished, trustworthy, promotable platform.
