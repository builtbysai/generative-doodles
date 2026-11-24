# №868 Through the Curtain

ZW6 / PP1268, study #263 zach-wolfe. Formula date 2004 · 05 · 28.

An intimate backstage scene: a figure at a lit vanity mirror,
seen through a translucent curtain. The curtain is visible as a
layer: soft, wrinkled, catching the light. Warm tungsten
interior, the curtain a milky veil over it, deep shadow at the
edges. The mirror and figure are centred but veiled; nothing
hidden by accident, everything hidden on purpose. The curtain
sways almost imperceptibly. Drag to pull it aside and the scene
sharpens; release and it falls back over the frame. The veil is
the device, so the viewer earns control over it.

## Build

- First frame: FIRST_T = 12 s into a 60 s cycle. The sway is
  60 s, the bulb breathing 12 s, the dust drift 60 s; every
  period divides 60, so frame one is deterministic and the frame
  at FIRST_T + 60 equals the frame at FIRST_T.
- Two layers, as briefed. The scene is drawn sharp first: warm
  tungsten wall with a radial wash from the mirror, a lit vanity
  mirror with twelve bulbs around its dark wood frame, a soft
  luminous face oval with a hair arc as the reflection, a dark
  vanity table with small bottles, and the figure seen from
  behind, a dark silhouette with a warm rim from the mirror
  light on the right side, one arm raised toward the mirror.
  Deep shadow at the edges comes from a vignette over the room.
  Then the curtain layer is drawn over the frame up to its edge:
  a milky wash, nine vertical folds with light and shadow bands,
  thin seam lines, fourteen horizontal wrinkle arcs, a caught
  light band near the top, and a rod with rings across the top
  so the device is visibly hung, not a filter over the lens.
  The strip right of the curtain edge is re-drawn sharp, clipped,
  so pulling the curtain aside sharpens the scene there while
  the veiled part stays soft behind the milky layer.
- The scene is drawn in a centred square room (side = the smaller
  stage dimension), so the composition reads the same on desktop,
  phone and thumb. Field-like full-bleed on phones, square on
  desktop, per the house rules.
- Drag earned: pointer down anywhere on the curtain grabs it;
  dragging left pulls it aside (u rises, the edge moves left and
  the folds compress toward the left edge), dragging right lets
  it close. The curtain never fully leaves by default: u is
  clamped to 1, where it gathers over the left quarter, and the
  edge carries a soft highlight and shadow so it reads as fabric.
  Release eases u back to 0 over 2.5 s and the curtain falls back
  over the frame. There is no click-to-reload.
- Palette: warm tungsten wall (#4a2f1e to #22140b), mirror glass
  #ffdea8 to #d69e60, bulbs #ffe2aa, figure #160c06 with rim
  #ffcd8c, curtain milky #eee4d2 over warm dark ground #241509.
  Caption plate top left (№868 · Through the Curtain,
  2004 · 05 · 28) and hint bottom center on a soft dark pill
  (Drag to pull the curtain aside.), drawn in-canvas in warm
  white. No em dashes in visible copy.
- Canvas 2D only. Visual-only: no WebAudio, no autoplay audio,
  per the Franke rule. Flicker at or below 14 Hz by construction:
  all motion is slow drift and breathing on periods of 12 s or
  longer, and prefers-reduced-motion renders a still first frame.

## QA

- Rendered with node-canvas at 1280x900 desktop, 390x844 mobile,
  720x720 thumb; all three inspected visually, plus a render of
  the curtain held open at cx=0.8, which shows the curtain
  gathered left with its edge highlight and the sharp warm scene
  revealed on the right.
- Probes (node harness, /tmp/probe868.js, 720x720): determinism,
  two draws at t=12 differ in 0 pixels; loop seam, frames at
  t=12 and t=72 differ in 0 pixels; time motion, t=12 vs t=42
  differ in 60.20% of pixels (11.33% by more than 8 levels), the
  sway and bulb breathing moving across the veiled frame.
- Drag probes: ?cx=0.8&hold=1 at t=12 puts the curtain edge at
  244.8 px of a 576 px stage; the frame differs from baseline in
  63.94% of pixels, 48.00% in the revealed right region (47.89%
  by more than 8 levels), while the figure anchor is byte
  identical (head centre 288, 336.96, r 29.95 in both). Release
  probe: ?cx=0.8&resume=1 gives curtainU 0.800 at t=12, 0.400
  at t=13.25, 0.000 at t=14.5, and the edge back at full width.
  Pointer-event probe: pointerdown on the curtain starts a drag,
  pointermove 216 px left raises u to 0.625, pointerup releases
  and u is back to 0 by t=14.5.
- Fix rounds: 3. Round 1: the head floated above the shoulders
  with a gap, and the raised arm read as a hook. The head moved
  down to meet the shoulders, a neck was added, and the arm was
  redrawn as shoulder to elbow to hand with a small hand dot.
  Round 2: the mirror reflection's shoulder shape read as a grey
  dome floating above the figure's head. It was removed, the
  face oval was strengthened, and a hair arc was added so the
  reflection reads as a face. Round 3: the loop seam failed at
  2.74% of pixels. Two causes: the dust drifted linearly with
  time (not periodic) and a fold seam line used half the sway
  frequency (120 s period). The dust drift became a closed
  sinusoid and the seam line now uses the full sway frequency;
  the seam is 0 px.

## Deviations

- The hint sits on a soft dark pill rather than bare text, so it
  stays readable over the milky curtain at the bottom of the
  frame. No other deviation from the prompt: the curtain is never
  fully removed by default, the figure is seen from behind, and
  the rod and rings keep the device visible.

## Known warts

- On the 390x844 mobile frame the room is a centred square, so
  there is a large stretch of empty veiled curtain above and
  below the scene; the mirror and figure stay legible.
- At thumb size the face reflection reads as a soft glow with a
  faint arc, and the bottles are small pale ticks on the table
  edge.
- The sway is almost imperceptible in stills by design; the bulb
  breathing is the most visible motion in a single frame pair.
- When the curtain is pulled partway, its edge can bisect the
  figure's head, which is natural for a curtain pulled across a
  scene.
