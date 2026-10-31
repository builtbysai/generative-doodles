# 1965/1966

EXPANSION #97 niele-toroni, prompt block PP8 "1965/1966".

## Concept

A split field divided by a hard vertical wipe line. Left of the line is
1965: the pre-method Toroni, a near-black ground carrying a gestural
lyrical composition of nested squares and free strokes in vermilion,
teal, black and pale. Right of the line is 1966: warm white and the
first imprint grid, cobalt dabs of the No. 50 brush at regular
thirty-centimetre intervals in a brick-offset lattice. The line itself
is the year 1966, the moment Toroni stopped composing and started
stamping. Drag it horizontally to re-decide the break; leave it alone
for five seconds and it breathes, plus or minus two percent of the
frame width on a ten-second sine, around wherever it was left. There
is no click action anywhere and no text in the piece: the piece is the
argument.

## Construction

Single self-contained index.html, canvas 2D, no external assets. Both
sides are drawn full-frame on every frame and clipped by the wipe
position (left: rect from 0 to the line; right: rect from the line to
the frame edge), so the seam is the raw abutment of the two grounds.
No blending, no seam stroke, no gradient anywhere.

The gestural composition is parameter data, not per-frame invention.
One mulberry32 stream (seed 799101) is consumed once at setup and
produces three nests of squares (six, three and three squares; each
square stores centre, size, a rotation of a few degrees, colour, stroke
width, and sixteen seeded wobble offsets, one for each interior point
of its four edges) and thirteen free bezier strokes (control points,
colour, width, alpha). At draw time each square's corners are computed
in pixel space from its centre as a fraction of the frame and its size
as a fraction of the smaller dimension, so the squares stay square at
any aspect; edge points are interpolated along the sides and nudged
perpendicular by the stored wobble, giving the hand-drawn tremble while
the corners stay decided. Because the data is fixed, the painting is
identical on every load, as a painting is.

The imprint grid reuses the dab construction of No.792 (Thirty
Centimeters): a solid banded body, near-opaque through the upper
two-thirds where the brush pressed and easing toward the dry bottom
edge, cobalt bristle ridges and ground-coloured gap scores inside it,
a dense load cluster at the top edge. One seeded set of sixteen
imprints (seed 799201), all fully pressed, on the same exact
brick-offset lattice as No.792 (pitch = smaller dimension / 5.4, dab =
half a pitch, field centred). Placement is never jittered; the hand
lives only in the texture.

The wipe is a closed-form function of recorded drag samples. Pointer
events (pointerdown on the canvas, pointermove and pointerup on the
window) are recorded as samples {t, fx} on the piece's own timeline:
seconds since load, position as a fraction of frame width, clamped to
a margin (6 percent of width, 10 percent on phones). The line position
at time t is piecewise-linear interpolation between the samples, the
last sample held after release; the idle breath is added once t minus
the last event time exceeds five seconds. No state is integrated frame
to frame. Frame one is the synchronous draw at t = 0 with no samples,
so the seam sits exactly at centre, and the animation clock is elapsed
time since load, never a wall clock. Samples are capped at 4000 (the
oldest dropped) to bound memory in an endless drag session.

Sizing follows the house rules: canvas size from the Visual Viewport
API with resize listeners on both visualViewport and window, canvas
CSS size pinned in pixels inside draw(), phone detection via
window.screen (minimum dimension under 700 px) with the aspect
fallback. Page ground is the left ground tone #0E0D0B: a single CSS
background cannot split, and the dark tone is the piece's first fact.

Palette notes: black strokes use #1A1A1A, the near-black family of the
left ground lifted just enough for the strokes to read on #0E0D0B, as
the brief allows. No other tones are introduced; all variation is
alpha within the palette.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and compared with cmp:
  byte-identical. The duplicate was deleted.
- Desktop read-back: left half near-black with nested wobbled squares
  (vermilion outermost, then pale, teal, ink, vermilion, teal) and
  sweeping bezier loops; right half warm white with bristle-streaked
  cobalt dabs in brick offset; the seam is a hard vertical at centre
  with strokes and dabs cut exactly at it, no blending.
- Mobile read-back (390x844): the split holds in the tall frame, the
  nests and lower-left group read on the left, four dab rows on the
  right, nothing essential clipped.
- Wipe check: a throwaway copy with the anchor fraction patched from
  0.5 to 0.25 was rendered at 1280x900 and read back: the painting
  clips hard at the quarter line and the full 4x4 grid is revealed on
  the right, dabs sliced cleanly at the seam. The throwaway copy and
  render were deleted after inspection.
- Deviations: none from the prompt's substance. Two recorded choices:
  the black of the left palette is #1A1A1A rather than a pure black
  (the brief's own allowance, so strokes read against the #0E0D0B
  ground), and the page ground is the single dark tone rather than a
  split (a CSS background cannot split; the canvas itself carries the
  full split at every size).
