import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/uptick",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
