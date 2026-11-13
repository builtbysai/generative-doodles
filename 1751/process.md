# №1751 Beat Box (ZM8, PP998): process notes

Studio-zimoun #229, final piece of the study. Built from the verbatim TASKS.md prompt (PP998).

## Palette (hand-picked from the prompt's named colors; studies/studio-zimoun.md does not exist)

- Warm studio white ground: #F2EDE3
- Kraft tan boxes: #C9A06B, light #DDBB8A, dark #A97F4E
- Motors black: #1A1712, motor tick in ground color
- Tick band soft grey: line #B9B2A4, whiskers #8A857C far from the listener, #4A453C near it
- Plates: #E9E2D2 with kraft rule, title ink #2E2417, hint ink #6B5636

## Composition

Two plain cardboard boxes anchor the left and right margins at ear height
(band y = 0.52 of viewport height). Box width is clamped 34 to 96 px
(0.075 of viewport width); on a 390 px phone render the boxes are 34 px
wide and stay fully visible. Between them runs a narrow band of 48 ticking
whisker units. The rest of the frame is empty by design. Title/date plate
top left, drag hint plate bottom left; neither covers the band or the boxes.
No headphone arc, no product-shot styling: the boxes are flat kraft
rectangles with a tape strip, two screws, and a black motor disc.

## Band and units

48 whisker units, seeded mulberry32(1751), jittered position along the
band, phase uniform on 0..2pi, tick frequency 5.5 to 9.0 Hz, length factor
0.65 to 1.35, random up/down orientation. Each whisker is a line from the
band center line, swinging with angle
sin(2pi * (freq * t) + phase) * (0.35 + 0.65 * intensity). Whisker length
and alpha both scale with intensity, so the swarm visibly thickens and
darkens around the listener. Whisker phases are closed-form functions of
piece time, never wall-clock or Math.random().

## Listener falloff

Intensity is a Gaussian around the listener fraction of the band:
intensity = 0.25 + 0.75 * exp(-((frac - listener) / 0.09)^2), sigma = 0.09
of band width, floor 0.25. Probe numbers at frame one, listener centered
at 0.5, desktop 1280x900 (band x 144.64 to 1135.36, y 468):

- intensity at listener (0.50): 1.0000
- intensity at one sigma (0.59): 0.5259
- intensity at two sigma (0.68): 0.2637
- intensity at band edges (0.00 / 1.00): 0.2500

Drag probe: dragTo(0.20) plus 40 ease steps moves the listener to 0.2000;
intensity at 0.20 becomes 1.0000 while the old center 0.50 falls to
0.2500, so the peak follows the dragged position. Drag targets clamp to
0.04..0.96, so the listener can never leave the band. Drag is pointerdown
plus pointermove with buttons held; easing is dt-based (rate 7/s) in the
animation loop. Motor ticks run on the band edge phases: the left motor
uses unit 0, the right motor unit 47, each tick rotating at twice the
unit angle.

## Determinism

Frame one is fixed phase t = 60.0 s, listener centered at 0.5. One
synchronous frame is drawn at load; every requestAnimationFrame call is
guarded with a typeof check. Reduced-motion preference is respected.
Visual Viewport sizing with resize listeners on both visualViewport and
window; canvas element pinned in draw() via style width/height in px.
Phone detection via window.screen (min dimension under 700 px) with the
aspect fallback (h > w * 1.15). Field-like layout: full-bleed at every
size, composition in viewport fractions.

## QA

Rendered from the actual script with node render-piece.js at 1280x900,
390x844, and 720x720; all three inspected visually.

- Desktop 1280x900: boxes at both margins, full band between them,
  listener ring centered, intensity peak visible near the listener,
  plates clear of the band.
- Mobile 390x844: both boxes visible at the margins, band and listener
  legible, plates clear.
- Thumb 720x720: same composition, byte-identical to a fresh 720x720
  render (md5 212b7ae5984c27076f30eb257f5062b0).

Fix round: first renders had whiskers too faint, especially on the phone
render, so whisker length went from (10 + 12 * len) to (13 + 15 * len)
with a 6 px floor, alpha floor from 0.30 to 0.34, and line width floor
from 0.8 to 0.9 px. Re-rendered all three sizes after the fix and
re-inspected; thumb.png is the post-fix 720x720 render.

## Deviations

None from the prompt. The listener marker is a small dark dot with a
ring on the band center line, added so the listening point is visible;
the prompt calls the listener part of the instrument and the marker keeps
it inside the band. Gallery note: "Two motor boxes at the ears, a
ticking swarm worn at head scale. Drag to shift where you listen."
Gallery date: 2006 · 10 · 28.
