import { NextResponse } from 'next/server'
import { getLocalIP } from '@/lib/host'
import { WS_PORT } from '@/lib/ws-server'

export const dynamic = 'force-dynamic'

export function GET(req: Request) {
  const ip = getLocalIP()
  const httpPort = 3000
  const url = new URL(req.url)
  const presId = url.searchParams.get('presId') ?? 'default'

  return NextResponse.json({
    ip,
    port: httpPort,
    presId,
    // Display (laptop) connects via localhost to avoid LAN self-connection firewall issues
    wsLocalUrl: `ws://localhost:${WS_PORT}/${presId}`,
    // Remote (phone) connects via the /ws proxy on port 3000 — no extra firewall rule needed
    wsUrl: `ws://${ip}:${httpPort}/ws/${presId}`,
    remoteUrl: `http://${ip}:${httpPort}/remote/${presId}`,
    displayUrl: `http://${ip}:${httpPort}/display/${presId}`,
  })
}
