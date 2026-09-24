'use client'

import { useEffect, useRef, useState } from 'react'
import { QrCode } from 'lucide-react'
import { useStageLink } from '@/hooks/useStageLink'

// ── Presentation data ─────────────────────────────────────────────────────────

const concepts = [
  { eyebrow: 'CONCEPT 01', name: 'Repository',   color: 'cyan',    definition: 'The home for your project — every file, every commit, the entire history.',                                     related: ['Clone', 'Remote', 'Fork']    },
  { eyebrow: 'CONCEPT 02', name: 'Commit',        color: 'violet',  definition: 'A snapshot of your project at a specific point in time, with a message explaining what changed.',              related: ['History', 'Diff', 'SHA']     },
  { eyebrow: 'CONCEPT 03', name: 'Branch',        color: 'amber',   definition: 'An independent line of development. Work in isolation, then merge when ready.',                                related: ['Main', 'Checkout', 'Merge']  },
  { eyebrow: 'CONCEPT 04', name: 'Pull Request',  color: 'pink',    definition: 'A proposal to merge your branch into another. The place for code review and discussion.',                     related: ['Review', 'Approve', 'Merge'] },
  { eyebrow: 'CONCEPT 05', name: 'Issue',         color: 'emerald', definition: 'A task, bug report, or feature idea tracked right alongside your code.',                                       related: ['Label', 'Milestone', 'Close'] },
]

const colorMap: Record<string, { text: string; bg: string; border: string }> = {
  cyan:    { text: 'text-cyan-300',    bg: 'bg-cyan-300',    border: 'border-cyan-300/20'    },
  violet:  { text: 'text-violet-300',  bg: 'bg-violet-300',  border: 'border-violet-300/20'  },
  amber:   { text: 'text-amber-300',   bg: 'bg-amber-300',   border: 'border-amber-300/20'   },
  pink:    { text: 'text-pink-300',    bg: 'bg-pink-300',    border: 'border-pink-300/20'    },
  emerald: { text: 'text-emerald-300', bg: 'bg-emerald-300', border: 'border-emerald-300/20' },
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function DisplayPage() {
  const [wsUrl,       setWsUrl]       = useState<string | null>(null)
  const [remoteUrl,   setRemoteUrl]   = useState('')
  const [qrDataUrl,   setQrDataUrl]   = useState('')
  const [showQr,      setShowQr]      = useState(false)
  const [conceptIdx,  setConceptIdx]  = useState(0)

  // Transition state — only CSS, no JSX in state
  const [sceneKey,    setSceneKey]    = useState('welcome')
  const [visible,     setVisible]     = useState(true)
  const autoRef   = useRef<ReturnType<typeof setInterval> | null>(null)
  const prevKey   = useRef('welcome')

  // Fetch host info once
  useEffect(() => {
    fetch('/api/host-info')
      .then((r) => r.json())
      .then(async (d: { wsLocalUrl: string; remoteUrl: string }) => {
        setWsUrl(d.wsLocalUrl)
        setRemoteUrl(d.remoteUrl)
        const QRCode = (await import('qrcode')).default
        const url = await QRCode.toDataURL(d.remoteUrl, {
          width: 220, margin: 2,
          color: { dark: '#07080d', light: '#a5f3fc' },
        })
        setQrDataUrl(url)
      })
      .catch(() => setWsUrl('ws://localhost:4821'))
  }, [])

  // onState is stable — stored in a ref so it never causes reconnects
  const onStateRef = useRef<(key: string, ctrl?: string) => void>(() => {})
  onStateRef.current = (key: string, ctrl?: string) => {
    // handle carousel controls immediately (no scene switch)
    if (key === 'concept-carousel') {
      if (ctrl === 'next')  setConceptIdx((i) => (i + 1) % concepts.length)
      if (ctrl === 'prev')  setConceptIdx((i) => (i - 1 + concepts.length) % concepts.length)
      if (ctrl === 'play') {
        clearInterval(autoRef.current ?? undefined)
        autoRef.current = setInterval(() => setConceptIdx((i) => (i + 1) % concepts.length), 4000)
      }
      if (ctrl === 'pause' || ctrl === 'stop') {
        clearInterval(autoRef.current ?? undefined)
        autoRef.current = null
      }
    }

    // scene switch — fade out, change key, fade in
    const nextKey = key + (key === 'concept-carousel' ? '' : '')
    if (nextKey === prevKey.current) return
    prevKey.current = nextKey
    setVisible(false)
    setTimeout(() => {
      setSceneKey(nextKey)
      setVisible(true)
    }, 220)
  }

  const { state } = useStageLink({
    wsUrl,
    // stable callback via ref — never triggers reconnect
    onState: (s) => onStateRef.current(
      s.scene.type,
      s.scene.type === 'concept-carousel' ? s.scene.control : undefined
    ),
  })

  useEffect(() => () => clearInterval(autoRef.current ?? undefined), [])

  const scene   = state.scene
  const concept = concepts[conceptIdx]
  const colors  = colorMap[concept.color]

  return (
    <main className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#07080d] p-8 text-white select-none md:p-14">

      {/* ambient */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute right-0 top-0 size-[600px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 size-[500px] rounded-full bg-violet-500/5 blur-[100px]" />
      </div>

      {/* QR trigger — tiny, bottom-right corner, only visible on hover */}
      <div className="relative flex justify-end">
        <button
          onClick={() => setShowQr((v) => !v)}
          className="opacity-0 hover:opacity-40 transition-opacity rounded-full border border-white/10 px-3 py-1.5 font-mono text-[9px] text-slate-600"
        >
          QR
        </button>
      </div>

      {/* ── QR overlay ── */}
      {showQr && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#07080d]/95 backdrop-blur-sm">
          <div className="text-center">
            <div className="mb-6 font-mono text-xs tracking-[0.3em] text-cyan-300">SCAN TO OPEN REMOTE ON YOUR PHONE</div>
            {qrDataUrl
              ? <img src={qrDataUrl} alt="Remote QR code" className="mx-auto rounded-2xl" style={{ width: 220, height: 220 }} />
              : <div className="mx-auto size-[220px] animate-pulse rounded-2xl bg-white/5" />
            }
            <div className="mt-6 font-mono text-sm text-slate-300">{remoteUrl}</div>
            <button onClick={() => setShowQr(false)} className="mt-8 rounded-full border border-white/10 px-6 py-2 text-sm text-slate-400 hover:bg-white/10">
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── scene ── */}
      <div
        className="relative mx-auto w-full max-w-6xl"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0px)' : 'translateY(16px)',
          transition: 'opacity 220ms ease, transform 220ms ease',
        }}
      >
        <div className="mb-6 font-mono text-xs tracking-[0.3em] text-cyan-300/50">
          GITHUB FUNDAMENTALS · SESSION 01
        </div>

        {/* WELCOME */}
        {sceneKey === 'welcome' && (
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-4 py-1.5 font-mono text-xs text-cyan-300">
              SESSION 01 · INTRODUCTION
            </div>
            <h1 className="max-w-4xl text-7xl font-semibold tracking-[-0.055em] md:text-[108px]">
              Build in<br /><span className="text-cyan-300">public.</span>
            </h1>
            <p className="mt-8 max-w-xl text-xl text-slate-400 md:text-2xl">
              Everything you need to know about GitHub — from your first repo to your first pull request.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {['Repositories', 'Commits', 'Branches', 'Pull Requests', 'Issues'].map((t) => (
                <span key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-500">{t}</span>
              ))}
            </div>
          </div>
        )}

        {/* CONCEPT CAROUSEL */}
        {sceneKey === 'concept-carousel' && (
          <div>
            <div className={`mb-5 font-mono text-xs tracking-[0.25em] ${colors.text}`}>{concept.eyebrow}</div>
            <h1 className={`max-w-4xl text-7xl font-semibold tracking-[-0.055em] md:text-[108px] ${colors.text}`}>
              {concept.name}
            </h1>
            <p className="mt-8 max-w-2xl text-2xl leading-relaxed text-slate-300 md:text-3xl">
              {concept.definition}
            </p>
            <div className="mt-10 flex gap-3">
              {concept.related.map((item) => (
                <span key={item} className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-2.5 font-mono text-sm text-slate-400">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-10 flex gap-2">
              {concepts.map((_, i) => (
                <span key={i} className={`h-1 w-8 rounded-full transition-all duration-500 ${i === conceptIdx ? `${colors.bg}` : 'bg-white/10'}`} />
              ))}
            </div>
          </div>
        )}

        {/* DEMO */}
        {sceneKey === 'demo-loading' && (
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/5 px-4 py-1.5 font-mono text-xs text-amber-300">LIVE DEMO</div>
            <h1 className="max-w-4xl text-7xl font-semibold tracking-[-0.055em] md:text-[108px]">
              Switching to<br /><span className="text-amber-300">live demo.</span>
            </h1>
            <p className="mt-8 text-xl text-slate-500">Sharing screen in just a moment…</p>
            <div className="mt-10 flex items-center gap-3">
              <span className="size-2 animate-bounce rounded-full bg-amber-300" style={{ animationDelay: '0ms' }} />
              <span className="size-2 animate-bounce rounded-full bg-amber-300" style={{ animationDelay: '150ms' }} />
              <span className="size-2 animate-bounce rounded-full bg-amber-300" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {/* POLL */}
        {sceneKey === 'poll-live' && (
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-300/5 px-4 py-1.5 font-mono text-xs text-blue-300">LIVE POLL</div>
            <h1 className="mb-10 max-w-3xl text-6xl font-semibold tracking-[-0.04em] text-blue-200 md:text-8xl">
              Have you used Git before?
            </h1>
            <div className="max-w-2xl space-y-5">
              {[
                { label: 'Never used Git',   pct: 28 },
                { label: 'Used it a little', pct: 45 },
                { label: 'Use it every day', pct: 27 },
              ].map((opt) => (
                <div key={opt.label}>
                  <div className="mb-2 flex justify-between text-sm text-slate-300">
                    <span>{opt.label}</span>
                    <span className="font-mono text-blue-300">{opt.pct}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/5">
                    <div className="h-2 rounded-full bg-blue-400/70 transition-all duration-1000" style={{ width: `${opt.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RECAP */}
        {sceneKey === 'recap' && (
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-300/20 bg-pink-300/5 px-4 py-1.5 font-mono text-xs text-pink-300">SESSION RECAP</div>
            <h1 className="mb-12 text-7xl font-semibold tracking-[-0.055em] md:text-[108px]">
              What we<br /><span className="text-pink-300">covered.</span>
            </h1>
            <div className="grid max-w-3xl grid-cols-3 gap-8">
              {[
                { value: '5', label: 'Core concepts', sub: 'Repo · Commit · Branch · PR · Issue' },
                { value: '3', label: 'Live demos',    sub: 'Create · Commit · Open a PR' },
                { value: '1', label: 'Real repo',     sub: 'You pushed real code today' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="text-5xl font-semibold text-pink-300">{stat.value}</div>
                  <div className="mt-2 text-sm font-medium text-slate-200">{stat.label}</div>
                  <div className="mt-1 text-xs text-slate-600">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CLOSING */}
        {sceneKey === 'closing' && (
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/5 px-4 py-1.5 font-mono text-xs text-emerald-300">THAT'S A WRAP</div>
            <h1 className="max-w-4xl text-7xl font-semibold tracking-[-0.055em] md:text-[108px]">
              Keep building<br /><span className="text-emerald-300">in public.</span>
            </h1>
            <p className="mt-8 max-w-xl text-xl text-slate-400">
              You have a GitHub account, a repo, and your first commit. The rest is just practice.
            </p>
            <div className="mt-10 grid max-w-lg grid-cols-2 gap-4 text-sm">
              {[
                { label: 'Next session', value: 'Session 02 — Collaboration' },
                { label: 'Homework',     value: 'Push one more commit this week' },
                { label: 'Questions?',   value: 'Open an Issue in the class repo' },
                { label: 'Resources',   value: 'docs.github.com/get-started' },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-emerald-300/70">{item.label}</div>
                  <div className="text-slate-300">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGE */}
        {sceneKey === 'message' && scene.type === 'message' && (
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-1.5 font-mono text-xs text-slate-400">ANNOUNCEMENT</div>
            <h1 className="max-w-4xl text-6xl font-semibold tracking-[-0.04em] md:text-8xl">{scene.text}</h1>
            {scene.sub && <p className="mt-8 max-w-2xl text-2xl text-slate-400">{scene.sub}</p>}
          </div>
        )}
      </div>

      {/* ── footer ── */}
      <div className="relative font-mono text-[10px] tracking-[0.18em] text-slate-800">
        <span>STAGE 01 / {sceneKey.toUpperCase()}</span>
      </div>
    </main>
  )
}
