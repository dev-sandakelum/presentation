// Nx Slide 23 · Demo Repository — "Scan to get the demo."
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide23DemoRepository() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">Follow Along</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>Scan to get the demo.</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
          <p style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-lead">Clone the repo and run it yourself.</p>
        </div>

        <div className="flex-1 mt-8">
          <div className="grid grid-cols-[auto_1fr] gap-[clamp(30px,4.5vw,64px)] items-center">
            <div style={{ '--d': '.3s', width:'min(18rem,24vw,38vh)', height:'min(18rem,24vw,38vh)', background:'var(--surface)', border:'1px solid var(--border)', boxShadow:'var(--shadow)' } as React.CSSProperties} className="nx-rv flex items-center justify-center rounded-2xl overflow-hidden">
              {/* EDIT: put your QR image at public/qr.png (or swap src for a data: URI) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/qr.png" alt="QR code for the demo repository" style={{ width:'100%', height:'100%', objectFit:'contain' }}
                onError={(e) => { e.currentTarget.style.display = 'none' }} />
            </div>
            <div style={{ '--d': '.42s' } as React.CSSProperties} className="nx-rv flex flex-col gap-5">
              {/* EDIT: your repo URL */}
              <a className="nx-chip self-start" href="https://github.com/yourhandle/nextjs-demo" target="_blank" rel="noopener noreferrer"><AtIcon /> github.com/yourhandle/nextjs-demo</a>
              <div className="nx-term">
                <div className="nx-term-bar">
                  <span className="nx-term-dots"><i /><i /><i /></span>
                  <span className="nx-term-title">bash</span>
                </div>
                <div className="nx-term-body">
                  <div className="nx-term-line"><span className="nx-term-prompt">$ </span>git clone &lt;repo-url&gt;</div>
                  <div className="nx-term-line"><span className="nx-term-prompt">$ </span>cd nextjs-demo</div>
                  <div className="nx-term-line"><span className="nx-term-prompt">$ </span>npm install</div>
                  <div className="nx-term-line"><span className="nx-term-prompt">$ </span>npm run dev</div>
                </div>
              </div>
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
