# No.657 — Mancha Primero

EXPANSION #80 angela-leible, prompt block 1 "Mancha Primero". Her doctrine:
la mancha primero, el dibujo despues — the stain first, the drawing after.

## Concept

A pale paper ground. First the stain grows: a blot field of ochre, burnt
sienna and iron black spreads unscripted over about 20 seconds, with a few
gold-dust specks settling in it. Then the drawing arrives: one continuous
charcoal stroke traces the outline of the stain's largest mass, and a few
more strokes inside it find an animal (an eye, a beak or jaw, wings or
legs). The stain remains the body; the charcoal only discovers. The found
animal holds for 6 seconds, breathing at 1% scale, then the page fades and
a new stain grows, possibly hiding a different animal. The 40 s cycle
(20 grow / 10 find / 6 hold / 4 fade) loops seamlessly.

Interaction: TAP seeds a new stain at the tap point (the cycle restarts
there on fresh paper). DOUBLE-TAP reseeds everything (a new seed family).
Watch-only otherwise. Never click-to-reload.

## Construction

Everything is precomputed as data per cycle, so each frame is a pure
function of the anchored clock plus recorded tap events. No live
simulation runs at render time.

- Stain generation (mulberry32, seeded per segment and cycle index):
  24 diffusion walkers start near the stain center, wander with a seeded
  turning walk, a weak pull home and a hard reach limit (RMAX), and
  deposit flat blotches round-robin so growth interleaves. Each blotch is
  a wobbly 8-vertex shape, drawn as a flat fill traced through
  quadratic curves on the vertex midpoints so edges read as wet ink
  rather than cut polygons. Blotch radius shrinks with distance from the
  core; iron black gathers at the dense core, sienna mid-field, ochre
  wide. Each blotch carries a birth fraction in deposit order; at growth
  fraction g, every blotch with birth < g is drawn, scaling in over a
  short window as it is born. 12–16 gold-dust specks are seeded inside
  existing blotches.
- Largest component: union-find over blotch overlaps; the component with
  the greatest total area is the mass that gets traced.
- Outline extraction: a radial boundary trace. From the component's
  area-weighted centroid, 160 rays are cast; along each ray the outermost
  exit point of any component disc is taken. Two passes of circular
  radius smoothing (window 7) turn the trace into a blobby organic edge.
  The result is one closed polyline with precomputed cumulative arc
  lengths, re-drawn in the finding phase as a single progressive stroke
  with a pressure profile (swelling mid-stroke, tapering at the ends).
- Template fit: the "correlation" of the prompt is implemented as a
  deterministic feature score over the outline: bbox aspect, radius
  profile peak count (local maxima above mean + 0.5 SD), vertical mass
  balance (fraction of component area below the centroid), and reach
  asymmetry for facing. Four scores (horse / condor / eagle / snake) are
  computed from these features and the argmax wins, ties broken by a
  fixed order. The chosen kit's strokes, defined in local coordinates,
  are mapped onto the stain's bbox and every point is pulled inside the
  traced outline radius, so the finding never leaves the body.
- The finding phase spends its first 55% on the outline, the remaining
  window on the inner strokes in sequence, each revealed by arc length;
  the eye dot appears as the inner strokes begin.
- Clock: anchored elapsed time (performance.now offset), with a constant
  PHASE0 of 0.8 s so frame one shows growth at ~4%. The synchronous
  first frame is drawn with an explicit time argument of 0, never a
  live-clock reading. A QA hook (`?seed=tNN`, `?seed=found`) freezes the
  local cycle clock for headless state checks.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas style pinned in px in
  draw(); phone detection via window.screen (min dimension < 700) with
  the aspect test as fallback only; rAF typeof-guarded; no offscreen
  canvas, no ctx.filter, no gradients, no audio, no text. Strict palette:
  paper #EDE4D0, ochre #C98F3D, sienna #8A4A2B, iron black #2B2622, gold
  dust #E3B95B, charcoal #1A1A1A.

### Deviations, with reasons

- Outline by radial trace instead of marching squares on a 256x256
  field (the prompt's suggested route). The radial trace yields one
  continuous closed polyline directly, which is what the piece needs to
  re-draw as a single confident stroke; marching squares would add a
  field, a threshold pass and a polyline-stitching step to reach the
  same curve. It assumes the mass is star-convex about its centroid,
  which holds for center-grown walker stains. Recorded here per the
  brief's instruction.
- Template "correlation" is a feature-score heuristic rather than a
  literal polyline-to-polyline correlation coefficient. It is a
  deterministic function of the outline's own features (aspect, peaks,
  mass balance), uses the same four procedural templates, and is fully
  reproducible from the seed.
- Frame one sits at a constant +0.8 s phase so the first frame shows the
  specced ~4% growth instead of a blank page at growth 0.

## QA log

- Renderer: ~/workspace/tools/render-piece.js (node-canvas).
- qa-desktop.png (1280x900): pale paper, the first ~10 blotches of the
  warm stain deposited center-left, nothing clipped.
- qa-mobile.png (390x844): same opening state refitted to the tall
  frame; stain sits center-left, nothing clipped.
- thumb.png (720x720): rendered twice and cmp byte-compared: identical.
  A first determinism failure (live-clock leakage into the synchronous
  first frame through elapsed()) was fixed by drawing frame one with an
  explicit time argument, matching the house pattern; re-verified after
  the fix, and again after the blotch-edge smoothing fix.
- Forced found-state check (throwaway /tmp renders, deleted after
  inspection): t10 shows the dense core mid-growth; t25 shows the
  outline ~fully traced with inner strokes not yet begun; t33 (hold)
  shows the completed finding: charcoal outline around the mass and the
  inner stroke kit inside it.
- Template verification: an instrumented copy of the piece in /tmp
  (console probe on the generator, deleted after use) confirms the
  launch stain (cycle 0, seed 657001) yields the EAGLE: aspect 1.02,
  7 radius-profile peaks, below-centroid mass fraction 0.52, facing
  right. The swept wing spines, feather ticks, hooked beak, body and
  tail strokes in the t33 render match the eagle kit.
- Hygiene: grep confirms no Date.now() call (one comment mention only),
  no Math.random, no createElement, no AudioContext, no canvas
  gradients, no em dashes, no external URLs.
