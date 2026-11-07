# No.1601 — The Latter From the Former (AW2, study #211 aluan-wang, PP848)

Driver: one seeded flow-field skeleton is drawn three times, once per act, each act re-growing the same geometry in a new palette and form, so every act is visibly the child of the last.

## Mechanism

- One skeleton: 24 flow-field tracers (seed 1601001, mulberry32), each a 64-step
  walk through a rotational flow field with a per-tracer target radius, so the
  paths orbit instead of running off the frame. The same point arrays feed all
  three acts.
- Act one (0-40s): the tracers themselves, deep blue #16213E and grey #8A8A92
  on near-black #0A0A0A, each drawn as a wide low-alpha glow pass plus a narrow
  core pass, growing in with staggered births.
- Act two (44-84s): the same skeleton recolored faint amber, with saturated
  amber #F4A259 and rust #B5542D particle blooms grown at sampled skeleton
  points, each bloom jittered from its skeleton point so the old act shows
  through deformed.
- Act three (88-128s): a centered petri circle, diameter 85% of the frame
  width, in crimson #BC4B51 and gold #E8B33A. The skeleton is warped into the
  disc (square-to-disc mapping, clipped to the circle), petri dots regrow at
  the skeleton points, and four concentric rings sweep in one after another.
- Transitions (4s each): the outgoing act fades while the incoming act grows
  from zero, with the parameter vector crossfaded over the transition, so the
  change reads as growth, not a cut. After act three the cycle restarts at act
  one (132s cycle). Watch only: no pointer listeners at all.
- Frame one is act one at t = 20s (halfway through its hold, eased to about
  75% grown), so the thumb is the cool blue/grey flow.

## Deviation from the prompt

The prompt's literal mechanism (render each act to an offscreen buffer, sample
luminance-weighted pixel patches, seed the next act from those patches) cannot
re-render byte-identically in the node-canvas QA harness and risks
nondeterminism. Substituted SEEDED GEOMETRY: act N+1's seed points are derived
from the same seeded parameter vector that generated act N's geometry (the
identical skeleton point arrays, recolored, jittered, and warped), so the
lineage is real and reproducible rather than pixel-sampled. The visible result
is the same: each act carries recognizable deformed pieces of the last.

## House rules

- Visual Viewport sizing, resize listened to on visualViewport and window;
  canvas pinned in draw() via style.width/height in px; phone detection via
  window.screen (min dimension under 700px) with aspect fallback; field-like
  composition full-bleed on phones, square on desktop.
- One synchronous frame at load; requestAnimationFrame guarded by typeof
  check; deterministic first frame (fixed PHASE 20.0, seeded RNG only, no
  Math.random, no Date). Reduced-motion visitors get the single frame.
- No em dashes in visible copy. Flicker-safe by construction: only slow
  growth and fades, no oscillation above a few Hz.
- Gallery date 2006 · 05 · 31. Hint: "Watch only. Three acts, each grown
  from the last."

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js at
1280x900 desktop, 390x844 mobile, and 720x720 for thumb.png; inspected all
three. Forced-time probes (via a small harness calling the exposed draw hook):
t=64 shows act two amber/rust blooms tracing the act-one swirl; t=108 shows
the act-three crimson/gold petri circle with the skeleton warped inside;
t=152 returns to act one and is byte-identical to the desktop frame-one
render (md5 9c7df554ec05b216c14b6ff19039d646).

Fix rounds: 2. Round 1: tracers slid along the clamp and piled up as a dense
vertical column on the right edge (and clusters top/bottom) in all three acts.
Round 2: a 90-degree turn-on-exit rule produced sawtooth zigzags along the
edges, worse than the pile-up. Round 3 (shipped): replaced the open flow field
with a rotational field plus a per-tracer radial pull, so tracers orbit
inward and never reach the frame edge; all three acts and the loop now read
clean.

Determinism check: two separate desktop renders are byte-identical
(md5 9c7df554ec05b216c14b6ff19039d646).
