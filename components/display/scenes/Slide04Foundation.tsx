// Slide 04 · Foundation — "Start with the AI model"
import Scene from './_scene'

export default function Slide04Foundation() {
  return (
    <Scene>
      <div className="flex flex-col gap-6">
        <div style={{ '--d': '0' } as React.CSSProperties}
          className="pres-rise inline-flex items-center gap-3 font-mono text-xs tracking-[0.24em] uppercase text-blue-400">
          <span className="w-6 h-px bg-gradient-to-r from-transparent to-blue-400" />
          02 / The foundation
        </div>

        <h2 style={{ '--d': '1' } as React.CSSProperties}
          className="pres-rise text-[clamp(2rem,4.6vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.04em] max-w-[1000px]">
          Start with the <span className="pres-grad">AI model</span>
        </h2>

        <div style={{ '--d': '2' } as React.CSSProperties}
          className="pres-rise flex flex-wrap items-center gap-3 max-w-[1080px] w-full">
          {[
            { idx: 'IN',  label: 'Prompt',   highlight: false },
            null,
            { idx: 'AI',  label: 'Model',    highlight: true  },
            null,
            { idx: 'OUT', label: 'Response', highlight: false },
          ].map((item, i) =>
            item === null ? (
              <span key={`a${i}`} style={{ '--d': String(Math.floor(i / 2)) } as React.CSSProperties}
                className="pres-arrow-pulse text-blue-400 text-xl leading-none">→</span>
            ) : (
              <div key={item.idx}
                className={`px-5 py-3.5 rounded-2xl border font-semibold text-base transition-all hover:-translate-y-[3px] hover:border-blue-400/45 ${item.highlight ? 'border-blue-400/50 bg-gradient-to-b from-blue-400/14 to-blue-400/3 shadow-[0_0_28px_-6px_rgba(77,140,255,0.5)]' : 'border-white/[0.14] bg-white/[0.045]'}`}>
                <span className="font-mono text-[0.56rem] tracking-[0.16em] text-blue-400 mr-2">{item.idx}</span>
                {item.label}
              </div>
            )
          )}
        </div>

        <p style={{ '--d': '3' } as React.CSSProperties}
          className="pres-rise text-[clamp(1rem,1.5vw,1.22rem)] leading-[1.65] text-slate-400 max-w-[850px]">
          Generative AI is powerful at producing{' '}
          <strong className="text-slate-100 font-semibold">language</strong>,{' '}
          <strong className="text-slate-100 font-semibold">reasoning over context</strong>,{' '}
          <strong className="text-slate-100 font-semibold">transforming information</strong> and{' '}
          <strong className="text-slate-100 font-semibold">generating content</strong>.
        </p>
      </div>
    </Scene>
  )
}
