# No.809 "Burnt Edge" (EXPANSION #99 jacob-kassay, block 2)

## Concept

A square silver monochrome that tarnishes in front of you. Oxidation starts
at the top, bottom, and left edges as amber-brown stains and blooms slowly
inward, the way Kassay's electroplated canvases carry the chemical memory of
the plating bath at their margins. The right edge resists: the stain barely
enters from that side. The piece rests fully tarnished, then the loop gently
returns it to clean silver and the chemistry starts over. There is no
interaction and no image of its own beyond the metal and its stain; the
subject is a slow material process, watched.

Watch-only, seamless 60 s loop: 46 s of growth, an 8 s hold at full
tarnish, a 6 s fade back to clean silver.

## Construction

- Palette (strict): silver #C4C4C4, stain start #8A5A2A, stain deep
  #4A2E12, ground #111111. Nothing else is drawn; the page ground is the
  ground tone.
- The panel is a centered square (side = 0.78 x the frame's smaller
  dimension, 0.84 on phones) filled flat silver on the near-black ground.
- The stain field is precomputed per layout on a 144 x 144 grid of cells in
  panel space. For each cell and each edge we store a growth threshold:
  threshold = distance from that edge / (edge reach x noise modulation).
  Edge reaches are left 0.88, top 0.82, bottom 0.80, right 0.30 (fractions of
  the panel side), so the left bloom is strongest and the right edge stays
  nearly clean until the very end of the growth.
- The noise modulation combines two seeded value-noise octaves (lattice 4,
  seed 80911; lattice 9, seed 80941), sampled through a different mirror per
  edge so the four blooms do not share one fingerprint. The result is an
  irregular, fingered front, never a geometric wipe: a cell is reached when
  the loop's growth value passes its threshold, with a 0.09 growth-unit soft
  band across the front.
- Stain color is a mix of stain start and stain deep driven by how far
  behind the front the cell sits, varied by a mid-frequency noise (lattice
  7, seed 80923); stain alpha is ~0.9-1.0 of that mix. Growth overshoots
  slightly (x1.08) so the 8 s hold is fully tarnished panel-wide.
- Silver clouding: a finer noise field (lattice 11, seed 80937) lays the
  deep tone over the silver at very low alpha everywhere, and up to ~0.18
  alpha just ahead of the advancing front, so the metal clouds and mottles
  where the stain is about to pass, before it arrives.
- Growth is closed-form in loop time: smootherstep across 46 s, flat hold
  to 54 s, smootherstep fade to 60 s. All randomness is mulberry32 streams
  consumed once at layout; nothing reads Date.now(). No gradients,
  shadowBlur, ctx.filter, or offscreen canvas are used: the stain is drawn
  as per-cell flat rects straight from the precomputed field.
- Frame-one phase: the synchronous first frame is drawn at loop t = 17 s
  (growth ~0.29), a deliberate phase choice. At that point the stain is
  clearly established at the top, bottom, and left edges (roughly the outer
  fifth to quarter of the panel) while the center is still clean silver. A
  frame one at t = 0 would show an unstained panel and hide the subject;
  the loop's own zero point still passes through clean silver once per
  minute. The animation is anchored so it continues from this phase.

## QA log

- Rendered with render-piece.js: qa-desktop.png (1280x900), qa-mobile.png
  (390x844), thumb.png (720x720). Read back all three: silver square
  centered on near-black with generous margins, amber-brown tarnish
  blooming irregularly from top, bottom, and left, only a whisper entering
  from the right, center still silver. Nothing clipped on mobile; the panel
  sits centered in the tall frame.
- Determinism: thumb.png rendered twice and cmp-compared byte-identical;
  the duplicate was deleted. First build read slightly too advanced and
  blocky at the phase check (stain island too small, cell grid coarse);
  the shipped build moves frame one to t = 17 s, refines the field to
  144 x 144 cells, adds the second front-noise octave, and softens the
  depth-noise contrast. All renders redone after the change and the byte
  compare re-run.
- Hold check: a throwaway copy phased to loop t = 50 s (inside the 8 s
  hold) was rendered and read back: the whole panel sits in deep
  amber-brown tarnish with mottled depth variation, no clean silver left.
  The throwaway file and render were deleted.
- Deviations from the prompt: none of substance. The prompt allows "2D
  canvas or shader"; this is the 2D canvas route, with the oxidation mask
  realized as precomputed per-cell thresholds rather than a signed-distance
  texture, per the house renderer limits. The frame-one phase (t = 17 s
  into the loop) is a presentation choice recorded above, not a change to
  the loop itself.
