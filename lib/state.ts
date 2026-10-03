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
  // Next.js Unlocked slides
  | { type: 'nx-01-title' }
  | { type: 'nx-02-presenter' }
  | { type: 'nx-03-agenda' }
  | { type: 'nx-04-what-is-nextjs' }
  | { type: 'nx-05-react-baseline' }
  | { type: 'nx-06-library-vs-framework' }
  | { type: 'nx-07-csr' }
  | { type: 'nx-08-ssr' }
  | { type: 'nx-09-react-vs-nextjs' }
  | { type: 'nx-10-new-features' }
  | { type: 'nx-11-app-router' }
  | { type: 'nx-12-routing-patterns' }
  | { type: 'nx-13-server-components' }
  | { type: 'nx-14-server-client-boundary' }
  | { type: 'nx-15-data-fetching' }
  | { type: 'nx-16-create-command' }
  | { type: 'nx-17-create-result' }
  | { type: 'nx-18-file-structure' }
  | { type: 'nx-19-run-dev-server' }
  | { type: 'nx-20-live-demo-phases' }
  | { type: 'nx-21-demo-run-route' }
  | { type: 'nx-22-demo-interactivity' }
  | { type: 'nx-23-demo-repository' }
  | { type: 'nx-24-demo-api-and-fetch' }
  | { type: 'nx-25-common-pitfalls' }
  | { type: 'nx-26-recap' }
  | { type: 'nx-27-resources' }
  | { type: 'nx-28-end' }
  // HTML-iframe based presentations: scene is just a slide index
  | { type: 'html-slide'; index: number }

export type DisplayState = {
  scene: DisplayScene
  updatedAt: number
}

// Messages remote → display
export type RemoteMessage =
  | { type: 'set-scene'; scene: DisplayScene }
  | { type: 'ping' }

// Messages display → remote (now scoped to a presentation)
export type ServerMessage =
  | { type: 'state'; state: DisplayState }
  | { type: 'ack'; updatedAt: number }
  | { type: 'pong' }
  | { type: 'error'; message: string }

export const DEFAULT_STATE: DisplayState = {
  scene: { type: 'welcome' },
  updatedAt: Date.now(),
}

// ── Presentation registry ─────────────────────────────────────────────────────

export type PresentationKind = 'react' | 'html'

export interface PresentationMeta {
  id: string
  title: string
  subtitle: string
  kind: PresentationKind
  /** For html kind: path relative to /public (e.g. "/demo/2.html") */
  htmlPath?: string
  /** Total number of slides — used by the remote control */
  slideCount: number
  color: string   // accent colour for the picker card
}

export const PRESENTATIONS: PresentationMeta[] = [
  {
    id: 'azure-ai',
    title: 'From Prompt to AI Agent',
    subtitle: 'Azure AI · Microsoft Learn Student Ambassadors',
    kind: 'react',
    slideCount: 18,
    color: '#4da3ff',
  },
  {
    id: 'nextjs-unlocked',
    title: 'Next.js Unlocked',
    subtitle: 'Part 1 of 3 — Concepts · Microsoft Learn Student Ambassadors',
    kind: 'react',
    slideCount: 28,
    color: '#ffffff',
  },
]

export function getPresentationById(id: string): PresentationMeta | undefined {
  return PRESENTATIONS.find((p) => p.id === id)
}
