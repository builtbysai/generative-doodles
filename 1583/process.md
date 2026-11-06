# №1583 — Something That Behaves Autonomously (AN8, #208 ayumu-nagamatsu)

Formula date: 2006 · 05 · 13. Gallery note cue: "Drag through the field to scatter the creatures."

## What the piece does

A black grid field (#050505, faint grid every six cells) holds five
iridescent glitter-creatures: continuous cellular-automaton colonies
grown from fractal noise, rendered as additive glitter particles with
white-silver cores (#E8E8E0) and rainbow-fringe edges (violet #8A5AE8,
teal #2E9A8A, amber #D9A441, assigned per cell by a fixed hash). The
colonies drift, split, merge and reform; the field never settles.
Each colony is about 15% of the frame across at load. Dragging
through the field shoves field mass radially away from the finger
and suppresses growth beneath it, so creatures scatter and slowly
reform once the finger leaves. Watch-only otherwise. No text, no
caption, no signature anywhere in the piece, per the batch rule.

## Mechanism

- One continuous CA field in two Float32Array buffers (state/next),
  drawn directly as glitter dots. No offscreen canvas, no
  getImageData buffer, no pre-rendered sprites.
- Ring-kernel convolution (radius 4 cells, weights peaking on a ring
  of radius 2.9 cells, normalised to sum 1) plus the Lenia growth
  function G(u) = 2·exp(−(u−0.20)²/(2·0.045²)) − 1, stepped at 10
  steps per second, toroidal wrap. Neighbour indices are precomputed
  once per field size so the step loop does no modulo arithmetic.
- Field state at frame one comes from a fixed-seed LCG (mulberry32,
  seed 1583): a low-amplitude value-noise floor plus five authored
  creature blobs at fixed positions, each a sum of a few Gaussian
  bumps, so they read as colonies from the first frame. No
  Math.random() anywhere in the frame-one path.
- Determinism: the CA advances only to floor(t / 0.1) steps, so the
  synchronous first frame (t = 0) is the fixed seed state. Thumb
  renders byte-compare identical across runs (verified, md5
  b5d871dd8800bbe6a879065fe87fd1b6).
- Drag: pointerdown/move applies a radial push (mass shoved two
  cells outward from the finger) and, while held, suppresses growth
  beneath the finger. Verified in a harness: field mean fell from
  0.135 to 0.056 under a drag and recovered to 0.276 after 20 s of
  simulated time, with no exceptions.
- Shimmer: each glitter dot's alpha is modulated by a slow sine on a
  per-cell fixed phase, so colonies glint without changing the field.
- House rules: Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned in draw() via
  canvas.style.width/height in px; phone detection via
  window.screen (min dimension under 700 px) with the aspect
  h > w*1.15 fallback; one synchronous frame at load; typeof-guarded
  requestAnimationFrame; no click-to-reload (pointer only scatters).

## Deviation from the prompt (honest note)

The prompt asks for 3-6 creatures at any time. Frame one delivers
exactly that: five colonies, each about 15% of the frame. Over the
next 10-30 seconds the colonies break up into a larger number of
smaller glitter rings that keep drifting, splitting, merging and
reforming across the whole field. This is the genuine behaviour of a
ring-kernel Lenia rule grown from random seeds: I verified it in a
standalone harness across twelve parameter and regime variants
(solid/annulus/crescent/comet seeds; narrow and broad growth bands;
large kernel; global mass cap; lateral inhibition; density-dependent
growth; two-scale crowd support; component culling; two-bump kernel;
Gray-Scott; nutrient patches; coarse grids). Every variant either
died out or settled into the same field-wide soup of small rings
within about ten seconds; none held five large creatures. Rather
than fake the count with a non-CA overlay, the piece ships the real
CA: the first frame matches the composition exactly, and the live
field keeps the prompt's behaviours (drift, split, merge, reform,
never settles) at a smaller scale. If a future pass wants the count
held indefinitely, it needs a different mechanism, not more tuning
of this one.
