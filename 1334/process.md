# №1334 "Shea Butter" — process notes

Rashid Johnson, RJ7 (PP501). A dark field of matte black steel panels; floating
against it, rough-carved yellow shea-butter blocks and busts. The only light in
the composition comes from their waxy glow.

## Composition

- Backdrop: a loose 4 x 5 grid of near-black steel panels, with empty cells, so
  the grid never reads as a solid wall. Generous black space around each block.
- Four blocks only (under the five-blob cap), each a different scale, floating
  at different depths (drawn far-to-near). The largest, upper left, carries the
  bust: cranium with a thin brow ridge and a small nose wedge, deliberately
  featureless otherwise — no eyes, ever.
- Blocks are blobby masses built from layered flat-alpha ellipses in shea
  #E3A92F, shea shadow #8A5F1A, and shea highlight #F5D47E, with thumb-print
  dents in #6E4A14, seeded flecks for rough-carved texture, and one drip frozen
  mid-run on each block's flank. Glow is layered flat-alpha ellipses, never
  gradients; there are no gradients, no shadowBlur, no filters, no offscreen
  canvas, no WebGL anywhere in the piece.

## Motion (all closed-form functions of piece time and recorded events)

- Melt cycle: 40 s per block, seeded phase offsets. Each block slumps (scaleY
  1 to 0.85, scaleX 1 to 1.15), pools (scaleY to 0.78, scaleX to 1.25, a pool
  spread growing at the base), then re-rises to full height. The range is kept
  shallow on purpose so a block always reads as a block, never a puddle.
- Touch a block: it warms — glow alpha rises on an exp(-age/6) decay — and a
  thumb-print dent appears at the touch point, then slowly fills back in as
  the warmth decays. Touch state is a list of recorded touch events.
- Drag: spins the touched block. Spin is the cumulative sum of recorded drag
  deltas (0.005 rad per pixel), so it is closed-form, never frame-integrated.
- Idle drip: every 25 s a drip detaches from a seeded block (mulberry32 keyed
  by cycle index), falls on an ease-out curve for 6 s, and fades to zero
  before it lands.
- Frame one is exactly t = 0 via a boot flag; the clock starts only with the
  rAF loop (plain function declaration behind a typeof guard). All randomness
  comes from seeded mulberry32 streams, never Math.random.

## Interaction

Touch warms and dents; drag spins. Never click-to-reload. No audio of any
kind. No visible text except the page title.

## QA

Rendered with node ~/workspace/tools/render-piece.js at 1280x900 desktop,
390x844 mobile, and 720x720 thumb; all three inspected. Thumb rendered three
times plus a final re-verification after process.md was written — all
cmp byte-identical.

Fix rounds: (1) first render's melt range flattened blocks into pools at
frame one and the glow halos dominated, so the melt range was shallowed
(scaleY floor 0.78 instead of 0.60), glow radii and alpha cut, and the pool
spread narrowed; (2) first thumb-print dents rendered as rings because of a
paired highlight dot, so dents are now single flat dark marks; (3) the bust's
first cranium carried a large pale disc plus a wide brow bar and a dangling
nose tab that read as a cartoon face, so the disc was removed, the brow
narrowed to a thin ridge, and the nose reduced to a small wedge tucked under
it; (4) steel panels lightened slightly (shades 22-31) so the loose grid
reads against the #100F0E ground.
