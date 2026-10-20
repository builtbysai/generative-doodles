# No.432 Magical Holidays Rink

## Concept

After Yael Hofri's "Magical Holidays" 1000-piece puzzle
(@olleopuzzles): a winter night scene where four skaters
glide hand-in-hand around a moonlit rink. Cool blues and
greens (night sky, ice, pines) sit against warm accents
(string lights, tree ornaments, coats, stalls). The rink
ellipse fills the lower centre at about two thirds of the
frame width; a brightly lit Christmas tree takes the
right third at full height, toy stalls and a small Santa
stand at the left edge, snow-capped pines frame both
sides, the full moon hangs top-left, and string lights
cross the top on catenary curves. No text anywhere.

## Construction

One canvas, design space 1280x900, full-bleed cover fit.
Flat colour only; no gradients, no shadowBlur, no
offscreen canvas. The moon's glow is three stepped
flat-alpha discs whose radii breathe on 2 whole cycles
per loop (scale 1.0 to 1.06).

- Loop: 40s, seamless. Every periodic quantity runs a
  whole number of cycles per loop: moon breath 2, skater
  stride 2, scarf flutter 3, snow falls 1 or 2 whole
  field heights, twinkles a whole number of stepped
  cycles, the skater line one full revolution.
- Skaters: exactly 4 asserted, coats pink-red, blue,
  gold and green, neighbours a fixed 0.34 rad apart on
  an elliptical path (centre 640,706, radii 330x86)
  inside the rink (440x118). Each figure faces its
  direction of travel and scales from 0.78 on the far
  arc to 1.08 on the near arc. Arms are drawn to fixed
  hand anchors, and the hand-hold line joins each
  skater's forward hand to the next skater's back hand
  from those same anchors; skaters are painted far to
  near. Faces take the moon cream, hair the stall
  brown, leggings the pine green (palette resolutions,
  the only palette colours that read at this scale).
- Trails: behind each skater, 8 arc segments on the
  path ellipse at increasing angular distance, stroked
  in the trail blue with the fixed decay table
  [0.50, 0.42, 0.35, 0.29, 0.23, 0.18, 0.13, 0.09].
- Lights: three catenary strands (quadratic curves,
  sagging control points) carry 37 bulbs; the tree
  carries exactly 26 ornaments. Twinkle is stepped, not
  smooth: each bulb cycles the flat alpha steps
  [1.0, 0.8, 0.6, 0.8] a whole number of times per loop
  (2 to 5), staggered by its own seeded phase. Bulb and
  ornament colours cycle gold, pink, red.
- Snow: a fixed table of exactly 110 flakes asserted.
  Each falls 1 or 2 whole spans of 1020 (design height
  plus margins) per loop and wraps, swaying on 1 to 3
  whole cycles; half the table paints behind the
  skaters, half in front.
- Breeze: DRAG anywhere. While dragging, a breeze
  value eases toward the pointer's smoothed horizontal
  velocity (clamped to plus/minus 1); it streams the
  scarves sideways, lifts them by its magnitude, and
  pushes every flake sideways in proportion. On
  release it decays geometrically per tick and snaps
  to exactly zero below 0.002, so scarf angles and snow
  positions settle back to exactly the loop values.
  The breeze is a value read by the draw, never
  integrated into the loop clock.
- Determinism: frame one is drawn synchronously at
  the constant phase T = 11.0s (skater line on the near
  arc, mid-glide, trails laid, lights mid-twinkle);
  the clock is anchored there and advances in fixed
  1/60 ticks from the rAF timestamp, typeof-guarded.
  Frame one never comes from a wall clock, so the
  thumbnail reproduces byte-identically. A QA probe
  (?seed=breeze in the URL) presets the breeze to 0.9
  so the drag state can be render-checked headlessly;
  it is not shipped behaviour.
- House rules: Visual Viewport sizing with resize
  listeners on visualViewport and window; canvas
  pinned via style width/height in px every frame;
  phone detection via window.screen (min dimension
  under 700px, aspect fallback). Palette closed to the
  prompt's set: sky, moon, ice, trail blue, tree green,
  the three light colours, stall brown, awning red,
  pine green, snow, coat blue and green. Fixed seeds
  only, no Math.random at draw time, no em dashes, no
  absolute URLs.

## QA log

- Rendered with render-piece.js at 1280x900
  (qa-desktop.png), 390x844 (qa-mobile.png) and 720x720
  (thumb.png). Thumb rendered twice from the shipped
  script: byte-identical (md5 63b4aa01...).
- Desktop: the full grammar reads at a glance: moon
  with its stepped halo top-left, three light strands
  overhead, striped-awning stalls with toys and a
  waving Santa at the left, the ornamented tree and
  star at the right, snow-capped pines at both edges,
  and the line of four skaters holding hands on the
  near arc, scarves trailing, trail arcs fading behind
  their blades, snow falling through the whole frame.
- Fixes during QA: the lowest light strand first ran
  through the moon's face and two bulbs sat on the
  disc like spots; it was re-hung lower (y 216 to 186).
  The top strand's deep sag then turned out to cross
  the moon as well; its endpoints were raised and its
  sag cut (66 to 26) so its bulbs clear the disc,
  leaving only the two faint ice-blue craters on the
  moon's face.
- Breeze probe (?seed=breeze): scarves stream sideways
  and lift, snow drifts with the push, everything else
  unchanged, confirming the drag state renders as
  designed and that the calm frame is the breeze-zero
  case of the same draw.
- Mobile: cover fit centre-crops the field as house
  field pieces behave; the rink, two skaters, the
  strands and the falling snow stay in frame.
- Assertions in code: loop is 40s, exactly 4 skaters,
  exactly 8 trail decay steps, exactly 26 tree
  ornaments, exactly 110 snowflakes.
