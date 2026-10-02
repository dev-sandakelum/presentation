/**
 * SlideDemo02 — Concept / Card Grid slide
 *
 * Layout  : left-aligned, headline + animated node flow + 3-col card grid
 * Features: staggered entrance, pres-grad headline, pres-arrow-pulse flow,
 *           pres-spotlight card hover, pres-plus-pulse connectors
 *
 * Drop into:  components/display/scenes/
 * Requires:   _scene.tsx in the same folder
 */

import Scene from './_scene'

// ── Data ─────────────────────────────────────────────────────────────
const flowNodes = [
  { idx: 'A', label: 'Input',   highlight: false },
  { idx: 'B', label: 'Process', highlight: true  },
  { idx: 'C', label: 'Output',  highlight: false },
]

const cards = [
  { num: '01', title: 'First concept',  body: 'One sentence describing what this concept means.' },
  { num: '02', title: 'Second concept', body: 'One sentence describing what this concept means.' },
  { num: '03', title: 'Third concept',  body: 'One sentence describing what this concept means.' },
]

export default function SlideDemo02() {
  return (
    <Scene>
      <div className="flex flex-col gap-6">

        {/* ── Kicker ── */}
        <div
          style={{ '--d': '0' } as React.CSSProperties}
          className="pres-rise inline-flex items-center gap-3 font-mono text-xs tracking-[0.24em] uppercase text-blue-400"
        >
          <span className="w-6 h-px bg-gradient-to-r from-transparent to-blue-400" />
          Section / Topic label
        </div>

        {/* ── Headline ── */}
        <h2
          style={{ '--d': '1' } as React.CSSProperties}
          className="pres-rise text-[clamp(2rem,4.6vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.04em] max-w-[1000px]"
        >
          Your headline with a{' '}
          <span className="pres-grad">gradient word</span>
        </h2>

        {/* ── Animated node flow ── */}
        <div
          style={{ '--d': '2' } as React.CSSProperties}
          className="pres-rise flex flex-wrap items-center gap-3 max-w-[1080px] w-full"
        >
          {flowNodes.flatMap((node, i) => [

            /* node box */
            <div
              key={node.idx}
              className={`px-5 py-3.5 rounded-2xl border font-semibold text-base
                transition-all hover:-translate-y-[3px] hover:border-blue-400/45
                ${node.highlight
                  ? 'border-blue-400/50 bg-gradient-to-b from-blue-400/14 to-blue-400/3 shadow-[0_0_28px_-6px_rgba(77,140,255,0.5)]'
                  : 'border-white/[0.14] bg-white/[0.045]'
                }`}
            >
              <span className="font-mono text-[0.56rem] tracking-[0.16em] text-blue-400 mr-2">
                {node.idx}
              </span>
              {node.label}
            </div>,

            /* animated arrow between nodes */
            i < flowNodes.length - 1 && (
              <span
                key={`arrow-${i}`}
                style={{ '--d': String(i) } as React.CSSProperties}
                className="pres-arrow-pulse text-blue-400 text-xl leading-none"
              >
                →
              </span>
            ),
          ])}
        </div>

        {/* ── Card grid ── */}
        <div
          style={{ '--d': '3' } as React.CSSProperties}
          className="pres-rise grid grid-cols-3 gap-4 max-w-[1150px] w-full"
        >
          {cards.map((card, i) => (
            <div
              key={card.num}
              style={{ '--d': String(i) } as React.CSSProperties}
              className="pres-rise pres-spotlight
                group relative overflow-hidden
                border border-white/[0.14]
                bg-gradient-to-b from-white/[0.05] to-white/[0.015]
                rounded-[18px] p-5
                transition-all duration-[450ms]
                hover:-translate-y-[5px]
                hover:border-blue-400/40
                hover:shadow-[0_18px_40px_-18px_rgba(60,120,255,0.35)]"
            >
              {/* card number */}
              <div className="font-mono text-[0.62rem] tracking-[0.22em] text-blue-400 mb-3">
                {card.num}
              </div>
              {/* card title */}
              <h3 className="font-semibold text-[1.05rem] tracking-[-0.01em] text-slate-100">
                {card.title}
              </h3>
              {/* card body */}
              <p className="text-[0.92rem] text-slate-400 mt-1.5">
                {card.body}
              </p>
            </div>
          ))}
        </div>

        {/* ── Optional body text ── */}
        <p
          style={{ '--d': '5' } as React.CSSProperties}
          className="pres-rise text-[clamp(1rem,1.5vw,1.22rem)] leading-[1.65] text-slate-400 max-w-[850px]"
        >
          A supporting sentence below the cards. Remove this{' '}
          <strong className="text-slate-100 font-semibold">&lt;p&gt;</strong> if not needed.
        </p>

      </div>
    </Scene>
  )
}
