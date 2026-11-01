# №1321 "Drawing as Incantation" (sadie-barnette SB2, PP488)

## Prompt
A single enlarged dossier page drawn stroke-by-stroke in dense hand-brushed
graphite, building up over minutes like a ritual. When the drawing completes,
exactly one action occurs: a single purple spray-paint line strikes through
the signature. Then the page holds, fades to paper, and the ritual begins
again on a newly-seeded page. Grounded in Barnette's FBI Drawings (2021) and
FBI Drawings: Very Truly Yours (New Years Eve 1968).

## Frame one
Blank paper at exactly t = 0 via a boot flag. The drawing begins at load, so
the gate holds. No visible text except the title element; document text is
pseudo-type glyph noise, never readable prose.

## Mechanics (all closed-form over piece time, watch-only, no viewer input)
- 206-second cycle: strokes accumulate over 180 s, the purple spray strike
  fires over 1 s with a particle-burst hiss drift, hold 20 s, crossfade to
  paper over 5 s, then a newly-seeded page begins.
- Stroke order: paper flecks, faint margin grid, page border, 26 typewriter
  lines of seeded dash/dot/tick glyphs, a hatched redaction bar over one
  line, then a flowing signature scrawl in the lower third (single polyline
  with loops that return to the path, crossing flourishes, underline).
- The strike is one diagonal purple line through the signature: a
  progress-gated core polyline plus 520 seeded spray particles.
- All layouts and strokes come from a seeded mulberry32 stream
  (seed 1321000 + cycle x 7919), never Math.random.
- Crossfade is layered alpha draws on the main canvas. No offscreen canvas.

## Adaptations
- Frame one is blank paper (the drawing starts at load) rather than a
  finished page, so the thumb byte-compare holds.
- Crossfade via main-canvas alpha overlay, not an offscreen canvas, which
  the QA renderer cannot create.
- Shadows, spray, and grain are flat alpha shapes and fillRect dots. No
  gradients, no shadowBlur, no filters.

## House rules
- Visual Viewport sizing with resize listeners on visualViewport and window.
- Canvas pinned in draw() via canvas.style.width/height in px.
- Phone detection via window.screen physical size (min dimension < 700px)
  with aspect h > w*1.15 as fallback; centered page keeps its shape with
  the page ground (paper #EFE9DA) as the page background.
- Synchronous developed frame at load; rAF loop is a plain function
  declaration behind a typeof guard.
- Silent. No audio, no microphone, no getUserMedia.

## Fix rounds
1. First frame-one render showed the page edge shadows unconditionally.
   Fixed by gating the shadow bands behind stroke progress (shown > 0).
2. First signature read as disconnected vertical strokes: loop branches
   jumped the pen position. Rebuilt as one flowing polyline whose loops
   start and end on the path point, with crossing flourishes.

## Verification
- Renders at 1280x900, 390x844, 720x720 inspected. Frame one is blank paper
  at all three sizes.
- Forced-time probes on discarded temp copies: t=90 half-drawn page;
  t=180.5 strike half-drawn through the signature; t=190 full strike held;
  t=204 crossfade washing back to paper.
- Thumb rendered three times plus final re-verification, all cmp
  byte-identical.
- Token scan clean of Math.random, createElement, AudioContext,
  getUserMedia, gradients, shadowBlur, filters, offscreen canvas.
- index.html md5: 195ca85f02113d869aca84e20daf066d
