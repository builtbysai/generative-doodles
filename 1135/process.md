# №1135 — Drawing Robot

Jussi Ängeslevä study block JA8: the Royal Jelling drawing robot (2015),
which is fed new archaeological finds and draws them on the museum wall —
knowledge not as finished fact but as an ongoing process.

## Idea

A dark wall that is never finished and never cleared. A small rail-mounted
drawing robot works the wall forever: it travels to a spot, studies it with
a pale-cyan scanning pulse, then draws the outline of a "new find" in chalk
white — a vessel profile, a set of rune-like strokes, a spiral ornament.
Finished drawings do not disappear; they decay over the next few cycles
from fresh chalk #E8E4DA to the faint ghost tone #2E3339 and stay on the
wall as the archive of everything the robot has learned. Every fifth
artifact is a large hero vessel with a double outline and a belly band.

## Implementation

- Persistence is data, not pixels (house rule): every artifact is a
  generated set of polylines with a cumulative arc-length table and a birth
  time. Each frame redraws the whole stroke log; a completed artifact's
  color is a closed-form blend of chalk and ghost driven by its age in
  cycles (full chalk for one cycle, ghost over the next ~3.5). The log is
  pre-populated — the schedule is a pure function of piece time, so at the
  fixed first-frame phase the wall already holds fifteen artifacts at
  every fade level.
- The schedule runs on a 15 s cycle: travel (2.2 s, smootherstep-eased,
  pen up) → scan (~3 s, two expanding cyan rings at low alpha over the
  target) → draw (8.6 s, the path prefix grows by arc length and the pen
  tip follows it exactly) → a short rest. Artifact type, position, size,
  and shape all come from a seeded RNG keyed by cycle index.
- Generators: vessels from a seeded half-width profile run through
  Catmull-Rom (outline = left side, rim, right side, base; heroes add an
  inner outline and a band), rune sets as 3–5 angular stem-and-branch
  stroke clusters (abstract marks, never letterforms), spirals as
  Archimedean polylines, sometimes double-armed.
- The robot is a gantry: two faint rails span the top of the wall, a
  carriage (#1E2228) with four wheels rides them, a drop rod descends to
  the pen holder, and a single amber status light (#D8A24A) sits on the
  carriage, pulsing gently during the scan phase. All circles are drawn
  with individual `beginPath` + `moveTo` calls, per the node-canvas
  batched-arc quirk.

## Interaction

- **Drag** on the wall to feed the robot a find at that spot: the find is
  queued into the schedule and preempts it after the current artifact
  finishes — the robot travels there next and draws a new artifact seeded
  by the fed position.
- **Double-tap** fades all existing ghosts to black over ~1.6 s: a fresh
  wall. Artifacts drawn afterwards are unaffected.
- Never click-to-reload; the piece otherwise runs entirely on its own.

## House rules

Visual Viewport sizing with resize listeners on both the viewport and the
window; canvas CSS size pinned in `fit()`; phone detection via
`window.screen` (min dimension < 700) with an aspect fallback; synchronous
first frame at fixed phase T0 = 144.4 s (mid-draw of a hero vessel);
`requestAnimationFrame` guarded by a `typeof` check and anchored at
phase + elapsed. Interaction is recorded as events (queued finds, wipe
times) and every visual state is a closed-form function of piece time
plus those events — no frame-integrated state. No gradients, no
`ctx.filter`, no shadowBlur, no offscreen canvas, no `createElement`,
no microphone, no audio. No text anywhere except the `<title>`.

## QA

Rendered with the house renderer at 1280×800 (desktop), 390×844 (mobile),
and 720×720 (thumb). Frame one shows the dark wall holding chalk artifacts
at several fade levels — ghost vessels, spirals, and rune sets — with one
large hero vessel in bright chalk at lower center, part-drawn, the
carriage's drop rod and pen tip resting exactly at the point where the
outline currently ends, the amber status light lit on the top rails.
Mobile holds the same composition. Thumb rendered twice and byte-compared
with `cmp`: **byte-identical**; the duplicate was deleted.
