# №1122 — RGBCMYKinetic

Joachim Sauter study block JS3 (RGBCMYKinetic, 2015). Five mirror-coated disks
drift in a black void; three spotlights from below (pure red, green, blue)
throw coloured pools onto an invisible floor, and every mixed colour on that
floor exists only because pools overlap additively.

## Mechanism

- **Disks** — five silver ellipses with dark rims and one specular tick each.
  Positions are a closed-form function of t: seeded Lissajous paths in the
  ~40 s family, each disk with its own tilt whose flatness breathes slowly and
  whose static lean shifts its pools sideways.
- **Pools** — for every disk × light pair, the disk's position is projected
  from the light's below-frame source point onto a representative floor line
  in the bottom third. Pool size grows with the disk's height above the floor.
  Each pool is four concentric ellipses of decreasing alpha in the *pure* beam
  colour, drawn with `globalCompositeOperation = 'lighter'`, so red + green
  reads yellow and red + green + blue reads near-white without any mixed
  colour ever being specified.
- **Beams** — stacked translucent triangles from each source up to each disk,
  also under 'lighter', clipped at the floor line so the shafts live between
  floor and disks and never spill under the plane.
- **Shadow cuts** — after the pools, a few dark void-coloured wedges are drawn
  from disk-edge geometry across the floor, slicing the pools where a disk
  edge cuts a beam.
- No canvas gradients anywhere: the soft pool falloff is layered alpha, per
  house rules.

## Interaction

- Watch-only by default: the drift alone breathes and merges the pools.
- Drag a disk to reposition it; the pools follow live, and on release the
  disk eases back onto its drift path through an exponentially decaying
  offset (closed-form in t).
- Double-tap reseeds the drift paths. Never click-to-reload. Silent by design.

## House rules

- Canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; CSS size pinned in draw(); phone detection via
  `window.screen` (min dimension < 700) with aspect fallback.
- Determinism: the first frame is drawn synchronously at the fixed phase
  t = 14.0 s (disks mid-drift, pools merged); the rAF loop, typeof-guarded,
  is anchored at that phase plus elapsed time. Seeded mulberry32 only — no
  Math.random, no wall clock.
- Grep-verified clean: no gradients, no ctx.filter, no shadowBlur, no
  createElement, no offscreen canvas, no audio or microphone APIs. No visible
  text except the `<title>`.

## QA

- Rendered with the house renderer at 1280×800 (qa-desktop.png), 390×844
  (qa-mobile.png) and 720×720 (thumb.png). The thumb was rendered twice and
  `cmp`-verified byte-identical; the duplicate was deleted.
- Frame one (fixed phase 14 s): black void, five silver disks floating at
  varied tilts, faint beam shafts rising to them, and a floor of red, green
  and blue pools whose overlaps produce a yellow merge and a near-white core;
  dark shadow wedges slice two of the pools. A pixel scan of the desktop
  frame confirmed thousands of additive-yellow and near-white pixels in the
  pool band. Mobile keeps the same composition, pools compressed toward the
  centre with the yellow and near-white merges still legible.
