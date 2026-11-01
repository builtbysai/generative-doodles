# No.1045 "After the Bow"

Study #128 kyohei-mouri, PP206 "The Venue at Rest".

## Concept

The venue after the performance. The audience is gone, the dancers are gone, but the machines keep their schedules: five light carts run their waypoint circuits across the empty floor, three translucent screens glide on their platforms with projections still running to an empty house, and the figure-eight conveyor runs its balls, blinking for no one. Everything moves with the same machined precision as during the show; only the purpose is gone. The motion is not sad, it is faithful: identical schedules, rest brightness. Rows of empty seats frame the floor at the edges, the absence drawn as architecture. No text anywhere; the absence teaches.

Interactions: drag is being the audience (the nearest machines brighten slightly and lean toward your finger, gently); a tap is a bow (every machine pauses for 3 seconds, the sound drops to true silence, then the schedules resume); a double-tap is the show remembered (brightness rises to full showtime level for about 10 seconds, then the venue rests again).

## Construction

Single self-contained canvas 2D page. Palette is strict: venue #060607, cart domes #FFE9B8 at rest alpha 0.5, screens #D8DADE at rest alpha 0.3, conveyor balls #FFFFFF at rest alpha 0.6, trails at 0.1 in the parent hues, seats #0A0B0D, bases #0D0E11, platforms and rail #101114. Glow is layered flat alpha throughout: no gradients, no shadowBlur, no ctx.filter, no offscreen canvas.

All schedules share one 70 s master loop; every period divides 70, so the whole venue is closed-form in schedule time. Frame one is the synchronous draw at fixed phase t = 21 s, never derived from Date.now(); the rAF loop is anchored as 21 s plus elapsed-since-load, typeof-guarded.

The three schedule models:

1. Carts (5): rectangular waypoint circuits in floor coordinates, the No.1040 model dimmed. Each circuit is four corners walked in order at constant velocity (perimeter divided by moving time), with a hard dwell stop at every corner; no rotation smoothing, no easing. Periods 35, 70, 70, 14, 35 s with seeded phase offsets. Trails are not canvas fade: each frame samples the cart's own closed-form position at nine past schedule times (0.55 s apart) and strokes the polyline at alpha 0.1 fading with age, so the ghost routes exist at frame one exactly as at any other moment. Cart bases are dark rectangles elongated along the current travel axis; the dome is three layered alpha discs.
2. Screens (3): horizontal end-dwell glides. Position is a closed-form triangle-with-dwells function (constant velocity out, dwell, constant velocity back, dwell) with periods 35, 70, 70 s. Each panel is translucent #D8DADE at 0.3 on a dark platform base with a mast; inside, the projection still runs: three soft blobs per screen positioned by sine pairs whose periods are drawn from {10, 14, 17.5, 35} s (all divide 70), drawn screen-local and clipped to the panel, plus one dark counter-blob in the venue tone. The imagery rides with the screen because it is computed from the screen's own origin.
3. Conveyor (8 balls): a Bernoulli lemniscate at the right of the floor, parametrized by a 1024-segment arc-length table so balls travel at constant true speed. Each ball runs an integer number of laps per 70 s loop (4, 5, 6, or 7) from an even offset, and blinks with an integer number of cycles per loop (5, 7, 10, or 14) through a 0.30 + 0.70 * s^1.5 level curve. Stamp wakes are analytic: past arc positions at 0.5 s intervals, alpha 0.1 fading, each stamp scaled by the ball's blink level at that past moment, so the cloud records timing as well as path.

Events over the closed-form schedules: the bow is a pause list; schedule time tau(t) = t minus the clamped overlap of all recorded pauses, so machines freeze exactly and resume on schedule, and the audio master gain is driven to 0.0 while t is inside a pause. The show is an envelope list (0.8 s rise, hold to 9 s, decay to 12 s) that lifts every element's alpha toward showtime. Drag proximity is live pointer state only (brightness swell plus a dome lean for carts and a small shear lean for screens, radius 0.38 of the smaller viewport dimension, decaying 0.8 s after release); it never touches frame one.

Audio is lazy and typeof-guarded, created inside the first pointer gesture: a 52 Hz room tone, a quiet 164 Hz machine hum whose gain follows the show level, and a faint 329 Hz line, all under a master gain. Silent and complete in the QA renderer, which has no AudioContext.

House rules: canvas sized from the Visual Viewport API with resize listeners on visualViewport and window; canvas style width/height pinned in px inside draw(); phone detection via window.screen physical size (min dimension < 700 px) with the h > w * 1.15 aspect test as fallback only; page ground is the venue tone.

## QA log

Rendered with node ~/workspace/tools/render-piece.js at 1280x900 (qa-desktop.png), 390x844 (qa-mobile.png), 720x720 (thumb.png). The piece renders cleanly in silence. thumb.png rendered twice and cmp byte-compared identical; the duplicate was deleted.

Desktop and thumb, frame one (t = 21 s): a very dark venue framed by seat-back rows along the bottom and both sides; three pale translucent screens on platforms across the top, soft projection blobs visible inside each; five warm cart domes mid-circuit at rest brightness with faint ghost trails (two corner trails at left, one long bottom run); the figure-eight conveyor at right with white balls at varied blink levels and a dotted stamp wake along the rail. Quiet and dim, but every machine is legible.

Mobile (390x844): side seat banks dropped per the phone rule below; three raked seat rows frame the bottom. Screens shrink and stagger down the top, all three whole; carts and trails legible down the left and center; the conveyor reads as a complete lemniscate with balls and wakes at mid-right. Nothing clipped.

Deviations, with reasons:

1. Phone seat layout: side banks are dropped on phones and only the bottom raked rows (3) are kept, as the brief allows; at 390 px wide the side columns would crowd the floor and shrink every machine.
2. Bow timing: a tap schedules its 3 s pause 0.32 s ahead rather than instantly. This is the disambiguation window that lets a following tap register as a double-tap (the show) instead: if the second tap lands inside the window, the pending pause is removed before it begins and the show fires. A lone tap's bow therefore starts a third of a second late, which reads as the house taking a breath before it acknowledges.
3. Drag brightness and lean are live pointer state, not closed-form event functions. They affect only post-gesture frames; frame one and every pre-input frame are pure functions of piece time, which is what the determinism gate measures.
4. The lemniscate is vertically squashed (ay = 0.096 vs ax = 0.155 of the floor) so the conveyor sits as a compact side instrument instead of a second stage; arc speed is uniform in the table's unit space and approximately uniform after the squash.
5. Screen 3's panel top sits about 2 px from the frame edge at frame one on desktop and thumb. It is fully drawn, not clipped, and its glide phase moves it down-loop; left as composed.
