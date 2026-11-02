# No.1529 "Two Channels, Two Times" (mohamed-bourouissa MB2, PP776)

Gallery date: 2006 · 03 · 20 (recorded here only, never drawn in the piece).

## What it is

One frame split by a thin vertical divider into two panels showing the same
system at two speeds. Left panel: a large central mark in muted bone
(#cfc8b8) with four smaller preparer marks around it, slowly attaching
bright decorations (discs, rosettes, streamers in signal red #c23b2a, gold
#c9a86a, pale silver #d8d8d8). Right panel: five marks in brighter bone
(#e8e0d0) moving fast in a looping parade circle, each carrying two
decorations that flash as they pass the fixed point at the top of the
circle. Both panels sit on deep slate #1a1d22; the divider is faint
#3a3f45. The two sides run simultaneously and never lock: the left work
cycles every 72 s while the parade spins every 8 s (9 rotations per left
cycle).

The left and right panels show the same system: five marks on each side
(central + four preparers on the left, five paraders on the right), the
same bone family, the same three decoration colors. The difference is
state and speed only, never subject.

## Loop and clocks (all closed-form over piece time and recorded events)

- Joint loop: 72 s. Left cycle: 8 decorations, one attached every 6 s
  (attach ramps over 1 s), so the central mark is fully decorated at 48 s;
  then the decorations fade one by one every 3 s (fade ramps over 1 s),
  so nothing is left at 72 s and the work restarts. The left panel is
  never permanently finished: full decoration is a passing state, not an
  end state.
- Parade: rotation period 8 s, continuous. A decoration's flash factor is
  pow(max(0, cos(angle - topAngle)), 8), giving alpha 0.45-1.0 as it
  passes the top of the circle.
- Frame one is draw(0): no decorations attached yet on the left, parade
  at its initial angle. Per-cycle variation comes only from the seeded
  PRNG (mulberry32, seed 1529000) fixing slot angles, radii, types, and
  colors at build time; the loop itself repeats exactly.

## Interaction (all drag, never click-to-reload)

- Divider drag (pointerdown within 18 px of the divider): the divider
  follows the pointer, clamped to 0.25-0.75 of the field; panel widths
  recompute, so marks spread out in the widened panel and compress in
  the narrowed one. The divider stays where released.
- Left-panel drag: each press hurries one decoration attachment (the
  left clock advances 3 s per press, closed-form: te = t + 3 * presses).
- Right-panel drag: while dragging, the parade rate shifts by
  clamp((x - x0)/300, -0.5, 1.0), integrated piecewise-constantly between
  recorded move events; dragging right speeds the parade, dragging left
  slows it. On release the rate returns to normal with the accumulated
  phase offset kept.
- Drag never syncs the panels (each drag touches only its own clock),
  never stops either side, never moves a mark across the divider.

## Adaptations

- Canvas 2D only; flat colors throughout, no gradients anywhere. The
  faint parade circle path reuses the divider color #3a3f45.
- No visible text except the page title. No likenesses, no faces, no
  real names on screen; the piece is about the two-channel-time
  mechanism only, abstracted to marks, light, and geometry.
- Fully silent: no audio of any kind.
- Dots drawn as single-arc paths or filled rects; every fading alpha
  rounded to 4 decimals before stringifying.
- Viewport from the Visual Viewport API with canvas pinned in draw();
  phone detection via window.screen with aspect fallback; field-like
  layout goes full-bleed on phones, centered square on desktop over the
  same ground color.

## QA

- probe-1529.js: 33/33 pass (vm-isolated, real node-canvas, driving the
  piece's own rAF loop). Frame one identical across instances; loop
  closure at t=72 and t=144 byte-identical to t=0; left attach counts
  0/1/2/3/8/7/6/0 at t=0/5/7/13/47/50/53/71; parade advances pi/2 over
  2 s, pi over 4 s, one full rotation over 8 s; flash level changes
  over time; out-of-sync check (half-turn parade + 6 attached at t=36);
  divider drag +120 px widens the left panel and spreads its marks,
  narrows the right, stays after release, no mark crosses; left drag
  hurries attachment (2 vs control 1 at t=5) with parade angle
  unchanged; right drag speeds (+0.625 rotations over 10 s) and slows
  (-0.625) the parade with left attachments unchanged; combined drags
  keep both sides moving with nothing crossing; identical drag
  sequences byte-identical across instances.
- Thumb byte-compare: two independent 720x720 renders byte-identical to
  the shipped thumb.
- Forbidden-API grep on index.html: 0 hits.
- Desktop (1280x720) and mobile (390 wide) renders inspected personally:
  two equal panels, thin centered divider, central mark with preparers
  on the left, parade circle with flashing decorations on the right, no
  clipping on either size. One preparer sits close behind the central
  mark (seeded position); it reads as a mark working on the central
  mark, which is the prompt's scene.
- Fix rounds: none. All probes passed on the first run.
