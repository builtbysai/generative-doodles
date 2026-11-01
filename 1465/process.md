# №1465 "Jeanne's Schedule" (delphine-seyrig DS2, PP712)

## What it is
A small apartment seen as a flat plan of four rooms (kitchen top-left,
bathroom top-right, bedroom bottom-left, sitting room bottom-right), fixed
camera, no cuts. One figure performs a day of chores in sequence: peeling at
the kitchen table, washing at the sink, bathing behind a screen in the
bathroom, cooking at the stove, sitting in the sitting room, sleeping in the
bedroom. A thin schedule bar along the bottom shows the day's states as
blocks, with the active block scarlet and a playhead; three small squares at
the bar's right mark the current day.

## Motion
Watch-first, three-day loop (72 s per day, 216 s full loop). Days one and two
run identically. On day three one chore is skipped (washing) and one gesture
is performed out of order (cooking before bathing), then the day ends and the
loop restarts at day one. The day ends with a short walk from the bed back to
the kitchen table, so the loop point is a continuous walk, not a jump.
Dragging along the schedule bar scrubs the day forward or back; releasing
resumes from that state. Drag never restarts the day, and dragging outside
the bar does nothing.

## Adaptations
- Day as a timed state machine with three day-scripts (two identical, one
  deviating); figure as a flat sprite with one gesture animation per chore
  (peeling arm oscillation, washing scrub, bathing behind a screen panel,
  cooking stir, seated pose, lying sleep pose, walking bob).
- Bathing is shown abstractly and modestly: the figure stands behind a
  screen panel with only head and shoulders visible, plus small steam wisps.
  No nudity, no violence, no client, no text anywhere except `<title>`,
  no moralizing ending.
- Schedule bar as blocks proportional to segment durations, active block
  scarlet, playhead in skin tone; day dots mark the current day.
- Fully silent (no AudioContext at all); no offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, or getUserMedia; no fading alphas at
  all (all fills solid); dots as filled rects or own-beginPath arcs
  (node-canvas quirks).
- Determinism: frame one = draw(0) via boot flag, clock starts only with
  the rAF loop (plain function declaration behind a typeof guard); all
  decoration from a seeded mulberry32 PRNG (seed 1465000), never
  Math.random (the single token hit is a comment stating it is never used).
- House rules: canvas sized from Visual Viewport API with resize listeners
  on visualViewport and window; canvas pinned in draw(); phone detection
  via window.screen physical size with aspect fallback; field-like plan
  goes full-bleed on phones, checked at 390 wide.

## Verification
- Rendered with node ~/workspace/tools/render-piece.js at 1280x900,
  390x844, and 720x720; all three inspected. Thumb byte-identical across
  repeated renders.
- Forced-time probe harness (vm-isolated instance, piece driven via
  window.__piece): frame one is the peel state at the kitchen table
  (3,984 dress px, 8,019 scarlet px); day-one vs day-two frames at the same
  dayTime differ only by the day-dot marker (391 px); day-three sequence is
  peel, walk, cook, walk, bathe, walk, sit, walk, sleep, walk (no wash,
  cook before bathe); t = 216 vs t = 0 = 0 px (loop closes exactly); chore
  states probed at t = 5 peel, 17 wash, 30 bathe, 44 cook, 55 sit, 65 sleep;
  bar drag scrubs the journey (10 to 36 at mid-bar) and release resumes
  the advance (38 at t = 12); drag outside the bar leaves the journey
  untouched; token scan clean for fillText, strokeText, createElement,
  Path2D, AudioContext, getUserMedia, shadowBlur, and gradients.
- Bathe (t = 30) and sleep (t = 65) frames rendered and inspected: figure
  behind the screen in the bathroom, lying flat in the bedroom bed, with
  the schedule bar's active block tracking each state.
- No fix rounds needed.
