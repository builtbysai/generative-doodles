# No.370 Fiddlehead Biome

## Concept

After Olena Kovalova's Forest Biome wallpaper: a dense
fern toss on near-black. Uncurling fiddlehead spirals
breathe open and closed, big fronds arch in from the
bottom corners with serrated leaflets, and small cream
butterflies sit in the negative space between the
plants. It is a watch-only biome with one disturbance:
dragging stirs a breeze through it, and everything
settles back to exactly where it was.

## Construction

- One canvas, design space 1280x900, cover-fit on every
  screen, page ground in the biome's near-black green.
  Flat colour only: no gradients, no shadowBlur, no
  filters, no offscreen canvas. All marks are JS data
  drawn directly each frame. The palette is closed at
  five hexes, asserted at load: ground #0E140F, ferns
  #7A9B76 and #5C7A58, butterfly cream #F1EBDC, accent
  dots #C9A24B.
- Wallpaper field: a half-drop tile of 640x450 (odd
  columns dropped by half the tile height), drawn
  wrapped so any crop is continuous. Each tile holds
  exactly 10 fiddleheads and 4 butterflies, so a full
  screen shows exactly 40 fiddleheads and 16
  butterflies; both counts are asserted at load, as is
  every fiddlehead's nominal scale inside 40 to 140px
  (actual table range 48 to 139px). Positions come from
  a fixed-seed mulberry32 table: one fiddlehead per
  cell of a 5x2 jittered grid so the toss covers evenly,
  butterflies rejection-placed at least 60px from any
  fiddlehead anchor so they land in the negative space.
- Fiddlehead: two parts. The stalk is a quadratic curve
  with a per-plant lean, carrying smooth leaflet pairs
  that grow toward its top. The coil is an explicit
  Archimedean spiral joined at the stalk top. The curl
  parameter u drives the unfurl: stalk length runs
  0.40 to 0.78 of the plant height as u goes 0.2 to
  1.0, coil radius shrinks 0.33 to 0.23, and coil turns
  open from 2.06 to 1.1. The stem is stroked in two
  passes, dark stalk and a lighter, thicker coil, so
  the spiral reads against the ground. Tiny pinnae hug
  the first part of the coil, and gold spore dots (0,
  2 or 3 per plant, by table) gather at the coil
  centre.
- Fronds: four arching fronds drawn under the field,
  each a procedural walk whose heading bends over its
  length and curls into a small crozier at the tip,
  with serrated leaflet pairs (a zigzag edge profile
  with a darker midrib) growing then easing along the
  stem. Two large fronds arch from the bottom corners;
  two smaller ones sit toward the middle so their
  arches still cross the narrow phone crop. A single
  gold dot marks each frond tip.
- Butterflies: cream, built from two ellipse wing pairs
  around a small body, with gold dots on the forewings
  and thin antennae. Wing flap is a horizontal squeeze
  oscillating 8 times per loop; a small bob runs on
  whole cycles per loop (2, 3 or 4 by table).
- Loop: the master loop is 20 seconds. Each
  fiddlehead's curl oscillates u = 0.6 + 0.4 sin over
  exactly one cycle per loop, with golden-angle
  staggered phases, so frame one already shows mixed
  curl phases and frame 20s is pixel-identical to
  frame 0. Whole cycles only, everywhere.
- Interaction: drag is a breeze. Pointer velocity,
  converted through the stored cover transform (S, OX,
  OY), drives a breeze vector clamped to 120 design
  px. Fiddleheads and fronds bend away from it along
  their length (displacement grows with height along
  the plant), and butterflies scatter further, by a
  per-butterfly factor of 1.2 to 2.2. On release the
  breeze springs back and snaps to exactly zero below
  a small threshold, so plants and butterflies return
  to their authored positions and the tile seam holds.
  No tap action, no double-tap, never click-to-reload.
  No text, labels or UI anywhere.
- Determinism: frame one is drawn synchronously at
  the constant phase T = 6.3s into the 20s loop. The
  rAF clock is anchored to that constant plus elapsed
  time in fixed 1/60 ticks, typeof-guarded; phase is
  always computed from T mod LOOP, never from a
  wall-clock offset. The breeze starts at exactly zero
  and only moves after real pointer input.
- House rules: Visual Viewport sizing with resize
  listeners on visualViewport and window; canvas
  pinned every frame via style width/height in px;
  phone detection via window.screen min dimension
  under 700px with aspect fallback (h over w times
  1.15); fixed seeds and tables only, no runtime
  random.

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png), all inspected directly, plus 3x crops of
  individual fiddleheads at full resolution.
- First geometry failed inspection twice: a continuous
  turning walk buried the spiral under its own leaflets
  (plants read as pom-poms, then as sprigs). The
  fiddlehead was rebuilt as stalk plus explicit
  Archimedean coil, with the coil stroked lighter and
  thicker than the stalk; the spiral, gold centre dots
  and curled tips now read at every scale, and the
  unfurl reads as stalk growth plus coil opening.
- A build accident was caught and fixed during QA: a
  marker-based edit matched an earlier section header
  and duplicated part of the file, leaving a stale
  second copy of the draw function in force. The file
  was rewritten clean; a grep confirms exactly one
  definition of every draw function in the shipped
  script.
- Coverage fix: fiddlehead anchors moved from pure
  scatter to a jittered 5x2 grid after the first render
  showed an empty band across the middle heights. The
  field now covers evenly at desktop, thumb and phone
  sizes; the mid fronds were also shortened so their
  tips meet cleanly instead of knotting at the centre.
- Determinism: thumb.png rendered twice from the
  shipped script, byte-identical (md5
  266a176821cedfb140f5efa5f76b22f2).
- Desktop: full-bleed fern toss, spirals at mixed curl
  phases, fronds arching from both bottom corners,
  butterflies in the gaps, no edge gaps. Mobile:
  cover-fit centre crop, spirals and both mid frond
  arches in frame, no letterboxing. Thumb: spirals,
  fronds, butterflies and the two-tone palette all
  read at gallery size.
- Deviations from the spec: none. The spec's fixed
  asserted counts (40 fiddleheads, 16 butterflies),
  20s seamless unfurl loop, drag breeze with full
  spring-back, flat five-colour palette and constant-
  phase first frame are all as specced; the loop
  length is stated here as required.
