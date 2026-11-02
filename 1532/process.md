# No.1532 "The Frame Inside the Frame" (mohamed-bourouissa MB5, PP779)

Gallery date: 2006 · 03 · 23 (recorded here only, never drawn in the piece).
Study: mohamed-bourouissa #202, network chain from bintou-dembele #201.
Core engine: THE STAGED TABLEAU FROM THE INSIDE. Sensitivity guard: mechanisms
only — frames flipping behavior — abstracted to marks and geometry. No
likenesses, no faces, no real names on screen, no readable text anywhere.

## What it is

Dark field #101014 with one pale rectangle near the center — a window-frame,
empty. Rectangle line pale bone #ddd3b8, interior slightly lighter #1c1a20,
about a third of the frame, centered. Ten headless torso-line glyphs wander
the field freely (muted grey #7a7568). Whenever a mark enters the rectangle,
it changes: rendered larger (1.6x), brighter (bright bone #ece5d3 with a
second-color ochre accent #c98f3d), and moving in slow, posed steps (freeze,
hold, step, freeze) instead of wandering. Leaving shrinks it back to its
wandering self. The rectangle never moves on its own; marks are always coming
and going. Generous dark margins. Watch-first, crossing loop.

## How it works

- Loop = 120 s. Every wander path is a sum of sines with whole cycles per
  loop, so the path at t = 120 equals the path at t = 0 exactly.
- Inside intervals are computed from the closed-form wander path: the path is
  sampled at 0.05 s steps over one loop, each boundary crossing refined by
  bisection, giving exact entry/exit times per mark per rectangle geometry
  (cached per geometry; a drag resize recomputes deterministically).
- Inside, a mark follows posed steps: pose k holds 2.5 s, pose 0 is the entry
  point itself, later poses are seeded offsets from the entry point clamped
  inside the rectangle. Entry and exit blend over 1.5 s (smoothstep), so the
  mark walks in and out through the boundary instead of jumping. Pose offsets
  are a pure function of (mark, pose index) via a seeded PRNG, never
  advancing state.
- Dragging a rectangle edge (within 0.022 field of an edge) resizes it
  slightly: width/height clamped to 0.22–0.52 of the field, kept inside the
  field margins. Marks inside adapt (poses re-clamped, intervals recomputed);
  marks outside are unaffected. Dragging a mark (within 0.035 field) carries
  it; dragged into the rectangle it renders inside-style, hurrying its entry;
  on release it resumes its closed-form path exactly (verified identical to
  an undragged control), never locked inside. Drag never moves the rectangle,
  never locks a mark inside, never empties the field.
- Field-like composition: full-bleed on phones, centered square on desktop
  over the same ground color. Viewport from the Visual Viewport API, canvas
  pinned in draw(). Phone detection via window.screen with aspect fallback.

## Adaptations

- All motion closed-form over piece time and recorded events, never
  frame-integrated; wandering is summed sines, not a random walk.
- Flat colors only, never gradients; fading alphas rounded to 4 decimals;
  dots as filled rects; no AudioContext, no getUserMedia, no Path2D, no
  offscreen canvas, no localStorage, no drawn text (title tag only).
- rAF loop as a plain function declaration; frame one = draw(0).
- Seed 1532000 (mulberry32); no unseeded randomness anywhere.

## QA (probe-1532.js, vm-isolated, real node-canvas, 26/26 pass, first run)

Frame one identical across instances; loop closure at t = 120 and t = 240
byte-identical; rectangle static without drag; a mark with a long inside
interval found by scan — inside scale 1.6, bright bone color, bone pixels and
ochre accent pixels present; stepped motion proven (frozen runs of >= 1 s
inside a 5 s sample window plus step changes); the same mark leaves again,
scale back to 1.0, wandering grey, zero bone pixels; edge drag widens the
rectangle with origin unchanged and an outside mark pixel-identical;
mark drag puts the mark inside-style while dragged, never moves the
rectangle, control still outside at t = 10 (entry hurried); released mark
resumes the closed-form path identical to control and is outside again
later; 10 marks at all sampled times; same drag sequence byte-identical
across instances. Thumb byte-compare: two independent 720x720 renders
byte-identical to the shipped thumb. Forbidden-API grep: 0 hits.
Desktop (1280x720) and mobile (390 wide) renders inspected personally:
centered rectangle, inside marks larger/brighter with ochre accents, outside
marks muted grey spread across the field, no clipping on either size.

## Fix rounds

None. All probes passed on the first run.

## Deviations from the prompt

None beyond the documented house-rule adaptations above. One behavior note:
on a drag resize that newly encloses a mark, that mark flips to inside-style
at its current inside-path pose (its entry blend is already complete under
the new geometry), so its position may jump once at the resize moment; this
is the documented cost of keeping all motion a pure function of time and
recorded events, and it only occurs while the visitor is actively resizing.
