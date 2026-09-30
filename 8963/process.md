# №8963 · One Series Two Materials — process notes

## Seed
263 "One Series Two Materials" (from Tenney's pitch-rhythm analogy: the same
log series as pitch intervals and as durations).

## Concept
One parametric series, s(j) = log2(j) for j = 1..16, drives both geometry and
timing. As shape: a ribbon of 16 segments whose lengths and thicknesses follow
the series, wandering gently across warm paper. As rhythm: beat intervals from
the same numbers, struck by a vermilion striker that falls onto the current
segment each beat while a ripple spreads and the segment glows. The eye feels
the same structure twice, once as shape and once as rhythm.

## Technique
Raw canvas 2D. Segment widths normalized from (log2(j)+0.35); beat intervals
0.42*(0.45+0.55*log2(j)/4) seconds. Striker motion is a sine lift within each
beat interval; ripples are expanding stroked circles. Click re-seeds ink and
wander phase.
