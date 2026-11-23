# №1295 "Tent for Close Readings" (swapnaa-tamhane ST8, PP462)

## Prompt
The viewer inside a shamiana: a tent of block-printed cotton panels in natural
dyes (madder red, indigo, cream), panels overlapping overhead and at the sides,
each unique in print-and-dye combination, seams stitched and beaded, light
filtering through the cloth. Grounded in Tamhane's *Tent: A Space for the
Ceremony of Close Readings* and the Mobile Palace shelter-form: panels "lifted
off the table of the block printer and simply hung in the sky."

## Palette
Madder #A63A2A, indigo #1E3A5F, cream #EFE3C8, beading gold #C9A44A, seam
shadow #3A2A20, light wash #F5EBD3 (low alpha).

## Composition
Landscape; the frame IS the tent interior, no outside visible. Six overlapping
panels radiate from an implied apex above the top edge. Panel edges show
dashed stitch lines and beading rows of gold dots on beaded panels. The two
center panels carry the strongest motif (dense diamonds, triangles, dots,
rings); side panels fade toward the edges. No tent poles, no structure, no
people, no sky, no photorealistic fabric.

## Motion / interaction
- Slow watch-only drift: panels breathe and shift on a 14 s sine per panel
  (small angular sway plus pixel sway on the marks), light through the cloth
  strengthening and dimming on a 22 s cycle with per-panel phase.
- Pointer drag pans the view slightly inside the tent: parallax between panel
  layers (center layers pan most, outer layers least), pan clamped to ±30 px
  horizontal / ±20 px vertical. On release the pan decays back to rest with
  tau 1.2 s. Never click-to-reload.

## House adaptations
- Visual Viewport sizing (visualViewport width/height + resize listeners on
  visualViewport and window); canvas pinned in draw() via style width/height.
- Phone detection via window.screen physical size (min dimension < 700 px)
  with aspect fallback; field-like composition goes full-bleed on phones.
- Determinism: synchronous first frame draws at exactly t = 0 via a boot flag;
  the rAF clock starts only with the first rAF tick. All loop phases are
  closed-form functions of piece time; pan is a closed-form function of the
  recorded drag events and t, never frame-integrated state.
- rAF loop is a plain function declaration behind a typeof guard (the №1278
  lesson: a named function expression followed by requestAnimationFrame(loop)
  throws in a real browser and the QA renderer would never catch it).
- node-canvas limits respected: no gradients (light wash is layered flat
  alpha), no shadowBlur, no filters, no offscreen canvas, no
  document.createElement, no AudioContext, no Math.random (seeded mulberry32
  only). Dots drawn as arcs with a moveTo before each batched arc.

## Fix rounds
1. `document.body.style` threw under the QA renderer (no body in its shim):
   guarded with a typeof/document.body check.
2. First renders showed a narrow wedge of panels with most of the frame as
   bare seam ground. Two causes, both fixed: (a) the fixed panel angles did
   not reach the frame corners at all aspects, so the fan left the corners
   uncovered; panel edges are now computed in build() from the corner rays
   (atan2 of half-width over apex height), which guarantees full coverage at
   any aspect; (b) the breeze sway was computed in pixels (W * 0.006, about
   ±7.7) and added directly to panel angles in radians, scrambling panel
   directions. Sway is now split: a small angular sway (±0.008 rad) for panel
   edges and a pixel sway for motif marks. A 0.012 rad angular overlap per
   panel edge was added so per-panel breeze phases never open ground gaps.
   Pixel probe after the fix: zero pure seam-ground pixels in the 1280x900
   frame.
3. No further fixes; desktop, mobile, and thumb re-rendered after each fix.

## QA
- Rendered with node render-piece.js at 1280x900 desktop, 390x844 mobile,
  720x720 thumb; all three inspected: six panels radiating from the apex,
  stitched seams, gold beading, center panels strongest, side panels faded,
  full-bleed on mobile, no outside visible.
- Thumb rendered three times at 720x720, `cmp` byte-identical, re-verified
  after the final index.html edit.
- Harness probe (temp copy, discarded): rAF loop driven manually, drag of
  240 px through the piece's own pointer handlers plus release, further
  frames drawn without error; pan and release-decay paths execute.
- Token scan: no Math.random, createElement, AudioContext, getUserMedia,
  gradients, shadowBlur, or filters (one comment states no Math.random is
  used; performance.now is not used at all, the clock is rAF timestamps).
- index.html md5: 5359e398604973de1694b08710ebf3ef
