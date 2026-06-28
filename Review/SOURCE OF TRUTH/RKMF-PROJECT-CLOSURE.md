# RKM Foundation — Project Closure & Execution Handoff
### Final review against Master Build Workbook v2.1 · 24 June 2026

**Execution-readiness verification (re-run on v2.1):** every finding → executable action ✅ · owner/KPI/success-criteria/dependency on all 52 ✅ · audience/objective/copy/KPI on all 18 campaigns ✅ · 15/15 SOPs self-executing ✅ · all dependencies documented ✅ · wireframes can begin now ✅ · build can begin except Founder-Content-Pack-gated features ✅. **No gaps.**

---

## SECTION 1 — PROJECT CLOSURE CERTIFICATE
The **planning phase of RKM Foundation is officially CLOSED.** Strategy, design direction, signature concept, experience design, fundraising architecture, technical roadmap, benchmarking, backlog (52 issues), SOP library (15), campaign library (18), and decision log are complete and consolidated in Master Build Workbook v2.1, the permanent source of truth. No further audits, benchmarking, concepts, strategy, or backlog generation are authorised. The project now moves to execution.

## SECTION 2 — EXECUTION PRIORITIES (first 10 actions, start immediately)
1. Run `scripts/rkmf-cleanup-and-commit.sh` on the Mac (SOP-03) — lock in shipped code; purge junk.
2. `npm run build` + Vercel preview; smoke-test the donate flow (confirm monthly default + no CSP console errors).
3. Implement compliant cookie consent — reject=accept (SOP-01 / RKMF-004).
4. Deploy cookieless analytics + funnel; start the 28-day baseline (SOP-02 / RKMF-005).
5. Run the Founder interview to collect the Content Pack (SOP-09).
6. Rotate the exposed secrets — Supabase/Resend/admin/webhook (SOP-03 / RKMF-030).
7. Technical hardening on a branch, deploy-tested: self-host fonts, next/image, CSP nonce (SOP-12 / RKMF-021/022/023).
8. Add the donation-flow E2E to CI (SOP-13 / RKMF-024).
9. Begin wireframes from the Experience Design sheet — Homepage F0→F4 first.
10. Stand up the email-lifecycle skeleton ready for content (SOP-08 / RKMF-035).

## SECTION 3 — CONTENT COLLECTION PLAN (Founder Content Pack, in order)
Collect via SOP-09; founder approves all wording. Order = unblocks-the-most first:
1. **Real named animals + outcomes + photos** — powers Tobler's Ledger (the signature). Highest priority.
2. **3–5 rescue stories** (named, before/after, outcome).
3. **Impact numbers + dates** (rescued / treated / sterilised / vaccinated / fed / rehomed).
4. **Cost-per-outcome math** (₹X = one meal / treatment / month) — unblocks amount ladder, impact strips, email impact lines.
5. **Fund-allocation % + audited financials** (SOP-10) — unblocks transparency + "where money goes."
6. **Board / founder names + consent + photo.**
7. **Mission one-liner** (confirm canonical wording).
8. **CSR case studies.**
9. **Wishlist / supply list.**
10. **FCRA status** (legal) + confirmation of any **active campaign.**

## SECTION 4 — BUILD SEQUENCE (exact order)
1. **Wireframes (low-fi):** Homepage F0–F7 → Donate experience → Tobler's Ledger → mobile variants → first-time/returning/Guardian journey states. (No data needed.)
2. **Visual design:** apply art direction to wireframes — editorial serif + Inter, copper/ink/snow, "long-night→first-light" grade, documentary photo treatment.
3. **Frontend:** design system/tokens (self-host fonts here) → components → static/marketing pages → `next/image` migration.
4. **Donation flow:** on top of shipped monthly-default/fee-cover/analytics, add amount ladder + impact strip + UPI-first mobile + donor segmentation; complete non-happy states.
5. **Analytics:** consent → provider → funnel dashboards → record baseline.
6. **Testing:** donation E2E, Lighthouse-CI + axe gates (ratchet warn→error), manual WCAG 2.2 AA, real-device + field p75.
7. **Launch:** SOP-14 runbook — live keys, verified test donation, DNS cutover, secret rotation, demo reset, CA receipt sign-off; then award submission once Definition of Done is green.

## SECTION 5 — MANAGEMENT CADENCE
- **Daily (10-min standup):** what shipped, what's blocked, which FACT/DATA/BUILD-blocked item is waiting and on whom; update the Decision Log "actual result" column as outcomes land.
- **Weekly:** funnel report + drop-off per step; advance/close backlog items; re-rank the next 10 by ROI; chase the Content Pack; confirm CI gates green.
- **Milestone (per batch, pre-launch, pre-submission):** run the Launch Checklist (Sheet 14) and Award Submission Checklist (Sheet 15); verify §2b targets — CWV field p75, manual a11y, cross-browser/responsive, the 5-second test, and the 100-word jury pitch.

## SECTION 6 — REOPEN TRIGGERS (only conditions to resume planning)
1. A **new material fact** invalidates a finding (e.g., FCRA confirmed → international-giving channel must be designed).
2. **Real analytics data contradicts an assumption** (e.g., the funnel shows a different primary leak than predicted) → re-plan only that area.
3. A **strategic pivot** — new program, new region, or a change to the cause scope.
4. A **regulatory change** (DPDP, PCI-DSS, 80G/CSR, FCRA) requiring compliance rework.
5. A **post-launch KPI review** surfaces a structural gap not represented in the backlog.
Absent one of these, no planning work resumes.

---

**RKM_FOUNDATION_MASTER_BUILD_WORKBOOK_V2.1 is the permanent source of truth. Future work will be content collection, design, build, testing, launch, and KPI reviews.**

---

## SECTION 7 — EXECUTION STATUS (appended during execution, 28 June 2026)

### Done & LIVE on production (rkmfoundation.com)
- §2 actions 1, 2, 3, 7, 8, 9: cleanup/commit (SOP-03); build + deploy + donate smoke-test; cookie consent (SOP-01); technical hardening — self-host fonts, next/image, per-request nonce CSP (SOP-12); donation E2E in CI (SOP-13); homepage wireframes (F0–F7 + Donate + Ledger + journeys).
- SOP-02 analytics: consent-gated provider + funnel events live; 28-day baseline pending (needs Plausible account + time).
- Additional shipped: hero/CTA copy edits, one-line Rescue/Feed/Heal/Shelter row, real homepage photos (Feed/Heal/Shelter/Tobler), footer cleanup (simplified subscribe, one-line hours, de-cramp), WCAG 2.2 AA (0 contrast violations, build-failing axe gate), security headers, Next 14.2.35 security patch, error boundaries, ad-blocker donate resilience, README.

### Built, on branch (rkmf/safe-infra), NOT deployed
- §2 action 10 — email-lifecycle skeleton (SOP-08 / RKMF-035): `lib/email-lifecycle.ts`. Monthly-donor welcome, monthly impact update, second-gift nudge, lapsed win-back, 80G/Form-10BE note. Every founder-content field marked `[NEEDS DATA]`; `sendLifecycleEmail` refuses to send while any placeholder remains. Typecheck clean.

### Blocked / external — see BLOCKED.md
- Founder Content Pack (SOP-09); Razorpay (LIVE OUTAGE + 80G webhook + eMandate); Plausible account; secret rotation (RKMF-030).

### LIVE INCIDENT (28 Jun 2026)
- Razorpay payments failing across all surfaces ("Terminal not found" / "Razorpay – Server Error"; dashboard attribution 100% Others-related). Evidence indicates a Razorpay-side terminal issue. Support emailed. Details in `ops/RAZORPAY-INCIDENT-2026-06-28.md`.
