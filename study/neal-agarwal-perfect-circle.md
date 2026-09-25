# Neal Agarwal: Perfect Circle

**Site:** https://neal.fun/perfect-circle/
**Author:** Neal Agarwal, neal.fun (same doorway as The Deep Sea,
studied the same session).
**Status:** 2026-09-25, deep. Full game source recovered from the Nuxt
chunk and read end to end. Scoring math, stroke rendering, sound hooks,
and the idle attract loop below are verbatim from the bundle. Live
verification: a scripted wobbly circle was drawn through real CDP
pointer events and scored 89.3%; the result frame was visually
inspected at 1280x800. Zero console errors.

## What it is

"Can you draw a PERFECT CIRCLE?" One dot in the middle of a black
page. Draw a circle around it in one stroke. The game scores your
circle live, painting each segment of your stroke in a color that says
how good that segment was, and shows a glowing percentage when you
finish. Tweet/Copy buttons share the score; a t-shirt link is generated
from your actual drawing (POSTed as SVG to perfect-circle.neal.fun).

## The technique

Coordinates are normalized to a 1000-unit square. The center dot is
fixed at `z = {x: 500, y: 500}`.

**The oath.** Your first touch point fixes the ideal radius `r`. There
is no curve fitting, no least squares. The game judges every later
point against the promise your own hand made at the start.

**Per pointer move:**
- Moves under 6 units are ignored.
- Stroke width comes from speed: `w = 1.5 + 2 / (0.05 + speed)`,
  smoothed `(3 * stroke + w) / 4`, capped at 20. Fast is thin, slow is
  thick. The pen has a physical feel for free.
- Angle around the center is tracked; the delta is normalized to
  +/-180. The first move sets the direction; reversing direction kills
  the run ("Wrong way"). Coming within 30 units of the center kills it
  ("Too close to dot").
- Per-sample accuracy: `C = 1 - |((radius + newRadius) / 2 - r) / r|`,
  clamped at 0. The running average radius is compared to the ideal,
  so a slow drift outward forgives itself less than a quick wobble.
- Each segment is drawn as a cubic bezier with velocity-smoothed
  control points, stroked in `D(C)` at the speed-derived width. The
  drawing IS the score visualization, not a separate meter.
- `c` accumulates swept angle (capped at 360), `d` accumulates
  angle-times-accuracy. Score = `min(round(1000 * d / c), 999)`. The cap
  at 999, never 1000, is a deliberate tease.
- Sound: a draw loop whose volume is `min(C * speed / 75, .15)`.
  Steady and true is audible.

**The color scale** `D(e) = hsl(clamp(480 * (e - .75), 0, 120), 100%,
40 + .2t%)`: red at .75 and below, yellow at .875, green at 1.0, with
lightness rising with accuracy. The stroke glows, so green segments
bloom and red ones smolder.

**The rules around the edges:** under 335 degrees of sweep is "Draw a
full circle" (no arcs). A 7-second timeout auto-ends the stroke ("Too
slow"). Score tiers: 999 "Perfect circle", 990+ "Divine circle", 980+
"Legendary circle", 950+ plays a cheer, otherwise "New best score".

**The attract loop.** Before the first draw, `demoAnim` draws a
near-circle by itself: radius `280 + 85 * sin(...)`, angle steps with
cosine wobble, +/-50 positional wobble, stroke width relaxing toward
`16 - 300 * step`, colored by `D` like a player stroke. About 491
frames, then it stops. It is a machine showing off, and it is also the
onboarding: watch what good looks like, then try to beat it.

## What makes it sing

The first-point-fixes-radius rule is the design masterstroke. Fitting
would forgive; the oath does not, and it makes the game feel fair
because the ideal was yours. Painting accuracy back onto the stroke
turns failure into the prettiest part: my scripted wobbly circle came
back as a neon ring with orange bruises exactly where the wobble
function peaked, and the 89.3% in glowing pixel type felt earned. The
sound coupling (volume from accuracy times speed) gives the pen a
voice without any UI.

## Avoid-list

999-not-1000 is cute once and annoying forever; it is a retention
mechanic wearing a joke. The whole game lives or dies on pointer
fidelity, so trackpads and phones are second-class. And the judgment
is purely radial: a beautiful non-circular closed curve scores badly
by design, which is correct for this game and a trap if borrowed for
another.

## Seeds

85. **Radius Oath** : a draw-a-shape game built on the oath rule. Your
first touch fixes the ideal; everything after is judged against it,
and the stroke paints its own accuracy back as color. Success: a bad
drawing still looks gorgeous.
86. **Wrong Way** : the no-reversal rule as the whole game. One
continuous line, never lift, never reverse; the score is swept angle
times accuracy. Success: the tension of the unbroken line is the
entire experience.
87. **Attract Loop** : an idle canvas that performs when untouched.
The machine draws near-perfect shapes to invite the visitor; the
moment they touch, it stops and becomes the judge. Success: the idle
animation alone holds attention for thirty seconds.
