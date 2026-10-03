// Nx Slide 05 · Did you know about React? — "Did you know about React?"
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide05ReactBaseline() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">The Baseline</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>Did you know about React?</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
          <p style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-lead">React is a UI library — not a full framework. It&apos;s powerful, but intentionally minimal.</p>
        </div>

        <div className="flex-1 mt-8">
          <div className="grid grid-cols-[1.08fr_1fr] gap-[clamp(30px,4.5vw,64px)] items-start">
            <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv flex flex-col items-center gap-4">
              <svg className="nx-react-logo" viewBox="0 0 220 220" aria-hidden>
                <g className="nx-react-spin">
                  <ellipse cx="110" cy="110" rx="92" ry="34" />
                  <ellipse cx="110" cy="110" rx="92" ry="34" transform="rotate(60 110 110)" />
                  <ellipse cx="110" cy="110" rx="92" ry="34" transform="rotate(120 110 110)" />
                </g>
                <circle className="core" cx="110" cy="110" r="9" />
              </svg>
              <div className="text-center">
                <span style={{ display:'block', fontWeight:600, fontSize:'var(--fs-h4)', marginBottom:7 }}>React</span>
                <span style={{ color:'var(--muted)', fontFamily:'var(--font-mono)', fontSize:'var(--fs-label)', letterSpacing:'.2em', textTransform:'uppercase' }}>A library for the View layer</span>
              </div>
            </div>
          <div className="nx-rows">
            <div style={{ '--d': '.28s' } as React.CSSProperties} className="nx-rv nx-row">
              <span className="nx-row-ic"><CodeIcon /></span>
              <div><h4>Component-Based</h4><p>Build UIs from small, reusable, declarative pieces.</p></div>
            </div>
            <div style={{ '--d': '.38s' } as React.CSSProperties} className="nx-rv nx-row">
              <span className="nx-row-ic"><SwapIcon /></span>
              <div><h4>No Built-in Routing</h4><p>You pick and install your own router — React Router, TanStack, and friends.</p></div>
            </div>
            <div style={{ '--d': '.48s' } as React.CSSProperties} className="nx-rv nx-row">
              <span className="nx-row-ic"><SearchIcon /></span>
              <div><h4>SEO Challenges</h4><p>Client-side rendering makes search indexing harder.</p></div>
            </div>
            <div style={{ '--d': '.58s' } as React.CSSProperties} className="nx-rv nx-row">
              <span className="nx-row-ic"><PlugIcon /></span>
              <div><h4>External Tools Required</h4><p>Routing and data fetching must be wired up by you.</p></div>
            </div>
          </div>
          </div>
        </div>

      </div>
    </SceneNx>
  )
}

function CodeIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="m15.5 18 6-6-6-6m-7 0-6 6 6 6"/>
    </svg>
  )
}

function PlugIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="M9 7V2m6 5V2M7.5 7h9v5a4.5 4.5 0 0 1-9 0V7ZM12 16.5V22"/>
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <circle cx="11" cy="11" r="7"/><path d="m21 21-4.5-4.5"/>
    </svg>
  )
}

function SwapIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="M8 3 4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4"/>
    </svg>
  )
}
