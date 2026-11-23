# №1626 "Disorder" (YL3, yi-wen-lin #214, PP872)

## Driver
A teal field covered in a dense copper thread nest, wrapped around two
perfect circular voids of clean teal. The web is chaotic; the voids are
absolute.

## Design
After his dialog() 2024 Taipei piece "Disorder": ground teal #2E8B84,
threads copper #C98B5E with alpha variation (0.28 to 0.90), voids
exactly the ground color. Nothing else. Square composition; the nest
fills the frame edge to edge; one void large (upper right, radius
0.165 of the field width), one smaller (lower left, radius 0.095),
both fully clear of thread. Threads are alive: new strokes keep
growing at the nest's edges while old ones hold. Drag: grab the large
void and move it; threads that touch it re-route around its rim, the
nest re-knits behind it. The small void stays fixed as an anchor.

## Mechanism
Thread agents walk a curl-noise field (two-octave deterministic value
noise, hash2 based) with a per-agent life of 80 to 300 steps. Each
agent samples the field at its own fixed offset, so agents do not pile
onto one shared streamline and rope together; heading follows the
field weakly (0.13) with a strong wander term (0.60), which is what
makes the nest read as tangle rather than flow. Void discs exert a
repulsion field: within 30 scaled px of a rim the heading bends
toward the tangent (weight up to 0.85), and an agent pushed inside
rim plus 6 px is pushed back out. Agents die when a step would cross
a rim, and the segment is never drawn, so no thread ever crosses a
void; the voids are also drawn last as flat ground-color discs, so
they are absolute by construction. Spawns are 45 percent near the
field perimeter and 55 percent uniform, never inside a void plus 12 px.
Drag (pointerdown within 1.15 radii of the large void, pointermove,
pointerup) moves the large void, clamped to the field, and spawns four
fresh agents at the trailing edge per move event, then advances the
simulation 60 steps, so the nest re-knits behind it. Growth after
frame one is 500 agent-steps per second of piece time; the segment
store caps at 120,000 segments, after which the nest rests.

## Frame-one determinism
Frame one is drawn synchronously at t = 0 with the nest pre-grown to
exactly PRE_STEPS = 60,000 simulation steps from mulberry32 seed
1626007. No Math.random, no wall clock anywhere; all motion is a
function of piece time. Verified: two independent 720x720 thumb
renders have identical md5 (1e900dd9348da9fa937ba2f4e3159391).

## Asserted counts (thumb probe, 720x720)
- Frame-one segments: 58,917 (of 60,000 steps; the rest died at rims
  or field edges without drawing).
- Concurrent agents: 180.
- Void purity: 0 non-ground pixels in 7,368 sampled pixels inside the
  large void (r 114, sampled to 0.85r) and 0 in 2,480 sampled pixels
  inside the small void (r 66).
- Ink coverage: 201,998 of 518,400 pixels (39 percent, including the
  title and hint plates).

## Deviations
- None from the prompt. The drag moves only the large void; the small
  void is fixed, as specified.

## Fix rounds
- Round 1 (2026-11-08, fly gate): first renders read as sparse
  flow-field rivers, not a nest: threads roped into thick bundles
  along shared streamlines and left large bare teal regions. Changed
  the field to a shorter wavelength (0.011 / 0.0055 scales, amplitude
  up to 2.2 PI), gave each agent its own field offset, weakened
  field-following (0.22 to 0.13) and strengthened wander (0.35 to
  0.60), raised pre-growth from 36,000 to 60,000 steps and agents
  from 130 to 180, life from 60-220 to 80-300 steps. Re-rendered all
  three sizes: the nest is now dense edge to edge on desktop, mobile
  and thumb, with no bare regions and no roping; both voids stay clean
  flat discs. Thumb re-rendered twice after the fix, byte-identical
  md5 1e900dd9348da9fa937ba2f4e3159391; index.html md5
  311dbfba0ad472738db832471cfd2077.
- No other fixes. Void purity, legibility, palette and hint all passed
  on the second inspection.

## House rules
Visual Viewport sizing with listeners on visualViewport and window;
canvas pinned in draw() via style width/height in px; phone detection
via window.screen with aspect fallback; square field-like composition,
full-bleed on phones, centred square (0.96 of min dimension) on
desktop with the page ground the same teal; one synchronous frame at
load; requestAnimationFrame guarded by typeof check; reduced-motion
support (static pre-grown frame, no growth loop; drag still moves the
void and re-knits on demand). Title "Disorder", date "2006 · 06 · 25"
(formula date 2002-01-10 + 1627 days), hint "Drag a void through the
nest." Title, date and hint sit on dark teal plates over the nest in
copper, in palette. No em dashes in visible copy. Flicker is not
applicable: nothing blinks or flashes; growth is continuous slow
motion at 500 steps per second, far below 14 Hz by construction.
