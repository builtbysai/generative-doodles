# №9005 — Nine Hundred Years

## Concept

A time-lapse of a river that never existed. Where №9007 ("Old Courses")
showed the finished survey plate, this piece is the nine hundred years
themselves: the channel draws itself year by year, old courses accumulate
as glowing strata on dark water, and every few decades a bend pinches
itself off in an oxbow cutoff that lands as a visible event. The animation
is the piece. When the years run out, a quiet title card fades in over the
finished map. Click anywhere for a new river.

The look is night drafting: near-black ink ground with stippled grain,
ice-blue courses, the living channel as a bright ribbon with a slow flow
of dashes down its center, and cutoffs in warm amber against all that
cold. I wanted the punctuation to feel like a struck match, brief and
warm, and the history to feel like phosphor cooling.

## Technique

The engine is a port of the Robert Hodgin Meander system from the deep
study (modified-bitangent migration: each point is pushed each year by a
blend of its tangent and an outward-pointing bitangent scaled by local
curvature, so bends grow on their own and nothing is ever drawn by hand).
It carries the stabilizers the study locked in: saturated curvature
response, long-wavelength curvature smoothing, a valley spring, a
displacement clamp, and fixed-count arc-length resampling. Cutoff
detection finds near self-collisions, cuts the loop into an oxbow lake
that shrinks and cools from amber to blue over its life, and the river
never re-intersects a living lake.

Rendering is three layers. A static background canvas holds the vignette
and stipple. A trail canvas accumulates every year's course and decays
with a slow destination-out fade, so recent courses glow and ancient ones
sink into ghosts; this is what makes the motion read as time passing
rather than wiggling. The live canvas composites those, then draws the
oxbows, the cutoff events (hot core, expanding double ring, then a small
permanent diamond marker), the current channel ribbon with animated flow
dashes, the year/cutoff/oxbow ledger, and finally the end card over a
soft dark scrim. When year 900 lands, ten epoch snapshots are redrawn in
fixed age-graded blues over the faded trail so the finished frame has the
layered Fisk richness the live fade alone would wash out.

Pacing is wall-clock based: 900 years in about 11.5 seconds regardless of
refresh rate. All drawing is plain canvas 2D, no libraries, and the
per-frame cost is a blit plus a few hundred short strokes, which stays
smooth on a phone. Clicking reseeds and restarts instantly.

## Seed notes

Tried 7, 21, 33, 51, 4813, 1207 as finished frames, then mid-animation
frames for the finalists. Early tuning had 25 to 30 cutoffs per run and
the map turned to confetti, so the minimum loop length went from 48 to
84 points and the rate settled around 10 to 16, which is where the
cutoffs read as events instead of noise.

Seed 33 won. It migrates in a long elegant S, builds a balanced meander
belt that stays in frame, pinches off 10 clean oxbows, and finishes with
proper nested strata. 7 was close but busier; 51 tangled at the right
edge; 4813 bulged off-frame. 33 is the shipped default; every click
deals a fresh random seed.
