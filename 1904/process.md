# №1904 Three Knots of Wind

Spec: TASKS.md prompt block MB1, PP1151, study #249 michele-bonifati.

## Driver

A quartet waits in a dark room for the wind to be strong enough to play together, and the visitor's hand on the string is what lifts them.

## Mechanism

Four instrument agents (guitar, sax, trombone, drums) stand spread wide across a night-room indigo field in warm wood tones. A single pale gold theme travels voice to voice as a ribbon of dots plus a glowing baton orb; the scheduler is a pure function of time and wind, with pass cycle length 24 minus 3 times wind seconds, so at 3 knots a pass takes 15 seconds and the theme spends 60 percent of each cycle in transit. Each receiving voice rephrases the theme through its own timbre transform: guitar straight, sax curved in a sine wave, trombone bent in a falling glissando, drums pulsed in alternating pairs. Between passes the quartet idles dimmed in near-silence and only three faint gold dots drift near the waiting voice; below 1 knot no passes happen at all. A small Emong kite hangs above the room, its height and tilt set by the wind, and faint chalk wind streaks cross the field faster as the wind rises. The wind counter sits fixed at the lower edge in chalk white with five knot ticks. Dragging is the kite-flyer's hand on the string: dragging up raises the wind, dragging down lowers it, and the wind decides how often the theme passes. Nothing is clicked or selected. Audio is visual-only in the shipped frame; a lazy WebAudio motif is created inside the first drag only, never autoplay, and AudioContext is guarded so node-canvas QA never crashes.

## Frame one

FIRST_T = 19.5 s, wind 3 knots. At wind 3 the cycle is 15 s, so t = 19.5 sits at u = 0.3 of the second pass: the baton is mid-flight from the sax to the trombone, shaped by the trombone bend, with the kite lifted at three knots and the counter reading WIND 3 KNOTS. The whole state is a pure function of t and wind, so frame one is byte-reproducible.

## Deviations from the prompt

None. No development-section arc, no score shown, no per-instrument volume knobs, no game HUD gauge. The wind counter is plain chalk text with five ticks at the lower edge.

## QA

Rendered the actual script with node ~/workspace/tools/render-piece.js at 1280x900 desktop, 390x844 mobile, and 720x720 for thumb.png; all three inspected visually: no clipping, no overlap with the title and date plate, legible hint, composition holds on both sizes. Drag probe rendered with ?sx=0.7&sy=0.3: wind reads 3.5 knots, the baton sits further along toward the trombone, a faint gust arc marks the drag point, and the frame differs visibly from frame one. thumb.png is the 720x720 first-frame render (662x662 stage, matching the shipped №1903 thumb practice).

## Gallery

Date 2007 · 03 · 30 (formula 2002-01-10 + 1905 days). Note ends: "Drag to raise the wind."
