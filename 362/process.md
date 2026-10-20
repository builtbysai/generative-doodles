# No.362 Stingray Trellis — process

## Concept

After Julianne Haness's "Stingray Wallpaper" (EXPANSION
#38, jmarie.creates prompt 2): white-etched stingrays
whose wingspans interlock into a scallop/arch trellis
lattice on black, the negative space holding a field of
small white ring-dots like a starfield. Her signature
animal-as-lattice mechanism, taken literally: the
creature outline and the lattice are the SAME path.
One symmetric wing bezier per ray is mirror-tiled so
wingtips touch neighbours at the shared cell edges and
each whip tail runs to the junction with the ray below;
the outline is one continuous network, not a school of
separate animals. Palette is closed: linework white
#F2EFE6 on ground black #101214, the dot field the same
white at a fixed 0.6 alpha. Flat only, no text, no UI.

## Construction

One canvas, everything JS data drawn directly each
frame; no offscreen canvas, no shadowBlur, no filters,
no gradients, no Math.random anywhere in the file.

- Lattice: cells of 320x300 in design space 1280x900,
  drawn over the visible range plus one cell of margin
  on every side (cols -2..5, rows -2..4). Cells
  mirror-tile: flipX on odd columns, flipY on odd rows.
- The ray: the outline is the DISC, five cubic segments,
  symmetric about the cell centre line: pointed snout at
  the top edge centre (160, 2), leading edges sweeping
  to wingtips exactly on the left/right edges (y = 128),
  trailing edges pinching to a narrow tail base at
  y = 206, and a shallow bottom curve under the base.
  The tail is a separate thin whip: two converging
  stroked curves from the base (x 151..169) to the tail
  tip at the bottom edge centre (160, 298). Asserted at
  load: the outline has exactly 5 segments and the tail
  5 points.
- Etching: two inner contour echoes of the disc
  (scaled 0.72 and 0.47 toward the disc centre), a curved
  spine from snout to tail base with a fine centre line
  down the whip, three gill-slit arcs per side, and two
  filled eye dots beside the snout.
- Undulation: a sine offset field over each mapped
  point, amplitude 6px weighted by sin(pi*lx/CW) *
  sin(pi*ly/CH), so the weight is zero at the wingtips
  and (near) zero at the snout and tail tip: shared
  junctions never move and the lattice never tears
  while the wing bellies breathe. Phase is offset per
  cell (col*0.9 + row*1.7). The field completes exactly
  2 whole cycles in the 24s master loop, so frame 24s
  is pixel-identical to frame 0. LOOP LENGTH: 24
  seconds.
- Dot starfield: ring dots (stroked circles, lineWidth
  1.6, alpha 0.6) live only in the negative space at
  the grid intersections, where the four neighbouring
  outlines curve away. Three authored tables, embedded
  as literal data (generated offline from fixed seeds
  362011 / 362022 / 362033): each table is one 640x600
  tile (2x2 cells) holding exactly 12 dots in 4 clusters
  of 3, and tiling the table covers every intersection
  exactly once. Counts are asserted at load (3 tables x
  12 dots). DOUBLE-TAP cycles table 0 -> 1 -> 2 -> 0.
- Interaction: DRAG pans the oversized repeat, clamped
  to +/-170 design px on each axis (inside the authored
  one-cell margin, so coverage holds at any allowed
  pan); the pan position persists on release. Pointer
  deltas convert through the stored cover scale S.
  A release that never moved is a tap; two taps within
  350ms and 40px are a double-tap. A drag cancels any
  pending tap, so panning never reseeds the stars.
- Determinism: frame one is drawn synchronously at the
  constant phase T_OFFSET = 9s (wings mid-undulation,
  at an extremum of the 2-cycle field), and the guarded
  rAF loop is anchored as T_OFFSET + elapsed since load.
  Frame one is never drawn from Date.now() minus an
  offset.
- House rules: Visual Viewport sizing with resize
  listeners on visualViewport and window; canvas pinned
  every frame via style width/height in px; phone
  detection via window.screen min dimension < 700px
  with aspect fallback (h > w*1.15); cover-fit full
  bleed on every screen; page ground in the piece's
  own black so any edge reads as night water.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js
  at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png),
  720x720 (thumb.png); all three inspected.
- thumb.png rendered three times across the session:
  byte-identical every time (cmp clean), including a
  final check after the last edit.
- Fix during QA: the first outline ran the disc and
  tail as one closed loop, widest mid-body with a short
  integrated spike; the render read as a leaf / eye
  lattice, not stingrays. The outline was re-authored
  as a wide flat disc (widest at the wingtip line,
  pinching to a narrow base at y = 206) plus a separate
  thin whip tail to the bottom edge; re-rendered and
  re-inspected: the creatures now read as stingrays
  (disc, eyes, gill slits, whip) and the whip forms a
  clean vertical line through each row junction where
  the first version crossed in a wide X.
- Desktop: the trellis reads at once, wingtips touching
  at every shared point across the field, alternating
  rows mirrored; ring-dots sit inside the intersection
  pockets without touching any outline (checked against
  the render at full size).
- Mobile: cover-fit centre crop at 390 wide; rays large
  and legible, a dot pocket centred in frame, the
  lattice runs off every edge, no letterboxing.
- Thumb: the lattice, the discs and the whip junctions
  read at gallery size; two full rays and parts of six
  neighbours in frame.
- Deviations from spec: none. The prompt's double-tap
  "reseed" is the standing authored treatment (next
  fixed table), per the batch adaptation flag.
