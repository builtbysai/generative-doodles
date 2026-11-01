# №1346 "Translation Chain" (eric-gottesman EG3, PP569)

## What it is
A single invented glyph-string is translated downward through five horizontal
bands, each a different medium: (1) PHOTOGRAPH — the glyphs as a grayscale
dithered block; (2) WORKSHOP — scattered rust annotation marks over the block;
(3) SCULPTURE — the marks extruded as isometric blocks; (4) LEGAL PAD —
graphite sketch lines on yellow; (5) THREAD — one continuous crimson stitched
curve binding them all. Each band shows its medium's rendering of the SAME
string, fifteen years apart. A slow conveyor carries each translation down to
the next stage.

## Frame one (t = 0, boot flag)
The conveyor is at rest: five equal full-width bands, in order —
dithered photograph glyphs on dark ground, rust workshop arcs over a faint
dither block, isometric blocks sized by glyph complexity, graphite sketches on
a ruled yellow pad, and a dashed crimson thread curve through the glyph
centroids. No text anywhere except `<title>`; the glyphs are invented marks,
never letters in any alphabet.

## Mechanics
- Conveyor: one band-height per 6 s step, 1 s ease, then settle; a full pass
  takes ~30 s, then the string re-seeds and a new translation begins. Bands
  are stream items (item m = string floor(m/5), medium mod(m,5)); the stack
  scrolls as whole units and settles aligned each step, so a band is never
  torn mid-glyph at rest.
- Tap a band (movement under 12 px): freezes just that band in place for
  inspection while the conveyor runs on; its medium keeps rendering live
  detail (dither shimmer, thread stitch advance). Tap again: it eases back to
  its stream position over 1 s. Drag does nothing.
- Live detail is closed-form over piece time: dither shimmer (seeded sine
  phase per dot), thread dash offset advancing, workshop annotation pulse.
- Determinism: frame one draws synchronously at exactly t = 0 via a boot
  flag; the clock starts only with the rAF loop (plain function declaration
  behind a typeof guard). All glyphs, strings, jitter and phases come from
  seeded mulberry32 streams (glyph alphabet per glyph id, string per
  string-index × 7919); no Math.random anywhere.

## Adaptations
- The 40-glyph alphabet is invented once per glyph id (2–4 primitives:
  lines, arcs, dots, ticks) and reused identically every frame.
- Each stage is a deterministic pure function of the same 14-glyph string:
  dither via a Bayer 4×4 matrix over glyph sample points; workshop arcs at
  glyph centroids; sculpture boxes sized by glyph complexity; pad strokes
  tracing glyph skeletons with fixed per-glyph jitter; thread as a single
  dashed path through centroids.
- Everything draws directly on the main canvas: no offscreen buffers, no
  gradients, no shadowBlur, no filters, no WebGL, no AudioContext. The piece
  is silent. No stage labels as text; stages are distinguished by medium.
- Phone: full-bleed bands; verified at 390 wide.

## QA
- Rendered with node-canvas at 1280×900 desktop, 390×844 mobile, 720×720
  thumb; all three inspected. Thumb rendered three times plus a final
  re-verification after this file was written — all byte-identical.
- Token scan clean of Math.random, createElement, AudioContext,
  getUserMedia, shadowBlur, gradients and offscreen canvas (the only
  performance.now/Date.now mentions are the rAF loop clock, which starts
  after the boot-flagged frame one).
- Fix rounds: none required — first renders at all three sizes read
  correctly.
