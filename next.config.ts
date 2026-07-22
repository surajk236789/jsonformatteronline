import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compress: true,
  allowedDevOrigins: ['*', '192.168.1.4'],

  async headers() {
    return [
      {
        // Cache public files (SVGs, images, fonts, etc.) — 1 day + 7 day stale-while-revalidate
        source: '/(.*\\.(?:svg|ico|png|jpg|webp|avif|woff2|woff|ttf))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'jsondiff.space',
          },
        ],
        destination: 'https://www.allformatter.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
