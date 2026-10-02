'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { DisplayScene, DisplayState, RemoteMessage, ServerMessage } from '@/lib/state'
import { DEFAULT_STATE } from '@/lib/state'

export type ConnectionStatus = 'connecting' | 'ready' | 'sending' | 'offline'

interface UseStageLinkOptions {
  wsUrl: string | null   // null = don't connect yet
  onState?: (state: DisplayState) => void
}

interface UseStageLinkReturn {
  state: DisplayState
  status: ConnectionStatus
  sendScene: (scene: DisplayScene) => void
  lastAckAt: number | null
}

const RECONNECT_DELAY = 3000
const PING_INTERVAL = 25000

export function useStageLink({ wsUrl, onState }: UseStageLinkOptions): UseStageLinkReturn {
  const [state, setState] = useState<DisplayState>(DEFAULT_STATE)
  const [status, setStatus] = useState<ConnectionStatus>('connecting')
  const [lastAckAt, setLastAckAt] = useState<number | null>(null)

  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pingTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const mountedRef = useRef(true)

  // Keep onState in a ref so it never needs to be a dep of `connect`.
  // This prevents a reconnect loop when the caller passes an inline arrow function.
  const onStateRef = useRef(onState)
  onStateRef.current = onState

  const connect = useCallback(() => {
    if (!wsUrl || !mountedRef.current) return

    setStatus('connecting')
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws

    ws.onopen = () => {
      if (!mountedRef.current) return
      setStatus('ready')

      // Keepalive ping
      pingTimer.current = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          const ping: RemoteMessage = { type: 'ping' }
          ws.send(JSON.stringify(ping))
        }
      }, PING_INTERVAL)
    }

    ws.onmessage = (event) => {
      if (!mountedRef.current) return
      let msg: ServerMessage
      try {
        msg = JSON.parse(event.data as string) as ServerMessage
      } catch {
        return
      }

      if (msg.type === 'state') {
        setState(msg.state)
        // Always call the latest version of onState via the ref — never stale
        onStateRef.current?.(msg.state)
        setStatus('ready')
      } else if (msg.type === 'ack') {
        setLastAckAt(msg.updatedAt)
        setStatus('ready')
      }
      // pong is just a keepalive echo, no action needed
    }

    ws.onclose = () => {
      if (!mountedRef.current) return
      clearInterval(pingTimer.current ?? undefined)
      setStatus('offline')
      reconnectTimer.current = setTimeout(connect, RECONNECT_DELAY)
    }

    ws.onerror = () => {
      ws.close()
    }
  }, [wsUrl]) // onState intentionally excluded — accessed via ref

  useEffect(() => {
    mountedRef.current = true
    if (wsUrl) connect()

    return () => {
      mountedRef.current = false
      clearTimeout(reconnectTimer.current ?? undefined)
      clearInterval(pingTimer.current ?? undefined)
      wsRef.current?.close()
    }
  }, [wsUrl, connect])

  const sendScene = useCallback((scene: DisplayScene) => {
    const ws = wsRef.current
    if (!ws || ws.readyState !== WebSocket.OPEN) return
    setStatus('sending')
    const msg: RemoteMessage = { type: 'set-scene', scene }
    ws.send(JSON.stringify(msg))
  }, [])

  return { state, status, sendScene, lastAckAt }
}
