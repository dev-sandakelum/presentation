import { networkInterfaces } from 'os'

/**
 * Returns the best non-loopback IPv4 address on this machine.
 * Prefers addresses in the 192.168.x.x / 10.x.x.x / 172.16-31.x.x ranges
 * that are NOT associated with virtual adapters (VMware, VirtualBox, Hyper-V).
 */
export function getLocalIP(): string {
  const nets = networkInterfaces()
  const candidates: string[] = []

  // Names of virtual adapter prefixes to deprioritise
  const virtualPrefixes = ['vmware', 'vbox', 'virtualbox', 'hyperv', 'vethernet', 'loopback']

  for (const [name, addrs] of Object.entries(nets)) {
    const nameLC = name.toLowerCase()
    const isVirtual = virtualPrefixes.some((p) => nameLC.includes(p))

    for (const addr of addrs ?? []) {
      if (addr.family !== 'IPv4' || addr.internal) continue

      const ip = addr.address
      const isPrivate =
        ip.startsWith('192.168.') ||
        ip.startsWith('10.')      ||
        /^172\.(1[6-9]|2\d|3[01])\./.test(ip)

      if (!isPrivate) continue

      if (!isVirtual) {
        // Preferred: real adapters first
        candidates.unshift(ip)
      } else {
        candidates.push(ip)
      }
    }
  }

  return candidates[0] ?? '127.0.0.1'
}
