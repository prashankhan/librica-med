import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

/** App root — fixes wrong workspace inference when a parent folder has its own package-lock.json */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: projectRoot,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v5.airtableusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dl.airtable.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
