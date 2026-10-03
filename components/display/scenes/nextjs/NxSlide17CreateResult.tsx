// Nx Slide 17 · create-next-app: The Result — "Here's what you get."
'use client'
import SceneNx, { NxTerm } from './Q_scene_nx'

export default function NxSlide17CreateResult() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">Hands On — Result</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>Here&apos;s what you get.</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
          <p style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-lead">Answer the prompts, and a complete project is generated in seconds.</p>
        </div>

        <div className="flex-1 mt-8">
          <NxTerm rvDelay=".25s" title="bash — create-next-app" cmd="npx create-next-app@latest" outs={[
            <><span className="nx-term-out"><span style={{ color:'var(--ok)' }}>√</span> What is your project named? <span className="nx-term-dim">…</span> my-app</span></>,
            <><span className="nx-term-out"><span style={{ color:'var(--ok)' }}>√</span> Would you like to use TypeScript? <span className="nx-term-dim">…</span> Yes</span></>,
            <><span className="nx-term-out"><span style={{ color:'var(--ok)' }}>√</span> Would you like to use ESLint? <span className="nx-term-dim">…</span> Yes</span></>,
            <><span className="nx-term-out"><span style={{ color:'var(--ok)' }}>√</span> Would you like to use Tailwind CSS? <span className="nx-term-dim">…</span> No</span></>,
            <><span className="nx-term-out"><span style={{ color:'var(--ok)' }}>√</span> Would you like to use App Router? <span className="nx-term-dim">(recommended) …</span> Yes</span></>,
            <><span className="nx-term-out">Success! Created my-app <span className="nx-term-dim">— run</span> npm run dev <span className="nx-term-dim">to start.</span></span></>,
          ]} />
        </div>

      </div>
    </SceneNx>
  )
}
