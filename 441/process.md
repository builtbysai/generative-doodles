# №1432 "One Hundred Doors" (nikolaus-utermoehlen NU1, PP655)

## Prompt
A baroque choir screen — dense carved ornament, arches, scrolls, saints in
niches — shown as a wall of one hundred panels, ten by ten. From far away the
screen reads as one photorealistic grille; as you approach, each panel
dissolves into abstract ornament, matte here, glossy there, light and dark
tones shifting panel to panel. One panel is always slightly enlarged as the
"current" panel, but the wall never crops to a single panel. The current
panel drifts across the grid on its own slow rhythm, and the wall breathes
between far-reading and near-reading without ever settling. Dragging across
the wall moves the viewpoint closer to the panel under the finger (ornament
sharpens, screen dissolves); dragging back restores the whole; dragging a
single panel swaps its matte/gloss finish.

## Build
- Self-contained `index.html`, no external assets, fully silent.
- One procedural baroque-ornament motif tiled 10×10. Each panel carries
  seeded parameters (mulberry32, seed 1432000 + index·7919): matte/gloss
  finish, light/dark tone, scroll curl, rosette radius, arch width, niche
  figure height.
- Two phases, hard switch, never a smooth blur: FAR renders the screen as a
  simplified grille (arch, bars, small rosette, carmine accent); NEAR renders
  dense ornament (double arch, curling scrolls, abstract niche figure,
  petalled rosette, finish-coloured strokes, glossy highlight line).
- Ambient breathing: 60 s cycle, far half / near half, so the wall never
  settles on one reading.
- Current panel: boustrophedon drift, 5 s per panel, drawn 12% enlarged over
  its cell; the wall always stays visible, never cropped to one panel.
- Interaction: a drag across the wall puts panels within one cell of the
  finger into the near phase (hard switch); on release the near zone fades
  over ~2 s back to ambient, and dragging the finger away removes the zone
  from panels left behind — dragging back restores the whole. A tap (small
  movement, same cell) swaps that panel's matte/gloss finish persistently.
- House rules: canvas sized from the Visual Viewport API, pinned in draw();
  phone detection via window.screen with aspect fallback; field-like
  composition goes full-bleed on phones (verified at 390 wide).
- Determinism: frame one = draw(0) via boot flag, clock starts only with the
  rAF loop (plain function declaration behind a typeof guard); no
  Math.random; no AudioContext, getUserMedia, offscreen canvas, gradients,
  shadowBlur, Path2D, createElement, or fillText/strokeText. Fading alphas
  rounded to 4 decimals; dots as filled rects or own-beginPath arcs
  (node-canvas quirks).

## Verification
- Rendered at 1280×900, 390×844, 720×720 and inspected all three; thumb
  byte-identical across repeated renders.
- Forced-time probe harness (vm-isolated instance, stubbed rAF driving the
  piece's own loop via the `window.__piece` hook, pointer events to its own
  listeners): t=0 far phase holds 0 finish-colour pixels; t=45 near phase
  holds 162,384 gold/ochre pixels; current index drifts 0 → 1 → 2 → 18
  (boustrophedon path); a drag to cell (6,5) puts 1,622 finish pixels in
  that cell and 0 in far cell (0,9); a tap on panel 42 flips its finish
  matte → gloss; the wall fills the frame at all sizes.
- No fix rounds needed. Token scan clean (the single "Math.random" hit is a
  comment stating it is never used).
