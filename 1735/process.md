# Process: №1735 The Endless Shelf (PP982, greyfade GF8)

Completes EXPANSION #227 greyfade. Watch only. No interaction, no click to reload.

## Prompt as built

A shelf card styled like a record catalog page. Its background is an 8 by 3 grid
of shuffled numbers. The numbers quietly re-sort themselves forever while the
card stays fixed. The album never ends because it is a generator, not a
recording. Card centered with margins, number grid filling its face, a single
title line at the bottom. Canvas 2D, 24-number array, clean grotesque type.

## Palette

The study file studies/greyfade.md does not exist in the repo, so the hexes
below were hand-picked from the prompt's named colors and are recorded here:

- dark sleeve brown, page ground: #2A1D12
- card face, a lighter sleeve brown: #3B2A1B
- numerals, bone white: #EDE6D6
- signal-orange rule: #E85D1F, the only orange in the piece
- muted catalog text: rgba bone white at 0.55
- title and hint plates: #241811 with a bone hairline, text in bone white

## Fixed phase and swap cadence

Frame one is fully deterministic. The opening grid comes from a seeded
mulberry32(1735) Fisher-Yates shuffle of 1 to 24, with simTime 0 and no swap
yet applied. Opening grid, rows top to bottom:

- 24 11 13 5 6 16 7 3
- 9 18 14 23 19 20 21 17
- 1 8 2 12 22 10 4 15

Swap cadence: one swap every 3.5 seconds, each swap gliding over 0.9 seconds.
The swap schedule is a pure function of the swap index, never Math.random or
wall-clock time. Swap k is seeded by mulberry32(1735 * 7919 + k). Each 40-swap
epoch runs 30 sort-biased swaps followed by 10 re-shuffle swaps. In the
sort-biased phase the swap picks one adjacent inversion at random from the
current grid, so the grid drifts toward sortedness. In the re-shuffle phase it
picks any valid adjacent pair, so the order breaks up again and the loop never
settles or repeats on a human timescale. Adjacent pairs never cross a row
break, so a swap always trades two numerals side by side in one row. The
first three swaps, verified by probe: 13 with 5, then 11 with 5, then 7 with 3.

## Deviations from the prompt

None material. Two small build choices, both inside the prompt's intent:

- The swapping pair trades places on a small vertical arc, one numeral lifting
  while the other dips, so the two numerals pass without ever overlapping.
  A straight horizontal glide was tried first and the pair collided mid-glide
  into an unreadable jumble. The arc keeps every numeral readable at all times.
- The card carries the catalog line "GREYFADE · PP982 · SIDE A · 24 TRACKS"
  under the orange rule, and the house title and hint plates sit outside the
  card, top left and bottom left, as in the №1732 template the piece mirrors.

## House rules

Visual Viewport sizing with resize listened to on visualViewport and window.
Canvas element pinned in draw() via canvas.style.width and height in px. Phone
detection via window.screen with the aspect fallback. Centered card keeps its
shape on phones, page ground set to the piece's own sleeve brown. One
synchronous frame at load. All requestAnimationFrame calls guarded by a typeof
check. No em dashes in visible copy. Reduced-motion users get the static frame
one card.

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js and
read all three outputs:

- Desktop 1280x900: full 8 by 3 grid legible, orange rule and title line in
  place, title and hint plates clear of the card, no collisions.
- Mobile 390x844: card keeps its shape, all 24 numerals legible at 22 px,
  title line fits, plates clear.
- Thumb 720x720: same frame, clean. thumb.png is this render.
- Mid-swap frame at t 3.95 s, probed through window.__probe.drawAt: after the
  arc fix, 13 lifts and 5 dips past each other with both numerals fully
  readable. Before the fix they overlapped into a jumble, which is why the
  arc was added.
- Determinism probe: two full runs produce identical grids at t 0, 3.6, 7.1
  and 10.6 seconds, one swap each 3.5 seconds, and every probed grid is
  exactly the set 1 to 24.

## Gallery

- Date: 2006 · 10 · 12 (formula date 2002-01-10 + 1736 days)
- Note: "A catalog card whose 24 numbers re-sort themselves forever. Watch only."
