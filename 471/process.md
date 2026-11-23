# No.1546 "The Ordinary Gesture, Archived" (elissa-blount-moorhead EM3, PP793)

Gallery date: 2006 · 04 · 06 (formula date, recorded here only, never drawn in the piece).

## What it is

A dark field (#121014) where one small bone mark at a time performs a tiny
gesture in the upper two-thirds, then the gesture is captured as a small tile
in an archive row along the bottom. The row fills tile by tile, left to right;
when it fills (12 tiles), the tiles replay their gestures in sequence, then
fade oldest-first, and the gathering starts again. Gesture bank of 8 tiny
programs: hop, tilt, pulse, spin, slide, blink, stretch, bounce. Performing
mark bone #e0d6c0 with faint gold #c9a86a trails; archive tiles dark warm grey
#26221e with bone #cfc8b8 marks and one accent tile red #a34a2e per row; row
line faint #3a352e.

## Loop (closed-form, seeded)

Seeded mulberry32 stream (seed 1546000) picks 12 gesture ids and 12 perform
durations in [4, 8) s: durations 6.44, 5.80, 6.02, 5.90, 5.80, 4.75, 4.56, 4.76,
4.82, 4.70, 5.58, 6.50; gestures 6, 3, 1, 6, 3, 3, 4, 4, 2, 2, 5, 2; accent tile
index 0. Super-loop 90.131 s: gather 65.631 s, replay 18 s (12 slots x 1.5 s),
fade 6.5 s (0.5 s stagger, 1.0 s fade, oldest-first). Every animation sine runs
on loop-local time; the frame at t = loop equals t = 0 exactly.

## Interaction

- Dragging on the performing mark makes it repeat its gesture once more before
  tiling: the gesture window doubles and the program plays twice, so the tile
  lands exactly one duration later. A second drag during the repeat adds
  nothing more. The repeat is folded into the schedule as a function of the
  recorded drag events; drag effects reset at the next loop boundary, so the
  loop still closes exactly.
- Dragging on a filled tile replays that tile's gesture early for 1.5 s (only
  that tile; the performer keeps performing, no second performer is added).
- Dragging on an empty tile slot does nothing. Drag never erases a tile
  instantly, never fills the row at once, never adds a second performer.

## House adaptations

Canvas 2D only; fixed-phase first frame draw(0); rAF loop as a plain function
declaration; all motion closed-form over piece time and recorded events;
stored-history trail ghosts (never canvas-fade); flat colors only, never
gradients; fading alphas rounded to 4 decimals; dots as filled arcs with a
moveTo before each arc; fully silent, no AudioContext at all; no visible text
except <title>; viewport from the Visual Viewport API with canvas pinned in
draw(); phone detection via window.screen with aspect fallback (field-like
full-bleed layout on all sizes; phone tile span 0.94 vs desktop 0.90); canvas
state set explicitly in every draw branch. The whole script is wrapped in an
IIFE so its top-level names cannot collide with the QA renderer's module
scope (the renderer evals the script in its own scope).

## QA

- Desktop 1280x720 and mobile 390x844 renders inspected personally: one
  performing mark in the upper area, faint row line, archive row along the
  bottom, small uniform tiles, generous margins, no clipping, no text.
- Mid-loop renders inspected personally: mid-gather shows the slide dot with
  its gold trail and 7 tiles filled left to right (tile 0 red accent);
  mid-replay shows all 12 tiles with slot 5 replaying and the performance
  area empty.
- probe-1546.js: ALL PROBES PASS (32 checks) — frame one identical across
  instances; loop closure byte-identical at t = loop and t = 2 x loop;
  durations in [4, 8); tiles fill left to right one per window; exactly one
  performer (visible iff gather, active <= 1); replay slots 0/5/11 in sequence
  with moving glyphs; fade alphas non-decreasing (oldest-first), tile 0 gone
  and tile 11 full at fade + 2 s, tile 11 nearly gone just before restart;
  exactly one accent tile carries red pixels and its index matches the hook;
  performer drag repeats exactly once (second play running mid-repeat, tile
  delayed exactly one duration, second drag adds nothing, identical drag
  sequences byte-identical); tile drag replays only that tile early with other
  tiles pixel-identical to control and filled count unchanged; empty-slot drag
  does nothing; thumb byte-identical on two independent renders.
- Forbidden-API grep: 0 hits (Math.random, Date.now, performance.now,
  AudioContext, getUserMedia, Path2D, createElement, localStorage, gradients,
  fillText, strokeText).

## Fix rounds

None. All probes passed on the first run; one build-script fix before QA
(the script had to be wrapped in an IIFE after the QA renderer failed on a
top-level name collision with its own module scope) — no piece behavior
change, renders and probes all run after the wrap.

## Deviations

None beyond documented house-rule adaptations, plus two recorded readings:
the seeded stream selects a subset of the 8-program bank per loop (this loop
uses gestures 6, 3, 1, 4, 2, 5); a tile early-replay runs alongside the
performer rather than pausing it, since the prompt's drag rule does not pause
the gathering and forbids only adding a second performer.
