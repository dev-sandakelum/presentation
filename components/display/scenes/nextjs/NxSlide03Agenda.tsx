// Nx Slide 03 · Agenda — "Today's agenda."
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide03Agenda() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">What We&apos;ll Cover</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>Today&apos;s agenda.</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
        </div>

        <div className="flex-1 mt-8">
          <div className="nx-agenda">
            <div style={{ '--d': '.2s' } as React.CSSProperties} className="nx-rv nx-ag"><span className="nx-ag-n">01</span><div><h4>The Baseline</h4><p>React refresher — library, view layer, tooling gaps.</p></div></div>
            <div style={{ '--d': '.28s' } as React.CSSProperties} className="nx-rv nx-ag"><span className="nx-ag-n">02</span><div><h4>Library vs. Framework</h4><p>Who calls whose code — and why it matters.</p></div></div>
            <div style={{ '--d': '.36s' } as React.CSSProperties} className="nx-rv nx-ag"><span className="nx-ag-n">03</span><div><h4>Rendering</h4><p>CSR and SSR, step by step — the blank screen problem.</p></div></div>
            <div style={{ '--d': '.44s' } as React.CSSProperties} className="nx-rv nx-ag"><span className="nx-ag-n">04</span><div><h4>React vs. Next.js</h4><p>Head-to-head — routing, SEO, backend, setup.</p></div></div>
            <div style={{ '--d': '.52s' } as React.CSSProperties} className="nx-rv nx-ag"><span className="nx-ag-n">05</span><div><h4>Next.js 13+</h4><p>App Router, Server Components, Actions, streaming.</p></div></div>
            <div style={{ '--d': '.6s' } as React.CSSProperties} className="nx-rv nx-ag"><span className="nx-ag-n">06</span><div><h4>Deep Dives</h4><p>Routing patterns, Server Components, data fetching.</p></div></div>
            <div style={{ '--d': '.68s' } as React.CSSProperties} className="nx-rv nx-ag"><span className="nx-ag-n">07</span><div><h4>Getting Started</h4><p>One CLI command — project anatomy.</p></div></div>
            <div style={{ '--d': '.76s' } as React.CSSProperties} className="nx-rv nx-ag"><span className="nx-ag-n">08</span><div><h4>Live Demo</h4><p>Five phases — from dev server to full-stack.</p></div></div>
          </div>
        </div>

      </div>
    </SceneNx>
  )
}
