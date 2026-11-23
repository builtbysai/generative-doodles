# №1719 "Eight Slices of Zion" (PP966) - build notes

Completes EXPANSION #225 goodbad-png. Date 2006 · 09 · 26. Gallery note:
"Eight papercut canyon layers breathe like slow geology. Drag to tilt."

## Build
- 2D canvas (p5.js-to-2D substitution per house rules; node-canvas has no WebGL).
- Heightfield: one large Gaussian mesa (center 0.50, 0.48) plus three satellite
  bumps (upper-left, lower-right, upper-right), with a low-frequency sine
  undulation. Seeded RNG (mulberry32(1719)) only jitters the satellite centers
  by ±0.01 at build time; it does not affect frame one.
- Exactly 8 layers: marching-squares iso-contours at thresholds
  0.14 / 0.26 / 0.38 / 0.50 / 0.62 / 0.72 / 0.82 / 0.92, drawn lowest first so
  each higher ring nests inside the last. Palette bottom to top: #E9A13B,
  #DD7A24, #C85A14, #F0B23E, #E8862A, #B84A10, #F5C04A, #FFF6E6 (cream cap).
  Hexes hand-picked from the prompt's named colors; no goodbad-png study file
  exists to resolve the f19 codes from, as №1704-1716 did.
- Relief: each layer filled with a soft drop shadow (offset 3,4, blur 7) and a
  thin burnt-orange contour edge, so the stack reads as cut paper, not a flat
  contour print.
- Motion: watch-only slow breathing, 24s period. The mesa amplitude breathes
  ±5% and the undulation phase drifts, so the contour layers crawl and
  re-stack. Drag-to-tilt: pointer drag sets a tilt target (clamped ±1);
  higher layers shift up to 1.6px per level with the tilt, giving real
  parallax between slices. Tilt eases toward the target; 0 at frame one.
- Frame one: fixed phase t = 6.0s of the 24s period (mesa near full breath),
  mesa and all eight nested rings legible.
- House rules: Visual Viewport sizing with resize on visualViewport and
  window; canvas pinned in draw() via style.width/height; phone detection via
  window.screen (min dimension < 700px) with aspect fallback; field-like
  composition is square on desktop, full-bleed on phones; one synchronous
  frame at load; requestAnimationFrame guarded by typeof check; no
  click-to-reload; title/date/hint plates drawn on canvas (template: live
  №1716); no em dashes in visible copy; no AI-signature copy.

## Deviations from the prompt
- None material. The p5.js-to-2D substitution is the standing house-rule
  substitution, documented above.

## QA
- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop,
  390x844 mobile, 720x720 thumb; all three inspected by reading the PNGs.
- Desktop (1280x900): square stage centered on white; one large mesa of eight
  nested orange/amber/gold rings with a cream cap, soft shadows between
  slices; satellite forms at upper-left (connected, two inner rings),
  lower-right (connected, two inner rings) and upper-right (detached dot);
  generous white surround; title plate "Eight Slices of Zion / 2006 · 09 · 26"
  top-left, hint plate "Drag to tilt." bottom-left. Pass.
- Mobile (390x844): full-bleed, mesa fills the frame vertically (stretched by
  the tall stage, as a field-like composition), all eight rings legible,
  satellites present, plates legible. Pass.
- Thumb (720x720): identical composition to desktop, mesa and rings legible
  at small size. Pass.
- First gate caught a defect: stroking the filled marching-squares path
  outlined every grid cell, leaving a visible grid over all layers. Fixed by
  stroking only the contour-line segments (per-cell edge-crossing segments)
  instead of the fill path. Re-gated all three sizes after the fix; grid gone,
  rings clean.
- Determinism: two desktop renders byte-identical (md5
  85a118d284a7c17baebf0056c1fdf771 both times).
- Static checks: no Math.random(), no Date.now(), no em dash in the file,
  requestAnimationFrame guarded, visualViewport resize listener present.

## Files
- index.html md5: d702b03ffb837ded322c7fca5f4a27ae
- thumb.png md5: a25b9b27987d0ebb76b3408b2cdb311b (720x720 render)
- Not pushed; parent pushes.
