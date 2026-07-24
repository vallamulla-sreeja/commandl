/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vedaversetopicvideos.blob.core.windows.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Add other Next.js config options here
};

module.exports = nextConfig; 