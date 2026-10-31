# No.773 "Blue Diamond" — EXPANSION #94 mary-corse, prompt block 6

## Concept

Corse's diamond paintings take her band format and turn it forty-five
degrees: a saturated cobalt field, hung as a diamond, with one thin white
inner band running straight down the middle of the room's vertical, not the
canvas's. The blue is microsphere paint, so it behaves like emitted light
rather than pigment: as the viewer's body crosses the room, the field's
saturation and grain wake at one position and the white band ignites at
another, later one, so a sweep of light appears to travel through the blue
like a wave. This piece rebuilds exactly that: one viewer parameter v,
two offset activation lobes, and a painting that is never the same twice
in a row. Idle, v sways through its range on a 22 s cycle. Dragging
horizontally is the viewer walking; on release the view eases back into
the sway. Nothing reloads, nothing is stepped.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets.
- Canvas size comes from the Visual Viewport API, with resize listeners
  on both `visualViewport` and `window`. `draw()` pins
  `canvas.style.width/height` in px every frame.
- Phone detection via `window.screen` physical size (min dimension
  < 700 px), aspect `h > w * 1.15` as fallback only. The diamond keeps
  its size ratio on phones (diagonal capped at 88% of frame width); the
  page ground is the wall tone.
- Palette is strict: blue field #1B4FE0 and #2244CC, deeper blue shadow
  #12308F, white band #F5F4F0 flaring to #FFFFFF, wall #EFEFED.
- Geometry: diamond (square rotated 45 degrees) centered at 49% of frame
  height, full height 65% of frame height. Every painted layer is
  clipped to the diamond path.
- The two offset lobe functions (closed form, both gaussian):
  - Field activation `f(v) = exp(-((v - 0.30)^2) / (2 * 0.16^2))`, peak
    1.0 at v = 0.30.
  - Band presence `b(v) = 0.10 + 0.90 * exp(-((v - 0.68)^2) / (2 * 0.13^2))`,
    peak 1.0 at v = 0.68 over a 0.10 floor.
  At the field's peak the band sits at about 0.11 (present but quiet);
  at the band's peak the field has fallen to about 0.06 (asleep). The
  offset is the piece: first the blue deepens and its grain wakes, then
  the band ignites.
- Idle sway: `v = 0.30 + 0.38 * sin(2*pi*t/22)`, clamped to 0..1, so the
  sway starts exactly at the field peak and reaches exactly the band
  peak half a cycle later. Frame one is the synchronous `draw(0)`:
  v = 0.30, f = 1, grain awake, band quiet.
- Field body: base #2244CC, then 14 concentric diamond layers in flat
  alpha stepping from #12308F at the rim toward #1B4FE0 at the center,
  centered a tenth of a half-diagonal above middle so the light sits
  high; layer strength scales with f. Five flat #12308F slices deepen
  the lower third. When f drops, a #2244CC wash at alpha `(1 - f) * 0.45`
  flattens the layers back to one calm cobalt, so the asleep state is a
  single quiet blue rather than a dimmed glow (this is what keeps it a
  painting and not a gradient mesh or a screen).
- Brushwork: 640 diagonal strokes precomputed from a mulberry32 stream
  (seed 773202), angle about -0.62 rad with seeded jitter, in the deep
  blue and the light blue. Their alpha is gated by a reveal factor
  `clamp((f - 0.30) / 0.70)` times a spatial factor favoring the lit
  upper-center, so the hand shows only where the light is.
- Microsphere grain: about 2,600 beads kept from a 5,200-point
  mulberry32 stream (seed 773101), each with a seeded activation
  threshold; a bead's visibility is `clamp((f - thr * 0.85) / 0.15)`,
  so the grain condenses density-class by density-class as f climbs
  and is fully awake at the peak. Beads are warm white #F5F4F0 or light
  blue #1B4FE0, drawn as small rects.
- White inner band: vertical in the frame (never rotated), width 4.6%
  of the diamond diagonal, drawn in 36 vertical slices under a
  `pow(sin(pi*u), 0.6)` alpha profile so its edges feather into the
  blue. Its tone mixes #F5F4F0 toward #FFFFFF with b; above b = 0.35 a
  wider 20-slice halo gathers behind it.
- Hover shadow: three layered diamond shapes in #12308F at 4.5-6.5%
  alpha, offset down-left and grown slightly, so the shadow peeks only
  under the lower-left edges. A 1 px #12308F hairline at 22% alpha
  holds the painting's edge against the wall.
- Time model: v(t) is a closed-form function of recorded drag samples.
  On release, the sample (t, v) is recorded and the offset from the
  sway decays as `exp(-dt/1.6)`, anchored to the sway value at release
  time so the blend never jumps. No `Date.now()` anywhere; rAF is
  `typeof`-guarded and the animation is anchored to elapsed time since
  load.

## QA log

- Rendered with `~/workspace/tools/render-piece.js` (node-canvas):
  qa-desktop.png at 1280x900, qa-mobile.png at 390x844, thumb.png at
  720x720.
- Determinism gate: thumb.png rendered twice and byte-compared with
  `cmp` — identical. Duplicate render deleted.
- Grep audit clean: no `Date.now`, no `Math.random`, no
  `createElement`, no `AudioContext`, no `ctx.filter`, no
  `shadowBlur`, no canvas gradients, no external URLs, no em dashes.
- Read-back, desktop: saturated cobalt diamond centered on the white
  wall at about 65% of frame height; fine white and blue bead grain
  legible across the field; faint diagonal brushwork in the lit areas;
  the white band standing straight down the middle, soft-edged and
  quiet at frame one; layered shadow visible along the lower-left
  edges; no clipping.
- Read-back, mobile: same composition in the tall frame, diamond held
  inside the width cap with margin at both side points, band and grain
  legible, nothing clipped.
- Read-back, thumb: matches the desktop read at square size.

## Deviations

- One palette-driven construction choice: the prompt's bevel/hover
  shadow is normally a gray, but the strict palette contains no gray,
  so the shadow is built from the deeper blue #12308F at low alpha.
  On the white wall it reads as the painting's own blue-gray shadow
  and keeps every painted pixel inside the five specced colors.
- No other deviations. The field is layered flat shapes, not a
  gradient; the band is frame-vertical, not canvas-vertical; the two
  lobes peak at different viewer positions as specified.
