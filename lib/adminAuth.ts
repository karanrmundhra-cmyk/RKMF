import { throttle } from "./guard";

// Admin auth: static shared token in the x-admin-token header, with a per-IP
// rate limit to slow brute-force attempts. Returns false when the env token is
// unset so admin surfaces are dead by default.
export function requireAdmin(req: Request): boolean {
  const expected = process.env.ADMIN_ACCESS_TOKEN;
  if (!expected) return false;

  // Brute-force guard: cap admin auth checks per IP per minute. A real operator
  // never approaches this; rapid guessing does, and gets blocked for the window.
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "?";
  if (!throttle(`admin-auth:${ip}`, 30)) return false;

  const got = req.headers.get("x-admin-token");
  return !!got && got === expected;
}
