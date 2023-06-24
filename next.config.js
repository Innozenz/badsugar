/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  tailwindcss: {
    enabled: true,
  },
  api: {
    bodyParser: false
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://badsugar.vercel.app/:path*',
      },
    ]
  },
}

module.exports = nextConfig
