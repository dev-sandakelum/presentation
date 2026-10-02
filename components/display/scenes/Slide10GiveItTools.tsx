// Slide 10 · Give It Tools — Architecture diagram
import Scene from './_scene'

export default function Slide10GiveItTools() {
  return (
    <Scene>
      <div className="flex flex-col gap-6">
        <div style={{ '--d': '0' } as React.CSSProperties}
          className="pres-rise inline-flex items-center gap-3 font-mono text-xs tracking-[0.24em] uppercase text-blue-400">
          <span className="w-6 h-px bg-gradient-to-r from-transparent to-blue-400" />
          05 / Give it tools
        </div>

        <h2 style={{ '--d': '1' } as React.CSSProperties}
          className="pres-rise text-[clamp(2rem,4.6vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.04em] max-w-[1000px]">
          Knowledge lets AI <span className="pres-grad">know</span>.<br />
          Tools let AI <span className="pres-grad">do</span>.
        </h2>

        <div style={{ '--d': '2' } as React.CSSProperties}
          className="pres-rise grid grid-cols-[1fr_44px_1.4fr_44px_1fr] gap-3 items-center max-w-[1080px] w-full">

          <div className="border border-white/[0.14] rounded-[20px] p-5 bg-white/[0.03]">
            <h3 className="font-semibold text-[1.05rem] mb-3">Knowledge</h3>
            {['Course guide', 'Calendar', 'Handbook'].map(item => (
              <p key={item} className="text-[0.88rem] text-slate-400 mt-1.5 pl-4 relative before:absolute before:left-0 before:top-[0.62em] before:size-[6px] before:rounded-full before:bg-violet-400 before:opacity-75">{item}</p>
            ))}
          </div>

          <div className="relative h-0.5 bg-white/[0.18] rounded-sm">
            <span className="absolute -top-0.5 left-0 size-[6px] rounded-full bg-blue-400 shadow-[0_0_10px_theme(colors.blue.400)] pres-travel" />
          </div>

          <div className="pres-agent-glow relative text-center py-9 px-5 min-h-[230px] flex flex-col justify-center items-center border border-blue-400/45 rounded-[22px] bg-gradient-to-b from-blue-400/10 to-blue-400/2 overflow-hidden">
            <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 w-[300%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/30 pres-radar" />
            <span aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 w-[300%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/30 pres-radar-delay" />
            <strong className="relative z-10 text-[2rem] font-bold tracking-[-0.02em] [text-shadow:0_0_30px_rgba(77,163,255,0.8)]">AI&nbsp;Agent</strong>
            <span className="relative z-10 text-[0.85rem] text-slate-400 max-w-[26ch] mt-2">decides what information or capability is needed</span>
          </div>

          <div className="relative h-0.5 bg-white/[0.18] rounded-sm">
            <span className="absolute -top-0.5 right-0 size-[6px] rounded-full bg-blue-400 shadow-[0_0_10px_theme(colors.blue.400)] pres-travel-rev" />
          </div>

          <div className="border border-white/[0.14] rounded-[20px] p-5 bg-white/[0.03]">
            <h3 className="font-semibold text-[1.05rem] mb-3">Tools</h3>
            {['Schedule lookup', 'Quiz generator', 'Calculator'].map(item => (
              <p key={item} className="text-[0.88rem] text-slate-400 mt-1.5 pl-4 relative before:absolute before:left-0 before:top-[0.62em] before:size-[6px] before:rounded-full before:bg-blue-400 before:opacity-75">{item}</p>
            ))}
          </div>
        </div>
      </div>
    </Scene>
  )
}
