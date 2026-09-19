# xdesro: Study Notes (PARTIAL: jOEKdge deep, 3 pens blocked)

**Profile:** codepen.io/xdesro | Henry Desroches, front-end developer
**Pens in queue:** jOEKdge, abbRRQp, wvvYzjP, PooyoKo

## Status
2026-09-19. One pen studied deeply, three blocked. jOEKdge rendered and
was visually inspected through the CDP screenshot rig, and its technique
was reconstructed and re-rendered in p5.js to verify the reading against
the original pixels. The pen's actual source code could not be read:
codepen.io served intermittent ERR_EMPTY_RESPONSE failures and
Cloudflare blocks through the egress proxy on every later request, and
the same failure hit abbRRQp, wvvYzjP, and PooyoKo on all retries.
Everything about those three pens is unverified. Revisit when the
network path is healthy.

## jOEKdge: polar grid of grayscale cells (DEEP, technique reconstructed)

What it looks like: a square field of concentric rings divided into
radial segments, each cell filled with a flat grayscale tone, thin white
gaps between every cell, and a small white circle at the center.
Counting the cells in the render: 18 angular segments, 7 rings, 126
cells. Tones run from near-white to near-black, randomly distributed
per cell.

Technique (reconstructed from the pixels, not read from source):
- Polar subdivision: for each ring, for each angular segment, draw one
  annulus sector (outer-arc vertices, then inner-arc vertices back,
  closed path). This is the classic "grid, but make it radial" move. It
  does the same compositional job as a square grid with a warmer,
  woven feel.
- Random fill per cell: uniform random grayscale, roughly 20 to 235.
  No apparent noise field or ordering rule; pure randomness. The piece
  works because the grid discipline holds the chaos in.
- Gaps as design: a white stroke (about 3px on a 720px canvas) between
  all cells. The gaps are load-bearing. Without them the tones would
  bleed into a muddy disc. The white center hole closes the composition
  and gives the eye a resting point.

The reconstruction (18 segments, 7 rings, random gray 20-235, white
gaps, white center) reproduced the original's structure and texture
closely, which is why this is marked deep rather than preliminary.

What makes it sing: restraint. One grid, one random variable, one gap
width, no color. The tonal variety across 126 cells builds a texture
that reads as woven cloth or cut stone from a few feet back. This is
the same lesson as the fxhash gallery notes: a tight constraint plus
one random parameter beats cleverness.

What to take from it (study, not copy): polar grids as a default
alternative to square grids for any cell-based doodle. White gaps
instead of dark strokes for a lighter, printed feel. The center-hole
trick for radial pieces: an unresolved middle ruins an otherwise clean
radial composition.

Avoid-list: nothing new. The piece is honest about what it is.

## abbRRQp, wvvYzjP, PooyoKo: BLOCKED
No artwork inspected, no code read. Repeated load attempts failed at the
network edge (codepen.io returning empty responses and Cloudflare blocks
through the egress proxy, 2026-09-19 ~07:10-07:30 EDT). This is not a
judgment on the pens, purely an access failure. Next session: retry the
debug views, screenshot all three, and read the inline scripts via CDP
when a load succeeds.
