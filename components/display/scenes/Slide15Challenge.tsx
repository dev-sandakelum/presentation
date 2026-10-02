// Slide 15 · Challenge — "Design your own student AI agent"
import Scene from './_scene'

const prompts = [
  { n: '01', title: 'Agent name',       sub: 'What would you call it?' },
  { n: '02', title: 'Problem',          sub: 'What student problem does it solve?' },
  { n: '03', title: 'Knowledge',        sub: 'What information does it need?' },
  { n: '04', title: 'Tools',            sub: 'What can it actually do?' },
  { n: '05', title: 'Instructions',     sub: 'How should it behave?' },
  { n: '06', title: 'Example request',  sub: 'What would a student ask?' },
]

export default function Slide15Challenge() {
  return (
    <Scene>
      <div className="flex flex-col gap-6">
        <div style={{ '--d': '0' } as React.CSSProperties}
          className="pres-rise inline-flex items-center gap-3 font-mono text-xs tracking-[0.24em] uppercase text-blue-400">
          <span className="w-6 h-px bg-gradient-to-r from-transparent to-blue-400" />
          09 / Challenge
        </div>

        <div style={{ '--d': '1' } as React.CSSProperties}
          className="pres-rise flex items-center gap-4 flex-wrap">
          <h2 className="text-[clamp(2rem,4.6vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.04em]">
            Design your own <span className="pres-grad">student AI agent</span>
          </h2>
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.035] font-mono text-xs text-slate-400">
            <span className="size-[7px] rounded-full bg-teal-400 shadow-[0_0_10px_theme(colors.teal.400)] pres-blink" />
            10 min → 2–3 demos
          </div>
        </div>

        <div style={{ '--d': '2' } as React.CSSProperties}
          className="pres-rise grid grid-cols-2 gap-3 max-w-[980px] w-full">
          {prompts.map((p, i) => (
            <div key={p.n} style={{ '--d': String(i) } as React.CSSProperties}
              className="pres-rise pres-spotlight group relative overflow-hidden flex gap-4 items-start border border-white/[0.14] rounded-[14px] p-4 bg-white/[0.03] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/35 hover:bg-white/[0.05]">
              <span className="font-mono text-[0.66rem] text-blue-400 pt-0.5 flex-shrink-0">{p.n}</span>
              <div>
                <strong className="font-semibold text-slate-100">{p.title}</strong>
                <small className="block text-slate-400 mt-1 text-[0.82rem] font-normal">{p.sub}</small>
              </div>
            </div>
          ))}
        </div>

        <p style={{ '--d': '4' } as React.CSSProperties}
          className="pres-rise text-[clamp(1rem,1.5vw,1.22rem)] leading-[1.65] text-slate-400 max-w-[850px]">
          Students work solo or in small groups — <strong className="text-slate-100 font-semibold">explain the problem before the technology</strong>.
        </p>
      </div>
    </Scene>
  )
}
