/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "user-images.githubusercontent.com", // Github
    ],
  },
  experimental: {
    runtime: 'experimental-edge',
  },
};

module.exports = nextConfig;
