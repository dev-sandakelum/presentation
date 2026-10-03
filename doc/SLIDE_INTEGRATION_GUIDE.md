# Slide Integration Guide
### For Kiro — receiving externally-generated slide files

This guide tells you exactly what to do when the user brings in `.tsx` slide
files produced by another AI using `HTML_TO_SLIDE_CONVERSION_GUIDE.md`.

---

## Current project state (as of last session)

### Directory
```
components/display/scenes/nextjs/
```

### Files that are CORRECT — do not touch
```
_scene_nx.tsx          ← MSA theme CSS injector. Never modify.
NxSlide01Title.tsx     ← correct content + MSA theme
NxSlide02Presenter.tsx ← correct content + MSA theme
NxSlide03Agenda.tsx    ← correct content + MSA theme (new file)
NxSlide04WhatIsNextjs.tsx ← correct content + MSA theme (new file)
NxSlide05ReactBaseline.tsx ← correct content + MSA theme (new file)
NxSlide06LibraryVsFramework.tsx ← correct content + MSA theme (new file)
```

### Files that are STALE — will be replaced by incoming files
These old files have wrong content mapping and/or hardcoded dark colors.
Keep them on disk until replaced (they're still referenced by index.ts).
```
NxSlide03WhatIsNextjs.tsx    → will be replaced by NxSlide03Agenda content
NxSlide04ReactBaseline.tsx   → will be replaced by NxSlide04WhatIsNextjs content
NxSlide05LibraryVsFramework.tsx → will be replaced by NxSlide05ReactBaseline content
NxSlide06CSR.tsx             → will be replaced by NxSlide06LibraryVsFramework content
NxSlide07SSR.tsx             → will be replaced by NxSlide07CSR content
NxSlide08ReactVsNextjs.tsx   → will be replaced by NxSlide08SSR content
NxSlide09NewFeatures.tsx     → will be replaced by NxSlide09ReactVsNextjs content
NxSlide10AppRouter.tsx       → will be replaced by NxSlide10NewFeatures content
NxSlide11RoutingPatterns.tsx → will be replaced by NxSlide11AppRouter content
NxSlide12ServerComponents.tsx → will be replaced by NxSlide12RoutingPatterns content
NxSlide13DataFetching.tsx    → will be replaced by NxSlide13ServerComponents content
NxSlide14CreateProject.tsx   → will be replaced by NxSlide14DataFetching content
NxSlide15FileStructure.tsx   → will be replaced by NxSlide15CreateCommand content
NxSlide15bCreateResult.tsx   → will be replaced by NxSlide16CreateResult content
NxSlide16bRunDevServer.tsx   → will be replaced by NxSlide17FileStructure content
NxSlide16LiveDemo.tsx        → will be replaced by NxSlide25Resources content
NxSlide17bDemoPhases.tsx     → will be replaced by NxSlide18RunDevServer content
NxSlide18DemoRunRoute.tsx    → will be replaced by NxSlide19LiveDemoPhases content
NxSlide19DemoInteractivity.tsx → will be replaced by NxSlide20DemoRunRoute content
NxSlide20DemoApiAndFetch.tsx → will be replaced by NxSlide21DemoInteractivity content
NxSlide21CommonPitfalls.tsx  → will be replaced by NxSlide22DemoApiAndFetch content
NxSlide22Recap.tsx           → will be replaced by NxSlide23CommonPitfalls content
NxSlide23Resources.tsx       → will be replaced by NxSlide24Recap content
NxSlide17End.tsx             → will be replaced by NxSlide26End content
```

---

## What the user will bring in

A set of `.tsx` files named with the clean convention from the guide:

```
NxSlide01Title.tsx           (may or may not be included — skip if present)
NxSlide02Presenter.tsx       (may or may not be included — skip if present)
NxSlide03Agenda.tsx
NxSlide04WhatIsNextjs.tsx
NxSlide05ReactBaseline.tsx
NxSlide06LibraryVsFramework.tsx
NxSlide07CSR.tsx
NxSlide08SSR.tsx
NxSlide09ReactVsNextjs.tsx
NxSlide10NewFeatures.tsx
NxSlide11AppRouter.tsx
NxSlide12RoutingPatterns.tsx
NxSlide13ServerComponents.tsx
NxSlide14DataFetching.tsx
NxSlide15CreateCommand.tsx
NxSlide16CreateResult.tsx
NxSlide17FileStructure.tsx
NxSlide18RunDevServer.tsx
NxSlide19LiveDemoPhases.tsx
NxSlide20DemoRunRoute.tsx
NxSlide21DemoInteractivity.tsx
NxSlide22DemoApiAndFetch.tsx
NxSlide23CommonPitfalls.tsx
NxSlide24Recap.tsx
NxSlide25Resources.tsx
NxSlide26End.tsx
```

Plus possibly:
- An updated `index.ts` barrel
- A replacement `SLIDES` array block

---

## Integration steps

### Step 1 — Validate incoming files

For each `.tsx` file the user provides, verify:

1. Starts with `'use client'`
2. Imports `SceneNx` from `./_scene_nx`
3. Wraps content in `<SceneNx>`
4. Contains **no hardcoded dark colors**: grep for
   `text-white`, `text-\[#`, `bg-\[#`, `border-\[#`
5. Uses `var(--fg)` / `var(--muted)` / `var(--blue)` etc. for any inline `style={{}}`
6. Has animation delays as `style={{ '--d': '…s' } as React.CSSProperties}`

If any file fails, fix it before proceeding:
- Replace `text-white` → remove (h2 already gets color from `nx-h2`)  
- Replace `text-[#a5a5a5]` / `text-[#6e6e6e]` → remove (handled by `nx-lead`, `nx-muted` etc.)
- Replace `bg-[#0a0a0a]` on non-terminal elements → `style={{ background:'var(--surface)' }}`
- Replace `border-[#242424]` → `style={{ border:'1px solid var(--border)' }}`

### Step 2 — Write the new files to disk

Write each incoming file directly to:
```
c:\Users\Hasitha_san_\Documents\{NODE}\presentation\components\display\scenes\nextjs\<filename>
```

Do not delete the old stale files yet — wait until index.ts is updated.

### Step 3 — Rewrite index.ts

Replace the entire contents of:
```
components/display/scenes/nextjs/index.ts
```

With exactly these exports (clean 26-file set, old stale names removed):

```typescript
// Barrel export — Next.js Unlocked presentation slides
export { default as NxSlide01Title }              from './NxSlide01Title'
export { default as NxSlide02Presenter }          from './NxSlide02Presenter'
export { default as NxSlide03Agenda }             from './NxSlide03Agenda'
export { default as NxSlide04WhatIsNextjs }       from './NxSlide04WhatIsNextjs'
export { default as NxSlide05ReactBaseline }      from './NxSlide05ReactBaseline'
export { default as NxSlide06LibraryVsFramework } from './NxSlide06LibraryVsFramework'
export { default as NxSlide07CSR }                from './NxSlide07CSR'
export { default as NxSlide08SSR }                from './NxSlide08SSR'
export { default as NxSlide09ReactVsNextjs }      from './NxSlide09ReactVsNextjs'
export { default as NxSlide10NewFeatures }        from './NxSlide10NewFeatures'
export { default as NxSlide11AppRouter }          from './NxSlide11AppRouter'
export { default as NxSlide12RoutingPatterns }    from './NxSlide12RoutingPatterns'
export { default as NxSlide13ServerComponents }   from './NxSlide13ServerComponents'
export { default as NxSlide14DataFetching }       from './NxSlide14DataFetching'
export { default as NxSlide15CreateCommand }      from './NxSlide15CreateCommand'
export { default as NxSlide16CreateResult }       from './NxSlide16CreateResult'
export { default as NxSlide17FileStructure }      from './NxSlide17FileStructure'
export { default as NxSlide18RunDevServer }       from './NxSlide18RunDevServer'
export { default as NxSlide19LiveDemoPhases }     from './NxSlide19LiveDemoPhases'
export { default as NxSlide20DemoRunRoute }       from './NxSlide20DemoRunRoute'
export { default as NxSlide21DemoInteractivity }  from './NxSlide21DemoInteractivity'
export { default as NxSlide22DemoApiAndFetch }    from './NxSlide22DemoApiAndFetch'
export { default as NxSlide23CommonPitfalls }     from './NxSlide23CommonPitfalls'
export { default as NxSlide24Recap }              from './NxSlide24Recap'
export { default as NxSlide25Resources }          from './NxSlide25Resources'
export { default as NxSlide26End }                from './NxSlide26End'
```

### Step 4 — Rewrite the SLIDES array in NxDisplayPage.tsx

File: `app/display/[id]/NxDisplayPage.tsx`

Replace the entire import block (from line 1 of imports down to the closing `}`) and the `const SLIDES = [` array.

**New import block:**
```typescript
import {
  NxSlide01Title,
  NxSlide02Presenter,
  NxSlide03Agenda,
  NxSlide04WhatIsNextjs,
  NxSlide05ReactBaseline,
  NxSlide06LibraryVsFramework,
  NxSlide07CSR,
  NxSlide08SSR,
  NxSlide09ReactVsNextjs,
  NxSlide10NewFeatures,
  NxSlide11AppRouter,
  NxSlide12RoutingPatterns,
  NxSlide13ServerComponents,
  NxSlide14DataFetching,
  NxSlide15CreateCommand,
  NxSlide16CreateResult,
  NxSlide17FileStructure,
  NxSlide18RunDevServer,
  NxSlide19LiveDemoPhases,
  NxSlide20DemoRunRoute,
  NxSlide21DemoInteractivity,
  NxSlide22DemoApiAndFetch,
  NxSlide23CommonPitfalls,
  NxSlide24Recap,
  NxSlide25Resources,
  NxSlide26End,
} from '@/components/display/scenes/nextjs'
```

**New SLIDES array (straight 1-to-1, no scrambling):**
```typescript
// 26 slides — straight 1-to-1 with 2.2.html
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

### Step 5 — Delete stale files

After index.ts and NxDisplayPage.tsx are updated and compile clean,
delete the old stale files:

```
NxSlide03WhatIsNextjs.tsx
NxSlide04ReactBaseline.tsx
NxSlide05LibraryVsFramework.tsx
NxSlide06CSR.tsx
NxSlide07SSR.tsx
NxSlide08ReactVsNextjs.tsx
NxSlide09NewFeatures.tsx
NxSlide10AppRouter.tsx
NxSlide11RoutingPatterns.tsx
NxSlide12ServerComponents.tsx
NxSlide13DataFetching.tsx
NxSlide14CreateProject.tsx
NxSlide15FileStructure.tsx
NxSlide15bCreateResult.tsx
NxSlide16bRunDevServer.tsx
NxSlide16LiveDemo.tsx
NxSlide17bDemoPhases.tsx
NxSlide17End.tsx
NxSlide18DemoRunRoute.tsx
NxSlide19DemoInteractivity.tsx
NxSlide20DemoApiAndFetch.tsx
NxSlide21CommonPitfalls.tsx
NxSlide22Recap.tsx
NxSlide23Resources.tsx
```

### Step 6 — Run diagnostics

```
get_diagnostics on:
  app/display/[id]/NxDisplayPage.tsx
  components/display/scenes/nextjs/index.ts
  + all 26 new NxSlide*.tsx files
```

Fix any TypeScript errors found. Common ones:
- `'--d' does not exist` → add `as React.CSSProperties` to the style object
- JSX entity issues → use `&apos;` for `'`, `&amp;` for `&`, `&ldquo;`/`&rdquo;` for quotes
- Unused imports → remove them
- Missing `Fragment` import → add `import { Fragment } from 'react'` if using `<>` with keys

### Step 7 — Final verification

Check these in order:

1. `TOTAL === 26` — count the SLIDES array entries
2. Slide 01 shows: MsLogo + "Next.js Unlocked" heading + MSA tagline
3. Slide 02 shows: Presenter name + rows + contact chips
4. Slide 03 shows: 8 agenda items in 2-column grid
5. Slide 26 shows: "Questions?" heading + MSA tagline (not a duplicate of slide 01)
6. No slide shows black background (all use `var(--bg)` = `#F7F9FC` in light mode)
7. Code blocks show light syntax colors (blue keywords, not white)
8. Terminal panels stay dark (that is correct — intentional dark-on-dark)
9. Theme toggle (T key) switches all slide text between light and dark correctly
10. Progress bar advances with each slide

---

## Handling partial deliveries

If the user only brings some slides (e.g. slides 07–14):

1. Write only the received files to disk
2. Do NOT update index.ts or NxDisplayPage.tsx yet
3. Tell the user which slides are still missing
4. Wait for the full set before doing steps 3–7

If the user brings a replacement `index.ts`:

- Diff it against the target above
- Only use it if it contains all 26 exports with the clean naming convention
- If it still uses old names (NxSlide03WhatIsNextjs etc.), ignore it and write the target index.ts yourself

If the user brings a replacement SLIDES array block:

- Verify it has exactly 26 entries
- Verify every component name matches a file that exists on disk
- Verify no entry reuses a component for two different slots
- If clean, use it; otherwise use the target array above

---

## Quick reference — expected filename ↔ content ↔ 2.2.html

| File | Export name | Slide content | data-title in HTML |
|---|---|---|---|
| NxSlide01Title.tsx | NxSlide01Title | Title + MSA tagline | Next.js Unlocked |
| NxSlide02Presenter.tsx | NxSlide02Presenter | Presenter card + rows + contact | Your Presenter |
| NxSlide03Agenda.tsx | NxSlide03Agenda | 8-item 2-col agenda grid | Agenda |
| NxSlide04WhatIsNextjs.tsx | NxSlide04WhatIsNextjs | Split: lead+chips+trust / 3 rows | What is Next.js? |
| NxSlide05ReactBaseline.tsx | NxSlide05ReactBaseline | React atom + 4 rows | Did you know about React? |
| NxSlide06LibraryVsFramework.tsx | NxSlide06LibraryVsFramework | Quote + 3 defs + footnote | Library vs. Framework |
| NxSlide07CSR.tsx | NxSlide07CSR | Dashed flow 4 steps + pro/con | How React Works — CSR |
| NxSlide08SSR.tsx | NxSlide08SSR | Solid flow 4 steps + pro/con | What is SSR? |
| NxSlide09ReactVsNextjs.tsx | NxSlide09ReactVsNextjs | Comparison table 6 rows | React vs. Next.js |
| NxSlide10NewFeatures.tsx | NxSlide10NewFeatures | 5 feature rows | New Features in Next.js 13+ |
| NxSlide11AppRouter.tsx | NxSlide11AppRouter | File tree code + 3 rows | Deep Dive: The App Router |
| NxSlide12RoutingPatterns.tsx | NxSlide12RoutingPatterns | 3 route patterns | Folder-Based Routing Variants |
| NxSlide13ServerComponents.tsx | NxSlide13ServerComponents | 3 rows + server/client boundary | Deep Dive: Server Components |
| NxSlide14DataFetching.tsx | NxSlide14DataFetching | 2-col before/after code | Deep Dive: Data Fetching |
| NxSlide15CreateCommand.tsx | NxSlide15CreateCommand | Terminal + copy button | create-next-app: The Command |
| NxSlide16CreateResult.tsx | NxSlide16CreateResult | Terminal with prompts output | create-next-app: The Result |
| NxSlide17FileStructure.tsx | NxSlide17FileStructure | File tree code + 3 rows | File Structure Overview |
| NxSlide18RunDevServer.tsx | NxSlide18RunDevServer | Terminal `npm run dev` + copy | Run the Dev Server |
| NxSlide19LiveDemoPhases.tsx | NxSlide19LiveDemoPhases | 5 phase cards | Live Demo — Five Phases |
| NxSlide20DemoRunRoute.tsx | NxSlide20DemoRunRoute | 2 code panels: terminal + about page | Demo 1–2: Run & Route |
| NxSlide21DemoInteractivity.tsx | NxSlide21DemoInteractivity | 2 code panels: counter + why | Demo 3: Interactivity |
| NxSlide22DemoApiAndFetch.tsx | NxSlide22DemoApiAndFetch | 2 code panels: route.ts + page.tsx | Demo 4–5: API & Fetch |
| NxSlide23CommonPitfalls.tsx | NxSlide23CommonPitfalls | 4 phase cards (pitfalls) | Common Pitfalls |
| NxSlide24Recap.tsx | NxSlide24Recap | 4 phase cards (takeaways) | Recap & Key Takeaways |
| NxSlide25Resources.tsx | NxSlide25Resources | 4 phase cards (resources) | Resources & Next Steps |
| NxSlide26End.tsx | NxSlide26End | Centred: MsLogo + Questions? + tagline | Questions? |

---

## Files that must never change

```
_scene_nx.tsx                 ← CSS design system. Never edit.
NxDisplayPage.tsx (chrome)    ← Only the imports + SLIDES array changes.
```

The rest of `NxDisplayPage.tsx` (theme tokens, keyboard handling, chrome JSX,
icon components) must not be touched during integration.
