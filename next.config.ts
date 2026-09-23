import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    // Pins the workspace root to this project so Next.js does not walk up to a
    // stray lockfile in the home directory while resolving modules.
    root: __dirname,
  },
};

export default nextConfig;
