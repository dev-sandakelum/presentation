// Nx Slide 02 · Your Presenter — "Your Name"
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide02Presenter() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full justify-center">
        <div style={{ '--d': '.1s', background:'var(--surface)', border:'1px solid var(--border)', boxShadow:'var(--shadow)' } as React.CSSProperties} className="nx-rv flex items-center gap-10 rounded-2xl p-10">
          {/* EDIT: AVATAR — replace initials or use an <img> */}
          <div style={{ '--d': '.22s', width:'min(11rem,14vw,22vh)', height:'min(11rem,14vw,22vh)', background:'var(--blue-soft)', border:'2px solid var(--chip-bd)', color:'var(--blue)', fontSize:'min(3.4rem,4.5vw,7vh)', fontWeight:700 } as React.CSSProperties} className="nx-rv nx-avatar flex items-center justify-center rounded-full flex-none">
            YN
          </div>
          <div className="flex-1">
            <p style={{ '--d': '.15s' } as React.CSSProperties} className="nx-rv nx-kick">Your Host</p>
            {/* EDIT: YOUR NAME */}
            <h3 style={{ '--d': '.2s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>Your Name</span></h3>
            {/* EDIT: ROLE */}
            <p style={{ '--d': '.34s' } as React.CSSProperties} className="nx-rv nx-lead">Microsoft Learn Student Ambassador · <b>Web &amp; Cloud enthusiast</b></p>
            {/* EDIT: FACTS */}
            <div style={{ '--d': '.44s', color:'var(--muted)' } as React.CSSProperties} className="nx-rv flex flex-wrap gap-6 mt-5">
              <span className="flex items-center gap-2"><GradIcon />Computer Science, Year 3</span>
              <span className="flex items-center gap-2"><CodeIcon />React &amp; Next.js builder</span>
              <span className="flex items-center gap-2"><PinIcon />Your City</span>
            </div>
            {/* EDIT: CONTACT */}
            <div style={{ '--d': '.56s' } as React.CSSProperties} className="nx-rv flex flex-wrap gap-3 mt-6">
              <a className="nx-chip" href="https://github.com/yourhandle" target="_blank" rel="noopener noreferrer"><AtIcon /> yourhandle</a>
              <a className="nx-chip" href="https://linkedin.com/in/yourhandle" target="_blank" rel="noopener noreferrer"><LinkIcon /> in/yourhandle</a>
              <a className="nx-chip" href="mailto:your@email.dev"><MailIcon /> your@email.dev</a>
            </div>
          </div>
        </div>
      </div>
    </SceneNx>
  )
}

function AtIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>
    </svg>
  )
}

function CodeIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="m15.5 18 6-6-6-6m-7 0-6 6 6 6"/>
    </svg>
  )
}

function GradIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="m2.5 9 9.5-4.5L21.5 9 12 13.5 2.5 9Z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M21.5 9v5"/>
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="M10 14a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 10a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>
    </svg>
  )
}

function PinIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="M12 21s-7-5.3-7-11a7 7 0 0 1 14 0c0 5.7-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/>
    </svg>
  )
}
