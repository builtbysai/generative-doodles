# No.865: The DJ Replaces the Orchestra

Study #106 lim-giong, PP26 "Live Movie". Lim Giong's Live Movies format re-scores
silent archival footage live; here there is no footage at all, only a procedural
archive that the visitor's gestures re-score. Dragging is the DJ set: it warms
the tint, coarsens the grain, hardens the flicker and speeds the drift. Stillness
lets the archive go cold and nearly freeze. Taps are cuts, and only taps are cuts.

## Concept

A letterboxed screen band floats in archive black. Inside it, flat procedural
silhouettes (a boat, three standing figures, a rooftop skyline with a water
tower, a bicycle, a harbor crane) drift horizontally on independent slow loops,
like anonymous found footage of a harbor street. Film grain, scratches and
flicker live over the whole frame, black bars included, because the damage is in
the film, not in the scene. One scalar, the energy, conducts everything; it is
fed by the visitor's hand and starved by their stillness.

## Construction

- **Energy model.** E(t) is a closed-form sum of decaying exponentials over the
  recorded input: a resting term decaying from E_REST = 0.42 toward the floor
  E_MIN = 0.10 with tau 8 s, plus one excitation per throttled drag-speed sample
  (amplitude 0.5 x normalized speed, tau 2 s, so a gesture is felt for roughly
  6 s). Frame one is drawn at t = 0 with no samples, so E = 0.42 exactly:
  warmth = (0.42 - 0.30) / 0.70, a faint warm wash, coldness zero.
- **Drift.** Silhouette positions integrate the energy analytically:
  PHI(t) is the exact integral of the drift rate k(E) = 0.05 + 1.05 * E
  (each exponential integrates to another exponential), and each sprite's
  position is frac(u0 + dir * speed * PHI(t)) across a span wider than the
  frame. No frame-integrated state anywhere; any frame is a pure function of
  the recorded samples and t.
- **Deterministic grain.** Grain is seeded per grain-frame, never per draw:
  a mulberry32 stream keyed by (floor(t * 12) * 2654435761 XOR eraSeed * 977
  + 865) lays down floor(W * H / 430 * (0.30 + 1.40 * E)) dots, capped at 3800.
  Frame one therefore renders byte-identically on every load and in the QA
  harness. Scratches run on fixed 7 s cycles from the same era seed, one of
  them phased to be up at t = 0; flicker is a hash of the flicker-tick index,
  its amplitude shrinking to zero as E approaches the floor.
- **Cuts and eras.** A tap waits out a 0.32 s double-tap window in the rAF loop,
  then hard-cuts to the next seeded layout (new sprite order, positions,
  speeds) with a one-frame flash and a low thump. A double-tap advances the
  era seed instead: new layout stream, new scratch set, slightly different
  screen-base density. Nothing ever cuts on a tempo grid.
- **Audio.** Lazily created inside the first pointer gesture, fully
  typeof-guarded. A 48 Hz sine plus a detuned triangle and a looped noise
  buffer share one lowpass; about five times a second the loop retargets the
  cutoff (140 + 950 * E) and bed gain (quadratic in E) from the same closed-form
  energy, so stillness decays the bed to near-silence on its own. The cut thump
  is a 68 to 38 Hz sine drop. The QA harness has no AudioContext and the piece
  renders complete in silence.
- **House rules.** Canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas CSS size pinned in px
  inside draw(); phone detection from window.screen's physical min dimension
  (< 700 px) with the h > w * 1.15 aspect as fallback only. No gradients, no
  shadowBlur, no ctx.filter, no offscreen canvas, no visible text besides the
  title. Strict five-color palette: archive black, silver grain, warm tint
  (gesture only), cold stillness (stillness only), scratch white.

## Deviations

1. **A fifth silhouette.** The prompt names boat, figures, rooftop, bicycle;
   a harbor crane (derrick) was added as a fifth sprite in the same flat
   register, since the layouts seat four to five sprites and a harbor archive
   wants a vertical. Same palette, same treatment.
2. **Resting energy is a transient, not a level.** The resting 0.42 decays
   toward the 0.10 floor over about 8 s of no input (tau 8 s idle term), so an
   untouched archive eventually reaches the prompt's cold near-frozen state
   instead of idling warm forever. Gesture energy itself decays faster
   (tau 2 s), matching the brief's roughly 6 s decay.
3. **Reseeds are deterministic.** Double-tap advances an integer era seed and
   regenerates from mulberry32 rather than consuming live randomness, keeping
   every era reproducible and frame one byte-stable.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js (node-canvas harness,
  no rAF, no AudioContext): qa-desktop.png 1280x900, qa-mobile.png 390x844,
  thumb.png 720x720. All three render cleanly in silence; the registered
  listeners are pointerdown/move/up/cancel plus both resize paths.
- Read back: black frame; a grey letterboxed band across the middle with a
  warm-brown cast at resting energy; crane, boat and figures entering from the
  left, rooftop skyline with water tower and a bicycle at the right; grain
  texture over the whole frame including the black bars; two vertical scratch
  lines up at frame one (the phased scratch at 0.62 of width plus one cycled
  scratch). Mobile holds the same composition in the tall frame, sprites at
  the edges mid-drift, nothing clipped wrongly.
- Determinism: thumb.png rendered twice and compared with cmp: byte-identical.
  The duplicate was deleted. Frame one is the synchronous draw(0); no
  Date.now() and no Math.random() anywhere in the piece.
