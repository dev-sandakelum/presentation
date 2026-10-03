'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { DisplayScene, DisplayState, RemoteMessage, ServerMessage } from '@/lib/state'
import { DEFAULT_STATE } from '@/lib/state'

export type ConnectionStatus = 'connecting' | 'ready' | 'sending' | 'offline'

interface UseStageLinkOptions {
  /** Full WS URL including presentation path, e.g. ws://192.168.1.5:3000/ws/azure-ai */
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
  const failCountRef = useRef(0)

  const onStateRef = useRef(onState)
  onStateRef.current = onState

  const connect = useCallback(() => {
    if (!wsUrl || !mountedRef.current) return

    setStatus('connecting')

    // After repeated proxy failures, fall back to the standalone port 4821
    // by replacing :3000/wss/ with :4821/
    let url = wsUrl
    if (failCountRef.current >= 2) {
      url = wsUrl
        .replace(/:3000\/wss\//, ':4821/')
        .replace(/:3000\/ws\//, ':4821/')
    }

    console.log(`[stagelink] connecting to ${url} (attempt ${failCountRef.current + 1})`)
    const ws = new WebSocket(url)
    wsRef.current = ws

    ws.onopen = () => {
      if (!mountedRef.current) return
      console.log('[stagelink] connected ✓')
      failCountRef.current = 0
      setStatus('ready')
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
        onStateRef.current?.(msg.state)
        setStatus('ready')
      } else if (msg.type === 'ack') {
        setLastAckAt(msg.updatedAt)
        setStatus('ready')
      }
    }

    ws.onclose = (ev) => {
      if (!mountedRef.current) return
      console.log(`[stagelink] closed — code=${ev.code} reason="${ev.reason}"`)
      clearInterval(pingTimer.current ?? undefined)
      failCountRef.current++
      setStatus('offline')
      reconnectTimer.current = setTimeout(connect, RECONNECT_DELAY)
    }

    ws.onerror = (ev) => {
      console.log('[stagelink] error', ev)
      ws.close()
    }
  }, [wsUrl])

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
