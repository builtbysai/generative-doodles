# №1356 "Redaction Field" (cannupa-hanska-luger CH5, PP579)

## What it is

A field of dense pseudo-manual text on aged paper (#e8e2d4), slashed by four
thick black redaction bars (#111111) on parallel diagonals. Under each bar a
generative ink drawing blooms as the bar is wiped away; wiped bars slowly
re-blacken, so the piece is a cycle of uncovering. Drag-only; no tap action,
never click-to-reload.

## Frame one

Aged-paper field, full-bleed, covered in rows of invented glyphs (see below),
faint grid lines, scattered diagram ticks (circles with ticks, dimension
lines, angle arcs), and low-alpha rust-red stamp blotches. Four parallel
diagonal bars (all −14°, staggered down the field) sit fully black. Each
bar's ink drawing extends past the bar's ends and edges, so fragments of all
four drawings are already visible — half-hidden, half-emerged, as specced.

## The invented glyphs

Twenty abstract stroke marks, drawn from a seeded set: circles with dots,
open arcs with ticks, chevrons, single sine waves, brackets, dot clusters,
triangles, diamonds, spiral arcs, crescents, staircases, and similar diagram
marks. No glyph is a letter in any alphabet, and no row spells anything: the
texture is pseudo-script, never readable text. An early pass had glyphs that
read as Latin lookalikes (an H-shaped double vertical, a t-like stem, a
w-like zigzag); those were redesigned into brackets, diagonals-with-dots,
chevrons, and dot rows before shipping.

## The bars and the drawings

- Bars: 4, parallel diagonals, lengths 78–86% of frame width, thickness
  7–8.5% of frame height, centered horizontally, staggered at 18/38/58/78%
  of frame height. Parallel (not crossing): the first pass used mixed angles
  and the bars crossed into an X on wide fields.
- Drawings (one seeded line system per bar, seed = bar index via
  mulberry32(1356000 + bar × 7919)):
  - Bar 0: branching system from a left root.
  - Bar 1: spiral of arc segments.
  - Bar 2: five contour waves.
  - Bar 3: jittered lattice with diagonals.
  Drawings live in bar-local coordinates and are drawn before their bar, so
  the bar covers exactly the portion still hidden. A stroke whose midpoint
  lies under the bar is drawn with alpha = 1 − (that segment's bar alpha),
  so the drawing completes itself precisely where the bar erodes.

## Interaction: drag to wipe, bars re-blacken

Drag across a bar to wipe it: pointer events are interpolated along the drag
path (8 px steps), and every bar segment within ~31 px of the path is wiped
at that piece time. Each bar is 56 segments; each segment's alpha is a
closed-form function of piece time and its last wipe time:

- Never wiped: alpha 1 (fully black).
- Wiped: alpha 0 until ~60 s after the wipe, then ramping back over 8 s.
- Recovery delay grows from 60 s at the bar's ends to 75 s at its center,
  so the black visibly creeps inward from both ends — "re-blacken from the
  edges."

Nothing is stored per frame; wipe times are the only state, and every render
is a pure function of piece time plus that event list.

## Adaptations (QA renderer limits)

- No offscreen canvas, no mask buffers: reveal is per-segment bar alpha on
  the main canvas; the drawing underneath is drawn with complementary alpha.
- No gradients, no shadowBlur, no Path2D, no createElement, no AudioContext
  (silent piece), no WebGL. Paper tone is flat-alpha ellipses; all shading
  is layered flat alpha.
- No camera, no microphone, no real text anywhere on screen except `<title>`.
  The study's redaction source is referenced here in process.md only; the
  piece itself contains no such wording and no stamp wording.

## House rules

- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height
  in px.
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect h > w × 1.15 as fallback; field-like composition goes
  full-bleed on phones; checked at 390 wide.
- Determinism: frame one = draw(0) via a boot flag, synchronous at load;
  the clock starts only with the rAF loop (plain function declaration behind
  a typeof guard). All randomness from seeded mulberry32 streams, never
  Math.random. A named function expression followed by requestAnimationFrame
  is avoided (it throws ReferenceError in real browsers).

## Verification

- Rendered with node-canvas at 1280×900, 390×844, and 720×720; all three
  inspected. Thumb byte-identical across repeated renders.
- Probe harness (same shims as render-piece.js, captured rAF callback driven
  by hand, pointer events dispatched to the piece's own listeners):
  - Frame one: 292,219 near-black pixels (four solid bars).
  - After a drag along bar 1's center line, t = 1 s: 226,307 black pixels
    (delta 65,912 ≈ the wiped bar's area); the spiral drawing underneath
    shows complete, with the bar's unwiped end stubs still black.
  - t = 70 s: 238,868 black pixels — partial recovery (ends back, center
    still wiped, per the 60 s / 75 s edge-to-center delays).
  - t = 95 s: 292,219 black pixels, byte-identical to frame one — the full
    uncover/re-blacken cycle closes exactly.
- Token scan clean: no Math.random, createElement, AudioContext,
  getUserMedia, Path2D, offscreen canvas, or gradients. No forbidden wording
  in the piece file.

## Fix rounds

1. Bars re-angled to parallel −14° diagonals after the first render showed
   mixed-angle bars crossing into an X on wide fields.
2. Glyph set redesigned after the first render's marks read as Latin
   lookalikes (H, t, w shapes replaced with brackets, diagonals-with-dots,
   chevrons, dot rows).
3. Under-bar drawing vertical ranges tightened (contours ±1.6 → ±0.8 bar
   thicknesses, lattice ±1.5 → ±0.85) so emerged fragments stay in the gaps
   between bars instead of colliding with neighbours.
