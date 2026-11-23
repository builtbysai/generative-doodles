# No.826 "Straight and Narrow" (EXPANSION #101 tony-conrad, PP3)

## Concept

Tony Conrad's 1970 film *Straight and Narrow* (with Beverly Grant): successive
frames of horizontal and vertical bars, projected against a rhythmic soundtrack,
producing moiré interference the eye invents for itself. This piece rebuilds it
as a full-field bar engine. Two bar sets, one horizontal and one vertical,
alternate; a second bar pattern at 1.03x scale is layered over whichever set is
showing, at low alpha, so broad beat bands crawl slowly across the field. The
fringes are never drawn. They emerge from the superposition of the two bar sets
and from the viewer's own visual system, which is where Conrad put them.

Safety posture for the whole Conrad study applies here: flicker stays at or
below the caps recorded below, a reduced-motion mode replaces the strobing with
a slow crossfade, and the piece is silent.

## Construction

- Palette is strictly #000000 and #FFFFFF. Any gray on screen is a blend
  produced by layering the two bar sets at partial alpha; phantom gray exists
  only in the eye.
- Base field: stripes of width `bw`, alternating black and white, drawn
  edge to edge. `bw` comes from the active pattern set (9 to 15 px at 1080
  scale) multiplied by the frame scale `min(W, H) / 1080` and by the visitor's
  drag width factor, with a 3 px floor. Bar width therefore scales with the
  frame: about 10 to 12 px on a 1280x900 desktop, about 8 to 10 px in the
  720x720 thumb, and about 4 to 5 px on a 390-wide phone, where the field is
  finer but still full-bleed.
- Overlay: the same bar orientation at `bw * 1.03`, alpha 0.35, its offset
  drifting at 1.5 1080-units per second in a seeded direction. The 3 percent
  scale difference makes the two sets fall in and out of phase across the
  field, which reads as wide gray beat bands that crawl as the offset drifts.
- Alternation: the displayed orientation is a closed-form function of an
  integrated phase. Phase advances at the current rate in field alternations
  per second; even phase shows horizontal bars, odd shows vertical.
- Rate caps: default rate 7 alternations per second, drag range 2 to 10,
  hard cap 10. Because a full black-white cycle is two alternations, the
  full-cycle rate never exceeds 5 Hz and the alternation itself never exceeds
  10 Hz, both under the study's 14 Hz ceiling under either reading.
- Drag: horizontal drag retunes the rate (0.02 Hz per px from the grab point,
  clamped to 2..10), vertical drag scales bar width (exponential, factor
  0.55..1.9). Rate changes are recorded as control points and the phase is
  the piecewise integral of those points, so the field is a closed-form
  function of (t, recorded drag segments, pattern seed). Width factors lerp
  between their recorded control points.
- Double-tap reseeds the pattern: a new width in 9..15 px, new stripe phase
  offset, new overlay phase and crawl direction, all from mulberry32 seeded
  by BASE_SEED 826003 plus the reseed index.
- Structure: a 600 second run, then a hard stop to black for 5 seconds, then
  the cycle restarts, mirroring the original's 10-minute run and hard stop.
- Reduced motion: if the system reports prefers-reduced-motion, or the
  visitor taps the top-right corner zone (rightmost 18 percent, topmost 18
  percent), the alternation is replaced by a 1 Hz crossfade: the horizontal
  field opaque, the vertical field blended in on a slow sine, overlay at
  half alpha.
- Determinism: frame one is the synchronous draw at t = 0, the horizontal
  field with its overlay. No Date.now anywhere; the animation clock is
  anchored at load and the phase derives from that anchored clock and the
  recorded segments, never from accumulated frame counts. rAF is
  typeof-guarded; the QA renderer runs the script once with no rAF and gets
  frame one. Canvas size comes from the Visual Viewport API with resize
  listeners on both visualViewport and window; draw() pins the canvas CSS
  size in px every frame. Phone detection uses window.screen (min dimension
  under 700) with the h > w * 1.15 aspect rule as fallback only; the
  composition is full-bleed at every size, so the phone flag changes nothing
  structural. No gradients, no shadowBlur, no ctx.filter, no offscreen
  canvas, no audio, no microphone.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js:
  qa-desktop.png (1280x900), qa-mobile.png (390x844), thumb.png (720x720).
- Determinism: thumb.png rendered twice and compared with cmp; byte-identical.
  The duplicate was deleted.
- Desktop read-back: crisp horizontal black/white bars edge to edge; broad
  gray beat bands from the 1.03x overlay visible across the field, strongest
  mid-frame, exactly the emergent moiré the piece is about.
- Thumb read-back: same read at 720x720, bars at about 8 to 10 px, beat
  bands present.
- Mobile read-back: full-bleed fine bars at 390x844, nothing clipped, beat
  bands still legible in two zones.
- Deviations: none of substance. Two interpretation choices, recorded:
  (1) the alternation rate is counted in field changes per second, so the
  10 cap keeps even the stricter reading of the flicker ceiling satisfied;
  (2) the prompt's "1.03x overlay" is layered at alpha 0.35 in the same
  orientation as the showing field, because a static cross-orientation
  overlay would draw a fixed grid, which is fringe-as-graphic by another
  route; the same-orientation beat keeps every fringe emergent and moving.
