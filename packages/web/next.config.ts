import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export mode - uncomment for production build
  // output: 'export',
  // distDir: 'out',
  images: {
    unoptimized: true,
  },
  typedRoutes: true,
  turbopack: {
    root: path.join(__dirname, '../..'),
  },
};

export default nextConfig;
