# No.1664 Chaos Game (27)

Study #219 jos-vromans, prompt PP911 (JV1). Gallery date 2006 · 08 · 02.
Silent. Watch only.

## Driver

One triangle, one drifting parameter, and a crystal that keeps melting
toward noise and rebuilding.

## Mechanism

A classic chaos game on one triangle, drawn as single-pixel dots on
pure black. The step fraction p is a closed-form slow sine of dot
time: p = 0.725 - 0.225 * cos(2 * pi * tau / 120), so p sweeps 0.5 to
0.95 and back over a 120 second period. Dots land at 500 per second
of piece time; the global dot index is a pure function of piece time
(K = 9000 + 500 * t), and the vertex at each step comes from a
fixed-seed LCG (seed 20190827), never Math.random(), so frame one is
reproducible. Only the most recent 22,000 dots stay on screen, so as
p drifts the old figure falls away and the new one accumulates in its
place: the pyramid grows, sprouts satellites, merges, overlaps
itself, and collapses toward lace and then toward three white vertex
clusters at the p extreme, then rebuilds as p returns. Dot color is a
closed-form function of p, in 48 buckets: golden ochre (#D9A441) at
p = 0.5, through iron red (#B33A2B) as p climbs, to white at p = 0.95.
Dots are drawn at alpha 0.6 so overlaps build a stipple glow. The
triangle is one large centered figure, 80 percent of the smaller
viewport dimension, with generous black margin. All time-varying
terms run at or below about 0.01 Hz, so flicker stays well under 14
Hz by construction. Reduced motion renders one still developed
frame.

## Interaction

Watch only. No interaction; this is a phenomenon to witness. No tap,
no drag, no reload.

## Asserted counts

- Frame one (t = 0): 9,000 dots landed, p spanning 0.5 to 0.593, a
  recognizable golden pyramid mid-build.
- Sweep: p = 0.5 at tau = 0, 0.725 at tau = 30, 0.95 at tau = 60,
  0.725 at tau = 90, 0.5 at tau = 120. Period 120 s.
- Window: 22,000 dots held; probe at t = 60 shows simK 39,000 with
  22,000 dots on screen; at t = 120 simK 69,000, still 22,000 dots.
- Probed renders: t = 30 shows the pyramid sprouting satellites and
  merging, gold with red and white streaks; t = 45 shows the lace
  collapse toward the vertices in red and white; t = 60 shows three
  pale vertex clusters, the noise extreme; t = 120 shows the golden
  pyramid rebuilt.

## Deviations

- The prompt holds point count constant so the visible change is
  shape, not density. The build holds a constant 22,000-dot sliding
  window once the field is built (the first 26 seconds accumulate
  from 9,000), so the on-screen count is constant through the sweep
  and the visible change is shape, exactly as specified.
- The prompt's frames f01, f18, f19 are three stops on one sweep;
  the build's sweep reproduces them as states of the same continuous
  cycle (golden at p = 0.5, red field near p = 0.8, white lace near
  p = 0.95) rather than as three separate stills.
- Vertex choices are a fixed-seed LCG, not a live random source, so
  frame one is byte-comparable; the prompt's engine is described as
  running live, but the gallery determinism gate requires the fixed
  seed.

## QA

Rendered from the actual script with node-canvas at 1280x900
desktop, 390x844 mobile, and 720x720 thumb; all three inspected.
Frame one reads as a golden Sierpinski pyramid mid-build on black,
with legible title, date, and hint plates at every size. Sweep
probed at t = 30, 45, 60, 90, and 120: the melt and rebuild arc
renders as specified. Thumb re-rendered a second time:
byte-identical (md5 e56791c50e5e91d33b30a7a416a86b50).
index.html md5 98ba3118d5127fc92237e724d4a5a260.
