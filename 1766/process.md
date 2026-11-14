# Ice Mirror, No. 1766

Felt driver: the frozen mere as an instrument. Low pulses travel under
the ice as slow pressure rings, and the surface answers in rare, sudden
crack events, each spidering a few fine bright lines that fade as they
set, so the web grows denser minute by minute.

Spec: TASKS.md prompt block PP1013, study #231 simon-scott (SS7), cited
verbatim in the build task; study file studies/simon-scott.md, mechanism
10: ice as instrument, contact mics in Wicken Fen ice sheets, "ice
mirror - sonority of the fens". No spec file was invented; the build
follows PP1013 as given.

Mechanism: canvas 2D, a crack-graph structure grown by rare events.
Six seeded random-walk fissures form the base network, dark slate water
showing through, with wider dark pools at a few junctions and 46 trapped
air bubbles in the ice ground. Four fixed nodes beneath the ice emit
expanding low-alpha pressure rings on a 26 s cycle, staggered in phase,
each with a faint trailing ring. Crack events arrive on a fixed seeded
schedule about every 21 s, precomputed to 1200 s; each event adds 6 to 9
jagged branches radiating from a point, drawn bright ice blue when fresh
and fading to set pale grey-blue over 18 s, and every event stays on the
ice, so the web accumulates over minutes. For 2.5 s after an event, its
segments shudder with a small decaying sinusoidal jitter. The rings are
drawn as flattened ellipses, a slight ice-level perspective, never a
top-down map.

Palette: ice white to pale blue-grey ground (#EDF1F2 to #D2D9DD, patches
# B9CBD6), fissure water dark slate (#22303A, pools #2E4150), pressure
rings soft white, fresh crack lines bright ice blue (#6FC7E8) fading to
set pale grey-blue (#A9BCC6), bubbles white.

Periods: pressure rings 26 s; crack events about every 21 s (seeded
jitter plus or minus 4 s); crack fade 18 s; shudder 2.5 s after an event.

Frame one: fixed phase t = 60.0 s, three crack events already set (at
t = 6, 31 and 55 s; the most recent about 5 s old, still bright blue), rings mid-expansion from
all four nodes, web reading at first frame. All randomness is seeded
(mulberry32, seed 1766); no Date.now, no unseeded Math.random, no
performance.now in the visuals. Watch only; prefers-reduced-motion
renders a still frame. Flicker is slow sinusoidal drift and rare
sub-pixel shudder only, well below 14 Hz by construction.

Deviations from the prompt: none. The events stay small and sparse, the
web accumulates rather than breaking, and the camera stays at ice level
with the cracks as the horizon.

Gallery: date 2006 · 11 · 12 (formula 2002-01-10 + 1767 days). Note cue:
"Watch only."
