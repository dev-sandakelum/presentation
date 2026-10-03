// Nx Slide 20 · Live Demo — Five Phases — "Watch it come together."
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide20LiveDemoPhases() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">Live Demo</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>Watch it come together.</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
          <p style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-lead">Five phases — from an empty folder to a fetching, full-stack app.</p>
        </div>

        <div className="flex-1 mt-8">
          <div className="nx-phases">
            <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-phase">
              <span className="nx-pn">01</span>
              <h4>Initialization</h4>
              <p>Run <code>npm run dev</code> and explore the default setup.</p>
              <span className="nx-chip">Setup</span>
            </div>
            <div style={{ '--d': '.32s' } as React.CSSProperties} className="nx-rv nx-phase">
              <span className="nx-pn">02</span>
              <h4>Building Routes</h4>
              <p>Create a folder and a <code>page.tsx</code> — a new view appears.</p>
              <span className="nx-chip">Frontend</span>
            </div>
            <div style={{ '--d': '.42s' } as React.CSSProperties} className="nx-rv nx-phase">
              <span className="nx-pn">03</span>
              <h4>Interactivity</h4>
              <p>Wire up <code>onClick</code> events with the &quot;use client&quot; directive.</p>
              <span className="nx-chip">Frontend</span>
            </div>
            <div style={{ '--d': '.52s' } as React.CSSProperties} className="nx-rv nx-phase">
              <span className="nx-pn">04</span>
              <h4>API Route</h4>
              <p>A <code>route.ts</code> file handles backend GET requests.</p>
              <span className="nx-chip">Backend</span>
            </div>
            <div style={{ '--d': '.62s' } as React.CSSProperties} className="nx-rv nx-phase">
              <span className="nx-pn">05</span>
              <h4>Fetching Data</h4>
              <p>A Server Component pulls data from our new API.</p>
              <span className="nx-chip">Full-Stack</span>
            </div>
          </div>
        </div>

      </div>
    </SceneNx>
  )
}
