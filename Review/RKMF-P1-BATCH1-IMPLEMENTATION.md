# RKMF — Safe-Infra Batch 1: Implementation Log

**Branch:** `rkmf/safe-infra` · **Date:** 24 Jun 2026 · **Verification:** `tsc --noEmit` passes (exit 0).

## Environment constraint (important)
The cloud-synced sandbox mount **allows creating/editing files but blocks deletes and `git commit`** (a stale `.git/index.lock` from 16 Jun couldn't be cleared). So: code edits were made directly; **file deletion + the commit must run on your Mac** via `scripts/rkmf-cleanup-and-commit.sh`. Nothing was deleted or committed from the sandbox; your WIP is untouched.

---

## DONE (edited, typecheck-clean)

| Item | File | Change |
|---|---|---|
| **Schema.org corrected** | `app/layout.tsx` | Removed the false `Nonprofit501c3` (US status on an Indian trust). Now `@type:["NGO","Organization"]` with real statutory identifiers (Trust E-30560, 12A 47522, 80G, CSR-1, DARPAN) + a `DonateAction`. §9/§15. |
| **CSP: dropped `unsafe-eval`** | `next.config.mjs` | Removed `'unsafe-eval'` from `script-src` (not needed by prod Next/GSAP/Framer/Lenis). §13. ⚠ Verify on a preview deploy. |
| **CI quality gates** | `.github/workflows/ci.yml` | Typecheck + lint + build, then Lighthouse-CI (perf/a11y/SEO + CLS + image/byte budgets). §12. |
| **Secret + dep scanning** | `.github/workflows/security.yml`, `.github/dependabot.yml` | gitleaks (build-failing on a hit) + `npm audit` + weekly Dependabot. §12/§13. |
| **Lighthouse budgets** | `lighthouserc.json` | CLS ≤ 0.1 (error), SEO ≥ 0.95 (error); perf/a11y as **warn** initially (ratchet to error once Batch-2 perf fixes land — see note). |
| **.gitignore guards** | `.gitignore` | Blocks `.fuse_hidden*`, `*.bak`, `.DS_Store`, `untitled folder/` so the 357-file mess can't recur. |
| **Junk purge (scripted)** | `scripts/rkmf-cleanup-and-commit.sh` | Deletes the 357 committed junk files + clears the lock + commits. **Run on your Mac.** |

---

## DEFERRED to Batch 2 (need a build/deploy test — not safe to ship blind)

1. **Self-host fonts.** A `next/font` swap hashes the family name, but **60+ files hardcode literal `"Inter"` / `"Noto Sans Devanagari"`** (and `tailwind.config` references literal `Inter`). Shipping it blind would regress typography sitewide and on every `/hi` page. Correct path: add the two woff2 files to `/public/fonts` + `@font-face` (preserves the literal names — needs the font binaries), **or** migrate all refs to CSS variables with a green build. Until then the Google Fonts CDN stays (privacy/perf debt remains open).
2. **Strict CSP nonce.** Remove `script-src 'unsafe-inline'` via per-request nonce in `middleware.ts` + nonce on the JSON-LD. Must be smoke-tested against the live Razorpay checkout before merge.
3. **`next/image` migration** (12 raw `<img>`). Touches rendering — needs visual diff + LCP/CLS check.
4. **Donation-flow E2E + analytics funnel** (Playwright + privacy-first analytics). The big conversion-measurement unlock; sized as its own batch.

---

## What you do now
1. On your Mac, from the repo root: `bash scripts/rkmf-cleanup-and-commit.sh`
2. `npm run build` locally (sanity), then push → open the Vercel **preview**.
3. On the preview: complete a test donation and watch DevTools console for any CSP error (confirms the `unsafe-eval` removal is safe). If Razorpay throws a CSP violation, re-add `'unsafe-eval'` and tell me — but it should be clean.
4. Then say the word and I'll start Batch 2 (fonts → next/image → CSP nonce → E2E/analytics), or pivot to the **homepage signature concept** (your stated first design priority) once you send the Set A facts.

## Note on the warn→error ratchet
CI perf/a11y gates ship as **warnings** because I can't measure the current site here; turning them to build-failing before the site meets them would block every PR. Flip them to `error` in `lighthouserc.json` once Batch-2 perf/a11y work passes — that satisfies §2b's "regressions fail the build."
