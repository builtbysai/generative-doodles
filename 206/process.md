# No.392 The Secret Life of the Still Life — process

## Concept

After Maryna Lagereva's (@maryna.lagereva) still life
doctrine: a watercolor still life, three pears and a ribbed
squash on a wooden table, that is quietly alive. The pears
lean toward each other like conspirators on a slow rock, the
squash's stem curls and uncurls, a tiny beetle crosses the
table once a minute, and flat window-light bands drift
across the backdrop. Drag near a pear and it leans toward
the pointer, springing back to exactly its ambient lean on
release: the still life notices you. There are no faces on
the fruit; the life is in the lean.

Her doctrine ships as the piece's soul, lettered small at
the bottom, the designed text under the batch's text
exception and the only text in the piece: "If your pictures
do not tell a story, they are worthless."

Palette, closed: pears #A8B85C with blush #C9A24A, squash
#D98E32, table #C9A875, shadow blue #5B7A99, backdrop
#F3EBDD, ink #3A2E2A. Flat colour only.

## Construction

- One canvas, design space 1280x900, centred fit, page
  ground in the backdrop tone so the scene sits in its own
  room at any aspect. Sizing comes from the Visual
  Viewport API with resize listeners on both
  visualViewport and window; the canvas element is pinned
  by style width/height every frame; phone detection uses
  the window.screen physical size with the tall-aspect
  fallback.
- Pears: exactly 3, asserted, in a left cluster at bases
  (336, 650), (458, 658) and (240, 664). Each is a stacked
  bezier silhouette drawn in local space and rotated about
  its base point. Watercolor wash is two layers of the
  silhouette (0.92 alpha full, then 0.5 alpha drawn in at
  0.88 about the fruit's heart) plus a pooled edge: a
  heavier band of the pear's own colour along the outline
  under a faint ink line. A blush cheek, a dry backdrop-
  tone light spot and six fixed freckles per pear finish
  the fruit; stems are ink, and the tallest pear carries
  one leaf in the pear green.
- Pear rock: plus/minus 2 degrees on a 20s period (3 whole
  cycles per loop), phases staggered at pi, 0 and 3pi/2,
  so at frame one all three lean in toward the cluster,
  mid-conspiracy.
- Squash: one ribbed squash at (908, 668), built like the
  pears (two wash layers, pooled edge, ink line) with five
  soft ink rib curves. Its stem is a short ink stalk whose
  tip interpolates between an open lean and a hooked curl;
  the curl parameter runs on a 30s cycle (2 whole cycles
  per loop), most of the way into a curl at frame one.
- Table: top surface from the back edge at y 585 to the
  front edge at y 706 with faint wavy ink grain, a front
  face shaded by one flat ink wash step, blue contact
  shadows under every fruit, and a soft blue shadow pool
  on the ground below.
- Backdrop: the blue shadow of the arrangement as three
  stepped flat ellipses in the shadow blue at low alpha,
  and window light as flat stepped-alpha bands in the
  blush tone (three steps, 0.05 / 0.07 / 0.10), slanted and
  clipped to the backdrop above the table's back edge.
  The drift travels exactly one band spacing per 30s
  cycle (2 whole cycles per loop), so the pattern wraps
  seamlessly; no gradients anywhere.
- Beetle: exactly one crossing per 60s loop, per the
  batch adaptation flag. It enters at loop time 8s and
  walks a straight line along the front of the tabletop
  (y 690) for 20s, then is gone until the next loop. Body,
  head, shell groove and antennae in ink over a small blue
  shadow; its six legs alternate through a 3-frame cycle
  stepped from the piece clock (frame = floor(T x 6) mod
  3). At frame one it is a fifth of the way across, in
  front of the pear cluster.
- Drag: while the pointer is down (client coords
  converted through the stored centred-fit transform),
  any pear whose heart is within 230 design px leans
  toward the pointer; the target extra lean follows the
  pointer's sideways offset from the pear's base,
  clamped at 9 degrees. Springs integrate in step() on
  fixed ticks (stiffness 120, damping 14); on release the
  target returns to zero and the spring snaps the extra
  lean to exactly zero below a hair threshold, leaving
  exactly the ambient rock.
- Doctrine line: italic 30px Georgia serif, ink at 0.9
  alpha, centred at y 850.
- Loop: 60 seconds, ambient and seamless. It holds 3
  whole pear-rock cycles of 20s, 2 whole stem curls of
  30s, 2 whole light drifts of 30s, and one beetle
  crossing.
- Determinism: the first frame is drawn synchronously at
  the constant phase T = 12.5s (pears mid-conspiracy,
  stem mid-curl, beetle mid-table). The animation clock
  advances from that anchor in fixed 1/60 ticks
  accumulated from rAF timestamps; rAF is typeof-guarded.
  Frame one never reads a wall clock. All scatter comes
  from a fixed-seed LCG baked at load.

## QA log

- Rendered with the house node-canvas renderer at
  1280x900 (qa-desktop.png), 390x844 (qa-mobile.png) and
  720x720 (thumb.png). The renderer confirms all five
  pointer listeners register alongside the resize
  listeners.
- Desktop: three green pears with blush cheeks, freckles
  and ink stems leaning in together on the wooden table,
  ribbed orange squash right with its hooked stem, the
  beetle crossing in front of the cluster, gentle blush
  light bands and a soft blue shadow pool on the cream
  backdrop, doctrine line legible in italic serif.
- First pass fixes: the light bands ran the full canvas
  height and striped the table, the ground and the
  caption; they are now clipped to the backdrop above
  the table's back edge. The backdrop shadow ellipses
  read as hard nested rings, so their alphas were halved
  and radii pulled in until they read as one soft pool.
  The table's ground shadow spanned the full width as a
  stray stripe and was shrunk and softened. The squash
  stem read as a tall dark spike, so the stalk was
  shortened and its tip path reworked to travel from an
  open lean into a clear downward hook. The fruit's first
  wash layer went from 0.85 to 0.92 alpha so the table
  grain no longer slices visibly through the fruit while
  the wash still feels translucent. All renders redone
  after the fixes.
- Thumb: pears, squash, beetle and doctrine line all read
  at gallery size on the continuous cream ground.
- Mobile: centred fit keeps the whole still life in
  frame, caption legible, ground continuous above and
  below.
- Thumb rendered twice from the shipped script:
  byte-identical.
- Grep-verified in the piece script: no gradients, no
  shadowBlur use, no offscreen canvas, no Math.random, no
  Date.now, no em dashes, no absolute URLs. The palette
  holds only the seven specced hexes, each used flat or
  at flat alpha steps.
