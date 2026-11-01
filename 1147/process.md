# №1147 — Vernacular Triptych

Rosa Menkman study block RM4 (Vernacular of File Formats).

## The piece

Three tall panels side by side show the same procedural source — nested
square outlines, a diagonal hatch band, a solid disc, a magenta block —
under the same injected error, each rendered in a different compression
language. The left panel is JPEG-like: coarse blocks filled with the mean
of their samples. The center is PNG-like: fine cells with every channel
snapped to four hard levels. The right is GIF-like: fine cells run
through an ordered Bayer 4×4 dither between level steps. A small flat
color chip at the top of each panel (magenta, cyan, yellow) is the only
identification — no text labels anywhere.

The injected error is a vertical band, seeded in width, inside which the
source is sampled with its rows displaced (wrapped at the panel edge) —
each pipeline surfaces the same displacement differently, and in the
blocky panel the band also smears horizontally, strongest at its center,
the way a DCT block smears. The band migrates across all three panels on
a smooth 20-second idle traverse.

There is no offscreen canvas and no ImageData in the piece: the source
is a pure function of panel-local coordinates, and each panel is drawn
by sampling it through its own pipeline.

## Motion and interaction

- Idle: the error band ping-pongs across the triptych width over 20 s.
- Drag horizontally: once the press becomes a drag, the band follows the
  pointer across the panels. On release it hands back to the idle
  traverse with an exponentially decaying offset (~1.4 s), so there is
  never a jump.
- Double-tap: reseeds the source geometry (square centers, hatch,
  disc, band width) from the next seed.
- Never click-to-reload. Silent by design.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on
  both visualViewport and window; canvas CSS size pinned in fit(),
  which runs on every draw.
- Phone detection via window.screen physical size (min dimension
  < 700 px), aspect fallback (h > w * 1.15).
- Determinism: seeded mulberry32 only, no Math.random; frame one is
  drawn synchronously at the fixed phase t = 2 s, with the error band
  crossing the left panel so the blocky smear reads immediately;
  requestAnimationFrame is guarded by a typeof check and anchored to
  that fixed phase. The QA thumb re-rendered byte-identical.
- Palette closed to the brief: ground #111111, working colors #FF2D78,
  #00D0FF, #FFC400, #101010, 2 px black gutters; intermediate tones
  appear only where a pipeline itself produces them (block means,
  quantized steps, dither choices). No gradients, filters, shadow
  blur, or audio.
