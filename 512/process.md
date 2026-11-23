# №1622 "Sesame Spiral" (SP7, sableraph #213, PP869)

## Driver
A machine laying one grain at a time along a spiral; the rate and the
patience are the piece.

## Design
A top-down view of a spiral being drawn in tiny black grains (#141414) on
white paper (#FAF8F2), after a Dec 2020 AxiDraw-with-a-seed-dispenser video.
The grains fall one by one along an expanding Archimedean spiral path with
slight jitter; a faint pencil spiral guide (#D8D4C8) sits underneath. The
spiral is square and centred, growing to fill 85 percent of the frame, with
a generous paper margin. Nothing else is on the sheet. The dispenser head
is implied at the leading edge by a small open ring with a short stem,
parked on the newest grain while the machine is laying; it hides during
the rest. Meditative, granular, slow.

## Mechanism
All spiral geometry is computed in normalized field units (field = 1 x 1,
centre 0.5, 0.5), so the grain list and grain count are identical at every
viewport size. Each cycle is a pure function of its index: seed =
1622007 + n * 7919 through mulberry32, arms = 1 + floor(rng() * 3),
Archimedean r = k * theta with k = TURN_GAP / TAU (turn gap 1/13 of the
field, about 5.5 turns to radius 0.425). Arms are full spirals rotated
evenly around the centre and laid arm by arm, one continuous path per arm.
Grains are placed by walking each arm's polyline and dropping one grain
every STEP = 1/130 of arc length, each with seeded size jitter (0.7 to
1.3), rotation jitter (+-0.45 rad around the path tangent) and a small
cross-path position jitter. Grains are drawn as individual filled
ellipses (own beginPath per grain, moveTo before each ellipse, per the
node-canvas batching quirk). The pencil guide is the full spiral path for
all arms, stroked thin underneath. Laying rate is 8 grains per second;
when the last grain lands, the machine rests 10 seconds, then a new cycle
begins with a different arm count and jitter seed. Cycle 0 has 3 arms and
2,886 grains, so one cycle lasts 370.75 seconds (about 6.2 minutes).

## Frame-one determinism
Frame one is drawn synchronously at t = PHASE, where PHASE is computed at
load from the generated cycle 0: PHASE = floor(total / 3) / RATE =
120.25 seconds, so exactly 962 of 2,886 grains are on the paper, one
third of the cycle. That is arm 0 complete (one full spiral) with the
dispenser head parked at its outer end; the faint guide shows the two
arms still to come, so the sheet reads as a machine partway through its
work, not a finished spiral. All parameters are seeded (mulberry32 only;
no Math.random, no wall clock), and the animation clock is a fixed phase
plus elapsed time, so the first frame is byte-reproducible. Verified: two
independent 720x720 thumb renders have identical md5
(16f3d48c27448df37882d095074bd845).

## Watch-only
No pointer listeners of any kind, per the spec: you watch the machine
work, like the video. Reduced-motion renders the same static frame-one
phase with no animation loop.

## Deviations
- None from the prompt. The dispenser head is a drawn ring-and-stem mark
  rather than a photographed nozzle, which is the only way to imply it in
  this medium; it stays subtle and never competes with the grains.

## Fix rounds
- Round 1: the first mobile render (390x844) stretched the spiral into a
  tall ellipse, because normalized x was scaled by field width and
  normalized y by field height in a tall phone field. Fixed by centring
  a square drawing area (S = min(field.w, field.h)) inside the field and
  mapping both axes through it, for the guide, the grains and the head.
  Re-rendered: mobile is now a proper circle, desktop and thumb md5
  unchanged (their fields were already square).

## House rules
Visual Viewport sizing with listeners on visualViewport and window;
canvas pinned in draw() via style width/height in px; phone detection via
window.screen with aspect fallback; centred square sheet on desktop with
the page ground set to the piece's own paper color (#FAF8F2) and dark ink
hint; full-bleed on phones with the field inset from the title and hint
strips; one synchronous frame at load; requestAnimationFrame guarded by
typeof check; reduced-motion support (static frame at PHASE). Title
"Sesame Spiral", date "2006 · 06 · 21" (formula date), hint "Watch the
machine work." No em dashes in visible copy.
