import { networkInterfaces } from 'os'

/**
 * Returns the best non-loopback IPv4 address on this machine.
 *
 * Scoring (higher = better):
 *  +35  Preferred physical adapter name (Wi-Fi, Ethernet, en0, wlan, eth…)
 *  +20  Unknown real adapter (not in virtual list)
 *  +20  192.168.x.x  — most common home/office LAN
 *  +15  10.x.x.x     — common enterprise LAN
 *  +10  172.16-31.x  — less common private range
 *  -40  Known virtual-only subnet (192.168.56.x VirtualBox, 192.168.99.x Docker)
 *  -50  Virtual / tunnel adapter name (VMware, VirtualBox, Hyper-V, TAP, WSL…)
 *
 * Rejects malformed addresses (wrong octet count or values outside 0-255).
 */
export function getLocalIP(): string {
  const nets = networkInterfaces()

  const virtualPrefixes = [
    'vmware', 'vbox', 'virtualbox', 'hyperv', 'vethernet',
    'loopback', 'tap', 'tun', 'wsl', 'docker', 'vlan',
    'host-only', 'hostonly',
  ]

  // Subnets used exclusively by VM host-only / Docker networks — phones can't reach these
  const virtualSubnets = [
    '192.168.56.',  // VirtualBox host-only default
    '192.168.99.',  // Docker Machine / older VirtualBox
  ]

  const preferredNames = [
    'wi-fi', 'wifi', 'wlan', 'wireless',
    'ethernet', 'en0', 'en1', 'eth0', 'eth1',
  ]

  interface Candidate { ip: string; score: number }
  const candidates: Candidate[] = []

  for (const [name, addrs] of Object.entries(nets)) {
    const nameLC = name.toLowerCase()
    const isVirtual   = virtualPrefixes.some((p) => nameLC.includes(p))
    const isPreferred = preferredNames.some((p) => nameLC.includes(p))

    for (const addr of addrs ?? []) {
      if (addr.family !== 'IPv4' || addr.internal) continue

      const ip = addr.address

      // Reject malformed: must be exactly 4 octets each in 0-255
      const octets = ip.split('.')
      if (octets.length !== 4) continue
      if (octets.some((o) => { const n = Number(o); return isNaN(n) || n < 0 || n > 255 })) continue

      let score = 0

      if (isVirtual)        score -= 50
      else if (isPreferred) score += 35
      else                  score += 20  // unknown real adapter — still usable

      // Penalise known VM-only subnets regardless of adapter name
      if (virtualSubnets.some((s) => ip.startsWith(s))) score -= 40

      if (ip.startsWith('192.168.'))                   score += 20
      else if (ip.startsWith('10.'))                   score += 15
      else if (/^172\.(1[6-9]|2\d|3[01])\./.test(ip)) score += 10

      candidates.push({ ip, score })
    }
  }

  if (candidates.length === 0) return '127.0.0.1'

  candidates.sort((a, b) => b.score - a.score)
  return candidates[0].ip
}
