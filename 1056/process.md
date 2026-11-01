# No.1056 "Sync Drift" — process

Study #130 hideaki-tai, HT1 / PP217 (multiplex particles 2021, sakura CHORUS 2023 mechanism).

## Concept

A field of about 200 small light nodes, each running its own clock, wirelessly synced to one master beacon. The beacon sits off-center and fires every 12 seconds; an expanding ring travels outward from it, and as the ring passes, nodes correct toward the beacon's phase. Between fires the nodes drift at their own rates, so the field dissolves back into disagreement. Alignment reads as a warm amber wave moving across a sea of gray stragglers, with a few nodes effectively lost. The piece is the chase: the field never locks, and locking would be a failure. Brightness is never decoration; it is phase information, computed from each node's phase error against the beacon.

## Construction

- Field: jittered hex grid (seeded mulberry32 jitter) over a unit-square world, contain-fit and centered. 216 nodes on desktop spacing; phones (screen min dimension under 700px, aspect fallback) use wider spacing for 143 nodes and the same model. Outer nodes are dimmed by an edge factor so the field fades to black at its edges.
- Beacon: origin at (0.38, 0.42), never the exact center. Its phase advances continuously at the master rate F0 = 0.25 cycles/s. Fires are scheduled at 4.5 + 12k seconds; each fire starts a ring expanding at 0.30 world units/s with a correction band of half-width 0.045, active for 3.2 s. The ring is drawn as a thin warm stroke at low alpha (the mechanism, not a glow), plus a small beacon point that brightens just after a fire.
- Node model: each node is a phase oscillator with phase p (cycles), a seeded drift rate, a seeded correction rate c (1.2 to 3.2), and a reception pattern. Drift distribution: most nodes get a cubed-uniform drift (typical magnitude about 0.012 cycles/s, max 0.048); about 18% are stragglers at 0.045 to 0.075 cycles/s; about 4% are lost, drifting 0.060 to 0.090 cycles/s with a near-zero correction rate, drawn barely lit in #1E2126 with only their own runaway flicker.
- Correction: while the ring band overlaps a node's radius, and only if the node receives that fire, its phase is pulled toward the beacon phase exponentially at rate c. A pass takes about 0.3 s in the band, so one pass removes roughly a third to two thirds of the error, never all of it. Reception models packet loss: about 80% of nodes hear every fire, 14% hear every second fire, 6% every third, the lost hear effectively none. A correction flash (boost) is recorded per node while the band works on it and decays over about half a second; it feeds the brightness mix and a slightly larger flat disc, so the working edge of the wave flares as it travels.
- Brightness: from the wrapped phase error e against the beacon phase. A sharpened cosine (power 14) gives the warm #FFD75E peak at alignment; a broader cosine (power 2) minus the sharp term gives the cool gray #8A93A0 tail for lagging nodes; the remainder is the dim base #2A2E35. Colors are mixed per node in RGB from the strict five-tone palette. No gradients, no shadowBlur, no filter, no offscreen canvas.
- Simulation: fixed step at 120 Hz, seeded, pre-rolled 3600 steps at load so frame one is the synchronous draw at t = 30 s, which is 1.5 s after the fire at 28.5 s: the ring is mid-expansion at radius 0.45. The live loop is rAF-guarded (typeof check) and steps the same fixed-step sim with a step cap; all state is closed over recorded steps, never derived from Date.now().
- Interaction: watch-only core. Dragging is radio interference: while the pointer is held, nodes within 0.13 world units of the finger get continuous seeded phase noise injected in the sim step and lose their correction flash; the next beacon pass re-aligns them. Double-tap fires the beacon immediately and re-anchors the 12 s schedule. A lone tap does nothing, per spec.
- Audio: none. The prompt specs no sound for this piece, and the mechanism is purely visual phase information, so the piece is silent by design rather than given an invented soundtrack.
- House rules: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas CSS size pinned in px inside draw() every frame; phone detection via window.screen physical size with aspect fallback; page ground is the void tone #050505; zero visible text besides the title.

## QA log

- Rendered with render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). All three render cleanly with no audio and no errors.
- Determinism: thumb.png rendered twice and byte-compared with cmp: identical.
- Frame one read-back (desktop and thumb): near-black field of hex-scattered nodes; a thin ring mid-expansion around the off-center beacon; nodes along the ring's arc flaring warm with correction halos; a mixed population inside the ring (warm aligned, gray stragglers, a few near-dark lost nodes); the population outside and below-right mostly gray and dim, still dissolved in drift; edges fading to black.
- Mobile read-back: the 143-node phone field sits whole and centered in the portrait frame, ring and brightness mix legible, nothing clipped.
- One tuning round: the first build's drift was too small and its correction too complete (per-pass pull up to 88%), so frame one read as a uniformly warm, near-locked field, which the prompt defines as failure. Drift magnitudes were raised roughly 2.4x, correction rates lowered to 1.2–3.2 (about a third to two thirds of the error per pass), and the warm peak sharpened from power 8 to power 14. Re-rendered at all sizes and determinism re-verified after the change.
- Hygiene: grep-verified zero occurrences of Date.now, createElement, shadowBlur, gradients, offscreen canvas, getUserMedia, AudioContext, and em dashes in index.html.

## Deviations

- Loop closure: the prompt asks for a watch-only motion loop; the sim's drift is continuous and unbounded, so the state at t = 90 s resembles but does not exactly repeat the state at t = 30 s. This is recorded honestly: the chase, not a tile, is the piece, and frame one (the gate) is exact.
- Node counts are 216 (desktop) and 143 (phone) rather than exactly 200 / 140: the counts fall out of the hex lattice spacing that keeps nodes legible at thumbnail size; both sit at the specced scale.
- The beacon ring is drawn (thin, low alpha) following the prompt's own technical note that the ring is drawn expanding from the origin at pulse time; it is kept flat and faint so it reads as mechanism, not decoration.
