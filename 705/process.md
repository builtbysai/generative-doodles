# No.705 - Hot Spot

EXPANSION #86 mona-hatoum, prompt block 2 "Hot Spot". After Mona Hatoum's
*Hot Spot* (2006): a human-height steel globe whose continents are traced in
red neon wire, the whole planet standing as a single danger zone.

## Concept

Blackness, and in it a dark steel globe that fills about 70% of the frame.
The oceans are near-black metal; the only light is the red wire itself,
laid along the continent outlines and humming with a soft bloom. The globe
turns almost too slowly to notice, one full rotation in 90 seconds, so the
danger zones drift past like weather. Drag sideways and the globe spins
under your hand, then eases back into its slow drift when you let go. Tap,
and a spark pulse runs along one continent's wire and fades: a fault
lighting up, briefly, somewhere on the planet. No labels, no borders, no
blue: continents only, and the wire is the whole statement.

## Construction

- **Palette (strict, six tones, nothing else):** background #08080A, globe
  body #16161A, latitude/longitude frame #2E2E36, continent wire #FF2A1F,
  bloom #FF5A3C at low alpha, wire joints #B01A12.
- **Continent dataset:** hand-authored, hand-simplified [lon, lat]
  polylines written from general world-map knowledge and deliberately
  reduced to readable silhouettes: North America (55 points), South
  America (36), Africa (46), Madagascar (9), Eurasia as a single loop
  (121), Greenland (15), Australia (38), and Antarctica as an open arc
  (13). Continents only: no country borders, no island chains, no labels.
  Each closed loop repeats its first point at the end.
- **Projection:** orthographic. Each [lon, lat] point becomes a unit
  sphere point with the longitude rotated around the Y axis by the
  current rotation angle; screen x/y come straight from the rotated
  coordinates and z is the facing test, which gives correct
  foreshortening for free. Segments are clipped exactly at the limb
  plane (z = 0) by interpolation, so wires end cleanly at the edge of
  the disc instead of leaving gaps or overshooting.
- **Wire rendering:** the far hemisphere is stroked once in the wire tone
  at alpha 0.07, faded to near-invisible through the steel. The facing
  hemisphere glow is built from layered strokes (no shadowBlur, no
  gradients): a 5 px bloom pass at alpha 0.14, a 2.6 px bloom pass at
  0.20, then the 1.7 px core line in #FF2A1F at 0.95. Wire joints are
  small #B01A12 dots at each facing polyline vertex, their radius
  swelling slightly toward the disc centre with the foreshortening
  factor z.
- **Graticule:** parallels and meridians every 20 degrees in #2E2E36,
  alpha 0.5 on the facing side and 0.10 on the far side, under a 1 px
  rim stroke around the body disc.
- **Rotation:** a closed-form function of the anchored clock plus
  recorded interaction state: angle(t) = base + 4 deg/s x (t - baseT) +
  a fling term, spin x tau x (1 - exp(-(t - spinT)/tau)) with tau = 1.6 s,
  so a released drag decays smoothly into the permanent slow drift and
  the drift always resumes from the dragged angle.
- **Drag:** horizontal pointer movement converts pixels to degrees at
  the globe radius and folds the delta into the anchored rotation state;
  a smoothed release velocity (clamped to +/-140 deg/s) becomes the
  fling term.
- **Tap spark:** a tap (under 0.35 s, under 6 px of travel) increments a
  tap counter; a mulberry32 stream seeded by that counter picks the
  continent (any landmass except the open Antarctic arc). The spark is a
  bright bloom segment, 22% of that wire's total arc length, whose head
  crosses the whole polyline in 1.6 s with a sine fade envelope, plus a
  small head dot; arc-length fractions are precomputed per continent in
  lon/lat space, and the spark path is limb-clipped like the wire.
- **Determinism:** frame one is the synchronous draw at t = 0 with every
  interaction state at zero, which is exactly rotation 0, the Atlantic
  view: Africa centred, the Americas on the left limb, Arabia and India
  entering at the right. No Date calls anywhere; the clock is
  performance.now anchored at boot, and the rAF loop is typeof-guarded.
- **House rules:** canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas.style.width and
  height pinned in px inside draw(); phone detection via window.screen
  physical size (min dimension < 700) with the tall-aspect fallback only;
  the globe radius is 0.35 x min(W, H) at every size, so it keeps about
  70% of the smaller dimension on phones; page ground is the background
  tone. Canvas 2D only, no external assets, no text except the title.

## QA log

- Rendered with the headless node-canvas renderer at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. The duplicate render was deleted. A later comment-only
  edit to the source was re-rendered and byte-compared again: still
  identical.
- Phase checks via the piece's inert ?seed=tNN hook (scratch renders,
  read back, then deleted): t=22 (90 degrees, Asia centred) shows the
  India triangle, Southeast Asia, Australia and the African east coast
  on the left limb, all recognisable; t=45 (180 degrees, Pacific
  centred) shows Australia lower left, the Siberian coast upper left,
  and North America correctly foreshortened against the right limb with
  its east coast on the far side, as a real globe reads from the
  Pacific.
- Read-backs: desktop, mobile and thumb all show the dark globe with a
  faint graticule and unmistakably readable continent outlines in
  glowing red wire on the Atlantic view; on mobile the globe sits
  centred in the tall frame, nothing clipped.
- Grep audit: no Date, no Math.random, no createElement, no
  AudioContext, no shadowBlur, no external URLs, no em dashes in the
  delivered file.

## Deviations

- The spark's travel is measured in arc-length fractions computed in
  lon/lat coordinate space rather than in true great-circle distance;
  at this stylisation the difference is invisible, and it keeps the
  spark a pure function of tap time.
- Antarctica is drawn as an open wire arc at about 70 degrees south
  rather than a closed continent loop: its outline is mostly a
  coastline facing the pole, and an open arc reads better at the bottom
  of the disc. It is excluded from spark targets for the same reason.
- Greenland is included as its own landmass loop; at the frame-one
  Atlantic view it reads as a small wire oval near the top of the disc,
  which matches how reduced neon-tube versions of the work simplify it.
