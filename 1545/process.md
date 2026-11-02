# №1545 "Four Channels, No Front Row" (elissa-blount-moorhead EM2, PP792)

Gallery date: 2006 · 04 · 05 (formula date, recorded here only, never drawn in the piece).

## What it is

The frame is split into four equal panels in a 2x2 grid on deep warm black
(#141210), divided by faint lines (#3a352e). Each panel runs its own small
loop at its own speed, all four at once, forever, with no shared beat:

- Panel one (top left, bone #ddd3b8): dots drifting on closed-form
  sinusoidal paths.
- Panel two (top right, ochre #c98f3d): bars rising and falling.
- Panel three (bottom left, muted red #a34a2e): a ring slowly rotating.
- Panel four (bottom right, pale teal #7a9a92): a line that draws itself
  and then erases itself.

No panel is larger, brighter, or faster by design.

## Loop structure

360 s super-loop. Panel durations are seeded picks (seed 1545000) from the
divisors of 360 in [8, 30]: 10, 24, 30, 12 seconds, all distinct, so every
panel closes exactly at t = 360. Each panel also carries a seeded phase
offset, so no two panels share a beat and frame one shows every panel
mid-motion. All motion is closed-form over piece time and recorded drag
events; panel clocks never sync.

## Interaction

- Pressing a panel brightens it (full mark alpha) and dims the other three
  (0.45 alpha) while pressed; releasing restores the balance. Panels keep
  advancing while held.
- Pressing near a divider (within 14 px) drags that divider: the vertical
  divider clamps to 0.38–0.62 of the width, the horizontal to 0.38–0.62 of
  the height, so one panel widens slightly (its marks spread) and its
  neighbor narrows. Releasing restores the equal grid.
- Drag never stops a panel, never merges panels, never designates a main
  panel. A press near the divider crossing drags the vertical divider
  (recorded reading).

## House adaptations

Canvas 2D only; fixed-phase first frame (draw(0)); rAF loop as a plain
function declaration; viewport from the Visual Viewport API with the canvas
pinned in draw(); phone detection via window.screen with aspect fallback;
field-like composition, full-bleed on all sizes (panels fill the frame).
Fading alphas rounded to 4 decimals; dots drawn as filled rects; fully
silent (no AudioContext at all); no gradients, no Path2D, no
document.createElement, no localStorage, no offscreen canvas, no
ctx.filter, no shadowBlur; canvas state set explicitly in every draw
branch. No visible text except <title>; no likenesses, no faces, no real
names, no readable text anywhere.

## QA

Rendered from the live script with render-piece.js: desktop 1280x720 and
mobile 390 wide inspected personally — four equal panels, thin dividers,
one loop system per panel, no dominant panel, no clipping. Thumb 720x720
byte-compared against two independent renders.

probe-1545.js (vm-isolated, real node-canvas, driving the piece's own rAF
loop with a dummy anchor call): all probes pass — frame one identical
across fresh instances; loop closure byte-identical at t=360 and t=720;
dividers centered and panels exactly equal at rest; durations in [8,30]
and all distinct; panel 0 phase repeats after its own duration; every
pair's circular phase distance traverses a range > 0.47 over 60 s (drifting,
never locked) with coincidence at 4.13% of samples; panel drag sets focus
to that panel only (alpha 1 vs 0.45), dims a sampled mark pixel
(221,211,184 → 110,105,92) and restores both on release; panels advance
while held; vertical divider drag moves divX 360 → 430, widening the left
panel 360 → 430 and narrowing the right 360 → 290, spreading left-panel
marks, and restores on release; horizontal divider drag narrows the top
row 360 → 300; identical drag sequences byte-identical; forbidden-API
grep 0 hits.

## Fix rounds

Probe-side correction only, no piece change: the first no-lock check
failed (maxRun=5) because slow phase crossings legitimately spend a few
consecutive 0.5 s samples within 0.02 phase (the 10 s vs 12 s pair drifts
at 1/60 cycle per second, so a crossing lasts ~2.4 s). The check now
proves drift instead — every pair's circular-distance range over 60 s
exceeds 0.47 — plus a bounded close-run check. No piece fix rounds.
