import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zamandesigns.com",
        pathname: "/_assets/**",
      },
    ],
  },
};

export default nextConfig;
