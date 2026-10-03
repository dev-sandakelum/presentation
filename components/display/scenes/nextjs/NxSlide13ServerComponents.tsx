// Nx Slide 13 · Deep Dive: Server Components — "Server Components — the new default."
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide13ServerComponents() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">Deep Dive — 02 · Part 1</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>Server Components —<br />the new default.</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
          <p style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-lead">Every component in the App Router is a Server Component — unless you explicitly say otherwise.</p>
        </div>

        <div className="flex-1 mt-8">
          <div className="nx-rows">
            <div style={{ '--d': '.28s' } as React.CSSProperties} className="nx-rv nx-row">
              <span className="nx-row-ic"><ServerIcon /></span>
              <div><h4>Zero Client Bundle</h4><p>Server Components never ship to the browser — no impact on your JavaScript bundle size.</p></div>
            </div>
            <div style={{ '--d': '.38s' } as React.CSSProperties} className="nx-rv nx-row">
              <span className="nx-row-ic"><DatabaseIcon /></span>
              <div><h4>Direct Backend Access</h4><p>Query databases and read secrets safely, right inside the component.</p></div>
            </div>
            <div style={{ '--d': '.48s' } as React.CSSProperties} className="nx-rv nx-row">
              <span className="nx-row-ic"><PointerIcon /></span>
              <div><h4>Opt-in Interactivity</h4><p>Add the &quot;use client&quot; directive only where you need state and events.</p></div>
            </div>
          </div>
        </div>

      </div>
    </SceneNx>
  )
}

function DatabaseIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <ellipse cx="12" cy="5.5" rx="8.5" ry="3"/><path d="M3.5 5.5v13c0 1.7 3.8 3 8.5 3s8.5-1.3 8.5-3v-13M3.5 12c0 1.7 3.8 3 8.5 3s8.5-1.3 8.5-3"/>
    </svg>
  )
}

function PointerIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="m3 3 7.1 17 2.5-7.4L20 10.1 3 3Z"/>
    </svg>
  )
}

function ServerIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="3.5" width="18" height="7" rx="1.5"/><rect x="3" y="13.5" width="18" height="7" rx="1.5"/><path d="M7 7h.01M7 17h.01"/>
    </svg>
  )
}
