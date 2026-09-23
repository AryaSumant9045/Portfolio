import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The dev-tools badge was being injected into the production page as a
  // nextjs-portal element; it has no business on a portfolio.
  devIndicators: false,
  turbopack: {
    // Pins the workspace root to this project so Next.js does not walk up to a
    // stray lockfile in the home directory while resolving modules.
    root: __dirname,
  },
};

export default nextConfig;
