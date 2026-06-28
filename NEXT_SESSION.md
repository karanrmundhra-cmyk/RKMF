# NEXT_SESSION — zero-context handover (RKM Foundation website)

_Frozen 28 June 2026. Read this, then the canonical docs below. `BLOCKED.md` is the single blocker list — this file references it, never duplicates it._

## Status
The RKM Foundation site (Next.js 14.2.35 App Router, TypeScript, Tailwind, Vercel) is engineering-complete for everything that does not require founder content or external credentials. Production reflects the live homepage copy/image/wordiness work. The footer cleanup, the email-lifecycle skeleton, and the close-out quality pass are committed on the preview branch but **not deployed**. All remaining work is content- or credential-gated. One live incident is open: Razorpay donations are failing across all surfaces (a Razorpay-side terminal issue), so the site currently cannot take donations.

## Branch & latest commit
- Working branch: `rkmf/safe-infra` — HEAD `592f773` (pushed; preview only).
- Quality-pass sign-off commit: `ec67da7`.

## Production & deployment
- Production branch: `origin/main` = `9cbfb9b` → rkmfoundation.com (Vercel).
- The preview branch is ahead of production and has **not** been merged. Do not deploy without explicit approval.

## Outstanding blockers
See **`BLOCKED.md`** (canonical). One-line summary: **P0** Razorpay outage; **P1** credentials (80G webhook + secret, eMandate, Plausible, secret rotation, `RESEND_API_KEY`); **P1** Founder Content Pack (items 7–16).

## First task once the Founder Content Pack is available
Fill the 13 `[NEEDS DATA]` fields in `lib/email-lifecycle.ts`, **starting with the cost-per-outcome math** (₹X = one meal / one treatment / one month) — it unblocks the donation amount-ladder, the impact strips, and every lifecycle email. Then run `npx tsc --noEmit && npm run lint && npm run build`.

## First task once Razorpay confirms the terminal is restored
Make one real end-to-end test donation on rkmfoundation.com (one-time, smallest amount) and confirm the full chain: payment captures → webhook fires → numbered 80G receipt emails → thank-you page renders. If the receipt does not arrive, the webhook + `RAZORPAY_WEBHOOK_SECRET` are not yet configured (`BLOCKED.md` P1 #2). Incident detail: `ops/RAZORPAY-INCIDENT-2026-06-28.md`.

## Credentials / access required before work can continue
- GitHub push access (branch `rkmf/safe-infra`) and Vercel project access (env vars + deploys).
- Razorpay dashboard (terminal status, webhooks, eMandate).
- Vercel env values: `RAZORPAY_WEBHOOK_SECRET`, `RESEND_API_KEY`, `SUPABASE_SERVICE_KEY`, `DEFAULT_FUND_ID` — and rotate the previously-exposed secrets (`BLOCKED.md` P1 #5). Full list in `.env.example`.
- Optional: a Plausible account for the analytics baseline.

## Read these first (in order)
1. `PROJECT_STATUS.md` (repo root) — full handover + verification evidence.
2. `BLOCKED.md` (repo root) — canonical blocker list + exact unblock inputs.
3. `Review/RKMF-PROJECT-CLOSURE.md` — project closure + §7 execution status.
4. `Review/RKM_FOUNDATION_MASTER_BUILD_WORKBOOK_V2.1.xlsx` — master build workbook (SOPs / backlog).
5. `Review/RKMF-EXPERIENCE-DESIGN.md` — experience & design rationale + signature concept.
