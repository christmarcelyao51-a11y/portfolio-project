/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "same-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const productionCsp = {
  key: "Content-Security-Policy",
  value:
    "default-src 'self'; img-src 'self' data: https:; media-src 'self' https:; " +
    "script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' " +
    (process.env.NEXT_PUBLIC_API_BASE_URL || "") +
    "; frame-ancestors 'none'; base-uri 'self';",
};

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_MEDIA_HOST || "localhost",
      },
    ],
  },
  async headers() {
    const headers = process.env.NODE_ENV === "production"
      ? [...securityHeaders, productionCsp]
      : securityHeaders;
    return [{ source: "/:path*", headers }];
  },
};

module.exports = nextConfig;
