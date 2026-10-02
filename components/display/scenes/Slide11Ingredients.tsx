// Slide 11 · Ingredients — What makes an agent?
import Scene from './_scene'

const cards = [
  { num: 'MODEL',        title: 'Generate & reason',  body: 'Interprets requests and produces responses.' },
  { num: 'INSTRUCTIONS', title: 'Set behavior',        body: 'Define role, boundaries, and response style.' },
  { num: 'KNOWLEDGE',    title: 'Ground answers',      body: 'Retrieve relevant information from sources.' },
  { num: 'TOOLS',        title: 'Take action',         body: 'Call functions, APIs, or other capabilities.' },
  { num: 'GOAL',         title: 'Accomplish a task',   body: "Coordinate capabilities around the user's objective." },
  { num: 'GUARDRAILS',   title: 'Stay controlled',     body: 'Limit unsafe, irrelevant, or unsupported behavior.' },
]

export default function Slide11Ingredients() {
  return (
    <Scene>
      <div className="flex flex-col gap-6">
        <div style={{ '--d': '0' } as React.CSSProperties}
          className="pres-rise inline-flex items-center gap-3 font-mono text-xs tracking-[0.24em] uppercase text-blue-400">
          <span className="w-6 h-px bg-gradient-to-r from-transparent to-blue-400" />
          06 / What makes an agent?
        </div>

        <h2 style={{ '--d': '1' } as React.CSSProperties}
          className="pres-rise text-[clamp(2rem,4.6vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.04em] max-w-[1000px]">
          Model <span className="text-teal-400">+</span> Instructions <span className="text-teal-400">+</span> Knowledge <span className="text-teal-400">+</span> Tools
        </h2>

        <div style={{ '--d': '2' } as React.CSSProperties}
          className="pres-rise grid grid-cols-3 gap-4 max-w-[1150px] w-full">
          {cards.map((c, i) => (
            <div key={c.num} style={{ '--d': String(i) } as React.CSSProperties}
              className="pres-rise pres-spotlight group relative overflow-hidden border border-white/[0.14] bg-gradient-to-b from-white/[0.05] to-white/[0.015] rounded-[18px] p-5 transition-all duration-[450ms] hover:-translate-y-[5px] hover:border-blue-400/40 hover:shadow-[0_18px_40px_-18px_rgba(60,120,255,0.35)]">
              <div className="font-mono text-[0.62rem] tracking-[0.22em] text-blue-400 mb-3">{c.num}</div>
              <h3 className="font-semibold text-[1.05rem] tracking-[-0.01em] text-slate-100">{c.title}</h3>
              <p className="text-[0.92rem] text-slate-400 mt-1.5">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Scene>
  )
}
