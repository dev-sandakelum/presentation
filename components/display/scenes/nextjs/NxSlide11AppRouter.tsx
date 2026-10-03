// Nx Slide 11 · Deep Dive: The App Router — "The App Router"
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide11AppRouter() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">Deep Dive — 01</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>The App Router</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
          <p style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-lead">Replaces the old /pages directory with a powerful, nested structure — everything lives in <em>app</em>.</p>
        </div>

        <div className="flex-1 mt-8">
          <div className="grid grid-cols-[1.08fr_1fr] gap-[clamp(30px,4.5vw,64px)] items-start">
            <div>
              <div style={{ '--d': '.25s' } as React.CSSProperties} className="nx-rv nx-code">
              <div className="nx-code-bar"><span>file tree</span><span className="nx-code-tag">app/</span></div>
              <pre>
              <span className="d">app/</span>{'\n'}
              {'├── '}<span className="f">page.tsx</span>{'            '}<span className="cm"># /</span>{'\n'}
              {'└── '}<span className="d">dashboard/</span>{'\n'}
              {'    └── '}<span className="f">page.tsx</span>{'        '}<span className="cm"># /dashboard</span>
            </pre>
            </div>
            </div>
          <div className="nx-rows">
            <div style={{ '--d': '.32s' } as React.CSSProperties} className="nx-rv nx-row">
              <span className="nx-row-ic"><FolderIcon /></span>
              <div><h4>Routes = Folders</h4><p>Every folder under <em>app</em> maps to a URL segment — no manual route configuration.</p></div>
            </div>
            <div style={{ '--d': '.44s' } as React.CSSProperties} className="nx-rv nx-row">
              <span className="nx-row-ic"><LayersIcon /></span>
              <div><h4>Nested Layouts</h4><p>Layouts persist across their children — no remounting between pages.</p></div>
            </div>
            <div style={{ '--d': '.56s' } as React.CSSProperties} className="nx-rv nx-row">
              <span className="nx-row-ic"><FileIcon /></span>
              <div><h4>Special Files</h4><p>page · layout · loading · error. A folder only becomes a public route once it holds a page.</p></div>
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

function LayersIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="m12 2.5 9.5 5L12 12.5l-9.5-5 9.5-5Z"/><path d="m2.5 12.5 9.5 5 9.5-5M2.5 17l9.5 5 9.5-5"/>
    </svg>
  )
}
