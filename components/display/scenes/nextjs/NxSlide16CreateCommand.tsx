// Nx Slide 16 · create-next-app: The Command — "One command to start."
'use client'
import SceneNx, { NxTerm, NxCopy } from './Q_scene_nx'

export default function NxSlide16CreateCommand() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">Hands On — Scaffold</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>One command to start.</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
          <p style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-lead">Run this in any empty folder. Node.js 18.18+ is the only requirement.</p>
        </div>

        <div className="flex-1 mt-8">
          <NxTerm rvDelay=".25s" title="bash — terminal" cmd="npx create-next-app@latest" />
          <NxCopy cmd="npx create-next-app@latest" rvDelay=".5s" />
        </div>

      </div>
    </SceneNx>
  )
}
