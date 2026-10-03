// Nx Slide 19 · Run the Dev Server — "Now start it."
'use client'
import SceneNx, { NxTerm, NxCopy } from './Q_scene_nx'

export default function NxSlide19RunDevServer() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">Hands On — Run</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>Now start it.</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
          <p style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-lead">With the structure in mind, enter the project and launch the dev server.</p>
        </div>

        <div className="flex-1 mt-8">
          <NxTerm rvDelay=".25s" title="bash — npm run dev" cmd="npm run dev" pre={[
            <><span className="nx-term-prompt">$ </span>cd my-app</>,
          ]} outs={[
            <><span className="nx-term-out"><span style={{ display:'inline-block', width:'1em', height:'1em', verticalAlign:'-.15em', color:'#4EC9B0' }}><TriIcon /></span> Next.js <span className="nx-term-dim">— ready when you are.</span></span></>,
            <><span className="nx-term-out"><span className="nx-term-dim">- Local:</span> http://localhost:3000</span></>,
            <><span className="nx-term-out"><span style={{ color:'var(--ok)' }}>√</span> Ready</span></>,
          ]} />
          <NxCopy cmd="npm run dev" rvDelay=".5s" />
        </div>

      </div>
    </SceneNx>
  )
}

function TriIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-current"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="M12 3 22 20H2Z"/>
    </svg>
  )
}
