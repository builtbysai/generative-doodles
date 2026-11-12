# №1717 "Chevron Country" (PP964) - build notes

- Date: 2006 · 09 · 24. Gallery note: "Cream and mauve contours fold into chevrons over peach. Drag to stir the ridges."
- Completes EXPANSION #225 goodbad-png (PP964–PP966); №1718–1719 follow.
- Technique: Canvas 2D marching-squares iso-contours (14 levels) of a domain-warped
  heightfield. Phase = 5.5·y + chevron fold term (|x − foldX| with a slope boost
  near the apex so contours stack dense and dark at the fold) + plunge term
  (Gaussian column at x = 0.70 that deepens with y, so lines gather and dive)
  + two-octave seeded value noise. Per-segment tone: mauve where the local phase
  slope is steep AND the segment sits near the fold apex, or inside the plunge
  column; cream elsewhere. Exactly two line tones on peach.
- Palette (hand-picked from the prompt's named colors; no study file exists,
  per the batch spec): peach ground #F3C49E, cream lines #FBF3E1, mauve lines
  #7E4B62. Plates: dark #33202A with cream title and peach hint.
- Interaction: drag-to-stir. Pointer drag drops persistent warp blobs into the
  field (up to 12, nearest-blob merge) and nudges the fold centre toward the
  drag x, so chevrons migrate and dense ridges reform around the finger.
  Verified by probe: stirring at (0.30, 0.40) grew a new mauve ridge bulge
  there and moved mauve segments 5,341 → 5,920. Never click-to-reload.
- Frame one: fixed phase t = 3.0 s of a 24 s period; foldX ≈ 0.48, one strong
  chevron fold band (fold amplitude modulated by sin over y, so a second
  weaker fold shows in the upper field) and the plunge column legible.
  Deterministic: seeded RNG (mulberry32, seed 1717) and seeded noise only.
- Deviations from the prompt: p5.js-to-2D substitution per house rules
  (node-canvas has no WebGL). No other deviations.
- House rules: Visual Viewport sizing, resize on visualViewport and window;
  canvas pinned in draw(); phone detection via window.screen (< 700 px) with
  aspect fallback; square stage on desktop, full-bleed on phones; one
  synchronous frame at load; requestAnimationFrame guarded by typeof check;
  reduced-motion respected; no em dashes in visible copy; title/date/hint
  plates drawn on canvas, modelled on live №1716.

## QA (node-canvas render-piece.js, re-gated after the fix round)

- Desktop 1280×900: square field centred on peach ground, cream contour bands
  running horizontally, chevron V-folds with dense mauve ridges near x ≈ 0.48,
  plunge column at x ≈ 0.70 where nested mauve chevrons dive downward as
  distinct lines. Title plate "Chevron Country / 2006 · 09 · 24" top left,
  hint plate "Drag to stir the ridges." bottom left. No tangled or crossing
  lines; quiet margin all around.
- Mobile 390×844: full-bleed field, same fold and plunge legible, plates fit.
- Thumb 720×720: same composition as desktop; this render IS thumb.png.
- Fix round (first gate → second gate): the plunge column had gone near-solid
  mauve (amplitude 2.0, sigma 0.035) and noise spikes were flecking isolated
  mauve dashes away from the fold. Softened the plunge to amplitude 1.5,
  sigma 0.045, and gated mauve-by-slope to segments within 0.13 of the fold
  apex. Re-rendered all three sizes and re-inspected; a couple of tiny mauve
  ticks remain inside the fold band and read as fold texture. Stir probe
  re-run after the fix; counts above are from the final file.

## Files

- index.html - md5 196b8c67a9a89cb8059077014e1bad7a
- thumb.png - md5 7c0c45da1d2f6d431ca13b725effa16a
