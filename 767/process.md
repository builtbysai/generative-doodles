# No.767 Standing Wall

EXPANSION #93 larry-bell, prompt block 8 "Standing Wall".

## Concept

Three tall laminated-glass panes from Bell's Venice Fog palette stand in a
white room: Sea Salt mist, lapis, French blue. The panes are angled to each
other so they overlap on screen, and where they overlap the color is not a
transparency trick but the arithmetic itself: light multiplied through two
laminates. Lapis over mist gives steel blue; French blue over lapis gives
deep indigo. Dragging walks the viewer around the wall; the panes swing in
parallax, the overlaps grow and shrink, and each pane's interference tint
shifts with its angle to the fixed light. Untouched, the view drifts slowly
on its own. The piece is the overlap arithmetic, so the overlaps are exact.

## Construction

- Palette, strict: Sea Salt mist #D8D4C8, lapis #2E4A7A, French blue
  #3D6FA8, True Blizzard #B9D0DC, zinc #8E9499, Cornflower #6F8FC8. The
  room is derived from the mist/Blizzard family only: wall = the 50/50 mix
  of Sea Salt and Blizzard tinted 85 percent toward white; floor = the same
  mix tinted 66 percent. Nothing else is drawn except white at low alpha
  for glass dressing.
- Panes: three rectangles 1.95 wide by 3.0 high (about 60 percent of frame
  height) standing on the floor plane y = 0 in a shallow zigzag: centers
  x = -1.02 / 0.12 / 1.24, yaw 20 / -7 / 16 degrees, with small depth
  offsets (z = 0.28 / -0.02 / -0.32) so the freestanding panes coexist
  while still overlapping on screen at rest. Two overlap zones show at
  orbit angle 0.
- Projection: a real perspective camera. The camera orbits the target
  (0.1, 1.75, 0) at distance 7.6 and height 0.9; basis vectors are built
  from cross products (right = fwd x up, up = right x fwd), focal length
  1.45 x min(viewport w, h), screen point = center + f * (v / vz). The
  floor is drawn as the polygon under the projected horizon line (two far
  floor points at y = 0), which lands at the lower third; the horizon gets
  a zinc hairline at 22 percent alpha.
- Overlap blending, geometric and exact: each pane projects to a convex
  quad. Pairwise overlap polygons are computed with Sutherland-Hodgman
  convex clipping (clip one quad against the other), and the triple
  overlap, when the orbit creates one, by clipping the pairwise result
  against the third quad. Colors are multiply blends per channel:
  single pane = room x laminate; pair = room x laminate A x laminate B;
  triple = room x A x B x C. Because multiply is commutative, draw order
  cannot corrupt the result: full quads first, then the pairwise polygons
  over them, then the triple. At rest this yields steel blue
  (about #273E60 before the room factor) for lapis x mist and deep indigo
  (about #0B2050) for French blue x lapis, as the prompt specifies.
- Interference tint: per pane per frame, a thin-film approximation. The
  phase is sin(cosT * 4.2 + paneIndex * 1.1), where cosT is the pane
  normal against the half-vector of the fixed light (azimuth -38 degrees,
  elevation 52 degrees; the light never moves) and the view direction.
  Positive phase mixes the laminate up to 20 percent toward Cornflower,
  negative toward Blizzard: a tint that travels as you orbit, never a
  recolor.
- Glass dressing, drawn after the overlap fills and clipped per pane, all
  low alpha so the exact overlap colors stay legible: a zinc foot strip
  (contact shading, v < 0.14, alpha 0.08), a white head strip (the lit top
  of the laminate, v > 0.94, alpha 0.08), and a sheen band (white, alpha
  0.055) whose pane-local position follows the orbit angle. Zinc keylines
  at alpha 0.38 outline each pane so the pale mist pane stays defined
  against the white room; each top edge gets a lighter stroke of its own
  tinted laminate. No bevels, no gradients, no shadowBlur.
- Floor shadow: each pane's base edge swept across the floor away from
  the fixed light by (PANE_H / lightY) * 0.8 of the light's horizontal
  direction, filled with the dominant pane hue (lapis) in two passes
  (alpha 0.13 full sweep, 0.10 half sweep) for a soft tinted shadow.
- Motion, all closed-form: theta(t) = dragPart(t) + 10 degrees *
  sin(2 pi t / 60 s) idle drift. Drag maps horizontal pointer travel at
  0.002 rad/px, clamped to +-1.15 rad. On release, inertia is the closed
  form part + (vel / 1.6) * (1 - exp(-1.6 * dt)), with the release
  velocity clamped so the asymptote stays inside the drag range. Pointer
  samples are recorded with frame-clock times; no state is integrated
  per frame, so any t reproduces exactly.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas CSS size pinned in px in
  draw(); phone detection via window.screen min dimension under 700 px
  with the aspect fallback; the wall scales to the frame via the
  min-dimension focal length; the page ground is the room white. No
  visible text except the title. No audio, no microphone. rAF is
  typeof-guarded; frame one is the synchronous draw at t = 0 and is never
  derived from Date.now() (no Date.now anywhere in the file).

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and cmp byte-compared identical;
  the duplicate was deleted.
- Read-backs: desktop and thumb show the three panes standing in the
  white room, horizon at the lower third, panes about 63 percent of frame
  height. Left to right: mist alone, steel blue (mist x lapis), lapis
  alone, deep indigo (lapis x French), French alone: both specified
  overlap blends present and visibly darker and bluer than either parent.
  Mobile keeps the full wall inside the tall frame, nothing clipped.
- Orbit check: a throwaway copy forced to t = 15 s (idle drift at +10
  degrees) renders the wall swung with parallax: overlaps resized and
  shifted, interference tints moved, shadow wedge extended, no clipping
  artifacts. The throwaway files were deleted.
- Fix round: the first pass read too slab-like at the tops and the floor
  shadow was nearly invisible. Head strip narrowed (v > 0.94) and dropped
  to alpha 0.08, top-edge stroke softened (alpha 0.65, 2 px), foot strip
  to 0.08, shadow passes raised to 0.13 / 0.10. All renders redone and
  the byte-compare re-run green after the fix.

## Deviations

- None from the prompt's substance. Two construction choices recorded:
  (1) overlap colors are multiplied through the near-white room color as
  well as the laminates, since the viewer sees room light through the
  glass, not the laminate in a void; the specified steel-blue and
  deep-indigo relationships are unchanged. (2) The panes carry small
  depth offsets in a shallow zigzag (see Construction) so three
  freestanding panes can overlap on screen without intersecting in the
  world; the prompt's angled, overlapping arrangement is preserved.
