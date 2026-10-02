# Slide Scene — Drop-in Kit

## What's in this zip

```
_scene.tsx          ← Required. The style injector. Put this in your scenes folder.
SlideDemo01.tsx     ← Demo slide: simple title + body layout
SlideDemo02.tsx     ← Demo slide: card grid + animated flow
INSTRUCTION.md      ← This file
```

---

## How it works

Every slide in this system is a **single, fully self-contained `.tsx` file**.  
No external CSS imports. No shared style files outside the folder. Just React + Tailwind classes + one internal import.

```
scenes/
  _scene.tsx        ← style injector (lives here alongside the slides)
  Slide01Title.tsx
  Slide02Hook.tsx
  SlideXXYours.tsx  ← drop yours here
  …
```

### The `_scene.tsx` file

`_scene.tsx` holds **all animation keyframes and utility CSS classes** as an embedded string.  
It injects them into `<head>` once on first mount, deduplicated by a stable ID.  
It also renders a `<style dangerouslySetInnerHTML>` block for SSR / first paint.

You never need to touch `_scene.tsx` unless you want to add new animation classes.

---

## How to write a slide

```tsx
// SlideYourName.tsx
import Scene from './_scene'

export default function SlideYourName() {
  return (
    <Scene>
      {/* your content here */}
    </Scene>
  )
}
```

That's it. The `<Scene>` wrapper gives you access to every animation class.

---

## Animation classes reference

### Entrance (staggered fade + rise)
Apply `pres-rise` to each element. Set `--d` (delay index) to stagger them.

```tsx
<h1 style={{ '--d': '0' } as React.CSSProperties} className="pres-rise">
  Title
</h1>
<p style={{ '--d': '1' } as React.CSSProperties} className="pres-rise">
  Body copy — enters 90ms after the title
</p>
<div style={{ '--d': '2' } as React.CSSProperties} className="pres-rise">
  Third element — enters 180ms after title
</div>
```

Each `--d` step adds `90ms` delay. The base delay is `120ms`.  
So `--d: 0` → 120ms, `--d: 1` → 210ms, `--d: 2` → 300ms, etc.

Use `pres-rise-back` instead for back-direction transitions (elements rise from above).

---

### Gradient text
```tsx
<span className="pres-grad">AI Agent</span>
```
Animates a blue → violet → teal → blue gradient shift across the text.

---

### Idle / loop animations

| Class | Effect |
|---|---|
| `pres-blink` | Slow blink (2.4s) — status dots |
| `pres-blink-fast` | Fast cursor blink (1.05s steps) |
| `pres-blink-live` | Medium blink (1.2s) — live badges |
| `pres-arrow-pulse` | Arrow slides left→right (use `--d` for offset) |
| `pres-plus-pulse` | Plus sign scales up/down (use `--d` for offset) |
| `pres-agent-glow` | Box glows blue (3.5s cycle) |
| `pres-radar` | Radar ring expands from centre outward |
| `pres-radar-delay` | Same but 1.6s offset (pair with `pres-radar`) |
| `pres-travel` | Dot travels left→right along a line |
| `pres-travel-rev` | Same but right→left |
| `pres-ping` | Dot emits a ring pulse (use `--d` for offset) |
| `pres-draw-line` | Line draws itself left→right (use `--d` for offset) |
| `pres-halo` | Outer dashed orbit ring — absolute positioned |
| `pres-halo-inner` | Inner dashed orbit ring — add alongside `pres-halo` |

---

### Spotlight card hover
```tsx
<div className="pres-spotlight">
  …card content…
</div>
```
On hover, shows a radial light glow that follows the cursor.  
Requires the `SlideBackground` spotlight JS to set `--mx`/`--my` (already wired in the display page).  
Without that JS it gracefully shows nothing — no error.

---

## Replacing a slide

1. Create `SlideXXNew.tsx` anywhere (another AI, another project, etc.)
2. Add `import Scene from './_scene'` at the top
3. Wrap your JSX in `<Scene>…</Scene>`
4. Drop the file into the `scenes/` folder
5. Update the import in `app/display/page.tsx` to point to the new file

No other changes needed. The rest of the system is untouched.

---

## Required project setup (already done if you're in this repo)

- **Next.js 14+** with App Router
- **Tailwind CSS v4** (arbitrary values like `text-[clamp(…)]` must be enabled)
- `'use client'` — slides are client components (needed for animations)
- `react` is the only allowed external import in a slide

---

## Demo slides included

### SlideDemo01 — Title + body
A centred title slide with spinning halos, gradient headline, staggered body text, and a status chip.  
Good starting point for any "hero" or opening slide.

### SlideDemo02 — Card grid + flow
A left-aligned content slide with a kicker, headline, an animated node flow, and a 3-column card grid with spotlight hover.  
Good starting point for any concept, feature list, or comparison slide.
