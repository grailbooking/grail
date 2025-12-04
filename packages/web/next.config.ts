import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export mode - uncomment for production build
  // output: 'export',
  // distDir: 'out',
  images: {
    unoptimized: true,
  },
  typedRoutes: true,
};

export default nextConfig;
