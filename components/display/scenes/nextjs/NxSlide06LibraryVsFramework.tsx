// Nx Slide 06 · Library vs. Framework — "Library vs. Framework"
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide06LibraryVsFramework() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">The Key Insight</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>Library vs. Framework</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
        </div>

        <div className="flex-1 mt-8">
          <blockquote style={{ '--d': '.22s' } as React.CSSProperties} className="nx-quote nx-mask">
            <span>“With a library, you&apos;re the architect. With a framework, the structure is already designed — you fill in the details.”</span>
          </blockquote>
          <div className="nx-defs">
            <div style={{ '--d': '.38s' } as React.CSSProperties} className="nx-rv nx-def">
              <span className="nx-def-ic"><BoxIcon /></span>
              <h4>The Foundation</h4>
              <p>Provides a predefined structure for your application.</p>
            </div>
            <div style={{ '--d': '.48s' } as React.CSSProperties} className="nx-rv nx-def">
              <span className="nx-def-ic"><WrenchIcon /></span>
              <h4>Built-in Tools</h4>
              <p>Routing and bundling are included, out of the box.</p>
            </div>
            <div style={{ '--d': '.58s' } as React.CSSProperties} className="nx-rv nx-def">
              <span className="nx-def-ic"><RepeatIcon /></span>
              <h4>Inversion of Control</h4>
              <p>The framework calls your code — not the other way around.</p>
            </div>
          </div>
          <p style={{ '--d': '.72s' } as React.CSSProperties} className="nx-rv nx-foot-note"><ArrowRIcon />Next.js adds conventions on top of React — so your team spends less time on setup and more time on shipping.</p>
        </div>

      </div>
    </SceneNx>
  )
}

function ArrowRIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="M4 12h16m-6-6 6 6-6 6"/>
    </svg>
  )
}

function BoxIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="M21 8.2a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4a2 2 0 0 0-1 1.7v7.6a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>
    </svg>
  )
}

function RepeatIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="m17 2 4 4-4 4M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v1a4 4 0 0 1-4 4H3"/>
    </svg>
  )
}

function WrenchIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="M14.5 6.5a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-8 7.9l-6.9 7a2.1 2.1 0 0 1-3-3l7-6.9a6 6 0 0 1 7.9-8l-3.8 3.8Z"/>
    </svg>
  )
}
