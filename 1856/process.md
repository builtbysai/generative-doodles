# Tune It With a Saw, №1856

The driver is the feeling of a bench hand who keeps tuning an instrument that will not stay tuned: seven red tubes that almost agree, a saw that keeps taking a little more off, and one brief moment when the chord lands before the argument starts again.

## Mechanism

Seven horizontal corrugated tubes lie in a row on a workshop table, like an organ manual, with a handsaw resting vertically across them. Each tube is a voice: its length sets its pitch through the inverse square of the remaining length, f = 196 * (L0 / L)^2, so a shorter tube sounds higher. The piece runs on a fixed 72 second cycle. One tube is cut every 9 seconds, each cut shortening it by 2 percent and raising its pitch about two thirds of a semitone, with a burst of gold sawdust particles falling from the cut point. After all seven cuts, at 63 seconds into the cycle, the tubes land exactly on a C major chord (C4, E4, G4, C5, E5, G5, C6), the saw lifts clear of the row, a soft gold glow holds behind the tubes, and at 72 seconds the cycle resets and the argument begins again. Between cuts the system plays itself with a slow strike every 3 seconds, walking a fixed pattern across the tubes. The first frame is fixed at t = 37 seconds, one second after the fourth tube was cut, so sawdust is visibly falling and the saw sits at the fresh cut point. All randomness is seeded (mulberry32 seeded by 1856); there is no wall clock, no Math.random, and no Date.now in frame one. Audio is WebAudio only, built lazily inside the first user gesture and never autoplayed, so before any gesture the piece is silent and visual. Each tube voice is a sine plus a quiet triangle partial; a cut adds a short bandpassed noise burst for the saw. Flicker stays at or under 14 Hz by construction: the only oscillation is the slow sawing motion near a cut, about 2 Hz. With prefers-reduced-motion the piece renders one still frame.

## Palette

Hand-picked from the prompt's named colors, since the reference study file studies/carla-kihlstedt.md does not exist in the repo. Workshop wood: table #8A5A33, dark #6B4226, light #A9744F, pencil tip wood #C9A06A. Hazard red tubes: #C1272D, dark #8E1B20, highlight #E05252, corrugation rgba(142,27,32,0.45). Masking-tape beige: #E3D3A8 with edge #C9B586. Pencil gray: #5C5C5C, light #8A8A8A. Sawdust gold: #D9A441, light #E8C05C. Saw steel: #C9CDD2, dark #7E858C, teeth #9AA1A8. Page ground: #E7E0D2, plates #FBFAF7, title ink #2E2C29.

## Interaction

Drag the saw across a tube to cut it shorter and retune it: while dragging, the saw follows the pointer, and when its blade passes leftward across a tube's end the tube is cut by one step, sawdust falls, the saw noise sounds, and the new pitch plays. A tube can take up to four hand cuts. Tapping a tube strikes it directly. A sound toggle sits at the bottom right. Never click-to-reload.

## Deviations from the prompt

- The reference study file studies/carla-kihlstedt.md returns 404, so the palette hexes were hand-picked from the prompt's named colors and are recorded above.
- The prompt's "every so often" cutting is realized as a fixed deterministic schedule, one cut every 9 seconds on a 72 second cycle, so the first frame is reproducible for the byte gate.
- The prompt says the system plays itself between cuts; audio starts only after the first user gesture, because WebAudio cannot autoplay, so before that gesture the piece is silent and visual.
- Tapping a tube to strike it is an addition beyond the prompt's drag-only interaction; the drag-to-cut interaction is unchanged.
- Tape labels show the nearest note name for the tube's current pitch, so uncut tubes read flat of the chord (D#5, F#5, B5) and read their chord name (E5, G5, C6) only after being cut.

Gallery note: seven red tubes on a workshop table, cut shorter by a handsaw one small step at a time until they agree on a chord, then the argument begins again. Drag the saw to cut a tube.
