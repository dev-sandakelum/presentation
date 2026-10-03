// Nx Slide 14 · Deep Dive: Server vs. Client Boundary — "Server by default, client by choice."
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide14ServerClientBoundary() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">Deep Dive — 02 · Part 2</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>Server by default,<br />client by choice.</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
          <p style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-lead">Keep the server as the default and add small client islands only where interactivity is needed.</p>
        </div>

        <div className="flex-1 mt-8">
          <div style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-boundary">
            <div className="nx-b-zone nx-b-server">
              <h5>Server — the default</h5>
              <div className="nx-b-list">
                <span className="nx-b-item">page.tsx</span>
                <span className="nx-b-item">layout.tsx</span>
                <span className="nx-b-item">fetch data</span>
                <span className="nx-b-item">db access</span>
                <span className="nx-b-item">secrets</span>
              </div>
            </div>
            <div className="nx-b-zone nx-b-client">
              <h5>Client — the island</h5>
              <div className="nx-b-list">
                <span className="nx-b-item nx-b-inv">&quot;use client&quot;</span>
                <span className="nx-b-item">state</span>
                <span className="nx-b-item">events</span>
                <span className="nx-b-item">browser APIs</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </SceneNx>
  )
}
