// Nx Slide 24 · Demo 4–5: API & Fetch — "Backend and fetch."
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide24DemoApiAndFetch() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">Demo · Phases 4–5</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>Backend and fetch.</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
          <p style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-lead">One route handler, one Server Component — full-stack.</p>
        </div>

        <div className="flex-1 mt-8">
          <div className="grid grid-cols-2 gap-[clamp(20px,3vw,40px)] items-start">
            <div style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-code">
              <div className="nx-code-bar"><span>app/api/hello/route.ts</span></div>
              <pre>
              <span className="kw">export</span>{' '}<span className="kw">async</span>{' '}<span className="kw">function</span>{' '}<span className="d">GET</span>{'() {\n  '}<span className="kw">return</span>{' Response.'}<span className="d">json</span>{'({ msg: '}<span className="str">{'"Hello"'}</span>{' });\n}'}
            </pre>
            </div>
            <div style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-code">
              <div className="nx-code-bar"><span>app/data/page.tsx</span></div>
              <pre>
              <span className="kw">export</span>{' '}<span className="kw">default</span>{' '}<span className="kw">async</span>{' '}<span className="kw">function</span>{' '}<span className="d">Data</span>{'() {\n  '}<span className="kw">const</span>{' res = '}<span className="kw">await</span>{' '}<span className="d">fetch</span>{'(\n    '}<span className="str">{'"http://localhost:3000/api/hello"'}</span>{',\n    { cache: '}<span className="str">{'"no-store"'}</span>{' });\n  '}<span className="kw">const</span>{' { msg } = '}<span className="kw">await</span>{' res.'}<span className="d">json</span>{'();\n  '}<span className="kw">return</span>{' '}<span className="tk-tag">{'<p>'}</span>{'{msg}'}<span className="tk-tag">{'</p>'}</span>{';\n}'}
            </pre>
            </div>
          </div>
        </div>

      </div>
    </SceneNx>
  )
}
