'use client'

/**
 * SlideBackground
 *
 * Renders every background layer from doc/demo/1.html:
 *   • Neural particle network canvas  (neural net + cursor glow)
 *   • Aurora colour blobs             (.b1 / .b2 / .b3)
 *   • Animated grid lines
 *   • Cursor-tracking radial glow
 *   • Film-noise overlay
 *   • Vignette
 *
 * All CSS lives in app/presentation-animations.css (imported once by
 * the display page).  This component only handles the canvas JS logic.
 */

import { useEffect, useRef } from 'react'

export default function SlideBackground() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const glowRef    = useRef<HTMLDivElement>(null)
  const rafRef     = useRef<number>(0)

  useEffect(() => {
    const cv  = canvasRef.current
    const gEl = glowRef.current
    if (!cv || !gEl) return

    const cx = cv.getContext('2d')!
    const RM = matchMedia('(prefers-reduced-motion: reduce)').matches

    const LINK = 130
    let W = 0, H = 0
    let pts: { x:number; y:number; vx:number; vy:number; r:number; c:string }[] = []
    const M = { x: -1e4, y: -1e4 }
    let gx = innerWidth / 2,  gy = innerHeight / 2
    let gtx = gx,              gty = gy

    function sizeNet() {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      W = innerWidth; H = innerHeight
      cv.width  = W * dpr; cv.height = H * dpr
      cv.style.width  = W + 'px'
      cv.style.height = H + 'px'
      cx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.min(110, Math.round(W * H / 15000))
      pts = Array.from({ length: n }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - .5) * .32,
        vy: (Math.random() - .5) * .32,
        r:  Math.random() * 1.4 + .7,
        c:  Math.random() < .55 ? '110,165,255' : '150,130,255',
      }))
    }

    function drawNet() {
      cx.clearRect(0, 0, W, H)

      for (const p of pts) {
        p.x += p.vx; p.y += p.vy
        if (p.x < -20)   p.x = W + 20
        else if (p.x > W + 20) p.x = -20
        if (p.y < -20)   p.y = H + 20
        else if (p.y > H + 20) p.y = -20
        // mouse repulsion
        const dx = p.x - M.x, dy = p.y - M.y, d2 = dx * dx + dy * dy
        if (d2 < 14400) { const d = Math.sqrt(d2) || 1; p.x += dx / d * .6; p.y += dy / d * .6 }
      }

      for (let a = 0; a < pts.length; a++) {
        const p = pts[a]
        // peer links
        for (let b = a + 1; b < pts.length; b++) {
          const q = pts[b]
          const dx = p.x - q.x, dy = p.y - q.y
          if (dx > LINK || dx < -LINK || dy > LINK || dy < -LINK) continue
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < LINK) {
            cx.strokeStyle = `rgba(105,155,255,${(1 - d / LINK) * .26})`
            cx.lineWidth = 1
            cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(q.x, q.y); cx.stroke()
          }
        }
        // cursor links
        const md = Math.sqrt((p.x - M.x) ** 2 + (p.y - M.y) ** 2)
        if (md < 170) {
          cx.strokeStyle = `rgba(80,220,200,${(1 - md / 170) * .45})`
          cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(M.x, M.y); cx.stroke()
        }
        // dots
        cx.fillStyle = `rgba(${p.c},.85)`
        cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 7); cx.fill()
      }
    }

    function loop() {
      drawNet()
      gx += (gtx - gx) * .07
      gy += (gty - gy) * .07
      gEl.style.transform = `translate(${gx}px,${gy}px)`
      rafRef.current = requestAnimationFrame(loop)
    }

    const onPointer = (e: PointerEvent) => { M.x = e.clientX; M.y = e.clientY; gtx = e.clientX; gty = e.clientY }
    const onResize  = () => sizeNet()

    sizeNet()
    addEventListener('pointermove', onPointer)
    addEventListener('resize',      onResize)

    if (RM) {
      drawNet()
      gEl.style.display = 'none'
    } else {
      loop()
    }

    // Card spotlight — track pointer position for the CSS radial gradient
    function onCardPointer(e: PointerEvent) {
      const target = e.target as Element | null
      if (!target) return
      const card = target.closest<HTMLElement>('.pres-spotlight')
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px')
      card.style.setProperty('--my', (e.clientY - r.top)  + 'px')
    }
    addEventListener('pointermove', onCardPointer)

    return () => {
      cancelAnimationFrame(rafRef.current)
      removeEventListener('pointermove', onPointer)
      removeEventListener('pointermove', onCardPointer)
      removeEventListener('resize',      onResize)
    }
  }, [])

  return (
    <>
      {/* Neural particle canvas */}
      <canvas ref={canvasRef} id="pres-net" aria-hidden="true" />

      {/* Aurora blobs */}
      <div className="pres-aurora" aria-hidden="true">
        <span className="b pres-b1" />
        <span className="b pres-b2" />
        <span className="b pres-b3" />
      </div>

      {/* Animated grid */}
      <div className="pres-gridlines" aria-hidden="true" />

      {/* Cursor-tracking glow */}
      <div ref={glowRef} className="pres-cursor-glow" aria-hidden="true" />

      {/* Film noise */}
      <div className="pres-noise" aria-hidden="true" />

      {/* Vignette */}
      <div className="pres-vignette" aria-hidden="true" />
    </>
  )
}
