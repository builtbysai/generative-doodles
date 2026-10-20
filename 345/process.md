# No.345 Night Visitors

## Concept

After Emi Bee's hidden-motif damask and her stated rule:
"from afar, it's a fairly standard antique damask design;
close up, there's spooky ghosts and bats." An antique ogee
lattice in bone on near-black fills the frame, strict
mirror symmetry on both axes. Hidden inside it, in the
same ink and lineweight, are sixteen creatures - 6 ghosts,
6 bats, 4 owls - sitting where medallions would sit, so at
full view the piece reads as pure damask and the visitors
only resolve on a close look. The lattice breathes slowly
on a 16s seamless loop; the creatures' ember eyes (the
only ember in the piece) blink in one fixed authored
sequence inside the same 16s. Drag pans and pinches or
scrolls to zoom, hunting closer; the explored view
persists on release. No text, no chrome.

## Construction

- One canvas, 2D, self-contained. Design space 1280x900,
  full-bleed field, cover-fit; the page ground takes the
  piece's near-black #0D0B08. Palette is exactly three
  colours: ground #0D0B08, bone #E8DCC8, ember #E4572E,
  and ember is used only for creature eyes.
- Lattice: one hand-authored ogee cell (outer ogee, inner
  ogee at 0.64 scale, and a four-way symmetric medallion:
  diamond, four petals, centre circle, four diagonal
  dots) stamped over a half-drop grid, rows at 180px with
  an 80px offset on odd rows. The offset pattern is
  symmetric under both mirrors by construction (row -m
  carries row m's offset, and an 80-offset row mirrors
  onto itself), and the cell itself is four-way symmetric,
  so the whole lattice is strictly mirror-symmetric.
  Small node diamonds mark the lattice joints on the
  symmetric 80x90 point set with odd coordinate parity.
  The lattice is authored across a 1792x1260 world,
  1.4x the frame, so it always covers the view.
- Creatures: exactly 16, held as a fixed data table of
  [type, x, y, sx, sy] and asserted in code: the count is
  16, the type counts are 6 ghosts / 6 bats / 4 owls,
  every entry sits on a lattice cell centre, and the set
  is closed under both mirrors per type. Mirrored copies
  are drawn by replaying the local path under a scale
  flip, so each copy is a true mirror. Creature cells
  skip the medallion; the creature takes its place inside
  the inner ogee. Ghost = dome with a scalloped hem,
  bat = oval body with ear tufts and scalloped wings,
  owl = oval body with ear tufts, face discs, beak and
  belly arcs. All stroked in bone at lineWidth 2.2, the
  lattice's own weight.
- Blink: a fixed authored ORDER permutes the 16
  creatures; the creature in slot s blinks from s seconds
  into the loop for 0.55s, openness dipping on a sine
  curve, so exactly one blink runs per second and the
  sequence closes with the loop. Breathing is one whole
  sine cycle per 16s at 2.2 percent scale amplitude, so
  frame 16s is pixel-identical to frame 0.
- Determinism: the clock constant starts at T = 5.275s,
  chosen so frame one is a developed breath with blink
  slot 5 (creature 0, the ghost at world 240,-180)
  exactly mid-blink. Frame one is drawn synchronously at
  that constant; the typeof-guarded rAF loop advances T
  from the same anchor in fixed 1/60 ticks taken from
  rAF timestamps. No Date.now, no Math.random anywhere,
  so the thumbnail reproduces byte-identically from the
  shipped script.
- Interaction: drag pans grab-style, two-pointer pinch
  and wheel zoom about the pointer. Zoom clamps to
  1x-2.5x; pan clamps against the breath-minimum scale so
  the oversized lattice covers the frame at every phase.
  The view state persists on release: no snap home, no
  reload, and drag never changes the creature set or the
  blink order. Pointer positions convert to design
  coords via the stored cover transform (S, OX, OY).
- House rules: Visual Viewport sizing with resize
  listeners on visualViewport and window; canvas pinned
  every frame via style width/height in px; phone
  detection via window.screen min dimension < 700px with
  aspect fallback (h > w*1.15); synchronous first frame;
  requestAnimationFrame typeof-guarded; fixed data only,
  no runtime randomness. No offscreen canvas, no
  gradients, no shadowBlur, no filters.

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png); all three inspected, plus 2x crops of
  individual creature cells.
- Determinism: the thumb was rendered twice and compared
  byte-identical (cmp clean). All in-code assertions pass
  at load: 16 creatures, 6/6/4 type counts, on-lattice
  placement, mirror closure, blink-order permutation.
- Desktop: a dense antique damask, mirror symmetry
  evident across the full frame. All 16 creatures are
  accounted for in view and read as damask medallions
  until looked at closely; the slot-5 ghost (upper right)
  sits mid-blink in frame one with its ember eyes
  narrowed to slits, exactly as the offset intends.
- Mobile: cover-fit crops to a central vertical slice of
  the field at large scale; ghost, owls and the axis bats
  are legible, the pattern seamless at the crop edges,
  nothing clipped mid-cell in a way that breaks the
  lattice.
- Thumb: the damask reads at gallery size, creatures
  hidden in plain sight with only a few ember eye dots
  giving the hunt away.
- One build fix: the node-diamond grid and the cell
  centres share lattice points, and node diamonds landed
  exactly on the eight quadrant creatures (four ghosts,
  four bats), stamping a small diamond through each body.
  Nodes coinciding with a creature centre are now
  skipped; the creature set is mirror-closed, so the
  skipped nodes stay symmetric. Verified in crops after
  the fix: quadrant bats and ghosts are clean, and the
  axis creatures (never affected) are unchanged.
