# №1582 Decomposed by Its Spheres (AN7, #208 ayumu-nagamatsu)

## What the piece does
A glass-and-matte rosette on a green ground: 12 long outer petal shards
and 12 shorter inner shards nested between them, in perfect radial
symmetry. Matte white petals alternate with clear glass petals (faint
blue tint, white rim, white highlight streak). On a seamless ~30 s
watch-only loop the petals separate outward along their symmetry axes
(outer tips from 100% to 110% of the rosette radius), hang apart, then
glide back into the solid rosette. No pointer interaction at all: it is
clockwork.

## Mechanism
- Geometry is a pure function of loop phase. The separation envelope is
  a closed-form smoothstep schedule over the 30 s loop: rise 0-0.28,
  hang 0.28-0.50, return 0.50-0.78, rest solid 0.78-1.00. s(0) = s(1) = 0
  exactly, so the loop point is invisible and frame t=0 is identical to
  frame t=30.
- Each petal is the same leaf-shaped quadratic lens, drawn in a rotated
  frame at its symmetry angle, translated radially by its separation
  offset (outer 0.10 R, inner 0.055 R). No randomness anywhere: all
  values are fixed authored constants, so the first frame is
  deterministic and the thumb byte-compares across renders.
- Palette only: green ground #3E7A4E, matte white #F5F5F2, glass tint
  #9AC4E8 with white highlights.
- Rosette diameter is ~75% of the frame's smaller side, centered.
- House rules: Visual Viewport sizing with resize listeners on
  visualViewport and window; canvas pinned in draw() via
  canvas.style.width/height in px; phone detection via window.screen
  (min dimension < 700px) with aspect h > w*1.15 fallback; one
  synchronous frame at load (draw(0)); requestAnimationFrame guarded
  by a typeof check; no click-to-reload; no in-piece text (the batch
  standing rule allows no hint text here; the gallery note carries the
  watch-only cue).

## Deviation from the prompt
- "Rosette centered at ~75%" is read as the rosette's diameter being
  ~75% of the frame's smaller side, centered in the frame. The prompt
  does not fix a vertical offset, and a centered rosette keeps the
  radial symmetry legible at every size.
- An inner ring of 12 shorter shards is added, nested half a step
  between the outer petals, so the rosette reads as the intersection of
  several spheres rather than a single flat ring. Alternation phase is
  flipped between the rings so glass and matte interleave.
