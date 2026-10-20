# No.339 Puffy — process

## Concept

After MyClayCo's Oct 2026 puffy fridge frames: one
gingerbread-man-ish blob form that inflates into a dome
and deflates on a seamless 16 second loop, shaded in
stepped flat bands with no gradient anywhere, flat
colour, print-like. Exactly one large puffy form centred
on paper, and exactly one small flat cutter outline of
the same profile in the corner as the reference the
puffy form was cut from. Watch the loop; drag across
the form to dent it, and it springs back.

## Construction

- One canvas, 2D. Design space 1280x900, centred fit;
  page ground is the piece's own paper #F4EFE3. Palette
  only: paper #F4EFE3, terracotta #C25E3C, band shadows
  #A84E30 / #8F4028 / #76331F, ink outline #1C1A17.
- Profile: 32 hand-authored anchors with slight human
  wobble (round head, stubby arms angled down-out, two
  legs, crotch notch), sampled through a Catmull-Rom
  spline into polyline path data. No clean beziers.
- Distance data treatment (per the batch adaptation
  flag): the dome is NOT a radial gradient, NOT
  shadowBlur, NOT an offscreen layer. A signed distance
  field of the profile is computed once as JS data on a
  fixed grid (min point-to-segment distance to the
  polyline, sign from an even-odd ray cast). Each frame
  the field is resampled through the inflation scale,
  an exact uniform-scale remap about the form centre
  (field = s x baseDist(centre + (point - centre) / s)),
  then thresholded into exactly 4 flat bands (asserted):
  the lit terracotta face in the deep interior plus 3
  flat shadow steps toward the rim. Band reach (dome
  depth) grows with inflation, 46 to 86 design units.
  Bands are drawn as horizontal runs of 5px cells merged
  into single rects, directly on the one canvas.
- Loop: inflate 5.6s (ease-in-out) + hold 4.8s + deflate
  5.6s = exactly 16000ms, asserted in code; at rest,
  frame 16000ms is pixel-identical to frame 0. The
  clock is offset 2800ms so frame one is mid-inflate,
  bands in place. Outline scale runs 0.80 to 1.00 with
  the same easing.
- Counts asserted in code and throwing on violation:
  exactly 1 large puffy form, exactly 1 small cutter
  outline (same profile at 0.16 scale, bottom-right
  corner, stroke only), exactly 4 bands.
- Interaction: drag only, no tap action. The dent is a
  gaussian depression (sigma 60, max depth 55 field
  units) added to the same distance data, so the bands
  themselves cave in around the pointer. While dragging
  it presses in fast; on release it decays exponentially
  and snaps to exactly zero below 0.25, fully sprung
  back, so no leftover dent ever breaks the loop seam.
  Pointer coords convert through the stored fit
  transform (S, OX, OY).
- House rules: Visual Viewport sizing with resize
  listeners on visualViewport and window; canvas pinned
  every frame via style width/height in px; phone
  detection via window.screen min dimension < 700px
  with aspect fallback (h > w*1.15); synchronous first
  frame; requestAnimationFrame typeof-guarded; fixed
  authored data, no runtime random; no text, no UI.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js
  from the actual script at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png) and 720x720 (thumb.png, in
  the piece folder); all three inspected.
- Desktop: form centred mid-inflate, lit terracotta
  face with three clearly stepped shadow bands
  following the silhouette into the arms, legs and
  crotch notch; ink outline crisp; cutter outline in
  the bottom-right corner, same profile, flat. The 5px
  cell grain on band edges reads as print texture.
- Thumb: composition and bands stay legible at 720px;
  cutter still readable.
- Mobile (390x844): centred fit holds the whole
  composition on the paper ground, bands legible,
  nothing clipped.
- Seam and counts are structural: phases are integer
  milliseconds summing to 16000 and the frame depends
  only on t mod 16000 at rest; band, form and cutter
  counts are asserted in code.
- No em dashes, no absolute URLs, no text or UI in the
  piece. Not pushed; staged for fly's gate.
