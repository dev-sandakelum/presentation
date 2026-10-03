// Nx Slide 18 · File Structure Overview — "The file structure."
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide18FileStructure() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">Hands On — Anatomy</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>The file structure.</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
          <p style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-lead">A fresh installation gives you a clean, predictable workspace — and <em>app</em> is the core of it all.</p>
        </div>

        <div className="flex-1 mt-8">
          <div className="grid grid-cols-[1.08fr_1fr] gap-[clamp(30px,4.5vw,64px)] items-start">
            <div>
              <div style={{ '--d': '.25s' } as React.CSSProperties} className="nx-rv nx-code">
              <div className="nx-code-bar"><span>file tree</span><span className="nx-code-tag">my-app/</span></div>
              <pre>
              {'my-app/\n├── '}<span className="d">app/</span>{'\n│   ├── '}<span className="d">layout.tsx</span>{'\n│   ├── '}<span className="d">page.tsx</span>{'\n│   └── '}<span className="f">globals.css</span>{'\n├── '}<span className="f">public/</span>{'\n├── '}<span className="f">next.config.js</span>{'\n└── '}<span className="f">package.json</span>
            </pre>
            </div>
            </div>
          <div className="nx-rows">
            <div style={{ '--d': '.32s' } as React.CSSProperties} className="nx-rv nx-row">
              <span className="nx-row-ic"><FolderIcon /></span>
              <div><h4>app/</h4><p>The root directory of the App Router — every route and every piece of UI lives here.</p></div>
            </div>
            <div style={{ '--d': '.44s' } as React.CSSProperties} className="nx-rv nx-row">
              <span className="nx-row-ic"><LayoutIcon /></span>
              <div><h4>layout.tsx</h4><p>Shared UI for a segment and its children — persistent headers and footers that never remount.</p></div>
            </div>
            <div style={{ '--d': '.56s' } as React.CSSProperties} className="nx-rv nx-row">
              <span className="nx-row-ic"><FileIcon /></span>
              <div><h4>page.tsx</h4><p>The unique UI of a route segment — its presence is what makes a route public.</p></div>
            </div>
          </div>
          </div>
        </div>

      </div>
    </SceneNx>
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

function FolderIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="M3.5 6.5A1.5 1.5 0 0 1 5 5h4l2 2.5h8a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 18.5H5A1.5 1.5 0 0 1 3.5 17V6.5Z"/>
    </svg>
  )
}

function LayoutIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
    </svg>
  )
}
