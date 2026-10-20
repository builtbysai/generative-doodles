# No.377 Night Sky Toss

## Concept

After Jen K's (jenkbdoodles) Undersea Night Sky: her
celestial icon grammar as a dense non-directional toss on
deep navy, three scale bands with near-zero negative space.
Gold crescent moons and whales in the large band; moths,
all-seeing eyes and tiny houses in purple, teal and pink in
the mid band; gold stars and cream-outlined crystals
filling the micro band. Everything flat, no shading, the
gold stars twinkling while the whole field drifts on tiny
sine paths. Drag stirs the field in a swirl and every icon
springs home.

## Construction

- One canvas, design space 1280x900, cover-fit full-bleed
  field. Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned every frame via
  style width/height in px; phone detection via
  window.screen min dimension < 700px with aspect fallback.
- Palette is exactly six flat colours: ground #14213D,
  gold #E8C547, purple #B565A7, teal #5BA3C4, pink #D96A8B,
  cream #F3EBDD. Palette audited in the file: no other
  hexes, no gradients, no shadowBlur, no em dashes.
- Exactly 240 icons, asserted at load along with the band
  counts: 24 large (12 moons, 12 whales), 72 mid (24 moths,
  24 eyes, 24 houses), 144 micro (72 stars, 72 crystals).
  Placement is a seeded jittered grid per band (mulberry32,
  fixed seed), types dealt round-robin from a seeded
  shuffle so per-type counts stay exact, anchors bleeding
  50px past the design edges so the toss never opens a gap.
- The prompt's offscreen sprite pre-render is forbidden by
  house rule, so each motif is a small path recipe drawn
  directly every frame on the one canvas: crescent from two
  arcs with exactly computed intersection angles; star as a
  ten-point polygon; eye as a cream-stroked almond with a
  band-colour pupil and cream centre dot; moth as four wing
  ellipses, body and curved antennae; crystal as a cream
  diamond outline with three facet lines; whale as a bezier
  body with horizontal notched fluke, pectoral fin, eye dot,
  smile line and three spout droplets; house as chimney,
  body, triangle roof, cream door and windows.
- Motion: one seamless 45s master loop. Each icon drifts
  on a tiny sine path (amplitudes 3-11px) whose x and y
  cycle counts are whole numbers (1-3) per loop, so frame
  45s is pixel-identical to frame 0 at rest. Gold-star
  twinkle runs at 9 or 15 whole cycles per loop (periods
  5s and 3s, whole divisors of 45), alpha 0.6-1.0.
- Determinism: frame one is drawn synchronously at the
  constant phase T = 17.3s (field complete, drift and
  twinkle mid-cycle), and the rAF loop (typeof-guarded,
  fixed 1/60 ticks) is anchored at that constant plus
  elapsed time. No wall-clock phase anywhere.
- Interaction: drag is a stir, not a pan. Pointerdown gives
  a gentle impulse and pointermove a full one: icons within
  170 design px of the pointer take a tangential swirl
  velocity plus a slight outward push, speed capped. While
  the clock ticks, a damped spring (k 30, damping 7.5) pulls
  each stir offset home, with a dead-zone snap to exactly
  zero, so the settled field is the authored field bit for
  bit. Pointer coords convert via the stored cover
  transform S, OX, OY. Taps do nothing; no click-to-reload,
  no text, no UI, no offscreen canvas.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and
  720x720 (thumb.png); all three inspected.
- Thumb rendered twice from the shipped script:
  byte-identical.
- Desktop: dense celestial toss edge to edge, true
  crescents, eyes and crystals reading cleanly in cream,
  houses and moths in the three secondary colours, stars
  caught at varied twinkle opacity. Thumb: all seven
  motifs legible at gallery size. Mobile: cover-fit crop,
  ground continuous to every edge, icons large.
- Fix during QA: the first whale read as a fish (symmetric
  body, forked vertical tail). The recipe was rebuilt with
  a deeper rounded head, higher back arch, flatter belly, a
  wide horizontal fluke with a centre notch, a smile line
  and three spout droplets; it now reads whale at desktop
  and thumb size. All renders redone after the fix and the
  thumb re-verified byte-identical.
- Asserts verified in the render run: 240 icons, band
  counts 24 / 72 / 144 (the script throws otherwise, and
  all three renders completed).
