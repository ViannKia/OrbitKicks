import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow local /public images (default) + external sources if needed later
    remotePatterns: [],
    // Unoptimized for local dev placeholder images
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
