# No.869 "Chair, Parking Lot"

ZW7 / PP1269, study #263 zach-wolfe. Formula date 2004 · 05 · 29.

## Prompt summary

One absurd object in the most ordinary setting possible. A gaming chair
sits alone in an empty parking lot at midday, photographed from above,
a long shadow trailing it. Nothing is wrong and nothing is explained.
Palette: asphalt grey, faded lot lines, the chair's black-and-red
upholstery, hard daylight. Composition: overhead, the chair small in
the lot's grid, shadow as the second shape. Motion: the shadow creeps
with the sun; heat shimmer barely visible. TAP earned: tap to reseed a
new absurd pairing (another object, another ordinary setting); the
double-take is the whole image, so a fresh double-take is a faithful
refresh. Technical: a pairing generator (object list x setting list),
each pair placed in a procedural lot or street grid. Avoid: captions,
winks, any explanation of why the object is there.

## Palette

Asphalt grey #6b6f72 with a darker repair strip #585c5f, faded lot
lines #d8d8d2, oil stains near-black, chair black #121214 with red
# b2181c piping and centre stripe, cream #f2ede2 caption and hint on
dark scrim plates. Each pairing keeps its own ground (laundromat tile
pale green-grey, rooftop membrane tan-grey, sidewalk tan-grey with a
dark road, wheat gold, beach sand with a blue water band); the object
is always the one saturated thing in its setting.

## The six pairings

Fixed list, in order, tap cycles deterministically and wraps. No
random choice, no generated text beyond this list.

0. Gaming chair in an empty parking lot. Asphalt, two rows of faded
   bays, a dashed driving lane, manhole, drain grate, seeded oil
   stains. The chair: backrest with red centre stripe and headrest
   pillow, seat with red piping, armrest rails, five-star base spokes.
1. Armchair in a laundromat. Pale tiled floor, six washers along the
   top wall with round dark portholes (one red cycle light on), a
   folding bench, a floor drain. The armchair: rust body, backrest
   band, two cushion seams, lighter armrest rolls, on a faded mat.
2. Bathtub on a rooftop. Membrane with gravel speckle, a parapet band
   on all four edges, two vents, a pale skylight, a membrane seam.
   The tub: white shell, pale blue-grey basin, taps and knobs, four
   feet.
3. Grand piano at a bus stop. Sidewalk slabs, a glass-roof shelter on
   two posts with a bench, a blue sign pole, a road along the bottom
   with a dashed centre line and a kerb. The piano: curved body with
   lid seam, white keyboard strip with black ticks, three legs, a
   bench beside it.
4. Office desk in a wheat field. Gold ground with 320 seeded stalk
   strokes in two shades, a diagonal dirt track. The desk: wood top
   with drawer seams, dark monitor on a stand, keyboard strip, white
   paper, red mug, office chair circle behind it.
5. Vending machine on a beach. Sand, a water band along the right
   edge with a foam line, a striped towel, a footprint trail. The
   machine: red cabinet with a dark side edge, white brand strip,
   glass front with three rows of coloured snacks, coin slot and
   pickup flap.

## Build

- First frame: FIRST_T = 5 s into a 60 s cycle. The shadow angle and
  length are pure sines of (t - FIRST_T) / CYCLE, and the heat
  shimmer phase is a pure sine of the same phase, so the frame at
  FIRST_T + 60 equals the frame at FIRST_T exactly.
- Overhead plan view throughout. Every setting is a procedural grid
  drawn from fixed seeded tables (oil stains, gravel, wheat stalks,
  footprints, shimmer rows), all built once at load from
  mulberry32(SEED 869). No unseeded Math.random anywhere.
- Shadow: each object draws its own silhouette twice, flat dark,
  offset along the sun vector, a darker core at full offset and a
  fainter pass at 1.20x offset for a soft edge. The shadow angle
  creeps about 30 degrees plus or minus 9 degrees across the cycle,
  and its length breathes by 10 percent.
- Heat shimmer: six faint wavy white lines at alpha 0.05 in the
  lower half, drifting with the cycle phase. Barely visible, as
  specced.
- Tap interaction: pointerdown on the canvas advances the pairing
  by one, wrapping from 5 back to 0, and redraws at the current
  clock. Never click-to-reload. Visual-only: no WebAudio, no
  autoplay audio.
- Caption plate, in the template's place: "No.869 · Chair, Parking
  Lot", date "2004 · 05 · 29", hint "Tap for a new pairing." The
  ground changes with each pairing, from light sand to dark asphalt,
  so caption and hint sit on dark scrim plates (rounded rect at
  alpha 0.45, hint as a pill) to stay readable on every ground.
- House rules: Visual Viewport sizing with resize listened to on
  visualViewport and window; canvas element pinned in draw() via
  canvas.style.width/height in px; phone detection via
  window.screen (min dimension under 700px) with aspect fallback
  (h > w*1.15); field-like composition, full-bleed on phones and
  square on desktop. One synchronous frame at load, guarded
  requestAnimationFrame with a typeof check so node-canvas QA works.
- QA hooks: ?t= or ?seed= sets the virtual clock at load, ?pair=
  selects the pairing at load; window.__piece869 exposes firstT,
  cycle, pair(), setPair(i), tap(), draw(t).

## QA

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  desktop, 390x844 mobile, and 720x720 for thumb.png; all three
  inspected visually. Desktop renders as a square stage centred on
  the dark asphalt page ground; mobile is full-bleed portrait.
- Cycle check: the render at FIRST_T + 60 = 65 is byte-identical
  to the first frame (md5 f78b35b0cbe0bc72eafee4431a0a811f for both),
  so the loop seam is 0 px and frame one reproduces exactly.
- Pair probes (probe script /tmp/probe869.js, setPair then draw):
  all six pairings rendered at 720x720 and inspected visually.
  Each is distinct (md5s 14e41c3a, da56aa36, 08e07253, c2f52c23,
  cee30fb6, dce24e04) and each shows the named object in the named
  setting: chair in lot, armchair in laundromat, tub on roof,
  piano at bus stop, desk in wheat, vending machine on beach.
  Pair 0 via the probe is byte-identical to thumb.png.
- Tap probe: tapping seven times from pair 0 visits pairs
  0,1,2,3,4,5,0 in order; six taps from 0 returns to pair 0, so
  the cycle wraps.
- Fix round 1: the shadow's soft second pass at alpha 0.16 and
  1.35x offset read as a separate floating grey slab, not a
  shadow, in the first desktop and thumb renders. Softened to
  alpha 0.08 at 1.20x offset; re-rendered desktop, mobile and
  thumb, and re-ran all six pair probes. The shadow now reads as
  a dark core with a faint soft edge.

## Gallery note suggestion

"One absurd object in the most ordinary setting possible. Tap for a new pairing."

## Deviations

- The caption and hint sit on dark scrim plates rather than bare
  text on the ground, a deliberate departure from the sibling
  template: the ground changes with each pairing, and bare cream
  text would vanish on the sand and wheat grounds.
- The prompt says the shadow trails the chair; the shadow here
  trails down-right at about 30 degrees from vertical and creeps
  with the sun, which keeps the motion visible without breaking
  the midday overhead framing.

## Known warts

- On phones the chair is small in the tall full-bleed frame, about
  60 px wide at 390 px viewport width; it stays legible, but the
  five-star base spokes are barely visible at that size.
- The drain grate in the parking lot reads as an empty outlined
  rectangle; it is a grate, but at thumb size it could be mistaken
  for a stray mark.
- In pair 3 the piano's shadow falls mostly on the dark road, so
  it is barely visible there; the piano itself still reads clearly
  against the sidewalk.
