// Slide 13 · Live Build
import Scene from './_scene'

const steps = [
  { label: 'Agent',     sub: 'Create & instruct' },
  { label: 'Knowledge', sub: 'Connect documents' },
  { label: 'Test',      sub: 'Ask real questions' },
  { label: 'Tool',      sub: 'Add capability' },
]

export default function Slide13LiveBuild() {
  return (
    <Scene>
      <div className="flex flex-col items-center text-center gap-6">
        <div style={{ '--d': '0' } as React.CSSProperties}
          className="pres-rise inline-flex items-center gap-3 font-mono text-xs tracking-[0.24em] uppercase text-blue-400">
          <span className="w-6 h-px bg-gradient-to-r from-transparent to-blue-400" />
          08 / Live build
        </div>

        <h2 style={{ '--d': '1' } as React.CSSProperties}
          className="pres-rise text-[clamp(2rem,4.6vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.04em]">
          Let's build <span className="pres-grad">CampusMate</span>
        </h2>

        <div style={{ '--d': '2' } as React.CSSProperties}
          className="pres-rise inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.035] font-mono text-xs text-slate-400">
          <span className="size-[7px] rounded-full bg-teal-400 shadow-[0_0_10px_theme(colors.teal.400)] pres-blink" />
          Live demo · ~25 minutes
        </div>

        <div style={{ '--d': '3' } as React.CSSProperties}
          className="pres-rise flex max-w-[1000px] w-full mt-4">
          {steps.map((step, i) => (
            <div key={step.label} className="flex-1 relative pt-6 text-center">
              <span style={{ '--d': String(i) } as React.CSSProperties}
                className={`absolute top-0 h-0.5 pres-draw-line bg-gradient-to-r from-blue-400/45 to-blue-400/8 ${i === 0 ? 'left-1/2 right-0' : i === steps.length - 1 ? 'left-0 right-1/2' : 'left-0 right-0'}`} />
              <span style={{ '--d': String(i) } as React.CSSProperties}
                className="absolute top-[-5px] left-1/2 -translate-x-1/2 size-3 rounded-full bg-blue-400 pres-ping" />
              <b className="block font-semibold text-[0.95rem]">{step.label}</b>
              <span className="block text-slate-400 text-[0.74rem] mt-1 tracking-[0.04em]">{step.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </Scene>
  )
}
