'use client'

import { useEffect, useRef, useState } from 'react'
import { Radio, WifiOff, ChevronLeft, ChevronRight, MonitorPlay } from 'lucide-react'
import { useStageLink, type ConnectionStatus } from '@/hooks/useStageLink'
import type { DisplayScene } from '@/lib/state'

const scenes = [
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

interface HostInfo { ip: string; port: number; wsUrl: string; remoteUrl: string; displayUrl: string }

/* ─── status helpers ─── */
function statusDot(s: ConnectionStatus) {
  if (s === 'offline')                       return 'bg-red-400'
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

export default function RemotePage() {
  const [wsUrl, setWsUrl] = useState<string | null>(null)
  const [hostInfo, setHostInfo] = useState<HostInfo | null>(null)
  const [lastSceneLabel, setLastSceneLabel] = useState<string>('')
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/host-info')
      .then(r => r.json())
      .then((d: HostInfo) => { setHostInfo(d); setWsUrl(d.wsUrl) })
      .catch(() => setWsUrl('ws://localhost:4821'))
  }, [])

  const { state, status, sendScene } = useStageLink({ wsUrl })
  const active = state.scene.type

  function send(scene: DisplayScene, label?: string) {
    sendScene(scene)
    if (label) setLastSceneLabel(label)
  }

  const slideTypes = scenes.map(s => s.type)
  const activeIdx  = slideTypes.indexOf(active as (typeof slideTypes)[number])

  function sendAdjacent(dir: 1 | -1) {
    const next = slideTypes[Math.max(0, Math.min(slideTypes.length - 1, activeIdx + dir))]
    if (next) send({ type: next } as DisplayScene, scenes.find(s => s.type === next)?.label)
  }

  // scroll active slide button into view when it changes
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>('[data-active="true"]')
    el?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [active])

  const currentScene = scenes.find(s => s.type === active)
  const progress = activeIdx >= 0 ? (activeIdx + 1) / scenes.length : 0

  return (
    <main className="h-[100dvh] bg-[#07090f] text-white flex flex-col overflow-hidden select-none">

      {/* ambient blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-24 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(77,163,255,0.12),transparent_70%)]" />
        <div className="absolute -bottom-24 -left-20 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(124,93,250,0.10),transparent_70%)]" />
      </div>

      {/* ── HEADER ── */}
      <header className="relative z-10 flex items-center justify-between px-4 pt-5 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="grid size-8 place-items-center rounded-xl bg-cyan-400/15 border border-cyan-400/25">
            <Radio className="size-4 text-cyan-400" />
          </div>
          <div>
            <div className="text-sm font-semibold leading-none">stage<span className="text-cyan-400">link</span></div>
            <div className="mt-0.5 font-mono text-[9px] tracking-[0.2em] text-slate-600">REMOTE</div>
          </div>
        </div>

        {/* status pill */}
        <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wider ${statusRing(status)}`}>
          {status === 'offline'
            ? <WifiOff className="size-2.5" />
            : <span className={`size-1.5 rounded-full flex-shrink-0 ${statusDot(status)}`} />
          }
          {statusText(status)}
          {status === 'ready' && lastSceneLabel && (
            <span className="ml-1 opacity-50 truncate max-w-[80px]">· {lastSceneLabel}</span>
          )}
        </div>
      </header>

      {/* ── NOW SHOWING strip ── */}
      <div className="relative z-10 mx-4 mb-3 flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.04] px-4 py-3">
        <MonitorPlay className="size-4 text-slate-600 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-slate-100 leading-tight">
            {currentScene?.label ?? active.replace(/-/g, ' ')}
          </div>
          <div className="truncate font-mono text-[10px] text-slate-600 mt-0.5">
            {currentScene?.description ?? ''}
          </div>
        </div>
        <div className="font-mono text-[10px] text-slate-600 flex-shrink-0 tabular-nums">
          {activeIdx >= 0 ? String(activeIdx + 1).padStart(2, '0') : '--'}
          <span className="opacity-40"> / {String(scenes.length).padStart(2, '0')}</span>
        </div>
      </div>

      {/* progress bar */}
      <div className="relative z-10 mx-4 mb-4 h-[3px] rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 transition-all duration-500"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* ── BIG PREV / NEXT ── */}
      <div className="relative z-10 mx-4 mb-4 grid grid-cols-2 gap-3">
        <button
          onClick={() => sendAdjacent(-1)}
          disabled={activeIdx <= 0}
          className="
            group relative flex items-center justify-center gap-2
            h-16 rounded-2xl border border-white/10
            bg-gradient-to-b from-white/[0.07] to-white/[0.03]
            text-slate-300 font-semibold text-base
            shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_12px_rgba(0,0,0,0.4)]
            active:scale-[0.96] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]
            active:translate-y-[1px]
            disabled:opacity-30 disabled:pointer-events-none
            transition-all duration-100 ease-out
            hover:border-white/20 hover:bg-white/[0.08]
          "
        >
          <ChevronLeft className="size-5 transition-transform group-active:-translate-x-0.5" />
          Prev
        </button>
        <button
          onClick={() => sendAdjacent(1)}
          disabled={activeIdx >= scenes.length - 1}
          className="
            group relative flex items-center justify-center gap-2
            h-16 rounded-2xl border border-blue-400/30
            bg-gradient-to-b from-blue-500/20 to-blue-500/10
            text-blue-300 font-semibold text-base
            shadow-[inset_0_1px_0_rgba(96,165,250,0.2),0_4px_12px_rgba(0,0,0,0.4)]
            active:scale-[0.96] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]
            active:translate-y-[1px]
            disabled:opacity-30 disabled:pointer-events-none
            transition-all duration-100 ease-out
            hover:border-blue-400/50 hover:bg-blue-500/25
          "
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
          {scenes.map((scene, index) => {
            const isActive = active === scene.type
            return (
              <button
                key={scene.type}
                data-active={isActive}
                onClick={() => send({ type: scene.type } as DisplayScene, scene.label)}
                className={`
                  group relative flex w-full items-center gap-3 px-4 py-3.5 text-left
                  transition-all duration-100 ease-out
                  active:scale-[0.985] active:bg-white/[0.06]
                  ${isActive
                    ? 'bg-blue-500/12 text-white'
                    : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                  }
                `}
              >
                {/* active accent bar */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 rounded-r-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.7)]" />
                )}

                {/* number */}
                <span className={`font-mono text-[11px] tabular-nums w-5 flex-shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-700'}`}>
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* dot */}
                <span className={`size-1.5 rounded-full flex-shrink-0 transition-all ${
                  isActive
                    ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)] scale-125'
                    : 'bg-slate-700 group-active:bg-slate-500'
                }`} />

                {/* label */}
                <div className="min-w-0 flex-1">
                  <div className={`text-[14px] font-semibold leading-tight truncate ${isActive ? 'text-white' : ''}`}>
                    {scene.label}
                  </div>
                  <div className="truncate text-[11px] text-slate-600 mt-0.5 font-normal">
                    {scene.description}
                  </div>
                </div>

                {/* active chevron */}
                {isActive && (
                  <ChevronRight className="size-4 text-blue-400/60 flex-shrink-0" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── HOST INFO footer ── */}
      <div className="relative z-10 mx-4 mt-3 mb-4 flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-2.5">
        <div className="font-mono text-[10px] text-slate-700 truncate">
          {hostInfo ? `${hostInfo.ip} · :${hostInfo.port}` : 'detecting host…'}
        </div>
        <div className="font-mono text-[10px] tracking-[0.14em] text-slate-700">
          NO CLOUD · LOCAL WIFI
        </div>
      </div>

    </main>
  )
}
