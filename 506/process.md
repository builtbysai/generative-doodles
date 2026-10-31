# No.506 "Pasta Monster" — EXPANSION #61 alice-piaggio, prompt AP2

## Concept

Alice Piaggio's FT pasta monster ("Your waiter doesn't want to hear about
your digestive problems", 2024) as a generative piece. One giant
anthropomorphic food-mass: dozens of thick yellow strands coiled into a
mound that fills most of the frame and spills past the left, right and
bottom edges. Her face grammar is stamped on the upper-right quadrant of
the mass: two big oval black eyes, red brow arcs, a red toothy zigzag
grin. At bottom-right stands one tiny waiter (white skin, blue suit, red
shoes), about 1/12 the height of the mass, both arms raised — the scale
joke is the point. Watch-only: the strands writhe slowly, the eyes blink
every ~4.3s, the waiter's arms tremble. Double-tap reseeds the scene.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external
  assets. Strict palette: pasta yellow #F0B41C, near-black ground
  #10181C, eye black #000000, brow/mouth red #D83A2A, suit blue #1B63F0,
  shoe red #E63946, waiter skin #F8F5F0. Flat fills only, no gradients.
- Square stage of side min(W,H), centred; all layout stored as stage
  fractions from a mulberry32 seed (BASE_SEED 506112), so the scene
  lands identically at every size. Canvas size comes from the Visual
  Viewport API with resize listeners on visualViewport and window; the
  canvas style width/height are pinned in px inside draw() every
  frame. Phone detection via window.screen (min dimension < 700px)
  with the aspect fallback h > w*1.15; the composition keeps its
  square shape on phones over the near-black page ground.
- The mound is a dome (top boundary yTop(x), a shallow sine) extending
  past three stage edges. Inside it, three seeded coil centres carry
  concentric wobbly rings (radii stepping ~0.03 of stage, stroked at
  0.026 with round caps), clipped to the dome: the black hairline gaps
  between rings are what read as separate noodles. 12-18 loose strands
  run from inside the dome out past its boundary and end in a seeded
  curl (curl direction flips per seed). Total strand count lands in
  the 34-48 band. Writhe: ring radii and loose-strand control points
  oscillate on integer cycles of a 16s master loop with per-strand
  phase offsets, so the loop is seamless.
- Face: a same-yellow ellipse patch first erases the strand gaps in
  the face zone (the patch edge is invisible against the coils), then
  the features are drawn flat on top — black oval eyes scaled by a
  blink envelope (closed briefly once per 4.3s period), red brow arcs,
  and a red grin band whose lower edge is a 7-tooth sawtooth.
- Waiter: parametric tiny figure drawn after the mass — blue trapezoid
  torso, blue legs, red shoes, skin head and hands. Three poses
  (arms up / arms out / fleeing lean) chosen by the seed; frame one
  always uses arms up. The tremble is a 2px-at-1080-scale sine on the
  arms and hands, a pure function of loop time.
- Ground texture: 700 precomputed seeded specks in three near-black
  tones, drawn as tiny rects directly on the ground each frame.
- Double-tap: a pointerdown listener compares taps against the loop
  clock (never the wall clock); a double-tap rebuilds the scene from
  the next seed (new strand count and curl direction, new waiter
  pose). No click-to-reload anywhere.
- Determinism: frame one is drawn synchronously at the constant
  pre-roll PHASE = 5.0 (strands mid-writhe at fixed phases, eyes open,
  since 5.0 mod 4.3 sits outside the blink window). The rAF loop is
  typeof-guarded and anchored as PHASE + elapsed since load. No
  Date.now, no Math.random, no clock-derived first frame.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb.png rendered twice and `cmp` byte-compared —
  identical, re-verified after the fix pass; the duplicate render was
  deleted.
- First read-back: face clear on the upper right of the mass (oval
  eyes, brow arcs, sawtooth grin all legible at thumb size), waiter
  tiny at bottom-right with arms up, mass touching left/right/bottom
  edges, nothing clipped on mobile. One fix pass: the first build's
  top-exit loose strands started too deep and ended too far above the
  dome, reading as tall antenna loops that competed with the face.
  Their starts were pulled up to just under the rim, their ends to
  just above it, and the curl radius tightened — they now read as
  noodle ends poking out of the mound. Re-rendered all sizes and
  re-passed the byte-compare after the fix.
- Deviations: (1) the prompt's technical note suggests a pre-rendered
  grain canvas for the ground texture, but the QA renderer (and house
  rules) forbid offscreen canvas creation, so the grain is a
  precomputed seeded array of specks drawn directly each frame — same
  static texture, no offscreen surface. (2) The face sits on a
  same-yellow patch that erases strand gaps inside the face zone;
  without it the coil gaps crossed the eyes and grin. The patch uses
  only the pasta yellow, so no new colour enters the piece.
