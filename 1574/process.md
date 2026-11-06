# No.1574 "Circles Talking to Circles" — SB7, PP821, #207 senbaku-deconbatch

Gallery date: 2006 · 05 · 04. Interaction cue: "Watch the loom sweep."

## Spec (verbatim prompt, from TASKS.md)

Three concentric rings of nodes on pale ground, connected by hundreds of
straight chord lines in muted blues and teals — edges follow a STRUCTURED
rule (each node connects to nodes at fixed ring-offsets), so the tangle
resolves into nested geometric rosettes and star polygons, not hairball
noise. A small empty circle holds the exact center. Palette: pale ground
#ECEFF1; chords slate blue #5A7A9A, teal #4E9A94, deep blue #2E4E6E.
Nothing else. Composition: ring system centered at ~75% of frame; center
hole is the visual anchor. Motion/interaction: watch-only. Whole ring
system rotates very slowly while each node pulses along its ring on a
staggered sine, so chords sweep like a loom. ~30s seamless loop. Never any
pointer interaction. Technical: nodes on N rings with fixed angular
spacing; edges between nodes whose (ring, index) offsets match a small rule
table; rotation + per-node radial pulse with phase = index * golden angle.
Avoid: random edges; node labels/highlights; filling the center hole.

## Build

- 36 nodes per ring, 3 rings at radii 0.135 / 0.255 / 0.375 of minDim
  (outer diameter 75% of frame). 108 nodes, 432 edges after dedupe.
- Rule table (ring delta, index step, color): same-ring steps 7 and 15
  (slate) draw star polygons; cross-ring (1, +5) and (1, -5) (teal) tie
  adjacent rings; (-1, 11) (deep blue) ties inward. No random edges; the
  table is index-shift invariant.
- Motion: rotation is exactly one node spacing (TAU/36) per 30 s loop, so
  the pattern maps onto itself. Per-node radial pulse, amplitude
  0.012*minDim, phase staggered by index times the golden angle, with a
  slow drift term (see Deviations) that makes the 30 s loop seamless.
- Center hole: radius 0.05*minDim. After chords and nodes are drawn, the
  ground color is repainted over the hole (a few long chords would
  otherwise cross it) and a hairline deep-blue outline marks it. The hole
  is never filled with anything but ground.
- Render: chords stroke alpha 0.55, lineWidth 1.1u; nodes are deep-blue
  discs, radius 2.6u. No gradients, no Path2D, no shadowBlur; every
  batched arc preceded by moveTo; fading alphas rounded to 4 decimals.
- House rules: Visual Viewport sizing with resize listened to on both
  visualViewport and window; canvas pinned in draw() via
  canvas.style.width/height in px; phone detection via window.screen
  (min dimension under 700 px) with aspect fallback; centered geometric
  piece keeps its shape, page ground is the piece's own pale color, hint
  chip deep blue with pale text. One synchronous frame at load; every
  requestAnimationFrame call guarded by a typeof check. No em dashes in
  visible copy. No pointer interaction of any kind. No click-to-reload.

## QA

Rendered from the actual script with node
~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile,
and 720x720 thumb; all three inspected visually. Desktop render shows
nested rosettes and star polygons resolving out of the chord tangle, the
empty center hole clean.

- Fix round 1 (loop seam): first build used the raw golden-angle pulse
  phase (index * 2.39996) with rotation of one node spacing per loop.
  Probe showed the seam t=0 vs t=30 differing in 79,954 bytes with max
  channel diff 190: the golden angle does not close over 36 nodes, so
  the wrap node (35 -> 0) carried a pulse 10.8 px off. Fixed two ways:
  (a) the stagger step is GSTEP = GOLDEN - ((36*GOLDEN) mod TAU)/36
  (2.269 rad), which closes exactly over 36 nodes; (b) a drift term
  t*GSTEP/LOOP advances the pulse pattern by exactly one node over the
  loop. Re-probed: seam 2,923 differing bytes, max channel diff 16,
  only 83 bytes differing by more than 10: sub-pixel antialiasing
  jitter from float endpoint rounding, imperceptible.
- Probe (probe-1572-1575.js, hand-driven rAF clock): frame one
  deterministic, 0 differing bytes across two t=0 draws at 1280x900;
  108 nodes, 432 edges, hole radius 45 px desktop; 814,637 bytes
  changed t=0 -> t=15 (loom sweeping); thumb re-render byte-identical
  (md5 8fe9650bef6b73c23d5d1c4a42c8a7c7).

## Deviations

One necessary deviation, documented: the prompt prescribes per-node pulse
phase = index * golden angle, but the raw golden angle does not close
over 36 nodes (36 * 2.39996 mod TAU is 4.717 rad, not 0), which made the
30 s loop jump at the wrap node. The built piece uses GSTEP, the golden
angle adjusted by the exact wrap remainder (2.269 rad per index step, so
36 steps are exactly 13 turns), plus a one-node-per-loop drift of the
pulse pattern. The stagger still reads as golden-angle staggering, and
the loop is seamless; the raw prescription cannot satisfy both the
stagger and the seamless loop with 36 nodes per ring.
