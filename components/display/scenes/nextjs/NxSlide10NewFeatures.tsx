// Nx Slide 10 · New Features in Next.js 13+ — "A new generation of features."
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide10NewFeatures() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">What&apos;s New — 13+</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>A new generation of features.</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
          <p style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-lead">Next.js 13+ brought faster, smarter defaults for building modern applications.</p>
        </div>

        <div className="flex-1 mt-8">
          <div className="nx-feats">
            <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-feat"><span className="fn">01</span><h4>App Router</h4><p>A new routing system built on React conventions — intuitive and nested by design.</p></div>
            <div style={{ '--d': '.32s' } as React.CSSProperties} className="nx-rv nx-feat"><span className="fn">02</span><h4>Server Components</h4><p>Components render on the server, by default.</p></div>
            <div style={{ '--d': '.42s' } as React.CSSProperties} className="nx-rv nx-feat"><span className="fn">03</span><h4>Server Actions</h4><p>Run server-side code directly from your components.</p></div>
            <div style={{ '--d': '.52s' } as React.CSSProperties} className="nx-rv nx-feat"><span className="fn">04</span><h4>Streaming &amp; Suspense</h4><p>Progressive page loading with instant fallback UI.</p></div>
            <div style={{ '--d': '.62s' } as React.CSSProperties} className="nx-rv nx-feat"><span className="fn">05</span><h4>Built-in Optimizations</h4><p>Automatic image, font, and script optimization — no extra tooling.</p></div>
          </div>
        </div>

      </div>
    </SceneNx>
  )
}
