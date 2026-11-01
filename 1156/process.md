# №1156 — Sticker Shuffle

Antonio Roberts study block AR5, after *Sticker Book* (2019): illustrations
separated into individual parts and randomly rearranged — childhood sticker
books, distorted.

## The piece

Five invented sticker creatures live on a 6×6 slot grid over #111111, each
cut into convex polygon fragments with black sticker outlines:

- **Star** (#FFD23F) — four triangle points around a smiley-face center.
- **Blob** (#FF5C39) — two googly-eye blocks, a striped block, a smile
  block, and a downward drip.
- **Moon** (#3FC1FF) — a three-fragment crescent column: slanted top and
  bottom wedges around a thin sliver, so the left edge caves in.
- **Arrow** (#7CFF00) — a chunky right-pointing arrow; hazard-stripe shaft,
  plain head blocks, triangle tip.
- **Pink critter** (#FF7AD9) — an L-tromino with eyes, toe marks, and a
  white belly spot.

Details (eyes, stripes, smiles) are drawn clipped inside each fragment, so
they travel with the fragment wherever it lands.

## The shuffle

Watch-only, seamless 8-second loop, two discrete events:

- **t = 2.0s** — a precomputed seeded permutation swaps four fragment
  pairs (8 of 21 fragments, ~38%). Three swaps cross creature boundaries:
  star face ↔ blob eye, moon sliver ↔ arrow head, pink eyes ↔ star point.
  For the middle of the loop the field holds impossible hybrids: a
  one-eyed star, a blob wearing the star's smile, the moon's sliver
  standing alone mid-field.
- **t = 5.5s** — the identity permutation: everyone flies home, and the
  loop closes fully resolved.

Flights last 0.4s with ease-out-cubic easing — physical, never a teleport,
never a drift. Fragments always land exactly on slot-grid cells.

## Construction notes

- Fragment positions are a closed-form function of loop time: keyframed
  targets (home → permuted → home) with eased interpolation inside the
  0.4s windows after each event. No integrated state.
- Fragment polygons are precomputed data: seeded jitter quads
  (mulberry32, seed 1156005) for block fragments, fixed convex templates
  for points, wedges, and the moon sliver.
- Deterministic first frame at fixed phase T0 = 0.8s: all five creatures
  fully assembled, seams visible, before the first shuffle.
- House rules: Visual Viewport sizing with resize listeners on both
  visualViewport and window, canvas CSS size pinned inside draw(), phone
  detection via window.screen physical size (min dimension < 700px) with
  aspect fallback, synchronous first frame, typeof-guarded rAF anchored
  at T0 + elapsed. Flat fills only — no gradients, no ctx.filter, no
  shadowBlur, no offscreen canvas, no audio. No visible text except
  the title.
