/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Optionally configure images:
  images: {
    // domains: ['example.com'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
