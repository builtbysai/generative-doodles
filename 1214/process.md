# №1214 — Something Containing Nothing

Amy Szczepanski study block AS7. "Null sets provide an antithetical foundation
for there to be something." The null set, staged: an empty-set outline alone in
a void, filled from nothing until it holds a complete Null_Sets print — at
which moment the outline is gone.

## The cycle (122 s)

- **0–90 s, emergence.** The ∅ outline (ring + slash, #2A2A30) hangs large at
  center, diameter 0.74·H. Inside it, the 48 horizontal bands of a Null_Sets
  print assemble one by one, each sliding/fading in over 1.2 s from an 8 px
  vertical offset. Arrival order is a seeded permutation of the 48 bands,
  re-seeded every cycle.
- **Arrival curve.** Per-band arrival time is piecewise-linear in the band's
  rank r in the permutation, through the anchors r=0→0.5 s, r=3→20 s,
  r=11→40 s, r=23→65 s, r=47→90 s. So the staged counts land exactly:
  **4 bands by t=20, 12 by t=40, 24 by t=65, all 48 by t=90.**
- **The outline fades with completion.** Its alpha is 0.5·(1 − arrived/48),
  and is exactly 0 the moment all 48 bands are in. Nothing about it lingers.
- **90–120 s, hold.** The completed print simply sits in the void.
- **120–122 s.** Everything fades to the void; a new cycle begins with a new
  permutation. Nothing → something → nothing.

## Computed color, never chosen

The print's 48 flat bands are computed from the bytes of the U.S. Constitution
(preamble + Article I excerpts, embedded verbatim). Each band owns an equal
chunk of the byte stream: chunk sum mod 10 indexes the study's fixed
quantization table (#E5484D #F76B15 #FFC53D #46A758 #12A594 #0090FF #6E56CF
#D6409F #FF4D6D #101010), and the chunk's byte-mean mod 3 picks a flat shade
(×0.70 / ×0.86 / ×1.00). No white is used anywhere in the piece.

## Bit fragments

Tiny 0/1 glyphs (green #2F9E57, gray #55555E, ~10 px) flicker briefly at the
top edges of bands near the current arrival frontier — ranks frontier−3 to
frontier+3, hash-stepped — the data arriving. Sparse by construction: a
handful visible at any moment, none during the hold.

## Tending the set

Dragging is recorded as pointer samples and folded into per-band state; the
frame is always a function of (time, recorded samples).

- **During emergence (gather):** a drag advances the arrival of every band
  whose rectangle lies within 40 px of the stroke, by up to 6 s scaled by
  proximity (permanent for the rest of the cycle, max over strokes wins).
- **During the hold (push):** bands near a stroke are pushed out — they drift
  away from the print's midline and fade over 1 s, stay out until 4 s, and
  return by 5 s. The set re-completes itself; the tending is temporary.

The viewer tends the set, never commands it. No text, no counters, no
controls.

## House rules

- Single self-contained canvas file; no external assets; silent.
- Everything is computed per frame on the main canvas from the text bytes and
  seeded hashes (mulberry32 + a sine hash). This replaces the prompt's
  offscreen-render/SVG sketch: no offscreen canvas, no `document.createElement`,
  no gradients, no `ctx.filter`, no shadowBlur, no ImageData, no microphone,
  no `Math.random`.
- Sizing from the Visual Viewport API with resize listeners on both
  visualViewport and window; the canvas CSS size is pinned in draw();
  phone detection via `window.screen` (min dimension < 700 px) with the
  h > w·1.15 aspect fallback (phones widen the print to 80% of the width).
- Determinism: the first frame is drawn synchronously at the fixed phase
  **T0 = 52 s** — mid-emergence, 17 bands in place inside the still-visible
  outline — and the rAF loop (typeof-guarded) is anchored as T0 + elapsed.
  The thumb byte-compare passes: two 720×720 renders are identical.
