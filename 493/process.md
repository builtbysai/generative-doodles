# No.493 Corrupt Lines

EXPANSION #59 eugenio-bertozzi, prompt EB5.

## Concept

His WorkFields poster as a watch-only loop. Seven stacked lines of
high-contrast white serif caps on black carry trade words only:
GRAPHIC DESIGN / ILLUSTRAZIONE / ANIMAZIONE / EDITORIALE / LEGATORIA /
TIPOGRAFIA / SERIGRAFIA. One small mono line sits at the bottom:
WORKFIELDS · STUDIO GRAFICO. The corruption is the only event: over a
34s cycle, five seeded letters melt one by one into ink swirls, hold,
then the lines heal back left to right, line by line, and the cycle
repeats seamlessly. Most letters stay clean at all times; the swirl is
an accent, never the texture. Palette is exactly the prompt's two
colors: black #080808, white #FFFFFF. No gradients, no color, no
interaction, no hint text.

## Construction

- Single self-contained index.html, canvas 2D, exactly the prompt
  palette. Type stack: Didot, Bodoni MT, Playfair Display, Georgia,
  Times New Roman, serif at weight 700; mono line in a ui-monospace
  stack. Letters are measured and placed one by one (per-line font size
  scaled so each line's width lands at a seeded 1.08-1.32x of the canvas
  width, plus seeded letterspacing), so every letter owns a cell that
  can be swapped without disturbing its line.
- Layout: base size from the frame, slot height 1.16x the base size
  (tight leading that still clears the largest scaled line), block
  centered with a slight upward bias. Portrait logic holds at every
  size: on phones the type scales from the width and the lines bleed
  hard off both edges; on the square thumb the long lines bleed; on
  wide desktop the long lines run to the edges and the short lines sit
  as a justified-feeling block (a 9-letter word cannot fill 1.2x of a
  landscape frame at poster scale without absurd tracking; this is a
  geometry limit, not a style choice).
- Corruption plan (seeded, mulberry32 seed 493005): five target letters
  chosen by seeded shuffle across all lines. Spread order is the
  shuffle order, melts starting at 2/6/10/14/18s, each melt 2s. Heal
  order is sorted by line then position (left to right), starting at
  26s, staggered 0.5s, 1s each. All clean again by 29s; loop wraps at
  34s with the state identical at both ends.
- A corrupted letter is a procedural vortex glyph drawn in its cell:
  an inward spiral (seeded segment breaks, drawing in with the melt
  progress) plus three concentric broken arcs spinning in alternating
  directions and a core dot, white on black. During a melt the clean
  letter crossfades out as the swirl draws in; during a heal the
  reverse. The swirl slowly rotates while it lives.
- Canvas sized from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas.style.width/height pinned in draw()
  every frame. Phone detection via window.screen (min dimension under
  700px) with the h > w*1.15 aspect fallback; page ground is the black.
- Determinism: the first frame is drawn synchronously at a constant
  loop phase (t = 9s pre-roll baked in: the first two melt events are
  complete, so exactly two letters sit as full swirls, the L of
  EDITORIALE and the E of SERIGRAFIA). The animation loop, when
  running, is anchored as that fixed offset plus elapsed time since
  load, and requestAnimationFrame is typeof-guarded so the node QA
  renderer draws the same frame. All layout randomness uses seeded
  mulberry32; no Math.random, no clock reads, no Date.now().

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720 (thumb.png).
- Determinism gate: thumb rendered twice and byte-compared with cmp,
  identical, re-verified after every tuning pass. Second render
  deleted after each check.
- Desktop: seven lines read as a poster, all trade words legible,
  tight leading with no inter-line collisions, the two swirls clearly
  read as dissolving ink vortices inside their letter cells, mono line
  small and quiet at the bottom.
- Thumb: long lines bleed off both edges; both swirls legible at
  gallery size.
- Mobile: portrait logic holds, lines bleed off both edges, both
  swirls in frame, mono line unclipped.
- Two tuning passes during QA: (1) the first stack scaled short lines
  up to 1.7x, taller than their slots, so adjacent lines collided;
  slot factor raised and per-line scale rebalanced until the stack
  read tight but clean at all three sizes. (2) Bleed factors raised
  slightly afterward so the long lines reach the edges on desktop too.
- Deviations from the prompt letter: one, the prompt's own named
  adaptation. No offscreen canvas or per-glyph warp exists in the QA
  renderer, so a corrupted letter is not a warped bitmap of the letter;
  it is replaced by the procedural swirl glyph described above, which
  reads as the letter dissolving into ink. Environment note, not a
  deviation: the QA renderer has no Didot/Bodoni/Playfair/Georgia, so
  QA renders fall back to DejaVu Serif Bold; on real devices the stack
  resolves to the high-contrast faces first. Per-letter measurement
  keeps the layout correct under either.
