import { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default config;
