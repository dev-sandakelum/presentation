import { NextResponse } from 'next/server'
import { getLocalIP } from '@/lib/host'
import { WS_PORT } from '@/lib/ws-server'

export const dynamic = 'force-dynamic'

export function GET() {
  const ip = getLocalIP()
  const httpPort = 3000
  return NextResponse.json({
    ip,
    port: httpPort,
    // Display (laptop) connects via localhost — avoids firewall blocking LAN IP self-connections
    wsLocalUrl: `ws://localhost:${WS_PORT}`,
    // Remote (phone) connects via LAN IP
    wsUrl: `ws://${ip}:${WS_PORT}`,
    remoteUrl: `http://${ip}:${httpPort}/remote`,
    displayUrl: `http://${ip}:${httpPort}/display`,
  })
}
