/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Allow any LAN device to load dev resources without cross-origin block
  allowedDevOrigins: [
    '192.168.0.218',
    '10.161.79.82',
    '*.local',
    '10.*',
    '192.168.*',
  ],
}

export default nextConfig
