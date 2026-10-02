// Slide 18 · Closing — "Don't just use AI. Build with it."
import Scene from './_scene'

const resources = ['Microsoft Learn', 'Azure', 'Microsoft Foundry']

export default function Slide18Closing() {
  return (
    <Scene>
      <div className="flex flex-col items-center text-center gap-6">
        <div style={{ '--d': '0' } as React.CSSProperties}
          className="pres-rise inline-flex items-center gap-3 font-mono text-xs tracking-[0.24em] uppercase text-blue-400">
          <span className="w-6 h-px bg-gradient-to-r from-transparent to-blue-400" />
          Take it further
        </div>

        <h2 style={{ '--d': '1' } as React.CSSProperties}
          className="pres-rise text-[clamp(2rem,4.6vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.04em] max-w-[1000px]">
          Don't just use AI.<br /><span className="pres-grad">Build with it.</span>
        </h2>

        <p style={{ '--d': '2' } as React.CSSProperties}
          className="pres-rise text-[clamp(1.05rem,1.8vw,1.35rem)] leading-[1.65] text-slate-400 max-w-[640px]">
          Explore Microsoft Learn, experiment with Azure AI, and turn one real problem into a small AI application.
        </p>

        <div style={{ '--d': '3' } as React.CSSProperties}
          className="pres-rise flex gap-3 flex-wrap justify-center">
          {resources.map((r, i) => (
            <span key={r} style={{ '--d': String(i) } as React.CSSProperties}
              className="pres-rise inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.035] font-mono text-xs text-slate-400 transition-all hover:border-blue-400/35 hover:bg-white/[0.06] hover:-translate-y-0.5">
              {r}
            </span>
          ))}
        </div>
      </div>
    </Scene>
  )
}
