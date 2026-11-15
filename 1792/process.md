# №1792 "Overlapped Listening" (LE1, PP1039): process notes

EXPANSION #235 lawrence-english, opening piece. Date 2006 · 12 · 08.
Gallery note: "A roving sensor snaps the blurred hall into grainy detail. Drag to re-aim the sensor."

## What it is

A fixed architectural hall drawn once per frame: pale walls, a five-column
colonnade, two mullioned windows, an arched centre doorway, a narrow right
doorway left slightly ajar, and a perspective floor grid converging on a
vanishing point at the wall base. The whole field is rendered as a soft grey
blur. Over it roves a sensor circle, about one third of frame width, inside
which the same scene snaps into grainy black-and-white detail with visible
film grain. A single cold blue reticle (ring, four ticks, centre dot) marks
the sensor. The work is the moving overlap, not either layer alone.

## Palette

Warm greys for the blurred field (#CFC8B8 walls, #BFB7A4 floor, #B5AD99
columns), bone white (#EDE8DB) and near-black (#211F1C / #1E1C19) for the
detail layer, one pale bone white ground (#D6D0C2), and a single cold blue
(#5F7FA8) reserved for the reticle. No other colour appears.

## Sensor path (closed form, fixed phase)

Seven attraction points in normalized field coords, in order: left window
(0.17, 0.28), centre doorway (0.50, 0.40), right window (0.79, 0.28),
right doorway (0.66, 0.45), right floor corner (0.88, 0.82), left floor
corner (0.12, 0.82), centre floor (0.50, 0.76). Legs last 24 s each with
cosine easing, plus a slow wobble (0.012 amplitude, 53 s period in u;
0.010 amplitude, 71 s period in v), so the drift lingers on doorways,
windows and corners instead of covering the hall uniformly. Full cycle
168 s.

Frame one is fixed phase t = 60 s: leg 2 of 7, mid-leg from the right
window toward the right doorway, ease 0.5. Sensor centre at normalized
(0.7370, 0.3740), which on the 1280x900 desktop render is px (843.8,
341.7) with radius 146.2 px. The circle overlaps the lower right window
and the ajar right doorway, so grainy detail is visible inside (crisp
mullions, the dark doorway, the pale door edge) and blur outside.

## Grain

Fixed seeded speckle field: mulberry32(1792), 2400 speckles over the
field, 0.8 to 1.8 px, alpha 0.05 to 0.26, about one third light bone
specks and two thirds near-black. Wall texture strokes use mulberry32
(1793), 60 short strokes. Both are drawn only in the detail layer, so
the blur stays clean. No Date.now() or Math.random() anywhere; frame one
is byte-comparable.

## Interaction

Watch-first. Drag takes hold of the sensor and re-aims it: while held,
the drag offset chases the pointer (gain 6/s); on release it decays back
to the path with a 6 s time constant, as if the ear is still catching up.
Offset is clamped to plus or minus 0.35 in normalized units. Frame one
is pre-drag, offset zero. No click-to-reload, no tap to summon detail,
no UI chrome beyond the reticle.

## Technical approach and deviation

The spec calls for two canvases composited with a radial mask. The QA
harness (render-piece.js) shims a single canvas and has no
document.createElement, so the piece uses one canvas and two draw passes
of a single scene function instead: the blurred pass (low contrast, no
fine lines, no grain) fills the field, then the detail pass (crisp lines,
grain) is clipped to the sensor core, with a 16-ring crossfade at the
edge where the blurred pass is redrawn over the detail with alpha rising
outward. Same geometry in both passes, so the layers register exactly.
Canvas 2D only, no WebGL, nothing substituted. The soft edge is a true
crossfade of the two layers, not a gradient wash.

## House rules

Visual Viewport sizing with resize on visualViewport and window; canvas
element pinned in draw() via canvas.style.width/height in px; phone
detection via window.screen (min dimension under 700 px) with aspect
fallback (h greater than w times 1.15); field-like composition full-bleed
on phones, square on desktop; one synchronous frame at load; every
requestAnimationFrame call guarded by a typeof check; title, date and
hint plates drawn on canvas. No em dashes in visible copy. No
AI-signature copy.

## QA

Rendered from the actual script with node render-piece.js at 1280x900
desktop, 390x844 mobile, 720x720 thumb; all three inspected.

- Desktop: hall reads as a soft grey blur (walls, colonnade, floor grid,
  arched doorway); sensor circle over the right window and right doorway
  snaps into grainy black-and-white detail with the reticle ring, ticks
  and centre dot in cold blue; plates legible top left and bottom left.
- Mobile: same scene full-bleed portrait; sensor over the right doorway
  with detail visible; plates legible.
- Thumb (720x720): the 720 render itself; composition and sensor read
  clearly at gallery size.

Fix round after the first gate: the 7-ring crossfade showed faint
concentric banding where the dark doorway crossed the sensor edge, and
the grain was barely visible at normal viewing. Rings raised 7 to 16 and
grain raised from 2000 speckles at alpha 0.04 to 0.16 to 2400 speckles at
alpha 0.05 to 0.26. All three sizes re-rendered and re-inspected after
the fix; banding is gone at normal viewing and grain is visible in the
detail core. thumb.png is the 720x720 render.
