// Nx Slide 09 · React vs. Next.js — "React vs. Next.js"
'use client'
import SceneNx from './Q_scene_nx'

export default function NxSlide09ReactVsNextjs() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">Head to Head</p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask"><span>React vs. Next.js</span></h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
        </div>

        <div className="flex-1 mt-8">
          <div style={{ '--d': '.25s' } as React.CSSProperties} className="nx-rv nx-vs-wrap">
            <table className="nx-vs">
              <thead>
                <tr>
                  <th className="corner"></th>
                  <th>React — CSR</th>
                  <th className="nx-col">Next.js — SSR / Full-Stack</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Routing</td>
                  <td><span className="nx-cl nx-cl-x"><XIcon />Manual — install a library</span></td>
                  <td className="nx-col"><span className="nx-cl nx-cl-ok"><CheckIcon />File-based, built-in</span></td>
                </tr>
                <tr>
                  <td>Rendering</td>
                  <td><span className="nx-cl nx-cl-x"><XIcon />CSR only</span></td>
                  <td className="nx-col"><span className="nx-cl nx-cl-ok"><CheckIcon />CSR · SSR · SSG · ISR</span></td>
                </tr>
                <tr>
                  <td>Backend</td>
                  <td><span className="nx-cl nx-cl-x"><XIcon />None — external API needed</span></td>
                  <td className="nx-col"><span className="nx-cl nx-cl-ok"><CheckIcon />Built-in API routes</span></td>
                </tr>
                <tr>
                  <td>SEO</td>
                  <td><span className="nx-cl nx-cl-x"><XIcon />Poor by default</span></td>
                  <td className="nx-col"><span className="nx-cl nx-cl-ok"><CheckIcon />Excellent out of the box</span></td>
                </tr>
                <tr>
                  <td>Setup</td>
                  <td><span className="nx-cl nx-cl-x"><XIcon />Many tools to configure</span></td>
                  <td className="nx-col"><span className="nx-cl nx-cl-ok"><CheckIcon />Zero config to start</span></td>
                </tr>
                <tr>
                  <td>First Load</td>
                  <td><span className="nx-cl nx-cl-x"><XIcon />Blank screen first</span></td>
                  <td className="nx-col"><span className="nx-cl nx-cl-ok"><CheckIcon />Instant page view</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </SceneNx>
  )
}

function CheckIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="m5 12 5 5L20 7"/>
    </svg>
  )
}

function XIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18"/>
    </svg>
  )
}
