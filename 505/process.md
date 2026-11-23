# №1610 "Ornament as Weather" (JL3, PP857, EXPANSION #212 jinyao-lin)

Date: 2006 · 06 · 09
Interaction cue: Drag to stir the weather.

## Driver

Ornament as weather. The mechanism is a field of rosettes with real life
cycles (form, hold, dissolve, reform elsewhere) plus a drag vortex that
stirs them.

## Mechanism

Eight rosettes, each a spiral particle system drawn as short curved strokes
with ink wobble. Each rosette has 5 to 8 arms with their own start angle,
turn count, wobble frequency and colour (light, mid or dark from the
palette only), plus nine loose orbiting strokes. A rosette's life cycle is
a pure function of piece time: form over about 20 s (spiral extent and
opacity grow in), hold about 15 s, dissolve over about 10 s (opacity falls
away, holding a low floor until the last moments so the field never goes
empty), then it reforms in a new cell. Rosettes sit one per cell of a 3x3
grid, the cell assignment reshuffled by a seeded Fisher-Yates per cycle,
so the field stays spread and no two rosettes clump; centres are clamped
at least a rosette radius plus margin from every edge. Ground texture is
a static field of faint seeded whorl arcs that dissolving rosettes sink
into, over a very faint slow large-scale churn. Everything is seeded
(mulberry32, fixed seed 1610003); the first frame is drawn at fixed phase
12 s, never from a wall clock, and no unseeded randomness is used.

## Interaction

Watch-first. The field churns on its own. Drag: the pointer becomes a
local vortex. Recorded drag samples are kept with their piece times, and
every stroke point is displaced by a closed-form sum over those samples:
a rotation around the pointer that tightens nearby whorls, plus an
outward radial fling for the loose strokes. The influence decays
exponentially with a time constant of about 1.1 s, so it is gone roughly
3 s after release. No other interaction, no click-to-reload, no in-piece
text; the title lives only in the document title.

## Deviations from the prompt

None material. Two judgement calls: the dissolve keeps a low opacity
floor until its final moments so that 5 to 8 rosettes stay legible at
every phase (at the fixed first frame one rosette is mid-dissolve and
reads as a ghost, which is the lifecycle showing); rosette placement
uses a seeded 3x3 cell shuffle rather than free random centres, so the
field cannot clump by chance. Palette, composition, lifecycle timings
and drag behaviour follow the prompt exactly.

## Fix rounds

Round 1: first render read as faceted polygonal rings, and the rosettes
clumped in a centre column with the right side empty. Fixed by raising
the spiral sampling from 34 to 110 steps, opening the spirals (fewer
turns, varied arm start radii), and replacing free random centres with
a low-discrepancy placement.
Round 2: the field still read sparse, with two rosettes nearly
invisible mid-dissolve and a pair overlapping. Fixed by raising the
rosette count from 7 to 8, staggering lifecycle offsets evenly, adding
the dissolve opacity floor, and moving placement to the 3x3 cell
shuffle with edge clamping. Re-rendered at 1280x900, 390x844 and
720x720 and inspected all three: 7 rosettes clear plus 1 dissolving
ghost, grey/black/white only, no symmetry, no hard vector spirals,
rosettes clear of the frame edge. Thumb byte-identical across two
independent re-renders (md5 1974d0e5c620a553d854ad8fdca1f1e7).
