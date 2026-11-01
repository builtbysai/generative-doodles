# №1282 "Quilt Sandwich" (jagdeep-raina JR3, PP441)

## Prompt
Four physical strata stacked as one object: a drawn paper layer (sepia vignette
of hands holding a photograph), a batting layer (soft white puff visible at the
edges), a bordered fabric layer (phulkari-stitched frame cloth), and a binding
edge (dark wrapped rim), bound into a small quilt hanging at a slight angle.
Grounded in Raina's recurring 2023 medium phrase across Manic Escape, The last
bits of thread, Adorned in her Mango shaped choga, Mass movement, Seasonal
life: "mixed media on paper, sewn with bordered fabric, batted, basted, binded
into a quilt." Palette verbatim: paper #DCD6C8, batting #F2EDE2, phulkari
fabric #8E2F28, border thread gold #D9A441, binding #3A2A24, thread shadow
#6B5B4C, ground ink #171310. Square, quilt centered, rotated ~2 degrees
("a little askew"), strata visible at the edges, soft drop shadow beneath,
no text.

## Frame one (t = 0, boot-flagged)
A small quilt hangs slightly askew on ink ground, soft layered-alpha shadow
beneath. Reading outward in: dark binding rim, deep-red fabric ring carrying a
gold phulkari dash border, white batting ring with puff scallops, paper center
with two sepia wash blobs, a cream photo card (sepia inner, dark figure blob)
held by two cupping hand shapes with thumb bumps, and a cream basting line
along the paper edge. No text except `<title>`.

## Mechanics (all closed-form over piece time and recorded events)
- Breathe: batting layer swells on a 7 s sine (scale 1 + 0.004 sin, strata
  separation up to 1.6 px); at t = 0 the separation is exactly zero.
- Corner lift: pointerdown within 70 px of a quilt corner starts a drag;
  the dragged corner displaces per layer with lag (paper 1.0, batting 0.75,
  fabric 0.5, binding 0.3), clamped to 90 px; on release it settles with
  exp(-dt/0.9) decay and clears after 6 s.
- Baste stitch: a tap (movement under 10 px, under 1.5 s) on the binding rim
  traces a fresh stitch along the rim near the tap point, revealing over
  0.6 s and persisting; capped at 14, oldest replaced. Tones alternate
  gold / cream / gold.
- Never click-to-reload. No flat-UI card look: strata are physical offset
  layers, stitching is structural.

## House adaptations
- Visual Viewport sizing with resize listeners on visualViewport and window;
  canvas pinned in draw() via style width/height in px; phone detection via
  window.screen physical size (min dimension < 700 px) with aspect fallback.
  Centered geometric piece: shape kept whole, page ground is the piece's own
  ink color. Verified at 390 wide.
- Determinism (№1275 lesson): synchronous first frame draws at exactly t = 0
  via `draw(0)`; the performance clock starts only with the rAF loop. The
  file contains zero performance.now()/Date.now() references.
- QA renderer limits honored: no rAF (typeof-guarded), no AudioContext, no
  document.createElement, no WebGL, no offscreen canvas, no ctx.filter, no
  shadowBlur (shadow is layered flat alpha ellipses), no gradients, no
  getUserMedia. Seeded mulberry32 RNG; no Math.random. Dots drawn as arcs
  with moveTo discipline where batched.
- Silent. No external assets. Single self-contained index.html.

## QA
- Renders inspected at 1280x900 desktop, 390x844 mobile, 720x720 thumb.
- Thumb rendered three times at 720x720, `cmp` byte-identical, and matching
  the shipped thumb.png.
- Mechanics verified through the piece's own pointer handlers in a node
  harness (stubbed DOM, captured rAF, frozen-clock redraws): baste tap drew
  435 new pixels at the rim tap point; corner drag moved 17,552 pixels near
  the dragged corner; breathe max-vs-zero separation differed in 38,247
  pixels across the quilt.
- Token scan clean (the only grep hits are comments stating no Math.random
  and no shadowBlur are used).

## Fix rounds
1. First render: strata rings too thin (paper only 12 px inside fabric), so
   the gold phulkari border hid under the paper and the batting read as a
   dotted line. Re-sized the stack (binding +10, fabric 0, batting -16,
   paper -30) so every layer reads: dark rim, red ring with gold dashes,
   white puff ring, paper center. Gold corner diamonds dropped as clutter
   once the dash border read clearly.
2. Hands first read as two pills: added a thumb bump per hand; they now read
   as cupping hands at the photo's lower corners.

## Files
- index.html (md5 8b7cdee2e0aabad8b6ee28ed032bd609)
- process.md (this file)
- thumb.png (720x720)
- qa-desktop.png (1280x900), qa-mobile.png (390x844)
