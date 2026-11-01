# No.940 — Giochi: The Studio Takes Itself Apart

Study #115 giorgialupi, PP101 "Lines That Get Tired".

## Concept

Giorgia Lupi's Giochi (2026): the studio taken apart into a discombobulated map.
Flat matte color regions are the rooms. Small studio objects (plant, chair,
lamp, book stack, mug, cat) wander the map and chase each other in permanent
seeded pairings, so the game never ends: the pursued is always moving too.
Each object trails a path-line behind it. A line starts in the color of the
region the sprite started in, and at seeded "tired" points it gives up that
color mid-stroke and puts on a different one; a small knot in the new color
marks the exact switch point. Two or three regions carry a flat light wash
(white at 0.2 alpha). No text anywhere except the title: the map is the piece.

## Construction

Single self-contained index.html, canvas 2D, no external assets.

- Regions: Voronoi cells from seeded sites clipped to the frame by half-plane
  clipping (Sutherland-Hodgman against each bisector), filled flat with the
  studio washes (sage #9DB89A, clay #D08C60, dusty blue #7FA3B8, ochre
  #D9A441, plum #8C5A6B on wall-paper #F2EDE2). Every cell outline is
  hand-wobbled: vertices displaced and each edge split with a jittered
  midpoint, all from the generation seed. Cells are wobbled independently,
  so boundaries show hairline wallpaper seams, a cut-paper look.
- Simulation: fixed timestep, 120 Hz (DT = 1/120). Steering per sprite:
  seek its chase target at its own max speed; within 0.085 world units it
  slows and orbits the quarry briefly instead of catching it. Wander is a
  deterministic function of the step count (two summed sines per sprite,
  seeded phases). A separation term keeps sprites from overlapping. Soft
  bounds steer sprites back inside the frame, with a hard clamp as backstop.
- Trails: each sprite records a position sample every 15 steps (0.125 s),
  capped at 400 samples (50 s of path). Each sample stores the trail color
  active at that moment; the trail is redrawn fresh every frame from these
  buffers as per-segment strokes, alpha rising from 0.16 at the tail to 0.76
  at the head (the followed sprite's trail gets +0.22). Tired points: each
  sprite schedules its next switch 7-14 s of travel ahead on its private
  mulberry32 stream; at the switch it picks a different palette color and
  records a knot {x, y, color, step}. Knots fade over the same 6000-step
  span as the trail.
- Frame one: the world is built from the seed, the sim is pre-rolled exactly
  2400 steps (20 s) synchronously at load, and frame one is the draw of that
  state. No wall clock feeds any drawn state; the rAF loop (typeof-guarded)
  advances the same fixed-step sim by elapsed time with an accumulator,
  capped at 30 steps per frame.
- Interaction: tap a sprite to follow it for 1200 steps (10 s) with a soft
  paper-white ring; drag is the wind, recorded as impulse events
  {step, x, y, dx, dy} that the sim consumes in step order with distance
  falloff; double-tap reseeds the whole studio (generation seed =
  base + generation x 1013) and pre-rolls again.
- Audio: lazy AudioContext created on the first pointer gesture, all uses
  typeof-guarded and wrapped in try/catch. Soft triangle plucks cycle
  through the sprites every 48 steps (pitch by sprite size), a short tick
  sounds at each color switch, and a two-note shimmer sounds when a sprite's
  nearest region changes to a light-wash region. The piece renders complete
  in silence.
- Viewport: canvas sized from the Visual Viewport API with resize listeners
  on both visualViewport and window; canvas.style.width/height are pinned
  in px on every draw. Phone detection uses window.screen (min dimension
  under 700 px), with the h > w x 1.15 aspect rule only as a fallback when
  screen metrics are unavailable. Phones get 8 sprites, other screens 12.
  The world is generated in normalized units (height 1, width = aspect) and
  letterbox-fitted, so the page ground at any edge is the wall-paper color.

## QA log

Renderer: node ~/workspace/tools/render-piece.js (node-canvas, no rAF, no
AudioContext). Renders produced: qa-desktop.png 1280x900, qa-mobile.png
390x844, thumb.png 720x720. All render cleanly and silently.

- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. The duplicate was deleted. Re-verified after the fix round
  below: identical again.
- Fix round: the first build let pursuit chains collapse into a single
  orbiting knot of sprites in one region, and freely scattered Voronoi
  sites produced giant wedge cells. Two changes, both recorded as
  deviations below: jittered-grid sites, and a chase/roam behaviour cycle
  with separation steering. Renders after the fix show sprites and trails
  spread across all regions.
- Desktop read-back: six flat regions (ochre, plum, dusty blue, sage, clay,
  ochre) with wobbled edges; twelve sprites (chairs, lamps, plants, book
  stacks, mugs, cats in the darker tones) mid-chase across the map; trails
  in several palette colors webbing between regions, with knots visible as
  colored dots where lines changed color mid-stroke.
- Mobile read-back: 2x3 region grid fitted to the tall frame, eight
  sprites, trails and knots visible, nothing clipped.
- Thumb read-back: sprites distributed through the plum, clay and blue
  regions, long multi-color trails, knots visible.
- Hygiene: no Date.now, no gradients, no shadowBlur, no ctx.filter, no
  offscreen canvas, no external URLs, no em dashes in the file.

## Deviations

- Region sites sit on a jittered grid (3x2 on landscape/square screens,
  2x3 on portrait phones; six regions) instead of freely scattered points.
  Reason: free sites produced giant triangular wedges that read as abstract
  shards, not rooms; the brief calls for 5-7 regions and a map of rooms.
  Jitter is seeded, so layouts still vary per generation.
- Each sprite alternates on a seeded 9 s cycle between chasing its target
  (630 steps) and roaming to a seeded point of its own (450 steps, new
  point picked on arrival from its private stream). Reason: pure pursuit
  with permanent pairings collapses the whole studio into one orbiting
  clump, which kills the game the brief asks for. Pairings are unchanged
  and permanent; the chase always resumes.
- Sprite starting trail color is the color of its starting region, taken
  by nearest Voronoi site (pre-wobble cells), not by point-in-polygon on
  the wobbled outlines. Reason: the wobbled outlines of neighbouring cells
  overlap slightly at seams, so polygon membership is ambiguous there;
  nearest-site is exact and deterministic.
