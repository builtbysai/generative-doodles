# №1179 — The Subtraction

Jason Soliday study block SD4, after "The Subtraction – mirages" (Dec 2025):
the score as a module inventory. The inventory list IS the interface — no
knobs, no synth UI.

## What happens

Ten inventory lines type out in the left margin, one every 2 s (0.5 s of
stepped characters with a block cursor). Each finished line activates its
lane. All ten lanes render the SAME master signal, but cumulatively: lane
*i* shows the signal after modules 0..*i* have processed it in chain order,
so the line is visibly subtracted stage by stage down the page:

- **oscillator** — the master itself, bone white `#F5F2E8`.
- **filter** — moving-average lowpass; the window widens with each filter
  stage in the chain (5, 13, 25, 41, 61 samples) and the line tints
  progressively toward `#9FB8AD`.
- **sloth** — adds the ultra-slow wander as offset and spatial drift, scaled
  by sloth stage count; the lane fills with flat `#7C8FA0` haze bands and a
  thickened under-stroke — the air thickens.
- **tremolo** — multiplies the amplitude by a pulse envelope
  (0.55 + 0.45·pulse, rate rising per tremolo stage); a `#FFD166` underlay
  breathes with the same pulse.
- **equalizer** — per-sample band gains (low ×0.92, mid ×1.10, high ×0.82,
  smoothed over 5 samples so bands reshape rather than step) and the line is
  redrawn segment by segment in the band colors `#2E5A88` / `#3E7A5E` /
  `#8A4D6B` chosen by local slope.

Before a lane activates it shows its chain *input* as a faint guide line at
20% alpha — the signal arriving at that stage, not yet subtracted.

The header carries the title at left and, at right, "the air is thick" or
"the air is thin", switching on the sign of the wander.

## Cycles

The piece runs in 60-second cycles. Cycle 0 uses the canonical inventory
from the score (oscillator / filter / filter / sloth / sloth / tremolo /
tremolo / equalizer / equalizer / equalizer). Each later cycle re-shuffles
the inventory from a hash of (seed, cycle) — with a 75% chance that one
module drops out and another doubles — then re-types the list and rebuilds
the lanes in the new order. The master signal is a closed-form function of
one continuous global time, so it never jumps at the shuffle; only the path
it takes down the page changes.

## The sloth substitution

The prompt's sloth is ultra-slow chaos (a Lorenz-style integrator). An
integrator is frame-accumulated state, which would break the deterministic
first frame, so the wander here is a quasiperiodic sum of incommensurate
slow sines (`0.6·sin(0.043t) + 0.4·sin(0.0113t + 1.3)`, plus a second pair
for amplitude) — closed-form in t, effectively non-repeating on any
watchable timescale, and just as thick.

## House rules

- Canvas sized from the Visual Viewport API, resize listeners on both
  `visualViewport` and `window`; `canvas.style.width/height` pinned in px
  inside draw().
- Phone detection via `window.screen` physical size (min dimension < 700)
  with aspect fallback; the inventory margin narrows on phones.
- Deterministic first frame drawn synchronously at fixed phase T0 = 26 s
  (cycle 0, all ten lines typed, all lanes active); the rAF loop is
  `typeof`-guarded and anchored as T0 + elapsed since load.
- Everything is a pure function of t and seeded hashes (mulberry32 for the
  cycle shuffle): no canvas gradients, no `ctx.filter`, no shadowBlur, no
  offscreen canvas, no ImageData, no `createElement`. Silent — watch only.

## QA

- `thumb.png` rendered twice at 720×720 and byte-compared (`cmp`
  identical); duplicate deleted.
- Desktop (1280×800) and mobile (390×844) renders read by eye. First pass:
  the tremolo overlay, drawn last, washed out the EQ band colors and the
  unsmoothed band gains stepped the line into spikes. Fixed by drawing the
  pulse underlay beneath the line, widening EQ segments, and smoothing the
  gain array; re-rendered at all three sizes.
