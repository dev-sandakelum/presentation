// Nx Scene · design-system wrapper for every Next.js talk slide
'use client'
import { useEffect, useState, type ReactNode } from 'react'

/**
 * SceneNx — wrap every slide in <SceneNx>.
 *
 * • Injects the whole `nx-*` CSS design system (scoped under `.nx-scene`, so nothing leaks).
 * • Light theme is the default. Dark theme applies automatically when ANY ancestor
 *   (usually <html>) has `data-theme="dark"` or the class `dark`, or when you pass theme="dark".
 * • Fills its parent (`height:100%`) and scrolls internally if a slide is taller than the viewport.
 */
export default function SceneNx({
  children,
  theme,
}: {
  children?: ReactNode
  theme?: 'light' | 'dark'
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: NX_CSS }} />
      <div className="nx-scene" data-nx-theme={theme}>
        <div className="nx-slide">{children}</div>
      </div>
    </>
  )
}

/* ───────── Typewriter terminal (types the command, then reveals output lines, then loops) ───────── */
export function NxTerm({
  title,
  cmd,
  pre = [],
  outs = [],
  delay = 0,
  loopMs = 11000,
  rvDelay = '.25s',
}: {
  title: string
  cmd: string
  pre?: ReactNode[]
  outs?: ReactNode[]
  delay?: number
  loopMs?: number
  rvDelay?: string
}) {
  const [typed, setTyped] = useState('')
  const [shown, setShown] = useState(0)
  const nOuts = outs.length
  useEffect(() => {
    let iv: ReturnType<typeof setInterval> | undefined
    const ts: ReturnType<typeof setTimeout>[] = []
    let dead = false
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const run = () => {
      if (dead) return
      ts.forEach(clearTimeout)
      ts.length = 0
      if (reduce) { setTyped(cmd); setShown(nOuts); return }
      setTyped(''); setShown(0)
      let i = 0
      iv = setInterval(() => {
        i++
        setTyped(cmd.slice(0, i))
        if (i >= cmd.length) {
          if (iv) clearInterval(iv)
          for (let k = 0; k < nOuts; k++) ts.push(setTimeout(() => setShown(k + 1), 300 + k * 240))
          ts.push(setTimeout(() => { if (!document.hidden) run() }, loopMs))
        }
      }, 45)
    }
    ts.push(setTimeout(run, 400 + delay))
    return () => { dead = true; if (iv) clearInterval(iv); ts.forEach(clearTimeout) }
  }, [cmd, nOuts, delay, loopMs])

  return (
    <div style={{ '--d': rvDelay } as React.CSSProperties} className="nx-rv nx-term">
      <div className="nx-term-bar">
        <span className="nx-term-dots"><i /><i /><i /></span>
        <span className="nx-term-title">{title}</span>
      </div>
      <div className="nx-term-body">
        {pre.map((l, i) => <div key={'p' + i} className="nx-term-line">{l}</div>)}
        <div className="nx-term-line">
          <span className="nx-term-prompt">$ </span>
          <span className="nx-term-cmd">{typed}</span>
          <span className="nx-caret" />
        </div>
        {outs.map((o, i) => (
          <div key={'o' + i} className={'nx-term-line nx-term-reveal' + (i < shown ? ' show' : '')}>{o}</div>
        ))}
      </div>
    </div>
  )
}

/* ───────── Click-to-copy command button ───────── */
export function NxCopy({ cmd, rvDelay = '.5s' }: { cmd: string; rvDelay?: string }) {
  const [state, setState] = useState<'idle' | 'ok' | 'fail'>('idle')
  useEffect(() => {
    if (state === 'idle') return
    const t = setTimeout(() => setState('idle'), 1900)
    return () => clearTimeout(t)
  }, [state])
  const copy = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(cmd).then(() => setState('ok'), () => setState('fail'))
    } else setState('fail')
  }
  return (
    <button type="button" onClick={copy} style={{ '--d': rvDelay } as React.CSSProperties} className="nx-rv nx-copy-btn">
      <svg strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
        <rect x="9" y="9" width="12" height="12" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
      <span className="c-cmd">{cmd}</span>
      <span className="c-hint">{state === 'ok' ? 'Copied!' : state === 'fail' ? 'Copy blocked' : 'Click to copy'}</span>
    </button>
  )
}

const NX_CSS = /* css */ `
/* ============ Tokens ============ */
.nx-scene{
  --font-sans:'Segoe UI Variable Display','Segoe UI',-apple-system,BlinkMacSystemFont,system-ui,'Helvetica Neue',sans-serif;
  --font-mono:'Cascadia Code','Cascadia Mono',Consolas,'SF Mono',ui-monospace,monospace;
  --bg:#FCFDFF; --surface:#FFFFFF; --code-bg:#F8FAFD;
  --fg:#201F1E; --muted:#5B5A58; --faint:#A19F9D;
  --border:#E3E8EF; --border-str:#C8D3E0; --border-strong:#C8D3E0;
  --blue:#0078D4; --blue-deep:#005A9E; --blue-2:#38BDF8;
  --blue-soft:rgba(0,120,212,.10); --blue-faint:rgba(0,120,212,.06);
  --chip-bd:rgba(0,120,212,.28); --chip-fg:#005A9E;
  --ok:#107C10; --err:#D13438;
  --react:#149ACC; --glow:rgba(0,120,212,.10);
  --shadow:0 2px 10px rgba(16,42,77,.07);
  --fs-display:min(7.2rem,11vw,15vh);
  --fs-h2:min(3.6rem,5vw,7.6vh);
  --fs-lead:min(1.5rem,1.85vw,3vh);
  --fs-h4:min(1.45rem,1.6vw,2.6vh);
  --fs-body:min(1.35rem,1.45vw,2.35vh);
  --fs-body-s:min(1.25rem,1.35vw,2.2vh);
  --fs-code:min(1.25rem,1.35vw,2.2vh);
  --fs-label:min(.8rem,.88vw,1.4vh);
  /* syntax colours — light */
  --tk-k:#0000FF; --tk-str:#A31515; --tk-d:#795E26; --tk-f:#001080; --tk-cm:#008000; --tk-tag:#800000;

  --sh:min(100vh,56.25vw);
  --bgpad:calc((100vh - var(--sh)) / 2);
  /* .nx-scene is NOT position:fixed — NxDisplayPage owns the viewport layer */
  width:100%;height:100%;
  background:transparent;color:var(--fg);font-family:var(--font-sans);
  -webkit-font-smoothing:antialiased;box-sizing:border-box;
}
[data-theme="dark"] .nx-scene:not([data-nx-theme="light"]),
.dark .nx-scene:not([data-nx-theme="light"]),
.nx-scene[data-nx-theme="dark"]{
  --bg:#1B1A19; --surface:#252423; --code-bg:#1E1E1E;
  --fg:#F3F2F1; --muted:#B8B6B3; --faint:#8A8886;
  --border:#3A3836; --border-str:#55524E; --border-strong:#55524E;
  --blue:#4CC2FF; --blue-deep:#99E0FF; --blue-2:#99E0FF;
  --blue-soft:rgba(76,194,255,.14); --blue-faint:rgba(76,194,255,.08);
  --chip-bd:rgba(76,194,255,.35); --chip-fg:#9AD6F9;
  --ok:#89D180; --err:#F1707B;
  --react:#61DAFB; --glow:rgba(76,194,255,.09);
  --shadow:0 2px 10px rgba(0,0,0,.35);
  --tk-k:#569CD6; --tk-str:#CE9178; --tk-d:#DCDCAA; --tk-f:#9CDCFE; --tk-cm:#6A9955; --tk-tag:#4EC9B0;
}
.nx-scene *,.nx-scene *::before,.nx-scene *::after{box-sizing:border-box}
.nx-scene ::selection{background:var(--blue);color:#fff}

/* ============ Template background + safe content area ============ */
.nx-bg{
  position:absolute;inset:0;z-index:0;pointer-events:none;
  background-color:#FCFDFF;background-repeat:no-repeat;background-position:center;background-size:contain;
}
[data-theme="dark"] .nx-scene:not([data-nx-theme="light"]) .nx-bg,
.dark .nx-scene:not([data-nx-theme="light"]) .nx-bg,
.nx-scene[data-nx-theme="dark"] .nx-bg{filter:invert(1) hue-rotate(180deg) brightness(.75)}
.nx-slide{
  position:relative;z-index:1;
  width:100%;height:100%;
  display:flex;flex-direction:column;
  overflow-x:hidden;overflow-y:auto;
}
.nx-slide>*{flex:1 0 auto;min-width:0}
/* never show a scrollbar anywhere (content can still scroll by wheel / touch / keys) */
.nx-scene,.nx-scene *{scrollbar-width:none;-ms-overflow-style:none}
.nx-scene::-webkit-scrollbar,.nx-scene *::-webkit-scrollbar{display:none;width:0;height:0}

/* ============ Motion primitives ============ */
.nx-rv{animation:nx-rv-in .8s cubic-bezier(.16,1,.3,1) both;animation-delay:var(--d,0s)}
@keyframes nx-rv-in{from{opacity:0;transform:translateY(26px)}}
.nx-mask{display:block;overflow:hidden;padding-bottom:.12em}
.nx-mask>span{display:block;transform:translateY(112%);animation:nx-m-in .9s cubic-bezier(.16,1,.3,1) var(--d,.12s) both}
@keyframes nx-m-in{to{transform:translateY(0)}}
@keyframes nx-pulse{50%{opacity:.25}}
@keyframes nx-blink{50%{opacity:0}}
@keyframes nx-breathe{50%{opacity:.72}}
@keyframes nx-pnwave{0%,100%{transform:scale(1);background:var(--blue)}3%{transform:scale(1.1);background:var(--blue-2)}6%{transform:scale(1);background:var(--blue)}}
@keyframes nx-numwave{0%,100%{background:var(--blue-soft);color:var(--blue)}4%{background:var(--blue);color:#fff}8%{background:var(--blue-soft);color:var(--blue)}}
@keyframes nx-icon-beat{0%,100%{transform:scale(1)}50%{transform:scale(1.14)}}
@keyframes nx-nudge{0%,100%{transform:translateX(0)}45%{transform:translateX(5px)}55%{transform:translateX(0)}}
@keyframes nx-grad-shift{to{background-position:100% 0}}
@keyframes nx-hi{50%{border-color:var(--border-str)}}
@keyframes nx-scan{0%{top:0;opacity:0}3%{opacity:.35}40%{top:calc(100% - 1px);opacity:.35}43%,100%{top:calc(100% - 1px);opacity:0}}
@keyframes nx-march{to{background-position:0 20px}}
@keyframes nx-underline{0%{width:0}12%{width:100%}55%{width:100%;opacity:1}60%,100%{width:100%;opacity:0}}
@keyframes nx-flow-pass{0%,100%{opacity:1}2.5%{opacity:.45}5%{opacity:1}}
@keyframes nx-flow-lift{0%,100%{transform:translateY(0)}2.5%{transform:translateY(-6px)}5%{transform:translateY(0)}}

@keyframes nx-sqwave{0%,100%{transform:scale(1)}4%{transform:scale(1.18)}9%{transform:scale(1)}}
@keyframes nx-atom-bob{from{transform:translateY(-8px)}to{transform:translateY(8px)}}
@keyframes nx-core-pulse{50%{transform:scale(1.35)}}
@keyframes nx-spin{to{transform:rotate(360deg)}}
@keyframes nx-dash-breathe{50%{border-color:var(--blue)}}
@keyframes nx-scan-inset{0%{top:15px;opacity:0}4%{opacity:.45}42%{top:calc(100% - 16px);opacity:.45}46%,100%{top:calc(100% - 16px);opacity:0}}
@keyframes nx-glow-breathe{50%{opacity:.55}}

/* Microsoft logo + tagline squares */
.nx-ms-logo .sq{transform-box:fill-box;transform-origin:center;animation:nx-sqwave 5s ease-in-out infinite}
.nx-ms-logo .sq:nth-child(2){animation-delay:.15s}
.nx-ms-logo .sq:nth-child(3){animation-delay:.3s}
.nx-ms-logo .sq:nth-child(4){animation-delay:.45s}
.nx-msa i{animation:nx-sqwave 5s ease-in-out infinite}
.nx-msa span:nth-child(2) i{animation-delay:.15s}
.nx-msa span:nth-child(3) i{animation-delay:.3s}
.nx-msa span:nth-child(4) i{animation-delay:.45s}

/* Title glow */
.nx-glow{position:absolute;inset:0;pointer-events:none;background:radial-gradient(720px 480px at 50% 32%,var(--glow),transparent 70%);animation:nx-glow-breathe 9s ease-in-out infinite}

/* React atom */
.nx-react-logo{width:clamp(150px,16vw,210px);height:auto;color:var(--react);animation:nx-atom-bob 7s ease-in-out infinite alternate}
.nx-react-logo ellipse{fill:none;stroke:currentColor;stroke-width:6}
.nx-react-logo .core{fill:currentColor;stroke:none;transform-box:fill-box;transform-origin:center;animation:nx-core-pulse 3.2s ease-in-out infinite}
.nx-react-spin{transform-box:fill-box;transform-origin:center;animation:nx-spin 30s linear infinite}

/* Presenter avatar: dashed ring + scan line */
.nx-avatar{position:relative;overflow:hidden}
.nx-avatar::after{content:"";position:absolute;inset:14px;border:1px dashed var(--chip-bd);border-radius:50%;pointer-events:none;animation:nx-dash-breathe 8s ease-in-out infinite}
.nx-avatar::before{content:"";position:absolute;left:15px;right:15px;top:15px;height:2px;background:var(--blue);opacity:0;z-index:2;pointer-events:none;border-radius:2px;animation:nx-scan-inset 6s linear infinite}

/* ============ Typography ============ */
.nx-kick{
  display:flex;align-items:center;gap:12px;
  font:600 min(.82rem,.92vw,1.45vh) var(--font-sans);letter-spacing:.2em;text-transform:uppercase;
  color:var(--blue);margin:0 0 clamp(14px,2.4vh,24px);
}
.nx-kick::before{content:"";width:9px;height:9px;border-radius:2px;background:var(--blue);flex:none;animation:nx-pulse 3.5s ease-in-out infinite}
.nx-h2{margin:0;font-size:var(--fs-h2);font-weight:700;letter-spacing:-.03em;line-height:1.05;color:var(--fg)}
.nx-h2bar{width:64px;height:4px;border-radius:2px;margin-top:16px;background:linear-gradient(90deg,var(--blue),var(--blue-2))}
.nx-lead{margin:clamp(12px,2vh,20px) 0 0;font-size:var(--fs-lead);line-height:1.5;color:var(--muted);max-width:56ch}
.nx-lead em{font-style:italic;color:var(--blue)}
.nx-grad{
  background:linear-gradient(120deg,var(--blue) 20%,var(--blue-2) 85%);background-size:200% 100%;
  -webkit-background-clip:text;background-clip:text;color:transparent;
  animation:nx-grad-shift 9s ease-in-out infinite alternate;
}
.nx-scene h4,.nx-scene h5{margin:0}
.nx-scene p{margin:0}

/* ============ Chips / trust ============ */
.nx-chip{
  display:inline-flex;align-items:center;gap:9px;
  font:500 var(--fs-label) var(--font-mono);letter-spacing:.12em;text-transform:uppercase;
  padding:10px 16px;border:1px solid var(--chip-bd);border-radius:999px;
  color:var(--chip-fg);background:var(--blue-faint);
  animation:nx-breathe 7s ease-in-out infinite;
}
.nx-chip svg{width:13px;height:13px;flex:none}
.nx-chip-ghost{border-style:dashed;color:var(--muted);background:transparent;border-color:var(--border-str)}
a.nx-chip{text-decoration:none;transition:border-color .18s,background .18s,transform .15s}
a.nx-chip:hover{border-color:var(--blue);background:var(--blue-soft);transform:translateY(-1px)}
.nx-trust{border-top:1px solid var(--border);padding-top:clamp(14px,2.2vh,20px)}
.nx-trust-k{display:block;font:600 var(--fs-label) var(--font-sans);letter-spacing:.2em;text-transform:uppercase;color:var(--faint);margin-bottom:10px}
.nx-trust-n{font-size:var(--fs-h4);font-weight:600;letter-spacing:.02em}

/* ============ Rows ============ */
.nx-rows{display:flex;flex-direction:column;gap:12px}
.nx-row{
  display:grid;grid-template-columns:56px 1fr;gap:clamp(16px,1.8vw,26px);
  padding:clamp(14px,2.2vh,20px) clamp(16px,1.6vw,22px);
  background:var(--surface);border:1px solid var(--border);border-radius:12px;
  box-shadow:var(--shadow);align-items:flex-start;transition:border-color .25s;
}
.nx-row:hover{border-color:var(--chip-bd)}
.nx-row-ic{width:52px;height:52px;border-radius:11px;display:grid;place-items:center;background:var(--blue-soft)}
.nx-row-ic svg{width:23px;height:23px;color:var(--blue)}
.nx-row h4{font-size:var(--fs-h4);font-weight:600;letter-spacing:-.01em;margin-bottom:5px}
.nx-row p{font-size:var(--fs-body-s);line-height:1.45;color:var(--muted)}
.nx-row em,.nx-feat em{color:var(--blue);font-style:italic}

/* ============ Agenda ============ */
.nx-agenda{display:grid;grid-template-columns:1fr 1fr;gap:clamp(14px,2vh,20px) clamp(20px,3vw,40px)}
.nx-ag{
  display:grid;grid-template-columns:48px 1fr;gap:16px;align-items:flex-start;
  background:var(--surface);border:1px solid var(--border);border-radius:12px;
  padding:clamp(14px,2.2vh,18px) clamp(16px,1.6vw,20px);box-shadow:var(--shadow);transition:border-color .25s;
}
.nx-ag:hover{border-color:var(--chip-bd)}
.nx-ag-n{
  width:44px;height:44px;border-radius:10px;background:var(--blue);color:#fff;
  display:grid;place-items:center;font:600 min(1.05rem,1.15vw,1.9vh) var(--font-mono);
  animation:nx-pnwave 9s ease-in-out infinite;
}
.nx-ag h4{font-size:var(--fs-h4);font-weight:600;margin-bottom:4px}
.nx-ag p{font-size:var(--fs-body-s);line-height:1.4;color:var(--muted)}

/* ============ Quote / definitions / footnote ============ */
.nx-quote{
  margin:0;font-size:min(2rem,2.9vw,4.2vh);font-weight:600;letter-spacing:-.02em;line-height:1.4;
  border-left:4px solid var(--blue);padding-left:clamp(20px,2.5vw,32px);max-width:54ch;
}
.nx-defs{margin-top:clamp(20px,4vh,40px);display:grid;gap:12px}
.nx-def{
  display:grid;grid-template-columns:56px minmax(200px,340px) 1fr;gap:clamp(16px,1.8vw,26px);align-items:center;
  background:var(--surface);border:1px solid var(--border);border-radius:12px;
  padding:clamp(14px,2.2vh,18px) clamp(16px,1.6vw,20px);box-shadow:var(--shadow);
}
.nx-def-ic{width:52px;height:52px;border-radius:11px;display:grid;place-items:center;background:var(--blue-soft)}
.nx-def-ic svg{width:23px;height:23px;color:var(--blue)}
.nx-def h4{font-size:var(--fs-h4);font-weight:600}
.nx-def p{font-size:var(--fs-body-s);line-height:1.45;color:var(--muted)}
.nx-foot-note{display:flex;gap:14px;align-items:flex-start;margin-top:clamp(18px,3vh,28px);font:400 var(--fs-body-s) var(--font-mono);color:var(--muted)}
.nx-foot-note svg{width:18px;height:18px;flex:none;margin-top:.35em;color:var(--blue);animation:nx-nudge 4s ease-in-out infinite}

/* ============ Flow diagrams ============ */
.nx-flow{display:flex;align-items:stretch}
.nx-flow>*{animation:nx-flow-pass 8s linear infinite}
.nx-step{flex:1;border:2px dashed var(--border-str);border-radius:12px;padding:clamp(16px,2.6vh,24px);position:relative;background:var(--surface)}
.nx-step .n{position:absolute;top:14px;right:16px;font:500 var(--fs-label) var(--font-mono);color:var(--faint)}
.nx-step>svg{width:26px;height:26px;margin-bottom:14px;color:var(--blue);display:block}
.nx-step h4{font-size:var(--fs-h4);font-weight:600;margin-bottom:6px}
.nx-step p{font-size:var(--fs-body-s);line-height:1.4;color:var(--muted)}
.nx-flow-sep{flex:none;width:clamp(30px,3vw,44px);display:grid;place-items:center;color:var(--faint)}
.nx-flow-sep svg{width:19px;height:19px}
.nx-flow.solid .nx-step{border-style:solid;border-color:var(--blue);background:var(--blue);color:#fff;animation:nx-flow-lift 8s linear infinite}
.nx-flow.solid .nx-step p{color:rgba(255,255,255,.85)}
.nx-flow.solid .nx-step .n{color:rgba(255,255,255,.7)}
.nx-flow.solid .nx-step>svg{color:#fff}
.nx-flow.solid .nx-flow-sep{color:var(--blue)}

/* ============ Pros / cons ============ */
.nx-pc{margin-top:clamp(18px,3.4vh,34px);display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--border);border-radius:14px;overflow:hidden;background:var(--surface)}
.nx-pc>div{padding:clamp(14px,2.2vh,20px) clamp(16px,2vw,24px);display:flex;gap:14px;align-items:flex-start}
.nx-pc .nx-pros{border-right:1px solid var(--border)}
.nx-pros>svg{color:var(--ok)}
.nx-cons>svg{color:var(--err)}
.nx-pc>div>svg{width:19px;height:19px;flex:none;margin-top:.3em;animation:nx-icon-beat 5s ease-in-out infinite}
.nx-pc .tag{display:block;font:600 var(--fs-label) var(--font-sans);letter-spacing:.2em;text-transform:uppercase;margin-bottom:6px}
.nx-pros .tag{color:var(--ok)}
.nx-cons .tag{color:var(--err)}
.nx-pc p{font-size:var(--fs-body-s);line-height:1.45;color:var(--muted)}

/* ============ Comparison table ============ */
.nx-vs-wrap{border:1px solid var(--border);border-radius:14px;overflow-x:auto;max-width:1100px;background:var(--surface);box-shadow:var(--shadow)}
.nx-vs{width:100%;border-collapse:separate;border-spacing:0;table-layout:fixed;min-width:760px}
.nx-vs th,.nx-vs td{border-bottom:1px solid var(--border);padding:clamp(12px,2vh,18px) clamp(16px,2vw,24px);text-align:left;vertical-align:top}
.nx-vs tr:last-child td{border-bottom:0}
.nx-vs thead th{border-bottom:1px solid var(--border-str);font:600 min(.88rem,.98vw,1.55vh) var(--font-sans);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.nx-vs th.corner{width:17%}
.nx-vs td:first-child{font:600 var(--fs-label) var(--font-sans);letter-spacing:.14em;text-transform:uppercase;color:var(--muted);padding-top:.7em}
.nx-vs td{font-size:var(--fs-body);line-height:1.4}
.nx-vs .nx-col{background:var(--blue-faint);border-left:1px solid var(--chip-bd)}
.nx-vs thead th.nx-col{position:relative;background:var(--blue);color:#fff}
.nx-vs thead th.nx-col::after{content:"";position:absolute;left:0;bottom:0;height:3px;width:0;background:#fff;animation:nx-underline 5s ease-in-out infinite}
.nx-cl{display:flex;gap:12px;align-items:flex-start}
.nx-cl svg{width:19px;height:19px;margin-top:.22em;flex:none;animation:nx-icon-beat 5s ease-in-out infinite}
.nx-cl-x svg{color:var(--faint)}
.nx-vs .nx-cl-x{color:var(--muted)}
.nx-cl-ok svg{color:var(--ok)}

/* ============ Feature rows ============ */
.nx-feats{display:grid;gap:12px}
.nx-feat{
  display:grid;grid-template-columns:56px minmax(230px,360px) 1fr;gap:clamp(16px,2vw,28px);align-items:center;
  background:var(--surface);border:1px solid var(--border);border-radius:12px;
  padding:clamp(13px,2.1vh,17px) clamp(16px,1.6vw,20px);box-shadow:var(--shadow);
}
.nx-feat .fn{
  width:48px;height:48px;border-radius:10px;display:grid;place-items:center;
  background:var(--blue-soft);color:var(--blue);font:600 min(1.05rem,1.15vw,1.9vh) var(--font-mono);
  animation:nx-numwave 12s ease-in-out infinite;
}
.nx-feat h4{font-size:var(--fs-h4);font-weight:600}
.nx-feat p{font-size:var(--fs-body-s);line-height:1.45;color:var(--muted)}

/* ============ Code panels ============ */
.nx-code{border:1px solid var(--border);border-radius:12px;background:var(--code-bg);overflow:hidden;max-width:100%;min-width:0}
.nx-code-hi{border-color:var(--blue);animation:nx-hi 6s ease-in-out infinite}
.nx-code-bar{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 18px;border-bottom:1px solid var(--border);font:500 var(--fs-label) var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--fg)}
.nx-code-tag{color:var(--faint)}
.nx-code pre{
  position:relative;margin:0;padding:clamp(14px,2.2vh,20px) clamp(16px,2vw,22px);overflow-x:auto;
  font:400 var(--fs-code)/1.65 var(--font-mono);color:var(--muted);white-space:pre;tab-size:2;
}
.nx-code pre::after{content:"";position:absolute;left:0;right:0;top:0;height:1px;background:var(--blue);opacity:0;pointer-events:none;animation:nx-scan 7s linear infinite}
.nx-code .kw{color:var(--tk-k)}
.nx-code .str{color:var(--tk-str)}
.nx-code .d{color:var(--tk-d)}
.nx-code .f{color:var(--tk-f)}
.nx-code .cm{color:var(--tk-cm)}
.nx-code .tk-tag{color:var(--tk-tag)}

/* ============ Routing variants ============ */
.nx-routs{display:grid;gap:12px}
.nx-rout{
  display:grid;grid-template-columns:minmax(0,1.12fr) 1fr auto;gap:clamp(16px,2.4vw,30px);align-items:center;
  background:var(--surface);border:1px solid var(--border);border-radius:12px;
  padding:clamp(15px,2.4vh,20px) clamp(16px,1.8vw,24px);box-shadow:var(--shadow);
}
.nx-rout-pat{display:flex;flex-direction:column;gap:12px;align-items:flex-start}
.nx-pat{font:500 min(1.45rem,1.55vw,2.5vh) var(--font-mono);color:var(--fg);word-break:break-all}
.nx-pat-tag{font:500 var(--fs-label) var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--chip-fg);background:var(--blue-faint);border:1px solid var(--chip-bd);padding:6px 12px;border-radius:999px}
.nx-rout h4{font-size:var(--fs-h4);font-weight:600;margin-bottom:5px}
.nx-rout p{font-size:var(--fs-body-s);line-height:1.45;color:var(--muted)}
.nx-url-chip{font:500 min(1.2rem,1.3vw,2.1vh) var(--font-mono);padding:10px 15px;border:1px solid var(--chip-bd);border-radius:9px;background:var(--blue-faint);color:var(--chip-fg);white-space:nowrap;animation:nx-breathe 7s ease-in-out infinite}

/* ============ Server / client boundary ============ */
.nx-boundary{display:grid;grid-template-columns:1.6fr 1fr;border:1px solid var(--border);border-radius:14px;overflow:hidden;background:var(--surface);box-shadow:var(--shadow)}
.nx-b-zone{padding:clamp(16px,2.6vh,24px) clamp(18px,2.4vw,28px)}
.nx-b-server{background:var(--blue-faint)}
.nx-b-client{position:relative}
.nx-b-client::before{
  content:"";position:absolute;left:-1px;top:0;bottom:0;width:2px;
  background-image:repeating-linear-gradient(to bottom,var(--blue) 0 10px,transparent 10px 20px);
  background-size:100% 20px;animation:nx-march 2.5s linear infinite;
}
.nx-b-zone h5{font:600 var(--fs-label) var(--font-sans);letter-spacing:.2em;text-transform:uppercase;margin-bottom:15px;color:var(--muted)}
.nx-b-server h5{color:var(--blue)}
.nx-b-list{display:flex;flex-wrap:wrap;gap:10px}
.nx-b-item{font:400 min(1.2rem,1.3vw,2.1vh) var(--font-mono);padding:9px 15px;border:1px solid var(--border);border-radius:9px;background:var(--bg);animation:nx-breathe 8s ease-in-out infinite}
.nx-b-inv{background:var(--blue);color:#fff;border-color:var(--blue);font-weight:600}

/* ============ Data fetching ============ */
.nx-df-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(22px,3vw,34px);align-items:start}
.nx-df-cap{display:flex;gap:12px;align-items:flex-start;margin-top:15px;font:400 min(1.2rem,1.3vw,2.1vh) var(--font-mono);color:var(--muted)}
.nx-df-cap svg{width:17px;height:17px;margin-top:.32em;flex:none}
.nx-df-cap.ok svg{color:var(--ok)}
.nx-df-cap.err svg{color:var(--faint)}

/* ============ Terminal (always dark) ============ */
.nx-term{border:1px solid #3C3C3C;border-radius:12px;background:#1E1E1E;overflow:hidden;max-width:880px;color:#D4D4D4;box-shadow:var(--shadow)}
.nx-term-bar{display:flex;align-items:center;gap:14px;padding:13px 18px;border-bottom:1px solid #3C3C3C}
.nx-term-dots{display:flex;gap:7px}
.nx-term-dots i{width:13px;height:13px;border-radius:50%;border:1px solid #5A5A5A;display:block;animation:nx-breathe 3s ease-in-out infinite}
.nx-term-dots i:nth-child(2){animation-delay:.5s}
.nx-term-dots i:nth-child(3){animation-delay:1s}
.nx-term-title{font:500 var(--fs-label) var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:#9DA0A3;margin-left:auto}
.nx-term-body{padding:clamp(14px,2.4vh,22px) clamp(16px,2.2vw,24px);font:400 var(--fs-code)/1.9 var(--font-mono)}
.nx-term-line{white-space:pre-wrap;word-break:break-word}
.nx-term-reveal{opacity:0;transform:translateY(4px);transition:opacity .3s,transform .3s}
.nx-term-reveal.show{opacity:1;transform:none}
.nx-term-prompt{color:#4EC9B0}
.nx-term-cmd{color:#E8E8E8;font-weight:600}
.nx-term-out{color:#D4D4D4}
.nx-term-dim{color:#6E7681}
.nx-term svg{width:14px;height:14px;display:inline-block;vertical-align:-2px}
.nx-caret{display:inline-block;width:.55ch;height:1.05em;background:#D4D4D4;vertical-align:-.12em;margin-left:2px;animation:nx-blink 1.1s steps(1) infinite}

/* ============ Copy button ============ */
.nx-copy-btn{
  display:inline-flex;align-items:center;gap:16px;margin-top:clamp(18px,3vh,26px);
  padding:14px 22px;border:1px solid var(--chip-bd);border-radius:10px;
  background:var(--blue-faint);color:var(--fg);cursor:pointer;text-align:left;font-family:inherit;
  transition:border-color .18s,background .18s,transform .12s;
}
.nx-copy-btn:hover{border-color:var(--blue);background:var(--blue-soft)}
.nx-copy-btn:active{transform:scale(.98)}
.nx-copy-btn svg{width:19px;height:19px;color:var(--blue);fill:none;stroke:currentColor;flex:none}
.nx-copy-btn .c-cmd{font:500 min(1.45rem,1.55vw,2.5vh) var(--font-mono)}
.nx-copy-btn .c-hint{font:500 var(--fs-label) var(--font-mono);letter-spacing:.14em;text-transform:uppercase;color:var(--faint)}

/* ============ Phases ============ */
.nx-phases{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr));gap:clamp(18px,2.6vw,28px)}
.nx-phase{
  display:flex;flex-direction:column;align-items:flex-start;
  background:var(--surface);border:1px solid var(--border);border-radius:12px;
  padding:clamp(16px,2.6vh,24px);box-shadow:var(--shadow);
}
.nx-pn{
  width:clamp(46px,5.2vh,56px);height:clamp(46px,5.2vh,56px);display:grid;place-items:center;
  border-radius:11px;background:var(--blue);color:#fff;font:600 min(1.15rem,1.25vw,2vh) var(--font-mono);
  animation:nx-pnwave 9s ease-in-out infinite;
}
.nx-phase h4{margin-top:clamp(13px,2vh,17px);font-size:var(--fs-h4);font-weight:600}
.nx-phase p{margin-top:8px;font-size:var(--fs-body-s);line-height:1.45;color:var(--muted)}
.nx-phase .nx-chip{margin-top:clamp(12px,1.8vh,16px)}
.nx-phase code{font:500 min(1.1rem,1.2vw,1.95vh) var(--font-mono);background:var(--blue-faint);color:var(--chip-fg);padding:3px 8px;border-radius:6px}

/* ============ Responsive ============ */
@media (max-width:980px){
  .nx-bg{background-size:cover}
  .nx-slide{top:12vh;bottom:11vh;left:20px;right:56px}
  .nx-agenda{grid-template-columns:1fr}
  .nx-flow{flex-direction:column}
  .nx-flow-sep{width:auto;height:28px}
  .nx-flow-sep svg{transform:rotate(90deg)}
  .nx-feat{grid-template-columns:64px 1fr}
  .nx-feat p{grid-column:2}
  .nx-def{grid-template-columns:56px 1fr}
  .nx-def p{grid-column:2}
  .nx-rout{grid-template-columns:1fr;gap:12px}
  .nx-df-grid{grid-template-columns:1fr}
  .nx-phases{grid-template-columns:1fr}
  .nx-phase{display:grid;grid-template-columns:52px 1fr;column-gap:18px;align-items:start}
  .nx-pn{width:48px;height:48px}
  .nx-phase h4{margin-top:2px}
  .nx-phase p,.nx-phase .nx-chip{grid-column:2}
  .nx-phase .nx-chip{margin-top:12px;align-self:flex-start}
}
@media (max-width:720px){
  .nx-pc{grid-template-columns:1fr}
  .nx-pc .nx-pros{border-right:0;border-bottom:1px solid var(--border)}
  .nx-boundary{grid-template-columns:1fr}
  .nx-scene{
    --fs-h2:min(2.2rem,8vw,7vh);--fs-body:min(1.15rem,3.4vw,2.4vh);--fs-body-s:min(1.05rem,3.1vw,2.2vh);
    --fs-h4:min(1.2rem,3.6vw,2.6vh);--fs-lead:min(1.1rem,3.4vw,2.8vh);--fs-code:min(1rem,2.9vw,2.1vh);
  }
}
@media (prefers-reduced-motion:reduce){
  .nx-scene *,.nx-scene *::before,.nx-scene *::after{
    animation-duration:.001s!important;animation-delay:0s!important;animation-iteration-count:1!important;
  }
}
`

