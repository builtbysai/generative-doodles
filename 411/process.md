# №1312 "Three Windows" — process notes

## Source
Leslie Hewitt, LH1 (PP479). Riffs on Real Time (2002–2009): snapshot / worn
document / floor, staged top-down as if physically on a floor, never digitally
composited. One deliberate hack only: the snapshot's corner lifts and curls.

## Composition
- Square field. Layer 3 (ground): shellac floorboards (#6E4426) filling the
  field, with seeded grain polylines, knots, plank seams, and two flat-alpha
  sheen bands.
- Layer 2 (document): worn magazine page (#D8CDB8), central 70% of the field,
  rotated +4 degrees. Folded corner top-left, jagged torn right edge, ink
  scrawl polylines (abstract, never letterforms), and one headline band of
  abstract dash marks half-obscured by an ink blotch — no readable words.
- Layer 1 (snapshot): side 0.52 of the field, i.e. 28% of field area, rotated
  −7 degrees from the document (−3 degrees absolute), offset slightly within
  the document. White border (#F0EBDD), faded image of soft blobs only:
  coral and denim blobs on a sage ground, a pale arc of pearl dots, an
  abstract dark grill grid, and a faded wash. No faces, no real photo.
- Curl hack, top-right corner of the snapshot only: a lifted flap in lighter
  paper with its own cast shadow and a highlight streak, breaking the plane.

## Motion (watch-only, 90 s loop)
- A soft raking light band sweeps across the stack once per loop (first 75 s,
  then holds); the layered drop shadows shift direction with the light.
- The curled corner flutters once mid-loop (seconds 30–38, decaying sine),
  then settles. Nothing else moves: a slow read.

## Determinism
- Frame one is exactly draw(0) via a boot flag; the clock starts only with
  the rAF loop. Loop details (grain, knots, scrawls, flecks) come from a
  seeded mulberry32 stream (seed 1312000 + loop × 7919), never Math.random.

## House-rule compliance
- Visual Viewport sizing with listeners on visualViewport and window; canvas
  pinned in draw() via style width/height in px.
- Centered square composition: page ground is the piece's own grain-dark
  (#4A2C17); full-bleed floor inside the square. Checked at 390 wide.
- No requestAnimationFrame unguarded (plain function declaration behind a
  typeof guard), no AudioContext, no document.createElement, no WebGL, no
  offscreen canvas, no ctx.filter, no shadowBlur, no gradients. Shadows and
  sheen are layered flat-alpha shapes. Dots use one subpath each with a
  moveTo before every arc.
- No visible text except <title>. No audio, no microphone use.

## QA
- Rendered with node-canvas at 1280×900 desktop, 390×844 mobile, 720×720
  thumb; all three inspected. Desktop and mobile both read as the staged
  stack: floor, rotated document, snapshot with curled top-right corner.
- Thumb rendered three times at 720×720, cmp byte-identical, and re-verified
  against the finished index.html.
- No fix rounds required; first renders at all three sizes read correctly.

## Files
- index.html (md5 413bfc314ad436b9ed33bf754868e7b3)
- thumb.png (720×720)
