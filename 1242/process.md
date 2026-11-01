# №1242 — Five States of Freedom

Adán De La Garza study block ADG3, after *five states of freedom* (2013–2016), his
collaboration with Christina Battle: at five abandoned military sites they equated a
visual cue with each site's history and toxicity, and set off consumer fireworks —
"flashers" — that illuminated the concrete in bright bursts while leaving the ground
scorched. Here the five sites sit in one pannable night strip, and the visitor is the
pyrotechnician.

## The strip

Five sites, each 70% of the viewport wide, in a world 3.5 viewports across, dragged
horizontally with the offset clamped at both ends. Each site is drawn flat and
procedural in the given palette — night `#0E0F12`, concrete `#6E6F72`, sodium amber
`#E08A2E`, scorch `#050505`, placard chalk `#D8D4C8`:

1. **Bunker** — a concrete mound with a black mouth and door frame, plus a vent pipe.
2. **Silo** — a ground cap: a low concrete dome with hatch and vents.
3. **Radar** — a dish skeleton (rim arc plus four struts) on a latticed tower, with an
   equipment shed. One of its sodium lamps is the strip's only ambient motion besides
   the stars: it dips briefly on a slow hashed step, a failing lamp, not a strobe.
4. **Compound** — a low block building behind a post-and-rail fence.
5. **Watchtower** — crossed-braced legs and a cab with a dark window.

Stars are hashed across the whole world width and twinkle in 0.5 s steps. Every site
carries two tiny sodium edge lamps. A small chalk placard sits bottom-left of each
site: `SITE n — <history fragment>`. At the default seed the fragments are the
documented ones — "FBI raid, 1987", "decommissioned, 1991", "listening post, cold
war", "wildlife refuge, 2005", "subdivisions at the fence line". A double-tap reseeds:
fragments rotate among sites and some are swapped for the alternates ("burned once, on
purpose", "the aquifer remembers", "sold for one dollar"), all by seeded hash, so a
given seed always deals the same histories.

## Flashers and flash discipline

A tap on a site fires one flasher burst there (5-second cooldown per site, measured
from burst start). The burst pattern is hashed per burst: flashes begin after a short
delay, with gaps of 0.30–0.90 s and durations of 0.06–0.11 s (one to two frames), and
the pattern is capped at 9 flashes with the last flash required to end by 3.9 s.
Measured over 2000 generated burst seeds: at most 8 flashes per burst, and at most 3
flash-starts inside any 1-second window — brief irregular illuminations, never a
sustained train above ~3 Hz. Strobes are **visitor-triggered only**; nothing in the
piece flashes on its own, and the first frame is a dark, calm night. On a flash frame
the burst is a hard cut, no fades: the site's concrete redraws mixed 85% toward white,
a white ground-flash ellipse burns under the burst point, a flat white wash lifts the
site's sky and ground, and seven spark lines radiate from the burst point, their angles
and lengths hashed from the flash index so each flash throws different sparks.

## Scorch as evidence

Bursts are recorded as tap events, and everything else is derived. When a burst
completes (tap time + 4 s) a scorch mark appears at the burst point: a hashed cluster
of near-black blotches on the ground. It never fades and is redrawn every frame; repeat
bursts on a site stack its alpha (capped at 0.85), so the ground darkens where the
evidence accumulates. The session also starts with one faint, older scorch mark already
under the bunker — the strip has been used before you arrived.

## Build notes

- Single self-contained `index.html`; no external assets, no sound. Determinism is by
  seeded integer hashes only — no `Math.random`, no gradients, no `ctx.filter`, no
  shadowBlur, no offscreen canvas or pixel buffers. All geometry is shapes; the ground
  flash and lamp glows are layered flat-alpha ellipses, never blur.
- Canvas sizes from the Visual Viewport API with resize listeners on both
  `visualViewport` and `window`; `canvas.style.width/height` are pinned in pixels in
  `draw()`. Phone detection uses `window.screen` (min dimension < 700 px) with the
  `h > w * 1.15` aspect fallback; phones get a smaller placard type size and a minimum
  site width of 260 px so structures stay legible.
- The first frame is drawn synchronously at fixed phase T0 = 0 — rest state, pan at
  zero, sites 1–2 in view, no burst — and the animation loop is guarded by a
  `typeof requestAnimationFrame` check, anchored to elapsed time since load. Frame one
  is byte-stable across renders.
- State that must agree across frames is never integrated: illumination is a function
  of the recorded tap list and current time, and the scorch list is recomputed from the
  same list each frame, so pans, resizes, and reseeds can never desynchronise them.
