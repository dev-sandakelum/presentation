// Slide 01 · Title — "From Prompt to AI Agent"
import Scene from './_scene'

export default function Slide01Title() {
  return (
    <Scene>
      <div className="flex flex-col items-center text-center">
        {/* spinning halos */}
        <div aria-hidden className="pres-halo" />
        <div aria-hidden className="pres-halo pres-halo-inner" />

        <div className="relative z-10 flex flex-col items-center gap-4">
          <div style={{ '--d': '0' } as React.CSSProperties}
            className="pres-rise inline-flex items-center gap-3 font-mono text-xs tracking-[0.24em] uppercase text-blue-400">
            <span className="w-6 h-px bg-gradient-to-r from-transparent to-blue-400" />
            Microsoft Azure · AI Session
          </div>

          <h1 style={{ '--d': '1' } as React.CSSProperties}
            className="pres-rise text-[clamp(3rem,7.5vw,7rem)] font-bold leading-[0.98] tracking-[-0.045em] max-w-[1100px]">
            From Prompt<br />to <span className="pres-grad">AI&nbsp;Agent</span>
          </h1>

          <p style={{ '--d': '2' } as React.CSSProperties}
            className="pres-rise text-[clamp(1rem,1.5vw,1.22rem)] leading-[1.65] text-slate-400 max-w-[850px]">
            How we move from asking AI questions to building systems that use{' '}
            <strong className="text-slate-100 font-semibold">knowledge</strong>,{' '}
            <strong className="text-slate-100 font-semibold">tools</strong> and{' '}
            <strong className="text-slate-100 font-semibold">actions</strong> to accomplish real goals.
          </p>

          <div style={{ '--d': '3' } as React.CSSProperties}
            className="pres-rise inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.035] font-mono text-xs text-slate-400">
            <span className="size-[7px] rounded-full bg-teal-400 shadow-[0_0_10px_theme(colors.teal.400)] pres-blink" />
            120-minute student workshop
          </div>
        </div>
      </div>
    </Scene>
  )
}
