// Lightweight per-instance throttle (serverless best-effort; upgrade to Upstash for global limits)
const hits = new Map<string, number[]>();

export function throttle(key: string, maxPerMinute = 6) {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < 60_000);
  if (arr.length >= maxPerMinute) return false;
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 5000) hits.clear(); // memory cap
  return true;
}

export function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

export type Rule = { required?: boolean; email?: boolean; max?: number };

export function validate(data: Record<string, unknown>, rules: Record<string, Rule>) {
  const clean: Record<string, string> = {};
  for (const [field, rule] of Object.entries(rules)) {
    const raw = data[field];
    const v = typeof raw === "string" ? raw.trim() : "";
    if (rule.required && !v) return { error: `Missing field: ${field}` };
    if (v && rule.email && !EMAIL_RE.test(v)) return { error: "Invalid email address" };
    if (v) clean[field] = v.slice(0, rule.max ?? 2000);
  }
  return { clean };
}
