# RKM Foundation — Final Pre-Launch Email Report
**Run:** 15 Jun 2026 · **Base production commit:** `83c7f05` · **Live:** https://rkmfoundation.com

This report covers the email-automation fixes requested: Volunteer acknowledgement, Shop flow audit, and a codebase sweep for false "email sent" claims. All code changes are type-checked (`tsc --noEmit` → exit 0).

---

## 1. Email automations IMPLEMENTED (this run)

**Volunteer form acknowledgement — added.**
- File: `lib/email.ts` → `ACK_COPY` map.
- Added key `volunteer`: *"Thank you for offering your time to help animals in need. We've received your details and our team will reach out with ways you can get involved."*
- Style matches the existing Careers / CSR / Partner acknowledgements.
- Effect: submitting the volunteer form (`/other-ways-to-give`, `formType: "volunteer"`) now sends the submitter a confirmation email via the existing `sendFormAck()` path. Previously `sendFormAck` returned `skipped` for volunteer (no template), so the submitter received nothing while the admin was notified.

No other new automations were created. (Unsubscribe still intentionally sends the submitter no email — only an admin notification — which is acceptable behaviour; noted for your decision, not changed.)

---

## 2. Email automations / claims REMOVED (this run)

No working automation was removed. Two **false on-page claims** that an email had already been sent — where no such email exists — were corrected:

**a. `/shop/thank-you`** (`app/shop/thank-you/page.tsx`)
- Before: *"A confirmation email with your order details and tax invoice **has been sent** to your email address…"*
- After: *"Our team **will be in touch by email** to confirm your order details and share your tax invoice…"*
- Reason: the Shop is **"Launching Soon — Notify Me"** (no checkout, no order API, no order/invoice email code anywhere). The page asserted an automated email that the system cannot send. Rewritten as a manual follow-up the team can actually fulfil.

**b. `/fundraiser/thank-you`** (`app/fundraiser/thank-you/page.tsx`)
- Before: *"A confirmation email and receipt **have been sent** to your email address…"*
- After: *"Your contribution has been received with gratitude. **If your gift was made through our donation page, your 80G receipt will arrive by email shortly.** Any questions? Just contact us."*
- Reason: this is an **orphan page** (nothing links to it; the only live donation flow is `/donate-now` → `/thank-you`). It asserted a fundraiser-donation receipt email that no flow sends. The claim is now conditional and truthful.

Both pages are currently unreachable through the live UI (no Shop checkout; orphan fundraiser sub-pages), so the donor-facing risk was low — but the false assertions are now gone.

---

## 3. Email automations STILL UNVERIFIED (no production send evidence)

Every automation below is wired in code and `RESEND_API_KEY` is set, but **none has positive production delivery evidence** (Vercel's runtime-log window shows only `POST /api/donate` order calls — zero `/api/forms` and zero `/api/razorpay-webhook` invocations; Supabase holds only seed receipts with placeholder hashes; Resend's delivery dashboard is not connected to this session). They are *implemented*, not *proven*:

1. **Donation 80G receipt email + PDF** (webhook → `sendDonationEmails`) — highest priority; no webhook has ever appeared in production logs and no real receipt exists in the DB.
2. **Donation acknowledgement email** ("Thank You for Helping an Animal Today") — same trigger, same gap.
3. Contact Us — admin notification + submitter ack.
4. CSR Enquiry — admin + ack.
5. Partner With Us — admin + ack.
6. Careers — admin + ack.
7. Create a Fundraiser — admin + ack.
8. **Volunteer — submitter ack (newly added this run)** + admin notification.
9. Newsletter — admin notification + welcome email.
10. Unsubscribe — admin notification.

**To convert these to PASS:** submit one of each form and run the ₹1,000 live donation, then confirm in **Resend → Logs** (delivered) and the donor inbox. The donation pair additionally needs the live Razorpay webhook to fire 200 (not 401).

---

## 4. Exact files changed

| File | Change |
|---|---|
| `lib/email.ts` | Added `volunteer` acknowledgement template to `ACK_COPY` |
| `app/shop/thank-you/page.tsx` | Removed false "confirmation email…has been sent" claim → manual follow-up wording |
| `app/fundraiser/thank-you/page.tsx` | Removed false "confirmation email and receipt have been sent" claim → conditional, truthful wording |

Verification: `node_modules/.bin/tsc --noEmit` → **exit 0** (no type errors). `git diff --stat`: 3 files, +7 / −6.

---

## 5. Git commit hash

**Not created in this environment.** The changes are saved and ready in the working tree but were **not committed or pushed**, for one hard reason:

- This sandbox has **no GitHub push credentials** (no `GITHUB_TOKEN`/`GH_TOKEN`, no `gh` CLI, no credential store), and the OneDrive-mounted `.git` rejects git's atomic write operations (`unlink`/rename return "Operation not permitted" — proven). Attempting a commit here risks leaving the repo locked.

**This is not a blocker for you** — on your own Mac, the same files are already modified and your native git works normally. Run, from the repo root:

```bash
git add lib/email.ts app/shop/thank-you/page.tsx app/fundraiser/thank-you/page.tsx
git commit -m "Email honesty: add volunteer ack; remove false 'email sent' claims on shop & fundraiser thank-you pages"
git push origin main
```

---

## 6. Deployment URL

**Not deployed from this environment** (depends on the push above; Vercel production auto-deploys on push to `main`). After you `git push origin main`, Vercel builds and deploys automatically to **https://rkmfoundation.com**. Watch the deploy in the Vercel dashboard; the new production deployment will carry your new commit SHA. (I did not trigger a detached/out-of-band deploy, to keep GitHub as the single source of truth for the production commit.)

---

## Most important question

> **Are there any pages making promises about emails that the system cannot currently deliver?**

**NO — after these fixes, no page asserts an email that the system has no way to deliver.**

Evidence:
- The two pages that falsely claimed an email *"has been sent"* with **no implementation behind them** — `/shop/thank-you` and `/fundraiser/thank-you` — have been corrected (Section 2; see diff).
- Every remaining on-page email promise has implementation behind it:
  - `/thank-you` (real donation): *"a receipt is on its way to your inbox"* → backed by `sendDonationEmails` (acknowledgement + 80G receipt PDF), fired by the Razorpay webhook on `payment.captured`.
  - Form acknowledgements (contact, CSR, careers, partner, fundraiser-create, **volunteer**, newsletter) → backed by `sendFormAck` / `sendNewsletterWelcome`.

**One caveat, stated plainly:** "has implementation" is not the same as "proven in production." The donation receipt/acknowledgement promise on `/thank-you` is **fully coded and on live `rzp_live_` keys, but has never been observed firing in production** (no webhook in logs; only seed receipts in the DB). So the system is *designed and able* to deliver every remaining email promise, but the donation-email pipeline is **unverified end-to-end** until your ₹1,000 live test confirms the webhook → receipt → email loop. If that test shows the webhook returning 401 (secret mismatch), the donation receipt promise would temporarily be undeliverable until the webhook secret is reconciled.
