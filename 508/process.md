# No.508 "Microshift Strips" (EXPANSION #61 alice-piaggio, prompt AP4)

## Concept

Alice Piaggio's WSJ "Microshifting" strip system as a watch-only loop: a
fragmented workday sliced into vertical strips, each holding one small
vignette that does its own micro-motion on its own phase. The shipped
frame rolls 7 strips with grounds running yellow, acid green, yellow,
white, near-black, acid green, yellow. The vignettes, left to right: a
kid holding a big clock (minute hand spinning), a desk lamp swaying over
its light cone, a child bobbing in a high chair, the office worker in
blue line-work on white (always the center strip, laptop cursor
blinking), a coffee cup with rising steam, two hands pressing a pizza
dough, and a dog walker whose dog's tail wags. Every 12 seconds two
strips trade vignettes in a quick vertical slide. Double-tap reseeds:
new strip count, new glyph order, new ground sequence.

## Construction

- Single self-contained index.html, 2D canvas only, no external assets.
  Design space 800x1000 (4:5 portrait logic), letterboxed to keep its
  shape on any screen; page ground is white.
- Layout is fully seeded (mulberry32, seed 508004): strip count, ground
  sequence (neighbours never equal, center always white, at most the 4
  specced ground colors), glyph order, grain, and a precomputed table
  of 96 swap pairs, so the glyph assignment at any time t is a pure
  function of t.
- Strips are flat rects, full bleed inside the design frame. Each glyph
  is a small shape function drawn in local units (100 = strip width),
  centered in its strip, clipped to the strip rect so nothing ever
  crosses a boundary. Per-ground palettes keep every glyph legible on
  green, near-black, white, and yellow.
- Micro-motions are all phase-shifted functions of t: clock minute hand
  (one revolution per 6s), lamp sway, chair bob, steam rise with wrap
  and fade, dough press with matching hand travel, tail wag, cursor
  blink. The swap animation eases both glyphs a full design height over
  0.4s, clipped per strip.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas style pinned in px
  inside draw(); phone detection via window.screen (min dimension
  below 700px) with the h > w*1.15 aspect fallback; no audio, no
  microphone.

## Deviations

- Grain: the prompt's grain overlay is usually a pre-rendered grain
  canvas, but the QA renderer has no document.createElement and no
  offscreen canvas. Adaptation: the grain is a precomputed seeded speck
  array per strip, drawn directly each frame. Same static texture, no
  offscreen surface.
- Swap mechanics: a swap exchanges the vignettes of two strips (both
  slide vertically at once, clipped to their strips) rather than
  bringing in an off-screen glyph. With 7 strips all six canonical
  non-worker vignettes are already on screen, so an exchange is what
  "one strip's vignette swaps to another glyph from the set" can mean
  without duplicating a glyph.
- One extra pool vignette, a potted sprout, exists only so an 8-strip
  reseed (7 non-center slots) has enough glyphs; it never appears in
  the shipped layout.
- Strip count: the initial layout rolls 6-7 strips (this seed: 7);
  reseeds roll the prompt's full 6-8 range.

## QA log

- Determinism: first frame is drawn synchronously at the constant
  phase PHASE0 = 3.7s (mid micro-motion for every glyph, no swap in
  flight); the rAF loop is typeof-guarded and anchored as PHASE0 plus
  elapsed time; frame one never reads Date.now. thumb.png rendered
  twice and cmp byte-compared: identical. Re-verified after the fix
  pass below: identical again. Duplicate renders deleted.
- Desktop render (1280x900): 7 full-bleed vertical strips, alternating
  grounds, one bold glyph centered per strip, the center strip clearly
  blue line-work on white, subtle seeded grain in every strip.
- Thumb render (720x720): same read at gallery size; every glyph still
  legible, worker strip unmistakable.
- Mobile render (390x844): the 4:5 composition keeps its shape,
  centered on the white page ground; all glyphs in frame, nothing
  clipped.
- Fix pass: in the first renders the dog's head and snout were clipped
  by the last strip's right edge and the lamp's light cone was cut at
  its strip boundary. The dog-walker group was recomposed narrower
  (walker shifted left, dog rescaled around x 9..49 of the 100-unit
  local frame) and the cone's fly corner pulled in from x 54 to x 48.
  Re-rendered all three sizes and re-ran the byte-compare: pass.
