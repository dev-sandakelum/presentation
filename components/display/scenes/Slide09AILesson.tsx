// Slide 09 · AI Lesson
import Scene from './_scene'

export default function Slide09AILesson() {
  return (
    <Scene>
      <div className="flex flex-col items-center text-center gap-6">
        <div style={{ '--d': '0' } as React.CSSProperties}
          className="pres-rise inline-flex items-center gap-3 font-mono text-xs tracking-[0.24em] uppercase text-blue-400">
          <span className="w-6 h-px bg-gradient-to-r from-transparent to-blue-400" />
          A useful AI lesson
        </div>

        <blockquote style={{ '--d': '1' } as React.CSSProperties}
          className="pres-rise text-[clamp(1.7rem,3.6vw,3.4rem)] font-semibold leading-[1.15] tracking-[-0.025em] max-w-[1000px]">
          <span className="text-[1.5em] leading-[0] align-[-0.28em] text-blue-400 opacity-85">"</span>
          A good AI system doesn't need to answer <span className="pres-grad">everything</span>.
          <span className="text-[1.5em] leading-[0] align-[-0.28em] text-blue-400 opacity-85">"</span>
        </blockquote>

        <p style={{ '--d': '2' } as React.CSSProperties}
          className="pres-rise text-[clamp(1rem,1.5vw,1.22rem)] leading-[1.65] text-slate-400 max-w-[850px]">
          It should know when the available information is <strong className="text-slate-100 font-semibold">not enough</strong>.
        </p>
      </div>
    </Scene>
  )
}
