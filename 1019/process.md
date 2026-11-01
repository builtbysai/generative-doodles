# No.1019 — Detect, Segment, Erase, Rebuild

Study #125 yuta-asai, PP180 "Five-Stage Engine": the Terminal Slam pipeline
(object detection, semantic segmentation, inpainting, depth estimation,
composite) played as an instrument. No labels, no arrows, no text anywhere
except the `<title>`: the stack teaches itself.

## Concept

One seeded night street fragment — four blocky buildings with lit windows,
two advertising slots (one wall-mounted, one billboard), two figures walking
ping-pong paths — is rendered five times, once per pipeline stage, in five
horizontal bands. A bright processing wave sweeps top to bottom every 9 s;
each stage brightens as the wave passes and its audio voice swells with it.
Frame one is drawn at fixed piece-time T0 = 13 s: the wave sits mid-stack,
pulsing the inpaint stage.

## Construction

**Shared-scene model (honesty by construction).** There is exactly one
scene object, built from one mulberry32 seed: building rects/depths, slot
rects/poster seeds, and figure walk parameters. Every stage renders that
same object at the same piece-time t. Figure position is a closed-form
ping-pong function of t; the silhouette is traced from computed joints
(head circle, torso quad, two-segment limbs as quads), so the five views
can never disagree about where anything is.

**The five stages.**
1. DETECT — dim night rendering (buildings, seeded lit windows, street,
   dim figures, empty slot frames) plus cyan bounding boxes on both
   figures and both slots. The lag is honest and temporal: each box is
   drawn around the figure evaluated at (t − lag), with per-target lag
   jitter and a small hash-bucket hunting jitter that scales with lag.
2. SEGMENT — flat class masks only: sky void black, buildings and slots
   magenta, street green, humans white. Misclassification flicker: per
   time-bucket hashes stamp small white patches inside some buildings,
   and a figure occasionally flips to magenta for a bucket.
3. INPAINT — the night scene with figures and posters absent (the healed
   background is drawn whole), then each erased region (figure bboxes,
   slot rects) runs its own heal cycle: raw smudge + seeded speckle, then
   an amber healing front sweeps left to right, then the region is clean
   until the cycle re-erases it. Regions track the figures' live bboxes.
4. DEPTH — flat grayscale tones from seeded depth values via
   pow(depth, contrast): sky black, buildings by their depth, street in
   six strips brightening toward the viewer, figures near-white with a
   slow depth drift as they walk.
5. COMPOSITE — the finished frame: night scene, counterfeit posters
   (three seeded generative mark systems: ring+bars, diagonal stripes,
   halftone dots — no text, no brands) composited into the slots, figures
   with faint red/cyan split echoes of their own silhouettes, and glitch
   macroblocks drawn only inside a clip path traced from the silhouette,
   so the corruption physically cannot leave the body.

**Interaction.**
- TAP a stage: solo full-frame for 10 s (tap again to exit early). A
  single tap resolves after ~20 frames so a double-tap can pre-empt it.
- DOUBLE-TAP: reseed the street (new buildings, posters, depths).
- DRAG across a stage tunes that stage's one parameter:
  - Stage 1 DETECT — box lag, 0.04–0.70 s (hunting jitter scales with it)
  - Stage 2 SEGMENT — class-flicker rate multiplier, 0.2–3.0
  - Stage 3 INPAINT — heal speed multiplier, 0.4–2.2 (cycle 6 s / speed)
  - Stage 4 DEPTH — contrast exponent, 0.5–2.0
  - Stage 5 COMPOSITE — glitch intensity, 0–2.0 (density + block size)

**Sound.** Lazily created on the first pointer gesture only, fully
typeof-guarded; the visual piece is silent and complete without it. Five
voices whose gains follow the wave pulses computed in the draw pass:
targeting square blips (hash-gated) for detect, a three-sine class chord
for segment, band-passed noise shimmer (scaled by heal speed) for
inpaint, a 58 Hz wash for depth, and a lowpass-noise + tone mix for
composite.

**House rules.** Single self-contained file, canvas 2D only. Sizing from
the Visual Viewport API with resize listeners on both visualViewport and
window; canvas style width/height pinned in px on every draw. Phone
detection via window.screen (min dimension < 700 px) with the
h > w × 1.15 aspect fallback; the five bands stay stacked and the scene
scales down on phones. No gradients (the wave is three layered flat-alpha
rects), no shadowBlur, no ctx.filter, no offscreen canvas, no
Date.now/Math.random anywhere — all variation comes from mulberry32 and
integer hash functions of (seed, cell, time-bucket). Frame one is the
synchronous draw at T0 = 13 s; the rAF loop (typeof-guarded) is anchored
as T0 + elapsed-since-load, never derived from a wall clock.

## QA log

- Rendered with render-piece.js at 1280×900 (qa-desktop.png), 390×844
  (qa-mobile.png), 720×720 (thumb.png). All render cleanly in silence.
- Determinism: thumb.png rendered twice, `cmp` byte-identical; the
  duplicate was deleted.
- Read-back, desktop: stage 1 shows the dim street with cyan corner
  boxes on both figures and both slots; stage 2 reads as flat magenta
  buildings (small white misclassification patches), green street, white
  walkers; stage 3 shows amber healing fronts inside a figure region,
  the wall slot, and the billboard region while the white sweep band
  crosses the stage; stage 4 is the same street in flat grays with the
  near street strip brightest; stage 5 shows the magenta ring poster and
  the striped billboard poster with glitch cells inside one figure.
- Read-back, mobile: all five bands intact and legible, figures whole
  inside their bands, posters and boxes unclipped.
- Fix round 1: first render had a ReferenceError (typo `fig.x1` written
  as `lig.x1`); corrected and re-rendered.
- Fix round 2 (after visual read-back): (a) both walkers' seeded phases
  clustered them on top of the wall slot at T0 — phases are now fixed
  design constants placing them at u≈0.20 and u≈0.78 at frame one;
  (b) the segment flicker originally flipped one whole building to
  white, which read as a rendering error — replaced with small white
  misclassification patches inside buildings; (c) the inpaint smudge
  was too close to the background tone to read — raised to #171B2C
  with stronger speckle; (d) detect-stage figures lightened slightly.

## Deviations

- **Segment slots are building class.** The brief's class list for stage
  2 names humans, buildings, sky, street only; ad slots are drawn in the
  magenta building class rather than inventing a fifth class color
  outside the specced palette.
- **Detect lag is a true temporal evaluation**, not a simulated tracker
  filter: the box wraps the figure's state at (t − lag). This is the
  honest lag the brief asks for, kept closed-form for determinism.
- **Tap-to-solo resolves after ~20 frames** (~0.33 s) so double-tap
  reseeding can pre-empt it; recorded here because the solo feels a
  beat late by design.
- **Depth street is six discrete strips** rather than a continuous
  wash, following the brief's "flat tones per element" rule and the
  house no-gradient rule.
- **Figure walk phases are fixed constants**, not seed-drawn, so frame
  one always composes (walkers separated, one near each slot type);
  everything else in the scene reseeds on double-tap as specced.
