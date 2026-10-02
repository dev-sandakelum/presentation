// Slide 08 · CampusMate — Demo moment
import Scene from './_scene'

const sources = [
  { num: '01', title: 'Student Handbook',  sub: 'Rules & policies',    icon: <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round]"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg> },
  { num: '02', title: 'Academic Calendar', sub: 'Dates & deadlines',   icon: <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round]"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { num: '03', title: 'Course Guide',      sub: 'Course information',  icon: <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round]"><path d="M22 9 12 4 2 9l10 5 10-5z"/><path d="M6 11.5V16c0 1.66 2.69 3 6 3s6-1.34 6-3v-4.5"/><path d="M22 9v5"/></svg> },
]

export default function Slide08CampusMate() {
  return (
    <Scene>
      <div className="flex flex-col gap-6">
        <div style={{ '--d': '0' } as React.CSSProperties}
          className="pres-rise inline-flex items-center gap-3 font-mono text-xs tracking-[0.24em] uppercase text-blue-400">
          <span className="w-6 h-px bg-gradient-to-r from-transparent to-blue-400" />
          Demo moment
        </div>

        <div style={{ '--d': '1' } as React.CSSProperties}
          className="pres-rise flex items-center gap-4 flex-wrap">
          <h2 className="text-[clamp(2rem,4.6vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.04em]">
            Meet <span className="pres-grad">CampusMate</span>
          </h2>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-400/35 bg-red-400/9 text-[#ff9d9d] font-mono text-[0.66rem] tracking-[0.22em]">
            <span className="size-2 rounded-full bg-[#ff5f56] shadow-[0_0_12px_#ff5f56] pres-blink-live" />
            LIVE&nbsp;DEMO
          </div>
        </div>

        <p style={{ '--d': '2' } as React.CSSProperties}
          className="pres-rise text-[clamp(1rem,1.5vw,1.22rem)] leading-[1.65] text-slate-400 max-w-[850px]">
          A fictional university assistant that answers questions using a small, controlled knowledge base.
        </p>

        <div style={{ '--d': '3' } as React.CSSProperties}
          className="pres-rise grid grid-cols-3 gap-4 max-w-[1150px] w-full">
          {sources.map((s, i) => (
            <div key={s.num} style={{ '--d': String(i) } as React.CSSProperties}
              className="pres-rise pres-spotlight group relative overflow-hidden border border-white/[0.14] bg-gradient-to-b from-white/[0.05] to-white/[0.015] rounded-[18px] p-5 transition-all duration-[450ms] hover:-translate-y-[5px] hover:border-blue-400/40 hover:shadow-[0_18px_40px_-18px_rgba(60,120,255,0.35)]">
              <div className="w-[42px] h-[42px] rounded-xl grid place-items-center mb-4 text-blue-400 bg-gradient-to-br from-blue-400/18 to-violet-400/10 border border-white/[0.14]">{s.icon}</div>
              <div className="font-mono text-[0.62rem] tracking-[0.22em] text-blue-400 mb-2">{s.num}</div>
              <h3 className="font-semibold text-[1.05rem] tracking-[-0.01em] text-slate-100">{s.title}</h3>
              <p className="text-[0.92rem] text-slate-400 mt-1.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </Scene>
  )
}
