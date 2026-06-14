"use client";
// Client helpers for the interim admin console (M3). The shared token lives in
// sessionStorage and is sent as x-admin-token on every admin API call.

const TOKEN_KEY = "rkm_admin_token";

export function getToken(): string {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(TOKEN_KEY) ?? "";
}

export function setToken(t: string) {
  sessionStorage.setItem(TOKEN_KEY, t.trim());
}

export async function adminFetch(path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(path, {
    ...init,
    headers: { ...(init.headers as Record<string, string> | undefined), "x-admin-token": getToken() },
  });
}

export async function downloadCsv(path: string, filename: string): Promise<void> {
  const r = await adminFetch(path);
  if (!r.ok) {
    const j = await r.json().catch(() => null);
    throw new Error(j?.error ?? `download failed (${r.status})`);
  }
  const blob = await r.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function inr(paise?: number | null): string {
  return "₹" + ((paise ?? 0) / 100).toLocaleString("en-IN");
}
