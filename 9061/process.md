# №9061 · Underdrawing - process notes

## Concept
After Hobbs on process and incompleteness: every finished piece hides the
scaffolding it was built on. This one shows the scaffolding, then paints
over it. A pencil underdrawing (grid, guide circles, a diagonal, tick
marks) fades in first; the raw flow field draws itself as ink lines; then
broad strokes follow the same field, each stroke laid as 60-90 fine
parallel lines with a noise push and pull, until the construction is buried
under paint and only the finished field remains. The guides fade last. The
final frame is a soft painterly flow-field in madder, ochre, umber, slate
and bone on gesso, with the ink drawing peeking through the paint. Animated
(~11s), then holds. Click rebuilds from a new seed; ?still=1 jumps straight
to the finished frame.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32(seed);
  default seed 9061. ?seed= shareable; click mints a new build.
- Two canvases: the base (progressive drawing) and a guide overlay faded
  with CSS opacity, so guides never touch the paint.
- All geometry is precomputed from the seed; the animation only reveals.
  Jobs are {t0, t1, draw(frac)} with incremental drawing, so frames stay
  cheap: field lines as partial polylines, paint strokes line-by-line.
- Field: low-frequency domain-warped fbm, turbulence 0.5/1.1/2.0 per seed.
  64 ink lines walk a jittered 8x8 grid.
- Paint: 30-38 strokes; each stroke walks the field, then lays its lines
  with staggered ends and edge taper so strokes read as dry brush, not
  bands. Line alpha 0.09-0.16.
- Three radial-gradient glaze washes unify the field at the end.

## Iteration
- v1: paint too pale and banded; hard straight stroke edges. Fixed with
  staggered line ends, edge taper, more lines per stroke (60-90), higher
  alpha, wider strokes. The dry-brush read arrived in v2.
- v2: found a real bug via mid-animation probe: renderFrame cleared the
  guide canvas every frame, so the underdrawing never showed. Removed the
  clear; guides now fade in, hold, and fade out as designed.
- Checked stills for seeds 9061 and 5150 plus mid-animation frames at
  2.6s and 4.8s: the narrative reads (grid, then ink, then paint).

## Differentiation
Checked against built pieces. The only animated pieces are systems
(Congregation-style); nothing does a one-shot construction animation, and
nothing uses the soft-shapes stroke technique (dozens of fine parallel
lines with noise modulation). Concept family: "revealed construction:
underdrawing, then paint." Visually distinct from №9059 Crosscurrent
(crisp ribbons on taupe) and №9060 Hundred (flat geometry).

## QA log
- console-doodles.js: zero console/page errors at 1280x900.
- Rendered headless; actual pixels inspected for two finished stills and
  two mid-animation frames; ?still=1 verified identical to the animation's
  end state.
- Click rebuild verified (new seed, animation restarts, no leftover
  state); resize restarts cleanly.
- Responsive: full-viewport canvas + resize; holds at mobile widths.
- thumb.png: 720x720 crop of the square from the finished still.
- Visible copy check: no em dashes, no date strings, no absolute URLs.
