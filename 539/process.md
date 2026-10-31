# No.539 "Half-Shadow" (EXPANSION #65 nadia-hafid, prompt NH3)

## Concept

From the Chacales cover mechanism. Three huge mask-faces fill the
top of the frame against solid black, each split down the middle by
a hard vertical shadow line: one half lit cream, one half flat
gray, dot eyes and a line mouth at all times. Below them, a
miniature mint street: three yellow stray dogs idling in flat black
shadow pools, a tipped-over can, scattered papers. A loose yellow
brush-lettered title, "Chacales", arcs across the boundary between
the faces and the street. Dragging horizontally is the time of day:
the shadow split slides across all three faces in sync, from
morning (shadow on the left third) through noon (the split at the
center) to evening (shadow swallowing two thirds). The split edge
stays hard at every position. Drag-only; no tap, no reload.

## Construction

- Single self-contained `index.html`, canvas 2D, no external
  assets. Design space 1080x1080, square stage centred via the
  Visual Viewport API (resize listeners on visualViewport and
  window); canvas pinned in px inside draw() every frame. Phone
  detection via window.screen (min dimension < 700px) with the
  aspect fallback; the composition is the same centred square on
  every device and the page ground is the black.
- Palette, strict, nothing else: black #111111, mint #9FD8CB,
  salmon #E8A08C, dog yellow #F2C94C, face-lit #EFD9C4, face-shadow
  #8A8A8A, title yellow #F2D06B. Flat fills only; no gradients, no
  blur, no soft shadow edges anywhere. Following Hafid's own rule
  (no glazes, no textures), there is no grain layer.
- Faces: one symmetric mask path (bezier egg, 372 wide, 604 tall)
  drawn three times at x 165 / 540 / 915, cropped by the top and
  side frame edges. The shadow is the same path clipped, with one
  flat rect filled up to the split x: the edge is hard by
  construction. Split fraction = 0.30 + tod * 0.40, shared by all
  three faces so they slide in sync. Features (two dot eyes, one
  line mouth, all in the black) are drawn after the split, so they
  read on both halves at all times.
- Title call (recorded per the brief): the word lettered is
  "Chacales", the title of the referenced cover, since the prompt
  asks for the cover's loose brush-lettered title arcing across the
  middle. It is NOT a font: each letter (C h a c a l e s) is a set of
  hand-placed stroke centrelines in a 120-unit glyph box, drawn as
  smoothed polylines with round caps and joins; the brush weight
  varies per letter (23-29 units, seeded). Letters sit on a shallow
  arc (54 units of rise at center) across y ~622-676, each rotated
  to the arc tangent, overlapping the faces' lower edges and the
  black band above the street.
- Street: mint plane from y 790 with a thin salmon curb line along
  its far edge. Three parametric dogs (body ellipse, head, snout,
  floppy black ear, stroke legs and tail), each standing in a flat
  black ellipse pool. Idle cycle: bodies sway and bob on slow
  sines (weight shifting); the middle dog scratches, its hind leg
  lifting to work in bursts gated by a cubed slow sine, planted
  again between bursts. The tipped-over can is a salmon cylinder
  rotated onto its side with a black-rimmed open end, in its own
  pool. Five scattered papers (alternating salmon and lit cream,
  seeded sizes and rotations) each sit in a small black pool.
- Interaction: pointer and touch drag anywhere sets a target time
  of day from the horizontal position; the split eases toward it in
  the rAF loop and stays where it is left. A subtle lowercase
  "drag" hint sits in the bottom-right corner, in the face-shadow
  gray at 0.65 alpha. Nothing else.
- Determinism: frame one is drawn synchronously at the constant
  phase PHASE0 = 2.4s, in the constant rest state (tod = 0.5, the
  noon center split; dogs at their fixed PHASE0 idle poses). The
  rAF loop is typeof-guarded and anchored as PHASE0 + elapsed since
  the first frame; no Date.now() anywhere. Fixed seed: mulberry32
  539065 (paper sizes/rotations, per-letter brush weights).

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js index.html`:
  qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png
  (720x720).
- Determinism: thumb.png rendered twice and `cmp` byte-compared:
  identical, re-verified after the fix pass; duplicate render
  deleted.
- Visual read-back: desktop and thumb show the three mask-faces
  with the hard vertical split exactly at center (gray left, lit
  right), dot eyes and line mouths crossing the split, outer faces
  cropped by the frame edges; the yellow Chacales script reads
  clearly and arcs over the boundary; below, the mint street holds
  three yellow dogs in black pools, the tipped can, and the
  papers. Mobile letterboxes the square on the black ground,
  composition unchanged, nothing clipped.
- Fix during QA: the first pass left the tipped can reading as a
  salmon paper with a detached black disc (its rim ellipse landed
  beside the body after rotation) and two bottom papers were cut
  by the stage's lower edge. The can was enlarged, rotated to lie
  flatter, and given a salmon inner ellipse inside the black rim
  so it reads as one open cylinder; the paper spots were raised so
  every paper sits whole inside the stage. All sizes re-rendered;
  determinism gate re-passed.
- Deviations from the prompt: (1) the title word is "Chacales",
  the referenced cover's own title, per the brief's instruction to
  letter the cover title as traced paths. (2) The noon position is
  the exact center split (shadow fraction 0.50), matching the
  prompt's visual description ("split down the middle", one half
  lit, one half gray); the prompt's "thin center line" is read as
  the split line sitting at the center at noon, with the slide
  running 0.30 (morning) to 0.70 (evening). (3) Salmon, otherwise
  unused by the faces and dogs, carries the street dressing (curb
  line, can, alternate papers) so the specced palette stays whole.
