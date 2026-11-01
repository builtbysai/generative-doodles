# №1512 "The Island That Rose and Sank" (clement-cogitore CC1, PP759)

Gallery date: 2006 · 03 · 03 (formula date; not drawn in the piece).

## What it is

A dark sea field (near-black blue #0e1420, full-bleed) with layered horizontal
drift lines in faint #4a5a6a. A small ash-grey (#8a8a80) blobby island,
centered low, rises from the bottom of the frame, holds, then sinks back
under. While it is up, one flag at a time flies from a pole on its top,
cycling French blue #2a4d8f, British red #a33327, Sicilian gold #c9a227,
neutral white #e8e8e0 — one flag per rise, never two at once, no labels.
When the island sinks, the flag keeps waving over empty water for a beat
(fade 36–39 s of the cycle) and then is gone. Foam dashes in faint #4a5a6a
mark the island's base while it is up. No visible text except `<title>`.

## Timing

Super-loop 160 s = four 40 s rise cycles, so each rise gets a new flag and
the whole piece still closes exactly. Within each 40 s cycle (cycle time ct):
rise 0–10 s (smoothstep), hold 10–26 s, sink 26–36 s (smoothstep),
underwater rest 36–40 s. Flag alpha: 0 before ct 2, ramp in 2–4 s,
full 4–36 s, fade 36–39 s, gone at 39–40 s. Frame one is phase-shifted +15 s
into the super-loop, so it opens mid-hold on the full island with the
French-blue flag flying (cycle 0, ct 15).

## Island shape (prompt reconciliation)

The prompt says both "the island itself never changes shape" and "blobby
polygon with slow noise morph". The shipped build keeps one fixed seeded
outline (26 points, radius factors 0.84–1.12 from mulberry32 seed 1512000),
identical on every rise; the only motion is the rise/hold/sink offset plus
faint foam. The shape is therefore invariant across claims, which the
probe verifies exactly (ash-pixel set identical across rises).

## Drag mapping

Dragging upward on the island (pointer down inside the island ellipse,
net upward movement over 20 px) freezes the effective timeline while held:
the sink waits, and on release the schedule resumes from the frozen point
via a closed-form integral over recorded drag segments (no frame-integrated
state). Drags starting off the island, and downward drags, do nothing.
The water is not frozen by a drag: sea drift lines are driven by real time
with a 160 s period, so they keep moving while the island holds, and they
still close exactly at t = 160.

## Interaction notes

Watch-first. Drag is upward-on-island only, as specced. No tap action,
never click-to-reload. Fully silent (no AudioContext at all).

## QA

- Desktop 1280×720 and mobile 390×844 renders inspected personally:
  dark sea, faint drift lines, ash island centered low, single blue flag
  on its pole, foam dashes at the base; mobile full-bleed, no clipping.
- Thumb 720×720 re-rendered twice with render-piece.js: both byte-identical
  to the shipped thumb (md5 1db479f95a1d7dea9e537f87f8909884).
- index.html md5 fe7e09382fe7de6c57dba50a7c431e62.
- Forbidden-API grep clean: no AudioContext, getUserMedia, Path2D,
  createElement, localStorage, gradients, shadowBlur, fillText,
  Math.random, Date.now, or performance.now.

## Probe results (probe-1512.js, forced-time harness, real node-canvas)

- Loop closure: t = 160 vs t = 0 = 0 px; t = 320 vs t = 0 = 0 px.
- Phases via stateAt: frame one hold, flag blue, offset 0; rise start
  offset full (194.976 px at 720); mid-rise offset 97.488 px; hold at
  ct 10 offset 0; sink start offset 0; mid-sink offset 97.488 px;
  rest offset full; flag alpha 0 at ct 2, 1 at ct 4, 0.3333 at ct 38,
  0 at ct 39.
- Flag cycle: pixel counts per rise 1341/0/0/0, 0/1341/0/0, 0/0/1341/0,
  0/0/0/1341 for blue/red/gold/white — exactly one flag at a time.
- Island shape: ash-pixel set identical across rises (50,769 px each).
- Drag hold: upward island drag freezes eff at drag start (eff 0 at t 5);
  after release at t 6, state at t 12 is still hold (eff 6), while the
  undragged state at t 12 is sinking (offset 5.459 px).
- Off-island drag and downward drag leave eff unchanged (eff 5 at t 5).
- Water not frozen: sea strip (rows 0–100) differs by 602 px between
  t 2 and t 5 of a drag freeze, while the island ash set is identical.

## Fix rounds

None. First build passed all probes and renders.

## Deviations from the prompt

None, apart from the documented house-rule adaptations: canvas 2D
throughout, closed-form drag state, flat-alpha layers instead of any
gradient, fully silent, fixed-phase first frame with a +15 s phase shift,
rAF loop as a plain function declaration with typeof guards, viewport from
the Visual Viewport API with canvas pinned in draw(), phone detection via
window.screen with aspect fallback, and the island-shape reconciliation
above.
