// Interim admin auth (M3): static shared token in the x-admin-token header.
// Supabase Auth RBAC replaces this in M4. Returns false when env is unset so
// admin surfaces are dead by default.
export function requireAdmin(req: Request): boolean {
  const expected = process.env.ADMIN_ACCESS_TOKEN;
  if (!expected) return false;
  const got = req.headers.get("x-admin-token");
  return !!got && got === expected;
}
