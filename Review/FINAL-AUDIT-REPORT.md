# RKM Foundation — Audit & Implementation: Final Report

**Date:** 2026-06-16 · **Site:** rkmfoundation.com (Next.js 14, Vercel) · **Reconciled HEAD:** `632def9` (local = origin/main = production)

## 1. Completed changes (implemented, typecheck-verified, reversible)
All edits are in the working tree, `npx tsc --noEmit` clean. Full evidence + rollback in `CHANGELOG-AUDIT.md`.

**Security hardening**
1. **H1** — Escaped form data in staff notification emails (`lib/email.ts`) → stops HTML/script injection into the ops inbox.
2. **H3** — Removed plaintext PII from form logs (`lib/email.ts`).
3. **L1** — Constant-time admin-token comparison (`lib/adminAuth.ts`, `node:crypto`).
4. **L3** — CSV formula-injection guard on admin exports (`lib/csv.ts`).
5. **L2** — DB layer no longer leaks PostgREST error bodies in thrown messages (`lib/db.ts`).

**SEO / Accessibility / Localization**
6. **H10** — Home page now sets canonical `/` + hreflang (en/hi/x-default) (`app/page.tsx`).
7. **H9 / A11Y-1** — `<html lang>` now switches to `hi` on the `/hi` subtree via `components/LangSync.tsx` (WCAG 3.1.1).
8. **M5** — `noindex` added to EN utility pages: `/thank-you`, `/newsletter-confirmed`, `/unsubscribe`.
9. **H8 / M2** — canonical + hreflang (en/hi/x-default) added to 6 key pages: home, `/about`, `/donate-now`, `/contact`, `/faqs`, `/blog/the-dog-who-started-it-all`.
10. **M3** — `FAQPage` JSON-LD on `/faqs` and `BlogPosting` JSON-LD on the blog article.

**Total: 13 fixes shipped to the working tree, all typecheck-clean and reversible.**

**Resolved by reconciliation (were stale-local audit artifacts; correct on production):**
- **M11** Hindi link 404 → 200 live · **M12** Hindi legal pages exist live · **H10 `/hi`** serves Hindi metadata · **M10 Footer** already links `/hi/legal` · `/hi/thank-you` already noindexed.

## 2. Remaining gated items (need your explicit approval — your 5 categories)
- **Payments:** C1 (donations can be lost if webhook misconfigured — add fallback persistence + amount reconciliation in `/api/donate/verify`), C2 (unauthenticated PAN/address write in `/api/compliance`), H2/H3-webhook (reconcile captured amount), H5 (success shown as "failed" on verify hiccup), M13 (pre-payment email validation), M14 (demo-mode outage alert), H4 (persist PAN captured at donate).
- **Analytics / consent (legal):** H12 (no analytics at all — add GA4/Vercel Analytics + funnel events + consent).
- **Legal content:** Hindi 80G/disclaimer copy decisions.
- **New infra / install:** M1 (Upstash for durable, IP-trustworthy rate limiting).

## 3. Remaining risks
- **Highest:** C1 + C2 remain open — a misconfigured webhook can silently lose a donation/receipt, and the compliance endpoint accepts unauthenticated PAN writes. These are the most material risks on the site and are payment/data-gated, so they await your go-ahead.
- **Deploy not performed:** changes are uncommitted. `main` auto-deploys to production, and push needs credentials not available in this environment, so commit/deploy is yours to run (a Vercel preview from a branch is the safe path).
- **Concurrent editing:** another session was committing during this work; reconcile these edits with theirs before committing to avoid OneDrive conflict copies.
- **Could not auto-delete junk/dead code:** the sandbox lacks delete permission on the OneDrive folder. 357 `.fuse_hidden*` files, `components/prototype/`, `public/prototype/` (~1.4 MB), and `_genreceipt.cjs` should be removed locally (`git clean`/`rm`) — see M8/M9.

## 4. Final scorecard (audit-assessed at `632def9`; not Lighthouse-measured)
| Area | Now | After deploying completed fixes |
|---|---|---|
| Security | 78 | **84** |
| Performance | 72 | 72 (next/image + next/font still pending) |
| SEO | 76 | **84** |
| Accessibility | 80 | **85** |
| UX | 85 | 85 |
| UI | 88 | 88 |
| Technical quality | 80 | 82 (full once junk/dead code deleted) |

Production is currently **healthy**: zero console/network errors, all assets 200/304, single H1s, fully reconciled with the repo.

## 5. Recommended next actions (priority order)
1. **Commit the completed fixes** on a branch → Vercel preview → verify → merge to production.
2. **Approve a payments hardening batch** (C1 + H5 + C2) — the highest-value, highest-risk work.
3. **Decide analytics** (H12) — you cannot measure the donation funnel without it.
4. **Delete junk/dead code locally** (M8/M9) — quick, frees ~1.4 MB.
5. **Mechanical SEO sweep** (remaining ~18 EN + 24 HI pages): same one-line `alternates` block as the 6 already done; plus per-page OG for blog/donate. (JSON-LD FAQ/Article already shipped.)
6. **Performance**: migrate to `next/image` + `next/font`, compress oversized assets (872 KB SVG, photo-as-PNG) — best verified with a preview deploy + Lighthouse.
