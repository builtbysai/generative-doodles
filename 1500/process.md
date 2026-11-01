# №1500 "Silence Full of History" (claire-atherton CA5, PP747)

## Frame one (t = 0, verified at 1280×900, 390×844, 720×720)

Open cream field, full frame. A dust-grey road runs diagonally from lower
left to upper right and ends at the house. Deep green trees flank the road.
A small cream house with a walnut roof and an empty walnut porch sits at
upper right. No figures yet, no gold tint yet — the landscape is entirely
still, as the prompt's return loop requires. No visible text except
`<title>`.

## Mechanics (all closed-form over loop-local time and recorded events)

- 60 s return loop, two visits per loop so the tint deepens with each
  return, exactly as specced:
  - 0–10 s: stillness, tint 0, no figures.
  - Visit 1 (10–22 s): figures appear 10–13 s, gesture 13–19 s, fade
    19–22 s. Tint rises to 0.15 during the visit and eases to 0.12 by 30 s.
  - Visit 2 (30–42 s): same appear / gesture / fade shape. Tint rises to
    0.30 and holds through the fade.
  - 42–60 s: tint decays linearly back to exactly 0, so the loop closes.
- Figures: a row of four seated abstract figures along the road's lower
  edge, small, never centre frame, in slate / brick / charcoal / slate.
  Each has a bench line, torso rect, cream head disc with a dot eye facing
  the road (never at the viewer), a mouth-line opening and closing on a
  3 s period, and two hand discs swaying on a 2 s period — both periods
  divide the 60 s loop, so gesture motion never breaks loop closure.
- Tint: a faint gold wash drawn as a flat-alpha stroke over the road band
  (alpha = tint × 0.45, rounded to 4 decimals). Never a gradient.
- Drag: pointerdown near the road starts a scrub; pointer x maps to loop
  time (scrub = downT + dx/W × LOOP, wrapped), stored as an anchor offset
  so release resumes the loop from the scrubbed position with no jump and
  no restart. Drags starting away from the road are ignored. Drag never
  summons a figure permanently (figures exist only inside visit windows),
  never clears the tint instantly (the tint is a pure function of loop
  time), never adds a voice.

## Adaptations

- Landscape as static layers; figures as a timed group with
  appear / gesture / fade states; road tint as an accumulated value with
  slow decay (implemented as the piecewise-linear tint curve above, which
  is exactly periodic); drag maps pointer x to the tint / visit phase.
- The road ends inside the house footprint so it never pokes past the
  roof (see fix rounds).
- House sized from the min dimension and anchored to the right edge so it
  never clips on portrait phones.
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, getUserMedia, or text drawing.
  Fading alphas rounded to 4 decimals; dots as own-beginPath arcs with
  moveTo first (node-canvas quirks).

## Determinism

Frame one = draw(0) via boot flag, clock starts only with the rAF loop
(plain function declaration behind a typeof guard). Every animation value
derives from loop-local time (t mod 60) — the №1482 lesson applied from
the start. All decoration from mulberry32 (seed 1500000), never
Math.random. Token scan clean (no Math.random, fillText, createElement,
AudioContext, getUserMedia, gradients, shadowBlur, Path2D).

## Verification (forced-time probe, vm-isolated instance, real node-canvas,
piece driven via window.__piece; harness at tmp/probe1500.js)

- t = 0 redraw 0 px; fresh instance t = 0 identical; t = 60 vs t = 0 =
  0 px; t = 120 vs t = 0 = 0 px (loop closes exactly, twice over).
- tintAt: 0 → 0, 20 → 0.15, 40 → 0.30, 60 → 0.
- figAlphaAt: 0 → 0, 16 → 1, 35 → 1, 50 → 0.
- Slate px (figures only): 0 at t = 0, 4,568 at t = 16, 0 at t = 50.
- t = 16 vs t = 0 differs 126,082 px (visit live); t = 16 vs t = 17
  differs 113,120 px (gesture live plus the tint step across the whole
  road band); t = 50 vs t = 0 differs 113,097 px (tint decay tail).
- Drag: down on the road midpoint at elapsed 5, move +640 px → anchor
  0 → 30, scrubbed lt 35 (visit 2 gesture), figAlpha 1; after release,
  lt advances to 36 (resumes, never jumps back). Off-road drag leaves
  the anchor unchanged.
- Thumb byte-identical across repeated renders (720×720).
- Mid-loop render at t = 16 inspected: four seated figures along the
  road's lower edge, bench lines, cream heads, dot eyes, mouth lines,
  hand discs, no tree collisions, no text.

## Fix rounds

1. First desktop render let the road poke past the house roof as a grey
   triangle, and the house went tall and narrow on portrait phones.
   Road endpoint moved inside the house footprint; house sized from the
   min dimension and anchored to the right edge. All renders re-done.
2. First mid-loop render had a tree canopy overlapping one figure's head
   and bench. That tree was moved twice (first move put its canopy under
   the figure's bench line; second move clears the whole figure row).
   All renders and probes re-done after each move; final mid-loop render
   inspected and clean.
