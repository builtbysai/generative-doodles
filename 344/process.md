# No.344 Spaghetti Monster

## Concept

After MyClayCo's Sep 2026 failed-print post ("that's 3d
printing life"): a 3D printer's bad moment read as process
art. A clean cutter-wall toolpath, one continuous extrusion
line tracing a scalloped frame, draws itself neatly; then
the print head fails and the line tangles into a dense
scribble bloom; then the bed clears and it starts over.
Honest machine humour. There is no monster face and never
will be: the tangle IS the monster. The viewer's drag is
the other monster: dragging feeds noise into the line the
head has not printed yet.

## Construction

One self-contained canvas, design space 1280x900, cover-fit
(full-bleed field) with the page ground in the piece's own
near-black #121417. Visual Viewport sizing with resize
listeners on visualViewport and window; the canvas is
pinned every frame via style width/height in px; phone
detection via window.screen min dimension under 700px with
the aspect fallback (h > w*1.15). Palette is closed at
four: ground #121417, clean toolpath cream #F2EBD8, tangle
bloom hot coral #E4572E, print-head dot gold #D9A441.

The loop is 16s, phases asserted in code: 8s clean draw,
6s tangle, 2s clear. The clean toolpath is a polyline of
716 points built once as data: a rounded rectangle (half
extents 520x325, corner radius 130, perimeter 3156.7)
sampled clockwise from top centre, each point pushed along
its outward normal by a sine scallop of amplitude 8.5 whose
count is a whole number around the perimeter (49,
asserted), so the wave closes seamlessly at the start
point. Draw-on is a progressive reveal by arc length at
constant extrusion speed; a gold head dot with a thin ring
rides the reveal frontier.

The tangle is a random walk precomputed once at load from
a fixed seed table of 480 values held as literal JS data
in the file (asserted in range; never runtime random). It
starts at the failure point, where the clean loop closes
at top centre. Headings turn by the table values, step
length grows 5 to 31 across the phase, and the bloom is
anchored 95px inside the frame: whenever the walk strays
past its current radius (30 growing to 235) it is steered
back toward the anchor, so the scribble piles onto the bed
as one dense local bloom, drawn in coral at width 5 under
the riding head dot. The clear phase fades the whole
drawing out with a (1-p)^1.4 alpha curve, and the loop
wrap wipes all drag state: a clean bed, no residue.

Drag noise is stamps. A stamp records the finger position
in design coords (through the stored cover transform S,
OX, OY) and the head index of the active path at the
moment it landed. A point is displaced only by stamps born
before the head reached it, with a gaussian falloff of
sigma 120 and a per-point direction from a golden-angle
hash, so points already drawn can never move again and a
drag only ever corrupts what is yet to print, in the clean
path or in the walk alike. No tap action. Frame one is
offset to T=3.6s, 45 percent through the clean draw, head
dot on the bottom edge; the offset was chosen so the dot
also sits inside the phone cover crop. The first frame is
drawn synchronously and requestAnimationFrame is
typeof-guarded. One canvas only: no offscreen canvas, no
shadowBlur, no gradients, no filters, no text.

## QA log

Rendered with node ~/workspace/tools/render-piece.js from
the piece's own script; all in-code assertions passed at
every size (16s loop sum, 480 seed entries in range, 716
path points, 49 scallops). Phase variants were rendered
from offset copies in /tmp so the tangle and clear phases
could be inspected, not just frame one.

- qa-desktop.png (1280x900): clean scalloped frame 45
  percent drawn clockwise from top centre, gold head dot
  riding the bottom edge; scallops even, corners smooth.
- qa-mobile.png (390x844): cover crop shows the top-edge
  start and the head dot on the bottom edge at lower
  right; pixel scan confirms the gold dot is in frame at
  all three sizes.
- thumb.png (720x720, in this folder): square crop keeps
  the drawn run and the head dot legible.
- T=11.0 variant: completed cream frame, coral bloom half
  grown around the failure point inside the top edge,
  head dot mid-bloom.
- T=13.8 variant: full bloom, a dense scribble roughly
  420x330 spilling just over the top line at the failure
  point, head dot at its left edge.
- T=15.0 variant: clear phase, frame and bloom uniformly
  faded to about 0.38 alpha, bed on its way to clean.

Fixes during the build: the tangle path's first variant
render showed the completed frame and head dot but no
coral at all (the walk path was built but never stroked);
caught only because the tangle phase was rendered, not
inferred from frame one. The first walk also spilled
above the canvas top; the bloom anchor was pulled inside
the frame and the opening heading steepened downward,
after which the scribble piles on the bed. The start
offset moved 3.4 to 3.6s after a pixel scan showed the
head dot 26px outside the phone crop.

Deviations: none from the spec or its adaptation flag.
The drag path is event-driven and cannot fire in the
headless renderer; it is guarded, hit-tested in design
coords, and changes piece state only, never a reload.
