// Slide 14 · Architecture — "Behind the experience"
import Scene from './_scene'

export default function Slide14Architecture() {
  return (
    <Scene>
      <div className="flex flex-col gap-6">
        <div style={{ '--d': '0' } as React.CSSProperties}
          className="pres-rise inline-flex items-center gap-3 font-mono text-xs tracking-[0.24em] uppercase text-blue-400">
          <span className="w-6 h-px bg-gradient-to-r from-transparent to-blue-400" />
          Demo architecture
        </div>

        <h2 style={{ '--d': '1' } as React.CSSProperties}
          className="pres-rise text-[clamp(2rem,4.6vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.04em] max-w-[1000px]">
          Behind the experience
        </h2>

        <div style={{ '--d': '2' } as React.CSSProperties}
          className="pres-rise border border-blue-400/16 rounded-2xl overflow-hidden max-w-[960px] w-full bg-gradient-to-b from-[#0a1424] to-[#060b16] shadow-[0_30px_80px_-30px_rgba(40,90,200,0.45)]">
          <div className="flex items-center gap-[7px] px-4 py-3 border-b border-white/[0.07] bg-white/[0.03]">
            <span className="size-[10px] rounded-full bg-[#ff5f57]" />
            <span className="size-[10px] rounded-full bg-[#febc2e]" />
            <span className="size-[10px] rounded-full bg-[#28c840]" />
            <span className="ml-auto font-mono text-[10px] tracking-[0.1em] text-slate-500">agent_architecture.tree</span>
          </div>
          <pre className="px-6 py-5 font-mono text-[clamp(0.78rem,1.35vw,0.98rem)] leading-[1.8] text-[#dce7f7] whitespace-pre-wrap">
{`User request\n    ↓\n`}<span className="text-blue-400 font-semibold">AI Agent</span>{`\n    ├── Instructions\n    ├── `}<span className="text-green-400">Retrieve relevant knowledge</span>{`\n    ├── `}<span className="text-green-400">Call a tool when needed</span>{`\n    └── Use the model to formulate a response\n    ↓\nHelpful, grounded result`}<span aria-hidden className="inline-block w-[0.55ch] min-w-[8px] h-[1.05em] translate-y-[0.18em] bg-blue-400 ml-[0.15em] shadow-[0_0_10px_theme(colors.blue.400)] pres-blink-fast" />
          </pre>
        </div>

        <p style={{ '--d': '3' } as React.CSSProperties}
          className="pres-rise text-[clamp(1rem,1.5vw,1.22rem)] leading-[1.65] text-slate-400 max-w-[850px]">
          Keep the architecture simple enough that students can redraw it from memory.
        </p>
      </div>
    </Scene>
  )
}
