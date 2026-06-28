# RKM Foundation — §4 Repository Reconstruction

**Method:** Code inspection only (no live site, no assumptions about runtime). Generated 24 Jun 2026.
**Verdict:** A complete, shipped, pre-launch bilingual Next.js app with a genuinely solid donation/compliance backend. The gaps are in **frontend craft, perf/privacy hygiene, testing/CI, and repo cleanliness** — not in core architecture.

---

## 1. Stack & dependencies

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 14.2.21** (App Router, RSC) | Pinned; one minor behind risk surface. |
| UI | React 18.3, **Tailwind 3.4** | Single font (Inter), copper/ink/snow tokens. |
| Motion | **framer-motion 12 + gsap 3 + lenis 1.3** | Three animation libs — heavy; bundle/INP review needed. |
| Payments | **Razorpay** (REST, no SDK) | Orders + on-the-fly monthly plans/subscriptions. |
| Data | **Supabase Postgres** via REST (service key) | No SQL migrations in repo — schema lives only in Supabase. |
| Email | **Resend** (`resend` SDK) | Domain rkm.support; transactional only. |
| Receipts | **pdf-lib** + standalone A5 HTML | SHA-256 hashed, stored in private `receipts` bucket. |
| Hosting | **Vercel** (serverless API routes) | Redirects + security headers in `next.config.mjs`. |

**No** state library, **no** CMS, **no** test runner, **no** CI, **no** analytics, **no** error monitoring.

---

## 2. Route map

**67 page routes**, fully mirrored EN (root) + Hindi (`/hi`). Groups:

- **Core:** `/`, `/about`, `/donate-now`, `/contact`, `/faqs`, `/media`, `/csr`, `/partner-with-us`, `/careers`, `/blog` (+ `the-dog-who-started-it-all`).
- **Donation outcomes:** `/thank-you`, `/donation-failed`, `/newsletter-confirmed`, `/unsubscribe`.
- **Fundraiser flow:** `/fundraiser` → `/create` → `/ready` → `/success` → `/thank-you`.
- **Shop:** `/shop` → `/thank-you`, `/order-failed`.
- **Other ways to give:** `/other-ways-to-give`.
- **Legal suite (6):** privacy, terms, 80G-tax-disclaimer, donation-refund, shop-refund, website-disclaimer-cookie.
- **Admin (token-gated):** `/admin`, `/admin/search`, `/admin/donor/[id]`.
- **Dead/experimental (ship in tree):** `/prototype`, `/prototype-v2` — **flag for deletion or noindex**.

**Content model:** no CMS. Global constants in `lib/content.ts` (`SITE`, `DOWNLOADS`, nav). All page copy is **hardcoded in TSX** — including the Hindi translations as parallel components (`HomeExperience.tsx` / `HomeHi.tsx`). Implication: every content edit is a code deploy; translation drift risk between EN and `/hi`.

---

## 3. API surface (13 routes)

| Route | Job |
|---|---|
| `POST /api/donate` | Rate-limited; validates ₹1,000–₹1,00,00,000; upserts donor; creates Razorpay order (one-time) or subscription (monthly); inserts `initiated` donation row. Returns `{demo:true}` if keys absent. |
| `POST /api/donate/verify` | Verifies client signature. **Contains a `TODO` and does NOT persist** — intentionally; webhook is source of truth. |
| `POST /api/razorpay-webhook` | **Source of truth.** HMAC-verified; idempotent (`payment_event.provider_event_id`); on `payment.captured` flips donation to paid (or creates from subscription charge), then fires receipt+ack email (email failure never breaks webhook). Handles `payment.failed`. Returns 500 → Razorpay retries. |
| `POST /api/forms` | Contact/CSR/partner/careers/newsletter/fundraiser acks via Resend. |
| `POST /api/compliance` | Stage-2 PAN/address capture → completes donor compliance, propagates to paid donations. |
| `/api/admin/*` (8) | Token-gated: donor lookup, donors list, stats, receipt issue, exports (register, 10BD, PAN-pending, exceptions). |

---

## 4. Data model (reconstructed from code — no migrations in repo)

Tables referenced: **`donor`, `donation`, `payment_event`, `compliance_event`, `receipt`, `fund`, `audit_trail`**. RPC: **`allocate_receipt_no(fy)`** (advisory-locked gapless sequence).

- **Integrity is schema-enforced:** `payment_event.provider_event_id` UNIQUE (idempotency), `receipt.receipt_no` UNIQUE, FKs throughout (donation→donor/fund/receipt). Donor PAN masked on display (`maskPan`). Indian-FY logic + amount-in-words (lakh/crore) in `receipt.ts`.
- **⚠ Gap:** the DB schema is **not version-controlled** (no SQL/migrations in the repo). The codebase is therefore *not* a complete source of truth for the data layer — a §4 risk and a disaster-recovery weakness.

---

## 5. Security posture

| Good | Concern |
|---|---|
| Webhook HMAC + `timingSafeEqual`; idempotency | **CSP uses `'unsafe-inline'` + `'unsafe-eval'`** (§13 violation) |
| Admin: hashed constant-time token compare + per-IP throttle | Admin token is a **single static shared secret** (no per-user auth) |
| Secrets server-side only; none hardcoded (verified) | **Multiple live secrets were pasted in chat** → must rotate (per handover) |
| Per-IP rate limiting on donate + admin | Throttle is **in-memory per serverless instance** — not global (bypassable at scale; needs Upstash) |
| HSTS, nosniff, Referrer-Policy, Permissions-Policy set | Google Fonts CDN leaks visitor IP (DPDP/GDPR) |
| Input validation + HTML escaping (`guard.ts`) | **CookieBanner exists but gates nothing** — no analytics actually loads, so consent UX is decorative |

---

## 6. Performance posture

- **Fonts:** Inter + Noto Sans Devanagari from **Google CDN via render-blocking `<link>`** (not `next/font`) → FOIT/CLS + privacy leak (§14 violation).
- **Images:** **0× `next/image`, 12× raw `<img>`** → no AVIF/WebP, no `srcset`, no dimensions → CLS + oversized mobile transfer (§14 violation).
- **Motion:** 3 animation libraries; `prefers-reduced-motion` referenced 36× (good signal, needs verification across Lenis/GSAP).
- No performance budgets, no Lighthouse-CI.

---

## 7. Testing / CI / observability

- **Zero** tests, **zero** `.github/workflows`, **zero** Lighthouse-CI/axe, **zero** dependency/secret scanning. Entire §12 quality-gate requirement is unmet.
- **No analytics, no monitoring** → no donation-funnel baseline exists; §2b/§12 conversion targets currently unmeasurable.

---

## 8. Repo hygiene

- **357 committed junk files** (`.fuse_hidden*`, `.bak`, `.DS_Store`, `untitled folder`) across `app/` and `components/` — including duplicate source copies. Pollutes audits and risks shipping stale content.
- ~40 standalone audit/preview `.md`/`.html` artifacts in repo root (this project's prior work) — harmless but noisy.

---

## What I could NOT verify from code

- Live Core Web Vitals / field data (no analytics; needs lab + CrUX run).
- The actual Supabase schema/constraints (inferred from REST calls; no migrations to confirm).
- Whether the ₹2,500/₹5,000/₹10,000 impact tiers reflect **real cost math** (§0 fact gap).
- Real photography rights / whether current images are placeholders.
- Production env var values (correctly server-side).

---

## Bottom line

Backend & compliance: **strong** (8–9/10). Frontend craft, privacy/perf hygiene, testing/CI, and repo cleanliness: **weak** and the main lever for both award-credibility (§1) and trust (§9). Nothing here needs a rebuild — it needs hardening, instrumentation, real content, and a signature design concept.
