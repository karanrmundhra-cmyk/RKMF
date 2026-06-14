// Receipt issuance (M3).
// Gapless receipt numbers come from the Postgres function allocate_receipt_no(fy)
// (advisory-locked sequence per FY). The receipt artifact is a standalone,
// printable A5 HTML document (no heavy PDF deps); we compute its SHA-256 and
// store it in the private Supabase Storage bucket "receipts".
import { createHash } from "crypto";
import { dbConfig, dbEnabled, dbFetch, indianFY } from "@/lib/db";

const ORG = {
  name: "RKM Foundation",
  tagline: "Registered Charitable Trust",
  reg: "E-30560",
  pan: "AACTR4271L",
  twelveA: "47522",
  eightyG: "CITE80G9792014-152016-17",
};

const PROVISIONAL_LINE =
  "Provisional receipt — your statutory 80G certificate (Form 10BE) will be issued by 31 May following the financial year.";

// ── helpers ──────────────────────────────────────────────────────────────────
function esc(s: unknown): string {
  return String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}

export function maskPan(pan?: string | null): string {
  if (!pan) return "—";
  return pan.length > 4 ? pan.slice(0, -4).replace(/[A-Za-z0-9]/g, "X") + pan.slice(-4) : pan;
}

const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
  "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function two(n: number): string {
  return n < 20 ? ONES[n] : `${TENS[Math.floor(n / 10)]}${n % 10 ? " " + ONES[n % 10] : ""}`;
}
function three(n: number): string {
  const h = Math.floor(n / 100), r = n % 100;
  return [h ? `${ONES[h]} Hundred` : "", two(r)].filter(Boolean).join(" ");
}

// Indian-numbering amount in words, e.g. "Rupees One Lakh Twenty Thousand Only".
export function rupeesInWords(paise: number): string {
  let n = Math.floor(paise / 100);
  const p = Math.round(paise % 100);
  if (n === 0 && p === 0) return "Rupees Zero Only";
  const parts: string[] = [];
  const crore = Math.floor(n / 10000000); n %= 10000000;
  const lakh = Math.floor(n / 100000); n %= 100000;
  const thousand = Math.floor(n / 1000); n %= 1000;
  if (crore) parts.push(`${three(crore)} Crore`);
  if (lakh) parts.push(`${two(lakh)} Lakh`);
  if (thousand) parts.push(`${two(thousand)} Thousand`);
  if (n) parts.push(three(n));
  let s = `Rupees ${parts.join(" ") || "Zero"}`;
  if (p) s += ` and ${two(p)} Paise`;
  return `${s} Only`;
}

function inr(paise: number): string {
  return (paise / 100).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ── receipt document ─────────────────────────────────────────────────────────
export function receiptHtml(a: {
  receiptNo: string; issuedDate: string; donorName: string; pan?: string | null;
  amountPaise: number; paymentMode?: string | null; paymentRef?: string | null;
  fund: string; fy: string;
}): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Donation Receipt ${esc(a.receiptNo)}</title>
<style>
  @page { size: A5; margin: 10mm; }
  body { font-family: Georgia, "Times New Roman", serif; color: #1a1a1a; margin: 0; padding: 24px; font-size: 13px; line-height: 1.45; background: #fff; }
  .sheet { max-width: 560px; margin: 0 auto; border: 1px solid #c9b18f; padding: 28px 32px; }
  h1 { font-size: 20px; margin: 0; letter-spacing: 0.02em; }
  .sub { font-size: 11px; color: #555; margin-top: 2px; }
  .regs { font-size: 10px; color: #666; margin-top: 6px; }
  .rule { border: 0; border-top: 1px solid #c9b18f; margin: 14px 0; }
  table { width: 100%; border-collapse: collapse; }
  td { padding: 4px 0; vertical-align: top; }
  td.k { width: 38%; color: #666; }
  .amount { font-size: 18px; font-weight: bold; }
  .words { font-style: italic; }
  .note { font-size: 10.5px; color: #444; background: #faf6ef; border: 1px solid #e8dcc8; padding: 8px 10px; margin-top: 14px; }
  .foot { font-size: 9.5px; color: #888; margin-top: 16px; text-align: center; }
  @media print { body { padding: 0; } .sheet { border: none; max-width: none; } }
</style>
</head>
<body>
<div class="sheet">
  <div style="text-align:center">
    <h1>${esc(ORG.name)}</h1>
    <div class="sub">${esc(ORG.tagline)}</div>
    <div class="regs">Reg. No. ${esc(ORG.reg)} &middot; PAN ${esc(ORG.pan)} &middot; 12A Reg. ${esc(ORG.twelveA)} &middot; 80G Reg. ${esc(ORG.eightyG)}</div>
  </div>
  <hr class="rule">
  <table>
    <tr><td class="k">Receipt No.</td><td><strong>${esc(a.receiptNo)}</strong></td></tr>
    <tr><td class="k">Date</td><td>${esc(a.issuedDate)}</td></tr>
    <tr><td class="k">Received from</td><td><strong>${esc(a.donorName)}</strong></td></tr>
    <tr><td class="k">Donor PAN</td><td>${esc(maskPan(a.pan))}</td></tr>
    <tr><td class="k">Amount</td><td class="amount">&#8377; ${esc(inr(a.amountPaise))}</td></tr>
    <tr><td class="k">Amount in words</td><td class="words">${esc(rupeesInWords(a.amountPaise))}</td></tr>
    <tr><td class="k">Payment mode / ref</td><td>${esc(a.paymentMode || "—")}${a.paymentRef ? " / " + esc(a.paymentRef) : ""}</td></tr>
    <tr><td class="k">Fund</td><td>${esc(a.fund)}</td></tr>
    <tr><td class="k">Financial year</td><td>${esc(a.fy)}</td></tr>
  </table>
  <div class="note">${esc(PROVISIONAL_LINE)}</div>
  <div class="foot">This is a computer-generated receipt and does not require a signature. SHA-256 integrity hash held on file. ${esc(ORG.name)} &middot; rkm.support</div>
</div>
</body>
</html>`;
}

// ── storage ──────────────────────────────────────────────────────────────────
async function ensureBucket(): Promise<void> {
  const { url, key } = dbConfig();
  const r = await fetch(`${url}/storage/v1/bucket`, {
    method: "POST",
    headers: { apikey: key!, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ id: "receipts", name: "receipts", public: false }),
  });
  if (r.ok || r.status === 409) return;
  const text = await r.text();
  if (/already exists|duplicate/i.test(text)) return; // some versions answer 400
  throw new Error(`storage bucket create ${r.status}: ${text}`);
}

async function uploadHtml(objectPath: string, html: string): Promise<void> {
  const { url, key } = dbConfig();
  const r = await fetch(`${url}/storage/v1/object/receipts/${objectPath}`, {
    method: "POST",
    headers: {
      apikey: key!, Authorization: `Bearer ${key}`,
      "Content-Type": "text/html; charset=utf-8", "x-upsert": "true",
    },
    body: html,
  });
  if (!r.ok) throw new Error(`storage upload ${r.status}: ${await r.text()}`);
}

// ── issuance ─────────────────────────────────────────────────────────────────
export async function issueReceipt(donationId: string): Promise<{ already_issued?: boolean; receipt: any }> {
  if (!dbEnabled()) throw new Error("db-not-configured");
  const enc = encodeURIComponent;

  const donation = (await dbFetch(`donation?donation_id=eq.${enc(donationId)}&select=*&limit=1`))?.[0];
  if (!donation) throw new Error("donation-not-found");
  if (donation.status !== "paid") throw new Error("donation-not-paid");

  // idempotent: if a receipt is already linked, return it instead of burning a number
  if (donation.receipt_id) {
    const existing = (await dbFetch(`receipt?receipt_id=eq.${enc(donation.receipt_id)}&limit=1`))?.[0];
    if (existing) return { already_issued: true, receipt: existing };
  }

  const donor = (await dbFetch(`donor?donor_id=eq.${enc(donation.donor_id)}&limit=1`))?.[0];
  if (!donor) throw new Error("donor-not-found");

  let fundName = "General Fund";
  if (donation.fund_id) {
    const f = (await dbFetch(`fund?fund_id=eq.${enc(donation.fund_id)}&limit=1`).catch(() => null))?.[0];
    fundName = f?.name ?? f?.fund_name ?? f?.title ?? fundName;
  }

  const fy: string = donation.financial_year ||
    indianFY(donation.received_date ? new Date(donation.received_date) : new Date());

  // gapless number from Postgres (advisory-locked sequence per FY)
  const alloc = await dbFetch("rpc/allocate_receipt_no", { method: "POST", body: JSON.stringify({ fy }) });
  const receiptNo: string = typeof alloc === "string" ? alloc : Array.isArray(alloc) ? String(alloc[0]) : String(alloc);

  const html = receiptHtml({
    receiptNo,
    issuedDate: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    donorName: donor.name_as_per_pan || donor.full_name || "Donor",
    pan: donor.pan,
    amountPaise: donation.gross_amount_paise ?? 0,
    paymentMode: donation.payment_mode,
    paymentRef: donation.payment_ref,
    fund: fundName,
    fy,
  });
  const sha256 = createHash("sha256").update(html, "utf8").digest("hex");

  await ensureBucket();
  const safeNo = receiptNo.replace(/[^A-Za-z0-9._-]+/g, "-");
  const objectPath = `${fy}/${safeNo}.html`;
  await uploadHtml(objectPath, html);

  const row = (await dbFetch("receipt", {
    method: "POST",
    body: JSON.stringify({
      donation_id: donationId,
      receipt_no: receiptNo,
      type: "donation_receipt",
      financial_year: fy,
      pdf_path: `receipts/${objectPath}`,
      sha256,
      issued_at: new Date().toISOString(),
    }),
  }))[0];

  await dbFetch(`donation?donation_id=eq.${enc(donationId)}`, {
    method: "PATCH",
    body: JSON.stringify({ receipt_id: row.receipt_id }),
  });

  return { receipt: row };
}
