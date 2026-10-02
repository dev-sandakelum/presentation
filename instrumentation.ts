/**
 * Next.js instrumentation hook — runs once when the Node.js server starts.
 *
 * When using the custom server (server.ts / `pnpm dev`), startWsServer() is
 * called there directly and the /ws proxy is also attached to the HTTP server.
 *
 * This file is kept as a fallback for `next dev` / `next start` without the
 * custom server — it still starts the standalone WS on port 4821, but the
 * /ws proxy won't be available (phone must reach port 4821 directly).
 */

export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return

  // Only start here when NOT using the custom server (which calls it itself)
  if (process.env.CUSTOM_SERVER) return

  const { startWsServer } = await import('./lib/ws-server')
  startWsServer()
}
