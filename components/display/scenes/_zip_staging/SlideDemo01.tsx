/**
 * SlideDemo01 — Title / Hero slide
 *
 * Layout  : centred, full-screen
 * Features: spinning halos, gradient headline, staggered entrance,
 *           blinking status chip
 *
 * Drop into:  components/display/scenes/
 * Requires:   _scene.tsx in the same folder
 */

import Scene from './_scene'

export default function SlideDemo01() {
  return (
    <Scene>
      <div className="flex flex-col items-center text-center">

        {/* ── Decorative spinning halos ── */}
        <div aria-hidden className="pres-halo" />
        <div aria-hidden className="pres-halo pres-halo-inner" />

        {/* ── Content stack ── */}
        <div className="relative z-10 flex flex-col items-center gap-5">

          {/* Kicker — enters first */}
          <div
            style={{ '--d': '0' } as React.CSSProperties}
            className="pres-rise inline-flex items-center gap-3 font-mono text-xs tracking-[0.24em] uppercase text-blue-400"
          >
            <span className="w-6 h-px bg-gradient-to-r from-transparent to-blue-400" />
            Your Event · Your Session Name
          </div>

          {/* Headline — enters second */}
          <h1
            style={{ '--d': '1' } as React.CSSProperties}
            className="pres-rise text-[clamp(3rem,7.5vw,7rem)] font-bold leading-[0.98] tracking-[-0.045em] max-w-[1100px]"
          >
            Your Big<br />
            <span className="pres-grad">Slide Title</span>
          </h1>

          {/* Body — enters third */}
          <p
            style={{ '--d': '2' } as React.CSSProperties}
            className="pres-rise text-[clamp(1rem,1.5vw,1.22rem)] leading-[1.65] text-slate-400 max-w-[780px]"
          >
            A short supporting sentence that gives context.
            Use <strong className="text-slate-100 font-semibold">bold</strong> to
            highlight key terms.
          </p>

          {/* Status chip — enters fourth */}
          <div
            style={{ '--d': '3' } as React.CSSProperties}
            className="pres-rise inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 bg-white/[0.035] font-mono text-xs text-slate-400"
          >
            {/* pres-blink makes this dot pulse slowly */}
            <span className="size-[7px] rounded-full bg-teal-400 shadow-[0_0_10px_theme(colors.teal.400)] pres-blink" />
            Optional label — e.g. "60-min workshop"
          </div>

        </div>
      </div>
    </Scene>
  )
}
