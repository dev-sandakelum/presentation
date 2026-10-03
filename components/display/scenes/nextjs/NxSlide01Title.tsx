// Nx Slide 01 · Next.js Unlocked — "Next.js Unlocked"
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide01Title() {
  return (
    <SceneNx>
      <div className="flex flex-col items-center justify-center text-center py-16">
        <div className="nx-glow" aria-hidden />
        <div style={{ '--d': '.05s' } as React.CSSProperties} className="nx-rv"><MsLogo /></div>
        <p style={{ '--d': '.12s' } as React.CSSProperties} className="nx-rv nx-kick mt-4">Microsoft Learn Student Ambassadors</p>
        <div style={{ '--d': '.2s' } as React.CSSProperties} className="nx-rv flex gap-3 mt-4">
          <span className="nx-chip">Part 1 of 3 — Concepts</span>
          <span className="nx-chip nx-chip-ghost">Next.js</span>
        </div>
        <h1 style={{ '--d': '.28s', fontSize:'min(7.6rem,11.5vw,15vh)', fontWeight:700, letterSpacing:'-.045em', lineHeight:.98, color:'var(--fg)' } as React.CSSProperties} className="nx-rv mt-6">
          Next.js <span className="nx-grad">Unlocked</span>
        </h1>
        <p style={{ '--d': '.45s' } as React.CSSProperties} className="nx-rv nx-lead mt-6">From React library to full-stack framework.</p>
        <div style={{ '--d': '.6s' } as React.CSSProperties} className="nx-rv nx-msa flex flex-wrap justify-center gap-8 mt-8">
          {[['#F25022','Learn'],['#7FBA00','Build'],['#00A4EF','Create'],['#FFB900','Make an Impact']].map(([color,label])=>(
            <span key={label} className="flex items-center gap-2"
              style={{ fontWeight:600, fontSize:'min(.95rem,1.05vw,1.7vh)', letterSpacing:'.08em', textTransform:'uppercase', color:'var(--fg)' }}>
              <i style={{ width:11, height:11, borderRadius:2, display:'block', background:color, flexShrink:0 }} />
              {label}
            </span>
          ))}
        </div>
        <div style={{ '--d': '.75s', color:'var(--faint)', fontSize:'min(.85rem,.95vw,1.5vh)' } as React.CSSProperties} className="nx-rv flex gap-6 mt-8">
          <span>← → navigate</span>
          <span>T theme</span>
          <span>F fullscreen</span>
          <span>O overview</span>
        </div>
      </div>
    </SceneNx>
  )
}

function MsLogo() {
  return (
    <svg className="nx-ms-logo" width="52" height="52" viewBox="0 0 23 23" aria-hidden>
      <rect x="1"  y="1"  width="10" height="10" rx="1.2" fill="#F25022" className="sq"/>
      <rect x="12" y="1"  width="10" height="10" rx="1.2" fill="#7FBA00" className="sq"/>
      <rect x="1"  y="12" width="10" height="10" rx="1.2" fill="#00A4EF" className="sq"/>
      <rect x="12" y="12" width="10" height="10" rx="1.2" fill="#FFB900" className="sq"/>
    </svg>
  )
}
