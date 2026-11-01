# №1302 — Le Chiffonnier

Karen Kraven KK7 (PP469). Grounded in Kraven's *Le Chiffonnier / The Ragpicker*,
2022: bins "harbouring textile refuse... now homed, protected, and sheltered in
these carriers."

## What it is

Four open-top bins in a row across the lower half of a soft-lit sorting room,
the upper half calm negative space (the room's air). Each bin is a thin steel
line cage holding a translucent cotton membrane, and each holds a different
sorted category of textile refuse: indigo, madder, undyed, black. Seeded piles
of small scraps peek above each rim, and eight loose scraps rest on the piles,
ready to be sorted.

## Interaction

- Drag a loose scrap: it lifts and follows the pointer. Release over a bin and
  it arcs in; the pile grows and the cotton bulges slightly. Release anywhere
  else and it arcs back to its pile.
- Left alone, the ragpicker's care continues without you: every 16 seconds
  (first at t = 10 s) one scrap lifts out of a bin, drifts along an arc, and
  settles into another bin.
- Stitch lines on the cotton shimmer faintly (animated dash offset) when the
  pointer hovers a bin.
- Never click-to-reload. No scores, no timers, no gamification; the bins stay
  tidy, the refuse treated as treasure, never as mess.

## Determinism

Frame one is exactly t = 0 via a boot flag; the clock starts with the rAF loop.
Auto-sort events are a closed-form function of piece time: event i starts at
10 + 16i seconds, its scrap and target bin drawn from a mulberry32 stream keyed
by event index, never Math.random. Dragged and dropped scraps are closed-form
functions of the recorded drag/drop events and t. Two fresh loads render
byte-identical; the thumb was rendered three times with byte-identical output.

## Mechanics verification (node harness, temp probe, discarded)

- Fresh loads identical: true.
- Pixels changed t = 0 to t = 12 (first auto-sort event settled): 8,973.
- Drag of scrap 0 from bin 0 to bin 2, drop arc complete: 9,060 pixels changed.
- Bin geometry: floor line at 0.86H, bins receding left to right
  (scales 1.00 / 0.96 / 0.92 / 0.88); cotton bulge = pile count plus a slow
  9-second breathing sine, so bins breathe with their contents.

## House rules

Visual Viewport sizing with resize listeners on visualViewport and window;
canvas pinned in draw() via style width/height in px; phone detection via
window.screen physical size with aspect fallback; field composition full-bleed
on phones (verified at 390 wide, all four bins fit). No gradients, no
shadowBlur, no filters, no offscreen canvas, no AudioContext, no getUserMedia;
dots and scrap polygons drawn as paths with moveTo before each subpath. No
visible text except the title. Silent.
