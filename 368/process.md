# №1074 — Reality / Delusion

Momoko Nishimoto study block MN3. After *Cold Stares*: the real world and the
delusion world shot with identical camera motion and morphed in realtime. One
scene, two renderings, one mix control — the transition is the piece, never a
cut, never a split screen.

## The field

A single seeded line-field is the whole scene: a jittered 7×7 lattice of nodes
joined into a precise geometric web, with a few nodes acting as star hubs.
Each node drifts on integer-frequency sinusoids, so the field's motion is a
closed-form function of t and loops seamlessly every 60 s. Everything on
screen is drawn from this one stored dataset, twice.

## The two renderings

- **REAL** — the field at phase t: thin (1.1-unit) sharp white strokes at full
  precision, small exact node points. Drawn last, on top.
- **DELUSION** — the same field sampled at a delayed phase (t − 2.4 s), so it
  is literally the same motion arriving late. Rendered as layered flat-alpha
  shapes only: a wide deep-brown under-pass (#8A6B45), two gold-brown copies
  (#C9A06B) offset in opposite directions for the double image, warm node
  blooms, and ~1,950 precomputed grain dots in #E8DCC8 — half free-floating,
  half sampled along the delayed segments so the texture density belongs to
  the reconstruction, not to noise pasted over it. No blur filter, no
  offscreen canvas: the softness is built from offsets and alpha.

## The morph

One mix value m crossfades the layers (real weight 1−m, delusion weight m).
A third pass in warm-white #F2E9D8, its strength peaking exactly at m = 0.5
with a per-segment flicker, makes the midpoint visibly shimmer.

- Untouched, m breathes on its own: m(t) = 0.5 + 0.38·sin(2πt/60), so the
  morph is always slowly happening.
- **Drag horizontally** — m follows the finger (left real, right delusion).
  On release, breathing resumes analytically from the released value,
  blended back over 3.5 s with a smoothstep — the state is a closed-form
  function of the recorded gesture and t, never integrated frame by frame.
- **Tap** — snaps m to 0.5, the shimmer midpoint.
- **Double-tap** — reseeds the field; both worlds regenerate together.

## Sound

Created lazily inside the first visitor gesture, typeof-guarded, silent
before: a clear 196 Hz sine for the real world and band-passed buffer noise
for the delusion, their gains crossfaded by the same m every frame. No
microphone, ever.

## Determinism

Frame one is drawn synchronously at fixed phase t = 0, where the breathing
function gives m = 0.5 exactly — the thumb shows both renderings at once:
sharp white lines over the warm amber grainy double-image. The rAF loop is
anchored to its first stamp, so elapsed time can never leak into frame one.
Canvas size comes from the Visual Viewport API; style width/height are
pinned every draw; phones (screen min < 700 px, aspect fallback) get the
field at 98% of the short side, desktop 94%.
