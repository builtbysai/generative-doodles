# Smoke (Four-Colour Catastrophe) — №1227

Leslie Supnet study block LS4 (PP386), after her 2014 film Smoke.

## The piece

A scanned disaster image — a procedural volcanic plume, ink-drawn, not
photographic — that the viewer zooms into until the image dissolves into
its own four-colour offset printing process: CMYK rosette dots bloom,
registration shifts, and the catastrophe becomes pure print pattern.
Supnet: "Distancing makes catastrophe a lot easier to digest." Here
closeness dissolves it instead. No real event, no photojournalism — the
mechanics of seeing catastrophe, not a specific one.

Untouched, the print auto-drifts: over a 90-second cycle the zoom rises
in log space to 12x, holds, falls back to 1x, and rests. A vertical drag
takes the zoom over directly (200 px of upward travel multiplies the
zoom by 4, anywhere in the 1–40x range); double-tap returns to 1x and
restarts the drift. Six seconds after a drag ends, the drift quietly
resumes from whatever depth the visitor left it at, re-entering its
cycle on the rise limb at the matching level.

## The plume, as data

The plume is a density field D(x, y) in [0, 1] over a unit plume space
(x in [0, 0.8], y in [0, 1]), computable anywhere, fully deterministic:

- 14 radial blobs — a five-blob column wandering slightly as it rises,
  an eight-blob billowing cap, a base mass — each with small hashed
  jitter on centre and radius, fixed at load. Falloff is (1 − q)².
- The sample point is displaced by two value-noise fields (±0.03), so
  the plume's edge boils instead of sitting in perfect circles.
- The sum is soft-thresholded ((F − 0.16) / 0.78, then a smoothstep
  curve), modulated by a fine noise for ink texture, and folded
  together with a vent cone (apex (0.40, 0.90), base half-width 0.085)
  and a ground band below y = 0.962.

At low zoom the field is printed as ink: a 6 px cell grid, coverage
quantized to 8 flat alpha levels of ink #3A3733 — a print feel, never a
smooth wash. A hairline plate mark borders the print; hashed paper
grain (650 specks) lies over the whole page.

## The four-colour regime

Each channel is a separation of the same field, sampled at its own
registration error and printed as dots on its own rotated grid —
classic screen angles (C 15°, M 75°, Y 0°, K 45°), per-channel phase
offsets so the grids interleave into rosettes, dot radius
s · 0.72 · sqrt(Dc) on a screen-space spacing s (min(print w, h) / 46,
clamped 9–15 px). Registration grows linearly with zoom — C (+0.35,
+0.12)·z px, M (−0.30, +0.24)·z, Y (+0.16, −0.28)·z, K the reference at
(0, 0) — so at 40x the separations sit up to 14 px apart, visibly torn
from each other. Dots are clipped to the plate.

Regime weights run along log zoom: the ink print holds full to 6x and
is gone at 20x. The dots first stir at 4.5x — early in the blend they
are drawn fainter and smaller (alpha and radius scaled by the dot
weight), so the breakup shows first along the density edge, where dots
land on paper and mid-tones, while solid ink still reads as ink. From
20x the image is gone and only misregistered rosettes remain.

As the zoom deepens, the sample window (plume-space aspect locked to
the print rectangle's 0.8) shrinks around a centre that travels from
the plume centre (0.40, 0.50) at 1x to the dive target at 40x:

- **Dive target: (0.60, 0.295)** — the cap's right edge. Probed
  numerically over the 40x window: D runs 0.15 to 0.69 there, mean
  0.41 — a full mid-tone gradient inside one tiny window, the richest
  ground for rosettes. (The first candidate, (0.575, 0.30), probed at
  mean D = 0.87 — nearly solid — and was moved.)

## Timing choice

Smoke is a scan/print piece, not one of Supnet's stepped film loops, so
the drift moves gently and continuously in log space. The rendered
drift phase is nonetheless quantized to 12 steps per second — a
print-scan stepping that keeps every frame a pure function of piece
time. The drift itself: rise over 32 s with an ease-out on log z
(1 − (1 − p)²), hold to 50 s, fall over 32 s (1 − q²), rest to 90 s.

## House implementation notes

- Canvas sized from the Visual Viewport API with resize listeners on
  both visualViewport and window; CSS size pinned in draw(); phone
  detection via window.screen physical size (min dimension < 700 px)
  with aspect fallback. The print is a vertical-format rectangle
  (aspect 0.8) centred in the frame at every size; on phones it fits by
  width and sits in a field of paper.
- Determinism: the synchronous first frame is drawn at the fixed phase
  T0 = 14 s; the rAF loop (typeof-guarded) is anchored at that phase
  plus elapsed time. Seeded hashes only; no random calls.
- Zoom state is closed-form: visitor drags and resets are recorded as
  events and walked at draw time (drift epoch / user level / 6 s
  resume), never frame-integrated. The in-progress drag previews from
  its recorded start level.
- No canvas gradients, no canvas filters, no shadow blur, no created
  elements, no pixel-buffer or offscreen-canvas APIs, no microphone,
  no audio. Plume ink #3A3733 on paper #E8E2D4; process dots cyan
  #2AA9DE, magenta #E03A8B, yellow #F2D024, black #1A1A1A. No visible
  text beyond the title.

## QA

- Frame one (T0 = 14 s; drift verified numerically: z = 5.47):
  qa-desktop.png (1280×800), qa-mobile.png (390×844) and thumb.png
  (720×720) all show the same read — the plume's cap-and-column mass
  as stepped ink levels on paper, solid at upper left, grading
  diagonally down to bare paper at the lower right, with faint CMYK
  dots blooming along the density edge where the print begins to
  break up. The plate mark and paper grain are visible; the mobile
  render holds the identical composition, print fitted by width.
- thumb.png rendered twice and compared with cmp: byte-identical
  (re-verified after the final dive-target edit).
- Off-phase check 1 (temporary copy, peak raised to 40x and phase set
  to the hold, discarded): at z = 40 the frame is nothing but
  misregistered rosettes — K, yellow, magenta and cyan dots clearly
  separated from one another, density grading from heavy at lower
  left to open at upper right, no trace of the plume image.
- Off-phase check 2 (temporary copy at T0 = 85 s, the drift's rest,
  discarded): at 1x the whole plume reads at once — billowing cap,
  wobbling column, base mass and vent on the ground band, plate mark
  around it.
- Token grep over index.html for random calls, element creation,
  pixel buffers, offscreen canvas, microphone, audio, shadow blur
  and gradient constructors: clean.
