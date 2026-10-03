// Nx Slide 22 · Demo 3: Interactivity — "Add interactivity."
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide22DemoInteractivity() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">Demo · Phase 3</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>Add interactivity.</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
          <p style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-lead">Server by default — opt in to the client only where needed.</p>
        </div>

        <div className="flex-1 mt-8">
          <div className="grid grid-cols-2 gap-[clamp(20px,3vw,40px)] items-start">
            <div style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-code">
              <div className="nx-code-bar"><span>app/counter/page.tsx</span></div>
              <pre>
              <span className="str">{'"use client"'}</span>{';\n'}<span className="kw">import</span>{' { useState } '}<span className="kw">from</span>{' '}<span className="str">{'"react"'}</span>{';\n\n'}<span className="kw">export</span>{' '}<span className="kw">default</span>{' '}<span className="kw">function</span>{' '}<span className="d">Counter</span>{'() {\n  '}<span className="kw">const</span>{' [n, setN] = '}<span className="d">useState</span>{'(0);\n  '}<span className="kw">return</span>{' '}<span className="tk-tag">{'<button'}</span>{' onClick={() => '}<span className="d">setN</span>{'(n + 1)}'}<span className="tk-tag">{'>'}</span>{'\n    Clicked {n}\n  '}<span className="tk-tag">{'</button>'}</span>{';\n}'}
            </pre>
            </div>
            <div style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-code">
              <div className="nx-code-bar"><span>Why "use client"?</span></div>
              <pre>{'Hooks and event handlers need the browser.\nWithout the directive, this file runs on\nthe server and onClick will fail.\n\nTip: keep client components small and leaf-level.'}</pre>
            </div>
          </div>
        </div>

      </div>
    </SceneNx>
  )
}
