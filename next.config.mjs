import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// The DentAI "Field Study" runs as a separate Next.js zone and is mounted under
// /study. In dev it proxies to the local dentai-landing server; in production
// set DENTAI_URL to its deployment URL.
const DENTAI_URL = process.env.DENTAI_URL || "http://localhost:3002";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  async rewrites() {
    return [
      { source: "/study", destination: `${DENTAI_URL}/study` },
      { source: "/study/:path*", destination: `${DENTAI_URL}/study/:path*` },
    ];
  },
};

export default nextConfig;
