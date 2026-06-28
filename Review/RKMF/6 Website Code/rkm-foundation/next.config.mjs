/** @type {import('next').NextConfig} */
// Content-Security-Policy. Allows the third parties the site actually uses:
// Razorpay checkout, Google Fonts, and Supabase. 'unsafe-inline'/'unsafe-eval'
// are required by Next.js's runtime + the GSAP/Framer motion layer; a strict
// nonce-based policy is a later hardening step.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com https://*.razorpay.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://*.razorpay.com https://*.supabase.co https://lumberjack.razorpay.com",
  "frame-src 'self' https://*.razorpay.com https://api.razorpay.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  images: { unoptimized: false },
  async redirects() {
    return [
      { source: '/shop-for-a-cause', destination: '/shop', permanent: true },
      { source: '/shop-coming-soon', destination: '/shop', permanent: true },
      { source: '/donate', destination: '/donate-now', permanent: true },
      { source: '/blogs', destination: '/blog', permanent: true },
    ];
  },
};
export default nextConfig;
