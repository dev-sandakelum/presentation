import { networkInterfaces } from 'os'

/**
 * Collect every non-loopback, valid IPv4 address on this machine so Next.js
 * allows cross-origin HMR requests from phones/tablets on the same network.
 * next.config is evaluated at startup, so this list is always up-to-date.
 */
function getAllLocalIPs() {
  const nets = networkInterfaces()
  const ips = []
  for (const addrs of Object.values(nets)) {
    for (const addr of addrs ?? []) {
      if (addr.family !== 'IPv4' || addr.internal) continue
      const octets = addr.address.split('.')
      if (octets.length !== 4) continue
      if (octets.some(o => { const n = Number(o); return isNaN(n) || n < 0 || n > 255 })) continue
      ips.push(addr.address)
    }
  }
  return ips
}

const localIPs = getAllLocalIPs()

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Allow all local network interfaces so phones can load HMR resources in dev.
  // Next.js 15 requires exact IPs/hostnames — no wildcards.
  allowedDevOrigins: localIPs,
}

export default nextConfig
