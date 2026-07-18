import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compress: true,
  allowedDevOrigins: ['*', '192.168.1.4'],
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
