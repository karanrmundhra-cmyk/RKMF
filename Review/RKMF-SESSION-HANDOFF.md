# RKM Foundation — Execution Handoff
### Status as of 26 June 2026 · branch `rkmf/safe-infra` · production: rkmfoundation.com

---

## 1. What is LIVE on production now (verified)

Promoted to `rkmfoundation.com` via `vercel --prod` (commit `cf8c40f`) and verified in the live DOM/logs:

| Area | What shipped | Proof |
|---|---|---|
| **Consent (SOP-01)** | Cookie banner: Reject = Accept, analytics off by default, "Manage cookies" reopen | Banner shows both buttons; `__rkmf_analyticsConsent` undefined + 0 Plausible requests pre-consent |
| **Analytics (SOP-02)** | Consent-gated Plausible loader + 7 funnel events wired | Loads only after Accept; needs Plausible account + 28-day baseline (you) |
| **Self-host fonts (7a)** | @fontsource Inter + Noto Sans Devanagari; Google Fonts CDN removed | **0** googleapis/gstatic requests on prod (EN + /hi) |
| **next/image (7b)** | Static images → next/image (AVIF/WebP, srcset, dims) | 15/15 optimized on /about; CSR/avatars/logos converted |
| **Nonce CSP (7c)** | Per-request nonce via middleware; dropped `script-src 'unsafe-inline'` | JSON-LD nonced + 5 Next scripts nonced on prod; page hydrates |
| **Security headers** | HSTS **preload**, COOP, X-DNS-Prefetch-Control, broader Permissions-Policy | next.config (build-verified) |
| **Error resilience** | `error.tsx` + `global-error.tsx` (no white-screen crashes) | builds; renders on thrown error |
| **Next.js security** | 14.2.21 → **14.2.35** (fixes middleware auth-bypass + image/cache CVEs) | npm audit critical → high |
| **Donate resilience** | 12s checkout.js timeout + ad-blocker message + UPI/contact fallback | E2E "blocked checkout" test passes |
| **CSR image** | "My Animals" pillar now the branded elephant (`my-animals.jpeg`) | live DOM shows `.jpeg`, dog photo gone |
| **A11y** | axe WCAG 2.2 AA gate (7 pages, 0 structural issues); footer tap targets ≥24px; skip-link first; visible focus | live DOM checks + CI gate |
| **Testing/CI** | Playwright donation E2E (incl. blocked-checkout) + axe a11y, build-failing in CI | 17 tests green |

---

## 2. ⚠️ Donations & the 80G receipt — ACTION NEEDED (config, not code)

A real production payment (`pay_T6HAMtHfQgH5vB`) **captured and verified successfully** — but **no 80G receipt was sent**, because the Razorpay **webhook never fired**. The receipt/email is issued *only* by `POST /api/razorpay-webhook` (the compliance "source of truth"); it was not called, and the webhook secret wasn't even configured.

**Also note:** the donate button can appear broken **in your own browser** because a Chrome **extension** (`oihbmmeelledioenpfcfehdjhdnlfibj`) blocks Razorpay. It works in **Incognito**.

### To make 80G receipts work:
1. **Razorpay Dashboard → Settings → Webhooks → Add:**
   - URL: `https://rkmfoundation.com/api/razorpay-webhook`
   - Events: `payment.captured`, `payment.failed`, `subscription.charged`
   - Set a secret.
2. **Vercel → rkm-foundation → Settings → Env (Production):**
   - `RAZORPAY_WEBHOOK_SECRET` = the same secret
   - Confirm set: `SUPABASE_SERVICE_KEY`, `RESEND_API_KEY`, `FORMS_FROM_EMAIL`, `DEFAULT_FUND_ID`
   - Redeploy.
3. **Recover the existing receipt:** in Razorpay, open `pay_T6HAMtHfQgH5vB` → **resend** the `payment.captured` event → receipt issues + emails automatically.

(Then a 1-min Incognito test donation + I can verify the full chain from the logs.)

---

## 3. Other items that need YOU

- **Founder Content Pack (SOP-09)** — the big unlock. Real named animals + photos + outcomes, impact numbers, cost-per-outcome math, fund-allocation %, board names, any live campaign. Blocks: Tobler's Ledger (signature concept), Batches 2/4/5/6, and the visual-design layer.
- **Secret rotation (SOP-03 / RKMF-030)** — Supabase / Resend / admin / Razorpay webhook keys.
- **Color-contrast decision** — faint editorial labels (`text-ink/45`, copper eyebrows) sit just under WCAG AA. Darken slightly to pass, or keep the look? (Only open a11y item.)
- **Plausible account** — create it + let the 28-day field baseline accrue (SOP-02).
- **Next.js 16 upgrade** — clears the residual audit "high" advisories (a planned breaking migration).
- **Merge `rkmf/safe-infra` → `main`** — GitHub `main` is still behind production. Say the word and I'll sync it.

---

## 4. Where the workbook stands

Closed: **Batch 1** (critical compliance/trust/measurement) + **Batch 3** (technical hardening) — the engineering/compliance foundation. Open and **mostly content-gated**: Batch 2 (amount ladder, named stories, segmentation), Batch 4 (CSR/major-donor + case studies), Batch 5 (retention/email/WhatsApp), Batch 6 (Guardian/legacy/tribute/P2P), the **design track** (wireframes → visual design — homepage wireframes drafted in `RKMF-WIREFRAMES-Homepage.html`), the **signature concept**, and the **18 campaigns**.

**Bottom line:** the technical foundation is live, secure, tested, and accessible. The remaining value is gated on the **Founder Content Pack** and a few **config/credential** steps only you can do — chiefly the **Razorpay webhook** so 80G receipts send.
