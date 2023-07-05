/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bee-brick-test.s3.eu-central-1.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig
