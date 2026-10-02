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
  // Azure AI session slides
  | { type: 'az-01-title' }
  | { type: 'az-02-hook' }
  | { type: 'az-03-thought-experiment' }
  | { type: 'az-04-foundation' }
  | { type: 'az-05-prompt-engineering' }
  | { type: 'az-06-turning-point' }
  | { type: 'az-07-add-knowledge' }
  | { type: 'az-08-campusmate' }
  | { type: 'az-09-ai-lesson' }
  | { type: 'az-10-give-it-tools' }
  | { type: 'az-11-ingredients' }
  | { type: 'az-12-azure' }
  | { type: 'az-13-live-build' }
  | { type: 'az-14-architecture' }
  | { type: 'az-15-challenge' }
  | { type: 'az-16-responsible-ai' }
  | { type: 'az-17-journey' }
  | { type: 'az-18-closing' }

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
