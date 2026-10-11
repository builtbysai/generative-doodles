# №9063 · Loom — process notes

(Replaces Oxbow, 2026-10-11, at Hans's direction. Same number and date slot.)

## Concept

A geometric thread construction — deliberately no noise fields, no walkers,
no dots, no rings. Anchors are placed on three nested ellipse rings
(eccentricity seeded per piece), jittered once. Then 210–260 threads are
strung between anchor pairs with a minimum angular separation so nothing
is a stub. Each thread is a quadratic bezier whose control point is pulled
toward the centre by a seeded "tension" in [-0.35, 0.9]: slack threads bow
outward past their chord, taut ones cut nearly straight across.

Threads are translucent (alpha 0.05–0.11) iron-black, with ~14% indigo for
depth. Drawn longest-first so crossings pile into moiré densities near the
middle. Nine gold warp threads (alpha 0.35–0.55, width 1.8–2.6) run over
the top, like a weaver's pattern thread above the weft. Everything is
clipped to a 7% margin rect; bone ground (#e9e2cf); 1px paper grain.

The character comes from the ellipse: wide flat rings make the piece read
as a horizon-bound weaving; rounder seeds read as a wheel. Click reseeds.

## Construction

- Single self-contained `index.html`, canvas 2D, no libraries. mulberry32
  PRNG; every random choice flows from one stream in fixed order, so a seed
  redraws identically (resize is stable).
- Anchor rings: fractions 0.94 / 0.66 / 0.40 of the half-min-dimension,
  counts 24–30 / 18–22 / 12–16, per-anchor angle and radius jitter.
- Pairing: `ib = (ia + ri(7, n-7)) % nA` guarantees real spans.
- DPR capped at 2; debounced resize redraw; click advances the seed with
  an LCG step and redraws.
