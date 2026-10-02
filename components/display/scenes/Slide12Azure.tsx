// Slide 12 · Azure — "Now let's build it with Microsoft Azure"
import Scene from './_scene'

const steps = [
  { idx: '01', label: 'Model' },
  { idx: '02', label: 'Agent' },
  { idx: '03', label: 'Knowledge' },
  { idx: '04', label: 'Tools', highlight: true },
]

export default function Slide12Azure() {
  return (
    <Scene>
      <div className="flex flex-col gap-6">
        <div style={{ '--d': '0' } as React.CSSProperties}
          className="pres-rise inline-flex items-center gap-3 font-mono text-xs tracking-[0.24em] uppercase text-blue-400">
          <span className="w-6 h-px bg-gradient-to-r from-transparent to-blue-400" />
          07 / Azure
        </div>

        <h2 style={{ '--d': '1' } as React.CSSProperties}
          className="pres-rise text-[clamp(2rem,4.6vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.04em] max-w-[1000px]">
          Now let's build it with <span className="pres-grad">Microsoft Azure</span>
        </h2>

        <p style={{ '--d': '2' } as React.CSSProperties}
          className="pres-rise text-[clamp(1rem,1.5vw,1.22rem)] leading-[1.65] text-slate-400 max-w-[850px]">
          Microsoft Foundry provides a workspace for building and managing AI applications and agents.
        </p>

        <div style={{ '--d': '3' } as React.CSSProperties}
          className="pres-rise flex flex-wrap items-center gap-3 max-w-[1080px] w-full">
          {steps.flatMap((s, i) => [
            <div key={s.idx}
              className={`px-5 py-3.5 rounded-2xl border font-semibold text-base transition-all hover:-translate-y-[3px] hover:border-blue-400/45 ${s.highlight ? 'border-blue-400/50 bg-gradient-to-b from-blue-400/14 to-blue-400/3 shadow-[0_0_28px_-6px_rgba(77,140,255,0.5)]' : 'border-white/[0.14] bg-white/[0.045]'}`}>
              <span className="font-mono text-[0.56rem] tracking-[0.16em] text-blue-400 mr-2">{s.idx}</span>{s.label}
            </div>,
            i < steps.length - 1 && (
              <span key={`p${i}`} style={{ '--d': String(i) } as React.CSSProperties}
                className="pres-plus-pulse text-teal-400 font-semibold text-xl leading-none">+</span>
            ),
          ])}
        </div>
      </div>
    </Scene>
  )
}
