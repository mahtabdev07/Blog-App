import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*",
      },
    ],
    domains: ["rwvfilm.com"],
  },
};

export default nextConfig;
