// Nx Floating Controls · replaces the old top/bottom bars (the template image already draws them)
'use client'
import { useCallback, useEffect, useState } from 'react'

/**
 * Small controls pinned to the right edge: theme, overview, fullscreen, prev / next + counter.
 * Fades out after 3 s of inactivity and wakes on mouse move, key press, touch or click.
 * Render it once in NxDisplayPage (outside the slide). It sits above <SceneNx> (z-index 50).
 */
export default function NxFloatingControls({
  index,
  total,
  theme,
  onPrev,
  onNext,
  onTheme,
  onOverview,
  onFullscreen,
}: {
  index: number // 0-based current slide
  total: number
  theme: 'light' | 'dark'
  onPrev: () => void
  onNext: () => void
  onTheme: () => void
  onOverview: () => void
  onFullscreen: () => void
}) {
  const [idle, setIdle] = useState(false)

  const wake = useCallback(() => setIdle(false), [])
  useEffect(() => {
    if (idle) return
    const t = setTimeout(() => setIdle(true), 3000)
    return () => clearTimeout(t)
  }, [idle])
  useEffect(() => {
    const evs = ['mousemove', 'keydown', 'touchstart', 'click'] as const
    evs.forEach((e) => document.addEventListener(e, wake, { passive: true }))
    return () => evs.forEach((e) => document.removeEventListener(e, wake))
  }, [wake])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className={'nxc-col nxc-top' + (idle ? ' nxc-idle' : '')}>
        <button type="button" className="nxc-btn" onClick={onTheme} aria-label="Toggle theme" title="Theme (T)">
          {theme === 'light' ? (
            <Svg><path d="M20 12.5A8.5 8.5 0 0 1 11.5 4a7 7 0 1 0 8.5 8.5Z" /></Svg>
          ) : (
            <Svg><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></Svg>
          )}
        </button>
        <button type="button" className="nxc-btn" onClick={onOverview} aria-label="Overview" title="Overview (O)">
          <Svg><path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" /></Svg>
        </button>
        <button type="button" className="nxc-btn" onClick={onFullscreen} aria-label="Fullscreen" title="Fullscreen (F)">
          <Svg><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3" /></Svg>
        </button>
      </div>
      <div className={'nxc-col nxc-nav' + (idle ? ' nxc-idle' : '')}>
        <button type="button" className="nxc-btn" onClick={onPrev} disabled={index <= 0} aria-label="Previous slide">
          <Svg><path d="m15 5-7 7 7 7" /></Svg>
        </button>
        <span className="nxc-count">{pad(index + 1)}<i />{pad(total)}</span>
        <button type="button" className="nxc-btn" onClick={onNext} disabled={index >= total - 1} aria-label="Next slide">
          <Svg><path d="m9 5 7 7-7 7" /></Svg>
        </button>
      </div>
    </>
  )
}

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {children}
    </svg>
  )
}

const CSS = /* css */ `
.nxc-col{position:fixed;right:clamp(8px,1.2vw,18px);z-index:50;display:flex;flex-direction:column;align-items:center;gap:8px;transition:opacity .4s}
.nxc-top{top:30%}
.nxc-nav{top:56%}
.nxc-idle{opacity:0;pointer-events:none}
.nxc-btn{
  width:40px;height:40px;display:grid;place-items:center;cursor:pointer;
  border:1px solid var(--nxc-bd,#C8D3E0);border-radius:8px;color:var(--nxc-fg,#201F1E);
  background:color-mix(in srgb,var(--nxc-bg,#fff) 85%,transparent);
  backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
  transition:background .18s,color .18s,border-color .18s,transform .12s;
}
.nxc-btn:hover:not(:disabled){background:#0078D4;color:#fff;border-color:#0078D4}
.nxc-btn:active:not(:disabled){transform:scale(.93)}
.nxc-btn:disabled{opacity:.35;cursor:default}
.nxc-count{display:flex;flex-direction:column;align-items:center;gap:2px;font:500 12px ui-monospace,'Cascadia Code',Consolas,monospace;letter-spacing:.1em;color:var(--nxc-fg,#201F1E);font-variant-numeric:tabular-nums}
.nxc-count i{display:block;width:14px;height:1px;background:currentColor;opacity:.5}
[data-theme="dark"] .nxc-col,.dark .nxc-col{--nxc-bg:#252423;--nxc-fg:#F3F2F1;--nxc-bd:#55524E}
`
