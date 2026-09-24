/**
 * Shared state types used by both the WS server and client hooks.
 */

export type DisplayScene =
  | { type: 'welcome' }
  | { type: 'closing' }
  | { type: 'poll-live' }
  | { type: 'concept-carousel'; control?: 'play' | 'pause' | 'next' | 'prev' | 'stop'; seq?: number }
  | { type: 'demo-loading' }
  | { type: 'answer-reveal'; count: number; total: number }
  | { type: 'recap'; primary: number; secondary: number; rate: number }
  | { type: 'message'; text: string; sub?: string }
  | { type: 'concept-card'; index: number; total: number }

export type DisplayState = {
  scene: DisplayScene
  updatedAt: number
}

// Messages remote → display
export type RemoteMessage =
  | { type: 'set-scene'; scene: DisplayScene }
  | { type: 'ping' }

// Messages display → remote
export type ServerMessage =
  | { type: 'state'; state: DisplayState }
  | { type: 'ack'; updatedAt: number }
  | { type: 'pong' }
  | { type: 'error'; message: string }

export const DEFAULT_STATE: DisplayState = {
  scene: { type: 'welcome' },
  updatedAt: Date.now(),
}
