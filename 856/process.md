# No.856 "A Stranger's Cornea" — process

Study #105 hsin-chien-huang, PP17 "The Borrowed Eyes" (Samsara: "Perhaps we are
only borrowing each other's eyes for a brief passage through this world.").

## Concept

A flat, near-black generative landscape — layered sage hills, a few simple
tree forms, a low amber sun, drifting dust-gold motes — seen through two
borrowed corneal lenses. The lenses are translucent teal-rimmed discs that
float on slow independent orbits and refract whatever passes beneath them:
inside each disc the hills bend, the sun swells or shrinks, the trees lean.
A thin dust-gold loan ring circles each lens and thins as the loan runs down;
after ten minutes the lenses dissolve and only the raw field remains.
Drag lends a hand to one eye, tap blinks (the lenses swap places and warp
characters), double-tap renews the loan. No eyeballs, no labels, no horror:
the loan is a gift and the piece stays tender.

## Construction

- **Palette (strict):** eye-black #050608, cornea-teal #1E4E5A, iris-amber
  #C9962E, dust-gold #8A6F3A, field sage #3A4A3A. Hill and tree tones are
  mixes of sage toward eye-black only.
- **Landscape as a shape function.** The scene is drawn by
  `drawScene(t, warp)`: every element (sun as a 48-segment polygon, four
  sine-sum hill polylines sampled across the width, subdivided tree
  polygons, dust motes) is a point list plotted through `warp(x, y)`.
  The base pass uses the identity warp. Hills breathe: their amplitude is
  modulated by a slow closed-form sine of t. Dust drift is closed-form in t.
- **Warp-redraw (no offscreen canvas).** For each lens the canvas is clipped
  to the disc and the whole scene is redrawn with a radial warp:
  `F(p) = c + (p − c) · (1 + A · (1 − d²/r²))` inside the disc, identity
  outside it. Because the factor is 1 at the rim, shapes stay continuous at
  the edge but bend inside — one lens magnifies (A = +0.34), the other
  compresses (A = −0.27), so each loan bends differently. A flat teal wash
  (alpha 0.10) and two flat rim strokes give the soft edge; no gradients,
  no shadowBlur, no ctx.filter anywhere.
- **Orbits and events.** Lens identities own their orbit (Lissajous sines,
  periods 83–149 s) and warp amplitude. Two slots carry the identities.
  All interaction is a recorded event list; every frame is a pure function
  of (events, t). Drag belongs to a slot: the lens follows the pointer with
  its grab offset, then returns to its orbit with an exponential decay of
  the release delta (τ = 1.4 s). A tap (short, near-still release) swaps
  the two identities between slots, eased over 0.8 s with smootherstep —
  position and warp amplitude crossfade together, a blink. A double-tap
  cancels the pending swap and restarts the loan clock instead.
- **The loan.** Loan length 600 s. The loan ring's stroke width scales by
  (1 − 0.82 · age/600) and its alpha eases down; the lenses themselves fade
  out over the final 60 s via a smootherstep alpha, warp included.
- **Determinism.** Frame one is the synchronous `draw(0)` at load: both
  lenses mid-orbit over the hills, sun up, rings nearly full. Nothing drawn
  is derived from `Date.now()`; the animation clock is elapsed time since
  load, and frame one is re-rendered identically by the QA harness
  (thumb.png byte-compared, see QA log).
- **House rules.** Visual Viewport sizing with resize listeners on both
  visualViewport and window; canvas CSS size pinned in px inside `draw()`;
  phone detection via `window.screen` min dimension < 700 px with the
  `h > w·1.15` aspect fallback; rAF typeof-guarded (the QA renderer has no
  rAF, no AudioContext, no document.createElement — the piece uses none of
  them). Seeded RNG: mulberry32, seed 856017.

## Deviations

- **No sound.** The prompt's near-silent corneal hum is omitted: gallery
  pieces are silent by house convention, and there is no gesture this
  watch-first piece needs to wait for. Recorded here per the brief.
- **Lens redraw cost.** The scene is drawn three times per frame (base +
  once per lens, clipped). Deliberate: it keeps the warp a true redraw of
  the same parametric shapes instead of a pixel copy, at a shape count
  small enough to afford it.

## QA log

- Renderer: `node ~/workspace/tools/render-piece.js` (node-canvas shim,
  no rAF / AudioContext / createElement — piece renders cleanly in it).
- `qa-desktop.png` (1280×900): dark field, four sage hill layers, amber sun
  upper-right, seven tree forms, two teal-rimmed lens discs over the hills
  with the hill lines visibly displaced inside them, dust-gold loan rings
  nearly full. Nothing clipped.
- `thumb.png` (720×720): same composition in square format; the lenses
  overlap slightly at this orbit phase, each still bending its own patch.
- `qa-mobile.png` (390×844): phone path; both lenses whole in the tall
  frame, sun clear, hills and trees hold, nothing clipped.
- Determinism: thumb.png rendered twice and `cmp` byte-compared —
  identical. Duplicate deleted.
