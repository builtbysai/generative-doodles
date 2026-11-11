# №1691 "Manifold, Rebuilt" (MK4, mpkoz PP938, EXPANSION #222)

Date: 2006 · 08 · 29. Watch-only. Canvas 2D only.

## Build

- Parametric bouquet from a fixed seed (mulberry32, 938): 5 hydrangea clusters,
  411 ribbon petals (4-5 per floret, cream #F2EAD8 / pale green #B9C98E),
  26 deep-green leaves ringing the bouquet, 12 stems down to the vase neck.
- Cobalt vase (#1E3FAE) built from 46 vertical strokes clipped to a bezier
  silhouette, with a gradient shadow wash (upper-left light) and a neck rim
  highlight. Vase sits on an implied table line at v = 0.72.
- Background: 26 broad near-black umber (#1A1410) strokes filling left to
  right over a warm brown primed ground (#3A2E24); table band and line fade
  in once the background is mostly in.
- Each stroke is lifted geometry: an offset soft shadow copy (down-right,
  no shadowBlur) under the stroke body. Oil petals add a gloss highlight
  along the upper edge.
- Style cycle, 60 s per block, crossfaded over 2 s at each boundary:
  oil (fat rounded ribbons + gloss), charcoal (pale chalk scratch lines over
  a muted wash), watercolor (translucent double wash). Same composition in
  all three styles; all palettes stay in the still-life register.
- Growth loop per 60 s block: flowers 0-10 s, leaves/stems 9-11.5 s, vase
  12-18 s, background 18-26 s, then a slow settle sway (0.004 rad) from
  26 s. Strokes ease in with a 300 ms easeOutBack overshoot.
- Frame one at t = 22 s: flowers and vase complete, background mid-fill
  (left half dark umber, right half still primed ground).
- Plates drawn on canvas: cream plate, dark ink. Title "Manifold, Rebuilt",
  date "2006 · 08 · 29", hint "Watch only."
- House rules: Visual Viewport sizing with resize on visualViewport and
  window; canvas pinned in draw(); phone detection via window.screen
  (min dimension < 700 px) with aspect fallback; centered square field on
  desktop, full-bleed on phones; one synchronous frame at load; rAF guarded
  with typeof; seeded RNG only, no Date.now()/Math.random(); reduced-motion
  respected (static frame one). No em dashes in visible copy.

## Deviations from the prompt

- Charcoal is rendered as pale chalk on the dark ground rather than dark
  charcoal marks: dark-on-dark was unreadable (verified in QA). The chalk
  treatment keeps the still-life palette and the scratchy linework the
  prompt calls for.
- The 12 Chimera styles are represented by the three named in the prompt
  (oil, charcoal, watercolor); the prompt names only these three profiles.
- Style cycle is 60 s per style (a few minutes for the full rotation),
  not "every few minutes" per style; growth restarts with each style block
  so every style is seen growing the bouquet.

## QA

- Rendered with node ~/workspace/tools/render-piece.js from the actual
  script: 1280x900 desktop, 390x844 mobile, 720x720 thumb. All three read
  and inspected.
- Desktop frame one: hydrangea clusters read clearly, cobalt vase solid,
  background visibly mid-fill, plates legible.
- Mobile: full-bleed tall field; bouquet and vase read, same vertical
  stretch as the №1687 template.
- Extra phase probes via __probe.drawAt: t=4 (early growth, partial
  florets, correct), t=30 (oil settle, complete), t=61 (charcoal growth
  restart), t=65 (charcoal early growth), t=90 (charcoal settle),
  t=125 (watercolor early growth), t=150 (watercolor settle, translucent
  washes over the full composition).
- Bug found and fixed in QA: hexRgb only parsed '#RRGGBB', so mixing an
  already-mixed 'rgb(...)' color produced rgb(NaN,NaN,NaN) and node-canvas
  silently kept the previous (dark shadow) fill, making the whole charcoal
  bouquet paint near-black. Fixed by teaching hexRgb to parse 'rgb(r,g,b)'
  strings. Charcoal bouquet luminance in its region went from mean 25.9
  (background level) to 71.9 after the fix. Thumb re-rendered after the
  final edit; frame one is oil, so the thumb is pixel-identical to the
  pre-fix render (md5 unchanged).
- Flicker safety: no strobing by construction; the only motion is slow
  growth, a 2 s style crossfade, and a 0.004 rad sway.
- Counts (probe): petals 411, leaves 26, stems 12, vase strokes 46,
  background strokes 26, clusters 5.
