# No.771 Electric Light

EXPANSION #94 mary-corse, prompt block 4 "Electric Light". After Corse's
Tesla-coil lightboxes of 1968 (Untitled (Electric Light), 1968/2018): a
luminous white slab floating in a dark room, glowing with a spectral,
sourceless light.

## Concept

A portrait-format white slab hangs in a near-black room, suspended by
monofilament threads so fine they are barely visible. Nothing lights
it; it is lit. The slab is brightest at its center and falls to gray
at the edges. Behind it a soft halo bleeds onto the wall. The piece is
watch-only in spirit: the slab breathes slowly and carries a faint
mains shimmer, like a Tesla coil rather than a clean oscillator. The
room stays dark; the light moves, the object does not. Dragging
vertically dims or brightens the slab directly.

## Construction

- Single canvas, palette only: room #141416, slab core #FBFBF7, slab
  edge #CFCFC8, halo #E8E8E2, floor #1A1A1C. No color tint on the
  white, no neon, no bloom.
- Slab: nine layered inset rects stepping from the edge tone to the
  core color (the house no-gradient rule: the falloff is built from
  flat stepped bands), plus four low-alpha core ellipses at the center
  so the heart of the slab is hottest. Slab width is 40% of the frame
  (55% on portrait phones), height 1.42x width, capped at 78% of the
  frame height; centered at 0.47 of the height.
- Halo: twenty-six layered alpha ellipses of the halo tone behind
  the slab, alpha falling with radius, extent roughly a quarter of
  the frame beyond the slab; halo alpha scales with slab intensity.
- Threads: three 1 px vertical lines at 6% alpha from the slab's top
  edge to the top of the frame.
- Floor: a floor-tone band from 0.865 of the height down, with a 5%
  alpha halo-tone hairline at the junction.
- Breath and flicker model: intensity(t) = breath(t) x
  (1 + 0.02 x walk(t)) + dragOffset(t), clamped to [0.5, 1]. breath is
  a 45 s sine easing between 0.85 and 1.0, at mid-intensity (0.925) at
  t = 0. walk is a fixed table of 194 samples over a 97 s loop: a
  seeded (mulberry32) random walk with a pull toward zero, smoothed by
  a wrap-around moving average so the loop closes seamlessly, read
  back with smoothstep interpolation. Fast, tiny, irregular, never a
  clean sine, and fully deterministic.
- Intensity rendering: the scene is drawn at full brightness, then the
  room color is laid over the whole canvas at alpha (1 - intensity) x
  0.72, so dimming pulls the slab and halo toward the room tone
  together.
- Interaction: vertical drag sets a brightness offset (up brightens,
  down dims, clamped); on release the offset decays exponentially
  (1.2 s time constant) in closed form from the recorded release time
  and value. No click-to-reload.
- Frame one is the synchronous draw at t = 0: breath mid-intensity,
  walk at its table start. The animation loop is anchored at its first
  rAF timestamp and typeof-guarded; no Date.now and no runtime
  Math.random anywhere. Canvas sizes from the Visual Viewport API
  with resize listeners on both visualViewport and window, and the
  canvas CSS size is pinned in px inside draw().

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), and 720x720 (thumb.png).
- thumb.png rendered twice and cmp-compared byte-identical; the
  duplicate was deleted.
- Read-backs: a glowing white portrait slab centered in the dark room,
  halo bleeding onto the wall behind it, threads nearly invisible,
  floor line faint near the bottom; on mobile the slab keeps its
  portrait proportion and nothing is clipped.

## Deviations

- The prompt's vertical center-hot gradient and radial halo gradient
  are built from layered flat bands and layered alpha ellipses per
  the house no-gradient rule; the read (bright center, gray edges,
  soft halo falloff) is unchanged.
- The prompt's smoothed random-walk flicker is realized as a seeded,
  precomputed, looped walk table rather than a live random walk, so
  frame one is reproducible for the determinism gate. Amplitude and
  character (fast, tiny, irregular, +/-2%) match the prompt.
