# №1579 Growth, Contained (ayumu-nagamatsu AN4, PP826, expansion #208)

Built 2026-11-06 from the verbatim prompt in the task brief, cross-checked
against BATCH-1576-1580-SPEC.md. Watch-only, no pointer interaction.
Staged only; nothing pushed.

## What it is

A white coral-like recursive growth blooming inside a glass wireframe
icosahedron shell on neutral grey #B8B8BC. Twelve primary branches grow
from the icosahedron vertices; each branch splits into two mirrored
children, depth 4 (744 segments, 30 shell edges), all from mulberry32
seed 1579. Branches are drawn white #F7F7F7 with a soft grey #6E6E74
shadow pass offset a few px, depth-sorted, with dotted tips. The shell
is a faint white wireframe icosahedron with vertex dots. The shell spans
~70% of the frame (radius 0.35 x min dimension), centered, generous
grey margin. Caption chip: "Growth, Contained · 2006 · 05 · 09 ·
Watch the shell stretch."

## Motion (seamless 45s loop)

- Growth E(p): smoothstep up over p in [0, 0.55], holds, presses 12%
  past the shell over [0.62, 0.78], relaxes to 0 at p = 1. Coral scale
  goes 0.15 (seed stub around a central seed dot) to 1.10 (tips at
  1.047 x shell radius, pressing through the wireframe).
- Shell stretch S(p): 0 until p = 0.60, full stretch at the climax
  (shell radius 1 + 0.7 x overgrowth + 0.03), relaxed to 1 at p = 1.
- Rotation: one full turn per loop plus a small periodic tilt wobble,
  so the projection at p = 1 matches p = 0 exactly.
- No cross-fade is needed as a separate step: every animated quantity
  is a periodic function of loop phase with matched endpoints, so the
  return to the seed state IS the matched loop point (per the batch
  spec adaptation flag: start/end transforms identical).

## Deviations from the prompt

1. First-frame phase is p = 0.5 (t = 22.5s), not p = 0. At p = 0 the
   piece is a bare seed dot, which would make the gallery thumb look
   empty. The batch spec allows a constant fixed-offset first frame,
   and the rAF loop is anchored as offset + elapsed, so determinism
   and loop closure are preserved. Reason: the thumb must show the
   piece. The seed state still occurs in the loop at p = 0.
2. The shell stretch is a uniform radius lerp toward the growth's
   bounding radius (0.7 x overgrowth + 0.03 bulge) rather than a
   per-vertex directional lerp, because the growth is icosahedrally
   distributed and its bounding radius is effectively uniform. The
   stretch still reads as the climax: at t = 33s the wireframe visibly
   bulges and coral tips poke through it.
3. The prompt's "cross-fade to the seed" is realized by construction
   (matched loop point) rather than an alpha fade, so no visible cut
   is possible. Verified by byte comparison, see QA.

## House rules

- Template boilerplate from /tmp/tpl-index.html (№1575): Visual
  Viewport sizing with resize on visualViewport and window, canvas
  pinned in draw() via style width/height in px, phone detection via
  window.screen (min dimension < 700px) with aspect fallback,
  centered composition keeping its shape on phones with the page
  ground set to the piece's own background color.
- No pointer listeners at all (resize only). No audio. No Math.random,
  no Date.now() in the draw path. One synchronous frame at load,
  rAF guarded by a typeof check. moveTo before every batched arc;
  all fading alphas rounded to 4 decimals. No em dashes in visible
  copy. No AI-signature copy.

## QA

- Rendered the actual script with node ~/workspace/tools/render-piece.js
  at 1280x900 desktop, 390x844 mobile, 720x720 thumb. All three
  inspected visually: coral reads as branching coral, not a blob;
  shell wireframe legible; caption legible; mobile keeps shape
  centered with grey margins; no clipping.
- Thumb byte-identical across two consecutive renders:
  md5 b731d101c488d60d8bdc2d0779276785 (both runs).
- Loop closure probed with /tmp/probe1579.js at 1280x900: t = 0 and
  t = 45 render byte-identical (md5 e092e15ea9ebb446c867a54d4426ad5e);
  after the phase-offset change, t = 22.5 and t = 67.5 render
  byte-identical (md5 6672c4969701956a884ef6984e813b9b).
- Mid-loop frames inspected: t = 22.5s near-full bloom (E = 0.977),
  t = 33s overgrowth climax (E = 1.095, S = 0.741, tipR = 1.027,
  shellR = 1.036) with tips pressing through the stretched shell.
- index.html md5: bd3a74e80ae0066b719b70b28f45a911

## Gallery

- Date: 2006 · 05 · 09 (formula 2002-01-10 + (N+1) days).
- Note: "White coral growth presses against its glass shell, then
  snaps back to seed. Watch the shell stretch."
