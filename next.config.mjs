/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Allow the phone (LAN IP) to load dev resources without cross-origin block
  allowedDevOrigins: ['192.168.0.218', '10.161.79.82'],
}

export default nextConfig
