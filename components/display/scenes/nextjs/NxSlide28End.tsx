// Nx Slide 28 · Questions? — "Questions?"
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide28End() {
  return (
    <SceneNx>
      <div className="flex flex-col items-center justify-center text-center py-16">
        <div style={{ '--d': '.05s' } as React.CSSProperties} className="nx-rv"><MsLogo /></div>
        <p style={{ '--d': '.15s' } as React.CSSProperties} className="nx-rv nx-kick mt-4">Part 1 of 3 — Concepts · Complete</p>
        <h2 style={{ '--d': '.25s', fontSize:'min(7rem,10vw,14vh)' } as React.CSSProperties} className="nx-h2 nx-mask"><span>Questions?</span></h2>
        <p style={{ '--d': '.45s' } as React.CSSProperties} className="nx-rv nx-lead mt-4"><span className="nx-grad">Thank you</span> for your time.</p>
        <div style={{ '--d': '.55s' } as React.CSSProperties} className="nx-rv nx-msa flex flex-wrap justify-center gap-8 mt-8">
          {[['#F25022','Learn'],['#7FBA00','Build'],['#00A4EF','Create'],['#FFB900','Make an Impact']].map(([color,label])=>(
            <span key={label} className="flex items-center gap-2"
              style={{ fontWeight:600, fontSize:'min(.95rem,1.05vw,1.7vh)', letterSpacing:'.08em', textTransform:'uppercase', color:'var(--fg)' }}>
              <i style={{ width:11, height:11, borderRadius:2, display:'block', background:color, flexShrink:0 }} />
              {label}
            </span>
          ))}
        </div>
        <p style={{ '--d': '.8s', color:'var(--faint)', fontSize:'min(.85rem,.95vw,1.5vh)' } as React.CSSProperties} className="nx-rv mt-8">
          Adapted from &quot;Next.js Unlocked&quot; &amp; &quot;Introduction to Next.js — Part 1: Concepts&quot; · Microsoft Learn Student Ambassadors
        </p>
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
