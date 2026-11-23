# No.526 "Two Riders" (EXPANSION #63 giulia-conoscenti, GC6)

## Concept

Her twin-archway device: two tall rounded archways side by side on a pink
marble frame, a shared center mullion between them. The left arch is day
(mint sky, big pink sun, a rider on a yellow horse); the right arch is
night (black sky, white crescent moon, a rider on a pink horse). The two
panels mirror each other in structure: same arch geometry, same orbit
center and radius, horses at matching positions facing each other across
the mullion. Spiky black and yellow plants sit along the frame base.
Watch-only: a seamless day-night cycle loop.

## Construction

- Single self-contained index.html, canvas 2D, 1080-unit square stage
  scaled to min(viewport) and centered; page ground is the marble pink.
- Palette exactly as specced, flat fills only: sun #FF3EB5, day sky
  #5FE0B0, night #0A0A0A, moon #FFFFFF, yellow horse #F5D020, pink horse
  #F27BB5, frame #C13B8E, plants #111111 and #FFD400. No gradients
  anywhere; the only translucency is the marble swirls, the arch
  outline, and the grain, all within the palette family.
- Frame: the stage fills with #C13B8E, then 46 seeded translucent swirl
  arcs (white and a darker pink) are stroked over it; the two arch
  panels are painted on top, so the marble reads on the frame only.
- Arches as clip paths: vertical sides plus a semicircular top, shared
  mullion between x 496 and 584. Inside each arch, sky fill, then a
  floor band in the frame colour at the base of the panel.
- One phase variable drives the cycle (26s): the sun rides a circular
  orbit in the left arch; the moon rides the mirrored orbit in the
  right arch at the opposite height, so the sun sinks while the moon
  rises and then they reverse, crossing at mid height. Night stars
  (seeded) twinkle inside the right arch clip.
- Horses and riders are flat glyphs (ellipse body, polygon neck,
  rotated ellipse head, rect legs, stroked tail): the left pair is
  drawn facing right, the right pair is the same drawing mirrored with
  ctx.scale(-1, 1), so the poses match exactly. Tails sway on a sine,
  opposite phases. Riders use a colour swap: each rider is drawn in the
  opposite horse's colour and wears a pointed cap in its own horse's
  colour.
- Plants: seven seeded-position spiky tufts (triangle fans) alternating
  black and yellow along the sill.
- Grain: a precomputed seeded array of 560 sparse short strokes in
  palette colours at low alpha, drawn directly each frame (house
  adaptation; the QA renderer has no offscreen canvas).
- Sizing from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas CSS size pinned in px inside draw()
  every frame. Seeded RNG (mulberry32, seed 526063).

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), and 720x720 (thumb.png); all three read back and
  inspected.
- Desktop/thumb: twin arches in the marbled pink frame; pink sun high
  in the day arch and the crescent low in the night arch on the
  mirrored orbit; yellow horse with pink rider at left facing the
  mullion, pink horse with yellow rider at right facing back; plants
  alternating along the base. Mobile: the square stage letterboxes
  centered on the marble-pink ground, composition keeps its shape,
  nothing clipped.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical; the second render was deleted. Frame one is the
  synchronous draw at the constant PHASE0 = 3.0s (sun high right in
  the day arch, moon low left in the night arch); the animation loop
  is anchored as PHASE0 + elapsed since load, rAF typeof-guarded, and
  no clock value feeds frame one.

## Deviations

- Rider colours are not named in the prompt palette. Resolved inside
  the palette with a mirrored swap (each rider in the other horse's
  colour, cap in its own horse's colour) so both riders stay legible
  against their mounts and the mirror symmetry holds.
- The prompt says sun and moon sit "at matching heights" and also that
  the sun sinks while the moon rises. Implemented as mirrored circular
  orbits with the same center height and radius in both panels and
  opposite heights at any moment: the structure (orbit geometry,
  panel layout) stays mirrored, and the bodies cross at matching mid
  height twice per cycle.
- A floor band in the frame colour closes the base of each arch panel;
  the prompt leaves the panel floor unspecified and the band keeps the
  horses grounded on the frame rather than floating on sky.
- No phone-detection branch: the composition is a centered square on a
  page ground identical to the frame colour, so the phone layout is
  the same drawing (the same call made for No.521 in this study); the
  390-wide render was still QA-checked.
