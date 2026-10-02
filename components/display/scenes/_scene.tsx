/**
 * _scene.tsx — Self-contained style injector for presentation slides.
 *
 * Import and wrap every slide in <Scene>…</Scene>.
 * This injects all animation keyframes and utility classes the slides rely on,
 * so each slide file is fully portable — no external CSS dependencies.
 *
 * Usage:
 *   import Scene from './_scene'
 *   export default function SlideXX() {
 *     return <Scene> … your content … </Scene>
 *   }
 */

'use client'

import { useEffect, useRef } from 'react'

const STYLE_ID = 'pres-scene-styles'

const CSS = /* css */ `
/* ── Design tokens ──────────────────────────────────────── */
.pres-scene {
  --blue:   #4da3ff;
  --violet: #9b8cff;
  --teal:   #3ee6c4;
  --muted:  #93a0b8;
  --ease:   cubic-bezier(.22,1,.36,1);
}

/* ── Gradient text ──────────────────────────────────────── */
.pres-grad {
  background: linear-gradient(90deg, #4da3ff, #9b8cff 35%, #3ee6c4 70%, #4da3ff);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: presGradShift 7s linear infinite;
}

/* ── Staggered entrance — forward ───────────────────────── */
.pres-rise {
  animation: presRise 0.9s var(--ease, cubic-bezier(.22,1,.36,1)) backwards;
  animation-delay: calc(var(--d, 0) * 90ms + 120ms);
}
/* ── Staggered entrance — backward ─────────────────────── */
.pres-rise-back {
  animation: presRiseBack 0.9s var(--ease, cubic-bezier(.22,1,.36,1)) backwards;
  animation-delay: calc(var(--d, 0) * 90ms + 120ms);
}

/* ── Blink variants ─────────────────────────────────────── */
.pres-blink      { animation: presBlink 2.4s infinite; }
.pres-blink-fast { animation: presBlink 1.05s steps(2,start) infinite; }
.pres-blink-live { animation: presBlink 1.2s infinite; }

/* ── Arrow pulse ────────────────────────────────────────── */
.pres-arrow-pulse {
  animation: presArrowPulse 1.6s ease-in-out infinite;
  animation-delay: calc(var(--d, 0) * 0.18s);
}

/* ── Plus pulse ─────────────────────────────────────────── */
.pres-plus-pulse {
  animation: presPlusPulse 1.9s ease-in-out infinite;
  animation-delay: calc(var(--d, 0) * 0.18s);
}

/* ── Agent centre glow ──────────────────────────────────── */
.pres-agent-glow {
  animation: presAgentGlow 3.5s ease-in-out infinite;
}

/* ── Radar rings ────────────────────────────────────────── */
.pres-radar       { animation: presRadar 3.2s linear infinite; }
.pres-radar-delay { animation: presRadar 3.2s linear infinite 1.6s; }

/* ── Travelling dot ─────────────────────────────────────── */
.pres-travel     { animation: presTravel 2.2s linear infinite; }
.pres-travel-rev { animation: presTravel 2.2s linear infinite reverse; }

/* ── Ping dot (timeline) ────────────────────────────────── */
.pres-ping {
  animation: presPing 2.4s infinite;
  animation-delay: calc(var(--d, 0) * 0.25s + 0.6s);
}

/* ── Timeline line draw ─────────────────────────────────── */
.pres-draw-line {
  transform: scaleX(0);
  transform-origin: left;
  animation: presDrawLine 1s var(--ease, cubic-bezier(.22,1,.36,1)) forwards;
  animation-delay: calc(var(--d, 0) * 0.12s + 0.45s);
}

/* ── Spinning halos ─────────────────────────────────────── */
.pres-halo {
  position: absolute;
  left: 50%; top: 50%;
  width: min(58vmin, 560px);
  aspect-ratio: 1;
  border: 1px dashed rgba(120,170,255,.25);
  border-radius: 50%;
  pointer-events: none;
  animation: presHaloSpin 50s linear infinite;
}
.pres-halo-inner {
  width: min(38vmin, 360px);
  border-color: rgba(150,130,255,.18);
  animation: presHaloSpin 36s linear infinite reverse;
}

/* ── Spotlight card hover ───────────────────────────────── */
.pres-spotlight { position: relative; overflow: hidden; }
.pres-spotlight::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity .4s;
  background: radial-gradient(
    360px circle at var(--mx, 50%) var(--my, 50%),
    rgba(120,170,255,.10),
    transparent 42%
  );
}
.pres-spotlight:hover::after { opacity: 1; }

/* ── Keyframes ──────────────────────────────────────────── */
@keyframes presGradShift   { to { background-position: 200% 0; } }

@keyframes presRise {
  from { opacity: 0; transform: translateY(36px) scale(.98); }
}
@keyframes presRiseBack {
  from { opacity: 0; transform: translateY(-36px) scale(.98); }
}

@keyframes presBlink       { 50% { opacity: 0; } }

@keyframes presArrowPulse {
  0%, 100% { opacity: .35; transform: translateX(-4px); }
  50%       { opacity: 1;   transform: translateX( 4px); }
}

@keyframes presPlusPulse {
  0%, 100% { opacity: .4;  transform: scale(.8);  }
  50%       { opacity: 1;   transform: scale(1.15); }
}

@keyframes presAgentGlow {
  50% { box-shadow: 0 0 90px -14px rgba(77,140,255,.55); }
}

@keyframes presRadar {
  0%   { transform: translate(-50%,-50%) scale(.32); opacity: .8; }
  100% { transform: translate(-50%,-50%) scale(1);   opacity: 0;  }
}

@keyframes presTravel {
  0%   { left: -2%;  opacity: 0; }
  12%  { opacity: 1; }
  88%  { opacity: 1; }
  100% { left: 102%; opacity: 0; }
}

@keyframes presPing {
  0%   { box-shadow: 0 0 0  0   rgba(77,163,255,.55); }
  70%  { box-shadow: 0 0 0 14px rgba(77,163,255,0);   }
  100% { box-shadow: 0 0 0  0   rgba(77,163,255,0);   }
}

@keyframes presDrawLine { to { transform: scaleX(1); } }

@keyframes presHaloSpin {
  from { transform: translate(-50%,-52%) rotate(0deg);   }
  to   { transform: translate(-50%,-52%) rotate(360deg); }
}

/* ── Reduced motion ─────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .pres-scene *, .pres-scene *::before, .pres-scene *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
`

export default function Scene({ children }: { children: React.ReactNode }) {
  const injected = useRef(false)

  useEffect(() => {
    if (injected.current) return
    if (document.getElementById(STYLE_ID)) { injected.current = true; return }
    const tag = document.createElement('style')
    tag.id = STYLE_ID
    tag.textContent = CSS
    document.head.appendChild(tag)
    injected.current = true
  }, [])

  // Also render inline so SSR/first-paint has styles before hydration
  return (
    <>
      <style
        id={STYLE_ID + '-ssr'}
        // biome-ignore lint: intentional injection
        dangerouslySetInnerHTML={{ __html: CSS }}
      />
      <div className="pres-scene contents">
        {children}
      </div>
    </>
  )
}
