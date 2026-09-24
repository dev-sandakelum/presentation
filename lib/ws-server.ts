/**
 * Standalone WebSocket server on port 4821.
 * Started once from instrumentation.ts when Next.js boots.
 */

import { WebSocketServer, WebSocket } from 'ws'
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

let started = false

export function startWsServer() {
  if (started) return
  started = true

  const wss = new WebSocketServer({ port: WS_PORT, host: '0.0.0.0' })

  wss.on('connection', (ws: WebSocket) => {
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
        // Ack the sender so it knows the round-trip completed
        ws.send(JSON.stringify({ type: 'ack', updatedAt: displayState.updatedAt } satisfies ServerMessage))
        // Broadcast the new state to ALL connected clients (including display)
        // This is the single source of truth — everyone updates from server state
        broadcast({ type: 'state', state: displayState })
      }
    })

    ws.on('close', () => clients.delete(ws))
    ws.on('error', () => clients.delete(ws))
  })

  wss.on('listening', () => {
    const ip = getLocalIP()
    console.log(`\n  ✦ WS server ready   ws://${ip}:${WS_PORT}`)
    console.log(`  ✦ Phone remote      http://${ip}:3000/remote\n`)
  })

  wss.on('error', (err) => {
    console.error('WS server error:', err.message)
  })
}
