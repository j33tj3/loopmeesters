import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BEN_ERBIJ_BASE_URL: process.env.BEN_ERBIJ_BASE_URL,
  },
};

export default nextConfig;
