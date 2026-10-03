// Nx Slide 04 · What is Next.js? — "The React framework for the web."
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide04WhatIsNextjs() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">Foundation — 01</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>The React framework<br />for the web.</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
        </div>

        <div className="flex-1 mt-8">
          <div className="grid grid-cols-[1.08fr_1fr] gap-[clamp(30px,4.5vw,64px)] items-start">
            <div>
              <p style={{ '--d': '.28s' } as React.CSSProperties} className="nx-rv nx-lead">A full-stack React framework, built and maintained by Vercel — everything you need ships in the box. And every bit of your existing React knowledge still applies.</p>
              <div style={{ '--d': '.42s' } as React.CSSProperties} className="nx-rv flex flex-wrap gap-3 mt-5">
                <span className="nx-chip"><TriIcon /> Built on React</span>
                <span className="nx-chip nx-chip-ghost">Maintained by Vercel</span>
              </div>
              <div style={{ '--d': '.55s' } as React.CSSProperties} className="nx-rv nx-trust mt-6">
                <span className="nx-trust-k">Powering production at</span>
                <span className="nx-trust-n">Netflix · TikTok · Twitch</span>
              </div>
            </div>
          <div className="nx-rows">
            <div style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-row">
              <span className="nx-row-ic"><CircleCheckIcon /></span>
              <div><h4>Production-Ready</h4><p>Battle-tested at scale — the default choice for shipping React to the real world.</p></div>
            </div>
            <div style={{ '--d': '.42s' } as React.CSSProperties} className="nx-rv nx-row">
              <span className="nx-row-ic"><LayersIcon /></span>
              <div><h4>Full-Stack</h4><p>Routing, rendering, and API routes — front-end and back-end living in one project.</p></div>
            </div>
            <div style={{ '--d': '.54s' } as React.CSSProperties} className="nx-rv nx-row">
              <span className="nx-row-ic"><WrenchIcon /></span>
              <div><h4>Opinionated</h4><p>Sensible conventions decided for you — less time configuring, more time building.</p></div>
            </div>
          </div>
          </div>
        </div>

      </div>
    </SceneNx>
  )
}

function CircleCheckIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5L16 9.5"/>
    </svg>
  )
}

function LayersIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="m12 2.5 9.5 5L12 12.5l-9.5-5 9.5-5Z"/><path d="m2.5 12.5 9.5 5 9.5-5M2.5 17l9.5 5 9.5-5"/>
    </svg>
  )
}

function TriIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-current"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="M12 3 22 20H2Z"/>
    </svg>
  )
}

function WrenchIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="M14.5 6.5a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-8 7.9l-6.9 7a2.1 2.1 0 0 1-3-3l7-6.9a6 6 0 0 1 7.9-8l-3.8 3.8Z"/>
    </svg>
  )
}
