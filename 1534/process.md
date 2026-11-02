# №1534 "The Procession That Converges" (mohamed-bourouissa MB7, PP781)

Gallery date: 2006 · 03 · 25 (formula date; recorded here only, never drawn in the piece).

## What it is

Dark field #121014 with a bright center point (a small open circle, pale bone
#e0d6c0). From all edges of the field, five small groups of marks — each group
in its own single color — travel inward along separate winding paths toward
the center. Each group moves at its own pace, pausing and resuming. When a
group reaches the center, it joins a slow rotating ring around the center
point, keeping its own color. The ring grows as groups arrive; when the ring
is full, one group at a time peels off and wanders back out to an edge, and
the cycle restarts.

- Groups (3 torso-line glyphs each, never mixed colors): ochre #c98f3d,
  brick #a34a2e, gold #c9a86a, muted teal #5a7a72, plum #7a4a5a.
- Paths faint #2a2530, winding (never straight), drawn in and out per group;
  a faint ring circle at radius 0.11 of the short side.
- Center point small and exact, never moves. Generous dark margins.
- Field-like layout: full-bleed on phones, centered square on desktop over
  the same ground color.

## Loop (180 s, closed-form, no frame integration)

Each group runs one journey per 180 s loop, staggered by start offset
(ochre 0 s, brick 20 s, gold 40 s, teal 60 s, plum 80 s):

- Inward (journey time 0–60 s): winding path from the group's edge start
  point to its ring slot, with two genuine pause windows (progress frozen,
  verified by probe). Progress uses a pause-subtracted, normalized,
  smoothstepped clock, so pauses hold exactly and arrival lands exactly.
- Ring (60–150 s): the group sits on the ring at its own slot angle. All
  ring groups share one common rotation (one full turn per 180 s loop), so
  slots stay exactly 72 degrees apart. At loop time 140–150 s all five
  groups are in the ring at once: the full ring.
- Outward (150–172 s): the group peels off and wanders back out along a
  winding path to its own edge start point, with one pause window.
- Wait (172–180 s): the group waits at its edge point, so loop end equals
  loop start exactly.

Departures are one at a time: ochre at 150 s, brick at 170 s, gold at 10 s,
teal at 30 s, plum at 50 s (loop time).

Journey time per group is its own clock: tau = (t − start + drag
adjustment) mod 180, so a drag that speeds or slows a group shifts only
that group's journey. The wrap from 180 back to 0 is always edge-point to
edge-point, so no teleport is ever visible.

## Interaction

- Dragging on a travelling group speeds or slows that group only: drag
  right speeds it up (rate up to 2x), drag left slows it (rate down to
  0.4x). The rate comes from recorded pointer-move events; the journey
  adjustment is the closed-form integral of (rate − 1) over the recorded
  sessions, so the same drag sequence is byte-identical across instances.
- Dragging on the ring speeds or slows its rotation only: same rate
  mapping, applied as a common angular offset to every ring group.
- Drag never merges groups, never recolors a group, never moves the
  center. Pointerdown tests travelling groups first, then the ring band
  (which also covers ring-phase groups sitting on the ring); drags on
  waiting groups are ignored.

## Implementation notes (house-rule adaptations)

- Canvas 2D only, fully silent, no AudioContext at all. Frame one is
  draw(0); the rAF loop is a plain function declaration anchored as offset
  plus elapsed-since-load. Every animation sine runs on loop-local time;
  per-group variation comes from a seeded mulberry32 PRNG (seed 1534000),
  never unseeded randomness.
- Path endpoints are the scheduled arrival/departure ring angles plus the
  current ring-drag offset. This keeps pauses truly still (an earlier
  draft used the live rotating ring angle as the endpoint, which drifted
  about 2.8 px/s straight through pause windows and failed the pause
  probe; see fix rounds). Ring-phase continuity at arrival and departure
  stays exact with no group drag, and off by only the group-drag shift
  when a group was dragged.
- No gradients, no Path2D, no document.createElement, no localStorage, no
  offscreen canvas, no ctx.filter, no shadowBlur. No visible text except
  the title. Canvas state (lineCap, lineWidth, strokeStyle, fillStyle) is
  set explicitly in every drawing branch. Canvas size comes from the
  Visual Viewport API with canvas pinned in draw(); phone detection via
  window.screen with aspect fallback. A probe-only window.__t34 hook
  exposes center, ring radius, field rect, ring offset, and per-group
  position, phase, journey time, and color; it draws nothing.

## QA (probe-1534.js, vm-isolated, real node-canvas, 30/30 pass)

- Frame one identical across fresh instances; loop closure at t=180 and
  t=360 byte-identical to t=0.
- Frame-one phases staggered: in, out, ring, ring, ring; colors in order;
  center exact; ring radius 79.2 on 720.
- g0 moves inward 5→12 s, frozen exactly inside its pause window 16–20 s,
  resumes after the pause.
- All five in ring at t=145, all on the ring circle, colors unchanged,
  evenly spaced 72 degrees.
- Peel one at a time: t=155 only ochre out; t=175 ochre waiting, brick
  out, rest ring; t=35 only teal out.
- Ring rotates 60 degrees over 30 s (plum group).
- Group drag: fast drag advances ochre journey time 20→25 s with other
  groups untouched; slow drag retards it 20→15 s; colors unchanged.
- Ring drag: adds about 10 degrees over 10 s; center unmoved; colors
  unchanged; groups stay on the circle.
- Determinism: identical drag sequences byte-identical at t=20 and t=30.
- Thumb byte-compare: two independent 720×720 renders byte-identical to
  the shipped thumb.
- Forbidden-API grep clean (0 hits): no unseeded randomness, wall-clock
  timers, audio, microphone, gradients, or drawn text.

## Fix rounds

1. Ring-spacing redesign (visual, caught on first desktop render): the
   first draft tied each ring group's angle to its own journey clock, so
   the three ring groups at frame one bunched into one quadrant (32
   degrees apart) and the full ring spanned only 128 degrees of arc.
   Rebuilt so all ring groups share one common rotation with fixed
   72-degree slots; the full ring now spreads evenly around the circle.
2. Pause-hold fix (caught by probe): the first draft used the live
   rotating ring angle as the inward path endpoint, so a paused mark
   drifted about 2.8 px/s through its pause window. Endpoints are now
   the scheduled arrival/departure angles plus the current ring-drag
   offset, so pauses hold exactly and ring-drag continuity stays exact.
3. Probe-side corrections only (not piece changes): the t=175
   expectation forgot ochre enters its wait phase at 172 s; the
   rotation probe first used gold, which leaves the ring at t=10, and
   now uses plum; the ring-drag probe first measured the control at
   t=145 against the dragged instance at t=155 and now measures both
   at t=155.
4. Comment-only: the word naming the unseeded random function appeared
   in one comment and tripped the forbidden-API grep; reworded, no
   behavior change, thumb md5 unchanged.

## Deviations from the prompt

None beyond the documented house-rule adaptations above (canvas 2D;
closed-form motion over loop-local time and recorded events; flat
colors; fully silent; seeded mulberry32). Recorded readings: drag
direction maps right to faster and left to slower for both group and
ring drags; groups leaving the ring wander back to their own edge start
point, which is what makes the loop close exactly; the fifth group
starts from the left edge at a different height than the first, so all
five come from the four edges.
