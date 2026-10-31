# No.779 "Aperture" — EXPANSION #95 doug-wheeler, prompt block PP4

## Concept

Wheeler's light wall, as at the Stedelijk in 1969: a doorway of light
so bright it reads as a solid wall, until you pass through it and find
the fog-white infinity room on the other side, where the light is
everywhere and sourceless. The Bilbao boy mistook the wall of light
for a wall; this piece is built on that mistake. It is a two-phase
scene with exactly one gesture: tap to cross, tap to cross back. The
crossing is a serene three-second white-out, never a fade to black,
never a jump. Between crossings, the corridor's glow breathes faintly
and the fog room holds its slow dawn-to-dusk temperature drift. There
is no door frame and no hardware anywhere: the opening is pure light.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets.
- Canvas size comes from the Visual Viewport API, with resize
  listeners on both `visualViewport` and `window`. `draw()` pins
  `canvas.style.width/height` in px every frame.
- Phone detection via `window.screen` physical size (min dimension
  < 700 px), aspect `h > w * 1.15` as fallback only. The corridor
  perspective and doorway stay centered on phones; the page ground
  is the corridor tone #1C2A44.
- Palette is strict: corridor #1C2A44, corridor floor #141E33,
  threshold #FFFFFF, aura #DCE8FF, fog room #F6F3EC with its dawn
  drift tones #FDF6EF and #F6E9D8.
- Corridor: full-frame corridor fill; ceiling, side walls, and floor
  as converging quads in flat mixes of the corridor and floor tones,
  so perspective reads by tone alone. Two faint receding
  wall-segment rectangles (interpolated between frame and doorway)
  give the corridor measured depth. The doorway stands at the
  vanishing point (center, 47% of frame height), rest height 30% of
  frame height, width 0.62 of its height. Its glow is layered shapes,
  never a gradient: a wide soft ellipse field (two feathered steps),
  four expanded aura rectangles at 7-20% alpha, a spill quad across
  the floor, then the pure-white threshold with two inset aura steps
  giving the light a shallow depth. The aura breathes on a 6.5 s
  sine at plus/minus 7%.
- The crossing state machine: taps are recorded as times since load.
  A scalar u (0 = corridor, 1 = fog room) is a closed-form function
  of the tap list and t: replaying the taps in order, each tap opens
  a 3 s segment from the u current at that tap toward the opposite
  end, eased with the smootherstep polynomial. A tap mid-crossing
  reverses from wherever u has reached. Rendering is a pure function
  of u and t:
  - Doorway scale = 1 + 3.7 * smootherstep(u) about the vanishing
    point (rest 30% of frame height to about 140% at full push-in);
    the wall quads follow because their inner corners are the
    doorway corners.
  - Bloom = smoothstep of u between 0.45 and 0.85: three expanding
    white ellipses plus a white field at bloom-squared alpha, the
    white-out crest of the crossing.
  - Fog room alpha = smoothstep of u between 0.72 and 1.0, so the
    room fades up out of the bloom and dissolves back into it on
    the return crossing.
- Fog room: base fill is the temperature color, a 96 s cosine cycle
  through dawn #FDF6EF, noon #F6F3EC, dusk #F6E9D8, and back. Over it,
  26 flat horizontal bands (dawn-weighted through the middle,
  dusk-weighted toward the edges) and four layered dawn ellipses
  build the sourceless luminosity; 2,400 seeded grain flecks
  (mulberry32, seed 779101) at about 5% alpha keep the field reading
  as lit air. The drift runs in both scenes' time, so the room you
  return to has kept breathing while you were in the corridor.
- Time model: no `Date.now()` anywhere; rAF is `typeof`-guarded and
  anchored to elapsed time since load. Frame one is the synchronous
  `draw(0)`: corridor at rest, no taps recorded, u = 0.

## QA log

- Rendered with `~/workspace/tools/render-piece.js` (node-canvas):
  qa-desktop.png at 1280x900, qa-mobile.png at 390x844, thumb.png at
  720x720.
- Determinism gate: thumb.png rendered twice and byte-compared with
  `cmp` — identical, re-verified after the aura fix round. Duplicate
  render deleted.
- Grep audit clean: no `Date.now`, no `Math.random`, no
  `createElement`, no `AudioContext`, no `ctx.filter`, no
  `shadowBlur`, no canvas gradients, no external URLs, no em dashes.
- Read-back, desktop (frame one): dark blue corridor in clean
  perspective, floor darker below, receding segment lines faint, and
  at the end a solid white doorway wrapped in a feathered blue-white
  aura with its light spilling down the floor. No frame, no hardware.
- Read-back, mobile: same composition in the tall frame, doorway
  centered and fully inside, aura and spill intact, nothing clipped.
- Read-back, fog state (throwaway copy with a tap pre-recorded at
  t = -10 s, deleted after use): a warm-white infinity field,
  lightest through the middle, settling warmer toward top and
  bottom, grain present at close inspection. No corridor remnant.
- Read-back, mid-crossing (throwaway copy, tap at t = -1.8 s,
  u about 0.65, deleted after use): the doorway scaled to fill the
  center, white core dominant, bloom washing the walls toward
  white-blue at the edges. Serene, no black anywhere in the frame.
- Fix round during QA: the first aura ellipse (single step at 10%
  alpha) read as a distinct disc with a visible circular edge.
  Rebuilt as two feathered steps (a larger ellipse at 4%, the
  original at 6%) so the glow now falls off into the corridor air.
  All renders redone and the byte-compare re-run green.

## Deviations

- None from the prompt's substance. Construction notes only: the
  prompt's blurred glows and radial bloom are built from layered
  flat shapes and ellipses per the house no-gradient rule, with the
  same soft falloff; the corridor's perspective is drawn with flat
  tonal quads rather than textured walls, keeping the strict
  six-color palette.
