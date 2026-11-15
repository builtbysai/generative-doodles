# №1793 "The Activated Field" , LE2 (PP1040), lawrence-english, EXPANSION #235

Date: 2006 · 12 · 09. Gallery note: "Wind you never see, only the stems it bends. Watch only."

## Build

Template: live №1790/index.html, fetched fresh via gh_api.py (sha b37872a7e78f0125f273cf052641fbea2c34f1b4).
Spec: BATCH-1791-1795-SPEC.md, №1793 section plus House rules, followed exactly.

A field of 1,100 dry grass stems, reeds and thin branches (seeded planting,
mulberry32 seed 1793) on a pale ground under a flat warm-white sky that never
changes. Horizon at the lower third of the field. Stem density is denser at
the edges (acceptance probability rises toward the left and right edges), so
gusts read as travelling waves. Palette: straw #C2A15E / #D3B87E, ash grey
#9A968A, dark umber #5C4A33 / #453722; ground #EAE1CB; sky #F6F1E7. No
horizon ornament, no sun, no birds.

## Motion

Gusts are closed-form envelopes of piece time, six in the schedule
(t0 8, 30, 52, 88, 118, 150 s), arriving in clusters with long calm between;
calm dominates (gust strength 0.000 at t = 52, 70 and 110 s at mid-field).
Each gust is a front travelling across the field; local stem bend is the
front's Gaussian band times the gust envelope times per-stem flex, plus a
small idle sway (never more than a few degrees). The wind itself is never
drawn: no streaks, arrows or air particles, and no colour shift with gust
strength.

42 seeds (seed 17931) are tied to stems and to the gust whose front reaches
them; each lifts when the front arrives, tumbles on a short closed-form arc
for 2.2 to 4.0 s, then settles. G3 seeds are planted in the front zone
(u 0.15 to 0.62) so a few are airborne at frame one.

## Frame one (fixed phase t = 60 s)

Mid-gust: gust G3 (t0 52 s, dur 24 s) is mid-passage, its front at field
x = 0.544, strength 0.95 at the front. Verified by probe: gustAt(0.10, 60)
= 0.002, gustAt(0.54, 60) = 0.950, gustAt(0.90, 60) = 0.019. The left half
of the field is bent along the front, the far right side is still upright.
5 seeds are airborne at t = 60 s.

## Interaction

Watch-only. No pointer handlers at all; tap does nothing; no
click-to-reload. The viewer cannot summon wind.

## Deviations

None. Canvas 2D only (no WebGL involved). Deterministic: seeded RNG only,
no Date.now() or Math.random() affecting frame one; requestAnimationFrame
guarded with a typeof check; one synchronous frame at load. House rules:
Visual Viewport sizing with resize on visualViewport and window, canvas
pinned in draw() via style width/height in px, phone detection via
window.screen (min dimension under 700 px) with aspect fallback
(h > w * 1.15). Field-like composition: full-bleed on phones, square on
desktop, page ground set to the piece's own sky colour. No em dashes in
visible copy. Title/date/hint plates drawn on canvas.

## QA

- node render-piece.js at 1280x900 desktop, 390x844 mobile, 720x720 thumb;
  all three inspected by reading the PNGs.
- Desktop: square field centred, flat warm-white sky, horizon at the lower
  third, gust wave clearly travelling left to right with the left half bent
  and the right side still, title/date/hint plates clean.
- Mobile: full-bleed field, same wave and horizon, plates clean.
- Thumb (720x720): same composition, wave reads clearly.
- Fix round: first render failed in node-canvas because drawSeed passed a
  string to rgba(); fixed to pass a number. A second fix round biased G3
  seed stems into the front zone: the first gate showed only 1 seed airborne
  at t = 60 s; after the fix the probe reports 5 airborne. Re-gated after
  both edits.
- Determinism probe: two renders of frame one are byte-identical
  (459,201 bytes each).
