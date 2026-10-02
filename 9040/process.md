# №9040 · Crows on a Wire, process notes

Five crow silhouettes perched on a gently sagging wire in the lower third;
a sixth caught mid-takeoff just above, wings raised, loose ink strokes
trailing for motion. Big empty sky. The charm is the point: a moment you
actually saw.

## Technique

- Print voice throughout: warm paper gradient, monochrome ink, generous
  margins, wobbly hand-drawn plate frame, 5200 grain dots, subtle vignette.
- Crows are parametric silhouettes, not clip art: body and head drawn as
  noise-wobbled ellipses (hand-drawn edges, never vector-perfect), beak as a
  small triangle, tail as a tapered quad, legs as short strokes with toe
  ticks gripping the wire. Five postures: alert, hunched, preening (head
  bowed), tall alert, sleepy. One crow per seed faces the other way.
- The wire is a shallow parabola with per-point noise wobble, drawn twice
  (confident dark pass + faint wide pass) for a hand-inked feel.
- The flying crow: horizontal body, fanned three-feather tail, two raised
  wings built as broad shapes with notched trailing edges (primary-feather
  separations), plus four loose motion strokes trailing below at low alpha.
- Viewport-invariant layout in fixed 1000x1000 units; seeded RNG
  (mulberry32); click reseeds via ?seed=.

## QA (2026-10-02, local, isolated Chrome :9342)

- `node --check` on extracted script: clean. No em dashes anywhere.
- CDP fail-closed exception probe: zero exceptions, zero console errors.
- Rendered at 4 seeds (1701, 424242, 777001, 90210) and inspected every
  one: all composed, crows recognizable in each, wire elegant, no crow
  clipped by margins, flying crow clearly airborne in all four.
- Desktop ~850px and mobile 390x844 inspected: square print centers, no
  overflow, caption holds.
- Two code fixes before QA: removed a dead wireY line; fixed the flying
  tail direction (facing dir had been squared away, tail always trailed
  left).

Default seed 1701: the flying crow sits centered with clear motion strokes
and the perched five show the widest posture variety.
