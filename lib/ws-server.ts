/**
 * Standalone WebSocket server on port 4821.
 * Started once from instrumentation.ts when Next.js boots.
 *
 * Also exports `attachWsProxy` which hooks into the Next.js HTTP server so
 * the phone can reach the WS server via ws://<ip>:3000/ws — no extra firewall
 * rule needed beyond the one that already allows port 3000.
 */

import { WebSocketServer, WebSocket } from 'ws'
import type { IncomingMessage } from 'http'
import type { Duplex } from 'stream'
import type { Server } from 'http'
import type { DisplayState, RemoteMessage, ServerMessage } from './state'
import { DEFAULT_STATE } from './state'
import { getLocalIP } from './host'

export const WS_PORT = 4821

let displayState: DisplayState = { ...DEFAULT_STATE, updatedAt: Date.now() }
const clients = new Set<WebSocket>()

function broadcast(msg: ServerMessage) {
  const raw = JSON.stringify(msg)
  for (const ws of clients) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(raw)
    }
  }
}

/** The single WSS instance, created in startWsServer(). */
let wss: WebSocketServer | null = null
let started = false

function handleClient(ws: WebSocket) {
  clients.add(ws)
  ws.send(JSON.stringify({ type: 'state', state: displayState } satisfies ServerMessage))

  ws.on('message', (raw) => {
    let msg: RemoteMessage
    try {
      msg = JSON.parse(raw.toString()) as RemoteMessage
    } catch {
      return
    }

    if (msg.type === 'ping') {
      ws.send(JSON.stringify({ type: 'pong' } satisfies ServerMessage))
      return
    }

    if (msg.type === 'set-scene') {
      displayState = { scene: msg.scene, updatedAt: Date.now() }
      ws.send(JSON.stringify({ type: 'ack', updatedAt: displayState.updatedAt } satisfies ServerMessage))
      broadcast({ type: 'state', state: displayState })
    }
  })

  ws.on('close', () => clients.delete(ws))
  ws.on('error', () => clients.delete(ws))
}

export function startWsServer() {
  if (started) return
  started = true

  wss = new WebSocketServer({ port: WS_PORT, host: '0.0.0.0' })
  wss.on('connection', handleClient)

  wss.on('listening', () => {
    const ip = getLocalIP()
    console.log(`\n  ✦ WS server ready   ws://${ip}:${WS_PORT}`)
    console.log(`  ✦ Phone remote      http://${ip}:3000/remote\n`)
  })

  wss.on('error', (err) => {
    console.error('WS server error:', err.message)
  })
}

/**
 * Attach a WebSocket upgrade listener to the Next.js HTTP server.
 * Requests to ws://<host>:3000/ws are handled here — tunnelled into the same
 * shared state/broadcast logic as the standalone server.
 *
 * This is what lets the phone connect on port 3000 without needing port 4821
 * to be open through the firewall.
 */
export function attachWsProxy(httpServer: Server) {
  // A no-port WSS that only handles manually upgraded connections
  const proxyWss = new WebSocketServer({ noServer: true })
  proxyWss.on('connection', handleClient)

  httpServer.on('upgrade', (req: IncomingMessage, socket: Duplex, head: Buffer) => {
    const url = req.url ?? ''
    if (url === '/ws' || url.startsWith('/ws?')) {
      proxyWss.handleUpgrade(req, socket, head, (ws) => {
        proxyWss.emit('connection', ws, req)
      })
    }
    // All other upgrade requests (Next.js HMR, etc.) are left untouched
  })
}
