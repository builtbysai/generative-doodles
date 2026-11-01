# №1491 "The Applause" (nadja-ringart NR4, PP738)

A row of four abstract seated figures faces a small broadcast panel showing a
single suited figure. At intervals the four figures raise their hands and clap
in unison — hands meeting as paired gold discs — with exaggerated, emphatic
rhythm, then lower their hands and sit still. The suited figure does not
react.

## Frame one

Cream room. Broadcast panel centered above, small, grey, holding one suited
charcoal figure (head disc with grey mouth line, torso rect), fully inside
the panel. Four seated figures in a row across the lower half — torso rects
in muted blue, brown, dark green, purple; skin-tone head discs with dot eyes
and mouth lines; horizontal thigh + vertical shin; bench line. Gold hand
discs rest apart in each figure's lap. No visible text except `<title>`.

## Mechanics (all closed-form over piece time and recorded events)

- 24 s loop: stillness 0–8 s, applause burst 8–16 s, stillness 16–24 s.
- Burst envelope ramps in over 0.5 s at burst start and out over 0.5 s at
  burst end. Bursts are gated by the loop timer only, so a drag can never
  stop a burst mid-clap.
- During a burst the hands rise from lap to chest height and clap in unison:
  hand separation follows 0.5 + 0.5·cos(2π·phase), so the paired gold discs
  meet once per clap cycle (base period 0.8 s at tempo 1).
- Drag: dragging horizontally across the figures (drags starting on the
  broadcast panel are ignored) maps pointer x displacement to clap tempo,
  clamp(1 + dx/300, 0.5, 2.5). Release eases tempo back to 1 with tau 1.5 s.
- Clap phase is the exact integral of tempo over the current burst window,
  computed closed-form by splitting at event times (constant tempo while
  dragging, analytic exponential decay after release). Tempo never edits a
  scene, never silences the figures permanently, never makes the suited
  figure react. Never click-to-reload.

## Adaptations

- Figures as sprites with a clap phase (hands apart / hands together)
  driven by a tempo value; bursts gated by a loop timer; drag maps pointer
  x displacement to tempo — all as specced.
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing.
- No fading alphas used at all (every fill opaque); dots as own-beginPath
  arcs with moveTo first (node-canvas quirks).

## Determinism

- Frame one = draw(0) via boot flag, clock starts only with the rAF loop
  (plain function declaration behind a typeof guard).
- Every animation value derives from loop-local time (lt = t % 24); the
  №1482 lesson applied pre-emptively. All decoration from mulberry32
  (seed 1491000), never Math.random.

## Verification

Rendered at 1280×900, 390×844, and 720×720 and inspected all three; thumb
byte-identical across repeated renders. Forced-time probe harness
(vm-isolated instance, real node-canvas, piece driven via window.__piece):
t = 0 redraw 0 px; t = 24 vs t = 0 = 0 px; t = 48 vs t = 0 = 0 px (loop
closes exactly, twice over); t = 0 vs t = 4 = 0 px (stillness); t = 0 vs
t = 20 = 0 px (stillness again); t = 0 vs t = 12 = 20,844 px (burst live);
gold centroid y 665.5 at rest vs 575.5 in burst (hands rise); t = 12 vs
t = 12.4 = 15,620 px (clap phase moves); panel charcoal identical at
t = 0/12/20 (14,589 px — suited figure never reacts); tempo 2.00 during a
+300 px drag, 0.50 floor during a −300 px drag, 1.050 4.5 s after release
(1 + 1·e^-3); burst stays alive under drag (gold present at dragged t = 12);
panel-area drag leaves tempo at 1.00. Token scan clean (the single
"Math.random" hit is the code comment stating it is never used).

## Fix rounds (1, composition only)

First desktop render let the suited figure's head poke above the panel's
top edge. Panel narrowed (0.36W → 0.30W) and the figure re-seated fully
inside the panel (head disc at 0.22 of panel height, torso 0.36–0.88). All
renders re-done after the fix.
