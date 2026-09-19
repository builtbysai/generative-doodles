# xdesro: Study Notes (deep, all four pens)

**Profile:** codepen.io/xdesro | Henry Desroches, front-end developer
**Pens in queue:** jOEKdge, abbRRQp, wvvYzjP, PooyoKo
**Status:** 2026-09-19, all four studied deeply. The first pass (2026-09-18) had
only jOEKdge done; the other three were blocked by codepen.io edge failures.
This pass read all three pen sources in full via the cdpn.io debug views and
re-rendered each with plain canvas (no canvas-sketch dependency) to verify the
reading; all three re-renders were visually inspected.

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

## abbRRQp: "#03 - Sweeney" (DEEP, source read in full)

Inspired by interfacelovers' Spotify playlist covers. Clicking re-renders.

What it looks like (from the re-render): a big black-stroked circle on
white, six black dots sitting at random angles on the circle's
circumference, connected as three straight chords pairing dot 0-1, 2-3,
4-5.

Technique (read from the pen's actual JS):
- canvas-sketch with a plain `sketch` closure; click handler calls
  `render()` for a fresh seedless reroll.
- Radius = width/4, circle stroke 12px black. Six points: uniform random
  angle each, placed exactly ON the circle (`cos(a)*radius + cx`).
- Dots drawn as filled circles radius 15. Then a thin (5px) polyline
  pairs them: `if (index % 2 == 0) moveTo else lineTo; stroke`. The
  beginPath/moveTo on even indices is the whole trick for discrete
  chords instead of one connected path.
- Nothing fancy: uniform random angles, two stroke weights (12px circle,
  5px chords), one fill color. The seeded part is Math.random, so every
  click is a new composition.

What makes it sing: the constraints are ruthless. One circle, dots only
on its rim, only pairwise chords, black on white. Because every element
is pinned to the circle, any random draw still reads as intentional. It
is the same lesson as the polar-grid pen: anchor randomness to one
strong structure and the noise turns into pattern.

What to take from it (study, not copy): random points ON a circle
(rather than in it) paired by chords gives a wireframe-constellation
feel with almost no code. The even/odd moveTo trick for discrete chords
is a handy idiom. Click-to-reroll is the simplest interactivity and
worth copying: it turns a static sketch into a toy.

## wvvYzjP: "#01 - Tran" (DEEP, source read in full)

What it looks like (from the re-render): an upright equilateral triangle
built from layered translucent gray triangles, like a faceted crystal or
a low-poly gem. The overlapping fills stack into bands of light and
dark gray on white.

Technique (read from the pen's actual JS):
- 1000x1000 canvas-sketch. An equilateral-triangle helper that ignores
  its centerX/centerY arguments entirely (a real bug in the source, but
  harmless: points are origin-relative and everything is positioned by a
  later `translate(width/2, height/2)`).
- Clip discipline: draw the big triangle path, fill it with
  hsla(0,0%,0%,25%), then clip. That first fill doubles as a base wash.
- Three more triangles drawn inside the clip with the SAME 25%-black
  fill still set, so overlaps accumulate: single-layer regions are light
  gray, double overlaps darker, triple darkest. Pure painter's algorithm
  opacity stacking, no gradients, no noise.
- The three triangle vertex sets are hand-coded offsets (some coordinates
  multiplied 1.5x/2.5x), deliberately pushing parts outside the clip so
  the clipped edges stay crisp. An unused `constraints` array sits in the
  source; dead code from an earlier version.

What makes it sing: one translucent color doing all the work. There is
no palette at all, just alpha compositing of the same gray. The facets
read as folded paper or cut stone. It is a masterclass in how far
opacity stacking can go before you ever touch hue.

What to take from it (study, not copy): clip-then-layer with a single
low-alpha fill is a cheap way to get faceted, gem-like forms. The
pre-clip base wash unifies everything. And the ignored-args bug is a
reminder that generative sketches survive plenty of sloppy code, as long
as the geometry reads.

## PooyoKo: "#156 - Saville" (DEEP, source read in full)

Named after Peter Saville (the Joy Division cover designer), which fits:
thin lines, geometry, restraint. Clicking re-renders.

What it looks like (from the re-render): a hexagon outline in dark gray,
3px stroke, with six random chords crisscrossing inside it. Reads like a
blueprint or a wireframe study.

Technique (read from the pen's actual JS):
- 1024x1024 canvas-sketch. Regular hexagon via a `createPolygon`
  helper: N vertices at cos/sin multiples of 2PI/N, rounded to ints.
- The chord trick is `lerpFrames(hexagon, Math.random())` from
  canvas-sketch-util: it lerps a parameter t in [0,1) along the whole
  closed polyline BY ARC LENGTH, returning a point on the perimeter.
  Two random perimeter points per chord, six chords, all stroked #222.
- Arc-length sampling matters: sampling by segment index would bias
  toward vertices in irregular polygons. Here the hexagon is regular so
  the difference is small, but it is the right habit.

What makes it sing: same discipline as Sweeney, one level up. The chords
can only start and end on the hexagon's rim, so the interior chaos stays
legible. Six chords is the right density: four would look empty, ten
would be mush.

What to take from it (study, not copy): perimeter sampling (lerp along a
polyline by arc length) is a reusable primitive for chords, spokes,
bridges, anything tethered to a boundary. Pair it with an interior
container (circle, hexagon, any polygon) and random draws stay composed.

Avoid-list: nothing new. All four pens are honest minimalism. If
anything, the series shows the failure mode to watch: without the
container discipline these would be random scratches; the containers are
the art.
