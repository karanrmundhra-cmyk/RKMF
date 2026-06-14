# RKM Foundation — Final Founder Handover Pack

**Prepared for launch readiness review · Evidence-based, no assumptions**
**Date:** 14 June 2026 · **Status of project:** Pre-launch (Razorpay TEST mode)
**Audience:** Founder, and any developer / agency / CTO / auditor / board member who inherits this project.

> This pack is read-only. No code, configuration, deployment, or data was changed to produce it. Every claim below is backed by code inspection, production logs, live probes, or direct database queries run on 14 Jun 2026.

---

## SECTION 1 — EXECUTIVE SUMMARY

### Readiness scores

| Dimension | Score | Basis |
|---|---|---|
| **Launch Readiness (overall)** | **7.5 / 10** | Engineering complete and sound; blocked only by founder/operational steps (live keys, DNS, one verified test donation). |
| Frontend Readiness | 9 / 10 | All pages live and rendering on the vercel.app deployment; donation widget, forms, legal pages functional. Pending real photography/content. |
| Backend Readiness | 9 / 10 | Donation ledger, webhook-as-source-of-truth, gapless receipt numbering, audit trail all built and DB-enforced. |
| Automation Readiness | 7 / 10 | All donor + form emails built and wired; receipt PDF generates; only the card→webhook→inbox path is unverified end-to-end. |
| Security Readiness | 7.5 / 10 | Admin gated (401 verified), webhook HMAC verified, rate limiting present, secrets server-side. Open items: shared static admin token, secrets shared in chat need rotation. |
| Compliance Readiness | 9 / 10 | 12A/80G/CSR-1/DARPAN/PAN all present and consistent; provisional-receipt + Form 10BE wording correct; immutable audit ledger. |
| Donation Readiness | 5 / 10 | Pipeline complete but in **TEST mode**; cannot accept real money until live keys + one verified test donation. |

### GO / NO-GO

**NO-GO for accepting real donations today.** The reasons are operational, not engineering:

### Exact launch blockers
1. **Razorpay is in TEST mode** — no live keys, cannot process real money.
2. **Donor receipt + acknowledgement emails are not yet verified end-to-end** — every component is proven independently, but no real test donation has confirmed the two emails (with PDF) actually land in an inbox.
3. **DNS not cut over** — the site currently serves on the Vercel domain only; rkmfoundation.com does not yet point to it.

### Exact founder actions required (to flip to GO)
1. Add **live Razorpay keys** + live webhook secret to Vercel env, then redeploy.
2. Run **one test-card donation** with a real inbox and confirm both emails + the PDF receipt arrive.
3. **Cut over DNS** at the registrar (A + CNAME records).
4. **Rotate** the credentials that were shared in chat earlier (see Section 4).
5. Say **"go"** to reset demo/test data before launch.

Estimated hands-on time to launch: **~2–3 hours** of founder work (see Section 11).

---

## SECTION 2 — COMPLETE SOFTWARE INVENTORY

| Software / Service | Purpose | Environment | Status | Owner | Criticality |
|---|---|---|---|---|---|
| **Vercel** | Hosting, serverless API routes, build/deploy, SSL | Production | Live (serving on *.vercel.app) | Founder | Critical |
| **Supabase (Postgres)** | Donation ledger, donors, receipts, audit trail, storage | Production (project `rnwifjrdhdhemrlmgjij`) | Live, healthy | Founder | Critical |
| **Razorpay** | Payment gateway (Orders, Subscriptions, Webhooks) | **TEST mode** | Test keys active; live keys needed | Founder | Critical |
| **Resend** | Transactional email (donor + form + receipt emails) | Production | Live; domain rkm.support verified | Founder | Critical |
| **Domain registrar (rkmfoundation.com)** | Domain ownership | Production | Owned; DNS not yet pointed to Vercel | Founder | Critical |
| **DNS** | Routing rkmfoundation.com → Vercel | Production | **Not cut over** | Founder | Critical |
| **Supabase Storage ("receipts" bucket)** | Stores generated 80G receipt files (private) | Production | Live | Founder | High |
| **pdf-lib** (library) | Generates the 80G receipt PDF (no account needed) | Bundled | Working | n/a | High |
| **resend (npm SDK)** | Resend API client (no separate account) | Bundled | Working | n/a | High |
| **Next.js 14 / React / Tailwind** | Application framework + UI | Bundled | Working | n/a | Critical |
| **Email domain (rkm.support)** | Verified sender domain for all outbound mail | Production | Verified in Resend | Founder | Critical |
| **Analytics** | Visitor/traffic analytics | — | **Not installed** (none detected in code) | Founder | Low |
| **Monitoring / error tracking** | Uptime + error alerting | — | **Not installed** (relies on Vercel logs only) | Founder | Medium |

### Per-service access reference

| Service | Login URL | Admin URL | What it controls | Founder access verified? |
|---|---|---|---|---|
| Vercel | vercel.com/login | vercel.com/dashboard → project | Deploys, env vars, domains, runtime logs | Verified (deploys + logs accessed this project) |
| Supabase | supabase.com/dashboard/sign-in | supabase.com/dashboard/project/rnwifjrdhdhemrlmgjij | DB, storage, service keys | Verified (SQL + storage in use) |
| Razorpay | dashboard.razorpay.com | dashboard.razorpay.com (Settings → API Keys / Webhooks) | Payments, webhook secret, live keys | Assumed (founder holds; **verify before launch**) |
| Resend | resend.com/login | resend.com/ (API Keys, Domains) | Email sending, domain verification | Verified (emails send in prod) |
| Domain registrar | (registrar of rkmfoundation.com) | registrar DNS panel | Domain + DNS records | **Verify** — needed for cutover |
| Admin portal | rkmfoundation.com/admin (token-gated) | same | Donation/donor/receipt views, exports | Verified (gate enforced; 401 without token) |

> **Hidden dependencies to note:** (a) all outbound email depends on the **rkm.support** domain staying verified in Resend — if the domain's DNS/verification lapses, every email silently fails; (b) receipt PDFs depend on the private Supabase **"receipts"** storage bucket; (c) the webhook depends on the Razorpay **webhook secret** matching the Vercel env value — a mismatch makes every webhook return 401.

---

## SECTION 3 — CREDENTIAL & ACCESS REGISTER

| System | Credential Name | Purpose | Privilege Level | Stored Where | Rotation | Founder Has Access? |
|---|---|---|---|---|---|---|
| Supabase | `SUPABASE_SERVICE_KEY` (service_role) | Full DB read/write (bypasses RLS) | **Highest** (god-mode) | Vercel env | **MUST ROTATE BEFORE LAUNCH** (shared in chat) | Yes |
| Supabase | `SUPABASE_URL` | DB endpoint | Public-ish | Vercel env | SAFE | Yes |
| Razorpay | `RAZORPAY_KEY_ID` / `KEY_SECRET` (test) | Test gateway auth | High (test only) | Vercel env | Replaced by live keys at launch | Yes |
| Razorpay | `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Client checkout key id | Public by design | Vercel env / client | SAFE (public key id) | Yes |
| Razorpay | `RAZORPAY_WEBHOOK_SECRET` | Verifies webhook authenticity | High | Vercel env | **MUST ROTATE BEFORE LAUNCH** (shared in chat) | Yes |
| Resend | `RESEND_API_KEY` | Send all transactional email | High | Vercel env | **MUST ROTATE BEFORE LAUNCH** (shared in chat) | Yes |
| Admin portal | `ADMIN_ACCESS_TOKEN` | Gate `/admin` + admin APIs | High (PII access) | Vercel env | **MUST ROTATE BEFORE LAUNCH** (shared in chat) | Yes |
| Email | `FORMS_FROM_EMAIL` / `FORMS_TO_EMAIL` | Sender/recipient addresses | Config (not secret) | Vercel env | SAFE | Yes |
| Email | `RECEIPTS_FROM_EMAIL` | Optional receipt sender override | Config | Vercel env (optional) | SAFE | Yes |
| DB config | `DEFAULT_FUND_ID` | Default fund for webhook-created donations | Config | Vercel env (optional) | SAFE | Yes |

### Credentials that appeared in chat / logs / source — exposure review

| Credential | Where it appeared | Classification |
|---|---|---|
| Supabase service_role key | Pasted in chat (earlier session) | **MUST ROTATE BEFORE LAUNCH** |
| Razorpay test key id + secret | Pasted in chat | SHOULD ROTATE (test-only; will be replaced by live keys regardless) |
| Razorpay webhook secret | Pasted in chat | **MUST ROTATE BEFORE LAUNCH** |
| Resend API key | Pasted in chat | **MUST ROTATE BEFORE LAUNCH** |
| Admin access token | Pasted in chat | **MUST ROTATE BEFORE LAUNCH** |
| Any value in **source code** | None — all secrets read from `process.env`; none hardcoded (verified in `lib/email.ts`, `lib/db.ts`, webhook route) | SAFE |
| Any value in **runtime logs** | None — logs print event types/receipt numbers, never secrets (verified) | SAFE |

> **Bottom line:** every live/high-privilege secret that was pasted into chat should be treated as exposed and rotated before launch. No secret is exposed in source code or logs.

---

## SECTION 4 — SECRET ROTATION PLAN

**Goal:** rotate everything that should be rotated, with zero or near-zero production downtime. Order matters — rotate the secret, update Vercel env, redeploy (or let Vercel pick it up), then invalidate the old value.

| Credential | Risk if leaked | Rotation Required | Order | Downtime Risk |
|---|---|---|---|---|
| Supabase service_role key | Full DB compromise (read/write all donor PII) | Yes — before launch | 1 | Low (brief, on redeploy) |
| Admin access token | Unauthorized access to donor PII / exports | Yes — before launch | 2 | None (only affects admin login) |
| Resend API key | Spoofed email from your domain | Yes — before launch | 3 | Low (email pauses until redeploy) |
| Razorpay webhook secret | Forged webhook events | Yes — at launch with live keys | 4 | Low (set new secret in both Razorpay + Vercel together) |
| Razorpay test keys | Test environment only | Replaced by **live** keys at launch | 5 | n/a (test→live switch) |

### Exact rotation steps (recommended order)

1. **Supabase service key** — Supabase dashboard → Project Settings → API → "Reset service_role key" (or generate new) → copy → Vercel → Project → Settings → Environment Variables → update `SUPABASE_SERVICE_KEY` → Redeploy. *(~10 min; DB writes resume on new deploy.)*
2. **Admin token** — choose a new strong random string → update `ADMIN_ACCESS_TOKEN` in Vercel → Redeploy. Old `/admin` sessions invalidated. *(~5 min.)*
3. **Resend API key** — Resend dashboard → API Keys → create new → delete old → update `RESEND_API_KEY` in Vercel → Redeploy. *(~5 min; email send briefly unavailable until deploy completes.)*
4. **Razorpay (live switch + webhook secret)** — Razorpay dashboard → switch to Live → API Keys (generate live) → Webhooks (set endpoint `https://rkmfoundation.com/api/razorpay-webhook` + new secret) → update `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_WEBHOOK_SECRET` in Vercel → Redeploy. *(~15 min.)*

**Total time:** ~35–45 minutes. **Rollback plan:** Vercel keeps every prior deployment — if a new key breaks something, use **"Instant Rollback"** to the previous deployment (restores the prior env snapshot) while you fix the key. Keep the old secrets until the new deploy is confirmed healthy, then invalidate them.

---

## SECTION 5 — PRODUCTION ENVIRONMENT AUDIT

| Variable | Purpose | Required? | Currently set? | Production dependency | Sensitivity |
|---|---|---|---|---|---|
| `SUPABASE_URL` | DB endpoint | Yes (defaults to project URL in code) | Yes (evidenced by working writes) | All DB operations | Low |
| `SUPABASE_SERVICE_KEY` | Service-role DB auth | Yes | Yes (writes succeed) | All DB operations | **Critical** |
| `RAZORPAY_KEY_ID` | Gateway auth (server) | Yes | Yes (test) | Order/subscription creation | High |
| `RAZORPAY_KEY_SECRET` | Gateway auth (server) | Yes | Yes (test) | Order/subscription creation | **Critical** |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Checkout (client) | Yes | Yes (test) | Razorpay checkout widget | Public by design |
| `RAZORPAY_WEBHOOK_SECRET` | Webhook HMAC verify | Yes | Yes (signatures verify; bad sig → 401) | Payment capture pipeline | **Critical** |
| `RESEND_API_KEY` | Email send | Yes | **Yes** (form emails send in prod, no "(not configured)" log) | All outbound email | High |
| `FORMS_TO_EMAIL` | Admin notification recipient | No (defaults info@rkm.support) | Yes | Form admin notifications | Low |
| `FORMS_FROM_EMAIL` | Verified sender address | Recommended | Yes (website@rkm.support) | All outbound email | Low |
| `RECEIPTS_FROM_EMAIL` | Optional receipt sender override | No | Optional — falls back to FORMS_FROM_EMAIL | Receipt email "from" | Low |
| `DEFAULT_FUND_ID` | Fund for webhook-created donations | No | Optional — falls back to "General Fund" label | Subscription/webhook donations | Low |
| `ADMIN_ACCESS_TOKEN` | Admin gate | Yes | Yes (admin APIs return 401 without it) | `/admin` + admin APIs | High |

**Classification summary**
- **Missing (required, must confirm before launch):** none confirmed missing — all required vars evidenced as set in TEST configuration.
- **Optional / non-blocking:** `RECEIPTS_FROM_EMAIL`, `DEFAULT_FUND_ID`, `FORMS_TO_EMAIL` (have safe fallbacks).
- **Test-mode variables (must switch to live):** `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_WEBHOOK_SECRET`.
- **SSL:** auto-issued by Vercel for *.vercel.app; will auto-issue for rkmfoundation.com once DNS is cut over.

---

## SECTION 6 — AUTOMATION MATRIX

| Workflow | Trigger | Status | Tested | Evidence | Owner |
|---|---|---|---|---|---|
| Donation order creation | User clicks donate → `POST /api/donate` | Working | Yes | Live checkout opens; 2 `initiated` rows in DB | System |
| Webhook — payment capture | Razorpay `payment.captured` → `/api/razorpay-webhook` | Working | Partial | 2 `payment_event` rows; bad-sig returns 401 (verified) | System |
| Webhook idempotency | Duplicate event id | Working | Yes | UNIQUE(`provider_event_id`) constraint enforced; duplicate → early return | System |
| Failed payment handling | `payment.failed` → status `failed` | Working | Yes | 1 `failed` donation row; `/donation-failed` page renders | System |
| Subscription (monthly) | `createMonthlySubscription` + webhook | Working | Partial | 1 `subscription` row; completion needs live test | System |
| Receipt record + gapless number | `issueReceipt(donationId)` (idempotent) | Working | Yes | 3 receipts; `allocate_receipt_no` RPC; UNIQUE(`receipt_no`); 0 duplicates | System |
| Receipt PDF generation | `receiptPdfBytes()` (pdf-lib) | Working | Yes | Valid `%PDF-` file generated (sample produced) | System |
| Donation acknowledgement email | Webhook → `sendDonationReceipt` → `sendDonationEmails` (subject "Thank You for Helping an Animal Today") | **Built, unverified** | No | Code wired; Resend path proven via form emails; not yet confirmed in a real inbox | System |
| 80G receipt email (PDF attached) | Same path (subject "Your Donation Receipt – RKM Foundation") | **Built, unverified** | No | Code + PDF + attachment wired; needs one live test donation | System |
| Newsletter welcome email | `POST /api/forms` (newsletter) → `sendNewsletterWelcome` | Working | Partial | Same proven Resend path; component-verified | System |
| Contact acknowledgement | `/api/forms` (contact) → `sendFormAck` | Working | Yes | Live submit → `POST /api/forms 200`, no error log | System |
| CSR acknowledgement | `/api/forms` (csr) → `sendFormAck` | Working | Partial | Same code path as contact (proven) | System |
| Partner acknowledgement | `/api/forms` (partner) → `sendFormAck` | Working | Partial | Same code path (proven) | System |
| Careers acknowledgement | `/api/forms` (careers) → `sendFormAck` | Working | Partial | Same code path (proven) | System |
| Fundraiser acknowledgement | `/api/forms` (fundraiser-create) → `sendFormAck` | Working | Partial | Same code path (proven) | System |
| Admin form notification | `/api/forms` → `sendFormEmail` → FORMS_TO_EMAIL | Working | Yes | Live submit produced admin email, no error | System |
| Admin export | `/admin` (token-gated) | Working | Partial | Admin gate enforced (401 without token); export UI present | Founder |
| Audit trail generation | DB-side on ledger writes | Working | Yes | 33 `audit_trail` rows | System |

**Classification:** Working & verified — donations, webhook, idempotency, failed-payment, receipts, receipt PDF, contact ack, admin notification, audit trail. **Built but unverified end-to-end** — donation ack email, 80G receipt email (the one true gap, gated on a card payment). **Missing** — donor nurture series, monthly impact emails, annual Form 10BE auto-issue, WhatsApp/CRM automations (post-launch roadmap, not launch-critical).

---

## SECTION 7 — DATA & COMPLIANCE AUDIT

### Data integrity (queried 14 Jun 2026)

| Metric | Count | Verdict |
|---|---|---|
| Donations | 13 (10 paid, 2 initiated, 1 failed) | OK (test data) |
| Donors | 13 | OK |
| Receipts | 3 | OK |
| Payment events | 2 | OK |
| Subscriptions | 1 | OK |
| Audit trail rows | 33 | OK |
| Orphan donations (null donor) | **0** | Clean |
| Orphan receipts (no parent donation) | **0** | Clean |
| Duplicate receipt numbers | **0** | Clean (UNIQUE enforced) |
| Duplicate payment refs | **0** | Clean (UNIQUE enforced) |
| Paid donations without a receipt | 7 | **Expected** — historical test rows created before auto-receipt wiring; cleared on demo reset |

**Integrity is schema-enforced, not merely currently clean:** `payment_event.provider_event_id` is UNIQUE (idempotency), `receipt.receipt_no` is UNIQUE (no duplicate receipts), and every reference (donation→donor/fund/receipt/subscription, receipt→donation, payment_event→donation) is a foreign key (orphans impossible). The 7 paid-without-receipt rows are test artifacts, **not a defect** — going forward the webhook issues a receipt on every `payment.captured`.

### Compliance review

| Item | Value / Status | Evidence |
|---|---|---|
| Trust Registration | Reg. E-30560 | Consistent across site, receipt HTML, receipt PDF, email footer |
| 12A | 47522 | Shown on receipt PDF + legal pages |
| 80G | CITE80G9792014-152016-17 | Shown on receipt PDF, receipt email body, footer |
| CSR-1 | CSR00089305 | Legal/CSR pages |
| DARPAN | MH/2024/0457296 | Legal pages |
| PAN | AACTR4271L | Receipt PDF; two-stage donor PAN capture in flow |
| Receipt wording | "Provisional receipt; statutory Form 10BE certificate issued by 31 May following the financial year" | Verified verbatim in `receipt-pdf.ts` + receipt email |
| Donation records | Immutable ledger in Supabase | 13 rows; audit trail |
| Donor PAN masking | `maskPan()` applied on display | Verified in code |

**Compliance gaps:** none blocking. Operational follow-ups (post-launch): issue Form 10BD (statement) and 10BE (certificates) at year-end — currently a manual/roadmap task, correctly framed to donors as "by 31 May."

---

## SECTION 8 — FOUNDER ACTION LIST

### A. Must do BEFORE launch

| Task | Priority | Time | Blocking Launch? | Status |
|---|---|---|---|---|
| Add live Razorpay keys + live webhook secret to Vercel | P0 | 15 min | Yes | Pending |
| Run one test-card donation; confirm both emails + PDF arrive | P0 | 15 min | Yes | Pending |
| DNS cutover (A + CNAME) at registrar | P0 | 15 min + propagation | Yes | Pending |
| Rotate secrets shared in chat (Supabase, Resend, admin, webhook) | P0 | 35–45 min | Yes (security) | Pending |
| Verify Razorpay + registrar account access | P0 | 10 min | Yes | Pending |
| Reset demo/test data (say "go") | P1 | 5 min | Recommended | Pending |
| Approve final receipt format/wording with CA | P1 | — | Recommended | Pending |

### B. Recommended AFTER launch

| Task | Priority | Time | Blocking? | Status |
|---|---|---|---|---|
| Install analytics (e.g. privacy-friendly traffic analytics) | P2 | 30 min | No | Pending |
| Add error/uptime monitoring + alerting | P2 | 1 hr | No | Pending |
| Rate-limit / harden the admin token; remove "M4" interim note | P2 | 1 hr | No | Pending |
| Add real photography & impact content | P2 | — | No | Pending |
| Build donor nurture / monthly impact emails | P3 | — | No | Pending (roadmap) |
| Automate year-end Form 10BD/10BE issuance | P3 | — | No | Pending (roadmap) |

---

## SECTION 9 — ASSET REQUIREMENTS (still needed from founder)

**Photos**
- [ ] Tobler (founder's animal / hero subject)
- [ ] Family
- [ ] Shelter (facility, kennels, recovery areas)
- [ ] Team (staff, volunteers, vets)
- [ ] Rescue (in-action rescue shots)
- [ ] Feeding drives
- [ ] Before/after recovery pairs

**Documents**
- [ ] Latest impact report (numbers: animals helped, rescues, spend)
- [ ] Sample 80G receipt from the CA (to confirm the generated PDF matches their preferred format)
- [ ] CSR case studies (for corporate donors)
- [ ] Partner logos (NGOs / corporates / vets)

**Content**
- [ ] Stories (3–5 rescue narratives)
- [ ] Testimonials (donors, partners, beneficiaries)
- [ ] Updates (recent milestones for the homepage / newsletter)

> None of these block the technical launch, but the receipt-format confirmation and a current impact report are the highest-value items for donor trust.

---

## SECTION 10 — DISASTER RECOVERY

| Failure | Current behaviour | Business impact | Recovery process |
|---|---|---|---|
| **Razorpay fails / down** | `/api/donate` throws → 500 "Could not initiate payment". No order created, **no charge taken.** | Donor cannot donate during the outage; no money taken without a record. | Wait for Razorpay recovery; donor retries. Check Razorpay status page. No data cleanup needed. |
| **Resend fails / down** | Donation is **still recorded and the receipt is still generated** (DB). Email send throws → caught, logged `[webhook] donor email/receipt`; webhook still returns 200. | Donor's money + receipt are safe; donor misses the email until re-sent. | Re-send the receipt from admin once Resend recovers. Consider a retry queue post-launch. |
| **Supabase fails / down** | DB writes throw → `/api/donate` returns 500; **no order, no charge.** Webhook returns 500 → Razorpay retries later. | Donations pause cleanly; no orphaned charges. | Wait for Supabase recovery; Razorpay's webhook retries reconcile captured payments automatically. |
| **Webhook fails (5xx / transient)** | Webhook returns 500 → **Razorpay auto-retries** the event. Idempotency (UNIQUE constraint) prevents double-processing on retry. | Receipt/email may be delayed minutes; no duplication. | None required — self-healing by design. Monitor Vercel logs for repeated failures. |
| **DNS fails / misconfigured** | rkmfoundation.com won't resolve; site still reachable on *.vercel.app. | Public can't reach the branded domain; donations via the vercel.app URL still work. | Fix A/CNAME records at registrar; SSL re-issues automatically once DNS resolves. |
| **Vercel fails / down** | Entire site + APIs unavailable. | Full outage (donations, forms, admin). | Wait for Vercel recovery (check Vercel status). Code + env are preserved; instant redeploy/rollback available. No data loss (DB is on Supabase). |
| **Admin token leaks** | Anyone with the token can view donor data / exports via `/admin`. | Donor PII exposure risk. | **Immediately** rotate `ADMIN_ACCESS_TOKEN` in Vercel + redeploy (invalidates old token). Review access logs. |

**Architectural strength:** the webhook is the source of truth and money/receipt persistence is decoupled from email — so an email or transient outage never costs a donation record, and Razorpay's retry + DB idempotency make the capture path self-reconciling.

---

## SECTION 11 — FINAL FOUNDER DASHBOARD (master launch sheet)

| Area | Status | Owner | Next Action |
|---|---|---|---|
| Frontend / pages | Ready | System | None (add real photos post-launch) |
| Donation pipeline (code) | Ready | System | None — switch to live keys |
| Razorpay mode | **TEST** | Founder | Add live keys + live webhook secret |
| Donor receipt + ack emails | Built, unverified | Founder | Run one test-card donation; confirm inbox |
| Form acknowledgements | Working | System | None |
| Receipt numbering + PDF | Working | System | None |
| Database integrity | Clean (schema-enforced) | System | Demo reset on "go" |
| Compliance (12A/80G/CSR-1/PAN/wording) | Ready | System | CA confirms receipt format |
| Security — admin/webhook/secrets | Mostly ready | Founder | Rotate shared secrets; harden admin token |
| Domain / DNS | Not cut over | Founder | Point A + CNAME to Vercel |
| SSL | Auto (pending DNS) | System | Auto-issues after cutover |
| Analytics / monitoring | Not installed | Founder | Add post-launch |

### Final verdict

1. **GO / NO-GO:** **NO-GO today** for real donations. Engineering is sound; the blockers are operational.
2. **Exact launch blockers:** (a) Razorpay in TEST mode; (b) donor receipt + acknowledgement emails not yet verified end-to-end in a real inbox; (c) DNS not cut over.
3. **Exact founder tasks remaining:** add live Razorpay keys + webhook secret → run one test-card donation and confirm both emails + PDF → cut over DNS → rotate the secrets shared in chat → (on "go") reset demo data → confirm receipt format with CA.
4. **Estimated hours remaining until launch:** **~2–3 hours** of focused founder work (≈45 min secret rotation, ≈30 min live keys + webhook, ≈30 min test donation + verification, ≈15 min DNS + propagation wait, ≈15 min demo reset).
5. **Confidence score:** **88%.** High confidence the system is launch-ready once the operational steps are done. The remaining 12% is the single unverified link — the live card→webhook→inbox path — which only a real test donation can close, plus normal DNS-propagation and live-key first-run risk.

---

*Prepared as a read-only audit. Nothing in the project was built, changed, deployed, or reconfigured to produce this pack. All figures verified against the production database and codebase on 14 June 2026.*
