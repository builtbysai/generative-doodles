# No.791 Sail Race

EXPANSION #96 daniel-buren, prompt block PP8 "Sail Race" (Toile/Voile - Voile/Toile, 1975-82).

## Concept

A regatta of pure stripe. Three tall triangular sails, each white canvas
banded with a single color (red, green, blue), cross a flat warm-gray
field on parallel diagonal lanes running bottom-left to top-right. There
are no boats, no water texture, no horizon detail beyond a single line
at the lower third: the sails are canvas planes, and the race is the
stripes overtaking each other. Each sail drags a faint trailing echo of
itself, the wake, at low alpha. Watch-only; wind, not motors.

## Construction

- Single self-contained index.html, canvas 2D, strict palette only:
  sail white #F4F1EA, red #C8102E, green #2FA84F, blue #2F6BC0,
  ground #D8D4CC, horizon #B9B2A4.
- Lanes: the visible lane segment runs from (0.08W, 0.92H) to
  (0.92W, 0.12H), extended 20 percent past both ends so the wraparound
  (u crossing 1 back to 0) always happens off-frame. Lanes are offset
  perpendicular to the travel direction by 0.15 x min(W, H). On tall
  phone frames the segment starts higher (0.88H) so the lowest lane's
  sail and foot stay inside the frame.
- Speeds (integer-ratio, seamless 48 s loop): lane parameter
  u = frac(u0 + laps x t / 48) with laps per loop of red 1, green 2,
  blue 3 (one crossing per 48 s, 24 s, 16 s respectively). Because the
  lap counts differ, faster sails lap slower ones and overtakes happen
  naturally; because they are integers, at t = 48 every sail is exactly
  where it started. Starting offsets u0: red 0.33, green 0.47,
  blue 0.59, spread along the lanes so frame one has all three sails
  visible and non-overlapping.
- Sail shape: a triangle in a local frame (tack at origin, head above,
  clew trailing). The leech edge (head to clew) is sampled in 24 steps
  and pushed outward along its normal by amp x sin(pi x f), f the
  height fraction; amp = 0.16 x sail height, breathing between 0.78 and
  1.08 of itself on the sail's own integer billow cycle (3, 4, 5 cycles
  per loop for red, green, blue, with fixed per-sail phases). The luff
  edge bows at 0.22 of the same amplitude. Stripes are nine uniform
  horizontal bands alternating white and the sail color, clipped to the
  sail path.
- Wake: each sail is redrawn at u - 0.030 and u - 0.065 with alpha
  0.14 and 0.06, a trailing stripe echo that fades behind it.
- Sizing: canvas from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas.style.width/height pinned in px
  inside draw() every frame. Phone detection via window.screen
  (min dimension < 700px) with aspect h > w x 1.15 fallback. Page ground
  is the ground tone. Sail height is 0.38 x min(W, H) on desktop,
  0.34 on phones.
- Determinism: frame one is the synchronous draw(0) at load; all
  positions and billows are closed-form functions of t on the 48 s
  loop, with no Date.now and no runtime randomness. rAF is
  typeof-guarded.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png), 720x720 (thumb.png). thumb.png rendered
  twice and cmp byte-compared: identical. Duplicate deleted.
- First pass failed read-back: the travel span was a full
  corner-to-corner diagonal plus large margins, leaving the red and
  blue sails off-frame at t=0. Lanes were rebuilt as an inset segment
  extended 20 percent past its ends, and starting offsets re-spread
  (red 0.33, green 0.47, blue 0.59). Second pass: on the tall phone
  frame the lowest lane's sail still clipped the left edge and dipped
  under the horizon; lane separation reduced to 0.15 x min dimension,
  lane start raised to 0.88H on phones, red's offset moved to 0.33.
- Final read-back: desktop and thumb show the three sails spread
  across the field, red lowest-left, green center, blue upper-right,
  none overlapping, each with two fading wake echoes trailing
  down-left, horizon line at the lower third. Mobile shows all three
  sails fully inside the tall frame, nothing clipped. No text besides
  the title, no hulls, no water texture.

## Deviations

- One, minor: each sail carries a hairline edge stroke in its own
  palette color at 40 percent alpha (16 percent on the wake echoes).
  Without it the white bands dissolve into the pale ground and the
  canvas plane loses its edge; the stroke uses only specced colors and
  keeps the sail reading as a flat plane rather than a shape pasted on
  the field. Recorded here per house rules.
