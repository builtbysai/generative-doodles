# No.774 Night Torch

EXPANSION #94 mary-corse, prompt block 7 "Night Torch".

## Concept

A huge white inner-band painting on an exterior wall at night, nearly
invisible in the dark. Four wide vertical microsphere bands run down the
wall. A small torch hotspot, its source never seen, rests over the second
band and every 40 seconds makes one slow sweep out to the first band and
back. Wherever the hotspot passes, the bands flare gold-white and the
beaded grain shows; behind it they cool down over about a second and a
half. A faint warm spill pools on the ground under the wall where the
light has been. No flashlight cone, no lens flare, no hand, no torch
object, and the hotspot never turns into a cursor: quiet activation, not
a reveal mechanic.

## Construction

- Single self-contained `index.html`, canvas 2D only, no external assets.
- Palette, strict: night ground #0B0B0D, activated band #FFF9EC, band
  edge flare #F4E0B8, wall #161614, sky #060607 (also the page ground),
  torch white core #FFFFFF. Nothing else.
- Layout: the wall fills the frame horizontally with deep black margins
  above (sky) and below (ground). Four bands tile the wall in unit space
  (left edges 0.03 / 0.27 / 0.51 / 0.75 of the width, each 0.22 wide),
  drawn at rest only a few percent above the wall tone. Band edges stroke
  in the flare tone with alpha driven by each band's excitation.
- Grain: 2,000 microsphere points precomputed once from a seeded
  mulberry32 stream, distributed inside the bands, each with a size, a
  warm-tint tendency, and its own light threshold in 0..0.55, so beads
  condense into view density class by density class as the local light
  climbs, and exist only in the light.
- Idle path: a closed-form 40 s cycle. The torch rests over the second
  band for 32 s, sweeps to the first band over 4 s (smoothstep easing,
  with a slight lift at mid-sweep), and returns over 4 s, arriving home
  exactly at the cycle seam. The path is a periodic function defined for
  negative times as well.
- Afterglow model (path-history, closed form): the torch's effective
  positions are recorded into a sample buffer as it moves (frame and
  release samples, kept for 9 s). Brightness at any point is the
  instantaneous hotspot falloff (pow 1.7 over the pool radius) plus an
  afterglow term: an exponentially weighted average of the same falloff
  evaluated at 25 recorded path samples spaced 0.2 s apart over the last
  5 s, weights exp(-age / 1.5 s), normalized by the weight sum and scaled
  by 1.0. It is a weighted average rather than an accumulating integral,
  so a long rest saturates instead of blowing out. Nothing is carried
  frame to frame as brightness state; every frame recomputes from the
  path log. For times before load the log falls back to the analytic
  idle path, so frame one's afterglow is exact by construction: at t = 0
  the torch has just completed its sweep back from the first band, which
  is why the first band still holds a fading glow while the second band
  burns at full pool strength.
- Rendering the light: the live pool and each ghost position are drawn
  as fine layered alpha discs (24 layers for the live pool, 6 per ghost,
  flare tone outside, band tone mid, white core inside), clipped to the
  union of the four band rectangles so the bands are what ignite; a
  fainter copy of the live pool is drawn clipped to the whole wall so
  the gaps catch a little light too. A band's broad excitation fill uses
  the same light function sampled at the band centre. Ground spill is a
  set of flat ellipses at the recorded x positions along the base of the
  wall, alpha decaying with sample age.
- Drag: the torch follows the pointer with the grab offset recorded (no
  jump, clamped to the wall span). On release the offset decays
  exponentially (tau 2.2 s) back onto the idle path. Every effective
  position, dragged or idle, goes into the same sample buffer, so the
  afterglow trail stays honest under interaction.
- Sizing from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas style width/height pinned in px
  inside draw(). Phone detection via window.screen (min dimension
  < 700 px), aspect h > w*1.15 as fallback only; on phones the wall band
  takes a slightly larger share of the frame height.
- Determinism: frame one is the synchronous draw(0) at load; no
  Date.now, no wall-clock reads, no runtime Math.random anywhere. The
  animation loop is anchored to the first rAF timestamp and rAF is
  typeof-guarded, so the headless QA renderer (no rAF, no AudioContext,
  no createElement, no offscreen canvas, no ctx.filter) draws the same
  first frame and stops.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844
  (qa-mobile.png), 720x720 (thumb.png).
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical, re-verified after the retune below. Duplicate deleted.
- First pass fix: the pool radius (min of 0.52 wall height, 0.36 width)
  was wide enough to wash bands one and three with direct light, and the
  16 coarse disc layers stepped into visible concentric rings, reading
  as a spotlight graphic. Radius tightened to min(0.44 wall height, 0.30
  width), pool rebuilt as 24 finer layers at lower alpha, ghost layers
  likewise, excitation fill softened, afterglow gain raised to 1.0 so
  the first band's fade survives on path history alone. Re-rendered and
  byte-compare re-run green.
- Final read-back: all three sizes show the near-black frame, the second
  band lit warm gold-white with grain showing at the pool, a fading
  afterglow across the first band dying toward its left edge, the third
  and fourth bands near-black, and a faint warm spill pooled at the base
  of the wall. Mobile keeps the wall full-width with the pool centred on
  the second band, nothing clipped.

## Deviations

None from the prompt's substance. Two construction choices: the pool
glow and ground spill are layered flat alpha discs and ellipses rather
than canvas gradients (house no-gradient rule; same soft falloff), and
the afterglow is an exponentially weighted average over the recorded
path rather than an unbounded accumulation, which preserves the 1.5 s
cool-down read while keeping a resting torch from saturating the band.
