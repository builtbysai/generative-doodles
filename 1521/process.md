# №1521 "Krump Inside the Opera House" (bintou-dembele BD2, PP768)

Gallery date: 2006 · 03 · 12 (formula 2002-01-10 + (N+1) days; recorded here only, never drawn in the piece).

## Spec

A tall formal frame — a symmetrical arched proscenium in pale gold lines — fills the frame. Inside it, two kinds of abstract marks move: a row of small, even, symmetrical baroque-step marks along the top (mirrored left-right, tiny steps), and a burst row of sharp percussive marks below (chest-pop jolts, arm swings, sudden freezes). A single slow pulse line runs between them. Neither row leaves the frame; neither row wins; over the loop each row borrows one move from the other.

Palette (only these colors): stage near-black #121014; proscenium pale gold #c9a86a; baroque row parchment #d8cdb4; burst row signal red #c23b2a; pulse line faint cream #e8e0d0.

Composition: proscenium arch centered, tall; baroque row upper third, burst row lower third, pulse line between; wide dark margins outside the arch.

Motion: watch-first, two-system loop to one pulse. Every fourth cycle one mark from each row swaps one move. Dragging horizontally along the pulse line speeds or slows the shared pulse (both rows follow); dragging vertically between the rows pulls them closer (borrowing happens sooner) or apart (each stays purer). Drag never removes the frame, never merges the rows, never changes a row's color.

Cousin of CC2 "Krump Meets Rameau" — this one keeps the proscenium frame visible and unbreakable; the frame is the point.

## Mechanics

- 7 articulated glyphs per row (torso line + two arm lines + two leg lines), x spread 0.24W–0.76W, inside the arch (0.18W–0.82W).
- Arch: gold stroked outline — two verticals from springY 0.28H to bottomY 0.90H, a symmetrical bezier arched top peaking (bezier midpoint) at 0.25·springY + 0.75·topY, and a base line. The arch is drawn every frame and never changes.
- Timing: pulse 2 s, cycle 16 s (8 pulses), loop 64 s (4 cycles). Baroque row: mirrored step sequencer (arm/leg tables interpolated with smoothstep across each pulse). Burst row: percussive impulse sequencer (pop / swing / stomp / freeze) with a rise-hold-fall envelope; freeze holds the previous pulse's mid-pose.
- Swap: mark index 3 swaps styles from the swap cycle onward — cycle 3 by default, cycle 2 when the rows are pulled close (gap < 0.35). All other marks stay native.
- Interaction (closed-form over recorded pointer events, never frame-integrated): a drag is classified by dominant axis after 12 px. Horizontal (rate) drags retune the shared clock: rate = clamp(1 + dx/1000, 0.85, 1.15), applied over the drag interval, so both rows follow together. Vertical (gap) drags set the row gap persistently: gap = clamp(0.5 + dy/600, 0.30, 0.85); strictY = pulseY − gap·0.28H, burstY = pulseY + gap·0.28H.
- Vertical drag mapping recorded here since the prompt does not assign up/down: drag up = rows closer, borrowing sooner (swap cycle 2); drag down = rows apart, each stays purer (swap cycle 3). At minimum gap 0.30 the row bands are provably non-overlapping (strict bottom 344.88 < burst top 375.12 on 720).

## House-rule adaptations

Canvas 2D throughout; fully silent, no AudioContext at all; no gradients (flat fills and strokes only); no canvas-fade; fixed-phase first frame (draw(0) at load, rAF loop anchored at its first call); every animation sine on loop-local time so t=64 and t=128 are byte-identical to t=0; seeded layout only (no per-cycle random variation, so no mulberry32 stream is needed); rAF loop as a plain function declaration; viewport from the Visual Viewport API with canvas pinned in draw(); phone detection via window.screen with aspect fallback; dots as line glyphs (no batched arcs); fading alphas rounded to 4 decimals (pulse line alpha 0.35).

## Deviations

None beyond the documented house-rule adaptations. Burst poses carry the baseline articulation learned from CC2 (arms ±0.18, legs ±0.12 at rest) so pulse-0 burst marks read as dancer glyphs, never bare vertical lines. The arch top is a bezier curve rather than an ellipse (node-canvas ellipse quirk), symmetrical by construction.

## QA

- Renders inspected personally: qa-desktop.png (1280×720) and qa-mobile.png (390 wide) — gold arch tall and centered with wide dark margins, parchment row upper, red row lower, cream pulse line between, no clipping on either size.
- probe-1521.js, vm-isolated with real node-canvas: 42/42 pass, including frame-one redraw and fresh-instance identity, loop closure at t=64 and t=128, arch verticals/top/base present at t=0 and unbroken at t=30, t=50, after a rate drag, and at minimum gap; rows inside the arch horizontally (0 marks outside) and vertically; both rows legible (3575 parchment px, 3279 red px); pulse line present (864 px); swap only at cycle 3 (cycle 2 still native; other marks stay native); horizontal drag effT(20)=20.15 exactly with both rows sharing the dragged pulse; drag up gap=0.30 with swap cycle 2, drag down gap=0.70 with swap cycle 3; gap clamps at 0.30 with non-overlapping bands; palette grep only the five specced hex values; forbidden-API grep clean (no AudioContext, getUserMedia, Path2D, createElement, localStorage, Math.random, Date.now, performance.now, gradients, fillText, strokeText).
- Thumb byte-compare: three independent 720×720 renders byte-identical.
- Fix rounds: none to the piece. One comment rewording only (removed the word "gradient" from an arch comment so the strict forbidden-API grep stays clean); renders re-done after, thumb md5 unchanged.
