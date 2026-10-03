// Nx Slide 08 · What is SSR? — "What is SSR?"
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide08SSR() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">Rendering — 02</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>What is SSR?</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
          <p style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-lead">Server-Side Rendering — HTML is generated on the server, per request. The browser receives fully populated HTML, immediately.</p>
        </div>

        <div className="flex-1 mt-8">
          <div style={{ '--d': '.25s' } as React.CSSProperties} className="nx-rv nx-flow solid">
            <div className="nx-step">
              <span className="n">01</span>
              <GlobeIcon />
              <h4>Request</h4><p>The browser asks the server for the page.</p>
            </div>
            <div className="nx-flow-sep"><ArrowRIcon /></div>
            <div className="nx-step">
              <span className="n">02</span>
              <ServerIcon />
              <h4>Server Renders</h4><p>HTML is generated on the server, per request.</p>
            </div>
            <div className="nx-flow-sep"><ArrowRIcon /></div>
            <div className="nx-step">
              <span className="n">03</span>
              <MonitorIcon />
              <h4>Immediate Paint</h4><p>Content is visible right away — no blank screen.</p>
            </div>
            <div className="nx-flow-sep"><ArrowRIcon /></div>
            <div className="nx-step">
              <span className="n">04</span>
              <DropIcon />
              <h4>Hydration</h4><p>React attaches interactivity to the HTML.</p>
            </div>
          </div>
          <div style={{ '--d': '.5s' } as React.CSSProperties} className="nx-rv nx-pc">
            <div className="nx-pros">
              <CheckIcon />
              <div><span className="tag">Pros</span><p>Fast first paint · better SEO · accessible content.</p></div>
            </div>
            <div className="nx-cons">
              <XIcon />
              <div><span className="tag">Cons</span><p>More server load · interactions wait for hydration.</p></div>
            </div>
          </div>
          <p style={{ '--d': '.62s' } as React.CSSProperties} className="nx-rv nx-foot-note"><ArrowRIcon />Net result: better SEO and initial-load performance.</p>
        </div>

      </div>
    </SceneNx>
  )
}

function ArrowRIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="M4 12h16m-6-6 6 6-6 6"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="m5 12 5 5L20 7"/>
    </svg>
  )
}

function DropIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="M12 3a7 7 0 0 1 7 7c0 2-1 3.8-2.9 5.4-1.6 1.3-3.2 3.6-4.1 5.6-.9-2-2.5-4.3-4.1-5.6C6 13.8 5 12 5 10a7 7 0 0 1 7-7Z"/>
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5a14.5 14.5 0 0 1 0 19 14.5 14.5 0 0 1 0-19Z"/>
    </svg>
  )
}

function MonitorIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <rect x="2.5" y="3.5" width="19" height="13" rx="2"/><path d="M8 21h8m-4-4.5V21"/>
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

function XIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18"/>
    </svg>
  )
}
