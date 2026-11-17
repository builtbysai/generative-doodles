# Thirty-Two Miniatures - №1838 (KS7, PP1085)

Driver: a catalog of etudes on a dark stage. Each miniature is a small
machine with its own two colours, playing itself for about twenty seconds
before the next begins. The viewer only browses, never plays. The piece
feels like turning the pages of a book of short studies: one page is three
metronomes drifting out of phase, the next is a circle of dots being
plucked, the next a scrap of paper, the next two horns breathing at each
other. Nothing is a concert and nothing repeats.

## The 32 miniatures

1. Phasing Metronomes - three rods swinging at 0.50, 0.57, 0.64 Hz
2. Plucked Dot Circle - 16 dots on a ring, a pluck travelling around it
3. Paper Roll Fragment - a ruled sheet with a curling edge
4. Breathing Horns - two cones swelling in and out of phase
5. Euclidean Ring - 16 lamps, a 5-step Euclidean pattern walking the ring
6. Pendulum Pair - two bobs at 0.42 and 0.53 Hz
7. Falling Pins - 12 pins dropping and tipping onto a floor line
8. Ripple Grid - 9x9 dots swelling on a travelling sine wave
9. Orbiting Dots - five dots on five concentric orbits
10. Blinking Lattice - 8x8 squares blinking on a hash of sine waves
11. Walking Squares - six squares stepping across, bobbing and turning
12. Tide Lines - eight sine lines rolling at different phases
13. Spinning Fan - nine wedges rotating around a dark hub
14. Rain of Dashes - 24 vertical dashes falling at seeded speeds
15. Twin Spirals - two Archimedean spirals turning opposite
16. Bouncing Ball Ladder - five balls bouncing on five rungs
17. Choir of Bars - twelve bars rising and falling like a choir
18. Rotating Star - a ten-point star turning inside a dashed arc
19. Drifting Triangles - nine triangles wandering on Lissajous paths
20. Pulse Field - four expanding rings leaving a still centre dot
21. Sliding Doors - four bars sliding sideways on a slow sine
22. Comet Trail - a head dot with a fourteen-dot fading tail
23. Weaving Loom - seven warp lines, nine weft lines rippling through
24. Clock Hands - three hands turning at 0.05, 0.18, 0.31 Hz
25. Flicker Columns - ten columns switching on a stepped pattern
26. Slow Avalanche - forty grains falling past a pale triangle
27. Magnetic Needles - 6x6 needles pointing at a wandering pole
28. Growing Vine - a stem growing along a sine path, leafing as it goes
29. Echo Rings - three sources sending out fading rings
30. Morse Dots - a sixteen-symbol code, a four-symbol window travelling it
31. Seesaw Beams - three beams rocking on three fulcrums
32. Quiet Snow - thirty flakes drifting down at seeded speeds

Each miniature has its own two-colour scheme and its own duration of
16 to 22 seconds. No miniature is a variation of another; each is a
different mechanism.

## Interaction

Drag horizontally to scrub through the catalog. The drag carries
inertia and eases onto the nearest miniature; when idle, the current
miniature resumes and, when its duration ends, the next begins on its
own. The corner readout shows the current page, 01/32 through 32/32,
with the miniature name on desktop. Sound is off by default; a toggle
in the corner starts a quiet 55 Hz drone, created only after the tap.
Reduced-motion users see the fixed first frame only.

## Fixed frame one

Fixed phase t = 7.0 s, miniature 01 (Phasing Metronomes) at u = 2.0 s
into its play, rods mid-swing. All randomness comes from seeded
mulberry32 tables built at load; no wall clock or unseeded random is
used at frame one. Re-rendering frame one reproduces byte-identical
output (verified: two independent node-canvas renders of the 1280x900
frame share md5 0f35860bd1bb2165d25b3fb689920bec).

## Deviations

None from the prompt. One presentation fix during QA: on phones the
index readout is shortened to the number only (01/32) so the title
plate and the index plate do not overlap at 390 px wide; the full
name still shows on desktop.

## QA

Rendered with node-canvas at 1280x900 desktop, 390x844 mobile, and
720x720 thumb; all three inspected. Drag probe: scrub(3) moved the
index to 3, setIndex(31) showed 32/32 Quiet Snow, setIndex(7) showed
08/32 Ripple Grid, each rendering a visibly different mechanism.
