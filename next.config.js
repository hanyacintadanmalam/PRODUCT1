/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['source.unsplash.com'],
  },
  typescript: {
    // !! PERINGATAN !!
    // Jangan hapus ini!
    // Ini bukan pilihan terbaik di dunia produksi, tetapi berfungsi untuk tujuan pembelajaran/demo.
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
