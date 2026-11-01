# №1450 "Hand-Coloured Photograph" (tabea-blumenschein TB3, PP681)

## What it is

A black-and-white photographic portrait of a costumed figure — a woman in an
elaborate outfit, posed in a bare room — fills the frame, and over it a second
hand is at work: washes of hand-painted colour glaze across the image,
highlighting a cheek here, a sleeve there, a flower in the hair, in colours
that do not match the photograph's tones. The photograph stays still; the
colour moves. The hand never finishes: it keeps re-colouring.

## Frame one

Warm gray wall above, dark gray floor below, a narrow cream paper edge
around the photograph. The figure is centered and posed, looking at the
camera: dark hair mass with a five-petal flower, pale face with brows, eyes
and lips, ruffled collar, wide sleeves, a skirt with fold lines. The timed
wash at frame one is the rose cheek blush (the 30 s cycle is phase-shifted
+3 s so frame one holds a wash, not an empty photograph).

## Motion

- Timed cycle, 30 s, five zones at 6 s each: cheek (rose #e85a8a), right
  sleeve (gold #e8b83a), flower (scarlet #d81a2a), left sleeve (teal
  #1a8a7a), collar ribbon (violet #6a2a8a). Each wash fades in over 1.5 s,
  holds 3 s, fades out over 1.5 s, then the next wash appears elsewhere.
  The cycle closes exactly at t = 30 s.
- Drag across the photograph paints a glaze wash under the finger; the
  colour cycles through the five glaze colours. A slow drag builds the wash
  stronger (strength 0.18 + 0.17 × slowness bonus, capped at 0.35 alpha);
  a fast drag stays near the 0.18 floor. Drag-painted glaze relaxes
  exponentially (tau 15 s) toward the timed cycle, so the photograph is
  never fully coloured and never becomes a filter slider.
- No audio, no text besides `<title>`. No click-to-reload; drag only.

## Adaptations

- Base as a grayscale figure drawing (flat gray fills with soft shading);
  glazes as layered flat-alpha circles with soft edges, never canvas
  gradients (unreliable in the QA renderer).
- Figure verticals are in min-dimension units from a centered origin, not
  photo-height fractions: the first build used photo fractions for Y while
  sizes used the min dimension, which detached the neck from the face on
  tall phone frames. All figure parts now share one vertical system, so
  head, neck and collar stay connected at every aspect ratio.
- Skirt fold offsets use a stable per-index hash, never the advancing
  PRNG, so the hand-drawn wobble never flickers between frames.
- Fading alphas rounded to 4 decimals before stringifying (node-canvas
  misparses scientific-notation alphas as opaque); dots and circles drawn
  as own-beginPath arcs with a moveTo first (batched ellipse subpaths
  render as giant connected polygons in node-canvas).

## House rules

- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() with style width/height
  in px. Phone detection via window.screen physical size (min dimension
  < 700 px) with aspect h > w*1.15 as fallback; field-like composition goes
  full-bleed on phones (6 px border vs 14 px on desktop).
- Determinism: synchronous first frame at a constant phase via a boot flag
  (frame one = draw(0), clock starts only with the rAF loop, written as a
  plain function declaration behind a typeof guard); all randomness from a
  seeded mulberry32 PRNG (seed 1450000), never Math.random.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, fillText/strokeText, or getUserMedia/microphone.

## Verification (forced-time probe harness, vm-isolated instance)

- Two fresh instances byte-identical at t = 0; t = 0 redraw 0 px diff;
  t = 30 vs t = 0 = 0 px diff (cycle closes exactly).
- Timed washes, each probed mid-window: cheek rose 1,276 px at t = 0;
  right-sleeve gold 2,591 px at t = 6; flower scarlet 555 px at t = 12;
  left-sleeve teal 13,655 px at t = 16; ribbon violet 1,127 px at t = 22.
- Drag: 11 blobs from one drag; drag vs pre-drag diff 8,714 px.
  Slow-drag strengths 0.35 vs fast-drag 0.27 (slow builds stronger).
  Drag glaze aged +40 s vs a clean instance at the same t: 17 px diff
  (relaxed); fresh vs aged drag: 10,304 px diff (decayed).
- Renders inspected at 1280×900, 390×844 and 720×720; thumb renders
  byte-identical across repeated renders.
- Token scan clean (the single "Math.random" hit is a comment stating it
  is never used).

## Fix rounds

1. Figure verticals moved from photo-height fractions to min-dimension
   units from a centered origin (see Adaptations): the first mobile render
   showed the neck floating detached between face and collar. All renders
   re-done after the fix; desktop and mobile both read as one coherent
   portrait.
