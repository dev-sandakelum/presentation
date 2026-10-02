// Slide 05 · Prompt Engineering — "A better prompt changes the result"
import Scene from './_scene'

export default function Slide05PromptEngineering() {
  return (
    <Scene>
      <div className="flex flex-col gap-6">
        <div style={{ '--d': '0' } as React.CSSProperties}
          className="pres-rise inline-flex items-center gap-3 font-mono text-xs tracking-[0.24em] uppercase text-blue-400">
          <span className="w-6 h-px bg-gradient-to-r from-transparent to-blue-400" />
          03 / Prompt engineering
        </div>

        <h2 style={{ '--d': '1' } as React.CSSProperties}
          className="pres-rise text-[clamp(2rem,4.6vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.04em] max-w-[1000px]">
          A better prompt <span className="pres-grad">changes the result</span>
        </h2>

        <div style={{ '--d': '2' } as React.CSSProperties}
          className="pres-rise grid grid-cols-2 gap-5 max-w-[1020px] w-full">
          <div className="pres-spotlight relative overflow-hidden p-6 rounded-[18px] border border-yellow-400/30 bg-white/[0.03] transition-all duration-[450ms] hover:-translate-y-[5px] hover:border-yellow-400/50 hover:shadow-[0_18px_40px_-18px_rgba(255,200,107,0.25)]">
            <div className="flex items-center gap-2 mb-4 font-mono text-[0.66rem] tracking-[0.2em] uppercase text-slate-400">
              <span className="size-2 rounded-full bg-yellow-400 shadow-[0_0_10px_theme(colors.yellow.400)] flex-shrink-0" />
              Weak
            </div>
            <strong className="text-slate-100 font-semibold text-lg leading-snug">"Explain cloud computing."</strong>
          </div>
          <div className="pres-spotlight relative overflow-hidden p-6 rounded-[18px] border border-green-400/35 bg-gradient-to-b from-green-400/7 to-green-400/[0.015] transition-all duration-[450ms] hover:-translate-y-[5px] hover:border-green-400/55 hover:shadow-[0_18px_40px_-18px_rgba(97,214,164,0.25)]">
            <div className="flex items-center gap-2 mb-4 font-mono text-[0.66rem] tracking-[0.2em] uppercase text-slate-400">
              <span className="size-2 rounded-full bg-green-400 shadow-[0_0_10px_theme(colors.green.400)] flex-shrink-0" />
              Better
            </div>
            <strong className="text-slate-100 font-semibold text-lg leading-snug">"Explain cloud computing to a first-year IT student using one analogy, three key ideas, and a short example."</strong>
          </div>
        </div>

        <div style={{ '--d': '3' } as React.CSSProperties}
          className="pres-rise flex flex-wrap items-center gap-3">
          {['Context', 'Task', 'Constraints', 'Output format'].flatMap((part, i, arr) => [
            <span key={part} className="font-mono text-[0.76rem] tracking-[0.05em] border border-white/[0.14] bg-white/[0.04] px-3.5 py-2 rounded-full">{part}</span>,
            i < arr.length - 1 && (
              <span key={`p${i}`} style={{ '--d': String(i) } as React.CSSProperties}
                className="pres-plus-pulse text-teal-400 font-semibold text-lg">+</span>
            ),
          ])}
        </div>
      </div>
    </Scene>
  )
}
