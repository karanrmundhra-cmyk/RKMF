// 80G donation-receipt PDF (attached to the receipt email).
// Uses pdf-lib (pure JS, serverless-safe). Standard Helvetica fonts only — the
// rupee glyph (₹) isn't in WinAnsi, so amounts are prefixed "INR".
import { rupeesInWords, maskPan } from "./receipt";

const ORG = {
  name: "RKM Foundation",
  tagline: "Registered Charitable Trust",
  reg: "E-30560",
  pan: "AACTR4271L",
  twelveA: "47522",
  eightyG: "CITE80G9792014-152016-17",
};

const NOTE =
  "Donations to RKM Foundation are eligible for deduction under Section 80G of the Income Tax Act, 1961. This is a provisional receipt; the statutory 80G certificate (Form 10BE) will be issued by 31 May following the financial year.";

export async function receiptPdfBytes(a: {
  receiptNo: string;
  issuedDate: string;
  donorName: string;
  pan?: string | null;
  amountPaise: number;
  paymentMode?: string | null;
  paymentRef?: string | null;
  fund: string;
  fy: string;
}): Promise<Uint8Array> {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const doc = await PDFDocument.create();
  const W = 420, H = 595; // A5 portrait (pt)
  const page = doc.addPage([W, H]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const ital = await doc.embedFont(StandardFonts.HelveticaOblique);

  const ink = rgb(0.1, 0.1, 0.1);
  const grey = rgb(0.42, 0.42, 0.42);
  const copper = rgb(0.576, 0.314, 0.169);
  const M = 38;
  let y = H - 48;

  const center = (text: string, f: typeof font, size: number, color = ink) => {
    const w = f.widthOfTextAtSize(text, size);
    page.drawText(text, { x: (W - w) / 2, y, size, font: f, color });
  };

  center(ORG.name, bold, 18, ink); y -= 15;
  center(ORG.tagline, font, 9, grey); y -= 12;
  center(`Reg. ${ORG.reg}   PAN ${ORG.pan}   12A ${ORG.twelveA}`, font, 7.5, grey); y -= 10;
  center(`80G Reg. ${ORG.eightyG}`, font, 7.5, grey); y -= 16;

  page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 1, color: copper }); y -= 16;
  center("DONATION RECEIPT", bold, 11, copper); y -= 26;

  const amount = "INR " + (a.amountPaise / 100).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const rows: [string, string, boolean][] = [
    ["Receipt No.", a.receiptNo, true],
    ["Date", a.issuedDate, false],
    ["Received from", a.donorName, true],
    ["Donor PAN", maskPan(a.pan), false],
  ];
  for (const [k, v, b] of rows) {
    page.drawText(k, { x: M, y, size: 9.5, font, color: grey });
    page.drawText(v, { x: M + 120, y, size: 9.5, font: b ? bold : font, color: ink });
    y -= 20;
  }

  // Amount (emphasised)
  page.drawText("Amount", { x: M, y, size: 9.5, font, color: grey });
  page.drawText(amount, { x: M + 120, y, size: 15, font: bold, color: copper }); y -= 18;

  // Amount in words (wrapped)
  page.drawText("In words", { x: M, y, size: 9.5, font, color: grey });
  const words = wrap(rupeesInWords(a.amountPaise), ital, 9, W - M - (M + 120));
  for (let i = 0; i < words.length; i++) {
    page.drawText(words[i], { x: M + 120, y: y - i * 13, size: 9, font: ital, color: ink });
  }
  y -= Math.max(20, words.length * 13 + 6);

  const rows2: [string, string][] = [
    ["Payment mode / ref", `${a.paymentMode || "online"}${a.paymentRef ? " / " + a.paymentRef : ""}`],
    ["Fund", a.fund],
    ["Financial year", a.fy],
  ];
  for (const [k, v] of rows2) {
    page.drawText(k, { x: M, y, size: 9.5, font, color: grey });
    page.drawText(v, { x: M + 120, y, size: 9.5, font, color: ink });
    y -= 20;
  }

  y -= 8;
  page.drawRectangle({ x: M, y: y - noteHeight(NOTE, font, 8.5, W - 2 * M - 20) - 6, width: W - 2 * M, height: noteHeight(NOTE, font, 8.5, W - 2 * M - 20) + 14, color: rgb(0.98, 0.965, 0.94), borderColor: rgb(0.91, 0.86, 0.78), borderWidth: 0.8 });
  let ny = y - 2;
  for (const line of wrap(NOTE, font, 8.5, W - 2 * M - 20)) {
    page.drawText(line, { x: M + 10, y: ny, size: 8.5, font, color: rgb(0.27, 0.27, 0.27) });
    ny -= 12;
  }

  y = 38;
  center("Computer-generated receipt — no signature required.  rkm.support", font, 7.5, grey);

  return doc.save();
}

function wrap(text: string, f: any, size: number, maxW: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (f.widthOfTextAtSize(test, size) > maxW && line) { lines.push(line); line = w; }
    else line = test;
  }
  if (line) lines.push(line);
  return lines;
}
function noteHeight(text: string, f: any, size: number, maxW: number): number {
  return wrap(text, f, size, maxW).length * 12;
}
