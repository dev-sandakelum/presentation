// Nx Slide 21 · Demo 1–2: Run & Route — "Run it. Then route it."
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide21DemoRunRoute() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">Demo · Phases 1–2</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>Run it. Then route it.</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
          <p style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-lead">An empty folder becomes a running app, then a new page.</p>
        </div>

        <div className="flex-1 mt-8">
          <div className="grid grid-cols-2 gap-[clamp(20px,3vw,40px)] items-start">
            <div style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-code">
              <div className="nx-code-bar"><span>Terminal</span></div>
              <pre>{'$ npm run dev\n  ▲ Next.js ready\n  - Local: http://localhost:3000'}</pre>
            </div>
            <div style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-code">
              <div className="nx-code-bar"><span>app/about/page.tsx</span></div>
              <pre>
              <span className="kw">export</span>{' '}<span className="kw">default</span>{' '}<span className="kw">function</span>{' '}<span className="d">About</span>{'() {\n  '}<span className="kw">return</span>{' '}<span className="tk-tag">{'<h1>'}</span>{'About us'}<span className="tk-tag">{'</h1>'}</span>{';\n}\n'}<span className="cm">{'// Visit /about — no router config'}</span>
            </pre>
            </div>
          </div>
        </div>

      </div>
    </SceneNx>
  )
}
