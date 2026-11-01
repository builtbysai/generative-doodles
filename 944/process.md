# No.944 "Dreams Without Cuts"

Study #116 refikanadol, PP105 "The Latent Walk".

## Concept

Refik Anadol's core mechanism: the model walks through its conception of a
dataset and the dream never cuts. A black field of particles is advected by a
flow built from four pole states (tight vortex, laminar rivers, radial bloom,
churned storm), and the walk interpolates continuously between them, pole
melting into pole over molten 45-second crossfades. Nothing on screen is ever
labeled; the walk is the label. The absolute rule of the piece is continuity:
pole crossfades, the tap lean and even the double-tap reseed are blends out of
the current state, so every frame is reachable from the previous one by
interpolation.

Interactions follow the same discipline. A tap never jumps: it leans the
weight schedule toward the nearest (currently dominant) pole over 30 seconds.
A drag stirs a local vortex into the field, which settles back over about 20
seconds after release. A double-tap seeds a new dream (four fresh pole fields,
palette colors rotated by one slot) and crossfades into it over 20 seconds
from whatever the field is doing at that moment. Sound, on first gesture
only, is a deep drone (two detuned sines plus filtered noise through a
lowpass) with one harmonic voice per pole whose gain tracks the global pole
weights, so the mix crossfades with the walk.

## Construction

- Engine: fixed-timestep simulation at 120 Hz. At load, exactly 3600 steps
  (30 s of walk) are pre-rolled synchronously; frame one is drawn from that
  state, mid-transition from pole A (magenta) to pole B (cyan). The rAF loop
  (typeof-guarded) advances the same sim in fixed steps, capped at 480 steps
  per frame. No wall clock feeds any drawn state.
- Particles: 3,000 on desktop and thumb sizes, 1,800 on phones (phone =
  window.screen min dimension under 700 px, aspect fallback). Each particle
  keeps a trail buffer of its last 22 positions, recorded every 6 steps
  (20 Hz, about 1.1 s of travel). Trails are drawn fresh each frame as four
  age bands of one polyline with falling alpha (0.05 / 0.09 / 0.15 / 0.23);
  heads are small squares in the particle color lerped 55 percent toward
  near-white #F4F7FF. No canvas-fade trails, no gradients, no shadowBlur,
  no offscreen canvas.
- Fields: each pole is baked onto a 64-wide grid over the frame. The base
  flow is the curl of a two-octave seeded value-noise potential (finite
  differences on a shuffled permutation grid) plus a structural term:
  pole A adds a strong tangential rotation about the centre, pole B a
  horizontal laminar flow with a sine meander, pole C a radial outward flow,
  pole D is pure high-frequency curl (freq 6.8 vs 2.3-3.1 for the others).
  Each pole grid is RMS-normalised to its target speed (A 100, B 92, C 78,
  D 128 px/s at a 900 px min dimension, scaled by min dimension).
- The walk: a 240 s schedule, four 60 s segments (A to B to C to D to A).
  Each segment holds its pole at full weight for 15 s, then crossfades to
  the next over 45 s with a smoothstep. The blend is noise-eased per region:
  a static low-frequency offset grid (plus/minus 24 s) shifts each particle's
  local schedule time by its position, so different regions morph at
  different rates. Particle color is its local weight blend of the four
  pole colors. Weights are refreshed every 6 steps from current positions;
  velocities sample the four pole grids bilinearly with the cached weights.
- Events are recorded against the sim step clock and consumed in step order.
  Stir: while dragging, a vortex centered on the pointer (sigma 130 px,
  strength from drag speed) is added to the field; after release its
  influence decays as exp(-age/800 steps), effectively gone in about 20 s.
  Reseed: the current grids and colors are snapshotted as "from", a freshly
  seeded pole set and rotated palette as "to", and velocities and colors
  lerp between them over 2400 steps (20 s); at completion the new set
  becomes the base. Still no cut.
- Boundary rule: a particle that leaves the frame by more than 24 px
  respawns at a seeded uniform position with its trail reset to that point,
  so no streak is ever drawn across the field. (Continuity governs state
  transitions; respawn is the standard particle boundary, drawn clean.)
- Layout: canvas sized from the Visual Viewport API with resize listeners
  on both visualViewport and window; canvas.style.width/height are pinned
  in px on every draw. Page ground is the field color #05060A; the field is
  full-bleed with no margins and no text anywhere except the title.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png) and 720x720 (thumb.png). All render cleanly in silence:
  no AudioContext exists in the harness and none is touched; render times
  about 0.7-1.8 s per size.
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. The duplicate render was deleted. Frame one is the synchronous
  draw after exactly 3600 fixed steps from the mulberry32-seeded state;
  no Date.now anywhere in the file (grep-verified), and grep confirms no
  em dashes, no absolute URLs, no gradient, shadowBlur or filter APIs.
- Desktop read: black field webbed edge to edge with arcing trails; pole
  A's vortex dominates (magenta arc streams curling around a dark core at
  centre), and the right third has visibly shifted toward pale blue-cyan
  where the offset grid puts regions further into the A-to-B crossfade,
  with bright near-white heads throughout. No text, no margins.
- Thumb read: same composition squared; the vortex fills the frame, magenta
  dominant, blue-cyan region at the right edge, heads bright.
- Mobile read (390x844, 1,800 particles): vortex centred in the tall frame,
  trails following the same curl, a few cyan heads at the lower right,
  sparser calm water above and below the vortex, nothing clipped.

## Deviations

- Particle count is 3,000 (1,800 on phones) rather than the prompt's
  4,000-8,000: the QA renderer and the fixed-step budget rule the count.
  The field still reads as a dense molten web at both sizes, and the count
  is recorded here per the brief.
- Trail length is 22 recorded points (about 1.1 s of travel) rather than a
  canvas-fade trail: the house renderer paints a single frame, so trails
  are explicit position buffers redrawn each frame, per the brief's house
  method. At the pole speeds (78-128 px/s) that is roughly 90-140 px of
  trail per particle, which the QA reads confirm is enough to web the field.
- Pole colors for a new dream rotate through the same four-color palette by
  slot rather than introducing new hues: the palette is strict (neon on
  black only), so the reseed's color lerp moves the existing four colors
  between poles instead of inventing a fifth.
