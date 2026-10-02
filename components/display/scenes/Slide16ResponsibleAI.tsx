// Slide 16 · Responsible AI — "Capability needs boundaries"
import Scene from './_scene'

const principles = [
  { title: 'Grounding',       body: 'Prefer relevant sources over invented facts.',            icon: <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round]"><path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z"/><path d="m9 11.5 2 2 4-4"/></svg> },
  { title: 'Permissions',     body: 'Give tools only the access they need.',                  icon: <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round]"><circle cx="7.5" cy="16.5" r="3.5"/><path d="M10.3 13.7 20 4"/><path d="M16.5 7.5 19 10"/></svg> },
  { title: 'Human oversight', body: 'Keep people involved in consequential actions.',         icon: <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round]"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg> },
  { title: 'Privacy',         body: "Don't casually feed sensitive personal data into demos.", icon: <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round]"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg> },
]

export default function Slide16ResponsibleAI() {
  return (
    <Scene>
      <div className="flex flex-col gap-6">
        <div style={{ '--d': '0' } as React.CSSProperties}
          className="pres-rise inline-flex items-center gap-3 font-mono text-xs tracking-[0.24em] uppercase text-blue-400">
          <span className="w-6 h-px bg-gradient-to-r from-transparent to-blue-400" />
          10 / Responsible AI
        </div>

        <h2 style={{ '--d': '1' } as React.CSSProperties}
          className="pres-rise text-[clamp(2rem,4.6vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.04em] max-w-[1000px]">
          Capability needs <span className="pres-grad">boundaries</span>
        </h2>

        <div style={{ '--d': '2' } as React.CSSProperties}
          className="pres-rise grid grid-cols-2 gap-4 max-w-[960px] w-full">
          {principles.map((p, i) => (
            <div key={p.title} style={{ '--d': String(i) } as React.CSSProperties}
              className="pres-rise pres-spotlight group relative overflow-hidden border border-white/[0.14] bg-gradient-to-b from-white/[0.05] to-white/[0.015] rounded-[18px] p-5 transition-all duration-[450ms] hover:-translate-y-[5px] hover:border-blue-400/40 hover:shadow-[0_18px_40px_-18px_rgba(60,120,255,0.35)]">
              <div className="w-[42px] h-[42px] rounded-xl grid place-items-center mb-4 text-blue-400 bg-gradient-to-br from-blue-400/18 to-violet-400/10 border border-white/[0.14]">{p.icon}</div>
              <h3 className="font-semibold text-[1.05rem] tracking-[-0.01em] text-slate-100">{p.title}</h3>
              <p className="text-[0.92rem] text-slate-400 mt-1.5">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Scene>
  )
}
