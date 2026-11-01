# №1371 "Breathings" (sky-hopinka SH4, PP594)

A 4×4 grid of generative square "photographs" on an ink ground, each
landscape ringed by a border of pseudo-script glyphs. The border text is
the title, "some sort of like prayers." One square is always mid-etch:
its border draws itself glyph by glyph, marked only by the drawing
cursor's faint prayer-gold glow.

## Mechanics (all closed-form over piece time)

- **Grid advance:** every 20 s the next square in row-major order cycles.
  The completed square's landscape fades out while the new one fades in
  over the first 4 s of the slot — the breathing rhythm, 4 s out and
  4 s in, mapped to the fade cycle. The cycling square's border then
  etches across the rest of the 20 s slot, one glyph at a time,
  clockwise from the top-left.
- **Etch clock:** phase-shifted +8 s so frame one is already mid-etch
  (square 0, 40% etched, draw-head glowing on its right edge) rather
  than opening on an empty border.
- **Landscape generation:** each square's landscape is a seeded
  function of (cell, generation), where generation counts how many
  times that cell has cycled. Every cycle therefore brings a genuinely
  new landscape: sky wash, three harmonic-perturbed ridge fills, a
  wavy water band, an occasional pale disc, and sparse dark speckles,
  all in muted forest/river tones.
- **Border glyphs:** 28 per square (7 per side), drawn from 8 stroke
  types — bar, chevron, arc, dot pair, diagonal tick, staircase,
  triangle outline, cross. Each glyph gets its own `beginPath` per the
  node-canvas batching quirk.
- **Watch-only:** the script registers resize listeners only. No
  pointer interaction of any kind, no tap-to-advance, no captions, no
  buttons. The piece is witnessed, not operated.

## Adaptations

- Generative landscapes are seeded ridge/water-band functions on the
  main canvas (no pre-rendered textures, no offscreen canvas).
- Border etching is stroke-drawn glyphs with a moving draw-head,
  closed-form over piece time; crossfades are closed-form alpha
  functions, never canvas-fade.
- Fully silent: the piece contains no AudioContext at all.
- No readable English anywhere: border titles are pseudo-script only.
  One fix round: the first glyph set's zigzag read as Latin N/M
  shapes in the desktop render, so it was replaced with a stepped
  staircase mark; all renders were re-done after the fix.
- No gradients, no shadowBlur, no Path2D, no createElement, no
  getUserMedia. Canvas size from the Visual Viewport API, pinned in
  draw(); phone detection via window.screen with aspect fallback;
  field-like composition goes full-bleed on phones.

## Determinism

Frame one = `draw(0)` via boot flag; the rAF loop (plain function
declaration behind a `typeof` guard) starts the clock only after.
All randomness from mulberry32 (seed 1371000 + cell·7919 +
generation·131), never `Math.random`.

## Verification

- Rendered at 1280×900, 390×844, 720×720 and inspected all three;
  thumb byte-identical across repeated renders.
- Forced-time probe harness (stubbed rAF driving the piece's own
  loop): t=0 vs t=20 differs in cell 0 (border completing, 1,935 px)
  and cell 1 (landscape swap + etch, 18,501 px) while untouched cell 5
  differs by 0 px; the fade probes show cell 1 changing by ~36,000 px
  across each half of the 4 s crossfade (t=12→14, t=14→16) and only
  2,011 px (border etch alone) from t=16→20; a glow-ablation render
  (glow alphas zeroed) differs from the shipped render by 883 px in
  exactly the draw-head's 41×41 box at (412,167), confirming the
  cursor glow sits where the etch is happening.
- Token scan clean except one comment stating `Math.random` is never
  used; the two `requestAnimationFrame` mentions are both
  `typeof`-guarded.
