# No.498 Slash Races

EXPANSION #60 giulia-tassi, prompt GT2. Her Curtoni-twins canvas as a system.

## Concept

One thick white diagonal slash splits the canvas into a flat green half
(left) and a flat red half (right). Two racers in cornflower-blue suits
with red bibs ride the slash down-slope, bodies angled to follow it.
Outline-only name blocks sit in each half parallel to the slash: IRENE in
navy outline on the green, ELENA in bright bib-red outline on the red.
Halftone white dot fields fill the negative space of both halves, dense
near the outer edges and fading toward the slash; the green field is
weighted to the lower-left, the red field to the upper-right. Fine white
dots speckle the blue suits; each racer wears one tricolor sleeve patch.

Palette (flat fills only, no gradients): green #47AE65, red #B93439,
slash white #FFFFFF, suit blue #5E79D0, navy #3D5577, bib red #FE0000,
skin #F8F5F0.

## Construction

- Single self-contained index.html, 2D canvas, no external assets.
- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas.style.width/height pinned in px on
  every draw. Phone detection via window.screen (min dimension < 700px)
  with an aspect fallback; the composition keeps its shape on phones and
  the page ground is the green.
- The slash frame is defined by a rest angle of 135 degrees (line at
  -45 degrees) plus a spring offset. The halves are drawn as a green
  ground, a rotated red rect, and a rotated white band rect (8% of
  canvas width). All other elements (dot classification, names, racer
  anchors) are computed in slash coordinates (u along the slope, v
  across it) from the same frame, so everything tilts together.
- Racers are parametric figure rigs drawn in a unit space (figure
  height = 1) via setTransform with the slope basis: tapered-quad
  skis with upturned tips, bent shins and thighs, a leaning torso, a
  red bib panel on the chest front, swept-back arms, a ski pole, and
  her face grammar (near-white skin circle, flat navy hair block, arc
  eye, L-nose tick). Suit speckle dots are seeded points placed by
  bilinear interpolation inside the torso back and thigh quads, so
  they always land on the suit, never on the bib or face. The sleeve
  patch is three small quads (green, white, red) laid across the near
  upper arm. Racer heights are 30% and 26% of canvas height, capped
  at 62% of canvas width so phones keep the composition.
- Name blocks use strokeText only (bold Arial), rotated to run
  parallel to the slash, sized by measureText so the block spans
  35% of canvas width (about 70% of the half width on desktop), and
  anchored far enough from the band that they never cross it.
- Dot field: seeded jittered grid; each dot is classified per frame
  against the current slash frame, its radius and alpha fall off
  toward the slash, and the field drifts upward slowly with wrap.
- Interaction: drag to disturb. Dragging yanks the slash angle via an
  underdamped spring (stiffness 110, damping 9); on release it snaps
  back with damped oscillation. While disturbed, the racers stretch
  along their motion vector in proportion to the spring velocity.
  Idle is watch-only: racers bob along the slope on fixed phases and
  the dot fields drift.
- Determinism: all seeded data comes from mulberry32 with fixed seeds.
  The first frame is drawn synchronously at load with the slash at its
  rest angle and both racers at fixed bob phases (0.9 and 2.4 rad).
  No Date.now, no Math.random. The rAF loop is typeof-guarded and
  uses the rAF timestamp, so the headless QA renderer (no rAF) shows
  exactly the synchronous first frame.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and compared with cmp:
  byte-identical, before and after the mobile fit fix. The second
  render was deleted after each comparison.
- Read-back: desktop and thumb show the green/red halves split by
  the white slash, two blue racers in tuck position riding the slash
  down-slope (speckled suits, red bibs, tricolor sleeve patches),
  IRENE in navy outline on the green and ELENA in red outline on the
  red, both parallel to and clear of the slash, dot fields dense at
  the outer edges and fading toward the slash. First mobile render
  clipped the lower racer off the left edge; after the slash-length
  fit rule both racers sit fully in frame on the slash and the names
  stay inside.

## Deviations

- The red-side name block is stroked in bib red #FE0000 rather than
  the ground red #B93439 named in the prompt: the prompt's "red
  outline on red" would be invisible at the same hex, so the brighter
  palette red is used for the outline, keeping the device (a red
  outline name on the red half) legible. The green-side block uses
  the specified navy #3D5577.
- Figure height is measured against canvas height per the prompt
  (30% / 26%, inside the 25-35% band) on desktop and square formats.
  On narrow portrait phones the visible slash is short, so rig size
  is additionally capped by the visible slash length and by 62% of
  canvas width, and anchors are clamped so a whole rig never leaves
  the frame (first mobile QA render clipped the lower racer; fixed
  by this fit rule).
