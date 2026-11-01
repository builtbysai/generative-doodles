# №1170 — Satromizer

Jon Satrom study block JS3, after the *Satromizer* plugin (2001, Jon
Satrom with Ben Syverson / PoxParty) — the wrong tool built instead of the
tool learned. A fake plugin panel docked over a calm landscape, and every
control on it genuinely works on the image.

## Composition

A serene procedural dusk fills the frame: ten discrete flat sky bands from
`#0B1026` to `#2A1A3E` (flat steps, no canvas gradient), a round orange sun
`#FF9E4F`, sparse pinprick stars, three flat clouds and two tiny bird
glyphs drifting slowly, and three layered hill silhouettes in dark violet
and ink-teal. Docked at the right, always visible, is the plugin panel
(`#141416`): header "SATROMIZER / WRONG TOOL · EST. 2001", a BYPASS switch,
five sliders with per-slider accent colors, and a footer render-queue
readout. On phones the panel overlays the right at reduced width and the
sun's radius is capped so the disc stays inside the narrower landscape.

## The wrong tool works

There is no offscreen canvas and no ImageData. The landscape is a pure
function `sceneIdx(u, v, te)` returning a palette index (sun distance
measured in pixels, so shapes stay round at any aspect), sampled once per
frame into a grid of ~5px cells. The five corruptions are then applied to
that grid in the data, as source-coordinate warps composed into a single
lookup per display cell, run-length batched by final color:

- **SMEAR** — each 8px row band has a seeded rate (0.15–1.0); the band
  samples from `smear × rate × 16%` of the width further left, so content
  drags right and the vacated edge clamps into a stretched smear.
- **TEAR** — seeded vertical slices (5–14% of the width each) sample from
  rows displaced by `tear × offset × 9%` of the height, ripping the image
  along slice boundaries.
- **CHANNEL** — the displayed color is composed per channel: R read from
  the grid sample up to 3 cells left of the G sample, B from up to 3 cells
  right — a true split, so flat shapes grow green/red fringes and single
  star cells separate into RGB pinpricks.
- **STUTTER** — the landscape's own clock is quantized:
  `te = floor(t / step) × step` with `step = 0.12 + stutter × 0.5`, so
  clouds and birds advance in holds while the panel stays live. It is a
  temporal corruption — invisible in any single frame by design.
- **DECAY** — each column has a smooth seeded drip profile; a display cell
  samples from `drip × decay × (y/H) × 26%` of the height higher up, so
  the image melts downward, the melt growing toward the bottom.

**BYPASS** zeroes all five warps (and un-quantizes the clock) instantly
and the header flips to "BYPASSED — CLEAN SIGNAL" in yellow. Dragging a
slider rewrites its warp live; double-tapping a slider snaps only that
one back to zero. The footer readout — `RENDER QUEUE: nn% CORRUPTED` with
a queue bar — shows the mean of the five sliders (0% while bypassed).
Frame-one defaults (45/30/50/25/35) give 37%.

## Determinism and house rules

- First frame drawn synchronously at fixed phase T0 = 7.3s with the
  default slider values; the rAF loop is typeof-guarded and anchored as
  T0 + elapsed since load. All randomness is a seeded mulberry32 table
  built once at load.
- Canvas size from the Visual Viewport API with resize listeners on both
  `visualViewport` and `window`; `canvas.style.width/height` pinned in px
  on every draw. Phone detection via `window.screen` physical size
  (min dimension < 700px) with the `h > w·1.15` aspect fallback.
- Flat colors only: no gradients, no `ctx.filter`, no shadowBlur, no
  offscreen canvas, no audio, no microphone. The only text is the specced
  plugin chrome (title, slider labels, BYPASS, render queue).
- QA: thumb rendered twice at 720×720 and byte-compared (`cmp` identical);
  desktop and mobile renders read by eye; the BYPASS knob position
  verified at native resolution (left = off at load). Throwaway probes
  (deleted after) verified the pipeline end to end: all sliders at 0
  render the perfectly clean scene with "0% CORRUPTED" — the same frame
  BYPASS produces — and all sliders at 100 shred the sun into torn,
  smeared, fringed spikes over drip-melted hills at "100% CORRUPTED".
