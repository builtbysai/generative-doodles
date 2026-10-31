# No.540 — Pink Mass

EXPANSION #65 nadia-hafid, prompt NH4 ("The Pink Mass"). From Mal olor p.29:
the uniform corporate mass vs the gray individual.

## Concept

A crowd of 41 identical pink figures with blank faces fills the frame
shoulder to shoulder in three depth rows, smaller toward the top, over a
flat pink ground with thin black outlines. One gray figure stands in the
middle row, slightly turned, swaying out of sync with the mass. A single
black shadow pool stretches under the crowd at the front row's feet.
No text, no UI, no ground line, no sky.

Drag is a slow social pressure wave: figures lean away from the pointer
and part around it, then settle back over about three seconds. They lean;
they never scatter. The gray figure alone turns its head to look at the
pointer. Untouched, the mass breathes in sync on one shared 8-second sine
while the gray figure rides the same cycle on its own phase.

Palette, nothing else: ground #F2B3C0, figure pink #EFA8B6, gray #CFCFCF,
ink #161616. Flat fills only, no gradients, no particles, no sound-wave
visuals. Faces never gain features.

## Construction

- Single self-contained index.html, canvas 2D, no external assets.
- Design space 1080x1080, cover-fit (scale = max(W,H), centred) so the
  crowd bleeds off every edge at any aspect; the page ground is the same
  pink, so cropped margins are invisible.
- Crowd: one parametric figure (rounded-shoulder trapezoid body + plain
  disc head) instanced 41 times: back row 17 (F=350, baseline 395),
  mid row 13 (F=420, baseline 680), front row 11 (F=550, baseline 940).
  The gray figure is mid-row index 6 (x=536, inside the portrait crop).
  Its head is drawn as a narrower ellipse (the slight turn) and pivots
  at the neck.
- Disturbance: per-figure spring state (head shift + velocity). While
  dragging, each figure's target is direction-away x radial falloff
  (radius 300, squared) x 30 stage units x a seeded per-figure response
  (0.9–1.1, mulberry32 seed 540065). Spring k=11, damping 4.6 gives a
  gentle overshoot and a ~3 s settle on release. Body base shift is
  0.35 x head shift, so figures part as well as lean.
- Breath: mass lean 0.014 rad and bob 2.2 units on one shared sine;
  gray lean 0.022 rad and bob 3.0 on the same 8 s cycle, phase-offset
  (+2.4 / +3.1 rad) — integer ratio, seamless.
- Gray head: lerps toward the pointer's clamped x-offset while dragging;
  drifts back to its resting turn (0.16 rad) afterwards.
- Shadow pool: one flat black ellipse (centre 540,925; rx 660, ry 80),
  drawn after the crowd so the front row stands in it.
- Hint: the single lowercase word "drag", screen-space bottom-right;
  ink on the pink ground, pink where the pool covers that corner
  (decided geometrically, per size, deterministic).
- Sizing from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas CSS size pinned in px inside draw()
  every frame. Phone detection via window.screen min dimension < 700,
  aspect fallback only; used for hint size.
- Determinism: the first frame is drawn synchronously at constant
  PHASE0 = 1.3 s (fixed shared sway, springs at rest, no pointer). The
  rAF loop, typeof-guarded, is anchored at PHASE0 + elapsed since load;
  frame one is never derived from Date.now(). The QA renderer has no
  rAF, so only the synchronous frame exists there.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js:
  qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png (720x720).
- Determinism: thumb.png rendered twice, cmp byte-compare identical;
  second render deleted. Re-verified after the fix pass below.
- Desktop read-back: three depth tiers fill the frame edge to edge;
  back-row heads crop cleanly at the top; the gray head and torso read
  at centre; the black pool bands the bottom; "drag" legible in pink
  on the pool at bottom-right.
- Mobile read-back: full stage height visible; back row at the top,
  gray figure centred and unclipped, pool across the front feet,
  "drag" in ink on pink at bottom-right. Side figures crop as intended
  (full-bleed).
- Thumb read-back: all three rows, 41 figures, gray figure visible,
  pool an ellipse under the crowd, hint legible.
- Fix pass during QA: (1) back row raised and enlarged (F 320→350,
  baseline 420→395) so portrait screens do not open on an empty pink
  band; (2) the hint was ink-on-black (invisible) in the desktop
  corner where the cropped pool lands — it now picks ink or ground
  pink by whether the pool ellipse covers the hint point.

## Deviations

- Cover-fit instead of the contain-fit used by sibling pieces: the
  brief demands a full-bleed crowd filling the frame on all screens,
  which a letterboxed square cannot do on portrait phones. The page
  ground is the palette pink, so the cover crop is seamless.
- The shared pool is drawn over the front row's bases (the crowd
  stands in it) rather than behind the figures: at landscape crops a
  behind-the-crowd pool at the front feet falls outside the visible
  band entirely. The wading-pool read keeps one flat black pool,
  stretched under the crowd, visible at every size.
- The gray figure's "slight turn" is a narrowed head ellipse plus a
  resting head angle; no facial features are added, per the brief.
