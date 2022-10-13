/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'picsum.photos', 'lh3.googleusercontent.com'],
  },
  experimental: {
    images: {
      allowFutureImage: true
    }
},
}

module.exports = {
  images: {
    domains: ['firebasestorage.googleapis.com', 'picsum.photos', 'lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig
