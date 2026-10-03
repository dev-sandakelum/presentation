'use client'

import { useEffect, useRef, useState } from 'react'
import { Radio, WifiOff, ChevronLeft, ChevronRight, MonitorPlay } from 'lucide-react'
import { useStageLink, type ConnectionStatus } from '@/hooks/useStageLink'
import type { DisplayScene, PresentationMeta } from '@/lib/state'

// ── Azure AI slide list ──────────────────────────────────────────────────────

const azureScenes = [
  { type: 'az-01-title'              as const, label: 'Title',              description: 'From Prompt to AI Agent'          },
  { type: 'az-02-hook'               as const, label: 'The Hook',           description: 'What if AI could do more?'        },
  { type: 'az-03-thought-experiment' as const, label: 'Thought Experiment', description: 'One goal, five steps'             },
  { type: 'az-04-foundation'         as const, label: 'Foundation',         description: 'Start with the AI model'          },
  { type: 'az-05-prompt-engineering' as const, label: 'Prompt Eng.',        description: 'A better prompt changes result'   },
  { type: 'az-06-turning-point'      as const, label: 'Turning Point',      description: "When AI doesn't know"            },
  { type: 'az-07-add-knowledge'      as const, label: 'Add Knowledge',      description: 'RAG — relevant information'       },
  { type: 'az-08-campusmate'         as const, label: 'CampusMate',         description: 'Demo — university assistant'      },
  { type: 'az-09-ai-lesson'          as const, label: 'AI Lesson',          description: "Doesn't need to answer everything"},
  { type: 'az-10-give-it-tools'      as const, label: 'Give It Tools',      description: 'Know vs. do'                      },
  { type: 'az-11-ingredients'        as const, label: 'Ingredients',        description: 'What makes an agent?'            },
  { type: 'az-12-azure'              as const, label: 'Azure',              description: 'Build with Microsoft Azure'       },
  { type: 'az-13-live-build'         as const, label: 'Live Build',         description: 'Build CampusMate live'           },
  { type: 'az-14-architecture'       as const, label: 'Architecture',       description: 'Behind the experience'           },
  { type: 'az-15-challenge'          as const, label: 'Challenge',          description: 'Design your own agent'           },
  { type: 'az-16-responsible-ai'     as const, label: 'Responsible AI',     description: 'Capability needs boundaries'     },
  { type: 'az-17-journey'            as const, label: 'The Journey',        description: 'Prompt → Agent recap'            },
  { type: 'az-18-closing'            as const, label: 'Closing',            description: "Don't just use AI"              },
]

// ── Next.js Unlocked slide list ──────────────────────────────────────────────

const nxScenes = [
  { type: 'nx-01-title'                as const, label: 'Title',                    description: 'Next.js Unlocked'                       },
  { type: 'nx-02-presenter'            as const, label: 'Presenter',                description: 'Introducing your host'                   },
  { type: 'nx-03-agenda'               as const, label: 'Agenda',                   description: 'What we\'ll cover today'                 },
  { type: 'nx-04-what-is-nextjs'       as const, label: 'What is Next.js?',         description: 'The React framework for the web'         },
  { type: 'nx-05-react-baseline'       as const, label: 'React Baseline',           description: 'Did you know about React?'               },
  { type: 'nx-06-library-vs-framework' as const, label: 'Library vs Framework',     description: 'The key insight'                         },
  { type: 'nx-07-csr'                  as const, label: 'CSR',                      description: 'How React works — Client-Side Rendering' },
  { type: 'nx-08-ssr'                  as const, label: 'SSR',                      description: 'Server-Side Rendering explained'         },
  { type: 'nx-09-react-vs-nextjs'      as const, label: 'React vs Next.js',         description: 'Head to head comparison'                 },
  { type: 'nx-10-new-features'         as const, label: 'New Features',             description: 'What\'s new in Next.js 13+'              },
  { type: 'nx-11-app-router'           as const, label: 'App Router',               description: 'Deep dive — file-based routing'          },
  { type: 'nx-12-routing-patterns'     as const, label: 'Routing Patterns',         description: 'Three ways to shape a route'             },
  { type: 'nx-13-server-components'    as const, label: 'Server Components',        description: 'The new default — RSC'                   },
  { type: 'nx-14-server-client-boundary' as const, label: 'Server/Client Boundary', description: 'Where the line is drawn'                 },
  { type: 'nx-15-data-fetching'        as const, label: 'Data Fetching',            description: 'Before & after — async components'      },
  { type: 'nx-16-create-command'       as const, label: 'Create Command',           description: 'One command to start'                    },
  { type: 'nx-17-create-result'        as const, label: 'Create Result',            description: 'What gets scaffolded'                    },
  { type: 'nx-18-file-structure'       as const, label: 'File Structure',           description: 'Anatomy of a Next.js project'            },
  { type: 'nx-19-run-dev-server'       as const, label: 'Run Dev Server',           description: 'npm run dev'                             },
  { type: 'nx-20-live-demo-phases'     as const, label: 'Live Demo — Phases',       description: 'Five phases — scaffold to full-stack'    },
  { type: 'nx-21-demo-run-route'       as const, label: 'Demo: Run & Route',        description: 'Phase 1 — scaffold & first route'        },
  { type: 'nx-22-demo-interactivity'   as const, label: 'Demo: Interactivity',      description: 'Phase 2 — client components'             },
  { type: 'nx-23-demo-repository'      as const, label: 'Demo: Follow Along',       description: 'Phase 3 — repo & resources'              },
  { type: 'nx-24-demo-api-and-fetch'   as const, label: 'Demo: API & Fetch',        description: 'Phase 4 — server data & API routes'      },
  { type: 'nx-25-common-pitfalls'      as const, label: 'Common Pitfalls',          description: 'Mistakes to avoid'                       },
  { type: 'nx-26-recap'                as const, label: 'Recap',                    description: 'What we covered'                         },
  { type: 'nx-27-resources'            as const, label: 'Resources',                description: 'Links & further reading'                  },
  { type: 'nx-28-end'                  as const, label: 'Questions?',               description: 'Part 1 of 3 complete'                    },
]

// ── Scene list per presentation id ──────────────────────────────────────────

const SCENE_LISTS: Record<string, { type: string; label: string; description: string }[]> = {
  'azure-ai':        azureScenes,
  'nextjs-unlocked': nxScenes,
}

// ── Status helpers ───────────────────────────────────────────────────────────

function statusDot(s: ConnectionStatus) {
  if (s === 'offline') return 'bg-red-400'
  if (s === 'connecting' || s === 'sending') return 'bg-amber-300 animate-pulse'
  return 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
}
function statusText(s: ConnectionStatus) {
  if (s === 'offline')    return 'Offline'
  if (s === 'connecting') return 'Connecting…'
  if (s === 'sending')    return 'Sending…'
  return 'Live'
}
function statusRing(s: ConnectionStatus) {
  if (s === 'offline')    return 'border-red-400/30 bg-red-400/10 text-red-400'
  if (s === 'connecting' || s === 'sending') return 'border-amber-400/30 bg-amber-400/10 text-amber-300'
  return 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
}

// ── Component ────────────────────────────────────────────────────────────────

interface HostInfo { ip: string; port: number; wsUrl: string; remoteUrl: string; displayUrl: string }

export default function RemotePageClient({ pres }: { pres: PresentationMeta }) {
  const [wsUrl,    setWsUrl]    = useState<string | null>(null)
  const [hostInfo, setHostInfo] = useState<HostInfo | null>(null)
  const [lastLabel, setLastLabel] = useState('')
  const listRef = useRef<HTMLDivElement>(null)

  // For HTML presentations: track slide index locally
  const [htmlIdx, setHtmlIdx] = useState(0)

  useEffect(() => {
    fetch(`/api/host-info?presId=${pres.id}`)
      .then(r => r.json())
      .then((d: HostInfo) => { setHostInfo(d); setWsUrl(d.wsUrl) })
      .catch(() => setWsUrl(`ws://localhost:4821/${pres.id}`))
  }, [pres.id])

  const { state, status, sendScene } = useStageLink({ wsUrl })

  // Resolve which scene list to use
  const scenes = SCENE_LISTS[pres.id] ?? null
  const isHtml = pres.kind === 'html'
  const total  = pres.slideCount ?? 1

  // ── Named-scene presentation (react) ────────────────────────────────────

  function sendNamedScene(type: string, label?: string) {
    sendScene({ type } as DisplayScene)
    if (label) setLastLabel(label)
  }

  const activeType = state.scene.type
  const activeIdx  = scenes ? scenes.findIndex(s => s.type === activeType) : -1

  function sendAdjacent(dir: 1 | -1) {
    if (!scenes) return
    const next = scenes[Math.max(0, Math.min(scenes.length - 1, activeIdx + dir))]
    if (next) sendNamedScene(next.type, next.label)
  }

  // sync htmlIdx from WS state
  useEffect(() => {
    if (state.scene.type === 'html-slide') {
      setHtmlIdx((state.scene as { type: 'html-slide'; index: number }).index)
    }
  }, [state.scene])

  // ── HTML presentation (numeric index) ────────────────────────────────────

  function sendHtmlSlide(index: number) {
    const clamped = Math.max(0, Math.min(total - 1, index))
    setHtmlIdx(clamped)
    sendScene({ type: 'html-slide', index: clamped })
    setLastLabel(`Slide ${clamped + 1}`)
  }

  // scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>('[data-active="true"]')
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [activeType, htmlIdx])

  const progress = isHtml
    ? (htmlIdx + 1) / total
    : scenes && activeIdx >= 0
      ? (activeIdx + 1) / scenes.length
      : 0

  const currentLabel = isHtml
    ? `Slide ${htmlIdx + 1}`
    : (scenes?.find(s => s.type === activeType)?.label ?? activeType.replace(/-/g, ' '))
  const currentDesc = isHtml
    ? pres.subtitle
    : (scenes?.find(s => s.type === activeType)?.description ?? '')

  const accent = pres.color

  // Prev/next disabled states
  const prevDisabled = isHtml ? htmlIdx <= 0         : activeIdx <= 0
  const nextDisabled = isHtml ? htmlIdx >= total - 1 : !scenes || activeIdx >= scenes.length - 1

  return (
    <main className="h-[100dvh] bg-[#07090f] text-white flex flex-col overflow-hidden select-none">

      {/* ambient blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-24 w-72 h-72 rounded-full" style={{ background: `radial-gradient(circle,${accent}1e,transparent 70%)` }} />
        <div className="absolute -bottom-24 -left-20 w-64 h-64 rounded-full" style={{ background: `radial-gradient(circle,${accent}14,transparent 70%)` }} />
      </div>

      {/* ── HEADER ── */}
      <header className="relative z-10 flex items-center justify-between px-4 pt-5 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="grid size-8 place-items-center rounded-xl border" style={{ background: `${accent}26`, borderColor: `${accent}40` }}>
            <Radio className="size-4" style={{ color: accent }} />
          </div>
          <div>
            <div className="text-sm font-semibold leading-none">stage<span style={{ color: accent }}>link</span></div>
            <div className="mt-0.5 font-mono text-[9px] tracking-[0.2em] text-slate-600 truncate max-w-[140px]">{pres.title.toUpperCase()}</div>
          </div>
        </div>

        <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wider ${statusRing(status)}`}>
          {status === 'offline' ? <WifiOff className="size-2.5" /> : <span className={`size-1.5 rounded-full flex-shrink-0 ${statusDot(status)}`} />}
          {statusText(status)}
          {status === 'ready' && lastLabel && <span className="ml-1 opacity-50 truncate max-w-[80px]">· {lastLabel}</span>}
        </div>
      </header>

      {/* ── NOW SHOWING ── */}
      <div className="relative z-10 mx-4 mb-3 flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.04] px-4 py-3">
        <MonitorPlay className="size-4 text-slate-600 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-slate-100 leading-tight">{currentLabel}</div>
          <div className="truncate font-mono text-[10px] text-slate-600 mt-0.5">{currentDesc}</div>
        </div>
        <div className="font-mono text-[10px] text-slate-600 flex-shrink-0 tabular-nums">
          {isHtml
            ? String(htmlIdx + 1).padStart(2, '0')
            : activeIdx >= 0 ? String(activeIdx + 1).padStart(2, '0') : '--'}
          <span className="opacity-40"> / {String(total).padStart(2, '0')}</span>
        </div>
      </div>

      {/* progress */}
      <div className="relative z-10 mx-4 mb-4 h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress * 100}%`, background: `linear-gradient(90deg, ${accent}, ${accent}88)` }} />
      </div>

      {/* ── PREV / NEXT ── */}
      <div className="relative z-10 mx-4 mb-4 grid grid-cols-2 gap-3">
        <button
          onClick={() => isHtml ? sendHtmlSlide(htmlIdx - 1) : sendAdjacent(-1)}
          disabled={prevDisabled}
          className="group relative flex items-center justify-center gap-2 h-16 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.03] text-slate-300 font-semibold text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_12px_rgba(0,0,0,0.4)] active:scale-[0.96] active:translate-y-[1px] disabled:opacity-30 disabled:pointer-events-none transition-all duration-100 ease-out hover:border-white/20 hover:bg-white/[0.08]"
        >
          <ChevronLeft className="size-5 transition-transform group-active:-translate-x-0.5" />
          Prev
        </button>
        <button
          onClick={() => isHtml ? sendHtmlSlide(htmlIdx + 1) : sendAdjacent(1)}
          disabled={nextDisabled}
          className="group relative flex items-center justify-center gap-2 h-16 rounded-2xl border font-semibold text-base shadow-[0_4px_12px_rgba(0,0,0,0.4)] active:scale-[0.96] active:translate-y-[1px] disabled:opacity-30 disabled:pointer-events-none transition-all duration-100 ease-out"
          style={{ borderColor: `${accent}50`, background: `linear-gradient(to bottom, ${accent}33, ${accent}1a)`, color: accent }}
        >
          Next
          <ChevronRight className="size-5 transition-transform group-active:translate-x-0.5" />
        </button>
      </div>

      {/* ── SLIDE LIST ── */}
      <div
        ref={listRef}
        className="remote-scroll relative z-10 mx-4 flex-1 overflow-y-auto rounded-2xl border border-white/[0.07] bg-white/[0.03] overscroll-contain"
        style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        <div className="sticky top-0 z-10 border-b border-white/[0.06] bg-[#07090f]/90 px-4 py-2.5 backdrop-blur-sm">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-600">Slides</span>
        </div>

        <div className="flex flex-col divide-y divide-white/[0.04]">
          {isHtml
            ? /* HTML presentation: numbered list */
              Array.from({ length: total }, (_, i) => {
                const isActive = i === htmlIdx
                return (
                  <button
                    key={i}
                    data-active={isActive}
                    onClick={() => sendHtmlSlide(i)}
                    className={`group relative flex w-full items-center gap-3 px-4 py-3.5 text-left transition-all duration-100 ease-out active:scale-[0.985] active:bg-white/[0.06] ${isActive ? 'bg-white/[0.06] text-white' : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'}`}
                  >
                    {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 rounded-r-full" style={{ background: accent, boxShadow: `0 0 10px ${accent}b3` }} />}
                    <span className="font-mono text-[11px] tabular-nums w-5 flex-shrink-0" style={{ color: isActive ? accent : undefined }}>{String(i + 1).padStart(2, '0')}</span>
                    <span className="size-1.5 rounded-full flex-shrink-0 transition-all" style={{ background: isActive ? accent : undefined, opacity: isActive ? 1 : 0.3 }} />
                    <div className="min-w-0 flex-1">
                      <div className={`text-[14px] font-semibold leading-tight truncate ${isActive ? 'text-white' : ''}`}>Slide {i + 1}</div>
                    </div>
                    {isActive && <ChevronRight className="size-4 flex-shrink-0" style={{ color: `${accent}99` }} />}
                  </button>
                )
              })
            : /* React presentation: named scenes */
              (scenes ?? []).map((scene, index) => {
                const isActive = activeType === scene.type
                return (
                  <button
                    key={scene.type}
                    data-active={isActive}
                    onClick={() => sendNamedScene(scene.type, scene.label)}
                    className={`group relative flex w-full items-center gap-3 px-4 py-3.5 text-left transition-all duration-100 ease-out active:scale-[0.985] active:bg-white/[0.06] ${isActive ? 'text-white' : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'}`}
                    style={isActive ? { background: `${accent}12` } : undefined}
                  >
                    {isActive && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 rounded-r-full"
                        style={{ background: accent, boxShadow: `0 0 10px ${accent}b3` }}
                      />
                    )}
                    <span
                      className="font-mono text-[11px] tabular-nums w-5 flex-shrink-0"
                      style={{ color: isActive ? accent : '#334155' }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="size-1.5 rounded-full flex-shrink-0 transition-all"
                      style={{
                        background: isActive ? accent : '#334155',
                        boxShadow: isActive ? `0 0 8px ${accent}cc` : undefined,
                        transform: isActive ? 'scale(1.25)' : undefined,
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className={`text-[14px] font-semibold leading-tight truncate ${isActive ? 'text-white' : ''}`}>
                        {scene.label}
                      </div>
                      <div className="truncate text-[11px] text-slate-600 mt-0.5 font-normal">{scene.description}</div>
                    </div>
                    {isActive && (
                      <ChevronRight className="size-4 flex-shrink-0" style={{ color: `${accent}99` }} />
                    )}
                  </button>
                )
              })
          }
        </div>
      </div>

      {/* ── HOST INFO footer ── */}
      <div className="relative z-10 mx-4 mt-3 mb-4 flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-2.5">
        <a href="/" className="font-mono text-[10px] text-slate-600 hover:text-slate-400 transition-colors">← All presentations</a>
        <div className="font-mono text-[10px] text-slate-700">{hostInfo ? `${hostInfo.ip} · :${hostInfo.port}` : 'detecting…'}</div>
      </div>

    </main>
  )
}
