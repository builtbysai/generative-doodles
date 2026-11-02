# №1522 "Leaving the Frame" — bintou-dembele BD3 (PP769)

Gallery date: 2006 · 03 · 13 (formula date, recorded here only, never drawn in the piece).

## Spec (from TASKS.md, bintou-dembele prompt block, expansion study #201)

A field with one hard rectangular frame drawn in pale lines near the center —
an empty rectangle, slightly tilted. Abstract dancer-marks start inside it,
moving in tight, small, obedient steps. One by one, a mark walks to an edge,
steps through the frame line (the line stays intact behind it), and joins a
growing circle outside the frame, where its steps get bigger, wilder, freer.
The frame never moves, never breaks, never empties completely — there is
always one mark still inside.

Palette: field deep slate #1c2226; frame line pale bone #ddd3b8; inside
marks muted grey-blue #6a7a8a; outside circle marks ochre #c98f3d and brick
#a34a2e; ground line faint #3a444a. No other color.

Composition: frame centered-left, small; the outside circle grows to the
right of it, large; empty field above and below.

Motion: watch-first, escape loop. Marks leave one at a time on a slow
schedule; the outside circle spins counter-clockwise; when the circle holds
nine marks, one mark walks back inside and the cycle restarts.

Interaction: dragging a mark inside the frame toward an edge hurries its
exit; dragging on the outside circle speeds or slows its spin. Drag never
breaks the frame, never empties the frame, never stops the circle.

Avoid: a broken frame, an empty frame, a chase, a guard figure, text, a
door drawn in the frame.

Study guard: abstract dancer-marks and shapes only, no likenesses, no real
names, no readable text anywhere, no depiction of enslaved people, cages, or
any historical exhibition — the frame is abstract geometry, never a literal
enclosure with people inside. This piece is about Dembélé's mechanism of
escape and refuge-circle, not about any real person or community.

## Build

- 10 marks total. Mark 9 never leaves, so the frame always holds at least
  one mark. Marks 0–8 leave one at a time at loop-local 10, 20, …, 90 s.
- 240 s loop, all motion closed-form over loop-local time and recorded drag
  sessions, never frame-integrated:
  - 0–10 s: all 10 marks inside, small-step wandering.
  - 10–98 s: marks exit one at a time (8 s walk-out each); at 99 s the
    circle holds 9 marks and 1 mark remains inside.
  - 100–112 s: one mark (the first to leave) walks back inside — the
    prompt's return moment; circle 8, inside 2.
  - 112–236 s: gather phase — the remaining 8 circle marks walk back
    inside one at a time; at 236 s all 10 are inside again.
  - 236–240 s: hold. Frame at 240 s is byte-identical to frame at 0 s.
- Inside wandering: 6 seeded waypoints per mark (mulberry32, seed 1522000),
  visited on a periodic path with dwell, plus small bob sines whose periods
  (30 s, 24 s) divide the loop. No unseeded randomness anywhere.
- Outside circle: marks take slots in exit order; spin is one full
  counter-clockwise turn per 60 s (period divides the loop); per-mark radius
  wobble uses periods 48 s and 40 s, both dividing the loop.
- Glyphs: torso line + two arm lines + two leg lines, no head, no text.
  Inside marks are small; circle marks are 1.6× with wilder arm/leg swing.
- Frame: slightly tilted (−0.10 rad) stroked rectangle, drawn AFTER the
  marks so the line stays visually intact behind every crossing.
- Layout: landscape puts the frame left and the circle right on one row;
  portrait (phones, detected via window.screen with aspect fallback) stacks
  them diagonally (frame upper-left, circle lower-right) so nothing clips.
- Canvas from the Visual Viewport API with resize listeners on
  visualViewport and window, canvas pinned in draw(), guarded size()
  fallback (visual viewport, else window, else 720×720).
- Fully silent; canvas 2D only; no gradients (flat colors only); no
  canvas-fade; no visible text except the <title> element.
- Drag: pressing an inside mark starts an inside-drag (the mark follows
  the pointer); releasing after moving toward the nearest frame edge by
  ≥ 40 px hurries that mark's exit to the release time (mark 9 has no
  scheduled exit, so it can never be dragged out). Pressing the circle band
  starts a circle-drag (spin offset follows pointer angle, decaying with a
  3 s time constant after release); the base spin never stops.

## Prompt reconciliation

- The prompt says "when the circle holds nine marks, one mark walks back
  inside and the cycle restarts." A single return cannot by itself restore
  the loop-start state, so the build honors the return as the trigger
  (mark 0 returns at 100–112 s, circle 9 → 8) and then gathers the
  remaining circle marks back inside one at a time, after which the cycle
  restarts exactly at the loop boundary. The alternative — restarting the
  escape from a 2-inside/8-circle state — cannot close a fixed loop.
- The disappearance order (left-to-right in schedule order, i.e. marks
  0–8) and the return order (first-out returns first, then the rest in
  exit order) are the natural readings; the prompt assigns no other order.
- Drag mappings: "toward an edge" is implemented as a ≥ 40 px reduction in
  distance to the nearest frame edge between press and release; circle-drag
  direction follows the pointer angle around the circle center.

## QA (probe-1522.js, vm-isolated, real node-canvas) — 23/23 pass

- Frame one identical across fresh instances; loop closure at t=240 and
  t=480 vs t=0 byte-identical.
- Circle counts: 0 at t=0, 2 at t=30, 5 at t=60, 9 at t=99, 8 at t=115.
- Frame never empties: minimum inside-or-returning count 1 over 2 s
  samples across the whole loop; mark 9 inside at every sample.
- Frame line intact: exact bone-pixel count 1384 at t=0, t=54 (mid-crossing)
  and t=120 — unchanged through crossings.
- Circle spins counter-clockwise: mark angle decreases by 0.612 rad over
  6 s (one turn per 60 s).
- Drag hurry: mark 8 (scheduled exit 90 s) dragged to an edge at t=5–8 is
  in the circle at t=20; the undragged control is still inside; dragging
  mark 9 toward an edge leaves it inside.
- Circle drag: spin offset 0.358 rad at t=56 after a 0.5 rad pointer drag;
  the circle keeps spinning counter-clockwise after the drag; circle count
  unchanged by the drag; the same drag sequence is byte-identical across
  fresh instances.
- Mobile smoke: 390×844 renders with content, no throw.
- Forbidden-API grep clean: no AudioContext, getUserMedia, Path2D,
  createElement, localStorage, unseeded randomness, wall-clock timers,
  gradients, or drawn text. Fully silent.

## Fix rounds

1. Glyph scale: the first render drew glyphs ~288 px tall, reading as giant
   stick figures spilling out of the frame. The glyph unit was reduced
   from 0.016 to 0.0028 of the short side (about 50 px tall inside, 81 px
   in the circle on desktop) and the waypoint inset widened from 26 to
   44 px so glyphs stay inside the frame. All probes and renders re-run
   after the fix; 23/23 pass.

## Renders inspected personally

- qa-desktop.png (1280×720): tilted pale frame centered-left, 10 small
  grey-blue glyphs inside, empty field, faint ground line.
- qa-mobile.png (390 wide): same composition stacked diagonally, no
  clipping.
- qa-t99.png (1280×720 at t=99): one small grey-blue mark inside the
  frame, nine larger ochre/brick marks in a circle to the right.
- thumb.png (720×720): byte-identical across three independent renders.
