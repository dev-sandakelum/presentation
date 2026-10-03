// Nx Slide 27 · Resources & Next Steps — "Resources & next steps."
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide27Resources() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">Keep Learning</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>Resources &amp; next steps.</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
          <p style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-lead">Part 2 and 3 build directly on this.</p>
        </div>

        <div className="flex-1 mt-8">
          <div className="nx-phases">
            <div style={{ '--d': '.2s' } as React.CSSProperties} className="nx-rv nx-phase">
              <span className="nx-pn">01</span>
              <h4>Docs</h4>
              <p>nextjs.org/docs — official guides.</p>
            </div>
            <div style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-phase">
              <span className="nx-pn">02</span>
              <h4>Microsoft Learn</h4>
              <p>learn.microsoft.com — free modules.</p>
            </div>
            <div style={{ '--d': '.4s' } as React.CSSProperties} className="nx-rv nx-phase">
              <span className="nx-pn">03</span>
              <h4>Practice</h4>
              <p>Rebuild the demo with your own data.</p>
            </div>
            <div style={{ '--d': '.5s' } as React.CSSProperties} className="nx-rv nx-phase">
              <span className="nx-pn">04</span>
              <h4>Part 2 &amp; 3</h4>
              <p>Next: components, then deployment.</p>
            </div>
          </div>
        </div>

      </div>
    </SceneNx>
  )
}
