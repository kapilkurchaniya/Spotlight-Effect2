/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Transpile Three.js packages for proper ES module support
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
}

export default nextConfig
