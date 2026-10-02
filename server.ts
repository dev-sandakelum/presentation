/**
 * Custom Next.js server.
 * Boots the Next.js app on port 3000 and attaches the WebSocket upgrade
 * handler so the phone can connect via ws://<ip>:3000/ws — no extra port
 * or firewall rule required beyond what port 3000 already needs.
 *
 * The standalone WS server still runs on port 4821 for local (laptop) use.
 *
 * Run with:  npx tsx server.ts
 * Or set "dev": "tsx server.ts" in package.json scripts.
 */

import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { startWsServer, attachWsProxy } from './lib/ws-server'

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT ?? '3000', 10)

// Signal to instrumentation.ts that the custom server is managing WS startup
process.env.CUSTOM_SERVER = '1'

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  // Start the standalone WS server on port 4821
  startWsServer()

  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    handle(req, res, parsedUrl)
  })

  // Attach the /ws upgrade proxy — phone connects here on port 3000
  attachWsProxy(httpServer)

  httpServer.listen(port, '0.0.0.0', () => {
    console.log(`\n  ✦ Next.js ready     http://localhost:${port}`)
  })
})
