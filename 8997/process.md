# №8997 · Feedback — process notes

## Concept
A single 160×160 buffer of value noise, re-sampled every frame through a
slowly-turning displacement field built from its own noise, until the flow
organizes into streaked grain. The settle is the event: the page plays the
450-frame organization live, then the frozen frame is the piece. One
restrained palette (indigo ink to bone paper), zero libraries.

## Simulation
- **State**: one Float32Array, 160×160, seeded with coarse value noise.
- **Per frame, two passes**:
  1. *Advect*: sample the buffer at `(x + rx, y + ry)` with bilinear
     interpolation, where `(rx, ry)` comes from a two-octave value-noise
     displacement field that rotates slowly with the frame counter (a fixed
     per-seed swirl angle keeps compositions distinct).
  2. *Restore + inject*: pull the field mean gently back to mid (DC restore),
     then add a whisper of fresh fine noise so the flow never fully dies.
- **Display**: a 2nd–98th percentile stretch maps the buffer to the full
  indigo-to-bone LUT each frame, so every frame carries full tonal range
  without the posterization a fixed gain would cause.
- **Settle**: 450 steps at 2 steps/frame (~4 s on desktop); reduced-motion
  and `?frozen=1` complete all steps immediately.

## What broke during tuning (real bugs, fixed at the source)
1. *Washed-out white*: injection (`decay` model) overwhelmed the loop —
   equilibrium sat at ~1.0, so every seed rendered bone-white.
2. *Collapsed black*: replacing decay with linear gain around 0.5 is
   mean-unstable — any drift of the mean away from 0.5 gets amplified by
   `gain > 1`, and clamping then locks the field at 0. Verified in node:
   mean 0.51 → 0.64 → 0.40 → 0.06 → 0.0 over 700 frames.
3. *Still drifting*: gain around the measured mean still drifted because
   clamping cut the tails asymmetrically. Fixed with a per-frame DC restore
   (mean pulled 25% toward 0.5 after advection), gain removed entirely,
   contrast handled by the display-time percentile stretch.
4. *Ink-blot posterization*: the percentile stretch was added only after
   gain-based contrast slammed everything to the rails; softer dynamics
   (advection + injection only) plus the stretch gave the final flowing
   grain.

## Why the default seed won
`899701` settles into a bright burst of grain in the upper right against a
deep indigo mass, with visible curl filaments along the boundary — the
clearest read of "noise organized by its own ghost". Seed 3 is a close
second (strong spiral at center-left); seed 2024 is softer and less
directional.

## QA
- Desktop + 390×844 mobile renders inspected; no overflow, page fits.
- Zero console entries on all captures (desktop, mobile, frozen, animated).
- Click regenerates a new seeded settle; reduced-motion completes instantly.
