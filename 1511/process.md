# №1511 "Carnets de là-bas: The Notebook That Remembers" (sonia-wieder-atherton SW8, PP758)

Gallery date: 2006 · 03 · 02 (formula date 2002-01-10 + (N+1) days; recorded here only,
never drawn in the piece).

## What it is

A field of 30 small scattered fragments on a full-bleed cream field: torn
paper-shapes (jagged hexagons), short line motifs (4-point polylines with a
small square dot at the start), and faded colour patches (flat-alpha
ellipses). All marks are abstract; no handwriting, no letterforms, no diary,
no photograph, no fixed final page, no teacher figure, no visible text
except `<title>`.

## Palette (strict)

- Field cream #e8e0d0 (also the page ground on phones).
- Fragments: slate #4a5a7a, walnut #6b4a3a, teal #2e6f6a, brick #a8674a,
  background grey #b8bcc0.
- Assembled-state gold edge #d9a441, faint (alpha 0.35 max).
- No other color. Fully silent (no AudioContext at all).

## Composition

Fragments spread across the full frame, small (0.028–0.052 of min dimension).
24 fragments take assembly slots; the last 6 are strays that always drift and
never join, so during an assembly the field keeps scattered fragments at the
edges — never empty, never full.

## Reassembly timing

One cycle = 60 s: drift 0–16 s, gather 16–28 s (smoothstep), hold 28–38 s,
release 38–48 s (smoothstep back), drift 48–60 s. During hold the 24 slot
fragments sit in a 6 × 4 page grid near the centre (page rect 0.58W × 0.60H)
inside a faint gold edge rect.

## Mutation scheme (determinism)

The prompt requires each reassembly to differ from the last, while the house
determinism rule requires the loop to close exactly. Resolution: the loop is
240 s = 4 × 60 s cycles, and the mutation repeats every 4 cycles, so
t = 240 is byte-identical to t = 0 while cycles 0–3 each differ.

Per cycle k (k mod 4), from mulberry32(1511000 + k·7919 + 13):
- a fresh shuffle of the 24 slot assignments (which fragment takes which
  grid slot),
- per-fragment jitter (±0.015 of min dimension) and tilt (±0.12 rad),
- a small page-rect offset (±0.02 of frame in each axis).

Drift itself is closed-form sines on absolute piece time with periods
60/80/120/240 s (all divide 240), so drift also closes at t = 240.
Fragment drift/gather/release positions are pure functions of piece time and
the recorded drag events — never frame-integrated state. Every animation
sine runs on loop-local or absolute time with a period dividing 240 s.

## Drag mapping (closed-form over recorded events)

- Pointer down hit-tests the nearest fragment within 0.06 of min dimension.
- While held, the fragment follows the pointer (grab offset preserved).
- On release, if the release point is closer to the centre than the grab
  point by more than 0.03 of min dimension, the fragment is marked
  early-joined for the current cycle: it sits at its assembly slot for the
  rest of that cycle (including during the drift phase) and releases with
  the rest.
- If the release point is farther from the centre than the grab point by
  more than 0.03 of min dimension, the fragment is marked held-out for the
  next cycle: it keeps drifting through that cycle's gather/hold.
- Marks expire after their cycle, so drag never pins a fragment, never
  completes a fixed page, and never writes on a fragment.

## House-rule compliance

- Canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height.
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect fallback; field-like composition is full-bleed at 390 wide
  with no clipping (verified in qa-mobile.png).
- Fixed-phase first frame (frame one = draw(0), drift phase, fragments
  scattered); rAF loop is a plain function declaration with typeof guards.
- No offscreen canvas, Path2D, ctx.filter, gradients (flat-alpha only),
  shadowBlur, document.createElement, WebGL, getUserMedia, localStorage,
  Math.random, Date.now, or performance.now (forbidden-API grep clean).
- Dots as filled rects; each ellipse on its own beginPath; every fading
  alpha rounded to 4 decimals before stringifying (node-canvas quirks).

## Probe results (probe-1511.js, vm-isolated instance, real node-canvas)

- Frame-one redraw identical: 0 px; fresh instance frame one identical: 0 px.
- Loop closure: t = 240 vs t = 0 = 0 px; t = 480 vs t = 0 = 0 px.
- Hold phase: mean distance of slot fragments to their slots 0.00 px at
  t = 33; drift phase mean distance 277.0 px at t = 10, 278.4 px at t = 55.
- Cycle 0 vs cycle 1 page differs: 89,933 px; cycle 4 repeats cycle 0: 0 px.
- Drag toward centre: fragment reaches its slot exactly (0.0 px) at t = 10
  during the drift phase, and returns to its drift position by t = 55.
- Drag away: held-out fragment 144.8 px from its slot at the next cycle's
  hold (t = 93) while the control fragment sits at its slot (0.0 px).
- Field coverage: non-field pixels 55,038 at t = 0, 61,323 at t = 33,
  56,066 at t = 55, of 518,400 — never empty, never full.
- Gold edge: alpha 0 at t = 10 (drift), 0.35 at t = 33 (hold).
- Thumb byte-compare: two independent 720 × 720 renders byte-identical to
  the shipped thumb (md5 2ceb1347821db410b578ea05b81d7299).
- Renders inspected personally: qa-desktop.png (frame one, scattered field),
  probe-hold.png (t = 33, page grid inside the faint gold edge with strays
  outside it), qa-mobile.png (390 wide, full-bleed, no clipping).

## Fix rounds

1. Piece fix (robustness): the first size() used a ternary whose else branch
   evaluated `window.innerWidth` even when `window` was undefined, throwing
   in a bare harness. Rewrote size() with fully guarded branches (visual
   viewport, else window, else 720 × 720 fallback). All probes and renders
   re-run after the fix; the piece file's final md5 is
   8c7b428126839f40a959fbb697cb5669.
2. Harness-only correction: the probe harness initially restored globals
   after eval, which the piece's later draw() calls do not tolerate; the
   harness now leaves globals set (as render-piece.js does). No piece change.

## Deviations from the prompt

None beyond the documented house-rule adaptations above: the 240 s
four-cycle loop (so the loop closes exactly while each reassembly differs),
the 6 never-joining stray fragments (so the field is never empty or full
during hold), canvas 2D throughout, closed-form drag state, and full
silence. The prompt's "background grey" tone is used for grey fragments and
the grey dots of the piece's own palette, never as text.
