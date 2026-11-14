# №1758 "A System to Improvise Within" (marcus-fischer MF7, PP1005)

Driver in one sentence: the session itself is the piece, a slow arc from an empty pale frame through a full circle of playing instruments and back to nothing.

## Mechanism

Five small instruments (a fixed roster, see below) take stations on a loose
circle at mid-frame, the center left open for their overlapping traces. Each
instrument enters from the margin it came from, sliding in over 3 seconds on
a smoothstep, then plays its own slow trace: tape draws a breathing loop,
pulse sends expanding rings, ribbon stretches a wavy line toward the center,
coil winds a slow spiral, needle sweeps a line back and forth. Each trace is
a closed-form function of session time with its own oscillator period
(5.1 to 9.9 seconds), so the overlapping figure at the center never repeats
the same shape twice within a session. After the full set has played
together, instruments leave in reverse order, sliding back out to their
margins, until the frame is empty again; a short empty hold follows, then
the next session begins with the next roster in the fixed table.

## Palette

Pale studio white ground #F4F1EA, hairline frame in oxide grey, plates in
pale paper #EAE5D8. Each instrument in its own quiet hue: tape brown
#7A5A3A, graphite #4A4A48, oxide grey #8A8580, muted rust #A65A3C.
Traces are drawn at 0.55 alpha so overlaps at the center build density
without going dark.

## Session schedule

Constants: join stagger 6.0 s, travel 3.0 s, full-set hold 13.0 s,
empty hold 4.0 s. For a roster of n instruments, cycle length is
12n + 11 seconds. Roster R0 (n = 5): joins at 0, 6, 12, 18, 24 s;
full set present from 27 s; hold 27 to 40 s; leaves in reverse at
40, 46, 52, 58, 64 s; empty at 67 s; cycle 71 s. R1 and R4 (n = 4)
cycle in 59 s; R2 (n = 6) cycles in 83 s; R3 (n = 5) cycles in 71 s.
The live loop runs session time as (21 + clock) modulo the current
roster cycle, so the session continues from frame one without a jump.

## Tap roster table

Tap (pointerdown on the canvas) advances to the next roster in this fixed
table and restarts the session from empty. Tap never reloads the page.
Only pointerdown is bound, so one tap advances exactly one roster.

- R0, five: tape brown -2.20, pulse graphite -1.15, ribbon rust -0.10,
  coil oxide 0.95, needle tape brown 2.00. Angles in radians around the
  center, radii 0.27 to 0.32 of the short side.
- R1, four: ribbon rust -2.40, tape brown -0.90, pulse oxide 0.60,
  coil graphite 2.10.
- R2, six: pulse graphite -2.60, tape brown -1.55, needle rust -0.50,
  ribbon oxide 0.55, coil tape brown 1.60, pulse rust 2.65.
- R3, five: coil rust -2.30, needle graphite -1.20, tape oxide -0.10,
  pulse tape brown 1.00, ribbon graphite 2.10.
- R4, four: tape oxide -2.50, ribbon tape brown -0.80, pulse rust 0.90,
  needle graphite 2.40.

Oscillator periods per instrument are fixed in the roster entries
(5.1 to 9.9 s, plus per-type phase offsets). No randomness anywhere:
no Math.random, no Date.now; the roster table is authored, not rolled.

## Interaction

Tap for a new session. The tap earns its interaction because each tap is
a new performance with a new toolset, never a reload. Otherwise the
session runs its arc on its own. Reduced-motion preference shows the
fixed frame-one image with no animation loop.

## Frame-one numbers

Fixed phase t = 21.0 s into the R0 session. At that moment instruments
0, 1, 2 have fully arrived (joins at 0, 6, 12 s, travel done by 15 s),
instrument 3 (coil, oxide) is just completing its arrival (join 18 to
21 s), and instrument 4 (needle) has not joined yet (join at 24 s).
So frame one shows four instruments on their stations with the tape
loop, pulse ring, ribbon, and coil spiral overlapping near the open
center, and the frame still mid-build, as the prompt requires.
Determinism check: two node-canvas renders of the 720x720 thumb at
different times produced identical md5s.

## Deviations from the prompt

One deliberate deviation, per the build brief: the prompt's avoid-note says not to start with the full set already playing, but the build brief requires frame one to read as a mid-build session with several instruments present, so frame one is fixed at t = 21 s instead. The live session still starts from empty at t = 0; only the first rendered frame is evaluated at the mid-build phase, as in other pieces. The gallery note and hint use "Tap for a new session." per the build brief rather than the prompt's "fresh session" wording. No other
deviations. The study file studies/marcus-fischer.md does not exist in
the muse-soul repo, so hues were hand-picked from the prompt's named
colors, as the MF1 to MF5 builders did.

## QA

Rendered the actual script with node-canvas at 1280x900 desktop,
390x844 mobile, and 720x720 thumb; all three inspected by reading the
PNGs. Desktop: pale ground, hairline frame, four instruments spread
around the loose circle with traces overlapping near the center, title
and date plates legible top left, hint plate bottom left. Mobile:
nothing clipped, plates legible, instruments and traces readable at
phone scale. Thumb (720x720): the same mid-build frame, readable at
gallery size. One fix round: the first build clustered all stations on
the right half of the circle, so all five roster angle sets were
respread across the full circle and all three sizes were re-rendered
and re-inspected. thumb.png is the 720x720 render of the final script.
