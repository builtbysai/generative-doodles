# No.650 "Piedra de Cascada" — EXPANSION #79 francisco-gazitua, block 2

## Concept

Gazitúa's "Piedra de Cascada" and the Oráculo stone font: one granite
slab, permanent mass, negotiated by flowing water. A stream pours from
a fixed source at top-center, finds the channel carved through the
stone, runs down it, and drops into a pool basin at bottom-center.
Dragging on the stone is a chisel: it carves new channels and the water
reroutes through them in real time. Nothing else is in the frame: no
second stone, no text, no decoration.

Palette (strict): ground #0A0A0B, stone #8A8A8C, fresh cut #C9C9CC,
water #7FB3C8, pool #0E2A33. One derived shade: aged cuts render in
#55555A, the stone tone at reduced brightness (the groove the water
has worn smooth), as sanctioned by the brief.

## Construction

- Slab: a rounded-rect mass (middle of the frame, wider fraction on
  phones) whose outline is ray-marched from a signed-distance field
  with seeded sine noise on the edge, so the silhouette is hand-cut,
  not machined. The same SDF decides which grid cells are stone.
- Carve grid: cells of 4–9 px (slab width / 68, so about 6 px at
  typical sizes) over the slab plus a small margin. Each cell holds a
  carve depth (0–1) and the sim time of its last cut. Stamps are
  cosine-profile discs; the initial channel is one winding groove
  stamped along a seeded centerline from the top-center mouth (wander
  tapered to zero at the mouth so the stream lands exactly in it) down
  through the slab and out its lower edge, stamped aged.
- Fresh vs aged: a cut cell renders bright #C9C9CC, fading over a
  6-second window to the #55555A groove shade deepened by its depth.
  Re-carving an old groove re-brightens it.
- Water: 600 particles, four states (air, channel, top surface, pool).
  Air is plain gravity. In the channel, a particle steers toward a
  target velocity built from the carve-depth gradient weighted by its
  own magnitude (full strength at the groove walls, near zero on the
  flat groove floor), an equal-weight downward pull, and a momentum
  term; it snaps back to the deepest nearby cell if it drifts into
  solid stone. On the slab top it runs along the surface (per-column
  top heights, recomputed after every carve) toward the mouth. In the
  pool it rests on the surface, drifts gently to center, spawns flat
  expanding ripple rings on entry, and recycles to the source after
  its seeded pool life (1.4–3.2 s).
- Chisel: pointer drag stamps the carve disc along the drag segment
  (radius 2.3 cells) and records the current sim time as the cut time;
  water reroutes on the next steps because it reads the same grid.
- Determinism: fixed step DT = 1/60 s, mulberry32 streams only, no
  Date.now anywhere. Frame one is drawn synchronously after a
  pre-simulation of 420 steps (7 s) run at load. The first generation
  is distributed along the journey (about a third placed on the
  channel centerline, a fifth resting in the pool with staggered ages,
  the rest falling from the source) so frame one is a mature flow.
  Carve cut-ages are measured on the sim's own clock. The rAF loop
  (typeof-guarded) continues stepping the same sim in fixed steps.
  An inert ?t=<seconds> hook advances the sim past the pre-sim for
  headless late-state checks.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas style pinned in px
  inside draw(); phone detection via window.screen min dimension
  under 700 px, aspect ratio only as fallback when screen is absent;
  no audio, no microphone, no offscreen canvas, no filters.

## QA log

- Rendered with render-piece.js at 1280x900, 390x844, 720x720.
  thumb.png rendered twice and byte-compared: identical.
- First pass failure (found by instrumenting a debug copy, since the
  renders showed an almost dry stone): the original steering followed
  the unit-normalized depth gradient with only a 0.55 downward bias.
  On the groove's flank at the first bend, the gradient points up-page
  harder than the bias, and every particle jammed into a 0.3 px
  limit cycle at one point (600 of 600 in channel state, none ever
  reaching the pool). Fixed with the magnitude-weighted gradient,
  equal-weight downward pull, and momentum term described above.
- Second pass overcorrected: water rushed through and 81% of
  particles sat in the pool, channel nearly empty. Fixed by the
  distributed first generation, a slower channel target speed
  (about 125 px/s), and shorter pool life. Resulting frame-one
  census (debug copy): desktop air 79 / channel 186 / pool 335,
  channel particles spread across all ten depth bins of the slab;
  mobile air 89 / channel 213 / pool 298.
- Final renders read back: desktop and thumb show the dotted stream
  falling from top-center into the mouth, water running the full
  winding groove, exiting the lower edge, falling to the basin, and
  ripple rings at the landing point; mobile (390x844) shows the same
  with the slab refit wider, nothing clipped.
- Grep-verified: no Date.now, Math.random, createElement,
  AudioContext, external URLs, fillText, or em dashes in the file.

## Deviations

- The groove shade #55555A is used for aged cuts, per the brief's
  explicit allowance; it is a brightness shade of the stone tone, not
  a new hue.
- Pool-resident particles cluster near the landing point (they enter
  there and the center drift is deliberately weak), reading as
  agitated water where the stream lands rather than a uniform sparkle
  across the basin. Accepted as physical.
- The drag chisel cannot be exercised by the headless renderer (no
  pointer events); its code path is the same stamp routine that carves
  the initial channel, which the renders verify.
