// Orchestrates the donor-facing notification for a paid donation:
// issue (or reuse) the numbered receipt → render the 80G PDF → email the donor
// (acknowledgement + receipt). Idempotent via issueReceipt; safe to call from
// the webhook on payment.captured. Any failure is the caller's to log — it must
// never break the webhook's 200 response.
import { dbFetch, indianFY } from "./db";
import { issueReceipt } from "./receipt";
import { receiptPdfBytes } from "./receipt-pdf";
import { sendDonationEmails } from "./email";

export async function sendDonationReceipt(donationId: string, ctx: { paymentId?: string } = {}) {
  const enc = encodeURIComponent;
  const { receipt } = await issueReceipt(donationId); // gapless number, idempotent

  const donation = (await dbFetch(`donation?donation_id=eq.${enc(donationId)}&select=*&limit=1`))?.[0];
  if (!donation) return { skipped: "donation-missing" };
  const donor = (await dbFetch(`donor?donor_id=eq.${enc(donation.donor_id)}&select=*&limit=1`))?.[0];
  const to: string | undefined = donor?.email;
  if (!to) return { skipped: "no-donor-email", receiptNo: receipt.receipt_no };

  let fundName = "General Fund";
  if (donation.fund_id) {
    const f = (await dbFetch(`fund?fund_id=eq.${enc(donation.fund_id)}&limit=1`).catch(() => null))?.[0];
    fundName = f?.name ?? f?.fund_name ?? f?.title ?? fundName;
  }

  const donorName = donor.name_as_per_pan || donor.full_name || "Friend";
  const amountPaise = donation.gross_amount_paise ?? 0;
  const fy = donation.financial_year || indianFY(donation.received_date ? new Date(donation.received_date) : new Date());

  const pdf = await receiptPdfBytes({
    receiptNo: receipt.receipt_no,
    issuedDate: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    donorName,
    pan: donor.pan,
    amountPaise,
    paymentMode: donation.payment_mode,
    paymentRef: donation.payment_ref,
    fund: fundName,
    fy,
  });

  await sendDonationEmails({
    to,
    donorName,
    amountPaise,
    paymentId: donation.payment_ref || ctx.paymentId,
    receiptNo: receipt.receipt_no,
    pdf,
  });
  return { ok: true, receiptNo: receipt.receipt_no };
}
