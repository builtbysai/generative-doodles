# No.908 — silly dither

Study #111 simondavidryden, PP69 "The Silly Dither".

## Concept

A flowing grayscale volume — smoke, draped cloth — rendered in the strictest
possible language: white ordered-dither dots on pure black, nothing else. There
are no grays in the piece; brightness exists only as dot density. Dense white
stippling where the volume is bright, sparse dots where it dissolves, pure
black at the corners. The volume never stops drifting: it is smoke, not a
poster.

Interactions are quiet modifications of the dither itself. Dragging scrubs the
threshold down under the finger, so the dots swell and densify along the path
and slowly relax. A tap flips the dither pattern (Bayer to clustered-dot),
re-rendering the same volume in a second dot language. A double-tap dissolves
the volume: every dot scatters radially outward into static for four seconds,
then re-gathers.

## Construction

- **Density field.** `density = fbm(x, y, t)`: a seeded 3D value-noise fbm
  (4 octaves, integer-lattice hash, trilinear smoothstep interpolation). The
  sample domain is domain-warped by a second fbm so the form billows instead
  of sliding, and time drifts through the noise's third axis at 0.055/s plus a
  slow sinusoidal domain slide. The field is sharpened slightly
  (`(f − 0.33) × 2.3`, clamped) and multiplied by a soft radial envelope in
  smaller-dimension units (full strength inside r ≈ 0.10 of frame center,
  dissolving to zero by r ≈ 0.50), so the volume fills the center and its
  edges dissolve into sparse dots over pure black corners.
- **Ordered dither.** The frame is a grid of square cells (6 px desktop,
  7 px on phones). Each cell compares the density at its center against a
  threshold taken from an 8×8 ordered matrix (threshold = (value + 0.5) / 64;
  midpoint thresholds keep the weakest signal from printing). Above
  threshold: one white square dot (`CELL-1` px, leaving a hairline of black
  between dots so the grid language stays visible). Below: black. Two matrices
  ship: the classic 8×8 Bayer and a clustered-dot matrix; tap flips between
  them (parity of the derived flip count).
- **Drag mask.** Drag samples are recorded as `{x, y, t}` points. Each frame
  the recent points (last ~140) are splatted into a per-cell offset grid as
  Gaussian bumps (σ = 70 px, radius 3σ) with amplitude 0.38 × exp(−age/6 s);
  the offset is subtracted from the cell threshold, so dots locally densify
  and the effect decays over ~20 s. Points older than 26 s are pruned. The
  mask is analytic over the recorded event list — no accumulation buffer.
- **Dissolve.** A double-tap (two taps within 0.35 s, both consumed) starts a
  4 s event. The scatter envelope is `sin(π · age/4)`; each dot's sample
  position is displaced radially from frame center by up to 0.16 × min(W, H),
  modulated per-cell by the seeded hash so the explosion reads as static
  rather than a clean ring. At the envelope's end the volume has re-gathered.
- **Determinism.** Frame one is the synchronous `draw(0)` at load. Density is
  a pure function of (x, y, t); the mask and scatter are closed-form over the
  recorded events; all randomness comes from the seeded integer hash and one
  mulberry32 stream. No `Date.now()` anywhere in drawn state (the loop clock
  is rAF elapsed time, anchored after frame one). No gradients, no
  shadowBlur, no `ctx.filter`, no offscreen canvas.
- **Sound.** Lazy and gesture-gated: an AudioContext is created on the first
  pointerdown only, typeof-guarded and try/caught. A looped seeded white-noise
  buffer runs through a bandpass (6.2 kHz) into a gain. The gain follows the
  frame's lit fraction (computed in the draw: 0.012 + lit × 0.055), rises
  while dragging, and blooms with the dissolve amount — the hiss is the dots.
  The piece renders complete in total silence in the QA harness.
- **House rules.** Canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas style width/height
  pinned in px inside `draw()`; phone detection via `window.screen` min
  dimension < 700 px with the aspect fallback (h > w × 1.15); rAF typeof-
  guarded; page ground is the piece's own black.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` at 1280×900
  (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png). All three
  render cleanly in silence (no AudioContext, no gestures in the harness).
- Determinism: thumb.png rendered twice and `cmp` byte-compared — identical;
  the duplicate was deleted.
- Read-back (after two tuning passes: first pass filled the frame wall-to-wall,
  so the envelope was tightened to the smaller-dimension metric and the
  density remap given more contrast; a second pass switched thresholds to
  midpoint values (v + 0.5)/64 to kill the stray always-on dots the zero
  threshold produced at the envelope's edge):
  - qa-desktop.png (1280×900): pure black field and corners; a billowing
    stippled volume centered, dense white heart with darker folds carved
    through it, dissolving into sparse dots at the margins. Two colors only.
  - thumb.png (720×720): same composition at gallery size; the form reads as
    one coherent smoke body with a bright core and lacy dark folds.
  - qa-mobile.png (390×844): the volume centered in the tall frame, dense
    heart, sparse dissolving edges, generous black above and below; nothing
    clipped.

## Deviations

- The tap that begins a double-tap does not flip the pattern on its own: tap
  pairs within 0.35 s are consumed as one double-tap by the event derivation,
  so a double-tap never also flips. This keeps the gesture vocabulary clean
  (one gesture, one effect) at the cost of the flip landing on pointer-up
  rather than pointer-down.
- Dots are drawn as squares one pixel smaller than the cell rather than
  circles. On a strict two-color grid the square dot is the honest pixel of
  the Bayer language, and it avoids any antialiased edge that could smuggle
  gray into a two-color piece.
- The prompt's "grain rate follows dot density" is realized as hiss gain
  following the frame's lit fraction (plus drag and dissolve terms): a literal
  per-grain scheduler would need hundreds of scheduled grains per second, and
  gain on a continuous noise bed reads identically as densifying static.
