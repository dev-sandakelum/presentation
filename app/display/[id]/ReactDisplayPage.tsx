'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useStageLink } from '@/hooks/useStageLink'
import SlideBackground from '@/components/display/SlideBackground'
import '@/app/presentation-animations.css'
import type { PresentationMeta } from '@/lib/state'

// Azure AI session slide components
import Slide01Title              from '@/components/display/scenes/Slide01Title'
import Slide02Hook               from '@/components/display/scenes/Slide02Hook'
import Slide03ThoughtExperiment  from '@/components/display/scenes/Slide03ThoughtExperiment'
import Slide04Foundation         from '@/components/display/scenes/Slide04Foundation'
import Slide05PromptEngineering  from '@/components/display/scenes/Slide05PromptEngineering'
import Slide06TurningPoint       from '@/components/display/scenes/Slide06TurningPoint'
import Slide07AddKnowledge       from '@/components/display/scenes/Slide07AddKnowledge'
import Slide08CampusMate         from '@/components/display/scenes/Slide08CampusMate'
import Slide09AILesson           from '@/components/display/scenes/Slide09AILesson'
import Slide10GiveItTools        from '@/components/display/scenes/Slide10GiveItTools'
import Slide11Ingredients        from '@/components/display/scenes/Slide11Ingredients'
import Slide12Azure              from '@/components/display/scenes/Slide12Azure'
import Slide13LiveBuild          from '@/components/display/scenes/Slide13LiveBuild'
import Slide14Architecture       from '@/components/display/scenes/Slide14Architecture'
import Slide15Challenge          from '@/components/display/scenes/Slide15Challenge'
import Slide16ResponsibleAI      from '@/components/display/scenes/Slide16ResponsibleAI'
import Slide17Journey            from '@/components/display/scenes/Slide17Journey'
import Slide18Closing            from '@/components/display/scenes/Slide18Closing'

const SLIDES = [
  { key: 'az-01-title',              label: 'Title',              node: <Slide01Title /> },
  { key: 'az-02-hook',               label: 'The Hook',           node: <Slide02Hook /> },
  { key: 'az-03-thought-experiment', label: 'Thought Experiment', node: <Slide03ThoughtExperiment /> },
  { key: 'az-04-foundation',         label: 'Foundation',         node: <Slide04Foundation /> },
  { key: 'az-05-prompt-engineering', label: 'Prompt Engineering', node: <Slide05PromptEngineering /> },
  { key: 'az-06-turning-point',      label: 'Turning Point',      node: <Slide06TurningPoint /> },
  { key: 'az-07-add-knowledge',      label: 'Add Knowledge',      node: <Slide07AddKnowledge /> },
  { key: 'az-08-campusmate',         label: 'CampusMate',         node: <Slide08CampusMate /> },
  { key: 'az-09-ai-lesson',          label: 'AI Lesson',          node: <Slide09AILesson /> },
  { key: 'az-10-give-it-tools',      label: 'Give It Tools',      node: <Slide10GiveItTools /> },
  { key: 'az-11-ingredients',        label: 'Ingredients',        node: <Slide11Ingredients /> },
  { key: 'az-12-azure',              label: 'Azure',              node: <Slide12Azure /> },
  { key: 'az-13-live-build',         label: 'Live Build',         node: <Slide13LiveBuild /> },
  { key: 'az-14-architecture',       label: 'Architecture',       node: <Slide14Architecture /> },
  { key: 'az-15-challenge',          label: 'Challenge',          node: <Slide15Challenge /> },
  { key: 'az-16-responsible-ai',     label: 'Responsible AI',     node: <Slide16ResponsibleAI /> },
  { key: 'az-17-journey',            label: 'The Journey',        node: <Slide17Journey /> },
  { key: 'az-18-closing',            label: 'Closing',            node: <Slide18Closing /> },
]

const SLIDE_KEYS = SLIDES.map((s) => s.key)
const SLIDE_MAP  = Object.fromEntries(SLIDES.map((s) => [s.key, s.node]))
const TOTAL      = SLIDES.length

export default function ReactDisplayPage({ pres }: { pres: PresentationMeta }) {
  const [wsUrl,      setWsUrl]      = useState<string | null>(null)
  const [remoteUrl,  setRemoteUrl]  = useState('')
  const [qrDataUrl,  setQrDataUrl]  = useState('')
  const [showQr,     setShowQr]     = useState(false)
  const [showPicker, setShowPicker] = useState(false)

  const [idx,     setIdx]     = useState(0)
  const [visible, setVisible] = useState(true)
  const [dir,     setDir]     = useState<'fwd' | 'back'>('fwd')
  const prevIdx = useRef(0)

  // host info + QR
  useEffect(() => {
    fetch(`/api/host-info?presId=${pres.id}`)
      .then((r) => r.json())
      .then(async (d: { wsLocalUrl: string; remoteUrl: string }) => {
        setWsUrl(d.wsLocalUrl)
        setRemoteUrl(d.remoteUrl)
        const QRCode = (await import('qrcode')).default
        setQrDataUrl(await QRCode.toDataURL(d.remoteUrl, {
          width: 220, margin: 2,
          color: { dark: '#07080d', light: '#a5f3fc' },
        }))
      })
      .catch(() => setWsUrl(`ws://localhost:4821/${pres.id}`))
  }, [pres.id])

  const goTo = useCallback((n: number) => {
    const next = Math.max(0, Math.min(TOTAL - 1, n))
    if (next === prevIdx.current) return
    setDir(next > prevIdx.current ? 'fwd' : 'back')
    prevIdx.current = next
    setVisible(false)
    setTimeout(() => { setIdx(next); setVisible(true) }, 220)
  }, [])

  const goNext = useCallback(() => goTo(prevIdx.current + 1), [goTo])
  const goPrev = useCallback(() => goTo(prevIdx.current - 1), [goTo])

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (showPicker) { if (e.key === 'Escape') setShowPicker(false); return }
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); goNext() }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); goPrev() }
      else if (e.key === 'Home') { e.preventDefault(); goTo(0) }
      else if (e.key === 'End')  { e.preventDefault(); goTo(TOTAL - 1) }
      else if (e.key.toLowerCase() === 'f') {
        document.fullscreenElement ? document.exitFullscreen?.() : document.documentElement.requestFullscreen?.()
      } else if (e.key.toLowerCase() === 'g') { setShowPicker((v) => !v) }
      else if (e.key.toLowerCase() === 'q') { setShowQr((v) => !v) }
      else if (e.key === 'Escape') { setShowQr(false) }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [goNext, goPrev, goTo, showPicker])

  const touchX = useRef(0)
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.changedTouches[0].screenX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].screenX - touchX.current
    if (Math.abs(dx) > 60) dx < 0 ? goNext() : goPrev()
  }

  const [ctrlVisible, setCtrlVisible] = useState(true)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const resetIdle = useCallback(() => {
    setCtrlVisible(true)
    if (idleTimer.current) clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => setCtrlVisible(false), 3000)
  }, [])
  useEffect(() => { resetIdle(); return () => { if (idleTimer.current) clearTimeout(idleTimer.current) } }, [resetIdle])

  const onStateRef = useRef<(key: string) => void>(() => {})
  onStateRef.current = (key: string) => {
    const n = SLIDE_KEYS.indexOf(key)
    if (n >= 0) goTo(n)
  }
  const { state } = useStageLink({
    wsUrl,
    onState: (s) => onStateRef.current(s.scene.type),
  })
  void state

  const currentSlide = SLIDE_MAP[SLIDE_KEYS[idx]]
  const progress = (idx + 1) / TOTAL

  return (
    <>
      <main
        className="pres-pagein relative flex min-h-screen flex-col overflow-hidden bg-[#04070f] text-white select-none"
        onMouseMove={resetIdle}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <SlideBackground />

        <div
          className="relative z-10 flex flex-1 flex-col justify-center px-8 py-10 md:px-14 md:py-12"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? 'none' : dir === 'fwd' ? 'translateY(-7vh) scale(.98)' : 'translateY(7vh) scale(.98)',
            filter:     visible ? 'none' : 'blur(14px)',
            transition: 'opacity 220ms ease, transform 220ms ease, filter 220ms ease',
          }}
        >
          <div className="relative mx-auto w-full max-w-6xl">{currentSlide}</div>
        </div>

        <button onClick={goPrev} aria-label="Previous slide" className="fixed left-0 top-0 h-full w-[12%] cursor-w-resize opacity-0" />
        <button onClick={goNext} aria-label="Next slide"     className="fixed right-0 top-0 h-full w-[12%] cursor-e-resize opacity-0" />

        {/* bottom bar */}
        <div
          className="fixed bottom-0 left-0 right-0 z-20 transition-opacity duration-500"
          style={{ opacity: ctrlVisible ? 1 : 0, pointerEvents: ctrlVisible ? 'auto' : 'none' }}
        >
          <div className="h-[2px] w-full bg-white/[0.07]">
            <div className="h-full bg-gradient-to-r from-blue-400 via-violet-400 to-teal-400 transition-all duration-500" style={{ width: `${progress * 100}%` }} />
          </div>
          <div className="flex items-center gap-3 bg-[#04070f]/80 px-5 py-3 backdrop-blur-md">
            <button onClick={goPrev} disabled={idx === 0} className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-slate-400 transition hover:bg-white/[0.09] hover:text-white disabled:opacity-30 active:scale-95">← Prev</button>
            <button onClick={() => setShowPicker((v) => !v)} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-slate-300 transition hover:bg-white/[0.09] hover:text-white">
              <span className="text-blue-400">{String(idx + 1).padStart(2, '0')}</span>
              <span className="text-slate-600">/</span>
              <span>{String(TOTAL).padStart(2, '0')}</span>
              <span className="ml-1 text-slate-500">·</span>
              <span className="max-w-[160px] truncate text-slate-400">{SLIDES[idx].label}</span>
            </button>
            <button onClick={goNext} disabled={idx === TOTAL - 1} className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-slate-400 transition hover:bg-white/[0.09] hover:text-white disabled:opacity-30 active:scale-95">Next →</button>
            <div className="flex-1" />
            <a href="/" className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-slate-500 transition hover:bg-white/[0.09] hover:text-white">← All</a>
            <button onClick={() => document.fullscreenElement ? document.exitFullscreen?.() : document.documentElement.requestFullscreen?.()} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-slate-500 transition hover:bg-white/[0.09] hover:text-white" title="F">⛶ Full</button>
            <button onClick={() => setShowQr((v) => !v)} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-slate-500 transition hover:bg-white/[0.09] hover:text-white" title="Q">QR</button>
          </div>
        </div>

        {/* dot nav */}
        <nav className="fixed right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2 transition-opacity duration-500" style={{ opacity: ctrlVisible ? 1 : 0, pointerEvents: ctrlVisible ? 'auto' : 'none' }}>
          {SLIDES.map((s, n) => (
            <button key={s.key} onClick={() => goTo(n)} title={s.label}
              className={`rounded-full transition-all duration-300 ${n === idx ? 'h-6 w-[7px] bg-gradient-to-b from-blue-400 to-violet-400 shadow-[0_0_10px_rgba(96,165,250,0.6)]' : 'h-[7px] w-[7px] bg-white/20 hover:bg-white/50'}`}
            />
          ))}
        </nav>

        <div className="fixed right-16 top-5 z-20 font-mono text-[10px] tracking-[0.16em] uppercase text-white/30 transition-opacity duration-500" style={{ opacity: ctrlVisible ? 1 : 0 }}>
          ← → navigate · F fullscreen · G slides · Q remote
        </div>

        {/* slide picker */}
        {showPicker && (
          <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/60 pb-20 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && setShowPicker(false)}>
            <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-[#080f20]/95 p-5 shadow-2xl backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-blue-400">Jump to slide</span>
                <button onClick={() => setShowPicker(false)} className="font-mono text-[11px] text-slate-500 hover:text-white">✕ Esc</button>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {SLIDES.map((s, n) => (
                  <button key={s.key} onClick={() => { goTo(n); setShowPicker(false) }}
                    className={`rounded-xl border px-3 py-2.5 text-left transition active:scale-95 ${n === idx ? 'border-blue-400/50 bg-blue-400/10 text-blue-300' : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25 hover:bg-white/[0.07] hover:text-white'}`}
                  >
                    <div className="font-mono text-[9px] text-slate-600">{String(n + 1).padStart(2, '0')}</div>
                    <div className="mt-1 text-[11px] font-medium leading-tight">{s.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* QR overlay */}
        {showQr && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#04070f]/92 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && setShowQr(false)}>
            <div className="text-center">
              <div className="mb-6 font-mono text-xs tracking-[0.3em] text-blue-400">SCAN TO OPEN REMOTE ON YOUR PHONE</div>
              {qrDataUrl ? <img src={qrDataUrl} alt="Remote QR code" className="mx-auto rounded-2xl" style={{ width: 220, height: 220 }} /> : <div className="mx-auto size-[220px] animate-pulse rounded-2xl bg-white/5" />}
              <div className="mt-6 font-mono text-sm text-slate-300">{remoteUrl}</div>
              <button onClick={() => setShowQr(false)} className="mt-8 rounded-full border border-white/10 px-6 py-2 text-sm text-slate-400 hover:bg-white/10">Close</button>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
