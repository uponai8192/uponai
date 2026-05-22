import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  allowedDevOrigins: ['website.upon-ai.com'],
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  outputFileTracingRoot: __dirname,
  async redirects() {
    return [
      {
        source:
          "/post/uponai-blog-post-ai-voice-agent-partnership-technology-innovation-1352-3649-2921-6239-2724-3515",
        destination:
          "/post/built-a-multilingual-ai-receptionist-in-under-24-hours-our-client-fired-27243515",
        permanent: true,
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.cdn.filesafe.space",
      },
    ],
  },
  experimental: {
    devtoolSegmentExplorer: false,
  },
};

export default nextConfig;
