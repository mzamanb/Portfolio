import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ebook-walnut-50035687.figma.site",
        pathname: "/_assets/**",
      },
    ],
  },
};

export default nextConfig;
