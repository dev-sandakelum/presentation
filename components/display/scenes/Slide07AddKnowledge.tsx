// Slide 07 · Add Knowledge — RAG
import Scene from './_scene'

export default function Slide07AddKnowledge() {
  return (
    <Scene>
      <div className="flex flex-col gap-6">
        <div style={{ '--d': '0' } as React.CSSProperties}
          className="pres-rise inline-flex items-center gap-3 font-mono text-xs tracking-[0.24em] uppercase text-blue-400">
          <span className="w-6 h-px bg-gradient-to-r from-transparent to-blue-400" />
          04 / Add knowledge
          <span className="font-mono text-[0.56rem] tracking-[0.18em] text-teal-400 border border-teal-400/35 bg-teal-400/8 px-2 py-0.5 rounded-md ml-1">RAG</span>
        </div>

        <h2 style={{ '--d': '1' } as React.CSSProperties}
          className="pres-rise text-[clamp(2rem,4.6vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.04em] max-w-[1000px]">
          Give AI access to <span className="pres-grad">relevant information</span>
        </h2>

        <div style={{ '--d': '2' } as React.CSSProperties}
          className="pres-rise flex flex-wrap items-center gap-3 max-w-[1080px] w-full">
          <div className="px-5 py-3.5 rounded-2xl border border-blue-400/50 bg-gradient-to-b from-blue-400/14 to-blue-400/3 shadow-[0_0_28px_-6px_rgba(77,140,255,0.5)] font-semibold text-base">
            <span className="font-mono text-[0.56rem] tracking-[0.16em] text-blue-400 mr-2">AI</span>Model
          </div>
          <span style={{ '--d': '0' } as React.CSSProperties} className="pres-plus-pulse text-teal-400 font-semibold text-xl leading-none">+</span>
          <div className="px-5 py-3.5 rounded-2xl border border-white/[0.14] bg-white/[0.045] font-semibold text-base">
            <span className="font-mono text-[0.56rem] tracking-[0.16em] text-blue-400 mr-2">DOCS</span>University documents
          </div>
          <span style={{ '--d': '1' } as React.CSSProperties} className="pres-arrow-pulse text-blue-400 text-xl leading-none">→</span>
          <div className="px-5 py-3.5 rounded-2xl border border-white/[0.14] bg-white/[0.045] font-semibold text-base">
            <span className="font-mono text-[0.56rem] tracking-[0.16em] text-blue-400 mr-2">OUT</span>Grounded answer
          </div>
        </div>

        <p style={{ '--d': '3' } as React.CSSProperties}
          className="pres-rise text-[clamp(1rem,1.5vw,1.22rem)] leading-[1.65] text-slate-400 max-w-[850px]">
          Don't expect the model to know everything —{' '}
          <strong className="text-slate-100 font-semibold">retrieve</strong> relevant information from trusted sources and provide it as context.
        </p>
      </div>
    </Scene>
  )
}
