# RKM Foundation — Night Shift Report
**Run:** 15 Jun 2026 (overnight) · **Production commit:** `83c7f055c0152ff23eb4b96fc820af30ca2e248d` · **Live:** https://rkmfoundation.com

---

## A. CHANGES MADE

**Supabase (production DB) — applied directly, no deploy needed, non-destructive:**
- Migration `harden_function_search_path` — pinned `search_path = public, pg_temp` on all 7 public functions: `allocate_receipt_no`, `indian_fy`, `app_role`, `donation_guard`, `forbid_mutation`, `touch_updated_at`, `write_audit`. Closes 7 `function_search_path_mutable` security advisories and removes a search-path-injection vector. Behaviour-preserving (verified: `config = search_path=public, pg_temp` now set on all 7). *(Applied in the prior session; confirmed still in effect.)*

**Source code / files changed:** none — see Section D for why, and why that is the correct outcome.

---

## B. COMMITS MADE
**None.** No new commit was created. Reason (evidence, not assumption):
- This working copy lives on a **OneDrive (FUSE) mount**. Git can create files but **cannot `unlink`/rename** inside `.git` — proven twice: `index.lock` could not be removed, and `git hash-object -w` left an un-removable `tmp_obj`. Git's commit finalisation depends on those atomic renames, so a commit attempt would likely **fail mid-way and leave the repo locked**.
- There are **no GitHub push credentials** in this environment (no `GITHUB_TOKEN`/`GH_TOKEN`, no `gh` CLI, no credential store). Even a clean local commit could not be pushed.

Forcing git here would risk corrupting your repo for **zero benefit** (see D). Production already runs the clean, verified commit `83c7f05`.

---

## C. DEPLOYMENTS MADE
**None.** Vercel production deploys are wired to GitHub pushes; with no push possible and no source changes to ship, redeploying the identical commit would be pointless. Current production deployment `dpl_54Ktks…` (commit `83c7f05`, target=production) is **READY** and serving `rkmfoundation.com` with SSL.

---

## D. ISSUES STILL OPEN

### FOUNDER ACTION REQUIRED
1. **Rotate exposed secrets** (service_role key, Razorpay webhook secret, Resend key, admin token) in Vercel → redeploy. They were pasted in chat in earlier sessions.
2. **Confirm the live Razorpay webhook** — endpoint `https://rkmfoundation.com/api/razorpay-webhook`, events `payment.captured` + `payment.failed`, and that `RAZORPAY_WEBHOOK_SECRET` in Vercel matches the secret in the Razorpay dashboard. *(Order creation is already proven LIVE — `rzp_live_T1Ut1RkbTpASjF`; the capture→webhook→receipt half is the only unverified link.)*
3. **Seed/demo-data decision** — the production DB holds ~15 demo donors / 18 demo donations (`pay_DEMO*`, `pay_TEST123`, plus one `AUDIT PROBE` row `order_T1cX09PTEFX5Iq` from endpoint verification) and 3 seed receipts with placeholder hashes. Purge before real donations so the donor register, 10BD/10BE exports, and gapless receipt numbering start clean. *(I did not delete anything — forbidden by your rules and irreversible.)*
4. **₹1,000 live donation test** (minimum enforced amount is ₹1,000, not ₹10).
5. **Receipt + email verification** after the test.

### OPTIONAL IMPROVEMENT (safe, but require a code change → can only ship from your authenticated machine; none are blockers)
- **Per-page canonical tags** — pages rely on `metadataBase`; adding explicit `alternates.canonical` per route is a minor SEO nicety.
- **CSP hardening** — currently uses `'unsafe-inline'`/`'unsafe-eval'` (required by Next.js + GSAP/Framer). A nonce-based CSP is a future hardening step, not a launch item.
- **Remove the intentional `TODO` comment** in `app/api/donate/verify/route.ts` (the webhook is the source of truth; the verify route is a client-side confirmation by design — no functional gap).
- **DB FK covering indexes** (INFO-level advisor) — genuinely unnecessary at current row counts; existing indexes are already flagged "unused." Deliberately skipped to avoid pointless churn on the live DB.
- **Real photography** to replace stock-grade placeholders — quality lever.

There are **no dead links, no broken images, no missing alt text, no placeholder/draft copy, and no failing type checks** in the deployed code. The earlier sessions' build verified 51 routes prerendering cleanly.

---

## E. MORNING CHECKLIST (exact sequence)

1. **Rotate secrets** (Vercel → Settings → Environment Variables), in order: `SUPABASE_SERVICE_KEY` → `ADMIN_ACCESS_TOKEN` → `RESEND_API_KEY` → `RAZORPAY_WEBHOOK_SECRET`. Redeploy after the batch.
2. **Razorpay dashboard** → Webhooks: confirm endpoint `https://rkmfoundation.com/api/razorpay-webhook`, events `payment.captured` + `payment.failed`, secret = the new `RAZORPAY_WEBHOOK_SECRET` you set in Vercel.
3. **Reset seed data** (your call) — wipe the demo donors/donations/receipts incl. the `AUDIT PROBE` row, so numbering starts at `RKM/2026-27/00006`.
4. **Run a ₹1,000 live donation** at `https://rkmfoundation.com/donate-now` (real card/UPI; refund yourself afterward in Razorpay).
5. **Verify the loop:** Razorpay → Transactions shows the capture; Webhooks shows a **200** (not 401); the donor email receives the acknowledgement + 80G receipt PDF; Supabase shows a `paid` donation + a numbered `receipt` row with a real 64-char SHA and storage path.
6. If webhook shows **401** → the `RAZORPAY_WEBHOOK_SECRET` in Vercel does not match Razorpay; fix and retest.
7. **Open to the public.**

Estimated time: ~35–45 minutes.

---

## F. FINAL STATUS

**READY FOR FOUNDER TESTING.**

Everything that could be completed without your credentials, approval, payment, or physical interaction is done. The deployed code is clean and verified, the database is hardened, and live order creation is confirmed on `rzp_live_` keys. The only items left are exactly the five founder-only actions above:
1. Secret rotation · 2. Razorpay webhook confirmation · 3. Seed/demo data decision · 4. ₹1,000 live donation · 5. Receipt/email verification.

> Note on autonomy limit: I was unable to commit/push/deploy source from this environment (no GitHub credentials + OneDrive-mounted `.git` blocks git's commit operations — evidence in Section B). This prevented shipping *code* changes — but none were needed: the audit found no safe code defect outstanding, and production already runs the clean commit `83c7f05`. The one shippable surface that doesn't require a deploy (Supabase) was hardened directly.
