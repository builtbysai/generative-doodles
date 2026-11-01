# №1331 "The Broken Five" (rashid-johnson RJ4, PP498)

## Prompt essence
A gray-grout field holding shattered mirrored and ceramic tiles — irregular
shards in black, white, cobalt, and terracotta. Within the rupture, five
face-forms emerge: abyss eyes and twisted mouths built from shard clusters,
gestural oil-stick marks bridging the gaps. Grounded in Johnson's The Broken
Five (2019, Central Park Five, acquired by the Met): multicolored shards of
mirrored and ceramic tile, wax, set in gray grout and painted over with an
oil stick and spray enamel.

## Build
- Field: a 12 x 9 jittered grid over the full viewport. Grid points jitter
  up to 30% of cell size (borders clamped to the field edges); each cell is
  one quad, or two triangles along a seeded diagonal (35% of cells). Every
  shard is shrunk 10% toward its own centroid, leaving thick visible grout
  lines: the grout is a material, not background.
- Colors: grout #8E8B82; shard black #171512, white #E4E0D6, cobalt #1E3A6E,
  terracotta #A34A2E, mirror #C9C4B8; oil-stick line #0F0E0C. Shard edges are
  sharp polygons, never rounded; nothing reads as a smooth mosaic.
- Exactly five face-clusters in the central band (never the corners), each
  anchored to a shard of a different base color (black, white, cobalt,
  terracotta, mirror, in order). Each face has its own eye and mouth
  construction, so no two faces are identical:
  - Face 1 (black anchor): two hollow ovals with tiny mirror glints; twisted
    bezier mouth.
  - Face 2 (white anchor): one large socket plus one slash eye; zigzag mouth.
  - Face 3 (cobalt anchor): asymmetric large socket plus small dot eye;
    open screaming oval mouth.
  - Face 4 (terracotta anchor): two slanted slit eyes; double-slash mouth.
  - Face 5 (mirror anchor): one oval plus one crescent eye; wavy mouth.
  Each face also carries three seeded gestural oil-stick strokes bridging
  outward from the cluster.
- No literal portraits, no blood, no readable text; the only visible text
  is the `<title>`.

## Motion and interaction (all closed form over piece time and recorded events)
- Breathing wall: every shard rotates a few degrees in place on a 24 s sine
  (amplitude 0.02-0.055 rad, per-shard seeded phase). Mirror shards glint on
  a 14 s traveling wave (flat-alpha white diamonds, no gradients).
- Drag: pushes shards aside along the drag vector with a Gaussian falloff
  (radius 2.5 cells) and an exp(-age/2.5) settle; the face eye/mouth marks
  are drawn at their anchor shard's displaced centroid, so faces re-form
  from the new arrangement after a drag.
- Touch a face: its cluster shards flash with a mirror glint sweep (1.5 s),
  and one seeded shard of the cluster drops away to reveal grout, then
  regrows over 30 s (scale 1 to 0 over 1 s, back to 1 over the next 30 s).
- Never click-to-reload: a tap only touches a face; a drag only smears.

## Determinism
- Frame one is drawn synchronously at exactly t = 0 via a boot flag; the
  clock starts only with the rAF loop (plain function declaration behind a
  typeof guard). All layout, splits, colors, phases, and reseeds come from
  mulberry32 streams (seed 1331000); no Math.random anywhere. Shard
  displacement, breathing, glints, flash, and regrowth are closed-form
  functions of piece time and recorded drag/touch events, never
  frame-integrated state.
- QA-renderer constraints honored: no requestAnimationFrame (guarded),
  no AudioContext, no document.createElement, no WebGL, no offscreen
  canvas, no ctx.filter, no shadowBlur, no gradients (glints and glows are
  layered flat alpha shapes). Dots drawn as paired arcs with a moveTo
  before every batched arc.

## QA
- Renders inspected at 1280x900 desktop, 390x844 mobile, 720x720 thumb.
  Desktop: shattered mosaic fills the field, thick grout throughout, all
  five face-clusters legible in the central band with distinct eyes and
  mouths, mirror glints visible. Mobile: same read full-bleed, faces
  stacked down the central band. Thumb: same read at square aspect.
- Thumb rendered three times at 720x720, `cmp` byte-identical.
- Fix rounds (pre-QA, before the renders above): removed a stray `moveTo`
  before an `ellipse` in the crescent eye and in the oval mouth, which
  would have stroked a connecting chord across the shape. No fixes needed
  after inspection.
- index.html md5: 67fe5dd16a17d3317028ae5dd5a58b58
