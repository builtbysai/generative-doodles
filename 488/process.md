# No.488 "Memory Wall" — process

EXPANSION #58 giuliadallara (Giulia Dall'Ara), prompt GD8.

## Concept

Dall'Ara's participatory mural method (her LINK Brescia and BePart work)
as an interactive piece. A dark teal wall, mostly empty. Each tap plants
one memory glyph at the tap point: a small seeded botanical emblem, a
tiny figure, a sun, a house or a fish, in her flat mural style. Over taps
the wall accumulates into a collective mural: glyphs cluster without ever
overlapping, and a scallop border band grows along the bottom as the
count rises. The wall remembers every tap. Dragging pans across a wall
slightly wider than the viewport; a double-tap clears the wall back to
its starting state. There is no score, no counter, no sound, and the only
text is one lowercase word, "tap", in cream at low alpha in the top-right
corner.

Palette, exactly as briefed: dark teal #14453F ground, mustard #E3A92C,
rust #C33E21, cream #F4EBD3, lavender #B9A8E0. Flat fills throughout;
glyph details (leaf vein, sun centre, fish eye, house door and window)
are cut in the teal ground colour.

## Construction

Single self-contained `index.html`, 2D canvas only, no external assets,
no audio, no microphone.

- Layout: the wall fills the frame and is 1.25x the viewport width, so
  the pan range is a modest quarter-viewport. Canvas size comes from the
  Visual Viewport API, with resize listeners on both `visualViewport` and
  `window`; `draw()` pins `canvas.style.width/height` in px every frame.
  Phone detection uses `window.screen` (min dimension < 700px), with the
  aspect fallback `h > w*1.15` only when screen data is absent. The page
  ground is the same dark teal as the wall.
- Panel grid: a faint cream grid at alpha 0.07 in wall space, five
  columns by three rows, drawn under the glyphs. It suggests the panel
  layout; placement never snaps to it.
- Glyph library: six parametric types drawn in a local box of radius 1,
  scaled per glyph: leaf (bezier leaf with a short stem and a teal vein),
  coral (round-capped branching strokes with filled tips, lean set by the
  glyph's variant value), sun (disc with a teal centre hole and eight
  triangular rays), fish (ellipse body, tail and fin triangles, teal eye,
  facing set by the variant), house (flat body, triangular roof, teal
  door and window, kept near-upright), figure (head disc, one flat
  trapezoid dress mass, two arm strokes, kept near-upright). Every other
  type takes a seeded rotation of up to about 0.3 rad.
- Glyph size: radius 0.019 to 0.030 of min(viewport width, height), so
  the diameter is 3.8 to 6.0 percent of the canvas, as briefed.
- Seeded RNG and the starter cluster: mulberry32 with the fixed house
  seed 488731. The load state is NOT an empty wall (recorded decision,
  per the brief): a starter cluster of 7 glyphs is planted at load, as if
  a workshop began before the visitor arrived. The starter types are a
  seeded shuffle of all six library types plus one seeded repeat, so the
  first frame always shows the whole library; colours, sizes, rotations,
  variants and small anchor jitters all come from the same stream. The
  seven anchors sit spread across the part of the wall visible at load
  (wall fraction u 0.13 to 0.67, v 0.24 to 0.74) with large flat resting
  areas between them. The RNG stream is left open where the starter
  stopped: tap glyphs keep drawing type, colour, size, rotation and
  variant from the continuing stream, so a session's sequence of glyphs
  is deterministic from the seed.
- Placement: positions are stored as fractions of wall width and
  viewport height, so they survive resizes. A new glyph is nudged to the
  nearest free spot by a spiral search (60 rings, 10 steps per ring,
  radius growing with the canvas) that tests each candidate against every
  placed glyph in wall pixel space and requires clearance of both radii
  plus a breathing gap of 1.8 percent of the smaller viewport dimension.
  Candidates are clamped inside the wall and above the scallop band. If
  the spiral finds nothing, the clamped tap point is used.
- Scallop band: drawn as a pure function of the glyph count, segments =
  floor(count / 12). Each segment is one eighth of the wall width and
  carries four semicircular scallops along the top edge of a faint cream
  bottom strip, cycling mustard, rust, cream and lavender, with a short
  coloured rule under the segment's start. The band lives in wall space,
  so panning reveals its growth. At the load count of 7 there are zero
  segments, as briefed.
- Interaction: pointer events only. A press that ends within 400ms
  without moving is a tap and plants one glyph at the tap point,
  converted into wall coordinates through the current pan. A drag pans
  the wall, clamped between the two wall edges. A second tap within
  450ms and close to the first is a double-tap: it clears the wall by
  rebuilding the starter cluster from the house seed (which also resets
  the pan and restarts the seeded stream exactly). Never click-to-reload.
  State is in-memory only.
- Determinism: the first frame is drawn synchronously at load from the
  fixed seed: starter cluster placed, grid visible, no band. Nothing in
  frame one derives from a clock; the clock is read only inside pointer
  handlers, for tap timing. There is no animation loop and no
  `requestAnimationFrame`: the wall is still, and redraws happen on
  resize and on interaction only. The code uses no `AudioContext`, no
  `document.createElement` and no offscreen canvas.

## QA log

Renderer: `node ~/workspace/tools/render-piece.js index.html` (node-canvas),
which evaluates the piece's own script with no rAF; the piece needs none.

- qa-desktop.png (1280x900): dark teal wall with the faint five-by-three
  cream panel grid; seven small flat glyphs spread with wide empty wall
  between them: a rust figure at left, rust and cream fish, a mustard
  leaf, a cream coral branch, a cream house and a cream sun, each clearly
  its own type; no scallop band (count 7); the word "tap" sits quietly in
  the top-right corner.
- qa-mobile.png (390x844): the same seven glyphs at the same wall
  fractions, all legible and none clipped; the grid and hint remain; the
  wall's extra width is off-frame to the right, ready to pan into.
- thumb.png (720x720): same load state, square; the starter cluster reads
  as the beginning of a mural on an otherwise empty teal wall.
- Determinism: thumb.png rendered twice and compared with `cmp`; the two
  files are byte-identical. The second render was deleted.
- Build review: the first build drew glyphs at a diameter of 3.2 to 5.6
  percent of the canvas, which read too small on the phone render, and
  the leaf read as a plain seed shape. Both were fixed before final QA:
  the size range was lifted to 3.8 to 6.0 percent (still inside the
  briefed 3 to 6 percent band) and the leaf gained a short stem. The
  final renders above are from the rebuilt code.
- Deviations: the starter cluster of 7 glyphs at load (instead of an
  empty wall) and the absence of any animation loop are both as briefed
  or as recorded above; no other deviations. Scallop band growth and
  double-tap clearing are interaction states the static QA renderer
  cannot reach; both are pure functions of state set by the pointer
  handlers (segments = floor(count / 12); double-tap rebuilds the seeded
  starter), as described in Construction.
