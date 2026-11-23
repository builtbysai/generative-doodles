# No.1010 "A Face, In Dashes"

Study #124 futa-kera, PP171 "Halftone Face" (Squarepusher Japan Tour 2022).

## Concept

A giant face assembles from thousands of short white dashes on a black field,
holds for a breath, dissolves back into gray scatter, and reassembles as a
different face. There is no photograph and no image data anywhere in the
piece: each portrait is an analytic luminance field, and every dash derives
from it. From far away the marks read as a face; from close they are only
marks. Thin green data-scroll columns run at the thirds behind the face, per
the Squarepusher signature. The cycle is assemble, hold, dissolve, next
portrait. Dragging scatters the dashes under the finger and they reform
behind it; a tap freezes the current face for 10 s; a double-tap forces a
dissolve into a new portrait.

## Construction

- Portrait field (analytic, no image data): `lum(u, v)` in face space
  (u right, v up) sums smooth bump functions: an elliptical head mask with a
  smooth rim falloff; a darker hair cap under a wavy seeded hairline; a broad
  lit-cheek gaussian offset against the turn; a forehead sheen; two eye
  wells (deep dark gaussians) with brow arcs above them; a bright nose ridge
  (narrow vertical gaussian) with a base shadow and nostril dots; a dark
  mouth band with a lower-lip highlight; chin and jaw shading. All feature
  terms are multiplied or masked so the background stays at luminance 0.
- Variants: yaw is drawn per portrait from {-0.95, -0.5, 0, 0.5, 0.95}
  (profile, three-quarter, frontal), never repeating the previous portrait's
  yaw. Yaw compresses and shifts the features horizontally; the far eye
  fades out as yaw approaches profile, the nose ridge migrates toward the
  facing side, and at profile strength the head mask grows a nose bump on
  the facing side so the silhouette itself turns. Head radii, eye gap, eye
  height, mouth height, and hairline are jittered per portrait from the same
  seeded stream (mulberry32, BASE_SEED 1010177).
- Dash field: a 90 x 90 grid over face space (64 x 64 on phones). Each dash
  samples `lum` at its grid point. LENGTH mapping: length is proportional to
  luminance raised to 1.7, capped at 1.5 grid cells. Bright skin and the nose
  ridge draw long dashes; the dark eye wells, mouth band, and hair shrink to
  dots or vanish; the black background carries no marks at all, so the face
  emerges purely from mark length. ANGLE: the gradient of `lum` is taken by
  central differences, and the dash is drawn along gradient + 90 degrees, so
  dashes flow along the luminance contours (visible as the swirling flow
  around the eyes and nose). Where the gradient is near zero a seeded
  near-horizontal fallback angle is used. Nothing is filled underneath: the
  dashes are the whole image.
- Cycle: 14 s per portrait. Assemble 0-5 s: each dash lerps from its seeded
  scatter offset (direction and distance 0.22-1.07 face units, plus a seeded
  rotation offset) to its grid target with a per-dash stagger of 0-1.7 s and
  smootherstep easing over 3 s. Hold 5-10 s: the face is still. Dissolve
  10-14 s: the reverse, with color stepping from white toward the dissolve
  gray #8A8D84 as the scatter amount grows (five quantized shades, batched
  into five stroke passes for speed). Scattered dashes also shorten.
- Frame one: T0 = 9 s, mid-hold of portrait 0 (a frontal portrait under the
  shipped seed), drawn synchronously at load. The animation clock starts at
  the first rAF tick; state is a closed-form function of piece time plus the
  recorded event lists, never frame-integrated, and never derived from
  Date.now.
- Data columns: two vertical streams at the viewport thirds, 52 seeded ticks
  each, drifting downward at per-tick seeded speeds with a slow flicker,
  stroked in #3DDC84 at alpha 0.5, drawn before the face.
- Interaction: pointer drag records interference samples (face coords, piece
  time, throttled, capped). In the draw, each dash within range of a recent
  sample is pushed along its own scatter direction with a gaussian falloff
  and an envelope that rises in 0.15 s and decays over about 3 s, tinting
  toward gray and shortening as it goes; the face reforms behind the finger.
  Tap records a hold: the cycle clock is frozen for 10 s by subtracting the
  hold overlap from raw piece time, so the freeze is exact and closed-form.
  Double-tap cancels the pending hold and records a skip: the phase jumps to
  the start of the next portrait's cycle.
- Sound: created lazily inside the first pointerdown, typeof-guarded, and
  fully silent in the QA renderer. A looped noise buffer through a bandpass
  forms the granular shimmer (gain rises with assembly progress, falls at
  dissolve), a 96 Hz sine is the low hold hum, and short square blips tick
  for the data columns. No microphone, no camera.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas style width and
  height are pinned in pixels inside draw(); phone detection via
  window.screen (min dimension < 700 px) with the aspect fallback; page
  ground is the piece's black. No gradients, no shadowBlur, no ctx.filter,
  no offscreen canvas, no external assets, no absolute URLs, no date
  strings, no em dashes, no visible text except the <title>.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), and 720x720 (thumb.png). All render cleanly in silence.
- Frame one (desktop and thumb): a frontal face readable at a glance and
  made entirely of short white dashes and dots on black: two dark eye wells
  with brow bands, a bright vertical nose ridge, nostril shadow, a dark
  mouth band, dotted hair cap, thin green tick columns at the thirds, black
  edges. Mobile: the same face, whole and centered at the 64 x 64 grid,
  nothing clipped.
- Determinism: thumb.png rendered twice and byte-compared with cmp;
  identical. The duplicate render was deleted.
- Retune round: the first field (seed 1010171, length exponent 1.25, skin
  base 0.54) read as an overbright topographic blob in a profile pose, with
  weak features and a detached-looking nose bump. Fixes: length exponent
  raised to 1.7 and dash cap lowered to 1.5 cells so mid-tones thin out;
  eye wells deepened to 0.78 and mouth band to 0.72 so features read as true
  dark holes; profile nose bump softened (0.7 amplitude, wider); and the
  seed moved to 1010177 so portrait 0 is frontal for the strongest frame
  one. Re-rendered all sizes after the retune.

## Deviations

- Portrait 0's variant is frontal by seed choice rather than left to the
  first draw of the original seed (which produced a profile). The variant
  sequence is still fully seeded and still never repeats a yaw back to back;
  only the starting seed was selected so frame one shows the most legible
  pose. Recorded here per instructions.
- The data columns sit at the viewport thirds rather than at face-space
  thirds. On wide viewports these nearly coincide; on phones the columns
  stay at the screen thirds (framing the face) while the face itself scales
  to fit width, which keeps the columns visible instead of burying them
  behind the dash field.
- Phone grid is 64 x 64 instead of 90 x 90, as allowed by the brief, to keep
  the per-frame dash cost flat on small devices.
