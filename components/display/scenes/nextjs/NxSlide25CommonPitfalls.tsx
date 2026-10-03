// Nx Slide 25 · Common Pitfalls — "Common pitfalls."
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide25CommonPitfalls() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">Troubleshooting</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>Common pitfalls.</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
          <p style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-lead">What usually goes wrong during the first hour.</p>
        </div>

        <div className="flex-1 mt-8">
          <div className="nx-phases">
            <div style={{ '--d': '.2s' } as React.CSSProperties} className="nx-rv nx-phase">
              <span className="nx-pn">01</span>
              <h4>Hooks on the server</h4>
              <p>Add &quot;use client&quot; when using useState or events.</p>
            </div>
            <div style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-phase">
              <span className="nx-pn">02</span>
              <h4>Wrong file name</h4>
              <p>Routes need page.tsx; APIs need route.ts.</p>
            </div>
            <div style={{ '--d': '.4s' } as React.CSSProperties} className="nx-rv nx-phase">
              <span className="nx-pn">03</span>
              <h4>Stale data</h4>
              <p>Fetch is cached — set cache or revalidate.</p>
            </div>
            <div style={{ '--d': '.5s' } as React.CSSProperties} className="nx-rv nx-phase">
              <span className="nx-pn">04</span>
              <h4>Port in use</h4>
              <p>Stop the old dev server or run with -p 3001.</p>
            </div>
          </div>
        </div>

      </div>
    </SceneNx>
  )
}
