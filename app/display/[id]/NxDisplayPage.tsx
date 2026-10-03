'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useStageLink } from '@/hooks/useStageLink'
import '@/app/presentation-animations.css'
import type { PresentationMeta } from '@/lib/state'

import {
  NxSlide01Title,
  NxSlide02Presenter,
  NxSlide03Agenda,
  NxSlide04WhatIsNextjs,
  NxSlide05ReactBaseline,
  NxSlide06LibraryVsFramework,
  NxSlide07CSR,
  NxSlide08SSR,
  NxSlide09ReactVsNextjs,
  NxSlide10NewFeatures,
  NxSlide11AppRouter,
  NxSlide12RoutingPatterns,
  NxSlide13ServerComponents,
  NxSlide14ServerClientBoundary,
  NxSlide15DataFetching,
  NxSlide16CreateCommand,
  NxSlide17CreateResult,
  NxSlide18FileStructure,
  NxSlide19RunDevServer,
  NxSlide20LiveDemoPhases,
  NxSlide21DemoRunRoute,
  NxSlide22DemoInteractivity,
  NxSlide23DemoRepository,
  NxSlide24DemoApiAndFetch,
  NxSlide25CommonPitfalls,
  NxSlide26Recap,
  NxSlide27Resources,
  NxSlide28End,
} from '@/components/display/scenes/nextjs'

// 28 slides — keys match the DisplayScene type strings in lib/state.ts
const SLIDES = [
  { key: 'nx-01-title',                label: 'Title',                     node: <NxSlide01Title /> },
  { key: 'nx-02-presenter',            label: 'Presenter',                 node: <NxSlide02Presenter /> },
  { key: 'nx-03-agenda',               label: 'Agenda',                    node: <NxSlide03Agenda /> },
  { key: 'nx-04-what-is-nextjs',       label: 'What is Next.js?',          node: <NxSlide04WhatIsNextjs /> },
  { key: 'nx-05-react-baseline',       label: 'React Baseline',            node: <NxSlide05ReactBaseline /> },
  { key: 'nx-06-library-vs-framework', label: 'Library vs Framework',      node: <NxSlide06LibraryVsFramework /> },
  { key: 'nx-07-csr',                  label: 'CSR',                       node: <NxSlide07CSR /> },
  { key: 'nx-08-ssr',                  label: 'SSR',                       node: <NxSlide08SSR /> },
  { key: 'nx-09-react-vs-nextjs',      label: 'React vs Next.js',          node: <NxSlide09ReactVsNextjs /> },
  { key: 'nx-10-new-features',         label: 'New Features',              node: <NxSlide10NewFeatures /> },
  { key: 'nx-11-app-router',           label: 'App Router',                node: <NxSlide11AppRouter /> },
  { key: 'nx-12-routing-patterns',     label: 'Routing Patterns',          node: <NxSlide12RoutingPatterns /> },
  { key: 'nx-13-server-components',    label: 'Server Components',         node: <NxSlide13ServerComponents /> },
  { key: 'nx-14-server-client-boundary', label: 'Server / Client Boundary', node: <NxSlide14ServerClientBoundary /> },
  { key: 'nx-15-data-fetching',        label: 'Data Fetching',             node: <NxSlide15DataFetching /> },
  { key: 'nx-16-create-command',       label: 'Create Command',            node: <NxSlide16CreateCommand /> },
  { key: 'nx-17-create-result',        label: 'Create Result',             node: <NxSlide17CreateResult /> },
  { key: 'nx-18-file-structure',       label: 'File Structure',            node: <NxSlide18FileStructure /> },
  { key: 'nx-19-run-dev-server',       label: 'Run Dev Server',            node: <NxSlide19RunDevServer /> },
  { key: 'nx-20-live-demo-phases',     label: 'Live Demo — Phases',        node: <NxSlide20LiveDemoPhases /> },
  { key: 'nx-21-demo-run-route',       label: 'Demo: Run & Route',         node: <NxSlide21DemoRunRoute /> },
  { key: 'nx-22-demo-interactivity',   label: 'Demo: Interactivity',       node: <NxSlide22DemoInteractivity /> },
  { key: 'nx-23-demo-repository',      label: 'Demo: Follow Along',        node: <NxSlide23DemoRepository /> },
  { key: 'nx-24-demo-api-and-fetch',   label: 'Demo: API & Fetch',         node: <NxSlide24DemoApiAndFetch /> },
  { key: 'nx-25-common-pitfalls',      label: 'Common Pitfalls',           node: <NxSlide25CommonPitfalls /> },
  { key: 'nx-26-recap',                label: 'Recap',                     node: <NxSlide26Recap /> },
  { key: 'nx-27-resources',            label: 'Resources',                 node: <NxSlide27Resources /> },
  { key: 'nx-28-end',                  label: 'Questions?',                node: <NxSlide28End /> },
]

const SLIDE_KEYS = SLIDES.map((s) => s.key)
const SLIDE_MAP  = Object.fromEntries(SLIDES.map((s) => [s.key, s.node]))
const TOTAL      = SLIDES.length

/* ─── MSA theme tokens ─────────────────────────────────────────────── */
const LIGHT = {
  bg:         '#F7F9FC',
  surface:    '#FFFFFF',
  fg:         '#201F1E',
  muted:      '#5B5A58',
  border:     '#E3E8EF',
  borderStr:  '#C8D3E0',
  blue:       '#0078D4',
  blue2:      '#38BDF8',
  blueFaint:  'rgba(0,120,212,.06)',
  blueSoft:   'rgba(0,120,212,.10)',
  chrome:     'rgba(255,255,255,0.88)',
}
const DARK = {
  bg:         '#1B1A19',
  surface:    '#252423',
  fg:         '#F3F2F1',
  muted:      '#B8B6B3',
  border:     '#3A3836',
  borderStr:  '#55524E',
  blue:       '#4CC2FF',
  blue2:      '#99E0FF',
  blueFaint:  'rgba(76,194,255,.08)',
  blueSoft:   'rgba(76,194,255,.14)',
  chrome:     'rgba(37,36,35,0.88)',
}

export default function NxDisplayPage({ pres }: { pres: PresentationMeta }) {
  /* ── state ── */
  const [theme,      setTheme]      = useState<'light' | 'dark'>('light')
  const [wsUrl,      setWsUrl]      = useState<string | null>(null)
  const [remoteUrl,  setRemoteUrl]  = useState('')
  const [qrDataUrl,  setQrDataUrl]  = useState('')
  const [showQr,     setShowQr]     = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  const [idx,        setIdx]        = useState(0)
  const [visible,    setVisible]    = useState(true)
  const [dir,        setDir]        = useState<'fwd' | 'back'>('fwd')
  const prevIdx = useRef(0)

  /* Persist theme */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('msa-nx-theme') as 'light' | 'dark' | null
      if (saved) setTheme(saved)
    } catch {}
  }, [])
  const toggleTheme = () => setTheme(t => {
    const next = t === 'light' ? 'dark' : 'light'
    try { localStorage.setItem('msa-nx-theme', next) } catch {}
    return next
  })

  const T = theme === 'light' ? LIGHT : DARK

  /* Lock body scroll */
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
      document.documentElement.style.overflow = ''
    }
  }, [])

  /* Host info + QR */
  useEffect(() => {
    fetch(`/api/host-info?presId=${pres.id}`)
      .then((r) => r.json())
      .then(async (d: { wsLocalUrl: string; remoteUrl: string }) => {
        setWsUrl(d.wsLocalUrl)
        setRemoteUrl(d.remoteUrl)
        const QRCode = (await import('qrcode')).default
        setQrDataUrl(await QRCode.toDataURL(d.remoteUrl, {
          width: 220, margin: 2,
          color: { dark: '#000000', light: '#F7F9FC' },
        }))
      })
      .catch(() => setWsUrl(`ws://localhost:4821/${pres.id}`))
  }, [pres.id])

  /* Navigation */
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

  /* Keyboard */
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (showPicker) { if (e.key === 'Escape') setShowPicker(false); return }
      if (e.key === 'Escape') { setShowQr(false); return }
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); goNext() }
      else if (e.key === 'ArrowLeft'  || e.key === 'PageUp') { e.preventDefault(); goPrev() }
      else if (e.key === 'Home')  { e.preventDefault(); goTo(0) }
      else if (e.key === 'End')   { e.preventDefault(); goTo(TOTAL - 1) }
      else if (e.key.toLowerCase() === 'f') {
        document.fullscreenElement ? document.exitFullscreen?.() : document.documentElement.requestFullscreen?.()
      }
      else if (e.key.toLowerCase() === 'g') { setShowPicker(v => !v) }
      else if (e.key.toLowerCase() === 'q') { setShowQr(v => !v) }
      else if (e.key.toLowerCase() === 't') { toggleTheme() }
      else if (e.key.toLowerCase() === 'o') { setShowPicker(v => !v) }
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goNext, goPrev, goTo, showPicker])

  /* Touch swipe */
  const touchX = useRef(0)
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.changedTouches[0].screenX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].screenX - touchX.current
    if (Math.abs(dx) > 60) dx < 0 ? goNext() : goPrev()
  }

  /* Idle */
  const [ctrlVisible, setCtrlVisible] = useState(true)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const resetIdle = useCallback(() => {
    setCtrlVisible(true)
    if (idleTimer.current) clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => setCtrlVisible(false), 3000)
  }, [])
  useEffect(() => {
    resetIdle()
    return () => { if (idleTimer.current) clearTimeout(idleTimer.current) }
  }, [resetIdle])

  /* WebSocket remote */
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

  /* Live clock */
  const [clock, setClock] = useState('')
  useEffect(() => {
    const tick = () => {
      const d = new Date()
      const p = (n: number) => String(n).padStart(2, '0')
      setClock(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  /* ── render ── */
  return (
    <div
      data-nx-theme={theme}
      style={{
        position: 'fixed', inset: 0,
        background: T.bg,
        color: T.fg,
        fontFamily: "'Segoe UI Variable Display','Segoe UI',-apple-system,BlinkMacSystemFont,system-ui,sans-serif",
        transition: 'background .35s ease, color .35s ease',
        overflow: 'hidden',
      }}
      onMouseMove={resetIdle}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Background — rendered ONCE, never re-mounts, sits below all slide content ── */}
      <div
        aria-hidden
        style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: 'url(/presentation/02/bg.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          backgroundColor: theme === 'light' ? '#FCFDFF' : '#1B1A19',
          filter: theme === 'dark' ? 'invert(1) hue-rotate(180deg) brightness(.75)' : 'none',
          transition: 'background-color .35s ease, filter .35s ease',
        }}
      />

      {/* ── Corner marks ── */}
      {(['top-[70px] left-3','top-[70px] right-3','bottom-[70px] left-3','bottom-[70px] right-3'] as const).map(pos => (
        <span key={pos} aria-hidden style={{
          position: 'fixed', zIndex: 35, pointerEvents: 'none',
          width: 15, height: 15,
          color: T.blue,
          opacity: .4,
          ...(pos.includes('top-') ? { top: 70 } : { bottom: 70 }),
          ...(pos.includes('left-') ? { left: 12 } : { right: 12 }),
        }}>
          <span style={{ position: 'absolute', left: 7, top: 0, width: 1, height: '100%', background: 'currentColor' }} />
          <span style={{ position: 'absolute', top: 7, left: 0, height: 1, width: '100%', background: 'currentColor' }} />
        </span>
      ))}

      {/* ── Top chrome ── */}
      <header
        style={{
          position: 'fixed', left: 0, right: 0, top: 0, height: 56, zIndex: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 clamp(16px,2.5vw,32px)',
          background: T.chrome,
          backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${T.border}`,
          transition: 'opacity .5s, background .35s',
          opacity: ctrlVisible ? 1 : 0,
          pointerEvents: ctrlVisible ? 'auto' : 'none',
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <MsLogo />
          <span style={{ fontSize: 16.5, fontWeight: 600, letterSpacing: '-.01em', whiteSpace: 'nowrap', color: T.fg }}>
            Microsoft Learn Student Ambassadors
          </span>
          <span style={{ width: 1, height: 19, background: T.borderStr, margin: '0 4px 0 6px' }} />
          <span style={{ fontFamily: 'Cascadia Code,Consolas,monospace', fontSize: 'clamp(.58rem,.7vw,1.1vh)', letterSpacing: '.14em', textTransform: 'uppercase', color: T.muted, whiteSpace: 'nowrap' }}>
            Next.js · Part 1 / 3
          </span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 9 }}>
          <IconBtn title="Toggle theme (T)" onClick={toggleTheme} T={T}>
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </IconBtn>
          <IconBtn title="Overview (O)" onClick={() => setShowPicker(v => !v)} T={T}><GridIcon /></IconBtn>
          <IconBtn title="Fullscreen (F)" onClick={() => document.fullscreenElement ? document.exitFullscreen?.() : document.documentElement.requestFullscreen?.()} T={T}><MaxIcon /></IconBtn>
        </div>
      </header>

      {/* ── Slide content — outer shell is stable, inner content transitions ── */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column',
          /* Safe zone padding — top bumped to clear the template header bar */
          padding: 'clamp(110px,14vh,140px) clamp(64px,8vw,120px) clamp(68px,8.5vh,90px) clamp(24px,7vw,110px)',
          overflow: 'hidden',
        }}
      >
        {/* Only this inner wrapper animates — background above is untouched */}
        <div
          data-nx-theme={theme}
          style={{
            flex: 1, minHeight: 0,
            opacity:    visible ? 1 : 0,
            transform:  visible ? 'none' : dir === 'fwd' ? 'translateY(-7vh) scale(.98)' : 'translateY(7vh) scale(.98)',
            filter:     visible ? 'none' : 'blur(14px)',
            transition: 'opacity 220ms ease, transform 220ms ease, filter 220ms ease',
          }}
        >
          {currentSlide}
        </div>
      </div>

      {/* Ghost click zones */}
      <button onClick={goPrev} aria-label="Previous slide" style={{ position: 'fixed', left: 0, top: 0, height: '100%', width: '12%', cursor: 'w-resize', opacity: 0, zIndex: 5 }} />
      <button onClick={goNext} aria-label="Next slide"     style={{ position: 'fixed', right: 0, top: 0, height: '100%', width: '12%', cursor: 'e-resize', opacity: 0, zIndex: 5 }} />

      {/* ── Bottom chrome ── */}
      <footer
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, height: 56, zIndex: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 clamp(16px,2.5vw,32px)',
          background: T.chrome,
          backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          borderTop: `1px solid ${T.border}`,
          transition: 'opacity .5s, background .35s',
          opacity: ctrlVisible ? 1 : 0,
          pointerEvents: ctrlVisible ? 'auto' : 'none',
        }}
      >
        <span style={{ fontFamily: 'Cascadia Code,Consolas,monospace', fontSize: 'clamp(.58rem,.7vw,1.1vh)', letterSpacing: '.16em', textTransform: 'uppercase', color: T.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '34vw' }}>
          {SLIDES[idx].label}
        </span>

        {/* Centred clock + live dot */}
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: T.blue, animation: 'msaPulse 2s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'Cascadia Code,Consolas,monospace', fontSize: 'clamp(.58rem,.7vw,1.1vh)', letterSpacing: '.1em', color: T.muted, fontVariantNumeric: 'tabular-nums' }}>
            {clock}
          </span>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <IconBtn title="Previous (←)" onClick={goPrev} disabled={idx === 0} T={T}><ChevLeftIcon /></IconBtn>
          <span style={{ fontFamily: 'Cascadia Code,Consolas,monospace', fontSize: 'clamp(.58rem,.7vw,1.1vh)', letterSpacing: '.14em', fontVariantNumeric: 'tabular-nums', color: T.fg }}>
            {String(idx + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
          </span>
          <IconBtn title="Next (→)" onClick={goNext} disabled={idx >= TOTAL - 1} T={T}><ChevRightIcon /></IconBtn>
          <IconBtn title="Remote QR (Q)" onClick={() => setShowQr(v => !v)} T={T}>
            <span style={{ fontFamily: 'Cascadia Code,Consolas,monospace', fontSize: 10, letterSpacing: '.05em' }}>QR</span>
          </IconBtn>
        </div>
      </footer>

      {/* ── Progress bar ── */}
      <div style={{ position: 'fixed', left: 0, bottom: 0, height: 3, width: '100%', zIndex: 45, pointerEvents: 'none' }}>
        <div style={{
          height: '100%',
          width: `${progress * 100}%`,
          background: `linear-gradient(90deg, ${T.blue}, ${T.blue2})`,
          transition: 'width .5s cubic-bezier(.22,1,.36,1)',
        }} />
      </div>

      {/* ── Overview / Picker ── */}
      {showPicker && (
        <div
          role="dialog" aria-label="Slide overview"
          onClick={(e) => e.target === e.currentTarget && setShowPicker(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 60,
            display: 'flex', flexDirection: 'column',
            padding: 'clamp(64px,9vh,84px) clamp(24px,7vw,110px)',
            overflowY: 'auto',
            background: theme === 'light' ? 'rgba(247,249,252,.93)' : 'rgba(27,26,25,.93)',
            backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexShrink: 0 }}>
            <span style={{ fontSize: 'min(2rem,3vw,4vh)', fontWeight: 700, letterSpacing: '-.03em', color: T.fg }}>Overview</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontFamily: 'Cascadia Code,Consolas,monospace', fontSize: 'clamp(.58rem,.7vw,1.1vh)', letterSpacing: '.14em', textTransform: 'uppercase', color: T.muted }}>Click a slide to jump · Esc to close</span>
              <IconBtn title="Close (Esc)" onClick={() => setShowPicker(false)} T={T}><XIcon /></IconBtn>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 clamp(28px,4vw,64px)' }}>
            {SLIDES.map((s, n) => (
              <button key={s.key} onClick={() => { goTo(n); setShowPicker(false) }}
                style={{
                  display: 'grid', gridTemplateColumns: '56px 1fr auto',
                  gap: 16, alignItems: 'center',
                  padding: '13px 10px',
                  border: 'none', borderTop: `1px solid ${T.border}`,
                  background: 'none', color: T.fg, textAlign: 'left', cursor: 'pointer', width: '100%',
                  transition: 'background .15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = T.blueFaint)}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >
                <span style={{
                  width: 42, height: 42, border: `1px solid ${n === idx ? T.blue : T.borderStr}`,
                  borderRadius: 9, display: 'grid', placeItems: 'center',
                  fontFamily: 'Cascadia Code,Consolas,monospace', fontSize: 'clamp(.58rem,.7vw,1.1vh)', color: n === idx ? '#fff' : T.muted,
                  background: n === idx ? T.blue : 'transparent',
                }}>
                  {String(n + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: 'min(1.15rem,1.3vw,2.1vh)', fontWeight: 600, color: T.fg }}>{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── QR overlay ── */}
      {showQr && (
        <div
          onClick={(e) => e.target === e.currentTarget && setShowQr(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,.72)', backdropFilter: 'blur(4px)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'Cascadia Code,Consolas,monospace', fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase', color: '#a5a5a5', marginBottom: 24 }}>
              SCAN TO OPEN REMOTE ON YOUR PHONE
            </div>
            {qrDataUrl
              ? <img src={qrDataUrl} alt="Remote QR code" style={{ width: 220, height: 220, borderRadius: 16, margin: '0 auto', display: 'block' }} />
              : <div style={{ width: 220, height: 220, borderRadius: 16, background: 'rgba(255,255,255,.05)', margin: '0 auto' }} />
            }
            <div style={{ marginTop: 24, fontFamily: 'Cascadia Code,Consolas,monospace', fontSize: 14, color: '#a5a5a5' }}>{remoteUrl}</div>
            <button onClick={() => setShowQr(false)}
              style={{ marginTop: 32, padding: '8px 24px', borderRadius: 999, border: '1px solid #3d3d3d', background: 'transparent', color: '#a5a5a5', cursor: 'pointer', fontSize: 14 }}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Pulse keyframe for live dot */}
      <style>{`@keyframes msaPulse { 50% { opacity: .25; } }`}</style>
    </div>
  )
}

/* ─── Icon button ───────────────────────────────────────────────────── */
function IconBtn({
  children, onClick, title, disabled = false, T,
}: {
  children: React.ReactNode
  onClick: () => void
  title?: string
  disabled?: boolean
  T: typeof LIGHT
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      title={title}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 40, height: 40,
        display: 'grid', placeItems: 'center',
        background: hovered ? T.blue : 'transparent',
        border: `1px solid ${T.borderStr}`,
        borderRadius: 8,
        color: hovered ? '#fff' : T.fg,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? .3 : 1,
        transition: 'background .18s, color .18s, border-color .18s',
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  )
}

/* ─── Microsoft four-square logo ───────────────────────────────────── */
function MsLogo() {
  return (
    <svg width="23" height="23" viewBox="0 0 23 23" aria-label="Microsoft" fill="none" style={{ flexShrink: 0 }}>
      <rect x="1"  y="1"  width="10" height="10" rx="1.2" fill="#F25022"/>
      <rect x="12" y="1"  width="10" height="10" rx="1.2" fill="#7FBA00"/>
      <rect x="1"  y="12" width="10" height="10" rx="1.2" fill="#00A4EF"/>
      <rect x="12" y="12" width="10" height="10" rx="1.2" fill="#FFB900"/>
    </svg>
  )
}

/* ─── UI Icons ──────────────────────────────────────────────────────── */
function SunIcon() {
  return (
    <svg style={{ width: 18, height: 18 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg style={{ width: 18, height: 18 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 12.5A8.5 8.5 0 0 1 11.5 4a7 7 0 1 0 8.5 8.5Z"/>
    </svg>
  )
}
function GridIcon() {
  return (
    <svg style={{ width: 18, height: 18 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>
    </svg>
  )
}
function MaxIcon() {
  return (
    <svg style={{ width: 18, height: 18 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3"/>
    </svg>
  )
}
function ChevLeftIcon() {
  return (
    <svg style={{ width: 18, height: 18 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 5-7 7 7 7"/>
    </svg>
  )
}
function ChevRightIcon() {
  return (
    <svg style={{ width: 18, height: 18 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 5 7 7-7 7"/>
    </svg>
  )
}
function XIcon() {
  return (
    <svg style={{ width: 18, height: 18 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M18 6 6 18"/>
    </svg>
  )
}
