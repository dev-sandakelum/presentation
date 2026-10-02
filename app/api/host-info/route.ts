import { NextResponse } from 'next/server'
import { getLocalIP } from '@/lib/host'
import { WS_PORT, WS_PROXY_PATH } from '@/lib/ws-server'

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
    // Display (laptop) connects via localhost on the standalone port — avoids LAN self-connection issues
    wsLocalUrl: `ws://localhost:${WS_PORT}/${presId}`,
    // Remote (phone) connects via the /wss proxy on port 3000 — avoids collision with Next.js /ws HMR
    wsUrl: `ws://${ip}:${httpPort}${WS_PROXY_PATH}/${presId}`,
    remoteUrl: `http://${ip}:${httpPort}/remote/${presId}`,
    displayUrl: `http://${ip}:${httpPort}/display/${presId}`,
  })
}
