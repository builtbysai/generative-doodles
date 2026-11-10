# Incomplete Control Study (No.1675, TH4)

Driver: an orderly grid that remembers its flaw, correcting itself slowly and then letting the same bug creep back in.

## Mechanism

A strict 8 by 8 grid of soft geometric cells on warm paper. Each cell is a tile with one glyph (disc, square, ring, triangle, bar) in muted indigo, rust, or charcoal, placed by a fixed seeded table. The bug is a second deterministic layer with a signature, not noise: five cells carry fixed offset directions and land off their tiles, one column shears sideways with the slip growing down the rows, and a three cell run in one row crossfades to a single repeated value, a stutter. Buggy cells flash once in a greenish hue at the start of an episode so the eye catches the moment of breakage.

## Schedule

Bug episodes run on a seeded per cycle schedule over a 60 second cycle. Cycle zero holds three episodes (starting at 7, 26, and 44 seconds); later cycles hold two or three episodes, two in three cycles holding three, with start times, durations, and peaks drawn from a seed per cycle. Each episode ramps in and out over a quarter of its length, so correction is gradual and never instant, and the grid holds in perfect order between episodes. Frame one sits at t = 8, one second into the first episode: the grid is fully drawn in order, the shear column has begun to slip, and one greenish flash cell is visible.

## Determinism

All randomness comes from mulberry32 seeded with 1675 (cell table and bug signature) and 167500 plus cycle times 7919 (episode schedule). No unseeded Math.random, no Date, no performance.now. Time advances only through requestAnimationFrame deltas accumulated into clockT. Frame one is draw(8.0) called synchronously at load, so the thumb re-renders byte identical.

## Interaction

Watch only. No interaction, no click to reload.

## House rules

Visual Viewport sizing with resize listened on visualViewport and window; canvas element pinned in draw() via canvas.style.width and height in px; phone detection via window.screen with aspect fallback; square composition kept on desktop and phones with the page ground set to the warm paper color; one synchronous frame at load; requestAnimationFrame guarded by a typeof check; flicker below 14 Hz by construction (all changes are slow ramps and 2 second fades); flat fills only.

## Gallery

Title: Incomplete Control Study. Date: 2006 · 08 · 13. Note ends with the interaction cue: Watch only.

## Deviations

None. The prompt asked for a grid that draws in order; the draw in replays at the start of each 60 second cycle as a staggered reveal over about three seconds, and frame one shows it complete.
