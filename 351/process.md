# No.351 Tweed Field (emibeebuzz 7)

## Concept

After Emi Bee's painted "fluffy tweed" and "chunky, puffy
tweed" textures for the Dark Academia collection: a
full-bleed woven field of thousands of short thread
strokes in three yarn colours on near-black, with two
bone motifs, a moth and a crescent moon, drifting
half-buried in the weave while a slow sheen band travels
across the cloth. Watch-only; the weaving is the piece.

## Construction

- Palette, flat only: ground #12100D; yarns #6B5B4C,
  #8C7B66, #A89B82; motifs bone #E8DCC8. Nothing else.
- Threads are JS data, never an offscreen layer (the
  prompt's offscreen technique yields to the house
  one-canvas rule): 4,836 short strokes on a jittered
  grid, each with its angle, length, centre and yarn
  index precomputed from a fixed seed table at load and
  stroked directly every frame, batched by yarn colour.
- Woven row structure is explicit: even rows run warp
  (near-horizontal), odd rows run weft (near-vertical),
  each thread's angle jittered a fixed amount from its
  row's base direction, so the field reads as cloth
  rows, not static noise.
- Exactly TWO motifs, asserted in code: a moth
  upper-left (swept forewings, rounded hindwings, slim
  body, antennae, all parametric paths) and a crescent
  moon lower-right (a bone disc carved by a ground disc).
  Half-buried is literal: every fourth row's threads in
  an outer band around each motif are woven back over
  it, while a clear core keeps the moth's silhouette
  whole.
- Motion is one 32-second seamless master loop. The
  sheen crosses the frame once per loop, fully off-frame
  at both ends of the cycle; it is layered translucency
  only, three stepped flat-alpha bands of the palette
  bone colour, never a gradient. Both motifs ride
  sinusoids with a whole number of cycles per loop
  (one cycle each axis; the moth's wing spread breathes
  on two cycles), so frame 32s is pixel-identical to
  frame 0.
- Determinism: frame one is drawn synchronously at the
  constant phase T_OFFSET = 11s (sheen mid-travel, both
  motifs mid-drift); the typeof-guarded rAF loop anchors
  at that offset plus elapsed time since load. Frame one
  is never drawn from Date.now() minus an offset.
- House rules: Visual Viewport sizing with resize
  listeners on visualViewport and window; canvas pinned
  every frame via style width and height in px; phone
  detection via window.screen min dimension under 700px
  with aspect fallback; design space 1280x900, cover-fit
  full-bleed on every screen with page ground in the
  piece's own near-black; one canvas, no shadowBlur, no
  filters, no gradients; fixed seeds; no text or UI.

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png). Thumb rendered twice: byte-identical,
  so the shipped thumbnail reproduces exactly from the
  shipped script.
- Desktop: the weave reads as chunky tweed with clear
  warp/weft row structure in all three yarns; the sheen
  band is a visible diagonal wash mid-travel; the moth
  reads at once (forewings, hindwings, antennae) with
  threads crossing its edges; the crescent moon sits
  lower-right with a thread woven through it.
- First pass fixes, all re-rendered and re-inspected:
  the first sheen (alphas 0.045/0.05/0.06) was nearly
  invisible over the mid-tone yarns, raised to stepped
  0.07/0.09/0.13; the first moth was built from rotated
  ellipses and read as a striped blob under every second
  row of overdraw, so it was re-authored as swept path
  wings at 1.3x scale, the overdraw thinned to every
  fourth row, and a clear-core rule added so the weave
  crosses only each motif's outer band.
- Mobile: cover-fit fills the phone frame with an
  undistorted weave crop and the sheen band's edge; the
  two motifs sit outside the central portrait crop at
  frame one, which is the expected behaviour for a
  full-bleed field composition (they are placed
  upper-left and lower-right in the 1280x900 design
  space and both read in the desktop and thumb renders).
- Assertions pass at load: thread count in the
  thousands (4,836) and exactly two motifs.
