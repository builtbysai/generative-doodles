# No.1538 "Two Affects, One Cut" (arthur-jafa AJ3, PP785)

Gallery date: 2006 · 03 · 29 (recorded here only, never drawn in the piece).

## What it is

The frame alternates between two states with hard cuts only, never blending,
never dissolving, never sharing a frame. State A is bright, fast, and crowded:
48 small marks (discs, bars, rings, zigzags) in bone, signal red, ochre, and
gold bounce and spin across a warm dark field (#2a1f16). State B is dark,
slow, and sparse: three large marks drift almost imperceptibly on a
near-black field (#0d0c10), two in muted grey and one pale. The alternation
itself is the piece: celebration and weight, back to back, forever.

## Schedule (closed-form, seeded)

State durations come only from a mulberry32 stream (seed 1538000), so every
cycle index is reproducible; the prompt's "re-randomized each cycle" is
adapted to a fixed 8-cycle super-loop rather than unseeded randomness:

- State A durations (s): 5.664, 6.963, 3.005, 6.450, 3.547, 7.350, 4.369, 6.186
  (all in [3, 8], total 43.533)
- State B durations (s): 7.254, 10.751, 5.107, 8.598, 6.334, 7.730, 11.932, 10.091
  (all in [5, 12], total 67.796)
- Super-loop: 111.330 s. Frame one is State A, cycle 0.

Each state has its own clock: the A-clock advances only during A segments,
the B-clock only during B segments, both computed in closed form from the
schedule (plus whole super-loops elapsed). A mark's motion is a closed-form
function of its state clock with integer cycle counts over that clock's
super-loop total, so the frame at t=LOOP equals the frame at t=0 exactly.
The cut lands mid-motion because each state's marks are mid-trajectory when
the schedule cuts; the cut itself is an instant state swap, never a blend.

## Interaction

- During State A, pressing on or near a mark slows that mark's whole cluster
  (6 clusters of 8 marks) to half rate while held; the cluster lags behind
  by half the A-clock time elapsed under the drag, then resumes its normal
  rate on release. Other clusters are untouched.
- During State B, pressing on a large mark doubles that mark's clock rate
  while held; it resumes its own rate on release. Other marks are untouched.
- Drag never blends the states, never holds one state permanently, never
  syncs them: the schedule keeps cutting on its own times regardless of
  drags, and identical drag sequences are byte-identical across instances.

## House-rule adaptations

Canvas 2D only; fixed-phase first frame (draw(0)); rAF loop as a plain
function declaration; every animation sine on loop-local time; flat colors
only, never gradients; stored-history fades are not needed (hard cuts);
fading alphas rounded to 4 decimals; dots as filled rects or single arcs
with moveTo first; fully silent, no AudioContext at all; no visible text
except `<title>`; no Path2D, no document.createElement, no localStorage,
no offscreen canvas, no ctx.filter, no shadowBlur; canvas size from the
Visual Viewport API with canvas pinned in draw(); phone detection via
window.screen with aspect fallback; both states are full-frame, so the
field is the whole viewport on phones and desktop alike; canvas state
(lineCap, lineWidth, fillStyle, strokeStyle) set explicitly in every
drawing branch.

## QA (probe-1538.js, vm-isolated, real node-canvas, first run plus one fix)

All probes pass: frame one identical across fresh instances; loop closure
byte-identical at t=LOOP and t=2*LOOP; only states A and B occur, both
occur, 8 A segments and 8 B segments per loop, A durations in [3, 8] s
and B in [5, 12] s with successive cycles differing; no blend frames
across a cut (the field pixel is always exactly one field color); state
flips across the cut boundary; at least 90% of A marks displaced more than
5 px within segment 0 (cut lands mid-motion); State A drag slows the
pressed cluster to 0.52x control (18.1 px control vs 9.4 px dragged over
2 s) with other clusters exactly unchanged, and the cluster resumes
normal rate after release; State B drag speeds the pressed mark to 1.73x
control (4.9 px vs 8.5 px over 2 s) with other marks unchanged; dragged
instances match control state at later times; identical drag sequences
byte-identical. Thumb byte-compare: two independent 720x720 renders
byte-identical to the shipped thumb. Forbidden-API grep: 0 hits.

Fix round (1, visual): the first desktop and mobile renders showed one
ring clipped at the top frame edge, because mark centers could reach
0.92 of the field plus amplitude plus radius. Mark centers were tightened
to [0.14, 0.86] of the field, amplitudes to at most 0.05, and sizes to at
most 0.014 of the short side, so the worst-case reach stays inside the
frame; all renders were re-done and all probes re-run after the fix.
