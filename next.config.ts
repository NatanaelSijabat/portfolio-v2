import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Content is fully static, so every content route is prerendered at build time.
  experimental: {
    cpus: 1,
  },
  async headers() {
    return [
      {
        // The resume is a downloadable asset; keep it inline-renderable but explicit.
        source: "/resume.pdf",
        headers: [
          { key: "Content-Type", value: "application/pdf" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
