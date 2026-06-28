import { escapeHtml as esc } from "./guard";

/**
 * Email lifecycle skeleton — SOP-08 / RKMF-035.
 *
 * Lifecycle (relationship) emails that sit ON TOP of the already-shipped
 * acknowledgement / 80G receipt / newsletter-welcome / form-ack flows in
 * `lib/email.ts`. Together they cover the donor arc:
 *
 *   first gift   -> acknowledgement + 80G receipt   (lib/email.ts — DONE)
 *   subscriber   -> welcome                          (lib/email.ts — DONE)
 *   new monthly  -> recurring onboarding             (here: monthlyDonorWelcome)
 *   ongoing      -> monthly impact update            (here: monthlyImpactUpdate)
 *   first-timer  -> second-gift nudge                (here: secondGiftNudge)
 *   lapsed       -> win-back                          (here: lapsedWinBack)
 *   tax season   -> Form 10BE / 80G statutory note    (here: taxReceiptReminder)
 *
 * IMPORTANT — these are SKELETONS. Every `[NEEDS DATA: …]` marker is a real
 * Founder-Content-Pack field (impact numbers, named animals, rescue stories,
 * photos, cost-per-outcome math). They MUST be filled before any of these are
 * sent. Nothing here fabricates figures, names, or outcomes — placeholders
 * render literally, and `sendLifecycleEmail` refuses to send while any remain.
 *
 * Sending is gated on RESEND_API_KEY (credential). Until then it is a safe
 * no-op that logs only the template name (no PII).
 *
 * Trigger points (to be wired when content + credentials exist):
 *   monthlyDonorWelcome  -> webhook on first subscription.charged
 *   monthlyImpactUpdate  -> monthly scheduled job (donors + consented subscribers)
 *   secondGiftNudge      -> N days after a one-time donor's first gift (no repeat yet)
 *   lapsedWinBack        -> donor inactive for M months
 *   taxReceiptReminder   -> after Form 10BE filing (post-FY close)
 */

const FROM_NAME = "RKM Foundation";
const SITE_URL = "https://rkmfoundation.com";
const DONATE_URL = `${SITE_URL}/donate-now#donation`;

function fromAddr(): string {
  return process.env.RECEIPTS_FROM_EMAIL || process.env.FORMS_FROM_EMAIL || "website@rkm.support";
}
function fromHeader(): string {
  return `${FROM_NAME} <${fromAddr()}>`;
}

/** A founder-content placeholder. Renders visibly so an unfilled email can never go out unnoticed. */
export function NEEDS_DATA(field: string): string {
  return `<span style="background:#fff3cd;color:#7a5b00;border:1px dashed #c9a227;border-radius:4px;padding:0 5px;font-size:13px">[NEEDS DATA: ${esc(field)}]</span>`;
}

function shell(inner: string): string {
  return `<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a;font-size:15px;line-height:1.55;padding:8px">${inner}<hr style="border:0;border-top:1px solid #eee;margin:24px 0"><p style="font-size:12px;color:#888;margin:0">RKM Foundation · Registered Charitable Trust · Reg. E-30560 · 12A · 80G · CSR<br><a href="${SITE_URL}" style="color:#93502b">rkmfoundation.com</a> · info@rkm.support · <a href="${SITE_URL}/unsubscribe" style="color:#888">unsubscribe</a></p></div>`;
}

function button(href: string, label: string): string {
  return `<p style="margin-top:18px"><a href="${href}" style="background:#93502b;color:#fff;text-decoration:none;padding:11px 20px;border-radius:999px;font-weight:600;font-size:14px;display:inline-block">${esc(label)}</a></p>`;
}

function inr(paise: number): string {
  return "₹" + Math.round(paise / 100).toLocaleString("en-IN");
}

export type LifecycleEmail = { subject: string; html: string };

/** New MONTHLY donor — recurring onboarding (fires after the first successful subscription charge). */
export function monthlyDonorWelcome(o: { donorName?: string; amountPaise?: number }): LifecycleEmail {
  const name = esc(o.donorName || "Friend");
  const amt = o.amountPaise ? inr(o.amountPaise) : NEEDS_DATA("monthly amount");
  return {
    subject: "You're now a monthly guardian — thank you",
    html: shell(
      `<h2 style="color:#93502b;margin:0 0 12px">Thank you for becoming a monthly guardian, ${name}.</h2>` +
      `<p>Your gift of <strong>${amt}/month</strong> is the steady kind of help a shelter runs on — bowls stay full and the clinic stays open, every single month.</p>` +
      `<p>Here is what your monthly gift sustains: ${NEEDS_DATA("cost-per-outcome line, e.g. \"₹X/month feeds N shelter animals\"")}.</p>` +
      `<p>You can change or cancel anytime — just reply to this email.</p>` +
      button(SITE_URL, "See your impact →")
    ),
  };
}

/** Monthly IMPACT UPDATE — the "we'll show you the life it changed" promise (donors + consented subscribers). */
export function monthlyImpactUpdate(o: { donorName?: string; monthLabel?: string }): LifecycleEmail {
  const name = esc(o.donorName || "Friend");
  const month = o.monthLabel ? esc(o.monthLabel) : NEEDS_DATA("month, e.g. \"June 2026\"");
  return {
    subject: `This month, because of you — ${o.monthLabel ? esc(o.monthLabel) : "RKM Foundation"}`,
    html: shell(
      `<h2 style="color:#93502b;margin:0 0 12px">${month}: here's who you helped.</h2>` +
      `<p>Dear ${name}, a quick and honest update from the field.</p>` +
      `<p style="margin:14px 0"><strong>By the numbers:</strong> ${NEEDS_DATA("animals rescued / treated / fed / rehomed this month — real figures + date")}.</p>` +
      `<p><strong>One we'll never forget:</strong> ${NEEDS_DATA("one named rescued animal + 1–2 line before→after outcome")}.</p>` +
      `<p>${NEEDS_DATA("optional: one real field photo URL (documentary, with consent)")}</p>` +
      button(DONATE_URL, "Help us do more →")
    ),
  };
}

/** SECOND-GIFT nudge — first-time donor → repeat (§8 second-gift path). */
export function secondGiftNudge(o: { donorName?: string; lastAmountPaise?: number; lastGiftDateLabel?: string }): LifecycleEmail {
  const name = esc(o.donorName || "Friend");
  const last = o.lastAmountPaise ? inr(o.lastAmountPaise) : NEEDS_DATA("their first gift amount");
  const when = o.lastGiftDateLabel ? esc(o.lastGiftDateLabel) : NEEDS_DATA("date of first gift");
  return {
    subject: "Your kindness is still working — here's what's next",
    html: shell(
      `<h2 style="color:#93502b;margin:0 0 12px">Thank you again, ${name}.</h2>` +
      `<p>Your gift of <strong>${last}</strong> on ${when} already made a difference. The need on the street doesn't stop, though — and a second gift goes twice as far.</p>` +
      `<p>${NEEDS_DATA("what a repeat / monthly gift unlocks, with real cost-per-outcome math")}</p>` +
      `<p>If it feels right, making it monthly is the single most helpful thing you can do.</p>` +
      button(`${SITE_URL}/donate-now?monthly=1#donation`, "Give monthly →")
    ),
  };
}

/** LAPSED win-back — re-engage donors who haven't given in a while. */
export function lapsedWinBack(o: { donorName?: string }): LifecycleEmail {
  const name = esc(o.donorName || "Friend");
  return {
    subject: "We've missed you — and so have they",
    html: shell(
      `<h2 style="color:#93502b;margin:0 0 12px">It's been a while, ${name}.</h2>` +
      `<p>A lot has happened since your last gift. Here's one story from the time you were away:</p>` +
      `<p style="margin:14px 0">${NEEDS_DATA("one recent rescue story — named animal, before→after, since their last gift")}</p>` +
      `<p>Would you consider coming back to help? Even a small monthly gift keeps the bowls full.</p>` +
      button(DONATE_URL, "Come back & help →")
    ),
  };
}

/** TAX-SEASON note — statutory Form 10BE / 80G (factual; only the certificate link is donor-specific). */
export function taxReceiptReminder(o: { donorName?: string; financialYear?: string }): LifecycleEmail {
  const name = esc(o.donorName || "Friend");
  const fy = o.financialYear ? esc(o.financialYear) : NEEDS_DATA("financial year, e.g. \"2025–26\"");
  return {
    subject: "Your 80G tax certificate (Form 10BE) — RKM Foundation",
    html: shell(
      `<h2 style="margin:0 0 12px">Your 80G certificate for FY ${fy}</h2>` +
      `<p>Dear ${name}, thank you for supporting RKM Foundation this year.</p>` +
      `<p style="font-size:13px;color:#555">Your donations are eligible for deduction under Section 80G of the Income Tax Act, 1961 (80G Reg. CITE80G9792014-152016-17). Your statutory Form 10BE certificate is issued by 31 May following the financial year.</p>` +
      `<p>${NEEDS_DATA("Form 10BE PDF link or attachment for this donor + FY")}</p>`
    ),
  };
}

/** The full lifecycle registry — handy for previewing / wiring triggers later. */
export const LIFECYCLE_EMAILS = {
  monthlyDonorWelcome,
  monthlyImpactUpdate,
  secondGiftNudge,
  lapsedWinBack,
  taxReceiptReminder,
} as const;
export type LifecycleKey = keyof typeof LIFECYCLE_EMAILS;

/**
 * Send a prepared lifecycle email. Gated on RESEND_API_KEY (credential) — until
 * that is set this is a safe no-op that logs only the template name (no PII).
 * REFUSES to send if the rendered HTML still contains a [NEEDS DATA] marker, so
 * an unfilled skeleton can never reach a donor (pass allowPlaceholders only for
 * internal previews).
 */
export async function sendLifecycleEmail(
  to: string,
  email: LifecycleEmail,
  opts: { allowPlaceholders?: boolean } = {}
): Promise<{ ok?: true; skipped?: string }> {
  if (!to) return { skipped: "no-recipient" };
  if (!opts.allowPlaceholders && /\[NEEDS DATA:/.test(email.html)) {
    return { skipped: "contains-placeholders" };
  }
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log(`[lifecycle] (not configured) would send "${email.subject.slice(0, 40)}"`);
    return { skipped: "not-configured" };
  }
  const { Resend } = await import("resend");
  const resend = new Resend(key);
  const r = await resend.emails.send({ from: fromHeader(), to: [to], subject: email.subject, html: email.html });
  if (r.error) throw new Error(r.error.message);
  return { ok: true };
}
