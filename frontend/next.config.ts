import type { NextConfig } from "next";

// ── Security Headers ─────────────────────────────────────────────────────────
// Applied to every response. These protect against XSS, clickjacking,
// MIME sniffing, and force HTTPS in production.
const securityHeaders = [
  // Force HTTPS for 1 year (production only — harmless in dev)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // Prevent embedding the site in an iframe (clickjacking protection)
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // Prevent browsers from guessing the content type (MIME sniffing)
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Control referrer information sent with requests
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Disable unused browser APIs (mic, camera, geolocation, etc.)
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  // Content Security Policy — controls what resources can load
  // Allows: self, Google Fonts, cdnjs (for pdfjs), and the nayafix.me API
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: self + Next.js inline scripts (needed for theme switching)
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Styles: self + Google Fonts + inline (needed for Next.js)
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts: Google Fonts CDN
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self + data URIs (for canvas/OG image)
      "img-src 'self' data: blob:",
      // API calls: self + nayafix.me backend + cdnjs (pdfjs worker)
      "connect-src 'self' https://nayafix.me http://localhost:8000 https://cdnjs.cloudflare.com",
      // Workers: for pdfjs background worker
      "worker-src 'self' blob: https://cdnjs.cloudflare.com",
      // Frames: none allowed
      "frame-src 'none'",
      // Objects: none
      "object-src 'none'",
      // Base URI: only self
      "base-uri 'self'",
      // Form actions: only self
      "form-action 'self'",
      // Upgrade insecure requests in production
      "upgrade-insecure-requests",
    ].join("; "),
  },
  // XSS filter (legacy browsers)
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // DNS prefetch control
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  // Prevent exposing Next.js version in response headers
  poweredByHeader: false,
};

export default nextConfig;
