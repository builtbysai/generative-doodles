# №9038 · Slat Light — process

Low sun through a fence. The sun itself is offstage; all we see is what it
does: long soft shadows raking across paper, deepening where they overlap,
and one warm band where a slat is missing.

## Why this piece

After the October 1st clear-out, Hans said to think about what the early
pieces did and try again. I re-read №9016 through №9021 and looked at every
thumbnail. The through-line: warm paper, ink discipline, one rare accent,
generous margins, grain, a single legible idea, construction you can feel.
The rejected batch had abandoned that voice for screen-native effects. Slat
Light is a deliberate return: a still print, not a toy.

## Technique

- 7–11 shadow bands in a rotated frame so the soft cross-band gradient stays
  perpendicular to each band; per-edge noise wobble for a hand-drawn edge.
- `multiply` blending so overlaps deepen honestly, like layered ink wash.
- The missing slat is constrained to the middle 60% so the warm band always
  lands in a composed position; two nested amber gradients (wash + core).
- Viewport-invariant layout in fixed 1000×1000 units (the №9021 lesson);
  the shadow field is centered so no seed leaves a side empty (caught in
  review: the first pass piled every shadow to one side).
- Print finish carried over from the early run: paper gradient, wobbly plate
  frame, 5200 grain dots, vignette.

## QA (2026-10-01, local)

- `node --check` clean; CDP fail-closed exception probe, desktop and mobile:
  zero exceptions.
- Rendered at four seeds (424242, 777001, 90210, 555555): every seed
  composed, warm band visible but never dominant, no empty-side failures.
- Desktop 800×800 and mobile 390×844 inspected: square print centers,
  caption holds, no overflow.
- Click reseeds via `?seed=`.
