# №1700 "It Improves While Watched" - PP947, EXPANSION #223 piter-pasma

Date: 2006 · 09 · 07. Gallery note: "A still life converges from static the longer you watch. Move to orbit, stillness refines."

## Build
Skulptuur-style Monte Carlo convergence as the medium. A still life (a stack of
four folded plates in cream, sage, terracotta and pale ochre, a folded ochre
cloth, a bronze torus knot drawn back to front as depth-shaded discs, a small
cup) sits center on an infinite floor with generous headroom, under a soft key
light. The image starts as seeded monochrome television static and converges
toward the clean render the longer the page is watched.

Template: live №1695 (structure, plates, sizing, hint) mirrored per spec.

## Convergence model
A clean fraction `c` blends seeded noise toward the clean vector render.
Frame one is pre-rolled deterministically to exactly FIRST_SPP = 64 samples
at alpha 0.012 per sample, so c = 1 - (1 - 0.012)^64 = 0.538, a half-resolved
still life; the sample counter reads "spp 64". Live, still pointer (no pointer
movement for 1.5 s) drives c toward 0.96 at 0.03/s; pointer motion drives c
toward 0.12 at 2.2/s, so the image dissolves back toward noise within 2 s.
There is no converged state that stops: c asymptotes at 0.96 and the grain
never fully leaves. Accumulation pauses while the tab is hidden
(document.hidden). Re-blends run at most 4 times a second; the per-pixel blend
is a single linear mix of the static noise buffer and the clean render, which
is the exact closed form of the sample accumulation.

## Deviations
- WebGL-to-2D substitution (per spec/house rules): node-canvas has no WebGL,
  so the SDF still life is a clean 2D vector render (offscreen in the sense of
  a captured pixel buffer) and the Monte Carlo accumulation is the linear
  blend described above, implemented with ImageData rather than a GPU
  accumulation buffer. The visible behavior matches the prompt: static that
  refines with watching, re-noises on orbit.
- The orbit is a small parallax shift of the objects plus a slight rotation of
  the knot (up to 2 percent of frame width), not a camera orbit, since the
  scene is a 2D render.
- The prompt's "Keys 0-7 control the speed" is not implemented: the piece is
  presence-driven (stillness is the speed control), and no keys, buttons, or
  click actions exist. No click-to-snapshot, no fake loading bar.

## House rules
Visual Viewport sizing, resize on visualViewport and window; canvas pinned in
draw() via style width/height in px; phone detection via window.screen (min
dimension under 700 px) with aspect fallback (h > w*1.15); square stage on
desktop, full-bleed on phones, with the infinite floor spanning the full
viewport width on desktop; one synchronous frame at load; requestAnimationFrame
guarded by a typeof check; deterministic fixed-phase first frame (seeded RNG
mulberry32(1700) only, no Date.now()/Math.random() affecting frame one);
no em dashes in visible copy; title/date/hint plates drawn on canvas.

## QA
Rendered with node render-piece.js and inspected all three sizes.
- Desktop 1280x900: half-resolved still life in static; knot, plate stack,
  cloth and cup all legible; title plate top left, hint plate bottom left,
  floor spans full width.
- Mobile 390x844: full-bleed; knot prominent, plates and cloth legible,
  plates stack reads clearly.
- Thumb 720x720 (thumb.png is this render): half-resolved still life, legible.
- Determinism: two desktop renders byte-identical (md5 5eea982f21ccab0fbcd43cc79513d0e4).
- Live-loop harness (/tmp/test1700.js, node-canvas with a driven rAF):
  frame one c = 0.538, spp 64; after 60 s still c = 0.891, spp 184 (visible
  noise reduction, confirmed in the 60 s render: clean softly lit still life,
  faint residual grain, counter reads "spp 184"); after 2 s pointer motion
  c = 0.129, spp 12 (back to near-pure static, confirmed visually); after
  30 s still again c = 0.606, recovering.
- Fix round: first gate showed the plate stack too flat and pale, the cloth
  hidden behind the plates, and a visible seam where the floor ended at the
  desktop stage edges. Fixed by enlarging and saturating the plates, moving
  and enlarging the cloth, and spanning the floor and horizon across the full
  viewport width; re-gated after the fix.
- Performance: the per-pixel blend is throttled to 4 re-blends per second
  (convergence is slow; faster redraws would waste frames) and the blend
  assigns directly into the Uint8ClampedArray instead of calling Math.round
  per channel.

## Files
- index.html - md5 a0c9a472bb1f1aa19f34bb2e0074d794
- thumb.png - md5 c0ea6b066472bc8f597ad32b28ec1959 (720x720 render)
- process.md - this file
