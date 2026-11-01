# No.946 - A Thousand Dimensions, Flattened

Study #116 refikanadol, PP107 "tSNE Sculpture".

## Concept

A synthetic 12-dimensional dataset of 2,500 points, flattened into a glowing
sculpture that turns slowly in a black void. Four clusters (violet #8A4BFF,
cyan #38E1FF, teal #2DE1C2, magenta #FF3EA5) form one connected coral-like
mass; every point carries a white core, and nearer points render larger and
brighter through a mild perspective projection, so the turning reads as
depth rather than as a flat spin. Each cluster is wrapped in a smoothed
contour ribbon. The sculpture breathes (per-cluster depth oscillation,
clusters out of phase), storms roll through on a seeded schedule (one
cluster densifies toward its centroid for ~8 s, with #F5F5F5 sparkles at
the centroid), a tap makes the nearest cluster answer with three heartbeat
pulses, a drag spins and tilts it with momentum, and a double-tap grows a
whole new dataset whose points travel to their new homes over ~25 s.
Sound, only after a first gesture, is a low rotating drone plus a filtered
voice per cluster that swells as that cluster faces the camera, and a soft
thump for each heartbeat.

## Construction

- Dataset: 4 clusters x 625 points. Each cluster lives in 12-D as three
  gaussian sub-blobs around a seeded cluster center; each point stores its
  12-D vector's projection, its cluster id, and per-point size/phase
  identity that stays stable across datasets.
- Embedding (deterministic, mulberry32 seeds only): a fixed seeded random
  projection matrix 12 -> 3, Gram-Schmidt orthogonalized so cluster shapes
  survive the flattening, followed by 30 iterations of a simple force
  layout in 3-D (weak springs toward the moving sub-centroids, a whisper
  of pull to the origin, and local repulsion through a spatial hash,
  capped neighbor checks). No real tSNE anywhere; the projection plus
  layout approximation is the mechanism, per the brief. The cloud is then
  recentered and scaled by its 99.5th-percentile 3-D radius with one
  shared scale on all axes, so its proportions stay true.
- Ribbons: per cluster, a convex hull (monotone chain) over the (ex, ey)
  embedding, excluding points beyond 1.6x the cluster's median radius
  (outliers still render as points), with each hull edge subdivided once
  and the path drawn as a smoothed quadratic loop, projected through the
  same transform as the points every frame.
- Runtime motion is closed-form over (t, recorded events): rotation
  theta(t) = 35 degrees + t * 2pi/120 plus drag contributions (offsets
  that persist, momentum terms v0/lambda * (1 - exp(-lambda * dt)));
  tilt springs back as a damped cosine over recorded release events;
  breathing is a per-cluster sine on depth plus a gentle squeeze; storms
  follow a fixed seeded schedule (first at t = 14 s, then every ~35 s);
  tap pulses are three exponentially decaying beats at 0.9 s spacing;
  re-embed travel is a smoothstep lerp per point with a seeded delay of
  0-6 s over 15 s.
- Sizing follows the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas style width/height are pinned in px
  in draw() every frame. Phone detection uses window.screen's smaller
  dimension (< 700 px) with the h > w * 1.15 aspect fallback; on phones
  the outer glow pass is skipped and the sculpture scales to the smaller
  dimension. Page ground is the field color #08070B. No gradients, no
  shadowBlur, no ctx.filter, no offscreen canvas, no Date.now, no
  Math.random. requestAnimationFrame and AudioContext are typeof-guarded;
  audio is created lazily inside the first pointerdown.

## QA log

- Renders (node-canvas, the piece's own script): qa-desktop.png 1280x900,
  thumb.png 720x720, qa-mobile.png 390x844. Full load (dataset build +
  layout + frame one) renders in ~0.6 s per size, far under the limit.
- Determinism: thumb.png rendered twice and byte-compared with cmp -
  identical. Frame one is the synchronous draw(0) at the fixed 35-degree
  pre-roll; nothing in the drawn state reads a clock.
- What the final renders show: black void; one connected sculpture of
  four glowing territories (cyan upper right, teal lower right, magenta
  bottom, violet left) with white cores, clear depth grading (near points
  larger and brighter), and a contour ribbon wrapping each territory;
  generous void margins on desktop and thumb; on mobile the sculpture
  scales to the frame width, centered and whole, nothing clipped.
- Tuning rounds before it read right: (1) first pass had clusters as
  small separated islands after independently stretching ez to +-0.9,
  which also smeared clusters sideways at the 35-degree start angle;
  (2) a 2-D force layout then inflated (ex, ey) while ez stayed thin, so
  the sculpture collapsed into parallel coins, all shearing the same way;
  (3) a strong-spring 3-D layout overcorrected into tight pom-poms inside
  huge empty hull triangles. The shipped recipe (orthogonalized
  projection, weak 3-D layout, percentile normalization, outlier-trimmed
  subdivided hulls) is what the renders above show.

## Deviations

- Four clusters, not five: the palette names exactly four cluster colors,
  and the brief's own note directs four. Recorded here as instructed.
- Layout runs 30 iterations (brief suggested ~40 for its 2-D sketch) and
  in 3-D rather than 2-D; in 3-D the weaker pass preserves the projected
  shape instead of manufacturing flatness, and 30 iterations reach the
  same equilibrium.
- Ribbons fade out over the first 2 s after a double-tap re-embed and
  fade back in as travel completes (seconds 14-20): hulls of two
  different datasets have different vertex counts and cannot be lerped
  point-wise, so the wrap dissolves while the points themselves travel,
  which keeps the no-hard-cut spirit of the study.
- Frame one carries no storm (the first storm fires at t = 14 s); the
  spark color #F5F5F5 is exercised from the first storm onward.
- A single tap's pulse is registered after a 0.35 s window so a
  double-tap can pre-empt it and re-embed instead; the heartbeat itself
  is unchanged.
