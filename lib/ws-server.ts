/**
 * Standalone WebSocket server on port 4821.
 * Started once from instrumentation.ts when Next.js boots.
 *
 * Supports multiple presentations simultaneously — each client joins a
 * "room" identified by the presentation ID passed as the WS path:
 *   ws://<host>:4821/<presentationId>
 *   ws://<host>:3000/ws/<presentationId>   (via the /ws proxy)
 *
 * State is kept per-presentation so display + remote for presentation A
 * are isolated from display + remote for presentation B.
 */

import { WebSocketServer, WebSocket } from 'ws'
import type { IncomingMessage } from 'http'
import type { Duplex } from 'stream'
import type { Server } from 'http'
import type { DisplayState, RemoteMessage, ServerMessage } from './state'
import { DEFAULT_STATE } from './state'
import { getLocalIP } from './host'

export const WS_PORT = 4821

// ── Per-presentation state ────────────────────────────────────────────────────

const presStates = new Map<string, DisplayState>()
const presClients = new Map<string, Set<WebSocket>>()

function getState(presId: string): DisplayState {
  if (!presStates.has(presId)) {
    presStates.set(presId, { ...DEFAULT_STATE, updatedAt: Date.now() })
  }
  return presStates.get(presId)!
}

function getClients(presId: string): Set<WebSocket> {
  if (!presClients.has(presId)) presClients.set(presId, new Set())
  return presClients.get(presId)!
}

function broadcast(presId: string, msg: ServerMessage) {
  const raw = JSON.stringify(msg)
  for (const ws of getClients(presId)) {
    if (ws.readyState === WebSocket.OPEN) ws.send(raw)
  }
}

/** Extract the presentation ID from a WS request URL.
 *  e.g. /ws/azure-ai  →  "azure-ai"
 *       /azure-ai      →  "azure-ai"
 *       /              →  "default"
 */
function presIdFromUrl(url: string | undefined): string {
  if (!url) return 'default'
  // strip leading /ws or /ws/
  const clean = url.replace(/^\/ws\/?/, '').replace(/^\//, '').split('?')[0]
  return clean || 'default'
}

// ── Connection handler ────────────────────────────────────────────────────────

function handleClient(ws: WebSocket, req: IncomingMessage) {
  const presId = presIdFromUrl(req.url)
  const clients = getClients(presId)
  clients.add(ws)

  // Send current state for this presentation immediately
  ws.send(JSON.stringify({ type: 'state', state: getState(presId) } satisfies ServerMessage))

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
      const next: DisplayState = { scene: msg.scene, updatedAt: Date.now() }
      presStates.set(presId, next)
      ws.send(JSON.stringify({ type: 'ack', updatedAt: next.updatedAt } satisfies ServerMessage))
      broadcast(presId, { type: 'state', state: next })
    }
  })

  ws.on('close', () => clients.delete(ws))
  ws.on('error', () => clients.delete(ws))
}

// ── Server lifecycle ──────────────────────────────────────────────────────────

let wss: WebSocketServer | null = null
let started = false

export function startWsServer() {
  if (started) return
  started = true

  wss = new WebSocketServer({ port: WS_PORT, host: '0.0.0.0' })
  wss.on('connection', handleClient)

  wss.on('listening', () => {
    const ip = getLocalIP()
    console.log(`\n  ✦ WS server ready   ws://${ip}:${WS_PORT}/<presentationId>`)
    console.log(`  ✦ Phone remote      http://${ip}:3000/remote/<presentationId>\n`)
  })

  wss.on('error', (err) => {
    console.error('WS server error:', err.message)
  })
}

/**
 * Attach a WebSocket upgrade listener to the Next.js HTTP server.
 * Requests to ws://<host>:3000/ws/<presentationId> are forwarded here.
 */
export function attachWsProxy(httpServer: Server) {
  const proxyWss = new WebSocketServer({ noServer: true })
  proxyWss.on('connection', handleClient)

  httpServer.on('upgrade', (req: IncomingMessage, socket: Duplex, head: Buffer) => {
    const url = req.url ?? ''
    if (url === '/ws' || url.startsWith('/ws?') || url.startsWith('/ws/')) {
      proxyWss.handleUpgrade(req, socket, head, (ws) => {
        proxyWss.emit('connection', ws, req)
      })
    }
  })
}
