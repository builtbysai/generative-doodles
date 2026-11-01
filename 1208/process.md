# №1208 — Null_Sets

Amy Szczepanski study block AS1 (PP367), after Null_Sets (2012–13, Evan Meaney
+ Amy Szczepanski): texts run through a program written for a supercomputer at
UT's RDAV Center and printed as horizontal color bands — a gallery instrument
to "examine the size and structure of large-scale data sets through an
aesthetic lens." The color was determined by the JPEG standard, not chosen by
the artists. This piece is the wall of finished prints; №1204 "Null Sets"
staged the compiling itself, and the two share no staging beyond the source.

## Staging

A warm white gallery wall (#F4F2EC) with a skirting line along the floor.
Framed prints (walnut #4A3728, white mat) hang on one wall line, tops aligned.
The first print is the hero at ~42% of the wall width; later prints hang at
~24% beside it, wrapping to a second row when the wall fills. On phones the
hero spans the wall and the smaller prints stack two per row. Beneath each
frame sits a small label card carrying only the source text's title — no
explanatory wall text anywhere.

## The texts

Six byte strings are embedded in the piece, each ≥ 600 bytes:

1. "the US Constitution" — the Preamble and Article I, §§1–2, verbatim.
2. "a car insurance policy" — a plain declarations page written for the piece
   (parts A–D, limits, deductibles, premium terms).
3. "the human genome" — an ACGT stretch from the beta-globin (HBB) locus.
4. "Romeo and Juliet" — the opening Chorus and the balcony scene, verbatim.
5. "the Origin of Species" — Darwin's introduction, first paragraph, verbatim.
6. "Moby Dick" — the opening of Chapter 1, verbatim.

## The color doctrine (exact rule)

No color in any print is hand-picked or hand-placed. A fixed 10-entry
quantization table stands in for the JPEG tables of the original program:

| index | color |
|---|---|
| 0 | red #E5484D |
| 1 | orange #F76B15 |
| 2 | yellow #FFC53D |
| 3 | green #46A758 |
| 4 | teal #12A594 |
| 5 | blue #0090FF |
| 6 | indigo #6E56CF |
| 7 | magenta #D6409F |
| 8 | pink #FF4D6D |
| 9 | black #101010 |

Each print has 36 horizontal bands. For print *p*, passage offset *o* and
band *b* (0–35):

- take the 16-byte chunk at positions `(o + b·16 + i) mod len`, i = 0…15,
  wrapping inside the text's byte array;
- `sum` = the sum of those 16 bytes;
- hue index = `sum mod 10` into the table above;
- shade index = `floor(sum / 16) mod 3`, selecting a flat shade of that hue
  (×0.74 dark, ×1.00 base, ×1.22 light, channels clamped).

The glitch lives at the band boundaries: across the middle third (the top
edges of bands 12–23) each boundary is stair-stepped in segments 6–14 px wide.
Segment width is `6 + (byteA mod 9)` and the step offset is
`((bit3 of byteA) + (bit5 of byteB) − 1) × 0.34 × bandHeight`, where byteA and
byteB are bytes of the lower band's own chunk — the boundary bytes decide how
their boundary breaks. Outer bands keep clean edges. All fills are flat
rectangles; these are data prints, not paintings.

## Accumulation and the session cycle

- Print 1 (the Constitution) is on the wall from t = 0.
- A new print fades in (2.5 s) every 45 s: the policy at 45, the genome at 90,
  Romeo and Juliet at 135, the Origin at 180, Moby Dick at 225.
- When a print arrives, the layout recomputes and every print glides to its
  new slot over 0.6 s; older prints otherwise hold.
- After all six, the wall holds until t = 315 s, then fades out over 10 s.
  At t = 330 s the session cycle resets: the wall starts again from the
  Constitution alone. The full cycle is 330 s.

## Interaction

- Drag on a print (≥ 14 px): the print re-renders from a different passage
  of the same text — its offset advances by 512 bytes, wrapping inside the
  text — with a 0.5 s re-flow (bands jitter horizontally with a squared
  decay). Same text, new data.
- Drag across bare wall: the two prints nearest the drag's start and end
  swap slots, gliding past each other over 0.6 s.
- Nothing else is touchable. No typing, no input fields, no controls.

## Determinism and house rules

- Synchronous first frame at fixed phase T0 = 100 s: three prints hung —
  the Constitution hero at left, the insurance policy and the genome beside
  it, labels under each.
- All randomness is seeded integer hashing (no `Math.random`); every
  animated quantity is a closed-form function of piece time plus the
  recorded drag-event list. rAF is typeof-guarded; the first frame draws
  without it.
- Canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; CSS size pinned in fit() and in draw(); phone
  detection via `window.screen` (min dimension < 700) with the
  `h > w·1.15` aspect fallback.
- No gradients, no `ctx.filter`, no shadowBlur, no `document.createElement`,
  no ImageData, no offscreen canvas, no audio or microphone APIs. Silent.
