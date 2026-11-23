# №1154 — Room Tone

Antonio Roberts study block AR3, after *I Am Sitting in a Room* (2010), his
font-file corruption piece after Lucier: a line of letterforms is re-saved
through a process that randomises the values constructing each glyph, until
the viewer can no longer find meaning in it while the computer still can.

## The piece

Twelve invented geometric letterforms (no real alphabet) stand in a row on
#050505, drawn in #E8E8E8. Across a 12-second loop they decay: control points
jitter, stems split off orange-red (#FF3B00) duplicates, segments tear away
and re-render as displaced fragments, and grey noise colonises each glyph's
counter. Decay is progressive left to right — glyph 1 stays nearly clean,
glyph 12 is unreadable by loop end. Beneath, a small reference row repeats
the same twelve glyphs un-jittered in steady #00E5FF: the file the computer
still reads perfectly. At the loop point the damage does not fade; it snaps
back to clean in a hard cut, the file reloaded.

## Decay model

Closed-form per (glyph i, loop time t), no accumulated state:

- Raw amplitude `A = clamp01((t mod 12)/12 × (0.15 + 0.85·i/11))`, quantised
  to 12 discrete steps so damage grows in steps, never smooth fades.
- Point jitter is a seeded hash of (glyph, grid point, step) × A × 0.62
  units; shared grid points jitter together so strokes stay joined until
  they split. Past A = 0.8 a few points tear away entirely.
- Stem split: when the quantised A passes a per-segment seeded threshold
  (0.30–0.75), the segment gains an #FF3B00 ghost copy offset by a seeded
  vector that grows with A.
- Fragments: past a higher threshold (0.55–0.95) the segment itself renders
  in #FF3B00, displaced; past A = 0.9 some stems vanish outright.
- Counter fill: a 4×5 candidate dot grid inside each glyph's counter
  region; a dot appears when its seeded hash falls below A, grey #333333,
  turning #FF3B00 in the worst damage.
- Ambient noise: 300 seeded #333333 particles in a band around the row,
  density driven by the row's average damage step.

## House adaptations

- Glyphs are pure data (segment lists on a 4×6 grid), redrawn per frame;
  no font, no text anywhere except the `<title>`.
- First frame is drawn synchronously at fixed phase T0 = 8 s (left glyphs
  near-clean, right glyphs heavily fragmented); the rAF loop, typeof-guarded,
  anchors elapsed time to that phase. Jitter is a function of
  (glyph, point, step) via mulberry32 hashing, never accumulated state, so
  the first frame is reproducible byte-for-byte.
- Canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; CSS size pinned in draw(); phone detection via
  window.screen physical size with aspect fallback. The 16:9 field is
  centred and the page ground is the piece's own #050505, so on phones it
  reads full-bleed.
- Silent, watch-only. No gradients, no ctx.filter, no shadowBlur, no
  offscreen canvas, no audio or microphone APIs.
