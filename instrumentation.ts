/**
 * Next.js instrumentation hook — runs once when the Node.js server starts.
 * Starts the standalone WebSocket server on port 4821.
 */

export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return

  const { startWsServer } = await import('./lib/ws-server')
  startWsServer()
}
