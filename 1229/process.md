# №1229 — Closed Circle of Worship

Leslie Supnet study block LS6 (PP388), after her 2009 mathematically
structured ritual work. Concentric rings of hand-drawn occult geometry on
aged black paper (#0D0C0A): chalk linework (#E5D9BE), ritual red (#8E2323),
sulfur (#D8A020), and deep blue (#2E3E5A) reserved for the eye ring only.
Strokes only — no fills except the void's own paper disc. No text, no
sound, no glow, no gradients.

## The rings, in stepped polyrhythm

Nothing rotates smoothly. Each ring's angle is a pure step function of
time, and the first 0.05 s of every step the drawing sits +1.5° past its
mark before settling — the drawn-frame snap of a hand-advanced reel.

- **Outer ring** — 12 units, pyramids and crescents alternating (the
  crescent is a true two-circle construction: outer arc and bite arc meet
  exactly at computed cusps, body bulging inward, horns out). One step
  every 5 s, 12 steps per 60 s cycle. Sulfur tick marks count the steps
  on the band's rim. Unit 0 carries the red.
- **Sigil band** — 10 sigils in sulfur (№3 in red) drift at half the
  outer ring's stepped rate. Each sigil is a seeded random walk of 9
  segments, steered back inside its cell when it strays, with a cross-tick
  where the walk ends. The walk index is `floor(outerStep / 8) + salt`,
  so all ten sigils redraw themselves every 8 outer steps (40 s).
- **Middle ring** — 8 eyes in deep blue only: two lid arcs, an iris, a
  pupil. One step every 7.5 s. The first eye's iris is red.
- **Inner ring** — 5 motifs, one step every 12 s. The prompt's goat
  profile is **abstracted to pure line geometry**: a tightening horn
  spiral, a brow bar with an ear tick, an angular jaw polyline, a beard
  zigzag. It reads as ritual angular geometry, not an animal portrait —
  no recognizable ritual text or imagery anywhere in the piece.
- **The void** — a paper disc at the center bounded by a double chalk
  ring. Nothing is ever drawn inside it.

Every vertex of every stroke is perturbed by a seeded integer hash of
(seed, boil index, vertex), re-hashed twice a second, so the linework
boils the way hand-redrawn frames do. The paper carries a static seeded
speckle field. There is no `Math.random` anywhere.

## Interaction

- **Drag on the outer ring** rotates it manually against the loop (the
  offset is the pointer's angular travel, wrapped). On release the
  worship resists: the offset snaps back to zero in three quantized
  0.15 s steps, and the loop's own step function never lost its place.
- **Double-tap** increments the sigil salt — all ten sigils redraw
  themselves with new walks.

## Determinism

The synchronous first frame is drawn at the fixed phase **T0 = 26 s**;
the animation loop (guarded by a `typeof requestAnimationFrame` check)
is anchored as T0 + elapsed-since-load. Frame one therefore always shows
the same misaligned polyrhythm:

- outer: step ⌊26/5⌋ = **5** → 5 × 30° = **150°**
- middle: step ⌊26/7.5⌋ = **3** → 3 × 45° = **135°**
- inner: step ⌊26/12⌋ = **2** → 2 × 72° = **144°**
- sigil walk index ⌊5/8⌋ = **0**; boil index ⌊26 × 2⌋ = 52
- snap overshoot: 26 s sits 1.0 s into the outer step, 3.5 s into the
  middle step, 2.0 s into the inner step — all past the 0.05 s snap
  window, so frame one is settled, not mid-snap.

Canvas is sized from the Visual Viewport API with resize listeners on
both the viewport and the window; the CSS size is pinned in `draw()`;
phone detection uses `window.screen` (min dimension < 700 px) with the
aspect fallback. The circle is centered and sized to the short side.
