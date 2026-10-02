// Slide 17 · The Journey — recap flow
import Scene from './_scene'

const steps = [
  { idx: '01', label: 'Prompt',        highlight: false },
  { idx: '02', label: 'Better prompt', highlight: false },
  { idx: '03', label: 'Knowledge',     highlight: false },
  { idx: '04', label: 'Tools',         highlight: false },
  { idx: '05', label: 'Agent',         highlight: true  },
]

export default function Slide17Journey() {
  return (
    <Scene>
      <div className="flex flex-col items-center text-center gap-6">
        <div style={{ '--d': '0' } as React.CSSProperties}
          className="pres-rise inline-flex items-center gap-3 font-mono text-xs tracking-[0.24em] uppercase text-blue-400">
          <span className="w-6 h-px bg-gradient-to-r from-transparent to-blue-400" />
          The journey
        </div>

        <div style={{ '--d': '1' } as React.CSSProperties}
          className="pres-rise flex flex-wrap items-center justify-center gap-3 max-w-[1080px] w-full">
          {steps.flatMap((step, i) => [
            <div key={step.idx}
              className={`px-5 py-3.5 rounded-2xl border font-semibold text-base transition-all hover:-translate-y-[3px] hover:border-blue-400/45 ${step.highlight ? 'border-blue-400/50 bg-gradient-to-b from-blue-400/14 to-blue-400/3 shadow-[0_0_28px_-6px_rgba(77,140,255,0.5)]' : 'border-white/[0.14] bg-white/[0.045]'}`}>
              <span className="font-mono text-[0.56rem] tracking-[0.16em] text-blue-400 mr-2">{step.idx}</span>{step.label}
            </div>,
            i < steps.length - 1 && (
              <span key={`a${i}`} style={{ '--d': String(i) } as React.CSSProperties}
                className="pres-arrow-pulse text-blue-400 text-xl leading-none">→</span>
            ),
          ])}
        </div>

        <p style={{ '--d': '2' } as React.CSSProperties}
          className="pres-rise text-[clamp(1.9rem,4.4vw,3.9rem)] font-bold leading-[1.12] tracking-[-0.03em] text-slate-100 max-w-[1000px]">
          From asking AI questions<br />to <span className="pres-grad">building with AI</span>.
        </p>
      </div>
    </Scene>
  )
}
