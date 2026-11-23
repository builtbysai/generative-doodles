# №1103 — The Emotional Machine

onformative study block OF8 (PP264): the studio's doctrine — "we are guided by an
emotional approach" — as a piece. A dark room holds a soft particle nebula. A
visitor enters; the field notices and brightens toward it; the visitor stays and
the field warms, cold blue shifting to violet-teal as the particles organise
into slow spirals (the campfire dynamic). The visitor leaves; the field cools
and diffuses, slowly forgetting. The emotion is in the physics only: no face,
no heart glyphs, no symbols.

## Mechanics

- **Simulation.** Fixed-timestep sim (dt = 1/60), 500 particles, seeded
  (mulberry32, seed 1103). Frame one is the state after a **fixed synchronous
  pre-roll of 20 simulated seconds (1200 steps)**, so the first frame is
  deterministic and byte-reproducible; the live loop continues the same sim
  from that state via a guarded rAF accumulator.
- **Warmth.** Two coupled parameters. Global warmth W rises at +0.02/s while a
  visitor is present and decays at −0.008/s while absent. Per-particle local
  warmth rises near the visitor (rate 0.16/s inside a 0.34 radius) and decays
  slowly elsewhere (0.012/s) — warmed regions linger as a memory trail along
  the visitor's path, then are forgotten. Particle colour is a per-particle
  lerp from shy blue #1A2A4A to a violet #7A5CFF → teal #3DF5C0 hue (chosen by
  seed); drawn colour also takes an instant "notice" term from current visitor
  proximity, so the field visibly brightens around the dot. Room wash #3A2E5F
  alpha follows W. No canvas gradients anywhere — softness is layered
  flat-alpha circles.
- **Forces.** Baseline smooth curl drift; attraction to the visitor with
  strength ramping in W; a tangential (spiral) force scaling with W, so
  organisation literally increases with confidence; velocity damping, speed
  clamp, soft centre containment.
- **The visitor.** Watch-only default: an autonomous bright dot wanders a
  closed Lissajous path on a 60 s loop with presence windows (enters ~2 s,
  fully present 8–32 s, leaves by 38 s), so the field warms and cools on its
  own. At the pre-roll's end (loop t = 20 s) the visitor is mid-visit and
  global warmth W ≈ 0.26 — frame one shows a mostly shy-blue nebula with a
  warmed violet-teal spiral gathered along the visitor's recent path around
  the dot.
- **Interaction.** Drag is the piece: pointer-down makes the pointer the
  visitor (presence eases in/out, never a sudden switch); particles gather
  and spiral around it, warmth builds the longer you stay, and on release the
  autonomous visitor resumes and everything slowly cools. Silent — no audio
  is specced.

## House rules applied

Canvas sized from the Visual Viewport API with resize listeners on both
visualViewport and window; canvas CSS size pinned in draw(); phone detection
via window.screen (min dimension < 700) with aspect-ratio fallback; full-bleed
field composition; no offscreen canvas, no ctx.filter, no shadowBlur, no
createElement; rAF typeof-guarded. No visible text except the title.

## QA

Rendered with the house renderer at 1280×800 (qa-desktop.png), 390×844
(qa-mobile.png) and 720×720 (thumb.png). Thumb rendered twice and compared
with cmp: byte-identical; duplicate deleted. Frame-one read: near-black room,
soft shy-blue dots across the frame, a vivid violet-teal warmed cluster
spiralling along the visitor's path with the small bright white visitor dot
at its head.
