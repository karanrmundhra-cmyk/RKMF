# RKM Foundation — Master Issue Register & Audit Closure

**Single source of truth.** Consolidates every finding from the technical, security, SEO, accessibility, donation-conversion, fundraising, trust, storytelling, and analytics audits. Deduped, ROI-sorted, batched in 10s. Frozen 24 Jun 2026.

**Status legend:** `DONE` (edited, typecheck-clean) · `IN-PR` (done, awaiting the Mac commit script) · `OPEN` · `FACT-BLOCKED` (needs §0 data) · `BUILD-BLOCKED` (needs a build/deploy test) · `FOUNDER` (operational action).
**Impact:** Critical / High / Med / Low. **Effort:** S/M/L.

---

## BATCH 1 — Critical revenue, trust & compliance (highest ROI)

| ID | Category | Issue | Impact | Effort | Dependency | Status | Fix |
|---|---|---|---|---|---|---|---|
| RKMF-001 | Conversion | Frequency toggle defaulted to one-time | Critical | S | — | **DONE** | Default monthly (`DonateWidget.tsx`). |
| RKMF-002 | Conversion | No fee-cover option | High | S | — | **DONE** | ~2% opt-in; live recompute. |
| RKMF-003 | Analytics | No funnel instrumentation | Critical | M | — | **DONE** | `lib/analytics.ts` + events wired (consent-gated). |
| RKMF-004 | Compliance | CookieBanner cosmetic — no reject, gates nothing (DPDP §13) | Critical | M | — | **OPEN** | Granular consent (reject = accept); set `__rkmf_analyticsConsent` only on opt-in. |
| RKMF-005 | Analytics | No analytics provider deployed → no baseline | Critical | S | RKMF-004 | **OPEN** | Add Plausible/Fathom (cookieless); connect to `track()`. |
| RKMF-006 | SEO/Trust | schema.org tagged Indian trust as US `Nonprofit501c3` | High | S | — | **DONE** | Correct NGO + Indian IDs + DonateAction. |
| RKMF-007 | Security | CSP `unsafe-eval` in script-src | High | S | — | **DONE** (verify on preview) | Removed; smoke-test donate flow. |
| RKMF-008 | Hygiene | 357 junk files committed | High | S | — | **IN-PR** | `scripts/rkmf-cleanup-and-commit.sh` (run on Mac). |
| RKMF-009 | Emotion/Trust | No story/social proof at the ask | High | S | — | **DONE** | Tobler story + monthly-donor testimonial on donate page. |
| RKMF-010 | Trust | No "where your money goes" strip at the ask | High | S | Fund-allocation % (§0) | **FACT-BLOCKED** | Honest allocation strip beside widget. |

## BATCH 2 — Conversion + trust depth

| ID | Category | Issue | Impact | Effort | Dependency | Status | Fix |
|---|---|---|---|---|---|---|---|
| RKMF-011 | Conversion | Amount ladder: same tiers for monthly/one-time; no low entry | High | M | Real cost math (§0) | **FACT-BLOCKED** | 4-tier ladder; monthly lower absolutes + annual impact. |
| RKMF-012 | Trust | Zero impact numbers render on homepage | High | M | Real impact #s (§0) | **FACT-BLOCKED** | Proof-density stat band (rescued/treated/fed, dated). |
| RKMF-013 | Conversion | UPI/GPay shown as grey text, not primary on mobile | Med | M | — | **OPEN** | Lead with UPI above card on mobile. |
| RKMF-014 | Conversion | ₹1,000 floor vs peers' ₹500 entry | Med | S | Confirm cost math | **OPEN** | Lower floor to ₹500 w/ micro-impact line. |
| RKMF-015 | Conversion | No donor segmentation (first/return/lapsed) | High | M | RKMF-005 | **OPEN** | Returning → "give again / upgrade"; lapsed → win-back. |
| RKMF-016 | Trust | No annual report / audited financials / fund % surfaced | High | M | §0 docs | **FACT-BLOCKED** | Transparency section + downloads. |
| RKMF-017 | Trust | Founders/board anonymous | Med | S | §0 consent | **FACT-BLOCKED** | Named leadership + photo on /about. |
| RKMF-018 | Trust | No third-party validation (vets/press/ratings) | Med | M | §0 | **FACT-BLOCKED** | Partner logos + press strip. |
| RKMF-019 | Storytelling | One story, told once; no named rescue + before/after | High | M | Consented stories+photos (§0) | **FACT-BLOCKED** | 3–5 rescue narratives w/ outcomes. |
| RKMF-020 | Storytelling | No story on homepage | High | M | RKMF-019 | **OPEN** | Lead homepage with one animal (signature concept). |

## BATCH 3 — SEO, accessibility, performance, tech-debt

| ID | Category | Issue | Impact | Effort | Dependency | Status | Fix |
|---|---|---|---|---|---|---|---|
| RKMF-021 | Perf/Privacy | Fonts from Google CDN (IP leak + render-block) | High | M | Build test / font binaries | **BUILD-BLOCKED** | Self-host (60+ literal refs → vars, or `/public/fonts` + @font-face). |
| RKMF-022 | Perf | 0× `next/image`; 12 raw `<img>` (CLS, oversized) | High | M | Build test | **OPEN** | Migrate to `next/image` w/ dimensions + AVIF. |
| RKMF-023 | Security | CSP still has `script-src 'unsafe-inline'` | High | M | Deploy smoke test | **OPEN** | Per-request nonce via `middleware.ts`. |
| RKMF-024 | Quality | No donation-flow E2E | High | L | — | **OPEN** | Playwright incl. declined/idempotent/3DS. |
| RKMF-025 | A11y | No manual WCAG 2.2 AA pass (keyboard/SR/zoom/target-size/focus) | High | M | — | **OPEN** | Manual passes per §2b. |
| RKMF-026 | A11y/Motion | `prefers-reduced-motion` not verified across Lenis/GSAP | Med | M | — | **OPEN** | Audit motion layer; ensure off-switch. |
| RKMF-027 | Hygiene | `prototype` + `prototype-v2` dead routes shipping | Med | S | — | **OPEN** | Delete or `noindex` + remove from build. |
| RKMF-028 | Architecture | DB schema not version-controlled (no migrations) | High | M | — | **OPEN** | Commit SQL migrations as source of truth. |
| RKMF-029 | Security | Admin = single static shared token | Med | M | — | **OPEN** | Per-user auth (Supabase Auth). |
| RKMF-030 | Security | Live secrets pasted in chat (handover) | Critical | S | — | **FOUNDER** | Rotate Supabase/Resend/admin/webhook keys. |

## BATCH 4 — Major donor & CSR

| ID | Category | Issue | Impact | Effort | Dependency | Status | Fix |
|---|---|---|---|---|---|---|---|
| RKMF-031 | Major gifts | No major-donor journey (₹25k–₹1L) | High | M | Donor data (§0) | **OPEN** | High-touch ask + stewardship path. |
| RKMF-032 | CSR | CSR landing not audited for conversion | High | M | — | **OPEN** | Audit + rebuild /csr conversion flow. |
| RKMF-033 | CSR | No CSR case studies / outreach assets | Med | M | §0 case studies | **FACT-BLOCKED** | Build CSR proof + one-pager. |
| RKMF-034 | Major gifts | No top-20 donor analysis / journey | High | M | Donor data (analytics) | **OPEN** | Segment + define follow-up. |

## BATCH 5 — Email & WhatsApp lifecycle (not built)

| ID | Category | Issue | Impact | Effort | Dependency | Status | Fix |
|---|---|---|---|---|---|---|---|
| RKMF-035 | Retention | No new-donor nurture (thank-you→impact→monthly) | High | M | RKMF-005 | **OPEN** | Build lifecycle series. |
| RKMF-036 | Retention | No lapsed win-back | High | M | Donor data | **OPEN** | Win-back flow. |
| RKMF-037 | Retention | No monthly impact email | High | M | Real impact #s | **OPEN** | Recurring impact update. |
| RKMF-038 | Retention | No WhatsApp donor journeys (opt-in exists, unused) | Med | M | Provider | **OPEN** | Impact updates via WhatsApp opt-in. |

## BATCH 6 — Campaigns & recurring programs

| ID | Category | Issue | Impact | Effort | Dependency | Status | Fix |
|---|---|---|---|---|---|---|---|
| RKMF-039 | Fundraising | No campaign calendar (festival/emergency/seasonal) | High | M | — | **OPEN** | Annual calendar + templates. |
| RKMF-040 | Recurring | Generic monthly toggle, no program identity | High | L | Named animals (§0) | **OPEN** | Guardian / Sponsor-a-Rescue / Feed-a-Pack. |
| RKMF-041 | Funnel | No volunteer→donor→monthly path | Med | M | — | **OPEN** | Volunteer conversion journey. |
| RKMF-042 | Intl | FCRA status unconfirmed → international giving blocked | High | S | Legal (§0) | **FACT-BLOCKED** | Confirm FCRA before any foreign-donor claim. |
| RKMF-043 | i18n | Hindi storytelling = parallel hardcode (drift risk) | Med | M | — | **OPEN** | Shared content model for EN/HI. |

---

## AUDIT CLOSURE REPORT

**1. Closed (DONE / IN-PR):** RKMF-001, 002, 003, 006, 007, 008, 009 — monthly default, fee-cover, funnel instrumentation, schema fix, CSP `unsafe-eval`, junk purge (scripted), story+proof at ask. (Plus prior Batch-1 infra: CI, dep/secret scanning, .gitignore.)

**2. Open (actionable now, no blockers):** RKMF-004, 013, 015, 020, 022, 023, 024, 025, 026, 027, 028, 029, 032, 034, 035, 036, 038, 039, 041, 043.

**3. Fact-blocked (need §0 source data):** RKMF-010 (fund %), 011 (cost math), 012/037 (impact numbers), 016 (financials), 017 (board consent), 018 (validation), 019 (rescue stories+photos), 033 (CSR cases), 042 (FCRA legal).

**4. Assumption-blocked:** all revenue/lift figures in the fundraising audit — quantifiable only after RKMF-005 (analytics) produces a baseline. None published as fact.

**5. Implementation-blocked (need build/deploy test):** RKMF-021 (fonts), 022 (next/image), 023 (CSP nonce) — can't be verified in the current sandbox (no build/deploy; mount blocks deletes/commits).

**6. Intentionally deferred:** RKMF-030/secret rotation + RKMF-029/admin auth (founder/ops, post-launch per handover); Batches 4–6 (execution-phase, gated on analytics + content).

### Does any major category remain unaudited? — Honest answer: **mostly, but not entirely.**
Fully audited: architecture, security, compliance, performance (design-level), technical SEO, accessibility (heuristic), donation flow, fundraising/conversion, trust, storytelling, analytics design, recurring strategy.

**Genuine blind spots I have NOT fully audited (flagging per §10):**
- **Shop / e-commerce flow** (`/shop`) — its own conversion path, not reviewed.
- **Peer-to-peer fundraiser flow** (`/fundraiser`) — a real revenue channel, only glanced at.
- **Content/editorial SEO** (keyword targeting, blog strategy) — only *technical* SEO covered.
- **Real-device mobile UX + field performance** — unmeasurable without analytics/devices; design-level only.
- **Email deliverability & legal-copy accuracy** — relied on the handover, not independently audited.

So I would **not** claim "no major category remains unaudited." The *core donation-growth* categories are complete; the five above are the remaining audit surface, none likely to outweigh Batches 1–2 in ROI. Recommend logging them as RKMF-044…048 and moving into implementation mode tomorrow starting at the top of Batch 1 (RKMF-004, the cookie-consent fix — it's the highest-ROI *open* item and unblocks analytics go-live).
