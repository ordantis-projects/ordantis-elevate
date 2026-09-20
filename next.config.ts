import type { NextConfig } from "next";

const isPreviewBuild = process.env.ORDANTIS_DEPLOYMENT === "preview";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  turbopack: { root: process.cwd() },
  // Optional limit for local audits on machines with little available memory.
  ...(process.env.ORDANTIS_BUILD_CPUS === "2" ? { experimental: { cpus: 2 } } : {}),
  async redirects() {
    return [
      { source: "/services", destination: "/capacidades", permanent: true },
      { source: "/about", destination: "/empresa", permanent: true },
      { source: "/assessment", destination: "/diagnostico", permanent: true },
      { source: "/privacy", destination: "/privacidad", permanent: true }
    ];
  },
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      ...(isPreviewBuild
        ? [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet" }]
        : [])
    ];
    return [
      // Explicit root also covers runtimes that do not match an empty path*.
      { source: "/", headers: securityHeaders },
      {
        source: "/:path*",
        headers: securityHeaders
      }
    ];
  }
};

export default nextConfig;
