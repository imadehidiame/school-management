import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    domains: ['lh3.googleusercontent.com','localhost','localhost:8999','images.pexels.com'],
  },
  experimental: {
    outputFileTracing: true,
  },
  output:'standalone',
  port: 8999,
};

export default nextConfig;
