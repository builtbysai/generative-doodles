# No.1027 - Left Eye, Right Eye

Study #126 tomoaki-yanagisawa, PP188 "Stereo Light" (Syn Stereo Light).

## Concept

Two floodlights cross in a dark gallery, but they never shine together: they
pulse in strict alternation, the way shutter glasses feed one eye at a time.
The frame itself is the pair of eyes. The left half is the warm eye's view,
the right half the cool eye's view, split by a thin seam. A small matte white
sphere floats where the cones cross, drawn once per eye with a real
horizontal disparity, lit warm from the top-left in one view and cool from
the top-right in the other. Because the two views genuinely differ, the
sphere lifts off the screen. Occasionally the rhythm stutters, a pulse is
dropped, the depth wobbles, and then the alternation re-locks. No labels:
the colors say which eye is which.

## Construction

- Split frame: each half is clipped and rendered as one eye's view. Left eye
  light is warm #FFD9A0 from the top-left corner, right eye light is cool
  #A0C8FF from the top-right corner, over gallery #050506 with seam #1A1B1E.
- Cones: layered flat-alpha polygons (four nested widths) in cone white
  #FFF8E7 and the eye color, apexed at the top corners and converging on the
  object, plus three layered landing-pool circles. No gradients, no
  shadowBlur, no filter, no offscreen canvas anywhere.
- Envelope math: envL(t) = 0.5 + 0.5*cos(2*pi*0.8*t); envR(t) = 0.5 +
  0.5*cos(2*pi*0.8*t + pi + detune). Strict anti-phase raised cosines drive
  the cone alpha, the half-frame ambient wash, and the object's brightness
  (0.25 + 0.75*env), so each half crossfades smoothly through the other.
- Flash-rate verification: each eye reaches peak brightness exactly once per
  envelope period of 1.25 s, so the maximum per-eye flash rate is 0.8
  flashes per second, well under the 3 flashes-per-second safety ceiling.
  The raised cosine has no discontinuities, so there is no instantaneous
  on/off switching anywhere in the piece; stutters and detune decay are
  smooth functions too.
- The object: matte sphere #F2F2F0 shaded with layered flat circles clipped
  to the disc (eye-tinted light side toward that half's lamp, white
  highlight, dark limb opposite). Disparity d = 1.5% of frame width, left
  copy at cx - d, right copy at cx + d: two genuine viewpoints, not a
  mirrored copy. The sphere bobs and sways on slow closed-form sines.
- Stutters: a seeded schedule (mulberry32, first event at 19-25 s, then
  every 18-30 s) flattens one eye's envelope toward its mean with a smooth
  raised-cosine bump (half-width 0.55 s), which reads as a dropped pulse;
  the disparity also narrows by up to 55% during a stutter, so the depth
  visibly wobbles, then everything re-locks because the phase itself is
  never disturbed. Tap schedules the same flattening at the next peak.
- Interaction: drag horizontally adds a phase detune to the right envelope
  (clamped to plus/minus pi); on release it decays exponentially (tau =
  1.15 s, settled in about 4 s) and a soft resolving chord plays when it
  re-locks. Double-tap cycles the object sphere, cube, torus. The cube is an
  isometric three-face solid whose lit face flips with the eye (warm eye
  lights the left face, cool eye the right); the torus is a stroked ring
  with a highlight arc toward the lamp.
- Sound: created lazily inside the first pointer gesture, typeof-guarded.
  A soft low tick at each left peak and a high tick at each right peak
  (185 Hz / 305 Hz, gain 0.045); a stutter swallows its tick, giving the
  skipped beat; the re-lock chord is 220/277/330 Hz at low gain.
- Determinism: frame one is drawn synchronously at the fixed offset
  T0 = 6.25 s, exactly a left-envelope peak (0.8 * 6.25 = 5 full cycles),
  with the right eye at its trough. Nothing in the drawn state comes from
  Date.now or an unseeded source; all interaction state is a closed-form
  function of recorded events and t. Canvas is sized from the Visual
  Viewport API with resize listeners on visualViewport and window, the
  canvas style is pinned in px on every draw, and phone detection uses
  window.screen (min dimension under 700 px) with a tall-aspect fallback.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), and 720x720 (thumb.png); all three render cleanly in
  silence (no AudioContext, no requestAnimationFrame in the harness).
- Determinism: thumb.png rendered twice and compared with cmp:
  byte-identical both before and after the shading fix below. The duplicate
  render was deleted.
- Read-back, desktop and thumb: dark frame with a thin center seam; the
  warm cone from the top-left is bright and the sphere in the left half is
  lit warm white; the cool cone from the top-right is dim and its sphere is
  faint blue-gray; the two sphere copies are visibly offset across the seam
  (the stereo step). Mobile: same composition compressed, split stays
  centered, both sphere copies whole, nothing clipped.
- Fix round: the first shading pass offset the sphere's tint and highlight
  away from the lamp, so the ball looked lit from below. The light vector
  was corrected to point from the object toward its eye's corner; the
  highlight now sits toward the lamp in both halves and the renders were
  redone and re-verified.

## Deviations

- Frame one sits at T0 = 6.25 s rather than exactly 6.0 s, so it lands
  exactly on a left-eye peak (a whole number of 1.25 s envelope cycles),
  matching the brief's "left half near its warm peak" intent precisely.
- The object brightness floor is 0.25 at envelope trough, so the dark eye's
  copy never vanishes entirely; the alternation reads as a pulse between
  two present views rather than a blink to black. This also keeps the
  disparity readable at all phases.
- The prompt's stutter is specified as occasional; seeded events plus the
  tap-triggered drop share one mechanism, and seeded stutters never occur
  before 19 s, so the opening seconds establish the clean rhythm first.
