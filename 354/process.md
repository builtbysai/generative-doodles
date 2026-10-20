# No.354 Neon Midnight Garden

## Concept

After Suchita Prakash's "Neon midnight garden" (2026-01-01,
Craft Maximalist challenge entry: pink on black). Dense flat
neon florals, dahlias, sunflowers and moths, packed maximalist
over a near-black ground in three inks only, zero shading. The
garden is not still: every bloom opens and closes in a wave
that travels across the field, and a dragged finger pushes the
blooms aside; they lean away and spring back.

## Construction

- Exactly 67 blooms, held as one literal seed table in the
  script: [x, y, kind, scaleClass, petals, curl, radius, ink].
  The table was generated offline from a fixed seed and pasted
  in as data; nothing is randomised at runtime and there is no
  Math.random anywhere in the file.
- Exactly 3 scales, asserted in code: 5 heroes, 14 secondary,
  48 filler sprigs. Kinds: 9 dahlias, 6 sunflowers, 14 moths,
  38 sprigs, all asserted present, with petal counts asserted
  inside their seed ranges (dahlias 9-14, sunflowers 11-15,
  sprigs 5-6) and curl asserted within +/-0.8.
- Palette is closed: ground #0D0D12 and three inks, hot pink
  #FF2E88, light pink #FF6EC7, violet #B537F2. Each bloom draws
  in its table ink, with the second and third inks taken in
  rotation for inner rings, discs and hearts. Flat colour
  only: no gradients, no shadowBlur, no glow filters, one
  canvas, no offscreen elements.
- Motifs are parametric path data. A dahlia is an outer petal
  ring plus a shorter inner ring and a heart dot; a sunflower
  is one ring of long narrow petals around a flat disc with a
  ring of dots; a sprig is one small wide-petal ring; a moth is
  two wing blobs per side, an ellipse body and stroked
  antennae. Draw order is fillers first, secondary next,
  heroes on top, so the packing layers like a printed field.
- The wave: a bloom's aperture is a pure function of its grid
  position and loop time, 0.5 + 0.5 * sin of the master cycle
  minus (x * 0.0045 + y * 0.0031), so the open/close wave
  travels diagonally across the field. Aperture drives petal
  radius (closed blooms pull in to 0.45) and curl (closed
  blooms curl harder); moth wings ride the same wave as a flap
  angle. The master loop is 18 seconds and every bloom
  completes whole cycles inside it, so frame 18s is
  pixel-identical to frame 0.
- Drag: pointer position is converted to design coords
  through the stored cover transform (S, OX, OY). While
  dragging, each bloom within 280 design px leans away from
  the pointer, up to 30px, with a slight rotation; per tick
  the lean springs toward its target at 0.16, and once the
  pointer is released the lean snaps to exact zero below a
  small threshold, so no lean residue ever breaks the seam.
  Drag changes lean state only; nothing reloads.
- Determinism: the first frame is drawn synchronously at the
  constant phase T = 6.3 seconds into the loop, waves
  mid-travel and blooms at mixed apertures. The animation
  advances from that anchor in fixed 1/60 ticks (accumulator,
  capped), never Date.now() minus an offset. rAF is
  typeof-guarded.
- House rules: Visual Viewport sizing with resize listeners
  on visualViewport and window; canvas pinned every frame
  via style width/height in px; phone detection via
  window.screen min dimension under 700px with aspect
  fallback (h > w*1.15); full-bleed cover-fit over the
  1280x900 design space; fixed seeds throughout; no text,
  no labels, no UI chrome.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png) and 720x720 (thumb.png), and
  inspected all three.
- Desktop: the full field reads at once. Layered dahlias
  (outer ring, inner ring, heart), sunflowers with dotted
  discs, moths at hero-adjacent, secondary and filler sizes,
  sprigs filling the gaps. Apertures are visibly mixed across
  the frame at T = 6.3, some blooms wide open, some pulled
  tight, the wave mid-travel as specced.
- Thumb (720x720 cover crop): centre of the field with two
  hero dahlias at the corners, sunflowers, moths and a violet
  secondary dahlia; the neon-on-black garden reads at gallery
  size.
- Mobile (390x844): full-bleed centre slice, sunflower and
  moths large and legible, ground consistent to the edges,
  no letterboxing.
- Determinism: thumb.png rendered twice, byte-identical
  (same md5 f3a3d363...). The first frame is a developed,
  mid-wave field, not a blank or starting state.
- Palette audit: the only colours the script can produce are
  the ground and the three inks; every fill and stroke in the
  file references INKS or GROUND.
- Scans: no em dashes, no absolute URLs, no Math.random, no
  createElement, no shadowBlur, no gradient calls in the
  file.
- Deviations: none from the spec or its adaptation flag.
