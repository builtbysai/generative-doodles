# №1114 — The Chosen Watcher

Markus Kison study block MK3. A dark field of particles, and every 25
seconds a spotlight chooses one of them to watch. While it is watched,
the geometry of the whole field quietly re-centres on it: being looked
at is the only event in the piece, and it happens to everyone in turn.

## Construction

- **Field**: exactly 1,200 seeded particles in three parallax depths
  (620 far / 380 mid / 200 near), each with its own size, alpha and
  parallax factor, drifting on a small seeded Lissajous whose
  frequencies are whole cycles of the 25 s loop, so the unattended
  field closes seamlessly. A faint seeded twinkle modulates alpha.
- **The cycle** is a closed-form state machine in piece time *t*:
  sweep 0–6 s (the beam fades in and swings in a decaying oscillation
  that settles onto the target), lock 6–9 s (the parallax origin eases,
  smootherstep, from field centre to the chosen particle; the gold ring
  fades in), hold 9–17 s (the origin rides the chosen particle's drift;
  it burns a little brighter), release 17–20 s (origin eases home, ring
  and beam fade), rest 20–25 s (dark field, breathing). The chosen index
  for each cycle is a seeded hash of the cycle number, drawn from the
  mid/near layers so the ring always reads.
- **Parallax**: layer offsets are (origin − centre) × layer factor —
  the far field barely moves, the near field leans toward the watched
  one. The shift is small on purpose: surveillance as a slight change
  of posture in everything else.
- **Beam**: no gradients anywhere. Four stacked translucent wedge
  polygons of decreasing half-angle and increasing alpha, cast from an
  apex just above the top edge, give the soft-edged cone.
- **Determinism**: all parameters come from one seeded mulberry32
  stream (seed 1114466, chosen so the first cycle's watched particle
  sits near the centre and frame one reads immediately); no
  `Math.random`, no wall clock. Frame one is the fixed phase t = 13 s,
  mid-hold, so the thumb renders byte-identical on repeat runs.

## Interaction

- **Pointer move** is the only input, and it cannot command anything:
  it nudges the effective parallax origin a little (weight ≤ 0.30,
  closed-form decay over ~2.2 s after the last recorded move). Leaving
  the canvas clears the nudge. No taps, no reseed — the watcher chooses
  on its own schedule. Never click-to-reload.
- **Sound**: none, by design. The piece ships fully silent; the
  watching needs nothing under it.

## House rules honoured

Canvas sized from the Visual Viewport API with resize listeners on both
visualViewport and window; CSS size pinned in `fit()` and re-pinned in
`draw()`; phone detection via `window.screen` min dimension < 700 with
the `h > w*1.15` aspect fallback; the field composition goes full-bleed
on phones and keeps its square on desktop, the page ground taking the
piece's own background colour; rAF guarded by a typeof check (the QA
renderer draws the synchronous first frame only); no offscreen canvas,
no canvas gradients, no `ctx.filter`, no shadowBlur, no `createElement`,
no microphone, no audio. The only text is the `<title>`.
