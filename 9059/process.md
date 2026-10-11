# №9059 · Crosscurrent - process notes

## Concept
After Fidenza: a flow field as the base, thick shapes laid over it, collision
checks so nothing overlaps, a probabilistic palette, turbulence as a
parameter, margins kept. The turn is my own: two families share one current
on a mid-tone ground. Dark ink ribbons and pale carved ribbons ride the same
field and interleave without touching, so figure and ground trade places as
you look. Ribbon tails fray into strands. Sedimentary palette: wet slate,
iron rust, deep moss, near-black umber against bone, pale clay, mist, all on
a warm taupe the two families can push against.

## Construction
- Single self-contained page, canvas 2D, no libraries. mulberry32(seed);
  default seed 9059. ?seed= shareable; click mints a new current.
- Field: domain-warped value-noise fbm, 3 octaves. Turbulence picked per
  seed: slack 0.12 (rare, near-straight), low 0.65, medium 1.45, high 2.6.
- Ribbons: two-sided walk from a random seed point, smoothed turning,
  step S/420, up to 700 steps per side. 72x72 occupancy grid; a ribbon
  stops at the margin, at a foreign mark, or when it runs out of field.
  Rejected if it starts on a foreign mark or ends too short.
- Scale classes: hero (12%), standard (63%), fine (25%). Wide ribbons
  must earn their width with length (min length scales with width), which
  killed the tadpole failure mode.
- Color: family first (dark 55 / light 45), then weighted pick inside the
  family. Widest ribbons drawn first so they sit underneath.
- Tails fray into three thin strands in a tone of the ribbon color.
- Whole-field retry if fewer than 14 ribbons place, so sparse seeds never
  ship. 3500 grain speckles, restrained.

## Iteration
- v1: ribbons fine, but wide short ribbons read as tadpoles. Added the
  width-scaled minimum length; compositions got cleaner immediately.
- v2: fray strands splayed too wide (spider-leg look). Tightened the
  spread from +-0.38 to +-0.27 rad and shortened them slightly.
- Checked seeds 9059, 424242, 777001, 271828: high-turbulence seeds stay
  composed, slack seeds read as calm parallels.

## Differentiation
Checked against built pieces. №8980 Wind Bent displaces rings with a
modulator field (not a flow-field curve piece); №8935 Standing-Wave Hatch
is hatched lines. No piece does thick flow-field ribbons, and none uses
the two-family dark/light interleave on a mid-tone ground. Concept family:
"two-tone flow ribbons, collision-checked, frayed tails." Distinct from the
unbuilt FUTURE_PIECES seed 5 (Field Notes), which is a straight flow-field
study; this one commits to the interleave idea instead.

## QA log
- console-doodles.js: zero console/page errors at 1280x900, four seeds.
- Rendered headless; actual pixels inspected for default seed and three
  reseeds plus a high-turbulence seed.
- Responsive: full-viewport canvas + resize; holds at mobile widths.
- thumb.png: 720x720 crop of the square from the live render.
- Visible copy check: no em dashes, no date strings, no absolute URLs.
