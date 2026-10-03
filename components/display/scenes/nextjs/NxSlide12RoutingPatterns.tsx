// Nx Slide 12 · Folder-Based Routing Variants — "Three ways to shape a route."
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide12RoutingPatterns() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">Deep Dive — Routing Patterns</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>Three ways to shape a route.</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
        </div>

        <div className="flex-1 mt-8">
          <div className="nx-routs">
            <div style={{ '--d': '.25s' } as React.CSSProperties} className="nx-rv nx-rout">
              <div className="nx-rout-pat">
                <span className="nx-pat">app/about/page.tsx</span>
                <span className="nx-pat-tag">Standard · Static</span>
              </div>
              <div><h4>Static Routes</h4><p>A predictable, fixed path — nothing dynamic about it.</p></div>
              <span className="nx-url-chip">→ /about</span>
            </div>
            <div style={{ '--d': '.38s' } as React.CSSProperties} className="nx-rv nx-rout">
              <div className="nx-rout-pat">
                <span className="nx-pat">app/blog/[slug]/page.tsx</span>
                <span className="nx-pat-tag">Dynamic Segment</span>
              </div>
              <div><h4>Dynamic Routes</h4><p>Captures dynamic data from the URL — matches any value.</p></div>
              <span className="nx-url-chip">→ /blog/hello</span>
            </div>
            <div style={{ '--d': '.51s' } as React.CSSProperties} className="nx-rv nx-rout">
              <div className="nx-rout-pat">
                <span className="nx-pat">app/(marketing)/page.tsx</span>
                <span className="nx-pat-tag">Route Group</span>
              </div>
              <div><h4>Route Groups</h4><p>Organizes files logically — without affecting the URL path.</p></div>
              <span className="nx-url-chip">→ /</span>
            </div>
          </div>
        </div>

      </div>
    </SceneNx>
  )
}
