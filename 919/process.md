# No.919 "Atlantis" — process

Study #112 duncan_geere, PP80 "The Three Rings".

## Concept

Plato's city as a drawn diagram, not an island picture: three concentric land
rings with water moats between them, housing blocks in radial rows on each
ring, four bridges crossing the moats, watchtower dots around the outer rim,
and a small temple at the exact centre. White ink (#F2F0EB) on near-black
(#0B0B0D), nothing else. The mechanism is differential rotation: the rings are
a machine, each turning at its own speed, while the bridges stay fixed and the
city turns under them.

## Construction

- Ring model. Ring centre radii are 0.25 / 0.50 / 0.80 of half the smaller
  viewport dimension, with band half-thicknesses 0.045 / 0.060 / 0.070, so the
  bands land at [0.205, 0.295], [0.44, 0.56] and [0.73, 0.87]; the gaps between
  bands are the moats (bare ground) and the disc inside 0.205 is the temple
  island (boundary circle at 0.16). Rotation periods are 90 s (inner), 180 s
  (middle) and 360 s (outer): the inner ring laps the outer four times over,
  all turning the same way. Initial phases 0 / 2.1 / 4.2 rad so frame one does
  not start in artificial alignment.
- Analytic layers (adaptation). The prompt describes each ring as a canvas
  layer rotated at its own speed. Offscreen canvas is banned in this house, so
  there are no bitmaps at all: housing placement is seeded data (mulberry32,
  seed 91980) computed once at load, and every frame each block's position is
  computed in closed form from its ring's current angle
  (angle = phase + 2πt/period + recorded drag offsets). Blocks sit in 2 / 3 / 3
  radial rows per ring, with seeded size and street gaps, a seeded 16% vacancy
  rate, and a cleared lane within 0.045 rad of each bridge angle so the bridges
  read as crossings. Identical picture, no stored pixels.
- Bridges and temple. Four bridges at 45° diagonals are drawn as fixed radial
  strokes from 0.10 to 0.905 of half, after the housing, so they pass over the
  turning rings. The temple is a fixed glyph at the centre: three nested square
  outlines (steps) around a filled core square.
- Watchtowers. 28 dots ride the outer ring at radius 0.885, rotating with it;
  their alpha breathes on a 30 s cycle with a per-dot phase step, so a gentle
  pulse travels around the rim.
- Signal (tap). A confirmed tap fires a pulse ring from the temple that
  expands to the outer ring's centre radius in 1.9 s and fades by 2.6 s. Each
  ring flashes when the pulse crosses its centre radius: the crossing time is
  analytic (t0 + frac/0.80 × 1.9), and the flash is a thick low-alpha stroke
  over that ring's band decaying over 0.9 s.
- Drag. Dragging adds the pointer's angular delta around the centre to a live
  offset applied equally to all three rings; on release the offset is committed
  and the rings resume their own speeds from the new angles. Angle state is
  therefore base(t) plus recorded offsets only.
- Double-tap. Inverts the palette (ink #111111 on paper #FAFAF8) for exactly
  8 s, closed-form over the recorded event. Tap/double-tap disambiguation uses
  a 0.38 s window: a single tap's signal is registered after the window; a
  second tap inside it converts the gesture to an inversion and cancels the
  pending signal.
- Sound. All audio is created lazily inside the first pointer gesture and is
  typeof-guarded; the piece is fully visual in silence. A 46 Hz sine breathes
  under a 0.1 Hz gain LFO (the city's slow pulse). Each pulse/ring crossing
  rings one bell (740 / 587 / 440 Hz for inner/middle/outer, sine plus a quiet
  2.76× partial, 1.9 s decay), fired from the animation loop when the piece
  clock passes the analytic crossing time. Dragging drives a band-passed noise
  whir whose gain follows angular drag speed and decays on release.
- House rules. Canvas sized from the Visual Viewport API with resize listeners
  on both visualViewport and window; canvas style width/height pinned in px
  inside draw(); phone detection from window.screen (min dimension < 700) with
  the h > w×1.15 aspect fallback; plan centred on the smaller dimension with
  margin. No gradients, no shadowBlur, no ctx.filter, no offscreen canvas, no
  microphone, no visible text beyond the title.

## QA log

- Renders produced with the house renderer at 1280×900 (qa-desktop.png),
  390×844 (qa-mobile.png) and 720×720 (thumb.png), in silence (no
  AudioContext, no requestAnimationFrame in the harness; frame one is the
  synchronous draw at t=0).
- Determinism: frame one never reads the wall clock. The animation clock is
  elapsed time since load; draw(0) is called synchronously before the first
  rAF. thumb.png rendered twice and byte-compared with cmp: identical; the
  duplicate was deleted.
- Visual read-back: black field; three concentric inked rings with rows of
  small housing blocks; open ground moats between the rings; four fixed
  diagonal bridges crossing the whole plan; watchtower dots around the outer
  rim; the square temple glyph at the exact centre; nothing clipped on the
  mobile frame.

## Deviations

- Ring layers are analytic rather than offscreen-canvas layers (house ban on
  offscreen canvas). Same image, same differential rotation; recorded here per
  the brief's own instruction.
- A single tap's signal fires after the 0.38 s double-tap window rather than
  instantly, so a double-tap never also fires a pulse. Standard house
  disambiguation cost, invisible in normal use.
