# №1537 — Trailer for a Film That Doesn't Exist

arthur-jafa AJ2 (PP783–PP790 study #203, PP784). Gallery date 2006 · 03 · 28
(recorded here only, never drawn in the piece).

## What it is

A fast montage of tiny abstract panels, one filling the frame at a time,
full-bleed on near-black ground #0d0c10. Each panel is a simple flat-color
composition: a disc, a bar cluster, a ring, a grid fragment, a zigzag, a wheel,
a window, a dot cluster, and more. Panels cut every 0.4–2.5 seconds, never
dissolving, never fading. Pairs rhyme (a circle panel followed by a wheel
panel, a grid panel by a window panel) or cut to an affective opposite (a
bright fast panel against a dark slow one). The sequence gestures toward a
story but never delivers one.

## Panel bank (24 panels)

Each panel carries an outline family (for formal rhyme), one or two colors
from bone #ddd3b8, signal red #b33324, ochre #c98f3d, muted teal #5a7a72,
pale silver #d8d8d8 (never all at once), a bright/dark flag (for affective
opposite), and a density (sparse / medium / crowded):

- circle family: disc (bone, sparse, bright), wheel (bone+red, medium,
  bright), ring (silver, sparse, dark), concentric rings (teal, medium,
  dark), arc (teal, sparse, dark), ring cluster (red, crowded, bright),
  disc pair (bone+ochre, medium, bright)
- line family: bar cluster (red, medium, bright), zigzag (ochre, sparse,
  bright), stripes (bone, crowded, dark), cross (red, sparse, dark),
  bars row (ochre, medium, dark), zigzag dense (teal, crowded, dark),
  bar cross (silver, sparse, dark)
- grid family: grid fragment (bone, medium, bright), window
  (silver+teal, medium, dark), checker (bone+silver, crowded, bright),
  grid dots (bone, crowded, dark), window grid (teal+silver, crowded,
  bright)
- dot family: dot cluster (ochre, crowded, bright), dots row (silver,
  sparse, dark), dot ring (red, medium, bright)
- shape family: triangle stack (red, medium, bright), triangle outline
  (ochre, sparse, dark)

Formal rhyme = same outline family, or inverted colors (a two-color panel
followed by the same two colors swapped; window silver+teal and window grid
teal+silver are the inverted pair). Affective opposite = bright flag differs.

## Sequencer (closed-form, seeded)

- Seed 1537000, mulberry32. All schedule variation comes from this stream,
  never from unseeded randomness, so every cycle index is reproducible.
- Two cycles of 24 panels each. Each cycle is a seeded permutation of the
  bank without replacement, biased by the pairing rule: at each step a coin
  (50%) chooses rhyme mode or opposite mode; the next panel is drawn from
  the remaining panels matching that mode, falling back to the other mode
  if the first filter is empty, then to any remaining panel. Measured on
  the shipped schedule: 24 rhyme transitions, 22 opposite transitions,
  0 violations.
- Cut durations follow the phrase pattern quick-quick-hold-quick-hold-long:
  quick 0.4–0.9 s, hold 1.0–1.8 s, long 1.9–2.5 s. Every 12th cut is a
  6–8 s hold-break that breaks the rhythm before fast cutting resumes.
- LOOP = 75.091 s (48 cuts total). The schedule is exactly periodic, so
  frame one (draw(0)) equals the frame at t=LOOP and t=2*LOOP byte for byte.

## Interaction (closed-form over recorded events)

- Pressing anywhere pauses the cut: the current panel holds while pressed
  (the effective media time freezes), and the schedule resumes on release.
  Implemented as recorded hold sessions subtracted from piece time.
- Dragging left/right steps one panel backward/forward: on release, if the
  horizontal displacement exceeds 40 px, a step event (+1 right, −1 left)
  shifts the displayed cut index by exactly one; the underlying sequence
  keeps its order, shifted. Small drags (20 px) do not step. Drag never
  scrubs smoothly, never reorders the sequence, never adds panels.
- The step applies on release rather than mid-drag, so the hold-while-
  pressed behavior and the step stay consistent: while pressed the panel
  is frozen, and the step lands the moment the press ends.

## Adaptations (house rules)

- The prompt's "re-randomized within bounds each cycle" is adapted to the
  seeded stream above, so the schedule is reproducible and loop-closes
  exactly. The loop restarts after two cycles: cycle 3 is cycle 1 again,
  the exact film-loop restart (the same convention as other pieces with
  per-cycle variation).
- Canvas 2D only; flat colors, never gradients; fully silent, no audio at
  all; no visible text except the `<title>`; dots as filled rects or
  paired arcs with a moveTo before batched arcs; fading alphas rounded to
  4 decimals; rAF loop as a plain function declaration; canvas size from
  the Visual Viewport API with the canvas pinned in draw(); panels are
  full-bleed by the prompt's own spec, so the same layout serves desktop
  and phones (page ground is the piece's own #0d0c10).
- Probe-only hook `window.__t37` exposes the loop length, cut schedule,
  cycles, panel metadata, and displayed index; it draws nothing.

## QA

- probe-1537.js, vm-isolated, real node-canvas, driving the piece's own
  rAF loop (anchored with a dummy call): all probes pass. Frame one
  identical across fresh instances; loop closure byte-identical at t=LOOP
  and t=2*LOOP; cuts instant (frames just before a cut identical, frames
  just after identical, frame changes discretely across the boundary);
  all cut durations in range (0.4–2.5 s, hold-breaks 6–8 s, 4 hold-breaks
  in 48 cuts); cycle orders differ and each uses all 24 panels once;
  pairing counts rhyme 24 / opposite 22 / violations 0; hold freezes the
  panel across scheduled boundaries and cuts resume after release;
  schedule unchanged by drags; right drag steps exactly one panel
  forward and the sequence continues shifted (next is frozen+2); left
  drag steps exactly one backward; small drags do not step; identical
  drag sequences byte-identical.
- Thumb byte-compare: two independent 720×720 renders byte-identical to
  the shipped thumb.
- Forbidden-API grep: 0 hits (no Math.random, Date.now, performance.now,
  AudioContext, getUserMedia, Path2D, createElement, localStorage,
  gradients, fillText, strokeText).
- Renders inspected personally: desktop 1280×720 and mobile 390×844 both
  show one full-bleed abstract panel (frame one is the silver bar-cross
  panel), flat colors, no text, no clipping.

## Fix rounds

- Probe-side only (not a piece change): the first probe run read the hook
  immediately after pointerup without redrawing, so it saw the stale
  pre-release displayed index and the three step probes failed. The probe
  now drives one frame after each release before reading the hook; all
  probes pass with no piece change.
- No piece fix rounds. No deviations from the prompt beyond the
  documented adaptations above.
