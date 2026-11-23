# No.798 "The Ocean Answer" — EXPANSION #97 niele-toroni, PP7

## Concept

Toroni, asked why he repeats the same imprint forever, answered: "You can
look at the ocean everyday, but it is never the same sea." The piece takes
him literally. One cobalt imprint field on warm white is shown in twelve
successive takes. The layout never changes — the same 4x4 brick-offset
lattice of No. 50 brush imprints at the fixed interval, exactly as in
No.792 "Thirty Centimeters". What changes from take to take is only the
hand: pressure, rotation, paint load, bristle pattern. Twelve takes of
four seconds each fill a seamless 48 s loop, joined by hard cuts, like
turning pages. The viewer hunts for differences that are everywhere and
nowhere structural. A tiny counter in the bottom-right corner (01/12 to
12/12) is the only text besides the title; the prompt sanctions it
explicitly, and it earns its place — without it, the cuts could be
mistaken for a frozen frame.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets.
  Palette is strict: ground #EDEAE2, imprint deep blue #1F4E8C. The
  counter is the same blue at alpha 0.55.
- The lattice is computed once per frame from frame size alone and is
  byte-for-byte identical for every take: pitch = min(W, H) / 5.4, dab =
  half a pitch, even rows offset (c − 1.75) pitches, odd rows (c − 1.25),
  so the 4x4 field's bounding box centers on the frame.
- Twelve variants are precomputed at load from twelve mulberry32 streams
  (seeds 798001 + v·7919). Each variant holds sixteen imprints built by
  the shared dab construction (banded solid body, dense top, dry
  lift-off bottom; blue bristle ridges and ground-coloured gap scores in
  three drying segments; top-edge load strokes) with its own per-imprint
  rotation (±2°), scale (±5%), alpha (±10%) and streak data, plus one
  per-take pressure, alpha 0.75–1.0, applied as a global multiplier.
- Take selection is a pure function of loop time:
  `take = floor(((t mod 48) + 48) mod 48 / 4)`. There is no fade, morph,
  or press animation anywhere: at each 4 s boundary the whole field is
  replaced in one frame. The counter text is redrawn from the same take
  index, so it changes only at the cuts.
- Frame one is the synchronous draw at t = 0: take 01 at full
  presentation, counter 01/12. The animation is anchored at load
  (elapsed-since-load added to the constant phase), requestAnimationFrame
  typeof-guarded; no wall clock, no Date.now, no runtime randomness.
- Canvas size comes from the Visual Viewport API with resize listeners
  on both visualViewport and window; canvas.style.width/height are
  pinned in px inside draw() every frame. Phone detection uses
  window.screen's physical size (min dimension < 700 px) with the
  h > w·1.15 aspect fallback. No gradients, no shadowBlur, no
  ctx.filter, no offscreen canvas. Watch-only; no interaction, no audio.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js`:
  qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png
  (720x720).
- Determinism: thumb.png rendered twice and compared with `cmp` —
  byte-identical. The duplicate was deleted.
- Read-backs: desktop and thumb show the centered 4x4 brick-offset field
  of solid deep-blue dabs, bristle streaks visible, bottoms drying pale,
  tiny muted "01/12" at bottom-right, nothing else. Mobile shows the same
  field scaled to the narrow frame (pitch follows the smaller dimension,
  as in No.792), counter legible, nothing clipped.
- Take check: a throwaway copy phased to t = 24 s was rendered at
  720x720. It shows take 07: dab centers sit on exactly the same lattice
  as take 01, while pressure is visibly lighter overall and every dab's
  rotation, scale, and streak pattern differs; the counter reads 07/12.
  The throwaway HTML and PNG were deleted after inspection.
- Deviations: none from the prompt. Two notes. (1) The prompt calls the
  transition a "hard cross-fade" and also demands hard cuts only, no
  morphing; the cut reading wins — takes replace each other in a single
  frame, which is also what "like turning pages" describes. (2) Field
  size follows the study's established support (the No.792 lattice:
  4x4, pitch min(W,H)/5.4) rather than inventing a new grid, since this
  piece is explicitly "the same cobalt grid" revisited; the colour is
  this prompt's own deeper blue #1F4E8C on its own ground #EDEAE2.
