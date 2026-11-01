# №1304 "Disc Nine" — process

Kristan Horton, KH1 (PP471). The ninth disc in Horton's WWI series:
a narrative compressed into a center-out spiral of glyph rings, coherent
at the center, collapsing into a pile at the edge.

## What it is

A square kraft-paper field. An Archimedean spiral of 8–10 glyph bands
runs center-out, one dominant glyph type per band, ring by ring:
crosses, flags, medals, gun silhouettes, portrait ovals, rubble hatching,
then cycling. Glyphs are parameterized vector stamps in black ink, sepia,
and rust on kraft #C8A96A, with a faint sepia spiral guide line beneath
and static kraft flecks. No text anywhere; the gun silhouettes are abstract
shapes, no gore, no glorification.

## Motion

Watch-only, 90 second loop, phase-shifted so frame one opens on the
finished disc (fully drawn, still coherent), the established hold-phase
precedent for a drawing-outward piece:

- t = 0: finished disc, coherent throughout.
- Degrade: outer bands (6–9) scatter, rotate, and overlap into a pile
  while inner bands stay clean.
- Clear: the field fades to bare kraft over 5 seconds.
- Draw: the spiral draws itself outward over 70 seconds, center first,
  then the loop repeats with a new seeded layout.

Never click-to-reload. No interaction.

## Determinism

Frame one is drawn synchronously at exactly t = 0 via a boot flag; the
clock starts only with the rAF loop. Loop layouts, glyph jitter, and
degrade scatter all come from a seeded mulberry32 sequence keyed by loop
index (seed 1304000 + loop × 7919). No Math.random. The spiral guide and
glyph reveal are closed-form functions of piece time.

## Build notes

- Frame one was first a nearly blank page (only the center anchor mark),
  honest to a draw-from-zero loop but unreadable as a gallery thumb.
  The loop was phase-shifted by 70 seconds so frame one shows the
  finished disc; the full degrade, clear, and redraw performance still
  plays out inside the loop.
- Resize redraws at the current piece time, never back to frame one.
- QA: desktop 1280×900, mobile 390×844, thumb 720×720 rendered three
  times byte-identical. Forced-time probes (temp copies, discarded)
  confirmed the degrade pile at t = 10 and the half-drawn spiral at t = 60.
