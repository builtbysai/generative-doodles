# No.907 "checkerboard fbm" — process

Study #111 simondavidryden, PP68 "The Checkerboard FBM".

## Concept

A regular black-and-white checkerboard warped by fbm noise into dark rolling
terrain, held in dramatic chiaroscuro. A bright blue-white storm front breaks
through from one edge. The camera never moves: only the noise field, the
light, and the storm change. The warp is the subject — the baseline is never a
flat checkerboard; flatness exists only as the double-tap's brief reveal.

Interactions: drag tilts the light (the relief re-shades live toward your
finger), tap sends the storm front sweeping across the whole field, double-tap
flattens the fbm amplitude to zero so the perfect grid shows for a moment
before the terrain rises again.

Palette (strict, five tones): ground #0B0E14, checker light #B9C6D8, checker
dark #141A24, storm #E8F1FF, smoke #5A6B85. All shading is these tones scaled
or mixed with each other; nothing else enters.

## Construction

- Heightfield: seeded value-noise fbm, 4 octaves, built on a mulberry32
  permutation table. `height(u, v, t)` is a pure function of position and
  time; each octave's sample window drifts at a different rate with t, so the
  terrain morphs/breathes instead of sliding rigidly. A slow global amplitude
  breath (about ±8% over ~2 minutes) is added on top.
- Relief render: a 60×60 cell grid (44×44 on phones, see below). The grid
  overscans the frame on all sides (u from -0.07 to 1.07, v from -0.22 to
  1.22) so the displaced sheet covers the full frame at any height — the
  first QA pass left ground bands at the top and bottom edges, fixed by this
  overscan and re-verified. Each cell is
  drawn as a quad whose four corners are displaced vertically by the corner
  heights (fixed oblique projection, plus a slight horizontal shear with
  height). Rows draw top to bottom so lower rows overlap displaced upper
  ones. Shading per cell = checker parity base tone × lambert term (surface
  normal from the heightfield gradient, dotted with the light vector) ×
  height-based ambient occlusion. No canvas gradients, no shadowBlur, no
  ctx.filter, no offscreen canvas.
- Light: the light vector is derived from a light position in field coords.
  Dragging records anchor points {t, x, y}; the light position at any time is
  the exact piecewise-exponential approach (tau 0.14 s) across the recorded
  anchor segments — a closed-form function of the event list, not integrated
  frame state. At rest the light stays where the last drag left it.
- Storm: a radial zone in pixel space whose centre drifts on slow sines of t
  (frame one: left edge, covering roughly a third of the field). Per cell, a
  smooth falloff of distance to the centre mixes the shaded tone first toward
  smoke #5A6B85 at the boundary band, then toward storm #E8F1FF inside. A tap
  commits a surge 0.32 s later (the delay lets a double-tap pre-empt it):
  over 3.2 s the centre sweeps from off the left edge to off the right,
  intensity peaking mid-sweep, then the drift resumes.
- Flatten: a double-tap drives the amplitude factor to zero over 0.8 s, holds
  the perfect flat checkerboard for ~4.6 s, and rises back over 0.8 s. Heights
  lerp toward the field mean, so relief and gradient shading vanish together.
- Tap parsing: taps are recorded on release (press under 0.35 s, movement
  under 2% of frame). The action list is re-derived from the tap list each
  frame: a tap followed within 0.32 s by another is a double-tap.
- Determinism: frame one is the synchronous `draw(0)` at load; nothing drawn
  derives from Date.now(). The rAF loop (typeof-guarded) is driven by an
  elapsed-since-load clock; all state is seeded functions of t plus the
  recorded event list. Seeded RNG: mulberry32 only.
- Sizing: canvas size from the Visual Viewport API with resize listeners on
  visualViewport and window; canvas.style.width/height are pinned in px
  inside draw(). Phone detection via window.screen physical size (min
  dimension < 700 px), aspect h > w × 1.15 as fallback only.
- Audio: starts only on the first pointer gesture; AudioContext is lazily
  created and typeof-guarded, and every audio update is wrapped so the visual
  renders complete in silence. Brown noise (generated from a seeded stream)
  loops through a lowpass for the terrain rumble — its cutoff follows the
  light's elevation factor — and through a bandpass whose gain and frequency
  follow the surge envelope for the rising wind. No microphone.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280×900
  (qa-desktop.png), 390×844 (qa-mobile.png), 720×720 (thumb.png): all render
  cleanly in silence (no AudioContext, no rAF in the harness).
- Determinism: thumb.png rendered twice and compared with cmp — byte
  identical; duplicate deleted.
- Visual read-back: see the QA notes in the build report; frame one shows the
  warped checker terrain in chiaroscuro with the storm front bright at the
  left edge and the grid readable inside the warp.

## Deviations

- Grid resolution on phones is 44×44 instead of 60×60 (per the brief's own
  allowance) for frame-rate headroom on small devices; recorded here as
  required.
- The storm overlay is computed as a per-cell distance falloff mixed into the
  cell's shaded tone (with the smoke haze as the mid-falloff band), rather
  than a separate composited layer — same visual result, keeps the strict
  palette and the no-offscreen-canvas rule.
- Flatten hold is ~4.6 s at zero amplitude inside a 6.2 s total event
  (0.8 s sink + hold + 0.8 s rise), reading as "flat for about six seconds"
  including the transitions.
