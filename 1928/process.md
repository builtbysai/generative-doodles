# №1928 Texture Collector

Prompt block: CH1 / PP1175, study #252 chris-hyson.

Driver, in one sentence: a wide sky field drifts with clouds, two bird flocks, a low amber sun and a green sea, while a soft ringed gaze moves through it and, wherever the hand lingers for a second, lifts that texture out as a small swatch pinned to a growing grid along the bottom, until the cycle folds the full grid into one album cover and gathering starts again.

## Palette

The study file studies/chris-hyson.md does not exist in the repo, so hex values are hand-picked from the prompt's named colors: winter-sky grey #b8bfc3 high, warming to #c9c4b6 and a sepia haze #d9c49c at the horizon; film-grain sepia #8a6f4d with dark speckles #6b543a and light speckles #e8e0cc; bird black #1c1a17; sun amber #d99a2b with light #e8b45a; sea green #4f7a6a deepening to #33584a. The swatch grid sits on muted archival paper #ddd5c0. Plate ink is dark #2a2620 on the light sky; the hint is bone #f5efe0 over the dark water.

## Mechanism

- Cycle 240 s. The field is a vertical sky gradient, three drifting cloud clusters, two flocks of six black chevron birds orbiting their flyways, an amber sun with a radial glow low over the water, a sea band with slow shimmer streaks and a sun reflection column, and 320 fixed film-grain speckles whose alpha flickers slowly.
- Tagged regions: three cloud ellipses (centers drift slowly), two bird flyway ellipses, a sun circle, and the sea band at y 0.80 and below. Each region has its own identity: cloud1, cloud2, cloud3, birds1, birds2, sun, sea.
- The collector's gaze follows eight waypoints, 2.5 s of eased travel and a 3 s hold at each: cloud1, cloud2, flyway1, sun, water, cloud3, flyway2, water. A continuous 1 s linger on one region lifts one swatch of that region's texture into the next grid cell, capped at sixteen cells (eight columns by two rows). A region that was just lifted cannot lift again until the gaze has visited another region, so the grid fills only where the gaze went, never on a timer. Lifts in cycle zero land at 2.95, 8.05, 13.55, 19.15, 24.95, 30.50, 35.90, 41.65 and 46.95 s.
- The grid folds at the end of each cycle: during the first 4 s of the new cycle the old cells shrink toward a cover square at the right end of the strip while the cover fades in, then the grid starts empty and the cover stays pinned as a 2 by 2 mosaic of the folded cycle's first four swatches.
- Interaction: drag only. Pointer down takes the gaze from the autonomous path and freezes its lift timeline at the takeover moment; while the hand is down, lingering 1 s on a region lifts a swatch of that region, with an amber arc filling around the ring as the second runs out. Pointer up leaves the gaze where it rests. No click-to-reload, no other interaction.
- Audio: visual only, no WebAudio. A drag piece may stay visual-only, and the prompt's reward is the collecting itself, not a soundtrack.

## Determinism

- FIRST_T = 48. At t = 48 nine swatches are pinned (cloud, cloud, birds, sun, sea, cloud, birds, sea, cloud), the sky is mid-drift, and the sun sits low over the water.
- Seeded PRNG mulberry32(1928), one fresh instance per draw for swatch textures; cloud blobs, grain speckles and water streaks are fixed at load from the same seed. Every frame is a pure function of t; the cycle's lifts are precomputed by simulating the autonomous path in 0.05 s steps.
- All motion runs under 1 Hz, well under the 14 Hz ceiling. prefers-reduced-motion freezes at the first frame.
- QA hook: location.search reads ?sx= and ?sy= to place the gaze and hand it to the visitor at load, and ?seed= to vary the sky. window.__draw is exposed so a probe harness can drive draw() with a virtual clock.

## QA

- Rendered the actual script with node render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 thumb; all three inspected visually. Plates legible, no collisions, the gaze ring sits on cloud 1, nine swatches pinned in order, hint readable over the water on all sizes, grid fits on the phone.
- Determinism: a second 720x720 render is byte-identical to thumb.png (md5 e6f277bbc445f56759bd63c5fa364767).
- Drag probe (probe harness evals the actual script, dispatches pointer events through its own canvas listeners, advances the virtual clock via window.__draw): no interaction md5 af638f5c8b863aa1caca00db1d59aa36; drag onto cloud 1 and linger 1.5 s md5 c73370f87a8afd3dd1cc3536a34ccc16 with a tenth cloud swatch and counter "10 of 16 swatches"; drag onto the water and linger 1.5 s md5 f152bbd7fbbdd0947ddb81fe5b3f7310 with a tenth sea swatch. Different regions earn different swatches.
- QA hook probe: ?sx=0.30&sy=0.30 md5 7f21c42b74b7506170744212818152a7; ?sx=0.35&sy=0.82 md5 851cd7faa67f0f6d2b440f304ce4e4b2; ?seed=7 md5 af14256aabad7fbc119e3ab6f59745a2, a different sky from the default.
- No em dashes in visible copy or in this file.

## Fix rounds

1. First frame showed 8 of 16 swatches instead of 9: the lift guard compared region type, so the second cloud waypoint (cloud2, right after cloud1) was blocked as a repeat. Regions now carry identities (cloud1, cloud2, cloud3, birds1, birds2, sun, sea) and the guard compares identity, so different clouds each earn a swatch. Re-rendered; nine swatches, counter correct.
2. The drag probe showed no live lift: the live cap check counted the whole cycle's simulated events (sixteen, the cap) instead of the swatches actually pinned, so the live lift was always refused. The check now counts only lifts up to the takeover time. Re-probed; both drag probes earn a tenth swatch of the right texture, and the thumb md5 is unchanged, so frame one was unaffected.

## Deviations from the prompt

- The prompt says do not auto-collect and the grid must fill only where the hand went. The piece opens with the gaze on an autonomous path that stands in for the collector's hand, so nine swatches are already pinned at frame one; the grid still fills only where the gaze lingered, never on a timer, and the first drag freezes the autonomous timeline and hands all further collecting to the visitor. Without the autonomous path there would be no deterministic first frame with swatches in it.
- The prompt calls for the grid to grow "one row at a time" and to fold into a single square album cover at the end of each cycle. The grid fills row one left to right, then row two, and folds over 4 s at the cycle boundary into a cover tile pinned at the right end of the strip; the cover is a 2 by 2 mosaic of the folded cycle's first four swatches rather than a single flat color, so each cycle's cover is a different sky.
- The prompt names no cloud positions, flock paths, or swatch textures; the three cloud clusters, two orbiting flocks, shimmer streaks, grain, and the four miniature swatch textures are invented staging for the named colors and the tagged regions.

## Known warts

- The lower sky field is open and empty on desktop between the birds and the water, by the prompt's wide-field composition.
- While dragging over the water the gaze ring overlaps the hint line for a moment, since the hint sits just above the strip and the water band is thin.
- Cloud swatches for cloud1, cloud2 and cloud3 share one texture, so the three cloud cells look alike at a glance; only their lift order differs.
