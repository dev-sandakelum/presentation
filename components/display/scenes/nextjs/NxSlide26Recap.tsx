// Nx Slide 26 · Recap & Key Takeaways — "What we learned."
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide26Recap() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">Recap</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>What we learned.</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
          <p style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-lead">Part 1 in four lines.</p>
        </div>

        <div className="flex-1 mt-8">
          <div className="nx-phases">
            <div style={{ '--d': '.2s' } as React.CSSProperties} className="nx-rv nx-phase">
              <span className="nx-pn">01</span>
              <h4>Framework</h4>
              <p>Next.js adds routing, rendering and backend to React.</p>
            </div>
            <div style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-phase">
              <span className="nx-pn">02</span>
              <h4>Rendering</h4>
              <p>SSR and Server Components fix the blank-screen problem.</p>
            </div>
            <div style={{ '--d': '.4s' } as React.CSSProperties} className="nx-rv nx-phase">
              <span className="nx-pn">03</span>
              <h4>App Router</h4>
              <p>Folders are routes; page.tsx makes them public.</p>
            </div>
            <div style={{ '--d': '.5s' } as React.CSSProperties} className="nx-rv nx-phase">
              <span className="nx-pn">04</span>
              <h4>Full-stack</h4>
              <p>Route handlers and server fetching in one project.</p>
            </div>
          </div>
        </div>

      </div>
    </SceneNx>
  )
}
