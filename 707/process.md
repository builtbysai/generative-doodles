# No.707 "All of a Quiver"

EXPANSION #86 mona-hatoum, prompt block 4. After Mona Hatoum's steel
grid tower that cannot decide whether to stand.

## Concept

A tall open steel grid tower, three cubes wide, four deep, nine high,
stands alone in a dark room on a faint floor slab, drawn in isometric
wireframe, edges only, no faces, no people, no context. On a 45 second
watch-only loop it is calm, then buckles: a deformation wave rises from
mid-height, the tower leans, groans in bent members and brighter
stressed edges, holds, and then pulls itself back upright from the
base upward. It never collapses. A passing drag near the tower adds a
small lean away from the pointer that springs back on release.

Palette, strict: background #0B0B0D, steel #8A8F96, stress edges
#C9CDD4, floor #131316, shadow #000000 at low alpha. No text anywhere
except the document title. No audio.

## Construction

Single self-contained index.html, canvas 2D. Canvas size comes from
the Visual Viewport API with resize listeners on both visualViewport
and window; draw() pins canvas.style.width/height in px every frame.
Phone detection uses window.screen physical size (min dimension under
700px) with the tall-aspect check as fallback only; the layout keeps
the tower's proportions and most of the phone's height.

Lattice nodes are world points (i, j, k), i in 0..3, j in 0..4,
k in 0..9, projected isometrically. A node's displacement is a
closed-form function of height fraction u = k/9 and cycle time:

- Buckle envelope. The cycle is 45 s: calm 0-10 s (envelope 0, base
  fixed because every term carries a factor that vanishes at u = 0),
  buckle build 10-18 s as a smoothstep ramp, hold 18-26 s, recompose
  26-38 s, calm to 45 s. During recompose a recovery front f sweeps
  from -0.05 to 1.25 in u and each level's envelope is multiplied by
  smooth(f - 0.25, f + 0.05, u), so low levels recover first and the
  tower recomposes from the base upward.
- Travelling bulge. A Gaussian in height, bulge(u) =
  exp(-((u - c)/0.20)^2), whose centre c = 0.5 + 0.32 sin((ct-10)*0.30)
  travels up and down the tower while the buckle is active.
- Lean. A global lean along a per-cycle seeded direction, top
  displacement 1.25 world units (about 8 degrees over the 9-unit
  height), weighted by u^1.6 and the level envelope.
- Per-cell offsets. The bulge field is realised as a continuous
  closed-form offset sampled at the shared lattice nodes: direction
  twists with height (waveAng + u*twist), magnitude is bulge *
  envelope * 0.38 * a seeded per-level factor (0.7 to 1.3) * a mild
  spatial term across the footprint, plus a slight vertical
  compression (-0.12 * bulge * envelope * u). Because the field is
  sampled at shared nodes, cells deform (top and bottom of a cell
  displace differently where the bulge is steep) while every edge
  stays welded. A cell's stress measure is bulge * envelope * its
  level factor; edges above 0.30 stress are redrawn in the stress
  tone with alpha rising to 0.85.
- Bent members. A vertical edge whose cell sits inside the bulge is
  drawn as a quadratic curve whose control point is the edge midpoint
  pushed twice the bend offset (bend = bulge * envelope * 0.17 *
  level factor) along the wave direction, since a quadratic passes
  halfway to its control point.
- Per-cycle character (lean direction, wave direction, twist, level
  factors, phase) derives from mulberry32 seeded by the cycle index,
  cached per cycle.
- Floor and shadow. The floor is a slab one unit larger than the
  footprint in the floor tone; the shadow is the footprint polygon in
  black, three passes at growing scale and falling alpha.
- Pointer lean. Dragging records pointer state on the anchored clock:
  the target is a horizontal push away from the pointer (screen-x
  mapped onto the world (x, -z) diagonal, capped at 0.45 units,
  fading with distance from the tower centre), eased in over 0.35 s;
  on release the recorded lean springs back as exp(-1.6 dt) cos(4.2 dt).
  It is a function of the recorded events and time only, and never
  reloads anything.

Frame one is the synchronous draw at cycle t = 0: envelope zero, the
tower standing true. The animation clock is anchored
(performance.now minus the first stamp), never Date.now() minus an
offset. requestAnimationFrame is typeof-guarded; without it the piece
holds frame one. A QA hook, ?seed=tNN, pins elapsed time for the
headless renderer and is inert in normal viewing.

## QA log

- Rendered with ~/workspace/tools/render-piece.js:
  qa-desktop.png 1280x900, qa-mobile.png 390x844, thumb.png 720x720.
- Determinism gate: thumb.png rendered twice and byte-compared with
  cmp: identical. The duplicate was deleted.
- Frame one (desktop, mobile, thumb): isometric wireframe tower,
  4 columns on the deep face and 3 on the wide face, 9 levels,
  standing true on its floor slab with a faint shadow; nothing
  clipped. On the phone the floor slab runs off the side edges like
  an unbounded floor plane; the tower itself is fully in frame.
- Forced mid-buckle check: rendered at pinned t = 20 s (hold phase)
  to /tmp, read back, deleted. The tower leans hard toward the upper
  left with the base still true, mid-height cells visibly deformed,
  vertical members bent, and the stressed edges reading brighter
  around the bulge. One tuning pass: the first forced render bowed
  the verticals into deep rubbery scallops (bend factor 0.30); the
  factor was cut to 0.17 and the check re-rendered, after which the
  members read as buckling steel while the cell deformation (carried
  by the node offsets) stays strong.
- Grep audit of index.html: no Date.now, no Math.random, no
  createElement, no AudioContext, no external URLs, no em dashes.
  Canvas 2D only; no offscreen canvas, no ctx.filter, no shadowBlur.

## Deviations

- The prompt asks for per-cell buckling offsets; they are implemented
  as a continuous closed-form field sampled at the shared nodes
  rather than independent per-cell transforms, so neighbouring cells
  cannot tear apart at shared edges. The visible result is the same:
  cells inside the travelling bulge deform, cells outside it do not.
- The pointer lean responds to the horizontal component of the drag
  only, since the isometric view makes a screen-x push the natural
  read of "lean away"; vertical pointer position affects nothing.
