# №1632 — Entretiempos Engine (MSR1, PP879 Polycircle Traversal)

Study #215 marcelo-soria-rodriguez. Gallery date: 2006 · 07 · 01.
Interaction cue: "Press R then Y, or tap, to vanish and repaint."

## Driver

The piece is a live traversal of parameter space. Four seeded ring
clusters sit off-centre; their rings intersect, and every intersection
lens is computed geometrically and filled with a palette shift plus a
violet hatch. A sine-LFO envelope drives the Delaunay-to-wild axis:
ring count, radius growth and palette drift move from near-literal
Delaunay homage (balanced circles, quiet intersections) to wild
expansions (small space scales, tapestry-like intersection density),
then back. Two readings alternate: the normal side (fine lines, hatch,
structure) and the reveal side (the same field as smooth radial color
bands). Pressing R then Y, or tapping, triggers the vanishing mode:
the image dissolves and repaints itself progressively.

## Acceptance criteria and measured results

Probed with a node harness that loads the actual script with the same
node-canvas shim as render-piece.js and renders at chosen piece-times
(21 checks, all passed):

- 3-5 ring clusters, off-centre: 4 clusters, all 4 off-centre
  (seeded corner-grid slots with jitter, guaranteed separation).
- Intersections visibly hatched or palette-shifted: lens polygons are
  computed geometrically (circle-circle intersections, 20-segment arcs)
  and filled plus hatched; frame one contains 18,861 hatch-coloured
  pixels. Lens count grows with the envelope: 11 lenses at env 0,
  183 at env 1.
- Parameter envelope completes a Delaunay-to-wild-and-back traversal:
  period 48 s. env(0) = 0, env(24) = 1 (wild peak), env(48) = 0.
  Ring count 20 at env 0 (4 x 5) rising to 44 at env 1 (4 x 11);
  ring spacing tightens 0.19 to 0.095 of cluster radius.
- Normal/reveal readings alternate on a stated cycle: 24 s cycle,
  normal 0-16 s, reveal 16-24 s. Reveal renders the same field as
  flat-alpha concentric radial bands (alpha 0.10, no gradients) with
  the rings ghosted at 0.35 alpha. Mean pixel difference between a
  normal frame (t=10) and a reveal frame (t=20) is 101.58.
- Vanishing mode (R then Y): dissolve 0-3 s, near-empty hold 3-3.5 s,
  progressive repaint 3.5-9.5 s in fixed seeded ring order. Measured
  ink fractions after triggering at t=8: base 0.3116, dissolving
  0.3061 (pixel change vs base 17.68), near-empty 0.0301, mid-repaint
  0.1600, complete 0.2684. Tap triggers the same mode.
- Frame one is deterministic: fixed phase t=8 s (envelope 0.25),
  fixed seed 1632007, mulberry32 PRNG, no Math.random, no wall-clock
  dependence. Thumb re-rendered byte-identical
  (md5 709819acdfbfff2a2d19a0a9763ce178, twice).

## Deviations and adaptations

- Reveal side: the prompt's blur pass is replaced by the same field
  re-rendered as smooth radial color bands via low-alpha concentric
  fills on the main canvas. No canvas filter, no offscreen canvas, no
  gradients (flat-alpha fills only), per the batch spec.
- Vanishing mode: closed-form alpha envelopes over the drawn rings
  (dissolve, hold, progressive repaint in fixed seeded order), not a
  buffer crossfade. No offscreen canvas.
- Tap as vanishing trigger: phones have no keyboard, so a tap on the
  canvas triggers the same vanishing mode as R then Y. Documented
  here and in the gallery hint; the keys remain the desktop route.
- The seed controls the traversal path: cluster layout, drift phases
  and growth rates all derive from the fixed seed, so each authored
  seed is a different walk; the shipped seed is fixed for a
  reproducible thumb.
- The field is clipped to the square frame, so no ring bleeds past
  the square edge. Lens hatching is capped at the 28 largest lenses
  so overlapping lenses stay readable instead of stacking opaque.

## QA results

- Probe harness: 21/21 checks passed (clusters, envelope values,
  ring counts, lens counts, hatch pixels, normal/reveal difference,
  vanish dissolve/hold/repaint, listener registration).
- render-piece.js: desktop 1280x900, mobile 390x844, thumb 720x720.
  All three inspected: four distinct clusters, hatched lenses as
  separate shapes between clusters, title/date/hint legible on solid
  paper plates, square frame clean on desktop and mobile.
- Extra state renders inspected: reveal at t=20 (frame washed in
  radial bands, rings ghosting through), wild peak at t=24 (dense
  teal/violet/rust tapestry, 11 rings per cluster), vanishing hold
  at t=11.2 after triggering at t=8 (near-empty field, faint ghost
  rings).
- Two fix rounds during QA: the first layout piled overlapping
  lenses into one opaque central mass (fixed by a seeded corner-grid
  cluster layout, lighter hatch/fill alphas, and a 28-lens cap); the
  tighter layout then placed only 3 of 4 clusters and had zero lenses
  at the Delaunay end (fixed by the deterministic slot layout and a
  wider low-envelope ring reach).
- No em dashes in visible copy. No AI-signature language. No audio.
  Flicker is slow by construction (48 s traversal, 24 s reveal
  cycle); nothing changes faster than 14 Hz. Reduced-motion users
  get a single static frame at the fixed phase.
