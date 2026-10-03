# HTML → React Slide Conversion Guide

Convert a self-contained HTML presentation file into individual React slide
components that plug into this project's Next.js presentation framework.

---

## What you are working with

### Source
A single `.html` file (e.g. `2.2.html`) that contains all slides as
`<section class="slide …">` elements inside a `<main id="deck">`.

### Target
Individual `.tsx` files, one per slide, placed in:

```
components/display/scenes/nextjs/
  NxSlide01Title.tsx
  NxSlide02Presenter.tsx
  NxSlide03Agenda.tsx
  … (one file per slide)
  index.ts          ← barrel that re-exports everything
```

The slides are then registered in:

```
app/display/[id]/NxDisplayPage.tsx
```

---

## Project structure (do not modify these files)

| File | Role |
|---|---|
| `components/display/scenes/nextjs/_scene_nx.tsx` | Injects the CSS design-system. Wrap every slide in `<SceneNx>`. |
| `app/display/[id]/NxDisplayPage.tsx` | Chrome shell + slide runner. Edit only the `SLIDES` array and import list. |
| `components/display/scenes/nextjs/index.ts` | Barrel — add one export per new file. |

---

## Step 1 — Parse the HTML file

Open the HTML file and find `<main id="deck">`. Each direct child
`<section class="slide …">` is one slide. Count them and note:

- `data-title="…"` → the label shown in the footer and overview
- `data-kick="…"` → the small kicker label inside the slide
- The heading text (`<h1>` or `<h2>`)
- The layout pattern (see §3)

Example section opening:

```html
<section class="slide" data-title="Agenda" data-kick="What We'll Cover">
```

---

## Step 2 — Name the output files

Number slides from `01`. Use a descriptive PascalCase suffix that matches
the content, **not** the position of the old file.

| Slide # | data-title | Output filename |
|---|---|---|
| 01 | Next.js Unlocked | `NxSlide01Title.tsx` |
| 02 | Your Presenter | `NxSlide02Presenter.tsx` |
| 03 | Agenda | `NxSlide03Agenda.tsx` |
| 04 | What is Next.js? | `NxSlide04WhatIsNextjs.tsx` |
| … | … | … |
| 26 | Questions? | `NxSlide26End.tsx` |

---

## Step 3 — Understand the CSS class mapping

`_scene_nx.tsx` injects all styles. Use **only** these `nx-*` classes —
no hardcoded Tailwind colors like `text-white`, `text-[#a5a5a5]`,
`bg-[#0a0a0a]`, `border-[#242424]`.

| HTML class | React equivalent |
|---|---|
| `.kick` | `className="nx-rv nx-kick"` |
| `.h2` | `className="nx-h2 nx-mask"` (wrap text in `<span>`) |
| `.h2bar` | `className="nx-rv nx-h2bar"` (empty `<div>`) |
| `.lead` | `className="nx-rv nx-lead"` |
| `.rv` | `className="nx-rv"` (plus `style={{ '--d': '.25s' }}`) |
| `.mask > span` | `className="nx-mask"` wrapper + inner `<span>` |
| `.rows` | `className="nx-rows"` |
| `.row` | `className="nx-rv nx-row"` |
| `.row-ic` | `className="nx-row-ic"` |
| `.ag` (agenda item) | `className="nx-rv nx-ag"` |
| `.ag-n` | `className="nx-ag-n"` |
| `.agenda` | `className="nx-agenda"` |
| `.feats` | `className="nx-feats"` |
| `.feat` | `className="nx-rv nx-feat"` |
| `.fn` (feat number) | `className="fn"` inside `.nx-feat` |
| `.chip` | `className="nx-chip"` |
| `.chip-ghost` | `className="nx-chip nx-chip-ghost"` |
| `.trust` | `className="nx-rv nx-trust"` |
| `.trust-k` | `className="nx-trust-k"` |
| `.trust-n` | `className="nx-trust-n"` |
| `.code` | `className="nx-code"` |
| `.code-hi` | `className="nx-code nx-code-hi"` |
| `.code-bar` | `className="nx-code-bar"` |
| `.code-tag` | `className="nx-code-tag"` |
| `.term` | `className="nx-term"` |
| `.term-bar` | `className="nx-term-bar"` |
| `.term-dots` + `<i>` | `className="nx-term-dots"` + `<i />` |
| `.term-title` | `className="nx-term-title"` |
| `.term-body` | `className="nx-term-body"` |
| `.tl` (terminal line) | `className="nx-term-line"` |
| `.prompt` | `className="nx-term-prompt"` |
| `.cmd` | `className="nx-term-cmd"` |
| `.caret` | `className="nx-caret"` |
| `.tl.out` / `.dim` | `className="nx-term-out"` / `className="nx-term-dim"` |
| `.flow` | `className="nx-flow"` |
| `.flow.solid` | `className="nx-flow solid"` |
| `.step` | `className="nx-step"` |
| `.step .n` | `<span className="n">01</span>` |
| `.flow-sep` | `className="nx-flow-sep"` |
| `.pc` | `className="nx-rv nx-pc"` (contains `.pros` + `.cons`) |
| `.pros` | `className="nx-pros"` |
| `.cons` | `className="nx-cons"` |
| `.vs-wrap` | `className="nx-rv nx-vs-wrap"` |
| `.vs` | `className="nx-vs"` |
| `.nx` (table col) | `className="nx-col"` |
| `.cl` | `className="nx-cl"` |
| `.cl-ok` | `className="nx-cl nx-cl-ok"` |
| `.cl-x` | `className="nx-cl nx-cl-x"` |
| `.quote` | `className="nx-rv nx-quote"` |
| `.defs` | `className="nx-defs"` |
| `.def` | `className="nx-rv nx-def"` |
| `.def-ic` | `className="nx-def-ic"` |
| `.foot-note` | `className="nx-rv nx-foot-note"` |
| `.routs` / `.rout` | `className="nx-routs"` / `className="nx-rv nx-rout"` |
| `.rout-pat` | `className="nx-rout-pat"` |
| `.pat` | `className="nx-pat"` |
| `.pat-tag` | `className="nx-pat-tag"` |
| `.url-chip` | `className="nx-url-chip"` |
| `.boundary` | `className="nx-rv nx-boundary"` |
| `.b-zone.b-server` | `className="nx-b-zone nx-b-server"` |
| `.b-zone.b-client` | `className="nx-b-zone nx-b-client"` |
| `.b-list` / `.b-item` | `className="nx-b-list"` / `className="nx-b-item"` |
| `.b-inv` | `className="nx-b-item nx-b-inv"` |
| `.df-grid` | `className="nx-df-grid"` |
| `.df-cap` | `className="nx-df-cap ok"` or `className="nx-df-cap err"` |
| `.phases` | `className="nx-phases"` |
| `.phase` | `className="nx-rv nx-phase"` |
| `.pn` | `className="nx-pn"` |
| `.grad` (gradient text) | `className="nx-grad"` |
| `.split` | `className="grid grid-cols-[1.08fr_1fr] gap-[clamp(30px,4.5vw,64px)] items-start"` |
| `.s-title` / `.s-end` | center everything with `flex flex-col items-center justify-center text-center` |

### CSS variables for inline styles

When you need a colour in `style={{}}`, use these tokens — never hex:

| Token | Meaning |
|---|---|
| `var(--fg)` | Primary text |
| `var(--muted)` | Secondary text |
| `var(--faint)` | Tertiary / disabled text |
| `var(--blue)` | Accent / primary action |
| `var(--blue-2)` | Gradient end |
| `var(--blue-soft)` | Icon background tint |
| `var(--blue-faint)` | Chip / panel tint |
| `var(--chip-bd)` | Chip border |
| `var(--chip-fg)` | Chip text |
| `var(--ok)` | Green / checkmark |
| `var(--err)` | Red / X |
| `var(--surface)` | Card / panel background |
| `var(--border)` | Default border |
| `var(--border-str)` | Strong border |
| `var(--react)` | React atom colour |
| `var(--shadow)` | Box shadow |

### Token rules

- `text-white` → remove; `nx-h2` already sets `color: var(--fg)`.
- `text-[#a5a5a5]` → remove; `nx-lead`, `nx-row p` etc. already set `color: var(--muted)`.
- Terminal panels (`nx-term`) stay dark — the CSS hard-codes `#1E1E1E` intentionally.
- Copy buttons: use `style={{ border:'1px solid var(--chip-bd)', background:'var(--blue-faint)', color:'var(--fg)' }}`.

---

## Step 4 — The standard slide file template

Every slide file follows this exact skeleton:

```tsx
// Nx Slide XX · <Title> — "<heading>"
'use client'
import SceneNx from './_scene_nx'

export default function NxSlideXX<Name>() {
  return (
    <SceneNx>
      <div className="flex flex-col h-full">

        {/* ── Head ── */}
        <div className="flex-none">
          <p style={{ '--d': '0s' } as React.CSSProperties} className="nx-rv nx-kick">
            Kicker label
          </p>
          <h2 style={{ '--d': '.12s' } as React.CSSProperties} className="nx-h2 nx-mask">
            <span>Heading text</span>
          </h2>
          <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-h2bar" />
          {/* optional lead */}
          <p style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-lead">
            Lead sentence.
          </p>
        </div>

        {/* ── Body ── */}
        <div className="flex-1 mt-8">
          {/* layout-specific content here */}
        </div>

      </div>
    </SceneNx>
  )
}
```

**Animation delays** (`--d`):
- Kick: `0s`
- h2 / mask: `.12s`
- h2bar: `.22s`
- lead: `.3s`
- First body element: `.25s` or `.3s`
- Subsequent body elements: add `.10s`–`.12s` each

---

## Step 5 — Layout patterns

### 5a. Rows list
```tsx
<div className="nx-rows">
  <div style={{ '--d': '.3s' } as React.CSSProperties} className="nx-rv nx-row">
    <span className="nx-row-ic"><MyIcon /></span>
    <div><h4>Title</h4><p>Body text.</p></div>
  </div>
</div>
```

### 5b. Agenda grid (2-column)
```tsx
<div className="nx-agenda">
  <div style={{ '--d': '.2s' } as React.CSSProperties} className="nx-rv nx-ag">
    <span className="nx-ag-n">01</span>
    <div><h4>Item title</h4><p>Item body.</p></div>
  </div>
</div>
```

### 5c. Feature list
```tsx
<div className="nx-feats">
  <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-feat">
    <span className="fn">01</span>
    <h4>Feature</h4>
    <p>Description.</p>
  </div>
</div>
```

### 5d. Flow diagram (CSR — dashed)
```tsx
<div style={{ '--d': '.25s' } as React.CSSProperties} className="nx-rv nx-flow">
  <div className="nx-step">
    <span className="n">01</span>
    <GlobeIcon />
    <h4>Step title</h4><p>Body.</p>
  </div>
  <div className="nx-flow-sep"><ArrowRightIcon /></div>
  {/* … more steps … */}
</div>
```
For SSR (solid/filled): `className="nx-flow solid"`.

### 5e. Comparison table
```tsx
<div style={{ '--d': '.25s' } as React.CSSProperties} className="nx-rv nx-vs-wrap">
  <table className="nx-vs">
    <thead>
      <tr>
        <th className="corner"></th>
        <th>React — CSR</th>
        <th className="nx-col">Next.js — SSR / Full-Stack</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Routing</td>
        <td><span className="nx-cl nx-cl-x"><XIcon /> Manual</span></td>
        <td className="nx-col"><span className="nx-cl nx-cl-ok"><CheckIcon /> File-based</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

### 5f. Code block
```tsx
<div style={{ '--d': '.25s' } as React.CSSProperties} className="nx-rv nx-code">
  <div className="nx-code-bar">
    <span>Label</span>
    <span className="nx-code-tag">tag</span>
  </div>
  <pre>
    <span className="kw">export default</span>{' function '}
    <span className="d">Page</span>{'() { … }'}
  </pre>
</div>
```
Code token classes: `kw` (keyword), `str` (string), `d` (function/variable),
`f` (identifier), `cm` (comment), `tk-tag` (JSX tag).  
Highlighted variant: `className="nx-code nx-code-hi"`.

### 5g. Terminal panel
```tsx
<div style={{ '--d': '.25s' } as React.CSSProperties} className="nx-rv nx-term">
  <div className="nx-term-bar">
    <span className="nx-term-dots"><i /><i /><i /></span>
    <span className="nx-term-title">bash — terminal</span>
  </div>
  <div className="nx-term-body">
    <div className="nx-term-line">
      <span className="nx-term-prompt">$ </span>
      <span className="nx-term-cmd">npx create-next-app@latest</span>
      <span className="nx-caret" />
    </div>
    <div className="nx-term-line">
      <span className="nx-term-out">✔ Ready</span>
    </div>
  </div>
</div>
```

### 5h. Pro/Con panel
```tsx
<div style={{ '--d': '.5s' } as React.CSSProperties} className="nx-rv nx-pc">
  <div className="nx-pros">
    <CheckIcon />
    <div><span className="tag">Pros</span><p>Good things.</p></div>
  </div>
  <div className="nx-cons">
    <XIcon />
    <div><span className="tag">Cons</span><p>Trade-offs.</p></div>
  </div>
</div>
```

### 5i. Route patterns
```tsx
<div className="nx-routs">
  <div style={{ '--d': '.25s' } as React.CSSProperties} className="nx-rv nx-rout">
    <div className="nx-rout-pat">
      <span className="nx-pat">app/about/page.tsx</span>
      <span className="nx-pat-tag">Standard · Static</span>
    </div>
    <div><h4>Static Routes</h4><p>Description.</p></div>
    <span className="nx-url-chip">→ /about</span>
  </div>
</div>
```

### 5j. Server / Client boundary
```tsx
<div style={{ '--d': '.6s' } as React.CSSProperties} className="nx-rv nx-boundary">
  <div className="nx-b-zone nx-b-server">
    <h5>Server — the default</h5>
    <div className="nx-b-list">
      <span className="nx-b-item">page.tsx</span>
      <span className="nx-b-item">fetch data</span>
    </div>
  </div>
  <div className="nx-b-zone nx-b-client">
    <h5>Client — the island</h5>
    <div className="nx-b-list">
      <span className="nx-b-item nx-b-inv">"use client"</span>
      <span className="nx-b-item">state</span>
    </div>
  </div>
</div>
```

### 5k. Phase timeline
```tsx
<div className="nx-phases">
  <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv nx-phase">
    <span className="nx-pn">01</span>
    <h4>Phase title</h4>
    <p>Phase body. <code>npm run dev</code></p>
    <span className="nx-chip">Setup</span>
  </div>
</div>
```

### 5l. Data-fetch grid
```tsx
<div className="nx-df-grid">
  <div style={{ '--d': '.22s' } as React.CSSProperties} className="nx-rv">
    <div className="nx-code">…</div>
    <p className="nx-df-cap err"><XIcon /> Old-way caption.</p>
  </div>
  <div style={{ '--d': '.36s' } as React.CSSProperties} className="nx-rv">
    <div className="nx-code nx-code-hi">…</div>
    <p className="nx-df-cap ok"><CheckIcon /> New-way caption.</p>
  </div>
</div>
```

### 5m. Title / End slides (centred)
```tsx
<div className="flex flex-col items-center justify-center text-center py-16">
  <MsLogo />
  <h1 style={{ fontSize:'min(7.6rem,11.5vw,15vh)', fontWeight:700, letterSpacing:'-.045em', lineHeight:.98, color:'var(--fg)' }}>
    Next.js <span className="nx-grad">Unlocked</span>
  </h1>
  {/* MSA tagline */}
  <div className="flex flex-wrap justify-center gap-8 mt-8">
    {[['#F25022','Learn'],['#7FBA00','Build'],['#00A4EF','Create'],['#FFB900','Make an Impact']].map(([color,label])=>(
      <span key={label} className="flex items-center gap-2"
        style={{ fontWeight:600, fontSize:'min(.95rem,1.05vw,1.7vh)', letterSpacing:'.08em', textTransform:'uppercase', color:'var(--fg)' }}>
        <i style={{ width:11, height:11, borderRadius:2, display:'block', background:color, flexShrink:0 }} />
        {label}
      </span>
    ))}
  </div>
</div>
```

**Microsoft logo SVG** (reuse in Title and End slides):
```tsx
function MsLogo() {
  return (
    <svg width="52" height="52" viewBox="0 0 23 23" aria-hidden>
      <rect x="1"  y="1"  width="10" height="10" rx="1.2" fill="#F25022"/>
      <rect x="12" y="1"  width="10" height="10" rx="1.2" fill="#7FBA00"/>
      <rect x="1"  y="12" width="10" height="10" rx="1.2" fill="#00A4EF"/>
      <rect x="12" y="12" width="10" height="10" rx="1.2" fill="#FFB900"/>
    </svg>
  )
}
```

---

## Step 6 — Icons

Inline every icon as an SVG component at the bottom of the file. Never import
from a package. All icons use `stroke="currentColor"` so they inherit the
parent element's colour automatically.

```tsx
// Example icon component (repeat pattern for each icon needed)
function GlobeIcon() {
  return (
    <svg className="w-6 h-6 stroke-current fill-none"
      strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9.5"/>
      <path d="M2.5 12h19M12 2.5a14.5 14.5 0 0 1 0 19 14.5 14.5 0 0 1 0-19Z"/>
    </svg>
  )
}
```

Common icon paths used across slides:

| Icon | SVG path(s) |
|---|---|
| Arrow right | `M4 12h16m-6-6 6 6-6 6` |
| Check | `m5 12 5 5L20 7` |
| X / cross | `M6 6l12 12M18 6 6 18` |
| Check circle | circle r9 + `m8.5 12 2.5 2.5L16 9.5` |
| Chev left | `m15 5-7 7 7 7` |
| Chev right | `m9 5 7 7-7 7` |
| Globe | circle r9.5 + latitude/longitude paths |
| File | `M14 3H6a2 2 0 0 0-2 2v14...` |
| Download | `M12 3v12m-5-5 5 5 5-5M4 19h16` |
| Server | two rects + dots |
| Monitor | rect + stand |
| Layers | three stacked diamond paths |
| Wrench | `M14.5 6.5a1 1 0 0 0 0 1.4l1.6 1.6…` |
| Folder | `M3.5 6.5A1.5 1.5...` |
| Layout | rect + two lines |
| Terminal | `m4 17 6-5-6-5M12 19h8` |
| Copy | nested rects |
| Database | ellipse + paths |
| Pointer | `m3 3 7.1 17 2.5-7.4L20 10.1 3 3Z` |
| Repeat | arrows |
| Box (cube) | hex path + cross |

---

## Step 7 — Update index.ts

Add one export line per new file to
`components/display/scenes/nextjs/index.ts`:

```typescript
export { default as NxSlide03Agenda }           from './NxSlide03Agenda'
export { default as NxSlide04WhatIsNextjs }     from './NxSlide04WhatIsNextjs'
// … one line per file
```

Keep the file sorted by slide number.

---

## Step 8 — Update NxDisplayPage.tsx SLIDES array

Open `app/display/[id]/NxDisplayPage.tsx`. Find `const SLIDES = [` and
update it so each position maps to the component whose **content** matches
that 2.2.html slide.

The correct straight 1-to-1 mapping (use the `data-title` from the HTML as
the `label`):

```typescript
const SLIDES = [
  { key: 'nx-01', label: 'Title',               node: <NxSlide01Title /> },
  { key: 'nx-02', label: 'Presenter',           node: <NxSlide02Presenter /> },
  { key: 'nx-03', label: 'Agenda',              node: <NxSlide03Agenda /> },
  { key: 'nx-04', label: 'What is Next.js?',    node: <NxSlide04WhatIsNextjs /> },
  { key: 'nx-05', label: 'React Baseline',      node: <NxSlide05ReactBaseline /> },
  { key: 'nx-06', label: 'Library vs Framework',node: <NxSlide06LibraryVsFramework /> },
  { key: 'nx-07', label: 'CSR',                 node: <NxSlide07CSR /> },
  { key: 'nx-08', label: 'SSR',                 node: <NxSlide08SSR /> },
  { key: 'nx-09', label: 'React vs Next.js',    node: <NxSlide09ReactVsNextjs /> },
  { key: 'nx-10', label: 'New Features',        node: <NxSlide10NewFeatures /> },
  { key: 'nx-11', label: 'App Router',          node: <NxSlide11AppRouter /> },
  { key: 'nx-12', label: 'Routing Patterns',    node: <NxSlide12RoutingPatterns /> },
  { key: 'nx-13', label: 'Server Components',   node: <NxSlide13ServerComponents /> },
  { key: 'nx-14', label: 'Data Fetching',       node: <NxSlide14DataFetching /> },
  { key: 'nx-15', label: 'Create Command',      node: <NxSlide15CreateCommand /> },
  { key: 'nx-16', label: 'Create Result',       node: <NxSlide16CreateResult /> },
  { key: 'nx-17', label: 'File Structure',      node: <NxSlide17FileStructure /> },
  { key: 'nx-18', label: 'Run Dev Server',      node: <NxSlide18RunDevServer /> },
  { key: 'nx-19', label: 'Live Demo — Phases',  node: <NxSlide19LiveDemoPhases /> },
  { key: 'nx-20', label: 'Demo: Run & Route',   node: <NxSlide20DemoRunRoute /> },
  { key: 'nx-21', label: 'Demo: Interactivity', node: <NxSlide21DemoInteractivity /> },
  { key: 'nx-22', label: 'Demo: API & Fetch',   node: <NxSlide22DemoApiAndFetch /> },
  { key: 'nx-23', label: 'Common Pitfalls',     node: <NxSlide23CommonPitfalls /> },
  { key: 'nx-24', label: 'Recap',               node: <NxSlide24Recap /> },
  { key: 'nx-25', label: 'Resources',           node: <NxSlide25Resources /> },
  { key: 'nx-26', label: 'Questions?',          node: <NxSlide26End /> },
]
```

Also update the `import { … }` block at the top of the file to match.

---

## Step 9 — Quality checklist per file

Before handing back a slide file, verify:

- [ ] File starts with `// Nx Slide XX · <title>` comment
- [ ] `'use client'` on line 2
- [ ] `import SceneNx from './_scene_nx'` present
- [ ] No `text-white`, `text-[#…]`, `bg-[#…]`, `border-[#…]` Tailwind classes
- [ ] All colours via `var(--fg)`, `var(--muted)`, etc. (or `nx-*` classes)
- [ ] `nx-h2bar` `<div>` present after every h2
- [ ] Every animated element has `style={{ '--d': '…s' } as React.CSSProperties}`
- [ ] Icons are inline SVG components at the bottom of the file
- [ ] No import from external icon libraries
- [ ] Text content matches the source HTML exactly

---

## Step 10 — What to hand back

Return a zip or paste each file separately in this exact order:

1. One `.tsx` file per slide (named `NxSlide01Title.tsx` … `NxSlide26End.tsx`)
2. Updated `index.ts` barrel
3. The updated `const SLIDES = [` block from `NxDisplayPage.tsx`
   (only the array — not the whole file)

The receiving developer will drop the `.tsx` files into
`components/display/scenes/nextjs/`, replace `index.ts`, and paste the
`SLIDES` array into `NxDisplayPage.tsx`.

---

## Quick reference — full slide list for 2.2.html

| # | data-title | data-kick | Component name |
|---|---|---|---|
| 01 | Next.js Unlocked | Opening | NxSlide01Title |
| 02 | Your Presenter | Your Host | NxSlide02Presenter |
| 03 | Agenda | What We'll Cover | NxSlide03Agenda |
| 04 | What is Next.js? | Foundation — 01 | NxSlide04WhatIsNextjs |
| 05 | Did you know about React? | The Baseline | NxSlide05ReactBaseline |
| 06 | Library vs. Framework | The Key Insight | NxSlide06LibraryVsFramework |
| 07 | How React Works — CSR | Rendering — 01 | NxSlide07CSR |
| 08 | What is SSR? | Rendering — 02 | NxSlide08SSR |
| 09 | React vs. Next.js | Head to Head | NxSlide09ReactVsNextjs |
| 10 | New Features in Next.js 13+ | What's New — 13+ | NxSlide10NewFeatures |
| 11 | Deep Dive: The App Router | Deep Dive — 01 | NxSlide11AppRouter |
| 12 | Folder-Based Routing Variants | Deep Dive — Routing Patterns | NxSlide12RoutingPatterns |
| 13 | Deep Dive: Server Components | Deep Dive — 02 | NxSlide13ServerComponents |
| 14 | Deep Dive: Data Fetching | Deep Dive — 03 | NxSlide14DataFetching |
| 15 | create-next-app: The Command | Hands On — Scaffold | NxSlide15CreateCommand |
| 16 | create-next-app: The Result | Hands On — Result | NxSlide16CreateResult |
| 17 | File Structure Overview | Hands On — Anatomy | NxSlide17FileStructure |
| 18 | Run the Dev Server | Hands On — Run | NxSlide18RunDevServer |
| 19 | Live Demo — Five Phases | Live Demo | NxSlide19LiveDemoPhases |
| 20 | Demo 1–2: Run & Route | Demo · Phases 1–2 | NxSlide20DemoRunRoute |
| 21 | Demo 3: Interactivity | Demo · Phase 3 | NxSlide21DemoInteractivity |
| 22 | Demo 4–5: API & Fetch | Demo · Phases 4–5 | NxSlide22DemoApiAndFetch |
| 23 | Common Pitfalls | Troubleshooting | NxSlide23CommonPitfalls |
| 24 | Recap & Key Takeaways | Recap | NxSlide24Recap |
| 25 | Resources & Next Steps | Keep Learning | NxSlide25Resources |
| 26 | Questions? | Part 1 of 3 — Concepts · Complete | NxSlide26End |
