/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  tailwindcss: {
    enabled: true,
  },
  api: {
    bodyParser: false
  },
}

module.exports = nextConfig
