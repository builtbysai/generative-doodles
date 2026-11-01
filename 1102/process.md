# №1102 — Zephyr's App

Onformative study block OF7 (PP263): the Zephyr collaboration (2017) as a
piece — the tool, not the sculpture. A 60 m ceiling band of wind-blown steel
sweeps full width across the upper two-thirds, seen from below, but shown
mid-authorship: faint cyan control ghosts hover at six key segments, as if
the artist's app is still tuning the wind. The deliverable is the instrument.

## Construction

- **The band.** Sixty blade segments chained along a gently undulating
  spine. Each blade is a rounded capsule quad (three stroked passes: shaded
  body, a narrower lit face offset toward the light, a thin white highlight
  spine) in warm-white steel `#E8E4DA`; brightness follows the blade's angle
  to a fixed light from the upper left, two flat tones per blade — no
  gradients anywhere. Blade length jitters per segment from a seeded rng, so
  the sweep stays organic, never machined.
- **Wind, closed-form.** Every blade angle is an analytic function of t:
  a seeded sine-curl field (four sine terms over normalised position and
  time), a ripple travelling along the band whose depth and speed grow with
  wind strength, and a **weather envelope** on a seamless 45 s loop — raised-
  cosine bumps give calm → gust (t≈13 s) → storm (t≈27 s) → calm, and the
  field's amplitude and churn scale with that envelope. Sixteen seeded
  streamlines are traced through the same frozen field each frame and drawn
  as thin `#8A9BA8` wind-lines streaming across the dark ground.
- **Control ghosts.** At segments 5, 15, 25, 34, 44, 54 a ghost handle
  hovers above its blade at global alpha 0.35 in `#4AE3FF`: a small ring with
  a cross pin, a dashed link down to the blade it tunes, and a tick showing
  the target angle the app is steering toward. Ghosts, not a UI panel — no
  sliders, no buttons, no text.
- **Drag to compose.** Pointer drags are recorded as events. Horizontal
  drag sets a wind-direction offset (up to ±1.05 rad across the frame
  width); vertical drag sets gust strength (drag up = stronger). The
  override ramps in over 1 s while dragging and eases back out over 2.5 s
  after release; angle and strength at any t are evaluated closed-form from
  the event list — nothing is frame-integrated, so the unattended piece is
  exactly reproducible.
- **Determinism.** Frame one is drawn synchronously at the fixed phase
  t = 16 s — inside the gust, the band mid-ripple. The rAF loop
  (typeof-guarded) continues from that phase. No state can desynchronise.
- **House rules.** Canvas sized from the Visual Viewport API with resize
  listeners on both visualViewport and window; canvas CSS size pinned in
  draw(); phone detection via window.screen physical size (min dimension
  < 700 px) with aspect fallback — phones get slightly shorter blades, the
  band still sweeps full width. Silent: no audio of any kind. No offscreen
  canvas, no canvas gradients, no ctx.filter, no shadowBlur, no
  createElement. The only text is the <title>.

## QA

Rendered with the house renderer (node-canvas): qa-desktop.png 1280×800,
qa-mobile.png 390×844, thumb.png 720×720 rendered twice and byte-compared
with cmp — identical; duplicate deleted. Frame one reads as specified:
dark `#0A0C10` ground, the warm-white steel ribbon sweeping full width
across the upper two-thirds as individually angled blades (flat and
streaming at the left, caught in a steep gust-swirl mid-band, settling
again at the right), all six faint cyan ghost handles hovering at their
segments, and thin wind-lines streaming through the field below.
