# №1516 "Morgestraich at Four" (clement-cogitore CC5, PP763)

Gallery date: 2006 · 03 · 07 (formula date; not drawn in the piece).
Study: clement-cogitore, expansion #200, network chain from sonia-wieder-atherton #199.
Core engine: TWO WORLDS, ONE IRREDUCIBLE IMAGE — darkness is a working material;
processions never arrive; the mystery is never explained.

## What it is

A near-black field (#0a0a0c). At the start of each 60 s loop every light goes
out; then small lantern-lights enter from the left edge in a slow procession,
each carried by an abstract costumed shape, moving rightward, never arriving.
The only light in the scene travels with the carriers; the procession passes,
fades, and the field goes dark again.

- Palette (prompt only): field #0a0a0c; lantern lights warm amber #e8a83a and
  candle gold #d9c06a; carrier shapes deep plum #3a2a3a and dark teal #1e3a3a;
  faint ground line grey #33333a. No other color.
- Composition: procession band across the middle third (y 0.30H–0.70H);
  lanterns small and widely spaced (6 s apart, ~0.29W apart on screen); most of
  the frame stays dark. Faint ground line at CY + 0.14H, constant.
- Carriers: cloaked glyphs — a trapezoid cloak in plum or teal (seeded), a
  short stem, and a plain hood disc. No faces, no features, no likenesses.

## Timing (loop-local time, 60 s loop)

- 6 lanterns, one every 6 s, spawning at 4, 10, 16, 22, 28, 34 s.
- Each travels from x = -0.08W to 1.08W over 24 s, with a 2 s fade-in and a
  2 s fade-out at the right edge, so the last lantern is gone by 58 s and
  58–60 s is darkness. Loop-local 0 is lights-out (no lantern active).
- Carrier bob: sines with periods 12/15/20/30/60 s (all divide 60), amplitude
  0.008U. Lantern flicker: small ±0.08 alpha sines, periods 3–6 s (all divide
  60). No polarity flips, no strobe.
- Frame-one phase shift: frame one is drawn at loop-local 18 s (PHASE = 18),
  so the thumb opens mid-procession with three lanterns visible, following the
  precedent of №1504/№1507/№1508. The loop itself still starts lights-out at
  loop-local 0, and t = 60 / t = 120 re-draw exactly as t = 0.

## Interaction

- Drag along the procession band: on pointerdown inside the band, the nearest
  active lantern is grabbed; horizontal movement pulls it toward the pointer
  exactly (closed-form over recorded moves). On release it resumes its march
  from the pulled position, the pull decaying with tau 1.5 s. Other lanterns
  are untouched. Drag never stops the procession, never adds a lantern.
- Drag vertically: dominant vertical movement dims (drag down) or brightens
  (drag up) the lanterns, factor clamp(1 - dy/600, 0.75, 1.25), easing back to
  1 with tau 2 s after release. It never lights the background: the field
  pixel stays #0a0a0c under both extremes (probed).
- Drags starting outside the band (y outside 0.30H–0.70H) are ignored.
- Never click-to-reload, never click-to-restart. Fully silent.

## Light adaptation (required house-rule adaptation)

The prompt's "radial light holes cut at lantern positions (composite lighter)"
is NOT built with canvas gradients, which the QA renderer cannot trust.
Instead each lantern's light is layered flat-alpha discs (amber 0.06 at
0.14U, amber 0.12 at 0.09U, candle 0.25 at 0.05U, candle core 0.95 at 0.014U,
all alphas rounded to 4 decimals and scaled by the lantern's envelope ×
flicker × brightness). Each carrier is drawn at 0.9 × its own lantern's
alpha, so only lit carriers read and the background is never revealed.
Same visible result, renders identically in node-canvas.

## Determinism

- Fixed-phase first frame: draw(0) is the phase-shifted loop-local 18 s state.
- Every animation sine runs on loop-local time; all periods divide the 60 s
  loop, so t = 60 and t = 120 are exactly t = 0.
- Drag state is closed-form over recorded pointer events (latest drag per
  parameter, exponential decay after release), never frame-integrated.
- Per-lantern color, band offset, bob phase, and flicker phase come from a
  seeded mulberry32 stream (seed 1516000), never Math.random.
- rAF loop is a plain function declaration with typeof guards; viewport from
  the Visual Viewport API with canvas pinned in draw(); phone detection via
  window.screen with aspect fallback. Dots are own-beginPath arcs with moveTo
  first (node-canvas quirk); fading alphas rounded to 4 decimals.
- Forbidden-API grep clean: no AudioContext, getUserMedia, Path2D,
  createElement, gradients, shadowBlur, fillText, localStorage, Math.random,
  Date.now, or performance.now.

## Probes (probe-1516.js, vm-isolated instance, real node-canvas, all pass)

- Frame-one redraw 0 bytes differ; fresh-instance frame one identical.
- Loop closure t = 60 and t = 120 vs t = 0 exact (0 bytes differ).
- Lights out: activeCount at piece time 42 (loop-local 0) = 0; amber pixels
  at t = 42 = 0.
- Procession: activeCount 3 at frame one (loop-local 18), 4 at loop-local 24,
  2 at loop-local 48, 0 at loop-local 58; lantern 0 travels right
  (x 429.6 → 638.4 from t = 0 to t = 6 on a 720 canvas); frame one carries
  736 amber pixels.
- Pull drag: offset exactly 120 px for a 120 px drag; lantern follows
  exactly; release decay at +2 s = 31.63 px (120 × exp(-2/1.5)); march
  resumes (x rises after release); other lanterns offset 0.
- Vertical drag: up 200 px → brightness 1.25; down 200 px → 0.75; background
  corner pixel stays (10, 10, 12) under both.
- Off-band drag: changes nothing (offsets 0, brightness 1).

## Renders inspected

- qa-desktop.png (1280×720): near-black field, three lantern carriers in the
  middle band with layered halos, cloaks teal/teal/plum, faint ground line,
  most of the frame dark. The leftmost carrier is the just-entered lantern
  (loop-local 18, spawn 16, 2 s into its fade-in), correctly at the left edge.
- qa-mobile.png (390×844): same composition full-bleed, no clipping.
- thumb.png (720×720): three independent renders byte-identical
  (md5 b5e4920a733c598d99c20195627fcaaa).

## Fix rounds

1. Piece fix (caught by the builder before QA): the rAF loop first re-registered
   with the timestamp argument instead of the loop function; corrected to
   `requestAnimationFrame(loop)`. All probes and renders were run after the fix.

## Deviations from the prompt

None beyond the documented house-rule adaptations: flat-alpha halo discs
instead of radial-gradient light holes; frame-one phase shift (+18 s) so the
thumb opens mid-procession rather than on black; closed-form drag state;
full silence (no audio of any kind).
