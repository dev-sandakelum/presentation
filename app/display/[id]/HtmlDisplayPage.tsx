'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useStageLink } from '@/hooks/useStageLink'
import type { PresentationMeta } from '@/lib/state'

/**
 * Wraps a standalone HTML presentation in a full-screen iframe.
 * The remote sends { type: 'html-slide', index: n } messages to navigate.
 * The display also listens to postMessage from the iframe to know the current slide
 * (the HTML file dispatches `{ type: 'slide-change', index: n }` on navigation).
 */
export default function HtmlDisplayPage({ pres }: { pres: PresentationMeta }) {
  const [wsUrl,      setWsUrl]      = useState<string | null>(null)
  const [remoteUrl,  setRemoteUrl]  = useState('')
  const [qrDataUrl,  setQrDataUrl]  = useState('')
  const [showQr,     setShowQr]     = useState(false)
  const [ctrlVisible, setCtrlVisible] = useState(true)
  const [idx,        setIdx]        = useState(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const total = pres.slideCount ?? 1

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

  // Tell the iframe to jump to a slide via postMessage
  const goToSlide = useCallback((n: number) => {
    const clamped = Math.max(0, Math.min(total - 1, n))
    setIdx(clamped)
    iframeRef.current?.contentWindow?.postMessage({ type: 'go-to-slide', index: clamped }, '*')
  }, [total])

  // Listen to slide-change events coming from the iframe
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'slide-change' && typeof e.data.index === 'number') {
        setIdx(e.data.index)
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  // WebSocket — receive html-slide commands from the remote
  const { state } = useStageLink({
    wsUrl,
    onState: (s) => {
      if (s.scene.type === 'html-slide') {
        goToSlide(s.scene.index)
      }
    },
  })
  void state

  // Keyboard
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); goToSlide(idx + 1) }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); goToSlide(idx - 1) }
      else if (e.key === 'Home') { e.preventDefault(); goToSlide(0) }
      else if (e.key === 'End')  { e.preventDefault(); goToSlide(total - 1) }
      else if (e.key.toLowerCase() === 'f') {
        document.fullscreenElement ? document.exitFullscreen?.() : document.documentElement.requestFullscreen?.()
      } else if (e.key.toLowerCase() === 'q') { setShowQr((v) => !v) }
      else if (e.key === 'Escape') { setShowQr(false) }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [goToSlide, idx, total])

  // Idle hide controls
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const resetIdle = useCallback(() => {
    setCtrlVisible(true)
    if (idleTimer.current) clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => setCtrlVisible(false), 3000)
  }, [])
  useEffect(() => { resetIdle(); return () => { if (idleTimer.current) clearTimeout(idleTimer.current) } }, [resetIdle])

  const progress = (idx + 1) / total

  return (
    <main className="relative flex h-screen w-screen flex-col overflow-hidden bg-black" onMouseMove={resetIdle}>
      {/* full-screen iframe */}
      <iframe
        ref={iframeRef}
        src={pres.htmlPath}
        className="absolute inset-0 h-full w-full border-0"
        title={pres.title}
        // allow keyboard events to bubble through by keeping focus on iframe
      />

      {/* bottom bar overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 transition-opacity duration-500"
        style={{ opacity: ctrlVisible ? 1 : 0, pointerEvents: ctrlVisible ? 'auto' : 'none' }}
      >
        <div className="h-[2px] w-full bg-white/[0.07]">
          <div
            className="h-full transition-all duration-500"
            style={{ width: `${progress * 100}%`, background: `linear-gradient(90deg, ${pres.color}, ${pres.color}88)` }}
          />
        </div>
        <div className="flex items-center gap-3 bg-black/70 px-5 py-3 backdrop-blur-md">
          <button onClick={() => goToSlide(idx - 1)} disabled={idx === 0} className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-slate-400 transition hover:bg-white/[0.09] hover:text-white disabled:opacity-30 active:scale-95">← Prev</button>
          <span className="font-mono text-[11px] text-slate-400 tabular-nums">
            <span style={{ color: pres.color }}>{String(idx + 1).padStart(2, '0')}</span>
            <span className="text-slate-600"> / </span>
            <span>{String(total).padStart(2, '0')}</span>
          </span>
          <button onClick={() => goToSlide(idx + 1)} disabled={idx >= total - 1} className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-slate-400 transition hover:bg-white/[0.09] hover:text-white disabled:opacity-30 active:scale-95">Next →</button>
          <div className="flex-1" />
          <a href="/" className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-slate-500 transition hover:bg-white/[0.09] hover:text-white">← All</a>
          <button onClick={() => document.fullscreenElement ? document.exitFullscreen?.() : document.documentElement.requestFullscreen?.()} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-slate-500 transition hover:bg-white/[0.09] hover:text-white">⛶ Full</button>
          <button onClick={() => setShowQr((v) => !v)} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-slate-500 transition hover:bg-white/[0.09] hover:text-white">QR</button>
        </div>
      </div>

      {/* QR overlay */}
      {showQr && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && setShowQr(false)}>
          <div className="text-center text-white">
            <div className="mb-6 font-mono text-xs tracking-[0.3em] uppercase" style={{ color: pres.color }}>SCAN TO OPEN REMOTE ON YOUR PHONE</div>
            {qrDataUrl ? <img src={qrDataUrl} alt="Remote QR code" className="mx-auto rounded-2xl" style={{ width: 220, height: 220 }} /> : <div className="mx-auto size-[220px] animate-pulse rounded-2xl bg-white/5" />}
            <div className="mt-6 font-mono text-sm text-slate-300">{remoteUrl}</div>
            <button onClick={() => setShowQr(false)} className="mt-8 rounded-full border border-white/10 px-6 py-2 text-sm text-slate-400 hover:bg-white/10">Close</button>
          </div>
        </div>
      )}
    </main>
  )
}
