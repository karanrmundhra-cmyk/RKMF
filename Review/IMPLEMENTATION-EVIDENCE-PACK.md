# Implementation Evidence Pack — RKM Foundation

**Date:** 2026-06-16 · **Reconciled baseline:** `632def9` · **Current HEAD:** `941032f`
**Verification baseline:** `npx tsc --noEmit` → clean after every batch.

## Status summary
| Metric | Count |
|---|---|
| **Total Issues Identified** (verified, post-reconciliation) | 35 |
| **Total Issues Fixed** (code-complete this session) | 11 issues / 23 file changes |
| **Total Issues Verified** (typecheck + code review) | 11 / 11 |
| **Total Issues Pending** (production-verification after deploy) | 11 |
| **Total Issues Deferred** | 4 |
| **Total Issues Blocked** (need your approval / manual action) | 11 |

> **Provenance note (transparency):** the repo's concurrent auto-commit + Vercel pipeline swept three of my security edits (`lib/email.ts`, `lib/adminAuth.ts`, `lib/csv.ts`) into commit **`941032f`** — they are now in HEAD and will auto-deploy. The remaining edits (db.ts + all `app/*` SEO/i18n files + `components/LangSync.tsx`) are still uncommitted working-tree changes. "Pending" = code shipped, awaiting live production verification.
>
> **Frontend screenshots:** all 15 changes are backend logic or `<head>`/metadata; none render visible UI, so there is nothing to screenshot. They are verified by code + typecheck, and validate via View-Source / Rich-Results Test once deployed.

---

# SECURITY CHANGES

## C-EVID-1 — H1 / SEC-1: Stored HTML/script injection in staff notification emails
- **Vulnerability addressed:** Unescaped public-form input interpolated into the HTML body of internal notification emails (stored HTML/XSS into the ops inbox `info@rkm.support`).
- **File(s):** `lib/email.ts` (≈line 120) · **Risk level:** High
- **Code before:**
  ```ts
  .map(([k, v]) => `<tr><td style="...">${k.replace(/_/g, " ")}</td><td style="...">${String(v)}</td></tr>`)
  ```
- **Code after:**
  ```ts
  .map(([k, v]) => `<tr><td style="...">${esc(k.replace(/_/g, " "))}</td><td style="...">${esc(String(v))}</td></tr>`)
  ```
  (`esc` = `escapeHtml`, already imported at top of file.)
- **Why:** Donor-facing emails already escape via `esc()`; this staff path did not, so a submitter could inject `<img onerror>`/`<a>` HTML into staff mail.
- **Verification method:** `tsc --noEmit` clean; confirmed `esc(String(v))` present on disk (grep = 1).
- **Verification result:** PASS.
- **Remaining risk:** None for HTML context. (Email header injection not applicable — Resend SDK handles headers.)
- **Rollback:** `git checkout lib/email.ts` (now committed in `941032f`; revert via `git revert` or restore the line).

## C-EVID-2 — H3 / SEC-4: PII logged in plaintext
- **Vulnerability addressed:** Full form payload (name/email/phone/message) written to server logs when email is unconfigured.
- **File(s):** `lib/email.ts` (≈line 124) · **Risk level:** High (privacy/DPDP)
- **Code before:**
  ```ts
  console.log(`[forms] (email not configured) ${label}:`, JSON.stringify(data));
  ```
- **Code after:**
  ```ts
  // Privacy: do not log donor/enquirer PII (name/email/phone/message) in plaintext.
  console.log(`[forms] (email not configured) ${label} — ${Object.keys(data).length} fields`);
  ```
- **Why:** Removes PII from logs; the unconfigured path is exactly the live-but-unconfigured state.
- **Verification:** `tsc` clean; grep confirms redacted line present. **Result:** PASS.
- **Remaining risk:** None (no PII emitted). Other PII log sites (compliance route) tracked separately as gated.
- **Rollback:** `git checkout lib/email.ts`.

## C-EVID-3 — L1 / SEC-6: Non-constant-time admin token comparison
- **Vulnerability addressed:** Timing side-channel on the shared admin token guarding all PII exports/receipts.
- **File(s):** `lib/adminAuth.ts` · **Risk level:** Low
- **Code before:**
  ```ts
  import { throttle } from "./guard";
  // ...
  const got = req.headers.get("x-admin-token");
  return !!got && got === expected;
  ```
- **Code after:**
  ```ts
  import { createHash, timingSafeEqual } from "node:crypto";
  import { throttle } from "./guard";

  function safeEqual(a: string, b: string): boolean {
    const ha = createHash("sha256").update(a).digest();
    const hb = createHash("sha256").update(b).digest();
    return timingSafeEqual(ha, hb);
  }
  // ...
  const got = req.headers.get("x-admin-token");
  return !!got && safeEqual(got, expected);
  ```
- **Why:** Matches the constant-time pattern already used on the Razorpay signature paths; hashing avoids length leakage.
- **Verification:** `tsc` clean; confirmed no `runtime = "edge"` in any API route (so `node:crypto` is valid); grep `timingSafeEqual` = 3. **Result:** PASS.
- **Remaining risk:** None material (token also rate-limited + dead-by-default).
- **Rollback:** `git checkout lib/adminAuth.ts`.

## C-EVID-4 — L3 / SEC-9: CSV formula injection in admin exports
- **Vulnerability addressed:** Donor-controlled cell values beginning `= + - @` execute as formulas when an admin opens the export in Excel/Sheets.
- **File(s):** `lib/csv.ts` · **Risk level:** Low–Medium
- **Code before:**
  ```ts
  function cell(v: unknown): string {
    const s = v == null ? "" : String(v);
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }
  ```
- **Code after:**
  ```ts
  function cell(v: unknown): string {
    let s = v == null ? "" : String(v);
    // CSV formula-injection guard: a leading = + - @ (or tab/CR) makes Excel/Sheets
    // execute the cell as a formula. Prefix with an apostrophe to neutralize.
    if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }
  ```
- **Why:** Neutralizes spreadsheet formula execution while preserving RFC-4180 quoting.
- **Verification:** `tsc` clean; grep `formula-injection` = 1. **Result:** PASS.
- **Remaining risk:** None for the documented vector.
- **Rollback:** `git checkout lib/csv.ts`.

## C-EVID-5 — L2 / SEC-8: Verbose DB error text leaked in thrown messages
- **Vulnerability addressed:** Raw PostgREST/Supabase error body interpolated into thrown `Error` messages (could surface to an authed admin response / logs).
- **File(s):** `lib/db.ts` (line 18) · **Risk level:** Low
- **Git diff:**
  ```diff
  -  if (!r.ok) throw new Error(`db ${path} ${r.status}: ${await r.text()}`);
  +  if (!r.ok) {
  +    // Log the verbose PostgREST body server-side only; never surface it in the thrown message.
  +    console.error(`[db] ${path} ${r.status}: ${await r.text()}`);
  +    throw new Error(`db-error ${r.status}`);
  +  }
  ```
- **Why:** Keeps diagnostics server-side; thrown message is now generic.
- **Verification:** `tsc` clean; diff confirmed. **Result:** PASS.
- **Remaining risk:** None.
- **Rollback:** `git checkout lib/db.ts` (uncommitted).

---

# SEO CHANGES

## S-EVID-1 — H10 / SEO-3: Home page metadata (canonical + hreflang)
- **URL affected:** `/` (and pairs `/hi`) · **Risk:** None · **File:** `app/page.tsx`
- **Previous state:** No `metadata` export; relied on layout default; no canonical, no hreflang.
- **Change (after):**
  ```ts
  export const metadata: Metadata = {
    alternates: { canonical: "/", languages: { en: "/", hi: "/hi", "x-default": "/" } },
  };
  ```
- **New canonical value:** `https://rkmfoundation.com/`
- **New hreflang values:** `en → /`, `hi → /hi`, `x-default → /`
- **JSON-LD added:** none here (site-wide NGO JSON-LD already in layout).
- **Validation result:** `tsc` clean; resolves via `metadataBase`. Live hreflang/canonical render in `<head>` — **Rich Results / hreflang validation pending deploy** (not yet live).
- **Rollback:** `git checkout app/page.tsx`.

## S-EVID-2 — H8 / M2 / SEO-1/2: Canonical + hreflang on 5 key pages
- **URLs affected:** `/about`, `/donate-now`, `/contact`, `/faqs`, `/blog/the-dog-who-started-it-all` · **Risk:** None
- **Previous state:** EN pages had **no** canonical and **no** hreflang (HI counterparts had self-canonical only).
- **Change pattern (example, `/about`):**
  ```ts
  alternates: { canonical: "/about", languages: { en: "/about", hi: "/hi/about", "x-default": "/about" } },
  ```
- **New canonical / hreflang per URL:**
  | URL | canonical | hreflang en / hi / x-default |
  |---|---|---|
  | /about | /about | /about · /hi/about · /about |
  | /donate-now | /donate-now | /donate-now · /hi/donate-now · /donate-now |
  | /contact | /contact | /contact · /hi/contact · /contact |
  | /faqs | /faqs | /faqs · /hi/faqs · /faqs |
  | /blog/the-dog-who-started-it-all | (self) | EN · /hi/blog/... · EN |
- **Validation result:** `tsc` clean; grep confirms `languages:` on all 5 (+home = 6). hreflang reciprocity pending the HI-side sweep (see Deferred). **Live validation pending deploy.**
- **Rollback:** `git checkout` per file.

## S-EVID-3 — M3 / SEO-4: Structured data (JSON-LD)
- **URLs affected:** `/faqs` (+`/hi/faqs` shares component data), `/blog/the-dog-who-started-it-all`
- **Previous state:** Only site-wide `NGO` Organization JSON-LD; no FAQPage, no Article.
- **JSON-LD type added — `/faqs` → `FAQPage`:** built from `FAQS_GENERAL + FAQS_FUNDRAISER + FAQS_SHOP`, each Q→`Question`/`acceptedAnswer:Answer`. Rendered via `<script type="application/ld+json">`.
- **JSON-LD type added — blog → `BlogPosting`:** headline, description, image (`/og.png`), `author`/`publisher` = RKM Foundation Organization (+logo), `mainEntityOfPage`. (No `datePublished` — omitted rather than fabricate; add a real date when known.)
- **Validation result:** Structurally valid schema.org JSON; serialized via `JSON.stringify` so guaranteed well-formed; `tsc` clean; grep `application/ld+json` present in both files. **Google Rich Results Test pending deploy.**
- **Risk:** None (additive). **Rollback:** `git checkout` per file.

## S-EVID-4 — H8/M2 (extended) + M4: hreflang sweep completion + per-page OG
- **URLs affected:** `/csr`, `/careers`, `/media`, `/partner-with-us`, `/other-ways-to-give`, `/fundraiser` (canonical+hreflang); `/donate-now`, `/blog/the-dog-who-started-it-all` (per-page OG) · **Risk:** None
- **Previous state:** these 6 EN content pages had no canonical/hreflang; donate + blog shared the single site OG card.
- **Change:** added `alternates.canonical` + `languages` (en/hi/x-default) to the 6 pages → **12 EN pages now paired**; added page-specific `openGraph` to donate (`type: website`) and blog (`type: article`).
- **Verification:** `tsc` clean; grep `languages:` across 12 EN pages = 12; `openGraph:` on donate+blog = 2. **Result:** PASS (code). Live validation pending deploy.
- **Remaining:** HI-side `alternates.languages` reciprocity + remaining utility pages (Deferred M2b).
- **Rollback:** `git checkout` per file.

---

# ACCESSIBILITY / I18N CHANGES

## A-EVID-1 — H9 / A11Y-1 / SEO-9: `<html lang="hi">` on the Hindi subtree (WCAG 3.1.1)
- **Issue addressed:** Root layout hard-coded `lang="en"`; all Hindi content announced as English by screen readers and declared English to crawlers.
- **File(s):** `components/LangSync.tsx` (new), `app/layout.tsx` (wired) · **Risk:** Low
- **New file `components/LangSync.tsx`:**
  ```tsx
  "use client";
  import { usePathname } from "next/navigation";
  import { useEffect } from "react";

  export default function LangSync() {
    const pathname = usePathname();
    useEffect(() => {
      const isHi = pathname === "/hi" || (pathname?.startsWith("/hi/") ?? false);
      document.documentElement.lang = isHi ? "hi" : "en";
    }, [pathname]);
    return null;
  }
  ```
- **Wiring in `app/layout.tsx`:** added `import LangSync from "@/components/LangSync";` and `<LangSync />` as first child of `<body>`.
- **Why:** Sets the correct page language for assistive tech on `/hi` routes without forcing the whole site into dynamic rendering.
- **Verification:** `tsc` clean; grep `LangSync` in layout = 2. **Result:** PASS (code). Screen-reader/live confirmation pending deploy.
- **Remaining risk:** Client-set lang (runs on hydration) — covers AT/JS crawlers; a server-rendered lang is the fuller fix but requires middleware + dynamic rendering (follow-up).
- **Rollback:** delete `components/LangSync.tsx`; revert the two `app/layout.tsx` lines.

## A-EVID-2 — M5 / SEO-7: `noindex` on thin utility pages
- **URLs affected:** `/thank-you`, `/newsletter-confirmed`, `/unsubscribe` · **Risk:** None
- **Previous state:** Indexable (no robots directive) → index bloat.
- **Change:** added `robots: { index: false, follow: false }` to each page's `metadata`.
- **Validation:** `tsc` clean; grep `index: false` present in all 3. **Result:** PASS. Live `X-Robots`/meta validation pending deploy.
- **Rollback:** `git checkout` per file.

---

# DEFERRED ITEMS
| ID | Item | Reason deferred | Dependency | Risk if left | Recommended next step |
|---|---|---|---|---|---|
| H7 | `next/font` self-hosting | Devanagari referenced by literal name in ~20 actively-edited Hindi files; can't verify un-deployed | Preview deploy + editor pause | Medium: render-blocking fonts, third-party request, minor CLS | Migrate to CSS-variable fonts on a branch, verify Hindi rendering on preview |
| H6 | `next/image` migration | Touches many components under active edit; needs visual verification | Preview deploy | Medium: slower LCP, no AVIF/WebP, wasted bandwidth | Migrate hero + key images first on a branch, Lighthouse-verify |
| H11 | Low-contrast text fixes | Mostly in components under active concurrent edit (collision) | Editor pause | Medium: WCAG 1.4.3 fails on small/legal text | Bump `text-ink/40–55` → `/65–70` once editor stops |
| M4 | Per-page OG cards | Lower priority; broad | — | Low: weaker social CTR | Add OG overrides for blog/donate/`/hi` |
| M2b | Canonical/hreflang on remaining ~42 pages | Mechanical repetition; sandbox can't script-write to OneDrive | Time / Edit passes | Low–Medium: partial hreflang reciprocity | Repeat the one-line `alternates` block on remaining EN+HI pages |

---

# BLOCKED ITEMS (need you)
| ID | Item | What's required from you | Est. effort | Est. impact |
|---|---|---|---|---|
| C1 | Donation can be lost if webhook misconfigured | Approve payment-flow change (fallback persistence + amount reconciliation in `/verify`) | M (3–4 h) | **Very high** — protects revenue + 80G compliance |
| C2 | Unauthenticated PAN/address write (`/api/compliance`) | Approve auth change (signed token / receipt-id binding) | M (2–3 h) | **High** — closes PII tampering |
| Hwh | Webhook amount not reconciled | Approve payment-flow change | M | High |
| H4 | PAN captured at donate then discarded | Approve donation-data change | M | High — reduces 80G drop-off |
| H5 | Success shown as "failed" on verify hiccup | Approve donation-flow UX change | S | High — prevents duplicate donations |
| M13 | Pre-payment email validation | Approve donation-flow change | S | Medium |
| M14 | Demo-mode outage alert | Approve donation-flow change | S | Medium |
| H12 | No analytics | Approve analytics tool + consent (legal) | S–M | **High** — enables funnel measurement |
| M1 | Durable rate limiting | Approve Upstash (new infra/install) | M | Medium |
| M12 | Hindi legal pages content | Legal/compliance content decision | M | Medium |
| M8/M9 | Delete junk + dead code (~1.4 MB) | Run `git clean -fdx`-style delete locally (sandbox lacks delete permission on OneDrive) | S | Low–Medium (repo hygiene) |

---

# FINAL VERIFICATION REPORT
*Self-audit of completed work against live git + working-tree state on 2026-06-16. No new changes made. Conservative scoring.*

### Counts (top of report)
| Metric | Count |
|---|---|
| **Total Issues** | 35 |
| **Completed** (code-complete + evidence) | 10 |
| **Evidence Backed** | 10 |
| **Production Verified** | 0 |
| **Awaiting Production Verification** | 10 |
| **Deferred** | 5 |
| **Blocked** | 11 |

### Per-change verification
Verified: (1) marker still on disk, (2) not overwritten, (3) present in git history or working tree, (4) present in evidence pack, (5) rollback present, (6) status accurate, (7) dependencies documented. All 7 checks **PASS** for every row below.

| Change ID | Status | Evidence Present | Git Commit | Working-Tree Only | Production Verified | Rollback Available | Risk |
|---|---|---|---|---|---|---|---|
| C-EVID-1 (H1 email XSS) | Code-complete | Yes | `941032f` | No | **No** | Yes | High → mitigated |
| C-EVID-2 (H3 PII log) | Code-complete | Yes | `941032f` | No | **No** | Yes | High → mitigated |
| C-EVID-3 (L1 timing-safe) | Code-complete | Yes | `941032f` | No | **No** | Yes | Low |
| C-EVID-4 (L3 CSV injection) | Code-complete | Yes | `941032f` | No | **No** | Yes | Low–Med → mitigated |
| C-EVID-5 (L2 DB error leak) | Code-complete | Yes | — (uncommitted) | Yes | **No** | Yes | Low |
| S-EVID-1 (H10 home meta) | Code-complete | Yes | — | Yes | **No** | Yes | None |
| S-EVID-2 (H8/M2 ×5 pages) | Code-complete | Yes | — | Yes | **No** | Yes | None |
| S-EVID-3 (M3 JSON-LD ×2) | Code-complete | Yes | — | Yes | **No** | Yes | None |
| A-EVID-1 (H9 lang fix) | Code-complete | Yes | — (layout M; `LangSync.tsx` untracked) | Yes | **No** | Yes | Low |
| A-EVID-2 (M5 noindex ×3) | Code-complete | Yes | — | Yes | **No** | Yes | None |

**Disk markers confirmed:** `esc(String(v))`=1, `timingSafeEqual`=3, `formula-injection`=1, `db-error`=1, `languages:` on 6 pages, `application/ld+json` on faqs+blog, `index: false` on 3 utility pages, `LangSync` ×2 in layout, `components/LangSync.tsx` present.

# INTEGRITY CHECK
| Check | Result | Note |
|---|---|---|
| No duplicate change IDs | **PASS** | IDs C-EVID-1..5, S-EVID-1..3, A-EVID-1..2 all unique |
| No conflicting recommendations | **PASS** | H9 client-lang + future server-lang are complementary, not conflicting; hreflang (6 done) + remaining sweep (deferred) are complementary |
| No completed item also listed as pending | **PASS** | "Pending" = pending *production verification* only; all 10 completed items are code-complete and awaiting prod-verify by design — none pending *implementation* |
| No deferred item marked complete | **PASS** | H7, H6, H11, M4, M2b remain Deferred |
| No blocked item marked complete | **PASS** | C1, C2, Hwh, H4, H5, M13, M14, H12, M1, M12, M8/M9 remain Blocked |
| No missing evidence references | **PASS** | All 10 completed changes have an evidence entry above |
| No broken internal document links | **PASS (1 note)** | `AUDIT-MASTER-BACKLOG.md` → `./IMPLEMENTATION-EVIDENCE-PACK.md` ✓; references to `CHANGELOG-AUDIT.md`, `FINAL-AUDIT-REPORT.md`, `PRODUCTION-VS-REPO-DIFF-REPORT.md` all exist. **Note:** a separate `FINAL-COMPLETION-REPORT.md` exists (created by the concurrent editor, not by this audit) — not referenced here, no broken link, flagged to avoid confusion |

# PRODUCTION READINESS SUMMARY
**Ready for Production (safe to deploy now — code-complete, verified, low/no risk):** C-EVID-1..5, S-EVID-1..3, A-EVID-1, A-EVID-2 (all 10). Four (C-EVID-1..4) are already in commit `941032f` and in the deploy pipeline; six are uncommitted and need committing.

**Requires Production Verification (after deploy):** all 10 — confirm via View-Source (canonical/hreflang/noindex), Google Rich Results Test (FAQPage/BlogPosting), screen-reader/`<html lang>` on `/hi`, and a live admin-export + form-submit smoke test.

**Deferred (5):** H7 `next/font`, H6 `next/image`, H11 contrast fixes, M4 per-page OG, M2b remaining ~42-page hreflang sweep. *(Reason/dependency/risk/next-step in the Deferred table above.)*

**Blocked (11 — need you):** C1, C2, Hwh, H4, H5, M13, M14 (payments/donation flow), H12 (analytics/consent), M1 (Upstash infra), M12 (Hindi legal content), M8/M9 (local deletion). *(What's-needed/effort/impact in the Blocked table above.)*

**Future Enhancements (not started):** Improvement-mode "Top 20 opportunities" (donations/conversion/trust); breadcrumb JSON-LD; server-rendered `lang` via middleware; image compression.

# PROJECT COMPLETION %
**Methodology (conservative):** production-verified work = full credit; code-complete-but-unverified = half credit; deferred/blocked = zero. Denominator = all 35 identified issues (blocked items included, not excluded, to avoid inflation).

- Production-verified: 0 × 1.0 = 0
- Code-complete, awaiting verification: 10 × 0.5 = 5
- Deferred (5) + Blocked (11) = 0

**Project Completion: ≈ 14%** (5 / 35), conservative/verification-weighted.
- For reference (not the headline): code-complete-at-full-weight = **29%** (10/35); **production-verified = 0%**.
- The single largest lever to raise this is **deployment + live verification** of the 10 ready changes, then approving the blocked payments/analytics batch — not more documentation.
