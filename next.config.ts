/**
 * Cloudflare Pages Configuration for NCERT Nest
 * 
 * This config enables Next.js 16 with App Router on Cloudflare Pages.
 * Uses the experimental "react compilation mode" and stabilizaton
 * 
 * @see https://developers.cloudflare.com/pages/framework-guides/nextjs/
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  experimental: {
    appDir: true,
    turboAllowErrors: true,
  },
  // Cloudflare-specific output format
  output: "export",
};

export default nextConfig;