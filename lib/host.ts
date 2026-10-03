import { networkInterfaces } from 'os'

/**
 * Returns the best non-loopback IPv4 address on this machine.
 *
 * Scoring (higher = better):
 *  +30  Real physical adapter (not virtual)
 *  +20  192.168.x.x  — most common home/office LAN
 *  +15  10.x.x.x     — common enterprise LAN
 *  +10  172.16-31.x  — less common private range
 *   0   anything else non-loopback (public IPs, link-local, etc.)
 *  -50  Virtual / tunnel adapters (VMware, VirtualBox, Hyper-V, TAP, WSL, etc.)
 *
 * Also rejects malformed addresses (octets out of 0-255 range, wrong octet count).
 */
export function getLocalIP(): string {
  const nets = networkInterfaces()

  // Adapter name fragments that indicate virtual / tunnel interfaces
  const virtualPrefixes = [
    'vmware', 'vbox', 'virtualbox', 'hyperv', 'vethernet',
    'loopback', 'tap', 'tun', 'wsl', 'docker', 'vlan',
  ]

  interface Candidate { ip: string; score: number }
  const candidates: Candidate[] = []

  for (const [name, addrs] of Object.entries(nets)) {
    const nameLC = name.toLowerCase()
    const isVirtual = virtualPrefixes.some((p) => nameLC.includes(p))

    for (const addr of addrs ?? []) {
      if (addr.family !== 'IPv4' || addr.internal) continue

      const ip = addr.address

      // Validate: must be exactly 4 octets, each 0-255
      const octets = ip.split('.')
      if (octets.length !== 4) continue
      if (octets.some((o) => { const n = Number(o); return isNaN(n) || n < 0 || n > 255 })) continue

      let score = 0

      if (!isVirtual) score += 30
      else            score -= 50

      if (ip.startsWith('192.168.'))                         score += 20
      else if (ip.startsWith('10.'))                         score += 15
      else if (/^172\.(1[6-9]|2\d|3[01])\./.test(ip))       score += 10

      candidates.push({ ip, score })
    }
  }

  if (candidates.length === 0) return '127.0.0.1'

  // Sort descending by score — highest wins
  candidates.sort((a, b) => b.score - a.score)
  return candidates[0].ip
}
