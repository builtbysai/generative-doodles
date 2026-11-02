# №1519 "The Crowd Wave" — clement-cogitore CC8 (PP766)

Gallery date: 2006 · 03 · 10 (formula date; recorded here only, never drawn in the piece).
Completes EXPANSION #200 (clement-cogitore) at №1519.

## Spec (prompt, verbatim in substance)

Field dark slate #1c2028 filled with hundreds of tiny identical warm-grey
dots #9a9aa0 in even rows; a wave passes through them (each row rises and
falls in turn, one organism breathing, slower and heavier than a stadium
wave; crest highlight cream #e8e0d0, deep shadow #101318); a few long thin
faint-gold verse-lines #c9a86a drift across high in the frame like subtitles
of an absent song (lines only, never letters). Watch-first crowd-wave loop,
wave rolls continuously, never stops, never breaks; wave travels left-to-right
and bottom-to-top in turn. Dragging across the field pushes the wave's crest
ahead of the pointer (crowd follows, settles back); dragging vertically
raises/lowers wave height slightly. Drag never scatters the dots, never stops
the wave, never isolates a dot. Dots as a grid with per-dot phase from a
travelling wave function; drag as a local wave-phase push with decay. Avoid:
faces, a stadium, flags, text or letters, a single hero dot, the wave
breaking into chaos. Seed 1519000.

Study guard: abstract shapes only, no likenesses, no real names, no readable
text anywhere, no depiction of children, soldiers, or any identifiable event
or ritual. The verse-lines are lines only, never letters.

## How it is built

- Grid: even rows/columns of identical square dots (4 px at 720, spacing
  18 px), full-bleed on phones, a centred square on desktop over the same
  #1c2028 page ground.
- Loop: 48 s. The wave travels left-to-right for 24 s, then bottom-to-top
  for 24 s, with 2 s smooth crossfades centred on the turns. Both wave
  clocks advance with period 24 s, so the field is continuous across the
  turns and across the loop wrap; frame one is a pure left-to-right wave
  at phase 0. Every animation value runs on loop-local time (t mod 48).
- Dot colour follows the wave value: above 0.65 cream (crest), below -0.65
  deep shadow (trough), else warm grey. Dots bob vertically by amplitude
  × wave value; no dot ever changes size or leaves the grid.
- Verse-lines: three long thin faint-gold lines at 5%, 9%, 13% of field
  height, drifting horizontally with crossing periods 48 s, 24 s, 16 s
  (all divide 48 s), so each returns to its start at the loop wrap. Their
  start offsets come from the seeded mulberry32 stream (seed 1519000).
- Drag (closed-form over recorded drag segments, never frame-integrated):
  each pointermove segment contributes a local phase push,
  -(dx / field width) × 2π × Gaussian falloff around the segment ×
  exp(-age / 4 s), so a rightward drag moves the crest right ahead of the
  pointer and the crowd settles back as the push decays (segments older
  than 24 s are dropped, so a drag never recurs at the next loop wrap).
  The sign is deliberate: the crest of sin(2π(bx/fw - px) + push) sits at
  bx = fw(px - push/2π), so the push takes the opposite sign of dx.
  Vertical drag adjusts amplitude: amp = clamp(1 + Σ(-dy / height) × 0.6
  × exp(-age / 4 s), 0.7, 1.3); drag up raises the wave, drag down lowers
  it. The prompt does not assign up/down, so this mapping is recorded
  here; drag never scatters dots, never stops the wave, never isolates
  a dot.
- Fully silent: no AudioContext, no getUserMedia, no gradients (flat-alpha
  verse-lines only), no visible text except the <title> element.

## QA (probe-1519.js, vm-isolated, real node-canvas) — 23/23 pass

- Frame one identical across fresh instances; loop closure at t=48 and
  t=96 vs t=0 byte-identical.
- Crest centroid x at t=0/6/12: 180 → 360 → 540 (travels left-to-right);
  crest centroid y at t=30/36: 366 → 186 (travels bottom-to-top).
- Wave present at t=0/6/12/18/24/30/36/42: cream ≈ 4800 px and shadow
  ≈ 4800 px at every sample; dot-pixel count stable within 10%.
- Verse-lines: 661 gold px in the top band at t=0, 528 px at t=12, centroid
  x moves 415 → 475 (drifting).
- Horizontal drag (360,360)→(480,360): frame differs from control by
  26,592 px at t=11, dot count within 2%, cream still present; band cream
  centroid moves 504 → 523 (crest pushed ahead of the pointer); dragged
  frame at t=40 is byte-identical to control (settled back).
- Vertical drag: crest-band topmost cream y is 14 (control), 16 (drag up,
  crest dots pushed further down), 13 (drag down).
- Forbidden-API grep clean: no AudioContext, getUserMedia, Path2D,
  createElement, localStorage, Math.random, Date.now, performance.now,
  fillText, strokeText, gradients.

## Fix rounds

1. Probe-harness correction only (not a piece change): the first probe run
   compared a PNG buffer against raw image data for dragged frames; the
   probe now returns raw image data for dragged runs. All piece probes
   then passed unchanged.
2. Comment rewording only (not a piece change): two comments named
   wall-clock timer APIs, tripping the forbidden-API grep; reworded to
   "wall-clock-derived elapsed time". Renders re-done after the edit;
   thumb md5 unchanged, probes re-run 23/23.

## Deviations from the prompt

None beyond documented house-rule adaptations: canvas 2D throughout;
closed-form motion; dots as filled squares (node-canvas arc quirk);
verse-lines drawn at 0.55 flat alpha; vertical-drag up/down mapping
assigned here since the prompt does not assign it; frame one is a pure
left-to-right wave (the crossfade design puts the direction turn at
τ=24, not at frame one).
