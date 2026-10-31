# No.651 "Tacitas"

EXPANSION #79 francisco-gazitua, prompt block 3 "Tacitas". His "Piedras
Tacitas, mi version" (2025) as a rain instrument: a stone slab seen from
above, its carved cupules placed by a star rule, filling with sky one by
one as a rain band sweeps across.

## Concept

A dark granite slab fills the frame edge to edge. On it, 17 to 21
hemispherical cupules sit where bright southern stars sit on a chart:
the Cruz del Sur, its Pointers, and the other first-magnitude southern
stars. A flat translucent band of rain crosses the slab over forty
seconds; every cupule the band passes fills with flat sky-water and
holds it, wearing a gold ring for the one second it takes to fill. When
all are full the slab rests, then the water drains away in reverse fill
order over ten seconds and the cycle begins again. Dragging sweeps the
band by hand, tapping a filled cupule ripples it, and a double-tap
reseeds the constellation under a new rotation of the same sky.

## Construction

- Star table: 21 bright southern stars encoded with schematic chart
  coordinates (x right, y down, 0..1, after a standard south-facing
  star chart) and their real visual magnitudes: the Southern Cross five
  (Acrux 0.8, Mimosa 1.3, Gacrux 1.6, Imai 2.8, Ginan 3.6), the Pointers
  (Alpha Centauri -0.3, Hadar 0.6), Canopus (-0.7), Achernar (0.5),
  Fomalhaut (1.2), Antares (1.1), Miaplacidus (1.7), Al Nair (1.7),
  Avior, Atria, Peacock, Kaus Australis (all 1.9), Shaula (1.6),
  Delta Velorum (2.0), Regor (1.8), and one fainter filler (2.2).
  Positions are never scattered by hand or by raw RNG; a constellation
  is the catalog under a seeded transform only.
- Constellation build (mulberry32, seed 651001 + index x 7919): flat
  stone-shading polygons first (small irregular blobs hugging the map
  edges, drawn at alpha 0.055 light / 0.10 dark), then a quarter-turn
  rotation plus a small seeded angle, an optional mirror, a shuffled
  subset of 17 to 21 stars, and per-star jitter of at most 0.008.
  Cupule radius follows magnitude: r = 0.014 + 0.020 x (3.9 - mag)/4.6
  of the map size, so Canopus is the largest bowl and Ginan the
  smallest.
- Cupule rendering: a dark disc (#1A1A1C), a granite rim arc
  (#8A8A8C, the study's granite, used as the slab tone lightened) on
  the upper-left lip, and a ground-tone shadow arc inside the lower
  right. Held water is a flat disc (#7FB3C8) at 0.78 of the bowl
  radius scaled by the fill fraction.
- Cycle: 58 s timeline. Sweep 0-40 s (band center travels from just
  off the left edge to just off the right, hard-edged strip at alpha
  0.13 with edge lines and faint streaks, never a gradient; a cupule
  starts filling when the band center passes its center, growing its
  water disc over 1 s under a gold ring at #D9A441). Rest 40-48 s.
  Drain 48-58 s: cupules empty over 0.6 s each, staggered in exact
  reverse fill order. The simulation advances in 0.05 s substeps, so
  fill moments are identical in the live loop and in forced renders.
- Interaction: drag moves the band (it holds where left for 3 s, then
  the sweep resumes; filling only happens in the sweep phase); tap on
  a full cupule fires one flat expanding water ring (1.6 s); two taps
  within 350 ms and 40 px reseed the constellation and restart the
  cycle. No click-to-reload anywhere.
- House rules: canvas sized from the Visual Viewport API with resize
  listeners on visualViewport and window; canvas style pinned in px
  inside draw(); phone detection via window.screen (min dimension
  under 700 px) with the h > w x 1.15 aspect fallback; the square star
  map is fitted to the smaller frame dimension and centered, so the
  phone frame keeps the whole constellation. Frame one is the
  synchronous draw at t = 0: slab, all cupules empty, band just
  entering at the left edge. No Date.now, no Math.random, no
  offscreen canvas, no filters, no audio. The rAF loop is anchored on
  the first rAF timestamp and typeof-guarded.
- QA hooks (inert in normal viewing): ?seed=t<seconds> freezes the
  synchronous frame at that elapsed time after running the simulation
  to it; ?seed=<n> opens constellation n.

## QA log

- Rendered with the house renderer at 1280x900 (qa-desktop.png),
  390x844 (qa-mobile.png), 720x720 (thumb.png). Frame one reads back
  correct at all three sizes: slab edge to edge, 18 empty bowls with
  the granite rim light on the upper left, the Southern Cross cluster
  legible at center, the rain band just entering at the left edge,
  nothing clipped on mobile (map centered, scaled to the narrow
  frame).
- Determinism: thumb.png rendered twice and byte-compared with cmp:
  identical. Second render deleted. Grep confirms zero Date.now,
  Math.random, createElement, AudioContext, external URLs, em dashes.
- Forced mid-fill check: rendered at t = 20 s via the seed hook to a
  throwaway file in /tmp and read back. It shows the band mid-frame
  with hard edges and streaks, every cupule left of the band filled
  flat sky, and the cupules at the band's wet edge wearing the gold
  filling ring with their water discs part-grown (three rings visible
  at once where the Cross cluster crosses the band inside the same
  second; each cupule's own ring lasts exactly its 1 s fill).
  Throwaway render deleted after inspection.
- Fix round: the first stone-shading polygons were generated as
  unordered vertex chains and stretched across the whole slab as long
  thin streaks. Regenerated as small angular-ordered blobs around
  edge-hugging centers; all renders redone and byte-compare re-run.
- Deviation: the rim arc uses granite #8A8A8C, which is in the
  francisco-gazitua study palette family (the raw granite of PP4) but
  is an addition to this block's listed colors; the brief explicitly
  directed it as the slab tone lightened, and it is recorded here.
  No other deviations.
