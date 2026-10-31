# No.662 — Animales de Poder

EXPANSION #80 angela-leible, prompt block 6 "Animales de Poder
(procession)". Her mural as a procession of power animals.

## Concept

On near-black, one animal at a time. Six power animals cross singly,
left to right, in a fixed order, each as one stain plus one found line
in its own two-color micro-palette: the jaguar (rust/ember), the condor
(indigo/pale), the whale (deep blue/water), the pelican (bone/gray),
the puma (copper-green/gold), the goat Amalthea (gold/rust). Each
crossing runs the Mancha pipeline of No.657: the stain grows first at
stage-left, then a single line traces its outline and finds the animal
inside it, then the composite crosses and dissolves into the right
edge. Between animals the canvas breathes empty black. No clutter, no
labels, no interaction: a procession is watched.

## Construction

Everything is precomputed as data at load (all six animals), so each
frame is a pure function of the loop clock. No live simulation runs at
render time.

- Pipeline timing: 84 s loop = six slots of 14 s, fixed order jaguar,
  condor, whale, pelican, puma, goat. Per slot: stain grows 0–3 s at
  the animal's home position (stage-left), the finding draws 3–6 s
  (outline over the first 55% of the window, inner strokes in sequence
  after, eye dot as the inner strokes begin), the composite crosses
  6–12 s with an ease-in-out translation and dissolves over the last
  quarter, then 12–14 s is empty black.
- Stain generation (Mancha method, mulberry32 seeded per animal,
  base 662001 + index × 1013): 26 diffusion walkers wander in a unit
  disc and their positions are scaled by the animal ellipse radii
  (rx, ry) on deposit, so the mass fills the body ellipse
  proportionally at any aspect; walkers steer home at the disc edge so
  the mass stays one body. Blotches are flat wobbly 8-vertex shapes
  drawn through quadratic midpoint curves (wet-ink edges, no
  gradients), stored in deposit order with birth fractions and
  separate x/y radii; at growth fraction g every blotch with birth < g
  is drawn, scaling in as it is born. A warp shapes the mass before
  tracing: the condor gets a shallow dihedral (wingtips raised), the
  whale a gentle arc (center raised). A few light specks settle inside
  existing blotches.
- Outline: largest connected component by union-find over blotch
  overlaps; a radial boundary trace (160 rays from the area-weighted
  centroid, outermost disc exit per ray, two smoothing passes) gives
  one organic closed polyline, re-drawn in the finding phase as a
  single progressive stroke with a pressure profile.
- The six kits (procedural polylines in local coords, head at +u,
  fitted to the outline bbox and pulled inside the outline radius, so
  the finding never leaves the body):
  - jaguar: long low cat — back, blocky head and jaw, ear tick, belly,
    two legs, tail carried low with a droop, three rosette hints
    (small broken rings) on the flank.
  - condor: broad wingspan — two wing spines, six feather barbs, a
    short body, tail fan.
  - whale: arched spine, blunt head, mouth line, belly, two fluke
    strokes at the rear, one pectoral fin.
  - pelican: back, neck and head, long bill with a pouch curve back
    under it, two folded-wing lines, belly, two leg ticks.
  - puma: the jaguar's sibling, deliberately differentiated — slimmer
    build, smaller rounder head, no rosettes (plain coat), tail
    carried high in a curve.
  - goat: compact body, head, one horn curving up and back, beard
    tick, belly, two legs, tail up tick.
- Crossing motion: land animals travel level with a micro-bob; the
  condor rides high and lifts slightly mid-cross; the whale breaches —
  its breach phase runs ahead of the exit (peak at 37.5% of the
  crossing, while the body is still mostly in frame), rising 0.16 FH
  and rotating −0.10 rad at peak, then leveling as it slides out.
- Clock: anchored elapsed time (performance.now offset) with a
  constant PHASE0 of 0.4 s so frame one shows the jaguar's first
  blotches just appearing. The synchronous first frame is drawn with
  an explicit time argument of 0, never a live-clock reading. A QA
  hook (`?seed=tNN`) freezes the loop clock at NN seconds.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas style pinned in px
  in draw(); phone detection via window.screen (min dimension < 700)
  with the aspect test as fallback only; rAF typeof-guarded; no
  offscreen canvas, no ctx.filter, no gradients, no audio, no text
  besides the title. Ground #0B0B0D; each animal strictly its two
  palette colors.

### Deviations, with reasons

- Forced-check times: the brief suggested ~t33 for the condor and
  ~t47 for the whale. In the shipped 6 × 14 s layout with the fixed
  order, the condor occupies 14–28 s and the whale 28–42 s, so those
  states actually fall at t20 (condor found), t23 (condor crossing)
  and t36 (whale at breach peak); the checks were run and read at the
  times where the states occur. No 6 × 14 arrangement in the stated
  order places them at 33/47.
- Outline by radial trace instead of marching squares on a field (the
  study pipeline's suggested route), same rationale as No.657: the
  trace yields the single continuous stroke the finding needs
  directly, and center-grown walker stains satisfy its star-convex
  assumption.
- No overlapping pipeline: the TASKS prompt's technical note suggests
  the next stain could grow while the previous animal exits, but this
  build's brief specifies strictly one animal at a time with empty
  breaths between, so slots never overlap.
- The whale's breach peak is phase-shifted earlier than the crossing
  midpoint (see Construction) so the signature moment happens while
  the body is in frame rather than half-exited.

## QA log

- Renderer: ~/workspace/tools/render-piece.js (node-canvas).
- qa-desktop.png (1280×900): near-black field, the first blotches of
  the jaguar's rust stain just appearing at stage-left with one ember
  speck, nothing clipped.
- qa-mobile.png (390×844): same opening state refitted to the tall
  frame, animals scale to width, nothing clipped.
- thumb.png (720×720): rendered twice and cmp byte-compared:
  identical, re-verified after each fix round.
- Forced state checks (throwaway /tmp renders via `?seed=tNN`, read
  back, then deleted): t6 jaguar found — rust mass, ember outline,
  back/head/jaw/legs, rosettes on the flank, tail low; t20 condor
  found — wide indigo wingspan mass, wing spines, feather ticks, body
  and tail fan in pale; t23 condor crossing — the wingspan mid-frame,
  riding high; t36 whale at breach peak — deep-blue arched body fully
  in frame, raised and rotated, fluke strokes at the rear, pectoral
  fin below.
- Fix rounds: (1) first generation ran the walkers isotropically in
  composition space, so wide animals (condor especially) piled into a
  squarish blob instead of filling their ellipse — walkers moved to a
  unit disc scaled by the ellipse radii on deposit, blotches given
  separate x/y radii; (2) the whale's breach originally peaked at the
  crossing midpoint, when the body was already half out of frame —
  breach phase shifted to peak at 37.5% of the crossing.
- Hygiene: grep confirms no Date.now() call (one comment mention
  only), no Math.random, no createElement, no AudioContext, no canvas
  gradients, no em dashes, no external URLs.
