# №1693 - Real to Synthetic

- Prompt: MK6, mpkoz PP940, EXPANSION #222. The real-to-synthetic turn: a
  recognizable Joshua Tree landscape dissolves over 30 seconds into its
  synthetic version, the same scene rebuilt as flowing vector-field
  ribbons, holds as simulation for a minute, then the photo bleeds back
  through. The dissolve is a left-to-right wavefront so source and
  simulation share the frame mid-transition, and ribbon directions trace
  the original cloud and rock contours.
- Date: 2006 · 08 · 31 (formula date 2002-01-10 + 1694 days).
- Gallery note: "A Joshua Tree photograph dissolves into the vector field
  hiding in its own contours, then condenses back. Watch only."

## Build

- Driver: a photograph dissolving into the vector field that was always
  hiding in its own contours, then condensing back.
- The photograph is built procedurally in code, no external images, no AI
  generation: a seeded sky gradient (blue #7FA8C9 hazed toward cloud white
  #F2F0EA at the horizon), 6 seeded Gaussian cloud blobs, a ridgeline of
  sines plus a flat-topped mesa near u = 0.68, rock brown #8A6A4F grading
  down through tan #C9A87A with dune bands in the foreground and 3 darker
  boulder masses straddling the horizon. Only the four prompt colors,
  mixed with each other, are ever used.
- Flow field: the perpendicular of the photo's luminance gradient, computed
  by central differences on the analytic photo function, so ribbons trace
  the cloud and rock contours. Where the photo is flat, the field drifts
  gently rightward.
- Ribbons: 240 seeded particles, each advected 48 steps of 0.012 field
  units along the flow field; each ribbon is a 12-point streak whose head
  advances with time and whose tail fades, colored by sampling the photo
  at its seed point. The flow is damped toward the wall near scene edges
  so ribbons turn parallel to the frame instead of piling up along it.
- Wavefront: 120 s cycle, 30 s dissolve left to right, 60 s simulation
  hold, 30 s bleed back, then repeats exactly. A 0.10-wide soft band
  blends photo into ribbons, with a thin pale seam line at the front.
- Simulation ground: the photo is precomputed once per scene size into a
  cell grid (about 26,000 cells) and drawn twice per frame, a 0.55
  brightness version as the simulation's ground and the full photo on top
  with the wavefront alpha, so full-color ribbons read against the dimmed
  field instead of vanishing into it.
- Composition: landscape framing, horizon at the golden third (v = 0.618),
  scene 1.6:1 centered in the square desktop field with sky-blue and tan
  bands extending its edges; full-bleed on phones. Watch-only, no
  scrubbing, no pause.
- House rules: Visual Viewport sizing with resize on visualViewport and
  window; canvas pinned in draw() via style.width/height in px; phone
  detection via window.screen (min dimension < 700 px) with aspect
  fallback; one synchronous frame at load; requestAnimationFrame guarded
  with typeof checks; fixed-phase first frame at t = 15 (mid-dissolve,
  wavefront mid-frame); seeded RNG only (mulberry32 seed 940), no
  Math.random() or Date.now() in the frame-one path; no em dashes in
  visible copy; never click-to-reload. Redraws throttled to at most every
  0.2 s since the dissolve is slow and the photo grid is expensive.
- Flicker safety: all motion is slow drift and a 120 s dissolve; nothing
  strobes.

## Deviations

- The simulation pass renders the photo at 0.55 brightness as its ground
  instead of a blank field. Without it, ribbons sampled from the photo
  were invisible against the identical photo colors behind them; the
  dimmed ground is the same sampled colors, only shaded, so no new colors
  are introduced and the photo-to-ribbon read stays honest.
- The photo is rendered as a cell grid (about 26,000 cells, 4.4 px on
  desktop) rather than per-pixel, so the ridgeline and cloud edges show a
  fine staircase. This is the same cell-render idiom as the recent
  relief pieces and reads as the piece's texture, not a defect.
- A few ribbons run parallel to the left frame edge where the wall damping
  turns them; this is the flow field behaving at a boundary, not a
  rendering error.

## QA

- Rendered the actual script with node ~/workspace/tools/render-piece.js at
  1280x900, 390x844, and 720x720; all three renders read and inspected.
- Desktop: mid-dissolve frame, wavefront seam mid-frame, ribbons tracing
  cloud and boulder contours on the dimmed left half, full photo on the
  right, plates legible ("Real to Synthetic", "2006 · 08 · 31",
  "Watch only.").
- Mobile: scene full-bleed, horizon at the golden third, ribbons and photo
  both readable, plates legible with no clipping.
- Thumb (720x720): same composition, both readings and plates read clearly
  at thumbnail size.
- Fix rounds: (1) first build drew ribbons invisible against the matching
  photo colors, so the dimmed simulation ground was added and ribbon width
  raised; (2) fractional cell rects left a fine antialiased grid across
  the photo, so cell rects were snapped to integer pixel edges (verified
  by pixel sampling: zero periodic minima in a sky row); (3) particles
  piled into a vertical scribble at the left edge, so the flow is damped
  toward the wall near scene edges.
- Determinism: frame one uses fixed t = 15 and seed 940 only; verified by
  drawing t = 15 twice in node and comparing buffers byte-identical.
  Wavefront probe: t = 0 front 0.000, t = 15 front 0.500, t = 30-90 front
  1.000, t = 105 front 0.500, t = 120 front 0.000, t = 135 front 0.500.
- Acceptance numbers: 240 ribbons, 6 clouds, 3 boulders, 48-step
  trajectories, 12-point streaks, about 26,000 photo cells, 120 s cycle
  (30 dissolve + 60 hold + 30 bleed-back), frame one at t = 15.
