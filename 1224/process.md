# №1224 — Sun Moon Stars Rain, Choreographed

Leslie Supnet study block LS1 (PP383), after her 2009 *sun moon stars rain*, a film
choreographed second-by-second against a soundtrack. A ritual sky — sun disk, moon
crescent, pyramid, starburst — sits in circle-of-worship geometry on a flat black
field (#0A0A08), drawn in bone white (#F2EAD8) and sulfur yellow (#E8B71A) with
blood-red (#C62B2B) accents and night blue (#5A6B8C) reserved for the moon's phase
outline. Ink on black, never space art: no gradients, no glow, nothing smooth.

## The score

The loop is 24 seconds, and the score is a shooting plan made visible:

- A seeded shuffle (mulberry32, seed 84) deals 24 distinct glyphs — sun, moon,
  star, rain, eye, pyramid, wave, ring, target, cross, spiral, diamond, drop,
  bolt, flower, half-disc, grid, arrow, hook, comet, eclipse, steps, candle —
  into a timeline grid along the bottom edge, one cell per second.
- Each second's choreography is derived from its own seeded stream, biased by the
  glyph sitting in that second: a sun glyph forces three sun-steps and the red
  accent; a rain glyph forces two rain sheets and the accent; a star glyph snaps
  the star field fully gathered or fully scattered. Assignments follow the
  glyphs, so reseeding the glyph order re-choreographs the film.
- Every second assigns: sun rotation steps (each 15°, advanced in substeps
  across the second's frames), a moon phase (six drawn phases, swapped only at
  second boundaries), a star scatter amount (0, ¼, ½, ¾, or 1 — stars sit on a
  ring formation at 0 and hash-scatter across the sky at 1), rain (0–2 sheets of
  short streaks whose heights quantize to 22 discrete steps), and one element to
  carry the blood-red accent for that second. The current second also burns red
  as a tick on the outer ring and is outlined in sulfur on the timeline.

Seed 84 was chosen and verified so the fixed opening phase lands mid-choreography:
at second 9 the score calls for 2 sun steps, moon phase 2 (a thick crescent),
scatter exactly ½, two rain sheets, and the red accent on the rain.

## Stepped rendering

Nothing interpolates. Piece time quantizes to a stepped frame `f = floor(τ·7)`
(7 fps). All linework is jittered polygons whose jitter re-hashes per frame, so
every line boils like hand-traced animation; a hashed grain field of 130 specks
is re-dealt each stepped frame, and a global flicker steps alpha between 0.92
and 1 by frame hash. Rain falls only in discrete cuts, the moon swaps phases
only on second boundaries, and scatter cuts between seconds.

## Time and interaction

The first frame is drawn synchronously at the fixed phase τ₀ = 9.3 s; the rAF
loop (typeof-guarded) is anchored there plus elapsed time. Piece time τ is
evaluated from a segment list built from recorded events only:

- `const` segments: τ = τ₀ + rate·(now − t₀).
- Horizontal drag freezes τ and scrubs it (dx px × 0.008 s) while held.
- On release, an `ease` segment starts from the scrubbed τ with
  rate₀ = clamp(1 − dy/140, −3, 3) — drag up to pedal faster, down through zero
  to reverse the projector — and the rate eases back to 1 over 4 s, in closed
  form: τ = τ₀ + u + (rate₀−1)(u − u²/8) for u < 4, then τ = τ₀ + u + 2(rate₀−1).
- Double-tap (or double-click) increments the seed: the glyph order reshuffles
  and the score is re-derived, at the same τ and normal rate.

There is no sound and no click-to-reload.

## House adaptations

Canvas is sized from the Visual Viewport API with resize listeners on both
visualViewport and window; the canvas CSS size is pinned in draw(); phones are
detected via `window.screen` (min dimension < 700) with an aspect fallback and
get a slightly larger mandala radius. All geometry is canvas-2D polygons and
lines (no offscreen canvas, no ImageData, no filters, no shadowBlur). No
visible text anywhere except the `<title>` — the timeline glyphs are drawn
shapes, not characters.

## QA

Rendered with the house node-canvas renderer. Frame one (τ = 9.3 s) verified at
1280×800, 390×844, and 720×720: black field; sulfur sun mid-rotation with
triangular rays; crescent moon (phase 2) in blue and bone at upper left; bone
pyramid below; bone starburst at right; two red rain sheets falling in cuts
(the second-9 accent); stars half-scattered between ring and field; red tick
on the ring at second 9; timeline along the bottom with the drop glyph (second
9) outlined in sulfur. The 720×720 thumb was rendered twice and byte-compared
with `cmp`: identical.
