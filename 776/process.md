# No.776 Infinity Dawn

EXPANSION #95 doug-wheeler, prompt block PP1 "Infinity Dawn". Wheeler's
infinity room (SA MI 75 DZ NY 12, 2012) as a pure field: no edges, no
corners, no frame line, only the room's color temperature breathing
through a slow dawn, noon, dusk cycle, with a barely suggested floor
curve at the bottom third. Watch-only. The room is to inhabit, not to
operate.

## Concept

The whole frame is near-white lit air. Nothing is drawn in it: no sun
disc, no geometry, no vignette. Two things keep it from reading as a
blank digital flat. First, the temperature never rests: the field
color drifts continuously through the three palette keyframes, so any
two moments differ slightly. Second, an ultra-fine seeded grain at
about 1 percent opacity gives the field the texture of lit air and
dithers away any band steps. The floor curve is implied only by a
roughly 3 percent luminance dip low in the frame, warm-tinted, the
way the coved floor of the real room catches the light differently
from the walls.

Palette, strict and complete: dawn #FDF6EF, noon #FFFFFF, dusk
#F6E9D8, floor-curve hint #ECE5D8. No other colors appear anywhere.

## Construction

Single self-contained index.html, canvas 2D, no external assets, no
visible text except the title.

- Temperature is a closed-form function of time. The loop is 80 s:
  four legs of 20 s each, dawn to noon to dusk to noon to dawn,
  cosine-eased between keyframes. Frame one is the synchronous draw
  at t = 0, which lands exactly on the dawn keyframe.
- The field is drawn as fine horizontal flat bands (2 px). Each
  band's color is the current temperature mix; below 62 percent of
  the height a cosine-profiled dip blends the band color toward the
  floor hint, peaking at a 0.25 blend, which with the warm ellipse
  below gives about a 3 percent dip at the floor line. No canvas
  gradients are used anywhere; the many thin flat bands read as
  continuous.
- The floor-curve warmth is one large soft shape below the frame's
  bottom edge, built from seven nested flat ellipses in the floor
  hint color at very low alpha (base alpha 0.010 to 0.016), so it has
  no visible contour. Its alpha rides the cycle, warming as the
  temperature leaves noon.
- Grain: 5,200 specks precomputed from a mulberry32 seeded stream
  (seed 776001) with fixed positions, phases, speeds, and polarity.
  Each frame a speck's alpha is a closed-form sine shimmer between
  about 0.008 and 0.014, in the floor hint color (dark specks) or
  white (light specks). Positions never move; only the shimmer does,
  so the dither is stable and the banding stays broken up.
- Canvas size comes from the Visual Viewport API, with resize
  listeners on both visualViewport and window; draw() pins
  canvas.style.width and height in px every frame. Phone detection
  uses window.screen physical size (min dimension under 700 px) with
  the aspect fallback; the field is full-bleed at every size and the
  page ground is the dawn tone.
- The animation loop is guarded by a typeof check on
  requestAnimationFrame; the QA renderer has none, so only the
  synchronous first frame draws there. No Date.now anywhere, no
  audio, no interaction handlers at all.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png), and 720x720
  (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. The duplicate render was deleted.
- Pixel check on thumb.png: top, mid-left, mid-right, and top-corner
  samples are exactly (253, 246, 239), the dawn keyframe. Lower
  sample (247, 240, 233); bottom center (243, 236, 227); bottom
  corner (247, 240, 231). The floor dip is about 3 percent at the
  floor line and a few units elsewhere in the dip zone, as specced.
- Read-back: all three renders show an edge-less warm-white field
  with a faint warm deepening toward the bottom and nothing else.
  No edges, no vignette, no banding visible, nothing clipped on
  mobile.
- Tuning passes: the first build's dip measured about 5.5 percent at
  the bottom (14 units), too strong; the band dip blend and the warm
  ellipse alpha were reduced in two passes to reach the specced
  roughly 3 percent.

## Deviations

- Cycle timing: the prompt is internally inconsistent (a 60 s loop
  whose legs sum to 80 s: 20 s dawn, 20 s noon, 20 s dusk, 20 s
  back). Implemented as an 80 s loop of four 20 s legs, dawn to noon
  to dusk to noon to dawn. Routing the return through noon instead of
  a direct dusk-to-dawn leg keeps all four legs at 20 s and means
  the temperature is always drifting, never resting, which the
  prompt also requires. Reason: resolves the contradiction without
  dropping any keyframe or leg length.
- The prompt's pre-rendered noise ImageData and gradient falloff are
  realized as seeded speck data drawn per frame and layered flat
  bands/ellipses, because the QA renderer has no offscreen or
  per-pixel pipeline. Reason: renderer limits; the visible read
  (dithered, continuous field) is unchanged.
