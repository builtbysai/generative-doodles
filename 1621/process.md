# №1621 "Live Coded" (SP6, sableraph #213, PP868)

## Driver
Accumulation with turnover: a live-coded collage that fills over minutes and
never empties; the oldest shapes sink as new ones arrive.

## Mechanism
A dense collage of translucent circles, triangles and diamonds in warm reds,
cyans, yellows, greens and deep navy on paper ground #F4F1EA, drawn with
multiply blending so overlaps darken into deeper intersections. Every shape
is a pure function of its index from mulberry32 (kind, palette color, alpha
0.55 to 0.70, size, edge spawn point, inward target, rotation and rotation
speed); arrival times come from a separate seeded stream, one shape every
3.2 to 4.8 seconds, each drifting from a frame edge to its spot over 2.5
seconds while rotating slowly. The piece carries a fixed virtual age: frame
one is drawn at virtual time 160 s, so about 40 shapes have already landed
and the frame is partially filled with ground still visible in the gaps.
Turnover is a pure function of time too: only the newest 120 shapes are
visible, the oldest five of those fade under as new ones arrive, and anything
older is gone, so the frame never clears and never overflows. Drag grabs the
nearest shape under the pointer (unsettled shapes preferred), follows the
pointer, and on release flings it with pointer velocity; friction settles it
and it stays where it lands. Nothing clears the frame and there is no
click-to-reload anywhere.

## Frame-one determinism
Frame one is drawn synchronously at a fixed virtual age (V0 + PHASE = 160 s).
All shape parameters and arrival times are seeded functions of index; rotation
is a closed-form function of virtual time. Verified: two independent 720x720
thumb renders have identical md5 (7a9af30d7932efe2940b6ec306e00175). The
node-harness check at virtual time 760 s shows the late state dense and
nearly covered with ground still showing in gaps, as specced.

## Drag
Verified in a node harness: pointerdown near the dark disc, drag to a new
spot and release flings exactly one shape, which coasts with velocity and
lands at the thrown position; the re-rendered frame differs from frame one
and the flung shape is visible at its new spot. No reload, no clear.

## Deviations
- Deep navy shapes are capped at radius 0.14 of the frame while the other
  four colors run to 0.30. A large navy disc multiplied over many shapes
  went near-black and read as a mud puddle; the cap keeps navy as an accent
  and the frame-one collage readable. Alpha stays in the specced 0.55 to
  0.70 range for every shape.
- Frame one shows the collage after about 2.5 virtual minutes of filling
  rather than an empty frame. The spec fills the frame over minutes from
  empty, but an empty first frame would fail the byte gate and read as a
  blank page; the fixed virtual age keeps the first frame reproducible while
  the live piece still accumulates from the same stream.

## Fix rounds
1. First render: several frame-spanning discs (radius to 0.42) stacked in the
   lower half into a near-black multiply mass. Reduced the size curve to
   0.02 + u^3 * 0.28 (large discs rare, max 0.30).
2. Second render: still one large navy disc dominating the lower centre.
   Capped navy radius at 0.14. Third render accepted: partially filled
   frame, ground visible in gaps, overlaps darkening cleanly, title/date/
   hint legible at desktop, mobile and thumb sizes.

## House rules
Visual Viewport sizing with listeners on visualViewport and window; canvas
pinned in draw() via style width/height in px; phone detection via
window.screen with aspect fallback; centered square collage on both sizes
with the page ground set to the piece's own paper color and a navy hint;
one synchronous frame at load; requestAnimationFrame guarded by typeof
check; reduced-motion support (static frame at PHASE). Title "Live Coded",
date "2006 · 06 · 20" (formula date), hint "Drag to throw a shape." No em
dashes in visible copy.
