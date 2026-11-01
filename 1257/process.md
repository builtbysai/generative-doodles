# №1257 — Soil/Soul Zoetrope

Esther Hz study block EH2, after *Soil/Soul* (2023, BMOCA agriCULTURE):
record player + foam core + paper + cardstock animating Steiner's BD500
cow-horn manure ritual — the horn "radiates astrality"; cosmos above,
micro-activity below.

## What it is

A hand-cranked paper zoetrope drum standing in a dark, star-speckled room.
Around the drum runs a strip of 12 paper frames telling one small ritual
in cross-section:

- **Frames 0–3** — a cream cow-horn stands over its pit under a wheeling
  sky (nine stars and a moon sliver step one notch per frame), then sinks
  into the soil in four steps.
- **Frames 4–7** — the horn is buried; a mound rises over it and
  "astrality" sparkles lift off the mound, more each frame.
- **Frames 8–11** — green roots drink downward from the buried horn, one
  growth step per frame, until at frame 11 the centre root reaches the
  faint star waiting at the bottom of the soil: cosmos below, answering
  the cosmos above.

## House adaptation

The prompt's pre-rendered frame strip becomes **shape programs**: each
frame is drawn by code (`drawScene(k)`) from its phase index — no
offscreen canvases, no image buffers. The drum is drawn as a wide
cylinder band; the front five frames ride it as trapezoids keyed to the
drum angle, side frames narrowing with the curvature. The slit mask is a
fixed dark bar layer clipped to the band, with gaps where the five front
frames rest; toggled off, it is drawn lifted above the drum on two posts.
The mask never rotates — the strip slides behind it, so mid-spin the
frames chop and judder through the slits, and the animation only truly
resolves at step positions. Honest mechanics over smooth tweening.

## Crank / coast model

There is **no auto-play**. The drum's angle θ is pure event-driven
physics:

- **Drag near the crank** (within 0.30 × drum width of the axle): circular
  cranking — θ follows the pointer's angle around the axle, unwrapped.
  Clockwise spins forward, counterclockwise reverses.
- **Drag anywhere else**: pushing the drum — θ += Δx / Rx × 1.2.
- **Release**: ω is taken from the recorded drag samples (clamped to
  ±6 rad/s), then the drum coasts on the closed form
  θ(t) = θ_r + ω·τ·(1 − e^(−(t−t_r)/τ)) with **τ = 1.2 s**, settling when
  |ω| < 0.02 rad/s. Frame rate is spin speed by construction: the centred
  frame index is round(θ / STEP), STEP = 2π/12.
- **Tap** (pointer released without drag): toggles the slit mask.

Frame one is the drum **at rest**: θ = 0, mask on, crank in its rest
pose, frame 0 centred — horn above ground, stars at their start notch.
The first frame is drawn synchronously at that fixed phase; the rAF loop
(guarded by a `typeof` check) only takes over in a real browser.

## Craft notes

- Palette exactly as specced: soil umber #4A3423, horn cream #E3D3B8,
  star white #F5F2E8, root green #5E6B3F, strip paper #D8CDB4, drum dark
  #2A2419.
- The soil speckle field is seeded frame-independently, so the ground
  never jumps between frames; only stars, horn, sparkles and roots step.
- The stars outside the drum are the room's, and never move.
- No gradients, no canvas filters, no shadowBlur, no ImageData or
  offscreen canvas, no audio. Seeded hashes only; no Math.random.
- Canvas sized from the Visual Viewport API with resize listeners on
  both visualViewport and window; CSS size pinned in draw(); phone
  detection via window.screen (min dimension < 700) with an aspect
  fallback — on phones the drum keeps its shape, slightly left-shifted
  so the crank stays in frame, and the page ground is the room colour.
- No visible text anywhere except the `<title>`.

## QA

- `qa-desktop.png` (1280×800), `qa-mobile.png` (390×844), `thumb.png`
  (720×720) rendered with the house node-canvas renderer.
- Thumb rendered twice and `cmp`-verified byte-identical.
