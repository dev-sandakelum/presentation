'use client'

import { useEffect, useState } from 'react'
import {
  ArrowLeft, ArrowRight, Check, Clapperboard, Eye,
  Layers3, MessageSquareText, Pause, Play, Radio,
  Send, Square, Wifi, WifiOff, MonitorPlay,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStageLink, type ConnectionStatus } from '@/hooks/useStageLink'
import type { DisplayScene } from '@/lib/state'

const scenes = [
  { type: 'welcome'          as const, label: 'Welcome',  description: 'Title screen' },
  { type: 'concept-carousel' as const, label: 'Concepts', description: 'Core terms carousel' },
  { type: 'demo-loading'     as const, label: 'Demo',     description: 'Live demo screen' },
  { type: 'poll-live'        as const, label: 'Poll',     description: 'Audience question' },
  { type: 'recap'            as const, label: 'Recap',    description: 'Session stats' },
  { type: 'closing'          as const, label: 'Closing',  description: 'Thank you screen' },
]

interface HostInfo { ip: string; port: number; wsUrl: string; remoteUrl: string; displayUrl: string }

function statusLabel(s: ConnectionStatus, lastScene?: string): string {
  if (s === 'connecting') return 'connecting…'
  if (s === 'sending')    return 'sending…'
  if (s === 'offline')    return 'offline — retrying'
  if (s === 'ready' && lastScene) return lastScene
  return 'ready'
}

function statusColor(s: ConnectionStatus) {
  if (s === 'offline')    return 'text-red-400 border-red-400/20 bg-red-400/10'
  if (s === 'sending')    return 'text-amber-300 border-amber-400/20 bg-amber-400/10'
  if (s === 'connecting') return 'text-amber-300 border-amber-400/20 bg-amber-400/10'
  return 'text-emerald-300 border-emerald-400/20 bg-emerald-400/10'
}

function dotColor(s: ConnectionStatus) {
  if (s === 'offline')    return 'bg-red-400'
  if (s === 'sending' || s === 'connecting') return 'bg-amber-300'
  return 'bg-emerald-400 shadow-[0_0_10px_#34d399]'
}

export default function RemotePage() {
  const [hostInfo, setHostInfo] = useState<HostInfo | null>(null)
  const [wsUrl, setWsUrl] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  const [subMessage, setSubMessage] = useState('')
  const [lastSceneLabel, setLastSceneLabel] = useState<string>('')
  const [carouselSeq, setCarouselSeq] = useState(0)

  useEffect(() => {
    fetch('/api/host-info')
      .then((r) => r.json())
      .then((d: HostInfo) => {
        setHostInfo(d)
        setWsUrl(d.wsUrl)
      })
      .catch(() => {
        setWsUrl('ws://localhost:4821')
      })
  }, [])

  const { state, status, sendScene } = useStageLink({ wsUrl })

  function send(scene: DisplayScene, label?: string) {
    sendScene(scene)
    if (label) setLastSceneLabel(label)
  }

  function sendCarousel(control: 'play' | 'pause' | 'next' | 'prev' | 'stop') {
    const seq = carouselSeq + 1
    setCarouselSeq(seq)
    send({ type: 'concept-carousel', control, seq }, `carousel · ${control}`)
  }

  function sendMessage() {
    if (!message.trim()) return
    send({ type: 'message', text: message.trim(), sub: subMessage.trim() || undefined }, 'message')
  }

  const active = state.scene.type

  return (
    <main className="min-h-screen bg-[#090a0f] text-white pb-10 selection:bg-cyan-300 selection:text-slate-950">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_78%_8%,rgba(81,64,174,0.2),transparent_31%),radial-gradient(circle_at_5%_65%,rgba(0,190,214,0.1),transparent_28%)]" />

      {/* header */}
      <header className="relative mx-auto flex max-w-lg items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-xl bg-cyan-300 text-slate-950 shadow-[0_0_22px_rgba(103,232,249,0.3)]">
            <Radio className="size-5" />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight">stage<span className="text-cyan-300">link</span></div>
            <div className="font-mono text-[9px] tracking-[0.22em] text-slate-500">REMOTE CONTROL</div>
          </div>
        </div>

        {/* connection badge */}
        <div className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider ${statusColor(status)}`}>
          {status === 'offline'
            ? <WifiOff className="size-3" />
            : <span className={`size-1.5 rounded-full ${dotColor(status)}`} />
          }
          {statusLabel(status, lastSceneLabel)}
        </div>
      </header>

      <div className="relative mx-auto max-w-lg space-y-4 px-5">

        {/* connection info */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Connection</div>
            <Wifi className="size-4 text-cyan-300" />
          </div>
          {hostInfo ? (
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300">
                <Check className="size-5" />
              </div>
              <div>
                <div className="text-sm font-medium">Display host</div>
                <div className="font-mono text-[10px] text-slate-500">{hostInfo.ip} · :{hostInfo.port}</div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500">Detecting host…</div>
          )}
          <div className="mt-4 border-t border-white/10 pt-4">
            <div className="text-[10px] text-slate-500 mb-2">Open on display (laptop):</div>
            <div className="font-mono text-xs text-cyan-300 break-all">
              {hostInfo ? hostInfo.displayUrl : '…'}
            </div>
          </div>
        </div>

        {/* now showing strip */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Now showing on display</div>
            <MonitorPlay className="size-4 text-slate-600" />
          </div>
          <div className="flex items-center gap-3">
            <div className={`size-2.5 rounded-full flex-shrink-0 ${status === 'ready' ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : status === 'offline' ? 'bg-red-400' : 'bg-amber-300'}`} />
            <div>
              <div className="text-sm font-semibold text-slate-100 capitalize">
                {active.replace(/-/g, ' ')}
              </div>
              <div className="font-mono text-[10px] text-slate-600">
                {status === 'ready' ? '✓ synced' : status === 'sending' ? 'sending…' : status === 'connecting' ? 'connecting…' : 'offline'}
              </div>
            </div>
          </div>
        </div>

        {/* scene deck */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Scene deck</div>
              <div className="mt-1 text-xs text-slate-600">Tap to switch what the audience sees</div>
            </div>
            <Layers3 className="size-4 text-slate-600" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {scenes.map((scene, index) => (
              <button
                key={scene.type}
                onClick={() => send({ type: scene.type } as DisplayScene, scene.label)}
                className={`group rounded-xl border p-3 text-left transition active:scale-95 ${
                  active === scene.type
                    ? 'border-cyan-300/50 bg-cyan-300/10'
                    : 'border-white/10 bg-white/[0.025] hover:border-white/25 hover:bg-white/[0.06]'
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-slate-600">0{index + 1}</span>
                  <span className={`size-1.5 rounded-full ${active === scene.type ? 'bg-cyan-300 shadow-[0_0_8px_#67e8f9]' : 'bg-slate-700'}`} />
                </div>
                <div className="text-sm font-medium text-slate-200">{scene.label}</div>
                <div className="mt-0.5 truncate text-[10px] text-slate-500">{scene.description}</div>
              </button>
            ))}
          </div>
        </section>

        {/* carousel controls */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Carousel transport</div>
              <div className="mt-1 text-xs text-slate-600">Control concept cards on stage</div>
            </div>
            <Clapperboard className="size-4 text-slate-600" />
          </div>
          <div className="flex gap-2">
            <Button onClick={() => sendCarousel('prev')} variant="outline" size="icon"
              className="flex-1 border-white/10 bg-transparent text-slate-400 hover:bg-white/10 hover:text-white active:scale-95">
              <ArrowLeft />
            </Button>
            <Button onClick={() => sendCarousel('play')} variant="outline"
              className="flex-1 border-white/10 bg-transparent text-slate-300 hover:bg-white/10 hover:text-white active:scale-95">
              <Play className="mr-1 size-3.5" /> Play
            </Button>
            <Button onClick={() => sendCarousel('pause')} variant="outline" size="icon"
              className="flex-1 border-white/10 bg-transparent text-slate-400 hover:bg-white/10 hover:text-white active:scale-95">
              <Pause />
            </Button>
            <Button onClick={() => sendCarousel('stop')} variant="outline" size="icon"
              className="flex-1 border-white/10 bg-transparent text-slate-400 hover:bg-white/10 hover:text-white active:scale-95">
              <Square />
            </Button>
            <Button onClick={() => sendCarousel('next')} variant="outline" size="icon"
              className="flex-1 border-white/10 bg-transparent text-slate-400 hover:bg-white/10 hover:text-white active:scale-95">
              <ArrowRight />
            </Button>
          </div>
        </section>

        {/* live message */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Live message</div>
              <div className="mt-1 text-xs text-slate-600">Send a callout to the display</div>
            </div>
            <MessageSquareText className="size-4 text-slate-600" />
          </div>
          <div className="flex flex-col gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Main message e.g. Scan the QR code"
              className="h-10 w-full rounded-lg border border-white/10 bg-black/20 px-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/50"
            />
            <input
              value={subMessage}
              onChange={(e) => setSubMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Optional supporting text"
              className="h-10 w-full rounded-lg border border-white/10 bg-black/20 px-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/50"
            />
            <Button onClick={sendMessage}
              className="h-10 w-full bg-cyan-300 text-slate-950 hover:bg-cyan-200 active:scale-95">
              <Send className="mr-2 size-3.5" /> Send to stage
            </Button>
          </div>
        </section>

        <footer className="pt-2 text-center font-mono text-[10px] tracking-[0.16em] text-slate-700">
          NO CLOUD · NO LOGIN · YOUR WIFI
        </footer>
      </div>
    </main>
  )
}

void [Eye]
