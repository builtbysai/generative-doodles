# No.1549 — The Gathering, Not the Masterpiece (elissa-blount-moorhead EM6, PP796)

Gallery date: 2006 · 04 · 09. Study: elissa-blount-moorhead #204 (network chain
from arthur-jafa #203). Core engine: THE HOUSE THAT REMEMBERS.

## What it is

A wide dark field (#1c1814) with a loose circle of 12 small marks (dots, short
bars, tiny rings), each in its own muted color, facing inward. Marks drift
slowly around the circle on noisy circular orbits; when two marks drift near
each other (within 0.095 of the short side), they exchange one property —
color, shape, or rhythm — with a brief pale flash at their midpoint. No mark
keeps a property for long; the circle's overall palette drifts over the
300 s loop without settling.

## Schedule (closed-form, seeded)

Seeded mulberry32 (seed 1549000). 12 marks: base angles evenly spaced with
small seeded jitter, radii 0.30–0.44 of the short side, orbital speeds 1 or 2
revolutions per 300 s loop, shapes dealt 4 dots / 4 bars / 4 rings from a
seeded shuffle (seed 1549001), colors from the six-color pool, pulse rates
6 / 12 / 18 cycles per loop. 29 proximity exchanges are precomputed by
scanning the fixed orbits at 0.25 s steps with a re-arm margin of 0.03, so
the schedule is exact and reproducible. Property state at loop-local time
tau is the initial assignment plus all scheduled events with time <= tau;
at tau = 0 the state is initial, so t = LOOP is byte-identical to t = 0.

Rhythm means the mark's pulse rate (its breathing scale oscillation), not
its orbital speed — this keeps the proximity schedule exact after rhythm
exchanges. Color exchange: mark i takes mark j's color, mark j takes a new
seeded pool color. Shape and rhythm exchanges are swaps.

## Drag

Dragging a mark grabs it: it follows the pointer while held. Dragging it
toward another mark fires an exchange for that pair at once (one per drag
session per pair, recorded with the session id). Dragging a mark out of the
circle pulls it back on release: a 2 s smoothstep glide from the release
point to its scheduled orbit position. Drag never fixes a mark's color
(scheduled exchanges still apply to held marks), never stops the drift
(other marks keep moving), never adds a mark (always 12). Drag-triggered
exchanges live in the current loop only, so the film-loop restart stays
exact.

## Readings and adaptations

- The prompt's "never repeating exactly" is realized within each 300 s loop
  (the palette drifts without settling across the loop); across loops the
  sequence restarts exactly, the film-loop restart used by sibling pieces.
- Shapes are dealt 4/4/4 rather than drawn per mark: the first seeded draw
  produced zero bars, which would have left one of the prompt's three kinds
  absent. The shape draw still consumes one main-stream random per mark, so
  all other seeded values and the event schedule are unchanged.
- The prompt's radial-gradient wording does not occur here; flashes are
  layered flat-alpha discs, never gradients. Dots are filled squares,
  bars are rotated rects pointing inward, rings are stroked circles.
- Canvas 2D only; closed-form motion over loop-local time and recorded
  events; fading alphas rounded to 4 decimals; fully silent; no
  AudioContext, no getUserMedia, no Path2D, no gradients, no text.
  Script wrapped in an IIFE so no top-level W/H collides with the QA
  renderer's own scope. Viewport from the Visual Viewport API with the
  canvas pinned in draw(); field composition is full-bleed on all sizes.

## QA

probe-1549.js, vm-isolated, real node-canvas, driving the piece's own rAF
loop: all probes pass (frame one identical across instances; loop closure
byte-identical at t=300 and t=600; 12 marks, all three shape kinds, drift
over 60 s, no mark at the center, radii varied; 29 scheduled events, all in
(0, 300); sampled event groups occur on proximity, change only their own
pairs with one property type each, and show a brightened flash disc;
palette histogram drifts across the loop; drag toward another mark records
and applies that pair's exchange; out-of-circle drag returns within 2.5 s
of release and stays; held marks still change color at scheduled events;
other marks keep drifting while one is held; mark count stays 12).
Thumb byte-compare: two independent 720x720 renders byte-identical to the
shipped thumb. Forbidden-API grep: 0 hits. Desktop (1280x720) and mobile
(390 wide) renders inspected personally: loose circle at varied radii,
generous dark margins, no mark at the center, no dominant mark, no
clipping.
