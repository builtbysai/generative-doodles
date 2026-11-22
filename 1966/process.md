# №1966 Worn Loops

CW7 / PP1213, study #256 caius-williams.
Gallery date: 2007 · 05 · 31. Gallery note: "A near-white scanned
sketch: a long graphite line wanders and redraws itself while small
loops form and dissolve over a breathing grid. Drag the long line
to redirect it."

## What it is

A near-white scanned sketch on a paper sheet: a faint hand-drawn
grid, small imperfect loops, and one long looping diagonal line in
soft graphite wandering across the sheet, after the 'Worn' release
art. The marks are alive: the long line redraws itself endlessly,
its 45 second trail fading behind a dark graphite head; loops form
and dissolve on a 45 second cycle; the grid breathes in alpha.
Drag the long line: take hold of it and redirect its wandering
path; release and it resumes its own looping logic over about
3 seconds. Handling the score is the interaction, per the
sketch-as-score. No grid-perfect geometry, no plotter-clean lines:
the line wobbles with deterministic sinusoidal jitter at every
moment, loops are wobbled polylines, and grid lines are uneven.

## Palette

- Paper near-white #f8f6f1 (ground)
- Page ground #e7e3d8 (body outside the square sheet on desktop)
- Pencil gray #8f8f86 (secondary marks)
- Faint grid gray #a9a9a0 (grid)
- Soft graphite #4c4c48 (the long line and pen dot)
- Soft graphite #6e6e68 (secondary graphite)
- Loop gray #75756c (loops)
- Paper edge #b7b2a4 (wobbly sheet edge)
- Caption ink #2b2b28, caption gray #6f6f68

## Interaction

Pointer down anywhere on the sheet takes hold of the long line;
pointer move pulls its head 85 percent of the way toward the
pointer, the pull decaying along the trail with a 6 second
constant and clamped to 0.4 of the sheet size so a wild drag
never tears the line off the sheet. Pointer up releases it and
the pull decays over about 3 seconds while the line resumes its
own wandering logic. This is drag-earned redirect, never
click-to-reload. Motion is all on multi-second timescales, well
under the 14 Hz ceiling. prefers-reduced-motion renders a still
frame. No audio.

## Determinism

FIRST_T = 10 s. The wandering path is a pure function of t: a
slow diagonal sweep (140 s period) plus faster wandering sines,
so at t = 10 the sheet already carries a 45 s trail behind the
head, two loops mid-life (births 5 and 8 s on a 45 s cycle), and
a breathing grid. No Math.random at draw time; every loop and
grid phase comes from seeded mulberry32 instances. QA hooks:
window.__draw(t), window.__piece1966 with drag(x, y),
release(), redraw(t), firstT. Query params: ?t= sets the virtual
clock, ?seed= is an alias for it, ?drag=x,y (or @x,y inside the
seed value) holds the line toward a stage point at load.

## Probes

- Frame one determinism: two renders at t=10 give identical md5
  abe478d4d4907a5d5cc2817ab69c49e2.
- Time probe: render at t=16 gives md5
  2187ff12a66c63ad3e557c8e8a8cfbc7, different from t=10,
  confirming the line redraws over time.
- Drag probe: render at t=10 with ?seed=10@200,600 gives md5
  6229aae67ef882fb738a29e12a711c8e, different from the undragged
  frame; visually the head and recent trail bend left toward the
  drag point, confirming the redirect.

## QA renders

node ~/workspace/tools/render-piece.js at 1280x900 desktop,
390x844 mobile, 720x720 thumb. All three inspected visually.
Thumb md5 a0b27fbde162b79f4237c3290f4fbed1, re-rendered from the
final script after the loop fix with identical md5.

## Fix rounds

1. First build rendered clean, but the loops read as angular
   polygons with visible straight facets. Fix: loop polylines
   raised from 28 to 44 points and radius wobble reduced
   (0.08/0.05 to 0.06/0.04). Re-rendered and re-gated after the
   fix; thumb md5 unchanged in content path, re-rendered from
   the final script.

## Deviations from the prompt

None material. The prompt prescribes the near-white sketch, faint
grids, small loops, one long looping diagonal line, drag redirect
with autonomous resume, and hand-drawn imperfection; all are
present. The 45 second trail length, the 3 second release decay,
and the 0.4 sheet-size drag clamp are implementation choices the
prompt does not name. A wobbly hairline marks the paper edge and
vertical side text carries the title and CW7 / PP1213; both are
presentation, not art.

## Known warts

- At frame one the head sits in a tight scribble knot at the
  lower right, where the wandering sines bunch up while the slow
  diagonal sweep turns. It reads as a pen resting and scribbling
  and is kept.
- The sheet is deliberately sparse: large areas of near-white
  paper carry only the faint grid. That is the 'Worn' sketch
  look, not an empty frame.
- On phones the long line's tail fades to near-invisible at the
  top of the tall sheet; the head and loops carry the read.
