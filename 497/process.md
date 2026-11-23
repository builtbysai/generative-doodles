# №1577 "The Shadow Is the Piece" (ayumu-nagamatsu AN2, PP824, expansion #208)

## Build
- Self-contained `index.html`, canvas 2D only, no audio, no external assets.
- Geometry: a true tesseract, 16 vertices (±1,±1,±1,±1), 32 edges (pairs
  differing in one coordinate). Autonomous rotation in the XW and YZ
  planes on a 30 s loop; 4D to 3D perspective (distance 4); drag yaw/pitch
  applied in 3D with eased follow (0.15 per frame) and the slow rotation
  resuming on release.
- Shadow: computed stereographic projection, exactly as specced. Every
  vertex is projected from the fixed point (0, 2.2, 0) onto the ground
  plane y = 0 with scale = d / (d - y); projected edges are drawn bright
  white #F5F5F5 in two passes (wide faint + thin crisp), alpha by
  projected distance, rounded to 4 decimals. No drop shadow anywhere.
- Object: the same rotated vertices drawn dim grey #3A3A42 at alpha 0.8,
  centred in the upper third. Ground near-black #0A0A0C. Nothing else.
- House rules: Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned in draw() via
  canvas.style.width/height in px; phone detection via window.screen
  (min dimension < 700px) with aspect fallback; field-like composition
  full-bleed on phones and desktop; seeded RNG mulberry32(seed 1577);
  deterministic first frame (fixed phase, no Math.random, no Date.now()
  in the draw path); one synchronous frame at load; requestAnimationFrame
  guarded by a typeof check. Caption chip ends with the interaction cue:
  "The Shadow Is the Piece · 2006 · 05 · 07 · Drag to turn the solid."
- Gallery date 2006 · 05 · 07 (formula 2002-01-10 + (N+1) days).
  Gallery note: "A dim tesseract turns above its own bright
  stereographic shadow. Drag to turn the solid."

## Deviations from the prompt
- Projection distance: the spec's formula is followed exactly
  (scale = d/(d - z)), but d is 2.2 in object units rather than an
  unspecified "many times" magnification. Reason: with the gentle 4D
  perspective (distance 4, |y| up to ~1.33), d = 2.2 gives a peak
  magnification of ~2.5x and a shadow ~3x the object's width that stays
  in frame; a smaller d let vertices near the projection point explode
  off frame (first build: a spike to the top-right corner and lines
  running off the bottom, fixed by this change).
- Frame-one phases: the seeded RNG phases are scaled to 0.35 rad of
  range instead of a full turn. Reason: a full-turn random phase put a
  vertex near the projection point at frame one, spiking the shadow up
  into the object's third; the small seeded phases keep frame one a
  near-axis-aligned tesseract whose shadow reads as a magnified nested
  box below the object. The 30 s loop still turns the solid through
  every orientation, so the shadow folds and sweeps as it turns.
- Object scale 0.07 * minDim (was 0.085): the stronger 4D perspective
  of the first build clipped the object at the top edge; the smaller
  scale keeps it fully inside the upper third at all sizes.

## QA
- Rendered the actual script with node ~/workspace/tools/render-piece.js
  at 1280x900 desktop, 390x844 mobile, 720x720 thumb; all three PNGs
  inspected visually.
- Desktop: dim nested-box tesseract fully in frame in the upper third;
  bright shadow a magnified, distorted tesseract filling the lower
  two-thirds; caption chip legible at bottom left.
- Mobile: same composition, nothing clipped, caption fits.
- Thumb: same frame as desktop, legible at 720x720.
- Thumb byte-identical across two consecutive renders of the final
  script: md5 ba3f2ddb66ca4c2387a8f1361775fb66 (both runs).
- Two fix rounds: (1) projection distance / 4D perspective / object
  scale after the first render showed an exploding shadow spike and a
  clipped object; (2) frame-one phases after the second render showed
  the shadow spiking into the object's third. Re-rendered and
  re-inspected after each round.
- Not pushed; staged here only, per the build brief.
