import { escapeHtml } from "./guard";
const LABELS: Record<string, string> = {
  newsletter: "Newsletter Subscription",
  volunteer: "Other Ways to Give — Enquiry",
  csr: "CSR Partnership Enquiry",
  partner: "NGO Partnership Enquiry",
  careers: "Careers — Application",
  contact: "Contact Enquiry",
  "fundraiser-create": "New Fundraiser Request",
  unsubscribe: "Unsubscribe Request",
};

export async function sendFormEmail(formType: string, data: Record<string, string>) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.FORMS_TO_EMAIL || "info@rkm.support";
  const from = process.env.FORMS_FROM_EMAIL || "onboarding@resend.dev";
  const label = LABELS[formType] ?? formType;

  const rows = Object.entries(data)
    .filter(([k]) => k !== "formType")
    .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600;text-transform:capitalize">${k.replace(/_/g, " ")}</td><td style="padding:6px 12px">${String(v)}</td></tr>`)
    .join("");

  if (!key) {
    console.log(`[forms] (email not configured) ${label}:`, JSON.stringify(data));
    return { ok: true, skipped: true };
  }
  const { Resend } = await import("resend");
  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: `RKM Website <${from}>`,
    to: [to],
    replyTo: data.email || undefined,
    subject: `[Website] ${label}`,
    html: `<h2 style="font-family:sans-serif">${label}</h2><table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows}</table>`,
  });
  if (error) throw new Error(error.message);
  return { ok: true };
}
