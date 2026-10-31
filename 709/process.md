# No.709 "Impenetrable"

EXPANSION #86 mona-hatoum, prompt block 6 "Impenetrable" (verified verbatim from TASKS.md).
Hatoum's barbed-wire square (Impenetrable, 2009): a square of fine wire that from a
distance reads as a soft gray cloud, and only up close resolves into barbs. You cannot
enter it. No photorealistic close-up, no menace beyond the material itself, no text.

## Concept

A square plane of wire floats centered in darkness, about 60% of the frame. At rest it
is deliberately low contrast: thousands of tiny two-prong barbs drawn so faintly and so
wide that they merge into a continuous gray haze. The interaction is approach itself.
As the pointer comes near, the barbs inside a soft radius resolve: brighter, longer,
sharper, a few catching a pale glint. Pull away and the field softens back into cloud
on its own. Dragging moves the square with a laggy pendulum follow; a tap reseeds the
barb field. Nothing else happens, and nothing needs to.

## Construction

- Field: 2,000 barbs on desktop, 1,500 on phones, laid out per epoch from a mulberry32
  stream seeded by BASE_SEED + epoch. Each barb stores its position as fractions of the
  square side (so resizes never re-roll the layout), a stem angle, a stem length of
  1.1-2.1% of the square side, a prong spread, a crisp-subset flag, and a glint hash.
  A barb is three strokes: a stem, and two prongs angled off a root at 62% of the stem.
- Two-pass softness model (the heart of the piece):
  - The cloud body is four nested fills of the far tone (#7A7F88) at alpha 0.024,
    inset progressively, so alpha accumulates toward the center and the square's edge
    feathers instead of ending hard.
  - Pass 1 (underlay): every barb stroked in the far tone at alpha 0.08 with a wide
    line (0.55% of the square side), all batched into a single path. The strokes
    overlap and merge; no individual barb survives at reading distance.
  - Pass 2 (crisp subset): a seeded 38% of barbs redrawn thin (1 px) in the near tone
    (#B9BEC7) at alpha 0.16. Enough to suggest barbs up close, far too faint to break
    the cloud at thumbnail size.
  - A stacked-offset black shadow (four rects at alpha 0.05, pure #000000) fakes the
    float off the dark, since the QA renderer has no blur or shadow.
- Proximity mapping: pointermove events are recorded as decaying pings (x, y, t),
  capped at 24, with an exponential fade (tau 0.9 s); while the pointer is inside the
  canvas it also counts directly. Proximity at a point is the max over samples of a
  smoothstep spatial falloff (radius 30% of the square side) times the temporal decay,
  so it is a pure function of recorded events and current time. Barbs above threshold
  are redrawn in pass 3 with alpha 0.15 + 0.75*s, length scaled by 1 + 0.35*s, and
  barbs whose glint hash is in the top 7% switch to the glint tone (#E8EAEE) when
  s > 0.55. A cheap bounding-box reject keeps pass 3 off the full field.
- Drift: the square's center wanders on two slow closed-form sines (47 s and 34 s
  periods, amplitude about 1% of the square side).
- Drag follow: each drag movement starts a new segment of an underdamped spring
  (period 1.7 s, zeta 0.22) in closed form, from the offset at that instant toward the
  pointer; on release a final segment targets home, so the square swings back with a
  pendulum overshoot and settles into the drift.
- Tap: a press under 0.35 s that never became a drag increments the epoch and rebuilds
  the field. It is a reseed, never a reload.
- Palette is strict: background #101014, wire far #7A7F88, wire near #B9BEC7, glints
  #E8EAEE, shadow #000000 (alpha only). No other colors, no text anywhere except the
  document title.
- House rules: canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas style pinned in px inside draw(); phone detection
  via window.screen physical size (min dimension < 700 px) with the h > w*1.15 aspect
  fallback; rAF guarded by a typeof check; no audio, no microphone.

## QA log

- Renderer: ~/workspace/tools/render-piece.js (node-canvas; no rAF, no AudioContext,
  no offscreen canvas). Renders: qa-desktop.png 1280x900, qa-mobile.png 390x844,
  thumb.png 720x720.
- Determinism (hard gate): frame one is the synchronous draw(0) at drift phase 0 with
  no pointer and the field at rest softness. No Date.now, no Math.random anywhere;
  elapsed time comes from a performance.now anchor set at boot and frame one never
  reads it. thumb.png rendered twice and byte-compared with cmp: identical. The
  duplicate was deleted.
- First render pass: the cloud read too dark and too flat (underlay alpha 0.055, cloud
  fills 0.016), closer to a dark panel than a gray cloud. Raised the underlay to 0.08
  with a slightly wider stroke, cloud fills to 0.024 per layer, and the crisp subset
  to 0.16. One tuning round; all three sizes re-rendered and determinism re-verified.
- Desktop (1280x900): a softly mottled gray square floats centered on the dark, about
  60% of the smaller dimension, faint offset shadow below right. At full size the barb
  specks are just suggested inside the haze; nothing reads as a close-up.
- Downscale check (required): thumb.png downscaled to 120x120 and read back. The
  square reads as a soft gray cloud with a feathered edge; no individual barbs, no
  grid, no pattern survives. Softness confirmed at thumbnail size.
- Mobile (390x844): phone rule engaged via window.screen (390 < 700); the square keeps
  about 60% of the frame width, centered in the tall frame, fully inside, nothing
  clipped, 1,500 barbs at the smaller scale.
- Interaction states (proximity resolution, glints, drag follow, tap reseed) cannot be
  exercised by the headless renderer, which fires no pointer events; they are built
  entirely from recorded pointer events evaluated as closed-form functions of time,
  and frame one is unaffected by them.

## Deviations

- Release behavior: the prompt says drag moves the square with a laggy pendulum
  follow but does not say where it ends up. On release the square swings back to its
  home position on the same spring and resumes drifting, rather than staying where it
  was dropped. Reason: the piece is a floating object in a dark field, and a permanent
  off-center resting place would strand it against a frame edge after repeated drags.
- Barb count: the prompt's figures read two ways (thousands of segments, 300-500
  visible barbs). Built as 2,000 barbs total (1,500 on phones), of which a seeded 38%
  form the faintly visible crisp subset at rest; the rest exist only in the underlay
  haze. At rest the distinctly visible count lands in the specced few-hundred range.
