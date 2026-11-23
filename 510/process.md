# №1620 "Birb Study 47" (SP5, sableraph #213, PP867)

## Design
A variation sheet of the birb primitive: thirty small round hand-drawn birds on
paper (#F7F5EF), each slightly different, after the 2021-09-14 "birb ink blot
study." Crude ink lines (#1C1C1E) with slight stroke alpha variation, no
polish, the sheet of a doodler testing a primitive. Exactly one bird carries a
small red heart (#D43A2E), placed off-center as the accent; nothing else is
red. Birbs sit in a loose 6x5 grid with heavy jitter, sizes varying 1x to
2.5x, some overlapping neighbours and some cropped by the frame edge, so the
sheet feels pinned-up, not typeset. A few stray ink specks dot the paper.

## Parametric birb model and seeded variation
Every birb is a pure function of its clutch index and slot, drawn from
mulberry32; there is no Math.random anywhere. Per birb: grid slot, centre
jitter (+-0.28 cell each way), scale 1 to 2.5, facing direction, beak tilt
(+-0.55 rad), eye gap and eye drop, tail length and fan, wing-tick angle,
line weight, stroke alpha (0.72 to 1.0), three wobble phases, bob amplitude /
period / phase, leg splay. The body is a closed stroke sampled at 26 points
with radius wobbled by low-frequency sums of sines (3, 5 and 9 cycles around
the body), plus a second partial pass at 45% alpha and 3% larger radius for a
sketchy double stroke. Beak is two short lines to a tilted tip; eyes are two
filled dots; tail is three flicks at the back; wing is a short arc on the
flank; legs are two splayed lines. The heart is a filled bezier heart above
the heart-birb's body, rotated by a seeded amount. The heart-birb index is
drawn from the clutch seed and re-rolled if it lands in a centre cell (row 2,
cols 2-3), so the accent is always off-center.

## Frame-one determinism
Frame one is drawn synchronously at t = PHASE = 1.0s. All birb parameters are
pure seeded functions of the clutch index; the idle bob is a closed-form
sine of piece time with a fixed first-frame phase, so the first frame is
byte-reproducible. Verified: two independent 720x720 thumb renders have
identical md5 (62b6079dc673e5f25e98d82968ca0b24).

## Tap to hatch
Tap anywhere (pointerdown only, no drag or pointermove handlers) hatches a
new clutch: the clutch counter increments, the new clutch is generated from a
fixed seed sequence (seed = 1620007 + n * 7919, never Math.random), and the
sheet cross-fades from the old clutch to the new one over one second
(smoothstepped alpha, FADE_S = 1.0). The heart re-seeds with the clutch, so
exactly one heart appears per clutch at a new seeded position. Verified in a
node harness: dispatching pointerdown and advancing piece time past the fade
produces a visibly different clutch (different byte length) with exactly one
red component. Idle motion is a soft out-of-sync bob (amplitude 1.2 to 3.4 px,
period 2.2 to 4.6 s per birb); reduced-motion renders a static frame.

## Deviations
- None from the prompt. The heart-birb in the shipped first clutch sits in
  the bottom row (row 4, col 2), off-center as specified.
- The wing tick sometimes reads as a small smile on the body; that is the
  crude hand-drawn character of the primitive, left as drawn.

## House rules
Visual Viewport sizing with listeners on visualViewport and window; canvas
pinned in draw() via style width/height in px; phone detection via
window.screen with aspect fallback; centered square sheet on desktop with the
page ground set to the piece's own paper color and dark ink hint; full-bleed
on phones with the birb field inset from the title and hint strips; one
synchronous frame at load; requestAnimationFrame guarded by typeof check;
reduced-motion support (static frame at PHASE). Title "Birb Study 47", date
"2006 · 06 · 19" (formula date), hint "Tap to hatch a new clutch." No em
dashes in visible copy.
