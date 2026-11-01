# №1396 "Shameless Pole" — zack-khalil ZK5 (PP619)

A tall stacked totem of overloaded signifiers, garish and unashamed: a cartoonish
figure mid-stride atop stacked crates, wearing a Puritan hat overflowing with
lobsters and beer mugs, holding a musket with a flower poking from the barrel,
anarchy patches and beads on its coat — isolated in an empty plaza of sky wash.

## Composition

Bottom-to-top totem, vertical center of the frame, empty plaza space around it:
stacked wood crates → marching figure → Puritan hat → sky. Palette verbatim
from the prompt: lobster red #c23b22, hat black #1a1a18, musket steel #5a5e66,
flower yellow #f5c542, patch magenta #d42a8a, bead turquoise #3fa7a0, crate
wood #7a5a34, sky wash #c8c4b8. Flat fills with hard shadows throughout; no
photoreal shading, no gradients.

## Motion (all closed-form functions of piece time and recorded events)

- Figure bobs in an endless mid-stride march-in-place: legs alternate on a
  0.8 s cycle, body bobs on a 1.6 s cycle, arms swing against the legs.
- Flower in the musket sways on a shared 2.3 s sway envelope.
- March phase-shifted +0.9 rad so frame one is already mid-stride (legs
  crossed), not standing at attention.
- Dragging a part of the stack (hat, musket, patches — hit-tested per part)
  re-dresses it: on release after a drag over 20 px, the part detaches, spins,
  and reattaches over 0.9 s with a new adornment. The pole never falls.
- Adornments are deterministic per part: hat varies lobster count (2–4), mug
  count (1–3), and feather palette rotation; musket varies flower petal count
  (5–7) and petal color; patches vary the three glyph kinds. Each is seeded
  by mulberry32(1396000 + part·7919 + redressCount·104729), never Math.random.
- Drags under 20 px do nothing (verified: settled frame byte-identical to the
  no-drag frame at the same clock time).

## Rules compliance

- Study-wide rule: pseudo-script only. Patches carry drawn glyph shapes
  (chevrons, arcs, crosses, triangles, dots) — no fillText/strokeText anywhere,
  so no readable word can leak in. Only `<title>` carries text.
- No offscreen canvas, gradients, shadowBlur, Path2D, createElement,
  AudioContext, localStorage, or getUserMedia. Fully silent (prompt specs no
  audio).
- Viewport from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas pinned in draw() via style width/height.
- Phone detection via window.screen physical size (min dimension < 700 px),
  aspect h > w·1.15 as fallback only. Centered composition keeps its shape;
  page ground is the piece's own sky wash. Checked at 390 wide: same centered
  composition, no clipping.
- Determinism: synchronous first frame at a constant phase via a boot flag
  (frame one = draw(0), clock starts only with the rAF loop, which is a plain
  function declaration behind a typeof guard). All randomness from seeded
  mulberry32. Thumb renders byte-identical across repeated renders.
- Dots drawn as rects/arcs with each arc on its own beginPath (node-canvas
  batched-arc quirk).

## Verification

Rendered with node-canvas at 1280×900, 390×844, and 720×720; all three
inspected. Forced-time probe harness (stubbed rAF driving the piece's own
loop, pointer events to its own listeners, 1280×900):

- Frame one: legs crossed mid-stride (37 px leg span at the ankle row),
  outlined face, hat with lobsters/mugs/feathers, flowered musket, glyph
  patches, bead strand, stacked crates, empty plaza.
- Motion: t=0 vs t=0.4 differ in 17,314 px (march, bob, sway move).
- Small drag (< 20 px) on patches: settled frame 0 px different from no-drag
  at the same clock time (no redress).
- Big drag on the hat: mid-spin animation differs 15,573 px from pre-drag;
  settled frame differs 1,432 px from no-drag (new adornment, pole intact).
- Token scan clean except one comment stating Math.random is never used.

## Fix rounds

One fix round after the first gate read: the march cycle was phase-shifted so
frame one shows a stride (legs were together at t=0); the head gained a thin
dark outline so the face reads against the sky wash; crate plank lines were
pulled inside the crate edges. All renders re-done after the fix.
