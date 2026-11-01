# №1272 "The Sea Wall" (suchitra-mattai SM1, PP431)

## Prompt
A tall textile wall pieced from vintage-sari fragments in jewel tones, dense with
bindi/bead dot fields, embroidery-floss contours, tassels and trim along the seams.
A horizontal opening runs through the wall; beyond it, layered sea and sky. Grounded
in Mattai's *the sea wall* (2024): the Guyana sea wall blocks the horizon, and the
opening imagines freedom through a view of it.

## Build
- Self-contained single `index.html`, silent, no external assets, no visible text
  except `<title>`.
- Wall: a jittered grid of sari-fragment tiles (magenta #C2185B, turmeric #E69B00,
  peacock #0F7B8A, aged ivory #EFE6D0) on ground ink #141210. Tiles share grid
  points, so seams are wobbly but the wall reads as one pieced textile, never as
  separated blocks. Seam stitching is dashed dark line; ~42% of tiles carry a
  bindi dot contour in gold #D4A017 or ivory; ~10% carry a gold tassel.
- Opening: one unbroken horizontal band slightly above middle (center 0.44H),
  gold trim on both edges. Behind it, layered flat shapes only: horizon pale
  #CFE3E2 sky above, sea deep #174E63 below, with three slow shimmer lines.
- Motion: the wall sways faintly (5 px, 16 s sine). The sea shimmers. No waves
  crashing, no photorealism, no literal horizon photograph.

## Interaction
- Drag horizontally across the opening: each drag segment adds widening
  (0.55 px per px dragged), summed closed-form over the recorded segment list
  with exponential decay (tau 6 s), capped at +0.10H of half-height. The opening
  widens, fragments pull apart at the edges (the wall is drawn in two clipped
  parts), and stillness lets it narrow back to base. No click-to-reload.

## Determinism
- Fixed phase at frame one: `draw(0)` runs synchronously at load; the rAF loop
  is anchored as offset + elapsed-since-load. All randomness is a seeded
  mulberry32(1272) stream, regenerated identically every frame. No `Date.now()`
  minus an offset anywhere in the frame-one path.

## House adaptations
- None beyond the standing rules. The composition rule says no text, so there is
  no hint line; the drag interaction is discoverable from the opening itself.
- Full-bleed field composition on phones and desktop alike; phone grid uses
  6 columns, desktop 9. Canvas pinned in `draw()` via style width/height in px;
  sizing from Visual Viewport with resize listeners on visualViewport and window;
  phone detection via `window.screen` physical size with aspect fallback.

## QA
- Rendered with `node ~/workspace/tools/render-piece.js` at 1280x900 desktop,
  390x844 mobile, 720x720 thumb; all three inspected. Desktop and mobile both
  hold the read: pieced jewel-tone wall, gold-trimmed opening, pale sky over
  deep shimmering sea.
- Thumb rendered twice at 720x720, `cmp` byte-identical.
- Fix round: the first pass jittered whole tiles, leaving black gaps between
  them; rebuilt on shared grid points (borders fixed, interior jittered) so the
  wall reads as one textile.
- Mechanics probe (temp copy, discarded): gap half-height 49.5 px at frame one;
  a 400 px drag across the opening widened it to the 139.5 px cap; after 60 s
  of stillness it decayed back to 49.5 px.
- Token scan clean: no unseeded randomness, no element creation, no offscreen
  canvas, no gradients, no filters, no shadowBlur, no audio/mic APIs.
  `requestAnimationFrame` appears only behind a `typeof` guard.
- md5 (index.html): 2909816c60bebe82d26f24a037b87b2d
