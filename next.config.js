/** @types {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ['en', 'ru', 'uk', 'be', 'wookie'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig
