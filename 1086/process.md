# №1086 "PolyNodes" — Tatsuya Ishii study block TI7

Ishii's UE4 seat on Continuum Resonance as a pure piece. A network of small
faceted polyhedra — tetrahedra and octahedra, never dots — drifts in dark
volumetric space, knitted by thin proximity lines. At the center sits the
conductor: every six seconds it flashes magenta and throws an expanding
ring, and the pulse travels outward node to node along the connections, each
edge adding its own latency, so the wavefront's edge is always visible
crossing the web. Watch-only; no interaction, no audio.

## How it works

- **Seeded network.** 53 nodes (mulberry32, seed 1086): the conductor at the
  exact center plus 52 anchors laid out in polar form with a radius^1.35
  falloff, so the web is dense at the center and sparse at the edges. Each
  node carries a seeded type (tetrahedron or octahedron), a depth scale, a
  rotation phase, and drift phases.
- **Closed-form drift.** Positions are layered sines around the anchors;
  every frequency is an integer number of cycles per 45 s loop, so the
  motion loops seamlessly and nothing is frame-integrated. Edges are pure
  proximity pairs under a threshold, recomputed from the live positions each
  frame — the network visibly re-knits as it drifts.
- **Wavefront with per-edge latency.** Graph distance from the conductor is
  precomputed by BFS over the seeded anchor layout at the same threshold.
  A pulse emitted at time E reaches node k at E + dist(k) × per-edge
  latency, the latency seeded per node (90–180 ms effective per edge — the
  brief's 60–120 ms band, steepened slightly so the front stays legible
  against the decay). Node brightness is a closed-form exponential decay
  from its arrival time; a segment lights in cyan at 0.8 alpha × the lesser
  of its endpoints' brightness, i.e. once the front has crossed both ends.
- **Conductor and ring.** The conductor is a larger magenta octahedron,
  drawn last, on top. Each emission also throws two stroked rings (magenta
  over a wider faint cyan) whose radius is a closed-form function of time
  since emission, fading over ~3 s. Emissions land every 6 s; two pulses
  are alive in the decay tails at any moment, max-combined.
- **Bodies and glow.** Polyhedra are drawn as rotated silhouettes split
  into facets radiating from an offset inner point, alternating shade
  factors; facet color mixes the body #0F1622 toward the signal color
  (#35E0FF, #FF4FD8 for the conductor) with brightness. Glow is layered
  flat-alpha discs behind the body, gated to genuinely lit nodes. No
  gradients anywhere.
- **Edge fog.** Four nested flat-alpha bands of #0A0F18 around the stage
  rim — a faint haze at the frame edges, layered shapes only.

## House rules applied

- Canvas sized from the Visual Viewport API with resize listeners on both
  visualViewport and window; canvas CSS size pinned in draw(); phone
  detection via window.screen physical size (min < 700) with aspect
  fallback. Centered square stage on the void-colored page ground; nodes
  scale up slightly on phones.
- Determinism: the first frame is drawn synchronously at the fixed phase
  t = 12.55 s — 0.55 s after the 12 s emission, the wavefront mid-network,
  ring up, near nodes lit, far nodes dark. The rAF loop is guarded by a
  typeof check and anchored as phase + elapsed.
- No audio (none specced), no interaction handlers, no visible text beyond
  the <title>, no gradients, no offscreen canvas, no ctx.filter, no
  shadowBlur, no createElement.

## QA

- Rendered with the house renderer at 1280×800, 390×844, and 720×720.
- Thumb rendered twice at 720×720 and byte-compared with cmp: identical;
  duplicate deleted.
- Frame one: dark #05070D space filled with a web of thin #2A3446 lines
  joining small faceted polyhedron nodes in #0F1622; the magenta conductor
  sits at center with its expanding ring around it; nodes and segments
  near the center burn cyan, fading to dark unlit polyhedra at the
  wavefront's edge and the sparse periphery; faint fog bands at the rim.
  Mobile keeps the whole square legible and centered, nothing clipped.
- One refinement round: the first build lit nearly the whole web at frame
  one and buried the conductor in the central knot — per-edge latency was
  steepened, the brightness decay shortened, the proximity threshold
  tightened, glow halos weakened and gated, and the conductor enlarged and
  drawn last.
