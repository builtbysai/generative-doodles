# No.642 "La Pendiente"

EXPANSION #78 paulo-cox, prompt block 2 "Pendiente". Paulo Cox's RETIRO
recuadro on the slope rule ("cuando la pendiente es igual o superior a 45
grados, la cosa se pone parada") rebuilt as an interactive instrument.

## Concept

A field-notebook plate: one bordered frame on paper holding a single ink
mountain profile. A faint straight line crosses the frame at exactly 45
degrees. A handle sits on the profile's one steep segment; dragging it
along the slope steepens or flattens that segment. Below 45 degrees the
plate is calm ink on paper and nothing else. At or above 45 degrees the
regime flips instantly and totally: the frame's inner border turns warning
amber, the steep face fills flat amber, and two gear glyphs (piolet and
crampon, minimal line icons in gear blue) appear pinned to the face. No
numbers, no labels, no text: the line and the flip teach the rule.

## Construction

- Single self-contained index.html, canvas 2D, no external assets.
- Palette only: paper #EFE7D3, ink #1B2430, threshold gray #8A8F96,
  warning amber #E8A33D, gear blue #3A4E6B.
- Profile: seeded (mulberry32) ridge sampled at 181 points. Left flank
  and right descent are smoothstep blends between seeded heights with a
  two-sine seeded wobble (about 1.7 px) that fades to zero before the
  steep segment, so the segment endpoints stay exact. The steep segment
  is a straight run between two pinned endpoints; its rise is
  run * tan(theta) where theta is the steepness parameter.
- Angle measurement: the displayed regime never trusts the parameter.
  Every frame the angle is re-measured from the actual drawn endpoints,
  theta = atan2(b0.y - b1.y, b1.x - b0.x) in degrees, and the flip fires
  when the measured angle is >= 45. Frame one measures exactly the
  seeded calm start of 30 degrees.
- Drag: pointerdown within 28 px of the handle starts a drag. Pointer
  movement is projected onto the segment's unit direction vector; the
  projected distance along the slope maps to degrees (26 degrees per
  steep-run length), clamped to 12..68 degrees. Endpoints stay pinned;
  only the rise changes, so the ridgeline reshapes smoothly.
- Threshold line: drawn through the steep segment's base point with
  direction (1, -1), i.e. exactly 45 degrees, clipped to the frame
  interior, threshold gray at 55 percent alpha, 1 px.
- Glyphs: piolet (shaft line, spike, head bar, adze tick, quadratic pick
  arc) and crampon (rounded-rect frame, two straps, five spike ticks),
  stroke-only at 2 px in gear blue, pinned at 30 and 70 percent along
  the segment, offset about 20 px down the face's downhill normal.
- Motion: otherwise watch-only. The whole plate breathes with a
  sub-pixel sway, sin(t * 0.45) * 0.6 px, zero at t = 0.
- Double-tap (two quick taps under 350 ms apart, off the handle):
  reseeds the mountain. Reseeds are counter-seeded
  (seed = 64231 + count * 7919) and reset theta to 30 degrees.
- Layout: Visual Viewport API sizing with resize listeners on both
  visualViewport and window; canvas style width/height pinned in px on
  every draw. Phone detection via window.screen minimum dimension under
  700 px with the aspect fallback h > w * 1.15; on phones the frame
  refits (86 percent width, 52 percent height) and the page ground stays
  the paper tone.
- Determinism: frame one is the synchronous draw at t = 0 in the seeded
  calm state. All geometry is a pure function of (seed, theta, layout).
  No Date.now, no Math.random, no offscreen canvas, no ctx.filter, no
  audio. requestAnimationFrame is typeof-guarded.

## QA log

- Rendered with ~/workspace/tools/render-piece.js (node-canvas):
  qa-desktop.png 1280x900, qa-mobile.png 390x844, thumb.png 720x720.
- Determinism: thumb.png rendered twice and cmp byte-compared:
  identical. The second render was deleted.
- Read-backs: desktop shows the framed plate with generous paper
  margins, ink ridgeline with a straight steep middle segment, handle
  circle with grip tick on the segment, the faint 45 degree line
  spanning the frame corner to corner, thin gray inner border, calm
  state. Mobile refits the frame to the tall viewport; ridge, handle
  and threshold line all legible, nothing clipped. Thumb matches.
- Flipped state verified with a state-forced throwaway render
  (render-piece seed argument "flip", which starts theta at 57
  degrees): amber inner border at 3 px, flat amber face under the
  steep segment down to the baseline, piolet and crampon both present
  as blue line icons pinned on the face, handle still on the slope.
  The throwaway render was deleted after inspection.

## Deviations

- Rise cap: the summit is capped at 80 percent of frame height so a
  very steep setting cannot push the peak through the frame's top
  border on wide layouts. Theta is clamped to the resulting thetaMax
  (about 63 degrees on desktop) and the flip is judged on the measured
  endpoint angle, so the instrument never claims an angle it is not
  drawing. Reason: the prompt requires the framed plate composition;
  an uncapped rise would break the frame.
- Inner border in the calm state is drawn as a thin threshold-gray
  line rather than omitted, so that its change to amber reads as the
  same border changing state, per the prompt's wording ("the frame's
  inner border turns warning amber").
- A QA hook: if the page URL query contains "flip", the piece starts
  at 57 degrees. This exists only so the flipped state can be rendered
  and verified headlessly; normal viewing never sets it.
