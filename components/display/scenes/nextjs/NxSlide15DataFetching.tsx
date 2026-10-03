// Nx Slide 15 · Deep Dive: Data Fetching — "Data fetching — before & after."
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide15DataFetching() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">Deep Dive — 03</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>Data fetching — before &amp; after.</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
        </div>

        <div className="flex-1 mt-8">
          <div className="nx-df-grid">
            <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv">
              <div className="nx-code">
              <div className="nx-code-bar"><span>The Old Way</span><span className="nx-code-tag">React · Client</span></div>
              <pre>
              <span className="kw">useEffect</span>{'(() => {\n  '}<span className="kw">fetch</span>{'('}<span className="str">{"'/api/data'"}</span>{')\n    .then(res => res.'}<span className="kw">json</span>{'())\n    .then(setData)\n}, [])'}
            </pre>
            </div>
              <p className="nx-df-cap err"><XIcon />Requires state, effects — and every fetch happens on the client.</p>
            </div>
            <div style={{ '--d': '.36s' } as React.CSSProperties} className="nx-rv">
              <div className="nx-code nx-code-hi">
              <div className="nx-code-bar"><span>The New Way</span><span className="nx-code-tag">Next.js · RSC</span></div>
              <pre>
              <span className="kw">export default async function</span>{' '}<span className="d">Page</span>{'() {\n  '}<span className="kw">const</span>{' res = '}<span className="kw">await</span>{' '}<span className="kw">fetch</span>{'('}<span className="str">{"'https://api.xyz/data'"}</span>{')\n  '}<span className="kw">const</span>{' data = '}<span className="kw">await</span>{' res.'}<span className="kw">json</span>{'()\n\n  '}<span className="kw">return</span>{' '}<span className="tk-tag">{'<h1>'}</span>{'{data.name}'}<span className="tk-tag">{'</h1>'}</span>{'\n}'}
            </pre>
            </div>
              <p className="nx-df-cap ok"><CheckIcon />Async components — fetching directly on the server.</p>
            </div>
          </div>
        </div>

      </div>
    </SceneNx>
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

function XIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18"/>
    </svg>
  )
}
