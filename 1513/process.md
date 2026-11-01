# №1513 "Krump Meets Rameau" (clement-cogitore CC2, PP760)

Gallery date: 2006 · 03 · 04 (formula date, recorded here only — never drawn in the piece).

## Palette (only these colors)
- Stage near-black `#101014` (full-bleed ground)
- Strict row parchment gold `#c9a86a`
- Burst row signal red `#c23b2a`
- Shared pulse line faint cream `#e8e0d0`
- Floor line grey `#55565e`
- No other color. Grep-verified: only these five hex values appear in the file.

## Composition
- Two horizontal bands on a dark stage: strict row upper, burst row lower, sharing a
  center pulse line (faint cream, alpha 0.35) across 0.15W–0.85W, with a grey floor
  line at 0.74H. Wide empty margins left and right (marks span 0.18W–0.82W).
- 7 abstract dancer-marks per row, each a line glyph: torso line + two arm lines +
  two leg lines. No faces, no realistic bodies, no stage curtain, no beat grid, no text.
- Row centers sit at pulseY ∓ gap × 0.22H (default gap 0.5 → 0.11H each side).
  Gap clamps to [0.30, 0.85], so the bands can never merge: at minimum gap the
  strict band's bottom edge stays above the burst band's top edge (probe-verified).

## Timing and sequencers
- One master clock. Pulse = 2 s; cycle = 8 pulses = 16 s; loop = 4 cycles = 64 s.
  Loop-local time lt = effT mod 64; every animation sine runs on loop-local time.
- Strict row: mirrored step sequencer. Arm/leg angles interpolate (smoothstep) between
  per-pulse steps; the step tables are symmetric loops (first step = last step), so
  the row is continuous across pulse and cycle boundaries. A small hop rides each pulse.
- Burst row: percussive impulse sequencer. Moves per pulse:
  pop, swing, stomp, freeze, swing, pop, freeze, stomp. Each move has an
  attack/sustain/release envelope inside the pulse; freeze holds the previous pulse's
  mid-pose. Burst poses carry a baseline articulation (arms ±0.18, legs ±0.12) so a
  mark reads as a dancer-mark even at rest (env 0).
- Borrowing / swap: every fourth cycle (cycle index 3), mark 3 of each row performs
  the other row's move for that pulse — the strict mark bursts, the burst mark steps.
  All other marks stay native, and both rows keep their own colors, so neither style
  ever wins and both stay legible.
- Frame one is the fixed phase lt = 0 (cycle 0, pulse 0): strict row in step 0, burst
  row in pop at rest. Drawn synchronously at load; the rAF loop anchors its clock on
  its first call and is guarded by a typeof check (the QA renderer defines no rAF).

## Interaction (closed-form over recorded events, never frame-integrated)
- Pointer drags classify on the first move over 12 px by dominant axis and keep that
  type for the drag:
  - Horizontal drag (along the pulse line): sets the shared clock rate for the drag's
    span, rate = clamp(1 + dx/1000, 0.85, 1.15). Effective time is the closed-form
    integral of rate over recorded drag segments, so both rows speed up or slow down
    together and the accumulated phase offset persists after release.
  - Vertical drag (between the rows): sets the row gap persistently until the next
    vertical drag, gap = clamp(0.5 + dy/600, 0.30, 0.85). Dragging up pulls the rows
    closer; dragging down pushes them apart.
- Gap also drives borrowing timing: when gap < 0.35 the swap cycle moves from 3 to 2,
  so pulling the rows close makes the borrowing happen one cycle sooner. Drag never
  stops a row, never merges the rows, never changes a row's color, never reloads.

## House-rule compliance
- Canvas size from the Visual Viewport API (visualViewport + resize listeners on
  visualViewport and window, never window.innerWidth/Height alone); canvas pinned in
  draw() via canvas.style.width/height in px.
- Phone detection via window.screen physical size (min dimension < 700 px) with
  aspect h > w*1.15 as fallback; checked at 390 wide (full-bleed, no clipping).
- Fixed-phase first frame; rAF loop as a plain function declaration.
- Fully silent: no AudioContext at all. No offscreen canvas, no Path2D, no ctx.filter,
  no gradients (flat-alpha layers only), no shadowBlur, no document.createElement,
  no WebGL, no getUserMedia, no localStorage, no Math.random, no Date.now,
  no performance.now (forbidden-API grep clean).
- node-canvas quirks honored: every line on its own beginPath; fading alphas rounded
  to 4 decimals (the pulse line's 0.35 is exact); no batched arcs.
- Size function uses fully guarded branches (visualViewport, else window, else
  720×720 fallback) — the №1511 lesson about a ternary else-branch evaluating
  window.innerWidth when window is undefined.

## Probe results (probe-1513.js, forced-time harness, real node-canvas)
All 23 probes pass, first run except the fix round below:
- Frame-one redraw identical: 0 px; fresh-instance frame one identical: 0 px.
- Loop closure: t=64 vs t=0 = 0 px; t=128 vs t=0 = 0 px.
- Shared pulse: pulse index 2 at t=20; cycle 3 at t=50.
- Swap: cycle 0 mark 3 native (strict=strict, burst=burst); cycle 3 mark 3 swapped
  (strict=burst, burst=strict); cycle 3 mark 2 stays native.
- Horizontal drag (+200 px, t=5–6): effT(20) = 20.15 exactly; dragged frame differs
  from undragged at t=20 (4,080 px after the fix); both rows share the dragged pulse.
- Vertical drag up (−120 px): gap = 0.30, swapCycle = 2, cycle 2 mark 3 already
  swapped, row distance smaller than default (95.04 px on 720).
- Vertical drag down (+120 px): gap = 0.70, swapCycle = 3, cycle 2 mark 3 still native.
- Minimum gap clamps at 0.30; min-gap bands do not overlap (strict bottom 357.84
  vs burst top 362.16 on 720).
- Palette grep: only the five specced hex values. Forbidden-API grep: clean.

## Fix rounds (1)
- First desktop render: the burst row at frame one read as bare vertical lines. Cause:
  pulse 0 is a pop at phase 0, where the impulse envelope is 0, so every burst angle
  was 0 and all five lines overlapped the torso. Fix: burst poses now carry a baseline
  articulation (arms ±0.18, legs ±0.12) with the envelope adding on top. All probes
  and renders re-run after the fix; pose kinds, timing, and loop closure unchanged.
- Also pre-probe: widened the row spread from 0.18H to 0.22H per side and raised the
  gap floor from 0.25 to 0.30, after computing that at the old minimum gap the two
  glyph bands would have touched. Bands are now provably separate at minimum gap.

## Renders inspected
- qa-desktop.png (1280×720): strict gold row upper, burst red row lower, shared cream
  pulse line, grey floor line, wide margins, both rows legible as articulated marks.
- qa-mobile.png (390 wide): same composition full-bleed, no clipping.
- thumb.png (720×720): rendered from the live script; two independent re-renders
  byte-identical to the shipped thumb.

## Deviations from the prompt
None, apart from the documented house-rule adaptations above (canvas 2D throughout,
closed-form drag state, flat-alpha layers, full silence, fixed-phase first frame).
The prompt's "dragging vertically between the rows" is implemented as: dragging up
pulls the rows closer (borrowing sooner), dragging down pushes them apart (each row
stays purer) — the direction mapping is recorded here since the prompt does not
assign up/down.
