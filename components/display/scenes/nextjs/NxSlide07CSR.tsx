// Nx Slide 07 · How React Works — CSR — "How React works — CSR"
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide07CSR() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">Rendering — 01</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>How React works — CSR</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
          <p style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-lead">Client-Side Rendering — the server sends a bare shell, and React builds the whole UI in the browser.</p>
        </div>

        <div className="flex-1 mt-8">
          <div style={{ '--d': '.25s' } as React.CSSProperties} className="nx-rv nx-flow">
            <div className="nx-step">
              <span className="n">01</span>
              <GlobeIcon />
              <h4>Request</h4><p>The browser asks the server for the page.</p>
            </div>
            <div className="nx-flow-sep"><ArrowRIcon /></div>
            <div className="nx-step">
              <span className="n">02</span>
              <FileIcon />
              <h4>Empty HTML</h4><p>The server responds with a bare shell.</p>
            </div>
            <div className="nx-flow-sep"><ArrowRIcon /></div>
            <div className="nx-step">
              <span className="n">03</span>
              <DownloadIcon />
              <h4>JS Download</h4><p>The browser fetches the React bundle.</p>
            </div>
            <div className="nx-flow-sep"><ArrowRIcon /></div>
            <div className="nx-step">
              <span className="n">04</span>
              <CpuIcon />
              <h4>Render</h4><p>React builds the UI on the client.</p>
            </div>
          </div>
          <div style={{ '--d': '.5s' } as React.CSSProperties} className="nx-rv nx-pc">
            <div className="nx-pros">
              <CheckIcon />
              <div><span className="tag">Pros</span><p>Rich, dynamic interactivity once the app has loaded.</p></div>
            </div>
            <div className="nx-cons">
              <XIcon />
              <div><span className="tag">Cons</span><p>Slow first load · weak SEO · JavaScript required.</p></div>
            </div>
          </div>
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

function CpuIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3M19 9h3m-3 6h3"/>
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="M12 3v12m-5-5 5 5 5-5M4 19h16"/>
    </svg>
  )
}

function FileIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Zm0 0v6h6"/>
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

function XIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18"/>
    </svg>
  )
}
