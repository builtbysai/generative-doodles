# №1472 "The Wipe Pan" (carole-roussopoulos CR1, PP719)

## Prompt essence
One room, seen straight on: a long wall with a row of simple seated figures in
profile, all facing the same way. One figure at a time "speaks": her head tilts
a few degrees, her mouth line shifts, a thin gold voice-line rises from her.
The camera does not cut; it pans slowly across the room, wiping from speaker
to speaker, so speaker and crowd stay in the same shot.

## Palette (exactly the prompt palette, nothing else)
Wall warm plaster #ddd3bd; floor wood #8a6a48; figures' clothes muted
#4a5a7a, #6b4a3a, #2f4636, #7a6a8a; skin #f2ead8, #e0c4a0, #c49a6a;
voice-line gold #d9a441. No other color. (An early draft used #2a2a30 for eye
dots and mouth lines; caught by a palette scan and remapped to #2f4636, the
darkest specced clothes tone, before QA.)

## Composition
Room wide, figures in a single row across the lower two-thirds; the camera
view is a window that pans across a wider scene (scene width 2.6x viewport,
camera range 1.6x viewport). Nothing is ever off-screen for long: the pan
ping-pongs across all nine speakers. Seated figures in profile facing right:
chair back + seat, horizontal thigh, vertical shin, torso, forward arm, head
disc with nose bump, hair cap, eye dot, mouth line.

## Motion
Watch-first, slow pan loop. Camera dwells 3.5 s on each speaker, then moves
to the next at 0.12 viewport-widths per second, ping-ponging at the ends
(speaker order 0..8..0). The speaking figure's head tilts gently on a sine
and her mouth line shifts; listeners tilt a few degrees toward the speaker.
The voice-line is a thin gold polyline rising from the speaker's mouth,
wiggling with time. During a move the previous speaker keeps speaking until
the camera arrives, so the wipe never cuts mid-gesture.

## Interaction
Drag sideways pans the camera view along the room (grab-style: content
follows the finger); releasing resumes the automatic pan from the release
position, in the drag direction, with no jump. Drag never restarts the pan
and never cuts. No click-to-reload, no restart of any kind.

## Technical
Scene wider than the viewport; camera x as a smoothed value; speaker state
as an index with a timer; voice-line as a rising polyline from the speaker's
position; listeners orient toward the speaker by head tilt. Camera + speaker
are a closed-form function of piece time and the recorded drag/release event
list (anchor re-based on release), never frame-integrated state, so frame
one and every frame are reproducible. Frame one = draw(0) via a boot flag;
the clock starts only with the rAF loop (plain function declaration behind a
typeof guard). All figure colours from a seeded mulberry32 PRNG (seed
1472000), never Math.random. Fully silent (no AudioContext at all); no
offscreen canvas, gradients, shadowBlur, Path2D, createElement, getUserMedia,
or text drawing; no visible text except <title>. Fading alphas: none used
(all fills opaque). Dots as filled rects or own-beginPath arcs (node-canvas
quirks). Figure height is min(H*0.40, W*0.36) so neighbours never overlap on
narrow portrait phones.

## Verification (forced-time probe harness, vm-isolated instance, real
node-canvas, piece driven via window.__piece)
- t=0 redraw diff 0 px; thumb byte-identical across repeated renders.
- Speaker t=0/4/6/10/12 = 0/0/1/1/2 (dwell 3.5 s, move 1.67 s per step).
- Cam t=0/4/6 = 0.0/76.8/256.0 (move speed 153.6 px/s at 1280 wide).
- Gold voice-line pixels: 181 at t=0, 184 at t=6 (line live at both).
- Drag: down at x=600 (t=2), move to 400 shifts the frame (457,526 bytes
  differ); release at t=3 re-anchors at cam 200.0, moving to 353.6 by t=4,
  speaker 1 — no jump, no restart.
- Camera range over 0–200 s stays in [0, 2048.0] (maxCam at 1280 wide).
- Token scan clean: no AudioContext, getUserMedia, createElement, Path2D,
  gradients, shadowBlur, fillText/strokeText; "Math.random" appears only in
  a comment ("never Math.random"), never as a call.

## Fix rounds
1. Palette fix: eye dots and mouth lines remapped from #2a2a30 to #2f4636.
2. Mobile overlap fix: first mobile render showed neighbouring figures
   overlapping (figure height from H alone oversized them on 390x844);
   figure height now min(H*0.40, W*0.36). All renders re-done after the fix.

## Files
- index.html (md5 a6fbd00b13ccb215c957c2a54e0de9dc)
- thumb.png (720x720), qa-desktop.png (1280x900), qa-mobile.png (390x844)
- tmp/probe1472.js (probe harness)
