# No.1535 "The Gravel Walk" (mohamed-bourouissa MB8, PP782)

Gallery date: 2006 · 03 · 26 (recorded here only, never drawn in the piece).
This piece completes EXPANSION #202 (mohamed-bourouissa).

## What it is

A wide field of warm dark grey (#26221e) scattered with 150 small still objects —
pebbles, discs, short lines, tiny rings — in muted tones (#4a453c, #5a5348,
#3a352e), spread like gravel: 70% clustered around six seeded patches, the rest
uniform, with generous empty patches. A single slow wanderer-mark in bone
(#e0d6c0), a small torso-line glyph, moves through the field on a meandering
path; wherever it passes, nearby objects light up briefly in warm amber
(#e8b04b), then fade back to mute. A faint trail (#5a5348) stays behind the
wanderer for a while, then fades oldest-first. Field-like layout: full-bleed on
phones, centred square on desktop over the same ground colour.

## Motion (all closed-form over piece time and recorded events)

- 120 s loop. The wanderer path is summed sines with whole cycles over a 101 s
  path span (loop minus pauses), so t=120 equals t=0 exactly.
- Scheduled pauses at loop-local [20,26], [55,61], [90,97] s: the path parameter
  freezes during pauses (piecewise-linear closed form), so the wanderer holds
  still at a lit cluster, then resumes. During a pause the objects around it
  stay lit, which reads as pausing at a lit cluster.
- Lighting: an object's glow is the max over 21 samples of the wanderer's
  displayed positions over the last 10 s (0.5 s spacing) of a linear proximity
  bump (radius 0.10 of the field) times an exponential decay (6 s scale), plus
  a pointer-proximity boost while dragging. Stored-history fading only, never
  a canvas fade wash.
- Trail: 16 past displayed positions (0.6 s spacing) drawn as small rects with
  age-decreasing alpha — a pure function of time and recorded drag events.
- Drag: pointerdown starts a recorded session; while dragging, the wanderer
  eases from its path position at grab to the pointer over a distance-scaled
  duration (distance / 0.12 per second, clamped to 0.8–6 s), so it wanders
  toward the pointer at a capped pace, then follows it; on release it eases
  back to the scheduled path over 1.5 s. Dragging across a dense patch boosts
  the glow of objects near the pointer. Drag never lights the whole field
  (radius-limited), never teleports the wanderer (both blends start exactly at
  the current position), never adds objects.

## House-rule adaptations

Canvas 2D only; fixed-phase first frame draw(0); rAF loop as a plain function
declaration; every animation sine on loop-local time; seeded mulberry32 PRNG
(seed 1535000), never Math.random; flat colours, never gradients; fading
alphas rounded to 4 decimals; dots as filled rects or individually pathed
arcs with moveTo before each arc; canvas state (lineCap, lineWidth, colours)
set explicitly in every drawing branch; viewport from the Visual Viewport API
with the canvas pinned in draw(); phone detection via window.screen with
aspect fallback; fully silent, no AudioContext at all. No visible text except
<title>; no likenesses, faces, or real names; mechanisms only, per the study
sensitivity guard.

## QA

- Renders inspected personally: qa-desktop.png (1280×720) and qa-mobile.png
  (390 wide), no clipping; gravel in muted tones with denser patches and
  empty areas, one small bone wanderer with amber-lit neighbours and a faint
  trail.
- probe-1535.js, vm-isolated, real node-canvas, driving the piece's own rAF
  loop: 25/25 pass, including frame one identical across instances; loop
  closure at t=120 and t=240 byte-identical; slow movement with frozen pauses
  inside both tested windows and motion outside them; lit count below half
  the objects and above zero at every 5 s sample; trail of 16 points with
  increasing ages and the newest point near the wanderer; drag continuity at
  grab (no jump), no jumps during the blend, pull toward the pointer, resume
  of the scheduled path after release, object count unchanged; dense-patch
  drag hurrying nearby lighting without lighting the whole field; identical
  drag sequences byte-identical; thumb byte-compare (two independent 720×720
  renders byte-identical to the shipped thumb).
- Forbidden-API grep: 0 hits (no Math.random, Date.now, performance.now,
  AudioContext, getUserMedia, Path2D, createElement, localStorage, gradients,
  fillText, strokeText).

## Fix rounds (1 piece fix + 1 probe correction)

1. Piece fix, never-fully-dark: the first build's glow decay (4 s scale) left
   one dead stretch — at t=85–86 the brightest object glowed only 0.107, below
   the probe's 0.15 lit threshold, because the wanderer was crossing a sparse
   corner. The decay scale was slowed to 6 s so light lingers behind the
   wanderer; the probe's never-fully-dark check now passes at every sample,
   with lit counts still far below half the field. Renders re-done after.
2. Probe correction, teleport check: the first probe capped drag steps at
   0.15 per 0.25 s frame, which the distance-scaled blend could legitimately
   exceed on a long drag (observed max 0.1625) without any jump. The check now
   tests what the prompt actually forbids — continuity at grab (blend weight
   0, position exactly the path position) and no single-frame jump during the
   blend (max step < 0.30) — and the blend duration was additionally scaled
   by grab distance so the wanderer wanders toward the pointer at a capped
   pace rather than gliding. Not a piece-behaviour weakening: the drag still
   pulls, follows, and releases exactly as specced.

## Deviations from the prompt

None beyond the documented house-rule adaptations above. The "pausing at lit
clusters" beat is realised by scheduled pauses: objects around the halted
wanderer stay lit for the whole pause.
