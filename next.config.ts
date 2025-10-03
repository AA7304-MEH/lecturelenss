import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Removed static export for API routes compatibility
  // output: 'export',
  // trailingSlash: true,
  // skipTrailingSlashRedirect: true,
  // distDir: 'out',
  
  // Production optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Image optimization (disabled for static export)
  images: {
    unoptimized: true,
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
