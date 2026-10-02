// Slide 02 · The Hook — "What if AI could do more than answer?"
'use client'
import { useEffect, useRef, useState } from 'react'
import Scene from './_scene'

const PROMPT_TEXT = '"I have an exam in 10 days. Help me prepare."'

export default function Slide02Hook() {
  const [typed, setTyped] = useState('')
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    let j = 0
    setTyped('')
    const start = setTimeout(() => {
      timerRef.current = setInterval(() => {
        setTyped(PROMPT_TEXT.slice(0, ++j))
        if (j >= PROMPT_TEXT.length && timerRef.current) clearInterval(timerRef.current)
      }, 26)
    }, 600)
    return () => { clearTimeout(start); if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  return (
    <Scene>
      <div className="flex flex-col gap-6">
        <div style={{ '--d': '0' } as React.CSSProperties}
          className="pres-rise inline-flex items-center gap-3 font-mono text-xs tracking-[0.24em] uppercase text-blue-400">
          <span className="w-6 h-px bg-gradient-to-r from-transparent to-blue-400" />
          01 / The hook
        </div>

        <h2 style={{ '--d': '1' } as React.CSSProperties}
          className="pres-rise text-[clamp(2rem,4.6vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.04em] max-w-[1000px]">
          What if AI could do<br /><span className="pres-grad">more than answer?</span>
        </h2>

        <div style={{ '--d': '2' } as React.CSSProperties}
          className="pres-rise border border-blue-400/16 rounded-2xl overflow-hidden max-w-[960px] w-full bg-gradient-to-b from-[#0a1424] to-[#060b16] shadow-[0_30px_80px_-30px_rgba(40,90,200,0.45)]">
          <div className="flex items-center gap-[7px] px-4 py-3 border-b border-white/[0.07] bg-white/[0.03]">
            <span className="size-[10px] rounded-full bg-[#ff5f57]" />
            <span className="size-[10px] rounded-full bg-[#febc2e]" />
            <span className="size-[10px] rounded-full bg-[#28c840]" />
            <span className="ml-auto font-mono text-[10px] tracking-[0.1em] text-slate-500">student_prompt.txt</span>
          </div>
          <p className="px-6 py-5 font-mono text-[clamp(1rem,1.9vw,1.45rem)] leading-[1.55] text-[#dce8ff] min-h-[3em]">
            {typed}
            <span aria-hidden className="inline-block w-[0.55ch] min-w-[8px] h-[1.05em] translate-y-[0.18em] bg-blue-400 ml-[0.15em] shadow-[0_0_10px_theme(colors.blue.400)] pres-blink-fast" />
          </p>
        </div>

        <p style={{ '--d': '3' } as React.CSSProperties}
          className="pres-rise text-[clamp(1rem,1.5vw,1.22rem)] leading-[1.65] text-slate-400">
          Ask the room: <strong className="text-slate-100 font-semibold">is this already an AI agent?</strong>
        </p>
      </div>
    </Scene>
  )
}
