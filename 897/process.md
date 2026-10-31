# No.897 — F_o.'r y[o]u, m_us.'e

Study #110 sakrmusic, PP58 "Inkblot Sunburst".

## Concept

A black fractal fern on clean white: 240 fronds radiate from a dense black
core, each one a branching stroke that tapers from a 4 px stem to hairline
tips. The whole organism breathes on one growth parameter. Contracted, the
fronds curl tangentially into a tight pinwheel eye medallion; bloomed, they
open into the full wide burst. The cycle is asymmetric on purpose: a long
slow bloom of about 14 seconds, then a quick 3 second contraction, a gasp
rather than a beat. Faint vertical hairline streak bands hold the top and
bottom margins like the edge marks of a specimen plate. Black on white only.

Interaction is minimal and never a reload: a tap snaps the eye shut for an
instant, a double-tap holds the medallion closed for 6 seconds so the
specimen can be studied. Sound, once a first tap enables it, is the form
breathing: an airy filtered-noise wash that gains layered voices as the
bloom opens, and a single low inhale, a falling filtered sweep, at each
contraction.

## Construction

- Single self-contained `index.html`, canvas 2D, no external assets.
- Fronds are precomputed seeded data (mulberry32, seed 897058): base angle
  with jitter and a slow clumping wave so the burst never reads as a
  kaleidoscope diagram, length 0.55 to 1.05, a shared pinwheel curl sense
  with per-frond magnitude 1.15 to 1.6 rad, per-step bend, wobble frequency
  and phase, a bloom-turn factor, and alpha. Each frond carries precomputed
  level-1 branchlets off stem steps 2 to 5 (about 62 percent of steps),
  each with spread, length, bend and asymmetry rolled from the same stream;
  about 55 percent of branchlets carry a level-2 sub-branchlet.
- Drawing a frond is a pure function of the growth value G: a six-step walk
  whose heading starts tangential at G near 0 (lean = (1 - G) * curl) and
  rotates to radial as G rises, gaining the frond's turn factor along the
  way; the per-step bend relaxes from the medallion curl to a residual
  hand-drawn wobble. Length scales as (0.30 + 0.70 * G) * frond length.
  Strokes are drawn segment by segment with interpolated line width, stems
  in fractal black #111111, branchlets in frond shade #2A2A28. The dense
  core (#000000) is drawn last so frond bases sink into it, with 26 short
  seeded strokes breaking its edge.
- The G cycle is closed-form: cycle time is (t + 7.446) mod 17 s. The first
  14 s are the bloom, G = 0.04 + 0.94 * (0.5 - 0.5 * cos(pi * u)); the last
  3 s are the contraction, G falling 0.98 to 0.04 on a quadratic ease-out.
  The 7.446 s offset puts frame one at u = 0.532, G = 0.55, mid-bloom on
  the rising limb.
- Gestures are recorded event lists folded in analytically: a tap adds a
  snap envelope (G pulled toward 0.03 with an exp(-dt / 0.8) recovery), a
  double-tap adds a 6 s hold (G pinned to 0.04 with smooth blends in and
  out). The drawn form is a pure function of t plus these lists. No
  `Date.now()`, no unseeded randomness anywhere; frame one is the
  synchronous `draw(0)` before the rAF loop starts, and rAF is
  typeof-guarded.
- Canvas size comes from the Visual Viewport API with resize listeners on
  both visualViewport and window; `canvas.style.width/height` are pinned in
  px inside `draw()`. Phone detection uses `window.screen` physical size
  (min dimension < 700 px) with the aspect fallback only. The page ground
  is the piece's clean white #FAFAF7 at every size, and the burst is
  centered and scaled on the smaller viewport dimension, so nothing clips
  on a tall phone frame.
- Audio is lazy and typeof-guarded, created only inside the first
  pointerdown: a looped seeded noise buffer feeds a lowpass wash plus four
  bandpass voices (520 / 880 / 1420 / 2250 Hz) whose gains switch on at
  rising G thresholds, so the wash thickens as the bloom opens. The inhale
  is a one-shot bandpass sweep 1500 Hz down to 260 Hz over about 0.9 s,
  fired on tap, on double-tap, and when the cycle crosses into its
  contraction phase. No microphone. Visuals render complete in silence.

## QA log

- Rendered with `node ~/workspace/tools/render-piece.js` (node-canvas, no
  AudioContext, no rAF in the harness): qa-desktop.png 1280x900,
  qa-mobile.png 390x844, thumb.png 720x720. All rendered cleanly in
  silence; only the synchronous frame one is exercised, as designed.
- Determinism gate: thumb.png rendered twice and byte-compared with `cmp`:
  identical. Duplicate deleted.
- Read-back: desktop shows the clean white ground, the burst centered and
  half-open at G = 0.55, fronds feathering outward with irregular lengths
  and tapering branchlets, the pinwheel curl still readable in the frond
  bases around the dense black core, hairline bands faint at the top and
  bottom margins. Mobile (390x844) shows the same composition centered in
  the tall frame on the white ground, bands at both margins, nothing
  clipped. Thumb matches the desktop read at square format.
- Palette audit: only #FAFAF7, #111111, #000000, #C8C8C4, #2A2A28 appear.
  No gradients, no shadowBlur, no ctx.filter, no offscreen canvas, no
  visible text besides the title.

## Deviations

- None from the brief's substance. Two implementation notes: (1) the
  contraction inhale also fires at the cycle's own bloom-to-contract
  crossing, not only on gestures, because the brief describes the
  contraction itself as a single low inhale; (2) branchlet walks use three
  segments and sub-branchlets two, which keeps the per-frame segment count
  near five thousand while preserving the two-level recursive read.
