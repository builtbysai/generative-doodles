# No.1038 "What the Stage Props Do at Night"

Study #127 toshitaka-mochizuki, PP199 "The Furniture Dances" (+1+1+1 Stage Props).

## Concept

The hierarchy is inverted: the furniture dances and the dancer is the guest. Seven clean white cubes on a dark side-view stage perform formation choreography with machined discipline: constant velocity, hard stops, no easing anywhere. Each cube carries a faint cyan underglow pool; when a cube reaches its mark, the pool pulses white once, the arrival noted. A single small dark dancer walks the floor line through the cubes, quiet, dark on dark, visible mostly where it crosses the white furniture. The stage above the floor is empty: at night, the props perform for nobody.

## Construction

- Closed-form route model (the No.1034 model): each cube's life is a list of segments built from six formation mark sets. A segment is a straight leg between two marks travelled at one constant speed (7 units/s; duration = distance / speed, floored at 0.55 s), followed by a dead dwell on the mark until the next formation switches. Position is a pure function of loop time; nothing is integrated frame to frame.
- Formation schedule (60 s seamless loop, hard switches):
  - 0.0 s LINE: centers 10, 23, 36, 49, 62, 75, 88 (all level 0). Held long so the loop opens at rest.
  - 13.5 s PAIRS + STACK: pairs at (14, 21), (38, 45), (62, 69), with cube 7 stacked at level 1 over the 69 mark. The stack leg is a straight diagonal glide at the same constant speed.
  - 23.5 s SCATTER: 8, 19, 31, 46, 58, 76, 92 (the stacked cube comes down to the far right).
  - 33.5 s WALL: a tight row at 10, 17, 24, 31, 38, 45, 52.
  - 43.5 s SPREAD: 8, 20, 34, 50, 68, 84, 94.
  - 53.5 s LINE (return): the opening marks again, so t = 60 lands exactly on t = 0.
- Frame one is the synchronous draw at fixed phase t = 15 s: the pairs have just arrived (staggered arrivals 13.79 to 14.36 s, pools pulsing at varied decay), the stack cube is mid-glide toward its perch with its path-memory trail behind it, and the dancer stands at x = 60 in front of the cube on the 62 mark. No Date.now anywhere; piece time only ever advances the phase.
- Arrival pulses: per cube, the loop-relative arrival times are precomputed; the pulse is exp(-age x 1.05) over the age since the most recent arrival, drawn as white layered-alpha ellipses over the cyan pool. Tap-forced pulses use the same envelope over recorded tap events.
- Underglow is three flat-alpha ellipses per cube (alphas 0.10 / 0.13 / 0.12 in #7FD4FF). No gradients, no shadowBlur, no ctx.filter, no offscreen canvas anywhere in the piece.
- Path memory: each cube's trail is its own closed-form position sampled at the nine previous 0.22 s instants, drawn as one polyline at alpha 0.06. It is a position buffer evaluated from the route function, never a canvas fade.
- The dancer: a triangle-wave walk between x = 2 and x = 98 on a 48 s cycle (4 units/s), phase offset -0.5 s so frame one catches it mid-stage; step phase derives from distance walked. Height is 1.7 cube edges; it is drawn after the cubes, in #0B0C0E, so it reads as a shadow crossing the furniture.
- Cube finish: flat #EDEFF2 squares with stage-tone detail at low alpha: a shaded top band (the top face hint), a lid seam, a darker base band and two small wheel marks. Product-finished, not plain blocks.
- Interaction, all recorded events evaluated in closed form:
  - Drag is a cue: each pointer sample records a cue event holding every cube's current offset and a target offset (cubes within 30 units are pulled toward the finger, clamped to 16 units). Between events, offsets run toward their targets at the same machined 7 units/s and stop dead. On release, a final event targets zero: the cubes return to formation at machined speed.
  - Tap a cube forces its arrival pulse now.
  - Double-tap reseeds: formation marks are jittered (seeded, plus-minus 2.5 units, clamped to the stage), the dancer's phase is re-drawn, events clear.
- Audio is lazy and typeof-guarded, created only inside the first pointer gesture: a lowpassed triangle glide bed pitched and gained by the summed cube speed, a soft thump whenever a cube's motion snaps to a stop (an arrival), and faint footfall ticks on the dancer's step cycle. The QA renderer has no AudioContext and the piece renders complete and silent there.
- House rules: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas.style.width/height pinned in px inside draw() every frame; phone detection via window.screen min dimension under 700 px with the h > w x 1.15 aspect fallback only; the floor line sits at 0.74 of height and the stage scales to width on phones, so all seven cubes and the stack stay in frame at 390 px wide. Zero visible text besides the title. No microphone, no external assets, no absolute URLs, no date strings, no em dashes.

## QA log

- Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). All three render cleanly in silence.
- Determinism: thumb.png rendered twice and cmp byte-compared identical; the duplicate was deleted. Re-verified after the tuning round below.
- Desktop read-back: dark stage, floor line in the lower third; three white pairs formed at left, center and right, each with a cyan pool under it, the pools at varied pulse brightness (brightest under the pair that arrived last, at 14.36 s); the seventh cube mid-glide above the right pair on its way to the stack perch, its faint trail angling behind it; the dark dancer silhouetted against the cube at center-right, legs mid-stride. Nothing overlaps wrongly, nothing is clipped.
- Thumb read-back: same composition, legible at 720 px: pairs, pools, stack glide and dancer all read.
- Mobile read-back: the phone path scales the stage to the 390 px width; all seven cubes, the stack and the dancer stay inside the frame, floor line intact, nothing clipped.
- Tuning round: the first build floored every transit at 0.9 s, which made all five short-hop cubes arrive at the same instant (14.4 s) and pulse in unison, reading as a blink rather than as arrivals. The floor is now 0.55 s, so transit duration tracks distance honestly and frame one catches the pulses at staggered decay. All sizes re-rendered and determinism re-verified after the change.
- Grep checks: no Date.now, no gradient constructors, no shadowBlur, no ctx.filter, no offscreen canvas, no getUserMedia, no external URLs in index.html.

## Deviations

- The stack is delivered by a straight diagonal constant-velocity glide rather than a horizontal-then-vertical path: one machined leg keeps the route model to a single segment type, and the diagonal trail it leaves is honest path memory. The prompt allowed an occasional stacked pair without specifying the path.
- A tap also registers as a momentary cue (offsets lean toward the tap point and return on release, all at machined speed). The pull from a sub-half-second tap is small, and it keeps one event model for all pointer input instead of a special case.
- The dancer cycle (48 s) does not divide the 60 s formation loop, so across successive loops the guest crosses at different points of the choreography. The cubes' loop closes exactly; the dancer is a guest, not part of the machine, and its path is still a fixed closed form of piece time, so frame one is exact.
