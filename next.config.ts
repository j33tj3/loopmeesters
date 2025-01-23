import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BASIC_API_URL: process.env.BASIC_API_URL,
  },
};

export default nextConfig;
